from __future__ import annotations

import pandas as pd
from flask import Blueprint, current_app, jsonify, request
from werkzeug.exceptions import BadRequest

from config import BASE_DIR
from services.carbon_service import CarbonService
from services.cost_service import CostService
from services.optimization_service import OptimizationService
from services.predictor import PredictorService
from services.recommendation_service import RecommendationService
from utils.helpers import build_feature_frame, get_strength_category, validate_payload

bp = Blueprint("prediction", __name__)


def _build_shap_payload() -> list[dict[str, object]]:
    shap_path = BASE_DIR / "results" / "shap_feature_importance.csv"
    if not shap_path.exists():
        return []

    try:
        shap_frame = pd.read_csv(shap_path)
    except Exception:  # noqa: BLE001
        return []

    feature_map = {
        "cement": "cement",
        "water": "water",
        "age": "age",
        "fly ash": "fly_ash",
        "fly_ash": "fly_ash",
        "blast furnace slag": "blast_furnace_slag",
        "blast_furnace_slag": "blast_furnace_slag",
        "superplasticizer": "superplasticizer",
        "coarse aggregate": "coarse_aggregate",
        "coarse_aggregate": "coarse_aggregate",
        "fine aggregate": "fine_aggregate",
        "fine_aggregate": "fine_aggregate",
    }

    shap_values: list[dict[str, object]] = []
    for _, row in shap_frame.iterrows():
        feature_name = str(row.get("Feature", "")).strip()
        normalized_feature = feature_name.lower().replace("-", " ").replace("_", " ")
        feature_key = feature_map.get(normalized_feature, normalized_feature.replace(" ", "_"))
        contribution = row.get("Mean SHAP Value")
        if contribution is None:
            contribution = row.get("mean_shap_value")
        try:
            numeric_contribution = float(contribution)
        except (TypeError, ValueError):
            numeric_contribution = 0.0

        shap_values.append(
            {
                "feature": feature_key,
                "contribution": round(numeric_contribution, 4),
            }
        )

    return shap_values


@bp.route("/", methods=["GET"])
def health() -> tuple[dict, int]:
    return jsonify({"application": "SmartCrete AI Backend", "status": "Running"}), 200


@bp.route("/api/predict", methods=["POST"])
def predict() -> tuple[dict, int]:
    try:
        payload = request.get_json(silent=True) or {}
    except BadRequest:
        payload = {}

    errors = validate_payload(payload)
    if errors:
        return jsonify({"error": "Invalid request", "details": errors}), 400

    predictor_service: PredictorService = current_app.config["predictor_service"]
    carbon_service: CarbonService = current_app.config["carbon_service"]
    cost_service: CostService = current_app.config["cost_service"]
    optimization_service: OptimizationService = current_app.config["optimization_service"]
    recommendation_service: RecommendationService = current_app.config["recommendation_service"]

    if predictor_service.model_error:
        return jsonify({"error": "Model loading failed", "details": predictor_service.model_error}), 500

    try:
        features = build_feature_frame(payload)
        predicted_strength = predictor_service.predict_strength(features)

        strength_category = get_strength_category(predicted_strength)
        material_cost = cost_service.calculate_material_cost(payload)
        carbon_emission = carbon_service.calculate_carbon_emission(payload)
        optimization_score = optimization_service.compute_optimization_score(
            predicted_strength, material_cost, carbon_emission
        )
        sustainability_rating = round(float(optimization_score / 20.0), 2)
        recommendations = recommendation_service.build_recommendations(payload, carbon_emission)
        top_optimized_mixes = optimization_service.get_top_optimized_mixes()
        shap_values = _build_shap_payload()
        if shap_values:
            top_features = sorted(shap_values, key=lambda item: abs(float(item["contribution"])), reverse=True)[:3]
            feature_summary = ", ".join(str(item["feature"]) for item in top_features)
            explanation = (
                f"The current prediction is most influenced by {feature_summary}, which together explain the model's confidence in this concrete mix."
            )
        else:
            explanation = "The model's strength estimate reflects the current concrete mix proportions and the learned relationships from the training data."

        return jsonify(
            {
                "predicted_strength": round(predicted_strength, 2),
                "strength_category": strength_category,
                "material_cost": material_cost,
                "carbon_emission": round(carbon_emission, 2),
                "optimization_score": optimization_score,
                "sustainability_rating": sustainability_rating,
                "recommendations": recommendations,
                "top_optimized_mixes": top_optimized_mixes,
                "optimized_mixes": top_optimized_mixes,
                "shap_values": shap_values,
                "explanation": explanation,
            }
        ), 200
    except FileNotFoundError as exc:
        return jsonify({"error": "File not found", "details": str(exc)}), 500
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": "Internal server error", "details": str(exc)}), 500
