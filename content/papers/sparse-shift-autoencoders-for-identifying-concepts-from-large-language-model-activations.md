---
title: Sparse Shift Autoencoders for Identifying Concepts from Large Language Model Activations
type: paper
authors:
  - Shruti Joshi
  - Andrea Dittadi
  - Sébastien Lachapelle
  - Dhanya Sridhar
year: 2026
arxiv: "2502.12179"
tags:
  - sparse-autoencoders
  - representation-identifiability
  - activation-steering
  - mechanistic-interpretability
---

## TL;DR

Sparse Shift Autoencoders (SSAEs) reconstruct differences between paired LLM activations rather than individual activations. When each pair changes an unknown sparse subset of concepts, the paper proves that an ideal SSAE recovers the varying concepts up to permutation and scaling; its decoder columns are therefore valid single-concept steering directions under the paper's assumptions. Experiments on synthetic, semi-synthetic, and language datasets report more identifiable directions and generally more accurate steering than unsupervised SAE baselines, especially when concepts are correlated.

## Research Question

Can steering directions for individual concepts be recovered without concept labels or pairs constructed to differ in exactly one known concept, while retaining an identifiability guarantee strong enough to support steering?

## Motivation

Standard [[concepts/sparse-autoencoders|Sparse Autoencoders]] encourage sparse latent features, but their objectives need not uniquely recover the concepts that generated an activation. Equivalent solutions may entangle concepts differently, making decoder directions unstable or causing an intervention to alter unrelated properties. Supervised contrastive steering avoids some ambiguity but requires labels or carefully controlled single-concept pairs.

## Contributions

- Introduces SSAEs, which encode and reconstruct activation differences from pairs that may vary in multiple unknown concepts, but not all concepts.
- Formalizes recovery under the linear representation hypothesis and proves permutation-scaling identifiability when the varying-concept mixing matrix is injective, shift support is sufficiently diverse and nondegenerate, and the sparsity budget matches the expected true shift sparsity.
- Connects the theorem to [[concepts/model-steerability|Model Steerability]]: each identified decoder column changes one concept, up to the unavoidable permutation and scale ambiguity.
- Evaluates concept recovery and steering on Gemma-2-2B, Pythia-70M, and an intermediate-layer study with Llama-3.1-8B, using synthetic, semi-synthetic, and real language data.

## Method

For a pair of texts $(x, \tilde{x})$, the method forms the activation difference $\delta^z=f(\tilde{x})-f(x)$. An affine encoder maps this difference to a latent estimate of the concept shift, and an affine decoder reconstructs $\delta^z$. Training minimizes squared reconstruction error subject to an expected sparsity constraint; the implementation relaxes the theoretical $\ell_0$ constraint to an $\ell_1$ constraint and solves the resulting constrained optimization problem with ExtraAdam.

Without sparsity, the representation is identifiable only up to an arbitrary invertible linear transformation, which is insufficient to assign decoder columns to individual concepts. With the stated support assumptions and the correct sparsity budget, the paper shows that the remaining transformation must be a permutation followed by coordinate-wise scaling. Adding a decoder column to an activation then implements a shift in exactly one underlying concept within the model.

## Experiments

The evaluation measures recovery with mean correlation coefficient (MCC), which is invariant to permutation and scaling, and steering accuracy with cosine similarity to held-out target activation differences. Baselines include GemmaScope or PythiaSAE, ReLU, JumpReLU, and TopK SAEs, plus supervised linear probes.

- On Gemma embeddings, SSAE has the highest MCC among unsupervised methods on all eight reported datasets. The largest separation is on correlated concepts, CORR(2,1): $0.9047 \pm 0.0207$ for SSAE versus $0.5760$ for GemmaScope and at most $0.5542$ for the trainable SAE baselines.
- The Pythia results show a similar overall pattern, although SSAE is not best on every real-world dataset; PythiaSAE exceeds it on Sycophancy, and ReLU-SAE is close on Refusal.
- Higher MCC generally corresponds to greater cosine similarity with target embeddings. SSAE's language direction also transfers from occupation words to out-of-domain household-object words better than the SAE baselines in the reported test.
- In Bias in Bios generation, adding the learned gender direction shifts generations toward female indicators at lower strengths than GemmaScope in the reported prompts.
- Purely synthetic experiments with known factors produce SSAE MCC values from $0.993$ to $0.999$, compared with $0.769$ to $0.873$ for the unconstrained affine baseline.

## Limitations

- The guarantee assumes a linear concept-to-activation map, an injective mixing matrix for varying concepts, sufficiently rich shift support, nondegenerate conditional shift distributions, and a sparsity budget equal to the true expected $\ell_0$ sparsity.
- The implementation substitutes an $\ell_1$ constraint for the theorem's $\ell_0$ constraint, so the exact theoretical result does not directly cover training practice.
- Real data do not reveal atomic ground-truth concepts, and MCC can be misleading when the encoder dimension exceeds the number of varying concepts: the paper observes lower MCC despite improved steering in that regime.
- Pairing samples is weaker supervision than labeled single-concept contrasts, but it still imposes a data construction choice. The empirical study uses modest datasets and limited open-ended generation tests.
- The authors frame the experiments as validation of the identifiability result, not evidence that SSAEs universally outperform SAEs or are ready for large-scale alignment interventions.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/model-steerability|Model Steerability]]
- [[Disentangled Representations]]
- [[Independent Component Analysis]]

## Related Papers

- [[Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]]
- Roeder, Metz, and Kingma (2021), "On Linear Identifiability of Learned Representations."
- Lachapelle et al. (2023), "Synergies between Disentanglement and Sparsity: Generalization and Identifiability in Multi-Task Learning."
- Xu et al. (2024), "A Sparsity Principle for Partially Observable Causal Representation Learning."
- Wu et al. (2025), "AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders."

[[index|Library home]]
