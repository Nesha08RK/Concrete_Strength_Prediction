from __future__ import annotations

import joblib
from pathlib import Path

from config import MODEL_PATH


class PredictorService:
    def __init__(self, model_path: str | Path | None = None) -> None:
        self.model_path = Path(model_path or MODEL_PATH)
        self.model = None
        self.model_error: str | None = None

    def load_model(self) -> None:
        if self.model is None and self.model_error is None:
            try:
                self.model = joblib.load(self.model_path)
            except Exception as exc:  # noqa: BLE001
                self.model_error = str(exc)

    def predict_strength(self, features) -> float:
        self.load_model()
        if self.model is None:
            raise RuntimeError(self.model_error or "Model is not available")
        prediction = self.model.predict(features)
        return float(prediction[0])
