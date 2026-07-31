from __future__ import annotations

import pandas as pd

from config import MATERIAL_COST_REFERENCE_PATH, RESULTS_CSV_PATH


class CostService:
    def __init__(self, csv_path: str | None = None) -> None:
        self.csv_path = csv_path or str(RESULTS_CSV_PATH)
        self._data: pd.DataFrame | None = None

    def load_data(self) -> pd.DataFrame:
        if self._data is None:
            self._data = pd.read_csv(self.csv_path)
        return self._data

    def calculate_material_cost(self, payload: dict[str, float]) -> float:
        self.load_data()
        cost_reference = pd.read_csv(MATERIAL_COST_REFERENCE_PATH)
        cost_dict = dict(zip(cost_reference["Material"], cost_reference["Cost_per_kg_INR"]))

        cost = (
            payload["cement"] * cost_dict["Cement"]
            + payload["blast_furnace_slag"] * cost_dict["Blast Furnace Slag"]
            + payload["fly_ash"] * cost_dict["Fly Ash"]
            + payload["water"] * cost_dict["Water"]
            + payload["superplasticizer"] * cost_dict["Superplasticizer"]
            + payload["coarse_aggregate"] * cost_dict["Coarse Aggregate"]
            + payload["fine_aggregate"] * cost_dict["Fine Aggregate"]
        )

        return round(float(cost), 2)
