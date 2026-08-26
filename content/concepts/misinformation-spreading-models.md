---
title: Misinformation Spreading Models
type: concept
aliases:
  - Rumor Spreading Models
  - Online Misinformation Diffusion Models
tags:
  - misinformation
  - rumor-spreading
  - information-diffusion
  - contagion-models
  - complex-networks
---

## Overview

Misinformation spreading models describe how false or misleading information moves through interacting populations. They represent users, beliefs, or messages as states and specify how contact, exposure, skepticism, correction, or recovery changes those states. Network-based models make the structure and timing of interactions part of the diffusion process.

## Key Ideas

- Compartment models classify users as ignorant, spreaders, stiflers or recovery states, and can add hesitators, debunkers, or other response states to represent behavioral differences.
- Static-network models expose the role of topology, while temporal models represent changing contacts. [[Activity-Driven Networks]] provide a tractable temporal setting in which activity heterogeneity affects exposure and thresholds.
- A spreading threshold separates parameter regimes in which misinformation dies out from regimes in which a nonzero outbreak can persist or reach a large final prevalence. Network moments and recovery rates commonly enter this threshold.
- Skepticism can delay or reduce transmission. In the IHSR model, a skeptical user's level controls the relative rates of entering a hesitator state and becoming a spreader after first exposure.
- Intervention effects depend on targeting and timing. Protecting the most active nodes is not universally optimal when hesitation prolongs their exposure, while recovery dynamics can make low-activity targeting more effective in a particular model.
- Competitive correction models can optimize concern-weighted misinformation exposure rather than only the number of affected users. [[Competitive Concern Minimization]] adds delayed correction, user concern dynamics, and a herd-based state transition to an independent-cascade-style model.
- Mean-field equations and simulations answer different questions: the former provide analytical thresholds and aggregate trajectories, while Monte Carlo experiments test the approximation and reveal finite-network behavior.
- Model-defined prevalence, recovery, or truth-related quantities should not be treated as direct measurements of real users without empirical calibration.

## Important Papers

- [[How the Hesitation Mechanism Suppresses Misinformation Spreading on Time-Varying Networks]]
- [[Who Should Fight the Spread of Fake News?]]
- [[Minimizing the Misinformation Concern over Social Networks]]
- Moreno, Nekovee, and Pacheco (2004), "Dynamics of rumor spreading in complex networks."
- Xia, Jiang, Song, and Song (2015), "Rumor spreading model considering hesitating mechanism in complex social networks."
- Hu, Pan, Hou, and He (2018), "Rumor spreading model with the different attitudes towards rumors."

## Related Concepts

- [[Activity-Driven Networks]]
- [[Rumor Refutation on Social Media]]
- [[Opinion Dynamics]]
- [[Social Network Analysis]]
- Social contagion
- Temporal networks
