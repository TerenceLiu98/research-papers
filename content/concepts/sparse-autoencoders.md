---
title: Sparse Autoencoders
type: concept
aliases:
  - SAEs
  - Sparse Autoencoder Features
tags:
  - sparse-representations
  - mechanistic-interpretability
  - representation-learning
  - feature-discovery
---

## Overview

Sparse autoencoders (SAEs) learn an overcomplete, sparse representation of a model's dense activations. Their latent neurons are intended to separate polysemantic activations into features that are easier to inspect and intervene on. SAEs are used in mechanistic interpretability across language, vision, and multimodal models.

## Key Ideas

- An encoder maps a dense activation into an expanded latent vector, a sparsity mechanism selects or encourages a small number of active features, and a decoder reconstructs the original activation.
- Reconstruction fidelity and sparsity are competing objectives. Top-k, Batch Top-k, ReLU-threshold, JumpReLU, and Matryoshka variants make different choices about this tradeoff.
- A feature can be interpretable without being causally effective when its activation correlates with a concept but intervening on it does not reliably change model behavior. Interpretability and [[Model Steerability]] should therefore be evaluated separately.
- Feature coverage is not guaranteed by dictionary size. An SAE may miss user-relevant concepts or represent them only through entangled or composite features.
- [[Sparse Autoencoder Receptive Fields]] connect encoder architecture to concept geometry. Half-space receptive fields restrict single-latent selectivity in ReLU and JumpReLU, while TopK's shared activity budget can underrepresent higher-dimensional concepts. SpaDE uses prototype distances and simplex projection to support local receptive fields and adaptive sparsity, under a Euclidean-distance assumption.
- Post-hoc evaluation can assign concepts to neurons using tools such as CLIP-Dissect, but the resulting labels depend on the probing data, concept vocabulary, and evaluator model.
- SAE features can also be treated as thematic atoms in a [[Continuous Topic Models|continuous topic model]], with activations representing topic weights for embedding-space dataset analysis rather than single-feature steering.
- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]] use SAE latents directly for efficient retrieval. CSR combines reconstruction with a nonnegative contrastive objective on frozen embeddings; its experiments show improved latent utilization but persistent dead latents under stringent multimodal sparsity. Retrieval fidelity is a distinct objective from feature interpretability.
- [[Mechanistic Topic Models]] aggregate SAE activations into document-feature counts, learn corpus-level topic mixtures over those features, and combine topic-weighted decoder directions for controlled text generation.
- MonoTM shows that feature utility is role-dependent: the SAE configuration and feature subset that best estimate document-topic mixtures need not maximize validated feature interpretability. It therefore uses the full activation vocabulary for inference and a separately validated vocabulary for topic description.
- SAE variants can be combined with explicit concept supervision. [[Concept Bottleneck Sparse Autoencoders]] retain useful discovered features while adding a bottleneck for missing user-specified concepts.
- SAE features can seed a post-hoc concept bottleneck rather than serve as the final explanation vocabulary. [[Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations|PCBM-ReD]] finds candidate visual features with an SAE, assigns them language labels from highly activating images, and then selects text-embedded concepts by representation reconstruction.
- Separate SAEs can also induce concept dictionaries in different modalities. [[MetaphorCBM: Autonomous Concept Bottleneck Construction via Multimodal Sparse Dictionary Fusion]] learns visual and textual dictionaries independently, uses usage-entropy regularization to broaden basis utilization, and fuses bases afterward rather than forcing both modalities into one pretrained joint embedding space.
- In multimodal detector audits, separate SAEs can serve different explanatory levels. [[papers/sparsealign-ooc-auditing-news-image-text-out-of-context-detection-with-sparse-autoencoders|SparseAlign-OOC]] uses pair-space features for human inspection and hidden-state features for decision tracing, then tests activation coverage and interventions rather than treating readable groups alone as evidence of behavioral relevance.
- In vision transformers, layer-specific SAE features can be connected into a directed explanatory graph. [[Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]] fits sparse linear maps between consecutive CLS-token feature spaces and checks the resulting edge rankings with deletion and insertion interventions; the graph is useful but inherits SAE reconstruction error and misses patch-token information flows.
- Dense-retrieval embeddings can also be decomposed into labeled latent concepts. [[concepts/concept-level-sparse-retrieval|Concept-Level Sparse Retrieval]] uses those activations as an inverted-index vocabulary, exposing concept-level score contributions while trading off reconstruction fidelity, individual-feature coherence, and index cost.
- SAEs can also expose an adversarial intervention surface. [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]] thresholds a centroid of attack-prompt codes, adds the resulting mask to layer activations, and reconstructs prompts by embedding search. Its higher jailbreak success shows causal influence under the tested hooks, but its heuristic feature selection does not establish that individual latents have stable adversarial meanings.

