---
title: "SymFormer: End-to-end symbolic regression using transformer-based architecture"
type: paper
authors:
  - Martin Vastl
  - Jonáš Kulhánek
  - Jiří Kubalík
  - Erik Derner
  - Robert Babuška
year: null
tags:
  - symbolic-regression
  - transformers
  - scientific-discovery
---

## TL;DR

SymFormer learns to generate mathematical expressions and their numerical constants jointly from observed input–output points. Predicted constants condition subsequent symbolic decoding and initialize local gradient refinement. On the paper's benchmarks, this produces strong numerical fits with lower reported average inference time than NSRS and DSO.

## Research Question

Can jointly predicting expression structure and constants improve symbolic regression over generating expression skeletons and fitting their constants afterward?

## Motivation

Constants change a function's behavior substantially, so omitting them during symbolic decoding removes useful information. Repeated numerical optimization also makes candidate search expensive. Supervised pretraining on synthetic formulas amortizes expression discovery across new problems.

## Contributions

- An encoder–decoder transformer with separate symbol-classification and constant-regression heads, where generated constants also feed subsequent decoding.
- Scientific-style constant encoding with discrete exponent tokens and continuous mantissas.
- Candidate sampling followed by local constant refinement, evaluated against two baselines and through encoding ablations.

## Method

An induced-set-attention encoder maps unordered observations to a fixed-size representation. The autoregressive decoder consumes previous symbols, positions, and projected constants. Expressions use preorder tree traversal; constants combine exponent tokens with regressed mantissas in [−1, 1]. Integers from −5 to 5 also have dedicated tokens.

Training minimizes symbol cross-entropy plus a weighted constant MSE, evaluated only at constant positions. The regression weight starts at zero and rises on a cosine schedule; decreasing noise on input constants helps tolerate imperfect predictions. At inference, top-K sampling generates candidate formulas, gradient descent refines constants with structure held fixed, and observed-point MSE selects the output.

Synthetic training sets contain 130 million univariate and 100 million bivariate formulas. Random expression trees have at most ten operators before simplification; filtering removes invalid outputs, constant functions, linear simplifications, and expressions exceeding 50 tokens. Each formula supplies 100 or 200 sampled points. Section 4.1 reports roughly 95 million parameters and 33 hours of training on eight A100 GPUs.

## Experiments

Table 1 compares Nguyen, R, Livermore, Koza, Keijzer, and Constant benchmarks using K=20, 1,024 candidates, and local refinement with early stopping. Its reported overall averages are:

| Method | R² | Time per equation (s) |
|---|---:|---:|
| SymFormer | 0.99978 | 52.95 |
| NSRS | 0.92901 | 199.63 |
| DSO | 0.99443 | 326.53 |

These are the source table's aggregates, not recomputed averages. SymFormer is not uniformly best in fit: NSRS reaches 1.00000 on R, versus 0.99986 for SymFormer; DSO reaches 1.00000 on Constant, versus 0.99998.

In-domain median univariate relative error improves from 0.0288 to 0.0010 with local refinement; bivariate error improves from 0.0389 to 0.0035 (§4.3). Using the bivariate model for all benchmarks yields R²=0.99946 and 174.32 seconds on average (Table 2).

Table 3 reports relative error 0.1547 for skeleton prediction plus BFGS, 0.0089 for raw constant encoding plus local search, and 0.0010 for the full method. Initializing BFGS with extended-encoding predictions yields 0.0303. These ablations support the combined encoding and refinement design. Extrapolation tests show increasing error with distance outside the sampled range; qualitative examples include equivalent formulas and close approximations. More sampled candidates generally improve fit at substantial runtime cost (Appendix A).

## Limitations

The trained model fixes the maximum input dimensionality, vocabulary, and sampling setup. Evidence covers one and two variables, rather than general high-dimensional discovery. Complicated expressions can fail or take longer, and generated formulas can be unnecessarily complex. High numerical fit does not establish exact symbolic recovery. Baseline comparisons differ in vocabulary, sample ranges, and point counts, limiting strict comparability; training cost is separate from inference time.

The supplied Markdown does not establish a publication year or stable identifier, so year is left unspecified. Its training account also differs between §4.1 (three epochs) and Table 10 (390/300); these should not be silently reconciled.

## Related Concepts

- [[concepts/symbolic-regression|Symbolic Regression]]: inference of both formula structure and numerical parameters from observations.
- [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]]: a distinct objective that represents formula uncertainty; SymFormer selects a best-fit candidate rather than estimating a posterior.

## Related Papers

- Biggio et al. (2021), *Neural Symbolic Regression That Scales*: the skeleton-generation baseline compared as NSRS.
- Mundhenk et al. (2021), *Symbolic Regression via Neural-Guided Genetic Programming Population Seeding*: the neural-guided search baseline compared as DSO.
- d’Ascoli et al. (2022), *Deep Symbolic Regression for Recurrent Sequences*: cited inspiration for jointly encoding symbolic and numerical output, with a different task and numerical representation.
