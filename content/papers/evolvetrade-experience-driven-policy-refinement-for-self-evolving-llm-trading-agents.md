---
title: "EvolveTrade: Experience-Driven Policy Refinement for Self-Evolving LLM Trading Agents"
type: paper
authors:
  - Sehee Kim
  - Yumin Choi
  - Minki Kang
  - Sung Ju Hwang
year: 2026
tags:
  - llm-agents
  - financial-trading
  - tool-use
  - prompt-optimization
  - online-adaptation
---

## TL;DR

EvolveTrade treats a frozen trading agent's system prompt as an editable policy for gathering evidence, calling tools, checking signals, controlling risk, and allocating a portfolio. A separate Policy Agent periodically rewrites that policy from recent decision rationales and realized portfolio feedback. Across six one-month market regimes and two LLM backbones, the method has the best Sharpe ratio and cumulative return among the evaluated LLM methods in three model-regime pairs, but loses to static agents in both April windows. Its strongest evidence is therefore not universal return improvement, but a traceable change in operational behavior: evolved policies use executable analysis more often, introduce regime-relevant metrics, and alter allocations in ways that can be connected to subsequent returns.

## Research Question

Can a tool-using LLM trading agent improve its risk-return performance by updating the natural-language policy that governs its information acquisition, verification, risk control, and portfolio construction from its own realized trading experience, while leaving model weights and tool interfaces fixed?

## Motivation

Tool access does not determine how an agent uses those tools. In the paper's motivating runs, a fixed prompt leads GPT-5-mini to repeat nearly the same five metrics across sideways, drawdown-recovery, and uptrend regimes, while rarely or never computing indicators such as RSI, EMA, value at risk, and signal normalization. Static prompts therefore lock in an analytic vocabulary before deployment and cannot incorporate evidence about which procedures worked after trades were realized. EvolveTrade frames this as [[concepts/online-tool-use-policy-refinement|Online Tool-Use Policy Refinement]], distinct from changing model parameters or merely adding memory.

## Contributions

- Represents the operational system prompt as a text-parameterized policy that can change during deployment while the backbone LLM and tool interfaces remain frozen.
- Constructs each refinement record from the submitted allocation and per-asset rationale together with daily portfolio return, asset returns, resulting allocations, and portfolio state.
- Uses a separate Policy Agent to rewrite the full policy after fixed-size batches, linking concrete trajectory evidence to specific procedural edits.
- Evaluates policy evolution across six post-cutoff market regimes, two LLM backbones, static and evolving agent controls, rule-based strategies, transaction costs, update-frequency sensitivity, and a 50-day horizon.
- Connects policy edits to observable tool-use and allocation changes through metric-usage maps, tool-call counts, and specific-day return attribution.

## Method

On trading day $t$, a frozen LLM receives the current natural-language policy, the previous portfolio state, and access to price retrieval, news search, and Python code execution. It produces a long-only allocation over 15 US equities and cash plus a per-asset rationale. After execution, the environment records realized portfolio and asset returns and the resulting portfolio state. These outputs form a refinement record that combines what the agent decided and why with what subsequently happened.

The policy remains fixed within a batch of $N$ trading days. At the batch boundary, a Policy Agent receives the current policy and the batch of refinement records. A fixed update instruction asks it to identify grounded procedural strengths and weaknesses and rewrite the complete policy. The revision may change tool selection, query construction, signal interpretation, evidence checks, risk controls, allocation logic, or output structure. Experiments use $N=5$ unless otherwise noted.

The comparison isolates both tool access and adaptation. Static Base receives prefetched observations without tools; Static Tool-Calling uses the same tools as EvolveTrade under a fixed policy; EvolveBase updates a tool-free policy; and EvolveStrategy updates high-level strategy while keeping operational tool protocols fixed.

## Experiments

### Main evaluation

GPT-5-mini is tested in January, April, and September 2025, representing sideways, drawdown-recovery, and uptrend regimes. Gemini-2.5-Flash is tested in November 2025, February 2026, and April 2026, representing bearish, sideways, and bullish regimes. Each LLM configuration is run three times. Metrics include annualized Sharpe ratio (SR), cumulative return (CR), maximum drawdown, win rate, and daily volatility.

