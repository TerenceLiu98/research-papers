---
title: "Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need"
type: paper
authors:
  - Gaël Le Mens
  - Aina Gallego
year: 2024
date: "2024-05-14"
tags:
  - text-as-data
  - political-methodology
  - large-language-models
  - ideological-scaling
  - human-validation
---

## TL;DR

Directly asking an instruction-tuned LLM for a political text's position on a specified scale produces strong agreement with expert, crowd, and roll-call benchmarks in four settings. On congressional tweets published after the reported training cutoff of `gpt-4-0613`, GPT-4 Turbo reaches Pearson r = 0.93 on 484 of 899 benchmark tweets; Mixtral 8x22B reaches 0.90 on 552. The cutoff claim concerns `gpt-4-0613`, not all models evaluated on these tweets. These correlations apply to different subsets because models can return `NA`. The paper supports task-specific validation of direct scoring, rather than assuming that any recent LLM measures any political dimension reliably.

## Research Question

Can instruction-tuned LLMs estimate ideological and policy positions directly from political texts without task-specific training, including short texts, multiple languages, within-party differences, and documents published after a model's training cutoff?

## Motivation

Political researchers use [[concepts/text-scaling-models|Text Scaling Models]] to recover latent positions from manifestos, speeches, and social media. Expert coding is costly, and supervised classifiers need training data while optimizing labels that may only approximate the intended dimension. [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] instead makes the dimension explicit in a natural-language request and asks for a numerical position. The paper extends earlier work on LLM judgments of conceptual typicality to policy and ideological measurement.

## Contributions

- Evaluates direct numerical scoring across British manifestos, a multilingual European Parliament debate, senators' tweet collections, and individual congressional tweets.
- Compares proprietary and downloadable models, including quantized models run locally, with supervised BERT, GloVe, and TF-IDF classifiers where applicable.
- Tests within-party variation, original-language versus translated speeches, and individual tweets published after the reported September 2021 cutoff of `gpt-4-0613`.
- Examines missing scores, an alternative based on differences in party typicality, and performance relative to averaging multiple human judgments.

## Method

Each query supplies the text and a named dimension with endpoints on a 0-100 scale. Depending on the task, these are economic left-right, social liberal-conservative, pro/anti-immigration, pro/anti-subsidy, or ideological left-right. The model is asked to focus on relevant passages and return a JSON `Score`, or `NA` if the text lacks relevant content. No labeled demonstrations or task-specific parameter updates are used. For the subsidy task, the prompt includes debate background; its scores are reverse-coded for comparison with the benchmark (Appendix C.3).

The authors set temperature to 0, cap responses at 20 tokens, and request JSON mode where available. Prompts are limited to 4,096 tokens because their tests found worse performance with longer inputs. Long documents are split and their chunk scores combined with token-count weights. Senators are positioned by averaging scores from random samples of 100 tweets; scoring aggregated tweet collections provides an alternative checked in Appendix G.2.

The main model comparison includes GPT-4 Turbo, GPT-4, GPT-3.5 Turbo, Mixtral 8x22B, quantized Mixtral 8x7B, and Llama 3 at 70B and 8B. Tweet classifiers learn party membership, from which positions are derived; the manifesto BERT baseline instead learns crowd-coded sentence positions. Thus, baseline supervision does not always target exactly the same construct as direct ideological scoring.

The economic/social manifesto BERT baseline uses a 45%/5%/50% sentence split for training, validation, and prediction, keeping all ratings of each sentence in one split. These sets contain approximately 98,000, 10,000, and 107,000 human ratings, respectively (Appendix D.1). The senator classifiers use about 220,000 tweets, with the sampled evaluation tweets excluded from training and validation; classifiers for the post-cutoff task use approximately one million congressional tweets (Sections 3.3-3.4, Appendix D.2).

## Experiments

### Settings and Benchmarks

| Setting | Data | Benchmark and reported result |
| --- | --- | --- |
| British manifestos | 18 manifestos for economic/social policy; 8 for immigration | Expert survey placements from Benoit et al. (2016). The best LLMs exceed the crowd estimates' correlations with experts; fine-tuned BERT does not improve on the best LLMs (Section 3.1, Figure 1). |
| European Parliament speeches | 36 speeches delivered in 10 languages | Average crowd placements from six official translations; benchmark Cronbach's alpha = 0.99. The strongest LLMs achieve r >= 0.89 on original-language texts, with broadly similar performance using translations (Section 3.2). |
| Senators of the 117th Congress | 100 sampled tweets per senator; main text reports 98 senators | First-dimension Nokken-Poole period-specific DW-NOMINATE scores. The best LLMs recover overall and within-party variation better than the compared classifiers. Agreement with campaign-finance CF scores is weaker within parties (Section 3.3, Appendix G). |
| Post-cutoff congressional tweets | 900 tweets rated by 597 Prolific participants; 899 receive at least one non-NA rating | Mean human left-right ratings. Participants see tweet text without author information; about 20 ratings are collected per tweet, including NA responses (Section 3.4, Appendix A.4). |

