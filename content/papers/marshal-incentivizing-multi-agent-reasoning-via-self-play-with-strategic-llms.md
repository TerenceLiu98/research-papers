---
title: "MARSHAL: Incentivizing Multi-Agent Reasoning via Self-Play with Strategic LLMs"
type: paper
authors:
  - Huining Yuan
  - Zelai Xu
  - Zheyue Tan
  - Xiangmin Yi
  - Mo Guang
  - Kaiwen Long
  - Haojia Hui
  - Boxun Li
  - Xinlei Chen
  - Bo Zhao
  - Xiao-Ping Zhang
  - Chao Yu
  - Yu Wang
year: null
source_job_id: "e7e9f3ab-2450-4328-b5d1-94462430a683"
tags:
  - multi-agent-reinforcement-learning
  - self-play
  - credit-assignment
---

## TL;DR

MARSHAL fine-tunes Qwen3 models through cooperative and competitive game self-play, using turn-level returns centered separately by player role. Its 4B generalist improves average reasoning accuracy from 72.45% to 75.96% in MAD and from 79.14% to 82.15% in AutoGen, without downstream task training (Table 1).

## Research Question

Can strategic game self-play teach transferable interaction skills that improve reasoning in multi-agent systems, and how should policy updates assign credit across turns and asymmetric player roles?

## Motivation

A trajectory-wide reward gives every action the same learning signal. Pooling players also mixes return distributions that differ with role, information, and first-move advantage. MARSHAL addresses both problems while using games with verifiable outcomes as a training curriculum.

## Contributions

- A shared-policy self-play framework spanning competitive and cooperative games.
- Turn-level Monte Carlo returns with role-specific mean centering for policy optimization.
- Evaluation on held-out games and downstream debate and cooperative reasoning, including 8B scaling and comparisons separating algorithm choice from game selection.

## Method

All players use the same evolving model. Specialists train on Tic-Tac-Toe, Kuhn Poker, or Mini Hanabi; a generalist trains on all three. Held-out counterparts are Connect Four, Leduc Hold’em, and Simple Hanabi.

For turn k of trajectory i and player role p, the method first sums future rewards, then subtracts the mean cumulative return in the same role group:

$$
R_k^{p,i}=\sum_{j=k}^{K_i}r_j^{p,i},\qquad
A_{k,t}^{p,i}=R_k^{p,i}-\operatorname{mean}(\mathbf R^p).
$$

Every token within a turn receives that turn’s advantage. Games are grouped separately. Despite the term “normalization,” the final displayed estimator uses mean subtraction without division by standard deviation. The clipped policy objective averages across tokens, turns, trajectories, and roles; no learned critic is required (§3.2).

Game outcomes are supplemented with valid-format rewards, terminating penalties for invalid actions, and a length-dependent reward encouraging concise responses. Training uses 200 optimization steps, batches of 128 trajectories per specialist or 384 for the generalist, and eight H100 GPUs. The implementation builds on ROLL, vLLM, Megatron-LM, OpenSpiel, and VS-Bench (Appendix B).

## Experiments

Competitive game evaluations use 1,000 games against MCTS or Nash-equilibrium opponents, evaluating both player positions. Hanabi uses self-play scores. Main-text game returns are normalized against worst-observed and theoretically optimal performance; they are not raw win rates.

Table 1 reports seven-benchmark average accuracy:

| Setting | Qwen3-4B | SPIRAL | MARSHAL generalist | Gain over base |
| --- | ---: | ---: | ---: | ---: |
| Single agent | 60.74 | 63.75 | 62.79 | +2.05 pp |
| MAD | 72.45 | 73.41 | 75.96 | +3.51 pp |
| AutoGen | 79.14 | 80.05 | 82.15 | +3.01 pp |

Benchmarks are MATH500, GSM8K, AQUA-RAT, AIME24, AMC23, MMLU-STEM, and GPQA-Diamond. Generalist gains include MAD GPQA from 37.88% to 45.45% and AutoGen AIME from 56.67% to 66.67%. Transfer is uneven: single-agent AIME falls from 36.70% to 33.30%, and GPQA from 39.39% to 34.85%.

Raw held-out Simple Hanabi return rises from 0.833 to 2.205 for the generalist (Table 15). Fixed-opponent training can improve its training-game score while reducing cross-game transfer. Removing either advantage component reduces several transfer scores, although not every game metric (Tables 3–4).

Appendix F separates games from algorithms: using SPIRAL’s estimator on MARSHAL’s games yields averages of 74.23% in MAD and 80.39% in AutoGen, versus 75.96% and 82.15% for the full method. Competitive-only training yields 75.24% and 80.34%. Appendix E reports 8B average gains of 2.60 pp in MAD and 3.90 pp in AutoGen. Qualitative traces suggest role adaptation and interpretation of partner intent; these are explanatory observations rather than isolated causal tests.

## Limitations

Evidence covers small two-player games, two downstream interaction frameworks, and Qwen3 at 4B and 8B. Single-agent gains do not uniformly exceed SPIRAL, and some benchmarks regress. Qualitative reasoning traces alone do not establish a general theory-of-mind capability.

The supplied text contains reproducibility ambiguities: Appendix B gives rollout temperature 0.6 while Table 5 gives 0.5. Appendix J’s MAD ablation rows often outperform the full-method specialists, whereas AutoGen ablations regress; this does not support a blanket claim that every component improves every downstream setting. The summary preserves the reported main comparisons without resolving these inconsistencies. The supplied Markdown does not establish a publication year or stable paper identifier, so the year is left unspecified.

## Related Concepts

- [[concepts/multi-agent-credit-assignment|Multi-Agent Credit Assignment]]: role-conditioned baselines and temporal returns provide learning signals without counterfactual agent removal.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: learned interaction policies transfer to debate and cooperative conversation frameworks.

## Related Papers

- SPIRAL (Liu et al., 2025), cited in the source, is the competitive self-play baseline; Appendix F separates its estimator from the choice of games.
- MT-GRPO (Zeng et al., 2025), cited in the source, uses turn-wise reward normalization; Appendix G compares it with MARSHAL’s sum-then-center approach.
- [[papers/who-deserves-the-reward-sharp-shapley-credit-based-optimization-for-multi-agent-system|SHARP]] provides a conceptual comparison: counterfactual worker attribution differs from MARSHAL’s role-conditioned return baselines. This is a library connection, not a reported comparison in MARSHAL.

Source: supplied parsed manuscript, §§3–4 and Appendices B–J. Code repository reported by the manuscript: https://github.com/thu-nics/MARSHAL.
