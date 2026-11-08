---
title: "Optimal Transportation and Alignment Between Gaussian Measures"
type: paper
authors:
  - Sanjit Dandapanthula
  - Aleksandr Podkopaev
  - Shiva Prasad Kasiviswanathan
  - Aaditya Ramdas
  - Ziv Goldfeld
year: 2026
code: https://github.com/sanjitdp/gaussian-gw
tags:
  - optimal-transport
  - gromov-wasserstein
  - gaussian-measures
  - multimarginal-transport
  - representation-similarity
---

## TL;DR

This paper derives tractable forms of quadratic [[concepts/optimal-transport|Optimal Transport]] and inner-product Gromov-Wasserstein (IGW) alignment for Gaussian measures. It characterizes uncentered Gaussian IGW through optimization over isometries, gives a closed form when either measure is centered, obtains centered Gaussian IGW barycenters and multimarginal couplings, and reduces Gaussian multimarginal OT to a low-rank Burer-Monteiro problem whose second-order stationary points are globally optimal under the paper's assumptions.

## Research Question

Which Gaussian instances of [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]], barycenters, and multimarginal quadratic transport admit exact formulas or optimization problems with useful global guarantees, including for uncentered measures and separable Hilbert spaces?

## Motivation

OT and GW provide geometric comparisons of distributions, but empirical OT is expensive and GW optimization is generally nonconvex. Gaussian approximations replace a sample cloud with its mean and covariance, making closed-form or structured calculations possible. Existing Gaussian results covered the Bures-Wasserstein distance and centered finite-dimensional IGW, leaving gaps for uncentered distributions, infinite-dimensional spaces, barycenters, and multimarginal transport.

## Contributions

- Gives an exact variational characterization of IGW between uncentered Gaussian measures on a real separable Hilbert space. The optimization is over isometries and co-isometries, and an optimal jointly Gaussian coupling is attained.
- Derives analytic lower and upper bounds separated by a Cauchy-Schwarz gap. They coincide under a covariance-weighted mean-alignment condition, including whenever either Gaussian is centered; the univariate case is also explicit.
- Shows that moment-matched Gaussian measures lower-bound IGW for general finite-second-moment measures.
- Characterizes centered Gaussian IGW by the Euclidean distance between ordered covariance spectra, then extends this result to centered IGW barycenters and multimarginal IGW couplings on separable Hilbert spaces.
- Formulates multimarginal quadratic OT between nondegenerate finite-dimensional Gaussians as a semidefinite program with a unique rank-$d$ solution.
- Proves that, with positive product weights and factor width $k=d+1$, every second-order stationary point of the Burer-Monteiro formulation has rank $d$ and is globally optimal.

## Method

For two Gaussian measures, expanding the squared IGW distortion shows that the objective depends on a coupling only through its cross-covariance. Feasible cross-covariances factor through a contraction between the two covariance square roots. Convex maximization over the contraction ball attains an optimum at an extreme point, which is an isometry or co-isometry. In finite dimensions this becomes optimization over an orthogonal or Stiefel manifold.

When at least one measure is centered, the mean-covariance interaction disappears and the squared IGW distance reduces to the squared Euclidean distance between the ordered covariance eigenvalue sequences. This spectral form makes the centered barycenter covariance spectrum the coordinatewise mean of the input spectra. A multimarginal IGW optimum is obtained by sharing standard Gaussian coordinates across corresponding covariance eigenvectors, making every pairwise marginal optimal.

For multimarginal quadratic OT, the paper optimizes the off-diagonal cross-covariance blocks of a positive-semidefinite joint covariance matrix. The unique optimal joint Gaussian covariance has rank $d$. Factoring it as $UU^\top$ reduces the number of variables from $O(d^2p^2)$ to $O(d^2p)$ for $p$ marginals. A second-order argument forces every stationary factor at width $d+1$ to be rank deficient, which supplies the global optimality certificate.

## Experiments

### Language-Model Representation Comparison

The authors fit Gaussians to embeddings from `bert-base-uncased` and 23 already-trained distillations on 1,000 samples from each of Amazon Polarity and AG News. Analytic IGW bounds, tightened with Riemannian gradient descent, have maximum absolute widths 0.285 and 0.359, respectively, no more than 1.50% and 3.65% of the corresponding feasible upper bounds. Each comparison, including both analytic bounds, takes at most 6.2 seconds on the reported local CPU.

