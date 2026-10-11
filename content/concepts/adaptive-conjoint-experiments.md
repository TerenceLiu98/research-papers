---
title: Adaptive Conjoint Experiments
type: concept
aliases:
  - Adaptive Conjoint Design
tags:
  - conjoint-experiments
  - adaptive-randomization
  - treatment-effect-heterogeneity
---

## Overview

Adaptive conjoint experiments can search for combinations of profile attributes where a focal attribute has especially strong or weak effects. In the design of Gosciak, Molitor, and Lundberg, respondents compare two profiles with the same context values but different focal-attribute values. Allocation across contexts changes as responses accumulate.

## Key Ideas

- **A different target:** The target is the minimum and maximum of the context-specific probability $\theta(x)$ of selecting the profile bearing a focal value. It is not an average marginal component effect over independently randomized profiles.
- **Attribute values versus signals:** Profiles share context values but display distinct randomized signals of them. Marginalizing over those signals defines the estimand even when signals influence choices; small signal effects make interpretation simpler.
- **Adaptive concentration:** After a uniform warm-up, [[concepts/thompson-sampling|Thompson Sampling]] concentrates observations on likely extreme contexts without imposing a low-order interaction model.
- **Independent validation:** Fresh observations estimate the selected contexts after discovery. This addresses the winner's curse but cannot guarantee that the selected contexts are the true extremes. Report both selection probabilities and uncertainty in validation estimates.
- **Choice probability versus effect:** Under this paired forced-choice construction, the conditional effect on profile selection is $2\theta(x)-1$. A choice probability of 0.5 represents no focal preference.
- **Scope and cost:** The approach prioritizes one attribute and a manageable finite context space. It sacrifices conventional marginal-effect summaries, and using one task per respondent reduces opportunities for repeated measurement while limiting suspicion.

## Important Papers

- [[papers/adaptive-randomization-in-conjoint-survey-experiments|Adaptive Randomization in Conjoint Survey Experiments]]: develops the three-phase design and illustrates heterogeneous education preferences and near-null motherhood preferences.
- Egami and Imai (2019), "Causal Interaction in Factorial Experiments: Application to Conjoint Analysis": complementary marginal interaction targets discussed in the paper above.

## Related Concepts

- [[concepts/thompson-sampling|Thompson Sampling]]
- [[concepts/exploratory-causal-inference|Exploratory Causal Inference]]
- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]
