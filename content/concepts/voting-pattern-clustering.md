---
title: Voting Pattern Clustering
type: concept
tags:
  - roll-call-voting
  - multiplex-networks
  - clustering
---

## Overview

Voting pattern clustering groups roll calls according to the partitions of voters they induce. Its output is a collection of recurring coalition configurations, each linked to the legislative documents on which it occurs. This separates the task of finding factions within a vote from the task of grouping votes across documents.

## Key Ideas

- **Keep configurations before averaging.** One signed network per roll call preserves agreements and disagreements that can cancel when averaged over an entire period. Consensus and rare antagonistic patterns can then appear as distinct clusters.
- **Use two levels of grouping.** A faction contains voters; a pattern partitions voters; a cluster contains similar patterns and therefore the associated documents. K-medoids can cluster partition dissimilarities without requiring an arithmetic mean of partitions.
- **Choose similarity for the intended resolution.** Measures differ in sensitivity to faction sizes and individual switches. Arinik, Figueiredo, and Labatut favor symmetrized purity after comparing archetypal patterns, while using silhouette and substantive interpretation to select the number of clusters.
- **Distinguish absence from abstention.** An absent voter supplies no observed position for that roll call. Abstention can be retained as a separate faction, exposing systematic behavior that disappears when abstentions are discarded.
- **Summarize within clusters.** A characteristic partition can be estimated from signed co-membership frequencies within a cluster. It need not equal the medoid, and participation thresholds affect which voters enter the summary.
- **Interpret coalitions through documents.** A common voting partition does not establish a common ideology. Groups can reject the same proposal for opposite reasons, and different amendments to one proposal can generate different alignments.
- **Preserve the distinction from temporal modeling.** Grouping recurring patterns does not itself model when they emerge, persist, or disappear. Temporal dependence requires an additional design.

## Important Papers

- [[papers/multiple-partitioning-of-multiplex-signed-networks-application-to-european-parliament-votes|Multiple Partitioning of Multiplex Signed Networks: Application to European Parliament Votes]]: develops the partition, compare, cluster, and characterize procedure for French and Italian MEPs' agricultural votes.

## Related Concepts

- [[concepts/signed-political-networks|Signed Political Networks]]: provides the agreement/disagreement representation and structural-balance perspective.
- [[concepts/latent-context-voting-models|Latent-Context Voting Models]]: models variation in collective voting through latent contexts; voting pattern clustering instead groups observed voter partitions.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: determines which recorded decisions enter the pattern distribution.
