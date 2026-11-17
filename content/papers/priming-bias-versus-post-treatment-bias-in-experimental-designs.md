---
title: Priming Bias Versus Post-Treatment Bias in Experimental Designs
type: paper
authors:
  - Matthew Blackwell
  - Jacob R. Brown
  - Sophie Hill
  - Kosuke Imai
  - Teppei Yamamoto
year: 2025
doi: 10.1017/pan.2025.3
tags:
  - causal-inference
  - experimental-design
  - sensitivity-analysis
---

## TL;DR

Measuring a moderator before treatment can prime outcomes; measuring it afterward can change the groups being compared. The paper derives sharp bounds for unprimed treatment-effect heterogeneity under pre-test, post-test, and randomized placement designs. Randomization alone does not identify the sign of the interaction; substantive restrictions and sensitivity analysis show what stronger conclusions require.

## Research Question

What can survey experiments identify about treatment-effect heterogeneity when measuring the moderator can itself change outcomes, while treatment can change the measured moderator?

## Motivation

A land-insecurity question may make land grievances salient before a campaign speech, whereas asking it afterward may record insecurity altered by the speech. Either timing can therefore compromise the intended interaction estimate, even with randomized treatment.

## Contributions

- Sharp nonparametric bounds distinguish what each measurement design identifies from assumptions about measurement effects.
- Priming monotonicity, moderator monotonicity, and moderator stability under control can narrow those bounds.
- Sensitivity parameters limit the fractions of respondents whose outcomes or moderators change with measurement placement.
- An electoral-messaging reanalysis demonstrates that apparently large interactions can remain fragile.

## Method

Let $M^*$ be the pre-treatment moderator and $Y^*(t)$ the outcome under treatment $t$ without pre-test priming. The targets are

$$
\tau(m)=\mathbb E[Y^*(1)-Y^*(0)\mid M^*=m],\qquad
\delta=\tau(1)-\tau(0).
$$

These are differences in treatment effects across baseline groups, not effects of intervening on the moderator. Treatment, moderator, and outcome are binary in the developed framework.

| Design | Information observed | Identification without further restrictions |
| --- | --- | --- |
| Pre-test | Baseline moderator, potentially primed outcome | Logical bounds only: $\tau(m)\in[-1,1]$, $\delta\in[-2,2]$ |
| Post-test | Unprimed outcome, potentially altered moderator | Interaction bounds cannot be narrower than $[-1,1]$; the unprimed overall ATE is identified |
| Randomized placement | Random assignment to either measurement order | Identifies baseline moderator prevalence and can tighten bounds, but not identify the interaction sign |

The analysis represents latent moderator responses by principal strata $(M(1),M(0),M^*)$ and optimizes over distributions compatible with observed data. Priming monotonicity constrains outcome changes to one direction; moderator monotonicity constrains post-test moderator changes to one direction; stability sets $M(0)=M^*$. Priming monotonicity alone still leaves pre-test bounds containing zero.

The parameter $\theta$ caps the probability of a priming-induced outcome change within each treatment and baseline-moderator combination. The parameter $\gamma$ caps the population fraction outside the always-stable moderator strata $111$ and $000$. The randomized placement design can impose both restrictions simultaneously. A small average change in the moderator does not establish individual stability: opposing changes may cancel.

Bounds are estimated by sample substitution or numerical optimization. Inference combines the Imbens–Manski approach with bootstrap standard errors; the paper reports conservative simulation coverage while acknowledging theoretical bootstrap difficulties from nondifferentiable bounds. A supplementary Bayesian approach incorporates baseline covariates.

## Experiments

The empirical application reanalyzes Horowitz and Klaus (2020), comparing generic campaign speeches with land-based appeals in Kenya’s Rift Valley, with randomized placement of land-security questions and a dichotomized candidate-support outcome (§§2, 6).

- Naïve interaction estimates suggest treatment effects 25–50 percentage points larger among land-insecure respondents; conventional significance is reached only in the combined pre/post sample in the displayed comparison.
- Randomization-only bounds do not establish a positive interaction. Additional monotonicity and stability assumptions tighten bounds, but confidence intervals can still include zero.
- In the post-test sensitivity analysis, the estimated lower bound crosses zero at $\gamma=0.07$. The 95% confidence interval already includes zero at the smallest data-compatible value, $0.02$.
- At $\gamma=0.12$, estimated bounds are $[-1.02,1.14]$, versus $[0.38,0.64]$ at the minimum—about eight times wider.
- Under priming monotonicity, the pre-test lower bound crosses zero near $\theta=0.20$; its confidence interval includes zero even at no priming.

These are reported empirical sensitivity results, not new computations performed for this page.

## Limitations

Individual-level monotonicity and stability require substantive justification and cannot be verified by insignificant average measurement effects. Randomized placement improves information without observing baseline moderators and unprimed outcomes together for the same unit. Small moderator subgroups produce substantial sampling uncertainty. The main framework is binary, and the supplied article describes rather than supplies the supplementary simulation details and Bayesian derivations. Parsed equations contain transcription artifacts, so the summary emphasizes definitions and interpretable results rather than reproducing lengthy bound formulas.

## Related Concepts

- [[concepts/randomized-moderator-placement|Randomized Moderator Placement]]: jointly studies measurement timing and treatment assignment.
- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: defines the heterogeneity target whose measurement assumptions are at issue.
- [[concepts/text-as-treatment|Text as Treatment]]: campaign messages are the interventions in the application.

## Related Papers

- Horowitz and Klaus (2020), “Can Politicians Exploit Ethnic Grievances? An Experimental Study of Land Appeals in Kenya”: source experiment.
- Montgomery, Nyhan, and Torres (2018), “How Conditioning on Posttreatment Variables Can Ruin Your Experiment and What to Do about It”: the post-treatment adjustment problem.
- [[papers/making-event-study-plots-honest|Making Event Study Plots Honest: A Functional Data Approach to Causal Inference]]: a related sensitivity-analysis approach for a different identification problem, departures from credible event-study assumptions.

Implementation: [prepost R package](https://github.com/mattblackwell/prepost). Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/JZ55TF).
