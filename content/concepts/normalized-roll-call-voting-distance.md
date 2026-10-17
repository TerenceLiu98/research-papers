---
title: Normalized Roll-Call Voting Distance
type: concept
aliases:
  - Normalized Euclidean Voting Distance
tags:
  - roll-call-voting
  - political-measurement
  - legislative-politics
---

## Overview

Normalized roll-call voting distance compares actors' aggregate vote profiles on a bounded scale. It measures observed behavioral dissimilarity across a common set of votes. It can compare political groups with one another or national parties with their transnational group, provided the aggregation and reference population are specified.

## Key Ideas

Let $p_v$ be actor $p$'s supporting share minus its opposing share on vote $v$, with abstentions and absences assigned zero. For $n>0$ common votes, $p_v\in[-1,1]$, so the largest possible Euclidean distance is $2\sqrt n$. The normalization in Papakostas, Blavoukos, and Matsoukas therefore gives

$$
D(p,q)=\frac{10}{2\sqrt n}\sqrt{\sum_{v=1}^{n}(p_v-q_v)^2}
=5\sqrt{\frac{1}{n}\sum_{v=1}^{n}(p_v-q_v)^2}.
$$

- **Endpoints:** Zero means identical aggregate scores on all included votes. Ten requires opposite unanimous positions on every vote. Equal aggregate scores need not imply identical distributions of individual choices.
- **What normalization achieves:** Dividing by $\sqrt n$ removes the mechanical growth of Euclidean distance with vote count. Different agendas, participation patterns, and vote-selection rules can still change the substantive comparison.
- **Coding matters:** A wholly abstaining group and a group split equally between support and opposition both score zero. Combining absence with abstention further merges different behaviors.
- **Proximity and cohesion differ:** Between-group distance describes alignment. Distances of constituent parties from their own group describe internal deviation. Neither alone establishes party discipline or a formal coalition.
- **Median and dispersion differ:** A low median means typical proximity to the reference. A narrow IQR means similar distances across constituents, which can occur even when all are relatively far from that reference.
- **Interpretive boundary:** This is a descriptive distance, not an identified ideological coordinate. Correlation with expert-assessed ideological distances is evidence of association, with uncertainty and dependence among shared-actor pairs requiring separate treatment.

## Important Papers

- [[papers/analysing-political-dynamics-in-the-new-european-parliament-political-cleavages-and-division-lines|Analysing political dynamics in the new European Parliament: Political Cleavages and Division Lines]]: applies a 0-10 normalized Euclidean distance to European Parliament group and national-party voting profiles in 2024-2025, then compares group distances with left-right and European-integration positions.

## Related Concepts

- [[concepts/agreement-index|Agreement Index]]: measures within-group agreement across three expressed vote options rather than distance between net-support profiles.
- [[concepts/party-position-measurement|Party-Position Measurement]]: distinguishes behavioral profiles from expert assessments and other sources of political positions.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: explains why a common numeric scale does not make different vote samples representative of the same agenda.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: concerns the structure of preference spaces beyond pairwise behavioral dissimilarity.
