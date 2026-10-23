---
title: "Do Sparse Autoencoders Capture Concept Manifolds?"
type: paper
authors:
  - Usha Bhalla
  - Thomas Fel
  - Can Rager
  - Sheridan Feucht
  - Tal Haklay
  - Daniel Wurgaft
  - Siddharth Boppana
  - Matthew Kowal
  - Vasudev Shyam
  - Owen Lewis
  - Thomas McGrath
  - Jack Merullo
  - Atticus Geiger
  - Ekdeep Singh Lubana
year: null
source_job_id: "f79cf1fd-134f-4d03-beda-1f47967335b8"
tags:
  - sparse-autoencoders
  - representation-geometry
  - mechanistic-interpretability
  - manifold-learning
  - feature-discovery
---

## TL;DR

Sparse autoencoders can theoretically represent a continuous [[concepts/concept-manifolds|Concept Manifold]] with a compact global basis or with localized features that tile its geometry. Across synthetic mixtures and Llama 3.1-8B activations, the studied SAEs instead distribute each manifold over many overlapping, partly redundant features, a fragmented regime the authors call dilution. An Ising model over feature co-activation can recover some coherent feature groups post hoc, but mixed selectivity makes this an incomplete substitute for featurizers designed around geometric objects.

## Research Question

What should it mean for a [[concepts/sparse-autoencoders|Sparse Autoencoder]] to capture a nonlinear concept manifold, which representation regimes can its features realize, and how do current SAE architectures organize such geometry in practice?

## Motivation

The linear representation hypothesis treats concepts as independent directions whose values can be read and manipulated with linear operations. Yet model activations for continuous variables such as days, years, temperature, color, spatial position, and political bias can form structured curves or surfaces. Accurate reconstruction guarantees that an SAE preserves some information about this geometry, but it does not guarantee that the geometry appears in a small, stable, or interpretable feature set. This distinction may explain unstable dictionaries, brittle single-feature steering, and failures of automated feature labeling.

## Contributions

- Defines an additive mixture of manifolds that generalizes additive mixtures of concept directions and distinguishes intrinsic dimension from the dimension of a manifold's ambient linear span.
- Formalizes compact subspace capture as reconstruction by one fixed atom group no larger than the manifold's embedding dimension.
- Separates three SAE organization regimes: compact capture, mutually exclusive local tiling or shattering, and dilution by large groups with overlapping and mixed-selectivity receptive fields.
- Demonstrates the regimes in a synthetic benchmark containing 48 instances of eight manifold types, then evaluates five SAE architectures on Llama 3.1-8B activations.
- Proposes unsupervised manifold discovery from an Ising model of binarized SAE codes, followed by community detection and spectral validation.

## Method

The theoretical model writes a representation as a sparse sum of points drawn from immersed low-dimensional manifolds. For direction-based SAEs, a manifold is compactly captured when a fixed set of decoder atoms spans its ambient subspace and its restricted reconstruction error remains small for every manifold point. The paper contrasts this with local tiling, where different atoms activate on different regions. Pairwise Ising couplings over binarized feature activations characterize consistently co-active atoms with positive interactions, mutually exclusive tiles with negative interactions, and dilution with a mixture of signs across a support much larger than the required embedding dimension.

The synthetic benchmark embeds six variants of each of eight geometries - circles, spheres, tori, Mobius strips, Swiss rolls, helices, disks, and line segments - into 128 dimensions. Observations sum four of 48 manifold instances with small Gaussian noise. TopK SAEs use 512 dictionary atoms and sparsity budgets from 3 to 25. Evaluation includes restricted $R^2$ as atoms are added greedily, support size, and receptive-field spread.

For natural activations, the authors extract the residual stream at layer 19 of Llama 3.1-8B. They train Standard, JumpReLU, TopK, BatchTopK, and Matryoshka SAEs on 500 million tokens from The Pile, using expansion factors 8 and 16 and sparsities 64, 128, and 256. PCA and centroid interpolation first establish smooth geometry and behaviorally effective directions for continuous concepts. The SAE analysis then measures compact reconstruction and feature tuning over those manifolds.

## Experiments

The synthetic experiments exhibit a sparsity-dependent transition among the proposed regimes and a sweet spot for compact subspace capture. Outside that regime, manifold information remains distributed over feature groups and can sometimes be reconstructed post hoc.

On Llama 3.1-8B, the tested SAEs do not compactly capture the evaluated manifolds. Restricted variance explained improves as more features are included but plateaus only after the support grows well beyond the manifold's ambient dimension. Individual features behave as localized detectors with smooth, overlapping tuning curves. For years, some features respond periodically to the ones digit while others encode decade information; for days of the week, receptive fields expose architecture-specific partitions of the ambient space. The joint population therefore preserves geometry that is not legible from isolated atoms.

Decoder cosine similarity and activation-magnitude correlation do not cleanly group supervised color, day, and temperature features. Conditional co-activation and Ising couplings produce clearer block structure. Applied without manifold labels to a BatchTopK SAE, the Ising pipeline recovers groups associated with temperature, color, and political bias and surfaces a candidate geometry related to epistemic uncertainty in scientific contexts.

## Limitations

- The natural-model study uses one model family, one residual-stream layer, one training corpus, and a selected set of continuous concepts; it does not establish that dilution is universal across models, layers, modalities, or data distributions.
- Results cover five established SAE families, but all retain one-dimensional dictionary atoms and reconstruction-centered objectives; they do not evaluate a featurizer that directly represents manifolds as primitives.
- The supervised analyses begin from prompted concept values and predefined templates, so the evaluated geometries need not exhaust naturally occurring representation structure.
- The unsupervised Ising pipeline depends on the quality of the underlying tiling. Mixed-selectivity features can obscure communities, and a recovered low-dimensional group is a hypothesis rather than a semantic or causal guarantee.
- Smooth output changes under centroid interpolation support causal relevance for the tested tasks, but do not show that every discovered manifold is uniquely represented or necessary for model computation.
- Point-based dictionary methods can approximate the joint data manifold but, under the paper's additive-superposition analysis, do not automatically isolate the individual factor manifolds.

## Related Concepts

- [[concepts/concept-manifolds|Concept Manifolds]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/sparse-autoencoder-receptive-fields|Sparse Autoencoder Receptive Fields]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/manifold-steering|Manifold Steering]]

## Related Papers

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]: analyzes how SAE encoder architecture constrains receptive-field geometry and concept selectivity.
- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]]: develops evidence for multidimensional features, including circular calendar representations.
- [[papers/manifold-steering-reveals-the-shared-geometry-of-neural-network-representation-and-behavior|Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior]]: studies interventions that follow curved activation geometry and compares them with behavioral manifolds.
- Michaud, Gorton, and McGrath (2025), "Understanding sparse autoencoder scaling in the presence of feature manifolds": cited related analysis of SAE scaling when concepts have manifold structure.
- Karkada et al. (2026), "Symmetry in language statistics shapes the geometry of model representations": motivates the connection between statistical symmetries and curved representation geometry.

Source scope: supplied parsed Markdown for job `f79cf1fd-134f-4d03-beda-1f47967335b8`. The manuscript supplies a project repository but no publication year, venue, DOI, or arXiv identifier.

[[index|Library home]]
