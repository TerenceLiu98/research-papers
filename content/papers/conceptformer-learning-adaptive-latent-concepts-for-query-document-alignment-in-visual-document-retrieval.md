---
title: "ConceptFormer: Learning Adaptive Latent Concepts for Query-Document Alignment in Visual Document Retrieval"
type: paper
authors: [Chunyi Peng, Zhipeng Xu, Yukun Yan, Zhenghao Liu, Shi Yu, Sen Mei, Yubo Sun, Yongheng Zhang, Jie Zhou, Yu Gu, Ge Yu, Maosong Sun]
year: 2026
tags: [visual-document-retrieval, latent-concepts, representation-learning]
---

[[index|Library home]]

## TL;DR

ConceptFormer adds query-conditioned latent concepts during visual retriever training, allocating their length from the coverage of query-relevant page regions. Its Qwen variant reports 75.97 average NDCG@10 across six benchmarks, versus 65.05 for DSE and 62.24 for OCR-based NV-Embed-v2. Inference uses ordinary query/page embeddings without concept generation.

## Research Question

Can adaptive continuous evidence representations improve query–page alignment beyond page-level contrastive supervision and textual or visual evidence proxies?

## Motivation

Page-level labels do not identify the local evidence supporting relevance. Textual descriptions can lose chart and layout information, while pooled regional visual features can miss query semantics and global context. The proposed intermediate representation combines query and page context with evidence-dependent capacity.

## Contributions

- A training-time latent concept sequence conditioned on the query and positive page.
- Evidence-region coverage determines the number of concept tokens instead of a fixed budget.
- A ranking-distribution alignment objective supplements page-level contrastive learning.

## Method

A Qwen3.6-Plus evidence proposer identifies bounding boxes on each positive page. Boxes are mapped onto the retriever’s visual token grid; concept length is the sum of covered-token counts across regions (Equations 8–10). This is a capacity signal, rather than direct replacement of concepts with cropped visual features.

The retriever produces hidden states at special concept-token positions conditioned on the query, positive page, and preceding concept tokens. Mean pooling yields a concept vector. The objective combines contrastive retrieval loss with forward KL divergence from the query-induced document ranking distribution to the concept-induced distribution:

$$
\mathcal L=\mathcal L_{\mathrm{cons}}+\lambda\,\mathrm{KL}(P(d\mid q)\Vert P(d\mid\hat c)).
$$

The default is $\lambda=0.2$. Query and page embeddings use normalized EOS states. The evidence proposer and concept sequence are used only during training, preserving the standard retrieval inference pipeline.

## Experiments

Training uses approximately 38,000 pairs from DocVQA, InfoVQA, VisualMRC, OpenWikiTable, DUDE, and MHDocVQA. Models train for three epochs with LoRA, an effective batch size of 128, and four 40GB A100 GPUs. InfoVQA is the in-domain evaluation; five other benchmarks test transfer.

Table 1 reports the following Qwen results, on the paper’s percentage scale:

| Benchmark | Recall@10 | NDCG@10 |
|---|---:|---:|
| InfoVQA | 93.03 | 79.23 |
| ChartQA | 98.67 | 95.79 |
| SlideVQA | 90.88 | 82.41 |
| TQA | 72.10 | 41.30 |
| OWID Charts | 99.24 | 95.39 |
| Wikimedia Maps | 76.04 | 61.69 |
| Average | 88.33 | 75.97 |

The average NDCG gains are 16.7% relative to DSE and 22.1% relative to NV-Embed-v2. The Phi3V variant reaches 67.00 average NDCG@10.

In Table 2, text proxies reach 74.85, visual proxies 72.81, end-token aggregation 75.43, and removal of KL supervision 74.22, compared with 75.97 for the full model. Thus the matched-backbone gain over contrastive-only training is 1.75 points, smaller than the cross-model headline comparison. Improvements are not universal: removing KL gives 96.03 on OWID Charts versus 95.39 for the full model.

Allocated concept length has median 50 and 90th percentile 224; 7.9% of samples exceed 256 tokens. Section 5.4 reports that adaptive allocation outperforms all tested fixed lengths, without a monotonic benefit from increasing fixed capacity.

## Limitations

The method depends on training-time region proposals and uses spatial coverage as a proxy for required representational capacity. The supplied paper does not quantify annotation cost, training overhead, or robustness to incorrect proposals. Retrieval evaluation does not establish downstream answer quality. Large headline comparisons combine differences in backbone and supervision; the within-backbone ablations more directly isolate the auxiliary objective.

The source provides a placeholder DOI and no confirmed venue or stable paper identifier; these are omitted from metadata. Author order follows its ACM reference-format block.

## Related Concepts

- [[concepts/adaptive-latent-concept-supervision|Adaptive Latent Concept Supervision]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]: ranking distributions provide the auxiliary supervision signal.
- [[concepts/latent-reasoning|Latent Reasoning]]: a related use of continuous intermediate states, here adapted to retrieval training.

## Related Papers

The source positions DSE (Ma et al., 2024) as screenshot-based dense retrieval, ColPali (Faysse et al., 2025) as multi-vector visual retrieval, and ReAlign (Yang et al., 2026) as reasoning-guided regional textual supervision. ConceptFormer instead learns continuous intermediate concepts with adaptive capacity. These references are described from the supplied manuscript; matching library pages were not found.
