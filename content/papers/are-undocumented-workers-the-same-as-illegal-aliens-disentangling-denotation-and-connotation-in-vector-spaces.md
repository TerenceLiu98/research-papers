---
title: 'Are “Undocumented Workers” the Same as “Illegal Aliens”? Disentangling Denotation and Connotation in Vector Spaces'
type: paper
authors:
  - Albert Webson
  - Zhizhong Chen
  - Carsten Eickhoff
  - Ellie Pavlick
year: null
source_job_id: "15287330-8fff-473a-8fa2-dfda110714fe"
tags:
  - political-language
  - representation-learning
  - information-retrieval
---

## TL;DR

Two adversarially trained embedding spaces separate referential content from partisan associations in political language. Intrinsic evaluations show partial separation, while news retrieval gains viewpoint diversity at a substantial relevance cost: denotation embeddings raise α-nDCG@100 from 0.915 to 0.944 but reduce Precision@10 from 0.78 to 0.37 on a small manually judged sample.

## Research Question

Can pretrained word representations separate what expressions refer to from their partisan connotations, and can the resulting denotation space diversify retrieved news?

## Motivation

Expressions such as “estate tax” and “death tax” can refer to the same policy while communicating different attitudes. Distributional embeddings mix these signals. Inspired by two-factor semantics, the paper operationalizes [[concepts/denotation-and-connotation|Denotation and Connotation]] as separately controllable aspects of meaning.

## Contributions

- Introduces paired adversarial decomposers with predictive probes and a reconstruction objective.
- Compares bill, policy-topic, and language-model-proxy grounding for denotation.
- Evaluates lexical neighborhoods, political euphemism pairs, and viewpoint diversity in news retrieval.

## Method

The denotation and connotation decomposers are separate 300-dimensional embedding matrices initialized from pretrained representations; sentences are represented by mean embeddings. Multiword expressions are treated as atomic tokens. Four-layer MLP probes predict denotation and partisan labels. Each decomposer preserves its target label through a classification loss while encouraging the opposing probe's predictions toward a uniform distribution through a KL-divergence objective. Probes themselves continue to minimize classification cross-entropy. Sigmoid-transformed preservation and adversarial losses are combined with a cosine reconstruction loss from a linear recomposer of both spaces.

Congressional Record speeches from 1981–2011 provide speaker-party labels. Bill-title matches and three subsequent speeches supply weak denotation labels: 1,029 bills or 41 topics, each using 381,847 sentences. CR PROXY uses 5,686,864 sentences and skip-gram context prediction instead of denotation labels. PN PROXY uses 3,209,933 sentences from partisan news, with publisher leanings collapsed into left, center, and right. The proxy assumes meaning not captured by partisan labels belongs to denotation; this is an operational assumption rather than semantic identification.

## Experiments

Intrinsic evaluation measures the fraction of nearest neighbors sharing a word's majority-use denotation or partisan label, using random words, highly partisan words, and curated euphemism pairs (§5). For highly partisan words, CR TOPIC increases denotation-space denotation homogeneity from 0.35 to 0.53 and decreases partisan homogeneity from 0.76 to 0.59. PN PROXY reduces partisan homogeneity from 0.66 to 0.40; no denotation labels are available for its corresponding homogeneity test. CR PROXY shows essentially no denotation-space homogeneity improvement. Euphemism results are mixed: CR PROXY changes connotation similarity in the intended direction for 13/13 pairs but denotation similarity for only 5/13 (Table 4).

Retrieval uses 410 politically leaning queries derived from 12 issue seeds and filtered Bing suggestions. BM25 selects 5,000 candidates, followed by DRMM reranking trained on MS MARCO with frozen embeddings. Table 6 reports:

| Embeddings | α-nDCG@10 | α-nDCG@100 | P@10 |
| --- | --- | --- | --- |
| Pretrained | 0.907 | 0.915 | 0.78 |
| Denotation | 0.922 | 0.944 | 0.37 |
| Connotation | 0.904 | 0.914 | 0.64 |

Diversity is measured over publisher leanings. Precision is manually assessed on only ten queries, with 300 query–document pairs across the three models. Thus the diversity gain comes with a large observed relevance loss, rather than a demonstrated improvement on both objectives.

## Limitations

- Speaker party and publisher leaning are coarse proxies for connotation; bill and topic labels are weak proxies for reference.
- Static embeddings and atomic phrases do not resolve contextual meaning or compositional semantics.
- Shallow adversarial probes leave information recoverable by deeper probes (§4.2); apparent removal depends on probe capacity.
- Reconstruction encourages preservation of pretrained information but does not establish complete semantic recovery or independence.
- The retrieval relevance sample is small, and source balance does not establish reduced polarization or improved reader outcomes.
- The supplied Markdown does not establish publication year or a stable paper identifier; these metadata are left unspecified.

## Related Concepts

- [[concepts/denotation-and-connotation|Denotation and Connotation]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- [[papers/ideology-prediction-of-german-political-texts|Ideology Prediction of German Political Texts]]: a library comparison focused on predicting political position; the present paper instead tries to separate partisan associations from referential content.
- Romanov et al. (2019), “Adversarial decomposition of text representation”: cited by the authors as related content–style decomposition work.

[[index|Library home]]
