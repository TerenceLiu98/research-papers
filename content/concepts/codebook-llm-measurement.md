---
title: Codebook-LLM Measurement
type: concept
aliases:
  - Codebook-Based LLM Measurement
  - LLM Codebook Classification
tags:
  - large-language-models
  - text-as-data
  - measurement-validity
  - codebooks
  - political-methodology
---

## Overview

Codebook-LLM measurement uses a language model to assign structured labels to text according to a project-specific codebook. Its target is not the model's generic understanding of a label such as *protest*, but the systematized construct defined by the codebook's inclusion rules, exclusions, precedence conventions, and examples. Valid use therefore requires evidence that a particular model follows a particular codebook under the intended data conditions.

## Key Ideas

- **Operationalization comes first.** A codebook translates a broad background concept into a measurable construct. LLM automation does not remove the need to define category boundaries and ambiguous cases.
- **Structure codebooks for people and models.** A useful semi-structured category includes an exact output label, a concise definition, clarifications, negative clarifications, and optional positive and negative examples.
- **Test behavior before trusting accuracy.** Label-free checks can measure legal-label compliance, retrieval of definitions and examples, and invariance to category order. Labeled tests can modify exclusion criteria or replace and swap label names to reveal whether the model follows definitions or relies on pretrained label semantics.
- **Separate compliance from validity.** Producing a permitted label is weaker than applying the intended operationalization. Lexical shortcuts, category-order effects, and plausible explanations can coexist with systematically invalid measurements.
- **Use staged evidence.** After basic behavioral checks, evaluate on hand-coded data, inspect errors and codebook ablations, and use supervised adaptation when zero-shot performance is inadequate. Later-stage failures may require revising the codebook or returning to earlier stages.
- **Treat adaptation as codebook-specific until transfer is shown.** Instruction tuning can improve in-domain classification while failing on unseen codebooks. Better fitted labels do not by themselves demonstrate a general ability to follow arbitrary operational definitions.
- **Protect downstream inference.** Model-generated labels are noisy measurements. Even strong classification accuracy does not guarantee unbiased regression, causal, or descriptive conclusions when those labels are used as variables in later analyses.

## Important Papers

- [[papers/codebook-llms-evaluating-llms-as-measurement-tools-for-political-science-concepts|Codebook LLMs: Evaluating LLMs as Measurement Tools for Political Science Concepts]]: introduces a five-stage evaluation framework, seven behavioral tests, three political-science codebook datasets, and zero-shot and instruction-tuning baselines.
- Adcock and Collier (2001), "Measurement Validity: A Shared Standard for Qualitative and Quantitative Research": distinguishes broad concepts from systematized concepts and operational indicators.
- Ribeiro et al. (2020), "Beyond Accuracy: Behavioral Testing of NLP Models with CheckList": develops capability-oriented behavioral testing for NLP systems.
- Egami et al. (2023), "Using Imperfect Surrogates for Downstream Inference": shows why accurate automated labels can still create bias and coverage problems in downstream social-science inference.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: extends the measurement perspective to continuous constructs and compares pointwise, pairwise, and fine-tuned approaches.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]]
- [[concepts/instruction-tuning-data-diversity|Instruction-Tuning Data Diversity]]
- Measurement validity
- Behavioral testing
- Text classification
- Parameter-efficient fine-tuning
