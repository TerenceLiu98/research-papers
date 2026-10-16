---
title: Clustering with Bregman Divergences
type: paper
authors:
  - Arindam Banerjee
  - Srujana Merugu
  - Inderjit S. Dhillon
  - Joydeep Ghosh
year: null
source_job_id: a0d5ab1a-f371-400d-a225-abb473361eeb
tags:
  - clustering
  - bregman-divergences
  - information-geometry
  - mixture-models
---

## TL;DR

The paper unifies centroid-based hard clustering and exponential-family mixture estimation through [[concepts/bregman-divergences|Bregman Divergences]]. Hard clustering alternates nearest-representative assignment with arithmetic-mean updates, minimizing a loss of [[concepts/bregman-information|Bregman Information]]. A correspondence between regular exponential families and regular Bregman divergences gives an expectation-parameter interpretation of EM. Synthetic experiments show that matching the divergence to the generating family yields the highest mean clustering quality in each tested setting.

## Research Question

Which distortion functions support k-means-style clustering with arithmetic-mean representatives, and how do the resulting hard and soft clustering algorithms relate to exponential families and lossy compression?

## Motivation

Squared Euclidean distance, KL divergence, and Itakura-Saito distance support similar iterative clustering procedures despite their different geometries. A common framework explains their shared updates, identifies when mean representatives are optimal, and allows application-specific losses without redesigning the entire algorithm.

## Contributions

- Defines Bregman information as the minimum expected distortion from replacing a random variable with one constant; variance and mutual information arise as special cases (Section 3.1).
- Proves that total Bregman information decomposes into within-cluster and between-cluster information, yielding a hard clustering objective and monotonically improving relocation algorithm (Theorem 1; Propositions 2-3).
- Establishes a correspondence between regular exponential families and the defined subclass of regular Bregman divergences through convex conjugacy and exponential convexity (Theorems 4 and 6).
- Reinterprets an existing efficient EM scheme through Bregman geometry, explaining why component expectation parameters update by weighted averaging (Section 5; Proposition 4).
- Connects soft clustering to rate-distortion optimization with a finite reproduction support, and recovers the information bottleneck objective using KL distortion on conditional distributions (Section 6).

## Method

For a strictly convex potential $\phi$ on a convex domain $S$, differentiable on its relative interior,

$$
d_\phi(x,y)=\phi(x)-\phi(y)-\langle x-y,\nabla\phi(y)\rangle,
\qquad x\in S,\ y\in\operatorname{ri}(S).
$$

With normalized positive observation weights $v_i$ and an admissible mean $\mu=\sum_i v_i x_i$, Proposition 1 gives

$$
\mathbb E[d_\phi(X,s)]
=\mathbb E[d_\phi(X,\mu)]+d_\phi(\mu,s).
$$

Thus the arithmetic mean uniquely minimizes expected distortion when the representative is the **second** argument. Define $I_\phi(X)=\mathbb E[d_\phi(X,\mathbb EX)]=\mathbb E[\phi(X)]-\phi(\mathbb EX)$. For a partition with conditional-mean representatives $M$, Theorem 1 gives

$$
I_\phi(X)-I_\phi(M)
=\sum_h\sum_{i\in C_h}v_i d_\phi(x_i,\mu_h).
$$

Algorithm 1 alternates assigning each observation to its least-divergent representative and recomputing each nonempty cluster's weighted arithmetic mean. Its objective decreases monotonically and its terminal partition is locally optimal with respect to these two updates. Assignment comparisons have hyperplane boundaries. Each iteration uses $nk$ divergence evaluations, plus mean updates; the cost of an evaluation depends on the features and chosen divergence.

For soft clustering, express observations as minimal sufficient statistics. With cumulant $\psi$, conjugate $\phi=\psi^*$, and expectation parameter $\mu=\nabla\psi(\theta)$, the paper writes the regular exponential-family density as

$$
p(x;\theta)=b_\phi(x)\exp[-d_\phi(x,\mu)].
$$

For mixtures within the same family, the parameter-independent factor cancels from posterior responsibilities:

$$
r_{ih}=\frac{\pi_h e^{-d_\phi(x_i,\mu_h)}}
{\sum_g\pi_g e^{-d_\phi(x_i,\mu_g)}},
\qquad
\pi_h\leftarrow\sum_i v_i r_{ih},
\qquad
\mu_h\leftarrow\frac{\sum_i v_i r_{ih}x_i}{\sum_i v_i r_{ih}}.
$$

Uniform weights recover Algorithm 3. Gaussian distributions with fixed spherical variance yield scaled squared Euclidean loss, Poisson distributions yield generalized I-divergence, and exponential distributions yield Itakura-Saito loss. Reversing the divergence arguments changes the centroid; Section 5.3 instead performs mean updates in Legendre-dual coordinates.

