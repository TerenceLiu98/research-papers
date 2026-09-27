---
title: Electoral Rule Disproportionality and Platform Polarization
type: paper
authors:
  - Konstantinos Matakos
  - Orestis Troumpounis
  - Dimitrios Xefteris
year: 2013
date: "2013-06-01"
source_job_id: "0063dfc0-b41d-43e7-86e7-603451b1eca0"
tags:
  - electoral-systems
  - party-system-polarization
  - spatial-electoral-competition
  - party-entry
---

## TL;DR

In a spatial model with policy-motivated parties, stronger electoral advantages for the vote winner reduce platform polarization directly by rewarding moderation and indirectly by discouraging centrist-party entry. For two parties and uniformly distributed voters, equilibrium platform distance is $1/n$, where $n$ controls vote-to-seat disproportionality. Observational regressions covering 23 OECD countries associate more proportional rules with greater platform polarization, but provide little consistent support for a separate party-count effect.

## Research Question

How does [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]] affect the distance between party platforms, both with a fixed set of parties and when parties decide whether to enter an election?

## Motivation

Spatial competition creates competing incentives for policy-motivated parties: moderation sacrifices their preferred platform but can increase their influence on implemented policy. Electoral rules change that tradeoff by translating votes into parliamentary power. The paper introduces a continuous measure of this transformation to connect proportional representation and winner-take-all competition, and examines whether party entry reinforces its effect on polarization.

## Contributions

- Derives equilibrium platforms under a [[concepts/parliamentary-mean-model|Parliamentary-Mean Model]] with a power-law vote-to-seat mapping.
- Reports two-party existence and uniqueness results and comparative statics for uniform voters and more general distributions, with interior-equilibrium conditions for the latter.
- Extends the model to mixed office and policy motives, non-extreme party ideals, and symmetric three-party competition.
- Introduces costly entry by three potential parties, producing a threshold at which the centrist party withdraws and platform polarization falls further.
- Tests electoral-system and party-count hypotheses using manifesto positions, institutional data, and country and year fixed effects.

## Method

### Platforms, Seats, and Policy

Voters occupy $[0,1]$ and support the closest announced platform, splitting ties. The two baseline parties have ideal policies at 0 and 1 and value proximity of the implemented policy to those ideals. For vote shares $V_j$, parliamentary shares and implemented policy are

$$
S_j=\frac{V_j^n}{\sum_k V_k^n},\qquad
\hat t=\sum_j S_jt_j,\qquad n\geq1.
$$

At $n=1$, seats equal votes. Larger $n$ favors larger vote shares; $n=3$ represents the cube-law approximation, and the limit approaches winner-take-all allocation when a unique vote winner exists. Parties commit to platforms before voting and choose pure-strategy Nash equilibria.

For uniform voters, Proposition 1 gives

$$
(t_L^*,t_R^*)=\left(\frac{n-1}{2n},\frac{n+1}{2n}\right),
\qquad t_R^*-t_L^*=\frac1n.
$$

Platforms move from $(0,1)$ under proportionality toward the median as $n$ increases; at $n=3$ they are $(1/3,2/3)$. Implemented policy remains $1/2$. For general voter distributions, the appendix characterizes an interior equilibrium by a midpoint at median $m$ and distance $1/[nf(m)]$, where $f(m)$ is the density at the median. These interior conclusions should not be extended automatically to boundary equilibria.

### Party Motives and Entry

With mixed motives, party utility is $\alpha S_j-(1-\alpha)|\tau_j-\hat t|$. Office motivation adds a moderating incentive; sufficiently strong office motivation produces full convergence even at finite $n$.

Under uniform voters and the restriction to symmetric platform equilibria, adding a centrist party with ideal point $1/2$ yields

$$
(t_L^*,t_C^*,t_R^*)=
\left(\frac{n-1}{2(n+1)},\frac12,\frac{n+3}{2(n+1)}\right).
$$

The extreme-platform distance is $2/(n+1)$, larger than the two-party distance for $n>1$. Policy still equals $1/2$: increased platform dispersion does not imply more extreme implemented policy.

The entry extension uses lexicographic preferences: parties first minimize policy loss, then maximize seat share minus entry cost $0<\hat c<1/4$. Proposition 5 identifies a threshold $\hat n$: all three parties enter below it, whereas only the left and right parties enter above it. The centrist party withdraws once its seat share no longer covers entry cost, without changing the implemented policy. The strict inequalities leave the threshold indifference case separate.

