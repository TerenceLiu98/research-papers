---
title: Spillover Effects in the Presence of Unobserved Networks
type: paper
authors:
  - Naoki Egami
year: 2021
doi: 10.1017/pan.2020.28
tags:
  - causal-inference
  - network-experiments
  - sensitivity-analysis
---

## TL;DR

Randomizing treatment does not generally identify spillovers attributable to a particular network when other relevant networks are unobserved. Egami derives the resulting bias and develops two-parameter sensitivity analyses: an interpretable additive correction and more general, but wider, nonparametric bounds.

## Research Question

How can researchers estimate the causal contribution of an observed network when treatment also propagates through unmeasured networks?

## Motivation

Online contacts, face-to-face friends, kinship ties, and financial discussion networks can overlap. A treatment contrast based on observed neighbors can therefore change exposure through several channels simultaneously. Detecting a total spillover does not establish which network carries it.

## Contributions

- Defines the average network-specific spillover effect (ANSE) in a multiple-network potential-outcomes framework.
- Derives design-based weighting estimators when all relevant networks are observed and an exact bias expression when some are omitted.
- Develops parametric corrections and nonparametric bounds and illustrates their different robustness–precision tradeoffs.

## Method

Under stratified interference, potential outcomes are represented by $Y_i(d,g,u)$: own treatment and the treated proportions of neighbors in observed and unobserved networks. The ANSE averages $Y_i(d,g^H,u)-Y_i(d,g^L,u)$ over units and over the distribution of $u$ conditional on $d,g^L$. Thus the contrast holds other-network exposure constant before averaging. Appropriate common support is required.

With all relevant networks observed, inverse probability weights adjust both observed exposure probabilities and the distribution of other-network exposure. Omitting the latter adjustment creates bias determined by unobserved-network outcome effects and changes in the conditional distribution of that exposure between $g^H$ and $g^L$. Shared neighbors induce exposure dependence even under randomized treatment and independently generated networks.

Under the paper's linear additive assumption for unobserved-network effects, the simplified bias is

$$\operatorname{Bias}\approx\lambda\pi_{GU}(g^H-g^L).$$

Here $\lambda$ is the unobserved-network effect slope and $\pi_{GU}$ averages the fraction of unobserved-network neighbors also in the observed network. This expression is exact under Bernoulli assignment; under complete randomization its sparse-network approximation has a finite-population correction (Appendix C.3).

The nonparametric analysis retains the exposure framework but replaces linear additivity with nonnegative outcomes and sensitivity parameters bounding outcome mean ratios $MR_{UY}$ and conditional exposure probability ratios $RR_{GU}$. Set

$$B=\frac{RR_{GU}MR_{UY}}{RR_{GU}+MR_{UY}-1}.$$

Writing $m_H$ and $m_L$ for expectations of the partially weighted outcome means, the ANSE lies between $m_H/B-Bm_L$ and $Bm_H-m_L/B$. These are population bounds; sampling uncertainty must be assessed separately. The method accommodates a vector of exposures from multiple unobserved networks.

## Experiments

**Twitter-based simulation (Section 5).** A preprocessed observed network contains 2,430 users with mean outdegree 18.5. The study varies overlap with a simulated offline network over 0, 0.2, 0.4, and 0.6, uses Bernoulli assignment with probability 0.5, and runs 2,000 Monte Carlo simulations. The target contrasts exposures 0.6 and 0.4 among untreated units. Ignoring the offline network produces increasing bias with overlap. Parametric correction approximately removes bias under linear additivity but remains biased under interactions. Nonparametric bounds cover the target under both models, with substantially wider intervals.

**Rural China reanalysis (Section 6).** Cai, de Janvry, and Sadoulet's insurance-information experiment provides a financial discussion network potentially overlapping unobserved kinship ties. Of 1,317 second-round households, the analysis uses 1,207 listing five contacts. The target compares exposure 0.2 against zero among households receiving the simple session. The estimate ignoring omitted networks is 8.87 percentage points (95% CI: 3.31–14.42).

Across nine parametric scenarios, the confidence interval includes zero only at the strongest tested combination, $\lambda=0.4$ and $\pi_{GU}=0.6$. In the nonparametric scenarios, all reported 95% confidence intervals are inconclusive about the sign, even though some population-bound estimates have positive lower endpoints. This contrast can reflect violations of additivity, reduced statistical power, or both; it does not establish a zero effect.

## Limitations

Stratified interference excludes differences among neighbors that are not captured by network-specific exposure proportions. Identification also requires suitable exposure support. Weighted regression can improve precision but introduces functional-form assumptions beyond design-based weighting. Nonparametric bounds can be wide and are not invariant to shifting the outcome's origin. Sensitivity parameters describe assumptions about unobserved networks rather than quantities identified from the observed network alone. These are reported analyses, not a replication.

## Related Concepts

- [[concepts/network-specific-spillover-effects|Network-Specific Spillover Effects]]: separates channel-specific attribution from total spillovers.
- [[concepts/bayesian-sensitivity-analysis|Bayesian Sensitivity Analysis]]: a complementary approach that places distributions on sensitivity parameters rather than reporting fixed scenarios and bounds.

## Related Papers

- [[papers/bias-from-network-misspecification-under-spatial-dependence|Bias from Network Misspecification Under Spatial Dependence]]: studies erroneous spatial weights and regression bias; Egami instead studies attribution across omitted network channels in experiments.
- Cai, de Janvry, and Sadoulet (2015), “Social Networks and the Decision to Insure”: source of the field experiment reanalyzed here.
- Aronow and Samii (2017), “Estimating Average Causal Effects Under General Interference, with Application to a Social Network Experiment”: exposure-mapping and design-based estimation foundation.
- Ding and VanderWeele (2016), “Sensitivity Analysis Without Assumptions”: foundation for the ratio-based sensitivity bounds.

Published in *Political Analysis* 29:287–316 (2021), online November 18, 2020. [DOI](https://doi.org/10.1017/pan.2020.28). [Replication materials](https://doi.org/10.7910/DVN/G63OG9).
