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
- The [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]] jointly learns latent topics and ideological changes in word choice within them. It accommodates mixed-topic documents without debate labels, but all topics share one scalar author position. Its documented sentiment failure shows why mentioning a policy need not imply support for it.
- Identification requires a substantive interpretation of the dimension and a normalization or anchor. A statistically separated scale is not automatically a semantically valid measure of the intended political trait.
- Unidimensionality is consequential. Topic, framing, party identity, and other correlated forms of textual variation can be represented as position when the model has only one latent axis.
- Bag-of-words representations simplify lexical dependence, collocations, document structure, over- or under-dispersion, and structural zeros. These assumptions may still yield useful rankings, but they can make standard errors too small.
- Human placements, pairwise judgments, and bootstrap procedures provide complementary checks. Word-level or block-level resampling can relax reliance on a fully specified text-generating model while preserving different amounts of textual structure.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] asks an instruction-tuned LLM for a numerical position on a named dimension without task-specific training. Its measurement choices include scale endpoints, contextual instructions, abstention, and aggregation across chunks or texts.
- Agreement and coverage are separate validation targets when a model can abstain. Pooled correlations may conceal weaker within-party agreement, and models scoring different subsets are not evaluated on an identical population.
- Method selection should match the political construct, actor population, language, and text genre as well as resources. The review's qualitative compute ordering includes training and inference together and does not establish the marginal cost of using a pretrained model.
- Algorithm disagreement is a useful diagnostic, but it can reflect different preprocessing, anchors, dimensions, or aggregation rules. Cross-method benchmarks need shared data and external validation alongside method-specific diagnostics; topic coherence and PCA explained variance are not interchangeable metrics.
- Parallel translations provide a check on language sensitivity while holding speech content approximately fixed. In Proksch and Slapin's European Parliament application, Wordfish positions correlate at least 0.86 across English, French, and German, yet native German-speaking parties cluster differently in the German scale. High overall agreement can therefore coexist with localized translation effects.
- The political meaning of a speech scale need not match that of a voting scale. In the same application, integration positions and national redistribution-related differences explain speech positions more consistently than broad left-right ideology. Institutional constraints and agenda coverage are part of the measurement context, not merely alternative sources of the same latent score.
- SemScale separates representation from scaling: cosine similarities between TF-IDF-weighted word-embedding averages define a document graph, the least similar pair supplies endpoints, and harmonic function label propagation assigns other positions. Fixed texts and embeddings produce repeatable scores, but the axis still needs substantive validation.
- Semantic representation and the scaling algorithm can both contribute. In Nanni et al.'s European Parliament experiments, graph scaling with sparse TF-IDF improves over Wordfish, and averaged word embeddings improve further. The advantage does not transfer uniformly: default SemScale loses to Wordfish on manifesto RILE scaling, while Party2Vec helps in the single-election setting. Topic similarity and temporal semantic drift remain potential confounds.
- Supervised label aggregation can recover a document-level scale even when fine-grained statement labels are noisy, provided many errors remain within the same scale pole. Nikolaev, Ceron, and Padó find this pattern when aggregating predicted Manifesto Project categories into RILE scores across 41 countries and 27 languages.
- Long-context access does not by itself remove the measurement problem. Direct BigBird and Longformer estimates avoid gold statement boundaries but underperform label aggregation and compress positions toward the center, especially in cross-country transfer. Rank agreement should therefore be checked alongside score dispersion, extreme-class recall, and absolute error.

## Important Papers

- [[papers/political-text-scaling-meets-computational-semantics|Political Text Scaling Meets Computational Semantics]]: introduces SemScale and its two-reference SemScores extension, testing representation, graph algorithms, linguistic filtering, and transfer from parliamentary speeches to manifestos.
- [[papers/multilingual-estimation-of-political-party-positioning|Multilingual estimation of political-party positioning: From label aggregation to long-input Transformers]]: compares multilingual statement-label aggregation with BigBird and Longformer under held-out-country and future-election transfer.
- [[papers/position-taking-in-european-parliament-speeches|Position Taking in European Parliament Speeches]]: scales speeches from the 1999-2004 European Parliament, compares three translations and two aggregation levels, and validates the extracted axis against integration, left-right, and national predictors.
- [[papers/text-based-ideal-points|Text-Based Ideal Points]]: introduces unsupervised topic-based author scaling and reports stronger agreement with voting estimates than the tested Wordfish and Wordshoal baselines on Senate corpora.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: synthesizes 25 contributions using a four-family typology and a generate-capture-aggregate framework; proposes systematic benchmarking without conducting it.
- [[Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: validates direct LLM scores against expert placements, crowdsourced judgments, and roll-call estimates across four political-text settings.
- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts."
- Laver, Benoit, and Garry (2003), "Estimating the policy positions of political actors using words as data."
- Benoit, Laver, and Mikhaylov (2009), "Treating Words as Data with Error: Uncertainty in Text Statements of Policy Positions."

## Related Concepts

- [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
- Text as data
- Latent trait estimation
- Quantitative content analysis
- Topic modeling
- Bootstrap resampling
