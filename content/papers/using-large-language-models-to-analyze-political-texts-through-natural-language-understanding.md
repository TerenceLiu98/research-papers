---
title: "Using Large Language Models to Analyze Political Texts Through Natural Language Understanding"
type: paper
authors:
  - Kenneth Benoit
  - Scott De Marchi
  - Conor Laver
  - Michael Laver
  - Jinshuai Ma
year: 2025
doi: 10.1111/ajps.70050
tags:
  - large-language-models
  - political-text-analysis
  - text-scaling
  - measurement-validity
  - reproducibility
---

## TL;DR

An ensemble pipeline first generates issue-specific English summaries of native-language political documents and then places those summaries on substantively anchored policy scales. Across 235 party manifestos in 21 languages, its estimates correlate at roughly .87-.92 with expert-survey means on most of six policy dimensions, near the authors' estimated expert-expert ceiling, but perform substantially worse on decentralization. Repeated proprietary-model runs and a separate open-weight ensemble largely reproduce the results. On 23 coalition agreements, 64% of LLM-estimated positions fall within the range of member parties, compared with 38% for estimates derived from hand-coded labels, though this test rests on a theoretical prediction rather than observed ground truth.

## Research Question

Can LLMs provide a scalable, reliable, reproducible, and substantively valid way to infer issue positions from multilingual political texts while retaining more of the texts' meaning than statistical text-as-data methods?

## Motivation

Human experts can interpret political language in context, but expert coding is costly and difficult to replicate at scale. Conventional [[concepts/text-scaling-models|Text Scaling Models]] scale efficiently but often infer positions from counts or representations that abstract away meaning and intensity. The paper asks whether an ensemble of LLMs can combine interpretive reading with scalable data production, while making the intermediate evidence inspectable.

## Contributions

- Introduces an issue-specific [[concepts/llm-summary-and-scaling|LLM Summary-and-Scaling]] workflow that produces reviewable document summaries before numerical measurement.
- Evaluates a crossed ensemble in which three proprietary models each summarize and score outputs from all three models under zero- and few-shot prompts.
- Benchmarks LLM estimates against expert-survey means, Manifesto Project label-based scales, estimated expert-expert agreement, repeated runs, and an independent open-weight ensemble.
- Treats abstention as informative measurement output and documents model-specific differences in missing scores.
- Tests predictive validity on coalition agreements using the expectation that coalition policy lies within the range of member-party positions.

## Method

The corpus contains 235 party manifestos written in 21 languages and 23 coalition agreements that overlap with available member-party data. The six dimensions are economic policy, social policy, immigration, European integration, environmental policy, and decentralization.

For each manifesto and dimension, Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro each generate a 300-400 word English summary from the complete native-language document. Each model then scores every model's summary on a fully anchored 1-7 scale or returns `NA` when evidence is insufficient. This 3 x 3 design yields nine scores per manifesto-dimension per prompting condition. Combining zero-shot and three-example few-shot runs produces an ensemble mean of up to 18 estimates.

The baseline run generated 4,230 summaries and 25,380 possible scores across both prompting conditions. Models were run at temperature zero, top-p 1.0, and with a fixed seed where available. The authors compare the ensemble with country-expert means and manifesto scores built from Manifesto Project labels. A simulation that repeatedly splits experts into two groups supplies a practical ceiling for expected agreement: mean expert-expert correlations range from .78 for decentralization to .95 for European integration.

## Experiments

### Substantive validity

For five of six dimensions, correlations between the LLM ensemble and expert-survey means are generally high; the paper reports values often between .87 and .92. Zero-shot and few-shot results are essentially the same. For economic, social, immigration, and EU policy, the LLM and expert score distributions also align more closely than Manifesto Project-derived distributions.

Decentralization is the central negative result. Experts use the full scale, whereas almost all manifestos advocate some decentralization and contain little anti-decentralization language. LLM estimates consequently show restricted variation and correlate much less strongly with experts. Environmental policy shows a milder version of this divergence. Agreement with Manifesto Project content suggests that these discrepancies may reflect what parties choose to state in manifestos rather than a simple model error, but the unobserved true party positions do not permit that interpretation to be settled.

### Missingness and reliability

The proportion of missing scores differs by summarizer and issue. Across all issues it is .21 for Claude, .09 for GPT-4o, and .16 for Gemini; issue-level overall missingness ranges from .06 for environment to .31 for immigration. The paper attributes part of GPT-4o's greater coverage to its willingness to infer an issue position from broader ideological language, creating a precision-coverage design choice rather than an unqualified advantage.

Intra-model ICC is .90-.95 on the first four dimensions, .80 for environment, and .66 for decentralization. Inter-model ICC follows the same pattern: .91-.97 on the first four dimensions, .76 for environment, and .69 for decentralization. Overall intra-model ICC is .91.

### Reproduction, replication, and leakage checks

A second proprietary-model run after three months correlates .96-.98 with the original on four dimensions, .92 on environment, and .69 on decentralization. An ensemble of LLaMA-3.3, DeepSeek-V3, and Gemma-3 correlates .92-.96 with the proprietary ensemble on five dimensions and .78 on decentralization. The open-weight models retain the same relative weakness on decentralization and correlate only slightly less strongly with expert benchmarks on most other dimensions.

Removing party names and abbreviations from identifiable summaries changes GPT-4o zero-shot scores very little: anonymized and original estimates correlate .99. Together with the uniquely poor decentralization result and the use of study-generated summaries, this weighs against simple retrieval of memorized expert scores, but cannot prove the absence of all training-data influence.

### Coalition predictive validity

The evaluation asks whether each coalition agreement's estimated position lies within the range of its member parties. Overall, 64% of LLM estimates satisfy this prediction versus 38% of estimates built from Klüver and Manifesto Project labels. LLM proportions are higher on five dimensions, including .78 versus .18 for environment and .76 versus .36 for economic policy; decentralization reverses the pattern at .43 versus .61. Missingness differs between methods and dimensions.

## Limitations

- Expert means are noisy surrogate benchmarks, not ground truth, and experts may use information absent from manifestos.
- The coalition test evaluates consistency with a broad spatial-model prediction; an out-of-range estimate is not necessarily substantively wrong.
- The coalition sample contains only 23 agreements, and dimension-specific comparisons have additional missing observations.
- Abstention is ambiguous: it may indicate absent policy content or failed retrieval. Ensemble means can also be supported by different numbers and mixes of model scores.
- GPT-4o's tendency to infer unstated positions improves coverage but may weaken textual fidelity. The preferred precision-coverage trade-off depends on the research purpose.
- High average agreement masks issue heterogeneity. Environment and especially decentralization are materially less reliable and less reproducible.
- The study demonstrates the workflow with particular model versions, prompts, corpora, and policy scales; it does not establish validity for arbitrary constructs or genres.
- Intermediate summaries improve auditability but remain model-generated representations that can omit or distort source content.

## Related Concepts

- [[concepts/llm-summary-and-scaling|LLM Summary-and-Scaling]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- Informative missingness
- Convergent validity
- Predictive validity
- Ensemble measurement

## Related Papers

- [[papers/positioning-political-texts-with-large-language-models-by-asking-and-averaging|Positioning Political Texts with Large Language Models by Asking and Averaging]]: directly scores smaller textual units and averages them, providing a useful contrast to issue-specific document summarization before scoring.
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: evaluates direct prompted scaling across several political-text settings.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational Measurement of Political Positions]]: situates prompted LLM measurements among word-count, topic, and embedding approaches.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: develops related logic for validating latent text measurements against human judgments.

[[index|Library home]]
