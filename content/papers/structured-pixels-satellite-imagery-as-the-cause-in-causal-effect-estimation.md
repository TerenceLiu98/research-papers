---
title: "Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation"
type: paper
authors:
  - Chien Lu
  - Thomas Chadefaux
year: null
tags:
  - causal-inference
  - structured-treatments
  - satellite-imagery
  - geospatial-ai
  - representation-learning
  - treatment-effect-heterogeneity
---

## TL;DR

Structured Pixels (SP) treats satellite imagery as a high-dimensional cause or treatment in a causal model, rather than only as a source of outcomes or confounders. It combines learned image and covariate representations with a generalized Robinson decomposition, then estimates conditional effects by comparing an observed image with a counterfactual image while holding covariates fixed. In semi-synthetic experiments, SP achieves lower reported PEHE than the comparison methods on both environmental mosquito and dark-vessel tasks. A Brazilian Amazon analysis produces effects centered near zero, consistent with earlier evidence that landscape changes did not materially reduce crop productivity.

## Research Question

How can causal effects be estimated when the treatment is a satellite image that encodes many spatial and spectral environmental factors, rather than a binary or scalar intervention? More specifically, can a learned representation of an image support counterfactual comparisons while adjusting for observed covariates that affect both the image and the outcome?

## Motivation

Satellite imagery is often used to extract outcomes such as vegetation measures or to provide proxies for confounders. That framing is insufficient when the environmental configuration represented by the image is itself the object whose causal effect is of interest. The paper targets questions such as how mosquito populations would change under a different environment, whether coastal characteristics affect dark-vessel prevalence, and whether landscape changes affect agricultural production.

The treatment is high-dimensional and spatially organized, so directly fitting an outcome model to images and covariates can attribute confounding associations to the image. SP addresses this by learning a lower-dimensional treatment representation and residualizing both treatment features and outcomes against covariates.

## Contributions

- Formalizes satellite imagery as a structured treatment in a causal graph.
- Adapts generalized Robinson decomposition to image treatments through learned treatment and covariate representations.
- Provides a two-step, modular training procedure that supports different image encoders, including a CNN and the pretrained Satlas encoder.
- Evaluates the approach on two semi-synthetic environmental tasks and a real-world Brazilian Amazon re-analysis.

## Method

For region $i$, the observed data consist of an outcome $Y$, satellite image $S \in \mathbb{R}^{C \times H \times W}$, and covariates $X \in \mathbb{R}^{K}$. The target is a conditional average treatment effect comparing a counterfactual image $\bar{s}$ with the observed image $s$ at covariate value $x$:

$$
\tau(\bar{s},s,x) = E[Y \mid do(S=\bar{s}), X=x] - E[Y \mid do(S=s), X=x].
$$

The observational identification argument assumes unconfoundedness and positivity. SP uses a product-effect model in which the treatment and covariate mappings have a shared latent dimension $d$:

$$
Y = \psi(X)^\top \phi(S) + \varepsilon.
$$

Let $m(X)$ estimate the conditional mean outcome and let $e^{\phi}(X)=E[\phi(S)\mid X]$ estimate the covariate-conditional treatment representation. The generalized Robinson decomposition is:

$$
Y-m(X)=\psi(X)^\top[\phi(S)-e^{\phi}(X)]+\varepsilon.
$$

The resulting effect estimate is:

$$
\tau(\bar{s},s,x)=\psi(x)^\top[\phi(\bar{s})-\phi(s)].
$$

Training proceeds in two steps. First, an MLP estimates $m(X)$ with squared error and L2 weight regularization. Second, the residual outcome $\tilde{Y}=Y-\hat{m}(X)$ is used to train $\phi$, $\psi$, and $e^{\phi}$ by alternating updates. The image representation $\phi$ can use a CNN or a pretrained Satlas Swin Transformer encoder followed by a projection layer. The $\psi$ and $e^{\phi}$ mappings use MLPs. Alternating optimization takes several representation-learning updates for each propensity-representation update, avoiding the computational cost of cross-fitting used in related R-learner procedures.

## Experiments

The paper uses semi-synthetic data so that ground-truth counterfactual effects are available. Data are split 70%/10%/20% for training, validation, and testing, and performance is evaluated with reported PEHE across random seeds.

In Case 1, 1,500 EuroSAT images from five land-use categories are used. Each image has nine channels at $64 \times 64$ resolution, seven simulated category-dependent covariates, and four pixel-level indices: NDVI, NDMI, NDRE, and MSI. The outcome is a simulated total mosquito population. The best reported SP result is SP-Satlas with latent dimension 16, with PEHE $0.73\ (0.30)$, compared with $0.96\ (0.09)$ for the Random Forest baseline.

In Case 2, 1,000 images from the LICS Irish coastal dataset are used. The images have seven channels at $256 \times 256$ resolution. Sea-surface temperature, turbidity, and chlorophyll indices help generate a simulated fish population, while coastal influence and distance effects determine vessel presence. The top ten PCA components of each image serve as covariates, representing image-level factors such as economic incentives or governance. SP-CNN with latent dimension 16 reports PEHE $0.12\ (0.05)$, compared with $0.33\ (0.09)$ for the Boosted Regression Tree baseline.

The sensitivity analysis removes covariates to violate unconfoundedness. SP performance declines as covariates are removed; the domain-specific baseline begins to outperform SP after two missing covariates in Case 1 and five in Case 2. t-SNE visualizations of $\phi(S)$ show vegetation gradients in Case 1 and land-ocean or coastal-complexity patterns in Case 2.

For the real-world analysis, the authors re-analyze 352 Brazilian Amazon municipalities using 2007 observations, 17 economic and socio-political covariates, and Landsat imagery as treatment. The model uses an 80%/20% training-validation split for model selection and is then retrained on all observations. Comparing images from before and after 2007 while holding 2007 covariates fixed yields CATE values centered near zero for both policy-listed and non-listed municipalities, consistent with Koch et al. (2019)'s synthetic-control analysis.

## Limitations

The causal interpretation depends on unconfoundedness and positivity. The sensitivity study shows that the method is vulnerable when relevant covariates are omitted, and unobserved confounding remains unresolved. The product-effect representation also makes the estimand dependent on the learned mappings $\phi$ and $\psi$. The experiments use semi-synthetic data with domain-designed data-generating mechanisms, while the real-world analysis is a re-analysis without an experimental intervention. Encoder choice matters: SP-CNN outperforms SP-Satlas in the dark-vessel case, so a more complex or pretrained encoder is not uniformly better.

## Related Concepts

- [[Structured Treatments]]
- [[Spatial Causal Inference]]
- [[Unstructured Outcome Causal Inference]]
- [[Double Machine Learning]]
- [[Preferential Sampling]]
- Representation learning
- Conditional average treatment effects

## Related Papers

- Kaddour et al. (2021), "Causal effect inference for structured treatments."
- Nie and Wager (2021), "Quasi-oracle estimation of heterogeneous treatment effects."
- Robinson (1988), "Root-n-consistent semiparametric regression."
- Jerzak, Johansson, and Daoud (2023), "Integrating earth observation data into causal inference: Challenges and opportunities."
- Thorat, Kolla, and Pedanekar (2024), "I see, therefore I do: Estimating causal effects for image treatments."
- Koch et al. (2019), "Agricultural productivity and forest conservation: Evidence from the Brazilian Amazon."