### Tweet Accuracy and Coverage

Selected rows from Table A1 are reproduced below. Correlations use each model's scored subset, so both accuracy and coverage matter; these are not comparisons on a single shared subset.

| Model | Overall Pearson r | Scored tweets / 899 | Democratic tweets r | Republican tweets r |
| --- | --- | --- | --- | --- |
| GPT-4 Turbo (`gpt-4-turbo-2024-04-09`) | 0.93 | 484 | 0.68 | 0.65 |
| GPT-4 (`gpt-4-0613`) | 0.90 | 604 | 0.69 | 0.68 |
| Mixtral 8x22B | 0.90 | 552 | 0.66 | 0.67 |
| Llama 3 70B, 4-bit | 0.88 | 729 | 0.65 | 0.71 |
| Llama 3 8B | 0.79 | 894 | 0.60 | 0.60 |
| Gemma 1.1 7B | 0.02 | 818 | -0.07 | 0.13 |
| Fine-tuned BERT | 0.79 | 899 | 0.50 | 0.54 |
| Fine-tuned GloVe | 0.70 | 899 | 0.43 | 0.41 |
| TF-IDF naive Bayes | 0.66 | 899 | 0.40 | 0.47 |

The human benchmark's split-half reliability, with Spearman-Brown correction, is 0.95 overall, 0.83 for Democratic tweets, and 0.86 for Republican tweets. High pooled correlations therefore coexist with lower within-party agreement and an imperfect human criterion.

### Additional Checks

Adding descriptions of policy dimensions yields similar manifesto results (Appendix E.2). Asking separately for Democratic and Republican typicality and subtracting the scores produces positions for every tweet, with similar overall correlations and some within-party gains. However, this alternative measures relative association with parties rather than explicitly restricting judgment to the ideological dimension (Appendix H.2).

Appendix I assesses the equivalent number of human observations needed to predict another human rating as well as a model does. It uses 598 tweets with at least 15 non-NA ratings and repeats random criterion/predictor selection 100 times. GPT-4, Mixtral 8x22B, and Llama 3 70B achieve equivalents of about five or six human ratings in the pooled analysis, subject to each model's scored subset. This is a prediction-of-human-judgment result, not a universal replacement rate for expert coding.

The authors report a historical cost of USD 1.50 for GPT-4 scoring of 900 tweets versus GBP 1,626 for crowdsourcing. These figures describe this study's configuration and annotation effort, not current prices or a complete accounting of local-compute costs.

## Limitations

- Validation covers particular texts, dimensions, countries, and model versions. Gemma's poor performance shows that recency alone is insufficient; the authors explicitly require empirical validation in each new setting.
- Returning `NA` changes the evaluated population. The highest correlations do not imply full-corpus coverage, and varying scored subsets limit direct model rankings.
- The post-cutoff design concerns `gpt-4-0613`. It does not establish that the evaluation texts were absent from every compared model's training data.
- Language-dependent measurement error may distort downstream comparisons. Successful scaling of one multilingual debate does not establish equal accuracy across languages or contexts.
- Correlation measures association, not absolute calibration or valid uncertainty intervals. Human judgments and roll-call scores are substantive benchmarks, not directly observed ground-truth ideology.
- Reproducibility depends on retaining model versions, weights, prompts, and execution details. Temperature 0 aims to reduce randomness; it is not a guarantee of identical results across infrastructures or future API versions.
- The supplied manuscript contains unresolved reporting inconsistencies: Section 2.1.2 and Figure 3 report 98 senators, while Appendix A.3 says 97. Appendix H's prose says scored tweets have more human ratings, but Table A1's final two column labels imply the opposite for most rows. Those columns are not used to establish the missingness explanation here. Table 1 and Appendix B.1 also name different GPT-4 Turbo versions; the tweet table above follows Table A1's explicit model identifier.

This page summarizes the manuscript dated May 14, 2024. No DOI or arXiv identifier for this manuscript is provided in the supplied Markdown. Data and scripts are identified in Section 5 as available through the [OSF replication project](https://osf.io/x2u5m/).

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- Human judgment benchmarking
- Differential measurement error
- Equivalent number of observations

## Related Papers

- Le Mens et al. (2023), "Uncovering the semantics of concepts using GPT-4": cited predecessor for direct queries about conceptual typicality.
- Benoit et al. (2016), "Crowd-sourced text analysis: Reproducible and agile production of political data": cited source of the manifesto and multilingual-speech benchmarks.
- Wu et al. (2023), "Large language models can be used to estimate the latent positions of politicians": cited comparison using pairwise judgments about named politicians rather than their supplied texts.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a library comparison on validating text-derived positions and uncertainty against human judgments; not a citation in this manuscript.

[[index|Library home]]
