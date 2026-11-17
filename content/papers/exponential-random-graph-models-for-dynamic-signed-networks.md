---
title: "Exponential Random Graph Models for Dynamic Signed Networks: An Application to International Relations"
type: paper
authors:
  - Cornelius Fritz
  - Marius Mehrl
  - Paul W. Thurner
  - Göran Kauermann
year: 2025
doi: "10.1017/pan.2024.21"
source_job_id: "40829b78-cd18-43ff-ac33-cdc07b603d55"
tags:
  - signed-networks
  - network-inference
  - international-relations
---

## TL;DR

The signed exponential random graph model (SERGM) jointly models positive, negative, and absent ties while allowing contemporaneous network dependence and temporal persistence. Applied to interstate cooperation and conflict in 2000–2010, its endogenous balance specification has an AIC 334.282 lower than a specification using lagged common-friend and common-enemy measures. Results support balanced closure but also show significant tendencies toward unbalanced closure, suggesting that opportunities for interaction matter alongside balance.

## Research Question

How can structural balance be tested in evolving signed networks without assuming independent dyads or measuring a triangle using ties observed in different years?

## Motivation

Balance theory makes ties interdependent. Combining two lagged ties with one current tie can label a configuration imbalanced even when both actual annual triangles are balanced. Separate positive and negative network layers also do not inherently enforce mutually exclusive tie states.

## Contributions

- A signed ERGM for static and first-order Markov dynamic networks.
- Geometrically weighted shared-friend and shared-enemy statistics for endogenous balance mechanisms.
- Simulation-based likelihood estimation, uncertainty quantification, model comparison, and an R implementation, `ergm.sign`.
- An empirical comparison showing that contemporaneous versus lagged operationalization changes substantive conclusions.

## Method

For an undirected network without self-loops, each dyad takes one of three states: positive, negative, or absent. The dynamic distribution is

$$
P_\theta(Y_t=y_t\mid Y_{t-1}=y_{t-1})=
\frac{\exp\{\theta^\top s(y_t,y_{t-1})\}}{\kappa(\theta,y_{t-1})}.
$$

Statistics include signed edge counts, persistence, degrees, isolates, exogenous covariates, and contemporaneous triadic closure. Four geometrically weighted terms distinguish positive and negative focal edges with shared friends or shared enemies. Diminishing increments reduce the degeneracy problems associated with raw triangle counts. Conditional log odds relative to an absent edge equal the coefficient vector multiplied by the corresponding change statistics; these are conditional associations rather than causal effects.

Estimation uses Gibbs sampling to approximate likelihood ratios, with pseudolikelihood initialization and a modified partial-stepping algorithm. Uncertainty combines estimated sampling variance and MCMC error. Bridge sampling supports AIC comparison (Sections 2–3).

## Experiments

Positive ties indicate active defense cooperation agreements; negative ties indicate militarized interstate disputes. When both occur in a year, the primary coding assigns a positive tie; the authors report little substantive change under negative coding. Conditioning on 2000 gives modeled transitions for 2001–2010. Controls include political differences, military capability ratios, wealth differences, and distance.

Model 1 uses contemporaneous triadic statistics. Model 2 replaces these with lagged common-friend and common-enemy counts while retaining other endogenous terms. Thus Model 2 is not a wholly independent-dyad baseline.

| Model 1 term | Coefficient | Reported confidence interval |
| --- | ---: | --- |
| Positive edge, shared enemies | 0.618 | [0.308, 0.928] |
| Negative edge, shared enemies | 0.514 | [0.200, 0.828] |
| Positive edge, shared friends | 0.489 | [0.415, 0.563] |
| Negative edge, shared friends | 0.318 | [0.175, 0.461] |

Table 1 reports Model 2's AIC as 334.282 above Model 1. Shared friends and enemies favor cooperation, but all four closure coefficients are positive. All-negative triangles are compatible with weak balance; a negative edge between actors sharing friends remains inconsistent with strict balance. The authors interpret these findings partly through variation in dyadic reachability. Raw coefficients across the two specifications have different statistic scales and should not be read as standardized effect comparisons.

Simulation-based goodness-of-fit plots for 2010 reproduce observed degree and shared-partner distributions reasonably well. These are in-sample topology checks, not held-out forecasting results. The main text reports a supplementary simulation study and a cross-sectional tribal-network application; their detailed results are not included in the supplied Markdown.

## Limitations

The application concerns one historical period and particular operationalizations of cooperation and conflict. Annual aggregation forces overlapping cooperation and conflict into one state. Homogeneous network mechanisms may impose dependence across actors with very different opportunities to interact. Local dependence, actor heterogeneity, continuous signed ties, and separate transition processes are proposed extensions. Positive unbalanced-closure terms preclude interpreting the findings as universal structural balance, and the observational model does not identify causal effects.

## Related Concepts

- [[concepts/signed-political-networks|Signed Political Networks]]: SERGM provides inferential tools for mutually exclusive signed relations and their evolution.

## Related Papers

- [[papers/multiple-partitioning-of-multiplex-signed-networks-application-to-european-parliament-votes|Multiple Partitioning of Multiplex Signed Networks: Application to European Parliament Votes]]: cited political application of signed networks; recovers voting configurations rather than estimating tie-formation mechanisms.
- Maoz et al. (2007), “What Is the Enemy of My Enemy?”: motivates the lagged balance comparison.
- Lerner (2016), “Structural Balance in Signed Networks: Separating the Probability to Interact From the Tendency to Fight”: motivates separating interaction opportunities from sign conditional on interaction.

Replication materials, including `ergm.sign`: https://doi.org/10.7910/DVN/7ZRCS6.
