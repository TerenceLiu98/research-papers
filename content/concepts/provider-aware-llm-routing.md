---
title: Provider-Aware LLM Routing
type: concept
aliases:
  - Market-Aware LLM Routing
  - Same-Model Provider Selection
  - LLM Provider Routing
tags:
  - llm-routing
  - llm-serving
  - provider-selection
  - online-learning
---

## Overview

Provider-aware LLM routing chooses which endpoint should serve a request after an upstream application or router has already selected the model. This matters for open-weight models because providers hosting nominally identical weights can expose different prices, latency, availability, and task-conditioned answer quality. The provider is therefore part of the service decision rather than a transparent implementation detail.

## Key Ideas

- **Model and provider routing are separate layers.** Model routing allocates capability across models; provider routing selects among deployments of the chosen model. The layers can be composed without treating provider choice as another model-capacity decision.
- **Feasibility is task-conditioned.** Evidence that an endpoint is adequate for knowledge questions need not establish adequacy for code or multi-step reasoning. Certification should be indexed by model, provider, and task context.
- **Price is an objective, not a quality certificate.** A low-cost endpoint may match premium providers or may be severely degraded. Conversely, a premium endpoint need not be the most accurate or available, even when higher prices correlate with lower latency.
- **Maps expire.** Availability, provider membership, quality, and visible prices can drift. Snapshot measurements need refresh, and admitted endpoints need continued monitoring.
- **Safe admission differs from drift detection.** Probing a new candidate before serving it protects users during cold start; monitoring served feedback protects against degradation after certification. A maintained anchor provides a fallback while evidence is insufficient.
- **The quality signal is a trust boundary.** Sparse or symmetric noise may lead to conservative fallback, but systematic evaluator bias can certify an unsafe endpoint. Ground-truth probes and audits provide an independent check.
- **Safety has an explicit cost.** Anchoring and probes can cost more than optimistic exploration. Whether this premium is justified depends on the downstream loss associated with a below-floor answer.

## Important Papers

- [[papers/you-cannot-pick-a-provider-from-the-pricelist-market-aware-routing-for-open-weight-llm-inference|You Cannot Pick a Provider from the Pricelist: Market-Aware Routing for Open-Weight LLM Inference]]: measures task-specific provider heterogeneity and drift, proposes measured-map routing, and introduces FACET for fail-safe online certification and monitoring.
- Li et al. (2026), "When Is the Same Model Not the Same Service? A Measurement Study of Hosted Open-Weight LLM APIs": documents cross-provider differences for hosted open-weight models.
- Ong et al. (2025), "RouteLLM: Learning to Route LLMs from Preference Data": illustrates the upstream model-selection layer with which provider routing can compose.

## Related Concepts

- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]: evaluates quality-cost trade-offs across models and configurations rather than among providers of one fixed model.
- [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]]: supplies the broader view of routing as optimization under inference-specific constraints and uncertainty.
- [[concepts/concept-drift-in-time-series|Concept Drift in Time Series]]: shares the need to detect changing relationships, although provider routing monitors endpoint feasibility rather than a forecasting distribution.

