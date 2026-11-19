---
title: Schelling Segregation Model
type: concept
aliases:
  - Schelling Model of Segregation
  - Schelling's Checkerboard Model
definition: "An agent-based spatial model in which households evaluate their neighborhood's group composition and can trigger collective segregation by relocating when dissatisfied."
tags:
  - agent-based-models
  - segregation
---

## Overview

In Schelling's two-dimensional model, households from two groups occupy sites on a checkerboard. A household stays if the share of its neighbors belonging to its own group meets its threshold. In the original relocation rule, a dissatisfied household moves to the nearest vacant site where its threshold is met. Segregated neighborhoods can emerge even when every household would accept a local minority position.

## Key Ideas

- A move changes two neighborhoods. The departure can leave same-group neighbors below their threshold, and the arrival can push members of the other group below theirs. A few initially dissatisfied households can therefore start a cascade.
- Neighborhood radius determines which households count toward satisfaction. Search range determines which destinations a mover considers. Changing either can shift the threshold at which segregation emerges.
- At high thresholds, an agent that demands immediate satisfaction may have nowhere to go. Accepting a destination with a higher same-group share allows a sequence of individually feasible moves toward satisfaction.

## Important Papers

- Thomas C. Schelling's *Dynamic Models of Segregation* (1971) develops the connection between individual neighborhood preferences and collective residential patterns.
- [[papers/the-varieties-of-schelling-model-experience|The Varieties of Schelling Model Experience]] compares 54 rule variants and identifies when a relocation cascade produces segregation.
- [[papers/eco3s-complex-socio-economic-system-simulation-via-agent-based-models|Eco3S]] uses the emergence of Schelling segregation to evaluate an automatically generated agent-based scenario.

## Related Concepts

- [[concepts/partisan-residential-segregation|Partisan Residential Segregation]] describes residential separation measured among political groups. Such measurements summarize a spatial pattern, while the Schelling model specifies one mechanism that can produce it.
