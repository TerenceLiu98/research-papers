---
title: Estimating Stochastic Block Models in the Presence of Covariates
type: paper
authors:
  - Yuichi Kitamura
  - Louise Laage
year: null
source_job_id: "ea2f0369-d713-4c8f-9681-9d355efd1184"
tags:
  - stochastic-block-models
  - spectral-clustering
  - nonparametric-estimation
  - network-analysis
---

## TL;DR

The paper estimates network connection probabilities and latent-community probabilities when both vary nonparametrically with observed node covariates. It combines spectral clustering of a nearest-neighbor subnetwork with local averaging within estimated communities. The authors derive finite-sample error bounds that account for clustering mistakes, localization bias, and network sparsity. The evidence is theoretical; community labels are recovered up to permutations, and interpreting them consistently across covariate values requires further restrictions.

## Research Question

Can a stochastic block model accommodate flexible dependence of both network links and latent community membership on observed covariates, while retaining a feasible estimator with non-asymptotic guarantees?

## Motivation

Standard stochastic block models represent unobserved heterogeneity through discrete communities but do not, by themselves, represent variation in edge probabilities with observed characteristics. More structured network models can incorporate covariates through specified functional forms and node effects. This paper instead allows observed covariates and latent communities to be dependent without specifying that dependence parametrically. This matters when observed similarity and latent group membership both contribute to network structure.

## Contributions

- Develops [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]] in which both block-specific connection probabilities and community-assignment probabilities are nonparametric functions.
- Proposes local spectral clustering followed by nearest-neighbor estimates of the two probability objects (Section 2).
- Establishes high-probability bounds for the localized normalized adjacency matrix, community misclassification, and subsequent probability estimates (Sections 3-4).
- Extends nearest-neighbor radius arguments to independent, non-identically distributed covariates arising after conditioning on community assignments (Supplement A1.1).
- Explains why matching row and column community labels across covariate values poses an identification problem beyond ordinary global relabeling (Remark 4.1).

## Method

### Model and Targets

For node covariates $X_i\in\mathbb R^d$ and latent memberships $g_i\in\{1,\ldots,G\}$, the model specifies

$$
\Pr(A_{ij}=1\mid\mathbf X,\mathbf g)=B_{g_i g_j}(X_i,X_j),
\qquad \pi_g(x)=\Pr(g_i=g\mid X_i=x).
$$

