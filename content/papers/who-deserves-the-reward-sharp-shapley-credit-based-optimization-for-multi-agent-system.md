---
title: "Who Deserves the Reward? SHARP: Shapley Credit-based Optimization for Multi-Agent System"
type: paper
authors:
  - Yanming Li
  - Xuelin Zhang
  - Wenjie Lu
  - Ziye Tang
  - Maodong Wu
  - Haotian Luo
  - Tongtong Wu
  - Zijie Peng
  - Hongze Mi
  - Yibo Feng
  - Naiqiang Tan
  - Chao Huang
  - Lian Peng
  - Li Shen
year: null
source_job_id: "7f3d1a21-6f7b-4a96-9ca9-2467326e4335"
tags:
  - llm-agents
  - multi-agent-reinforcement-learning
  - credit-assignment
  - shapley-values
  - tool-use
---

## TL;DR

SHARP trains a shared-policy planner-worker [[concepts/llm-multi-agent-systems|LLM multi-agent system]] with separate rewards for final-answer accuracy, each worker's counterfactual marginal contribution, and valid tool execution. On four main benchmarks with a Qwen3-8B backbone, it reports a 32.56 average score versus 30.81 for MATPO and 27.89 for single-agent GRPO. Its agent credit is a one-agent masking approximation to Shapley attribution, not an exhaustive average over coalitions, and denser credit evaluation nearly doubles reported per-batch training latency.

## Research Question

Can agent-specific marginal rewards improve the accuracy, stability, and coordination of a hierarchical tool-using multi-agent system compared with broadcasting the same terminal reward to every participating agent?

## Motivation

In a planner-worker trajectory, final success does not reveal whether the plan was sound, which workers supplied useful evidence, or which tool calls were harmful. Broadcasting one sparse outcome reward to every role can therefore reinforce weak actions and obscure useful ones. SHARP addresses this [[concepts/multi-agent-credit-assignment|multi-agent credit assignment]] problem while retaining a shared policy for planning and execution.

## Contributions

- Introduces a three-part reward combining global answer accuracy, agent-level marginal credit, and tool-process validity.
- Estimates worker contribution by masking one worker from a completed trajectory and measuring the change in terminal accuracy; planner credit is the scaled mean of positive worker contributions.
- Normalizes rewards separately by agent identity across sampled trajectory groups and optimizes a clipped group-relative objective.
- Evaluates the method across multi-hop question answering, web traversal, retrieval-augmented generation, and document-level numerical reasoning, with ablations for planner and worker credit.
- Uses learned marginal credits to characterize useful, neutral, and harmful worker calls and examines the training-cost versus inference-efficiency trade-off.

## Method

### Shared Planner-Worker Policy

A single policy is conditioned by role-specific prompts. The planner decomposes a query into subtasks, and worker instances execute those subtasks through tools. A full trajectory contains the planner trace and all worker traces, so both roles can be updated jointly.

### Compositional Rewards

Each participating agent receives a weighted sum of three signals. The broadcast term is binary final-answer accuracy. The [[concepts/execution-validity-rewards-for-tool-learning|tool-process reward]] averages a validity function over that agent's tool calls. For worker $m$, the marginal-credit term is

$$
R^{\mathrm{mc}}_{i,m}=R_{\mathrm{acc}}(\tau_i)-R_{\mathrm{acc}}(\tau_i^{\setminus m}),
$$

where $\tau_i^{\setminus m}$ masks that worker while preserving the environment and other interactions. The planner receives $\lambda$ times the mean positive worker credit. Although motivated by the Shapley value, this calculation evaluates individual removal from the realized trajectory rather than averaging a worker's marginal contribution over every coalition.

### Group-Relative Optimization

For each agent identity, SHARP standardizes the combined reward across $G$ sampled trajectories using that agent's group mean and standard deviation. It then applies a clipped policy-ratio objective and averages updates over agents and trajectories. The reported implementation uses eight rollouts per input, a global batch size of 256, 180 gradient steps, and reward weights $\alpha=0.9$, $\beta=0.9$, and $\gamma=0.1$.

## Experiments

The principal evaluation uses MuSiQue, GAIA-text, WebWalkerQA, and FRAMES. MuSiQue supplies 5,975 training instances and a 200-instance test set; the other benchmarks are evaluated without task-specific training data. DocMath-Eval tests transfer across simple/complex and short/long document settings. Comparisons include RAG and planning baselines, single-agent GRPO, untrained planner-worker systems, G-Designer, CARD, COA, AceSearcher, and MATPO.

