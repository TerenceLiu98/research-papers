---
title: "Stance detection: a practical guide to classifying political beliefs in text"
type: paper
authors:
  - Michael Burnham
year: 2024
doi: 10.1017/psrm.2024.35
tags:
  - stance-detection
  - political-methodology
  - natural-language-inference
---

## TL;DR

Stance detection identifies the position a document expresses toward a proposition, rather than its emotional tone. Burnham compares supervised classification, natural language inference (NLI), and in-context classification, emphasizing the contextual knowledge each requires. In a replication using 862,923 COVID-19 tweets, zero-shot NLI labels reproduce the substantive regression findings obtained with a supervised classifier.

## Research Question

How should researchers define and measure political stance, and choose a classification approach given document context, annotation labor, computation, and reproducibility requirements?

## Motivation

Positive sentiment can express opposition to a political actor, and support can be expressed without emotional language. Even target-specific sentiment therefore cannot automatically substitute for stance. Classification also depends on contextual knowledge: a reference to a politician's opponent may be interpretable only to coders who know the relevant political events.

## Contributions

- Defines stance as an individual's response to a proposition and stance detection as context-dependent inference about what a text expresses.
- Organizes three classification paradigms around control over model knowledge and resource requirements.
- Demonstrates effects of domain adaptation, missing context, hypothesis wording, and generative prompting choices.
- Replicates a substantive political analysis with zero-shot NLI and synonymous hypothesis sets.

## Method

Researchers first specify the proposition, relevance criteria, and support/opposition labels. Document selection and segmentation determine which contextual information remains available. The paper favors minimally processed language-model inputs and simple sentence segmentation when longer documents contain multiple positions.

Supervised classifiers encode project-specific knowledge through annotated training examples; domain-adapted language models are compared with bag-of-words baselines. NLI pairs documents with natural-language hypotheses and assigns labels from entailment scores. Thresholding a single hypothesis and selecting the highest-scoring hypothesis among several alternatives can yield different decisions. In-context classification supplies task instructions and additional context through prompts, with optional examples or restricted label outputs.

Validation requires human-labeled evaluation data and sensitivity checks across synonymous prompts or hypotheses. Independent models can provide an additional comparison, but agreement does not replace validation against the intended construct.

## Experiments

The contextual illustration combines 1,135 tweets and 1,000 sentences mentioning Trump from congressional newsletters. Human coding discrepancies were adjudicated by a third annotator. Documents explicitly mentioning Trump had 19% coder disagreement, compared with 34% among documents without that mention; NLI suffered the largest performance decline under missing context. Matthews correlation coefficient (MCC) is the primary performance measure.

| Reported comparison | Result |
|---|---|
| Supervised tweet classification, Table 3 | RoBERTa MCC 0.60; BERTweet 0.63; PoliBERTweet 0.68; logistic regression 0.51 |
| NLI model size, Table 4 | DeBERTaV3 Small/Base/Large MCC 0.15/0.40/0.65 |
| Nine synonymous support hypotheses | Mean MCC 0.64; range 0.62–0.66 |
| GPT-4 prompting, Table 5 | Standard MCC 0.78; chain of thought 0.78; logit bias 0.80 |

Chain-of-thought prompting did not improve GPT-4 MCC and increased reported cost from $12.52 to $38.62. It reduced Mistral 7B performance and substantially increased runtime. These are historical experimental costs and model comparisons.

The COVID-19 replication covers 23,476 users and tweets dated September 1, 2020–February 28, 2021. Keywords pair tweets with relevant compliant, non-compliant, and neutral hypotheses; entailment of any threat-minimizing hypothesis yields a threat-minimizing label. Two synonymous hypothesis sets are evaluated on 300 randomly selected human-labeled tweets.

| Classifier | MCC | Accuracy |
|---|---:|---:|
| Original supervised classifier | 0.66 | 86% |
| NLI hypothesis set 1 | 0.67 | 87% |
| NLI hypothesis set 2 | 0.74 | 90% |

Negative binomial regressions model users' counts of threat-minimizing tweets using ideology, county COVID-19 death rates, their interaction, controls, and state fixed effects. Both NLI label sets preserve the direction and approximate magnitude of the original findings: ideology's association with threat minimization weakens as local deaths increase.

## Limitations

Missing contextual knowledge can undermine both human annotations and model predictions. The paper provides no empirical cutoff for deciding when context is sufficient. NLI sensitivity to hypothesis wording requires validation, and classifier disagreements in the replication are more concentrated among relatively conservative authors. Substantive replication does not establish identical labels or universal zero-shot performance. Proprietary model versioning and computation constrain reproducibility and scale in the evaluated in-context approaches. The supplied Markdown references supplementary hypotheses and implementation details that are not included; numerical values should not be inferred from the figures. Stance intensity remains a future research direction.

## Related Concepts

- [[concepts/stance-detection|Stance Detection]]: the measurement target is an expressed response to a proposition, distinct from affect or inferred latent political preferences.
- [[concepts/natural-language-inference|Natural Language Inference]]: expresses candidate stance labels as hypotheses and tests document entailment.

## Related Papers

- [[papers/sentiment-is-not-stance-target-aware-opinion-classification-for-political-text-analysis|Sentiment is Not Stance]]: motivates separating political positions from sentiment; Burnham further distinguishes stance from targeted sentiment.
- [[papers/less-annotating-more-classifying|Less Annotating, More Classifying]]: provides evidence for NLI transfer and reduced annotation requirements discussed in the guide.
- Block et al. (2022), *Perceived risk, political polarization, and the willingness to follow COVID-19 mitigation guidelines*: the supervised-label study replicated here.

[Paper and supplementary material](https://doi.org/10.1017/psrm.2024.35). [Replication materials](https://doi.org/10.7910/DVN/XS0ULP).
