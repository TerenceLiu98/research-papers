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
- Evaluates eight corpora spanning news, congressional bills, Wikipedia, reviews, emotions, poetry, and creative writing, including short and abstract documents.
- Constructs topic steering vectors as weighted combinations of SAE decoder directions and evaluates their relevance, likelihood effects, and generation fluency.

## Method

Documents are passed through Gemma 2-9B and the layer-10, 16k-feature GemmaScope SAE. For each token and feature, an activation counts only when it exceeds the 80th percentile of that feature's nonzero activation distribution on the SAE training data. The pipeline removes features whose descriptions concern programming, mathematics, grammar, formatting, or stop words; features active in more than 1% of the SAE training data; and features present in more than 90% of corpus documents. An optional LLM refinement step discards up to two apparently irrelevant features from each topic's top candidates.

The three MTM variants use the resulting feature counts differently:

- **mLDA** treats SAE features as the vocabulary in an LDA-style multinomial model.
- **mETM** represents each topic as an activation-space vector, maps it through the fixed SAE encoder to feature probabilities, and models feature counts with binomial likelihoods.
- **mBERTopic** forms a document embedding from the count-weighted average of SAE decoder directions, clusters those embeddings with UMAP and HDBSCAN, and derives topic-feature weights with class-based TF-IDF.

Topics are presented either as their highest-weight feature descriptions or as one-sentence LLM summaries. For control, the normalized weighted sum of a topic's SAE decoder directions becomes its steering vector. At inference time, the intervention removes the activation component parallel to that vector and replaces it with a user-scaled topic component.

Topic judge samples documents, retrieves one or two high-weight topics from each competing model, and asks GPT-4.1 which topic set better captures the document's subject, affect, and style. Pairwise outcomes are fitted with a Bradley-Terry model and reported on an Elo scale. Standard coherence, intrusion, diversity, topical-alignment, and stability metrics provide complementary checks.

## Experiments

The evaluation covers 20 Newsgroups, Congressional Bills, Wikipedia, Yelp Polarity, AGNews, GoEmotions, PoemSum, and WritingPrompts. Models use 50 topics on AGNews, GoEmotions, and PoemSum and 100 on the other corpora. Baselines are LDA, ETM, BERTopic, Dirichlet VAE, and FASTopic; hyperparameters are selected separately for each model-dataset pair by Bayesian optimization of topic quality.

Across top-feature and summarized representations, an MTM has the highest topic-judge Elo score in 14 of 16 dataset-representation conditions. MTMs beat their matched word-based counterparts in 42 of 48 comparisons; 71% of those comparisons favor an MTM by at least 50 Elo points. The largest gains occur on GoEmotions, PoemSum, and WritingPrompts, where the average advantage is 195 Elo points. The main counterexample is the Bills top-feature condition, where precise lexical keywords outperform SAE descriptions; summarization recovers mLDA and mETM but not mBERTopic.

A study with 68 participants evaluates Wiki and PoemSum outputs. Human and GPT-4.1 Elo rankings have Spearman correlations from 0.76 to 0.95 across the four representation-dataset conditions. MTMs rank first in three conditions; BERTopic ranks first for summarized PoemSum topics, without a significant difference from mETM.

On standard metrics, MTMs generally remain comparable with the baselines and perform particularly well on short or abstract text. Their GPT-4.1 coherence ratings are roughly 2.5-2.9 on the standard benchmark corpora. However, mBERTopic has low topic diversity on PoemSum and WritingPrompts (0.38 and 0.36) and lower PoemSum coherence, indicating weaker robustness than the probabilistic variants. Cross-model document-topic correlations suggest that MTMs recover mostly familiar themes on Bills and Wiki but substantially different themes on GoEmotions and PoemSum.

Steering is effective under the paper's evaluations. For mLDA, topic-relevance win rates range from 84.4% to 98.9% across datasets; mETM and mBERTopic also exceed their 50% chance reference on every dataset. Increasing steering strength raises the relative likelihood of on-topic documents for mLDA and generally for mETM, while mBERTopic is less consistent. Moderate steering leaves perplexity close to the unsteered baseline, but perplexity rises at stronger interventions.

## Limitations

MTMs depend on the availability and quality of pretrained SAEs. Results can change with the language model, SAE training corpus, layer, sparsity configuration, and accuracy of automatically generated feature labels. The approach only requires some useful concepts to be linearly represented, but non-linear or entangled concepts can still be missed.

Featurization is heavier than bag-of-words preprocessing: it requires an LLM, an SAE, suitable accelerator memory, and an additional LLM-based feature-filtering step. The authors report a total filtering API cost of $0.33 for the eight datasets, but the dominant compute cost is activation extraction. Training or adapting an SAE to a target corpus may improve specificity while adding further expense.

The evaluation also has scope limits. Topic judge depends on an LLM evaluator, and its human validation covers only Wiki and PoemSum. LLM summaries can conceal weak or mislabeled individual features. Steering quality degrades at high intervention strengths, and mBERTopic's likelihood results show that good judged generations do not guarantee uniformly well-behaved likelihood shifts under steering.

## Related Concepts

- [[Mechanistic Topic Models]]
- [[Sparse Autoencoders]]
- [[Continuous Topic Models]]
- [[Model Steerability]]
- Topic modeling
- LLM-as-a-judge evaluation
- Activation steering

## Related Papers

- [[Sparse Autoencoders are Topic Models]]
- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- Grootendorst (2022), "BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure."
- Cunningham et al. (2024), "Sparse Autoencoders Find Highly Interpretable Features in Language Models."
- Lieberum et al. (2024), "Gemma Scope: Open Sparse Autoencoders Everywhere All at Once on Gemma 2."
- Wu et al. (2025), "AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders."

[[index|Library home]]
