---
title: "Hyperbolic Latent Position Models for Hierarchical Bipartite Data"
type: paper
authors:
  - Kisung You
year: 2026
source_job_id: "09d2bf37-4de7-47d3-b5e2-ddda6d74e622"
tags:
  - hyperbolic-geometry
  - bipartite-networks
  - latent-variable-models
  - identifiability
  - variational-inference
---

## TL;DR

HELPI models binary bipartite interactions using hyperbolic positions plus row and column effects. Its central result is that unrestricted additive effects absorb radial depth: the identifiable geometric target is a root-invariant, projected Gromov-product matrix. Flexible HELPI variants improve substantially over additive and 2PL models on congressional votes, while Junyi prediction remains close to standard item-response benchmarks. The experiments do not establish general predictive superiority over Euclidean or bilinear alternatives.

## Research Question

Which features of a hierarchical latent geometry can binary bipartite data identify once row and column propensities are included, and can those features support useful prediction and interpretation?

## Motivation

Branching hierarchies expand exponentially with depth, matching hyperbolic volume growth more naturally than fixed-dimensional Euclidean growth. However, students differ in ability, exercises in difficulty, and legislators and votes in marginal propensities. These additive effects can absorb apparent geometric structure. HELPI separates this identification problem from the representational appeal of negative curvature (Sections 1-3).

## Contributions

- Establishes exact likelihood equivalence between hyperbolic-distance and rooted shared-ancestry predictors with unrestricted main effects.
- Characterizes the identifiable projected hierarchy signal, curvature-coefficient confounding, ordered single-ray collapse, and a sufficient local rank condition for branch identification.
- Develops logistic and probit variational procedures with bounded tangent-space factors and external hierarchy anchors.
- Gives posterior contraction and exact global mean-field risk results, then evaluates prediction, signal recovery, calibration, and computational diagnostics.

## Method

For observed dyads $(i,j)\in\Omega$, responses are conditionally independent Bernoulli variables with probability $H(\eta_{ij})$, where $H$ is logistic or probit. Row and column positions lie in a Lorentz hyperboloid of curvature $-1$. Using the [[concepts/gromov-product|Gromov Product]],

$$
G_o(z_i,w_j)=\frac{d(o,z_i)+d(o,w_j)-d(z_i,w_j)}{2},\qquad
\eta_{ij}=\alpha_i+\beta_j+\lambda G_o(z_i,w_j).
$$

The alternative predictor $\alpha_i+\beta_j-\gamma d(z_i,w_j)$ has exactly the same likelihood family after shifting each main effect by its negative radial distance times $\gamma$ and setting $\lambda=2\gamma$ (Theorem 4.1). This equivalence does not imply that independently chosen priors give identical posteriors.

Let $\mathcal A$ be the space of row-plus-column additive matrices. The identified interaction is

$$
\mathcal H=\lambda\mathsf P_{\mathcal A^\perp}G
=-\gamma\mathsf P_{\mathcal A^\perp}D.
$$

Changing the root changes $G$ only by an additive matrix. Two geometric parameter pairs are observationally equivalent with freely varying main effects exactly when their projected signals agree. In a tree metric, $G$ is lowest-common-ancestor depth; this interpretation is approximate for distorted hyperbolic tree embeddings. On a single geodesic ray with one node type uniformly deeper than the other, the projected signal vanishes. Curvature magnitude and interaction strength are confounded through $\lambda/\sqrt{\kappa_c}$, motivating fixed curvature (Section 4).

Theorem 4.3 gives local identification of additive effects, coefficient, and Gromov matrix when a Jacobian combining their feasible directions has full column rank. It is a conditional local result, not global coordinate recovery.

Positions are exponential maps of Gaussian tangent variables truncated to a radius-$R_0$ ball. Column positions can be fixed at taxonomy anchors, softly centered on them, or unanchored. Mean-field inference combines Polya-Gamma augmentation for logistic responses or Albert-Chib augmentation for probit responses with exact scalar updates and projected stochastic geometry updates. Multiple restarts are selected by a refined objective estimate. A geometry sweep costs $O(R_{\mathrm{mc}}|\Omega|p)$ (Section 5).

For fixed dimension $p$, bounded truth and depth, suitable priors, and $d_N\log N=o(N)$, the paper establishes posterior contraction in average Bernoulli Hellinger distance at rate

$$
\varepsilon_N^2\asymp\frac{d_N\log N}{N},\qquad
N=nm,\quad d_N=(n+m)(p+1)+1.
$$

A clipped inverse-link projection transfers the rate to the hierarchy signal. The exact global reverse-KL mean-field optimum has squared predictive risk of the same order. An observed-design extension replaces array size with observed-dyad count and uses active-node dimension; it controls only the observed design (Section 6).

## Experiments

### Simulations

The balanced-hierarchy experiment uses 14 pairwise-covering design cells, each with 100 replicates, varying branching, depth, array size, signal strength, and event prevalence. Models share 80% training splits. Across 1,400 paired datasets, HELPI improves over main effects in log score by 0.00521, Brier score by 0.00231, and hierarchy-signal RMSE by 0.04208. Euclidean interaction performs better than HELPI on all five design-averaged metrics; its signal RMSE is lower by 0.04820. Size-specific summaries mix different design cells and are not controlled sample-size curves (Tables S2-S4).

