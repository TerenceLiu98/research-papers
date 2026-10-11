---
title: Lexically Grounded Instruction Tuning
type: concept
tags:
  - instruction-tuning
  - historical-language-models
  - temporal-leakage
---

## Overview

Lexically grounded instruction tuning constrains assistant training responses to vocabulary supported by a source passage, with a limited function-word allowlist. In historical language modeling, this anchors response text to documents preceding the intended cutoff and reduces reliance on freely generated modern-model answers.

## Key Ideas

- **Verify lexical support.** For passage vocabulary V(p) and allowlist A, each response word must be derivable from V(p) union A; numerals must appear in the source. Unsupported responses are rejected.
- **Permit controlled text recovery.** Limited morphological normalization, dehyphenation, and OCR repairs can reduce false rejections, provided recovered forms remain derivable from the source.
- **Generate questions around anchored answers.** The HISTORY-SELFINSTRUCT approach trains a historical model to generate instructions conditioned on grounded responses, then filters the resulting pairs for coherence.
- **Distinguish lexical from semantic grounding.** Permitted words can be recombined into unsupported claims. The constraint does not prove entailment, prevent all anachronistic framing, or remove contamination already present in the source.
- **Track modern assistance explicitly.** Modern judges and instruction generators still influence curation even when assistant responses are constrained. End-to-end temporal evaluation remains necessary.

## Important Papers

- [[Pretraining Language Models on Historical Text]] introduces the constraint for HISTORY-LIMA and HISTORY-SELFINSTRUCT and evaluates the resulting instruction-tuned TYPEWRITERLM variants. Self-Instruct improves several reported instruction-following metrics, while residual temporal leakage remains.

## Related Concepts

- [[Temporal Leakage in Language Models]]
