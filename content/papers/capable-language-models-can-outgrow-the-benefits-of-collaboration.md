---
title: Capable language models can outgrow the benefits of collaboration
type: paper
authors: [Yubin Kim, Ken Gu, Chanwoo Park, Chunjong Park, Samuel Schmidgall, A. Ali Heydari, Yao Yan, Zhihan Zhang, Yuchen Zhuang, Yun Liu, Mark Malhotra, Paul Pu Liang, Hae Won Park, Yuzhe Yang, Xuhai Xu, Yilun Du, Shwetak Patel, Tim Althoff, Daniel McDuff, Xin Liu]
year: 2026
doi: 10.1038/s42256-026-01268-y
tags: [llm-agents, multi-agent-systems, agent-evaluation]
---

## TL;DR

Across 260 configurations, collaboration helps some decomposable tasks but can impair sequential planning under matched system compute ceilings. Single-agent baseline performance is the most robust predictor of absolute system performance. A fitted approximately 45% baseline threshold predicts the sign of collaboration gains in 94% of 16 coding/terminal validation configurations; it is an empirical selection rule, not a universal scaling law.

## Research Question

When does coordinating multiple language-model agents improve on a strong single agent with the same prompts, tools, and system-level compute budget?

## Motivation

Parallel exploration can broaden evidence gathering, but communication consumes reasoning capacity and fragments context. Static reasoning benchmarks may miss the state synchronization and cascading errors that arise during sustained environmental interaction.

## Contributions

- A controlled comparison of five coordination architectures across six agentic benchmarks and three model families.
- A predictive architecture-selection model with 87% accuracy on held-out configurations within tested domains.
- A distinction between robust baseline-performance evidence, a validated saturation heuristic, and descriptive coordination patterns.
- Trace-based analysis of verification, overhead, and error propagation across architectures.

## Method

The study compares a single sequential agent with independent parallel agents plus synthesis, centralized orchestrator–worker coordination, decentralized debate and voting, and a hybrid combining hierarchy and peer exchange. Multi-agent systems divide the per-system token allowance among agents; identical ceilings do not imply identical realized consumption.

A linear regression predicts success from model capability, tool and agent counts, single-agent baseline, and empirical coordination metrics with prespecified interactions. Metrics include relative reasoning-turn overhead, message density, output redundancy, success normalized by turn count, and trace-level error amplification. Architecture-level coordination constants are applied across benchmarks. Five-fold configuration-level cross-validation evaluates interpolation; leave-one-domain-out evaluation tests domain transfer.

Task-level amplification is the ratio of failure rates, whereas trace-level amplification measures extra computational work associated with coordination failures. These quantities must not be interpreted interchangeably.

## Experiments

The first four benchmarks contribute 45 configurations each; SWE-bench Verified and Terminal-Bench contribute 40 each. Models span OpenAI, Google, and Anthropic families. BrowseComp-Plus, PlanCraft, and WorkBench use 100 instances per configuration, Finance Agent uses 50, and the two Docker-based benchmarks use 20-instance subsets.

| Finding | Reported result |
| --- | --- |
| Finance Agent, centralized versus single agent | +80.8% relative performance |
| PlanCraft, independent versus single agent | −70.0% relative performance |
| SWE-bench Verified | All four multi-agent variants degrade on average |
| Terminal-Bench | Independent +6.0%; centralized −20.0% relative performance |
| Configuration-level predictive fit | Cross-validated R² = 0.373; 0.413 with task-grounded capability |
| Architecture selection | 87% correct within-domain held-out selection |
| Unseen-domain absolute prediction | Mean leave-one-domain-out R² = −2.09 |

Single-agent baseline is supported by both cluster-robust inference (P = 0.004) and the separately applied Holm correction (P = 0.018). Baseline-scaled error amplification survives cluster-robust inference (P = 0.030), but not both procedures. The baseline-by-team-size interaction underlying the approximately 45% threshold does not survive cluster-robust inference. Its 94% sign-match validation concerns 16 model-by-benchmark configurations, not individual task instances.

Trace-level amplification is 17.2× for independent agents and 4.4× for centralized coordination. These are computational trace measures, not task failure-rate multipliers. The interpretation is that verification can contain propagation even when coordination remains costly.

## Limitations

The threshold and architecture ranking apply to the evaluated model and task range. Negative leave-one-domain-out fit precludes reliable absolute prediction in unseen domains. Only six dataset clusters support robust inference, and the 20-instance coding/terminal subsets have typical per-cell bootstrap intervals around ±20 percentage points. Prompts were controlled rather than tuned separately for each architecture.

Independent agents share a Docker container on coding and terminal tasks: independence means no interagent messages, not isolated mutable state. Public Finance Agent and WorkBench adapters use normalized interfaces; exact upstream score parity requires the upstream harnesses and coordination wrappers. Several coordination patterns are descriptive rather than robustly confirmed effects.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: architecture choice trades exploration and verification against context fragmentation and overhead.
- [[concepts/evidence-conditioned-agent-communication|Evidence-Conditioned Agent Communication]]: a complementary design perspective on controlling harmful information exchange; this paper evaluates broader verification topologies rather than version-bound evidence gates.

## Related Papers

- [[papers/llm-multi-agent-systems-challenges-and-open-problems|LLM Multi-Agent Systems: Challenges and Open Problems]] provides the broader taxonomy of organization, planning, and memory to which these controlled architecture comparisons contribute.

Source: [published article](https://doi.org/10.1038/s42256-026-01268-y), especially Results, Methods, and Extended Data Tables 1–2.
