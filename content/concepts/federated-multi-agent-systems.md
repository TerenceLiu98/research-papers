---
title: Federated Multi-Agent Systems
type: concept
aliases:
  - Federated MAS
tags:
  - multi-agent-systems
  - llm-agents
  - privacy
  - data-minimization
---

## Overview

Federated multi-agent systems coordinate agents during task execution without directly exposing all confidential information to every participant. Unlike federated learning, which coordinates distributed model training through parameter or gradient updates, Federated MAS concerns live task allocation, retrieval, memory access, and agent-to-agent messages. Privacy decisions must therefore follow heterogeneous agent roles and communication patterns as they change during execution.

## Key Ideas

- **Execution-time federation:** The shared object is not a global model update but the information needed for agents to collaborate on a current task.
- **Role-conditioned access:** Different agents require different profile fields, retrieved records, and intermediate messages. Authorization can be based on an agent's declared responsibility and the current task.
- **Data minimization:** Agents receive task-relevant subsets or filtered second-hand messages rather than raw profiles and unrestricted conversation histories.
- **Spatial and temporal communication:** Privacy controls must cover messages among agents within one round and information carried across rounds through memory or prior outputs.
- **Dynamic permission:** A legitimate need can emerge after the initial access decision. A permission-elevation path can ask the user or another trusted authority without silently broadening access.
- **Threat-model dependence:** Mediation shifts trust to the filtering component. Refusal rates are useful behavioral measurements, but they are not equivalent to formal privacy guarantees against inference, collusion, or a compromised mediator.

## Important Papers

- [[papers/privacy-enhancing-paradigms-within-federated-multi-agent-systems|Privacy-Enhancing Paradigms within Federated Multi-Agent Systems]] introduces the term in this sense and evaluates EPEAgents, a trusted server-side agent that filters profiles and intermediate messages by role.

## Related Concepts

- [[concepts/differential-privacy|Differential Privacy]] provides distributional guarantees under explicit adjacency and mechanism assumptions, rather than role-based access control alone.
- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]] concerns changes to agent membership and organization, which can also change the communication paths that privacy controls must cover.
