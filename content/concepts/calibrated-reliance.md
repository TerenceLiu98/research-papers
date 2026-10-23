---
title: Calibrated Reliance
type: concept
aliases:
  - Appropriate Reliance on AI
  - Reliance Calibration
tags:
  - human-ai-decision-making
  - decision-support
  - trust-calibration
---

## Overview

Calibrated reliance is the context-sensitive weighting of AI advice so that reliance reflects the system's actual competence for a particular decision. It is not equivalent to greater use of AI: appropriate behavior can require either following or rejecting a recommendation.

## Key Ideas

- A positive consultation occurs when a person replaces an initially incorrect judgment with a correct AI recommendation. A negative consultation occurs when an incorrect AI recommendation displaces an initially correct human judgment. Other cases do not change the decision outcome.
- Calibration is instance-specific. Aggregate model accuracy does not establish whether a particular recommendation is correct, especially when the decision-maker cannot verify it at the moment of choice.
- Trust and reliance are distinct. Trust is a belief about a system, whereas reliance is observable behavior. Increasing competence-based trust can increase both beneficial and harmful consultations when the AI is fallible.
- Explanations can provide diagnostic evidence, but they can also serve as persuasive cues. In [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer]], perceived transparency directly reduced negative consultations while indirectly increasing them through competence-based trust and responsibility attribution.
- Calibration should be evaluated against ground truth and initial judgments where possible. Acceptance rates or self-reported trust alone cannot distinguish appropriate reliance from overreliance.
- Design safeguards can preserve independent evaluation through pre-advice judgments, uncertainty and failure-boundary disclosures, explicit decision ownership, and prompts that require reasons for changing a judgment.
- Conversational alignment is not equivalent to harmful reliance. [[papers/ai-sycophancy-and-decisions|AI Sycophancy and Decisions]] finds that a baseline assistant favored users' stated leanings while improving objective-task accuracy and depolarizing choices on average; experimentally increasing [[concepts/ai-sycophancy|AI Sycophancy]] weakened that benefit.

## Important Papers

- [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer: Ambivalent Cognitive Effects of XAI in Augmented Decision-Making under Uncertainty]]: separates positive and negative consultations and identifies competing direct and mediated effects of transparency.
- [[papers/ai-sycophancy-and-decisions|AI Sycophancy and Decisions]]: separates an assistant's validating conversational behavior from its causal effect on users' final decisions across 30 tasks.
- Lee and See (2004), "Trust in Automation: Designing for Appropriate Reliance": foundational account of matching reliance to automation capabilities.
- Schoeffer et al. (2025), "AI Reliance and Decision Quality: Fundamentals, Interdependence, and the Effects of Interventions": develops the relationship between reliance behavior and decision quality.

## Related Concepts

- [[concepts/automation-bias|Automation Bias]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/cognitive-offloading|Cognitive Offloading]]
- [[concepts/ai-sycophancy|AI Sycophancy]]
