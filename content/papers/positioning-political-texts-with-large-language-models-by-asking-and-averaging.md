---
title: "Positioning Political Texts with Large Language Models by Asking and Averaging"
type: paper
authors:
  - "Ga\u00ebl Le Mens"
  - Aina Gallego
year: 2024
date: "2024-09-06"
tags:
  - text-as-data
  - political-methodology
  - large-language-models
  - ideological-scaling
  - human-validation
---

## TL;DR

Asking instruction-tuned LLMs to score individual tweets or sentences, then averaging numeric scores, produces political positions that agree strongly with human coding and roll-call benchmarks in four settings. In Table A1, GPT-4 Turbo reaches Pearson r = 0.94 on 469 of 899 benchmark tweets, while GPT-4o reaches 0.92 on 557. These are model-specific scored subsets: high agreement does not imply complete coverage. Sentence-level averaging also outperforms whole-manifesto prompting on several comparisons, but the authors find no corresponding significant degradation when senators' tweets are submitted together.

## Research Question

Can direct numerical judgments from instruction-tuned LLMs measure ideological and policy positions without task-specific training, including within-party variation, short texts, long documents, and multilingual speeches?

## Motivation

[[concepts/text-scaling-models|Text Scaling Models]] estimate political positions from communication, but human coding requires substantial effort and supervised classifiers require labeled data. [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] specifies the target dimension in a prompt and obtains a numerical judgment directly. Averaging these judgments can extend the approach from individual passages to documents or actors, provided the resulting measure is validated against an appropriate benchmark.

## Contributions

- Evaluates direct scoring and averaging on congressional tweets, senators, British party manifestos, and European Parliament speeches delivered in 10 languages.
- Compares proprietary and downloadable LLMs with supervised BERT, GloVe, and TF-IDF classifiers, including within-party performance and scoring coverage.
- Examines aggregation choices, translated versus original-language speeches, dimension descriptions, and an alternative based on party typicality.
- Calibrates model predictions of individual human judgments against averages of multiple human ratings.

## Method

Each prompt supplies a tweet or sentence, names the dimension, defines endpoints on a 0-100 scale, and requests a JSON `Score`. The model may return `NA` for content unrelated to the dimension. Scales run from left to right for ideology and economic policy, liberal to conservative for social policy, and anti-subsidy to pro-subsidy for the European debate. The subsidy prompts include background about proposals to end or extend support for uncompetitive coal mines (Appendix C.6). No labeled examples or task-specific model updates are required.

The document or actor position is the arithmetic mean of returned numeric scores; `NA` responses are excluded. Manifestos and speeches are scored sentence by sentence, while each senator is represented by a random sample of 100 tweets. This gives equal weight to scored units, rather than weighting sentences by length. A score describes the supplied texts and need not equal an expert's broader perception of the actor.

The main protocol uses temperature 0, at most 20 output tokens, and JSON mode where supported. Appendix B.5 separately shows a cloud-endpoint configuration with temperature 0.001. The model comparison includes GPT-4o, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo, Mixtral, Llama 3, and Aya; Appendix E adds other models. These are the versions evaluated in this 2024 manuscript.

Tweet classifiers learn party labels and convert party typicalities into positions. The manifesto BERT baseline instead learns crowd-coded sentence categories, with approximately 98,000 training, 10,000 validation, and 107,000 test ratings, keeping all ratings of a sentence in one split (Appendix D.1). These supervision targets differ from each other and from direct ideological scoring.

## Experiments

### Settings and Benchmarks

| Setting | Data and benchmark | Reported finding |
| --- | --- | --- |
| Congressional tweets | 900 tweets; 597 Prolific participants each rate 30; 899 tweets receive at least one numeric rating. Benchmark is the mean human position, with authors' identities withheld. | Strong LLM agreement overall, with weaker within-party correlations. The post-training-cutoff argument concerns GPT-4, not every model (Sections 2.2.1 and 3.1). |
| Senators of the 117th Congress | 100 tweets per included senator from January 2021 to January 2023; first-dimension Nokken-Poole period-specific DW-NOMINATE benchmark. Figures report N = 98. | LLM positions correlate strongly overall and within parties and outperform the compared classifiers; within-party agreement with campaign-finance scores is weaker (Section 3.2, Appendix F). |
| British manifestos | 18 manifestos on economic and social dimensions; Section 2.2.3 specifies expert sentence coding from Benoit et al. (2016). | The strongest models achieve agreement comparable to crowd coding, including within parties; the fine-tuned BERT baseline does not improve on them (Section 3.3). |
| European Parliament speeches | 36 speeches delivered in 10 languages; benchmark averages six crowd estimates from official translations. | GPT-4o performs especially well; several other large models also show strong agreement. Accuracy varies with model and language (Section 3.4, Appendix H). |

### Tweet Accuracy and Coverage

Selected Table A1 results follow. Each correlation uses the subset scored by that model, so the rows are not a controlled comparison on a shared set of tweets.

