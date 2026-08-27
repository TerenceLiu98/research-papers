---
title: "Engagement in the electoral processes: Scaling laws and the role of political positions"
type: paper
authors:
  - M. C. Mantovani
  - H. V. Ribeiro
  - E. K. Lenzi
  - S. Picoli, Jr.
  - R. S. Mendes
year: 2013
doi: "10.1103/PhysRevE.88.024802"
tags:
  - electoral-scaling-laws
  - electoral-engagement
  - allometric-scaling
  - political-representation
  - sociophysics
---

## TL;DR

Across Brazilian cities, party membership scales sublinearly with the number of voters and is well described by a power law with multiplicative log-normal fluctuations. The exponent is stable across 2006, 2008, and 2011, at approximately 0.85--0.87. When combined with previously reported results for mayoral and councillor candidates, the estimates form a hierarchy in which more influential positions have smaller scaling exponents. The authors interpret this pattern as possible under-representation in larger cities, while noting that limits on available seats and party representation may also contribute.

## Research Question

Do party membership and political candidacy exhibit common [[Electoral Scaling Laws|scaling laws]] across cities, and do the exponents and distributional tails vary systematically with the influence and institutional constraints of different political positions?

## Motivation

Research on elections in statistical physics had largely concentrated on vote distributions, turnout, polarization, fraud detection, and social networks. Less was known about direct engagement through joining a political party or standing for office. The paper asks whether these forms of engagement have regular relationships with electorate size and whether the relationship changes between party members, councillor candidates, and mayoral candidates.

## Contributions

- Shows that the average number of party memberships follows a sublinear power-law relationship with the number of voters across Brazilian cities.
- Finds that normalized deviations from this average relationship are approximately Gaussian with nearly size-independent variance, implying multiplicative log-normal noise in the untransformed counts.
- Reports stable party-membership exponents across the three observed years: $0.87\pm0.02$ in 2006, $0.86\pm0.02$ in 2008, and $0.85\pm0.02$ in 2011.
- Relates the party-membership result to earlier candidate-count results and identifies an exponent hierarchy: mayoral candidates have the smallest exponent, councillor candidates are intermediate, and party memberships have the largest.
- Compares cumulative distributions across political roles, finding short, approximately exponential tails for candidate counts but an intermediate approximate power-law region followed by an exponential-like cutoff for party memberships and voter counts.

## Method

The study uses electoral data for all Brazilian cities from the Brazilian Electoral Supreme Court and voter-population data from the Brazilian Institute of Geography and Statistics. Party memberships cover all 27 Brazilian political parties in 2006, 2008, and 2011. The number of municipalities is nearly constant over the period, ranging from 5,564 in 2006 to 5,565 in 2011. Candidate-count data are taken from the authors' earlier study.

Let $V$ be the number of voters and $N$ the number of party memberships or candidates. The authors divide observations into windows equally spaced in $\log_{10}V$ and regress the within-window mean of $\log_{10}N$ on the corresponding mean of $\log_{10}V$:

$$
\langle \log_{10}N\rangle=A+\alpha\log_{10}V.
$$

They then measure dispersion around the fitted relationship within each voter-population window. Normalized residuals are defined as

$$
\xi(V)=\frac{\log_{10}N(V)-\langle\log_{10}N\rangle}{\sigma}.
$$

The empirical pattern is summarized by

$$
N=\mathcal{A}\eta(V)V^\alpha,
$$

where $\eta(V)$ is log-normally distributed multiplicative noise. The paper also compares scaling exponents by political role and estimates cumulative distributions for mayoral candidates, councillor candidates, party memberships, and voters.

## Experiments

The binned log-log relationships are approximately linear in every party-membership year. The fitted exponent changes only slightly, from $0.87\pm0.02$ in 2006 to $0.85\pm0.02$ in 2011, so the authors do not reject temporal constancy after accounting for the reported standard errors.

The variance of $\log_{10}N$ around the scaling relationship is nearly constant across voter-population windows. Averaged across city size and year, it is $0.027\pm0.002$. The normalized residual distributions are close to a standard Gaussian, and Pearson chi-squared tests do not reject normality in any observed year. Simulations of the multiplicative model using the average exponent and variance reproduce the binned means, approximately constant variance, and residual distributions.

Comparison with the earlier candidate analysis yields a monotone ordering of exponents: the more influential the political position, the smaller the estimated exponent. The cumulative count distributions also differ by role. Mayoral and councillor candidate counts have short tails approximated by exponential decay, whereas party-membership and voter counts show an intermediate approximate power-law decay before an exponential-like cutoff. The authors associate this contrast with both political influence and constraints on available positions: each city has one mayor, council seats are limited, and party membership is not capped in the same way.

## Limitations

The evidence is descriptive and observational. The scaling relationships do not identify why engagement grows sublinearly, and the proposed under-representation mechanism is an interpretation rather than a causal result. Political influence, seat limits, party availability, candidacy rules, and other features vary together across the three roles, so their separate effects cannot be recovered from the comparisons.

The analysis concerns Brazilian municipalities under the electoral institutions of the observed period. In particular, compulsory voting makes voter counts closely track the adult population, while mayoral and council candidacy are institutionally constrained. These conditions limit direct generalization to other countries or electoral systems. The candidate comparison also relies on results from an earlier study, while the new longitudinal analysis covers only three party-membership years. Finally, the fitted law summarizes binned averages and log-scale residuals; it does not imply that every city follows the same engagement process.

## Related Concepts

- [[Electoral Scaling Laws]]
- Allometric scaling
- Political participation
- Political representation
- Multiplicative log-normal models
- Sociophysics

## Related Papers

- Mantovani, Ribeiro, Moro, Picoli, and Mendes (2011), *Europhysics Letters* 96, 48001.
- Gomez-Lievano, Youn, and Bettencourt (2012), *PLOS ONE* 7, e40393.
- Alves, Ribeiro, Lenzi, and Mendes (2013), *PLOS ONE* 8, e69580.
- Fortunato and Castellano (2007), *Physical Review Letters* 99, 138701.

[[index|Library home]]
