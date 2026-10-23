---
title: "AgenticPay: A Multi-Agent LLM Negotiation System for Buyer–Seller Transactions"
type: paper
authors:
  - Xianyang Liu
  - Shangding Gu
  - Dawn Song
year: null
source_job_id: "f92c20f9-26dd-49a7-a1a2-42714172a4b8"
tags:
  - llm-agents
  - multi-agent-systems
  - negotiation
  - agent-evaluation
---

## TL;DR

AgenticPay is a benchmark and simulation framework for natural-language buyer-seller negotiation across 111 tasks, eight market configurations, and ten business scenarios. In the reported inference-only evaluation, three proprietary models complete every negotiation and substantially outperform two smaller open-weight models. The experiments also find consistently higher seller than buyer scores and frequent near-miss timeouts for the open models. Because each task-model combination is run once in a controlled simulation with explicit price and acceptance markers, the evidence characterizes performance under this protocol rather than general real-world bargaining ability.

## Research Question

How effectively can LLM agents negotiate transactions through multi-round language when parties have private reservation prices and markets vary from bilateral bargaining to multi-buyer, multi-seller, and multi-product settings?

## Motivation

Many agent benchmarks isolate reasoning, tool use, or preference following, while economic benchmarks often reduce interaction to numeric bidding. Real transactions combine private constraints, strategic language, repeated counteroffers, heterogeneous products, and competition among possible counterparties. AgenticPay is designed to expose these elements in a common evaluation environment and connect dialogue behavior to structured economic outcomes.

## Contributions

- Formalizes [[concepts/language-mediated-negotiation|Language-Mediated Negotiation]] as a finite-horizon game in which private valuations, public product information, market context, and dialogue history condition buyer and seller policies.
- Provides 111 tasks spanning eight buyer-product-seller configurations: 31 controlled tasks and 80 tasks formed from ten scenarios across consumer, services, procurement, and financial-asset domains.
- Separates environments, task structures, and role-specialized agents, supporting sequential and parallel interaction as well as bilateral and many-to-many markets.
- Maps explicit price proposals and agreement signals into structured actions and evaluates deals using feasibility, surplus balance, role-specific utility, and time-to-agreement.
- Benchmarks GPT-5.2, Claude Opus 4.5, Gemini 3 Flash, Qwen3-14B, and Llama-3.1-8B under a shared deterministic inference protocol.

## Method

### Negotiation Environment

Each buyer has a private maximum willingness-to-pay and each seller a private minimum acceptable price. Product descriptions and market context are public. Agents alternate natural-language messages for at most 20 rounds, with their prompts requiring explicit price markers and an agreement marker. A parser extracts proposed prices and deal decisions; an agreement is valid only when the final price lies in the bargaining zone.

The ten scenarios cover used smartphones, used cars, vacation rentals, website development, commercial photography, home renovation, SaaS software, raw materials, luxury watches, and business acquisitions. Each realistic scenario is instantiated across all eight combinations of single or multiple buyers, products, and sellers. Multi-party negotiation can proceed sequentially, allowing an agent to switch or commit, or in parallel across negotiations.

### Agents and Scores

Buyer and seller agents use a shared role-based architecture with separate dialogue memories and private valuation prompts. The benchmark reports deal rate, timeout rate, price overflow rate, and average rounds together with three discounted outcome scores. GlobalScore rewards a feasible deal, an approximately balanced division of surplus, and early agreement. BuyerScore and SellerScore replace the balance term with the corresponding party's normalized share of the bargaining surplus. The reported parameters are a 30-point completion bonus, 55-point quality bonus, 15-point efficiency bonus, discount factor $0.99$, and failure penalty 15.

## Experiments

All agents use temperature 0, random seed 0, and a maximum response length of 1,024 tokens. Each task is executed once per model. Open-weight inference uses four NVIDIA A800 GPUs; the supplied text reports the proprietary models through cloud APIs under the same prompt templates.

