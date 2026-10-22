---
title: "Change of Spatial Support"
type: concept
aliases:
  - Change of Support
  - Change-of-Support Problem
tags:
  - spatial-statistics
  - change-of-support
  - measurement-error
---

## Overview

Change of spatial support means estimating a variable for destination geographic units from observations collected on different source units. Differences can concern scale, boundaries, shape, orientation, or historical definitions. The task includes aggregation, disaggregation, and mixtures of both across partially overlapping areas.

## Key Ideas

- **Match support to the research question.** Convenient administrative units may not represent the theoretical unit of interest. Transforming to appropriate units introduces measurement assumptions that should be documented.
- **Diagnose the geometry.** [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]] quantify source fragmentation across destinations and the direction of scale change before any attribute values are transformed.
- **Respect the variable's aggregation rule.** Extensive quantities such as counts should preserve totals across a fully covered domain. Intensive quantities such as temperature usually require weighted means. Ratios constructed from extensive components can be transformed directly or reconstructed after transforming those components; neither approach is always superior.
- **Identify the unobserved allocation assumption.** Area weighting assumes uniformity within source units, population weighting substitutes an ancillary spatial distribution, and geostatistical models use assumptions about spatial structure. Finer output resolution alone does not establish finer measurement accuracy.
- **Separate mapping accuracy from inferential accuracy.** A transformed variable can track spatial ranks while biasing regression coefficients. Bias can be toward or away from zero.
- **Validate with the best available information.** Lowest-level data can provide destination truth, and reliable assignment IDs can permit direct aggregation. Otherwise, combine geometry diagnostics, map inspection, and sensitivity to transformation methods; agreement across algorithms is not proof of correctness.

Ecological inference and the modifiable areal unit problem are related: the former concerns inference about lower-level variation from aggregate data, while the latter concerns sensitivity to geographic grouping. Change of support also covers transfers between non-nested aggregate units.

### Joint Latent-Process Modelling

An alternative to transforming data before regression is to model continuous latent responses and predictors jointly, then project each field to its observed support. For a basis representation $W(\mathbf{s})=\mathbf{b}(\mathbf{s})^\top\boldsymbol{\delta}$, an areal mean is

$$
\overline{W}(c)=\left[|c|^{-1}\int_c\mathbf{b}(\mathbf{s})\,d\mathbf{s}\right]^\top\boldsymbol{\delta}.
$$

Changing support changes the design matrix while preserving the latent coefficients. Chacon-Montalvan et al. (2024) use tensor-product B-splines with Gaussian Markov random field coefficients to compute these integrals analytically on rectangles. Source-specific biases and measurement variances belong in a separate observation layer; posterior draws propagate uncertainty to new supports. The exactness concerns integration of the specified basis expansion, and does not guarantee that the inferred surface matches fine-scale truth.

Nonlinear transformations require particular care: averaging a transformed field generally differs from transforming its average. Thresholding an areal-average latent field produces an areal binary label, not the fraction of positive point-level labels. The aggregation operation must follow the measurement mechanism.

For aggregated event counts, [[papers/continuous-inference-for-aggregated-point-process-data|Continuous inference for aggregated point process data]] uses a common latent grid and multinomial count augmentation. Observation regions may overlap or have specified boundary uncertainty, while posterior predictive cell counts can be reaggregated onto a new partition. Overlapping reporting catchments require a model for which region records each event; geometric overlap alone does not specify that mechanism. The paper supports changing historical boundaries methodologically, but its electoral application demonstrates prediction onto proposed boundaries rather than fitting observations with changing historical boundaries.

### Temporal Contrasts under Changing Boundaries

When two elections are reconstructed separately onto fixed targets, fixed linear reconstruction operators imply $\widehat{\Delta}=H_1\Delta+(H_1-H_0)p_0$. The second term can generate apparent change from a stable heterogeneous baseline. Improving each endpoint independently does not guarantee an accurate difference. A shared baseline-change model can use both native reporting systems to estimate the contrast, but stronger change regularization can suppress genuine hotspots alongside artificial swing.

Exact count aggregation to a common coarse support identifies the contrast there. It does not recover variation within merged areas, and centroid-based proximity classifications can change with the support. A fixed weighted average of fine changes additionally requires common within-unit weights across elections. Method choice therefore depends on whether counts aggregate exactly to the substantive target, retained supports cross it, or historical fine reporting detail has been lost.

## Important Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: Introduces geometric diagnostics and compares measurement and regression errors across transformation methods.
- [[papers/spatial-latent-gaussian-modelling-with-change-of-support|Spatial Latent Gaussian Modelling with Change of Support]]: Jointly models misaligned responses and predictors using continuous spline fields and explicit support projections.
- [[papers/electoral-change-on-moving-maps-joint-inference-under-misaligned-supports|Electoral Change on Moving Maps: Joint Inference under Misaligned Supports]]: Decomposes boundary-induced pseudo-change and evaluates shared baseline-change estimation, including hotspot attenuation and simultaneous-band undercoverage.
- [[papers/spatial-vote-redistribution-in-redrawn-polling-units|Spatial Vote Redistribution in Redrawn Polling Units]]: Compares overlap weighting with centroid, surface, and voter-density-weighted interpolation for transferring historical election results to redrawn polling units.
- Gotway and Young (2002), "Combining Incompatible Spatial Data." Foundational reference cited by that paper.

## Related Concepts

- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]: Diagnostics for the geometry of a proposed transformation.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: A model-based approach to estimating finer spatial processes from aggregate observations.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: Spatial dependence can inform interpolation but does not by itself validate a change of support.
