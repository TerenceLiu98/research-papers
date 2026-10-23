---
title: "Epicure: Multidimensional Flavor Structure in Food Ingredient Embeddings"
type: paper
authors:
  - Jakub Radzikowski
  - Josef Chen
year: null
source_job_id: "a4b122a3-1477-42af-be1d-e234e5202a06"
tags:
  - computational-gastronomy
  - graph-embeddings
  - data-curation
  - food-ai
---

## TL;DR

Epicure consolidates 6,653 noisy FlavorGraph ingredient nodes into 1,032 canonical ingredients, then probes the unchanged 300-dimensional embeddings for culinary structure. The curated space exposes gradients and clusters associated with taste, texture, nutrition, climate, processing, and cuisine. Laboratory measurements and compound-provenance ablations support the central claim that recipe co-occurrence encodes culinary information beyond the chemical edges used to train FlavorGraph, although LLM-generated proxy labels, post-hoc averaging, and axis-definition overfitting limit the strength of that conclusion.

## Research Question

Do FlavorGraph ingredient embeddings encode measurable dimensions of tacit culinary knowledge beyond explicit food chemistry, and can careful vocabulary curation make those dimensions easier to recover?

## Motivation

FlavorGraph combines recipe co-occurrence with food-compound links, but its vocabulary contains non-food objects, brands, duplicates, and many context-specific variants of the same ingredient. This noise makes the learned vectors difficult to interpret or use in applications such as substitution and recipe design. The paper treats data quality, rather than a new embedding architecture, as the immediate bottleneck for [[concepts/computational-gastronomy|Computational Gastronomy]].

## Contributions

- Builds an LLM-assisted, human-reviewed curation pipeline that maps 6,653 raw entries to 1,032 canonical ingredients and averages the original vectors within each consolidated group.
- Tests 15 classified culinary dimensions spanning basic tastes, texture, Scoville heat, climate, NOVA processing level, and cultural cuisine association.
- Validates selected axes against USDA FoodData Central and FooDB measurements, and separates signals available through FlavorGraph's compound edges from those attributable primarily to recipe co-occurrence.
- Compares raw and curated spaces, showing that curation improves most reported dimensional associations and roughly doubles size-matched cuisine-neighborhood purity.

## Method

The pipeline performs three Gemini 2.5 Flash passes for name simplification, removal, translation, and consolidation, followed by human quality control. Canonical vectors are arithmetic means of all raw FlavorGraph vectors assigned to an ingredient. The final records also receive culinary categories and vegetarian and vegan flags.

Gemini 3.1 Pro supplies structured labels for ordinal taste and texture properties, climate, processing, heat, and distinctive cuisine markers. For an ordinal variable, the authors define an axis as the difference between high- and low-pole centroids and correlate ingredient projections with labels using Spearman's rho. Independently prompted yes/no labels provide binary axes evaluated with Cohen's d. All quantitative claims use the native 300-dimensional space; UMAP is used only for visualization.

External validation matches 712 curated ingredients to USDA measurements and 770 to FooDB. Nutritional axes are defined directly from laboratory-value terciles, without LLM labels. A hub ablation compares ingredients with and without compound edges, and inspection of FlavorGraph's 1,561 training compounds identifies possible chemical pathways. Ten-fold cross-validation with 20 repeats redefines each axis on training folds and evaluates held-out ingredients.

## Experiments

Seven ordinal dimensions have full-sample correlations from 0.37 to 0.76, all reported at p < .001. Seven binary dimensions show separation from d = 0.79 to 1.26. Cross-validation preserves every signal but reveals substantial shrinkage in some cases: Scoville falls from rho = 0.76 to 0.20, binary effects shrink by 0.17 to 0.42, and nutritional correlations settle between 0.34 and 0.42.

USDA validation reports correlations of 0.44-0.47 for protein, carbohydrates, calories, fiber, and fat in the full analysis. Taste-axis projections correlate with measured sugars (sweet, rho = 0.41), sodium (salty, rho = 0.29), and glutamic acid (umami, rho = 0.24). Sucrose, glucose, fructose, sodium, and water are absent from the training compounds, so the authors attribute sweet, salty, and moisture structure primarily to recipe co-occurrence. Amino-acid and fatty-acid edges provide partial chemical pathways for umami, protein, and fat.

Across seven macro-regional cuisine groups, curated-space k-nearest-neighbor purity averages 0.43, compared with 0.218 for a size-matched raw-space baseline; all seven groups improve (Wilcoxon p = .008). Curated cuisine members are also closer to their centroids (mean cosine distance 0.391 versus 0.469, p < .001, d = 0.63). Curation improves most taste, chemistry, texture, and laboratory-validated dimensions, with gains as large as +0.24 for Scoville and +0.21 for fattiness.

## Limitations

- The primary sensory and cultural labels come from an LLM, not panels or direct measurements, and may share internet-derived information with FlavorGraph's recipe corpus.
- FlavorGraph already includes chemical edges. Provenance analysis narrows this confound but does not fully disentangle chemistry from co-occurrence.
- Averaging fixed vectors is lossy and does not repair noise introduced during graph training; retraining on the canonical vocabulary was not tested.
- Same-sample axis construction inflates effects. Cross-validation reduces all estimates and reduces the small-sample Scoville result sharply.
- Sour and bitter separate under binary labels despite weak ordinal behavior, contradicting a simple one-dimensional linear-intensity account.
- The English-centric recipe corpus and seven broad cuisine groups limit cultural coverage and resolution.
- UMAP can introduce apparent loops and bridges; the claimed toroidal geometry is suggestive rather than established in the native space.
- The curated embeddings and curation pipeline are proprietary, limiting end-to-end reproducibility.

## Related Concepts

- [[concepts/computational-gastronomy|Computational Gastronomy]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/disentangled-representations|Disentangled Representations]]

## Related Papers

References discussed in the supplied paper:

- Park et al. (2021), "FlavorGraph: A Large-Scale Food-Chemical Graph for Generating Food Representations and Recommending Food Pairings": supplies the embeddings analyzed here.
- Ahn et al. (2011), "Flavor Network and the Principles of Food Pairing": establishes network structure in ingredient-compound and recipe data.
- Haussmann et al. (2019), "FoodKG: A Semantics-Driven Knowledge Graph for Food Recommendation": represents an ontology- and knowledge-graph-based alternative.
- Bagler and Goel (2024), "Computational Gastronomy: Capturing Culinary Creativity by Making Food Computable": situates the broader research program.

[[index|Library home]]