EvolveTrade records the highest SR and CR among the LLM methods for GPT-5-mini in January (SR 5.12, CR 5.10%) and September (SR 8.43, CR 6.84%), and for Gemini-2.5-Flash in November (SR -1.03, CR -1.07%). In February 2026 it reaches SR 2.75 and CR 2.92%, slightly above the Static Tool-Calling Agent but below EvolveStrategy. It underperforms the strongest static comparator in April 2025 and April 2026. Across repeated runs, its standard deviations are generally comparable to those of the other evolving agents.

### Behavioral evidence

Under GPT-5-mini, EvolveTrade raises mean code-interpreter use from about 1.0 call per day to 2.6-4.5 across regimes without increasing news search overall. It activates tail-risk analysis such as VaR and signal normalization during the April drawdown and trend indicators such as SMA, EMA, and RSI during the September uptrend, all absent from the Static Tool-Calling baseline's calls in those tests.

On January 24, 2025, the evolved policy assigns NVDA 2.9% rather than the static agent's 10.7%, prioritizing longer-horizon risk-adjusted evidence and sizing checks. After NVDA falls 17.0% on the next trading day, EvolveTrade returns -0.03% versus -1.11% for the static tool-calling agent. A September case similarly attributes 0.638 percentage points of next-day advantage to larger code-derived weights in JPM, CAT, WMT, and TSLA. These cases illustrate mechanisms rather than establishing general causal effects.

### Robustness and sensitivity

With 10 basis points of proportional transaction costs, EvolveTrade retains its leading SR and CR in the same three model-regime pairs and has lower turnover than Static Tool-Calling and EvolveStrategy in all six windows. A 50-trading-day GPT-5-mini evaluation reports SR 4.00 and CR 10.56%, ahead of the listed baselines; policy length grows and periodically contracts rather than increasing monotonically.

Update frequency is non-monotonic. Averaged over the three GPT-5-mini regimes, a five-day interval performs best among 1-, 3-, 5-, and 7-day schedules (SR 3.67, CR 1.78%), whereas daily updates perform worst (SR 1.92, CR 0.16%). The result suggests that revisions need enough feedback to avoid reacting to individual-day noise.

## Limitations

- EvolveTrade does not dominate consistently. In April 2025 and April 2026 it holds 10.1 and 35.9 percentage points more cash than the selected static comparators and posts weaker SR and CR, consistent with missing gains during a recovery and a bullish period.
- The update interval is selected in advance and held fixed, so the framework does not decide when market evidence warrants a policy revision.
- Realized returns provide delayed, noisy feedback. Pairing them with rationales supports procedural diagnosis but does not identify whether a gain or loss was caused by the policy rather than market noise.
- Experiments cover two backbone models, six short market windows, one 15-stock universe, and three stochastic runs per configuration. The 50-day extension remains short relative to deployment horizons.
- The transaction-cost analysis uses a proportional 10-basis-point charge but omits slippage, market impact, and liquidity constraints.
- Case-level attributions trace how different weights affect realized returns after the fact; they do not show that the agent could reliably predict those returns ex ante.
- The supplied manuscript does not state a stable paper identifier or publication venue.

## Related Concepts

- [[concepts/online-tool-use-policy-refinement|Online Tool-Use Policy Refinement]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/tool-use-agent-behavioral-similarity|Tool-Use Agent Behavioral Similarity]]
- [[index|Library home]]

## Related Papers

- Yao et al. (2023), "ReAct: Synergizing Reasoning and Acting in Language Models": provides a foundational pattern for interleaving reasoning and tool actions under a fixed policy.
- Pryzant et al. (2023), "Automatic Prompt Optimization with Gradient Descent and Beam Search": optimizes instructions from language feedback in an offline prompt-search setting.
- Papadakis et al. (2026), "ATLAS: Adaptive Trading with LLM Agents through Dynamic Prompt Optimization and Multi-Agent Coordination": adapts trading prompts and motivates the EvolveStrategy comparator.
- Chen et al. (2026), "SHARP: A Self-Evolving Human-Auditable Rubric Policy for Financial Trading Agents": represents a related approach to adaptive, inspectable trading policies.