| Model | Overall Pearson r | Scored tweets / 899 | Democratic tweets r | Republican tweets r |
| --- | --- | --- | --- | --- |
| GPT-4 Turbo (`gpt-4-turbo-2024-04-09`) | 0.94 | 469 | 0.72 | 0.67 |
| GPT-4o (`gpt-4o-2024-05-13`) | 0.92 | 557 | 0.68 | 0.66 |
| GPT-4 (`gpt-4-0613`) | 0.90 | 614 | 0.69 | 0.68 |
| Mixtral 8x22B | 0.90 | 548 | 0.65 | 0.64 |
| Llama 3 70B, 4-bit | 0.88 | 705 | 0.64 | 0.66 |
| Aya 23 35B | 0.83 | 644 | 0.54 | 0.71 |
| Gemma 1.1 7B | -0.06 | 772 | -0.02 | -0.02 |
| Fine-tuned BERT | 0.78 | 899 | 0.44 | 0.56 |
| Fine-tuned GloVe | 0.63 | 899 | 0.31 | 0.49 |
| TF-IDF naive Bayes | 0.66 | 899 | 0.40 | 0.47 |

Table 2 reports Spearman-Brown-corrected split-half reliability of 0.92 overall, 0.80 for Democratic tweets, and 0.87 for Republican tweets. Table A1 generally associates model abstention with fewer numeric human ratings, consistent with less politically informative content. Its Llama 2 13B row is an exception to the prose's claim that this pattern holds for every LLM.

### Aggregation and Other Checks

- **Whole-document prompting:** Appendix G.2 reports similar overall economic-policy correlations, weaker overall social-policy correlations, and weaker within-party correlations than sentence-level averaging. GPT-4 Turbo fails to score two manifestos on social policy. The authors conjecture that matching the human coding unit helps agreement; they do not establish this mechanism causally.
- **Senator aggregation:** Submitting all 100 tweets in one prompt produces no significant performance degradation according to the discussion and Appendix F.2. The manuscript therefore offers no universal recommendation about splitting long inputs.
- **Prompt definitions and language:** Adding policy definitions gives similar manifesto results. Translation checks show that strong multilingual performance can coexist with language-dependent errors (Appendices G.1 and H.2).
- **Party typicality:** Subtracting Democratic typicality from Republican typicality produces scores for every tweet, similar overall correlations, and some within-party gains. It measures relative party association without explicitly restricting judgment to an ideological dimension (Appendix E.2).
- **Human-rating equivalents:** Appendix E.3 uses 598 tweets with at least 15 numeric human ratings and 100 random criterion/predictor selections. Table A2 gives pooled equivalent numbers of observations of 7 for GPT-4o and 5 for GPT-4, Mixtral 8x22B, and quantized Llama 3 70B. These quantify prediction of another human rating on each model's scored subset, not a general replacement rate for experts.

## Limitations

- Scores require validation for the particular model, dimension, language, and corpus. Poor results for some models rule out assuming that any instruction-tuned LLM provides valid measurements.
- Abstention changes both coverage and the evaluated population. High pooled correlation can coexist with materially lower within-party agreement and does not establish absolute calibration or uncertainty coverage.
- Text-derived actor positions are limited by sampled communication. They need not match roll-call behavior, donations, or expert surveys that use different information.
- Tweets selected to fall after GPT-4's reported training cutoff do not establish absence from every compared model's training data. Other evaluation corpora may have appeared in pretraining.
- Language-dependent measurement error may bias downstream comparisons. One European debate and British and US cases do not establish broad cross-cultural validity.
- Downloadable weights support reproducibility, but model versions, prompts, aggregation, and execution settings still need preservation; low temperature alone does not guarantee identical outputs.
- The supplied source has unresolved reporting inconsistencies: Figure 2 and Appendix F report 98 senators, while Appendix A.2 says 97. Section 2.2.3 defines the manifesto benchmark as expert sentence coding, whereas captions A12-A13 call it expert survey placement. This page follows Section 2.2.3 for the main experiment and retains the ambiguity for the whole-manifesto comparison.

This page summarizes the manuscript dated September 6, 2024. The supplied Markdown provides no DOI or arXiv identifier for this paper. Exact values above come from its textual tables; graph-only estimates are summarized qualitatively.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- Human judgment benchmarking
- Differential measurement error
- Equivalent number of observations

## Related Papers

- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: the library holds a closely related May 14, 2024 manuscript by the same authors. Its chunk aggregation, benchmark descriptions, and numeric results differ; the two source summaries are kept distinct.
- Le Mens et al. (2023), "Uncovering the semantics of concepts using GPT-4": cited predecessor for direct judgments of conceptual typicality.
- Benoit et al. (2016), "Crowd-sourced text analysis: Reproducible and agile production of political data": cited source of the manifesto and speech benchmarks.
- Wu et al. (2023), "Large language models can be used to estimate the latent positions of politicians": cited comparison using pairwise judgments about named politicians.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a library comparison on validating text-derived positions and uncertainty against human judgments; not a citation in this manuscript.

[[index|Library home]]
