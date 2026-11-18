---
title: "Mastering Asymmetrical Multiplayer Game with Multi-Agent Asymmetric-Evolution Reinforcement Learning"
type: paper
authors:
  - Chenglu Sun
  - Yichi Zhang
  - Yu Zhang
  - Ziling Lu
  - Jingbin Liu
  - Sijia Xu
  - Weidong Zhang
year: null
source_job_id: "33ce4931-da9d-444a-b1e0-f1f118ed8279"
tags:
  - multi-agent-reinforcement-learning
  - asymmetric-games
  - self-play
---

## TL;DR

Asymmetric-evolution training (AET) jointly improves distinct cat and mouse policies in the 1v4 game Tom & Jerry by adapting sampling resources and randomizing difficult situations to counter persistent competitive imbalance. The mouse team won 64 of 65 matches against invited human cat players (98.5%), including 19 of 20 against the professional group. Training used no human demonstrations, but incorporated substantial game-specific reward and scenario design.

## Research Question

How can competing policies with different rules, objectives, and team sizes continue improving when one side's dominance deprives the other of successful experience?

## Motivation

In asymmetric competition, improving one policy does not automatically improve its opponent. A weaker side can receive mostly unsuccessful trajectories, while a dominant side encounters too few adverse situations and forgets how to recover. Fixed sampling allocations may therefore stall both sides even when historical opponents are available.

## Contributions

- A distributed framework jointly trains separate cat and mouse policies with latest and historical opponents.
- Adaptive data adjustment (ADA) redirects sampling resources toward the weaker side; environment randomization (ER) exposes the stronger side to disadvantages.
- Human matches and seven-day ablations evaluate the resulting policies and the contributions of these training choices.

## Method

Separate trainers, replay buffers, and sampler clusters learn cat and mouse policies using dual-clip PPO and generalized advantage estimation. Policies consume observable information; value networks additionally receive invisible information during training. A ResNet encodes a 72 × 48 × 8 spatial representation, while MLPs encode entity, global, and explicit historical information. Action masks constrain two output heads for 18 actions and 16 directions. Explicit memory features replace a recurrent network.

AET samples the latest opponent with probability 80% and a historical opponent with probability 20%. Historical selection uses prioritized fictitious self-play with weights proportional to one minus the current policy's win rate against each candidate. The historical pool size is 500.

ADA updates the mouse sampler fraction by adding 0.25 times the cat-minus-mouse win-rate gap when the cat is ahead, or the full gap otherwise, then clips the fraction to [0.5, 0.8]. This is a game-specific resource controller rather than a fixed equal allocation.

When imbalance persists, ER can increase the weaker side's character level (45% probability), impose a difficult scenario on the stronger side (35%), or temporarily strengthen the weaker side at the start (15%). These scenarios were designed through game analysis and professional consultation. The paper does not establish that these events are mutually exclusive.

Role-specific reward shaping combines ordinary task rewards, guidance rewards that decay or apply only on first completion, and shared mouse-team rewards. The discount factor is 0.9995. Together these choices implement [[concepts/asymmetric-competitive-co-training|Asymmetric Competitive Co-Training]].

## Experiments

Training reports 138 NVIDIA 2080Ti GPUs and 55,000 CPUs. Cat and mouse models contain 4.37M and 4.89M parameters. Initial training against the highest built-in behavior-tree bots takes seven days and exceeds 95% win rate; subsequent branches add AET, ADA, ER, and expanded opponent roles. Seven days is not the reported duration of the entire final training run.

Twenty invited players comprised five Master, eight Diamond, and seven Platinum players. Humans controlled cats against a fixed AI mouse lineup, avoiding the confound of newly assembled human teams. Practical mean AI response time was 0.252 seconds.

| Evaluation | Mouse AI result |
| --- | --- |
| All invited human players | 64/65 wins (98.5%) |
| Professional group | 19/20 wins |
| Other invited players | 45/45 wins |

The final cat policy exceeded 40% wins against the final mouse policy; this is not a human-opponent evaluation of the cat.

Seven-day ablations using 4,000 samplers per test compare TrueSkill outcomes. ADA outperforms fixed sampling allocations, ER improves performance, and 20% historical opponents performs better than 0% or 50%. Separate tests support explicit memory, invisible critic information, and a discount of 0.9995 over 0.995 or 0.999. Exact plotted TrueSkill values are not transcribed in the supplied Markdown.

## Limitations

The evidence comes from one proprietary game, a fixed four-character mouse lineup, and a limited invited human sample. The overall 98.5% figure includes Platinum and Diamond opponents, not only Master players. Cat-versus-human performance remains future work. No-human-data training still uses expert reward shaping and scenario design. High compute cost restricted character coverage, and hyperparameters require adaptation in other environments. The supplied text does not state a publication year or stable identifier; these are left unset.

## Related Concepts

- [[concepts/asymmetric-competitive-co-training|Asymmetric Competitive Co-Training]]: maintaining useful learning conditions across distinct competing roles.

## Related Papers

- Bansal et al. (2018), “Emergent Complexity via Multi-Agent Competition”: competitive learning and emergent behavior, cited as encountering asymmetric training imbalance.
- Baker et al. (2019), “Emergent Tool Use from Multi-Agent Autocurricula”: a cited precedent for curricula emerging through competition.
- Vinyals et al. (2019), “Grandmaster Level in StarCraft II Using Multi-Agent Reinforcement Learning”: the source of prioritized historical-opponent sampling.
- Ye et al. (2020), “Mastering Complex Control in MOBA Games with Deep Reinforcement Learning”: the dual-clip PPO precedent used for training stability.
