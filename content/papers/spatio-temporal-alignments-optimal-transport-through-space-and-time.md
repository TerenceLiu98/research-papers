---
title: "Spatio-Temporal Alignments: Optimal transport through space and time"
type: paper
authors:
  - Hicham Janati
  - Marco Cuturi
  - Alexandre Gramfort
year: null
source_job_id: 0a81893d-54bf-4235-80c1-2ba745a403b2
tags:
  - optimal-transport
  - time-series
  - sequence-alignment
  - neuroimaging
---

[[index|Library home]]

## TL;DR

Spatio-Temporal Alignments (STA) compares sequences of spatial measures by combining Soft-DTW with a debiased unbalanced transport cost. Spatial transport accommodates displaced activity and unequal mass; smooth temporal alignment preserves chronology while responding to certain time shifts that hard DTW ignores. A conditional quadratic lower bound explains this temporal sensitivity. Simulated cortical signals and real handwriting sequences illustrate improved separation in t-SNE embeddings.

## Research Question

How can a differentiable dissimilarity capture spatial displacement, amplitude differences, and temporal shifts while respecting the chronological order of observations?

## Motivation

Pointwise vector costs do not encode distances between spatial locations. Transport supplies this geometry, but transport over a joint space-time support can ignore chronology and requires a spatial-temporal tradeoff. DTW preserves temporal order, yet a minimum-cost alignment can assign zero cost to shifted events. STA combines spatial transport with smooth aggregation over temporal paths.

## Contributions

- Establishes a quadratic lower bound on the change in Soft-DTW under the paper's temporal-shift construction, for sufficiently small positive smoothing (Theorem 1).
- Defines STA using a self-cost-corrected unbalanced transport divergence as the framewise Soft-DTW cost (Definition 3).
- Establishes spatial-cost nonnegativity under a positive-semidefinite Gibbs kernel, separation under positive definiteness, coercivity, and a zero-cost characterization of joint stationary points on strictly positive inputs (Section 4).
- Demonstrates spatial and temporal discrimination in cortical-signal simulations and spatial discrimination in handwriting embeddings.

## Method

Each frame is a nonnegative vector on a spatial support of size $p$. For ground-cost matrix $M$ and $K=\exp(-M/\varepsilon)$, the spatial transport objective is

$$
W(x,y)=\min_{P\geq0}\varepsilon\operatorname{KL}(P\Vert K)
+\gamma\operatorname{KL}(P\mathbf1\Vert x)
+\gamma\operatorname{KL}(P^\top\mathbf1\Vert y).
$$

The marginal penalties permit unequal mass. Generalized Sinkhorn updates use $a=(x/(Kb))^\omega$ and $b=(y/(K^\top a))^\omega$, where $\omega=\gamma/(\gamma+\varepsilon)$. The paper subtracts self-costs:

$$
S(x,y)=W(x,y)-\tfrac12W(x,x)-\tfrac12W(y,y).
$$

For sequences of lengths $m,n$, set $\Delta_{ij}=S(x_i,y_j)$. STA is

$$
\operatorname{STA}_\beta(x,y)
=-\beta\log\sum_{A\in\mathcal A_{m,n}}
\exp\left(-\langle A,\Delta\rangle/\beta\right),\qquad\beta>0.
$$

Paths join the sequence endpoints using horizontal, vertical, or diagonal forward steps. At $\beta=0$, the soft minimum becomes the hard DTW minimum. A dynamic program evaluates the temporal loss.

**Why smoothing detects shifts (Section 3).** The construction shifts a fluctuating segment while preserving constant boundary values. Hard DTW can still find a zero-cost path. Soft-DTW also depends on the number of low-cost paths, counted using Delannoy numbers. For admissible shifts $k$ and $0<\beta\leq\mu/\log(3TD_{T,T})$, where $\mu$ is the smallest positive self-comparison frame cost, Theorem 1 gives

$$
\operatorname{dtw}_\beta(x,x_{+k})-\operatorname{dtw}_\beta(x,x)
\geq\beta\alpha k(k-1)+\beta\rho k,
$$

