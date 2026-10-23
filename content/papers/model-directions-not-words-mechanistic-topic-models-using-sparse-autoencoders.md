---
title: "Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders"
type: paper
authors:
  - Carolina Zheng
  - Nicolas Beltran-Velez
  - Sweta Karlekar
  - Claudia Shi
  - Achille Nazaret
  - Asif Mallik
  - Amir Feder
  - David M. Blei
year: 2025
tags:
  - topic-modeling
  - sparse-autoencoders
  - mechanistic-interpretability
  - model-steering
  - llm-evaluation
---

## TL;DR

This paper introduces [[Mechanistic Topic Models]] (MTMs), which replace the word vocabulary of conventional topic models with interpretable features extracted from language-model activations by [[Sparse Autoencoders|sparse autoencoders]]. Mechanistic versions of LDA, ETM, and BERTopic recover semantically abstract topics, are preferred to word-based alternatives by an LLM topic judge on most tested conditions, and turn learned topic-feature weights into steering vectors for controlled text generation.

## Research Question

Can topic models built over sparse-autoencoder features capture contextual and abstract themes that word lists miss, while preserving interpretable document-topic structure and enabling topic-level control of language-model generation?

## Motivation

Traditional topic models discover useful corpus structure, but bag-of-words representations discard context and topic word lists struggle to express tone, style, and abstract semantic relationships. Neural topic models can use pretrained embeddings, yet many still reconstruct word counts or ultimately describe topics with weighted words.

Sparse autoencoders provide an alternative vocabulary: sparse, automatically labeled directions in a language model's activation space. These features can encode concepts richer than lexical co-occurrence and can also be recombined into directions that intervene on generation. The paper uses this shared representation to connect corpus analysis with [[Model Steerability|model steering]].

## Contributions

- Defines MTMs as topic models over thresholded SAE feature counts and instantiates mechanistic LDA (mLDA), mechanistic ETM (mETM), and mechanistic BERTopic (mBERTopic).
- Introduces topic judge, a pairwise LLM evaluation that compares how well two models' top assigned topics describe a sampled document and aggregates judgments with a Bradley-Terry model into Elo scores.
- Evaluates five corpora spanning newsgroup posts, congressional bills, Wikipedia articles, emotion-labeled Reddit comments, and poetry, including short and abstract documents.
- Constructs topic steering vectors as weighted combinations of SAE decoder directions and evaluates their relevance, likelihood effects, and generation fluency.

## Method

Documents are passed through Gemma 2-9B and 16k-feature GemmaScope SAEs. The benchmark datasets use the layer-39 SAE, while GoEmotions and PoemSum use layer 10 because earlier-layer features provided more localized coverage for these corpora. For each token and feature, an activation counts only when it exceeds the 80th percentile of that feature's activation distribution on the SAE training data. The pipeline removes features whose descriptions concern programming, mathematics, grammar, formatting, or stop words; features active in more than 1% of the SAE training data; and features present in more than 90% of corpus documents. An LLM refinement step discards up to two apparently irrelevant or mislabeled features from each topic's top candidates, and the same refinement is applied to the word-based baselines.

The three MTM variants use the resulting feature counts differently:

- **mLDA** treats SAE features as the vocabulary in an LDA-style multinomial model.
- **mETM** represents each topic as an activation-space vector, maps it through the fixed SAE encoder to feature probabilities, and models feature counts with binomial likelihoods.
- **mBERTopic** forms a document embedding from the count-weighted average of SAE decoder directions, clusters those embeddings with UMAP and HDBSCAN, and derives topic-feature weights with class-based TF-IDF.

Topics are presented either as their highest-weight feature descriptions or as one-sentence LLM summaries. For control, the normalized weighted sum of a topic's SAE decoder directions becomes its steering vector. At inference time, the intervention removes the activation component parallel to that vector and replaces it with a user-scaled topic component.

Topic judge samples documents, retrieves one or two high-weight topics from each competing model, and asks GPT-4.1 which topic set better captures the document's general meaning. Pairwise outcomes are fitted with a [[concepts/bradley-terry-scaling|Bradley-Terry model]] and reported on an Elo scale. Coherence ratings, word or feature intrusion, topic diversity, and topical alignment provide complementary checks.

## Experiments

The evaluation covers 20 Newsgroups, Congressional Bills, Wikipedia, GoEmotions, and PoemSum. Models use 50 topics on PoemSum and 100 on the other corpora. Baselines are LDA, ETM, BERTopic, Dirichlet VAE, and FASTopic; hyperparameters are selected separately for each model-dataset pair with 25 rounds of Bayesian optimization on the product of NPMI coherence and topic diversity.

Topic judge performs 100 comparisons for every model pair, totaling 2,800 comparisons. An MTM attains the highest Elo score in four of the five datasets. With raw top-feature descriptions, word-based LDA leads on Bills, where precise lexical keywords are more document-specific than some SAE descriptions. With one-sentence summaries, an MTM equals or exceeds the word-based models on every dataset. The largest qualitative advantage appears on the short GoEmotions texts and abstract PoemSum poems.

On coherence ratings, intrusion accuracy, and topic diversity, MTMs are broadly comparable to word-based counterparts on 20NG, Bills, and Wiki and stronger on GoEmotions and PoemSum. Bills is an important exception for diversity: MTMs score roughly 0.4-0.5, versus 0.6-0.7 for the word models. Cross-model document-topic correlations show that more than 70% of mLDA topics on Bills and Wiki correlate at least 0.5 with an LDA topic, whereas nearly all GoEmotions and PoemSum topics fall below 0.5, suggesting that MTMs recover substantially different structure in the short and abstract corpora.

Steering is effective under the paper's evaluations. For mLDA, topic-relevance win rates range from 85.8% to 99.0% across the five datasets. Full topic vectors produce larger on-topic likelihood shifts than vectors made from only the top one, five, or ten features. mETM generally shows the same likelihood trend, while mBERTopic is inconsistent on this measure despite competitive judged generations. Perplexity remains close to the unsteered baseline at low steering strength but rises substantially as the intervention grows.

## Limitations

MTMs depend on the availability and quality of pretrained SAEs. Results can change with the language model, SAE training corpus, selected layer, and accuracy of automatically generated feature labels. Some spurious or broadly phrased features remain after filtering and refinement, and the approach can miss concepts that are not usefully represented by individual linear directions.

Featurization is heavier than bag-of-words preprocessing because it requires running an LLM and SAE over every token. Layer selection is dataset-dependent: the authors use later features for standard corpora and earlier features for emotion and poetry, based on observed feature coverage rather than a general selection rule.

The evaluation also has scope limits. Topic judge assumes that GPT-4.1 is a reliable assessor of relative topic quality, and the supplied version reports no human validation of that assumption. NPMI cannot be compared directly across word and SAE vocabularies. LLM summaries may conceal weak individual features, topic diversity is low for MTMs on Bills, and strong steering increases perplexity. Finally, mBERTopic's inconsistent likelihood shifts show that judged generation quality does not imply uniformly successful probabilistic steering behavior.

## Related Concepts

- [[Mechanistic Topic Models]]
- [[Sparse Autoencoders]]
- [[Continuous Topic Models]]
- [[Model Steerability]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]

## Related Papers

- [[Sparse Autoencoders are Topic Models]]
- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]]
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]]
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure."
- Cunningham et al. (2024), "Sparse Autoencoders Find Highly Interpretable Features in Language Models."
- Lieberum et al. (2024), "Gemma Scope: Open Sparse Autoencoders Everywhere All at Once on Gemma 2."
- Wu et al. (2025), "AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders."

[[index|Library home]]
