---
title: "The Dynamics of Legislative Gridlock, 1947-96"
type: paper
authors:
  - Sarah A. Binder
year: null
tags:
  - legislative-politics
  - political-measurement
  - bicameralism
  - political-polarization
---

## TL;DR

Binder measures congressional gridlock as the fraction of salient policy agenda items that fail to become law, using New York Times editorials to reconstruct agendas for 1947-1996. In the main observational model, divided government, greater House-Senate ideological distance, and fewer moderate legislators are associated with more gridlock. Bicameral distance has the largest simulated probability change among the specified comparisons; filibuster threat and budgetary conditions are not statistically significant. The central contribution is to evaluate legislative performance relative to the agenda facing government, rather than by enactment counts alone.

## Research Question

How do partisan control, the distribution of legislative preferences, bicameral disagreement, supermajority constraints, and the policy environment explain variation in the share of salient issues left unresolved by Congress and the president?

## Motivation

Equal numbers of landmark laws can coexist with unequal levels of [[legislative-gridlock|Legislative Gridlock]] if Congress faces different agendas. Binder revisits Mayhew's finding that divided government does not reduce landmark enactments by constructing a denominator of potential enactments. She also argues that conflict within Congress, especially between its chambers, deserves explicit treatment alongside conflict between Congress and the president.

## Contributions

- Constructs agendas for 25 Congresses from 1947 through 1996, covering 2,899 issue-Congress observations before the salience filter.
- Defines gridlock as unresolved salient agenda items divided by all salient agenda items in a Congress.
- Tests eight hypotheses spanning partisan control, moderation, ideological heterogeneity, new-majority incentives, bicameral distance, filibuster threat, fiscal conditions, and public mood.
- Demonstrates that models of failed agenda items and models of landmark enactment counts can produce different conclusions about divided government.

## Method

Nearly 15,000 unsigned New York Times editorials were collected and coded for legislative issues. The agenda includes proposals the newspaper opposed as well as those it supported. Intern-coded editorials were independently checked; reported intercoder reliability averaged 87%, with disagreements adjudicated. Legislative outcomes were established primarily from Congressional Quarterly Almanac and supplemented with other legislative records and reporting.

The main analysis retains issues receiving at least four editorials. Each Congress then has 16-39 salient items, of which 6-16 failed. Routine appropriations, nominations, internal congressional procedures, and foreign aid appropriations without major statutory change are excluded; treaties and constitutional amendments are included. Substantial compromise could count as success when elite assessments supported that coding.

For Congress $t$, the measure is:

$$
G_t = \frac{\text{salient agenda items not enacted in Congress }t}{\text{all salient agenda items in Congress }t}.
$$

First-dimension W-NOMINATE scores supply ideological measures. Bicameral distance is the absolute difference between chamber medians. Moderates are legislators closer to the midpoint between party medians than to their own party median; the model averages the House and Senate percentages. Ideological heterogeneity is the mean of the chambers' score standard deviations. Filibuster threat combines filibuster frequency with the distance from the Senate median to the farther filibuster pivot.

Other predictors are divided government, the average number of Congresses a new House-Senate majority spent out of power, the budget surplus or deficit relative to outlays, and public support for activist government lagged by one Congress. Binder estimates a grouped logit using weighted least squares to account for unequal agenda sizes. Availability of lagged public mood restricts the main model to 22 Congresses, 1953-1996.

## Experiments

These are historical observational analyses and measurement checks, not randomized experiments.

### Main Results

Table 3 reports adjusted $R^2 = .5413$. Significance tests are one-tailed. The following are changes in predicted probability, expressed in percentage points, for the paper's specified covariate changes; they are not causal effects.

| Predictor change | Predicted gridlock change | Reported significance |
| --- | ---: | --- |
| Unified to divided government | +8 points | $p < .05$ |
| Moderates: 18.47% to 33.67% | -10 points | $p < .05$ |
| Ideological diversity: .47 to .55 | +11 points | $p < .05$ |
| Time out of majority: 0 to 2 Congresses | -9 points | $p < .01$ |
| Bicameral distance: .07 to .30 | +13 points | $p < .01$ |
| Filibuster threat: 0 to 7.5 | +6 points | Not significant |
| Budgetary situation: -19.02 to -2.09 | -2 points | Not significant |
| Lagged public mood: 55.76 to 65.20 | -8 points | $p < .05$ |

Continuous-variable comparisons span one standard deviation below to one above the mean. Predictions hold other variables at their means and assume divided government where applicable. The filibuster null does not establish that supermajority rules have no consequences.

### Measurement and Robustness

- The 89th and 93rd Congresses each passed 22 landmark laws in Mayhew's count, but Binder reports gridlock of 29% and 43%, respectively, illustrating why the agenda denominator changes the assessment.
- Replacing lagged public mood with an activist-era indicator allows all 25 Congresses into the model. Divided government and bicameral distance remain significant, while moderation and ideological diversity do not (Table 4).
- Distinguishing forms of divided control yields a significant coefficient for one party controlling Congress against the other party's president, but not for split House-Senate control. The latter category contains only three Congresses.
- At a one-editorial threshold, divided government and bicameral distance remain significant, but several other main-model predictors do not. At five editorials, the reported significance pattern is closer to the main model, except for ideological heterogeneity (Appendix B).
- Substituting Mayhew's landmark-law count as the outcome reproduces the null association with divided government (Appendix A).

## Limitations

- A single newspaper captures an elite agenda. Including both supported and opposed proposals does not remove all potential selection bias in which issues receive attention.
- The four-editorial cutoff was selected partly to align with Mayhew's counts and maximize outcome variation. It excludes 30% of Mayhew's landmark laws, and several findings depend on the cutoff.
- The main model has only 22 aggregate observations and eight predictors. Observational associations and simulated probabilities do not isolate causal institutional effects.
- Partial legislative responses require judgment, and the exclusions limit which forms of governmental action the measure represents. An unresolved issue is not by itself evidence that enacting the proposal would improve welfare.
- Several footnote markers lack accompanying footnote text in the supplied Markdown. Its prose also contains inconsistent hypothesis numbering and an interchamber-distance maximum claim inconsistent with Table 2. This summary relies on the explicit definitions and Table 3 for the main results.
- The supplied text does not explicitly identify the article's publication year or DOI; `year` is left null rather than inferred from its study period or references.

## Related Concepts

- [[legislative-gridlock|Legislative Gridlock]]: aggregate failure to resolve salient agenda items.
- [[political-polarization|Political Polarization]]: measured here through the scarcity of ideological moderates, distinct from affective hostility.
- [[legislative-effectiveness|Legislative Effectiveness]]: individual legislative advancement is a different level of analysis from system-wide agenda resolution.

## Related Papers

- Mayhew (1991), *Divided We Govern*: the central comparison concerning landmark enactments and divided government.
- Krehbiel (1998), *Pivotal Politics*, and Brady and Volden (1998), *Revolving Gridlock*: supermajority-centered accounts discussed by Binder.
- Tsebelis and Money (1997), *Bicameralism*: a theoretical basis for considering interchamber constraints.
- [[legislative-effectiveness-in-the-american-states|Legislative Effectiveness in the American States]]: a library comparison on measuring lawmaking performance at the individual rather than system level; not a citation in Binder's article.

[[index|Library home]]
