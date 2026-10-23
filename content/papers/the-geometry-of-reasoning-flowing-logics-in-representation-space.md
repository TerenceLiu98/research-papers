---
title: "The Geometry of Reasoning: Flowing Logics in Representation Space"
type: paper
authors:
  - Yufa Zhou
  - Yixiao Wang
  - Xunjian Yin
  - Shuyan Zhou
  - Anru R. Zhang
year: null
source_job_id: "e3ece426-d992-4d44-84ae-3ed987d27907"
tags:
  - mechanistic-interpretability
  - representation-geometry
  - logical-reasoning
  - chain-of-thought
---

## TL;DR

The paper treats a stepwise reasoning trace as a context-cumulative trajectory in an LLM's hidden-state space. In a controlled multilingual dataset, raw positions primarily reflect topic and language, while consecutive differences and Menger curvature are substantially more similar for sequences sharing a logical scaffold. Shuffling inference steps largely removes these higher-order similarities. The results support a descriptive geometric signature of logical order, but they do not establish a continuous internal computation, a causal mechanism, or a relationship to answer accuracy.

## Research Question

When the same natural-deduction structure is expressed through different topics and languages, does an LLM's representation trajectory preserve geometric properties that track the shared logic rather than the surface semantics?

## Motivation

Static representations mix semantic content, language, and reasoning structure. The authors instead study how a representation changes as successive reasoning steps are appended to the context. This makes position, velocity, and curvature candidate measurements for separating the content of a statement from the structure of the deduction that moves between statements.

## Contributions

- Formalizes context-cumulative reasoning traces as trajectories in representation space and relates discrete step differences to the velocity of a hypothesized smooth interpolation.
- Proposes Menger curvature as a second-order descriptor that incorporates both directional and distance changes between adjacent trajectory segments.
- Builds a controlled corpus that holds abstract logical scaffolds fixed while varying topical and linguistic carriers.
- Compares position, velocity, and curvature similarities across logical structure, topic, and language, including an order-shuffling control and several Qwen and LLaMA model variants.

## Method

For a prompt and an ordered sequence of reasoning steps, each prefix is extended with the next complete step. The representation of step $t$ is obtained by mean-pooling final-transformer-layer hidden states over that step's tokens, producing a trajectory $Y=(y_1,\ldots,y_T)$. Position similarity is the mean cosine similarity between aligned $y_t$ values. Velocity uses first differences $y_t-y_{t-1}$ and compares them by cosine similarity. Curvature is computed from consecutive triples using Menger curvature, the reciprocal circumradius, and curvature sequences are compared with Pearson correlation.

The dataset is generated in two stages: GPT-5 first produces abstract symbolic logic templates and then rewrites them into topic- and language-specific sequences while preserving step order and dependencies. It contains 30 logical structures of 8--16 steps, 20 topics, four languages (English, Chinese, German, and Japanese), and 2,430 sequences. Comparisons group trajectory pairs by common logic, topic, or language.

The theoretical account assumes that the sampled prefix representations lie on an underlying $C^1$ curve. The paper supplies a relaxed-prefix interpolation construction and finite-difference smoothness diagnostics, but explicitly notes that differentiability cannot be empirically verified from discrete language inputs.

## Experiments

The main table evaluates Qwen1.5 0.5B, Qwen2 0.5B, Qwen3 at 0.6B, 1.7B, and 4B, and LLaMA3 8B. Across models, language is the strongest grouping at the position level, with similarity from 0.74 to 0.89. Logic becomes the strongest grouping for velocity, with similarity from 0.15 to 0.19 versus 0.06--0.09 for topic or language, and for curvature, with correlation from 0.46 to 0.58 versus 0.10--0.17 for the surface-carrier groupings.

For Qwen3 0.6B, logic-grouped position, velocity, and curvature scores are 0.26, 0.17, and 0.53. Randomly shuffling the logical steps changes these to 0.30, 0.02, and 0.02. The preserved position score and collapsed difference-based scores show that the higher-order measurements depend on step order rather than merely on the collection of sentences. Heatmaps for a dataset subset visually reproduce the same separation, and the qualitative pattern remains stable across the tested model sizes and families.

These measurements show an association between controlled logical scaffolds and trajectory geometry. They do not demonstrate that the geometry causes correct reasoning or that the models execute the natural-deduction rules used to construct the data.

## Limitations

- The smooth-flow account is a modeling hypothesis over discrete samples. A smooth interpolant can be constructed, but this does not show that the model computes in continuous time or uniquely identify an intrinsic curve.
- The work studies representations of supplied reasoning sequences, not generation. It therefore does not connect its geometric measures to answer correctness, generation quality, or task difficulty.
- Similarity is observational. No intervention establishes that velocity or curvature implements logical inference, and the framework does not map individual inference rules to vector-field operators.
- The corpus is synthetically generated with GPT-5 from fixed templates. Template artifacts or systematic regularities in the rewriting process could contribute to cross-carrier similarity.
- Evidence covers a limited set of Qwen and LLaMA checkpoints and four languages. Stable aggregate patterns across these models do not establish the proposed universal representational law.
- Mean pooling the final layer is one extraction choice; the paper does not establish invariance across layers, pooling rules, token selections, or coordinate transformations.
- The supplied manuscript does not provide a publication year, stable paper identifier, or publication venue.

## Related Concepts

- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/dynamical-interpretability|Dynamical Interpretability]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]

## Related Papers

Works discussed in the supplied paper:

- Park, Choe, and Veitch (2024), "The Linear Representation Hypothesis and the Geometry of Large Language Models": provides the linear representation view that the paper extends toward curved trajectories.
- Modell, Rubin-Delanchy, and Whiteley (2025), "The Origins of Representation Manifolds in Large Language Models": motivates the low-dimensional manifold account of learned representations.
- Huh et al. (2024), "The Platonic Representation Hypothesis": supplies the proposed shared-geometry interpretation invoked for the cross-model stability result.
- Wang et al. (2024), "Understanding Reasoning Ability of Language Models From the Perspective of Reasoning Paths Aggregation": represents the graph-based account contrasted with cumulative geometric flows.

Related library reading, without implying citation by this paper:

- [[papers/truth-as-a-trajectory-what-internal-representations-reveal-about-large-language-model-reasoning|Truth as a Trajectory: What Internal Representations Reveal About Large Language Model Reasoning]] learns a validity classifier from token-by-layer trajectories and explicitly cites this paper as motivation.
- [[papers/trajectory-geometry-of-transformer-representations-across-layers|Trajectory Geometry of Transformer Representations Across Layers]] measures hidden-state paths over transformer depth rather than over cumulative reasoning steps.
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]] studies curvature over environment time and connects it to latent planning.

[[index|Library home]]
