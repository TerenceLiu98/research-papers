---
title: Text-Based Ideal Point Model
type: concept
aliases:
  - TBIP
tags:
  - text-as-data
  - ideal-point-estimation
  - topic-modeling
  - variational-inference
---

## Overview

The text-based ideal point model (TBIP) estimates political positions from authored text by jointly learning topics and how word choice within each topic varies with the author's position. It is an unsupervised member of [[concepts/text-scaling-models|Text Scaling Models]]: word counts and author identities are observed, while votes, party labels, and debate labels are unnecessary for fitting.

## Key Ideas

- **Topics and framing are distinct components.** Positive document-topic intensities $\theta_{dk}$ and neutral topic-word intensities $\beta_{kv}$ combine with real-valued author positions $x_s$ and ideological word adjustments $\eta_{kv}$. The Poisson rate is $\lambda_{dv}=w_{a_d}\sum_k\theta_{dk}\beta_{kv}\exp(x_{a_d}\eta_{kv})$, where $w_s$ adjusts for author verbosity.
- **The ideological interaction changes word usage within topics.** Equal signs of $x_s$ and $\eta_{kv}$ increase a term's rate contribution, opposite signs decrease it, and zero adjustments recover neutral Poisson factorization. Documents can mix issues without being assigned to a single observed debate.
- **Many topics still share one author axis.** Topic-specific word adjustments do not constitute separate issue-specific ideal points. Simultaneously reversing the signs of all positions and ideological adjustments leaves the rates unchanged, so substantive interpretation of the poles requires external context.
- **Inference is approximate and unamortized.** The original method fits lognormal factors for positive variables and Gaussian factors for real variables with reparameterized stochastic variational inference, initialized by Poisson factorization.
- **Length can confound interpretation.** The author's mean document length, divided by the mean across authors, provides the observed multiplicative weight $w_s$. Vocabulary filtering and transformations of long-document counts also affect the fitted representation.
- **Diagnostics are descriptive.** Comparing a document's log likelihood under the fitted position and a neutral or extreme alternative helps identify text associated with a placement. Holding other fitted quantities fixed does not establish causal influence.
- **Lexical association is not stance understanding.** Criticism and endorsement can share terms. The original paper's Sessions example shows a critical DACA speech moving a conservative author's estimate toward the center because the model associates DACA vocabulary with liberals.
- **Validation requires more than party separation.** Agreement with voting estimates supports convergence between measures in a particular corpus, but does not make either measure ground truth or establish within-party accuracy. A candidate application without common votes requires other substantive checks.

## Important Papers

- [[papers/text-based-ideal-points|Text-Based Ideal Points]]: introduces TBIP, evaluates Senate speech and tweet positions against voting estimates, and applies the model to presidential candidates.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: places TBIP within topic-based political measurement and distinguishes representation, construct-relevant variation, and aggregation.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: the broader measurement family, including Wordfish and other approaches.
- [[concepts/item-response-theory|Item Response Theory]]: analogous interaction between a latent position and a discrimination parameter.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the number of independent political axes, which is distinct from the number of topics.