Across all 111 tasks, Claude Opus 4.5 records the highest GlobalScore at 86.9, followed by Gemini 3 Flash at 82.2 and GPT-5.2 at 81.7. All three have 100% deal rates and no timeouts. Qwen3-14B scores 63.9 with a 79.3% deal rate and 20.7% timeout rate; Llama-3.1-8B scores 32.5 with a 51.4% deal rate, 48.6% timeout rate, and 10.8% price overflow rate. Stronger models also terminate sooner: Claude averages 3.7 rounds and GPT 3.8, compared with 7.8 for Qwen and 15.0 for Llama.

SellerScore exceeds BuyerScore for every model. In cross-play, the largest reported role gap is Qwen's 82.4 SellerScore versus 39.2 BuyerScore; even Claude has an 83.6 versus 57.6 gap. The authors interpret this as possible role or behavioral asymmetry, but the experiments do not isolate whether it originates in prompts, score construction, model priors, or scenario design.

Most models improve as buyer and seller multiplicity increases. The paper attributes this counterintuitive result to greater market liquidity and more alternatives, although no intervention separately tests that mechanism. Financial assets produce the lowest scenario-category score for most models. Personality prompts materially alter outcomes: with Claude, a budget-conscious buyer and aggressive seller score 92.7 globally, while a busy-professional buyer and aggressive seller score 44.1.

The open-weight failures point to convergence problems. Of 23 Qwen timeouts, 43.5% come within five price units of agreement; the corresponding figure is 46.3% among Llama's 54 timeouts. Parallel rather than sequential execution raises GlobalScore by 4.4 points for Qwen and 4.5 for Llama in the reported comparison, but Llama's overflow rate rises from 0.08 to 0.17. Proprietary-model results change little across modes.

## Limitations

- Each task-model combination is run once with deterministic decoding, so the study does not quantify run-to-run variation, uncertainty in aggregate rankings, or sensitivity to alternative prompts and seeds.
- The benchmark evaluates five model versions in synthetic, template-governed scenarios. It includes no human baseline, real transaction outcomes, or evidence that benchmark scores predict deployed negotiation quality.
- Explicit price and agreement markers simplify action extraction. The results do not establish robustness to implicit offers, ambiguous acceptance, deceptive statements, malformed outputs, or unrestricted conversation.
- GlobalScore embeds normative choices about balanced surplus, prompt agreement, discounting, and failure penalties. The persistent buyer-seller gap may partly reflect those choices; the paper does not report a reward-design sensitivity analysis.
- Proposed explanations for multiplicity gains, financial-asset difficulty, personality effects, and seller advantage are interpretations rather than identified causal mechanisms.
- The evaluations do not test privacy leakage of reservation values, collusion, strategic misrepresentation, fairness across users, or interactions with humans. The impact statement notes that automated negotiators may disadvantage less sophisticated counterparts.
- The supplied Markdown gives no publication venue, stable paper identifier, or explicit publication year. These fields are therefore not inferred from model dates, access dates, or cited references.

## Related Concepts

- [[concepts/language-mediated-negotiation|Language-Mediated Negotiation]]: the benchmark's core interaction form, combining free-form dialogue with economically consequential structured actions.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: provides the broader setting of role specialization, private state, memory, coordination, and stopping rules.
- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: relates to choosing concessions and commitments whose consequences unfold over later rounds, although AgenticPay measures outcomes rather than decision-fork judgment directly.

## Related Papers

- Bianchi et al. (2024), "How Well Can LLMs Negotiate? NegotiationArena Platform and Analysis": a cited negotiation benchmark with three predefined scenarios.
- Xia et al. (2024), "Measuring Bargaining Abilities of LLMs: A Benchmark and a Buyer-Enhancement Method": cited work focused on bargaining evaluation and buyer enhancement.
- Deng et al. (2024), "LLMs at the Bargaining Table": cited work on bilateral LLM negotiation.
- Zhu et al. (2025), "The Automated but Risky Game: Modeling Agent-to-Agent Negotiations and Transactions in Consumer Markets": cited work emphasizing negotiation risk in restricted consumer settings.
- Lewis et al. (2017), "Deal or No Deal? End-to-End Learning for Negotiation Dialogues": foundational cited work on learned negotiation dialogue.

[[index|Library home]]
