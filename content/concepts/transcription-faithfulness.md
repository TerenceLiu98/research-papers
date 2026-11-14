---
title: "Transcription Faithfulness"
type: concept
aliases:
  - OCR Faithfulness
tags:
  - optical-character-recognition
  - document-understanding
  - faithfulness
---

## Overview

Transcription faithfulness is fidelity to the text actually visible in a source, including misspellings and unusual character sequences. A transcription can be fluent and semantically plausible while failing this requirement by silently correcting the source.

## Key Ideas

- Evaluate against the displayed text, including deliberate perturbations, rather than against an imagined corrected version.
- Separate exact transcription from semantic recovery. Language priors can help interpret a document while changing an identifier or quotation.
- Compare clean and perturbed inputs at matched character-level intensity. Word-level perturbation rates can produce unequal corruption across scripts.
- Distinguish rewriting to the original word, ordinary recognition errors, and unrelated substitutions. Document WER alone cannot isolate these behaviors.
- Measure errors in untouched text as well as perturbed regions: local corruption can affect surrounding output.
- Report complete processing failures alongside conditional transcription accuracy. Strong performance on retained documents does not imply reliable end-to-end coverage.
- FaithC4's single-model probes associate rewriting with similarity to clean-input representations. Increased visual attention alone does not guarantee literal output, and the association is not causal proof.

## Important Papers

- [[papers/do-vlms-read-or-rewrite-on-transcription-faithfulness-in-vision-language-models|Do VLMs Read or Rewrite? On Transcription Faithfulness in Vision-Language Models]] introduces FaithC4 and contrasts clean OCR accuracy with fidelity under legible perturbations.

## Related Concepts

- [[concepts/key-information-extraction|Key Information Extraction]]: extraction of exact identifiers depends on preserving their source characters.
