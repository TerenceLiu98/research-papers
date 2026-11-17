---
title: "Win-Stay, Lose-Shift"
type: concept
aliases:
  - WSLS
  - Pavlov Strategy
definition: "Win-stay, lose-shift is a repeated-game response rule that repeats an action after a satisfactory outcome and changes it after an unsatisfactory outcome."
tags:
  - repeated-games
  - cooperation
---

## Overview

Win-stay, lose-shift conditions the next action on whether the previous outcome was satisfactory. In the Prisoner's Dilemma version discussed here, mutual cooperation and successful unilateral defection count as wins, while exploitation and mutual defection count as losses.

## Key Ideas

- **State-dependent response.** From the focal player's perspective, the policy chooses cooperation after $CC$ or $DD$ and defection after $CD$ or $DC$.
- **Recovery after disruption.** When both players follow this policy, an isolated unilateral defection leads to mutual defection and then back to mutual cooperation.
- **Learning versus prescription.** A learner can acquire this response pattern without being assigned the rule. Its emergence depends on payoffs and learning dynamics.
- **Value retention differs from state memory.** In tabular Q-learning, the learning rate controls persistence of prior value estimates even when the observed state contains only the last round.

## Important Papers

- [[papers/emergence-of-cooperation-in-two-agent-repeated-games-with-reinforcement-learning|Emergence of cooperation in two-agent repeated games with reinforcement learning]] identifies paired WSLS-like learned policies in the high-cooperation regime and analyzes their competition with tolerant and defective modes.
- Nowak and Sigmund (1993), “A strategy of win-stay, lose-shift that outperforms tit-for-tat in the Prisoner's Dilemma game,” is a foundational reference cited by that study.

## Related Concepts

- [[concepts/hypothesis-based-opponent-modeling|Hypothesis-Based Opponent Modeling]] explicitly predicts another player's rule; WSLS itself is a conditional response rule and requires no explicit opponent hypothesis.
