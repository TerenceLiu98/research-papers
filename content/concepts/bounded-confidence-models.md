---
title: Bounded Confidence Models
type: concept
aliases:
  - Bounded Confidence
  - Bounded-Confidence Opinion Models
tags:
  - opinion-dynamics
  - agent-based-models
  - social-influence
  - consensus
  - political-polarization
---

## Overview

Bounded confidence models are continuous [[Opinion Dynamics|opinion-dynamics]] models in which agents interact or compromise only when their opinions are sufficiently close. A confidence bound converts local selectivity into population-level regimes such as consensus, multiple stable opinion clusters, or fragmentation. Some variants also let disagreement change the social network, coupling opinion updates to rewiring.

## Key Ideas

- The confidence bound defines which pairs can influence one another. Small bounds suppress interaction and preserve many clusters; larger bounds connect more of the opinion space and can support consensus.
- Initial conditions matter because separated peaks may never enter one another's interaction range. Uniform, unimodal, and multimodal starting distributions can therefore produce different outcomes under the same update rule.
- Heterogeneous update rates represent differences in agents' willingness to compromise. Fixed or nearly fixed extreme agents can anchor clusters, while moderate reductions in willingness may mainly change convergence time.
- Adaptive-network variants allow disagreeing agents to cut ties and form new ones. Opinion proximity and network topology then coevolve rather than treating the contact graph as fixed.
- Cluster size measures capture global outcomes, while local measures such as the fraction of neighbors within an agent's confidence bound can characterize how locally aligned the network has become.

## Important Papers

- Hegselmann and Krause (2002), "Opinion dynamics and bounded confidence: Models, analysis and simulation."
- Kozma and Barrat, "Consensus formation on adaptive networks."
- [[Political opinion formation: Initial opinion distribution and individual heterogeneity of tolerance]]
- [[A Modified Hegselmann-Krause Model for Interacting Voters and Political Parties]]

## Related Concepts

- [[Opinion Dynamics]]
- [[Hegselmann-Krause Model]]
- [[Political Polarization]]
- [[Voter Model]]
- [[Co-Adaptive Political Polarization]]
