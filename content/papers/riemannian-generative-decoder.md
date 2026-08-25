---
title: "Riemannian Generative Decoder"
type: paper
authors:
  - Andreas Bjerregaard
  - Søren Hauberg
  - Anders Krogh
year: null
openreview: "https://openreview.net/forum?id=vuPMXg1FDT"
repository: "https://github.com/yhsure/riemannian-generative-decoder"
tags:
  - riemannian-representation-learning
  - geometric-regularization
  - manifold-learning
  - generative-modeling
  - biological-data
---

## TL;DR

The Riemannian generative decoder (RGD) learns one latent code per observation directly on a chosen Riemannian manifold while jointly training a decoder. It removes the encoder and its manifold-density approximation, and uses noise scaled by the inverse metric to regularize decoder smoothness. Across a cyclic cell-cycle dataset, a synthetic branching diffusion process, and human mitochondrial DNA, the method recovers useful spherical, toroidal, and hyperbolic structure, with the strongest geometric gains appearing when the regularization noise is tuned to the task.

## Research Question

Can manifold-valued latent representations be learned across a broad class of geometries without the numerically difficult posterior-density approximations required by encoder-based variational models, while retaining reconstruction, generation, and downstream utility?

## Motivation

Euclidean latent spaces can distort data whose intrinsic structure is cyclic, hierarchical, or otherwise non-Euclidean. Variational autoencoders on spheres, hyperbolic spaces, or general manifolds often require specialized priors, normalization constants, Monte Carlo estimates, or approximate wrapped distributions. The paper instead treats each latent code as an explicit parameter and asks whether Riemannian optimization can impose the desired geometry directly. This is especially relevant for biological data, where cell-cycle trajectories and evolutionary branching provide domain-motivated geometric hypotheses.

## Contributions

- Introduces an encoder-less MAP representation-learning framework that jointly optimizes decoder parameters and per-sample latent codes on any supported Riemannian manifold.
- Introduces geometry-aware noise whose covariance is proportional to the inverse Riemannian metric, producing a first-order Jacobian regularizer that aligns decoder smoothness with local geometry.
- Supports heterogeneous latent spaces through product manifolds and can use the manifold implementations available in geoopt, including Euclidean, spherical, Lorentz, Poincare, Stiefel, and positive-definite geometries.
- Shows that the learned geometry can expose cyclic cell-cycle structure, hierarchical branching in synthetic and mitochondrial-DNA data, and useful downstream biological information.
- Reports stable runtime as latent dimension increases in settings where variational baselines become numerically brittle or computationally infeasible.

## Method

For observations $x_i$, the model learns latent codes $z_i \in \mathcal{M}$ and a differentiable decoder $f_\theta : \mathcal{M} \to \mathcal{X}$. It minimizes a MAP objective combining the negative observation log-likelihood, a latent prior, and a parameter prior. Compact manifolds use a uniform Riemannian-volume prior in the experiments; non-compact manifolds can use wrapped distributions or Riemannian normals. Decoder parameters are updated with Adam, while the latent codes are updated with RiemannianAdam and retracted back to the manifold after each step.

During training, a latent code is perturbed by a tangent-space Gaussian with covariance $\sigma^2 G^{-1}(z)$ and mapped back to the manifold. A second-order expansion gives the expected noisy loss as approximately

$$
L(z) + \sigma^2 \operatorname{Tr}\left(J(z)^\top G^{-1}(z)J(z)\right),
$$

after neglecting residual-weighted decoder Hessian terms. Thus the noise penalizes decoder variation according to the prescribed metric. The curvature magnitude and global noise scale have different effects: curvature changes the spatial profile of the perturbation, whereas $\sigma$ changes its overall amplitude.

## Experiments

The cell-cycle experiment uses 5,367 fibroblast scRNA-seq profiles and 189 cell-cycle genes. RGD on a sphere obtains the highest phase-distance correlations among the tested RGD geometries: test Pearson and Spearman correlations are both $0.60 \pm 0.03$, compared with $0.55 \pm 0.04$ and $0.57 \pm 0.03$ for Euclidean $\mathbb{R}^3$. Euclidean $\mathbb{R}^3$ gives the best reconstruction, with test MSE $0.17 \pm 0.00$; toroidal embeddings have greater run-to-run variability.

On the 6,350-observation synthetic branching diffusion dataset, a Lorentz model with curvature $c=0.2$ and noise scale $\sigma=1.0$ reaches test Pearson and Spearman correlations of $0.80 \pm 0.02$ and $0.76 \pm 0.02$, respectively. The UMAP baseline does not reveal the tree topology, while regularized hyperbolic latents recover it in a Poincare projection. Increasing noise improves geometric correlation up to roughly $\sigma \approx 0.9$ in the ablation, after which noise overwhelms decoder capacity and reconstruction worsens.

For human mitochondrial DNA, the authors analyze 61,665 rCRS and 57,385 RSRS sequences after quality filtering and mutation encoding. Hyperbolic RGD latents recover haplogroup hierarchies more clearly than Euclidean or UMAP projections and perform best in the reported downstream classification table at $\sigma=0.5$: rCRS region accuracy is $0.97$ with XGBoost, compared with $0.85$ for Euclidean RGD, while first-letter haplogroup accuracy is $0.85$ versus $0.74$. A neighbor-joining tree built from Lorentz distances has global structure qualitatively similar to established mitochondrial lineages.

The general-utility checks find cell-cycle generation discrimination accuracy of $0.58$ for RGD sphere, matching S-VAE and improving on the reported $0.62$ for $\Delta$VAE sphere. Runtime remains nearly flat across 5D, 50D, and 500D RGD latents (for example, hyperbolic RGD increases from $0.25$ to $0.39$ seconds per epoch), whereas P-VAE breaks at 50D and explicit curvature regularization is infeasible at higher dimensions.

## Limitations

The decoder-only parameterization stores one representation per observation, so memory grows linearly with dataset size and may be prohibitive for millions of points. Test-time representations require a further optimization step rather than a single encoder pass. The manifold is treated as a manually chosen hyperparameter; automatic geometry selection is not solved. The biological and synthetic evaluations are exploratory, the hmtDNA tree-distance proxy uses one-hot sequence distance for some metrics, and geometric fidelity can trade off against reconstruction accuracy. The regularization derivation relies on a local expansion and assumes residual-weighted decoder Hessian terms are negligible. The experiments use relatively simple, low-dimensional manifolds, so the generality claim is primarily architectural rather than a guarantee of performance on arbitrary manifolds.

## Related Concepts

- [[Riemannian Representation Learning]]
- [[Geometry-Aware Regularization]]
- [[Function-Space Autoencoders]]
- [[Hierarchical Concept Embedding]]
- Hyperbolic embeddings
- Latent variable models
- Dimensionality reduction

## Related Papers

- Schuster and Krogh (2023), "The Deep Generative Decoder: MAP Estimation of Representations Improves Modelling of Single-Cell RNA Data."
- Mathieu, Le Lan, Maddison, Tomioka, and Teh (2019), "Continuous Hierarchical Representations with Poincare Variational Auto-Encoders."
- Davidson, Falorsi, De Cao, Kipf, and Tomczak (2018), "Hyperspherical Variational Auto-Encoders."
- Kalatzis, Eklund, Arvanitidis, and Hauberg (2020), "Variational Autoencoders with Riemannian Brownian Motion Priors."
- Nickel and Kiela (2017), "Poincare Embeddings for Learning Hierarchical Representations."
- Lee and Park (2023), "On Explicit Curvature Regularization in Deep Generative Models."
