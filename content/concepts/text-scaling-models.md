---
title: Text Scaling Models
type: concept
aliases:
  - Text Scaling
  - Wordfish
tags:
  - text-as-data
  - latent-trait-estimation
  - political-methodology
  - quantitative-text-analysis
---

## Overview

Text scaling models estimate the relative position of documents or speakers along a latent dimension from word-use patterns. In political methodology, they are used to infer quantities such as ideological or policy positions from speeches, manifestos, and other texts without requiring hand-labeled positions for every document.

## Key Ideas

- A common Poisson scaling formulation models each document--word count as a Poisson variable whose log rate combines document length, word-specific baseline frequency, and the document's latent position multiplied by a word-specific discrimination parameter.
- Identification requires a substantive interpretation of the dimension and a normalization or anchor. A statistically separated scale is not automatically a semantically valid measure of the intended political trait.
- Unidimensionality is consequential. Topic, framing, party identity, and other correlated forms of textual variation can be represented as position when the model has only one latent axis.
- Bag-of-words representations simplify lexical dependence, collocations, document structure, over- or under-dispersion, and structural zeros. These assumptions may still yield useful rankings, but they can make standard errors too small.
- Human placements, pairwise judgments, and bootstrap procedures provide complementary checks. Word-level or block-level resampling can relax reliance on a fully specified text-generating model while preserving different amounts of textual structure.

## Important Papers

- [[Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]
- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts."
- Laver, Benoit, and Garry (2003), "Estimating the policy positions of political actors using words as data."
- Benoit, Laver, and Mikhaylov (2009), "Treating Words as Data with Error: Uncertainty in Text Statements of Policy Positions."

## Related Concepts

- Text as data
- Latent trait estimation
- Quantitative content analysis
- Topic modeling
- Bootstrap resampling
