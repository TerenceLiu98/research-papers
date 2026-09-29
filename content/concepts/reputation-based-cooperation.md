---
title: Reputation-Based Cooperation
type: concept
tags:
  - reputation
  - cooperation
  - multi-agent-systems
  - adaptive-networks
---

## Overview

Reputation-based cooperation uses assessments of past conduct to inform how agents treat others and whom they select as future partners. Direct experience and information from third parties can make cooperative conduct consequential beyond a single encounter, potentially reducing exploitation in social dilemmas.

## Key Ideas

- **Assessments can be local and contextual.** Different observers may evaluate the same agent differently, and evaluations can depend on the scenario and role. RepuNet stores both natural-language assessments and numerical scores in each agent's database.
- **Indirect reciprocity uses information about others.** Gossip can inform treatment of someone the listener has not encountered. This differs from [[concepts/diffuse-reciprocity|Diffuse Reciprocity]], where one's experience generalizes to subsequent partners without necessarily evaluating those partners' conduct.
- **Partner selection changes incentives.** Connecting to reputable partners and severing exploitative ties can cluster cooperators and alter future encounter opportunities. This links reputation to [[concepts/coevolutionary-network-games|Coevolutionary Network Games]].
- **Reputation and relationship strength are distinct.** An assessment of an individual's behavior differs from a tie weight reflecting both partners' interaction history.
- **Information rules matter.** RepuNet permits gossip to revise reputations and reconsider existing ties, but requires a direct encounter before creating a tie to a new partner. Its agents also maintain self-reputations as perceived evaluations by others.
- **Cooperation is an empirical outcome.** Positive reputation-behavior correlations alone do not establish causal direction. In RepuNet's three tested dilemmas, reputation ablation produces larger declines than gossip ablation; this does not guarantee the same ordering under other information or incentive structures.

## Important Papers

- [[papers/reputation-as-a-solution-to-cooperation-collapse-in-llm-based-mass|Reputation as a Solution to Cooperation Collapse in LLM-based MASs]]: implements reputation updates, gossip, and directed network adaptation with LLM prompts and evaluates three simulated social dilemmas.
- Nowak and Sigmund (2005), "Evolution of indirect reciprocity": foundational account cited by the RepuNet paper (reference 33).
- Takacs et al. (2021), "Networks of reliable reputations and cooperation: a review": cited background connecting reputation and social networks (reference 45).

## Related Concepts

- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]
- [[concepts/diffuse-reciprocity|Diffuse Reciprocity]]
- [[concepts/network-games|Network Games]]
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]]
