---
title: Tensor Core Reformulation of Non-GEMM Computations
type: concept
tags:
  - tensor-cores
  - gpu-optimization
  - mixed-precision
---

## Overview

Tensor Core reformulation expresses a computation that is not originally written as matrix multiplication in terms of small matrix multiply-accumulate operations. A useful mapping exposes reusable factors, batches enough independent work, and controls numerical error at the operand precision used by the implementation. [[TC-GS: A Faster Gaussian Splatting Module Utilizing Tensor Cores]] demonstrates this approach for Gaussian opacity evaluation in rendering.

## Key Ideas

- **Separate reusable factors:** In TC-GS, a Gaussian's log-opacity at a pixel is a quadratic polynomial. A six-element pixel basis and a six-element Gaussian coefficient vector separate the two inputs; stacking them evaluates many pixel-Gaussian pairs through one matrix product.
- **Match instruction dimensions:** The mathematical basis length may differ from supported matrix instruction dimensions. TC-GS expands six terms to eight by splitting the constant coefficient into three equal contributions, retaining the real-arithmetic expression while reducing that coefficient's magnitude.
- **Condition intermediate values:** Algebraic equivalence does not guarantee equivalent behavior in reduced precision. Translating both pixels and Gaussian means to tile-local coordinates keeps their relative displacement fixed and bounds quadratic pixel terms, making TC-GS's FP16 evaluation substantially more accurate.
- **Keep the accelerated operation explicit:** TC-GS maps exponent evaluation to matrix multiplication. Visibility thresholding, exponentiation, and depth-ordered compositing still have separate roles. Its EarlyCull test removes exponentials for invisible fragments but does not remove the need to evaluate their exponents.
- **Measure the full pipeline:** Faster arithmetic may expose preprocessing or scheduling overhead. TC-GS's larger alpha-blending-stage speedups coexist with smaller forward-rendering gains, especially when integrated with FlashGS.

## Important Papers

- [[TC-GS: A Faster Gaussian Splatting Module Utilizing Tensor Cores]]: Gaussian log-opacity evaluation using matrix products and local coordinates, with precision and runtime ablations.
- Dakkak et al. (2019), "Accelerating Reduction and Scan Using Tensor Core Units": a prior example cited in TC-GS's discussion of non-GEMM applications.
- Hu, Li, and Tseng (2022), "TCUDB: Accelerating Database with Tensor Processors": another application cited in TC-GS's related work.

## Related Concepts

- [[3D Gaussian Splatting]]
- [[Geometry-Aware Gaussian-Tile Culling]]: reduces candidate work and can complement acceleration of the remaining opacity evaluations.
- Mixed-precision computation
- Numerical conditioning
- Matrix multiply-accumulate
