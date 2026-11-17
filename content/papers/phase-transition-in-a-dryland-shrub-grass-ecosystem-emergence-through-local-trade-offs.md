---
title: "Phase transition in a dryland shrub–grass ecosystem: Emergence through local trade-offs"
type: paper
authors:
  - Jingyao Sun
  - Kailiang Yu
  - Xinrong Li
  - Max Rietkerk
  - Paolo D’Odorico
  - Ning Chen
  - Yanli Wang
  - Libin Zhang
  - Guirui Yu
year: 2026
tags:
  - ecology
  - drylands
  - phase-transitions
  - spatial-self-organization
---

## TL;DR

Field observations in northern China and a spatial cellular automaton link shrub–grass compositional shifts to a trade-off between extensive resource foraging by shrubs and intensive resource use by grasses. The model reproduces patterned vegetation and bistability; modified kernels also produce hollow shrub rings and enlarged desert-edge patches. These results support a common local-interaction explanation, while temporal hysteresis is demonstrated in simulations rather than directly in the field.

## Research Question

Can local differences in plant resource-foraging range and efficiency jointly explain vegetation patterns, abrupt shrub–grass transitions, and unusual spatial structures near transition boundaries?

## Motivation

Landscape-level feedback explanations do not by themselves specify how individual plants generate patch geometry and changes in ecosystem composition. Shrublands and grasslands provide contrasting spatial organizations through which to study this connection.

## Contributions

- Integrates plant functional traits, drone-derived patch measurements, and a kernel-based model within a phase-transition interpretation.
- Proposes an extensive–intensive resource-foraging trade-off linking spatial competition to shrub or grass dominance.
- Distinguishes a resource-driven discontinuous shrub–grass transition from a disturbance-driven continuous loss of vegetation in simulations.
- Explains hollow shrub rings through contraction of foraging range and boundary patch enlargement through facilitation and local recruitment.

## Method

The probabilistic cellular automaton uses a 200 × 200 periodic lattice with mutually exclusive shrub, grass, and bare-soil states. Synchronous steps perform dispersal, convolution with plant-specific interaction kernels, and stochastic mortality. Kernels combine short-range facilitation with longer-range competition: [[concepts/scale-dependent-feedback-in-vegetation|Scale-Dependent Feedback in Vegetation]]. Competitive strength is modeled as resource demand divided by the product of foraging-area cell count and resource supply. Shrubs have a wider competition radius; grasses are described as more efficient and more tolerant of competition.

Baseline simulations scan resource supply and examine vegetation after 1,000 iterations. Different initial configurations test bistability and hysteresis. Fairy-circle simulations start from shrub spots, increase resource supply, halve the shrub competition radius, and disable shrub dispersal. Boundary simulations strengthen facilitation, expand foraging range, add local recruitment, and impose random plant removal as disturbance. These are modified scenarios, not all outputs of an unchanged baseline parameterization.

## Experiments

**Field design.** Thirty sites spaced 50–100 km apart cover a northern Chinese desert-margin precipitation gradient, with natural and boundary vegetation plots. Another 25 natural plots, spaced 3–10 km apart, sample the transition zone. Fifty patches per orthomosaic provide patch-size, nearest-neighbor-distance, and skewness measurements. Community-weighted plant traits are analyzed with PCA; precipitation comes from a 0.25° gridded product.

**Composition and pattern.** Total cover rises approximately linearly with precipitation, while dominance changes sharply within 180–250 mm mean annual precipitation. Shrub patches are larger and farther apart than grass patches. Patch-size and spacing skewness increase in the transition zone (Fig. 2).

**Trait evidence.** In the PC2–PC3 plane, trait-axis projections explain reported variation in patch size with R² = 0.41 and nearest-neighbor distance with R² = 0.48; corresponding P values are 1.49 × 10⁻⁷ and 4.46 × 10⁻⁹. These associations support the proposed trade-off but do not directly measure root foraging ranges.

**Simulations.** Resource sweeps produce alternative shrub- and grass-dominated configurations and initialization-dependent transition points. Kernel contraction produces hollow shrub rings within grass, matching the study's specific fairy-circle morphology. Boundary simulations produce enlarged patches and vegetation cover approaching zero with a fitted power-law relationship to distance from a disturbance threshold (Figs. 3–4).

**Availability.** The source reports simulation notebooks archived as Zenodo software, DOI `10.5281/zenodo.23751909` (reference 51), with other data in the manuscript or supplementary material. This is a software identifier, not the paper DOI.

## Limitations

- The field gradient is spatial and observational; state alternation alone does not establish temporal hysteresis or uniquely identify the causal mechanism.
- Closely spaced transition plots can share precipitation grid cells. Covariate checks reduce some environmental concerns but cannot exclude all unmeasured heterogeneity.
- Fairy-circle results concern hollow shrub rings in a grass matrix; they do not establish one explanation for all globally observed fairy circles.
- The source describes grass survival thresholds as lower than shrub thresholds, but Table 1 lists grass 1.1 and shrub 1.0. It also describes stronger shrub facilitation while the table gives equal facilitation strengths. These discrepancies need resolution before numerical reproduction.
- Power-law fitting in the reported finite model supports the authors' interpretation but does not alone establish a universality class. Incorporating grazing, soil evolution, and spatial heterogeneity remains future work.

## Related Concepts

- [[concepts/scale-dependent-feedback-in-vegetation|Scale-Dependent Feedback in Vegetation]] — the spatial mechanism connecting local facilitation and competition to patch organization.

## Related Papers

The source situates its contribution alongside Rietkerk et al., *Self-organization of vegetation in arid ecosystems* (2002), for vegetation pattern formation; Guirado et al., *The global biogeography and environmental drivers of fairy circles* (2023), for restricted environmental occurrence; and Sun et al., *Spatial and temporal scale-dependent feedbacks govern dynamics of biocrusts in drylands* (2025), for related dryland feedback mechanisms. These are source-cited relationships, not independently reviewed papers here.
