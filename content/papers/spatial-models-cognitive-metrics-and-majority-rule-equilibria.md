---
title: "Spatial Models, Cognitive Metrics, and Majority Rule Equilibria"
type: paper
authors:
  - Macartan Humphreys
  - Michael Laver
year: 2010
journal: British Journal of Political Science
volume: 40
issue: 1
pages: "11–30"
url: https://www.jstor.org/stable/40649421
tags:
  - social-choice
  - spatial-models
  - majority-rule
---

## TL;DR

With uniform city block preferences, majority-rule equilibrium can exist in arbitrarily many policy dimensions. Humphreys and Laver characterize exactly when the dimension-by-dimension median is unbeaten: every rugged halfspace around it must contain a majority of ideal points. Existence becomes less likely as independent dimensions and voters increase, and heterogeneous issue weights substantially weaken the result.

## Research Question

Can cognitively plausible distance metrics restore majority-rule equilibrium in multidimensional policy spaces, and under what necessary and sufficient conditions?

## Motivation

Generic nonexistence results for smooth spatial preferences leave policy predictions sensitive to institutional assumptions. The authors distinguish weakly spatial models, which merely represent outcomes geometrically, from strongly spatial models, which additionally assume people evaluate outcomes by distance from an ideal point. Cognitive evidence on separable attributes motivates testing city block rather than Euclidean distance, although its applicability to politics remains unsettled.

## Contributions

- Gives a necessary and sufficient equilibrium condition for uniform city block preferences in any dimension.
- Identifies the dimension-by-dimension median as the only possible equilibrium under the maintained odd-electorate assumptions.
- Explains how kinks at coordinate medians and opposition between orthants permit equilibrium without the restrictive symmetries associated with smooth preferences.
- Studies equilibrium frequency, unequal voting weights, heterogeneous issue weights, and approximate city block metrics.

## Method

Voter i ranks policies by increasing weighted absolute distance from ideal point y_i: the sum across dimensions of positive issue weights times absolute coordinate differences. Uniformity requires common relative issue weights across voters; rescaling coordinates then makes all weights unity. This differs from assigning voters unequal voting power.

The main analysis assumes an odd number of voters and ideal points in general position, with one median voter per dimension. Center the coordinates at the dimension-by-dimension median. A rugged halfspace is the closure of half the open orthants whose sign vectors have positive inner product with some common vector. Boundaries matter: median ideal points can belong to both opposing rugged halfspaces.

Proposition 1 establishes that an equilibrium exists exactly when every rugged halfspace contains a majority of ideal points; it is then the coordinatewise median. A majority can improve any other candidate by moving one coordinate toward its median. The halfspace condition rules out majority-supported movements away from the median. Under these assumptions, equilibrium is guaranteed with three voters in any dimension, or with any odd number of voters in two dimensions.

## Experiments

The evidence combines proofs and simulations, rather than new measurements of human preferences.

- **Independent ideal points (Table 1):** 500 polities per configuration, drawn from a multivariate normal with identity covariance. Each median is tested against 5,000 nearby alternatives, within 0.001 on each coordinate. Reported equilibrium frequencies for five voters are 0.66, 0.31, 0.11, and 0.07 in three through six dimensions. With fifteen voters they are 0.25 in three dimensions and 0.01 in four. These finite numerical searches estimate stability rather than exhaustively certify every sampled profile.
- **Correlated ideals:** With off-diagonal covariance 0.9, equilibrium becomes more frequent; the reported frequency for fifteen voters in six dimensions is 6 percent. Correlated ideal locations are distinct from separability of individual preferences.
- **Voting weights:** Disciplined parties reduce the effective number of agents. A system-dominant party can also be particularly likely to occupy the weighted median, supporting sufficient conditions for stability.
- **Near-city-block metrics (Figure 3):** For three voters in two through four dimensions, each plotted point uses 2,000 polities and 2,000 rival policies. The sampled measure of policies beating the median approaches zero as the Minkowski exponent approaches one. A shrinking winset does not establish exact equilibrium for smooth metrics.

## Limitations

Common relative issue weights are central. With heterogeneous weights, opposite orthants no longer guarantee opposing gradients; equilibrium persists only under more restrictive configurations. Small smooth departures from city block geometry can destroy exact equilibrium even when the median's winset is small. Approximate stability is most relevant when feasible proposals, cognitive resolution, or transaction costs restrict small policy moves. The paper does not establish that people generally use uniform city block metrics for political choices. Several equations in the supplied extraction are malformed; this summary avoids reproducing those transcription errors.

## Related Concepts

- [[concepts/city-block-preferences|City Block Preferences]]: the distance geometry responsible for the equilibrium result.
- [[concepts/euclidean-preferences|Euclidean Preferences]]: the contrasting geometry underlying familiar smooth spatial models.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: connects the median policy prediction to spatial electoral competition, whose strategic assumptions remain separate.

## Related Papers

- [[papers/error-in-the-euclidean-preference-model|Error in the Euclidean Preference Model]]: studies representational limitations of Euclidean rankings; the present paper instead studies majority stability under a different metric.
