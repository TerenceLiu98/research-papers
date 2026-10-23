---
title: LLM Summary-and-Scaling
type: concept
aliases:
  - Summary-and-Scaling Pipeline
  - Issue-Specific Summary Scaling
tags:
  - large-language-models
  - text-scaling
  - political-text-analysis
  - measurement-validity
---

## Overview

LLM summary-and-scaling is a two-stage measurement strategy for long texts. A model first creates a compact, construct-specific summary of the source, and a model then places that summary on an anchored numerical scale. The summary is both an intermediate representation for retrieval and an auditable account of the evidence used for the score. Unlike sentence-level [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]], it preserves a document-level view while narrowing attention to one target dimension.

## Key Ideas

- **Separate retrieval from measurement.** Asking for an issue-specific summary helps retrieve dispersed evidence before requesting a position. In Benoit et al., direct scoring of long documents produces more `NA` responses than scoring summaries of those documents.
- **Make the intermediate representation inspectable.** A concise summary lets researchers audit what the model treated as relevant, including when the source is long or in a language the researcher does not read. Auditability does not guarantee fidelity, so summaries still require review.
- **Cross summarizers and scorers.** A factorial ensemble can expose each scorer to summaries from multiple models. This separates some summarization variation from scoring variation and avoids treating one model output as definitive.
- **Anchor the construct substantively.** Each scale point should have an explicit interpretation. A score is only meaningful relative to the policy dimension and endpoint definitions supplied in the prompt.
- **Preserve abstention.** `NA` can prevent unsupported scoring, but it conflates absent source evidence with failed retrieval. Missingness rates should be reported by model, construct, and stage rather than silently removed.
- **Treat coverage as a design choice.** A model that infers positions from broad ideological context may score more documents than one requiring explicit statements. Greater coverage can therefore mean weaker textual grounding.
- **Validate by dimension.** Performance can vary because documents express some dimensions asymmetrically. In the manifesto application, decentralization positions are concentrated on one side of the scale, limiting variation and weakening agreement with experts even when models agree about the text.
- **Retain the complete run specification.** Source version, summary prompt, scoring prompt, anchors, examples, model versions, inference settings, missing-data rules, and aggregation weights jointly define the measurement procedure.

## Important Papers

- [[papers/using-large-language-models-to-analyze-political-texts-through-natural-language-understanding|Using Large Language Models to Analyze Political Texts Through Natural Language Understanding]]: introduces and validates a 3 x 3 summary-and-scoring ensemble on multilingual party manifestos and coalition agreements.
- [[papers/positioning-political-texts-with-large-language-models-by-asking-and-averaging|Positioning Political Texts with Large Language Models by Asking and Averaging]]: provides a contrasting strategy that directly scores sentences or short texts before aggregation.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- Ensemble measurement
- Selective prediction
- Informative missingness
- Construct validity
- Long-context information retrieval
