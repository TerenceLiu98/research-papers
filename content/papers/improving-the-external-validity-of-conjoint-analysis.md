---
title: "Improving the External Validity of Conjoint Analysis: The Essential Role of Profile Distribution"
type: paper
authors:
  - Brandon de la Cuesta
  - Naoki Egami
  - Kosuke Imai
year: 2022
doi: "10.1017/pan.2020.40"
source_job_id: "19fde2be-bbd1-4959-9925-432ea70b83ef"
tags:
  - conjoint-experiments
  - external-validity
  - causal-inference
---

## TL;DR

Conjoint effects depend on the distribution over which other attributes are averaged. The paper defines the [[concepts/population-average-marginal-component-effect|population average marginal component effect]] (pAMCE), develops designs and estimators for substantive target distributions, and shows how changing that distribution can alter conclusions about candidate gender and copartisanship.

## Research Question

How should conjoint experiments estimate attribute effects for a real-world or theoretically motivated profile population rather than an arbitrary uniform distribution?

## Motivation

The authors' review finds that 88% of examined political-science conjoint articles use uniform randomization. Removing a few implausible combinations does not make the remaining profile frequencies realistic. Distributional differences matter when the focal attribute interacts with other attributes, including competing profiles. This concerns treatment profiles, separately from respondent representativeness.

## Contributions

- Defines uniform and population AMCEs and characterizes their difference through causal interactions and distributional differences.
- Introduces joint population, marginal population, and mixed randomization designs.
- Provides weighted estimation, effective-sample-size comparisons, exploratory interaction modeling, and a decomposition of distribution-induced effect changes.
- Demonstrates real-world and counterfactual target distributions in two political-candidate applications.

## Method

Let z collect other attributes in the focal profile and attributes of competing profiles. The target effect averages the expected contrast between focal levels over a chosen distribution of z. A uniform AMCE and a pAMCE can coincide despite distributional differences when the focal contrast does not vary across z (Section 3).

Joint population randomization draws profiles from the target joint distribution. Its estimator uses inverse conditional assignment probabilities. More generally, the normalized weighted difference in means combines inverse conditional assignment probabilities with a target-to-design density ratio for other attributes (Equations 5–6).

Marginal population randomization independently draws each attribute from its target marginal. A simple difference in means consistently estimates the pAMCE under the absence of three-way or higher-order interactions. Mixed randomization assigns focal factors uniformly and control factors according to their target distribution; the general weighted estimator applies. Effective sample size helps compare designs before fielding.

For existing data, the exploratory estimator fits a two-way interaction probability model and averages coefficients using target marginals. Generalized-lasso fusion collapses similar attribute levels; cross-fitting separates level selection from estimation, and respondent block bootstraps repeat the procedure. Selected three-way interactions provide model diagnostics. Under the interaction model, changes in the AMCE can be decomposed by attribute (Section 4).

## Experiments

**Candidate gender.** Ono and Burden's experiment has 1,583 respondents completing ten paired choices with thirteen attributes. The target distributions describe Republican and Democratic legislators in the 115th Congress; twelve attributes are measured, while the subjective Trait attribute remains uniform.

The design-based comparison is a simulation using a fitted two-way interaction model as its data-generating process, repeated 100 times—not a newly fielded experiment. For congressional candidates, mixed-design simulations estimate a female disadvantage of 1.98 percentage points for Republican profiles and an advantage of 5.69 points for Democratic profiles, compared with a uniform estimate of −0.09 points. Presidential estimates change little across distributions.

The model-based reanalysis has larger uncertainty. Pooling offices, estimates are −2.87 points for Republican profiles (95% interval [−6.39, 0.63]) and 2.84 for Democratic profiles ([−0.20, 5.87]). For congressional Democratic profiles, the model-based pAMCE is 6.17 points; less than 20% of its difference from the uniform estimate is attributed to Party alone. Selected higher-order interaction checks and alternative candidate distributions yield similar conclusions as reported in Section 5.1.

**Information and copartisanship.** Reanalysis of Peterson's study contrasts environments showing each nonparty attribute with probabilities 0.2 and 0.8. Model-based copartisanship estimates decline from 61.87 points ([57.34, 66.40]) to 38.21 ([33.69, 42.73]). Spending and abortion information account for estimated reductions of 7.60 and 10.77 points respectively. These findings support sensitivity analysis over theoretically relevant information environments (Section 5.2).

## Limitations

Target distributions require substantive justification and usable attribute data. Elected legislators are an imperfect substitute for all candidates. Marginal designs and the two-way exploratory model rely on restrictions on higher-order interactions; diagnostic checks do not establish their universal absence. Post hoc adjustment can substantially reduce precision. The design-based simulation's performance is conditional on its fitted data-generating model. Profile representativeness does not resolve respondent selection or establish that survey choices reproduce real voting behavior.

## Related Concepts

- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: makes the target profile distribution part of the causal estimand.
- [[concepts/generalizability-of-survey-experiments|Generalizability of Survey Experiments]]: addresses the complementary respondent-population dimension.
- [[concepts/individual-marginal-component-effects|Individual Marginal Component Effects]]: changes the respondent aggregation level, rather than the target profile distribution.

## Related Papers

- [[papers/odd-profiles-in-conjoint-experimental-designs|Odd Profiles in Conjoint Experimental Designs]]: studies behavioral responses to unusual profiles; the present paper concerns distribution-dependent estimands even without such behavioral disruption.
- Hainmueller, Hopkins, and Yamamoto (2014), “Causal Inference in Conjoint Analysis”: supplies the AMCE framework extended here.
- Egami and Imai (2019), “Causal Interaction in Factorial Experiments”: supplies the interaction and regularization framework.

Published in *Political Analysis* 30:19–45 (2022), online 14 January 2021. [Article](https://doi.org/10.1017/pan.2020.40). [Replication data](https://doi.org/10.7910/DVN/HVY5GR).
