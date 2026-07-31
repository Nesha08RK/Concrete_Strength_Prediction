from __future__ import annotations

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
            continue
        if isinstance(value, (int, float)) and not isinstance(value, bool):
            if value < 0:
                errors.append(f"Invalid value for {field}: must be non-negative")
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
    values = [
        payload["cement"],
        payload["blast_furnace_slag"],
        payload["fly_ash"],
        payload["water"],
        payload["superplasticizer"],
        payload["coarse_aggregate"],
        payload["fine_aggregate"],
        payload["age"],
    ]
    return pd.DataFrame([values], columns=feature_names)


def get_strength_category(predicted_strength: float) -> str:
    if predicted_strength < 20:
        return "Weak"
    if predicted_strength < 40:
        return "Average"
    if predicted_strength < 60:
        return "Strong"
    return "Excellent"


def calculate_sustainability_rating(optimization_score: float) -> float:
    return round(float(np.clip(optimization_score / 20.0, 0.0, 5.0)), 2)
