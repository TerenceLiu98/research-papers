---
title: "Computational measurement of political positions: a review of text-based ideal point estimation algorithms"
type: paper
authors:
  - Patrick Parschan
  - Charlott Jakob
year: 2025
date: "2025-12-04"
tags:
  - political-methodology
  - text-as-data
  - ideal-point-estimation
  - systematic-review
---

## TL;DR

This systematic review organizes 25 computational text-based ideal point estimation (CT-IPE) contributions into word-frequency, topic-modeling, word-embedding, and LLM-based families. Its comparison asks how each method generates numerical textual variation, captures variation relevant to a political construct, and aggregates it into positions. The result is a conceptual framework and guidance for method selection, not an empirical ranking of algorithms: a shared-data benchmark remains a proposal.

## Research Question

In what political, linguistic, and empirical contexts were CT-IPE algorithms developed, and how do their modeling choices turn textual variation into estimates of latent political positions?

## Motivation

[[concepts/text-scaling-models|Text Scaling Models]] infer positions from manifestos, speeches, and social media, but methods developed across disciplines use different terminology, assumptions, and validation practices. Following successive NLP developments has expanded the available tools without establishing when their estimates are comparable. The review treats algorithm choice as a measurement decision involving construct definition, data context, and validation.

## Contributions

- Synthesizes 25 methodological contributions using a content analysis of development context and measurement logic.
- Introduces a generate-capture-aggregate framework and an inductively derived four-family typology.
- Connects method selection to theoretical alignment, data and compute requirements, transparency, and available validation strategies.
- Proposes studying disagreements between algorithms, alongside agreement with benchmarks, to understand what different measurement choices recover.

## Method

### Scope and Search

Eligible methods estimate continuous political positions from actor-authored text and formal metadata, use unsupervised or semi-supervised learning, and constitute a new algorithm or a formal modification. The authors treat limited reference texts or keyword anchors as semi-supervision. Methods requiring external behavioral inputs or extensive labeled training data fall outside the stated scope. Although peer review is an inclusion criterion, Table 2 explicitly relaxes it for recent LLM-based methods.

The search covered Web of Science, EBSCOhost, arXiv, and the ACL Anthology, using 214 keywords and a stated publication window of January 1, 1990 through January 23, 2025. Deduplication and heuristic filtering reduced 25,411 records to 15,833. Two authors independently used ASReview active learning, each stopping after 100 consecutive non-relevant records. Full texts were screened against the eligibility criteria and augmented by backward citation tracking (Sections 4.1-4.2).

Both authors then annotated 18 variables: 15 describing development context and three describing variance generation, capture, and aggregation. The typology was derived from this annotation rather than fixed before screening (Sections 4.3 and 5.2).

### Measurement Framework

The three steps are a conceptual decomposition, not necessarily separate implementation stages. Classification depends on the full estimation procedure: a model that uses embeddings to construct topics can still belong to the topic-modeling family.

| Family | Generate textual variation | Capture construct-relevant variation | Aggregate into positions; examples |
| --- | --- | --- | --- |
| I: Word frequency | Document-word counts | Reference-text contrasts or word discrimination parameters | Weighted scoring or statistical estimation; Wordscores, Wordfish, Wordshoal |
| II: Topic modeling | Topic distributions or intensities | Topic-specific opinions or ideological adjustments | Joint latent-variable estimation or topic-based scaling; TBIP, CPT, TopicShoal, TV-TBIP |
| III: Word embeddings | Dense word, sentence, document, or actor vectors | Semantic relationships, selected keywords, or latent axes | Dimensionality reduction or similarity-based scaling; Party Embeddings, SemScale/SemScore, Super-Unsupervised Classification |
| IV: LLMs | Representations learned during model pretraining | Prompts specifying dimensions, comparisons, or survey-like judgments | Averaging, comparison-based scoring, or item response models; Asking and Averaging, LaMP/CGCoT, Semantic Scaling |

For example, Wordfish estimates positions and word discrimination parameters from Poisson word counts. TBIP jointly infers neutral topics, ideological adjustments, and author positions through variational inference. Party Embeddings projects party vectors onto principal components. [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] supplies an explicit dimension through a prompt and can average text scores into actor estimates. The review's account of prompts accessing relevant representational variation is a conceptual interpretation, not a demonstrated mechanism of LLM internals (Section 5.2).

