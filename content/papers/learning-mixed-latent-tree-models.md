---
title: "Learning Mixed Latent Tree Models"
type: paper
authors: ["Can Zhou", "Xiaofei Wang", "Jianhua Guo"]
year: null
tags: [latent-variable-models, structure-learning, mixed-data]
---

[[index|Library home]]

## TL;DR

The paper learns hierarchical dependence among binary and continuous observations through binary latent tree nodes. An additive correlation distance supports bottom-up structure recovery, while the PEMT moment estimator uses small matrix eigendecompositions to estimate parameters. The authors give a finite-sample recovery bound and asymptotic normality results.

## Research Question

Can a latent tree's structure and parameters be learned consistently from mixed binary and continuous observations without iterative likelihood optimization?

## Motivation

A single latent class imposes conditional independence on all observations. A tree of latent variables represents more local dependence and hierarchical groups, while accommodating mixed measurement types that homogeneous discrete or continuous models do not directly address.

## Contributions

- Extends information-distance structure learning to mixed observations with binary hidden nodes.
- Applies the SLLT bottom-up algorithm with a finite-sample exact-recovery guarantee.
- Develops Parameter Estimation for Mixed Latent Trees (PEMT), extending discrete spectral estimation, and establishes asymptotic normality under the stated assumptions.

## Method

The model has observed leaves and binary latent internal nodes; observed variables are binary or Gaussian conditional on their adjacent latent node. Assumptions require nonzero pairwise correlations, at least three neighbors per hidden node, and no completely dependent adjacent variables.

Define $d_{uv}=-\log|\rho_{uv}|$. Conditional independence through a binary separator makes correlations multiply along paths, so distances add. SLLT identifies sibling groups from constant differences $d_{uw}-d_{vw}$, introduces hidden parents, and repeats. Its stated complexity with population distances is $O(\operatorname{diam}(T)m^3)$ for $m$ leaves. Sample versions use tolerances rather than exact equality.

Theorem 3 states recovery probability at least $1-\eta$ when

$$
n>\frac{256c\log(48m^2/\eta)}{c_{\min}^2\min\{\phi_{\min}^2/4,1\}}.
$$

Here $c$ depends on distributional moments, $c_{\min}$ is the minimum absolute observed covariance, and $\phi_{\min}$ is the smallest nonzero separation between relevant distance differences. These quantities can deteriorate with tree size.

Given a tree, PEMT selects triples separated by a latent node and decomposes $E_{uvw}E_{uv}^{-1}=\Gamma_{u|h}\Lambda_{w|h}\Gamma_{u|h}^{-1}$. Eigenvalues encode conditional means or probabilities; normalized eigenvectors encode conditional moments. Linked local decompositions recover latent-to-latent transitions, with consistent state labeling. Continuous variables are centered, and conditional variances follow from second moments minus squared means. Theorem 4 establishes asymptotic normality for the centered model with given structure.

## Experiments

Simulations use four tree configurations, 500 repetitions per sample size for consistency experiments, and samples from 10,000 to 1,000,000. Structure failure rates and parameter errors decrease with sample size. A further 1,000-observed-variable experiment reports declining Robinson–Foulds distance and error in the number of latent nodes.

Table 1 compares PEMT with randomly initialized EM run for 100 iterations over 100 datasets. For model 1 at 100,000 samples, PEMT has MAE 0.0201234 versus EM's 0.0309361, and reported runtime 1.61 versus 2328.86 seconds. Accuracy advantages are not universal: on model 2 at the same size, EM has MAE 0.0023239 versus PEMT's 0.0062655. Timings come from the authors' R implementation on an Intel i5-3470 desktop.

On Forest Cover Type (581,012 samples), preprocessing produces 58 observed variables: 10 continuous, 47 binary soil components, and a binary Lodgepole pine indicator. The recovered tree has nine latent nodes and diameter seven. Soil groups align with some taxonomy and landtype groupings; these are descriptive interpretations rather than validated causal mechanisms.

## Limitations

The main guarantees concern binary hidden states and the specified observation model. Distance additivity is broader than conditional Gaussianity, but this alone does not extend every statistical guarantee. Weak covariance and small distance separation can require large samples. Practical structure learning uses distance cutoffs and increases its tolerance until a tree is obtained. EM comparisons use a fixed iteration budget and random initialization. Parameter normality is established with structure given, rather than as a general guarantee after arbitrary structure selection.

The supplied Markdown does not specify a publication year or stable identifier; these metadata are left unasserted.

## Related Concepts

- [[concepts/mixed-latent-tree-models|Mixed Latent Tree Models]]

## Related Papers

- Wang, Guo, Hao, and Zhang (2017), *Spectral methods for learning discrete latent tree models*: supplies the SLLT foundation and discrete parameter-estimation predecessor.
- Choi et al. (2011), *Learning latent tree graphical models*: related distance-based latent-tree reconstruction.
- Chang (1996), *Full reconstruction of Markov models on evolutionary trees: identifiability and consistency*: motivates local matrix decomposition for parameter recovery.
