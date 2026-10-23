---
title: Noisy Carry Quantization
type: concept
aliases:
  - Noisy Quantization Model of Carry
  - Carry Potential Quantization
tags:
  - neural-arithmetic
  - mechanistic-interpretability
  - quantization
---

## Overview

Noisy carry quantization models an LLM's incoming carry as the discretization of a continuous latent carry potential. The potential summarizes lower-order column sums; additive estimation noise can push it across an integer boundary before flooring. The model therefore predicts that arithmetic errors concentrate near carry thresholds and are usually off by one.

## Key Ideas

- **Carry can arise from a continuous statistic.** For generation position $p$, a decimal carry potential can be written as $\Phi_p=\sum_{j\geq1}r_{p+j}/10^j$, with the exact carry given by $\lfloor\Phi_p\rfloor$.
- **Threshold distance controls risk.** Under $\hat\Phi_p=\Phi_p+\epsilon$ with Gaussian noise, crossing the lower threshold loses one carry unit and crossing the upper threshold adds one. Error probability is highest near integers and lowest near half-integers, producing a periodic bathtub curve.
- **Noise level is task-conditional.** The fitted scale $\sigma$ summarizes uncertainty for a particular model and task. It is not an architecture-independent cognitive constant and can increase with operand count or sequence difficulty.
- **Raw-sum failures are a separate mode.** The model explains errors caused by misquantized carry when the local column sum remains available. It does not imply that every arithmetic error is a carry error.
- **Tolerance trades correction for preservation.** An inference-time consistency check can accept every carry produced by a neighborhood around the estimated potential. A wider neighborhood avoids false corrections near thresholds but also leaves more genuine errors unchanged.
- **A good fit remains phenomenological.** A bathtub-shaped error curve supports threshold noise, but does not by itself identify where the noise originates or prove that neural computation literally adds independent Gaussian noise.

## Important Papers

- [[papers/the-shape-of-addition-geometric-structures-of-arithmetic-in-large-language-models|The Shape of Addition: Geometric Structures of Arithmetic in Large Language Models]] formulates the carry-potential model, fits its error curve across Qwen3 and Gemma models, and uses raw-sum/carry consistency for inference-time correction.

## Related Concepts

- [[concepts/iso-raw-sum-trajectories|Iso-Raw-Sum Trajectories]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]]
- [[concepts/manifold-steering|Manifold Steering]]
