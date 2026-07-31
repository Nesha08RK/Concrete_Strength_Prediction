from __future__ import annotations

import pandas as pd

from config import CARBON_REFERENCE_PATH, RESULTS_CSV_PATH


class CarbonService:
    def __init__(self, csv_path: str | None = None) -> None:
        self.csv_path = csv_path or str(RESULTS_CSV_PATH)
        self._data: pd.DataFrame | None = None

    def load_data(self) -> pd.DataFrame:
        if self._data is None:
            self._data = pd.read_csv(self.csv_path)
        return self._data

    def calculate_carbon_emission(self, payload: dict[str, float]) -> float:
        self.load_data()
        carbon_reference = pd.read_csv(CARBON_REFERENCE_PATH)
        carbon_dict = dict(
            zip(
                carbon_reference["Material"],
                carbon_reference["Emission_Factor_kgCO2_per_kg"],
            )
        )

        emission = (
            payload["cement"] * carbon_dict["Cement"]
            + payload["blast_furnace_slag"] * carbon_dict["Blast Furnace Slag"]
            + payload["fly_ash"] * carbon_dict["Fly Ash"]
            + payload["water"] * carbon_dict["Water"]
            + payload["superplasticizer"] * carbon_dict["Superplasticizer"]
            + payload["coarse_aggregate"] * carbon_dict["Coarse Aggregate"]
            + payload["fine_aggregate"] * carbon_dict["Fine Aggregate"]
        )

        return round(float(emission), 2)
