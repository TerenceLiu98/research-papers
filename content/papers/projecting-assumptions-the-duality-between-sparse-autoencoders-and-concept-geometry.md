---
title: "Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry"
type: paper
authors:
  - Sai Sumedh R. Hindupur
  - Ekdeep Singh Lubana
  - Thomas Fel
  - Demba Ba
year: null
source_job_id: "5c5ce4de-27f4-41ce-90c5-c586c594a8f9"
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - representation-learning
  - concept-geometry
---

## TL;DR

[[Sparse Autoencoders]] impose geometric assumptions through their encoders, so similar reconstruction and sparsity scores can conceal different failures to recover concepts. This paper connects encoder architecture to [[Sparse Autoencoder Receptive Fields|latent receptive fields]] and tests two sources of mismatch: nonlinear concept separability and heterogeneous intrinsic dimensionality. Its Sparsemax Distance Encoder (SpaDE) combines distances to learned prototypes with adaptive sparsity, improving concept specialization in the studied synthetic, formal-language, and vision settings. SpaDE remains dependent on a Euclidean-distance assumption; the paper does not propose a universally optimal SAE.

## Research Question

How does an SAE encoder constrain the concepts it can identify, and can knowledge of concept geometry guide architecture design beyond optimizing reconstruction and sparsity?

## Motivation

SAEs are often used as unsupervised inventories of the concepts represented by a neural network. That use presumes that recovered latents adequately cover the model's concepts. The paper questions this presumption: an encoder can exclude concept-aligned solutions even when a sparse dictionary could represent the data well. Architecture-dependent omissions could help explain reported instability and limited control from SAE features, although this study does not directly establish those causal explanations.

## Contributions

- Recasts SAE training as bilevel optimization: an outer dictionary-learning objective is constrained by the encoder's inner variational problem.
- Relates the regions where latents activate to implicit assumptions about concept separability and dimensionality.
- Tests those assumptions using Gaussian clusters, transformer activations from a formal grammar, and pretrained vision-model activations.
- Introduces SpaDE as an example of designing an SAE around specified geometric properties, with locality and a variable number of active latents.

## Method

For input activation $x$, an SAE computes $z=f(x)$ and reconstructs $x$ with a linear decoder. The outer objective minimizes reconstruction error plus a sparsity regularizer, while the encoder restricts which sparse codes are attainable. ReLU and nonnegative TopK have projection formulations; JumpReLU can be expressed using shifted ReLU and Heaviside components (Section 3; Appendix D.1).

Define latent $i$'s receptive field as $\mathcal F_i=\{x:f_i(x)>0\}$. A latent that selectively identifies a concept needs its receptive field to separate that concept from other inputs. The paper derives the following architectural constraints (Table 2; Appendix D.2):

| Encoder | Receptive-field structure | Consequence for concept recovery |
| --- | --- | --- |
| ReLU / JumpReLU | Half-spaces | Single-latent selectivity depends on linear separability; active counts can vary by input. |
| TopK | Unions of cones, termed hyperpyramids in the paper | Selection depends on angle in the analyzed formulation; a fixed activity budget limits adaptation to concepts of different dimensions. A pre-encoder bias shifts the common apex. |
| SpaDE | Unions of convex polytopes near learned prototypes | Local competition supports nonlinearly separable, distance-separated concepts with varying active counts. |

SpaDE computes

$$
z=\operatorname{sparsemax}(-\lambda d(x,W)),\qquad d_i(x,W)=\lVert x-w_i\rVert_2^2,
$$

where sparsemax is Euclidean projection onto the probability simplex $\Delta^s=\{z\geq0:\sum_i z_i=1\}$. Different simplex faces admit different support sizes, enabling adaptive sparsity. The learnable positive scale $\lambda$ controls competition between prototypes. Its outer objective uses K-Deep Simplex with a distance-weighted penalty $\sum_i z_i\lVert x-w_i\rVert_2^2$ rather than an ordinary unweighted $L_1$ penalty, which would be constant on the simplex. Appendix D.4 also gives an inner interpretation as one-sided optimal transport with squared-norm regularization. Despite using squared distances, the encoder is continuous and piecewise affine because the common quadratic term cancels within each active-set region.

## Experiments

The main baselines are ReLU, JumpReLU, and TopK SAEs. Evaluation includes concept-specific F1 scores, reconstruction MSE normalized by concept variance, active latent counts, and cosine similarities between samples' codes and between latents' activation profiles. These measure different aspects of representation quality.

The synthetic evaluations use 1,000 points per concept. In the separability experiment, latent activations are thresholded at $10^{-6}$ to compute precision, recall, and F1 (Appendix C.1). In the heterogeneity experiment, normalized MSE of 1 corresponds to predicting a concept's mean; lower values indicate reconstruction of within-concept variation (Appendix C.2; Section 5.2). Sample-code similarities measure whether inputs share latent representations, whereas latent-profile similarities measure whether features activate together across the dataset. Low cross-concept similarity in the former can coexist with co-occurrence in the latter, as the formal-language results illustrate.

