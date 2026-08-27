---
title: "Universal Statistics of Competition in Democratic Elections"
type: paper
authors:
  - Ritam Pal
  - Aanjaneya Kumar
  - M. S. Santhanam
year: 2025
doi: "10.1103/PhysRevLett.134.017401"
tags:
  - electoral-margin-universality
  - voter-turnout
  - election-forensics
  - sociophysics
  - random-voting-models
---

## TL;DR

Election data from 34 countries show that a parameter-free random voting model can reproduce the distribution of scaled victory margins using the observed turnout distribution as its only input. For 32 of those countries, the turnout-normalized margin $\mu=M/T$, after scaling by its mean, follows an analytical distribution that is independent of turnout and electoral-unit size. Belarus and Ethiopia depart from both predictions, but the authors present such deviations as screening signals for further scrutiny rather than proof of misconduct.

## Research Question

Can the distribution of victory margins be predicted from voter turnout, and does a turnout-normalized measure of electoral competition exhibit [[Electoral Margin Universality|a common distribution]] across countries, electoral systems, and electoral-unit scales?

## Motivation

Previous statistical-physics studies found regularities in vote-share and turnout distributions, but those patterns often depended on the country, election protocol, or scale of the electoral unit. Victory margins directly quantify how closely the leading candidates compete, yet had not been used to formulate a cross-national universality result. A scale-independent regularity could serve both as a constraint for election models and as a statistical diagnostic for unusual election data.

## Contributions

- Introduces a random voting model (RVM) that takes each electoral unit's observed turnout as input and has no fitted parameters.
- Shows empirically that the RVM reproduces country-specific scaled victory-margin distributions despite large differences in turnout distributions.
- Demonstrates that the prediction holds at electoral-unit scales differing by orders of magnitude, including Indian and Canadian polling booths versus constituencies and U.S. counties versus congressional districts.
- Derives an analytical distribution for the specific margin $\mu=M/T$ in the three-candidate, large-turnout limit and a universal distribution for its mean-scaled form.
- Compares that universal curve with data from 32 countries and uses pronounced deviations in Belarusian and Ethiopian data as examples of anomaly screening.

## Method

For electoral unit $i$, the victory margin is $M_i=v_{i,w}-v_{i,r}$, where $v_{i,w}$ and $v_{i,r}$ are the winner's and runner-up's vote totals, and $T_i$ is turnout. The empirical analysis pools unit-level observations across multiple elections within each country to estimate the turnout distribution $g(T)$ and the distribution of the scaled margin $M/\langle M\rangle$.

The RVM uses the empirical turnouts $\{T_i\}$ and assumes three candidates in every unit. Candidate $j$ receives each vote independently with probability

$$
p_{ij}=\frac{w_{ij}}{\sum_k w_{ik}},
$$

where each $w_{ij}$ is independently drawn from a uniform distribution on $[0,1]$. Simulated winner--runner-up differences yield the model's scaled-margin distribution. The choice of three candidates is motivated by the empirical concentration of votes: averaged over the 34 countries, the leading two candidates receive 79% of votes and the leading three receive 87%.

The turnout-normalized or specific margin is

$$
\mu=\frac{M}{T}.
$$

For $T\gg1$, candidate vote totals are approximated by $v_j\approx p_jT$, so $\mu\approx p_{(3)}-p_{(2)}$, the gap between the two largest candidate probabilities. Order-statistic analysis gives

$$
P(\mu)=\frac{(1-\mu)(5+7\mu)}{(1+\mu)^2(1+2\mu)^2},
$$

and, for $x=\mu/\langle\mu\rangle$,

$$
F(x)=\langle\mu\rangle P(x\langle\mu\rangle),
\qquad
\langle\mu\rangle=\frac{1}{2}+\ln\left(\frac{9\sqrt[4]{3}}{16}\right).
$$

## Experiments

The study consolidates national, regional, and city-level election data from 34 countries across six continents and multiple decades. For India, the pooled constituency analysis covers 18 elections from 1951 through 2019. Across countries with visibly different turnout distributions, including India, the United States, South Korea, Canada, Japan, and Germany, RVM predictions closely track the observed distributions of $M/\langle M\rangle$, including their different tail behavior.

Scale comparisons use Indian and Canadian polling-booth and constituency data and U.S. county and congressional-district data. Although turnout ranges and distribution shapes change substantially between scales, the turnout-conditioned RVM continues to match the empirical scaled-margin distributions. The paper's asymptotic analysis further links the tail of the turnout distribution to the tail of the scaled-margin distribution.

Simulations with $10^6$ electoral units and power-law, Gaussian, and uniform turnout distributions collapse onto the same analytical $F(x)$. The average empirical distribution over 32 countries, excluding Ethiopia and Belarus, also agrees with the curve and with finite-sample RVM simulations using each country's observed number of units. Country-level fluctuations are attributed in part to finite sample sizes.

For the 2010 Ethiopian election and Belarusian elections from 2004 through 2019, both the scaled-margin distribution and the scaled specific-margin distribution show pronounced departures from the RVM predictions. The authors connect these cases to concerns documented in prior investigations, while treating the statistical deviations as grounds for closer examination.

## Limitations

The universality result is conditional on a deliberately stylized model. Its analytical form assumes three candidates, independently cast votes, uniformly sampled latent candidate weights, and large turnout. Real elections include strategic voting, party organization, spatial and social dependence, unequal campaign resources, institutional rules, and varying numbers of viable candidates. Agreement with aggregate distributions does not establish that the model describes individual voting behavior.

Pooling elections within countries can conceal temporal and regional heterogeneity, while small national samples generate visible fluctuations. The empirical comparison covers the available countries and election formats rather than a probability sample of all democracies. The model's sensitivity to alternative probability-generating protocols is deferred to the supplemental analysis.

Most importantly, deviation from the reference distribution is not evidence by itself of fraud or misconduct. Legitimate institutional, demographic, measurement, or data-quality differences may also produce anomalies. The proposed distributions are therefore prima facie screening tools whose flags require contextual investigation and independent evidence.

## Related Concepts

- [[Electoral Margin Universality]]
- [[Electoral Scaling Laws]]
- [[Correlated Voting]]
- Election forensics
- Order statistics
- Sociophysics

## Related Papers

- Fortunato and Castellano (2007), *Physical Review Letters* 99, 138701.
- Chatterjee, Mitrovic, and Fortunato (2013), *Scientific Reports* 3, 1049.
- Klimek, Yegorov, Hanel, and Thurner (2012), *Proceedings of the National Academy of Sciences* 109, 16469.
- Jimenez, Hidalgo, and Klimek (2017), *Science Advances* 3, e1602363.

[[index|Library home]]
