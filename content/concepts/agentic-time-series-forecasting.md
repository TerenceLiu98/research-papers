---
title: Agentic Time Series Forecasting
type: concept
aliases:
  - Agentic Forecasting
  - Interaction-Driven Time Series Forecasting
tags:
  - time-series-forecasting
  - agentic-reasoning
  - tool-use
  - reflective-refinement
---

## Overview

Agentic time-series forecasting treats prediction as a sequence of context gathering, tool use, forecast generation, evaluation, and revision rather than a single mapping from history to future values. An agent can combine numerical observations with known future covariates, retrieved historical cases, temporal features, domain rules, and textual context. The defining property is the controlled interaction among these resources, not the use of an LLM by itself.

## Key Ideas

- **Forecasting models can serve as tools.** An agent may begin with predictions from statistical, neural, or [[concepts/time-series-foundation-models|Time Series Foundation Models]] and revise them instead of generating numbers without a numerical baseline.
- **Context has a forecast-time boundary.** Future target values are unavailable, while scheduled events or genuinely known future covariates may be valid inputs. The provenance and availability time of textual context matter as much as the numerical split.
- **Reasoning needs constrained actions.** Domain rules, temporal features, and retrieved analogues can justify shifting, smoothing, or reshaping a trajectory. Unsupported changes can introduce hallucinated patterns or destroy temporal continuity.
- **Reflection is a validation stage, not a guarantee.** Checks can catch invalid lengths, misaligned timestamps, unsupported adjustments, and physical inconsistencies. Additional reflection loops can still amplify small errors or anchor predictions to irrelevant historical segments.
- **Component attribution requires ablations.** Comparisons should separately remove retrieval, reasoning, reflection, and individual context sources. End-to-end gains alone cannot identify whether the agent, candidate forecaster, external information, or model selection produced the improvement.
- **System cost is part of the evaluation.** Multi-turn LLM calls add latency, token use, and energy overhead relative to single-pass forecasting. Accuracy comparisons should be accompanied by resource and reliability measurements for deployment decisions.

## Important Papers

- [[papers/alphacast-a-human-wisdom-llm-intelligence-co-reasoning-framework-for-interactive-time-series-forecasting|AlphaCast: A Human Wisdom-LLM Intelligence Co-Reasoning Framework for Interactive Time Series Forecasting]] organizes forecasting into Investigator, Generator, and Reflector stages supported by temporal features, domain knowledge, contextual attributes, and a clustered case library.
- Cheng et al. (2026), "Position: Beyond Model-Centric Prediction-Agentic Time Series Forecasting": frames forecasting as an agentic process beyond fixed input-output prediction.
- Tao et al. (2026), "Cast-R1: Learning Tool-Augmented Sequential Decision Policies for Time Series Forecasting": studies learned tool-augmented policies for sequential forecasting decisions.

## Related Concepts

- [[concepts/text-conditioned-time-series-forecasting|Text-Conditioned Time Series Forecasting]]
- [[concepts/time-series-foundation-models|Time Series Foundation Models]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/forecast-combination|Forecast Combination]]
- [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|Decoupled Scientific Reasoning and Tool Orchestration]]
