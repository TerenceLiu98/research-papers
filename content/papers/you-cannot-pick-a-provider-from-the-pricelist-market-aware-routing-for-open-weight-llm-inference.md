---
title: "You Cannot Pick a Provider from the Pricelist: Market-Aware Routing for Open-Weight LLM Inference"
type: paper
authors:
  - Liang He
  - Jingbo Wen
  - Yixiong Chen
  - Yue Yang
  - Qizhen Lan
  - Kangning Cui
  - Xilu Wang
year: null
source_job_id: "f1c0829c-0bb0-45bd-a00e-2160b229a0ee"
tags:
  - llm-routing
  - llm-serving
  - provider-selection
  - online-learning
  - inference-cost
---

## TL;DR

Choosing an open-weight model does not determine the service a client receives: providers hosting the same weights can differ substantially in quality, latency, availability, and price. The paper formulates [[concepts/provider-aware-llm-routing|Provider-Aware LLM Routing]] as a downstream layer beneath model routing. Its measured-map policy selects the cheapest healthy provider within a task-specific quality margin, while FACET probes and certifies each provider-task pair before serving it and monitors certified routes for drift. Measurements and replay experiments show meaningful savings but also establish that safe routing depends on task labels, a maintained anchor, and trustworthy quality evidence.

[[index|Library home]]

## Research Question

After an application has selected an open-weight LLM, how should it choose among competing providers when price, latency, health, and task-conditioned answer quality differ and change over time?

## Motivation

Conventional LLM routers choose among models and generally treat each model's listed price and quality as stable. In a multi-provider market, however, the selected model can be served with different quantization, kernels, batching policies, reliability, and endpoint behavior. The client-visible result is a second routing decision that a model-level router leaves unresolved. The paper asks whether price or static provider labels suffice for this decision and argues that provider feasibility must instead be measured per task and updated as endpoints drift.

## Contributions

- Formalizes same-model provider selection as minimizing request cost subject to task-conditioned quality, health, and optional latency constraints.
- Measures provider heterogeneity across six open models, multiple tasks, competing endpoints, and three waves spanning 43 days.
- Introduces a measured-map policy that selects the cheapest quality-equivalent healthy provider and evaluates its sensitivity to stale maps, quality margins, health thresholds, and latency budgets.
- Introduces FACET, which separately certifies provider-task facets, sends uncertified traffic to an anchor, and monitors admitted facets for later degradation.
- Tests robustness to task-label errors, out-of-distribution traffic, sparse or noisy feedback, systematic evaluator bias, and composition beneath an upstream model router.
- Demonstrates cold-start certification and migration in a 36-hour live run, while explicitly distinguishing this from real-world validation of quality-slip detection.

## Method

For a model $w$ and task context $c$, the provider decision minimizes cost over providers $p$ subject to a latent quality floor $q_p(w,c,t) \geq \theta_{w,c}$, a health threshold, and, when required, a latency budget. Provider price, latency, and health are observable; current task-conditioned quality must be estimated.

The measurement study pins requests to individual providers through one public aggregator with fallback disabled. It records accuracy, realized cost, mean latency, and availability for light probes and for GSM8K, MMLU, and HumanEval. The primary measured-map rule admits providers whose measured accuracy is within five percentage points of the best provider in the model-task cell and whose availability is at least 90%, then chooses the cheapest admitted endpoint.

FACET treats each provider-task pair as an independent feasibility facet. A newly attractive endpoint receives certification probes while user traffic falls back to a pre-certified anchor. In replay, certification uses recent labelled observations and point-estimate margins relative to the task floor and same-task cohort. After admission, cohort comparisons and a Bernoulli likelihood-ratio CUSUM monitor the facet for degradation. The live implementation replaces small-sample point estimates with Wilson-interval rules, raises the minimum sample size, and adds availability gating and exponential probe backoff.

## Experiments

### Provider heterogeneity and measured maps

Across reported model-task cells, same-model price varies by as much as 8.8x and latency by as much as 68x; harder tasks show accuracy gaps of tens of percentage points. At benchmark scale, the median within-cell Spearman correlation between price and latency is -0.61, with all 21 evaluated cells negative. Correlations between price and accuracy (+0.05) or availability (0.00) are not stable enough to support price-only feasibility decisions.

The in-sample measured-map policy obtains 94% mean accuracy at 1.57x the cheapest-provider cost with no below-floor cells, compared with 95% for the best-quality oracle. Always choosing the cheapest provider has a 28% below-floor rate, while the premium-provider policy costs 3.67x the cheapest route and still places 17% of cells below the floor. On a 14-cell subset, requiring a one-sided 95% confidence interval to support the five-point quality margin reduces median savings against the premium provider from 55% to 46%.

