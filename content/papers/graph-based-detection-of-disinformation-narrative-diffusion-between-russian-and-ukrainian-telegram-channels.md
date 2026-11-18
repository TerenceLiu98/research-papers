---
title: Graph-Based Detection of Disinformation Narrative Diffusion between Russian and Ukrainian Telegram Channels
type: paper
authors:
  - Yuliia Vistak
  - Vera Schmitt
  - Viktoriia Makovska
  - Veronika Solopova
year: null
tags:
  - disinformation
  - narrative-classification
  - telegram
  - diffusion-networks
---

## TL;DR

The paper combines few-shot narrative labeling with explicit forwarding and semantic similarity graphs for Russian- and Ukrainian-language Telegram posts. Gemini-2.5-Flash reaches binary F1 0.82 on 412 annotated messages. Cross-group reachability is much higher in the semantic graph than in native forwarding, suggesting that forwarding metadata alone misses substantial repost-like connectivity; semantic links remain inferred relationships rather than verified transmissions.

## Research Question

Can weakly supervised narrative assignment and complementary diffusion graphs reveal how pro-Russian disinformation narratives circulate across Telegram channels?

## Motivation

Narratives unite differently worded claims, while Telegram forwarding metadata exposes only some content reuse. Combining narrative labels with semantic repost candidates supports analysis beyond isolated posts and native forwards.

## Contributions

- Introduces TeleNarratives, extending a VoxCheck taxonomy to 380 sub-narratives, 32 narratives, and 9 meta-narratives.
- Compares semantic similarity, multilingual entailment, zero-shot LLMs, ensembles, and few-shot LLM labeling.
- Analyzes explicit and inferred propagation layers to characterize upstream channels and cross-group connectivity.

## Method

The authors collect 1,352,668 public messages from 98 curated channels between 16 December 2024 and 27 February 2026. Selection combines channels identified as unreliable or suspicious with popular Ukrainian news channels. The analyzed scope contains 70,595 messages involved in forwarding chains plus 10,774 additional messages from semantic pairs, totaling 81,369.

Three annotators label a weekly stratified sample of 412 messages: 103 shared messages and 103 additional messages per annotator. Taxonomy expansion adds 20 sub-narratives and six narrative categories to the original 360/26 inventory. Although the paper uses multilabel terminology, the final prompt selects the best or clearest narrative and sub-narrative, or abstains.

Explicit edges run from source channel to forwarding channel and require the source message to be observed. Semantic edges use BGE-M3 embeddings, HNSW retrieval with 80 neighbors, and cosine similarity at least 0.985, excluding same-channel pairs and already explicit forwards. Message links are time-oriented and aggregated to channel flows. Calibration on 3,215 mapped hidden-forward pairs gives 76.39% recall at that threshold.

A channel is narrative-active when it has at least 50 labeled messages and at least 60% receive narrative assignments. This yields 41 narrative-active channels and 57 others, including 32 with limited evidence. The latter group is therefore not a verified set of narrative-free channels.

## Experiments

Table 2 reports the following results; shared-subset evaluations use 103 messages and the full set uses 412.

| Labeler | Evaluation set | Binary F1 | Binary MCC | Meta weighted F1 | Meta MCC |
|---|---|---:|---:|---:|---:|
| BGE-M3 similarity | Shared | 0.37 | 0.08 | 0.54 | 0.13 |
| mDeBERTa NLI | Shared | 0.54 | 0.15 | 0.32 | 0.13 |
| Gemini-2.5-Flash zero-shot | Shared | 0.76 | 0.63 | 0.74 | 0.52 |
| Gemini-2.5-Flash few-shot | Shared | 0.85 | 0.78 | 0.80 | 0.62 |
| Gemini-2.5-Flash few-shot | Full | 0.82 | 0.71 | 0.76 | 0.57 |

LLM ensembles do not improve on Gemini alone. Human agreement is approximately 0.887 for binary presence, 0.719 for meta-narratives, and 0.626 for narrative labels. Of 81,369 analyzed messages, 29,649 receive a narrative assignment.

Only 121 of 34,967 explicit forwarding events cross channel groups (0.35%), compared with 1,078 of 52,414 semantic flow events (about 2%). Cross-group reachability is 0.0211 in the explicit graph at four hops and 0.5385 in the semantic graph at three hops. These hop budgets separately cover at least 85% of reachable ordered pairs; they are not identical experimental settings. At eight hops, semantic cross-group reachability is 0.6538.

Among narrative-active channels, rian_ru accounts for 612 of 3,016 explicit spread events (20.3%) and reaches 17 downstream channels. This identifies an upstream position within the observed network, not an original creator outside it.

## Limitations

Weak labels introduce errors, the taxonomy drifts, and curated channels plus propagation-based message selection limit representativeness. Ukrainian language variation and code-switching are not separately evaluated. Semantic similarity and temporal ordering do not establish copying, coordination, endorsement, or causal transmission. Labels reflect an expert inventory and a prompt explicitly requesting a Ukrainian perspective; they are not independent factual verification.

The supplied text reports 10,872 semantic pairs in dataset construction, 24,692 retained pairs in threshold calibration, and 52,414 semantic flow events in results without fully reconciling those counts. It also names Claude Sonnet 4 in the method and Sonnet 3.5 in Table 2. No publication year, venue, or stable identifier is explicitly provided; the year is left unknown rather than inferred from the collection dates.

## Related Concepts

- [[concepts/narrative-diffusion-graphs|Narrative Diffusion Graphs]]: separates narrative assignment from evidence about transmission.
- [[concepts/narrative-polarization|Narrative Polarization]]: compares narrative portrayals across environments; low cross-group forwarding alone does not measure that construct.

## Related Papers

- Kalkbrenner et al. (2025), “MisinfoTeleGraph: Network-driven misinformation detection for German telegram messages”: the cited network-driven foundation adapted to this narrative-centric conflict setting.
- Nikolaidis et al. (2025), “PolyNarrative”: a cited multilingual hierarchical narrative resource.
- [[papers/narratex-dataset-explaining-the-dominant-narratives-in-news-texts|NarratEX Dataset]]: a library comparison that pairs news narrative labels with explanations, complementing this paper's focus on propagation.
