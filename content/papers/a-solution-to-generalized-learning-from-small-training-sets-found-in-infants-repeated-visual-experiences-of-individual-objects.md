---
title: "A solution to generalized learning from small training sets found in infants' repeated visual experiences of individual objects"
type: paper
authors:
  - Frangil M. Ramirez
  - Elizabeth M. Clerkin
  - David J. Crandall
  - Linda B. Smith
year: 2026
source_job_id: "e112082c-993c-4fb9-ae7e-f64fc926952b"
tags:
  - category-learning
  - infant-vision
  - training-data-distributions
  - visual-generalization
---

## TL;DR

Infant mealtime images contain repeated but visually varied views of a few individual objects, producing interconnected clusters of similar images. Small artificial training sets with this "lumpy" structure outperform uniform instance sampling on novel-instance classification across two datasets and three models trained from scratch. The evidence supports a training-data hypothesis; it does not establish that this mechanism causes infants' category generalization.

## Research Question

Can repeated, variable views of a small number of objects provide a similarity structure that supports generalization to unseen members of the same categories?

## Motivation

Early category learning involves few distinct objects but many distinct images of them. Viewpoint, lighting, occlusion, and context make repeated encounters visually variable. Counting unique instances alone therefore misses potentially useful structure in the input. The paper asks whether [[concepts/lumpy-training-distributions|Lumpy Training Distributions]] help explain how limited experience can support category learning.

## Contributions

- Quantifies instance frequencies in infant egocentric images across eight common object categories.
- Characterizes within-category image similarity using graph connectivity and three null constructions.
- Tests engineered lumpy versus uniform training distributions at matched image counts, with generalization evaluated on previously unseen instances.
- Proposes a connection between learning invariance across views of one object and generalizing across different objects, while leaving that mechanism open to direct testing.

## Method

**Infant observations.** The corpus covers 14 infants aged 7-11 months and 87 mealtimes. Sampling at 0.2 Hz produces 11,549 images. Human coders identify individual instances of bottle, bowl, cup, spoon, chair, table, door, and window. An image containing multiple target categories contributes an occurrence to each relevant category.

**Similarity graphs.** Whole-image RGB histogram correlations are computed within infant and category. Nodes are images; edges retain high similarities using the reported top-10% criterion. The authors examine isolated-node proportions, average degree, and average node connectivity, the latter based on node-disjoint paths among connected pairs and excluding isolated nodes. Comparisons use shuffled infant-category labels, labels shuffled in contiguous six-image blocks (about 30 seconds), and random geometric graphs. The paper reports consistent patterns with alternative similarity measures and thresholds in its supplementary analyses.

**Controlled training.** ResNet-18, ResNet-50, and TinyViT receive supervised category labels and train from scratch. Both sampling conditions balance categories and use the same novel-instance test set within each dataset.

| Dataset | Training images | Lumpy sampling | Uniform sampling | Test images |
| --- | --- | --- | --- | --- |
| ShapeNet | 3,600 across six categories | One of six training instances supplies 35% of category images; rendered views vary | Approximately one-sixth of category images per training instance | 3,600 views of two held-out instances per category |
| PetFace | 1,500 across six categories | Oversamples the most photographed individual, adding mirrored views; remaining images are sampled from other individuals | One image from each of 250 individuals per category | 1,500 images of unseen individuals |

ShapeNet uses rendered views from random Euler angles. PetFace lumpy sets average 191.5 individuals per category (SD 46.4). The artificial-data similarity graphs use a top-5% criterion. Generalization is six-way classification, with chance accuracy about 16.67%.

## Experiments

**Concentrated experience (Fig. 1).** Within a mealtime, the most frequent instance accounts for an average 61% of category occurrences; the top three account for 92%. Across an infant's mealtimes, these figures are 48% and 78%. The observed instance-frequency distribution differs from uniform sampling of available instances (KS statistic 0.33, p < 0.001).

**Connected similarity structure (Fig. 2).** Views of the most frequent instance include both highly similar and dissimilar pairs. Infant graphs have fewer isolated nodes than all three nulls: mean proportions are 0.20 for observed data, 0.26 for geometric nulls, 0.50 for shuffled labels, and 0.43 for block-shuffled labels. Observed graphs also have higher average degree and average node connectivity (reported mixed-model p < 0.001). These measures describe the input; they do not directly measure learned representations.

**Novel-instance generalization (Fig. 3).** Lumpy training outperforms uniform training in all six model-dataset combinations. Across 62 runs, the mixed model reports a distribution effect of D = 3.83, 95% CI [2.8, 4.8], t(55) = 7.42, p < 0.001, with no reported interactions with model or dataset. The authors describe the advantage as small but consistent. Per-model accuracy values are plotted rather than tabulated in the supplied Markdown and are not reconstructed here.

## Limitations

- No infant learning intervention links the observed input structure to measured category generalization. The computational experiments test plausibility, not a model of infant learning.
- Instance-frequency skew, within-instance variation, number of distinct instances, and PetFace mirroring change together. Their separate contributions are unresolved.
- Whole-image similarity combines object and background information. Lumpiness could covary with another property that actually supports learning.
- Evidence covers eight categories in one infant mealtime corpus and two small computational datasets. Generality across cultures, activities, developmental stages, and training scales remains open.
- Fully supervised labels simplify the multiple, ambiguous learning signals available to infants. Random Euler-angle sampling is not uniform over the rotation group.
- The supplied document refers to supplementary methods and figures that are not included in this Markdown. Its acceptance date supports the year 2026; no article DOI or other stable article identifier is supplied. The OSF identifier below belongs to research materials, not the article.

## Related Concepts

- [[concepts/lumpy-training-distributions|Lumpy Training Distributions]]
- Object constancy: recognizing one object across variable views.
- Category generalization: recognizing unseen instances as members of learned categories.
- Data augmentation and curriculum learning: discussed as possible connections and future directions, not established explanations of the result.

## Related Papers

- Clerkin et al. (2017), "Real-world visual statistics and infants' first-learned object names": earlier analysis of the infant corpus (reference 28).
- Clerkin and Smith (2022), "Real-world statistics at two timescales and a mechanism for infant learning of object names": related corpus analysis and learning motivation (reference 29).
- Raviv, Lupyan, and Green (2022), "How variability shapes learning and generalization": context for the roles of consistency and diversity (reference 19).
- Poggio and Edelman (1990), "A network that learns to recognize three-dimensional objects": a conceptual precedent for learning from a small set of views, using a different computational approach (reference 78).

The source identifies research materials at OSF, DOI `10.17605/OSF.IO/BYN2Z` (reference 116), and infant data at Databrary volume 1965 (reference 115), with access restrictions for identifiable recordings. Repository contents were not independently checked.

[[index|Library home]]
