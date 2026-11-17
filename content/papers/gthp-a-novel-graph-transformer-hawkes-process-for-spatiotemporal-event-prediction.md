---
title: "GTHP: a novel graph transformer Hawkes process for spatiotemporal event prediction"
type: paper
authors:
  - Yiman Xie
  - Jianbin Wu
  - Yan Zhou
year: 2024
tags:
  - temporal-point-processes
  - graph-neural-networks
  - event-prediction
---

## TL;DR

GTHP adds graph convolutional embeddings to timestamp and event-type embeddings before causal self-attention. Across one synthetic and four real datasets, it reports the lowest time-prediction RMSE and highest log-likelihood among the listed baselines. Event-type prediction is mixed: Transformer Hawkes Process (THP) performs better on three of five datasets.

## Research Question

Can graph information between event sequences improve next-event time and type prediction when combined with attention over event history?

## Motivation

Irregular event streams require continuous-time modeling, while relationships between streams may provide predictive information absent from temporal history alone. GTHP combines neighborhood aggregation with attention to address these two sources of dependence.

## Contributions

- Combines a two-layer graph convolutional network with a causally masked transformer history encoder.
- Uses the combined representation to parameterize event intensities and predict subsequent event times and markers.
- Evaluates graph and attention components through ablations on synthetic, badge, transaction, clinical, and ATM event sequences.

## Method

When relationships are unavailable, the authors construct a k-nearest-neighbor graph and derive node features using SVD of a matrix built from event sequences. A two-layer GCN aggregates graph neighborhoods. Its projected output is added to learned marker embeddings and sinusoidal timestamp encodings (Section 4.2):

$$X=(UV+W_gG+T)^\top.$$

Multi-head attention with future-event masking and a feed-forward network produce historical states. Equation 15 parameterizes intensity as

$$\lambda_n(t)=\exp\{v^\top h(t_i)+w(t-t_i)+\mu\},$$

with total intensity obtained by summing over event types. Training combines negative log-likelihood, time loss, and marker loss, using Adam and 100 Monte Carlo samples for integrated-intensity estimation. The experiments use inverse cumulative-intensity prediction with $u=0.5$ and select the marker with the largest conditional intensity. Fixing this quantile corresponds to a median prediction under a valid continuous event-time distribution, although the preceding derivation discusses the expectation.

## Experiments

Baselines are Intensity RNN, RMTPP, Neural Hawkes, Astrologer (GCN plus LSTM), and THP. The following reproduces selected values from Tables 1–3; lower RMSE and marker error are better, whereas higher log-likelihood is better.

| Dataset | GTHP RMSE | THP RMSE | GTHP marker error (%) | THP marker error (%) | GTHP log-likelihood | THP log-likelihood |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Synthetic | 2.03 | 2.13 | 54.7 | 55.4 | -0.240 | -0.362 |
| Stack Overflow | 4.28 | 4.99 | 53.4 | 46.5 | -0.069 | -0.762 |
| Financial | 0.519 | 0.93 | 37.5 | 37.4 | 1.227 | 1.200 |
| MIMIC-II | 0.779 | 0.826 | 15.7 | 14.7 | 0.852 | 0.323 |
| ATMs | 2.15 | 2.30 | 23.7 | 25.9 | 0.869 | 0.482 |

Removing attention or graph embedding worsens RMSE on every dataset (Table 4). Marker-error ablations are less uniform: removing graph embedding improves Stack Overflow and MIMIC-II results (Table 5). Parameter-count experiments cover 100k–500k parameters, but do not provide a runtime or memory benchmark.

## Limitations

- The prose claims a Stack Overflow marker-prediction advantage that contradicts Table 2: GTHP has 53.4% error versus THP's 46.5%. The table supports gains on Synthetic and ATMs only.
- The supplied text gives no uncertainty intervals or repeated-seed variability for the principal comparisons.
- Graph construction details are insufficient to determine whether all feature and neighbor estimation is restricted to training observations. Inferred similarity edges do not establish causal influence.
- Split descriptions differ: the general protocol specifies 80% training with the remaining 20% shared between validation and testing, whereas MIMIC-II specifies 585 training patients out of 650.
- The synthetic-data description states ten dimensions but also gives 1000-by-9 factor matrices. This ambiguity limits exact reconstruction from the text.
- The intensity and prediction notation contains inconsistencies; the fixed-quantile implementation should not be described as computing the conditional mean. Table 5 also gives a Financial no-graph error different from the THP value in Table 2.

## Related Concepts

- [[concepts/graph-conditioned-neural-point-processes|Graph-Conditioned Neural Point Processes]]: graph embeddings supply relational information to a neural event-history encoder.
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: a different approach that models time-varying responsiveness through explicit excitation modulation.

## Related Papers

- Zuo et al. (2020), *Transformer Hawkes Process* (source reference 27): the attention-based temporal baseline.
- Du et al. (2021), *Astrologer: exploiting graph neural Hawkes process for event propagation prediction with spatio-temporal characteristics* (source reference 23): the graph-plus-recurrence baseline.
- [[papers/graphon-hawkes-processes-sparse-estimation-and-network-recovery|Graphon Hawkes Processes: Sparse Estimation and Network Recovery]]: models spatial interaction with a continuous kernel rather than neural graph embeddings.
