---
title: News-Sharing-Based Ideology Estimation
type: concept
aliases:
  - News-Sharing Ideology
  - Media Scores
definition: "News-sharing-based ideology estimation infers common-scale positions for actors and news outlets from patterns of shared news links under an ideological-proximity assumption."
tags:
  - ideology-estimation
  - political-communication
---

## Overview

News-sharing-based ideology estimation uses the distribution of links shared by actors to locate both actors and news outlets in a common latent political space. It measures ideological patterns in communication, potentially combining personal preferences, strategic presentation, and exposure.

## Key Ideas

- A user-by-outlet count matrix provides equivalent behavioral observations for citizens and politicians.
- A spatial count model separates sharing activity and outlet popularity from ideological proximity. Negative-binomial dispersion accommodates differences in how informative outlets are.
- Hierarchical pooling stabilizes sparse estimates, but group-specific priors introduce information that should be distinguished from the sharing data themselves.
- Outlet scores describe how outlets are used by sharers; they do not directly score every article's content.
- Common-scale placement does not make selected news sharers representative of all citizens. Validation should examine within-party variation as well as aggregate agreement.
- URLs offer a transferable data format, while cross-platform validity still requires evidence.

## Important Papers

- [[papers/news-sharing-on-social-media-mapping-the-ideology-of-news-media-politicians-and-the-mass-public|News Sharing on Social Media: Mapping the Ideology of News Media, Politicians, and the Mass Public]]: develops a Bayesian negative-binomial spatial model and validates media scores using congressional votes and survey-linked Twitter users.

## Related Concepts

- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: the existing follower-network formulation measures audience choices; sharing-based estimation observes elites' own communication alongside citizen behavior.
