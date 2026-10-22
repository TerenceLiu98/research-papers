---
title: Spatial Difference-in-Differences
type: concept
aliases:
  - Spatial DID
  - SDID
tags:
  - causal-inference
  - difference-in-differences
  - spatial-econometrics
  - policy-evaluation
---

## Overview

Spatial difference-in-differences extends DID to settings where treatment or outcomes in one location may affect nearby locations. It replaces the strict no-interference view of geographically indexed units with a model that uses a spatial weights matrix to represent exposure through neighbors. The approach can separate a modeled direct policy effect from a spatial spillover, but those quantities are only as credible as the causal design and the chosen representation of geographic dependence.

## Key Ideas

- **Interference changes the estimand.** Conventional DID assumes that one unit's treatment does not alter another unit's potential outcome. Geographic spillovers violate that premise, so an untreated neighbor may no longer be a clean control.
- **A spatial weights matrix defines neighborhood exposure.** Contiguity, distance, or economic links can define $W$. A spatially lagged treatment such as $WD$ represents exposure through connected units, while $WY$ represents outcome dependence.
- **Direct and spillover coefficients answer different questions.** A local treatment term describes the modeled effect for treated locations; a spatially lagged treatment term describes how treatment elsewhere is associated with the local outcome.
- **Weights are substantive assumptions.** Scaling, normalization, distance decay, and the boundary of the study region can materially change estimates. Alternative matrices and sensitivity checks are therefore part of identification, not merely implementation details.
- **Spatial association is not automatically causal diffusion.** A significant lag can reflect omitted regional shocks, sorting, endogenous policy adoption, or misspecified trends. The DID assumptions must be paired with defensible assumptions about interference and [[concepts/spatial-causal-inference|Spatial Causal Inference]].

## Important Papers

- [[papers/the-spatial-difference-in-difference-measurement-of-policy-effect-of-environmental-protection-interview-on-green-innovation|The Spatial Difference-in-Difference Measurement of Policy Effect of Environmental Protection Interview on Green Innovation]]: models direct and neighboring-city effects of environmental protection interviews on green patenting in China's Yangtze River Delta.
- Chagas, Azzoni, and Almeida (2016), "A Spatial Difference-in-Differences Analysis of the Impact of Sugarcane Production on Respiratory Diseases": application cited by the paper above.
- Dube, Legros, and Theriault (2014), "A Spatial Difference-in-Differences Estimator to Evaluate the Effect of Change in Public Mass Transit Systems on House Prices": methodological precedent cited by the paper above.

## Related Concepts

- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: broader framework for causal effects, spatial confounding, and interference across locations.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: describes dependence induced by a weights matrix but does not on its own identify spillover effects.
- [[concepts/factorial-difference-in-differences|Factorial Difference-in-Differences]]: handles universal event exposure and baseline-factor effect modification rather than geographic interference.
- [[concepts/distributional-difference-in-differences|Distributional Difference-in-Differences]]: studies treatment-induced changes in outcome distributions rather than spatial propagation.
