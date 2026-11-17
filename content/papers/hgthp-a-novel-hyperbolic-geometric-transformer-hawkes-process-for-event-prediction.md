---
title: "HGTHP: a novel hyperbolic geometric transformer hawkes process for event prediction"
type: paper
authors:
  - Yiman Xie
  - Jianbin Wu
year: 2023
tags:
  - temporal-point-processes
  - hyperbolic-geometry
  - event-prediction
---

## TL;DR

HGTHP combines graph convolution with hyperbolic attention to predict the time and type of the next event. It reports higher log-likelihood than the listed baselines on five datasets and consistent time-prediction gains in its ablations, but hyperbolic and graph components do not uniformly improve event-type prediction.

## Research Question

Can graph-derived relational information and hyperbolic attention jointly improve continuous-time event prediction by representing hierarchical structure and long-range temporal dependencies?

## Motivation

Event histories contain both temporal dependencies and relationships between streams. The authors motivate negative-curvature representations by their capacity to accommodate branching hierarchies with less distortion than Euclidean embeddings.

## Contributions

- Integrates graph, timestamp, and marker embeddings into a hyperbolic attention history encoder.
- Uses Lorentz distances for attention similarity and Klein-model Einstein midpoint aggregation.
- Parameterizes conditional intensities from the resulting states and evaluates graph and geometry ablations on one synthetic and four real datasets.

## Method

When a relationship graph is unavailable, SVD of interaction-count data supplies node features and k-nearest neighbors supplies an unweighted graph. A two-layer GCN encodes neighborhood information. Its projected output is added to sinusoidal time encodings and learned marker embeddings (Sections 4.3–4.4).

Queries, keys, and values are projected into hyperbolic space. Attention weights depend exponentially on negative Lorentz distance; aggregation uses an attention-weighted Einstein midpoint in Klein coordinates before returning to Lorentz coordinates. The historical state parameterizes an exponential intensity with learned history, elapsed-time, and baseline terms (Equation 23). Total intensity sums over event types.

Training combines negative log-likelihood with time and marker losses, using Adam and 100 Monte Carlo samples for the integrated intensity. Timestamp prediction inverts cumulative intensity. Although the derivation discusses an expectation and random sampling, the experimental setting fixes the uniform input to 0.5, corresponding to a median under a valid continuous distribution. The next marker maximizes its share of total intensity at that predicted time.

## Experiments

Datasets are synthetic Hawkes sequences, ATM errors, Stack Overflow badges, financial transactions, and MIMIC-II clinical histories. Baselines include RMTPP, Intensity RNN, Neural Hawkes, THP, and Geometric Hawkes. The general split uses 80% of sequences for training and divides the remainder between validation and testing; Figure 6 describes averages over five sampled splits.

Selected results from Tables 2–4 follow. Log-likelihood is higher-is-better; RMSE and marker error are lower-is-better. RMSE and error values here are from the ablation tables.

| Dataset | HGTHP log-likelihood | THP log-likelihood | HGTHP RMSE | Without hyperbolic attention RMSE | HGTHP marker error (%) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Synthetic | -0.171 | -0.362 | 1.99 | 2.03 | 54.6 |
| Stack Overflow | -0.423 | -0.762 | 4.01 | 4.28 | 53.1 |
| Financial | 1.314 | 1.200 | 0.413 | 0.519 | 38.1 |
| MIMIC-II | 0.614 | 0.323 | 0.740 | 0.779 | 15.1 |
| ATMs | 0.926 | 0.482 | 2.07 | 2.15 | 17.0 |

Removing either graph embedding or hyperbolic attention worsens RMSE on every dataset in Table 3. Marker results are mixed: removing hyperbolic attention improves Financial error from 38.1% to 37.4%; removing both components improves MIMIC-II error from 15.1% to 14.7%. HGTHP has the highest log-likelihood among all models listed in Table 2, which does not include Geometric Hawkes.

## Limitations

- Constructed nearest-neighbor graphs may poorly reflect real relationships. The authors identify this issue for MIMIC-II and suggest graph noise as an explanation for Financial results.
- Numerical reporting is inconsistent: Section 5.5 gives Stack Overflow RMSE as 4.2222, whereas Table 3 gives 4.01 for HGTHP and 4.22 for its no-graph variant.
- The supplied mathematical text contains projection and intensity notation inconsistencies. Its description as nonparametric should be read alongside the explicitly exponential elapsed-time intensity specification.
- The text does not clearly establish that graph preprocessing uses only training observations. Similarity edges should not be interpreted as causal influence.
- Dataset descriptions differ from Table 1 in marker counts, and the MIMIC-II training-count description is separate from the general split protocol. These details require clarification for exact reproduction.

## Related Concepts

- [[concepts/graph-conditioned-neural-point-processes|Graph-Conditioned Neural Point Processes]]: graph representations augment event histories before intensity prediction.
- [[concepts/riemannian-representation-learning|Riemannian Representation Learning]]: negative curvature supplies a hierarchical inductive bias to the attention representation.

## Related Papers

- [[papers/gthp-a-novel-graph-transformer-hawkes-process-for-spatiotemporal-event-prediction|GTHP]]: a related graph-plus-transformer architecture using Euclidean attention; the library entry provides a useful architectural comparison, not a controlled cross-paper experiment.
- Zuo et al. (2020), *Transformer Hawkes Process* (reference 24): attention-based temporal baseline.
- Gülçehre et al. (2019), *Hyperbolic Attention Networks* (references 10 and 33): hyperbolic attention precedent.
- Du and Zhou (2022), *Nostradamus* (reference 29): prior event prediction with hyperbolic graph representations.