## Experiments

The empirical work is literature screening and qualitative content analysis. The paper does not run the reviewed algorithms on a common corpus or report comparative accuracy, runtime, or memory measurements.

### Review Evidence

| Stage | Reported evidence |
| --- | --- |
| Abstract screening | Authors screened 320 and 453 records respectively; 475 unique records were screened and 57 selected for full-text review. |
| Full-text screening | 57 selected papers plus 7 from citation tracking yielded 64 full texts. Agreement was 0.86; Krippendorff's alpha was 0.72. Nine disagreements were resolved through discussion. |
| Detailed annotation | 33 papers passed full-text screening; eight were subsequently excluded, leaving 25 contributions. |
| Typology | Table 2 contains 10 word-frequency, 5 topic-modeling, 5 embedding, and 5 LLM-based entries. Some entries are extensions or cover multiple named algorithms. |

The reviewed development settings concentrate on political elites, parties, Western democracies, and their languages, with some coverage of other settings such as Japan. Corpora range from dozens of documents to millions, and constructs extend beyond left-right ideology to government-opposition, European integration, hostility, and issue-specific positions. All reviewed papers perform some external validation, but explicit transferability evaluations are limited. Code and data sharing are common, though some older links are unavailable (Section 5.1).

### Guidance and Proposed Benchmark

The authors recommend aligning the construct and setting with a method's assumptions, then considering resources and validation. They present increasing data/compute demands and declining transparency from Type I to Type IV as qualitative guidance. Figure 8 considers training and inference together; this ordering is not a measured comparison of marginal deployment costs for pretrained models.

The proposed benchmark would apply many algorithms to shared, diverse data and examine both final positions and intermediate choices. Suggested diagnostics include feature counts and variance distributions, retained variation or topic coherence, dispersion of actor estimates, document-sampling sensitivity, runtime, and memory. These are proposals rather than reported results. Section 7.2 also cautions that metrics such as PCA explained variance and topic coherence are not directly commensurable.

## Limitations

- The framework abstracts from preprocessing, anchoring, estimation details, and other choices that can materially alter results. It does not establish one family's superior validity.
- Active-learning stopping rules and heuristic filters can miss eligible studies. Screening 475 unique abstracts from 15,833 candidates does not demonstrate exhaustive recall.
- Scope decisions exclude potentially relevant methods, including Latent Semantic Scaling because it does not frame its contribution as CT-IPE under the review's definition. The Class Affinity Model is excluded for lacking a peer-reviewed version, while LLM methods receive an explicit exception.
- Development is concentrated in particular political systems, actor types, and text genres; validation in those settings does not establish general transferability.
- LLM training data may contain previously published political positions. Agreement could partly reflect retrieval of prior estimates, making it difficult to separate new text measurement from memorized knowledge. The review raises this concern without quantifying contamination.
- A large-scale benchmark is future work. Differences between algorithms could arise from the construct, representation, preprocessing, or aggregation, so disagreement alone cannot identify which estimate is more valid.

The supplied Markdown reports online publication on December 4, 2025, but does not provide the article's own DOI. It identifies supplemental materials, replication data, and code through the OSF identifier `10.17605/OSF.IO/XPKAF`; that identifier belongs to the supporting materials, not the article.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: canonical overview of estimating latent positions from text.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: one prompt-based approach within the broader LLM family.
- [[concepts/text-embedding-models|Text Embedding Models]]: representations used in semantic scaling and some topic-based pipelines.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: interpreting estimated axes requires deciding which political dimensions are substantively relevant.

## Related Papers

- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: the library holds a 2024 manuscript by Le Mens and Gallego on direct scoring. This review cites their 2025 article, "Positioning political texts with large language models by asking and averaging," as a Type IV contribution; the versions should be distinguished.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a library comparison on validation of positions and uncertainty against human judgments, not a citation in this review.
- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts": the Wordfish contribution used to illustrate Type I.
- Vafa, Naidu, and Blei (2020), "Text-Based Ideal Points": the TBIP contribution used to illustrate topic-based joint estimation.
- Rheault and Cochrane (2020), "Word embeddings for the analysis of ideological placement in parliamentary corpora": the Party Embeddings contribution used to illustrate Type III.

[[index|Library home]]
