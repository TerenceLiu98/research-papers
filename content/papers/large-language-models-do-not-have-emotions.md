---
title: "Large Language Models Do Not Have Emotions"
type: paper
authors:
  - Amit Goldenberg
  - James J. Gross
year: 2026
doi: "10.1038/s41562-026-02558-6"
journal: Nature Human Behaviour
tags:
  - emotion-science
  - large-language-models
  - affective-computing
  - mechanistic-interpretability
---

## TL;DR

Goldenberg and Gross argue that emotionally appropriate language and internal representations associated with emotion concepts are insufficient evidence that a large language model has emotions. On their functional account, emotion requires context-sensitive [[Emotion Appraisal|appraisal]] and sustained changes that reorganize attention, processing speed, motivation, and response tendencies across an episode. Current LLMs do not meet this standard because their forward-pass computation is fixed and an emotion-related representation changes token probabilities without reorganizing multiple processing systems over time.

## Research Question

What functional evidence would justify attributing emotions to a large language model if conscious feeling is not treated as a necessary condition of emotion?

## Motivation

Debates about machine emotion often turn on whether an LLM can feel. The authors reject feeling as a decisive criterion because many affective scientists do not consider conscious feeling necessary for emotion in humans or other animals. They instead ask what emotions do and whether an LLM contains processes that perform those functions. This shift also guards against treating emotionally plausible outputs or stable internal representations as equivalent to emotional processing.

## Contributions

- Proposes two functional requirements for emotion: appraisal that shapes interpretation and coordinated reorganization that shapes responses.
- Explains why consistent internal representations of emotion concepts do not establish emotional states, given the contextual and individual variability of human emotion representations.
- Distinguishes the visible content of an emotional response from changes to the processing that generates it.
- Specifies evidence that would strengthen a future claim of LLM emotion: agent- and situation-dependent appraisal together with sustained, interpretable changes in attention, processing speed, response type, and response likelihood.
- Uses collective emotion to show that the proposed criterion concerns functional organization rather than any required biological substrate.

## Method

This is a conceptual correspondence rather than an empirical study. The authors adopt a functional perspective from affective science and compare two proposed functions of human emotion with LLM processing.

The first function is [[Emotion Appraisal|appraisal]]: evaluating whether a situation is desirable, who caused it, and whether it is manageable, among other dimensions. Different appraisal profiles can generate different emotions, and similar situations can be appraised differently across people or occasions. The authors contrast this variability with a recent non-peer-reviewed report that LLMs form distinct internal representations tracking the emotional significance of conversational context. They argue that a consistent representation for an emotion concept should not be equated with an emotional state because human emotion representations are distributed, context dependent, and variable.

The second function is coordinated response organization. In biological emotion, fear can narrow attention, accelerate decisions, prepare the body for action, and increase avoidance, while anger can increase approach and confrontation. Such effects change how several systems allocate resources across time. The authors argue that an LLM's emotionally relevant output does not demonstrate this kind of reorganization: a forward pass remains computationally fixed, even when an internal representation shifts the probability of the next token.

## Experiments

The paper reports no original experiments, datasets, or quantitative results. Its empirical premises come from prior affective-neuroscience research and a cited non-peer-reviewed interpretability preprint. The proposed test for future systems is whether emotion-like representations cause sustained and functionally interpretable changes across multiple aspects of processing, rather than merely changing output content or next-token probabilities.

## Limitations

The argument supplies conceptual criteria but does not operationalize thresholds for deciding when changes are sufficiently sustained, coordinated, or cross-system to count as emotion. It also does not experimentally test current LLMs against those criteria. The evidence about emotion-related LLM representations comes from a non-peer-reviewed preprint, while the claims about distributed and variable human emotion representations are summarized from prior neuroscience research rather than re-evaluated here. The conclusion is explicitly provisional: future systems could acquire the two proposed functional features.

## Related Concepts

- [[Emotion Appraisal]]
- Functional accounts of emotion
- Affective computing
- Mechanistic interpretability
- [[Model Steerability]], which helps distinguish representations correlated with a concept from representations that causally alter downstream behavior
- Collective emotion

## Related Papers

- [[How Do Transformers Learn to Associate Tokens: Gradient Leading Terms Bring Mechanistic Interpretability]]
- Adolphs and Andler (2018), *Emotion Review* 10, 191-201.
- Keltner and Gross (1999), *Cognition & Emotion* 13, 467-480.
- Sofroniew et al. (2026), non-peer-reviewed preprint on emotion-related representations in language models.
- Lindquist et al. (2012), *Behavioral and Brain Sciences* 35, 121-143.
- Satpute and Lindquist (2019), *Trends in Cognitive Sciences* 23, 851-864.

[[index|Library home]]