| Setting | Setup | Reported result |
| --- | --- | --- |
| Nonlinear separability | Six 2D Gaussian clusters with alternating center norms of 1 and 3; 128 SAE latents | For the highlighted linearly separable concept, ReLU and JumpReLU reach F1 = 1; for the highlighted nonlinearly separable concept, their F1 is at most 0.5. SpaDE's best latents reach F1 = 1 for both. TopK performs less well on both (Section 5.1; Figure 5). |
| Heterogeneous dimensions | Five clusters in 128D with intrinsic dimensions 6, 14, 30, 62, and 126; 512 SAE latents | TopK reaches normalized MSE below 0.2 only when its selected $k$ exceeds the relevant concept dimension. Other encoders adapt activity counts; SpaDE nearly follows intrinsic dimension for one hyperparameter setting (Section 5.2; Figure 6). |
| Formal language | Two-layer, width-128 transformer trained on an English-like probabilistic context-free grammar; 256 SAE latents on its middle residual stream | Parts of speech differ in effective dimension and separability. SpaDE's most selective latents reach F1 = 1, and its latent activation profiles show less cross-part-of-speech co-occurrence (Section 5.3; Figure 7). |
| Vision | DINOv2-base with registers on 10-class Imagenette; 200 SAE latents, 261 tokens per image, 50 epochs | The authors report the strongest top-latent class F1 scores for SpaDE across all classes, with more localized latent co-occurrence. Attribution maps illustrate foreground/background and object-part features (Section 5.4; Figure 8; Appendix E.4). |

Appendix E.1 shows why reconstruction alone is insufficient: TopK can achieve very low error on the 2D dataset by using a small basis to represent all data without separating concepts. Conversely, SpaDE can split a concept into additional subclusters. High specialization therefore needs to be judged against the intended concept granularity.

The formal-language comparison selects baseline hyperparameters using the best top-10 per-concept F1 scores, while SpaDE's regularization is transferred from synthetic experiments (Appendix C.3). Vision hyperparameters are chosen through a learning-rate sweep controlling sparsity. The roughly 200 million vision training tokens count repeated exposure over 50 epochs, rather than distinct samples.

## Limitations

- SpaDE assumes Euclidean distances meaningfully separate concepts. Violating this assumption can still produce shared latents; other geometries may require different encoders.
- Excessive sparsity can produce overly specific latents that capture special cases instead of general concepts.
- The experiments focus on mutually exclusive concepts. Co-occurring concepts require a different interpretation of latent co-occurrence, even if receptive-field analysis remains applicable to individual concept presence.
- The language evidence uses a small transformer trained on a formal grammar, and the naturalistic evaluation uses one vision backbone and a 10-class dataset. These results do not establish general recovery of concepts in large natural-language models.
- Best-latent F1 is not an average over the whole dictionary or evidence of causal usefulness. No downstream steering intervention establishes improved [[Model Steerability]] here.
- Error bars are not reported uniformly across experiments: the checklist says they are included when experiments were not too expensive. Figure 5 reports one-standard-deviation shading, which should not be generalized to uncertainty estimates for every comparison.
- The supplied Markdown does not state a publication year or stable identifier for this paper; the year is left unset. Its NeurIPS checklist is not treated as evidence of acceptance.

## Related Concepts

- [[Sparse Autoencoders]]
- [[Sparse Autoencoder Receptive Fields]]
- [[Model Steerability]]

## Related Papers

References discussed in the supplied paper include:

- Gao et al. (2024), "Scaling and evaluating sparse autoencoders": the TopK baseline (reference 13).
- Rajamanoharan et al. (2024), "Jumping ahead: Improving reconstruction fidelity with JumpReLU sparse autoencoders": the JumpReLU baseline (reference 14).
- Menon et al. (2024), "Analyzing (in) abilities of SAEs via formal languages": the formal-grammar setup (reference 34).
- Martins and Astudillo (2016), "From softmax to sparsemax: A sparse model of attention and multi-label classification": the simplex projection (reference 44).
- Tasissa et al. (2023), "K-deep simplex: Manifold learning via local dictionaries": SpaDE's outer optimization (reference 45).

Related library reading, without implying citation by this paper:

- [[Sparse Autoencoders are Topic Models]] offers another account of the assumptions underlying SAE representations, using a continuous generative topic model.
- [[Interpretable and Steerable Concept Bottleneck Sparse Autoencoders]] addresses concept coverage through explicit supervision and evaluates steering, complementing this paper's analysis of encoder geometry.

[[index|Library home]]
