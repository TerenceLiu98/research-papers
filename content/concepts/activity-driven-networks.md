---
title: Activity-Driven Networks
type: concept
aliases:
  - Activity-Driven Network Model
  - ADN Model
tags:
  - activity-driven-networks
  - time-varying-networks
  - temporal-networks
  - information-diffusion
---

## Overview

Activity-driven networks are temporal network models in which nodes become active according to individual activity rates and create short-lived links to randomly selected peers. The links are discarded and regenerated at the next time step, so the model represents changing opportunities for interaction without maintaining a fixed topology.

## Key Ideas

- Each node receives an activity value from a distribution `F(alpha)`. Higher-activity nodes initiate contacts more often and can play a larger role in diffusion.
- At each time step, active nodes create `m` links. Inactive nodes can still receive links, so a node's instantaneous degree combines its own activity with incoming contacts from other active nodes.
- The temporal construction gives an activity-conditioned neighbor distribution. In the model used by Gong and Small, this distribution depends on both endpoint activity and the mean activity of the population.
- Activity-driven networks are analytically convenient because temporal rewiring can be summarized through activity moments such as `E[alpha]` and `E[alpha^2]` while retaining heterogeneity in contact opportunities.
- Diffusion thresholds depend on network activity moments and intervention parameters. In the IHSR misinformation model, hesitation increases the threshold through the fraction and skepticism level of skeptical users.
- Targeting by activity can have counterintuitive effects. In one misinformation model, making low-activity nodes skeptical reduced final prevalence more than protecting high-activity nodes because of how hesitation and recovery interact.

## Important Papers

- [[How the Hesitation Mechanism Suppresses Misinformation Spreading on Time-Varying Networks]]
- Perra, Goncalves, Pastor-Satorras, and Vespignani (2012), "Activity driven modeling of time varying networks."
- Hu, Ding, and An (2018), "Epidemic spreading with awareness diffusion on activity-driven networks."
- Gong and Small (2024), "Misinformation spreading on activity-driven networks with heterogeneous spreading rates."
- An, Ding, and Hu (2020), "Information propagation with individual attention-decay effect on activity-driven networks."

## Related Concepts

- [[Misinformation Spreading Models]]
- [[Opinion Dynamics]]
- [[Social Network Analysis]]
- Temporal networks
- Epidemic spreading