Section 6 interprets soft clustering using the finite-support objective $I(Z;\hat Z)+\beta\mathbb E[d_\phi(Z,\hat Z)]$. Conditional-mean representatives turn the distortion term into $I_\phi(Z)-I_\phi(\hat Z)$. Choosing $Z=p(Y\mid X)$ and KL divergence recovers the information bottleneck trade-off $I(X;\hat X)-\beta I(\hat X;Y)$ under the stated representation and conditional-expectation assumptions.

## Experiments

Section 7 compares Gaussian-, Poisson-, and Binomial-derived divergences on synthetic mixtures. Scores are normalized mutual information (NMI) between inferred clusters and generating component labels. The first experiment averages over 10 trials; the tables report the following mean and plus/minus values without explicitly identifying the dispersion statistic in the supplied text.

| Dataset | Generating family | Gaussian divergence | Poisson divergence | Binomial divergence |
| --- | --- | --- | --- | --- |
| 100 samples, 1 dimension, 3 components | Gaussian | 0.701 +/- 0.033 | 0.633 +/- 0.043 | 0.641 +/- 0.035 |
| Same setup | Poisson | 0.689 +/- 0.063 | 0.734 +/- 0.057 | 0.694 +/- 0.059 |
| Same setup | Binomial | 0.769 +/- 0.061 | 0.746 +/- 0.048 | 0.825 +/- 0.046 |
| 2,000 samples, 10 dimensions, 15 components | Gaussian | 0.728 +/- 0.005 | 0.661 +/- 0.007 | 0.669 +/- 0.005 |
| Same setup | Poisson | 0.792 +/- 0.013 | 0.815 +/- 0.014 | 0.802 +/- 0.013 |
| Same setup | Binomial | 0.823 +/- 0.006 | 0.833 +/- 0.011 | 0.849 +/- 0.012 |

The first setup uses equal component priors, means 10, 20, and 40, Gaussian standard deviation 5, and 100 Binomial trials. The second uses overlapping components. The matching divergence has the highest mean NMI in all six rows (Tables 3-4). These experiments illustrate divergence choice; the paper explicitly does not provide a new comparison against other clustering methods. Text clustering and speech coding are discussed through prior studies.

## Limitations

- Optimization is local, with a prescribed number of clusters. Monotonic improvement does not establish a globally optimal partition or mixture.
- Hard clustering applies to general Bregman divergences, while the mixture correspondence uses the regular subclass and suitable sufficient-statistic representations. The arithmetic-mean result requires admissible means and the specified argument order.
- Efficient expectation-parameter updates do not eliminate the cost of finding the convex conjugate. Section 5.2 notes that this transformation may itself require difficult maximum-likelihood optimization.
- Finite-support rate-distortion optimization is nonconvex when the support is learned. Its equivalence to the unrestricted rate-distortion solution requires a sufficiently large support and the stated conditions.
- Synthetic matching-family results do not determine the appropriate divergence for every application. The authors emphasize that desired similarity can matter more than the generating distribution.
- Publication year, venue metadata, and a stable paper identifier are absent from the supplied Markdown; the year is left unset. Parsed formulas contain transcription artifacts, so the summary retains only expressions supported by the surrounding derivations.

## Related Concepts

- [[concepts/bregman-divergences|Bregman Divergences]]: the loss geometry underlying both algorithms.
- [[concepts/bregman-information|Bregman Information]]: quantization loss and the within/between decomposition.
- [[concepts/representative-points|Representative Points]]: squared-error quantization is a special case of the conditional-mean formulation.
- [[concepts/bregman-pca|Bregman PCA]]: a related extension of Euclidean learning objectives to exponential-family geometry.
- [[concepts/curved-bregman-divergences|Curved Bregman Divergences]]: constrained representative sets can require projecting the ambient mean.

## Related Papers

- Banerjee, Dhillon, Ghosh, and Merugu (2004), "An information theoretic analysis of maximum likelihood mixture estimation for exponential families": source of the rate-distortion connections used in Section 6.
- Banerjee, Guo, and Wang (2005), "On the optimality of conditional expectation as a Bregman predictor": supplies the converse characterization under smoothness conditions, discussed in Appendix B.
- Redner and Walker (1984), "Mixture densities, maximum likelihood and the EM algorithm": prior efficient EM scheme reinterpreted here.
- Tishby, Pereira, and Bialek (1999), "The information bottleneck method": recovered as a special case of the compression objective.
- [[papers/curved-representational-bregman-divergences-and-their-applications|Curved Representational Bregman Divergences and Their Applications]]: a later Wiki connection extending ambient centroid geometry to constrained sets; not a citation in this paper.

[[index|Library home]]
