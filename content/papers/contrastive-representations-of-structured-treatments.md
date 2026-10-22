---
title: "Contrastive Representations of Structured Treatments"
type: paper
authors:
  - Oriol Corcoll
  - Athanasios Vlontzos
  - Michael O'Riordan
  - Ciaran M. Gilligan-Lee
year: 2026
date: "2026-04-23"
doi: "10.1038/s44387-026-00105-2"
source_job_id: "c0fd5a83-3548-43e3-afa8-8b1c3abc96a9"
tags:
  - causal-inference
  - structured-treatments
  - causal-representation-learning
  - contrastive-learning
  - treatment-effect-estimation
---

## TL;DR

Structured treatments such as text, products, and molecules can mix latent factors that affect an outcome with factors that do not. Because the latter may proxy for observed confounders, an outcome model can fit observational data yet assign them spurious treatment effects. The paper proposes contrastive learning of a treatment representation from covariate- and outcome-matched pairs, proves block identification of the causally relevant latents under smoothness and invertibility assumptions, and applies the loss to a CATE model. Across one synthetic and two adapted real-world datasets, the contrastive model is substantially less sensitive to perturbations of designated non-causal treatment dimensions than the tested CATE and Structured Intervention Network baselines.

## Research Question

How can a model estimate conditional causal effects when each treatment is a high-dimensional object that entangles outcome-causing latent factors with other factors correlated with confounders?

## Motivation

A product review's tone may affect sales while its style does not; a product embedding may likewise mix purchase-relevant attributes with popularity-related signals. Treating every feature of such an object as causally meaningful can produce nonzero estimated effects when only a non-causal component changes. Observing the confounders does not by itself prevent this failure, because a predictive model can use the non-causal component as a proxy for them and lose that relationship under intervention.

## Contributions

- Formalizes a structured treatment $T$ as a mixture of causal latents $T_C$ and non-causal latents $T_{nC}$, both potentially associated with observed covariates.
- Gives a counterexample in which direct back-door outcome regression on the full treatment and covariates fits the conditional mean but produces a spurious effect under changes to $T_{nC}$.
- Argues that unbiased effects require a treatment representation invariant to $T_{nC}$ and proves block identification of $T_C$ for the idealized contrastive construction under stated structural assumptions.
- Provides a practical pair-selection procedure using neighborhoods in covariate and outcome space and adds a triplet loss to a CATE model.
- Evaluates robustness to non-causal treatment perturbations on synthetic, molecule, and recommender data.

## Method

The structural model uses observed covariates $X$, causally relevant treatment latents $T_C$, non-causal latents $T_{nC}$, observed treatment $T=m(T_C,T_{nC})$, and outcome $Y=f(T_C,X,\epsilon_Y)$. The paper's counterexample shows that an observational regression can attribute outcome variation to $T_{nC}$ because it carries information about $X$. Intervening on $T_{nC}$ then breaks that proxy relationship and exposes the incorrect effect.

The target representation $\psi(T)$ therefore retains $T_C$ while discarding $T_{nC}$. In the ideal construction, treatments observed at equal $X$ and equal $Y$ form positive pairs, while equal-$X$, unequal-$Y$ observations form negative pairs. With an invertible outcome mapping, a positive pair shares $T_C$ even if its observed treatments differ. Under smooth, invertible structural functions and noise distributions positive almost everywhere, the paper invokes a prior content-style identifiability result to conclude that $\psi(T)=\phi(T_C)$ for an invertible $\phi$.

Exact matching is replaced in practice by thresholds $\delta$ and $\epsilon$: covariates are considered close in a lower-dimensional representation $g(X)$, and outcomes are considered close when their distance is at most $\epsilon$. Nearby covariates with nearby outcomes supply positive pairs; nearby covariates with more distant outcomes supply negative pairs. The experiments use bucketing or clustering to construct pairs and a triplet loss on the treatment representation alongside the outcome loss.

## Experiments

