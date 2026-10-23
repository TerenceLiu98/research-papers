---
title: "The Shape of Addition: Geometric Structures of Arithmetic in Large Language Models"
type: paper
authors:
  - Liuyuan Wen
  - Xun Zhu
  - Lihao Huang
  - Wenbin Li
  - Yang Gao
year: null
source_job_id: "31d49774-86a1-47a7-a76f-aafa7cee348b"
tags:
  - mechanistic-interpretability
  - neural-arithmetic
  - representation-geometry
  - activation-probing
---

## TL;DR

The paper argues that multi-operand addition in Qwen3 and Gemma models is organized around [[concepts/iso-raw-sum-trajectories|Iso-Raw-Sum Trajectories]]: latent paths that preserve a column's raw digit sum while moving between output-digit basins as the carry changes. It models most off-by-one errors as [[concepts/noisy-carry-quantization|Noisy Carry Quantization]], in which noise moves a continuous carry potential across an integer threshold. Probes, native-space measurements, and activation steering support this account, while a dual-stream consistency check improves Qwen3-4B token accuracy from 86.26% to 89.56% at tolerance $\delta=0.1$.

## Research Question

What geometric structure allows an LLM's residual stream to encode the raw sum, carry, correct digit, and generated digit simultaneously, and how does that structure produce characteristic arithmetic errors during multi-operand addition?

## Motivation

Language models can solve difficult mathematical problems yet remain fragile on elementary multi-digit addition. Prior probes can recover correct arithmetic information even when a model emits a wrong digit, but decodability alone does not explain how the internal representation produces a specific failure. The paper seeks a geometric account that connects latent arithmetic variables, off-by-one errors, and causal interventions.

## Contributions

- Identifies [[concepts/iso-raw-sum-trajectories|Iso-Raw-Sum Trajectories]] (IRSTs), which connect states with a shared column-wise raw sum across digit and carry basins.
- Defines a continuous carry potential from lower-order raw sums and proposes [[concepts/noisy-carry-quantization|Noisy Carry Quantization]] as a model of carry leakage and hallucination near integer thresholds.
- Relates probe accuracy to geometric separability: output digit and raw sum are easier to decode than correctness, which behaves like a diffuse boundary-detection problem.
- Tests the geometry with native-space distances, intrinsic-dimension estimates, and trajectory-local activation steering.
- Introduces a dual-stream consistency protocol that combines independently decoded raw-sum and carry-potential signals for inference-time correction.

## Method

For a generated position $p$, the paper distinguishes the raw column sum $r_p$, incoming carry $c_p$, correct digit $s_p$, generated digit $\hat{s}_p$, and latent model estimates of the raw sum and carry. The core experiments use 10,000 sums of three 10-digit integers and final-layer Qwen3-4B residual states, principally at generation position $p=4$. Generation stops at the first incorrect digit so analyzed errors are conditioned on a correct prefix. The target position is locally balanced across carry values 0, 1, and 2.

UMAP with cosine distance visualizes the 2,560-dimensional states alongside digit unembedding vectors. The proposed IRST $T_r$ connects states with the same $r_p$ as their carry changes, threading through adjacent digit basins. PCA, t-SNE, direct native-space cosine distances, and intrinsic-dimensionality estimates serve as checks on the projected geometry.

The carry potential is defined as

$$
\Phi_p=\sum_{j=1}^{P-1-p}\frac{r_{p+j}}{10^j}, \qquad c_p=\lfloor\Phi_p\rfloor.
$$

The model assumes an internal estimate $\hat\Phi_p=\Phi_p+\epsilon$, with $\epsilon\sim\mathcal N(0,\sigma^2)$, followed by flooring. Its predicted off-by-one error probability is the sum of Gaussian tail probabilities for crossing the lower or upper integer boundary. Logistic-regression and MLP probes decode the output, ground truth, correctness, raw sum, discrete carry, and continuous carry potential. A trajectory-local vector between stable centroids tests whether steering in the inferred carry direction changes the selected digit.

For correction, one probe predicts the raw sum and another predicts carry potential. The method preserves the original digit when it is consistent with any carry in a tolerance interval around the estimated potential; otherwise, it replaces the digit with the modular combination of the decoded raw sum and floored potential.

