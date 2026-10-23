---
title: Computational Gastronomy
type: concept
aliases:
  - Food Computing
tags:
  - food-ai
  - knowledge-graphs
  - representation-learning
  - culinary-science
---

## Overview

Computational gastronomy studies food, recipes, ingredients, and culinary practice with computational representations and quantitative methods. Its objects include ingredient compatibility, sensory and nutritional properties, cultural cuisine structure, recipe generation, and food recommendation. The field combines food chemistry with behavioral evidence such as recipe co-occurrence, because culinary function is not reducible to shared molecules alone.

## Key Ideas

- Ingredient networks can connect foods through shared compounds, recipe co-occurrence, substitutions, or typed knowledge-graph relations. Each relation captures a different part of culinary compatibility.
- Learned ingredient embeddings support similarity search and clustering, but their geometry inherits vocabulary noise, duplicated ingredients, corpus imbalance, and cultural coverage gaps.
- Data curation can materially change what is measurable without changing the underlying model. [[papers/epicure-multidimensional-flavor-structure-in-food-ingredient-embeddings|Epicure]] consolidates noisy FlavorGraph nodes and reports stronger taste, texture, nutrition, and cuisine structure after consolidation.
- Sensory axes can be estimated from differences between labeled centroids, but a strong projection is not automatically a single causal or perceptual dimension. External chemical measurements, held-out evaluation, and provenance analysis are needed to distinguish genuine structure from label leakage and same-sample fitting.
- Recipe co-occurrence can encode culinary roles that are absent from an explicit compound graph, including preparation context, texture, cultural association, and the functional use of ingredients.

## Important Papers

- [[papers/epicure-multidimensional-flavor-structure-in-food-ingredient-embeddings|Epicure: Multidimensional Flavor Structure in Food Ingredient Embeddings]]
- Ahn et al. (2011), "Flavor Network and the Principles of Food Pairing."
- Park et al. (2021), "FlavorGraph: A Large-Scale Food-Chemical Graph for Generating Food Representations and Recommending Food Pairings."
- Haussmann et al. (2019), "FoodKG: A Semantics-Driven Knowledge Graph for Food Recommendation."
- Bagler and Goel (2024), "Computational Gastronomy: Capturing Culinary Creativity by Making Food Computable."

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- Knowledge graphs
- Data-centric AI
- Multisensory perception