Node pairs $(X_i,g_i)$ are sampled independently and identically. Conditional on the memberships, covariate distributions can differ across communities. The edge-probability function may depend on network size $N$, allowing sparsity. Estimation targets $B(x,x')$ and $\pi(x)$ at specified covariate values, with $G$ supplied to the algorithm.

### Local Clustering and Averaging

1. Select the $k$ nearest nodes to $x$ and the $k$ nearest nodes to $x'$. Extract the $k\times k$ adjacency submatrix $A^\eta$ between these neighborhoods.
2. Form $L_\tau^\eta=(O^\eta+\tau I)^{-1/2}A^\eta(Q^\eta+\tau I)^{-1/2}$, where $O^\eta$ and $Q^\eta$ contain row and column degree sums and $\tau$ regularizes them.
3. Take the leading $G$ left and right singular vectors and run K-means separately on their rows. SVD is needed because the two neighborhoods generally differ, making the localized matrix asymmetric even for an undirected network.
4. Estimate $\pi_g(x)$ by the fraction of neighbors assigned to community $g$. Estimate $B_{gh}(x,x')$ by averaging observed edges between the corresponding estimated groups (Equations 2.1-2.2).

Writing $\widehat n_g(x)$ for the estimated local group size gives

$$
\widehat\pi_g(x)=\frac{\widehat n_g(x)}{k},\qquad
\widehat B_{gh}(x,x')=
\frac{\sum_{i\in\widehat{\mathcal G}_g(x)}\sum_{j\in\widehat{\mathcal G}_h(x')}A_{ij}}
{\widehat n_g(x)\widehat n_h(x')}.
$$

### Guarantees and Identification

The analysis controls matrix perturbation, transfers this control to singular-vector error through a Davis-Kahan argument, and then bounds a sum of community-specific misclassification fractions. Bounds require regular covariate support, bounded community-conditional densities with positive lower bounds, Lipschitz probability functions, sufficient local group sizes and degrees, and adequate spectral separation. The second-stage bounds add clustering error to oracle smoothing bias and sampling error (Lemmas 4.1-4.3).

In the illustrative regime $B=\rho_N B_0$, $\tau=0$, and nonvanishing community proportions, Remarks 3.1-3.4 describe matrix fluctuation of order $\sqrt{\log(k/\delta)/(\rho_N k)}$ and localization bias of order $(k/N)^{1/d}$. Balancing these terms yields a matrix-error rate of roughly $(N\rho_N)^{-1/(d+2)}$ and a misclassification-measure rate of roughly $(N\rho_N)^{-2/(d+2)}$, suppressing logarithmic factors and retaining the spectral and sample-size conditions. These are theoretical rates, not measured accuracies or a common rate for every estimated quantity.

Row and column cluster labels can be permuted separately. Remark 4.1 discusses additional matching restrictions, including an invariant strict ranking of community probabilities or conditional assortativity. Under the stated assortativity restriction, maximizing the trace over column permutations aligns labels; a corresponding disassortativity restriction motivates trace minimization. Neither restriction is established by the basic model.

## Experiments

The supplied paper reports no simulations, empirical applications, runtime measurements, or benchmark comparisons. Its results are analytical bounds and rate interpretations. The conclusion explicitly calls for extensive simulation to assess practical performance.

## Limitations

- The number of communities is an input. The supplied text does not give a data-driven procedure for selecting $G$, $k$, or $\tau$ with demonstrated practical performance.
- Sparse local neighborhoods, rare communities, weak spectral separation, and increasing covariate dimension make the guarantees less informative. Positive local group sizes are also needed for the edge-average denominators.
- The principal clustering and probability results concern a fixed covariate pair. Uniform nearest-neighbor radius bounds in the supplement do not by themselves establish uniform guarantees for the entire estimated probability surface.
- Correct labels up to separate local permutations do not identify within-community connections or changes across covariate values without a consistent matching scheme. Continuity-based matching is discussed but may be impractical (Remark 4.1).
- The model permits dependence between covariates and latent membership, but does not identify causal effects of covariates on links.
- The supplied Markdown contains damaged formulas and inconsistent wording, including a conditional-probability phrase in Lemma 4.3 despite its placement in the unconditional-results subsection. This summary retains the stated method and qualitative bounds without reconstructing damaged theorem constants.

The supplied source does not state the paper's publication year, venue, DOI, or arXiv identifier. The year is therefore left unspecified.

## Related Concepts

- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: separates observed covariate variation from latent community structure while allowing dependence between them.
- [[concepts/social-network-analysis|Social Network Analysis]]: the broader setting for modeling edges, communities, and homophily.

## Related Papers

- Lei and Rinaldo (2015), "Consistency of spectral clustering in stochastic block models": cited foundation for spectral clustering and misclassification analysis.
- Rohe, Qin, and Yu (2016), "Co-clustering directed graphs to discover asymmetries and directional communities": cited foundation for separate left and right spectral representations.
- Jiang (2019), "Non-asymptotic uniform rates of consistency for k-nn regression": cited source for oracle community-probability regression bounds.
- Portier (2021), "Nearest neighbor process: weak convergence and non-asymptotic bound": cited basis for nearest-neighbor radius arguments.
- [[papers/a-data-driven-network-approach-for-characterization-of-political-parties-ideology-dynamics|A data-driven network approach for characterization of political parties' ideology dynamics]]: a library comparison using block-model communities in political networks; it is not an evaluation of this estimator or a citation claimed by this paper.

[[index|Library home]]
