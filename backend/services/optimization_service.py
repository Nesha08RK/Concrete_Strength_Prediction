from __future__ import annotations

import pandas as pd

from config import OPTIMIZED_CSV_PATH, RESULTS_CSV_PATH


class OptimizationService:
    def __init__(self, csv_path: str | None = None) -> None:
        self.csv_path = csv_path or str(OPTIMIZED_CSV_PATH)
        self._data: pd.DataFrame | None = None
        self.reference_data: pd.DataFrame | None = None

    def load_data(self) -> pd.DataFrame:
        if self._data is None:
            self._data = pd.read_csv(self.csv_path)
        return self._data

    def load_reference_data(self) -> pd.DataFrame:
        if self.reference_data is None:
            self.reference_data = pd.read_csv(RESULTS_CSV_PATH)
        return self.reference_data

    def compute_optimization_score(self, strength: float, cost: float, carbon: float) -> float:
        reference = self.load_reference_data()
        strength_min, strength_max = reference["Strength"].min(), reference["Strength"].max()
        cost_min, cost_max = reference["Material_Cost_INR"].min(), reference["Material_Cost_INR"].max()
        carbon_min, carbon_max = reference["Carbon_Emission_kgCO2"].min(), reference["Carbon_Emission_kgCO2"].max()

        strength_norm = (strength - strength_min) / (strength_max - strength_min) if strength_max != strength_min else 1.0
        cost_norm = (cost - cost_min) / (cost_max - cost_min) if cost_max != cost_min else 1.0
        carbon_norm = (carbon - carbon_min) / (carbon_max - carbon_min) if carbon_max != carbon_min else 1.0

        cost_score = 1 - cost_norm
        carbon_score = 1 - carbon_norm

        optimization_score = 0.50 * strength_norm + 0.25 * cost_score + 0.25 * carbon_score
        return round(float(optimization_score * 100.0), 2)

    def get_top_optimized_mixes(self) -> list[dict[str, object]]:
        data = self.load_data()
        top = data.head(10).copy()
        return top.to_dict(orient="records")
