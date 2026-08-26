---
title: "From Tokens to Policy: Causal and Interpretable Heterogeneous Treatment Effects Identification"
type: paper
authors:
  - Riccardo Cadei
  - Frank Otchere
  - Nyasha Tirivayi
  - Gustavo Angeles Tagliaferro
  - Falco J. Bargagli-Stoffi
  - Francesco Locatello
year: null
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - causal-representation-learning
  - sparse-autoencoders
  - satellite-imagery
  - policy-evaluation
---

## TL;DR

This paper formulates causal and interpretable heterogeneous treatment effect (HTE) identification as a Markov-blanket discovery problem over a sufficient, aligned representation of pre-treatment data. It introduces Neural EXposure Interaction Search (NEXIS), a forward-backward procedure that conditionally tests candidate treatment interactions and uses multiple-testing control to select principal proxies for latent direct effect modifiers. Semi-synthetic experiments support the method's recovery and precision claims, while applications to anti-poverty programs in Uganda and Ghana use satellite-derived features to surface environmental hypotheses that survey covariates miss.

## Research Question

How can an analysis identify the direct, causally actionable drivers of treatment-effect heterogeneity when those drivers are latent in complex multimodal pre-treatment observations and the learned representation also contains proxies, indirect modifiers, and common-cause correlates?

## Motivation

Average treatment effects do not explain why an intervention works better for some units than others. Flexible HTE estimators can predict variation without identifying its primitive causes, while subgroup methods over curated covariates cannot detect important modifiers that were not measured. This distinction matters for policy: changing a proxy, such as visible road density, need not change the treatment effect if the actual direct modifier is an unmeasured market or environmental condition.

The paper argues that broader pre-treatment measurement, including satellite imagery, and scalable representation learning make causal HTE identification more plausible. Sparse autoencoder dictionaries built on foundation-model representations provide a large set of candidate, potentially interpretable features, but their entanglement makes marginal screening unsuitable for distinguishing direct modifiers from correlated signals.

## Contributions

- Defines a causal and interpretable HTE target in terms of latent direct effect modifiers and their principal proxy coordinates in a learned representation.
- Separates direct modifiers from indirect modifiers, proxies, and common-cause modifiers, clarifying which forms of effect modification support prescriptive interventions.
- Recasts direct-modifier recovery as Markov-blanket discovery and introduces [[Neural EXposure Interaction Search|NEXIS]], a conditional forward-backward search procedure.
- Gives recovery and precision guarantees under Measurement Sufficiency, Representation Sufficiency, Principal Alignment, mean faithfulness, and valid consistent conditional tests.
- Validates NEXIS on semi-synthetic CelebA experiments and applies it to the Youth Opportunities Program in Uganda and LEAP 1000 in Ghana after adding satellite measurements.

## Method

For a binary randomized treatment $T$, potential outcomes $Y(0)$ and $Y(1)$ define the treatment effect $\tau=Y(1)-Y(0)$. The target is the CATE indexed by the latent direct effect modifiers $W^{\mathrm{dir}}$. Other variables can be effect modifiers without being prescriptive: indirect modifiers act through a direct modifier, proxies descend from one, and common-cause modifiers share an ancestor with one.

All pre-treatment measurements $X$ are mapped to a representation $Z=\psi(X)$. The proposed construction uses a frozen foundation-model encoder, a TopK sparse autoencoder, and optional hand-crafted covariates. Measurement Sufficiency requires $X$ to retain all treatment-effect information; Representation Sufficiency requires that $Z$ preserve it; Principal Alignment requires one distinct dominant coordinate of $Z$ for each direct modifier. Under these assumptions, the set of principal proxy coordinates $S^\star$ is a minimal and sufficient representation of the CATE on the learned dictionary.

NEXIS tests, for each candidate $j$ and current selection $S$, the CATE-equivalence null

$$
H_0(j\mid S):\mathbb{E}[\tau\mid Z^{S\cup\{j\}}]=\mathbb{E}[\tau\mid Z^S].
$$

At each forward step it admits the most significant candidate passing the selected gate, then re-tests retained coordinates in a backward step to remove candidates that became redundant. The default gate uses Bonferroni FWER control. An optional spectral-gap rule compares the candidate's conditional statistic with the weakest selected feature. The default conditional test is a linear $T\times Z_j$ interaction test; doubly robust generalized covariance measure tests with quadratic or LightGBM nuisance models provide alternatives for nonlinear settings.

