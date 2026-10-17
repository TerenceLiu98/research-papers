---
title: Measuring Party Ideological Distributions from Legislative Roll Calls
type: paper
authors:
  - Junjie Liu
  - Thomas Chadefaux
year: 2026
venue: Working Paper
source_job_id: "f6042403-85be-442a-93b1-5921e323107e"
tags:
  - ideal-point-estimation
  - political-methodology
  - legislative-behavior
  - item-response-theory
---

## TL;DR

Liu and Chadefaux estimate a party's joint ideological distribution across eight policy domains directly from members' complete voting records, integrating out individual positions with member-adaptive importance sampling. Simulations recover breadth ratios and cross-domain correlations with substantially less distortion than aggregation of estimated ideal points. In the 108th-118th U.S. Houses, the majority is narrower in nine of eleven Congresses, with a median average-variance ratio of 0.57. Cross-domain dependence improves held-out whole-record prediction in all three Congresses tested. These are distributions of revealed positions conditional on the agenda and a shared party response model.

## Research Question

Can roll calls identify both how widely party members disagree within policy domains and which positions the same members hold together across domains, without treating estimated individual ideal points as observed data?

## Motivation

Theories of party organization concern internal disagreement as well as average party positions. Two parties can have identical domain means and variances yet different cross-domain coalitions. Estimating individuals first can confound latent dispersion with estimation error, particularly with short records. [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]] makes the distribution itself the inferential target; retaining complete member records supplies information about its joint structure.

## Contributions

- Specifies party- and Congress-specific Gaussian means and unrestricted covariances over substantively assigned policy domains, with items shared across parties.
- Develops member-adaptive integration for marginal likelihood estimation and observed-information inference, checked against independent integration rules and repeated-sample coverage.
- Separates breadth recovery from the empirical value of dependence using simulation controls and held-out whole-member prediction against a product of unchanged domain marginals.
- Applies the estimates to House party breadth, agenda stages, continuing cohorts, and legislative access, and quantifies sensitivity to party-specific response slopes.

## Method

For party $g$ in Congress $t$, the working population law and response model are

$$
\theta_{it}\mid g\sim\mathcal N_K(m_{gt},\Omega_{gt}),\qquad
\Pr(Y_{ij,t}=1\mid\theta_{it})=\Phi(b_{jt}+a_{jt}\theta_{it,k(j)}).
$$

Each item loads on its prespecified domain $k(j)$; slopes and intercepts are shared across parties within a Congress. All observed responses of one member are multiplied before integrating:

$$
L_{it}=\int\prod_{j\in\mathcal J_{it}}p_{jt}(z)^{Y_{ij,t}}
[1-p_{jt}(z)]^{1-Y_{ij,t}}\,dF_{gt}(z).
$$

Maximizing the summed log likelihood with weak item penalties estimates party moments and items jointly. The formal estimand is an exchangeable superpopulation, interpreted as a smoothed representation of the included caucus. Population covariance describes heterogeneity between members, not uncertainty about one member's position (Sections 2-3).

Pooled coordinate means are zero and pooled total variances are one within each Congress; substantive reflections fix orientation. Breadth is $V_{gt}=\operatorname{tr}(\Omega_{gt})/K$, and the majority-minority comparison is $R_t^V=V_{Mt}/V_{mt}$. The geometric mean of coordinate variance ratios weights domains equally and cancels common coordinate rescalings. Correlations describe cross-domain alignment. Independent Congress normalizations do not establish a common absolute longitudinal scale.

The adaptive estimator finds each member's posterior mode and Laplace precision, then integrates with a heavy-tailed multivariate $t_5$ proposal mixed with the party distribution. Fitting uses 256 proposal nodes and 64 party nodes; proposals are rebuilt at every evaluation and gradients include their movement. Two starts are compared on an independent rule. Wald intervals use a hybrid observed-information calculation, projecting out exact null directions and checking sensitivity to numerical cutoffs and independent refits (Section 4; Supplement B).

The two-step comparator aggregates estimated personal positions. The product comparator removes off-diagonal covariance while preserving every fitted marginal, so it agrees with the joint model on single-response probabilities. A diagonal comparator instead refits all parameters subject to diagonal covariance. Holding out complete members tests the dependence that single-vote predictions cannot distinguish.

## Experiments

### Simulation Recovery

The main designs use eight domains, 226 majority and 196 minority members, unknown shared items, 8% randomly missing responses, and 4, 8, 16, or 32 items per domain, with 25 independent panels per setting. An oracle observes the true member positions (Section 5; Tables 1-2).

| Result | Reported evidence |
| --- | --- |
| True variance ratio 0.35 | Adaptive estimates range from 0.347 to 0.354; two-step estimates are 0.843 at four items and 0.367 at 32 items. |
| Breadth interval coverage | Averaged over the 0.35 and equal-breadth designs, nominal 95% coverage is 0.94, 0.94, 0.92, and 0.96 as item counts increase. |
| Covariance-only design | Adaptive correlation RMSE falls from 0.088 to 0.059; correlation interval coverage remains 0.94-0.95. |
| Fixed shared integration nodes | Correlation coverage falls to 0.29 at 32 items; equal-breadth false positives reach 0.75 in the covariance-only design. |

