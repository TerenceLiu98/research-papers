---
title: Topic Modeling in Embedding Spaces
type: paper
authors:
  - Adji B. Dieng
  - Francisco J. R. Ruiz
  - David M. Blei
year: 2020
tags:
  - topic-modeling
  - word-embeddings
  - variational-inference
  - representation-learning
---

## TL;DR

The embedded topic model (ETM) represents each topic as a vector in the same space as word embeddings and converts topic-word affinities into categorical distributions. On 20 Newsgroups and New York Times corpora, it retains interpretable topics as vocabularies grow and, among the models with interpretable topics in the study, provides the strongest predictive performance. A version using pretrained embeddings also isolates stop words into dedicated topics instead of spreading them across content topics.

## Research Question

Can a probabilistic topic model preserve interpretable topics and accurate document predictions when the vocabulary is large, heavy-tailed, or includes stop words?

## Motivation

Latent Dirichlet allocation represents every topic as an independently parameterized distribution over the full vocabulary. The paper argues that this representation deteriorates as rare terms enlarge the vocabulary, forcing practitioners to prune words that may carry useful information. Word embeddings supply a lower-dimensional semantic geometry, but embedding-based document models do not necessarily retain explicit, interpretable topic mixtures.

## Contributions

- Defines the [[concepts/embedded-topic-models|Embedded Topic Model]], in which word and topic vectors jointly induce each topic's categorical distribution over vocabulary terms.
- Supports either fixed pretrained word embeddings or embeddings learned jointly with topic vectors and document representations.
- Derives a scalable fitting procedure using logistic-normal document proportions, [[concepts/amortized-variational-inference|Amortized Variational Inference]], reparameterized gradients, and minibatch optimization.
- Evaluates predictive document completion and topic quality across vocabulary sizes, including a separate experiment that retains stop words.

## Method

Let $\rho\in\mathbb R^{L\times V}$ contain word embeddings and let $\alpha_k\in\mathbb R^L$ be the embedding of topic $k$. Their inner products induce the topic-word distribution

$$
\beta_k=\operatorname{softmax}(\rho^\top\alpha_k).
$$

For document $d$, the model draws Gaussian logits $\delta_d\sim\mathcal N(0,I)$, transforms them into topic proportions $\theta_d=\operatorname{softmax}(\delta_d)$, draws a topic assignment for each token from $\theta_d$, and draws the word from the corresponding $\beta_k$. The low-dimensional factorization shares statistical strength among semantically related words rather than assigning an unrelated free parameter to every topic-word pair (Sections 3-4).

The posterior over document logits is intractable. A neural inference network maps the document's length-normalized bag-of-words vector to the mean and variance of a Gaussian approximation. Training maximizes an evidence lower bound with Monte Carlo reparameterized gradients and document minibatches. The topic embeddings and inference-network parameters are optimized in both variants; the word embeddings are updated only in the jointly learned variant (Section 5; Algorithm 1).

The paper calls the fixed, pretrained skip-gram variant the **labeled ETM**. Because its embedding matrix may contain words absent from the target corpus, it can still place such words in topics through their inner products with learned topic vectors. The ordinary ETM learns its embedding matrix with the remaining model parameters (Section 4).

## Experiments

The study uses 20 Newsgroups and more than 1.8 million New York Times articles from 1987-2007. The 20 Newsgroups split contains 11,260 training documents, 7,532 test documents, and 100 validation documents, with vocabularies from 3,102 to 52,258 terms. New York Times uses 85%/10%/5% train/test/validation splits and vocabularies from 5,921 to 212,237 terms. Models use 100 topics for 20 Newsgroups and 300 for New York Times (Section 6).

Comparators are LDA, the neural variational document model (NVDM), and a logistic-normal, simplex-constrained $\Delta$-NVDM. The study assesses predictive performance by held-out log likelihood in document completion. Its [[concepts/topic-model-evaluation|Topic Model Evaluation]] multiplies NPMI coherence over each topic's ten leading words by the fraction of unique terms among each topic's top 25 words.

Across the vocabulary-size experiments, LDA generally has the weakest predictions and worsens as vocabulary grows. NVDM predicts best on New York Times but its unconstrained factor matrix does not define interpretable topic distributions and has low measured topic quality. Both ETM variants predict at least as well as $\Delta$-NVDM, and the paper reports ETM as the best predictor among the evaluated models that retain interpretable topics. The supplied figures present normalized metrics rather than a complete table of raw document-completion values, so they support comparative trends more directly than exact effect sizes (Section 6; Figure 4).

In the stop-word experiment, New York Times retains a 10,283-word vocabulary and models use 300 topics. Labeled ETM attains coherence 0.18, diversity 0.22, and their product 0.0405, compared with 0.13/0.14/0.0173 for LDA and 0.17/0.11/0.0187 for $\Delta$-NVDM. Qualitatively, labeled ETM concentrates stop words in a few dedicated topics, whereas the comparators distribute them across many topics (Section 6.1; Table 3).

## Limitations

- The empirical evidence covers two English-language corpora and a bag-of-words representation; it does not establish the same behavior for multilingual, short-text, temporal, or non-text settings.
- Automatic coherence and diversity are proxies for interpretability. The study supplies qualitative topic examples but no human evaluation, and multiplying the two metrics hides their separate tradeoffs.
- The paper compares against LDA and two neural document-model formulations available at the time. Its conclusions are relative to those baselines, optimization settings, and vocabulary construction choices.
- The pretrained variant depends on the semantic quality and coverage of skip-gram embeddings, while the jointly learned variant must estimate that geometry from the target corpus.
- Document completion and topic-word quality test different properties. Strong likelihood for NVDM does not yield interpretable topics, and the experiments do not evaluate downstream task utility or uncertainty calibration.

## Related Concepts

- [[concepts/embedded-topic-models|Embedded Topic Models]]: the model family introduced and evaluated by the paper.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: shares posterior computation for document topic proportions through an inference network.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: separates predictive document completion from coherence, diversity, and qualitative interpretability.
- [[concepts/continuous-topic-models|Continuous Topic Models]]: a broader family that models continuous observations; ETM instead generates categorical words through an embedding-factorized topic distribution.

## Related Papers

- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation": supplies the document-topic mixture structure that ETM retains while changing how topic-word distributions are parameterized.
- Miao, Yu, and Blunsom (2016), "Neural Variational Inference for Text Processing": introduces the NVDM predictive comparator and its amortized document inference.
- Srivastava and Sutton (2017), "Autoencoding Variational Inference for Topic Models": related neural topic-model inference discussed by the paper.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]]: a later embedding-space model that derives document-topic and topic-word relations through optimal transport rather than ETM's probabilistic decoder.
- [[papers/neural-topic-modeling-with-large-language-models-in-the-loop|Neural Topic Modeling with Large Language Models in the Loop]]: later uses ETM as a base model for language-model-guided topic refinement.

The supplied Markdown does not state a stable paper identifier. Publication year follows the library's existing canonical citation for this paper.

[[index|Library home]]
