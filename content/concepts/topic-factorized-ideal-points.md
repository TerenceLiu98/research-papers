---
title: Topic-Factorized Ideal Points
type: concept
aliases:
  - TF-IPM
  - Topic-Factorized Ideal Point Model
tags:
  - ideal-point-estimation
  - legislative-behavior
  - topic-models
---

## Overview

Topic-factorized ideal points connect a multidimensional voting model to topics learned from bill text. Each legislator and bill has topic-specific parameters, and a bill's topic mixture weights their interactions. Joint estimation lets observed votes influence the topic representation as well as the latent positions.

## Key Ideas

- **Topic-weighted interaction:** The yes-vote probability is $\operatorname{logistic}(\sum_k\theta_{dk}x_{uk}a_{dk}+b_d)$. Topic proportions determine how much each legislator-bill interaction contributes; topic membership alone does not determine support.
- **Joint text and behavior modeling:** A word-mixture likelihood and a voting likelihood share bill topic proportions. Their relative weight determines how strongly textual coherence and vote prediction influence the representation.
- **Separate topic coefficients:** Unlike a general position plus issue offsets multiplied by one bill polarity, this model gives each bill a separate coefficient for each topic. It therefore changes both the voting structure and the treatment of topic estimation.
- **Regularization and interpretation:** L2 penalties control the magnitude of legislator and bill parameters. Text supplies semantic labels, but labels do not remove all identification ambiguities. Simultaneously reversing legislator and bill signs within a topic preserves the vote probability and penalty.
- **Prediction targets:** Predicting missing votes on observed bills uses bill parameters fitted from other votes. Predicting votes for wholly unseen bills additionally requires a mapping from available text to those parameters.
- **Validation boundaries:** Predictive accuracy, topic coherence, and validity as a measure of ideology are distinct questions. Qualitative examples cannot by themselves establish sincere policy preferences or longitudinal change.

## Important Papers

- [[papers/topic-factorized-ideal-point-estimation-model-for-legislative-voting-network|Topic-Factorized Ideal Point Estimation Model for Legislative Voting Network]]: introduces joint topic and vote estimation with alternating optimization, evaluates congressional roll calls, and demonstrates a text-based unseen-bill extension.

## Related Concepts

- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: uses topic-weighted departures from a global legislator position with pre-estimated bill topics.
- [[concepts/item-response-theory|Item Response Theory]]: the actor-item latent response framework underlying the voting component.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: concerns the substantive number and dependence of political dimensions; the chosen topic count does not establish either.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: distinguishes predictive equivalence from uniquely interpretable latent parameters.
