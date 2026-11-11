---
title: Linear Partial Gromov-Wasserstein Embedding
type: paper
authors:
  - Yikun Bai
  - Abihith Kothapalli
  - Hengrong Du
  - Rocio Diaz Martin
  - Soheil Kolouri
year: null
source_job_id: "9fee8840-3893-444f-88db-61cacb250e50"
tags:
  - gromov-wasserstein
  - optimal-transport
  - partial-matching
  - metric-measure-geometry
  - shape-analysis
---

[[index|Library home]]

## TL;DR

The paper introduces [[concepts/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]] (LPGW), which maps metric-measure spaces into reference-relative representations obtained from partial Gromov-Wasserstein transport plans. It replaces quadratic-in-dataset-size pairwise PGW solves with one reference-to-sample solve per object, retains partial matching, and yields large runtime reductions with near-PGW performance in shape retrieval and substantially better robustness to noise than balanced linear transport embeddings on point-cloud MNIST.

## Research Question

Can partial Gromov-Wasserstein comparison be linearized around a reference metric-measure space so that many structured objects can be compared efficiently without losing PGW's ability to ignore unmatched mass?

## Motivation

[[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] compares objects through their internal geometry even when they lie in different ambient spaces, but its balanced coupling requires equal mass and its non-convex quadratic objective is expensive for all-pairs comparison. Partial GW relaxes the mass constraint and is more robust to incomplete shapes and outliers, yet computing it between every pair of $K$ objects still requires $O(K^2)$ PGW optimizations. A reference-based embedding can amortize those expensive solves while preserving the partial-matching structure.

## Contributions

- Extends linear GW to partial transport by representing each target relative to a fixed reference space using an optimal partial coupling, a gauge discrepancy on the transported reference mass, and a term accounting for unmatched mass.
- Defines conditioned and plan-independent LPGW discrepancies, proves existence and pseudo-metric properties, and gives conditions under which the construction is a metric and recovers the PGW distance from the reference.
- Derives a barycentric-projection approximation and a discrete implementation that stores a projected gauge matrix, transported reference weights, and unmatched-mass information.
- Reduces the number of expensive PGW solves for $K$ objects from $O(K^2)$ to $O(K)$; subsequent pairwise comparisons operate on their embeddings.
- Evaluates the method on elliptical disks, 2D and 3D shape retrieval, and transformed and noise-corrupted point-cloud MNIST.

## Method

Given a reference gauged measure space $\mathbb X$ and a target $\mathbb Y$, the method first solves a partial GW problem between them. Under a partial Monge assumption, the embedding records the difference between the reference gauge and the target gauge pulled back through the partial transport map, together with the transported part of the reference measure and a scalar term for unmatched mass. Two targets are compared on the common transported reference mass, with a penalty for mass not shared by their embeddings.

For arbitrary optimal plans, LPGW is defined through a gluing problem over partial couplings. The practical approximation replaces each plan with its barycentric projection. In the discrete setting, a target is represented by a projected pairwise-gauge matrix $\widetilde K$, transported weights $\widetilde q$, and an unmatched-mass quantity. Pairwise approximate LPGW then combines a weighted squared difference between projected gauge matrices with the mass penalty. The reference choice matters because it determines both projection quality and computational cost.

## Experiments

On 100 elliptical disks with $\lambda=0.1$, exact all-pairs PGW takes 46.97 minutes. LPGW takes 0.08-3.78 minutes across nine references. Its agreement with PGW depends strongly on the reference: mean relative error ranges from 0.2542 to 0.0198 and Pearson correlation from 0.5738 to 0.9954.

For SVM shape retrieval, LPGW reaches 97.5% accuracy on the 2D dataset, compared with 98.1% for GW, 96.2% for PGW, and 93.7% for LGW; its distance computation takes 0.5 seconds versus 39-43 seconds for PGW and GW. On the 3D complete/incomplete-shape dataset, LPGW reaches 93.7%, essentially matching PGW's 93.8%, while taking 1.8 minutes rather than 203.6 minutes.

On transformed point-cloud MNIST, LPGW and LGW both achieve 82.5% with rotation or flipping but no added noise. With noise mass $\eta=0.1,0.3,0.5$, LPGW records 81.8%, 75.8%, and 72.9% accuracy, whereas LOT and LGW fall to 12.5-17.0%. The paper attributes this gap to partial matching excluding most noise points from the embedding.

## Limitations

- The formal metric and recovery results require stated assumptions, including partial Monge structure or sufficiently large $\lambda$ for some simplified formulas; the numerical method uses a barycentric approximation and one selected optimal plan rather than optimizing over all plans.
- LPGW quality is reference-dependent. The elliptical-disk experiment shows large variation in approximation error and correlation, while practical experiments use a selected sample or a computed GW/PGW barycenter.
- The PGW and LPGW objectives remain non-convex, so the reference-to-target solves can return local solutions; linearization reduces the number of expensive solves but does not remove this optimization issue.
- The barycentric-projection result is established for particular gauge structure. Generalizing the projection map to other gauges is left for future work.
- Experiments cover synthetic ellipses, two shape-retrieval datasets, and point-cloud MNIST. They do not establish behavior for broader data modalities, substantially larger supports, or alternative partial-GW solvers.
- The supplied manuscript does not identify a publication year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/linear-partial-gromov-wasserstein-embedding|Linear Partial Gromov-Wasserstein Embedding]]
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/multidimensional-scaling|Multidimensional Scaling]]

## Related Papers

- Bai et al. (2024), "Partial Gromov-Wasserstein Metric": supplies the PGW formulation linearized by this paper.
- Beier, Beinert, and Steidl (2022), "On a Linear Gromov-Wasserstein Distance": develops the balanced reference-based construction extended here to partial matching.
- Bai et al. (2023), "Linear Optimal Partial Transport Embedding": linearizes partial transport when source and target share an ambient ground space.
- Wang et al. (2013), "Linear Optimal Transportation": establishes the reference-based linear OT strategy underlying later LGW and LPGW constructions.
- Peyre, Cuturi, and Solomon (2016), "Gromov-Wasserstein Averaging of Kernel and Distance Matrices": provides the barycenter approach used to construct reference spaces in the experiments.

