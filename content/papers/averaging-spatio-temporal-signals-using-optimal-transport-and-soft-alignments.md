---
title: Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments
type: paper
authors:
  - Hicham Janati
  - Marco Cuturi
  - Alexandre Gramfort
year: null
source_job_id: 9ec3faff-3348-4cbe-a477-158ababded2b
tags:
  - optimal-transport
  - time-series
  - barycenters
  - neuroimaging
---

[[index|Library home]]

## TL;DR

Spatio-temporal alignment (STA) combines Soft-DTW with debiased unbalanced optimal transport to average sequences whose timing, spatial location, and total mass differ. The central contribution is a Fenchel-duality reformulation that alternates soft temporal alignments with weighted spatial barycenters, avoiding direct differentiation through every transport cost. A generalized Sinkhorn algorithm computes the spatial averages. Handwriting forecasting and six-subject brain-imaging examples support the approach, while global convergence of the complete procedure is not established.

## Research Question

How can a representative trajectory of nonnegative spatial measures preserve meaningful geometry and temporal events despite differences in location, timing, and amplitude across samples?

## Motivation

Euclidean averaging blurs spatially displaced activity. Transport averaging independently at each time point captures spatial geometry but misses temporal misalignment. Ordinary DTW handles time warping, yet its choice of spatial cost can miss geometric similarity and its minimum-cost path can be insensitive to certain temporal shifts. A useful average must account for all three sources of variation without discarding chronology.

## Contributions

- Reformulates general [[concepts/soft-dtw-barycenters|Soft-DTW Barycenters]] as alternating temporal-weight updates and spatial averaging (Proposition 10).
- Extends debiased transport barycenter computation to unequal-mass measures through a modified Sinkhorn fixed-point scheme (Algorithm 4).
- Shows that stationary points of the spatial debiased-UOT barycenter objective are global minima under the stated kernel assumptions (Proposition 15). This is distinct from global optimality of the temporal problem or convergence of the fixed-point iteration.
- Derives tighter Delannoy-number bounds and a temporal-shift sensitivity bound for Dirac time series, motivating a heuristic for the Soft-DTW smoothing parameter.

## Method

Each observation is a sequence of nonnegative vectors on a common finite spatial support. A ground-cost matrix $C$ specifies the cost of moving mass between support points. With $K=\exp(-C/\varepsilon)$, the spatial cost is

$$
U(x,y)=\min_{P\geq0}\varepsilon\operatorname{KL}(P\Vert K)
+\gamma\operatorname{KL}(P\mathbf1\Vert x)
+\gamma\operatorname{KL}(P^\top\mathbf1\Vert y).
$$

The marginal penalties allow unequal total masses. Self-cost subtraction gives

$$
\widetilde U(x,y)=U(x,y)-\tfrac12U(x,x)-\tfrac12U(y,y).
$$

STA applies Soft-DTW to the matrix of these spatial costs:

$$
\operatorname{STA}_\beta(x,y)
=-\beta\log\sum_{A\in\mathcal A}
\exp\left[-\langle A,\Delta(x,y)\rangle/\beta\right],
\qquad \Delta_{st}=\widetilde U(x_s,y_t).
$$

Paths in $\mathcal A$ preserve temporal order and join both endpoints. For fixed output length $T$, the barycenter minimizes $\sum_iw_i\operatorname{STA}_\beta(x_i,z)$.

**Alternating optimization (Section 3).** Entropy/log-sum-exp duality introduces a distribution over alignment paths. Its expected alignment matrix $Z^i$ is computed by Soft-DTW dynamic programming and differentiation with respect to the cost matrix, without enumerating paths. Each output frame then solves

$$
z_t\in\arg\min_a\sum_i\sum_s w_iZ^i_{st}\widetilde U(x_{i,s},a).
$$

Thus the time update supplies weights for independent spatial averages. The generic reformulation also applies to other spatial losses with tractable weighted means.

**Spatial solver (Section 4).** Generalized Sinkhorn scaling uses $\omega=\gamma/(\gamma+\varepsilon)$ and an additional symmetric self-transport potential to correct entropic blur. Proposition 15 establishes global optimality of stationary spatial solutions when $K$ is positive semidefinite; it does not assert convexity. The paper gives a one-dimensional nonconvex example.

**Parameter choice and cost.** Delannoy numbers count admissible alignments. Bounds on their growth explain temporal sensitivity and motivate setting $\beta$ from a desired maximum shift $k_{\max}$. The extension from the Dirac-series bound to general data is heuristic. Experiments use $\varepsilon=1/p$ and a transported-mass heuristic for $\gamma$. Soft-DTW is quadratic in sequence length; dense spatial kernel operations are quadratic in support size $p$. Kernel separability reduces the spatial operation cost on 2D regular grids to $O(p^{3/2})$, with GPU batching available.

