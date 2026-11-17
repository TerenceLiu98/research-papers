---
title: Mobile Jamming Games
type: concept
aliases:
  - Mobility-Based Jamming Games
definition: Mobile jamming games model strategic movement by legitimate wireless nodes and adversarial jammers, with communication performance determined by their changing relative positions.
tags:
  - wireless-communications
  - game-theory
---

## Overview

Mobile jamming games make location or movement a strategic action. A legitimate receiver seeks strong reception while a jammer seeks to degrade it. Moving away from a jammer can also weaken the useful signal from a transmitter, creating a trade-off absent from pure pursuit problems.

## Key Ideas

- Static location choice and dynamic movement are different strategy spaces: travel constraints allow an adversary to react before a distant destination is reached.
- Move timing and position visibility affect whether a jammer can follow, predict, or only infer receiver movement.
- Capacity, signal-to-interference ratio, and surrogate rewards must be distinguished, especially when evaluating mixed strategies.
- Concurrent reinforcement learning introduces a changing opponent into each agent’s environment. Stable average rewards alone do not certify equilibrium.

## Important Papers

- [[papers/static-and-dynamic-jamming-games-over-wireless-channels-with-mobile-strategic-players|Static and dynamic jamming games over wireless channels with mobile strategic players]]: combines static location analysis with three dynamic information settings and learned movement policies on a line.

## Related Concepts

- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: quantifies incentives to deviate from a proposed strategy profile, complementing empirical learning stability.