Routes change even when posted prices do not: 4 of 17 comparable cells change between days 0 and 13, and 2 of 18 change between days 13 and 43. A separate 24-hour price watch finds repeated price changes and cheapest-provider re-elections only in the deeper provider pools observed. The aggregator also hides a first-party peak/off-peak tariff, showing that observable prices can be channel-dependent.

### Online certification and robustness

Replay ablations show that fail-safe anchoring prevents cold-start exposure to an uncertified cheap but degraded endpoint, while task-specific certification prevents evidence from safe tasks from certifying an unsafe task. Continuous monitoring addresses a different failure mode: degradation after admission. Against periodic full-pool probing, targeted certification reduces dedicated probe spending by 8-23x in the tested admission regime; when both policies share a served-feedback monitor, their post-admission exposure becomes similar.

FACET's safety premium is application-dependent. Relative to frozen or periodically refreshed maps, the reported break-even loss assigned to a below-floor answer is roughly the price of an ordinary query or less. Relative to sliding-window UCB, it is about $9.08, or 17 ordinary query prices.

With random task-label corruption, below-floor exposure rises from 0% to 4.72% at 33% error, remaining below the 6.72% context-blind reference in that experiment. Treating unknown tasks as uncertified produces zero exposure as out-of-distribution traffic reaches 50%, whereas mapping those requests to the nearest known facet produces unsafe serves. Symmetric judge noise mainly forces fallback to the anchor, but systematic evaluator bias can incorrectly certify weak providers; ground-truth probes and gold audits reduce this risk.

### Live deployment

In a 36-hour Llama-3.3-70B run across 12 providers, FACET serves 538 queries and issues 130 probes. Traffic moves from a $1.04-per-million-token anchor toward a certified $0.21 endpoint; average served price falls from $0.924 over queries 1-100 to $0.210 after query 300. Serving cost falls by 63.7% relative to the anchor, or 57.1% after probe costs, with aggregate served accuracy of 88.3%. Because no genuine quality collapse occurs, this run validates live certification and migration, not drift detection.

## Limitations

- Measurements pass through one aggregator from one client location, so latency, availability, and even visible pricing are specific to that access channel and geography.
- The study is attribution-agnostic: it observes endpoint differences but cannot isolate whether they arise from quantization, kernels, sampling, serving bugs, rate limits, or aggregator behavior.
- Light probes have modest samples and are better suited to large gaps than marginal quality differences; the five-point equivalence tests are underpowered in many cells.
- FACET is designed for task-selective and abrupt large-gap failures. Sliding-window learners can be cheaper or safer for gradual drift or providers clustered tightly around the quality floor.
- Safety requires a maintained anchor, a usable task or unknown-task signal, and sufficiently trustworthy quality evidence. Systematic evaluator bias can invalidate certification.
- The live deployment observes certification and route migration but no actual provider-quality collapse, so its monitoring mechanism is supported by replay and stress tests rather than a live incident.
- Several mechanism and evaluator-bias experiments use one Llama-3.3-70B/GSM8K replay cell, limiting the reach of their numerical effects.
- The supplied manuscript provides no stable identifier, venue, or explicit publication year.

## Related Concepts

- [[concepts/provider-aware-llm-routing|Provider-Aware LLM Routing]]: the paper's downstream routing layer and its task-conditioned certification problem.
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]: chooses among models or configurations; provider routing begins after this choice and measures endpoint-level feasibility.
- [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]]: frames serving decisions through explicit objectives and constraints, including the quality, cost, health, and latency constraints used here.

## Related Papers

- [[papers/position-llm-serving-needs-mathematical-optimization-and-algorithmic-foundations-not-just-heuristics|Position: LLM Serving Needs Mathematical Optimization and Algorithmic Foundations, Not Just Heuristics]]: provides a broader optimization agenda for routing and other inference-serving decisions.
- Ong et al. (2025), "RouteLLM: Learning to Route LLMs from Preference Data": selects which model answers a query; the present provider layer is evaluated beneath a RouteLLM-style upstream router.
- Chen et al. (2023), "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance": a model-selection and cascading system that leaves same-model provider choice unresolved.
- Li et al. (2026), "When Is the Same Model Not the Same Service? A Measurement Study of Hosted Open-Weight LLM APIs": concurrent measurement work on cross-provider variation without the paper's online task-conditioned routing loop.

