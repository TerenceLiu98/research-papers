---
title: Coevolutionary Network Games
type: concept
aliases:
  - Coevolutionary Games on Networks
tags:
  - evolutionary-game-theory
  - adaptive-networks
  - cooperation
---

## Overview

Coevolutionary network games allow strategic behavior and the environment governing interaction or imitation to change together. Strategies affect relationships, locations, or partner selection, and those changes alter later payoffs and strategy adoption. The feedback can promote or suppress cooperation depending on the adaptation rules.

## Key Ideas

- **Specify what adapts.** Changing edge weights, rewiring connections, selecting interaction partners, and moving agents are different mechanisms. Weight adaptation can occur on a fixed relationship topology.
- **Separate interaction from learning.** The people an agent plays against need not be the people whose strategies it can imitate. Multiple network layers can represent these distinct roles for the same population.
- **Distinguish current reward from accumulated history.** A persistent relationship weight can retain information from earlier behavior. Adding it to fitness can weaken the immediate consequences of a strategy switch.
- **Relationship strength is not automatically reputation.** A weight updated from both endpoints' actions represents a joint history, so its sum around an agent cannot be attributed solely to that agent's conduct.
- **Check scales and comparison designs.** An unnormalized sum of tie strengths grows with degree. Comparing topologies with different degrees can change both interaction opportunities and the magnitude of a relationship-based fitness term.
- **Adaptation does not guarantee cooperation.** Outcomes depend on whether changes support cooperative clustering, expose cooperators to exploitation, or preserve advantages after defection. Claims should remain tied to the tested rules and parameter ranges.

## Important Papers

- [[papers/coevolution-of-relationship-and-interaction-in-cooperative-dynamical-multiplex-networks|Coevolution of Relationship and Interaction in Cooperative Dynamical Multiplex Networks]]: separates relationship and interaction layers and reports reduced cooperation when accumulated relationship strength receives more weight in fitness. Its printed imitation rule and prose disagree about the direction of selection.
- [[papers/involution-game-with-migration-and-spatial-heterogeneity-of-social-resources|Involution Game with Migration and Spatial Heterogeneity of Social Resources]]: couples strategy imitation and migration in a resource-competition game, illustrating adaptation through location rather than tie strength. The library summary flags conflicting source claims about migration's effect.
- Perc and Szolnoki (2010), "Coevolutionary games - a mini review": background review cited by the multiplex relationship paper.

## Related Concepts

- [[concepts/network-games|Network Games]]: the broader setting in which network structure conditions strategic incentives.
- [[concepts/success-driven-migration|Success-Driven Migration]]: agents relocate in response to observed success, changing their interaction neighborhoods.
