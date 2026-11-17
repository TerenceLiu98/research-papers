---
title: "Categorizing Topics Versus Inferring Attitudes: A Theory and Method for Analyzing Open-ended Survey Responses"
type: paper
authors:
  - William Hobbs
  - Jon Green
year: 2025
doi: 10.1017/pan.2024.23
tags:
  - text-as-data
  - political-methodology
  - survey-measurement
---

## TL;DR

Open-ended survey answers can express stable attitudes through changing, narrow examples. Hobbs and Green infer broader dimensions from associations with contextually common words, then validate them against repeated responses and human-coded political content. Their implied-word approach often yields more stable dimensions than topic models or pretrained-model output, but sentiment-based zero-shot scores outperform it on ACA test–retest reliability, and recent embeddings can improve its document scores.

## Research Question

How can researchers recover stable political attitudes from short survey answers when the specific statements respondents choose vary across occasions?

## Motivation

Accurately categorizing a statement does not establish that its category measures a persistent attitude. Extending the Receive–Accept–Sample account, the authors propose that respondents first select a broad directional thrust, then sample a specific statement that communicates it. Shared, locally meaningful words connect otherwise different expressions of that thrust.

## Contributions

- A theory distinguishing sampled response content from the underlying attitude distribution.
- An unsupervised implied-word scaling method that emphasizes common-word associations while discounting rare–rare associations.
- Panel-based validation alongside correspondence with combinations of human labels.
- An embedding extension for interpreting dimensions and reducing noisy document placements.

## Method

For each prompt-specific corpus, construct a document-term matrix and conditional word co-occurrence distributions. Compare each document's normalized word distribution with the distribution associated with each candidate implied word using the Bhattacharyya coefficient: the sum of square roots of paired probability products. A response can therefore be scored as about a word it never explicitly contains.

Standardize this transformed matrix, weight survey waves equally, and apply singular value decomposition to common-word columns. The main specification selects words whose squared frequency exceeds the mean squared frequency. The leading dimension captures prevalence; subsequent dimensions are substantive candidates. Project word associations through the singular vectors, aggregate word scores into document scores, and normalize document vectors to unit Euclidean norm (Section 4).

The extension averages document embeddings weighted by centered implied-word scores to form an embedding direction. Cosine similarities place documents and generated category labels on that direction. GPT-3.5 supplies candidate descriptions; OpenAI v3 large embeddings support labeling and scoring. This can change a dimension's meaning and therefore requires renewed validation (Section 7).

## Experiments

| Corpus | Coverage | Responses |
| --- | --- | ---: |
| Reasons for healthcare reform favorability | 2009–2018 | 14,278 |
| ANES party likes/dislikes | 1984–2020 | 62,798 |
| ANES most important problem | 1984–2016 | 22,983 |

Repeated-response tests use the 2016–2018 ISCAP panel and the 1992–1996 and 2016–2020 ANES panels. Comparators include human categories, topic models across topic counts, BART-MNLI zero-shot common-word scores followed by PCA, and ridge models trained on ACA favorability or party identification.

Common words and prevalent labels generally have higher within-person correlations than rare ones. A permutation comparison shows that frequency alone does not mechanically explain this pattern. In ANES, the leading substantive implied-word dimension is competitive with supervised partisan prediction; only some topics match it, usually those strongly associated with that dimension (Figures 2–3).

The ACA result qualifies any blanket superiority claim: zero-shot PCA has the highest test–retest reliability, but mainly recovers positive versus negative sentiment already elicited by the preceding closed-ended item. Implied-word scores instead distinguish government-role concerns from access to affordable care.

Regressions of automated scores on combinations of human labels support substantive political content rather than pure writing style (Figure 4). Party likes/dislikes distinguish issue and ideological justifications from group, performance, and candidate concerns. Later responses shift toward issue-based justifications, resembling Converse's levels-of-conceptualization distinction (Figure 5).

Recent embeddings preserve or improve implied-word reliability; BERT performs substantially worse, while PCA on the newer embeddings can approach the embedded method. Cross-question correlations are weaker than same-question correlations, offering an additional, nondefinitive style diagnostic. Most-important-problem responses from 2020 are excluded from the broad historical analysis because pandemic vocabulary creates a period-specific dimension; a later analysis trains on 2016 alone and evaluates 2020 (Sections 7–8).

## Limitations

Stable variation is not automatically an attitude or a left–right scale. Content validation remains necessary, and cross-question checks cannot definitively exclude communication style. Rare-word associations can produce outlying document scores. Corpus breadth and vocabulary shifts can undermine shared context. The method prioritizes stable dimensions rather than exhaustive topic coverage. Evidence is restricted to English-language U.S. political settings; opaque embedding training data also limit transfer claims. The source's plotted correlations are not reproduced here as numerical estimates.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: unsupervised dimensions require substantive interpretation and validation beyond statistical separation.
- [[concepts/denotation-and-connotation|Denotation and Connotation]]: locally symbolic meanings help explain why general semantic representations can miss political associations.

## Related Papers

- Zaller and Feldman (1992), “A Simple Theory of the Survey Response: Answering Questions Versus Revealing Preferences”: theoretical basis for treating answers as sampled considerations.
- Ying, Montgomery, and Stewart (2022), “Topics, Concepts, and Measurement: A Crowdsourced Procedure for Validating Topics as Measures”: topic coherence addresses a different criterion from repeated-response stability.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: a related library study of specified construct scoring and imperfect human benchmarks; not presented as a citation in this paper.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/FSK6NZ) and [Code Ocean](https://doi.org/10.24433/CO.1205164.v1).
