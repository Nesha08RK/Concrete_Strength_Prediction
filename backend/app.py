from __future__ import annotations

from flask import Flask
from flask_cors import CORS

from config import ALLOWED_ORIGINS
from routes.prediction import bp as prediction_bp
from services.carbon_service import CarbonService
from services.cost_service import CostService
from services.optimization_service import OptimizationService
from services.predictor import PredictorService
from services.recommendation_service import RecommendationService


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, resources={"/*": {"origins": ALLOWED_ORIGINS}})

    predictor_service = PredictorService()
    predictor_service.load_model()

    app.config["predictor_service"] = predictor_service
    app.config["carbon_service"] = CarbonService()
    app.config["cost_service"] = CostService()
    app.config["optimization_service"] = OptimizationService()
    app.config["recommendation_service"] = RecommendationService()

    app.register_blueprint(prediction_bp)
    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
