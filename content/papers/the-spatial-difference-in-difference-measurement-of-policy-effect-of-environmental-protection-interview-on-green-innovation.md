---
title: The Spatial Difference-in-Difference Measurement of Policy Effect of Environmental Protection Interview on Green Innovation
type: paper
authors:
  - Juying Zeng
  - Cristina Blanco-Gonzalez-Tejero
  - F. Javier Sendra
year: null
tags:
  - causal-inference
  - difference-in-differences
  - spatial-econometrics
  - environmental-policy
  - green-innovation
---

## TL;DR

Using firm data from China's Yangtze River Delta, the paper reports that environmental protection interviews are associated with more green patenting in a conventional multi-period difference-in-differences model, especially utility patents and patenting by highly polluting and privately owned firms. A spatial model changes the interpretation: it estimates a negative direct effect in interviewed cities but a positive spillover to neighboring cities. The contrast illustrates why policy interference must be modeled explicitly rather than treating every unit as independent.

## Research Question

How do mandatory environmental protection interviews affect green innovation among Yangtze River Delta manufacturing firms, how do effects vary across patent and firm types, and does the policy generate spillovers into neighboring non-interviewed cities?

## Motivation

China's environmental protection interview (EPI) system publicly holds local officials responsible for specific environmental problems. This vertical pressure may be transferred to firms through tighter enforcement, but firms may respond by innovating, reducing innovation investment, or relocating activity. Because regulatory pressure and technology can cross administrative boundaries, a conventional DID analysis may also violate the stable-unit treatment assumption by ignoring effects on neighboring cities.

## Contributions

- Estimates EPI effects on green patenting with both conventional multi-period DID and [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]].
- Separates invention patents from utility patents and reports heterogeneity by pollution intensity, ownership, and manufacturing subsector.
- Distinguishes the modeled direct effect in interviewed cities from the spatial spillover associated with interviews in neighboring cities.
- Tests whether government environmental subsidies moderate the estimated policy effect.

## Method

The firm-level analysis uses 11,567 observations for A-share-listed manufacturing enterprises registered in the Yangtze River Delta from 2010 to 2020. The authors match 23,075 patents from incoPat to listed firms and identify green patents through keyword filtering followed by manual screening. Green innovation is measured as $\ln(1+\text{green patents})$, with separate measures for invention and utility patents. Financial variables and environmental subsidies come from the Wind database.

EPI is treated as a staggered quasi-natural experiment: firms in cities interviewed from 2014 to 2017 form the treatment group, and the post indicator turns on at a city's interview date. The conventional specification includes firm and year fixed effects and firm controls. A subsidy interaction tests moderation.

The spatial specification adds spatial lags of outcomes, treatment, and covariates. Its weights are based on inverse squared straight-line distances between 26 cities, $W_{ij}=1/d_{ij}^2$. This relaxes the no-interference premise of conventional DID and separates a local treatment coefficient from the coefficient on spatially lagged treatment. As [[concepts/spatial-autocorrelation|Spatial Autocorrelation]] does not itself establish diffusion, these coefficients depend on the paper's spatial and causal specification.

## Experiments

In the conventional DID estimates, EPI is associated with a **0.399** increase in the log-transformed overall green-patent outcome. The coefficients are **0.167** for invention patents and **0.366** for utility patents, each reported at the 1% significance level. Estimates are larger for highly polluting firms than for low-polluting firms (**0.433** versus **0.360**) and for privately owned firms than for state-owned firms (**0.404** versus **0.361**).

The spatial results point in opposite directions locally and among neighbors. For the overall manufacturing sample, the direct EPI coefficient is **-0.239** at the 5% level, while the spatially lagged policy coefficient is **45.624** at the 1% level. The paper interprets this as constrained innovation in interviewed cities alongside a deterrence-induced increase in green innovation in neighboring non-interviewed cities. Positive spillovers are also reported for highly polluting, low-polluting, and light-textile groups, but not for the resource-processing or machinery-and-electronics groups.

Government environmental subsidies do not show a robust overall moderating effect. In the firm-level model, the interaction is weakly negative for overall and utility green innovation; subgroup interactions are generally insignificant. In the spatial model, moderation and spillover estimates are described as unstable.

## Limitations

- The observational policy design relies on parallel-trend and treatment-timing assumptions, but the supplied text does not report a pre-trend test or a staggered-adoption robustness analysis.
- The spatial model addresses interference parametrically; causal interpretation still depends on the chosen inverse-distance matrix, model specification, and the absence of unmodeled spatial confounding. See [[concepts/spatial-causal-inference|Spatial Causal Inference]].
- The conventional and spatial estimates use different levels and effective samples, so the positive firm-level DID coefficient and negative city-level direct coefficient should not be treated as estimates of the same quantity.
- The supplied text reports 11,567 observations throughout its tables but refers once to 11,625 enterprises in the heterogeneity discussion. The summary follows the tabulated count.
- The very large spatial-lag coefficients are sensitive to the scaling of the weights matrix; the supplied text does not report alternative matrices or normalization checks.
- The authors state that they do not have permission to share the data, limiting independent reproduction.
- Publication year, venue, DOI, and other stable identifiers are absent from the supplied Markdown.

## Related Concepts

- [[concepts/spatial-difference-in-differences|Spatial Difference-in-Differences]]
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: another DID extension, aimed at distinguishing effect modification from causal moderation rather than modeling geographic interference.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: extends DID to outcome distributions rather than spatial spillovers.

## Related Papers

- Chagas, Azzoni, and Almeida (2016), "A Spatial Difference-in-Differences Analysis of the Impact of Sugarcane Production on Respiratory Diseases": cited as a spatial DID application.
- Dube, Legros, and Theriault (2014), "A Spatial Difference-in-Differences Estimator to Evaluate the Effect of Change in Public Mass Transit Systems on House Prices": cited as the basis for adding spatial outcome lags to DID.
- Wang and Yue (2021), "Cross-Regional Radiation Effect of Environmental Protection Interview on Enterprises' Green Innovation": related evidence on cross-regional effects.
- Cheng and Yu (2023), "Can Central Environmental Protection Inspection Induce Corporate Green Technology Innovation?": source for the policy-variable construction and a national comparison.

[[index|Library home]]
