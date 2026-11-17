---
title: "KANO: Kolmogorov–Arnold Neural Operator"
type: paper
authors:
  - Jin Lee
  - Ziming Liu
  - Xinling Yu
  - Yixuan Wang
  - Haewon Jeong
  - Murphy Yuezhen Niu
  - Zheng Zhang
year: null
tags:
  - neural-operators
  - kolmogorov-arnold-networks
  - scientific-machine-learning
---

## TL;DR

KANO learns position-dependent operators through a symbol that depends jointly on position and frequency, using compact Kolmogorov–Arnold networks for symbolic inspection. On three synthetic operators it generalizes across held-out function families with 152 parameters, compared with 566,000 for the FNO baseline. Its quantum variant attains approximately 6 × 10⁻⁶ rollout state infidelity from simulated position and momentum probabilities. These results support the dual-domain architecture on the tested problems; symbolic coefficient recovery is less uniform than the abstract suggests.

## Research Question

Can an operator network combine robust generalization to unseen input-function families with interpretable recovery of position-dependent dynamics?

## Motivation

Differentiation is sparse in frequency space, while position-dependent multiplication is naturally represented in physical space. Encoding both through a spectral multiplier can obscure this structure. The paper proposes learning each dependence explicitly while keeping the parameterization small enough to inspect.

## Contributions

- Introduces a pseudo-differential operator parameterized by compact KAN symbol and activation networks.
- Analyzes spectral mode mixing and presents conditional approximation-complexity arguments for position-dependent operators and smooth symbols.
- Tests function-family generalization, symbolic reconstruction, and long-horizon quantum evolution, including an MLP ablation that separates architecture from KAN parameterization.

## Method

Each layer applies a learned symbol p(x, ξ) through discrete Kohn–Nirenberg quantization, then combines that output and the input through a learned pointwise KAN activation. Spatial dependence enables spectral mode mixing independent of the input function. KANO omits wide lifting and projection networks to preserve inspectability. Learned spline edges are inspected, replaced by symbolic forms, and subsequently refined.

For the harmonic oscillator, the symbol x² + ξ² represents multiplication by x² and negative second differentiation in their natural domains. The paper's polynomial parameter-scaling claim assumes sufficiently smooth symbols, a finite composition, and bounded-degree nonlinearities. Its FNO analysis concerns the stated spectral architecture and does not overturn universal approximation.

Q-KANO parameterizes complex phases for evolution and trains against either full wave functions, position probabilities, or both position and momentum probabilities. Probability supervision uses KL losses.

## Experiments

### Synthetic operators

The three targets are x²f − f″, xf′ + f″, and f³ + xf′ + f″. Training uses 2,000 examples from periodic, chirped-cosine, and sine-beat families on a 128-point grid; held-out families are sinc pulses, Gaussian–Hermite functions, and wave packets. Table 1 reports the following held-out relative L2 errors, all in units of 10⁻⁴:

| Model | Parameters | First operator | Second operator | Third operator |
| --- | ---: | ---: | ---: | ---: |
| FNO | 566k | 98.8 | 87.0 | 81.4 |
| PDNO | 538k | 6.31 | 12.1 | 27.2 |
| KANO | 152 | 1.44 | 0.749 | 0.737 |
| KANO with MLPs | 2k | 6.59 | 8.07 | 6.87 |
| Symbolically refined KANO | Not reported | 0.526 | 0.500 | 0.536 |

KANO's held-out/in-distribution error ratios are 1.38, 1.19, and 1.03. The MLP variant also generalizes relatively consistently, supporting an architectural contribution beyond spline edges. Table 2 gives small residual coefficient errors after symbolic refinement.

### Quantum dynamics

Simulated double-well and nonlinear Schrödinger trajectories use 200 initial states, 128-point position and momentum grids, and 100 snapshots spaced by 0.1 ms. Training uses the first 10 steps; evaluation extends another 90.

| Supervision and model | Double-well infidelity | NLSE infidelity |
| --- | ---: | ---: |
| FNO, full wave function | 1.5 × 10⁻² | 1.6 × 10⁻² |
| Q-KANO, position and momentum | 6.3 × 10⁻⁶ | 5.6 × 10⁻⁶ |
| Q-KANO, position only | 4.7 × 10⁻³ | 6.1 × 10⁻² |
| Symbolic Q-KANO, position and momentum | 2.0 × 10⁻⁸ | 3.0 × 10⁻⁸ |

These are Table 3 results. Position-only supervision is substantially weaker, particularly for NLSE. The comparison uses different information regimes deliberately: FNO receives full wave functions while the dual-basis Q-KANO receives probabilities.

## Limitations

- Experiments are small synthetic and simulated physical systems; high-dimensional conventional benchmarks remain future work.
- Direct quantization is expensive. Appendix E reports cubic scaling in the number of grid points for its direct implementation and quadratic symbol-grid memory; low parameter count is not a measured runtime advantage.
- Symbolic recovery depends on observability and subsequent refinement. Table 4 reports an NLSE nonlinear coefficient of 0.9514 with position-and-momentum supervision, plus an extra amplitude term, rather than uniformly four-decimal coefficient accuracy. Probability data also leave global phase unobservable.
- The theoretical efficiency statements depend on operator class, regularity, and architecture assumptions. The role of wide FNO lifting and projection networks is acknowledged as unresolved.
- The supplied text contains inconsistencies: Appendix E equation 47 displays exponential scaling after a polynomial parameter bound, and the potential's expanded constant differs between the main definition and Table 4. These expressions should not be treated as independently verified identities.

## Related Concepts

- [[concepts/neural-operators|Neural Operators]]: learning mappings between function spaces with an explicit spatial–spectral inductive bias.
- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: compact learnable edge functions support inspecting and symbolically approximating the operator.

## Related Papers

- [[papers/kan-kolmogorov-arnold-networks|KAN: Kolmogorov-Arnold Networks]] supplies the spline-edge architecture and symbolic recovery approach used here.
- Shin, Lee, and Hwang (2022), “Pseudo-differential neural operator,” is a cited architectural predecessor and experimental baseline.

## Source Notes

Synthesized from the supplied parsed manuscript for Cognitio job `ab614bb8-09b8-4af4-ab27-f0488e0e0b7e`. The supplied manuscript does not establish a publication year or a stable paper identifier; year is left null. Experimental details are in Sections 5 and Appendix B; theory and complexity are in Appendices C–E.