The weak-branch experiment uses seven angular spreads and 100 replicates each. The population signal collapses exactly at zero spread, but the fitted singular-value diagnostic remains nearly constant. Its correlation with across-restart coefficient variation is positive, 0.5308 with bootstrap interval [0.4664, 0.5930], contrary to the prespecified negative direction (Table S5).

Complementary Euclidean and bilinear generators give mixed rankings. HELPI improves over main effects under bilinear generation but trails several interaction models. A nine-cell dimension/depth sensitivity grid yields narrow performance ranges and no fitted tangent means near the depth bound (Tables S6-S7).

### Junyi Academy

The primary array contains 2,000 students, 500 exercises, and 317,091 first-attempt pairs. Each student's earliest 80% of attempts train the model; 64,203 later pairs form the test set. Anchors encode area, topic, and exercise. The estimand is correctness conditional on an attempt.

| Model | Log score (higher better) | Brier (lower better) | AUC |
| --- | --- | --- | --- |
| 2PL | -0.5090 | 0.1686 | 0.8075 |
| HELPI soft | -0.5125 | 0.1701 | 0.8038 |
| HELPI unanchored | -0.5126 | 0.1702 | 0.8032 |
| Rasch | -0.5127 | 0.1702 | 0.8037 |

These are Table S9 values; the main text prints unsigned log-score magnitudes. Soft HELPI adds a curriculum-based interpretation while predicting close to Rasch and behind 2PL. In the shorter windows, the best HELPI variant is fixed-anchor at 30 and 90 days and soft-anchor at 180 days (Table S11). All three primary HELPI diagnostic matrices have rank 110 of 114, so the paper does not interpret $\lambda$ separately. A case-control attempt model achieves AUC 0.9248, demonstrating systematic exposure differences without estimating population attempt probabilities (Sections S6.5-S6.6).

### Congressional Votes and Supplementary Checks

The 117th U.S. House analysis uses 49,591 recorded votes from 432 members on 118 policy-annotated roll calls. Five masks retain 80% for training, with five starts for nonconvex models. Anchors encode policy area, bill type, and roll-call identity; party labels are withheld during fitting.

| Model | Mean AUC | Mean Brier | Mean log score |
| --- | --- | --- | --- |
| HELPI soft | 0.9902 | 0.0308 | -0.1145 |
| HELPI unanchored | 0.9920 | 0.0289 | -0.1060 |
| HELPI fixed | 0.9314 | 0.0942 | -0.3030 |
| Main effects | 0.9093 | 0.1108 | -0.3478 |
| 2PL | 0.9708 | 0.0545 | -0.1661 |
| Euclidean | 0.9925 | 0.0278 | -0.0995 |
| AME | 0.9930 | 0.0276 | -0.0946 |

Flexible HELPI improves over additive and 2PL benchmarks and reveals party separation and policy organization. AME and Euclidean models have slightly stronger predictive averages (Table S12).

A Retailrocket temporal conversion stress test uses 20,834 visitor-product pairs. Soft HELPI has AUC 0.7715 and Brier 0.0462; main effects has the best AUC and Euclidean interaction the best Brier and log score. This is one split with lower test purchase prevalence (Table S13). MCMC on one simulation and two small real-data subsets passes all 18 monitored convergence checks, but does not establish full-data variational interval coverage (Table S14).

## Limitations

- Posterior theory assumes a well-specified binary model, fixed dimension, bounded depth, and adequate observations relative to parameter dimension. Nonbinary GLMs are proposed extensions without equivalent empirical or theoretical development here.
- The variational risk theorem applies to the global optimum, not the local solutions returned by the stochastic algorithm.
- Prediction on recorded dyads does not imply full-array recovery under informative exposure. Unattempted exercises are missing, not incorrect; absences and present votes are excluded.
- Absolute depth, curvature and coefficient separately, and unique latent coordinates are not generally identified. The empirical branch diagnostic does not behave as prespecified, and clipping changes the reported hierarchy functional.
- Hyperbolic fit is not evidence of a unique underlying hierarchy or a causal policy effect. Comparative prediction depends on the data and competing geometry.
- The supplied manuscript is dated August 17, 2026 and supplies no DOI, arXiv identifier, or publication venue. Damaged notation and inconsistent log-score signs in the parsed text require care; the result tables above follow the supplement.

## Related Concepts

- [[concepts/gromov-product|Gromov Product]]: shared ancestry and the projected hierarchy signal.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: negative curvature as a structural inductive bias.
- [[concepts/item-response-theory|Item Response Theory]]: respondent/item effects and binary-response benchmarks.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: distinguishes conditional response prediction from joint exposure modeling.

## Related Papers

- Jeon et al. (2021), "Mapping Unobserved Item-Respondent Interactions: A Latent Space Item Response Model with Interaction Map": cited latent-space response modeling predecessor.
- Kitsak, Papadopoulos, and Krioukov (2017), "Latent geometry of bipartite networks": cited geometric bipartite-network background.
- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: a library comparison using circular geometry for voting coalitions; not a HELPI experimental baseline.
- [[papers/hyhtm-hyperbolic-geometry-based-hierarchical-topic-models|HyHTM: Hyperbolic Geometry based Hierarchical Topic Models]]: a library connection using hyperbolic geometry for topic hierarchies, with a different task and identification problem.

[[index|Library home]]
