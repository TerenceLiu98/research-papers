---
title: Multi-Adversarial Team Games
type: concept
aliases:
  - MATG
  - MATGs
tags:
  - algorithmic-game-theory
  - adversarial-team-games
  - approximation-algorithms
---

## Overview

A multi-adversarial team game is a finite normal-form game in which teammates share a payoff but randomize independently, while each adversary maximizes a payoff depending on its own action and the team's actions. Other adversaries' actions do not enter that payoff. The shared team payoff is the negative sum of adversary payoffs. The single-adversary case recovers an adversarial team game.

## Key Ideas

- **Payoff independence is structural.** Independent randomization alone is insufficient: the model requires $U_j(\mathbf a,b_j)$, excluding payoff interactions with other adversaries' actions.
- **Shared utility does not permit coordinated team actions.** A team strategy is a product of individual mixed strategies. An equilibrium checks each teammate's unilateral deviations.
- **Additivity avoids joint adversary enumeration.** For fixed team strategy $\mathbf x$, $\max_{\mathbf b}\sum_j U_j(\mathbf x,b_j)=\sum_j\max_{b_j}U_j(\mathbf x,b_j)$. Expected summed utility under correlated adversary actions depends only on their marginals.
- **Correlation provides a proof device.** Marginalizing an approximate equilibrium against a correlated macro-adversary preserves its error guarantee in the original MATG. The algorithm can operate on marginal probabilities without storing the macro-adversary's exponentially large action distribution.
- **Computational access matters.** MATG-GDM combines projected gradient descent with an LP for adversary strategies. Its FPTAS requires polynomial-time exact expected-utility computation, in addition to the payoff structure.
- **Equilibrium quality is incentive-based.** An [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]] limits unilateral gain; it need not maximize the team's equilibrium payoff.

## Important Papers

- [[papers/efficiently-computing-approximate-nash-equilibria-in-multi-adversarial-team-games|Efficiently Computing Approximate Nash Equilibria in Multi-Adversarial Team Games]] (Maddila, Sabbadin, and Vinyals, 2026): formalizes MATGs and establishes an FPTAS under the Polynomial Expectation Property.
- Anagnostides et al. (2023), "Algorithms and Complexity for Computing Nash Equilibria in Adversarial Team Games": the single-adversary algorithmic foundation, cited by Maddila et al.

## Related Concepts

- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: the solution criterion used by MATG-GDM.
