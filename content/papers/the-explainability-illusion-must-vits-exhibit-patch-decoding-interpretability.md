---
title: "The Explainability Illusion: Must ViTs Exhibit Patch-Decoding Interpretability?"
type: paper
authors:
  - Ronen Schaffer
  - Hila Manor
  - Tomer Michaeli
year: 2026
source_job_id: "6e4932e9-837d-47f4-976d-4ebdb873b627"
tags:
  - vision-transformers
  - model-interpretability
  - token-decoding
  - vision-language-models
  - implicit-bias
---

## TL;DR

Applying a Vision Transformer's final prediction head directly to patch tokens does not reliably reveal where class semantics reside. Across pretrained models, controlled synthetic tasks, and a solvable toy transformer, this paper finds that [[concepts/patch-token-decoding-explainability|Patch-Token Decoding Explainability]] can be aligned with an object, inverted toward its background, or unable to separate the two without corresponding differences in classification quality. The practical conclusion is that spatial alignment must be validated for each model rather than assumed from architecture or accuracy.

## Research Question

Is aligned patch-token decoding an inherent property of trained Vision Transformers, or a contingent outcome of the task, data distribution, objective, and optimization trajectory?

## Motivation

Zero-shot token decoding is attractive because it is simple and gradient-free: an analyst applies the model's existing classification or projection head to intermediate patch tokens and reads the resulting class scores as a spatial explanation. This extrapolates a head trained for a class token to tokens on which it may never have been supervised. Inverted maps observed in CLIP-based dense prediction had often been treated as localized defects to repair. The paper instead asks whether any alignment should be expected in the first place.

## Contributions

- Defines three patch-decoding regimes by comparing the mean true-class score on object patches, $S_{\mathrm{obj}}$, with the mean on background patches, $S_{\mathrm{bg}}$: aligned, inverted, and unexplainable.
- Audits ViT classifiers and contrastive vision-language models on PartImageNet++, showing a strong but non-universal alignment bias among classifiers and a consistent inversion bias among the studied contrastive models.
- Uses synthetic classification and contrastive-learning tasks to vary object-to-background noise ratio and other data parameters while holding architectures small and controlled.
- Demonstrates that identical task and data settings can reach different regimes under different random seeds, framing the regime as an implicit optimization bias rather than a deterministic consequence of the loss or distribution.
- Constructs a one-layer toy transformer whose optimal class-token logits remain identical across a family of weights while its patch-token maps become aligned, inverted, or unexplainable.

## Method

For an image with an object mask, the method applies the model's final head to each patch token. A classifier patch receives its true-class logit; a contrastive vision-language model patch receives its cosine similarity to the text embedding of a class prompt. The paper summarizes a model with

$$
\mathcal{A}=\frac{|\{I:S_{\mathrm{obj}}[I]>S_{\mathrm{bg}}[I]\}|}{|\mathcal{I}|}.
$$

It labels $\mathcal{A}\geq 66.7\%$ aligned, $33.3\%\leq\mathcal{A}<66.7\%$ unexplainable, and $\mathcal{A}<33.3\%$ inverted. The primary real-world evaluation uses PartImageNet++, whose masks permit object/background comparisons. Patch tokens are normally decoded from the penultimate layer when final-layer patches do not receive training loss, and from the final layer when they do.

The controlled study embeds a sampled object patch in independent Gaussian background noise. It trains 12-layer ViTs for either supervised classification or contrastive matching while sweeping object-to-background noise ratio and task-specific distribution parameters. The reported sweep covers 66 supervised and 81 contrastive configurations with three seeds per configuration.

The theoretical study uses a one-dimensional image with one randomly positioned Gaussian object token and Gaussian background tokens. A single-head, one-block transformer implements the Bayes-optimal classifier. Varying a scalar $\alpha$ in its value matrix leaves class-token logits unchanged: $\alpha>0$ yields positive expected object-minus-background scores, $\alpha\leq-1$ yields negative expected differences, and increasing $|\alpha|$ drives patch scores toward equality.

## Experiments

Most surveyed classifiers are strongly aligned: for example, ViT-B/16 (ImageNet-1k) has $\mathcal{A}=98.7\%$, and several ViT and DINOv2 variants exceed 94%. This pattern is not universal. ViT-B/16 trained with sharpness-aware minimization has $\mathcal{A}=6.4\%$, DeiT-S/16 has $1.4\%$, and the paper reports high classification accuracy even for non-aligned models. Regime can also vary by class subset and layer within one model.

Every listed contrastive vision-language model is inverted. The table ranges from $\mathcal{A}=22.5\%$ for a class-token SigLIP-B/32 trained by the authors to $1.5\%$ for MetaCLIP-B/16. CLIP-B/16 scores $2.0\%$. Replacing CLIP's batch softmax objective with a SigLIP-style pairwise sigmoid loss does not remove inversion, and all 29 OpenCLIP scaling-law checkpoints remain inverted; greater data and longer training often strengthen rather than eliminate it.

In the synthetic experiments, object-to-background noise ratio is the strongest observed driver. For classifiers, low ratios tend toward alignment, high ratios toward inversion, and ratios near one toward unexplainability. Contrastive models tend toward inversion at both low and high ratios, with alignment near one and unexplainability at intermediate values. These are probabilistic tendencies: different seeds can leave the dominant regime under the same fixed configuration.

The toy construction establishes underdetermination at optimality rather than merely correlation in trained models. Multiple weights produce the same optimal predictions and loss while changing the sign or magnitude of the decoded spatial contrast. Thus neither task performance nor an output-level loss identifies a unique patch-level explanation.

## Limitations

- The empirical scope is gradient-free application of an existing head to patch tokens; the results do not directly establish failures of gradient-based attribution or intervention-based explanation methods.
- $\mathcal{A}$ measures object-versus-background ordering for known masks and class labels. It does not establish that a map is faithful to the computation used for an individual prediction.
- Real-world conclusions are based on the studied checkpoints and PartImageNet++; the analysis does not predict in advance which regime a new model, layer, or class subset will occupy.
- The synthetic models are deliberately small and use stylized Gaussian data, so their regime trends need not transfer quantitatively to natural images.
- The theorem uses a one-dimensional input, one object location, one attention block, and an embedding dimension of at least the number of classes plus one. It proves attainability of all regimes, not the cause of any particular real model's behavior.
- Some decoded patch tokens are not directly constrained by the training loss. The paper checks the same pattern with affected tokens in DINOv2, but the mismatch between head training and head application remains central to how the diagnostic should be interpreted.

## Related Concepts

- [[concepts/patch-token-decoding-explainability|Patch-Token Decoding Explainability]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]]

## Related Papers

- [[papers/discovering-sparse-concept-graphs-for-mechanistic-interpretability-in-vision-transformers|Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]] studies ViT representations with sparse features and interventions; its patch heatmaps are treated as heuristic localization rather than self-validating explanations.
- Belrose et al. (2023), "Eliciting Latent Predictions from Transformers with the Tuned Lens," learns layer-specific translators to correct representational drift rather than assuming the final unembedding is directly valid at every depth.
- Li et al. (2023), "A Closer Look at the Explainability of Contrastive Language-Image Pre-training," documents opposite CLIP visualizations and proposes an architectural correction for dense inference.
- Bousselham et al. (2024), "Grounding Everything: Emerging Localization Properties in Vision-Language Transformers," studies and modifies localization behavior in vision-language transformers.

[[index|Library home]]
