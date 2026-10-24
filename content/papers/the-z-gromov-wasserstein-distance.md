---
title: The Z-Gromov-Wasserstein Distance
type: paper
authors:
  - Martin Bauer
  - Tom Needham
  - Mao Nishino
  - Facundo Mémoli
year: null
source_job_id: "0bac40bc-b4f6-4eab-b7c8-e19c050d6207"
tags:
  - gromov-wasserstein
  - optimal-transport
  - metric-measure-geometry
  - attributed-networks
---

[[index|Library home]]

## TL;DR

The paper replaces real-valued network kernels in [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] with kernels valued in an arbitrary metric space $Z$. The resulting [[concepts/z-gromov-wasserstein-distance|Z-Gromov-Wasserstein Distance]] unifies Wasserstein, standard and ultrametric GW, fused GW variants, spectral GW, and comparisons of dynamic or attributed networks. The authors prove existence of optimal couplings and establish metric, topological, and geodesic properties, then derive lower bounds and an approximation through finite-dimensional Euclidean-valued networks. The work is primarily foundational: the numerical method is a sketch, and several $p=\infty$ topology and geodesicity questions remain open.

## Research Question

Can GW-like distances for metric-measure spaces, attributed graphs, stochastic processes, and other structured objects be expressed in one framework whose metric and topological properties follow from those of a common target space?

## Motivation

Many GW variants repeat similar definitions and proofs while changing the objects stored on node pairs. Standard GW compares real-valued distances or kernels, but edge attributes, time-indexed distances, heat kernels, probability distributions, and curves naturally live in other metric spaces. A target-space-valued formulation can expose the common mathematical structure and transfer general results to existing and future variants.

## Contributions

- Defines a $Z$-network as a probability space with an $L^p$ kernel $\omega_X:X\times X\to Z$ and compares two such networks by integrating target-space discrepancies under a coupling.
- Shows that Wasserstein distance, standard GW, ultrametric and $(p,q)$-GW, fused GW and fused network GW, a spectral GW variant, and GW for weighted dynamic metric spaces can be represented as Z-GW distances. It also describes applications to shape graphs, connection graphs, and probabilistic metric spaces.
- Proves that optimal couplings exist and that Z-GW is a metric after quotienting networks by weak isomorphism. The reformulated fused GW and fused network GW distances consequently satisfy an ordinary triangle inequality rather than only the previously reported relaxed form.
- Characterizes the geometry of the network space: it is separable; it is complete exactly when $Z$ is complete; it is path-connected and contractible for finite $p$; and it is geodesic when $Z$ is geodesic.
- Generalizes a hierarchy of computable GW lower bounds and bounds approximation error when a bounded target space is represented by distances to finitely many landmarks in $Z$.

## Method

For $(Z,p)$-networks $X=(X,\omega_X,\mu_X)$ and $Y=(Y,\omega_Y,\mu_Y)$, the distance is

$$
\operatorname{GW}_p^Z(X,Y)=\frac12\inf_{\pi\in\mathcal C(\mu_X,\mu_Y)}
\left\|d_Z\bigl(\omega_X(x,x'),\omega_Y(y,y')\bigr)\right\|_{L^p(\pi\otimes\pi)}.
$$

Continuity of the distortion functional under weak convergence, together with compactness of the coupling set, yields an optimal coupling. The triangle inequality follows by gluing optimal couplings and applying the triangle and Minkowski inequalities. Distance zero is equivalent to weak isomorphism: both kernels pull back almost everywhere to the same kernel on a common probability space.

The authors also parameterize every network over $[0,1]$ and identify the quotient Z-GW space with a quotient of a metric-space-valued $L^p$ space. This representation supports the separability and completeness results. Finite-$p$ contractibility is obtained by continuously shifting mass from any network to a one-point network. When $Z$ is geodesic, pointwise target-space geodesics applied along an optimal coupling produce geodesics between Z-networks.

For computation, network size and incoming or outgoing eccentricity distributions yield a hierarchy of Wasserstein-based lower bounds. For a bounded $Z$ and landmarks $Q=(q_1,\ldots,q_n)$, each kernel value is embedded as its distances to the landmarks. With the $\ell^\infty$ norm, the resulting $\mathbb R^n$-GW approximation differs from Z-GW by at most the Hausdorff distance between $Z$ and $Q$.

## Experiments

The paper contains no empirical benchmark. It gives a numerical scheme for finite Z-networks based on entropically regularized iterative coupling updates. A direct implementation requires $O(m^2n^2)$ time and storage for networks of sizes $m$ and $n$. Using an $N$-landmark Euclidean approximation with $p=r=2$ permits the classical GW factorization and a stated $O(N(n^2m+m^2n))$ update cost. The authors leave implementation, runtime evaluation, and application studies to future work.

Theoretical examples establish scope rather than empirical performance. They encode node- and edge-attributed graphs using product target spaces, missing edges using metric cones, manifold heat kernels as function-valued edges, dynamic metrics as continuous-function-valued edges, and probabilistic distances as probability-measure-valued edges.

## Limitations

- The contribution is theoretical; the proposed numerical iteration is not implemented or evaluated, and general target metrics retain expensive four-index costs without approximation.
- Path-connectedness and contractibility are proved only for $p<\infty$. The paper gives a disconnected-target counterexample for $p=\infty$ and leaves the dependence on the topology of $Z$ unresolved.
- Geodesicity of $Z$ is sufficient for geodesicity of the Z-GW space, but necessity is unresolved. A discrete target gives a geodesic example at $p=1$ and a non-geodesicity result for $p>1$, leaving broader characterizations open.
- Practical convergence of the Euclidean landmark approximation requires target-space coverage; compactness or comparable assumptions are needed to drive its Hausdorff error to zero with finite landmarks.
- The framework requires a metric target. Losses such as Kullback-Leibler divergence and the graphon cut distance do not fit directly because their comparison structure is not a target-space metric aggregated by an $L^p$ norm.
- The supplied Markdown does not identify a publication year, DOI, arXiv identifier, or venue, so no such metadata is inferred here.

## Related Concepts

- [[concepts/z-gromov-wasserstein-distance|Z-Gromov-Wasserstein Distance]]: the paper's target-space-valued network comparison and its main structural results.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: recovered when $Z=\mathbb R$ with its usual metric.
- [[concepts/optimal-transport|Optimal Transport]]: supplies couplings, Wasserstein distances, and several lower bounds; Wasserstein distance itself is also representable as a Z-GW distance.
- [[concepts/graphons|Graphons]]: the cut metric is discussed as a nearby construction that the framework does not exactly subsume.
- [[concepts/geodesic-distance|Geodesic Distance]]: target-space geodesics induce explicit geodesics in the quotient space of Z-networks.

## Related Papers

- [[papers/gromov-wasserstein-transfer-operators|Gromov-Wasserstein Transfer Operators]]: applies regularized standard and fused GW couplings to dynamical estimation, illustrating two variants unified by the Z-GW perspective.
- Memoli (2011), "Gromov-Wasserstein Distances and the Metric Approach to Object Matching": foundational standard-GW theory generalized by this paper.
- Vayer et al. (2020), "Fused Gromov-Wasserstein Distance for Structured Objects": the node-attributed comparison recast here as a Z-GW distance.
- Yang, Labeau, and d'Alche-Buc (2023), "Exploiting Edge Features in Graphs with Fused Network Gromov-Wasserstein Distance": an attributed-network formulation incorporated into the target-space framework.

