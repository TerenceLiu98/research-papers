---
title: Frame-Specific Ideal Points
type: concept
aliases:
  - Hierarchical Ideal Point Topic Model
  - HIPTM
tags:
  - ideal-point-estimation
  - topic-models
  - political-framing
---

## Overview

Frame-specific ideal points connect how political actors discuss an issue to their latent position on that issue. In HIPTM, broad topics represent policy issues and subordinate topics represent candidate frames. Each frame has a learned regression weight, and an actor's mixture of frames supplies the prior mean for an issue-specific position that also explains votes.

## Key Ideas

- **Distinguish issue from framing:** Discussing health care identifies an issue; emphasizing implementation costs or constitutional objections can distinguish ways of discussing it. A topic hierarchy operationalizes this distinction, but does not establish that every child topic is a rhetorical frame.
- **Connect speech to positions:** If $\hat\psi_{a,k,j}$ is actor $a$'s use of frame $j$ within issue $k$, the text-derived position mean is $\sum_j\hat\psi_{a,k,j}\eta_{k,j}$. Observed votes provide additional information about the latent position around this mean.
- **Connect positions to bills:** Bill-topic proportions weight the actor's issue-specific positions in a logistic voting model with bill polarity and popularity. Speech documents need not be paired with particular bills.
- **Anchor broad topics, infer subordinate topics:** HIPTM uses labeled bill data for informed issue priors, fixes the issue count, and permits an unbounded number of frames through hierarchical Dirichlet processes.
- **Predict without an actor's votes:** After learning the text/vote relationship from training actors, speech-frame mixtures can estimate positions for actors with no observed votes. This requires a learned model and relevant language, rather than eliminating the need for voting evidence during training.
- **Separate rhetoric and behavioral alignment:** Similar voting positions can coexist with divergent frames, and similar frames can coexist with different positions. These are distinct descriptive dimensions; their implications for cooperation require separate evaluation.
- **Check substantive interpretation:** Geographic interests, events, or sub-issues can produce polarized child topics. Frame labels and ideological interpretations need contextual validation beyond predictive performance.

## Important Papers

- [[papers/tea-party-in-the-house-a-hierarchical-ideal-point-topic-model-and-its-application-to-republican-legislators-in-the-112th-congress|Tea Party in the House]]: introduces HIPTM, evaluates Tea Party Caucus membership prediction with and without test-legislator votes, and contrasts issue-position polarization with framing polarization among House Republicans.

## Related Concepts

- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]: the multilevel text representation underlying issues and frames.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: represents issue-dependent departures from a general position, without the speech-frame regression used here.
- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: connects bill topics and voting dimensions through joint estimation.
- [[concepts/item-response-theory|Item Response Theory]]: the latent actor/item response framework underlying the voting component.
