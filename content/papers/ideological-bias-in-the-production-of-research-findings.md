---
title: "Ideological bias in the production of research findings"
type: paper
authors:
  - George J. Borjas
  - Nate Breznau
year: 2026
doi: "10.1126/sciadv.adz7173"
journal: Science Advances
tags:
  - metascience
  - ideological-bias
  - research-design
  - immigration
---

## TL;DR

In an exploratory reanalysis of 1,253 models from 158 researchers in 71 teams, researchers' immigration preferences were associated with their estimates of immigration's relationship with welfare support. The adjusted pro- versus anti-immigration team difference was 0.085 average marginal effect (AME) units (SE 0.031; P = 0.008). Combinations of five design choices accounted descriptively for 68% of this gap. Ideology was measured, not randomized, so the findings do not establish a causal effect of ideology or deliberate manipulation of results.

## Research Question

When researchers analyze the same data and hypothesis, are their policy preferences associated with the estimates they produce, and can differences in model specification account for that association?

## Motivation

Research findings can diverge because of analytical choices as well as sampling uncertainty. The crowdsourced study by Breznau, Rinke, Wuttke, and colleagues (BRW) held the supplied data and hypothesis constant while recording researchers' immigration preferences before analysis. This creates an opportunity to study ideological differences in research production separately from differences in the initial research question. The authors argue that adjusting for model specifications can obscure an association operating through those very choices.

## Contributions

- Documents an association between pre-analysis immigration preferences and the direction and magnitude of reported estimates.
- Develops an account of [[concepts/endogenous-research-design|Endogenous Research Design]] in which combinations of analytical decisions connect researcher preferences to findings.
- Reexamines BRW's conclusion that researcher characteristics do not explain outcome variance, distinguishing potentially confounding disciplinary background from potentially mediating specification choices.
- Examines robustness across alternative ideology measures and regression specifications, alongside blinded peer assessments of research designs.

## Method

Teams first reproduced Brady and Finnigan's null finding on immigration and welfare support, then extended the analysis using five supplied International Social Survey Program waves spanning 1985-2016, immigration measures, and country-level covariates. BRW standardized the resulting estimates as AMEs: changes in the probability of supporting government provision of social programs for a one-percentage-point increase in the immigrant population share. Welfare support is the measured outcome; the paper interprets it as an indicator of social cohesion.

The pre-analysis immigration question ranged from 0 (tougher laws) to 6 (relaxed laws); no participant selected 0. The reanalysis uses mean team sentiment, fractions of members at either extreme, and team categories. Pro-immigration teams have a majority scoring 5 or 6; anti-immigration teams have at least one member scoring 1 or 2. This yields 31 pro-immigration, 9 anti-immigration, and 31 moderate teams under the paper's definitions.

Baseline regressions relate model-level AMEs to team ideology, controlling for team size, statistical skills, topical experience, and disciplinary composition. Each model receives weight inverse to its team's model count, and baseline standard errors are clustered by team. Model-specification choices are excluded from these regressions because the authors regard them as possible mediators.

For the design analysis, models are grouped into 58 observed combinations along five dimensions: composite versus individual welfare outcomes, immigration stock versus flow, multilevel modeling at the country-year level, country inclusion, and survey-wave inclusion. Each model receives the mean AME of its specification group, termed its "expected AME." Regressing these group means on ideology and controls measures how much of the observed gap is associated with those combinations; it is not an independently identified causal mediation effect.

## Experiments

This is secondary analysis of a crowdsourced research exercise, not a new randomized ideology experiment. Key reported results are:

| Analysis | Reported finding | Source |
| --- | --- | --- |
| Unadjusted mean AME | Pro-immigration 0.014; moderate -0.008; anti-immigration -0.019 | Baseline evidence; summary of Table S1 |
| Adjusted team-category contrast | Pro minus anti: 0.085 (SE 0.031; P = 0.008) | Table 1, column 3 |
| Alternative composition measure | Exclusively pro versus exclusively anti: 0.074 (SE 0.024) | Table 1, column 2 |
| Design-group expected AME | Pro minus anti: 0.058 (SE 0.025; P = 0.025), or 68% of the adjusted AME gap | Table 2, column 3 |
| Alternative design decomposition | Team-member fractions imply 54% of the corresponding gap is accounted for | Tables 1-2, column 2 |
| Specification robustness | P < 0.10 in 88.2% of 883 models; 92.4% after excluding models without discipline fixed effects | Main-text account of Figure S3 |
| Standardized peer-review scores | Moderate 0.35; anti-immigration 0.03; pro-immigration -0.33, across 1,215 reviewed models | Figure 3 and accompanying text |

Disciplinary controls are central to the increase from the small unadjusted contrast to the larger adjusted contrast. The authors also report robustness to alternative disciplinary controls, prior hypothesis beliefs, peer-review weighting, team classifications, senior-member ideology, and researcher-model observations. These supplementary analyses are described in the supplied main text; the actual supplementary tables and specification curve are not included in the supplied Markdown.

Four or five randomly assigned participants reviewed each research design anonymously, without seeing its results. Both ideological extremes received lower average scores than moderate teams. The paper explicitly cautions that conventional, highly rated specifications need not be closer to the true data-generating process.

## Limitations

- Ideology was not randomly assigned. Shared data and a shared hypothesis do not remove confounding in the association between researcher preferences and results.
- The original exercise was neither designed nor powered to confirm the ideological-bias hypothesis. This is exploratory evidence from one topic and a moderately sized sample of teams.
- Only nine teams meet the anti-immigration definition, and confidence intervals are wide. Magnitudes remain uncertain, with stronger support for comparisons of pro-immigration teams against all others.
- Immigration preferences may be misreported because of social desirability. The issue-specific measure should not be treated as a comprehensive measure of political ideology.
- The adjustment set, especially disciplinary composition, materially affects the estimates. Robustness across the authors' specifications does not by itself identify a causal effect.
- The study does not observe discarded models, search sequences, or stopping decisions. It cannot distinguish conscious manipulation from unconscious selection or other explanations of model choice.
- Lower referee scores measure peer judgments of designs, not proven statistical bias. The exercise does not establish the true effect of immigration on welfare support.

## Related Concepts

- [[concepts/endogenous-research-design|Endogenous Research Design]]
- Many-analyst studies
- Specification curves and multiverse analysis
- Ideological bias in research
- Confounding and mediation

## Related Papers

- Breznau et al. (2022), "Observing many researchers using the same data and hypothesis reveals a hidden universe of uncertainty," PNAS 119, e2203150119. Source of the crowdsourced data and the interpretation reassessed here (reference 20).
- Brady and Finnigan (2014), "Does immigration undermine public support for social policy?" American Sociological Review 79, 17-42. Initial null result reproduced by participating teams (reference 27).
- Saltelli et al. (2025), "Global sensitivity analysis unveils the hidden universe of uncertainty in multiverse studies." Cited for the importance of interactions among specification choices (reference 32).

Published in *Science Advances* 12(1), eadz7173, on 1 January 2026. [Article](https://doi.org/10.1126/sciadv.adz7173). The paper provides [data and code](https://doi.org/10.5281/zenodo.17083885) and a [workflow repository](https://github.com/nbreznau/ideology_specification).

[[index|Library home]]
