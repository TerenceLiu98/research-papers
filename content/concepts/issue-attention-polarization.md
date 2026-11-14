---
title: Issue-Attention Polarization
type: concept
aliases:
  - Issue-Level Polarization in Attention
tags:
  - political-polarization
  - issue-attention
  - network-analysis
---

## Overview

Issue-attention polarization describes separation among political actors in which issues they discuss. Actors can emphasize different agendas even without taking opposing positions on a shared issue. Attention-based measurement therefore captures one dimension of polarization rather than a complete ideological ordering.

## Key Ideas

- Represent each actor by a vector of topic frequencies over a common time window and topic inventory.
- Cosine similarity compares relative attention patterns while removing differences in overall speech volume.
- Communities in the similarity network indicate groups with more similar agendas. Modularity summarizes this structure conditional on the network construction and null model.
- Domain restriction, such as retaining economic topics, measures differentiation within that policy area rather than the amount of attention allocated to the area overall.
- Community structure need not align with parties. Assortativity and QAP network comparisons assess party alignment separately.
- Topic interpretation, historical language change, and hard document assignments affect the measure. Opposing positions expressed on identical topic distributions can remain indistinguishable.

## Important Papers

- [[papers/measuring-issue-level-polarization-in-congressional-speech-using-community-detection-algorithms|Measuring issue-level polarization in congressional speech using community detection-algorithms]]: constructs congressional speech networks from LDA topic counts and finds rising economic attention clustering, particularly in the House.

## Related Concepts

- [[concepts/expressed-agendas|Expressed Agendas]]: actor-level distributions of communicated priorities supply the underlying attention representation.
- [[concepts/political-polarization|Political Polarization]]: broader family of ideological, affective, and structural divisions.
- [[concepts/social-network-analysis|Social Network Analysis]]: methods for studying the similarity networks and their community structure.
