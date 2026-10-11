---
title: "Large language models reflect the ideology of their creators"
type: paper
authors:
  - Maarten Buyl
  - Alexander Rogiers
  - Sander Noels
  - Guillaume Bied
  - Iris Dominguez-Catena
  - Edith Heiter
  - Iman Johary
  - Alexandru-Cristian Mara
  - Raphaël Romero
  - Jefrey Lijffijt
  - Tijl De Bie
year: 2026
source_job_id: "a5f9243e-2151-40cd-9dac-552c7be14947"
tags:
  - political-ideology
  - llm-evaluation
  - multilingual-evaluation
  - political-measurement
---

## TL;DR

An audit of 19 LLMs describing 3,991 politically relevant people finds relative ideological differences across prompting languages, developer regions, and models within the United States and China. After validation, the analysis retains 257,417 two-stage responses from 77 model-language pairs covering 3,978 people. These patterns are consistent with developer-associated ideological differences, but the observational design does not identify the effects of creators' beliefs, training data, alignment, or moderation separately.

## Research Question

How do the political portrayals generated and assessed by LLMs vary across languages and developer regions, and what ideological differences remain within geopolitical blocs?

## Motivation

Direct political questionnaires can be sensitive to wording, forced answer options, and predefined ideological axes. The authors instead elicit ordinary descriptions of prominent people and subsequently assess their favorability. This [[concepts/biographical-ideology-profiling|Biographical Ideology Profiling]] maps relative diversity without specifying an ideologically neutral model or treating a U.S. left-right scale as universal.

## Contributions

- A two-stage description-and-assessment protocol that leaves the first response open-ended and evaluates its tone in a fresh conversation.
- A multilingual comparison using 61 ideological tags adapted from the Manifesto Project, with exploratory dimensional reduction and targeted group comparisons.
- Response validation and coverage filters, alongside public data and code for repeating the audit with other models.

## Method

### Sample and Elicitation

The 2020 Pantheon release supplies the candidate biographies. Selection requires a full name, contemporary relevance using birth/death cutoffs around 1850 and 1920, and Wikipedia summaries in all six UN languages. Occupation-specific popularity thresholds yield 3,991 people, including politicians, activists, and prominent figures from other fields. GPT-4 assigns binary ideological tags from English Wikipedia summaries using an adapted Manifesto Project taxonomy; these annotations receive spot checks but no systematic human reliability assessment.

The panel spans 19 models, queried only in officially supported languages: Modern Standard Arabic, Simplified Chinese, English, French, Russian, and Spanish. Data collection ran from November 11 to December 12, 2024, from a server in Belgium. Each model-language pair is a distinct respondent; there are 77 such pairs.

Stage 1 requests a description of a person without disclosing the ideological evaluation. Stage 2 presents that description to the same model in a new conversation and asks for the author's apparent sentiment on a five-point scale from very negative to very positive. Thus, the measurement combines generation and interpretation by the model. A common judge or fully crossed set of judges was considered but not used. Prompt development used two rounds of greedy search over template dimensions, each testing 12 templates on 200 people and selecting for low invalid-response rates.

### Validation and Analysis

GPT-4o checks whether each description broadly matches the same person's Wikipedia summary; this is an identity/refusal check, not comprehensive factual verification. GPT-3.5 extracts the Stage 2 label or marks it unknown. The authors remove 14.26% of responses at Stage 1 and 0.36% of the remainder at Stage 2. They then discard person-language prompts for which fewer than half of supporting models have valid responses; this affects 6.12% of prompts. Of 307,307 collected two-stage responses, 257,417 remain.

The five labels map to 0, 0.25, 0.5, 0.75, and 1. Respondent profiles aggregate scores by ideological tag. PCA uses profiles centered across tags and respondents; radar plots compare centered language or regional profiles. Forest plots show extreme differences between groups, retaining people represented in both groups. Person-level comparisons use two-sided Mann-Whitney tests and 95% intervals from 10,000 bootstrap resamples. Tag-level tests use Welch's two-sided t-test to compare person-level group differences for tagged versus untagged people; displayed intervals use standard errors multiplied by 1.96.

These procedures describe relative patterns. The authors explicitly do not assume that sentiment labels are calibrated across respondents, and person-level significance does not correct that calibration problem.

## Experiments

