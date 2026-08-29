---
title: "Simplified model relating blank and null votes to voter turnout from Brazilian state elections results"
type: paper
authors:
  - M. Cardoso
  - L. H. D. Afonso
  - R. R. Neli
  - W. E. Souza
year: 2024
doi: "10.1016/j.physa.2024.129777"
tags:
  - electoral-scaling-laws
  - voter-turnout
  - blank-and-null-votes
  - brazilian-elections
  - sociophysics
---

## TL;DR

Municipality-level results from 90 Brazilian gubernatorial runoff elections show approximately power-law relationships between turnout and each of three vote partitions: votes for the winner, votes for the runner-up, and blank plus null votes. By combining the two-candidate fits with conservation of total votes, the paper derives a one-parameter scaling model for blank and null votes. Their fitted exponent is statistically above one in 59 of 90 elections, but this aggregate association does not establish why larger electorates cast a higher blank/null share.

## Research Question

How do blank and null votes scale with municipal voter turnout in Brazilian gubernatorial runoffs, and can vote conservation reduce their empirical relationship to a one-parameter [[Electoral Scaling Laws|scaling model]]?

## Motivation

Most quantitative election models emphasize votes received by candidates even though turnout also includes ballots cast for neither candidate. This omission matters in Brazilian runoffs, where voting is compulsory for many citizens and blank and null ballots are excluded from valid votes. Earlier two-candidate scaling models treated candidate votes as approximately exhausting turnout. The paper asks whether explicitly modeling the residual vote partition changes that account.

## Contributions

- Extends turnout-vote scaling analysis to pooled blank and null ballots alongside votes for the first- and second-place candidates.
- Estimates 270 municipality-level log-log relationships across 90 state gubernatorial runoff elections held from 1994 through 2022.
- Uses the identity $V_f/T+V_s/T+V_{bn}/T=1$ to derive a simplified blank/null model after the direct intercept-slope fit for this partition proves substantially weaker than the candidate fit.
- Reports that 66 of 90 blank/null exponent point estimates exceed one and that 59 of 90 remain statistically above one under the paper's error-bar and Kolmogorov-Smirnov checks.
- Derives an approximate weighted relationship among the three scaling exponents.

## Method

For election $i$, the analysis regresses the logarithm of each municipality's vote count $V_{k}$ on the logarithm of turnout $T$, where $k\in\{f,s,bn\}$ denotes the first-place candidate, second-place candidate, or pooled blank and null votes:

$$
\log V_{k}=A_{k,i}+\alpha_{k,i}\log T+\xi_{k,i}.
$$

Exponentiating gives $V_k=a_{k,i}T^{\alpha_{k,i}}\zeta_{k,i}$. The normalized residual distributions are reported as approximately Gaussian. Across elections, the winner and runner-up parameters follow the joint approximation $A_{k,i}\approx4.15-4.5\alpha_{k,i}$ with $R^2=0.91$. Defining $\log_{10}T^*=4.5$ yields

$$
V_k\approx0.45T^*\left(\frac{T}{T^*}\right)^{\alpha_{k,i}}\zeta_{k,i},
\qquad k\in\{f,s\}.
$$

The analogous direct parameter relationship for blank and null votes has only $R^2=0.61$. The authors instead impose vote conservation,

$$
\frac{V_f}{T}+\frac{V_s}{T}+\frac{V_{bn}}{T}=1,
$$

and evaluate it around $T=T^*$ to obtain

$$
V_{bn}\approx0.10T^*\left(\frac{T}{T^*}\right)^{\alpha_{bn,i}}\zeta_{bn,i}.
$$

A first-order expansion around exponents equal to one gives the further approximation

$$
0.45\alpha_{f,i}+0.45\alpha_{s,i}+0.10\alpha_{bn,i}\approx1.
$$

## Experiments

The dataset contains every reported Brazilian state gubernatorial election decided in a second round from 1994 through 2022: 90 elections distributed over the eight years listed in Table 1. Each election contributes three regressions across its municipalities, for 270 fits in total. The data are attributed to Brazil's Superior Electoral Court, with state population and electorate context from the Brazilian Institute of Geography and Statistics.

The paper reports that the log-log fits generally have $R^2\geq0.8$ and that simulated blank/null counts from the simplified model visually approximate the 2022 observations. All three kinds of exponent remain near one. Winner exponents are superlinear in 40 elections, runner-up exponents in 50, and blank/null exponents in 66 based on point estimates. Accounting for reported uncertainty reduces the last count to 59 elections, or 65%. In those elections, blank and null votes increase faster than turnout, so their share is higher in larger municipal electorates.

The winner and runner-up exponents tend to lie on opposite sides of one. The paper also reports seven states in which every observed blank/null exponent exceeds one, although the number and years of runoff elections differ across states.

## Limitations

The study is descriptive and uses aggregate municipal counts, so the scaling exponents do not identify individual motivations or show that blank/null voters are dissatisfied, harder to persuade, or more demanding. Blank and null ballots are pooled even though they may arise through different choices or errors, and abstention is outside the modeled conservation equation because $T$ counts only voters who turned out.

The one-parameter blank/null model is partly imposed by vote conservation and by the two-candidate approximation; its direct intercept-slope relationship is comparatively weak at $R^2=0.61$. Validation is primarily in-sample and graphical, and the source does not fully specify the statistical test used to classify an exponent as greater than one. The analysis is restricted to Brazilian gubernatorial runoffs under compulsory-voting institutions, so extension to other offices, multi-candidate contests, countries, or electoral rules remains untested.

There are also reporting inconsistencies. The abstract refers to nine election years while Table 1 enumerates eight, and the main text identifies Bahia in 1994 as an exception to $R^2\geq0.8$ while the appendix says all fits meet that threshold. These discrepancies do not change the reported total of 90 elections but complicate replication from the paper alone. Although the underlying electoral sources are public, the article's data-availability statement says that data will be provided on request.

## Related Concepts

- [[Electoral Scaling Laws]]
- [[Opinion Dynamics]]
- Voter turnout
- Blank and null voting
- Allometric scaling
- Probability conservation
- Sociophysics

## Related Papers

- [[Engagement in the electoral processes: Scaling laws and the role of political positions]]
- Bokanyi, Szallasi, and Vattay (2018), "Universal scaling laws in metro area election results."
- Cardoso, Souza, Neli, and Souza (2023), "Scaling laws from Brazilian state election results point out that, the candidate's chance to win increases by investing more campaign efforts in smaller electorates."
- Cardoso, Silva, Neli, and Souza (2022), "Electorate involvement disorder: Universal relationship between the amplitude and electorate size in second round of Brazilian presidential election."

[[index|Library home]]
