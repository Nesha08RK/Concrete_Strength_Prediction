from __future__ import annotations


class RecommendationService:
    def build_recommendations(self, payload: dict[str, float], carbon_emission: float) -> list[str]:
        recommendations: list[str] = []

        if payload["water"] > 170:
            recommendations.append("Reduce water content to improve strength and lower cement demand.")
        if payload["cement"] > 400:
            recommendations.append("Replace part of the cement with Fly Ash to improve sustainability.")
        if carbon_emission > 300:
            recommendations.append("Use supplementary cementitious materials to reduce carbon emissions.")
        if payload["age"] < 28:
            recommendations.append("Increase curing duration to improve long-term strength development.")

        if not recommendations:
            recommendations.extend(
                [
                    "Maintain the current mix proportions for balanced performance.",
                    "Monitor durability and curing conditions during production.",
                    "Consider a small reduction in cement content for sustainability gains.",
                ]
            )

        return recommendations[:4]
