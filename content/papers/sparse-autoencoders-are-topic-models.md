---
title: "Sparse Autoencoders are Topic Models"
type: paper
authors:
  - Leander Girrbach
  - Zeynep Akata
year: null
tags:
  - sparse-autoencoders
  - topic-modeling
  - representation-learning
  - mechanistic-interpretability
  - multimodal-learning
---

## TL;DR

This paper argues that sparse autoencoders (SAEs) are naturally topic models for embedding spaces: SAE features act as fine-grained thematic atoms and their activations are document-level topic weights. It introduces a continuous topic model (CTM) inspired by LDA, derives the standard $L_1$-penalized SAE objective as a maximum a posteriori estimator under limiting assumptions, and builds SAE-TM, a post-hoc framework that interprets and merges frozen SAE features for text and image analysis.

## Research Question

How should sparse autoencoders be understood and used when their features are not reliably steerable at the level of individual directions? In particular, can SAEs provide a principled and scalable topic model for continuous embedding spaces across language and vision?

## Motivation

SAEs are widely used to inspect dense activations, but their practical value is contested by negative steering results and comparisons with linear probes. The paper proposes that these limitations reflect a mismatch in interpretation: SAE features are better treated as thematic components that combine to explain an embedding than as individually controllable, monosemantic directions.

Classical topic models are mainly defined over discrete text and typically require a fixed, relatively small number of topics. The paper adapts their mixture structure to continuous embeddings, then uses frozen SAEs as reusable topic atoms whose granularity can be chosen after pretraining.

## Contributions

- Introduces a continuous topic model for embedding spaces, with document-level topic mixtures, continuous topic directions, Gamma-distributed strengths, and Gaussian observation noise.
- Shows that the standard nonnegative SAE decoder with an $L_1$ penalty is a MAP estimator of the CTM under a high-activity, small-contribution limit, concentrated directions, and independent per-topic strengths.
- Defines SAE-TM, which learns word-emission probabilities for SAE features, clusters feature embeddings with weighted k-means, and merges atoms into any requested number of topics without retraining the SAE.
- Demonstrates that SAE-TM produces coherent and diverse topics on five text datasets and three image datasets, while supporting analysis of large-scale image collections and Japanese woodblock prints.

## Method

The CTM represents an embedding $D$ as a sum of topic-specific continuous contributions plus Gaussian noise. A topic mixture is drawn from a Dirichlet distribution; each contribution samples a topic, a continuous direction around that topic mean, and a nonnegative Gamma-distributed strength. The expected embedding is linear in the topic mixture, paralleling the mixture structure of LDA while replacing discrete word observations with continuous embeddings.

For the SAE connection, the paper considers many small contributions, concentrated topic directions, and independent aggregated strengths. In the limit, the total strength has a Gamma distribution and the normalized topic weights have a Dirichlet distribution. Reparameterizing the total strength and topic mixture as nonnegative activations gives the SAE decoder $D \mid a \sim \mathcal{N}(Wa, \sigma^2I)$. Choosing an exponential prior on total strength and a uniform Dirichlet prior yields the reconstruction loss plus $\beta\lVert a\rVert_1$.

SAE-TM adds interpretation layers on top of a frozen SAE. It learns a word-emission matrix from normalized SAE activations and document text or captions, using a background unigram prior and inverse-document-frequency weighting. To reduce thousands of SAE features to a target topic count, it forms feature embeddings from top-p-filtered word distributions, clusters them with activation-frequency-weighted k-means, and aggregates the word distributions within each cluster. A pretrained SAE can therefore be reused on smaller downstream datasets, where dataset statistics determine relevant atoms and their merges.

## Experiments

The main comparisons use AVITM, CombinedTM, DecTM, DVAE, ETM, FASTopic, NSTM, and TSCTM. Topic coherence is measured by LLM-based intruder detection ($C_I$) and overall topic rating ($C_R$); topic diversity is measured by average word mover distance ($D$).

On five text datasets, SAE-TM has the best coherence across the tested topic counts. Its averaged scores are $(C_I, C_R, D) = (54.31, 77.25, 3.67)$ at 50 topics and $(40.49, 71.22, 3.57)$ at 500 topics. TSCTM has higher diversity, but its overall coherence rating falls from 69.75 at 50 topics to 17.67 at 500 topics, while SAE-TM remains comparatively stable. In the topic-relevance evaluation, SAE-TM reaches 66.51% mean accuracy versus 61.66% for AVITM; on active topics only, it reaches 38.26% versus 29.00%.

On CIFAR-100, Food101, and SUN397, SAE-TM again has the strongest reported coherence. Its averaged scores are $(42.57, 85.05, 3.70)$ at 50 topics and $(36.54, 84.43, 3.53)$ at 500 topics. Diversity is weaker than for some baselines on image data, which the paper attributes partly to image embeddings emphasizing foreground objects and to caption-based interpretation binding frequent words to concepts that are not always topic-specific.

For dataset analysis, a foundational SAE is applied to ImageNet, CC3M, CC12M, and YFCC-15M. The resulting topics expose differences such as more plants and animals in ImageNet, more text and typographic elements in CC12M, and more urban scenes in YFCC. A text SAE is also applied to 177,897 Japanese woodblock prints across seven eras, revealing shifts from domestic scenes and traditional clothing toward nature, architecture, and less traditional attire in later periods.

## Limitations

The CTM-to-SAE derivation depends on specific limiting assumptions, including concentrated directions and independent feature strengths. Fixed-sparsity SAEs are related through a deterministic support-selection approximation rather than the same $L_1$ prior. The paper does not establish that these assumptions hold for every SAE architecture or embedding model.

Feature interpretation depends on text or model-generated captions, a vocabulary, word embeddings, and LLM judgments. Caption errors, annotator bias, and evaluator bias can propagate into topic labels. Activation strength also does not always equal thematic importance. More generally, embeddings can encode sentiment, length, style, or other non-thematic properties alongside themes. The experiments cover selected text, image, and artwork datasets, and the paper identifies hierarchical SAE extensions as future work rather than evaluating them.

## Related Concepts

- [[Sparse Autoencoders]]
- [[Continuous Topic Models]]
- [[Text Embedding Models]]
- [[Model Steerability]]
- Topic modeling
- Dataset analysis

## Related Papers

- Blei, Ng, and Jordan (2003), "Latent Dirichlet Allocation."
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces."
- Bricken et al. (2023), "Towards Monosemanticity: Decomposing Language Models with Dictionary Learning."
- Gao et al. (2025), "Scaling and Evaluating Sparse Autoencoders."
- Wu, Nguyen, Zhang, Wang, and Luu (2024), "FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model."
- Zheng et al. (2025), "Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders."

[[index|Library home]]
