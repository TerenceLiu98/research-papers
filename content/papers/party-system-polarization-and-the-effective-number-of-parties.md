---
title: "Party system polarization and the effective number of parties"
type: paper
authors:
  - Chris Hanretty
year: 2022
doi: "10.1016/j.electstud.2022.102459"
tags:
  - party-system-polarization
  - effective-number-of-parties
  - electoral-systems
  - logical-models
  - nonlinear-models
---

## TL;DR

When party positions are standardized and polarization is measured as their seat-share-weighted standard deviation, the paper predicts seat-level polarization from the effective number of seat-winning parties as

$$
\varsigma_S = \frac{N_S-1}{N_S-1+1/\sqrt{2}}.
$$

Bayesian nonlinear models fitted separately to CSES, MARPOR, ParlGov, and V-Party data broadly support this saturating relationship, although the model explains only a modest share of observed variation. The corresponding vote-level model uses a shape parameter of approximately $5/6$.

## Research Question

Can the conflicting positive, negative, and null findings about party counts and [[Party-System Polarization|party-system polarization]] be reconciled by a quantitatively specific nonlinear relationship between polarization and the [[Effective Number of Parties|effective number of parties]]?

## Motivation

Party-system research commonly treats the number of parties and their ideological dispersion as separate characteristics. Prior empirical studies reached conflicting conclusions, however, and most estimated linear relationships even though a one-party system necessarily has zero party-position dispersion and the marginal effect of adding parties should plausibly decline. The paper applies [[Quantitatively Predictive Logical Models|quantitatively predictive logical modeling]] to derive a functional form from variable ranges, an anchor point, an asymptote, and minimal assumptions rather than from a detailed theory of party strategy.

## Contributions

- Argues that party positions without a natural zero should be standardized and that polarization should be measured by their vote- or seat-share-weighted standard deviation.
- Derives a Michaelis-Menten relationship that passes through the one-party anchor point $(N_S,\varsigma_S)=(1,0)$ and approaches polarization of 1 as the number of parties grows.
- Uses the effective and raw numbers of parties as competing analogues of sample size, yielding the seat-level shape prediction $k=1/\sqrt{2}\approx0.707$; a known relationship between seat- and vote-winning party counts yields the vote-level prediction $k\approx5/6$.
- Tests the model across four datasets that estimate party positions through mass surveys, manifesto content, expert-survey aggregation, and expert-coded latent-variable models.
- Extends the argument to the range of party positions and shows how covariates can affect either the curve's asymptote or its shape.

## Method

For party $i$ with standardized left-right position $LR_i$ and seat share $s_i$, seat-level polarization is the weighted, uncorrected standard deviation

$$
\varsigma_S=\sqrt{\sum_i s_i(LR_i-\overline{LR})^2}.
$$

The effective numbers of seat- and vote-winning parties are $N_S=1/\sum_i s_i^2$ and $N_V=1/\sum_i v_i^2$. Treating the observed parties as if they were draws from a standardized super-population motivates a small-sample analogy: systems with few parties underestimate the super-population dispersion, while polarization tends toward 1 as the party count increases. The generalized model is

$$
\varsigma=d\frac{N-1}{N-1+k},
$$

where $d$ is the asymptote and $k$ controls the curve's shape. The seat-level prediction sets $d=1$ and $k=1/\sqrt{2}$; the vote-level prediction sets $k\approx5/6$. These assumptions are heuristic: parties need not be independent draws, but their marginal position distributions are treated as comparable.

The analysis combines 106 CSES elections in 42 countries, 613 MARPOR elections in 48 countries, 741 ParlGov elections in 37 countries, and 677 V-Party elections in 102 countries. Elections are limited to democratic cases whose covered parties account for more than 80% and no more than 100% of both votes and seats. Missing party positions are handled with five multiply imputed datasets. Separate Bayesian nonlinear regressions are estimated for each source, with two-parameter models and variants that add an intercept.

For the range extension, party positions are additionally assumed to be standard normal. The expected range among $n$ parties is approximated by $R=3\sqrt{\log n}-1.5$. A final extension lets programmatic competition affect the polarization asymptote and an elected-presidency indicator affect the shape parameter.

## Experiments

For seat-level polarization, seven of the eight reported specifications have parameter intervals consistent with the theoretical predictions. Across the two-parameter specifications, the precision-weighted shape estimate is 0.835, compared with 0.707, and the asymptote estimate is 1.05, compared with 1. The joint deviation of these parameters produces predictions close to the proposed equation: for $N_S$ between 2 and 12, the simplified theoretical curve is on average within 1.6% of the curve formed by the pooled parameter estimates. Dataset-level $R^2$ values range from 0.060 for MARPOR to 0.324 for ParlGov.

Vote-level results are less exact. The precision-weighted shape estimate is 0.956 rather than the predicted 0.839, and the asymptote estimate is 1.077 rather than 1. ParlGov estimates are higher than predicted for both terms, while MARPOR estimates are lower. Vote-level $R^2$ values range from 0.041 to 0.305.

Seven of eight coefficient intervals in the range and truncated-range models are consistent with the predicted intercept of -1.5 and slope of 3. In the covariate models, programmatic competition has a positive, clearly nonzero association with the asymptote in all four datasets. Evidence that presidentialism changes the shape is mixed and clearly distinct from zero only in the MARPOR and CSES analyses.

## Limitations

The super-population argument is a simplifying device, not a behavioral account of party formation or positioning. Political entrepreneurs do not generate parties randomly, and small parties may have systematically stronger incentives to adopt extreme positions. The model therefore identifies a useful functional form without adjudicating among strategic theories that could produce a similar pattern.

The regressions explain a limited share of polarization, and much variation occurs within countries over time without electoral-system change. Results depend on one-dimensional standardized left-right positions and a dispersion-based definition of polarization; modality-based, multidimensional, or affective polarization may behave differently. The range extension requires the stronger assumption of normally distributed positions. Dataset coverage, measurement methods, and missingness differ, cross-dataset measurements correlate only weakly, and multiple imputation cannot eliminate bias from systematically unobserved parties or positions. The institutional extensions are associational, with especially mixed evidence for presidentialism.

## Related Concepts

- [[Party-System Polarization]]
- [[Effective Number of Parties]]
- [[Quantitatively Predictive Logical Models]]
- [[Satisficing Spatial Competition]]
- Electoral-system seat product
- Party-position measurement

## Related Papers

- Dalton (2008), "The quantity and the quality of party systems: Party system polarization, its measurement, and its consequences."
- Laakso and Taagepera (1979), "Effective number of parties: A measure with application to West Europe."
- Taagepera (2008), *Making Social Sciences More Scientific: The Need for Predictive Models*.
- Shugart and Taagepera (2017), *Votes from Seats: Logical Models of Electoral Systems*.
- Andrews and Money (2009), "The spatial structure of party competition: Party dispersion within a finite policy space."
- [[Symmetry Breaking, Hysteresis, and Convergence to the Mean Voter in two-party Spatial Competition]]

[[index|Library home]]
