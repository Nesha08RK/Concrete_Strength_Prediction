from __future__ import annotations

import math
from typing import Any

import numpy as np
import pandas as pd


def validate_payload(payload: dict[str, Any]) -> list[str]:
    required_fields = [
        "cement",
        "blast_furnace_slag",
        "fly_ash",
        "water",
        "superplasticizer",
        "coarse_aggregate",
        "fine_aggregate",
        "age",
    ]

    errors: list[str] = []
    if not isinstance(payload, dict):
        return ["Request body must be a JSON object"]

    for field in required_fields:
        if field not in payload:
            errors.append(f"Missing field: {field}")

    for field in required_fields:
        value = payload.get(field)
        if value is None:
            errors.append(f"Missing value for {field}")
            continue
        if isinstance(value, (int, float)) and not isinstance(value, bool):
            try:
                is_finite = math.isfinite(value)
            except OverflowError:
                is_finite = False
            if not is_finite:
                errors.append(f"Invalid value for {field}: must be finite")
            elif value < 0:
                errors.append(f"Invalid value for {field}: must be non-negative")
            elif field == "age" and not float(value).is_integer():
                errors.append("Invalid value for age: must be a whole number of days")
        else:
            errors.append(f"Invalid value for {field}: expected a number")

    return errors


def build_feature_frame(payload: dict[str, Any]) -> pd.DataFrame:
    feature_names = [
        "Cement",
        "Blast Furnace Slag",
        "Fly Ash",
        "Water",
        "Superplasticizer",
        "Coarse Aggregate",
        "Fine Aggregate",
        "Age",
    ]
    input_names = [
        "cement",
        "blast_furnace_slag",
        "fly_ash",
        "water",
        "superplasticizer",
        "coarse_aggregate",
        "fine_aggregate",
        "age",
    ]
    values = [float(payload[name]) for name in input_names]
    return pd.DataFrame([values], columns=feature_names)


def make_json_safe(value: Any) -> Any:
    if isinstance(value, dict):
        return {str(key): make_json_safe(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [make_json_safe(item) for item in value]
    if isinstance(value, np.generic):
        return make_json_safe(value.item())
    if isinstance(value, float):
        return value if math.isfinite(value) else None
    return value


def get_strength_category(predicted_strength: float) -> str:
    if predicted_strength < 20:
        return "Weak"
    if predicted_strength < 40:
        return "Average"
    if predicted_strength < 60:
        return "Strong"
    return "Excellent"


def calculate_sustainability_rating(optimization_score: float, score_scale: float = 100.0) -> float:
    """Map the composite optimization score to the equivalent 0–5 rating."""
    try:
        score = float(optimization_score)
        scale = float(score_scale)
    except (TypeError, ValueError, OverflowError):
        return 0.0

    if not math.isfinite(score) or not math.isfinite(scale) or scale <= 0:
        return 0.0

    return float(np.clip(score / scale * 5.0, 0.0, 5.0))
