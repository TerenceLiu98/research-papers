---
title: "Beyond the Conventional Pipeline: Large Language Models for Social Science Measurement"
type: paper
authors:
  - Le Bao
year: 2026
tags:
  - large-language-models
  - measurement-validity
  - political-methodology
  - text-as-data
---

## TL;DR

Bao treats an LLM deployment as a candidate measurement instrument whose validity must be established for a particular construct and use. The paper organizes applications into five levels of pipeline integration and identifies seven assessment areas. Greater integration can retain contextual information lost by discrete coding, but does not inherently produce better measures and can sacrifice transparent scaling and uncertainty models.

## Research Question

When does an LLM output constitute a defensible social-science measure, and how should evaluation change as the model takes over operationalization, observation, scaling, or construct discovery?

## Motivation

Conventional pipelines separate conceptualization, operationalization, observation, and scoring, with validation spanning these stages. Replacing a human coder automates one stage while leaving information compression and error propagation intact. Agreement with human labels can conceal reliance on pretrained label associations instead of the researcher's definition. The relevant instrument includes the model, prompts, decoding settings, sampling, and aggregation rules.

## Contributions

- Reframes coding, rating, and scaling applications through measurement theory rather than NLP task labels.
- Proposes a taxonomy of increasing integration, explicitly distinguishing integration from quality.
- Develops assessment considerations covering operationalization, compliance, psychometrics, invariance, reference standards, validity, and downstream robustness.
- Specifies reporting elements needed to reconstruct and scrutinize an instrument (Section 4.8, Table 2).

## Method

This is a conceptual synthesis of measurement theory and existing LLM studies. A running example of party climate-policy positions illustrates the taxonomy (Section 3).

| Level | Design | Main assessment concern |
| --- | --- | --- |
| 0: Naive prompting | Request labels or ratings without explicit operationalization or validation | Uncontrolled reliance on background concepts |
| 1: Codebook-guided classification | Apply definitions and coding rules; retain external aggregation | Empirical compliance with the codebook |
| 2: LLM-augmented multi-stage measurement | Generate or adapt multiple operationalizations and evaluate their ratings psychometrically | Dimensionality and common-method variance |
| 3: Integrated measurement | Produce holistic trait ratings or comparative judgments | Opaque scaling, scale behavior, and uncertainty |
| 4: Generative measurement | Propose dimensions and score texts on emergent constructs | Stability and theoretical interpretation of discovered dimensions |

Level 0 is not synonymous with zero-shot inference: a zero-shot instrument can have explicit definitions and rigorous tests. Level 4 is presented as speculative. The Level 3 discussion also includes pairwise judgments aggregated with an external comparison model, so its examples do not uniformly eliminate statistical scaling.

Section 4 sets out seven assessment areas rather than a mandatory sequence:

1. **Operationalization:** define boundaries, admissible evidence, anchors, and prompt variants; version the complete instrument.
2. **Behavioral compliance:** test whether definitions govern outputs, including category-order changes, label substitutions, and irrelevant input perturbations.
3. **Psychometric properties:** assess dimensionality, repeatability, cross-model agreement, and use of the response scale. Shared model biases can inflate internal consistency.
4. **Invariance:** test comparability across languages, periods, groups, and domains. Multi-indicator designs can assess configural, metric, and scalar invariance.
5. **Reference standards:** treat expert ratings and existing indices as fallible measurements; inspect disagreement rather than equating benchmark agreement with truth.
6. **Validity beyond agreement:** seek convergent, discriminant, and predictive evidence. Discovered constructs additionally require validation across corpora and models.
7. **Stability and inference:** vary prompts, models, versions, and inputs, then examine whether substantive conclusions survive. Instrument diagnostics and downstream error correction address different questions.

Repeated decoding captures stochastic output variation, not automatically classical measurement error. Model ensembles do not provide independent coders merely by containing different models. Formal latent-variable error models require their own assumptions. Reporting should disclose prompts, model versions and access dates, decoding settings, repetition schedules, aggregation, and any fine-tuning or deliberation protocol.

## Experiments

The paper reports no original benchmark experiment or new quantitative comparison of the five levels. Climate-manifesto examples are illustrative designs. Evidence is drawn from prior work on codebook compliance, scalar scoring, psychometric prompt variants, model drift, and downstream inference. These studies motivate the framework; they do not establish that integrated measurement outperforms modular pipelines.

## Limitations

- The framework maps assessment concerns but does not supply a validated end-to-end toolkit or a general error model for integrated measurement.
- Whether richer contextual judgments compensate for lost statistical transparency remains open. Established modular designs can remain preferable.
- Discovered dimensions require theoretical grounding; stability alone does not establish a meaningful social construct.
- Pretraining priors, correlated errors, model updates, and non-classical measurement error can undermine both comparability and downstream inference.
- The supplied Markdown identifies the author and 2026 acceptance date but provides no unambiguous identifier for this article; no DOI is inferred from its references.

## Related Concepts

- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]]: the Level 1 case, where compliance with project-specific definitions must be tested.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: direct ratings illustrate the opportunities and validation demands of integrated measurement.

## Related Papers

- [[papers/codebook-llms-evaluating-llms-as-measurement-tools-for-political-science-concepts|Codebook LLMs: Evaluating LLMs as Measurement Tools for Political Science Concepts]]: supplies behavioral evidence that label associations can override operational definitions.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: supplies evidence on scalar response behavior and design choices beyond categorical coding.
- Adcock and Collier (2001), “Measurement Validity”: grounds the distinction between background concepts, systematized concepts, and indicators.
- Messick (1995), “Validity of Psychological Assessment”: grounds validity arguments about score interpretations and uses.
