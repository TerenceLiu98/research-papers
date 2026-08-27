---
title: "Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality"
type: paper
authors:
  - Jelle Koedam
  - Garret Binding
  - Marco R. Steenbergen
year: null
doi: "10.1017/S0007123424000474"
tags:
  - party-system-polarization
  - ideological-dimensionality
  - comparative-politics
  - political-partisanship
  - political-measurement
---

## TL;DR

European party competition cannot always be represented adequately by a single left-right axis. This paper measures the [[Ideological Dimensionality|effective dimensionality]] of parties' positions from the eigenvalues of their vote-share-weighted correlation matrix, then combines it with positional variance to measure [[Party-System Polarization|party-system polarization]] across correlated dimensions. In Chapel Hill Expert Survey data from 1999-2019, the resulting measure passes content, convergent, and construct-validity checks. When merged with electoral surveys, a one-standard-deviation increase in two-dimensional polarization is associated with about a 5.5 percentage-point increase in the predicted probability of partisan identification, compared with about 1.6 points for one-dimensional polarization.

## Research Question

How can party-system polarization be measured when economic and cultural conflict lines may reinforce one another, crosscut one another, or fall between those extremes, and does such a measure better capture the relationship between party polarization and mass partisanship in Europe?

## Motivation

Conventional variance-based polarization measures usually place parties on a single general left-right scale. This is restrictive in European party systems, where economic and [[GAL-TAN Dimension|cultural]] conflict may define separate axes. Summing variances across axes is also insufficient because it treats them as fully independent and double-counts dimensions that are partly redundant. Portugal illustrates a system in which economic and cultural party positions nearly align, whereas the Netherlands contains combinations, such as the culturally divergent CU and D66, that a general left-right axis obscures.

The paper distinguishes potential dimensions, which are analytically separable issue bundles, from effective dimensions, which are the independent axes empirically needed to represent party positions. This connects a dispersion-based view of polarization to a constraint-based view: positional variance is necessary for polarization, while the correlation among dimensions determines whether divisions are mutually reinforcing or cross-cutting.

## Contributions

- Introduces effective dimensionality as a continuous measure of how many potential ideological dimensions are empirically distinct in a party system.
- Generalizes variance-based party polarization to multiple, potentially correlated dimensions rather than assuming either a single axis or complete orthogonality.
- Shows how the measure distinguishes equally dispersed configurations whose dimensions have different correlational structures.
- Validates the measure against observed party configurations, a conventional one-dimensional measure, and established institutional correlates of polarization.
- Demonstrates that multidimensional polarization has a stronger association with mass partisanship than general left-right polarization in the studied European elections.

## Method

For $D$ potential dimensions, effective dimensionality (ED) is calculated from the eigenvalues $\lambda_d$ of the correlation matrix of party positions:

$$
ED = \prod_{d=1}^{D}\left(\frac{\lambda_d}{D}\right)^{-\lambda_d/D}, \qquad ED \in [1,D].
$$

With two potential dimensions, $ED=1$ when positions correlate perfectly and the empirical space collapses to one dimension; $ED=2$ when the axes are orthogonal. Parties are weighted by vote share when constructing the correlation matrix. The multidimensional polarization measure is

$$
\operatorname{Polarization}_D = \frac{ED}{D}\sum_{d=1}^{D}\widetilde{\sigma}_{I_d}^{2},
$$

where $\widetilde{\sigma}_{I_d}^{2}$ is the party-size-weighted variance on dimension $d$. The $ED/D$ factor discounts variance contributed by redundant dimensions. The authors normalize the measure to range from 0, when all parties share a position, to 1, when $2^D$ equally sized parties occupy the dimensional extremes.

The empirical analysis uses CHES party placements from 1999-2019. Economic positions capture redistribution, public spending, deregulation, and related issues; cultural positions capture social change, traditional values, lifestyle, family, and immigration conflicts. A general left-right placement supplies the one-dimensional benchmark. The authors validate the measure through content checks against country configurations, convergence with left-right polarization, and construct checks involving electoral proportionality and the effective number of parties.

For the partisanship analysis, the paper merges five Comparative Study of Electoral Systems modules with CHES, covering 73 elections in 24 European countries. The binary outcome records whether respondents feel close to a political party. Multilevel models compare standardized one- and two-dimensional polarization and then interact multidimensional polarization with the electoral strength of party families for which cultural conflict is relatively salient.

## Experiments

Effective dimensionality varies across countries and over time. Spain, Portugal, and the United Kingdom are among the systems with lower values, while Latvia and Estonia have consistently high values. Multidimensional polarization is highest on average in Poland, Greece, and Belgium and lowest in Bulgaria, Latvia, and Ireland. The low-polarization cases mainly reflect limited positional variance rather than low effective dimensionality.

One- and two-dimensional polarization correlate at $\rho=0.55$ across country-survey waves. They converge when effective dimensionality is low and when left-right variance resembles average economic and cultural variance. In the construct-validation models, proportionality and the effective number of parties have coefficients with the same direction and statistically indistinguishable magnitudes under the one- and two-dimensional measures.

A one-standard-deviation increase in general left-right polarization is associated with an increase of about 1.6 percentage points in the predicted probability that a respondent identifies with a party. The corresponding estimate for two-dimensional polarization is about 5.5 points, roughly 3.5 times as large. The multidimensional estimate also varies with the electoral strength of culturally focused party families: it rises from about 3.8 points at one standard deviation below their mean strength to about 8.4 points at one standard deviation above it.

## Limitations

The empirical application uses economic and cultural dimensions, although the measure can accommodate other or additional conflict lines. Results depend on CHES expert placements; these offer direct dimensional estimates but may conceal expert disagreement or cross-country differences in scale meaning. The paper studies party positions, not the multidimensional attitudes of voters, so it cannot compare elite and mass polarization within the same framework.

The analysis treats party polarization as ideological distinctiveness and does not establish whether cross-cutting party conflict intensifies or moderates social conflict. Dimensional salience is omitted from the core polarization measure and enters the partisanship analysis only through the electoral strength of culturally focused party families. The relationship with mass partisanship is observational, and partisanship is only one proposed consequence; effects on turnout, satisfaction, affective polarization, coalition durability, policy agendas, and democratic stability remain open questions.

## Related Concepts

- [[Party-System Polarization]]
- [[Ideological Dimensionality]]
- [[GAL-TAN Dimension]]
- [[Effective Number of Parties]]
- Mass partisanship
- Cross-cutting cleavages
- Party-position measurement

## Related Papers

- [[Making space: citizens, parties and interest groups in two ideological dimensions]]
- [[Party system polarization and the effective number of parties]]
- [[Beyond the median voter: A model of how the ideological dimension shapes party polarization]]
- Baldassari and Gelman (2008), "Partisans without constraint: Political polarization and trends in American public opinion."
- Dalton (2008), "The quantity and the quality of party systems: Party system polarization, its measurement, and its consequences."
- Del Giudice (2020), "Effective dimensionality: A tutorial."
- Lupu (2015), "Party polarization and mass partisanship: A comparative perspective."

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/T3Y1ZQ).

[[index|Library home]]
