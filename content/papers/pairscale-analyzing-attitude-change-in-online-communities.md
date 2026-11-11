---
title: "PAIRSCALE: Analyzing Attitude Change in Online Communities"
type: paper
authors:
  - Rupak Sarkar
  - Patrick Y. Wu
  - Kristina Miler
  - Alexander Hoyle
  - Philip Resnik
year: null
tags:
  - text-as-data
  - attitude-measurement
  - pairwise-comparisons
  - political-methodology
---

## TL;DR

PAIRSCALE extracts explicit and implicit issue-specific attitudes from contextualized Reddit comments, compares those expressions with an LLM, and fits a continuous relative scale. Its abortion and immigration analyses reveal variation within political communities that categorical stance labels obscure. Human validation supports the extraction and comparison steps, with moderate agreement and meaningful residual uncertainty.

## Research Question

Can contextualized attitude expressions support continuous measurement of community discourse, including changes in the relative position and prevalence of specific beliefs over time?

## Motivation

Pro/neutral/against labels compress differences within communities that largely agree on an issue. Comments also convey beliefs implicitly through context. Extracting short propositions makes these beliefs available for comparison and allows a fixed expression to be located relative to discourse from different periods.

## Contributions

- Combines contextual inferential decomposition with [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]] of LLM comparisons.
- Validates extracted propositions and induced comment comparisons against human judgments.
- Demonstrates retroactive “surveys,” attitude-prevalence tracking, and comparisons between r/Conservative and r/democrats.

## Method

A 100-topic LDA model identifies issue-relevant threads, using temporally balanced training data from 2014–2022. The substantive analysis is described as covering 2015–2022. Each six-month slice supplies 300 topical comments; eligible comments have at least five upvotes and ten tokens. Top-level comments and their immediate replies retain preceding conversational context.

An LLM extracts short issue-specific propositions, including implied beliefs. The appendix identifies Llama-3.1-70B-Instruct for decomposition. Prompts allow insufficient-context and off-topic responses. Pairwise judgments choose which expression is more opposed to the issue, or return a tie or non-comparability. Sampling continues until each expression participates in at least 50 comparisons; after removing non-comparable pairs, expressions with fewer than ten comparisons are dropped. Bradley-Terry fitting uses choix with regularization α = 0.1. Higher scores indicate stronger opposition under the specified comparison construct, relative to the analyzed items.

Retroactive surveys compare a supplied, survey-inspired proposition with historical expressions and report its percentile position relative to each period’s median. Prevalence is a different quantity: the proportion of extracted attitude embeddings exceeding cosine similarity 0.75 to a target expression.

## Experiments

| Validation | Reported evidence |
| --- | --- |
| Extraction: 150 decompositions from 50 held-out comments, 23 crowdworkers | 79% definitely/probably reasonable; 12% ambiguous; 6% probably unreasonable; 3% unreasonable |
| Implicit content | 38% judged implicit, 33% explicit, remainder tied votes |
| Pairwise validation: 150 abortion comment pairs, 43 annotators | Restricted comparison with Wu et al. (2024) retains 77 pairs with a majority and no human non-comparability judgment |
| Agreement on those 77 pairs | Macro-F1 0.55 versus 0.50 for the comment-level baseline; Krippendorff’s α 0.53 versus 0.61; human inter-rater α 0.38 |

Thus the decomposition method improves macro-F1 in this comparison but does not improve every agreement metric. Comment-level outcomes are induced by majority wins across all cross-comment expression pairs, treating equal wins and model non-comparability as ties.

The authors report stronger anti-abortion discourse toward late 2019 and moderation in 2022, including opposition to a federal ban and support for state control. Immigration scores are comparatively stable except for an increase in 2020. Retroactive comparisons place some previously extreme anti-abortion expressions closer to the community median by 2020. Prevalence analyses trace border-wall narratives and declining expression of a false Planned Parenthood allegation. These are descriptive discourse patterns, not causal estimates of political events’ effects.

Appendix A.6 reports stable score trends over four comment samples; Figure 4 uses ranges over five samples for prevalence. A dynamic topic model also recovers terms associated with the Planned Parenthood narrative, but does not supply attitude polarity scores.

## Limitations

- LLM extraction can sanitize or omit extreme beliefs, and comparison judgments can reflect model bias. Human validation is limited, particularly for generalization beyond abortion comparisons.
- Upvote, topic, length, and thread-depth filters define a selected discourse sample. Scores describe this community’s expressed attitudes, not representative public opinion or individual belief change.
- Membership turnover contributes to changing community distributions. Existing users show stronger anti-abortion attitudes than new users, without the same clear pattern for immigration.
- Relative percentile position is not a survey endorsement percentage. Declining expression prevalence can reflect either reduced salience or beliefs becoming taken for granted.
- The supplied text inconsistently mentions 19 six-month periods alongside a 2015–2022 analysis window and 2014–2022 topic-model corpus. Publication year and stable paper identifiers are not established in the supplied Markdown and are left unspecified.

## Related Concepts

- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: aggregates pairwise attitude judgments into relative scores.
- [[concepts/text-scaling-models|Text Scaling Models]]: broader family of textual latent-position estimators.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: an alternative that requests numerical positions directly.

## Related Papers

- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: complementary comparison of pointwise and pairwise scalar measurement and human-reference uncertainty.
- Hoyle et al. (2023), “Natural language decompositions of implicit content enable better text representations”: supplies the decomposition approach adapted here to issue-specific conversational context.
- Wu et al. (2024), “Concept-guided chain-of-thought prompting for pairwise comparison scoring of texts with large language models”: supplies the comparison-based predecessor and comment-level baseline.

[[index|Library home]]
