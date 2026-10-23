---
title: "Uncovering Conceptual Blindspots in Generative Image Models Using Sparse Autoencoders"
type: paper
authors:
  - Matyas Bohacek
  - Thomas Fel
  - Maneesh Agrawala
  - Ekdeep Singh Lubana
year: null
source_job_id: "dff5015c-01ea-44a9-86d4-46409603f7b6"
tags:
  - generative-model-evaluation
  - sparse-autoencoders
  - image-generation
  - concept-discovery
---

## TL;DR

This paper defines [[concepts/conceptual-blindspots|Conceptual Blindspots]] as concepts whose prevalence differs sharply between natural images and prompt-matched generations. It operationalizes the comparison with DINOv2 features and a 32,000-feature archetypal [[concepts/sparse-autoencoders|Sparse Autoencoder]], then analyzes Stable Diffusion 1.5 and 2.1, PixArt, and Kandinsky on 10,000 caption-matched samples. All four models show a heavier suppressed than exaggerated tail, with both shared and model-specific failures; the diagnostic also surfaces possible memorization, caption ambiguity, post-training shifts, and altered concept co-occurrences. These findings remain conditional on the concepts recovered by DINOv2 and the SAE.

## Research Question

Can concept-level discrepancies between natural and generated images be identified systematically and without a predefined human concept vocabulary, and what do those discrepancies reveal about different text-to-image models?

## Motivation

Standard image-generation metrics summarize realism, fidelity, or distribution coverage but do not say which fine-grained visual concepts a model omits or overproduces. Qualitative audits can name such failures, but they are difficult to scale and compare across models. The paper seeks a common concept basis in which matched natural and generated images can be compared at distribution, datapoint, and co-occurrence levels.

## Contributions

- Formalizes suppressed and exaggerated conceptual blindspots through an energy-difference score comparing a concept's activation in generated and natural images.
- Builds an unsupervised pipeline using DINOv2 features and an archetypal SAE (RA-SAE) with 32,000 sparse concept dimensions.
- Releases an exploratory interface for comparing concept discrepancies across four text-to-image models.
- Uses the same representation to study cross-model structure, individual image pairs, DPO post-training, empirical concept frequency, and higher-order co-activation patterns.

## Method

The evaluation begins with 10,000 natural image-caption pairs sampled from a filtered LAION release. Each caption is passed to a text-to-image model, producing a paired natural image $x$ and synthetic image $x'$. DINOv2 maps both images to dense visual features, and a TopK RA-SAE maps those features into a shared nonnegative sparse code.

For concept $k$, the paper defines an energy gap between mean synthetic and natural activations and applies a sigmoid:

$$
\delta(k)=\sigma\left(\mathbb E_{x'}[\xi_k(x')]-\mathbb E_x[\xi_k(x)]\right).
$$

The score is a monotone transformation of the energy gap and its associated odds ratio. The experiments label concepts with $\delta(k)<0.1$ as suppressed and concepts with $\delta(k)>0.9$ as exaggerated. Datapoint-level analysis instead compares complete concept vectors with an L2 distance. Co-occurrence analysis compares $Z^\top Z$ matrices and their leading eigenspaces.

The custom RA-SAE is trained on DINOv2 tokens from ImageNet-1k. It uses 32,000 dictionary elements, TopK sparsity with $k=5$, and an archetypal constraint that places dictionary atoms in the convex hull of training data. This constraint is intended to improve stability and keep learned features close to observed visual support.

## Experiments

The main evaluation covers Stable Diffusion 1.5, Stable Diffusion 2.1, PixArt, and Kandinsky, using one 512-by-512 generation for each of the 10,000 captions. The distribution of $\delta(k)$ is left-skewed for every model: reported skewness is -0.54 for SD 2.1, -0.40 for SD 1.5 and PixArt, and -0.23 for Kandinsky. This indicates a stronger tail of suppression than exaggeration under the paper's representation and sample.

Cross-model comparisons find a Pearson correlation of $r=0.82$ between the SD 1.5 and SD 2.1 concept-score vectors, versus reported correlations of about 0.41 and 0.46 between SD 1.5 and PixArt or Kandinsky. Qualitative examples include solid white document regions as a shared suppressed concept, pans as a Kandinsky-specific suppressed concept, and shadows beneath animals as a shared exaggerated concept. Separate prompt stress tests support the reported Kandinsky bird-feeder and SD 1.5 glossy-DVD failures.

At the datapoint level, small concept-vector differences sometimes coincide with repeated visual templates interpreted as possible memorization, whereas large differences include both genuine concept failures and noisy or underspecified captions. This score does not by itself distinguish those causes.

The DPO-tuned SD 1.5 variant has a lower median and narrower distribution of image-pair concept distances than the baseline, which the authors interpret as closer conceptual alignment. The comparison does not isolate the mechanism introduced by DPO. Across models, frequent natural-image concepts tend to have smaller discrepancies, while rare and especially suppressed concepts show larger errors.

For concept co-occurrences, generated and natural data have similar thresholded sparsity and heavy-tailed eigenspectra, but differ in which concept pairs activate and in higher spectral directions. The results suggest preservation of coarse compositional structure alongside changes in its content.

## Limitations

- The method can only detect concepts represented by DINOv2 and recovered by the chosen RA-SAE. SAE features are learned proxies, not ground-truth semantic variables.
- The formal data-generating-process account assumes invertibility and independent latent factors; the empirical pipeline can produce useful measurements even when those assumptions are not established, but the theory should not be read as proving semantic recovery.
- The natural baseline contains 10,000 samples from a filtered LAION subset and may miss rare concepts and co-occurrences. The observed blindspots are relative to this sample, not the full training distribution.
- Generated images reuse natural captions, so caption noise, ambiguity, and prompt-distribution mismatch can contribute to measured differences.
- Concept labels and highlighted examples rely partly on manual inspection. The paper's attempted VLM-based autointerpretation works better with alpha-masked evidence but is evaluated qualitatively with one VLM and no annotation ground truth.
- Datapoint similarity is suggestive of memorization but is not a training-data membership test. Likewise, the DPO comparison is observational and does not identify which part of post-training caused the shift.
- The supplied manuscript does not state a publication year or stable paper identifier, so neither is inferred here.

## Related Concepts

- [[concepts/conceptual-blindspots|Conceptual Blindspots]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/disentangled-representations|Disentangled Representations]]

## Related Papers

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] studies how SAE encoder geometry constrains which concepts can be recovered, a direct caveat for this paper's measurement basis.
- [[papers/same-concept-different-directions-cross-modal-feature-heterogeneity-in-sparse-autoencoders|Same Concept, Different Directions: Cross-Modal Feature Heterogeneity in Sparse Autoencoders]] shows that semantic correspondence need not imply a shared feature direction, further qualifying concept-space comparisons.
- Bau et al. (2019), "Seeing What a GAN Cannot Generate," studies missing generated modes at image and object levels; this paper shifts the comparison to sparse concept features.
- Fel et al. (2025), "Archetypal SAE: Adaptive and Stable Dictionary Learning for Concept Extraction in Large Vision Models," supplies the RA-SAE method used for concept extraction.

[[index|Library home]]
