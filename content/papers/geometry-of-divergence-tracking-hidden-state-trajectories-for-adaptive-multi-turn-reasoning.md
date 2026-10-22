---
title: "Geometry of Divergence: Tracking Hidden-State Trajectories for Adaptive Multi-Turn Reasoning"
type: paper
authors:
  - Jie Liang
  - Zhengxin Yu
  - Hamid Nasiri
  - Peter Garraghan
year: null
source_job_id: "b73c2626-535c-4fa9-9573-d8760cafe037"
tags:
  - llm-agents
  - multi-turn-reasoning
  - hidden-state-monitoring
  - adaptive-computation
---

## TL;DR

The paper tracks an LLM agent's turn-by-turn hidden states using temporal curvature and variance slope. Across Math, Code, Retail, and Airline tasks, failed episodes show more directional reversal and narrower state-space exploration than successful episodes, although variance-slope separation is not significant in the two Airline settings. On $\tau$-Bench, geometry-conditioned thinking raises mean task reward from 0.241 to 0.396 while reducing mean token cost from 104.8k to 93.0k. The method requires access to internal activations and calibration of task- and model-dependent thresholds.

## Research Question

Can the geometry of an LLM's hidden-state trajectory across dialogue turns identify impending agent failures and determine when additional reasoning should be activated?

## Motivation

Long interaction histories can accumulate mistaken assumptions, irrelevant deliberation, and conflicting constraints. Text-level planning, reflection, and memory methods alter the explicit context but do not directly measure how that context changes the underlying model's representation. [[concepts/multi-turn-hidden-state-trajectory-geometry|Multi-Turn Hidden-State Trajectory Geometry]] treats successive turn representations as a path that can be monitored before an episode ends.

## Contributions

- Defines temporal curvature and variance slope as complementary turn-level measurements of directional consistency and trajectory dispersion.
- Compares successful and failed trajectories across open-ended reasoning and tool-grounded agent tasks using three underlying LLMs.
- Decomposes $\tau$-Bench behavior into three-action windows over Read, Write, Respond, and Transfer actions, showing that discriminability depends on the action pattern.
- Uses geometric measurements as online triggers for adaptive thinking and compares them with fixed, action-conditioned, and learned trigger policies.

## Method

At turn $t$, the method extracts $h_t$, the hidden state at the final token of the user input, from a fixed intermediate layer: layer 22 for Qwen3-14B, layer 42 for Qwen3-32B, and layer 16 for Llama-3.1-8B. Consecutive displacements are $v_t=h_t-h_{t-1}$. Temporal curvature is their cosine similarity,

$$
\kappa_t=\frac{v_t\cdot v_{t-1}}{\lVert v_t\rVert_2\lVert v_{t-1}\rVert_2},
$$

so negative values indicate a reversal relative to the preceding update. For every prefix through turn $t$, dispersion $V(\lambda)$ is the trace of the sample covariance of states through prefix length $\lambda$. Variance slope $\beta_t$ is the ordinary least-squares slope of $V(\lambda)$ against prefix length. Positive values indicate expanding dispersion; negative values indicate contraction.

Both measurements start at turn 2 and use one pre-action state per turn. This turn alignment is intended to prevent episode length from mechanically driving comparisons. The action-chain analysis assigns each assistant action to Read, Write, Respond, or Transfer and groups sliding windows of three consecutive actions.

For online control, a binary trigger chooses whether the model enters thinking mode. Training-free policies fire when $\kappa_t<\tau_\kappa$ or $\beta_t>\tau_\beta$. A learned comparator combines recent action one-hots with both geometric measurements. Except for Never-thinking, all policies think during the first two turns because curvature is not yet defined.

## Experiments

The study uses Math and Code tasks from the sharded-prompt setup of *Lost in Conversation* and Airline and Retail tasks from $\tau$-Bench. Trajectory analyses cover Qwen3-14B, Qwen3-32B, and Llama-3.1-8B; adaptive-control experiments use the two Qwen3 models. Correctness is binary, and token accounting includes context, tool calls, and thinking overhead.

Across six reported task-model pairings, successful episodes have higher mean curvature than failed episodes. The correct-minus-incorrect gaps range from +0.030 on Retail with Qwen3-14B to +0.148 on Code. Successful episodes also have higher variance slopes in all six pairings, but the difference is not significant for Airline with Qwen3-14B ($p=0.30$) or Qwen3-32B ($p=0.057$).

Action composition changes which measurement is useful. Read-dominated chains are frequent but weakly discriminative, while output-heavy or switching chains carry stronger separation. Respond$\rightarrow$Respond$\rightarrow$Respond is especially concentrated among failures: it accounts for 8.2% versus 3.6% of Retail windows and 23.6% versus 9.1% of Airline windows in incorrect versus correct episodes.

On the four $\tau$-Bench domain-model settings, geometry-conditioned triggers average 0.396 reward versus 0.241 for Never-thinking, while mean token cost falls from 104.8k to 93.0k. For Retail with Qwen3-32B, the curvature trigger reaches 0.442 reward, compared with 0.405 for the learned trigger and 0.347 for Never-thinking. Across all four settings, geometry-conditioned policies also produce fewer max-turn terminations than the fixed policies.

## Limitations

- The method requires white-box access to a model's intermediate hidden states and a model-specific probe layer, so it does not directly apply to closed API models.
- Evidence covers four tasks and three open-weight model configurations. The control study is limited to $\tau$-Bench and Qwen3, and each configuration is evaluated over five trials per task.
- Curvature thresholds vary by domain and model scale. Calling the statistic training-free does not remove the need to choose or recalibrate a threshold from diagnostic data.
- Variance slope does not significantly separate outcomes in the two Airline settings, and action-conditioned results show that useful triggers do not transfer uniformly across domains.
- Turn alignment reduces trajectory-length confounding but does not establish that the geometric measurements cause failure. Longer or more difficult episodes may differ in other ways before termination.
- Token cost includes failure length as well as deliberation, so lower cost can reflect fewer stalled or max-turn episodes rather than only cheaper reasoning at each turn.
- The supplied Markdown provides no publication venue or stable identifier; the year is therefore left unset.

## Related Concepts

- [[concepts/multi-turn-hidden-state-trajectory-geometry|Multi-Turn Hidden-State Trajectory Geometry]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]: uses related path measurements across network layers rather than dialogue turns.
- [[concepts/adaptive-computation|Adaptive Computation]]: allocates inference effort conditionally instead of using a fixed reasoning budget.

## Related Papers

Works discussed in the supplied paper:

- Laban et al. (2025), "LLMs Get Lost in Multi-Turn Conversation": supplies the sharded Math and Code tasks and motivates multi-turn degradation.
- Yao et al. (2024), "$\tau$-Bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains": supplies the Airline and Retail environments.
- Zhang et al. (2025), "ICR Probe: Tracking Hidden State Dynamics for Reliable Hallucination Detection in LLMs": analyzes cross-layer hidden-state dynamics for individual responses rather than trajectories across turns.
- Cuadron et al. (2025), "The Danger of Overthinking: Examining the Reasoning-Action Dilemma in Agentic Tasks": motivates selective rather than uniformly extended deliberation.

Related library reading, without implying citation by this paper:

- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]] studies hidden-state paths over layer depth with observational geometric measurements.
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]] regularizes latent turning angles for planning, whereas this paper monitors unregularized dialogue trajectories to trigger reasoning.

[[index|Library home]]