Against centered kernel alignment, the feasible IGW upper bound has Pearson correlation $r=-0.504$ ($p=0.014$) on Amazon Polarity and $r=-0.198$ ($p=0.365$) on AG News. The latter association is weak and not statistically significant in the reported analysis.

### Heterogeneous User Clustering

The paper constructs 120 synthetic users in science, news, and entertainment groups, with 400 posts per user. Users are embedded with either a 384-dimensional MiniLM model or a 768-dimensional MPNet model. Clustering zero-padded ordered covariance spectra nearly recovers the displayed heterogeneous-model groups. In ten repeated common-model samples, mean-only, covariance-spectrum-only, and combined representations all recover the category labels perfectly.

### Multimarginal Transport

For Gaussian measures in $\mathbb R^3$, the Burer-Monteiro solver agrees with an interior-point semidefinite solver to relative covariance-pairing objective error below $10^{-8}$. The interior-point method exhausts the reported memory for more than 50 marginals, while the pairwise-loop Burer-Monteiro implementation solves the 100-marginal instance in about three seconds. A specialized Gaussian Wasserstein-barycenter fixed-point method is faster in the tested settings, but it does not directly produce the full multimarginal coupling factors studied here.

## Limitations

- General uncentered Gaussian IGW remains a nonconvex orthogonal or Stiefel optimization; the paper gives an exact variational form and bounds, not a universal closed form. It also exhibits a strict suboptimal local maximum in dimension two.
- The analytic uncentered bounds can differ by a Cauchy-Schwarz gap. Their empirical tightness in the language-model study does not imply tightness for all means and covariances.
- The Gaussian representation-similarity experiments depend on fitting and regularizing Gaussian embedding distributions; the diagnostic examines Gaussian approximation only in the leading two principal components.
- IGW and CKA answer different questions: IGW is unpaired and retains location and global scale, while CKA uses input correspondence and normalizes them. Their correlations should not be interpreted as interchangeability.
- The user-clustering experiment uses synthetic users and broad text categories. Perfect repeated results under a common embedding model do not establish performance on organic user populations.
- The multimarginal global guarantee concerns exact second-order stationary points, positive product weights, nondegenerate Gaussian marginals, and the stated factor width. Numerical algorithms provide approximate stationarity.
- The supplied manuscript is dated October 6, 2026 but provides no DOI, arXiv identifier, or venue, so none is inferred here.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares distributions through distortion of their internal pairwise geometry.
- [[concepts/inner-product-gromov-wasserstein-gradient-flows|Inner-Product Gromov-Wasserstein Gradient Flows]]: studies dynamics under the same pairwise-inner-product geometry used for Gaussian alignment here.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the coupling framework and quadratic multimarginal objective.
- [[concepts/bures-wasserstein-geometry|Bures-Wasserstein Geometry]]: gives the classical closed-form Gaussian $W_2$ comparison that motivates the paper's IGW analogues.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: relates the multimarginal OT solution to an aggregate Gaussian distribution.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: provides the representation-comparison application studied with pretrained language-model distillations.

## Related Papers

- Knott and Smith (1984), "On the Optimal Mapping of Distributions": derives classical Gaussian quadratic transport results.
- Gelbrich (1990), "On a Formula for the $L^2$ Wasserstein Metric Between Measures on Euclidean and Hilbert Spaces": extends Gaussian Wasserstein formulas to Hilbert spaces.
- Salmona, Delon, and Desolneux (2022), "Gromov-Wasserstein Distances Between Gaussian Distributions": gives the centered finite-dimensional Gaussian IGW result extended here.
- Le et al. (2022), "Entropic Gromov-Wasserstein Between Gaussian Distributions": derives regularized centered Gaussian IGW distances and barycenters.
- Gangbo and Swiech (1998), "Optimal Maps for the Multidimensional Monge-Kantorovich Problem": supplies the multimarginal quadratic-transport structure used in the rank argument.
- Burer and Monteiro (2003), "A Nonlinear Programming Algorithm for Solving Semidefinite Programs via Low-Rank Factorization": provides the low-rank SDP parameterization used for multimarginal OT.
- [[papers/probabilistic-representation-and-convergence-of-gromov-wasserstein-gradient-flows|Probabilistic Representation and Convergence of Gromov-Wasserstein Gradient Flows]]: studies relative-entropy dynamics under IGW geometry rather than static Gaussian alignment.

[[index|Library home]]
