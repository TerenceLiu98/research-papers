---
title: Continuous Multi-Agent Pathfinding
type: concept
aliases:
  - Continuous MAPF
definition: "Continuous multi-agent pathfinding coordinates agents moving through continuous space toward individual goals while avoiding obstacles and one another under specified motion dynamics."
tags:
  - multi-agent-navigation
  - continuous-control
---

## Overview

Continuous multi-agent pathfinding combines geometric routing, motion control, and coordination. Agents must account for physical extent and feasible movement, while other agents create changing constraints on a route.

## Key Ideas

- Global route quality and local collision avoidance are separate requirements: independently feasible paths can still conflict when executed together.
- Local sensing limits what a policy knows about distant obstacles and other agents. Planner-derived observations can supply longer-range guidance, but add computational and learning complexity.
- Evaluation should distinguish reaching goals, travel time, and collision avoidance. Low collision rates can coexist with poor progress.
- Generalization across start–goal assignments, team sizes, and map families tests different capabilities.

## Important Papers

[[papers/camar-continuous-actions-multi-agent-routing|CAMAR: Continuous Actions Multi-Agent Routing]] supplies continuous dynamics, three evaluation tiers, and comparisons of learned, planning-based, and hybrid navigation. Its maze results show that global planning can improve success without solving multi-agent coordination.

## Related Concepts

Continuous control determines feasible motion; multi-agent reinforcement learning learns interacting policies. Sampling-based planning supplies geometric routes that still require execution and conflict handling. These are complementary components rather than interchangeable solutions.
