---
title: "OpenGuanDan: A Large-Scale Imperfect Information Game Benchmark"
type: paper
authors:
  - Chao Li
  - Shangdong Yang
  - Chiheng Zhan
  - Zhenxing Ge
  - Yujing Hu
  - Bingkun Bao
  - Xingguo Chen
  - Yang Gao
year: null
source_job_id: "b85a09a2-52bf-43af-84d9-f01ab9b65c3a"
tags:
  - game-playing
  - reinforcement-learning
  - benchmarks
---

## TL;DR

OpenGuanDan provides a fast simulator and seven baseline agents for four-player, team-based GuanDan. Learned policies dominate handcrafted baselines, and online subgame search improves the strongest learned blueprint, but all three learning-based agents win fewer than half their evaluated rounds against human volunteers.

## Research Question

How can a reproducible GuanDan benchmark expose the remaining difficulties of strategic decision-making under hidden information, teammate coordination, and long-horizon competition?

## Motivation

GuanDan combines hidden hands, compositional legal actions, wild cards, and multi-round level progression. Winning a round changes later card exchanges and card strengths. Cooperation remains necessary even as teammates finish at different times; the paper's “dynamic team composition” refers to changes in active players, rather than reassignment of partnerships.

## Contributions

- A Java simulator covering dealing, tribute, anti-tribute, return tribute, card play, and level progression.
- Customizable observation, legal-action, and reward wrappers, independent player APIs, and a graphical interface for human evaluation.
- Comparisons of GS2, SDMC, DanZero, and four rule-based agents, together with human matchups and action-selection throughput.

The supplied Markdown does not establish the publication year or a stable publication identifier. The project address given in the paper is https://github.com/GameAI-NJUPT/OpenGuanDan.

## Method

The game is formalized both as an extensive-form game with information sets and as a turn-based partially observable stochastic game. Inactive players receive null actions in the latter formulation. The authors advocate strong practical strategies without claiming multiplayer equilibrium guarantees.

Observations encode private cards, unseen card counts, previously played cards, recent actions, other players' remaining card counts, team and round levels, and wild cards. Legal actions are enumerated separately for tribute, return tribute, and play. Round rewards are ±3, ±2, or ±1 according to the winning partner's finishing position; a specified level-A failure case receives zero.

DanZero estimates action values using deep Monte Carlo learning and self-play. SDMC adds expert guidance early in training and stochastic selection among near-maximal-value actions. GS2 uses SDMC as a blueprint and applies [[concepts/subgame-solving|Subgame Solving]] to refine decisions online, reducing the searched information sets to make refinement tractable. The independent APIs can accommodate LLM agents, but this paper does not evaluate an LLM baseline.

## Experiments

Each AI pairing is evaluated over 1,000 games, with the same agent controlling both teammates. Table 1 reports GS2 winning 56.7% against SDMC and 62.0% against DanZero; SDMC wins 57.6% against DanZero. Across the four rule-based opponents, GS2 wins 93.0–100.0%, SDMC 91.2–100.0%, and DanZero 83.2–92.3%.

Human evaluation uses 16 volunteers in eight teams, grouped by experience. Teams choose opponents, and stronger agents deliberately receive more intermediate and advanced opponents. These are round-level results, distinct from the AI game-level comparison:

| Agent | Rounds | Overall agent win rate | Against advanced players |
| --- | ---: | ---: | ---: |
| GS2 | 106 | 42.5% (45/106) | 42.4% |
| SDMC | 106 | 39.6% (42/106) | 32.1% |
| DanZero | 102 | 34.3% (35/102) | 21.9% |

The simulator reports approximately 25 million steps per hour across ten parallel environments on a 24-core Intel Core i9-13900K CPU. Appendix D separately reports action-selection throughput of 102, 136, and 384 steps/s for GS2, SDMC, and DanZero, respectively. Online search improves playing strength while adding inference cost.

## Limitations

Human results come from a small, unevenly assigned volunteer sample without professional players. Simulator unfamiliarity may inflate agent win rates through human operational errors. The results establish performance in this evaluation rather than a calibrated universal human skill rating. Tribute and return policies remain improvement targets, as do simulator and search efficiency. Multiplayer equilibrium convergence is not established. Several mathematical expressions in the supplied extraction are corrupted; the summary uses the accompanying prose rather than reconstructing uncertain formulas.

## Related Concepts

- [[concepts/subgame-solving|Subgame Solving]]: refines a learned blueprint locally during play, with information-set reduction controlling search cost.

## Related Papers

- [[papers/integrating-large-language-models-with-reinforcement-learning-for-generalization-in-strategic-card-games|Integrating Large Language Models with Reinforcement Learning for Generalization in Strategic Card Games]] studies self-play action-value learning in Hearthstone, emphasizing unseen-card generalization rather than GuanDan benchmarking.
- Ge et al. (2023), “Efficient Subgame Refinement for Extensive-Form Games,” supplies the GS2 baseline.
- Lu et al. (2023), “DanZero: Mastering GuanDan Game with Reinforcement Learning,” supplies the deep Monte Carlo baseline.
- Ge et al. (2024), “Solving Guandan Poker Games with Deep Reinforcement Learning,” supplies SDMC.
