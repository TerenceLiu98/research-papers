---
title: Issue-Adjusted Ideal Points
type: concept
aliases:
  - Issue-Adjusted Ideal Point Model
tags:
  - ideal-point-estimation
  - legislative-behavior
  - topic-models
---

## Overview

Issue-adjusted ideal points represent a political actor with a general latent position plus deviations associated with named policy issues. Bill content determines how those deviations combine for each vote. The model can expose systematic departures from an overall ideological ordering while retaining a common baseline scale.

## Key Ideas

- **Content-dependent positions:** If a bill has topic mixture $\bar{\boldsymbol\theta}_d$, legislator $u$ has effective position $x_u+\mathbf z_u^\top\bar{\boldsymbol\theta}_d$. With a single active topic $k$, this becomes $x_u+z_{uk}$.
- **A logistic voting model:** A bill's polarity $a_d$ and popularity $b_d$ map the effective position into $\Pr(v_{ud}=\mathrm{yes})=\sigma(a_d[x_u+\mathbf z_u^\top\bar{\boldsymbol\theta}_d]+b_d)$. A positive issue offset is movement on the fitted latent scale, not unconditional support for bills carrying that issue, because polarity also matters.
- **Shrinkage toward the baseline:** Laplace priors discourage large or widespread issue deviations. Zero offsets recover the standard one-dimensional model; Bayesian shrinkage need not produce exact zeros.
- **Named issues aid interpretation:** Gerrish and Blei use labeled topics derived from Congressional Research Service subject codes. These provide a substantive vocabulary for offsets, but do not independently validate them as actors' sincere preferences.
- **Two-stage uncertainty:** Estimating topic mixtures first and holding them fixed makes inference simpler but leaves text-representation uncertainty outside the voting posterior.
- **Prediction targets differ:** Filling in missing votes requires some observed votes to estimate each bill's polarity and popularity. Predicting votes on wholly unseen bills requires an additional mechanism for estimating those parameters from available information.
- **Evaluation should separate fit and interpretation:** Held-out votes assess prediction; shuffling topic-to-bill assignments probes the relevance of content matching. Training improvements and illustrative legislators serve a different, exploratory purpose. Diffuse topic mixtures can reduce fit for individual bills.

## Important Papers

- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: introduces topic-weighted legislative offsets, variational inference, and an evaluation across six U.S. Congresses, with modest aggregate predictive gains and individual examples of issue-dependent voting.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: supplies the latent respondent-item voting model extended by issue offsets.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: motivates examining whether the same actor ordering holds across policy areas; counting named offsets is not an estimate of effective ideological dimension.
- [[concepts/text-scaling-models|Text Scaling Models]]: also connect political text and latent positions; here bill text codes issues while roll-call behavior estimates legislators' positions.