| Qwen3-8B method | MuSiQue | GAIA-text | WebWalkerQA | FRAMES | Average |
| --- | ---: | ---: | ---: | ---: | ---: |
| Single-agent GRPO | 45.93 | 27.97 | 7.47 | 30.20 | 27.89 |
| Hierarchical MAS | 38.23 | 27.53 | 7.42 | 32.18 | 26.34 |
| MATPO | 47.00 | 31.65 | 7.47 | 37.10 | 30.81 |
| SHARP | **50.76** | **33.70** | **8.50** | **37.29** | **32.56** |

The paper reports average relative match gains of 23.66% over selected single-agent baselines and 14.05% over selected multi-agent baselines. In the MuSiQue ablation, the 47.00 baseline rises to 47.60 with planner-only credit, 48.00 with worker-only credit, and 50.76 with both. Across Qwen3 models from 0.6B to 8B, SHARP rises from 6.29 to 50.76 on MuSiQue; at 8B it leads the single-agent baseline by 14.41 points. On GAIA-text, accuracy increases from 27.53 to 33.70 over 180 steps while the compared curves fluctuate.

Coordination analysis reports a planner score of 0.5084 for SHARP, versus 0.4542 for the vanilla system and 0.4804 for MATPO. Useful worker calls increase from 11.03% to 12.96%, and harmful calls decrease from 5.48% to 4.40%. Raising the fraction of workers receiving marginal-credit evaluation from zero to one increases per-batch training latency from about 684 to 1,345 seconds, while reported inference tokens fall from about 9.1k to 8.3k and accuracy rises from 47.00% to 50.76%.

## Limitations

- The proposed credit is Shapley-inspired but does not compute the full coalition-weighted Shapley value. It measures the effect of removing one worker from an observed trajectory, and the paper does not compare this approximation with exact or sampled coalition estimates.
- Counterfactual masking assumes the modified trajectory remains a meaningful basis for attribution while other agents and interactions are preserved. The evaluation does not isolate errors introduced by this counterfactual construction.
- Marginal-credit computation adds substantial offline cost: full credit evaluation raises reported per-batch latency from roughly 684 to 1,345 seconds.
- Useful workers remain a small minority of calls after training (12.96%), leaving considerable neutral or redundant computation.
- Most headline comparisons use one 8B Qwen backbone, and MuSiQue is the only stated training source. Transfer is tested on four datasets, but broader model families, agent topologies, and non-retrieval tasks remain unestablished.
- Reward coefficients are tuned, while sensitivity to $\alpha$, $\beta$, $\gamma$, the planner scale, group size, and masking design is not reported in the supplied manuscript.
- The supplied Markdown gives no stable paper identifier, venue, or explicit manuscript year; these metadata are therefore left unspecified.

## Related Concepts

- [[concepts/multi-agent-credit-assignment|Multi-Agent Credit Assignment]]: separates each participant's learning signal from the team outcome.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: the broader class of coordinated language-model agents in which SHARP uses a hierarchical planner-worker structure.
- [[concepts/execution-validity-rewards-for-tool-learning|Execution-Validity Rewards for Tool Learning]]: supplies process feedback for well-formed, executable tool calls but does not establish task utility.
- [[concepts/shap-feature-attribution|SHAP Feature Attribution]]: another use of Shapley values for allocating a total quantity; SHARP instead attributes team reward to agents.

## Related Papers

- Mo et al. (2025), "Multi-Agent Tool-Integrated Policy Optimization": the strongest reported Qwen3-8B multi-agent baseline, using broadcast rewards without marginal-credit modeling.
- Xu et al. (2025), "AceSearcher: Bootstrapping Reasoning and Search for LLMs via Reinforced Self-Play": a planner-worker reinforcement-learning baseline evaluated with a LLaMA-3.1-8B backbone.
- Hong et al. (2025), "Multi-Agent Deep Research: Training Multi-Agent Systems with M-GRPO": extends group-relative optimization to multi-agent research systems.
- Shao et al. (2024), "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models": provides the GRPO foundation used for SHARP's group-relative updates.
- Motwani et al. (2024), "MALT: Improving Reasoning with Multi-Agent LLM Training": prior work on training multi-agent language-model systems.

[[index|Library home]]
