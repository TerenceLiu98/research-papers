---
title: Speaker Identity for Topic Segmentation
type: concept
aliases:
  - SITS
  - Speaker Identity for Topic Segmentation Model
tags:
  - topic-modeling
  - topic-segmentation
  - text-as-data
  - conversational-analysis
---

## Overview

Speaker Identity for Topic Segmentation (SITS) is a probabilistic topic model for multiparty conversations. It uses speaker identity to jointly infer the topics under discussion, the turn boundaries at which topic mixtures change, and each speaker's propensity to initiate those changes. This makes it useful for studying [[Interactive Agenda Setting|interactive agenda setting]] from turn-structured transcripts.

## Key Ideas

- A conversation is represented as an ordered sequence of speaking turns grouped into latent topical segments. Turns in the same segment share a topic distribution.
- Each speaker has a latent topic-shift probability. When that speaker takes a turn, this parameter governs whether a new topic mixture is drawn or the previous turn's mixture is retained.
- The model extends Latent Dirichlet Allocation: segment-level mixtures generate word-level topic assignments, while topic-specific word distributions generate observed tokens.
- The first turn of each discussion begins a segment by construction. Later segment boundaries are inferred rather than supplied by observed punctuation or hand coding.
- The speaker parameter reflects a propensity to shift attention within the analyzed corpus. It is relative to the other speakers and interactions represented in that corpus, not a context-free personality trait.
- Validation can separately examine boundary recovery, semantic coherence of inferred topics, and coherence of the resulting segments. Each target addresses a different part of the model's interpretation.

## Important Papers

- [[Measuring Agenda Setting in Interactive Political Communication]]
- Nguyen, Boyd-Graber, and Resnik (2012), "SITS: A Hierarchical Nonparametric Model Using Speaker Identity for Topic Segmentation in Multiparty Conversations."
- Nguyen et al. (2014), "Modeling Topic Control to Detect Influence in Conversations Using Nonparametric Topic Models."

## Related Concepts

- [[Interactive Agenda Setting]]
- Topic segmentation
- Latent Dirichlet Allocation
- Unsupervised topic modeling
- Conversation analysis
- Human validation of topic models
