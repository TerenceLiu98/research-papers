---
title: Value-Based Feed Ranking
type: concept
aliases:
  - Values-Based Feed Ranking
  - Value-Driven Feed Ranking
tags:
  - recommender-systems
  - social-media
  - value-pluralism
  - user-control
---

## Overview

Value-based feed ranking orders content according to explicitly represented human or community values rather than relying only on engagement predictions. A value may concern a social objective, such as constructive discourse or equality, or a content quality, such as informativeness or humor. The approach makes a feed's normative objectives configurable, but it also turns difficult questions about measurement, conflict, representation, and governance into system-design choices.

## Key Ideas

- **Values require operational definitions.** Abstract constructs must be translated into observable content-level or feed-level criteria before a ranking system can score them. LLM classifiers can apply textual definitions at scale, but their errors and biases become part of the ranking policy.
- **Pluralism changes the control problem.** A single objective chosen by a platform or researcher cannot represent every user or community. A library permits combinations of objectives and different positive or negative weights, while increasing discovery, comprehension, and governance costs.
- **Content-level and feed-level values differ.** Informativeness may be judged from one post, whereas diversity requires a set of posts and cannot be recovered by independently scoring each item.
- **Reranking is constrained by candidate generation.** A client-side tool can reorder only content supplied by the platform. It cannot promote relevant items absent from the candidate inventory.
- **Specific alternatives can displace broad labels.** When users receive a larger vocabulary, they may replace a general value with narrower constructs or combinations. A lower weight on the broad value does not necessarily indicate reduced concern for its underlying goal.
- **Autonomy and collective outcomes can conflict.** Explicit controls may help users resist engagement optimization, but they can also reinforce ideological selection, filter bubbles, or harmful community norms.
- **The library itself is governed.** Source taxonomies, eligibility rules, definition wording, merge thresholds, onboarding defaults, classifier providers, and contribution policies determine which values are legible and influential.

## Important Papers

- [[papers/alexandria-a-library-of-pluralistic-values-for-realtime-re-ranking-of-social-media-feeds|Alexandria: A Library of Pluralistic Values for Realtime Re-Ranking of Social Media Feeds]]: constructs 78 LLM-operationalized values, implements user-controlled X/Twitter reranking, and compares a pluralistic library with single value systems.
- Jia et al. (2024), "Embedding Democratic Values into Social Media AIs via Societal Objective Functions": demonstrates feed ranking around democratic objectives.
- Stray et al. (2022), "Building Human Values into Recommender Systems: An Interdisciplinary Synthesis": maps values that recommender systems may need to represent.
- Piccardi et al. (2025), "Reranking Partisan Animosity in Algorithmic Social Media Feeds Alters Affective Polarization": evaluates reranking around a specific societal outcome.

## Related Concepts

- [[concepts/social-media-news-exposure|Social Media News Exposure]]
- Value pluralism
- User-controllable recommender systems
- Algorithmic choice
- Multi-objective optimization
- Filter bubbles

