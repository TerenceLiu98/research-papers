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
- Exposure thresholds can also be heterogeneous. In the [[papers/the-maki-thompson-model-with-random-awareness|Maki-Thompson model with random awareness]], a distribution over the number of exposures required before spreading creates countably many listener states and can generate multiple peaks without an external shock.
- Rumor dynamics need not imply false content. URL-based cascades operationalize circulating information without verifying its truth, so empirical rumor-model results should not automatically be interpreted as misinformation-specific findings.
- Stifling can depend on informed contacts rather than spontaneous recovery. On hypergraphs, a spreader may stop only after enough of their groups are informed; waiting for further transmission can then control extinction time. Shared-URL timestamps reveal spreading activity but do not directly observe this stopping mechanism.
- Static-network models expose the role of topology, while temporal models represent changing contacts. [[Activity-Driven Networks]] provide a tractable temporal setting in which activity heterogeneity affects exposure and thresholds.
- A spreading threshold separates parameter regimes in which misinformation dies out from regimes in which a nonzero outbreak can persist or reach a large final prevalence. Network moments and recovery rates commonly enter this threshold.
- Skepticism can delay or reduce transmission. In the IHSR model, a skeptical user's level controls the relative rates of entering a hesitator state and becoming a spreader after first exposure.
- Intervention effects depend on targeting and timing. Protecting the most active nodes is not universally optimal when hesitation prolongs their exposure, while recovery dynamics can make low-activity targeting more effective in a particular model.
- Mobile intervention can co-evolve with propagation rather than act through a fixed target set. In [[papers/rumor-propagation-and-supervision-during-confrontation|Rumor Propagation and Supervision during Confrontation]], supervisors follow importance-weighted random walks while transmission shifts toward nodes farther from supervision. Its topology-dependent coverage and staffing results are simulation findings, not empirical estimates of moderation effectiveness.
- Continuous node-level control can allocate an instantaneous resource budget using evolving susceptible and infected states. In [[papers/structure-aware-optimal-intervention-for-rumor-dynamics-on-networks|Structure-aware optimal intervention for rumor dynamics on networks]], simulated allocations shift from central nodes early to peripheral nodes later. This is a model-dependent pattern; the supplied theoretical and numerical inconsistencies limit stronger conclusions. An instantaneous allocation cap also differs from a cumulative expenditure budget.
- Distinguish outbreak thresholds from endemic persistence. In a closed SIR model with positive recovery and no replenishment, the equilibrium condition for recovered states forces infection to zero; an above-threshold outbreak does not by itself establish a positive endemic equilibrium.
- Competitive correction models can optimize concern-weighted misinformation exposure rather than only the number of affected users. [[Competitive Concern Minimization]] adds delayed correction, user concern dynamics, and a herd-based state transition to an independent-cascade-style model.
- Multiplex models distinguish a person from accounts on several platforms and allow diffusion to move through different network layers. [[papers/minimizing-rumor-influence-in-multiplex-online-social-networks-based-on-human-individual-and-social-behaviors|Minimizing Rumor Influence in Multiplex Online Social Networks Based on Human Individual and Social Behaviors]] combines this structure with time-varying attraction, opinion updates, and a model-based truth campaign.
- Mean-field equations and simulations answer different questions: the former provide analytical thresholds and aggregate trajectories, while Monte Carlo experiments test the approximation and reveal finite-network behavior.
- Model-defined prevalence, recovery, or truth-related quantities should not be treated as direct measurements of real users without empirical calibration.

## Important Papers

- [[papers/the-maki-thompson-model-with-random-awareness|The Maki-Thompson model with random awareness]]: extends density-dependent process limits to countably many awareness states and characterizes final and peak spreader proportions.
- [[papers/rumor-propagation-on-hypergraphs|Rumor propagation on hypergraphs]]: introduces group-aware stifling, reports continuous transitions in tested regimes, and finds Telegram cascade statistics compatible with simulations near criticality.
- [[papers/rumor-propagation-and-supervision-during-confrontation|Rumor Propagation and Supervision during Confrontation: An Importance-Driven SIRQS Network Model]]: couples vigilant and spreading states with strategically evasive transmission and mobile supervisory patrol.
- [[How the Hesitation Mechanism Suppresses Misinformation Spreading on Time-Varying Networks]]
- [[Who Should Fight the Spread of Fake News?]]
- [[Minimizing the Misinformation Concern over Social Networks]]
- [[papers/minimizing-rumor-influence-in-multiplex-online-social-networks-based-on-human-individual-and-social-behaviors|Minimizing Rumor Influence in Multiplex Online Social Networks Based on Human Individual and Social Behaviors]]
- Moreno, Nekovee, and Pacheco (2004), "Dynamics of rumor spreading in complex networks."
- Xia, Jiang, Song, and Song (2015), "Rumor spreading model considering hesitating mechanism in complex social networks."
- Hu, Pan, Hou, and He (2018), "Rumor spreading model with the different attitudes towards rumors."

## Related Concepts

- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]
- [[Activity-Driven Networks]]
- [[Rumor Refutation on Social Media]]
- [[Opinion Dynamics]]
- [[Social Network Analysis]]
- Social contagion
- Temporal networks
