---
title: Dominant Narrative Explanation
type: concept
aliases:
  - Narrative Label Explanation
  - Explanation-Backed Narrative Classification
tags:
  - narrative-classification
  - explainable-nlp
  - multilingual-nlp
  - news-analysis
---

## Overview

Dominant narrative explanation links a document-level narrative label to a concise, text-grounded rationale for why that label best characterizes the document. It makes the interpretive basis of narrative classification explicit: the explanation should identify the relevant entities, actions, claims, stance, and evidence without merely restating the category name. The task explains a labeling decision; it does not establish that the narrative's claims are true.

## Key Ideas

- **Treat labels and rationales as paired annotations.** A category alone records the selected interpretation, while a rationale exposes the textual basis on which annotators distinguished it from nearby alternatives.
- **Ground explanations in document evidence.** Highlighting evidence before writing a rationale can improve convergence, but the final explanation still involves interpretive compression and should preserve the document's stance.
- **Separate explanation generation from label inference.** One direction generates a rationale from a document and known labels; the reverse direction predicts a label from a rationale. Success in one direction does not imply success in the other.
- **Avoid label paraphrases.** Useful explanations identify who advances which claim and how the document supports it. Repeating a taxonomy label provides little additional evidence.
- **Evaluate stance and argumentative focus.** Embedding similarity can reward shared entities and topic words even when a generated explanation reverses polarity or omits the central argument. Human evaluation or stance-sensitive checks are needed alongside lexical-semantic metrics.
- **Preserve annotation uncertainty.** A dominant label compresses documents that may contain several intertwined narratives. Pre-curation agreement, adjudication rules, class prevalence, and the treatment of `Other` are part of the construct being measured.
- **Check multilingual instruction adherence.** A semantically plausible explanation in the wrong language fails an important task requirement and can distort both automatic scores and cross-language comparisons.

## Important Papers

- [[papers/narratex-dataset-explaining-the-dominant-narratives-in-news-texts|NarratEX Dataset: Explaining the Dominant Narratives in News Texts]]: introduces a four-language dataset pairing dominant and sub-narrative labels with curated explanations, plus generation and reverse-inference benchmarks.
- Camburu et al. (2018), "e-SNLI: Natural Language Inference with Natural Language Explanations": an influential label-plus-rationale dataset cited by NarratEX.

## Related Concepts

- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]: assigns target-relative causal categories, whereas dominant narrative explanation justifies a document-level narrative interpretation.
- [[concepts/narrative-polarization|Narrative Polarization]]: compares the narrative repertoires of communities; explanation-backed classification concerns the evidence for an individual document label.
- Natural-language explanations
- Rationale annotation
- Inter-annotator agreement
- Multilingual text classification
