---
title: Text-Conditioned Time Series Forecasting
type: concept
aliases:
  - Context-Aided Forecasting
  - Text-Guided Forecasting
tags:
  - time-series-forecasting
  - multimodal-learning
---

## Overview

Text-conditioned forecasting predicts numerical futures from an observed history together with natural-language context. Context can describe the domain, scheduled events, constraints, or a hypothetical future scenario. Its usefulness depends on whether it supplies information relevant to the target and horizon beyond what the history already reveals.

## Key Ideas

- **Contextual prediction and controlled generation ask different questions.** Forecasting from a report available at the forecast origin tests predictive use of external information. Generating a continuation that follows a supplied scenario tests conditional control. A condition written after observing the future can supervise the latter without demonstrating prospective forecasting value.
- **Fusion can preserve temporal representations.** TimeBraid processes language and numerical patches in separate pretrained towers and exchanges information through shared causal residual attention. Aurora instead uses text and history-derived images to guide temporal attention and probabilistic generation. These are distinct mechanisms for bringing context into a forecaster.
- **Matched context ablations isolate text use.** Holding history, horizon, model, and inference settings fixed while removing or changing only the text is more informative about conditioning than comparing models with different lookback lengths. Same-history sibling scenarios additionally test whether predictions distinguish competing conditions.
- **Conditioning strength need not be fixed at full weight.** TimeBraid interpolates numeric-only and text-conditioned point predictions. A validation-selected weight can reduce reliance on weak context; selecting the best weight after observing test results would answer a different evaluation question.
- **Metrics should match the capability.** MSE and MAE measure trajectory accuracy; distributional scores assess probabilistic forecasts; sibling retrieval tests whether the intended scenario is closer than alternatives. None alone establishes faithful constraint satisfaction or causal validity.
- **Temporal provenance is part of the protocol.** Text must be available at the forecast origin for a prospective claim. Split separation, historical availability of reports, training-family overlap, and equal access to numerical history are separate considerations.

## Important Papers

- [[papers/timebraid-unifying-time-series-and-language-for-understanding-and-forecasting|TimeBraid: Unifying Time Series and Language for Understanding and Forecasting]] combines pretrained temporal and language models. Its Ctrl-F evaluation uses three constructed futures per history; its TimeMMD analysis shows domain-dependent sensitivity to text strength and notes uncertified point-in-time text availability.
- [[papers/aurora-towards-universal-generative-multimodal-time-series-forecasting|Aurora: Towards Universal Generative Multimodal Time Series Forecasting]] conditions temporal attention and prototype-guided flow generation on auxiliary modalities, with text masking supporting inference when text is absent. Its images are derived from observed history rather than independent future information.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable temporal pretraining that can be extended with language context.
- [[concepts/forecast-combination|Forecast Combination]]: blending predictions from distinct conditioning modes.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: distinguishing generalization from adaptation and unequal information access.
- [[concepts/prototype-guided-flow-matching|Prototype-Guided Flow Matching]]: Aurora's mechanism for conditioning the source trajectories of probabilistic generation.