## Experiments

**Spatial debiasing (Figure 2).** A four-Gaussian example varies means, variances, and masses. Debiased barycenters remain sharper and less sensitive to entropy regularization than ordinary UOT barycenters. This is an illustrative comparison, not a reported numerical speed benchmark.

**Brain imaging (Section 5.1; Figures 3-4).** The DS117 EEG/MEG experiment aggregates six subjects viewing faces, using 642 cortical vertices and squared shortest-path distances on the mesh. STA uses $k_{\max}=20$. Compared with Euclidean averaging, DBA, and time-independent transport averaging, the figures show spatially focused activation and a clearer distinction between two transient responses. Figure 4 locates STA peaks near 125 ms and 160 ms. These are qualitative physiological illustrations, without a quantitative localization-accuracy benchmark.

**Handwriting forecasting (Section 5.2; Figures 5-8).** Sequences are represented by 13 frames of $30\times30$ pixels, with random spatial shifts up to 10 pixels per direction and temporal subsampling to 5-13 points. From five observed frames, each method selects five nearest neighbors and predicts the remaining eight frames using a barycenter while fixing the observed prefix. Baselines are Euclidean mean, DTW barycenter averaging (DBA), and spatial transport averaging without temporal alignment.

The authors report lower STA prediction error for every letter under both pixel-space $\ell_2$ error and EMD, averaged over the eight predicted frames. EMD evaluation normalizes each image to unit mass, so it does not test amplitude recovery. DBA errors are moved to the appendix because their scale obscures the other comparisons. Exact plotted scores are not transcribed in the supplied Markdown. Its dataset description lists four letter labels and 20 samples per letter but reports shape $(100,13,30,30)$; the sample-count discrepancy is unresolved. The prose specifies squared Euclidean EMD ground cost, while captions call it Euclidean distance.

The paper provides [experiment code](https://github.com/hichamjanati/spatiotemporal-alignements); no experiments were rerun for this summary.

## Limitations

- The full temporal-spatial objective is not jointly convex, and the alternating algorithm has no global-minimum guarantee. Uniform initialization is supported empirically.
- Convergence analysis of the debiased spatial fixed-point algorithm is explicitly left for future work, despite empirical convergence observations.
- The stated spatial nonnegativity and coercivity results depend on the entropy-reference convention and fixed universal support. Product-measure regularization requires a different mass correction. Nonnegativity of the spatial cost does not make raw Soft-DTW a metric.
- The temporal-smoothing rule is motivated by a simplified Dirac-series analysis; it is not a universal temporal-invariance guarantee.
- Dense spatial costs and quadratic temporal alignment remain scaling constraints. Unequal-length normalization is discussed but not explored experimentally.
- The supplied Markdown omits the paper's publication year and stable bibliographic identifier, and contains the experimental ambiguities noted above. These are left unresolved rather than inferred from its references.

## Related Concepts

- [[concepts/soft-dtw-barycenters|Soft-DTW Barycenters]]: expected alignments turn temporal averaging into weighted spatial means.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: compares nonnegative measures with unequal masses.
- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: order-preserving temporal alignment.
- [[concepts/sinkhorn-divergence|Sinkhorn Divergence]]: self-cost subtraction and the importance of the regularization convention.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: related transport-based averaging of probability measures.
- [[concepts/optimal-transport|Optimal Transport]]: the underlying spatial geometry.

## Related Papers

- Janati, Cuturi, and Gramfort (2020), "Spatio-temporal alignments: Optimal transport through space and time": introduces the STA comparison used here; this paper develops barycenter computation.
- Janati, Cuturi, and Gramfort (2020), "Debiased Sinkhorn barycenters": balanced-mass antecedent extended here to unbalanced transport.
- Cuturi and Blondel (2017), "Soft-DTW: a differentiable loss function for time-series": supplies the differentiable alignment recursion.
- Chizat et al. (2017), "Scaling Algorithms for Unbalanced Transport Problems": supplies generalized Sinkhorn scaling.
- [[papers/simple-approximative-algorithms-for-free-support-wasserstein-barycenters|Simple approximative algorithms for free-support Wasserstein barycenters]]: a library comparison, not a citation in this paper; studies approximation guarantees for free-support probability barycenters, whereas STA averages fixed-support measure sequences with temporal alignment.