The synthetic dataset has 1,000 observations and a ten-dimensional treatment split evenly between designated causal and non-causal dimensions. Outcome noise is increased to test irreducible error. The molecule and Coat recommender datasets are adapted by designating treatment dimensions as causal and adding confounder-correlated non-causal dimensions; test-time perturbations of those dimensions probe reducible error. Models are compared using ordinary predictive MAE and RMSE plus PEHE for paired treatments that share the causal component but differ in the non-causal component.

On unperturbed synthetic data, all models attain broadly similar predictive errors, but the reported PEHE is $0.01 \pm 0.0$ for the contrastive model, $0.07 \pm 0.1$ for the plain CATE model, and $0.20 \pm 0.2$ for SIN. Mean training time is reported as 422.74 ms for the contrastive model, compared with 337.50 ms for CATE and 2687.62 ms for SIN.

For the molecule data, reported PEHE is $0.06 \pm 0.0$ for the contrastive model, $0.12 \pm 0.1$ for CATE, and $0.28 \pm 0.3$ for SIN. For the recommender data, the corresponding values are $1.47 \pm 0.9$, $7.42 \pm 5.2$, and $5.49 \pm 4.9$. The contrastive model also has the lowest reported recommender MAE and RMSE. Sensitivity plots report robustness across tested values of the pair-selection thresholds.

## Limitations

- The identifiability proof assumes smooth, invertible structural functions with smooth inverses, nondegenerate noise, and an outcome determined by $T_C$ and $X$. The practical threshold-based pairing only approximates the equality conditions used by the theorem.
- The statement that an unbiased representation must contain no information about $T_{nC}$ is tied to the paper's estimand and structural setup; it should not be generalized to arbitrary treatment representations or causal questions.
- The real-world datasets are modified so that causal and non-causal treatment dimensions are known by construction. They test robustness under those adaptations rather than recovering unknown causal factors from raw text, audio, images, or molecules.
- PEHE relies on paired examples with known shared causal components, which are generally unavailable in observational applications.
- The synthetic dataset has 1,000 samples, and the paper reports that its code and synthetic data are available only upon request. The supplied results therefore do not provide an independently reproducible large-scale test.
- SIN uses the original hyperparameters but replaces its GNN with an MLP and reduces hidden sizes. The comparison consequently evaluates the reported adaptations rather than every possible implementation of structured-treatment baselines.

## Related Concepts

- [[concepts/structured-treatments|Structured Treatments]]: high-dimensional treatment objects whose causal comparisons depend on an appropriate representation.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: the broader problem of learning intervention-relevant variables from entangled observations.
- [[concepts/disentangled-representations|Disentangled Representations]]: related factor-separation goals that require structural assumptions for causal interpretation.
- Conditional average treatment effect: the covariate-specific estimand studied in the paper.
- [[concepts/text-as-treatment|Text as Treatment]]: an application where causal and non-causal latent attributes can coexist in one observed object.

## Related Papers

- Kaddour et al. (2021), "Causal Effect Inference for Structured Treatments": introduces Structured Intervention Networks, the main structured-treatment baseline.
- von Kugelgen et al. (2021), "Self-Supervised Learning with Data Augmentations Provably Isolates Content from Style": supplies the block-identification result used by the proof.
- Nabi, McNutt, and Shpitser (2022), "Semiparametric Causal Sufficient Dimension Reduction of Multidimensional Treatments": studies average effects through a semiparametric dimension-reduction approach.
- Harada and Kashima (2021), "GraphITE: Estimating Individual Effects of Graph-Structured Treatments": learns representations for graph-valued treatments.
- Pryzant et al. (2020), "Causal Effects of Linguistic Properties": studies causal attributes entangled within text treatments.
- [[papers/structured-pixels-satellite-imagery-as-the-cause-in-causal-effect-estimation|Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]: learns image-treatment representations with a generalized Robinson decomposition under observed-confounding assumptions.

[[index|Library home]]
