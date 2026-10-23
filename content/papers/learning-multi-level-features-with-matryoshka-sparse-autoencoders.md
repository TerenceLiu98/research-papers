---
title: Learning Multi-Level Features with Matryoshka Sparse Autoencoders
type: paper
authors:
  - Bart Bussmann
  - Noa Nabeshima
  - Adam Karvonen
  - Neel Nanda
year: null
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - hierarchical-representations
  - feature-disentanglement
---

## TL;DR

Matryoshka sparse autoencoders train one ordered latent dictionary through several nested reconstruction objectives. Smaller prefixes must reconstruct activations independently, encouraging early latents to represent broad concepts while later latents specialize. Across toy data, TinyStories, and Gemma-2-2B, the method reduces feature absorption, splitting, and composition and improves several concept-isolation evaluations, at the cost of slightly worse reconstruction and about 50% more training time in the reported five-prefix setup.

## Research Question

Can a single sparse autoencoder preserve useful features at multiple levels of abstraction as its dictionary grows, rather than replacing broad features with fragmented, absorbed, or composite ones?

## Motivation

Standard [[concepts/sparse-autoencoders|Sparse Autoencoders]] optimize reconstruction under a flat sparsity constraint. Larger dictionaries can exploit their added capacity by replacing a general feature with specialized latents, leaving the general feature absent or with systematic blind spots. This makes scaling unreliable for probing, steering, and causal feature interventions, while training separate SAEs at many widths is expensive.

## Contributions

- Introduces [[concepts/matryoshka-sparse-autoencoders|Matryoshka Sparse Autoencoders]], which jointly train nested prefixes of one ordered dictionary.
- Evaluates the architecture on a controlled hierarchical toy model, a four-layer TinyStories model, and layer-12 residual-stream activations from Gemma-2-2B.
- Reports reduced feature absorption and splitting, lower similarity among decoder directions, and stronger sparse-probing and targeted concept-removal performance than matched SAE baselines.
- Studies prefix weighting, gradient isolation, the number of nested groups, randomly sampled prefix sizes, and the performance of individual sub-SAEs.

## Method

For maximum dictionary width $m$, the method chooses nested widths $m_1 < \cdots < m_n=m$. The encoder computes one sparse feature vector, but training reconstructs the input from every prefix $f_{0:m_i}$ and sums the corresponding reconstruction losses. Because early latents participate in more objectives and must support small dictionaries on their own, they are pressured to capture broadly useful structure; later groups can add more specific features.

The Gemma-2-2B experiments use BatchTopK activation, fixed nested widths, and equal weighting of prefix losses. Models are trained on 500 million tokens from The Pile using layer-12 residual-stream activations. The main scaling comparison covers dictionary widths of approximately 4K, 16K, and 65K and average activity levels from 20 to 320 latents per token.

## Experiments

### Controlled and qualitative studies

On a synthetic tree of hierarchical binary features, vanilla SAEs develop parent-feature blind spots when child features occur, whereas Matryoshka SAEs preserve the parent activations. In a four-layer TinyStories model, nested dictionaries produce qualitative feature trees in which broader features at smaller widths refine into more specific features at larger widths. These trees are exploratory: their directed masked-cosine construction assigns multi-parent nodes to one parent for visualization and is not a complete account of model structure.

### Gemma-2-2B results

At average $L_0=40$, Matryoshka SAEs explain 70% of activation variance versus 72% for BatchTopK. Despite this reconstruction gap, downstream language-model cross-entropy becomes comparable at larger activity levels.

The first-letter evaluation reports an absorption rate of 0.05 for Matryoshka versus 0.49 for BatchTopK at $L_0=40$. At the same sparsity, Matryoshka uses one latent per first-letter feature on average, while BatchTopK uses three. Matryoshka also outperforms the evaluated baselines on Targeted Probe Perturbation and spurious-correlation removal, leads sparse probing at lower sparsities, and remains ahead of BatchTopK across the tested sparsity range.

Lower average maximum cosine similarity between decoder vectors, together with a meta-SAE analysis, suggests less shared or composed information among Matryoshka latents. Automated interpretability scores are comparable to BatchTopK rather than clearly superior. Across 4K, 16K, and 65K widths, most reported Matryoshka metrics improve or remain stable, while several alternatives deteriorate.

### Ablations and negative results

Equal prefix-loss weighting preserves feature-quality gains better than weighting losses toward larger dictionaries, although weighted training improves reconstruction. Detaching gradients between successive prefix reconstructions degrades loss recovery, sparse probing, and spurious-correlation removal. Three nested groups favor reconstruction at some cost to feature quality; ten groups slightly improve absorption but substantially worsen reconstruction and automated interpretability. Random prefix sampling performs similarly or slightly worse than fixed sizes. ChessGPT evaluations show little separation at low activity and some Matryoshka degradation at high activity.

## Limitations

- Nested objectives slightly reduce reconstruction fidelity, which may matter when precise activation recovery is the primary requirement.
- Five nested dictionaries increase reported training time by roughly 50%.
- Most evidence comes from automated metrics and one main language model and layer; human interpretability and practical analysis workflows are not directly evaluated.
- First-letter probes and decoder cosine similarity measure selected failure modes rather than establishing a complete hierarchy or causal semantics for every latent.

## Related Concepts

- [[concepts/matryoshka-sparse-autoencoders|Matryoshka Sparse Autoencoders]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Feature absorption
- Feature splitting
- Feature composition
- Hierarchical representation learning

## Related Papers

- [[papers/beyond-matryoshka-revisiting-sparse-coding-for-adaptive-representation|Beyond Matryoshka: Revisiting Sparse Coding for Adaptive Representation]]
- [[papers/analyzing-hierarchical-structure-in-vision-models-with-sparse-autoencoders|Analyzing Hierarchical Structure in Vision Models with Sparse Autoencoders]]
- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]

[[index|Library home]]
