---
title: "On the Indistinguishability of Human v/s AI Generated Text"
type: paper
authors:
  - Jaee Ponde
  - Aritra Das
  - Mihir More
  - Debayan Gupta
year: null
source_job_id: "fa416e61-ec84-466c-a9c4-3d1676bbdb2f"
tags:
  - ai-text-detection
  - paraphrasing
  - markov-chains
---

## TL;DR

Repeated, human-calibrated paraphrasing can bring a machine-text distribution arbitrarily close to a human target under explicit admissibility, mixing, and statistical assumptions. The paper separates error from finite rewriting, limited human calibration data, and finitely many observed outputs; it provides theoretical guarantees rather than detector benchmarks.

## Research Question

When can access to human responses guide repeated meaning-preserving rewrites toward the human distribution, and how many human examples and rewriting steps suffice?

## Motivation

Distinct distributions can become distinguishable with many independent samples even when single-text detection is weak. This paper studies an adversary that changes the machine distribution through calibrated rewriting. Human and machine responses are matched by prompt and intended content.

## Contributions

- Models sentence-level paraphrasing as a reversible Markov chain and bounds geometric convergence using its spectral gap.
- Estimates a shared human inverse-temperature parameter by maximum pseudolikelihood, with square-root calibration error.
- Combines mixing, calibration, and empirical-output errors into finite-sample total-variation guarantees.
- Replaces the shared parameter with direct learning of a contracting, approximately human-preserving rewriting kernel, at a state-space-dependent sample cost.

## Method

For each content class, admissible texts form a finite product of sentence-phrasing sets. Every complete combination must satisfy quality and semantic-preservation thresholds. Sentence boundaries and order remain fixed. A random-scan Gibbs proposal resamples one sentence according to the score of the resulting complete text; a symmetric acceptance rule can reject moves. Connected accepted edges give a unique stationary distribution proportional to the scoring model probability raised to an inverse temperature beta (Sections 3–4).

The first approach assumes one beta describes human writing across calibration and target content classes. Maximum pseudolikelihood estimates this scalar from independent human examples. Bounded neighboring score differences and positive population curvature yield parameter error of order the inverse square root of the human sample size. Uniform mixing and sensitivity bounds then translate this into distributional error (Sections 5–6).

Using human samples from the target content class itself, the alternative minimizes the change a candidate kernel induces in the empirical human distribution. Candidates must share a block contraction bound, and the family must contain a kernel preserving the true human target. At block boundaries, remaining initial-distribution error decreases geometrically, while preservation error contributes a floor amplified by block length divided by one minus the contraction factor (Section 7).

## Experiments

No empirical detector evaluations, datasets, or measured attack success rates are reported. The evidence consists of theorems and proofs:

- **Mixing:** Theorem 1 bounds total variation by one half the square root of the initial chi-squared divergence times the spectral contraction factor raised to the number of updates.
- **Acceptance:** constant acceptance probability scales the spectral gap by that probability. With additive sentence scores and unrestricted acceptance, the gap is exactly the reciprocal of the number of sentence positions (Proposition 2 and Appendix B.5).
- **Combined error:** Theorems 3–4 separate exponential mixing error, human calibration error of order square root of the ratio of log(1/delta) to sample size, and empirical-output error of order square root of representation dimension divided by output count.
- **Direct kernel learning:** Theorem 7 introduces explicit dependence on the number of admissible full texts in the human-sampling term, unlike scalar calibration. Output comparisons through a finite representation only establish closeness in that representation.

## Limitations

The admissible product space assumes every sentence combination preserves content and quality; constructing and verifying it is outside the stated score-evaluation costs. Connectivity ensures eventual convergence but can coexist with impractically slow mixing. Small spectral gaps, weak calibration identifiability, and large text spaces worsen the guarantees.

The shared human parameter is a modeling assumption, not a consequence of training a scorer on human writing. With finite calibration data, additional rewrites converge to the estimated stationary target and need not monotonically reduce distance to the true human distribution. Zero average score drift alone does not imply stationarity (Appendix C.3). Direct kernel learning removes the shared-parameter assumption but requires uniform contraction and an appropriate preserving candidate; approximate preservation adds persistent error.

The supplied text does not establish a publication year or stable identifier. Its supplementary template mentions AISTATS 2027, which does not establish publication or acceptance; year remains unspecified.

## Related Concepts

- [[concepts/markovian-generation-chains|Markovian Generation Chains]] — repeated rewriting is a transition process over complete texts; this paper imposes conditions that identify a human target and control convergence.

## Related Papers

- [[papers/markovian-generation-chains-in-large-language-models|Markovian Generation Chains in Large Language Models]] — cited for Markov-chain analysis of repeated rewriting, recurrence, and sentence diversity.
- [[papers/unveiling-attractor-cycles-in-large-language-models-a-dynamical-systems-view-of-successive-paraphrasing|Unveiling Attractor Cycles in Large Language Models]] — cited for fixed points and short cycles under successive paraphrasing.

[[index|Library home]]
