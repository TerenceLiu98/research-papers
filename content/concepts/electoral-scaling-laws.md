---
title: Electoral Scaling Laws
type: concept
aliases:
  - Scaling Laws of Electoral Engagement
tags:
  - electoral-scaling-laws
  - electoral-engagement
  - allometric-scaling
  - sociophysics
---

## Overview

Electoral scaling laws describe systematic relationships between electorate size or voter turnout and aggregate electoral quantities such as party memberships, candidate counts, or votes in different ballot partitions. A common formulation models a count as a power of the relevant electoral population with multiplicative fluctuations. The exponent summarizes whether the count grows proportionally, faster than proportionally, or more slowly than that population.

## Key Ideas

- A basic model is $N=\mathcal{A}\eta(V)V^\alpha$, where $V$ is electorate size, $N$ is an electoral count, $\alpha$ is the scaling exponent, and $\eta(V)$ is multiplicative noise.
- When $\alpha<1$, the expected count grows sublinearly: larger electorates have fewer counted participants or candidates per voter. This arithmetic implication does not by itself identify an institutional or behavioral mechanism.
- When a count is modeled against turnout rather than registered electorate, $\alpha>1$ implies that the count's share of cast ballots rises with turnout. [[Simplified model relating blank and null votes to voter turnout from Brazilian state elections results]] applies this interpretation to pooled blank and null votes in Brazilian gubernatorial runoffs.
- Exhaustive vote partitions are constrained by conservation: their shares must sum to one. This identity can link estimated prefactors and exponents, but a model derived from the identity still requires out-of-sample validation and does not identify voter-level behavior.
- If logarithmic residuals have approximately constant variance and follow a Gaussian distribution, the original-scale noise is approximately log-normal. Comparing both the mean relationship and its residuals is therefore more informative than fitting a power-law slope alone.
- Exponents can differ across kinds of electoral engagement. Such differences may reflect political influence, limited seats, party rules, barriers to candidacy, or other institutional constraints, so an exponent hierarchy should not automatically be given a causal interpretation.
- Distributional tails provide complementary information. Counts constrained by a small number of offices can have shorter tails than less directly capped quantities even when both exhibit systematic scaling with electorate size.
- Cross-national or temporal generalization requires attention to compulsory voting, municipal structure, the number of parties, candidacy rules, and how electoral engagement is measured.

## Important Papers

- [[Simplified model relating blank and null votes to voter turnout from Brazilian state elections results]]
- [[Engagement in the electoral processes: Scaling laws and the role of political positions]]
- Mantovani, Ribeiro, Moro, Picoli, and Mendes (2011), *Europhysics Letters* 96, 48001.

## Related Concepts

- Allometric scaling
- Urban scaling
- Political participation
- Political representation
- Voter turnout
- Blank and null voting
- Multiplicative log-normal models
- Electoral institutions
