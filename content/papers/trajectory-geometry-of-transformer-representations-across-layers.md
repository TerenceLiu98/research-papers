---
title: Trajectory Geometry of Transformer Representations Across Layers
type: paper
authors:
  - Vishal Pandey
  - Gopal Singh
  - Yacine Mahdid
year: null
source_job_id: "1e71d6c1-0805-4471-ad75-6905317d32ed"
tags:
  - mechanistic-interpretability
  - representation-learning
  - transformer-dynamics
---

## TL;DR

The paper measures transformer hidden-state paths across depth using length, turning angles, semantic separation, and cosine similarities. Across GPT-2 Small, TinyLlama-1.1B, and Qwen2.5-1.5B, it reports stronger curvature for reasoning prompts and structured semantic changes across layers. These are observational findings on 150 controlled prompts. A figure explicitly uses mock bifurcation data, and inconsistencies in extraction and numerical reporting limit how confidently the disambiguation results can be interpreted.

## Research Question

Can the geometry of hidden-state trajectories across layers reveal semantic organization and task-dependent computation without training feature probes?

## Motivation

Layerwise probes and circuit analyses describe particular features or components. [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]] instead summarizes the ordered path of a representation through the whole network. The framework draws inspiration from neural population dynamics while making no claim of biological equivalence.

## Contributions

- Defines five geometric measurements computed in the full hidden space, with dimensionality reduction reserved for visualization.
- Reports semantic clustering, task-dependent curvature, contextual separation of ambiguous words, and three phases of adjacent-layer similarity across three model families.
- Describes random-label, random-weight, shuffled-layer, and multiple-projection controls.
- Identifies a source repository, `github.com/Vishal-sys-code/latent-trajectories`, for extraction, metrics, and visualization; repository contents were not independently checked for this summary.

## Method

For each prompt, the principal definition averages non-padding token states at each layer to obtain $h^{(l)}\in\mathbb R^d$. The ordered trajectory includes the embedding layer: $\tau=(h^{(0)},\ldots,h^{(L)})$. Section 4.2 also specifies final-content-token extraction for single-token target concepts, whereas Sections 3.1 and 4.3 describe mean pooling; this distinction matters for contextual disambiguation.

With $v^{(l)}=h^{(l)}-h^{(l-1)}$, the main path metrics are

$$
\mathcal L(\tau)=\sum_{l=1}^{L}\|v^{(l)}\|_2,
\qquad
\bar\kappa(\tau)=\frac{1}{L-1}\sum_{l=1}^{L-1}
\arccos\frac{v^{(l)}\cdot v^{(l+1)}}{\|v^{(l)}\|_2\|v^{(l+1)}\|_2}.
$$

The semantic convergence index is $\mathrm{CI}(l)=D_{\mathrm{between}}(l)-D_{\mathrm{within}}(l)$ for known semantic categories. Section 5.1 clarifies that reported CI uses L2-normalized representations. A positive value indicates relative category separation; it does not alone demonstrate absolute within-category contraction or dynamical attraction. Adjacent-layer cosine similarity measures directional persistence, while representational stability is the same-layer cosine similarity between a prompt and its lexical variant.

PCA is fitted on layer-zero representations and reused across depth; UMAP follows the PCA reduction. The paper also describes t-SNE checks. These projections illustrate paths but do not enter numerical metrics. Statistical comparisons use two-sided Mann-Whitney U tests, Benjamini-Hochberg correction, 10,000 bootstrap resamples, and Cohen's d calculated on rank-transformed values.

## Experiments

The models have 12, 22, and 28 layers respectively. Five prompt families contain 30 prompts each: semantic categories, lexical variations, analogies, multi-step reasoning, and ambiguous concepts. Semantic categories comprise animals, vehicles, and emotions; the ambiguity family contains 15 contextual homograph pairs.

The following values are reported in Table 4, rather than independently reproduced:

