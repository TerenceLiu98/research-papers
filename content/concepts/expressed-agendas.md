---
title: Expressed Agendas
type: concept
aliases:
  - Expressed Agenda
  - Expressed Agenda Model
tags:
  - political-communication
  - issue-attention
  - topic-modeling
  - legislative-behavior
---

## Overview

An expressed agenda is the distribution of attention a political actor allocates to issues in public statements. It describes the priorities the actor communicates to an audience. It does not directly measure policy positions, private preferences, or the distribution of actual work by the actor and their staff.

## Key Ideas

- **Compositional attention:** An agenda vector contains nonnegative issue shares that sum to one. Greater relative attention to one issue leaves less share for others; the vector alone does not record the total volume of communication.
- **Comparable topics:** Comparisons across actors require a shared issue inventory. Separately clustering each actor's texts can assign identical statements to differently defined categories and create misleading differences.
- **Documents nested within authors:** Grimmer's expressed agenda model jointly estimates author-specific topic proportions and shared topic centers. A common Dirichlet prior pools information across authors, while each document is assigned one topic. This author-document hierarchy is distinct from a hierarchy of topics and subtopics.
- **Normalized document likelihood:** The model uses von Mises-Fisher distributions over unit-length word-count vectors to emphasize relative word usage rather than document length.
- **Uncertainty in comparisons:** Approximate posterior draws of agenda proportions can propagate measurement uncertainty into group contrasts, agenda distances, and downstream regressions. The original implementation uses point estimates for topic centers and prior parameters, so this propagation remains conditional on the fitted model.
- **Source and construct validation:** Press releases measure actors' selected messages; newspaper coverage additionally reflects editorial choices. Event timing, committee jurisdictions, geographic interests, and voting associations can test whether estimated attention behaves as expected without establishing a causal mechanism.

## Important Papers

- [[papers/a-bayesian-hierarchical-topic-model-for-political-texts-measuring-expressed-agendas-in-senate-press-releases|A Bayesian Hierarchical Topic Model for Political Texts: Measuring Expressed Agendas in Senate Press Releases]]: introduces the author-level model and applies it to 24,236 Senate releases from 2007, recovering 43 topics and finding greater agenda similarity within state delegations than across states.

## Related Concepts

- [[concepts/party-issue-agendas|Party Issue Agendas]]: applies the attention-distribution idea to parties and their communication over time.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: distinguishes interpretable topics from valid document assignments and useful downstream measurements.
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]: the existing concept concerns topic trees; expressed-agenda modeling instead introduces hierarchy through authors and their documents.