with positive constants $\alpha,\rho$ determined by the sequence length and boundary durations. This is a bound relative to self-alignment under the stated construction, not a universal quadratic law for arbitrary sequences. The authors report that sensitivity also holds empirically beyond the restrictive sufficient bound on $\beta$.

**Spatial guarantees and computation (Section 4).** $S(x,y)\geq0$ when $K$ is positive semidefinite; positive definiteness additionally makes zero cost imply $x=y$. These properties concern the spatial divergence, not the entire raw Soft-DTW loss. Temporal dynamic programming costs $O(mn)$ after frame costs are available. Dense spatial kernel operations cost $O(p^2)$ per scaling iteration; separability on regular 2D grids reduces these operations to $O(p^{3/2})$. Frame comparisons can be batched on GPUs. Entropic strength $\varepsilon$ trades smoothing against numerical stability, while $\gamma$ controls marginal relaxation.

## Experiments

| Setting | Design | Reported evidence |
| --- | --- | --- |
| Temporal-shift illustration | Length $T=400$, smoothing $\beta=0.1$ | Figure 3 illustrates the theoretical shift bounds; additional smoothing comparisons are referred to supplementary material. |
| Simulated cortical activity | 200 sequences, 20 time points, 642 left-hemisphere vertices; peaks at time 5 or 15 in V1 or MT, with amplitudes between 1 and 3 | With $\beta=0$, STA separates regions but not timing. With $\beta=0.1$, its t-SNE embedding separates all four region/time groups. The DTW comparisons do not recover the spatial grouping (Figure 5). |
| Handwriting | 140 sequences from seven letters, 20 per letter; 10 frames of $64\times64$ pixels | STA gives clearer letter separation than Soft-DTW at $\beta=0.1$ (Figure 7). Changing $\beta$ has little effect here; the authors attribute this to similar writing speeds from a single writer. |

The cortical experiment requires 8,040,000 pairwise frame transport computations and reportedly completes in 10 minutes on a DGX-1. This is a hardware-specific experiment runtime, not a general speedup claim. The evidence is primarily visual embedding separation; the supplied text reports no numerical clustering-accuracy benchmark.

## Limitations

- The temporal theorem assumes the paper's particular shift construction and an upper bound on smoothing. General time warps and arbitrary signals are outside that guarantee.
- Debiasing the spatial transport cost does not make raw STA a metric: the soft minimum can have a nonzero or negative self-cost, and no triangle inequality is established.
- Inputs are nonnegative measures. The authors suggest absolute values or separate positive/negative comparisons for signed signals; these choices change what information is retained.
- Dense spatial transport and all-pairs temporal comparisons can be expensive. Small entropy parameters can require log-domain stabilization.
- Brain results use simulated activity on a real anatomical mesh, not a clinical discrimination benchmark. Handwriting uses one writer and provides little variation in speed.
- The supplied Markdown does not state a publication year or stable identifier, so these are not inferred. Several formulas contain extraction artifacts; the summary retains the clearly specified objectives and theorem conditions without reproducing corrupted expressions. Supplementary proofs and additional plots are not included in the supplied text.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: chronological path constraints and the effect of temporal smoothing.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: spatial comparison with unequal mass.
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]: correction of entropic self-costs.
- [[concepts/optimal-transport|Optimal Transport]]: ground geometry for spatial displacement.
- [[concepts/soft-dtw-barycenters|Soft-DTW Barycenters]]: related use of smoothed alignments to define representative sequences.

## Related Papers

- [[papers/averaging-spatio-temporal-signals-using-optimal-transport-and-soft-alignments|Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments]]: a related library paper develops STA-based averaging and barycenter computation; the present paper focuses on dissimilarity and discrimination.
- Cuturi and Blondel (2017), "Soft-DTW: a differentiable loss function for time-series": supplies the differentiable temporal-alignment framework.
- Chizat et al. (2017), "Scaling Algorithms for Unbalanced Transport Problems": supplies generalized Sinkhorn scaling.
- Genevay, Peyre, and Cuturi (2018), "Learning generative models with sinkhorn divergences": the cited balanced-transport precedent for self-cost subtraction.