Bayesian NUTS fits of the same model broadly agree where sampling is reliable, but show prior sensitivity with short records and divergences or poor mixing with long records. The paper reports the adaptive route as approximately six to eight times faster in its comparison (Supplement B).

### House Application

The bank contains 3,255 substantive roll calls: 1,540 final dispositions and 1,715 amendments across the 108th-118th Houses. Its eight domains are Fiscal, Labor/Welfare, Finance, Health, Education, Environment/Energy, Migration, and Civil/Social Rights. Eligible members participate in at least 60% of selected decisions and vote in every domain, yielding 4,709 member-Congress records and 1,343,172 binary responses. Procedural actions are excluded, and non-yea/nay participation is missing (Section 6).

- **Breadth:** Nine of eleven majorities are narrower, with eight intervals below one. The median ratio is 0.57 versus 0.74 for two-step aggregation. The 110th and 111th majorities are broader in point estimate; the 111th interval's exclusion of one depends on the integration rule (Table 4).
- **Dependence:** Leading correlation-matrix eigenvalues account for 63-94% of the trace. Breadth and alignment vary separately; individual correlations involving almost-zero variances can be unstable (Table 5).
- **Prediction:** Party-stratified three-fold whole-member holdouts in the 108th, 113th, and 118th Houses favor the joint model over product, diagonal, and two-step comparators. Relative to the product model, whole-record negative log loss per response falls by 3.5-9.5%, with all difference intervals excluding zero. This is a log-loss improvement, not vote-classification accuracy (Table 6).
- **Agenda stages:** Majorities are narrower in all nine estimable final-disposition panels, with median ratio 0.35 and all intervals below one. They are narrower in four of eight amendment panels, whose median ratio is 1.08 (Table 8).
- **Continuing members:** All four cohorts entering majority status narrow relative to the opposing continuing cohort on the domain-relative measure. Three narrow in absolute average variance in their respective panel units. These comparisons are descriptive (Table 9).

### Legislative Access

On a common historical sample of 49,305 bills, the majority-by-minority spread interaction is -0.126 with direct measures, -0.169 with archived W-NOMINATE measures, and -0.005 with two-step measures. The direct-minus-two-step difference is imprecise: -0.121, 95% interval [-0.485, 0.299], with only 36 topic-period cells supplying spread variation. The paired bootstrap holds estimated spreads fixed. In the contemporary 25,435-bill sample across 59 cells, the interaction is 0.146 [-0.05, 0.35], and the majority-spread coefficient is 0.176 [-0.10, 0.45]. Periods, domains, and controls differ between applications (Section 8; Supplement F).

## Limitations

- **Response invariance:** Uniformly multiplying majority slopes by $c$ multiplies fitted domain variance ratios by $c^2$ under shared items. For narrower majorities with numerically stable domain-ratio intervals, multipliers of 0.58-0.79 would equalize latent breadth. Roll calls alone cannot separate this mechanism from preference homogeneity or discipline (Section 7.4).
- **Working distribution:** Gaussian moments omit skewness and multimodality. Skewed simulation populations produce substantial understatement of relative breadth, with Gaussian mean ratios of about 0.12-0.21 against truth 0.35 (Supplement C.4).
- **Numerical uncertainty:** The 111th and 114th average-variance intervals are rule-sensitive; domain-ratio intervals in the 111th, 114th, and 117th are unstable. Seven Migration correlations for 111th Republicans change sign across rules. Stable point estimates do not establish stable intervals (Supplement E).
- **Finite evidence:** Twenty-five simulation panels per cell leave appreciable Monte Carlo uncertainty. Equal-breadth false positives reach 0.12 with short records. Predictive intervals resample held-out members conditional on fitted training models, excluding training-estimation uncertainty.
- **Scope:** Results concern included legislators on selected floor agendas, not party voters or preferences purged of strategic behavior. Agenda-stage and majority-transition comparisons do not identify causal effects of majority status. Historical downstream uncertainty does not establish a difference between measurement procedures.

## Related Concepts

- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: direct inference for group moments with individual positions integrated out.
- [[concepts/item-response-theory|Item Response Theory]]: the shared probit measurement model.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: substantively defined domains can reveal different positions for the same legislator.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: the observed agenda conditions measured heterogeneity.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: strong domain covariance can concentrate a distribution near a lower-dimensional subspace.

## Related Papers

- [[papers/estimating-voter-preference-distributions-from-individual-level-voting-data|Estimating Voter Preference Distributions from Individual-Level Voting Data]]: Lewis's marginal likelihood approach is the direct group-distribution foundation.
- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: supplies the cited multidomain measurement context; the present target is a party covariance rather than individual domain-sharing partitions.
- [[papers/dynamic-estimation-of-latent-opinion-using-a-hierarchical-group-level-irt-model|Dynamic Estimation of Latent Opinion Using a Hierarchical Group-Level IRT Model]]: cited group-level measurement with hierarchical and temporal pooling.
- [[papers/measuring-and-comparing-party-ideology-and-heterogeneity|Measuring and comparing party ideology and heterogeneity]]: motivates treating within-party heterogeneity as a substantive quantity.
- [[papers/minority-party-capacity-in-congress|Minority Party Capacity in Congress]]: supplies the historical legislative-access specification used to compare alternative spread measures.

[[index|Library home]]
