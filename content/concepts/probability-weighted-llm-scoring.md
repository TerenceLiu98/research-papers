---
title: Probability-Weighted LLM Scoring
type: concept
aliases:
  - Token-Probability-Weighted Scoring
tags:
  - large-language-models
  - scalar-measurement
  - text-as-data
---

## Overview

Probability-weighted LLM scoring estimates a scalar judgment by averaging the numeric values of allowed response tokens under the model's conditional distribution. It extends [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] by retaining uncertainty across score options instead of using only the most probable answer.

## Key Ideas

- **Condition on the scale.** For score tokens $\mathcal{S}$ and numeric mapping $n(s)$, use $\hat{s}=\sum_{s\in\mathcal{S}}n(s)P(s\mid c)/\sum_{s\in\mathcal{S}}P(s\mid c)$. Normalization excludes probability assigned to outputs outside the allowed scale.
- **Separate two forms of averaging.** Averaging candidate score probabilities for one text differs from averaging sentence scores into a document score. They address different measurement decisions and can be combined.
- **Smoothing is conditional.** A diffuse distribution can yield intermediate values, reducing heaping on a few integers. If nearly all mass falls on one token, weighting changes little; it does not by itself calibrate the score.
- **Assess ranking and magnitude separately.** Licht et al. find strong rank correlations alongside substantial RMSE differences. A scoring method suitable for ordering texts may still distort relative distances.
- **Retain access and implementation details.** The method requires probabilities for the relevant response tokens, plus an explicit scale and token-to-number mapping. Evidence for a 1-9 response scale does not establish equivalent behavior for arbitrary numeric formats.
- **Compare with an appropriate baseline.** On the three datasets in Licht et al., weighted pointwise prompting is competitive with or better than pairwise prompting for ranking, but pairwise methods can yield smaller numerical error. Human-annotation preferences between these methods do not settle the LLM comparison.

## Important Papers

- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: evaluates score-token averaging against pairwise prompting and fine-tuning, exposing persistent heaping and metric-dependent conclusions.
- Wang, Zhang, and Choi (2025), "Improving LLM-as-a-Judge Inference with the Judgment Distribution": cited by Licht et al. as the methodological basis for probability-weighted judgments.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]
