---
title: Automation Bias
type: concept
aliases:
  - Automated Advice Overreliance
tags:
  - human-ai-decision-making
  - cognitive-bias
  - decision-support
---

## Overview

Automation bias is the tendency to use automated recommendations as substitutes for vigilant information processing, producing errors when decision-makers follow incorrect advice or fail to notice information the system misses. It is a failure of reliance calibration, not merely frequent use of automation.

## Key Ideas

- Automation can operate as a heuristic cue that reduces the effort devoted to checking an individual recommendation. This is especially likely in repetitive, uncertain tasks with limited feedback and low consequences for each decision.
- Commission errors occur when a person follows incorrect automated advice. Omission errors occur when a person fails to act because the system did not issue an appropriate prompt or alert.
- Transparency does not necessarily eliminate automation bias. An understandable explanation may support scrutiny, but it may also signal competence or legitimacy and thereby make advice more persuasive.
- Responsibility matters alongside trust. When users assign more causal responsibility for an outcome to an AI, their perceived need to justify and verify the final decision may weaken.
- [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer]] finds this ambivalence empirically: transparency directly reduces harmful consultations, while trust and responsibility pathways increase them.
- Mitigation should target behavior rather than transparency alone. Independent judgments before AI exposure, cognitive forcing functions, uncertainty cues, explicit responsibility framing, and required justifications can preserve active evaluation.
- In [[concepts/governed-ai-peer-review|Governed AI Peer Review]], a shared AI assessment can anchor multiple reviewers in the same direction. Randomized holdouts and structured logs can make this correlated-error channel measurable, although measurement alone does not eliminate it.

## Important Papers

- [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer: Ambivalent Cognitive Effects of XAI in Augmented Decision-Making under Uncertainty]]: demonstrates competing transparency pathways in a controlled decision task.
- Skitka, Mosier, and Burdick (1999), "Does Automation Bias Decision-Making?": establishes automation bias as a decision-making phenomenon.
- Goddard, Roudsari, and Wyatt (2012), "Automation Bias: A Systematic Review of Frequency, Effect Mediators, and Mitigators": synthesizes evidence about prevalence and intervention.
- Buçinca, Malaya, and Gajos (2021), "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-Assisted Decision-Making": tests a behavioral mitigation strategy.
- [[papers/fighting-fire-with-fire-infusing-artificial-intelligence-into-peer-review-to-sustain-quality-scholarship|Fighting Fire with Fire]]: models overreliance on a common AI review as a nondiversifiable source of panel error.

## Related Concepts

- [[concepts/calibrated-reliance|Calibrated Reliance]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/cognitive-offloading|Cognitive Offloading]]
- [[concepts/governed-ai-peer-review|Governed AI Peer Review]]
