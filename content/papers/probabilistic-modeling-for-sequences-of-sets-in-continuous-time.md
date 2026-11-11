---
title: Probabilistic Modeling for Sequences of Sets in Continuous-Time
type: paper
authors:
  - Yuxin Chang
  - Alex Boyd
  - Padhraic Smyth
year: null
source_job_id: fb177eae-4c5f-4f47-88ec-7969b5702b13
tags:
  - temporal-point-processes
  - set-valued-events
  - importance-sampling
---

## TL;DR

A recurrent temporal point process can generate simultaneous sets of items by separating event intensity from a history-conditioned set distribution. Dynamic Bernoulli and determinantal variants improve held-out sequence likelihood over static set models; importance sampling makes hitting-time and event-order queries substantially more sample-efficient than direct simulation.

## Research Question

How can continuous-time models jointly predict event times and sets of items, and answer item-level future queries without enumerating all possible sets?

## Motivation

Shopping baskets and multi-genre media interactions contain several items at one event time. Encoding every subset as a separate mark requires an exponentially large vocabulary and discards shared item structure. Predicting only the next basket also leaves uncertainty about intervening events unresolved.

## Contributions

- A framework compatible with intensity-based recurrent temporal point processes, using pooled item embeddings and a separate conditional set distribution.
- Dynamic Bernoulli and dynamic determinantal point process (DPP) variants.
- Importance-sampling estimators for hitting times and finite-horizon A-before-B queries that account for simultaneous occurrence.
- Query-based model comparisons beyond next-event likelihood.

## Method

The model averages learned embeddings of items in each set (zero for an empty set) and passes them into a recurrent history encoder. It factorizes set-specific intensity as

$$
\lambda_x^*(t)=\lambda^*(t)p^*(x\mid t).
$$

Training maximizes the sum of temporal and conditional-set log-likelihoods. Dynamic Bernoulli predicts one inclusion probability per item from the evolving hidden state. Items are independent conditional on time and history, but can remain marginally dependent. Dynamic DPP instead uses a history-dependent positive semidefinite kernel to express negative inclusion dependence (Section 3).

For hitting any item in a target subset, the proposal suppresses events containing target items. A survival-weight expectation under this proposal gives the desired hitting probability. For two disjoint target subsets, the proposal suppresses both; integrated survival times the intensity of an A-containing, B-excluding event estimates strict A-before-B probability. Four outcomes must be distinguished: A first, B first, simultaneous occurrence, and neither within the horizon (Section 4). See [[concepts/set-valued-temporal-point-processes|Set-Valued Temporal Point Processes]].

## Experiments

Neural Hawkes supplies the main temporal component. Baselines include static Bernoulli with Poisson timing and static Bernoulli/DPP with neural Hawkes timing. Table 2 reports average negative test sequence log-likelihood; lower is better.

| Dataset | Sequences | Items | StaticB-NH | DynamicB-NH | DynamicDPP-NH |
| --- | ---: | ---: | ---: | ---: | ---: |
| Instacart | 174,615 | 21 | 198.22 | 168.04 | 170.68 |
| Last.fm | 10,705 | 15 | 415.00 | 259.08 | 258.82 |
| MovieLens | 11,198 | 20 | 263.78 | 236.80 | 236.35 |
| MOOC | 6,892 | 97 | 189.54 | 45.30 | Unavailable |

Dynamic set modeling produces the main gains; DPP improvements over Bernoulli are small and inconsistent. DPP exceeded available memory on MOOC. Static models sometimes have better temporal likelihood alone, while dynamic models improve joint likelihood through set prediction.

Query experiments use 1,000 queries, 1,000 importance samples, and 2,000 integration points, conditioning on the first five events. Reported variance reductions translate into orders-of-magnitude sample-efficiency gains. Per-sample runtime is not uniformly lower: the paper reports 0.5–0.9 times naive runtime in some hitting-time cases and 2–3 times in some ordering cases. Dynamic models improve query likelihood on three datasets; MovieLens has overlapping standard deviations. Appendix experiments with RMTPP support portability, while adding a second set-prediction layer gives little consistent benefit.

## Limitations

Bernoulli lacks residual conditional item dependence; DPP expresses negative dependence and has cubic computational cost in vocabulary size. DPP querying is not empirically evaluated. Experiments use relatively small item vocabularies and specific user-behavior datasets; MOOC has only 3.7% multi-item events. Finite-horizon ordering probabilities are distinct from unrestricted eventual ordering probabilities.

The supplied Markdown does not establish a publication year or stable identifier. Its split descriptions conflict: Section 5.1 gives 75/10/15 percent, while Appendix B.1 gives 75/10/25 percent. The displayed query “log-likelihood” formula also omits logarithms, so it is not reproduced here as a valid log score.

## Related Concepts

- [[concepts/set-valued-temporal-point-processes|Set-Valued Temporal Point Processes]]
- [[concepts/synchronization-noise-in-temporal-point-processes|Synchronization Noise in Temporal Point Processes]] — distinguishes genuine simultaneous sets from timestamp distortions.

## Related Papers

- Boyd et al. (2023), *Probabilistic querying of continuous-time event sequences*: cited methodological foundation for importance sampling, extended here to set-valued marks.
- Mei and Eisner (2017), *The neural Hawkes process*: cited recurrent temporal backbone.
- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]] — a complementary library paper on distorted event timing, rather than genuine set-valued events.

[[index|Library home]]
