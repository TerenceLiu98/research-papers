---
title: "Measuring issue salience for political parties using LLMs"
type: paper
authors:
  - Kenneth Benoit
  - Michael Laver
year: 2026
doi: "10.1080/01402382.2026.2637134"
tags:
  - political-measurement
  - issue-salience
  - large-language-models
---

## TL;DR

LLMs can estimate relative issue emphasis in multilingual party manifestos, but agreement with expert judgments is weaker than for policy positions. Constraining salience scores to sum to one performs best among the tested approaches. Similarities between LLM and human manifesto coding suggest that source differences, as well as measurement error, may explain disagreement with experts.

## Research Question

Can LLMs measure parties’ relative issue priorities from manifestos, and how do alternative elicitation strategies compare with expert surveys and human manifesto coding?

## Motivation

Spatial models of party competition and coalition formation require both policy positions and weights indicating how much parties care about each issue. Unlike independently measured positions, relative cardinal saliences depend on the chosen issue set. Manifestos also express priorities less explicitly than positions and may strategically obscure trade-offs.

## Contributions

- Distinguishes absolute issue importance from relative salience and explains why fixed-budget cardinal weights lack measurement separability.
- Compares unconstrained scoring, ranking, budgeted scoring, and pairwise comparisons on a multilingual corpus.
- Separates agreement with country experts from agreement with human coding of the same source genre.

## Method

Gemini 2.5 Pro reads complete manifestos through its API, with instructions to use only supplied text. The corpus contains 246 manifestos from 21 countries in 22 languages, restricted to election years with an expert survey. Six dimensions cover economic policy, social policy, immigration, the EU, environment, and decentralisation.

Four strategies elicit unconstrained cardinal scores, ordinal rankings, cardinal weights summing to unity, or pairwise issue preferences converted into weights with a Plackett–Luce model. Unlike issue-specific position scoring, salience assessment requires simultaneous comparison across issues. Planetary defence supplies an expected-absent control dimension.

Benchmarks comprise country-expert surveys and Manifesto Project human labels mapped to the six dimensions. Expert and manifesto-label scores are also normalized across the six issues. Complete expert salience coverage is available for only 72 manifestos.

## Experiments

Table 3 reports Fisher-z-averaged correlations across issue dimensions:

| LLM elicitation | Correlation with raw expert scores |
| --- | ---: |
| Unbudgeted cardinal | 0.43 |
| Budgeted cardinal | 0.48 |
| Rank | 0.45 |
| Pairwise / Plackett–Luce | 0.27 |

Dimension-specific sample sizes range from 143 to 205. On the 72-manifesto complete-case subset, comparing budgeted expert and budgeted LLM scores yields a Fisher-z-average of 0.63; this is a different sample and benchmark transformation, not an isolated prompt improvement.

Budgeted LLM correlations with raw expert ratings are strongest for environment (0.71) and immigration (0.70), but only 0.08 for social policy. Economic and social policy receive average budget shares of 0.32 and 0.33. Planetary defence receives zero cardinal salience and last rank, supporting textual grounding for this specific control.

Figure 2 shows similar distributions for LLM and human-coded manifesto measures, both assigning greater economic and social weight than experts. Table 4 reports an MP–LLM Fisher-z-average correlation of 0.56 on 63 cases, with immigration unavailable and social-policy correlation −0.07. Distributional similarity therefore does not imply uniform party-level agreement.

## Limitations

- Expert judgments are not observed true priorities; they may incorporate information absent from manifestos. Strategic ambiguity is an interpretation of source divergence, not an experimentally established cause.
- Missing expert dimensions sharply limit complete-budget comparisons and change the comparison sample.
- Six benchmark issues were selected for validation availability, not comprehensive coverage of every election’s issue space.
- Pairwise comparisons underperform direct budgeted scoring; strong position-measurement results do not transfer automatically to salience.
- The absent-issue control does not exclude every possible influence of model training data.
- The supplied text labels the unconstrained scale as 1–10 in tables but describes 0–10 in prose; exact prompt details are deferred to an online appendix.

## Related Concepts

- [[concepts/party-issue-salience|Party Issue Salience]]: distinguishes manifesto emphasis from underlying party priorities and motivates relative weights.
- [[concepts/llm-summary-and-scaling|LLM Summary-and-Scaling]]: the predecessor position-measurement workflow; this paper instead evaluates all salience dimensions together in complete documents.

## Related Papers

- [[papers/using-large-language-models-to-analyze-political-texts-through-natural-language-understanding|Using Large Language Models to Analyze Political Texts Through Natural Language Understanding]]: supplies the position-estimation benchmark and methodological starting point; salience proves harder to validate.
