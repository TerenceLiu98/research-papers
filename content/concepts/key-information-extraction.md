---
title: "Key Information Extraction"
type: concept
aliases:
  - KIE
  - Key Information Extraction from Documents
tags:
  - information-extraction
  - document-understanding
  - visual-language-models
  - question-answering
---

## Overview

Key Information Extraction (KIE) converts information in documents into structured fields, values, and relationships. In visually rich documents, useful extraction depends on both the text and the document layout: labels, values, checkboxes, units, and neighboring fields can determine the meaning of an otherwise ambiguous token. Modern KIE systems include layout-aware encoders and generative vision-language models, but they must still manage omissions, hallucinated values, and domain-specific schemas.

## Key Ideas

- Form-oriented KIE should model the document's visual organization as well as its textual content. A field such as "Direction" can require neighboring fields to identify whether it refers to a highway user or railway equipment.
- A human-centric schema represents each writable or markable subfield, rather than treating a visually complex field as one undifferentiated value. This reduces partial extraction from forms with checkboxes and empty text areas.
- Sample aggregation can improve completeness: multiple schema-validated transcriptions are synthesized into a final representation, reducing the effect of omitted or hallucinated elements in a single generation.
- Generative models provide flexible schemas and context-aware extraction, while traditional OCR and layout parsers can struggle with long, text-rich, irregular government forms. The choice of model does not remove the need for schema validation.
- Field grouping combines spatial proximity with semantic relationships before downstream question answering. This can disambiguate fields, but overly dense prompts may reduce the amount of answerable information the system attempts to retrieve.
- KIE and retrieval should be evaluated separately. Transcription errors measure extraction quality, while downstream answer accuracy and coverage measure whether the extracted schema supports useful information access.
- Fine-grained choice sets and numeric fields remain difficult when source documents use approximate language or omit the precise codes used by the target form.

## Important Papers

- [[A Real-Time System to Populate FRA Form 57 from News]]
- Appalaraju et al. (2021), "DocFormer: End-to-End Transformer for Document Understanding."
- Hong et al. (2022), "BROS: A Pre-trained Language Model Focusing on Text and Layout for Better Information Extraction from Documents."
- Huang et al. (2022), "LayoutLMv3: Pre-training for Document AI with Unified Text and Image Masking."
- Cheng et al. (2022), "TRIE++: Towards End-to-End Information Extraction from Visually Rich Documents."
- Lee et al. (2023), "Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding."

## Related Concepts

- [[LLM-Assisted Web Retrieval]]
- Document understanding
- Visual-language models
- Optical character recognition
- Question answering
- Information retrieval
