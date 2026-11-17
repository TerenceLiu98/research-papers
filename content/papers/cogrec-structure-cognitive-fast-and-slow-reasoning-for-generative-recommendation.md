---
title: "CogRec: Structure-Cognitive Fast-and-Slow Reasoning for Generative Recommendation"
type: paper
authors: [Xiang Liu, Jingsong Su, Shuqi Zhao, Pengbo Mo, Yiming Qiu, Huimu Wang, Mingming Li, Jiao Dai, Jizhong Han, Songlin Hu]
year: null
tags: [generative-recommendation, semantic-ids, structured-reasoning]
---

## TL;DR

CogRec generates intermediate operations over the same Semantic ID topology used for next-item prediction. Routing improves Hit@10 and NDCG@10 over direct generation on Amazon Beauty and Sports, but reduces both on Toys. Its benefit is conditional on learnable structural transitions, with longer traces adding decoding cost.

## Research Question

Can reasoning grounded in item-identifier structure improve generative recommendation more effectively than descriptive natural-language rationales?

## Motivation

Hierarchical item identifiers provide a structured prediction space, yet ordinary generators mainly learn them as output sequences. Natural-language reasoning must translate its conclusions back into that discrete space. CogRec makes intermediate transitions explicit within the identifier topology.

## Contributions

- Augments hierarchical IDs with same-layer centroid graphs and item neighborhoods.
- Defines Match, LateralJump, and Explore operations for supervised routing traces.
- Compares direct prediction, natural-language reasoning, and structural routing through a staged training pipeline, with structural difficulty and generation-cost diagnostics.

## Method

BGE encodes item metadata into normalized 768-dimensional vectors. Residual K-means produces four SID layers with 256 codes each. Directed centroid graphs retain top-16 neighbors with cosine similarity at least 0.15. HNSW indexes item neighborhoods within sufficiently large finest-layer clusters; routing labels themselves use code matching and centroid edges.

Offline supervision selects the historical item with greatest target-prefix overlap, falling back to the last item when no first-layer match exists. At each layer, equal codes yield Match, an existing directed edge yields LateralJump, and other transitions yield Explore. Explore is not a verified graph path. Target-dependent anchors and routes are used for supervision and diagnostics only; inference receives user history.

Qwen3-1.7B first aligns newly added SID embeddings with descriptions, then learns direct SID generation. Two branches start from that checkpoint and learn natural-language rationales or routing traces. Both reasoning branches use metadata-enriched histories; the direct training stage uses SID-only histories. Non-Match operations are verbalized before the target identifier. Training supervises history and assistant tokens while masking system prompts.

The target SID is generated using trie-constrained beam search. Reasoning evaluation samples five traces and uses ten beams per trace, yielding up to 50 hypotheses. Match/LateralJump/Explore costs of 0/1/2 are ordinal diagnostics, not measured latency, learned costs, or loss terms. Fast and slow denote operations within one model, not separate neural systems.

## Experiments

Amazon Reviews 2014 Beauty, Sports, and Toys use chronological leave-one-out splits: the last interaction is test, the preceding interaction validation. Reported CogRec results in Tables 3–4 are:

| Dataset | Direct Hit@10 | Routing Hit@10 | Direct NDCG@10 | Routing NDCG@10 |
| --- | ---: | ---: | ---: | ---: |
| Beauty | 0.0842 | 0.0854 | 0.0512 | 0.0517 |
| Sports | 0.0427 | 0.0473 | 0.0256 | 0.0274 |
| Toys | 0.0901 | 0.0877 | 0.0552 | 0.0541 |

Sports shows the largest improvement: +0.0046 Hit@10 and +0.0018 NDCG@10. Medium structural-difficulty instances constitute about 80–85% of test sets. Three- or four-operation reference routes account for 92.34%, 94.12%, and 91.67% of Beauty, Sports, and Toys respectively; these are offline route statistics, not generated-route correctness measurements.

Table 5 uses a separate fixed CoT subset for reasoning results. On Beauty, enriching raw traces with semantic text reduces subset reasoning Hit@10 from 0.0895 to 0.0367. Subsequent assistant-only masking further degrades performance, and cosine scheduling partly recovers it. These are cumulative changes, not independent one-factor ablations.

## Limitations

Routing is not uniformly beneficial and produces longer traces than natural-language reasoning. Hard structural cases remain difficult. External baseline results in Table 3 come from heterogeneous sources and are not all controlled reruns. The controlled experiments report seed 42. Full-test reasoning evaluation tail-truncates histories to 21/20/18 items for Beauty/Sports/Toys, unlike direct and default subset evaluation; matching candidate spaces does not imply identical compute or input histories.

The supplied manuscript contains placeholder conference, DOI, year, and received-date fields. Publication year and stable identifier therefore remain unverified; the template's 2018 is not treated as a publication date.

## Related Concepts

- [[concepts/semantic-ids-for-generative-recommendation|Semantic IDs for Generative Recommendation]] — the structured output space and substrate for routing.
- [[concepts/latent-reasoning|Latent Reasoning]] — a contrasting approach that carries intermediate computation in hidden representations rather than explicit routing text.

## Related Papers

The manuscript positions TIGER (*Recommender Systems with Generative Retrieval*, reference 19) as a predecessor for hierarchical identifiers; OneRec-Think (reference 15) supplies the explicit natural-language reasoning comparison. ReaRec (*Think Before Recommend*, reference 22) instead iterates hidden user representations. These relationships are reported from the supplied manuscript; no separate library pages are created for these cited works.
