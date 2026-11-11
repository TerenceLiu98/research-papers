---
title: "The Chameleon Dynamics: How Personalised Generation Reshapes Online Polarisation"
type: paper
authors:
  - Anonymous Author(s)
year: null
tags:
  - political-polarization
  - generative-personalization
  - opinion-dynamics
  - measurement
---

## TL;DR

Recipient-conditioned generation can either hide or amplify the dispersion of underlying positions. This manuscript separates selection and historical aggregation from rewriting effects, derives an exact variance criterion, and tests a synthetic opinion model on observed Reddit and Bluesky interaction streams. Controlled networks exhibit masking; stream replays predominantly exhibit amplification. A separate generation audit finds sharply different source-preservation rates across two generators.

## Research Question

When does dispersion in audience-tailored messages represent dispersion in underlying positions, and how do audience structure and cross-audience comparability change that relationship?

## Motivation

Personalized selection changes who receives an existing message. Personalized generation changes the message itself. Consequently, text-based measures of [[Political Polarization]] depend on the communication channel as well as on speakers' positions. Comparing variants across audiences can constrain this distortion.

## Contributions

- An observation-wedge decomposition separating selection/aggregation from recipient-conditioned rewriting.
- A covariance–variance identity characterizing masking and amplification.
- Controlled simulations and chronological network replays with temporal and structural nulls.
- A dual-judge audit separating audience adaptation from substantive source fidelity.

## Method

A sender with latent position $x_i$ produces $y_{i\to j}=x_i+a_i^*(\mu_j-x_i)$ for recipient frame $\mu_j$. Adaptation minimizes a convex cost balancing audience mismatch, adaptation effort, and accountability for divergent variants. Greater generative capacity lowers effort costs; greater publicness increases accountability costs. Latent states also evolve through predisposition, social coupling, and mismatch reduction.

Let $P_L$ be current latent-state standard deviation across all endpoint nodes, $P_L^{obs}$ the standard deviation of cumulative latent histories across active senders, and $P_O$ the analogous dispersion of generated expressions. Then

$$
W_{total}=P_L-P_O=(P_L-P_L^{obs})+(P_L^{obs}-P_O).
$$

The first term includes both active-sender selection and historical aggregation; the second is the personalization wedge. Senders receive equal weight after within-sender averaging. For $\delta=\bar y-\bar x$,

$$
\operatorname{Var}(\bar y)-\operatorname{Var}(\bar x)
=2\operatorname{Cov}(\bar x,\delta)+\operatorname{Var}(\delta).
$$

A positive right-hand side implies amplification and a negative personalization wedge; a negative value implies masking. At zero generative capacity, rewriting distortion vanishes even if selection distortion remains. See [[Recipient-Conditioned Observation Channels]].

## Experiments

**Controlled simulations:** 540 runs across Erdős–Rényi, Watts–Strogatz, and Barabási–Albert networks, with 500 nodes and six replicates per condition. At capacity .8 and baseline publicness zero, latent dispersion is approximately .443–.445 and observed dispersion .156–.176, producing masking wedges around .270–.287.

**Observed interaction schedules:** Reddit supplies 858,488 events over 67,180 subreddit endpoints; Bluesky supplies 150,526,295 interpersonal events over 1,835,989 users. These schedules drive synthetic latent dynamics, with three common-random-number replicates per grid condition.

| Replay result | Reported personalization wedge |
| --- | --- |
| Reddit unsigned, capacity .8, publicness 0 | −.1884 (SE .0056) |
| Reddit unsigned, capacity .8, publicness .9 | −.0703 (SE .0028) |
| Bluesky all, capacity .8, publicness 0 | −.08354 (SE .00129) |
| Bluesky all, capacity .8, publicness .9 | −.0132 |

All 20 nonzero-capacity Reddit conditions amplify. Bluesky amplifies in 14 of 20 nonzero conditions; six mask. Signs agree across all three replicates. Within-month order shuffling produces no regime flips. Activity-preserving rewiring changes outcomes more substantially; preserving Leiden community mixing partially restores observed trajectories. These comparisons implicate dyadic and mesoscopic organization within the model.

**Generation audit:** Six audience contexts, 16 substantive anchors, two generators, and two generations per cell produce 384 free-form and 384 constrained outputs. GPT-5.6 Sol and GLM-5.3 independently judge constrained rewrites using a fixed substantive-preservation rubric.

| Generator | Consensus preservation | Consensus drift | Judge disagreement |
| --- | --- | --- | --- |
| GPT-5.6 Luna | 188/192 (97.92%) | 1/192 (0.52%) | 3/192 (1.56%) |
| DeepSeek-V4-Flash | 57/192 (29.69%) | 60/192 (31.25%) | 75/192 (39.06%) |

Overall judge agreement is 79.69%, with Cohen's $\kappa=.4878$. Audience-alignment embeddings are an adaptation diagnostic, separate from semantic fidelity.

## Limitations

Polarization means scalar dispersion here, not affective hostility, bimodality, or ideological sorting. Replays do not estimate actual platform ideology, persuasion, deployment prevalence, or causal effects of generative mediation. Model parameters are synthetic, and three replicates give limited precision near regime boundaries. Reddit and Bluesky have different node units. The two-model, two-judge audit does not establish external semantic ground truth.

**Source inconsistencies:** The abstract interprets nearly 40% of rewrites as strategic ambiguity, whereas Section 5.5 and Appendix A.9 identify DeepSeek's 39.06% as judge disagreement; neither judge assigns the ambiguous label in the constrained audit. Section 5.2 says the variance-change and personalization-wedge signs match, but Equations 13–16 and Corollary 1 imply opposite signs. This summary follows the explicit definitions and detailed accounting. The supplied anonymous manuscript states no publication year or stable paper identifier.

## Related Concepts

- [[Recipient-Conditioned Observation Channels]]
- [[Political Polarization]]
- [[Opinion Dynamics]]

## Related Papers

- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]] — a related library model separating online and offline opinion states; its mechanism is cross-layer reconciliation rather than recipient-conditioned rewriting.
- Ye et al. (2019), “An Influence Network Model to Study Discrepancies in Expressed and Private Opinions” — cited by the manuscript as background on private–expressed divergence.

[[index|Library home]]
