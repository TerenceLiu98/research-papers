---
title: A Visual Framework to Create Photorealistic Retinal Vessels for Diagnosis Purposes
type: paper
authors:
  - Dario Lo Castro
  - Domenico Tegolo
  - Cesare Valenti
year: 2020
doi: "10.1016/j.jbi.2020.103490"
tags:
  - synthetic-retinal-images
  - retinal-vessel-networks
  - medical-image-synthesis
  - data-augmentation
---

## TL;DR

The paper presents an interactive procedural framework for generating synthetic retinal vessel trees without learning their structure from real images. It samples endpoints from Gaussian and Voronoi-derived probability maps, connects them through iteratively branching Catmull-Rom curves, and renders artery- and vein-specific calibre, colour, opacity, and crossings. On 40 DRIVE-sized simulations, several vessel statistics are close to those measured in DRIVE; the proposed diagnostic and pathology-prediction uses are not clinically evaluated.

## Research Question

Can a controllable geometric model generate photorealistic retinal vascular networks whose aggregate morphology resembles real fundus images, while avoiding dependence on GAN training or direct modification of source images?

## Motivation

Public retinal datasets with high-resolution, expert-labelled vessels are scarce, especially for artery-vein classification. A procedural generator could supply images and exact vessel labels for segmentation benchmarks and data augmentation, while letting users manipulate morphometric properties such as tortuosity and calibre. The authors also motivate disease simulation, but the study evaluates image morphology rather than diagnosis or prognosis.

## Contributions

- A non-learning retinal vessel generator organized around endpoint probability maps, iterative branching, and controllable spline geometry.
- Separate artery and vein rendering with distance-dependent calibre, learned colour and opacity profiles, and globally consistent artery-vein overlap ordering.
- A Matlab interface for editing control points, calibre, overlap order, tree placement, perturbation, tension, and noise with immediate visual feedback.
- Statistical comparison of generated vascular trees with DRIVE, plus high-resolution qualitative comparison with HRF.

## Method

### Vascular-tree construction

The generator initializes the major temporal arcade from a parabolic model and builds arteries and veins separately. Candidate endpoints are sampled from an elliptical Gaussian aligned with the arcade, with a circular Gaussian subtracted around the fovea. Multiplying this map by a Voronoi distance map discourages implausible placement and identifies the nearest same-type vessel and its branching point. After each branch is added, the probability map is recomputed.

Straight endpoint-to-branch connections are perturbed with intermediate control points sampled around the segment and interpolated with cardinal splines. At tension $T=0$, these become Catmull-Rom splines. Gaussian widths and control-point perturbations regulate curvature and average tortuosity, while the interactive editor permits local adjustments.

### Rendering and interaction

Vessel calibre decreases linearly with distance from the optic disc and is parameterized separately for arteries and veins. Cross-sectional RGB and opacity profiles derived from HRF images are scaled by calibre and composited onto a synthetic background. Crossings between arteries and veins are permitted, while same-type crossings are prevented; local overlap labels are regularized so nearby crossings share one ordering. The final rendering adds 5% Gaussian noise, and a pseudorandom seed controls reproducibility or variation.

The Matlab GUI exposes segmentation, overlap, calibre, and rendered views. Users can move spline control points, alter calibre locally or downstream, change overlap order, tune spline and perturbation parameters, and rotate or place the complete tree relative to the optic disc.

## Experiments

The authors generate 40 images at DRIVE resolution and 40 at HRF resolution. Quantitative evaluation uses DRIVE because it supplies complete vessel segmentations; HRF supplies high-resolution appearance information and qualitative comparisons, but its vessel segmentations are partial.

| Evaluation | Reported result |
| --- | --- |
| Branch depth | Mean ramification lengths across branching levels are reported as nearly overlapping between DRIVE and simulated artery and vein trees. |
| Vessel calibre | Mean vein calibre is 7.58 pixels in DRIVE and 7.85 in generated images; mean artery calibre is 6.15 and 6.10 pixels, respectively. Generated calibre standard deviations are smaller: 0.58 versus 1.19 for veins and 0.55 versus 1.08 for arteries. |
| Branch positions | About 80% of simulated branch points fall between 20% and 80% of parent-vessel length, reported as differing by 5 percentage points from DRIVE. |
| Tortuosity | Mean tortuosity is 1.29 versus 1.36 for DRIVE and generated veins, and 1.25 versus 1.37 for arteries. |
| Endpoint distribution | The plotted generated endpoints qualitatively reproduce the exclusion regions and spatial pattern observed in DRIVE. |
| Image entropy | Binary vascular-tree entropy is reported as 0.087 for DRIVE and 0.092 for simulated images. |

The supplementary output includes high-definition images, centrelines, calibres, segmentations, and artery-vein classifications, according to the paper.

## Limitations

Validation primarily compares aggregate morphology on DRIVE rather than perceptual realism, downstream segmentation gains, or clinical utility. HRF evaluation is qualitative because its segmentations are incomplete. Generated calibre variability is substantially lower than DRIVE variability, despite similar means.

The optic disc is excluded from synthesis and supplied as part of the background. The model does not learn vessel anatomy from data; endpoint distributions and curve perturbations are engineered, and several appearance profiles are derived from real images. Although the paper discusses simulated pathologies, disease progression, and predictive diagnosis, it reports no pathology-specific generation study, clinician evaluation, or diagnostic experiment. Matlab prototyping is described as fast enough for interaction, but no runtime benchmark is given.

## Related Concepts

- [[concepts/synthetic-retinal-fundus-image-generation|Synthetic Retinal Fundus Image Generation]]: procedural and learned approaches to producing fundus images and vessel ground truth.
- [[concepts/statistical-shape-graphs|Statistical Shape Graphs]]: a complementary representation for comparing the geometry and connectivity of extracted retinal networks.

## Related Papers

- [[papers/statistical-shape-analysis-of-shape-graphs-with-applications-to-retinal-blood-vessel-networks|Statistical Shape Analysis of Shape Graphs with Applications to Retinal Blood-Vessel Networks]]: analyzes retinal vascular geometry after segmentation rather than generating fundus images.
- Fiorini et al. (2014), "Automatic Generation of Synthetic Retinal Fundus Images": cited patch-texture approach for vascular and non-vascular fundus regions.
- Costa et al. (2018), "End-to-end adversarial retinal image synthesis": cited GAN-based alternative that learns vessel and fundus appearance from real images.
- Guibas, Virdi, and Li (2017), "Synthetic Medical Images from Dual Generative Adversarial Networks": cited two-stage GAN pipeline applied to retinal images.

[[index|Library home]]
