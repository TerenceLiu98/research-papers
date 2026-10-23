---
title: Domain-Filtered SAE Knowledge Graphs
type: concept
aliases:
  - Domain-Filtered Sparse Autoencoder Knowledge Graphs
  - SAE Knowledge Graphs
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - knowledge-graphs
  - transcoders
---

## Overview

Domain-filtered SAE knowledge graphs organize [[concepts/sparse-autoencoders|sparse-autoencoder]] features into a graph after restricting the node set to concepts supported by a target corpus and distinguished from contrast corpora. The graph can combine corpus-level co-occurrence structure with local cross-layer mechanism views, allowing the same retained concept universe to support both global navigation and sentence-conditioned inspection.

## Key Ideas

- **Filtering defines the scientific object.** Target support alone admits generic syntax, formatting, and discourse features. Contrastive enrichment, within-corpus localization, and evidence-level semantic review can define a narrower domain concept universe before graph construction.
- **Co-occurrence and mechanism edges answer different questions.** Multiscale co-occurrence graphs describe which retained concepts recur together across textual units. Transcoder-based directed graphs summarize how active source-side concepts project toward target-side concepts for a selected input.
- **A shared node universe connects global and local views.** Corpus neighborhoods can guide inspection of a local sentence, while the local mechanism view can show how concepts in those neighborhoods participate in an adjacent-layer transformation.
- **Hierarchy is useful for navigation and compression.** A grounded abstraction tree can define reusable grouped views and collapse dense active regions into readable supernodes. Compression should preserve important active internal distinctions and strong traffic between groups.
- **Labels require evidence beyond endpoint names.** Co-occurrence relations can use joint and contrastive sentences; directed relations can use the selected input and latent-level support. Generated labels remain hypotheses tied to that evidence.
- **Graph readability is not causal completeness.** Projected transcoder weights and local linear support expose plausible cross-layer pathways, but attribution, intervention, or recursive tracing is needed for stronger causal claims.

## Important Papers

- [[papers/domain-filtered-knowledge-graphs-from-sparse-autoencoder-features|Domain-Filtered Knowledge Graphs from Sparse Autoencoder Features: Contrastive Filtering, Multi-Scale Structure Recovery, and Edge-Labeled Mechanism Views]] introduces the filtered dual-graph framework and evaluates it on a biology textbook.
- Dunefsky, Chlenski, and Nanda (2024), "Transcoders Find Interpretable LLM Feature Circuits," establishes transcoders as sparse, interpretable approximations to transformer computation.
- Marks et al. (2025), "Sparse Feature Circuits: Discovering and Editing Interpretable Causal Graphs in Language Models," develops feature-level causal graphs and interventions.
- Clarke, Bhatnagar, and Bloom (2024), "Compositionality and Ambiguity: Latent Co-occurrence and Interpretable Subspaces," studies graph structure in SAE feature co-occurrence.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/mechanistic-topic-models|Mechanistic Topic Models]]
- [[concepts/attribution-patching|Attribution Patching]]
- Mechanistic interpretability
- Circuit tracing
- Knowledge graphs
- Hierarchical representation learning