## Experiments

At Qwen3-4B's final layer and $p=4$, balanced-probe accuracy is 98.81% for model output, 98.60% for raw sum modulo 10, 96.84% for input carry, 94.85% for ground truth, and 82.41% for correctness. Quantized carry-potential regression reaches 92.08%. An absolute raw-sum probe over 28 classes reaches 89.35% accuracy and 99.59% AUC, supporting carry error as the dominant, but not exclusive, failure mode.

The conditional off-by-one error rate follows the predicted periodic bathtub shape: error rises near integer carry-potential thresholds and falls near half-integers. The reported Qwen3-4B fit has $R^2=0.80$ and $\sigma\approx0.05$. Estimated noise rises from 0.05 for three terms to 0.12 for four and 0.25 for five. Comparable geometry and bathtub patterns appear for Qwen3-8B and Gemma-3-4B-IT, with cross-model fits around $R^2\geq0.70$.

Native-space profiles reproduce the trajectory ordering without UMAP. Along a representative $T_3$ trajectory, boundary-adjacent errors flip under smaller steering magnitudes than stable states. Layer-wise probes show an abrupt increase in arithmetic decodability around Qwen3-4B layer 24; probes exceed 90% in layers 24-29 while the logit lens remains weak, separating latent arithmetic computation from final vocabulary readout.

On Qwen3-4B, the dual-stream method at $\delta=0.1$ raises token accuracy from 86.26% to 89.56%, corrects 30.46% of errors, and preserves 98.13% of initially correct tokens. A finer tolerance sweep peaks at $\delta=0.12$, with 89.73% token accuracy and 33.00% whole-question accuracy. Hard replacement reaches 89.13%; re-prompting reduces accuracy to 79.90%. The dual-stream method also improves Gemma-3-4B-IT and Qwen3-8B, although hard replacement is better on some metrics. In the analyzed Qwen3-4B errors, 93.19% are off by one.

## Limitations

- The main geometric analysis uses Qwen3-4B, one synthetic addition distribution, single-digit tokenization, and mostly one interior output position. Boundary positions have different error profiles.
- The carry-error interpretation assumes the local raw sum is usually correct. Probe results support that assumption statistically, but also reveal a minority of less structured raw-sum failures.
- UMAP and probing are descriptive evidence rather than a circuit-level localization. Native-space and steering checks strengthen the account but do not establish a complete implementation mechanism.
- The noisy-quantization model is phenomenological: Gaussian additive noise and flooring explain the observed pattern but are not derived from specific network components.
- Results focus on addition. The source explicitly leaves BPE-grouped digits, other arithmetic operations, and systematic scaling laws unresolved.
- Correction uses supervised probes and can overwrite correct outputs. Its best tolerance is selected empirically, and strict consistency at $\delta=0$ lowers whole-question accuracy.
- No publication year or stable paper identifier is present in the supplied Markdown, so the year is left unset.

## Related Concepts

- [[concepts/iso-raw-sum-trajectories|Iso-Raw-Sum Trajectories]]
- [[concepts/noisy-carry-quantization|Noisy Carry Quantization]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]]
- [[concepts/manifold-steering|Manifold Steering]]

## Related Papers

- [[papers/arithmetic-in-the-wild-llama-uses-base-10-addition-to-reason-about-cyclic-concepts|Arithmetic in the Wild: Llama uses Base-10 Addition to Reason About Cyclic Concepts]] studies a different arithmetic geometry based on Fourier features and causal interventions, highlighting that representation geometry and computation geometry need not coincide.
- Quirke and Barez (2024), "Understanding Addition in Transformers," supplies a symbolic and mechanistic precedent for transformer addition.
- Kantamneni and Tegmark (2025), "Language Models Use Trigonometry to Do Addition," provides a geometric account based on periodic numerical representations.
- Sun, Stolfo, and Sachan (2025), "Probing for Arithmetic Errors in Language Models," motivates decoding errors and correct answers from internal states.

Code repository listed in the supplied paper: [RL-MIND/Shape-of-Addition](https://github.com/RL-MIND/Shape-of-Addition).

[[index|Library home]]
