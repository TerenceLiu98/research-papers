---
title: "Party Competition with Costly Voting"
type: paper
authors:
  - Thomas Mustillo
year: 2026
doi: "10.18564/jasss.6117"
tags:
  - party-competition
  - voter-turnout
  - agent-based-modeling
---

## TL;DR

Introducing [[concepts/costly-voting|costly voting]] into spatial party competition changes both participation and party positioning. In Mustillo's simulations, higher costs increase party eccentricity in small vote-seeking party systems but reduce it in large ones. Parties that relocate to their voters' mean positions lose their full-turnout representational advantage as abstention spreads.

## Research Question

How do voting costs interact with party numbers and behavioral strategies to shape turnout, citizen representation, party and winner eccentricity, and the ideological profiles of voters and abstainers?

## Motivation

Full-turnout assumptions suppress feedback between participation and party adaptation. Extending Laver and Sergenti's chapter-five baseline isolates this feedback while retaining its spatial electorate and homogeneous party-strategy scenarios.

## Contributions

- Integrates a benefit–cost participation decision into an adaptive spatial model.
- Identifies opposite effects of voting costs on hunter eccentricity in small versus large party systems.
- Shows how abstention undermines the representational properties of aggregator competition associated with Lloyd's algorithm.
- Tracks voters and abstainers separately: abstention begins at the policy-space periphery and spreads inward as costs rise.

## Method

The NetLogo model contains 1,000 citizens with fixed preferences drawn from a bivariate normal distribution centered at zero, with standard deviation 10 on each axis. Citizen positions are assigned to a 71 × 71 grid; parties move continuously. Each scenario contains two through ten parties using the same strategy:

- **Hunters:** take one-unit steps, retaining direction after vote-share gains and randomly turning after losses.
- **Aggregators:** move to the mean ideal point of their previous voters.
- **Stickers:** retain their initial positions.

Citizens vote for their nearest party when policy benefit exceeds the common voting cost, and otherwise abstain. Benefit combines attraction to the nearest party and threat from the farthest party, weighted by their electoral strength. Parties update synchronously, then citizens update turnout, then outcomes and vote shares are calculated.

Citizen misery is the mean distance from every citizen, including abstainers, to their nearest party. Party eccentricity averages distances from parties to the electorate's center; winner eccentricity uses only the winning party. These quantities differ from vote-weighted [[concepts/party-system-polarization|party-system polarization]].

## Experiments

The design crosses nine party counts with five cost settings, giving 45 conditions per strategy. Costs range from −900 to −100: values closer to zero mean higher costs in this utility convention. A separate −10,000 baseline approximates full turnout.

Hunter conditions use one 1,101-iteration repetition, discarding 101 burn-in iterations and averaging the remaining 1,000 observations. Aggregator and sticker conditions use 1,000 independently initialized repetitions, collecting terminal outcomes after convergence or a time cap. Each strategy therefore supplies 45,000 observations, with time averages for hunters and ensemble averages for the other strategies. Fractional polynomial regressions summarize outcome patterns; plotted confidence intervals are omitted by the author.

Reported findings include:

- Two-hunter eccentricity increases from 0.17 population standard deviations at baseline to 0.26 at the highest cost, when turnout is 38.1%. Large hunter systems instead move inward as costs rise (§5.7).
- Ten-hunter turnout falls from 85.5% at the lowest experimental cost to 34.2% at the highest. Citizen misery rises with costs in large hunter systems but declines slightly in small ones (§§5.5–5.6).
- Aggregator misery increases with costs across party counts. At low costs, turnout ranges from 91.5% for ten parties to 98.8% for two; at the highest cost it can fall to 41.0% (§§5.11–5.13).
- Aggregators form regular spatial partitions under low costs. At high costs, abstention between parties disrupts this geometry: parties represent their remaining voters while overlooking abstainers (§§5.16–5.19).
- Sticker positions and citizen misery do not respond to voting costs, although turnout does. Higher costs also reduce the effective number of parties relative to the actual count (Appendices B–C).

## Limitations

These are simulation results, not empirical estimates of the effects of voting restrictions. Fixed normally distributed preferences, homogeneous costs, identical strategies within each system, and exogenous party counts restrict generalization. Mixed strategies, party entry and exit, heterogeneous participation costs, and empirical calibration remain extensions.

The source has an unresolved distance-versus-utility inconsistency: equation (3) defines Euclidean distance, while the utility discussion describes quadratic losses without consistently displaying squared distances. Its discussion also alternates between global optimality language and the correct local-convergence qualification for Lloyd's algorithm. Accordingly, the aggregator results support a reported representational pattern, not a general guarantee of globally optimal representation under the stated mean-distance measure.

## Related Concepts

- [[concepts/costly-voting|Costly Voting]]
- [[concepts/k-means-clustering|K-Means Clustering]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/effective-number-of-parties|Effective Number of Parties]]

## Related Papers

- Laver and Sergenti (2012), *Party Competition: An Agent-Based Model*: the baseline extended here.
- Riker and Ordeshook (1968), “A Theory of the Calculus of Voting”: the participation framework simplified here.
- [[papers/beyond-the-median-voter-a-model-of-how-the-ideological-dimension-shapes-party-polarization|Beyond the median voter: A model of how the ideological dimension shapes party polarization]]: a complementary spatial account of polarization through dimensionality and satisficing rather than the cost intervention studied here.

Source: *Journal of Artificial Societies and Social Simulation* 29(3), 4. Metadata and findings are taken from the supplied parsed Markdown; its opening title heading is absent, so the page title follows the model name used throughout the text.

[[index|Library home]]
