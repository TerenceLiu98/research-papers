---
title: Euclidean Ideal Point Estimation From Roll-Call Data via Distance-Based Bipartite Network Models
type: paper
authors:
  - Seungju Lee
  - In Kyun Kim
  - Jong Hee Park
  - Ick Hoon Jin
source_job_id: "32879c0b-4732-4076-a5e5-1ecc825f4392"
tags:
  - ideal-point-estimation
  - roll-call-analysis
  - latent-space-models
  - bipartite-networks
  - legislative-coalitions
---

## TL;DR

Lee, Kim, Park, and Jin adapt the latent space item response model to roll-call voting by placing legislators and bills in one Euclidean space. Simulations report clearer recovery of within-party factions and cross-party coalitions than Bayesian IRT or an inner-product LSIRM. In the 118th U.S. House, the joint embedding separates factions and uses bill locations to interpret a second, establishment-outsider dimension, while its held-out predictive scores are worse than BIRT's.

## Research Question

Can a Euclidean distance model of the legislator-bill voting network preserve metric geometry while recovering coalition structure and keeping competitive vote prediction?

## Motivation

Conventional ideal-point models can accurately order legislators and predict votes, but their quadratic or Gaussian utility specifications do not themselves define metric distances. That matters when researchers interpret distance magnitudes, cluster legislators, or summarize factional dispersion. The paper treats roll calls as a bipartite network so that legislators and bills can be embedded together and proximity can be interpreted through a proper Euclidean metric.

## Contributions

- Adapts the latent space item response model (LSIRM) to legislative voting with a shared Euclidean embedding for legislators and bills.
- Contrasts distance geometry with BIRT and an otherwise comparable inner-product LSIRM, separating geometric representation from predictive accuracy.
- Tests recovery of within-party factions and cross-party bridge coalitions under controlled agendas.
- Uses bill positions as substantive anchors for interpreting latent dimensions in the 118th U.S. House.

## Method

For legislator $i$ and bill $j$, the model uses a logistic response probability of the form

$$
\operatorname{logit}\Pr(Y_{ij}=1)
=\theta_i+\beta_j-\gamma\lVert z_i-w_j\rVert_2,
$$

where $\theta_i$ and $\beta_j$ are legislator and bill intercepts, $z_i$ and $w_j$ are positions in a $K$-dimensional shared space, and $\gamma$ controls the strength of proximity. Because the interaction is Euclidean distance, pairwise comparisons satisfy the triangle inequality and bill locations can be read in the same geometry as legislator locations. See [[concepts/euclidean-latent-space-item-response-models|Euclidean Latent Space Item Response Models]].

The authors place Normal priors on intercepts and multivariate standard Normal priors on positions, with a log-Normal prior on $\gamma$. Metropolis-Hastings-within-Gibbs sampling fits the nonconjugate posterior and imputes missing responses during sampling. Joint rotation, reflection, and translation leave the likelihood unchanged, so posterior configurations are aligned to a high-posterior reference draw with a Procrustes transformation; see [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]].

## Experiments

### Simulations

The study compares Euclidean LSIRM with BIRT and inner-product LSIRM. Simulations use 100 replicated datasets; MCMC runs for 30,000 iterations with 5,000 burn-in iterations and thinning by five.

- In an agenda sweep with 180 legislators divided into six factions, Euclidean LSIRM separates all six factions at both 50% and 30% partisan-bill shares. Its mean silhouette rises from 0.624 (SD 0.081) to 0.723 (SD 0.016), while BIRT changes from 0.164 to 0.172 and inner-product LSIRM from 0.188 to 0.190.
- In unequal-faction simulations, bridge bills join majority or minority factions across party lines. The displayed Euclidean embeddings place bridge bills near their supporting factions and reveal the cross-party coalition; the alternatives largely organize actors by party or stretch them along a secondary axis.
- A separate four-coalition summary reports a silhouette coefficient of 0.861 for Euclidean LSIRM versus 0.778 for the conventional alternatives. These are recovery results under known synthetic structures, not evidence that Euclidean geometry universally describes legislative preferences.

### 118th U.S. House

After excluding lopsided votes, the application contains 1,225 roll calls and 451 unique legislators. Both Euclidean LSIRM and BIRT recover the main party division. Euclidean LSIRM additionally separates the House Freedom Caucus and the Squad on a second dimension with reported SD 0.69; BIRT's second dimension has SD 0.18 versus 0.75 for its first.

Bill embeddings supply the substantive interpretation. War-powers resolutions and surveillance or privacy bills appear between Squad and Freedom Caucus members, which the authors interpret as an establishment-outsider cleavage crossing the usual left-right divide. The debt-limit bill H.R. 3746 lies nearer the center, consistent with its bipartisan coalition.

| Metric | Euclidean LSIRM | BIRT |
| --- | ---: | ---: |
| In-sample accuracy | 0.943 | 0.942 |
| In-sample APRE | 0.841 | 0.839 |
| In-sample mean LPPD | -0.154 | -0.156 |
| Held-out mean LPPD | -0.263 | -0.165 |
| Held-out Brier score | 0.075 | 0.046 |

The models are nearly tied in sample, but BIRT is better on both reported held-out metrics under the 20% entry-wise holdout. The paper's advantage is therefore structural interpretation rather than predictive dominance.

## Limitations

- Euclidean distance is a substantive modeling assumption. Metric coherence does not establish that political preferences have Euclidean geometry.
- Simulated faction recovery is conditional on the study's planted voting mechanisms, agenda mixtures, dimensionality, and clustering metric.
- Coordinates require posterior alignment and do not have an absolute orientation. Bill-based dimension labels are interpretations of the fitted configuration.
- The House application is one highly polarized chamber. The proposed extensions to dynamic, multiparty, and historical settings are not evaluated in the main evidence.
- The held-out comparison favors BIRT on mean LPPD and Brier score, despite LSIRM's small in-sample edge.
- The supplied Markdown references supplementary proofs, diagnostics, robustness checks, and further simulations that are not fully represented in the main parsed text. It also contains extensive extraction corruption, and no stable publication year or DOI is recoverable from it.

## Related Concepts

- [[concepts/euclidean-latent-space-item-response-models|Euclidean Latent Space Item Response Models]]: the paper's shared metric model for actors and items.
- [[concepts/item-response-theory|Item Response Theory]]: the broader respondent-item measurement framework.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: models that connect observations through shared latent positions.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: why posterior configurations require alignment.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes the number and interpretation of political axes.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: the Bayesian IRT baseline used to motivate and compare the distance model.
- [[papers/l1-based-bayesian-ideal-point-model-for-multidimensional-politics|L1-based Bayesian Ideal Point Model for Multidimensional Politics]]: replaces non-metric utility with Manhattan distance rather than a joint Euclidean legislator-bill embedding.
- [[papers/ends-against-the-middle-measuring-latent-traits-when-opposites-respond-the-same-way-for-antithetical-reasons|Ends Against the Middle: Measuring Latent Traits When Opposites Respond the Same Way for Antithetical Reasons]]: related treatment of cross-cutting response patterns cited in the House interpretation.

[[index|Library home]]
