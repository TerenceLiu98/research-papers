---
title: "POW: Political Overton Windows of Large Language Models"
type: paper
authors:
  - Leif Azzopardi
  - Yashar Moshfeghi
year: null
source_job_id: "4519b893-2102-4d88-a8e1-1d01ae197245"
tags:
  - political-ideology
  - llm-evaluation
  - political-bias
  - overton-window
---

## TL;DR

This paper replaces a single political score for an LLM with an estimated [[concepts/llm-overton-windows|LLM Overton Window]]: the region of Political Compass positions it expresses when prompted through eight ideological personas. Across the 27 models listed in the results table, default responses are usually economically left and socially libertarian, while estimated window areas range from 0.3% to 67.5%. The windows vary substantially by model and provider, but they remain conditional on one questionnaire, indirect essay prompts, deterministic decoding, persona fidelity, and an automated assessor.

## Research Question

What range of political positions will different LLMs express under ideologically varied role prompts, and how does that range differ from each model's default position?

## Motivation

Political audits often reduce a model to one point on an ideological scale. That summary can conceal whether the model can articulate positions elsewhere in the space, which directions elicit refusals or weak role adherence, and whether models with similar defaults have different expressive boundaries. The authors adapt the political-theory notion of an Overton Window to separate default output from elicited range.

## Contributions

- Reframes LLM political auditing from point estimation to the location, shape, and area of an elicited ideological region.
- Applies PRISM, an indirect essay-based elicitation method, to 62 Political Compass propositions under a default prompt and eight extreme ideological personas.
- Compares models from eight providers and reports provider- and version-specific differences in both default position and expressive coverage.
- Uses human annotation of 248 essays to evaluate the automated response assessor, reporting 90.3% binary agreement and Cohen's kappa of 0.807.

## Method

The survey instrument is the 62-item Political Compass Test, with economic left-right and social authoritarian-libertarian axes. Rather than requesting a Likert response directly, PRISM asks a model to write a short essay about each proposition. GPT-3.5 Turbo then classifies the essay as strongly agree, agree, neutral, disagree, strongly disagree, or refusal. The resulting item responses are converted into Political Compass coordinates.

Each audited model answers once by default and under eight personas distributed around the two axes, including combinations such as economic-left authoritarian and economic-right authoritarian. The persona-conditioned coordinates define the points used to construct a model's window; its area is reported as a percentage of the total possible Political Compass space. All generation uses temperature 0.0. The study reports more than 17,000 essays and evaluates open models locally through Ollama while querying proprietary APIs.

The results table contains 27 models from Alibaba, Anthropic, Cohere, DeepSeek, Google, Meta, Mistral AI, and OpenAI. The surrounding text inconsistently describes the audit as containing both 27 and 28 models.

## Experiments

Most default coordinates fall in the economically left and socially libertarian quadrant. Gemini 1.0 Pro is the most left-libertarian default in the table at (-6.6, -6.9), followed by GPT-5-mini at (-6.2, -6.3). Command is the most economically right default, although it remains near the center at (1.4, 1.1).

Window area varies from 0.3% for Claude 2.1 to 67.5% for Gemini 2.0 Flash, and seven of the 27 tabulated models exceed 50%. The authors report that coverage is uneven across quadrants: models more readily express economically left and socially libertarian positions, while authoritarian and economically right/socially libertarian regions are less often reached.

Model families also differ internally. The reported Llama window grows from 1.7% for Llama 2 to 50.6% for Llama 4. OpenAI models range from 23.6% for GPT-3.5 Turbo to 62.5% for GPT-5-mini. DeepScaler and DeepSeek-R1 have narrow windows of 0.9% and 1.3%, whereas OpenThinker reaches 53.5%. These are descriptive comparisons of the tested model versions and elicitation protocol, not estimates of provider policy or longitudinal causal effects.

## Limitations

- The source alternates between 27 and 28 audited models; its table lists 27. It also names Claude 3 Opus and Command R Plus in the method without rows for them in the table.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier, so `year` is left null and no identifier is added.
- One deterministic completion per condition does not characterize sampling variability or the uncertainty of the estimated boundary. Prompt wording and demographic framing may also change responses.
- Persona-conditioned output measures task behavior, not internal belief or endorsement. Failure to reach a requested position can combine refusal, alignment constraints, imperfect role fidelity, and limitations of the Political Compass representation.
- The Political Compass fixes a two-dimensional ideological space and 62 propositions. Window area does not measure argument quality, identify which propositions create a boundary, or show how conclusions transfer across countries, languages, demographic roles, or other political scales.
- GPT-3.5 Turbo supplies the response labels. The reported human comparison supports the assessor under the tested coding scheme but does not eliminate model-specific or position-specific judgment error.
- Apparent changes across model generations are cross-sectional comparisons. They do not isolate training data, fine-tuning, alignment, provider policy, or time as causes.

## Related Concepts

- [[concepts/llm-overton-windows|LLM Overton Windows]]: distinguishes a model's elicited expressive region from its default point.
- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: emphasizes that political measurements are conditional on prompts, roles, and response handling.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the chosen two-axis representation constrains the positions and boundaries that can be observed.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: the study relies on an automated model to classify free-text essays into response categories.

## Related Papers

- Azzopardi and Moshfeghi (2024), "PRISM: A methodology for auditing biases in large language models": the indirect elicitation method used in this study.
- Wright et al. (2024), "LLM tropes: Revealing fine-grained values and opinions in large language models": motivates demographic and role-based prompt variation.
- Rottger et al. (2024), "Political Compass or Spinning Arrow? Towards More Meaningful Evaluations for Values and Opinions in Large Language Models": cited evidence that political measurements are sensitive to prompt form.
- Rozado (2024), "The political preferences of LLMs": a cited direct-questionnaire audit used as a methodological contrast.
- [[papers/large-language-models-reflect-the-ideology-of-their-creators|Large language models reflect the ideology of their creators]]: related Wiki study using open-ended descriptions and multilingual comparisons rather than persona-conditioned Political Compass windows.
- [[papers/the-political-ideology-of-large-language-models-measurement-inconsistency-and-persuasive-influence|The Political Ideology of Large Language Models: Measurement, Inconsistency, and Persuasive Influence]]: related Wiki study separating role-conditioned positions from effects on users.

[[index|Library home]]
