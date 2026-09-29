---
title: Approximate Nash Equilibrium
type: concept
aliases:
  - Epsilon-Nash Equilibrium
  - Additive Approximate Nash Equilibrium
tags:
  - algorithmic-game-theory
  - nash-equilibrium
  - approximation-algorithms
---

## Overview

An additive $\varepsilon$-Nash equilibrium is a profile of independent mixed strategies where no player can increase expected utility by more than $\varepsilon$ through a unilateral deviation. It relaxes exact Nash equilibrium while retaining an explicit bound on the incentive to deviate.

## Key Ideas

For a finite game with expected utilities $u_i$ and strategy profile $\sigma$, define

$$
\mathrm{NE\text{-}GAP}(\sigma)=\max_i\left[\max_{a_i}u_i(a_i,\sigma_{-i})-u_i(\sigma)\right].
$$

The profile is an $\varepsilon$-equilibrium exactly when this gap is at most $\varepsilon$. Pure deviations suffice in this calculation because expected utility is linear in a player's own mixed strategy.

- The error is additive in utility units. Rescaling payoffs changes the interpretation of a fixed tolerance, so payoff normalization matters in comparisons.
- A small gap certifies approximate individual stability, not social welfare, team-optimality, or resistance to coordinated deviations.
- The best gap observed over a run is nonincreasing by definition. A cumulative-minimum plot does not establish monotonic improvement of the actual iterates.
- A fully polynomial-time approximation scheme must be polynomial in both the game parameters and $1/\varepsilon$, under the stated representation and utility-evaluation assumptions.
- Solver comparisons should report achieved gaps, completion rates, and runtime together. An exact solver and an approximate solver do not offer identical guarantees.

## Important Papers

- [[papers/efficiently-computing-approximate-nash-equilibria-in-multi-adversarial-team-games|Efficiently Computing Approximate Nash Equilibria in Multi-Adversarial Team Games]] (2026): uses maximum unilateral gain as its stopping criterion and proves an FPTAS for a structured class with efficiently computable expectations.

## Related Concepts

- [[concepts/multi-adversarial-team-games|Multi-Adversarial Team Games]]: a structured class admitting efficient additive equilibrium approximation under explicit assumptions.
