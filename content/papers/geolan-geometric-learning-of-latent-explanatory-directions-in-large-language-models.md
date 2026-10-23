---
title: "GeoLAN: Geometric Learning of Latent Explanatory Directions in Large Language Models"
type: paper
authors:
  - Tianyu Bell Pan
  - Damon L. Woodard
year: null
source_job_id: "b237c54a-c4ea-43d0-a1aa-3565bf4aab3f"
tags:
  - mechanistic-interpretability
  - representation-geometry
  - geometric-regularization
  - large-language-models
---

## TL;DR

GeoLAN regularizes language-model hidden states and attention during training to encourage isotropic representations and higher-rank attention. Across Gemma-3 1B, 4B, and 12B and Llama-3-8B, the reported effects are strongly scale-dependent: Llama-3-8B shows the clearest geometric improvement, Gemma-3-4B shows improved perturbation stability, Gemma-3-1B can become less isotropic, and Gemma-3-12B trades a small bias reduction for lower clean accuracy. The results support geometry as a controllable training target, but not a scale-independent route to interpretability.

## Research Question

Can geometric measure-theory ideas formalize representation collapse and yield differentiable training losses that make LLM representations more isotropic, decomposable, stable, and causally useful without sacrificing task performance?

## Motivation

Post-hoc interpretability methods attempt to recover structure after training, while superposition and anisotropy can make the underlying features difficult to separate. GeoLAN instead treats latent geometry as a training objective. It models token states across depth as trajectories surrounded by tubes and adapts non-clustering conditions from Kakeya theory to discourage many semantic trajectories or attention heads from concentrating in the same directions.

## Contributions

- Defines token trajectories, token tubes, and layerwise representation fields, then proposes Semantic Wolff axioms for limiting hidden-state and attention concentration.
- States a Semantic Stickiness Theorem connecting idealized non-clustering conditions to finite grain decomposition, bounded grain overlap, perturbation stability, and linear accessibility.
- Introduces two differentiable surrogates: Katz-Tao Convex-Wolff (KT-CW) for hidden-state isotropy and Katz-Tao Attention (KT-Attn) for attention spectral entropy.
- Evaluates geometry, probe efficiency, perturbation stability, activation patching, MMLU performance, and CrowS-Pairs bias across four model sizes and four random seeds.

## Method

For each token, discrete hidden states across transformer depth are interpolated as a trajectory. A radius around that trajectory forms a tube, and the tubes at a layer form a representation field. The proposed stickiness conditions limit tube concentration in convex regions and headwise concentration of query directions. The theorem is conditional on these idealized axioms; it does not establish that the practical losses make a trained model satisfy them exactly.

KT-CW samples 64 random unit directions per batch and penalizes deviation of normalized hidden-state projection variance from the isotropic value $1/d$. KT-Attn normalizes each attention matrix's singular values into a distribution and penalizes the gap between its spectral entropy and the maximum $\log d_k$. The total objective adds both layerwise penalties to cross-entropy loss. Their weights are annealed over the first 500 steps to targets $\lambda_1=10^{-3}$ and $\lambda_2=10^{-2}$.

Models are fine-tuned on a 10-billion-token subset of C4 with AdamW, learning rate $2\times10^{-5}$, bf16, sequence length 2048, and four seeds. The standard baseline uses no weight decay; a control uses weight decay 0.10; GeoLAN uses the two geometric penalties without weight decay.

## Experiments

The strongest geometric result is for Llama-3-8B. Against the baseline, average top-10 cone concentration decreases with reported Cohen's $d=-1.24$ and $p=0.0273$. Against the weight-decay control, the main text reports $d=-1.33$ for cone concentration and $d=0.85$ for IsoScore. PCA probe efficiency also improves, although the main text and appendix report different comparison-specific effect sizes ($0.97$ and $0.56$ respectively).

The behavioral results are mixed. Gemma-3-4B gains 0.75 percentage points of MMLU clean accuracy over the control (0.60 versus 0.59) and shows more stable TruthfulQA examples under paraphrase and synonym perturbations, but the stability comparison is near the conventional significance threshold ($d=1.12$, $p=0.0526$ versus control). Activation-patching experiments on 2,000 MMLU examples find corrupted accuracy statistically comparable to the control across models; this is a null result about retained robustness, not evidence that GeoLAN improves causal restoration.

The scale extremes expose trade-offs. Gemma-3-1B increases cone concentration and decreases IsoScore, consistent with geometric constraints conflicting with superposition used for compression. Gemma-3-12B reduces the CrowS-Pairs stereotype rate relative to the baseline by 0.0065 ($d=-0.38$, $p=0.0065$), but the comparison with the weight-decay control is not significant ($p=0.2420$), and clean MMLU accuracy declines by 0.8 percentage points relative to that control ($d=-0.94$, $p=0.0663$ in the table).

## Limitations

- Benefits do not generalize monotonically with scale: the 1B model's geometry worsens, while the 12B model loses clean accuracy and perturbation stability.
- The empirical study covers four base models, one continued-training corpus, four seeds, and a fixed regularization schedule. It does not locate a general capacity threshold or establish transfer to other architectures and training regimes.
- Isotropy, probe efficiency, and readable grains are proxies for interpretability. Improved linear accessibility does not by itself establish that a model uses the decoded factor, and the activation-patching study reports no improvement over the control.
- Grain orientations vary across seeds for Llama-3-8B, so global isotropy does not provide neuron- or direction-level alignment between independently trained models.
- The fairness result is limited to CrowS-Pairs and is significant against the unregularized baseline but not against the weight-decay control. It should not be generalized to broad fairness improvement.
- KT-CW and singular-value estimation reportedly reduce training throughput by approximately 15-20%, limiting scalability.
- The supplied Markdown gives no publication year, venue, stable identifier, public code location, or enough implementation detail for an independent reproduction; the year is therefore left unset.

## Related Concepts

- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/neural-manifold-packing|Neural Manifold Packing]]

## Related Papers

Works discussed in the supplied paper include:

- Rudman et al. (2022), "IsoScore: Measuring the Uniformity of Embedding Space Utilization": the isotropy metric used in the evaluation.
- Machina and Mercer (2024), "Anisotropy Is Not Inherent to Transformers": evidence that transformer anisotropy can vary with training and architecture.
- Wang and Zahl (2025), "Volume Estimates for Unions of Convex Sets, and the Kakeya Set Conjecture in Three Dimensions": the geometric inspiration for stickiness and tube non-clustering.
- Cunningham et al. (2023), "Sparse Autoencoders Find Highly Interpretable Features in Language Models": a post-hoc feature-decomposition approach contrasted with training-time geometry.

Related library reading, without implying citation by this paper:

- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]] measures hidden-state paths observationally rather than regularizing them during training.
- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] studies how post-hoc encoder design imposes its own geometric assumptions.
- [[papers/spectral-superposition-a-theory-of-feature-geometry|Spectral Superposition: A Theory of Feature Geometry]] provides a related account of feature packing and superposition.

[[index|Library home]]
