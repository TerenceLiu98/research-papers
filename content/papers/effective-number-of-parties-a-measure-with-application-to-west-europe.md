---
title: '"Effective" Number of Parties: A Measure with Application to West Europe'
type: paper
authors:
  - Markku Laakso
  - Rein Taagepera
year: 1979
tags:
  - party-systems
  - electoral-systems
  - political-measurement
---

## TL;DR

The paper develops the effective number of parties, $N_2=1/\sum_i p_i^2$, as an interpretable measure of party-system fragmentation. Its West European application favors this measure over an entropy-based alternative because it is less sensitive to poorly documented small parties. The number of parties alone shows little association with executive instability in the sample.

## Research Question

How can parties of unequal size be counted comparably across electoral systems, and how does that count relate to changes in party systems and governmental stability?

## Motivation

Raw party counts give tiny parties the same weight as dominant parties. Concentration and fractionalization indices incorporate size but are less directly interpretable as counts. An equivalent number of equal-sized parties makes comparisons between two-party and multiparty systems more explicit.

## Contributions

- Places concentration, fractionalization, and effective counts in a common mathematical framework.
- Compares squared-share and entropy-based measures at both vote and seat levels.
- Documents postwar trends across 15 West European countries and distinguishes party-system fluctuation from executive instability.

## Method

For nonnegative party shares summing to one, the generalized family is

$$
N_a=\left(\sum_i p_i^a\right)^{1/(1-a)},\qquad a>0,\ a\ne1.
$$

The entropy limit is $N_1=\exp(-\sum_i p_i\ln p_i)$, with zero-share terms contributing zero. At $a=2$, the [[concepts/effective-number-of-parties|effective number of parties]] satisfies $N_2=1/HH=1/(1-F_2)$, where $HH$ is squared-share concentration and $F_2$ is Rae–Taylor fractionalization. These transformations preserve information while changing the scale. In contrast, $N_1$ and $N_2$ cannot generally be recovered from one another without the shares.

Equal shares give the actual party count; a single positive share gives one. Larger exponents give more weight to large parties. Vote shares produce $N_V$ and seat shares produce $N_S$; coalition bargaining power is not measured.

The paper also defines successive-election fluctuation as

$$
f=\frac{1}{\bar N}\sqrt{\frac{1}{T}\sum_{t=1}^{T}(N_t-N_{t-1})^2},
$$

where $T$ is the number of election transitions. Executive instability is measured separately using 1948–1967 executive transfers: regular transfers beyond the first each year, plus five times irregular transfers.

## Experiments

The empirical comparison covers post-1944 elections through 1976 in 15 countries, using Rokkan and Meyriat's electoral statistics and Keesing's Contemporary Archives. The prose reports 142 elections; the supplied Table 1 caption says 124, an unresolved source discrepancy.

- **Small-party sensitivity:** For West Germany's 1949 seats, treating an aggregated “Other” category as one party or many yields $N_1$ between 4.1 and 7.9, compared with $N_2$ between 3.7 and 4.1. Incorporating a source footnote narrows these ranges to 5.1–5.6 and approximately 4.0, respectively.
- **Vote–seat comparison:** The paper reports fewer effective parliamentary than electoral parties except in Iceland 1946 and France 1951. In 21 elections the reduction exceeds 0.6 parties.
- **Temporal pattern:** The cross-country average electoral count declines from 4.2 around 1949 to 3.7 in 1953, then rises to 4.5 in 1973. Averaging uses the closest election where a country has no election in the target year.
- **Stability:** Mean effective counts and vote–seat discrepancies show little correlation with executive instability. Any relationship between seat-level fluctuation and executive transfers depends heavily on Greece. Finland combines stable party structure with unstable governmental coalitions.

## Limitations

The comparisons are descriptive and do not establish that party fragmentation causes governmental instability. The executive-transfer measure uses an arbitrary weight for irregular transfers and can miss cabinet changes involving the same parties. Its observation window differs from the electoral series. Aggregating small parties affects both indices, although less strongly for $N_2$. Effective counts omit party identity and ideology, so substantial vote transfers can leave the count nearly unchanged. Suggested economic explanations for the aggregate trend are conjectural; the paper supplies no corresponding economic indicators. The parsed text contains table and equation transcription anomalies, so ambiguous entries are not reconstructed here.

## Related Concepts

- [[concepts/effective-number-of-parties|Effective Number of Parties]]
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]

## Related Papers

- [[papers/party-system-polarization-and-the-effective-number-of-parties|Party system polarization and the effective number of parties]] — a later study relating effective counts to ideological dispersion, a dimension not measured here.
- Taylor and Herman (1971), “Party systems and government stability” — prior work discussed in the paper's stability analysis.

[[index|Library home]]
