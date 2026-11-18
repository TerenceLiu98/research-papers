---
title: "What Makes Party Systems Different? A Principal Component Analysis of 17 Advanced Democracies 1970–2013"
type: paper
authors:
  - Zsuzsanna B. Magyar
year: 2022
doi: 10.1017/pan.2021.21
tags:
  - party-systems
  - political-measurement
  - dimensionality-reduction
---

## TL;DR

Party-system concentration and competition between the largest two parties are distinct dimensions. PCA of 675 country-years in 17 European democracies identifies both, while the effective number of parties mostly tracks concentration. Researchers studying competitiveness therefore need measures beyond a single effective party count.

## Research Question

Which features most distinguish party-size distributions, and how well do traditional typologies and quantitative indices capture those features?

## Motivation

Qualitative typologies and numerical party counts both compress complex distributions, but their measurement implications are rarely compared. Treating fragmentation as competitiveness can mismatch an empirical control with the theoretical mechanism it is meant to represent.

## Contributions

- Recovers interpretable size and competition dimensions from ranked party shares.
- Compares electoral and legislative trajectories in a common coordinate system.
- Relates Rokkan’s typology and conventional indices to the recovered dimensions, identifying aspects missed by effective party counts.

## Method

The seat-share matrix has 675 country-year rows and 20 columns for 1970–2013. Parties are ordered by size within each row, with zeros for absent ranks; identities are discarded. The author mean-centers columns and performs covariance PCA without scaling. PC1 contrasts systems dominated collectively by the largest two parties with more fragmented systems. PC2 contrasts similarly sized leaders with a dominant largest party.

Separate vote-share PCA checks whether electoral distributions have similar dimensions. A joint matrix of 1,350 seat- and vote-share rows puts both in the same space. Country trajectories and enclosing polygons describe changes over time. Logistic boundaries relate the coordinates to Rokkan’s categories. Correlations, regressions, and sums of ranking differences compare conventional indices with the components.

## Experiments

These are descriptive empirical analyses, not randomized experiments.

| Comparison | Reported finding |
|---|---|
| Seat-share variance, Table 1 | PC1 explains 71.04%; PC2 explains 16.59%; cumulative 87.63%. |
| Effective number of parties, Table 2 | Correlation is 0.93 with PC1 and 0.04 with PC2. |
| Largest–second-largest seat-share gap | Correlation is −0.90 with PC2; larger gaps indicate less balanced competition. |
| Separate vote and seat analyses | Corresponding first and second components each correlate at 0.98. |
| Electoral versus legislative trajectories | Many proportional systems have similar trajectories; France and the UK show greater legislative changes, especially in competition. |

The two-dimensional map broadly separates Rokkan’s 1970 categories and suggests a missing low-fragmentation, dominant-party category. Opposition concentration measures capture more of PC2 than most overall party-size indices. Log-ratio PCA primarily groups systems by party count; kernel and nonlinear PCA yield broadly similar dimensions to raw-share PCA (Section 4.3).

## Limitations

Results describe this European sample and period, not universal dimensions or causal effects of electoral rules. Ranking removes party identity, ideology, and coalition relationships. Shares are compositional and contain many zeros; raw-share PCA emphasizes absolute variation, whereas log-ratio analysis answers a different geometric question. Similar nonlinear results do not by themselves establish Gaussianity or remove compositional concerns.

The supplied text reports 87.12% cumulative explained variance in prose but 87.63% in Table 1; the table values are used above. It also inconsistently identifies the French proportional-election year as 1986 and 1968, so that chronology is not reproduced. Supplementary analyses are summarized as reported, not independently reproduced.

## Related Concepts

- [[concepts/effective-number-of-parties|Effective Number of Parties]] — captures concentration but has little association with the second component here.
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]] — motivates comparing vote and seat distributions jointly.
- [[concepts/isometric-log-ratio-transformation|Isometric Log-Ratio Transformation]] — a related compositional framework; zero shares complicate log-ratio approaches. The paper does not specifically establish an ILR implementation.

## Related Papers

- [[papers/effective-number-of-parties-a-measure-with-application-to-west-europe|Laakso and Taagepera (1979)]] — introduces the effective-count measure assessed here.
- Aitchison (1983), “Principal Component Analysis of Compositional Data” — methodological background for the compositional issue.

Published in *Political Analysis* 30:250–268 (2022), online 17 August 2021. Replication materials: https://doi.org/10.7910/DVN/Q0OIMY.
