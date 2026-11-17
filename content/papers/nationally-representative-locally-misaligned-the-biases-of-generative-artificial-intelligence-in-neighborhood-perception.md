---
title: "Nationally Representative, Locally Misaligned: The Biases of Generative Artificial Intelligence in Neighborhood Perception"
type: paper
authors:
  - Paige Bollen
  - Joe Higton
  - Melissa Sands
year: 2025
doi: "10.1017/pan.2025.10022"
tags:
  - computational-social-science
  - multimodal-models
  - population-representativeness
  - neighborhood-perception
---

## TL;DR

Multimodal models' ratings of Detroit street views correlate much more closely with national respondents than with Detroit residents. Strong across-image correlations also conceal substantial errors in individual-image mean ratings. Demographic or local persona prompts generally do not resolve these discrepancies.

## Research Question

Whose subjective perceptions do generative models approximate when judging neighborhood wealth, safety, and disorder: national survey respondents or the residents of the city depicted?

## Motivation

Subjective neighborhood perceptions can shape behavior independently of objective conditions. Automating their measurement therefore requires specifying the relevant population of raters; agreement with national judgments does not establish validity for local communities.

## Contributions

- Compares model evaluations of identical images with nationally and locally representative human survey samples.
- Separates across-image correlation from agreement in mean ratings for individual images.
- Examines geographic and gender differences and tests whether identity-conditioned prompts improve alignment.

## Method

The study randomly samples 85 Mapillary street-view images from Detroit. A national Prolific sample contains 800 respondents, each evaluating three images; the Detroit Metro Area Communities Study sample contains 2,430 residents, each evaluating one image. Questions concern wealth, daytime safety, nighttime safety, and disorder.

The authors evaluate GPT-4o, GPT-4.1, Gemini 1.5 Pro, Gemini 2.5 Pro, and Llama 4, querying each question-image pair 30 times. Main-text results emphasize GPT-4o, the best-performing model. Evaluation uses correlations between image-level mean ratings and per-image two-sample t-tests at p < 0.05. Additional prompts ask models to adopt local or gender identities.

## Experiments

Reported GPT-4o results (Section 2):

| Attribute | Correlation with national sample | Correlation with Detroit sample |
| --- | --- | --- |
| Wealth | 0.83 | 0.73 |
| Safety | 0.80–0.83 for safety/disorder collectively | 0.58–0.60 |
| Disorder | 0.80–0.83 for safety/disorder collectively | 0.16 |

The source gives a shared national correlation range for safety and disorder, rather than distinct values in its prose.

- **Absolute agreement:** GPT-4o significantly underestimates wealth relative to national respondents in 67% of images and Detroit residents in 38%. A Detroit persona increases the latter to 55%.
- **Disorder:** Significant mean differences occur in 49% of images against the national sample and 67% against Detroit residents; the Detroit prompt yields 64%.
- **Safety:** GPT-4o overestimates Detroit nighttime safety in 52% of images. Local prompting reduces that share to 16%, but increases underestimation of daytime safety from 11% to 38%. Prompt effects thus depend on the outcome.
- **Subgroups:** Within Detroit, GPT-4o aligns more closely with women than men, especially on safety. Identity tailoring generally does little to improve correlations.
- **Other models:** The authors report similar geographic and gender patterns for Gemini and Llama, usually with weaker correlations. Supplementary analyses reportedly find worse performance for GPT-4.1 than GPT-4o.

## Limitations

The evidence concerns 85 images from one city and a snapshot of model versions; it does not establish performance across cities or future models. Gender analyses have smaller human samples and emphasize correlations. Per-image significance tests characterize detectable differences, not equivalence when a test is nonsignificant.

The parsed main text reports 61,200 model ratings and 3,230 human-generated ratings, but these totals are not transparently reconciled with its image assignments and repeated-query design. The design counts above are retained separately rather than treating the totals as directly comparable observation counts. Supplementary materials are referenced but were not supplied here.

Training-data scarcity is a proposed explanation for subgroup misalignment, not an experimentally identified mechanism. The discussion reports supplementary racial comparisons indicating that Detroit's racial composition alone does not explain the geographic pattern.

## Related Concepts

- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: validates synthetic judgments against the intended population and distinguishes relative association from absolute agreement.

## Related Papers

- Argyle et al. (2023), “Out of One, Many: Using Language Models to Simulate Human Samples”: cited as demographic-profile-based synthetic sampling, whose transfer to local visual judgments this study questions.
- Hwang and Naik (2023), “Systematic Social Observation at Scale: Using Crowdsourcing and Computer Vision to Measure Visible Neighborhood Conditions”: cited context for scalable neighborhood measurement.

## Resources

- [Replication data](https://doi.org/10.7910/DVN/7RN8QO)
- [Model-query code](https://github.com/joehigton/GenAILocalBias)
