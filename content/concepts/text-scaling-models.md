---
title: Text Scaling Models
type: concept
aliases:
  - Text Scaling
  - Wordfish
  - Computational Text-Based Ideal Point Estimation
  - CT-IPE
tags:
  - text-as-data
  - latent-trait-estimation
  - political-methodology
  - quantitative-text-analysis
---

## Overview

Text scaling models estimate the relative position of documents or speakers along a latent dimension from textual content. In political methodology, they are used to infer quantities such as ideological or policy positions from speeches, manifestos, and other texts without requiring hand-labeled positions for every document. Approaches include word-frequency models, topic-based latent-variable models, embedding-based scaling, and prompt-based language models.

## Key Ideas

- Parschan and Jakob distinguish three measurement decisions: generating numerical textual variation, capturing the variation relevant to a construct, and aggregating it into positions. These are conceptual roles that may be jointly estimated rather than separate software stages.
- Their four families differ in what is used to estimate positions: word counts, topic structure, semantic vectors, or prompted LLM judgments. An embedding-based topic model still belongs to the topic family when topics mediate position estimation; classification depends on the whole pipeline.
- A common Poisson scaling formulation models each document--word count as a Poisson variable whose log rate combines document length, word-specific baseline frequency, and the document's latent position multiplied by a word-specific discrimination parameter.
- Identification requires a substantive interpretation of the dimension and a normalization or anchor. A statistically separated scale is not automatically a semantically valid measure of the intended political trait.
- Unidimensionality is consequential. Topic, framing, party identity, and other correlated forms of textual variation can be represented as position when the model has only one latent axis.
- Bag-of-words representations simplify lexical dependence, collocations, document structure, over- or under-dispersion, and structural zeros. These assumptions may still yield useful rankings, but they can make standard errors too small.
- Human placements, pairwise judgments, and bootstrap procedures provide complementary checks. Word-level or block-level resampling can relax reliance on a fully specified text-generating model while preserving different amounts of textual structure.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] asks an instruction-tuned LLM for a numerical position on a named dimension without task-specific training. Its measurement choices include scale endpoints, contextual instructions, abstention, and aggregation across chunks or texts.
- Agreement and coverage are separate validation targets when a model can abstain. Pooled correlations may conceal weaker within-party agreement, and models scoring different subsets are not evaluated on an identical population.
- Method selection should match the political construct, actor population, language, and text genre as well as resources. The review's qualitative compute ordering includes training and inference together and does not establish the marginal cost of using a pretrained model.
- Algorithm disagreement is a useful diagnostic, but it can reflect different preprocessing, anchors, dimensions, or aggregation rules. Cross-method benchmarks need shared data and external validation alongside method-specific diagnostics; topic coherence and PCA explained variance are not interchangeable metrics.

## Important Papers

- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: synthesizes 25 contributions using a four-family typology and a generate-capture-aggregate framework; proposes systematic benchmarking without conducting it.
- [[Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: validates direct LLM scores against expert placements, crowdsourced judgments, and roll-call estimates across four political-text settings.
- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts."
- Laver, Benoit, and Garry (2003), "Estimating the policy positions of political actors using words as data."
- Benoit, Laver, and Mikhaylov (2009), "Treating Words as Data with Error: Uncertainty in Text Statements of Policy Positions."

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
- Text as data
- Latent trait estimation
- Quantitative content analysis
- Topic modeling
- Bootstrap resampling
