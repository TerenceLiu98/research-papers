---
title: Collective Emotional Fields
type: concept
aliases:
  - Emotional Information Fields
tags:
  - collective-emotions
  - agent-based-modeling
  - opinion-dynamics
---

## Overview

A collective emotional field is a shared, time-dependent accumulation of agents' emotional expressions that feeds back on individual states. In the Cyberemotions framework described by [[papers/an-agent-based-model-of-opinion-polarization-driven-by-emotions|An Agent-Based Model of Opinion Polarization Driven by Emotions]], positive and negative contributions form separate decaying fields. Agents interact indirectly through these fields, allowing collective dynamics without explicit pairwise opinion exchange.

## Key Ideas

- **Expression and activity are distinct.** Valence determines the sign of an expression, while arousal crossing an individual threshold determines whether an agent contributes. Resetting arousal after expression and adding fluctuations can generate repeated communication cycles.
- **Memory comes from accumulation and decay.** Contributions increase $h_+$ or $h_-$; exponential decay discounts older information. External emotional input can be included, although it is omitted in the linked paper's analysis.
- **Intensity differs from imbalance.** The sum $h=h_++h_-$ measures accumulated activity, whereas $\Delta h=h_+-h_-$ measures its emotional charge. Strong activity can coexist with a small net charge when opposing expressions balance.
- **Feedback can create thresholds.** Fields amplify individual emotional states and, in the linked opinion model, change the coefficients of a slower cubic opinion equation. In its symmetric deterministic case, activity above a baseline destabilizes the neutral opinion and permits two stable opposing opinions.
- **The field is a modeling assumption, not a measurement guarantee.** Equal access to a common field and equal contribution magnitudes simplify heterogeneous communication. Comment volume and sentiment are proposed proxies, but validating the emotional field does not by itself validate its effect on opinions.

## Important Papers

- [[papers/an-agent-based-model-of-opinion-polarization-driven-by-emotions|An Agent-Based Model of Opinion Polarization Driven by Emotions]] (Schweitzer, Krivachy, and Garcia, 2020): couples fast emotional fields to slower continuous opinions and illustrates consensus and polarization. Empirical validation of that coupling remains proposed.
- Schweitzer and Garcia (2010), "An agent-based model of collective emotions in online communities": the earlier framework identified in the linked paper's reference 9.
- Garcia, Kappas, Kuster, and Schweitzer (2016), "The dynamics of emotions in online interaction": empirical background for response functions, as described in the linked paper's reference 11.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: fields can drive opinion change without direct opinion imitation.
- [[concepts/emotion-appraisal|Emotion Appraisal]]: concerns how situations generate emotions; a collective field describes how expressed emotions accumulate and feed back.
- [[concepts/political-polarization|Political Polarization]]: a possible modeled outcome, requiring separate substantive measurement and validation.