| Analysis | Reported finding |
| --- | --- |
| Exploratory PCA, Fig. 2 | The first component explains 54.7% of profile variance and is interpreted as progressive pluralism versus conservative nationalism; the second explains 11.3% and contrasts China-critical positions with a multipolar, free-market orientation. These labels interpret the observed loadings. |
| Language and region, Figs. 3-4 | English, French, and Spanish profiles are strongly correlated. Both language and developer region distinguish profiles, but their contributions are intertwined with model language coverage and design choices. |
| Chinese models in Chinese versus U.S. models in English, Fig. 5 | U.S./English respondents relatively favor Hong Kong opposition figures and Chinese human-rights activists; the opposite extreme includes USSR, North Korean, Russian, and Chinese leaders. This comparison changes model origin and language together. |
| U.S. models in English, Figs. 6 and 24 | Gemini is relatively favorable toward figures associated with progressive values, inclusivity, equity, and sustainability. Grok relatively favors national sovereignty, centralized authority, and economic self-reliance. The authors place Meta closer to Gemini, and Anthropic/OpenAI closer to Grok, within this particular comparison. |
| Chinese models in Chinese, Figs. 7 and 25 | Qwen relatively favors sustainability and disadvantaged-group tags, while Wenxiaoyan relatively favors economic strategy and centralized planning. The authors interpret this as consistent with international versus domestic market orientations, without identifying those orientations as causal mechanisms. |

Prompt development found that a preliminary description reduced invalid answers, an explicit moral-discussion stage often induced refusals, and resetting the conversation before assessment reduced refusals. These are operational improvements; they do not establish invariance of ideology estimates to all prompt choices.

## Limitations

- This is a snapshot of late-2024 model variants, not an evaluation of current products. Black-box observations cannot isolate creators' ideology from training corpora, post-training, system prompts, or moderation. The study measures neither creators' personal beliefs directly nor downstream persuasion of users.
- Favorability toward a person is an indirect proxy for ideological affinity. The same model both generates and judges the portrayal, preventing separation of these two sources of variation.
- Wikipedia coverage and selection overrepresent Western figures, particularly U.S. figures, and underrepresent Africa. English-only GPT-4 tagging can introduce annotation bias; binary categories compress nuanced or changing positions. Shared annotations do not establish their validity.
- Responses differ in scale usage across models and languages. Equidistant coding of ordinal labels is a substantive assumption; centering and emphasizing extreme contrasts do not establish measurement equivalence. Unequal language support also changes the model composition of language groups.
- Refusals and failed identity checks remove observations that may themselves be politically patterned. Results therefore describe retained responses. Validation relies on OpenAI models and is not a human gold-standard audit.
- Six languages, formal Arabic, Simplified Chinese, and one query location restrict coverage. The authors did not test location-dependent provider behavior.
- The supplied Markdown damages tag-valence symbols, translated prompts, and several equations. Equations labeled as means display unnormalized sums, so this summary follows the prose rather than reconstructing formulas. It does not infer missing tag directions. The source lists online publication as January 7, 2026, despite a 2025 copyright notice; `year` follows that publication date. No article DOI or unambiguous journal title is supplied.

## Related Concepts

- [[concepts/biographical-ideology-profiling|Biographical Ideology Profiling]]: indirect measurement through generated descriptions of political figures.
- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: related conditional-response perspective; this paper uses descriptive prompts rather than explicit voter or legislator roles.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: self-assessment of portrayals and separate validation models shape the observed scores.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: exploratory axes summarize tag profiles without prescribing one universal left-right dimension.

## Related Papers

- Röttger et al. (2024), "Political compass or spinning arrow? Towards more meaningful evaluations for values and opinions in large language models": cited motivation for naturalistic elicitation, robustness, and response validity (reference 15).
- Santurkar et al. (2023), "Whose opinions do language models reflect?": cited background on represented viewpoints (reference 10).
- Moore, Deshpande, and Yang (2024), "Are Large Language Models Consistent over Value-laden Questions?": cited parallel work on open-ended elicitation and consistency (reference 16).
- Related Wiki reading, not a claimed citation: [[papers/the-political-ideology-of-large-language-models-measurement-inconsistency-and-persuasive-influence|The Political Ideology of Large Language Models: Measurement, Inconsistency, and Persuasive Influence]] compares role-conditioned positions against human groups and separately tests persuasion.

## Resources

The paper provides [study data](https://huggingface.co/datasets/aida-ugent/llm-ideology-analysis) and [analysis code](https://github.com/aida-ugent/llm-ideology-analysis). These resources are reported from the supplied source and were not executed or independently audited.

[[index|Library home]]
