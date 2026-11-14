---
title: "Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark"
type: paper
authors:
  - Will Lowe
  - Kenneth Benoit
year: 2012
tags:
  - text-as-data
  - latent-trait-scaling
  - political-methodology
  - human-validation
  - uncertainty-quantification
---

## TL;DR

This paper validates unsupervised text scaling by comparing a Poisson scaling model of political speeches with structured human judgments. In a corpus of 14 speeches from the 2010 Irish budget debate, the model largely recovers the human ordering of pro- versus anti-budget positions, but its standard uncertainty estimates are too narrow. Word-level nonparametric bootstrapping produces more conservative differences that are closer to human perceptions, while the model's one-dimensional representation misses Sinn Fein's distinct anti-establishment dimension.

## Research Question

Can human judgments of political texts provide a substantive benchmark for validating both the positional estimates and uncertainty estimates produced by an unsupervised text scaling model when no directly observed latent trait exists?

## Motivation

Latent political traits such as ideology and policy preference cannot be observed directly, and natural-language data do not have a known data-generating process that can be simulated realistically. The Poisson scaling model used in political text analysis therefore makes strong assumptions about dimensionality, conditional independence, and word-count distributions. The paper argues that validation should assess whether the estimated scale has semantic validity and whether its uncertainty supports conclusions that resemble judgments made from reading the original texts.

## Contributions

- Develops a validation design that compares unsupervised text scaling directly with experimentally elicited human placements and pairwise judgments.
- Separates two validation targets: the relative location of texts on a substantive dimension and the uncertainty attached to differences between locations.
- Shows that a strongly simplified Poisson model can produce substantively useful positions even when its linguistic assumptions are false.
- Demonstrates text-level nonparametric bootstrapping by resampling words before rebuilding the quantitative text representation, reducing reliance on unverifiable model assumptions.
- Identifies a substantive failure case in which a unidimensional scale does not capture Sinn Fein's simultaneous opposition to the budget and to the main establishment parties.

## Method

The statistical model represents the count of word $j$ in document $i$ as $C_{ij} \sim \mathrm{Poisson}(\lambda_{ij})$, with $\log \lambda_{ij} = \alpha_i + \psi_j + \theta_i\beta_j$. Word parameters, document-level terms, and speaker positions are estimated by alternating conditional maximum likelihood. The paper examines the model's assumptions of a single relevant dimension, conditional independence of word counts, and Poisson variance equal to the mean.

The corpus contains 14 speeches from the Irish Dail's December 2009 debate over the 2010 budget: 49,019 tokens and 4,840 word types. The speeches represent Fianna Fail, Green, Fine Gael, Labour, and Sinn Fein positions. Nineteen readers completed an 84-page booklet exercise. They compared selected pairs of speeches, rated confidence in perceived differences from 1 to 10, and placed each speech on a 0--100 scale from complete budget support to complete opposition, with the two Fianna Fail speeches fixed at the pro-budget endpoint. A Bradley--Terry model checks the consistency between direct placements and pairwise judgments.

For uncertainty, the paper compares asymptotic maximum-likelihood intervals, parametric bootstrap intervals, and a word-level nonparametric bootstrap. The latter resamples constituent words to reconstruct speech-level count data before refitting the scaling model, and compares the resulting pairwise intervals with human judgments.

## Experiments

Human readers separate the governing Fianna Fail and Green speakers from the opposition parties and generally cluster speakers within parties. They place Sinn Fein as the most anti-budget group. The Poisson scaling results closely reproduce the government--opposition divide and the broad party ordering, but differ in several within-party comparisons. In particular, the model places Sinn Fein in a middle opposition position, whereas readers view its two speeches as the most anti-budget.

The paper interprets the Sinn Fein result as evidence of a second dimension: opposition to both the budget and the establishment alternatives represented by Fine Gael and Labour. That dimension is interwoven with the budget discussion, so trimming supposedly irrelevant text does not provide a simple or general fix.

Across 25 pairwise comparisons, human direct judgments classify 19 pairs as different and human scale placements classify 15 as different. The analytical Poisson intervals and parametric bootstrap each classify 24 as different, while the word-level nonparametric bootstrap classifies 16 as different. The results therefore suggest that point estimates can be useful even under model misspecification, while conventional uncertainty estimates can be substantially overconfident.

## Limitations

The validation corpus is small, restricted to one Irish parliamentary debate, and selected because its topic plausibly emphasizes one dimension. The human benchmark is itself based on reader interpretation, fixed endpoint anchors, aggregation across readers, and only 25 of the possible speech pairs. The study does not establish a ground-truth latent position, and its bootstrap comparison uses 100 replicates. A one-dimensional model may also conflate policy position with topic, framing, party identity, or other correlated dimensions that are not explicitly modeled.

## Related Concepts

- [[Text Scaling Models]]
- Semantic validity
- Unsupervised text analysis
- Human judgment benchmarking
- Nonparametric bootstrap

## Related Papers

- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts."
- Laver, Benoit, and Garry (2003), "Estimating the policy positions of political actors using words as data."
- Grimmer and King (2011), "General purpose computer-assisted clustering and conceptualization."
- Grimmer and Stewart (Forthcoming), "Text as Data: The Promise and Pitfalls of Automatic Content Analysis Methods for Political Texts."
- Benoit, Laver, and Mikhaylov (2009), "Treating Words as Data with Error: Uncertainty in Text Statements of Policy Positions."