- [[papers/sparse-shift-autoencoders-for-identifying-concepts-from-large-language-model-activations|Sparse Shift Autoencoders]] move the sparsity assumption from individual activations to differences between paired activations. Under linearity and support assumptions, this reduces the recovery ambiguity to permutation and scaling, so decoder columns correspond to individual concept shifts rather than arbitrary mixtures.
- SAEs can be trained jointly across distinct models rather than fitted independently. [[Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]] uses model-specific encoders and decoders with one shared sparse code, enabling cross-model reconstruction and analysis of [[Universal Concept Spaces]].

## Important Papers

- [[papers/sparse-shift-autoencoders-for-identifying-concepts-from-large-language-model-activations|Sparse Shift Autoencoders for Identifying Concepts from Large Language Model Activations]]
- [[papers/when-truthful-representations-flip-under-deceptive-instructions|When Truthful Representations Flip Under Deceptive Instructions?]] uses pretrained Llama Scope and Gemma Scope SAEs as measurement tools, reporting larger feature-space shifts for deceptive versus truthful prompts than for neutral versus truthful prompts; the selected features are correlational rather than causally validated.
- [[Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]
- [[Learning Concept Bottleneck Models from Mechanistic Explanations]]
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]]
- [[Concepts from Representations: Post-hoc Concept Bottleneck Models via Sparse Decomposition of Visual Representations]]
- [[Sparse Autoencoders are Topic Models]]
- [[Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]]
- [[Beyond Top Words: MonoTM for Topic Modeling with Interpretable Monosemantic Features]]
- [[MetaphorCBM: Autonomous Concept Bottleneck Construction via Multimodal Sparse Dictionary Fusion]]
- [[papers/sparsealign-ooc-auditing-news-image-text-out-of-context-detection-with-sparse-autoencoders|SparseAlign-OOC: Auditing News Image-Text Out-of-Context Detection with Sparse Autoencoders]]
- [[papers/decoding-dense-embeddings-sparse-autoencoders-for-interpreting-and-discretizing-dense-retrieval|Decoding Dense Embeddings: Sparse Autoencoders for Interpreting and Discretizing Dense Retrieval]]
- [[Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]]
- [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]]
- [[Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]]
- Pach et al. (2025), "Sparse autoencoders learn monosemantic features in vision-language models."
- Gao et al. (2025), "Scaling and evaluating sparse autoencoders."
- Huben et al. (2024), "Sparse autoencoders find highly interpretable features in language models."
- Oikarinen and Weng (2023), "CLIP-Dissect: Automatic description of neuron representations in deep vision networks."

## Related Concepts

- [[Sparse Autoencoder Receptive Fields]]
- [[Concept Bottleneck Models]]
- [[Concept Bottleneck Sparse Autoencoders]]
- [[concepts/concept-level-sparse-retrieval|Concept-Level Sparse Retrieval]]
- [[Model Steerability]]
- [[Continuous Topic Models]]
- [[Mechanistic Topic Models]]
- [[Universal Concept Spaces]]
- Feature disentanglement
- Dictionary learning
