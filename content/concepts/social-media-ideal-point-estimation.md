---
title: Social-Media Ideal-Point Estimation
type: concept
aliases:
  - Follower-Network Ideal Points
  - Spatial Following Model
tags:
  - ideal-point-estimation
  - social-network-analysis
  - political-methodology
---

## Overview

Social-media ideal-point estimation infers latent political positions from connections between ordinary users and political elites. Its motivating assumption is that politically engaged users are more likely to follow elites whom they perceive as ideologically close. This provides a measure based on audience choices that can be useful when legislative votes are constrained by party discipline or when actors lack a common voting record.

## Key Ideas

- **Observed ties encode a measurement hypothesis.** A directed bipartite matrix records whether each user follows each elite. Similar audiences can indicate ideological proximity, but following alone does not establish agreement or reveal a person's true preferences.
- **Popularity and activity differ from position.** In the spatial-following model, $\Pr(Y_{ij}=1)=\operatorname{logit}^{-1}(\alpha_j+\beta_i-\gamma\lVert\Theta_i-\Phi_j\rVert^2)$. Elite popularity and user political interest have separate terms from ideological distance.
- **Bayesian estimation and correspondence analysis are distinct procedures.** The original spatial-following model estimates latent positions probabilistically. CA offers a computationally cheaper way to scale a large follower matrix; invoking the spatial model as motivation does not mean its parameters or posterior uncertainty have been estimated.
- **The leading axis needs substantive validation.** Regional identity or other shared affinities may dominate audience overlap. In the British MP application, nationalist-party MPs are excluded while constructing the CA space and subsequently projected onto it as supplementary points. This preserves the chosen space but does not independently validate those projected positions.
- **Filtering defines the measured audience.** Activity thresholds and minimum numbers of followed elites can improve informativeness and reduce computational burden. They also select a particular population. The British study uses 424,297 users following at least ten MPs, not a representative sample of voters.
- **Pooled and within-party validity are different.** Strong cross-party agreement can coexist with weak ordering inside parties. The British study separately reports expert-placement regression fit and Conservative and Labour correlations; the latter each use only 13 MPs.
- **Applications remain conditional on the measurement design.** An association between inferred positions and endorsements supports substantive usefulness in that setting. It does not prove that ideology caused endorsement, that the scale transfers across platforms, or that its uncertainty is calibrated.

## Important Papers

- [[papers/estimating-ideal-points-of-british-mps-through-their-social-media-followership|Estimating Ideal Points of British MPs Through Their Social Media Followership]]: applies CA to 591 MPs, handles regional clustering through supplementary projection, validates a subset with experts, and examines leadership endorsements.
- Barbera (2015), "Birds of the same feather tweet together: Bayesian ideal point estimation using Twitter data": spatial-following foundation cited by the British application, DOI `10.1093/pan/mpu011`.
- Barbera et al. (2015), "Tweeting from left to right: Is online political communication more than an echo chamber?": CA-based antecedent cited by that application, DOI `10.1177/0956797615594620`.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: representing audience relationships as directed edges.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: deciding whether network dimensions represent the intended political construct.
- [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]]: estimates positions from what actors write, providing a different measurement channel from who follows them.