The theorem states that, under Principal Alignment, mean faithfulness, and test validity, the probability of recovering $S^\star$ has asymptotic lower limit at least $1-\alpha$. With Measurement and Representation Sufficiency, the selected representation also identifies the joint interventional heterogeneity of the latent direct modifiers. The paper extends the reasoning to LEAP 1000's regression-discontinuity difference-in-differences setting under conditional parallel trends and local as-if-randomization near the eligibility cutoff.

## Experiments

The semi-synthetic benchmark uses 202,599 CelebA images, SigLIP representations, and a 13,824-code TopK SAE. Wearing a hat and wearing eyeglasses are treated as two known direct modifiers. Across effect-size and sample-size sweeps, NEXIS reaches high recall while retaining precision and intersection-over-union; marginal coordinate-wise tests recover treatment-related channels but lose precision as power increases because entangled companions become significant. Ablations compare TopK sparsity levels, sparse codes with dense pre-activations, linear and doubly robust tests, no correction with FDR and FWER, spectral-gap values, and forward-only with forward-backward search. The recommended configuration is sparse codes, a conditional linear test, FWER correction, $\rho=0.5$, and backward elimination, with GCM tests preferred when linearity is not defensible.

In the Uganda application, the Youth Opportunities Program study contains 2,082 individuals in 439 randomized groups across 331 communities. NEXIS identifies three ethnolinguistic modifiers and two satellite-derived modifiers for skilled employment, and two modifiers for log business assets. The environmental labels are perennial river presence, vegetation spatial heterogeneity, structured agricultural landscape, and NDVI; no individual-level demographic survives selection. A marginal screen finds 71 features for skilled employment and 45 for log business assets, compared with 5 and 2 NEXIS features respectively.

In the Ghana application, LEAP 1000 covers 2,331 households in 162 communities observed in 2015 and 2017. The regression-discontinuity difference-in-differences analysis selects two satellite-derived modifiers for expenditure: ephemeral waterways and closed-canopy forest. Their active-community GATE estimates are +42.9 and +56.2 GH¢/month, compared with +6.0 and +6.4 in inactive communities, while the overall program ATE is +7.35 GH¢/month. No household covariate survives FWER or FDR correction. An exploratory, unadjusted burn-scar feature is reported as a hypothesis rather than a certified discovery.

## Limitations

The causal interpretation depends on Measurement Sufficiency, Representation Sufficiency, Principal Alignment, mean faithfulness, and valid conditional tests. Several assumptions are not directly testable from the data alone, and real applications lack ground truth for the direct-modifier set. VLM-generated labels and mechanism explanations are interpretations of candidate features, not independent causal validation.

The YOP analysis uses homoskedastic individual-level standard errors even though its candidate pool spans individual, group, and community levels; the paper leaves a suitable multilevel test as future work. Satellite features are assigned at community level and cannot resolve within-community exposure. Linear interaction tests can miss nonlinear heterogeneity. In LEAP 1000, the regression-discontinuity design limits the characterization to households near the PMT cutoff, and the strongest modifiers are active in only 6 and 5 communities, so their large subgroup estimates require caution. The temporal satellite analysis supports mechanism hypotheses but does not by itself establish that the program caused the observed land-use changes.

## Related Concepts

- [[Causal and Interpretable Heterogeneous Treatment Effects]]
- [[Neural EXposure Interaction Search|NEXIS]]
- [[Causal Representation Learning]]
- [[Sparse Autoencoders]]
- [[Exploratory Causal Inference]]
- [[Unstructured Outcome Causal Inference]]
- [[Structured Treatments]]
- [[Statistical Identifiability]]
- [[Double Machine Learning]]

## Related Papers

- [[Toward Causal Representation Learning]]
- [[Exploratory Causal Inference in Science]]
- [[Causal Inference with Unstructured Outcomes]]
- [[Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]
- Jerzak, Johansson, and Daoud (2023), "Image-based treatment effect heterogeneity."
- VanderWeele and Robins (2007), "Four types of effect modification: a classification based on directed acyclic graphs."
- Tsamardinos, Aliferis, Statnikov, and Statnikov (2003), "Algorithms for large scale Markov blanket discovery."

[[index|Library home]]
