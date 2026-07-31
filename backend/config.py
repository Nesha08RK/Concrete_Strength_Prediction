from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "saved_models" / "best_xgboost_model.pkl"
RESULTS_CSV_PATH = BASE_DIR / "results" / "concrete_with_carbon.csv"
OPTIMIZED_CSV_PATH = BASE_DIR / "results" / "optimized_mix_recommendation.csv"
MATERIAL_COST_REFERENCE_PATH = BASE_DIR / "dataset" / "material_cost_reference.csv"
CARBON_REFERENCE_PATH = BASE_DIR / "dataset" / "carbon_emission_reference.csv"
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
