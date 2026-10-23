---
title: "Domain-Filtered Knowledge Graphs from Sparse Autoencoder Features: Contrastive Filtering, Multi-Scale Structure Recovery, and Edge-Labeled Mechanism Views"
type: paper
authors:
  - John Winnicki
  - Abeynaya Gnanasekaran
  - Eric Darve
year: null
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - knowledge-graphs
  - transcoders
  - representation-analysis
---

## TL;DR

This paper turns a large [[concepts/sparse-autoencoders|sparse-autoencoder]] feature inventory into [[concepts/domain-filtered-sae-knowledge-graphs|domain-filtered SAE knowledge graphs]]. It contrastively filters features into a biology-specific concept universe, organizes them with multiscale co-occurrence graphs, and projects local transcoder pathways into compressed, edge-labeled source-to-target feature graphs. A biology-textbook case study recovers visually and quantitatively localized chapter and subchapter structure and produces readable sentence-level mechanism views, but it does not establish that the projected edges are complete causal explanations or more faithful than generated rationales.

## Research Question

Can a large, flat SAE feature inventory be filtered and organized into a reusable graph that separates domain-specific concepts from generic activity, recovers corpus structure at several textual scales, and exposes readable local cross-layer pathways?

## Motivation

SAEs can expose many interpretable directions in model activations, but a flat list mixes domain concepts with punctuation, formatting, discourse, and weakly grounded features. Related concepts may also be distributed across several units, while individual sentences activate too many features for direct inspection. The paper argues that useful corpus-scale interpretability therefore requires both a selective node universe and explicit relations among its features.

## Contributions

- Introduces a multi-stage contrastive filter that combines target support, enrichment against non-domain corpora, within-corpus localization, and evidence-packet adjudication.
- Builds aligned graph views over the same retained features: Jaccard-normalized co-occurrence graphs from sentence through chapter scale, and unit-conditioned transcoder graphs for local cross-layer pathways.
- Constructs a grounded abstraction hierarchy and uses it to compress dense local graphs into mixtures of individual features and higher-level supernodes.
- Applies evidence-backed automatic relation labeling to co-occurrence and directed mechanism edges.
- Evaluates whether the graph recovers the organization of a biology textbook and yields readable sentence-level views.

## Method

The pipeline first forms a high-recall shortlist from target-corpus activation support, target-versus-contrast enrichment, and chapter or subchapter localization. Each shortlisted feature is then reviewed through an evidence packet containing its proposed description, target and contrast windows, corpus location, and shortlist evidence. Features must be visible in the evidence, relevant to the biology domain, and distinctive from the contrast corpora. This adjudication fixes the retained concept universe before any graph is built.

For corpus structure, token activations are converted into feature-specific binary sentence-presence events. Paragraph, subchapter, and chapter presence are deterministic unions of those sentence events. Pairwise co-presence is Jaccard-normalized, then strong neighbors are retained and symmetrized. A separate abstraction tree embeds feature descriptions, constructs a mutual-k-nearest-neighbor graph, recursively groups locally connected features, and assigns grounded summaries from representative and boundary examples.

For local mechanism views, the method combines layer-20 source-feature activity, a layer-20 transcoder's sparse latent activity, and layer-21 target-feature activity for a selected text span. SAE dictionaries make the transcoder's residual-space reads and writes expressible as directed feature-to-feature edges. A hierarchy-respecting mixed cover collapses coherent active regions while preserving strong cross-group traffic and blocking compression across important internal edges. Automatic relation labels are generated from joint or contrastive evidence for co-occurrence edges and sentence plus latent evidence for directed edges.

## Experiments

The target corpus is the sentence-segmented *Concepts of Biology* textbook; *Modern World History* and *Physical Geology* serve as contrast corpora. The sparse stack uses width-65k Gemma Scope residual SAEs at layers 20 and 21 and a width-16k layer-20 transcoder mapping to layer 21. The biology shortlist applies a minimum target-support rate of $5\times10^{-4}$, minimum activation mass of 10, per-layer removal of the bottom 20% by target support, and export of the top 30,000 candidates before packet adjudication.

Shared-coordinate density maps place representative inheritance, biotechnology, endocrine, and respiratory chapters in distinct regions. Respiratory subchapters overlap within the same broad region but have distinguishable local density modes. The appendix reports that paragraph- and sentence-level aggregation give the strongest alignment with chapter and subchapter structure, same-chapter edge concentration, and within-versus-between-chapter distance separation; the parsed paper provides this comparison narratively rather than as numeric table entries.

At sentence scale, the qualitative progression moves from diffuse active features to an induced co-occurrence neighborhood, a trimmed set of dominant concepts, and a compressed directed transcoder atlas. Case studies show readable labels on a cross-topic bridge corridor and on directed mechanism edges. These results demonstrate inspectable graph artifacts and alignment with textbook organization, not causal completeness.

## Limitations

- Chapter and subchapter segmentation and localization statistics enter filtering and packet adjudication. Although labels are not supervised targets for graph layout or clustering, textbook structure is not wholly independent of node selection.
- The main evidence is a single biology textbook, two expository contrast corpora, one model family, and one adjacent layer pair. Cross-domain, cross-model, and multilayer generalization are not established.
- Several central results are qualitative visualizations and selected case studies. The supplied text summarizes the quantitative structure-recovery table but does not provide its numeric entries.
- Automatic feature and edge descriptions depend on external descriptions, evidence selection, and model-based adjudication; readable labels can still be incomplete or misleading.
- Transcoder edges are projected through local linear source and target support. The authors identify attribution-derived, attention-mediated, and recursively traced edges as future work, so the current graphs should not be read as complete causal circuits.
- Hierarchy-aware compression improves readability but can hide leaf-level distinctions, and its higher-level labels depend on description embeddings and grounded summarization.
- The proposed comparison between activation-derived graphs and generated reasoning traces is future work. The study does not show that these graphs explain reasoning more faithfully than chain-of-thought.

## Related Concepts

- [[concepts/domain-filtered-sae-knowledge-graphs|Domain-Filtered SAE Knowledge Graphs]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/mechanistic-topic-models|Mechanistic Topic Models]]
- [[concepts/attribution-patching|Attribution Patching]]
- Mechanistic interpretability
- Knowledge graphs
- Circuit tracing

## Related Papers

- [[papers/model-directions-not-words-mechanistic-topic-models-using-sparse-autoencoders|Model Directions, Not Words: Mechanistic Topic Models Using Sparse Autoencoders]] organizes SAE features into corpus-level themes rather than co-occurrence and transcoder graph views.
- [[papers/discovering-sparse-concept-graphs-for-mechanistic-interpretability-in-vision-transformers|Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]] constructs sparse feature graphs for a vision transformer using block-level regression and intervention-based ordering checks.
- [[papers/learning-multi-level-features-with-matryoshka-sparse-autoencoders|Learning Multi-Level Features with Matryoshka Sparse Autoencoders]] studies hierarchical feature granularity inside a nested SAE dictionary rather than building a post-hoc abstraction tree over a filtered domain universe.
- Dunefsky, Chlenski, and Nanda (2024), "Transcoders Find Interpretable LLM Feature Circuits."
- Marks et al. (2025), "Sparse Feature Circuits: Discovering and Editing Interpretable Causal Graphs in Language Models."
- Ameisen et al. (2025), "Circuit Tracing: Revealing Computational Graphs in Language Models."

[[index|Library home]]
