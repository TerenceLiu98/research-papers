---
title: Direct-Query Text Scaling
type: concept
aliases:
  - LLM Text Scaling
tags:
  - text-as-data
  - large-language-models
  - political-methodology
  - latent-trait-estimation
---

## Overview

Direct-query text scaling uses an instruction-tuned language model to place a supplied text on an explicitly named dimension. A prompt defines the scale endpoints and asks for a numerical position, with an option to abstain when the relevant content is absent. In political research, this supports ideological or policy measurement from manifestos, speeches, or tweets without task-specific model training. It is a form of [[concepts/text-scaling-models|Text Scaling Models]] whose measurement specification is expressed through instructions.

## Key Ideas

- **Specify the construct.** Name the dimension, orient its endpoints, and provide contextual definitions when needed. A numerical response alone does not establish that the model measures the intended trait.
- **Separate text and actor positions.** A text score measures the supplied communication. Aggregating scores across an actor's texts introduces sampling and weighting decisions; it differs from asking a model to place a named actor from prior knowledge.
- **Treat aggregation as part of measurement.** Le Mens and Gallego combine long-document chunks with token-count weights and estimate senators' positions by averaging sampled tweet scores. These choices determine which content contributes to the resulting position.
- **Report abstention alongside agreement.** An `NA` option avoids forcing irrelevant content onto a scale, but model-specific missingness changes the sample on which accuracy is assessed. Correlations should be accompanied by scored-document counts and within-group checks.
- **Distinguish position from typicality.** Subtracting a text's typicality in two parties can provide full coverage, but its construct is relative party association. Agreement with an ideological benchmark does not make it equivalent to directly querying a specified policy dimension.
- **Validate in the intended setting.** Expert placements, human ratings, and behavioral measures can provide complementary benchmarks. Strong overall correlations do not imply calibration, equal accuracy across languages, or reliable within-party distinctions.
- **Retain the implementation context.** Prompts, model versions, inference settings, and aggregation rules are part of the measure. Downloadable weights support repeatability, while API version changes can alter it.

## Important Papers

- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: evaluates direct scoring across four political-text settings, with substantial variation in both model agreement and scoring coverage.
- Le Mens et al. (2023), "Uncovering the semantics of concepts using GPT-4": predecessor cited by the scaling paper for direct judgments of conceptual typicality.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]
- Human judgment benchmarking
- Construct validity
- Differential measurement error
- Selective prediction
