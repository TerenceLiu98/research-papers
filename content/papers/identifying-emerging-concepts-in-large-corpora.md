---
title: Identifying Emerging Concepts in Large Corpora
type: paper
authors:
  - Sibo Ma
  - Julian Nyarko
year: null
tags:
  - semantic-change
  - text-embeddings
  - computational-social-science
---

## TL;DR

A sentence-embedding pipeline detects new concepts through persistent increases in semantic density. Heatmap differencing and blob linking outperform HDBSCAN and DPMeans in synthetic evaluations, especially for small concepts, and reveal descriptive patterns in U.S. Senate discourse.

## Research Question

Can previously unspecified concepts be identified shortly after emergence, including concepts without a stable lexical expression?

## Motivation

Word-level methods often require predefined targets, while static clustering does not directly exploit emergence over time. The paper defines emerging concepts as distinct new discourse that persists.

## Contributions

- Introduces an unsupervised temporal density approach to [[concepts/emerging-concept-detection|Emerging Concept Detection]].
- Uses configurable temporal linking to capture sustained concepts, fads, and rediscovery.
- Evaluates synthetic innovations and historical events, then analyzes partisan and demographic differences in Senate discourse.

## Method

MPNet embeds sentences. One UMAP fitted to all embeddings projects them to two dimensions, and each period becomes a 400-by-400 histogram with shared bounds. The historical reference takes the maximum in each bin over preceding periods. Each subsequent heatmap is normalized to the reference total, then the reference is subtracted and negative values are clipped to zero.

Laplacian-of-Gaussian blob detection locates concentrated density increases. A relative peak threshold controls sensitivity. Nearby blobs are linked across periods into temporal graphs. The window W and maximum linking gap Q control persistence requirements. Applications use a permissive threshold of 0.05 followed by filtering; W = 1 captures fads, while W = 30 and Q = 20 permit rediscovery.

## Experiments

- **Synthetic corpus (§4.1):** 207,413 historical COHA texts are randomized across years, with GPT-4-generated sentences introducing eight new word meanings. Concept sizes range from 10 to 200. Baseline parameters are separately optimized with Bayesian optimization at each size. Reported F1 curves favor the proposed approach, especially for small concepts; exact curve values are not tabulated in the supplied text.
- **Robustness (Appendix A.4):** At concept size 100, Table 2 reports performance of 0.94 for the baseline, replacement with stella_en_400M_v5, UMAP neighbors = 30, and minimum distance = 0.4. Three-dimensional UMAP gives 0.91. The table names its metric only “Performance.”
- **Historical events (§4.2):** In 2,870,795 COHA sentences from 1900–2000, all selected historical events are detected, sometimes as several narrower concepts. This does not establish corpus-wide precision or recall.
- **Senate application (§5):** Across 2,254,427 speeches from 1941–2015, the minority party tends to devote a greater proportion of speeches to new partisan concepts from the Civil Rights era onward. Women and racial/ethnic minority senators are associated with distinct concept portfolios. These findings are descriptive rather than causal.

## Limitations

Sensitivity depends on the peak threshold, and permissive detection requires false-positive review and sometimes concept merging. Synthetic innovations have uncertain external validity; exhaustive real-world concept labels are unavailable. Histogram memory grows exponentially with dimension: the appendix reports requirements exceeding 800 GB at four dimensions. Fitting UMAP on the full corpus makes the evaluated pipeline retrospective rather than a demonstrated strictly online detector.

The supplied Markdown does not establish a publication year or stable identifier; the year is left unspecified.

## Related Concepts

- [[concepts/emerging-concept-detection|Emerging Concept Detection]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]

## Related Papers

- [[papers/cobwebtm-probabilistic-concept-formation-for-lifelong-and-hierarchical-topic-modeling|CobwebTM]] offers a library comparison: it builds a concept hierarchy incrementally, whereas this paper detects temporal density changes in a shared projection. This is not a claimed citation relationship.

[[index|Library home]]
