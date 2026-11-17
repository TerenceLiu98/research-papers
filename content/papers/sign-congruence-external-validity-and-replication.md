---
title: "Sign-Congruence, External Validity, and Replication"
type: paper
authors:
  - Tara Slough
  - Scott A. Tyson
year: 2025
doi: 10.1017/pan.2024.26
tags:
  - replication
  - external-validity
  - research-design
---

## TL;DR

Replication informs external validity only when design comparability supports that interpretation. Slough and Tyson distinguish setting-induced target discrepancies from design-induced artifactual discrepancies, showing why even agreement in effect signs requires attention to measurement strategies and treatment contrasts.

## Research Question

When can comparisons across studies reveal external validity, statistical robustness, or research integrity, and what design assumptions separate these purposes?

## Motivation

A replication can disagree with an original study because the setting changes, because the intervention or measurement changes, or because estimates contain sampling error. Treating all disagreement as random noise obscures what replication actually tests. Directional social-science theories also motivate a weaker external-validity criterion than equality of effect magnitudes.

## Contributions

- Defines [[concepts/sign-congruent-external-validity|Sign-Congruent External Validity]], distinguishing directional stability from exact equality of effects.
- Formalizes target and artifactual discrepancies and the role of [[concepts/research-design-harmonization|Research-Design Harmonization]].
- Shows that adding studies cannot shrink the set of design configurations producing artifactual sign disagreement (Theorem 2).
- Connects estimate- and sign-comparison tests to distinct external-validity hypotheses and proposes a sequential replication agenda.

## Method

A study combines design $D$, comprising measurement strategy and treatment/control contrast, with setting $\theta$. Its observed estimate is $e_j=\tau(D_j\mid\theta_j)+\varepsilon_j$. Target-equivalence means equal empirical targets; target-congruence means targets with the same sign. Neither is identical to agreement between noisy estimates.

A target discrepancy changes settings while fixing design. An artifactual discrepancy changes designs while fixing setting. Their combination, plus statistical error, explains cross-study differences. These design and setting discrepancies are not assumed to be random draws from a convenient distribution.

Exact external validity requires equal targets across settings for almost every common design. Sign-congruent external validity requires only equal signs. Under the framework's regularity assumptions, Theorem 1 connects guaranteed target-congruence to harmonization and sign-congruent external validity. Agreement in a particular pair of estimates does not by itself establish a mechanism-wide property.

With harmonized studies and unbiased, consistent estimators, the estimate-comparison statistic $e_1-e_2$ probes exact external validity; the sign-comparison statistic $e_1e_2$ probes sign-congruent external validity. Assuming exact external validity instead permits the estimate-comparison test to probe harmonization. The sign test has no analogous reverse interpretation because sign stability does not fix discrepancy magnitudes.

The proposed agenda first varies settings under a common design, then varies designs within one setting, and finally varies both to assess whether design-induced discrepancies themselves change across settings (Section 5). Direct replication holds setting and design fixed while drawing a new sample, isolating statistical discrepancies.

## Experiments

This is a formal methodological paper rather than a new empirical treatment-effect study. Its evidence comprises definitions, theorems, propositions, and graphical illustrations. Figure 1 illustrates regions of sign disagreement. Figure 2 compares rejection regions at significance levels 0.01, 0.05, and 0.1 with both standard errors fixed at one. These are illustrations, not empirical performance measurements.

Table 1 classifies exact, direct, and three conceptual replication types by whether samples, settings, and designs differ. Published examples illustrate harmonized cross-setting studies and within-setting changes in design. Theorem 2 establishes a nondecreasing sign-flip set as studies are added; it does not say every additional study strictly worsens inference.

## Limitations

The framework assumes smoothness almost everywhere, local design sensitivity expressed through a full-rank derivative condition, and sign reversal when the contrast is reversed. The test interpretations also require the stated estimator properties. Exact harmonization can be difficult or impossible; approximate harmonization and covariate-based representations of settings remain proposed extensions. Evidence from one harmonized design does not establish external validity under other designs. The supplied Markdown references supplementary proofs and p-value constructions but does not include those appendices.

## Related Concepts

- [[concepts/sign-congruent-external-validity|Sign-Congruent External Validity]] — preserves direction while allowing effect magnitudes to vary.
- [[concepts/research-design-harmonization|Research-Design Harmonization]] — isolates setting differences from differences in contrasts and measurement.

## Related Papers

- Slough and Tyson (2023), *External Validity and Meta-analysis* — the earlier framework addressing exact external validity.
- Slough and Tyson (2024), *External Validity and Evidence Accumulation* — broader treatment of the cross-study environment.
- [[papers/learning-from-null-effects-a-bottom-up-approach|Learning from Null Effects: A Bottom-Up Approach]] — a complementary approach to cumulative evidence through disclosure and diagnosis of null findings; design and measurement help interpret inconclusive results in both accounts.
