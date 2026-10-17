---
title: Party Loyalty Measurement
type: concept
aliases:
  - IRT Party Loyalty
tags:
  - legislative-behavior
  - party-loyalty
  - bayesian-measurement
---

## Overview

Party loyalty measurement seeks to distinguish support for leadership from voting agreement produced by shared policy preferences. A legislator can frequently vote with copartisans while resisting leaders on the votes they prioritize. Measuring loyalty therefore requires both a model of preferences and information about leadership priorities and desired voting directions.

## Key Ideas

- **Unity and loyalty differ:** Party Unity Scores summarize agreement on votes that divide the parties. They do not by themselves establish whether agreement reflects ideology or responsiveness to leaders.
- **Observed leadership signals:** Ramey's speech-based model codes the member's party position as $s_{ij}\in\{-1,0,+1\}$ for nay, no expressed position, or yea. The voting model is $\Pr(y_{ij}=1)=\Phi(\beta_jx_i-\alpha_j+\delta_{i,t[j]}s_{ij})$.
- **Heterogeneous responsiveness:** The member-time parameter $\delta_{it}$ allows different loyalty across members and parties. Negative values represent systematic opposition to leaders conditional on the preference model, rather than assuming all party inducements are positive.
- **An interpretable reference point:** $100\Phi(\delta_{it})$ gives percentage-scale support for the leader at ideological indifference. Neutrality is 50, not zero. This is a conditional model quantity, not an observed agreement rate.
- **Identification and scope:** Party-specific speech variation fixes the loyalty dimension's loadings. No speech sets the modeled speech contribution to zero; it does not demonstrate the absence of agenda control or private party pressure. A useful loyalty estimate is not automatically a causal estimate of speech effects.

## Important Papers

- [[papers/measuring-party-loyalty|Measuring party loyalty]] (Ramey, 2026): estimates loyalty across the 101st-113th Congresses and compares its fit for Freedom Caucus membership, Boehner rebellion, and roll-call voting with alternative measures.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: jointly models latent actor characteristics and item parameters.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: models structured party dependence through group-specific thresholds.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes a policy axis from additional sources of patterned voting.
