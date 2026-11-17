---
title: A General Approach to Measuring Electoral Competitiveness for Parties and Governments
type: paper
authors:
  - Axel Cronert
  - Pär Nyman
year: 2021
doi: 10.1017/pan.2020.30
tags:
  - electoral-competitiveness
  - coalition-politics
  - election-forecasting
---

## TL;DR

Combining simulated election results with a government-formation model yields probabilities that parties enter office after the next election. Applications to roughly 1,700 Swedish local elections and 420 national elections in 34 democracies outperform the evaluated competitiveness proxies at predicting incumbent retention, with weaker performance across countries.

## Research Question

How can electoral competitiveness reflect both uncertainty about votes and uncertainty about which governing coalition forms once seats are allocated?

## Motivation

Vote margins and plurality-loss probabilities omit post-election bargaining. Parties with similar seat shares can have different office prospects because of ideology, incumbency, coalition experience, and institutional rules. Poll-informed probabilities can also change during an electoral term, unlike measures fixed at the previous election.

## Contributions

- Integrates pre-electoral and post-electoral uncertainty in an actor-specific office probability.
- Provides a four-step simulation and aggregation procedure applicable to individual parties and collections of parties.
- Evaluates calibration, predictive capability, polling updates, and simplified specifications in local and cross-national settings.

## Method

The central decomposition is $P(O_p)=\sum_v P(O_p\mid E_v)P(E_v)$: integrate conditional office probabilities over possible election outcomes (§2).

1. Forecast party vote shares using OLS and simulate 500 election outcomes by adding resampled residuals. In Sweden, predictors include previous results, national polling changes, incumbency, and interactions. Residual blocks preserve within-election dependence; ten clusters group elections with similarly sized parties. Simulated votes are converted into seats.
2. Estimate a conditional logit over potential governing coalitions using observed government formation. The Swedish specification includes 32 coalition characteristics, including majority status, incumbency, ideological range, and prior cooperation.
3. Enumerate potential coalitions for each simulated seat distribution and predict their formation probabilities.
4. Sum probabilities of coalitions containing a party and average over simulations. The incumbent-government measure is a seat-share-weighted average of incumbent parties’ office probabilities, not the probability that the exact incumbent coalition returns intact.

Office probability $p$ measures electoral safety; $1-p$ measures vulnerability. Competitiveness understood as uncertainty is greatest near $p=0.5$, so a government almost certain to lose is vulnerable but faces little outcome uncertainty (§3.5).

## Experiments

| Setting | Evaluation | Reported result |
| --- | --- | --- |
| Swedish municipalities | Approximately 1,700 formation opportunities, 1998–2018; annual forecasts during 1995–2018 | Binned predicted and observed probabilities align reasonably closely for parties, weighted incumbents, and the largest incumbent party. |
| Swedish predictive comparison | 18 existing measures; four forecast horizons | The proposed measure exceeds all evaluated alternatives for weighted incumbent retention, largest-party retention, and mayoral-party retention. Weighted-incumbent adjusted $R^2$ rises from 0.192 three years before election to 0.231 in election-year May. |
| Cross-national application | 420 elections in 34 parliamentary or semi-presidential democracies; 16 alternatives | Adjusted $R^2$ is 0.09–0.10 without polls and 0.12–0.13 with polls; the proposed measures improve on the evaluated alternatives. |

Simplified vote forecasts and coalition models retain predictive advantages. Omitting election-outcome simulation understates competitiveness, whereas simplifying residual blocks and clusters has relatively little effect. Cross-national calibration is less precise and slightly understates uncertainty. The cross-national model uses ParlGov, distinguishes old and postcommunist democracies, and bootstraps formation opportunities to propagate coefficient uncertainty (§§4–5).

## Limitations

The procedure is computationally demanding and benefits from rich information. National applications face party splits, mergers, new parties, and institutional heterogeneity; major split/merger cases and selected systems are excluded. The reported regression comparisons assess office retention, while several comparator measures target other notions of competition. The supplied article does not establish prospective held-out forecasting performance. Office probabilities also need not imply equal policy influence across institutional contexts. Detailed supplementary specifications are referenced but are not included in the supplied Markdown.

## Related Concepts

- [[concepts/office-probability-based-electoral-competitiveness|Office-Probability-Based Electoral Competitiveness]]: integrates electoral and coalition uncertainty while separating safety from uncertainty.
- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]]: measures candidate vote distances to seat boundaries, a different target from party entry into government.

## Related Papers

- [[papers/measuring-closeness-in-proportional-representation-systems|Measuring Closeness in Proportional Representation Systems]]: offers analytical candidate vote margins rather than model-dependent office probabilities.
- Kayser and Lindstädt (2015), “A Cross-National Measure of Electoral Competitiveness”: supplies measurement criteria and a plurality-loss comparison.
- Martin and Stevenson (2001), “Government Formation in Parliamentary Democracies”: supplies the potential-coalition modeling foundation.

Published in *Political Analysis* 29:337–355 (2021), online November 11, 2020. Replication resources reported in the article: [Code Ocean](https://doi.org/10.24433/CO.7984668.v1) and [Dataverse](https://doi.org/10.7910/DVN/YMQFYB).