## Experiments

The empirical component is an observational panel analysis. Manifesto Project positions on a 0-10 left-right scale provide a vote-weighted Dalton polarization index, with distance between extreme parties as an alternative outcome. Electoral proportionality is measured by a binary indicator coded zero for single-member-district FPTP and one otherwise, or by log average district magnitude. Party counts use the [[concepts/effective-number-of-parties|Effective Number of Parties]] or the raw count.

The largest regression sample contains 307 elections in 23 OECD countries. Section 5.1 gives 1960-2006, while the tables give 1960-2007. Main specifications include country and year fixed effects and country-clustered robust standard errors. Institutional and economic controls reduce the available sample substantially.

Selected Table 1 estimates, with standard errors in parentheses:

| Specification | Proportionality coefficient | ENP coefficient | Elections |
| --- | --- | --- | --- |
| Model 1.a, binary rule | 1.659 (0.181) | 0.009 (0.064) | 307 |
| Model 1.b, log district magnitude | 0.264 (0.071) | 0.033 (0.079) | 255 |
| Model 3.a, binary rule with institutional and economic controls | 1.263 (0.283) | -0.136 (0.181) | 123 |
| Model 3.b, log district magnitude with the same controls | 0.222 (0.068) | -0.113 (0.181) | 123 |

All four proportionality coefficients are reported significant at $p<0.01$; none of these ENP coefficients is significant at the table's reported thresholds. Table A.3 retains positive proportionality associations using platform range, but support for party counts appears only in selected specifications using log ENP. Table A.4 finds positive proportionality coefficients under specifications without fixed effects and with random effects, although their magnitudes differ substantially.

Reported correlations between proportionality measures and party counts are approximately 0.50. The authors interpret this as consistent with the indirect channel, but these correlations do not identify the proposed entry mechanism or establish causal mediation.

## Limitations

- **Model scope:** The baseline uses one policy dimension, sincere proximity voting, policy commitment, and a seat-weighted policy compromise. The three-party result restricts attention to symmetric equilibria, and entry assumes three fixed potential parties with lexicographic objectives. Strategic voting and abstention receive only limited extension discussions.
- **Outcome distinction:** Theoretical polarization is the distance between extreme platforms; the main empirical measure is weighted dispersion. Neither measures citizen affective polarization, and the model can change platform distance while leaving implemented policy unchanged.
- **Identification:** The regressions establish conditional associations. Electoral institutions change infrequently, within-country variation is limited, and fixed effects do not establish exogenous institutional change. The theoretical exponent $n$ is not estimated directly from vote-seat data.
- **Coverage and missingness:** The authors describe the data as balanced, but regression samples range from 123 to 307 elections and differ across specifications. Results apply to the sampled OECD democracies and one-dimensional manifesto positions.
- **Source inconsistencies:** The supplied Markdown gives different terminal sample years. Its printed polarization formula, $\sqrt{\sum_j V_j[(P_j-\bar P)/5]^2}$, has maximum 1 for normalized vote shares and positions in $[0,10]$, while the prose describes a 0-10 index and Table A2 reports values up to 5.14. The regression coefficients above retain the source's reported units; the exact index scaling cannot be resolved from this document alone.
- **Version:** This entry summarizes the manuscript dated June 1, 2013. The supplied text does not identify a publication venue, DOI, or arXiv identifier for the manuscript.

## Related Concepts

- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]
- [[concepts/parliamentary-mean-model|Parliamentary-Mean Model]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/effective-number-of-parties|Effective Number of Parties]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

Works cited in the manuscript include Cox (1990), "Centripetal and centrifugal incentives in electoral systems"; Wittman (1977), "Candidates with policy preferences: A dynamic model"; and Dalton (2008), "The quantity and the quality of party systems party system polarization, its measurement, and its consequences."

Related library readings, rather than claimed citations in this 2013 manuscript:

- [[papers/party-system-polarization-and-the-effective-number-of-parties|Party system polarization and the effective number of parties]] develops a nonlinear relationship between effective party counts and dispersion, providing a different account of why linear party-count estimates can be weak.
- [[papers/electoral-systems-and-ideological-voting|Electoral systems and ideological voting]] examines how electoral rules shape voters' reliance on ideological proximity, complementing the present model's fixed proximity-voting assumption.

[[index|Library home]]
