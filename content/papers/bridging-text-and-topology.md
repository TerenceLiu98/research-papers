---
title: "Bridging text and topology: empowering large language models through graph retrieval for constraint-aware reasoning in campus digital twins"
type: paper
authors:
  - Wenyu Zhang
  - Suphanut Jamonnak
  - Weishan Bai
  - Xinyue Ye
year: 2026
doi: 10.1080/17538947.2026.2677856
venue: International Journal of Digital Earth
tags:
  - graph-rag
  - spatial-reasoning
  - accessibility
---

## TL;DR

A campus assistance prototype enforces spatial, temporal, parking-availability, and entrance-accessibility constraints during graph retrieval before an LLM generates its answer. On 89 deliberately difficult campus queries, it reports 91.3% constraint satisfaction versus 67.8% for a text-retrieval baseline, with shorter contexts and fewer hallucinated entities.

## Research Question

Can explicit graph-based constraint enforcement improve campus event discovery, parking recommendations, and navigation compared with retrieving semantically similar entity descriptions?

## Motivation

An event, its building, an accessible entrance, and an available parking facility may reside in separate institutional datasets. Retrieving relevant descriptions does not itself establish that their combination satisfies a user's requirements. Entrance-level accessibility also requires finer spatial resolution than a building destination.

## Contributions

- A constraint-first retrieval pipeline over a campus spatiotemporal knowledge graph.
- A curated stress test of queries requiring joint spatial, temporal, and attribute reasoning.
- A map and subgraph inspection interface integrated into a campus digital twin prototype.

## Method

The Texas A&M campus graph combines events, buildings, parking feeds, and accessibility records in Neo4j. Typed links include IN_BUILDING, HAS_ENTRANCE, HAS_ACCESS, and ROUTE_TO; route edges store walking, driving, and biking distances obtained through Mapbox.

A sentence-transformer encoder with a linear classifier selects an intent and query template; predictions below 0.75 confidence are filtered. KeyBERT-derived terms are grounded to ontology slots, including time windows, building identifiers, wheelchair access, and travel mode. Parameterized Cypher queries filter entities and rank eligible candidates, for example by walking distance among parking facilities with available spaces.

The resulting subgraph is serialized with entity identities, relations, and attributes for LLaMA-3-8B through Ollama. The visual interface exposes the retrieved evidence and routes but does not participate in retrieval. This is an instance of [[concepts/constraint-aware-graph-retrieval|Constraint-Aware Graph Retrieval]].

## Experiments

The evaluation uses 89 curated high-complexity queries, the same underlying campus data and generator, temperature 0.2, top-p 0.9, and a 512-token output limit. The detailed baseline retrieves five entity-description documents by vector similarity; GraphRAG serializes the constraint-satisfying task subgraph. Although the introduction calls the baseline hybrid retrieval, the experimental description specifies vector similarity.

| Metric (Table 3) | GraphRAG | Traditional RAG |
| --- | ---: | ---: |
| Entity-level answer accuracy | 84.6% | 78.2% |
| Constraint satisfaction rate | 91.3% | 67.8% |
| TransE structural consistency | 0.82 | 0.54 |
| Hallucinated entities per query | 0.21 | 0.73 |
| Average context tokens | 186 | 412 |

Accuracy is mean per-query entity-set intersection over union, not exact-answer accuracy. Constraint satisfaction averages the fraction of returned entities meeting every specified constraint. TransE consistency measures the fraction of triples below an embedding-distance threshold; it is a relational proxy, not geometric validation. Hallucinations count entities absent from retrieved context or underlying data.

The paper describes an ablation favoring retrieval-stage over generation-stage constraint enforcement, but its numerical Table B1 is in supplementary material absent from the supplied Markdown. The interface demonstration provides inspectability; it does not establish a measured improvement in user trust.

## Limitations

The small stress test is not a representative workload benchmark. Performance depends on institutional data quality, ontology maintenance, intent classification, and constraint extraction. Graph construction and query specification add costs. Dynamic parking updates do not imply automatic awareness of closed entrances, roadworks, or temporary accessibility disruptions. Event-page changes can cause omissions. TransE consistency does not prove physical route feasibility, and nonzero hallucinations and imperfect constraint satisfaction remain. The system is a research prototype without public deployment; city-scale transfer is untested. Data are available from the corresponding author on reasonable request.

## Related Concepts

- [[concepts/constraint-aware-graph-retrieval|Constraint-Aware Graph Retrieval]]: encodes feasibility requirements as executable retrieval filters before answer generation.

## Related Papers

- Edge et al. (2024), *From Local to Global: A Graph RAG Approach to Query-Focused Summarization*, supplies document-oriented GraphRAG context in the paper's related work; the present method instead targets operational spatial constraints.
- Ye et al. (2024), *Developing Campus Digital Twin Using Interactive Visual Analytics Approach*, provides related campus visualization context cited by the authors.

Source: [Published article](https://doi.org/10.1080/17538947.2026.2677856), especially §§3–6 and Table 3.
