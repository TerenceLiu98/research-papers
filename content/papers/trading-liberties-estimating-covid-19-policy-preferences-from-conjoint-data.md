---
title: "Trading Liberties: Estimating COVID-19 Policy Preferences from Conjoint Data"
type: paper
authors:
  - Felix Hartmann
  - Macartan Humphreys
  - Ferdinand Geissler
  - Heike Klüver
  - Johannes Giesecke
year: 2023
doi: 10.1017/pan.2023.25
tags:
  - conjoint-experiments
  - preference-modeling
  - civil-liberties
  - covid-19
---

## TL;DR

A preregistered conjoint experiment with 10,525 German respondents finds greater support for stringent COVID-19 restrictions as pandemic severity increases, but sharp differences by vaccination status. A quadratic utility model translates ratings into conditional policy ideal points and indifference curves. The representative unvaccinated respondent prefers the least stringent policy with the broadest exemptions under every studied severity condition; these preferences do not admit the fitted Euclidean interpretation.

## Research Question

When do citizens accept restrictions on civil liberties for public welfare, and how do preferred stringency, exemptions, and trust in government vary with pandemic severity and vaccination status?

## Motivation

Average marginal effects summarize responses to attributes but do not directly identify optimal policy packages or trade-offs between dimensions. Modeling the utility surface makes these quantities interpretable while allowing context to shift preferred policies.

## Contributions

- Combines randomized policy attributes and pandemic context to estimate conditional support and trust.
- Uses a general linear quadratic utility model to recover ideal points and indifference curves without imposing equal dimensional salience or Euclidean preferences.
- Documents contrasting preferences among vaccinated and unvaccinated respondents and provides the R routine cjEuclid.

## Method

The survey ran in Germany on 8–22 September 2021. Each respondent evaluated two successive pairs of proposals. Within a pair, pandemic severity was shared, while policy stringency and universality varied. The three factors each had three levels, yielding 27 combinations.

| Factor | Levels |
| --- | --- |
| Severity | Incidence 150 and ICU occupancy 80%; incidence 300 and occupancy 90%; incidence 800 and occupancy 100% |
| Stringency | Masks; additionally limits on social events; additionally broader movement restrictions |
| Universality | Exempt vaccinated, recovered, or tested citizens; exempt vaccinated or recovered citizens; exempt nobody |

Outcomes were forced choice, proposal ratings, hypothetical trust in the federal government, and, for unvaccinated respondents, vaccination willingness. The latter three used 0–10 scales. The marginal-effects analysis uses centered attributes and interactions, individual fixed effects, and heteroskedasticity-robust standard errors (Section 2.1).

The structural analysis regresses ratings on linear terms, squared terms, and two-way interactions to estimate

$$
u(z)=a+q^\top z-z^\top Rz,
$$

with symmetric $R$. Each regression interaction enters once, whereas the matrix expression includes both symmetric off-diagonal entries. The fitted surface supplies conditional optima and equal-utility contours. Positive curvature of the loss permits a generalized spatial interpretation; an indefinite matrix permits non-Euclidean surfaces and boundary optima. This extends [[concepts/euclidean-preferences|Euclidean Preferences]] and allows [[concepts/non-separable-spatial-preferences|Non-Separable Spatial Preferences]] rather than assuming circular contours. A representative citizen uses average utility parameters, not an average of individual ideal points (Section 3.2).

## Experiments

The main severity-by-stringency interaction shows rising support for stronger restrictions as conditions worsen. Average responses to severity alone are weak, illustrating how marginal summaries can conceal conditional preferences. Respondents generally prefer exemptions over universal restrictions. The paper finds no evidence of stringency-by-universality or three-way interactions in its main analysis.

For the full sample, the fitted stringency ideal shifts from between the least and moderately stringent levels under moderate worsening to between moderate and maximum stringency under dramatic worsening. Preferred universality changes little. Vaccinated citizens favor exemptions for vaccinated or recovered people.

Unvaccinated respondents prefer the least stringent policy with exemptions that include tested citizens at all severity levels. Their greater tolerance of restrictions during severe conditions does not move their ideal away from that boundary. They dislike the intermediate exemption policy that specifically excludes them, producing non-convex preferences in the chosen policy coordinates. Stringency is associated with lower hypothetical trust for this subgroup across severity conditions, despite a positive average association reported for trust. Changes in stated vaccination willingness are substantively small (Sections 3.1–3.2).

## Limitations

- Hypothetical choices, trust, and vaccination intentions do not establish actual compliance or vaccination behavior.
- Findings concern Germany in September 2021 and the particular bundles used to operationalize stringency and universality.
- Continuous quadratic interpolation from 27 discrete profiles imposes functional-form and symmetry assumptions. Subgroup-average utility surfaces conceal individual heterogeneity.
- The unvaccinated group's non-Euclidean surface may reflect the policy coding: being specifically targeted differs substantively from the number of people exempted. Finer policy variation would help distinguish these explanations.
- The supplied text references supplementary analyses but does not include them; numerical coefficients shown only in figures are not reconstructed here.

## Related Concepts

- [[concepts/euclidean-preferences|Euclidean Preferences]]: declining utility with weighted distance from an ideal is a testable restriction on the fitted surface.
- [[concepts/non-separable-spatial-preferences|Non-Separable Spatial Preferences]]: cross-dimensional utility interactions allow conditional optima to change.

## Related Papers

- Abramson, Koçak, and Magazinnik (2022), “What Do We Learn about Voter Preferences from Conjoint Experiments?”: the source contrasts its general quadratic specification with circular indifference curves.
- Ganter (2021), “Identification of Preferences in Forced-Choice Conjoint Experiments: Reassessing the Quantity of Interest”: contrasts model-based utility summaries with average contributions of attributes to choices.
- [[papers/adaptive-randomization-in-conjoint-survey-experiments|Adaptive Randomization in Conjoint Survey Experiments]]: a library comparison, not a source citation; searches for extreme context-specific effects through adaptive allocation rather than fitting a quadratic preference surface.

## Resources

- [Article and supplementary material](https://doi.org/10.1017/pan.2023.25)
- [Replication data](https://doi.org/10.7910/DVN/SVD9SV)
- [Preregistration](https://osf.io/4vgf6/)