| Measurement | GPT-2 Small | TinyLlama | Qwen2.5 |
| --- | --- | --- | --- |
| Peak semantic CI | 0.41 +/- 0.03 | 0.58 +/- 0.04 | 0.53 +/- 0.03 |
| Peak CI with random labels | 0.02 +/- 0.01 | 0.03 +/- 0.01 | 0.02 +/- 0.01 |
| Multi-step reasoning curvature, radians | 0.78 | 0.83 | 0.71 |
| Lexical-variation curvature, radians | 0.31 | 0.29 | 0.27 |
| Reported ambiguity separation ratio | 5.6x | 4.9x | 5.1x |

The reasoning-versus-lexical curvature differences have reported $p<0.001$ across models. Under random weights, family differences shrink below 0.05 radians ($p=0.41$). Table 6 gives analogy curvatures of 0.61, 0.65, and 0.58 radians, intermediate between lexical variations and multi-step reasoning.

The authors interpret adjacent-layer similarity as encoding in the first quarter of depth, elaboration through the middle half, and output preparation in the final quarter. For GPT-2, the reported similarity ranges are 0.35-0.55, 0.70-0.85, and 0.60-0.70 respectively. Random-weight similarity remains above 0.92. The computational meanings of these phases are interpretations, not intervention-tested assignments.

Random labels remove category structure; shuffled layers remove ordered trends; PCA, UMAP, and t-SNE provide visual checks. Shuffling does not erase a layer's category distances, and projection agreement is not an independent validation of full-space numerical results. Matched unambiguous contexts reportedly have a separation ratio of 1.1x, but the ambiguity evidence has the provenance and reporting issues below.

## Limitations

- All evidence is observational. Attractor language, curvature as a complexity estimator, and intervention-layer recommendations are hypotheses; no activation-patching experiment establishes causal effects on behavior.
- Three decoder-only models of at most 1.5B parameters and 150 narrow prompts do not establish universal phases or generalization to long contexts, multilingual inputs, or larger architectures.
- Pooling can hide token-specific dynamics. The mixed pooling descriptions leave the exact extraction used for ambiguity comparisons unclear. Euclidean geometry depends on representation coordinates and normalization.
- Figure 5 explicitly describes a 6.5x bifurcation ratio in **mock data**. This visualization cannot independently substantiate the empirical ratios in Table 4. Section 5.3 gives GPT-2 distances of 0.11 and 0.67, whose ratio is approximately 6.1 rather than the stated 5.6; it also describes onset near layer 5 of 12 while claiming roughly 20-25% depth.
- Section 5.2 gives an analogy-curvature range of 0.54-0.61, inconsistent with Table 6's 0.58-0.65. The abstract groups analogy and reasoning under 0.71-0.83, although those values correspond to multi-step reasoning in the tables. This page keeps the table-specific distinctions.
- Probe-free does not mean category-free: semantic CI requires category assignments, and task comparisons depend on designed prompt families. No demonstrated downstream accuracy or calibrated difficulty-prediction result is supplied.
- Publication year, venue, and a stable paper identifier are absent from the supplied Markdown; year is left unset.

## Related Concepts

- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: a related use of depthwise trajectories for training, measured in vocabulary-prediction space.
- [[concepts/attribution-patching|Attribution Patching]]: estimates local intervention effects, complementing observational geometry.

## Related Papers

Works discussed in the supplied paper:

- Kornblith et al. (2019), "Similarity of Neural Network Representations Revisited": representational similarity via CKA.
- Huh et al. (2024), "The Platonic Representation Hypothesis": a proposed shared representation structure, invoked here as a possible interpretation rather than a confirmed conclusion.
- Meng et al. (2022), "Locating and Editing Factual Associations in GPT": causal interventions as a direction beyond descriptive geometry.

Related library reading, without implying citation by this paper:

- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] studies sensitivity and propagation of activation interventions.
- [[papers/beyond-logits-aligning-feature-dynamics-for-effective-knowledge-distillation|Beyond Logits: Aligning Feature Dynamics for Effective Knowledge Distillation]] aligns intermediate predictions and their depthwise changes.
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]] regularizes turning angles over environment time, a different trajectory axis and purpose.

[[index|Library home]]
