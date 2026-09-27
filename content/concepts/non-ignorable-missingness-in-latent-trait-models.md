---
title: Non-Ignorable Missingness in Latent Trait Models
type: concept
tags:
  - missing-data
  - latent-trait-estimation
  - selection-models
  - political-methodology
---

## Overview

Nonresponse is non-ignorable for latent-trait measurement when the observation process carries information about the unobserved trait that the analysis cannot simply discard. A legislator's absence, for example, may depend on ideological position relative to a particular vote. Modeling only recorded responses can then change the apparent positions of selectively observed actors.

## Key Ideas

- **Joint likelihood:** In the hurdle formulation used by idealstan, missing responses contribute a nonresponse probability. Observed responses contribute the probability of participation multiplied by the conditional likelihood of the recorded answer.
- **Shared trait, separate item parameters:** The response and nonresponse components share an ideal point but have distinct discrimination and difficulty parameters. The selection component can therefore associate absence with either pole of the measured dimension.
- **Item-specific baseline:** When a missingness discrimination parameter is zero, nonresponse is independent of the ideal point conditional on that item. Its intercept can still represent a high or low overall absence rate.
- **Interpretation depends on orientation:** If higher ideal points mean more conservative positions, positive discrimination in a model of nonresponse associates higher positions with greater absence on that item. Reversing the scale reverses the interpretation of the sign.
- **Association is not motive:** A fitted association can be compatible with strategic abstention, but it does not establish why an actor was absent. Political incentives need separate substantive evidence.
- **Adjustment has assumptions:** Joint estimation can correct selection represented by the model. It does not identify arbitrary nonresponse processes or eliminate the need for anchors, sufficient observations, and sensitivity to specification. Dynamic applications also depend on the temporal prior.

## Important Papers

- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: integrates a shared-trait selection hurdle with multiple temporal processes and response distributions; studies recovery under simulated missingness and changes in legislative trajectories.
- Rosas, Shomer, and Haptonstahl (2015), "No News Is News: Nonignorable Nonresponse in Roll-Call Data Analysis": cited by Kubinec as a legislative model that treats nonresponse as informative behavior.
- Holman and Glas (2005), "Modelling Non-Ignorable Missing-Data Mechanisms with Item Response Theory Models": cited by Kubinec as an alternative linking response and missingness traits through a joint distribution.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]
- [[concepts/text-scaling-models|Text Scaling Models]]: selective production or observation of text raises a related measurement concern, though it does not by itself specify an appropriate selection model.
