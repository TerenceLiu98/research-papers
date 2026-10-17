---
title: "Greimas' Actantial Model"
type: concept
aliases:
  - Actantial Model
tags:
  - narrative-analysis
  - structural-narratology
  - text-as-data
---

## Overview

Greimas' Actantial Model represents narrative through six functional roles and their relationships. It abstracts from particular events to identify who pursues an outcome, who controls or receives it, and who supports or opposes its pursuit. An actant is a narrative function, not necessarily a distinct person or a grammatical category.

## Key Ideas

| Axis | Roles | Relationship |
| --- | --- | --- |
| Desire | Subject, Object | The Subject pursues the Object |
| Communication | Sender, Receiver | The Sender controls or provides the Object for the Receiver |
| Power | Helper, Opponent | These roles support or obstruct the Subject's pursuit |

The Subject-Object pair forms a minimal actor-goal representation. Roles do not have fixed moral valence: opposing the pursuit of security and opposing the pursuit of violence can carry different implications. A narrative annotation describes how a text represents actors, not whether that representation is true.

One actor can occupy multiple roles, a pattern termed actant syncretism. Recurring combinations support richer motifs. In the online-discourse study, a convergent motif places one actor group in Subject, Sender, and Receiver; an adversarial motif places one group in Subject and Sender against another in Receiver and Opponent; a dependent motif places one group in Subject and Receiver against another in Sender and Opponent. Group-level coincidences can include interactions between different members of the same group.

Computational use requires conventions for actor categories, implied roles, absent roles, and competing readings of a text. An LLM can generate structured assignments at scale, but human agreement and role-specific errors remain part of measurement validity. A text about harm can foreground either a perpetrator's violence or a threatened actor's pursuit of safety. Missing roles should not be filled merely to complete the model.

## Important Papers

- Greimas, *Structural Semantics: An Attempt at a Method* (1984 English edition; original work 1966): foundational source, as cited in the online-discourse manuscript.
- [[papers/measuring-narrative-polarization-in-online-discourse|Measuring Narrative Polarization in Online Discourse]]: applies LLM-based role annotation to YouTube transcripts and comments and compares both actor-goal distributions and multi-role motifs.

## Related Concepts

- [[concepts/narrative-polarization|Narrative Polarization]]: uses differences in role assignments to measure divergent portrayals across information environments.
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: a related approach to structured text measurement using a fixed semantic inventory; actant annotation specifically encodes narrative functions.
