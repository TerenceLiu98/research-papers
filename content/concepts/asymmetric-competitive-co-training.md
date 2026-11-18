---
title: Asymmetric Competitive Co-Training
type: concept
aliases:
  - Co-Training in Asymmetric Games
definition: "Joint training of distinct competing policies whose roles differ in rules, objectives, or team sizes, with learning conditions adapted to sustain progress on both sides."
tags:
  - multi-agent-reinforcement-learning
  - asymmetric-games
  - curriculum-learning
---

## Overview

Asymmetric competitive co-training improves separate policies for opposing roles whose learning problems differ. Progress depends on the quality of both opponents: a weak opponent can limit the stronger policy's learning, while persistent defeat can deny the weaker policy useful successful trajectories.

## Key Ideas

- Balance learning opportunity, not necessarily compute equally. A cooperative team may require more experience than its lone adversary.
- Adapt sample collection using performance feedback as relative strength changes.
- Preserve historical opponents to diversify strategies and reduce exploitation of a single current opponent.
- Give dominant policies adverse situations to practice recovery, while providing weaker policies opportunities for successful exploration.
- Balanced training win rates are a control signal, not sufficient evidence of strong play; evaluate externally under ordinary game conditions.

## Important Papers

- [[papers/mastering-asymmetrical-multiplayer-game-with-multi-agent-asymmetric-evolution-reinforcement-learning|Mastering Asymmetrical Multiplayer Game with Multi-Agent Asymmetric-Evolution Reinforcement Learning]]: jointly trains cat and mouse policies with adaptive sampler allocation and environment randomization; demonstrates strong mouse-team performance against invited human players in Tom & Jerry.

## Related Concepts

- [[concepts/self-play-pretraining|Self-Play Pretraining]]: also adapts a learning distribution through feedback, but its generator–learner formulation targets transferable prediction rather than opposing game roles.
