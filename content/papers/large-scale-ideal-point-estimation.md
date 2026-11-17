---
title: Large-Scale Ideal Point Estimation
type: paper
authors:
  - Michael Peress
year: 2022
doi: "10.1017/pan.2021.5"
source_job_id: "536d5474-66f0-4a62-9b4b-7dcb66b4c5ed"
tags:
  - ideal-point-estimation
  - political-methodology
  - sparse-estimation
---

## TL;DR

Peress combines limited-memory BFGS, analytic gradients, sparse storage, approximate Hessian inference, and automatic initialization in the R package `ipe`. The resulting multidimensional probit estimator handles large linked voting datasets with modest memory. In the largest reported application, 173,196 actors and 28,164 items are fitted with standard errors in 4,967.8 seconds using approximately 0.8 GB.

## Research Question

How can multidimensional ideal points, starting values, and uncertainty be computed efficiently when most entries of a large actor-by-item matrix are missing?

## Motivation

Linking legislative chambers and surveys creates huge matrices with relatively few observed responses. Dense storage, agreement-score initialization, and repeated bootstrap estimation can dominate computation. Poor initialization can also orient connected chambers incorrectly, producing local optima despite apparently completed optimization.

## Contributions

- Joint penalized maximum-likelihood estimation using analytic gradients and limited-memory BFGS.
- Computation and storage organized around observed responses rather than the full matrix.
- Standard errors from an asymptotic block-diagonal Hessian approximation.
- Truncated-SVD initialization and a specialized initialization approach for bridged chambers, implemented in `ipe`.

## Method

The binary probit model is $\Pr(y_{nt}=2)=\Phi(a_t+b_t^\top\alpha_n)$, with actor position $\alpha_n\in\mathbb R^D$ and item intercept and discrimination $(a_t,b_t)$. Independent mean-zero Gaussian regularization corresponds to joint posterior-mode estimation. It does not supply a full posterior distribution.

Analytic gradients avoid repeated finite-difference likelihood evaluations. Limited-memory BFGS stores a short history of parameter and gradient changes instead of a dense curvature matrix. For fixed dimension and memory history, the dense likelihood and gradient cost is $O(NT)$ per iteration. Compressed sparse storage restricts evaluation to the $S$ observed responses, yielding the paper's $O(S)$ computation and storage scaling. Missing entries contribute no response likelihood.

For uncertainty, Section 3.2 replaces the full Hessian with its asymptotic block-diagonal counterpart and inverts small actor and item blocks. This avoids both a dense inverse and repeated bootstrap refits; it is an asymptotic approximation, not an exact finite-sample inverse.

For complete data, a truncated SVD of the double-centered response matrix generates the same starting directions as the agreement-score decomposition without constructing the full actor-by-actor matrix. Sparse centering extends this idea, but generic mean-based initialization deteriorates for extremely sparse bridging problems. A specialized procedure is described in online Appendix A.1, which is not included in the supplied Markdown. Item-specific probits can initialize item coefficients, followed by transformation toward the scale favored by the regularization.

## Experiments

The one-dimensional Monte Carlo study varies actor and item counts over 200, 500, 1,000, and 2,000, uses 70% missing responses, and draws 100 datasets per setting. The author reports small bias, declining RMSE, and coverage approaching 95%; small samples show some undercoverage for extreme ideal points.

| Application | `ipe`, estimates only (s) | `ipe`, including standard errors (s) | Comparison |
| --- | ---: | ---: | --- |
| 112th Senate, 1D | 1.2 | 1.5 | `emIRT`: 1.3 / 12.5 seconds |
| 112th House, 1D | 20.5 | 22.3 | `emIRT`: 17.0 / 267.7 seconds |
| 90th Senate, 2D | 2.87 | 3.14 | W-NOMINATE: 20.7 / 423.4 seconds |
| Senate, Congresses 1–113, 1D | 176.1 | 214.1 | `emIRT`: 2,821.7 seconds without standard errors, with convergence problems from random initialization |
| House and Senate, Congresses 1–113, 1D | 2,915.7 | 2,960.6 | 0.9 GB for `ipe`; estimated 37.5 GB for `emIRT` |
| House and Senate, Congresses 1–113, 2D | 3,255.6 | 3,312.0 | 19.5 million observed responses |
| Linked NPAT, CCES, and roll calls | 4,911.3 | 4,967.8 | 19.9 million observed responses; 0.8 GB versus estimated 146.3 GB for `emIRT` |

Values follow Tables 1–2. The linked survey application uses shared questions and roll calls to connect respondents, candidates, and legislators. Small-application estimates broadly agree after alignment, although W-NOMINATE's unit-circle restriction produces boundary bunching in the two-dimensional example. Benchmarks use only 20 bootstrap replications for competitors and 5,000 MCMC iterations, including 2,500 burn-in iterations, for `ideal`.

## Limitations

- Initialization remains consequential: local modes can reverse some chambers relative to others. The Senate comparison changes both estimator and initialization and does not establish that EM fails with good starting values.
- The uncertainty evidence is asymptotic and simulation-based; the reported Monte Carlo study is one-dimensional and does not establish coverage for every sparse linking design.
- Sparse computation does not model informative missingness. Cross-chamber comparability still depends on the substantive validity of bridge actors or items.
- Software capability and runtime comparisons describe the implementations studied in this paper. `emIRT` is faster for the 112th House when standard errors are omitted.
- The supplied Equation (2) displays positive quadratic terms despite describing Gaussian regularization and maximization; its sign should not be copied as an implementation specification. Table 2's one-dimensional joint-congress timing also differs from the prose's “about 40 minutes”; the table values are retained above. The online appendices are absent.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: the probit actor–item model whose joint estimation is accelerated.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: comparable coordinates require identification and alignment beyond optimizing response fit.

## Related Papers

- [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]]: the EM benchmark; Peress emphasizes sparse storage, initialization, and uncertainty costs.
- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: a related library treatment of Bayesian spatial voting and identification.

Published in *Political Analysis* 30 (2022), 346–363; first published online March 31, 2021. Replication-data DOI reported by the paper: `10.7910/DVN/P5SIO1`.
