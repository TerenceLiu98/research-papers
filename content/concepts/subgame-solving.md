---
title: Subgame Solving
type: concept
aliases:
  - Subgame Refinement
definition: "Subgame solving refines a strategy within a local portion of an extensive-form game, often using an offline blueprint to guide online search."
tags:
  - game-theory
  - game-playing
  - search
---

## Overview

Subgame solving divides strategic computation between a coarse strategy for the full game and detailed refinement near the current decision. In imperfect-information games, this requires reasoning over information sets: the acting player does not know which hidden history actually occurred.

## Key Ideas

- An offline blueprint supplies a starting strategy, often computed using abstraction or learned through self-play.
- Online search refines that strategy in a smaller game. Information and action abstraction reduce the computational burden, but introduce approximation choices.
- Hidden information makes local refinement sensitive to which histories and opponent strategies are retained.
- Stochastic action selection can preserve unpredictability. Strong empirical play does not by itself establish equilibrium convergence, particularly in multiplayer settings.

## Important Papers

- [[papers/openguandan-a-large-scale-imperfect-information-game-benchmark|OpenGuanDan: A Large-Scale Imperfect Information Game Benchmark]] evaluates GS2, which refines an SDMC blueprint online. GS2 wins 56.7% against SDMC while achieving lower action-selection throughput.
- Ge et al. (2023), “Efficient Subgame Refinement for Extensive-Form Games,” is the refinement method cited for GS2 by OpenGuanDan.

## Related Concepts

Information sets group histories indistinguishable to a player. Strategy abstraction compresses the full game; opponent modeling estimates other players' behavior. Both influence the tractability and quality of local refinement.
