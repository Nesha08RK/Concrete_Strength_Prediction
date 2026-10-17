import math
import sys
import unittest
from pathlib import Path

from flask import Flask

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from routes.prediction import bp
from services.optimization_service import OptimizationService
from utils.helpers import calculate_sustainability_rating


class SustainabilityRatingTests(unittest.TestCase):
    def test_rating_normalizes_fraction_and_percentage_scores(self):
        self.assertEqual(calculate_sustainability_rating(0.8, score_scale=1.0), 4.0)
        self.assertEqual(calculate_sustainability_rating(80.0), 4.0)

    def test_rating_is_bounded_and_handles_invalid_values(self):
        self.assertEqual(calculate_sustainability_rating(-10.0), 0.0)
        self.assertEqual(calculate_sustainability_rating(120.0), 5.0)
        self.assertEqual(calculate_sustainability_rating(float("nan")), 0.0)
        self.assertEqual(calculate_sustainability_rating(None), 0.0)

    def test_each_saved_mix_rating_matches_its_composite_score(self):
        mixes = OptimizationService().get_top_optimized_mixes()

        self.assertTrue(mixes)
        for mix in mixes:
            score = mix["Optimization_Score"]
            rating = mix["sustainabilityRating"]
            self.assertTrue(math.isfinite(rating))
            self.assertGreaterEqual(rating, 0.0)
            self.assertLessEqual(rating, 5.0)
            self.assertAlmostEqual(rating, score * 5.0)

        self.assertGreater(
            calculate_sustainability_rating(0.8, score_scale=1.0),
            calculate_sustainability_rating(0.4, score_scale=1.0),
        )

    def test_standalone_optimization_endpoint_returns_rated_mix_proportions(self):
        app = Flask(__name__)
        app.config["optimization_service"] = OptimizationService()
        app.register_blueprint(bp)

        response = app.test_client().get("/api/optimization")

        self.assertEqual(response.status_code, 200)
        mixes = response.get_json()["optimized_mixes"]
        self.assertTrue(mixes)
        self.assertIn("Cement", mixes[0])
        self.assertIn("sustainabilityRating", mixes[0])
        self.assertEqual(mixes, response.get_json()["top_optimized_mixes"])


if __name__ == "__main__":
    unittest.main()
