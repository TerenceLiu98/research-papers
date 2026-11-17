---
title: "Detecting Formatted Text: Data Collection Using Computer Vision"
type: paper
authors:
  - Jonathan Colner
year: 2025
doi: "10.1017/pan.2025.10006"
tags:
  - document-understanding
  - information-extraction
  - local-politics
---

## TL;DR

Colner combines annotated page images, object detection, and OCR to extract visually distinct agenda items from municipal meeting records. Across five California cities, item-matching precision ranges from 0.77 to 0.98. The reported workflow takes approximately one hour per city versus 31 hours for manual collection.

## Research Question

Can a small set of annotated documents train an object detector to recover visually formatted text subsections accurately enough to construct political-science datasets?

## Motivation

Full-page OCR recovers text but does not reliably identify subsection boundaries. Municipal records often distinguish agenda items through indentation, numbering, and spacing, while inconsistent textual formatting makes regular expressions brittle. Recognizing those visual boundaries can make otherwise labor-intensive local-government records usable.

## Contributions

- Presents an accessible workflow integrating Label Studio, LayoutParser, and Tesseract OCR.
- Validates agenda-item extraction against Legistar records and manually extracted meeting records.
- Identifies applicability conditions: visually distinct subsections, sufficiently consistent formatting, and enough extraction work to justify annotation and training.

## Method

Researchers render selected pages as images, draw boxes around target subsections in Label Studio, and export annotations in COCO format. An R50-FPN region-based detector, described in the source as “Fast R-CNN,” is fine-tuned using a 70–30 training/validation split. LayoutParser applies the detector to remaining pages, and Tesseract transcribes text inside each detected box into separate data rows.

The demonstration trains a separate model for each city because formatting differs across cities. Two meeting records per year are selected for annotation. This is [[concepts/layout-based-text-segmentation|Layout-Based Text Segmentation]] followed by transcription; no language model is required.

## Experiments

The study covers Chula Vista, Temecula, South San Francisco, Visalia, and Santa Rosa. Validation uses Legistar and a random sample of 20 manually extracted meetings per city. Item counts broadly agree across sources, with extracted counts tracking hand-coded records more closely. Table 1 reports comparisons with matched Legistar items:

| City | Precision | Jaccard similarity | Cosine similarity | Levenshtein distance (source label) |
| --- | --- | --- | --- | --- |
| Chula Vista | 0.94 | 0.81 | 0.96 | 0.74 |
| Temecula | 0.82 | 0.91 | 0.99 | 0.89 |
| South San Francisco | 0.98 | 0.90 | 0.96 | 0.84 |
| Visalia | 0.78 | 0.97 | 1.00 | 0.96 |
| Santa Rosa | 0.77 | 0.81 | 0.91 | 0.64 |

Precision is matched items divided by all extracted items; lexical metrics are calculated only for matched pairs. The supplied text does not specify the normalization of its Levenshtein measure. It reports approximately one hour per city versus 31 hours by hand and no benefit from annotating more than two meetings per year in this application. Exact detector average-precision scores are not supplied in the parsed text.

## Limitations

The method requires consistent visual cues and is unsuitable for content-defined targets such as names, or tasks needing only whole-document text. Small collections may be cheaper to extract manually. Separate city models limit what this evaluation establishes about transfer across layouts. Matched-pair lexical similarity does not measure missed items, and item-matching precision is distinct from detector average precision. Claims about language independence and table extraction are prospective applicability arguments, not demonstrated multilingual or table benchmarks; OCR quality remains a separate component.

## Related Concepts

- [[concepts/layout-based-text-segmentation|Layout-Based Text Segmentation]] — learns subsection boundaries from page appearance.
- [[concepts/key-information-extraction|Key Information Extraction]] — the broader task of turning documents into structured records.

## Related Papers

- Shen et al. (2021), “LayoutParser: A Unified Toolkit for Deep Learning Based Document Image Analysis” — the document-analysis toolkit used in this workflow.
- [[papers/a-real-time-system-to-populate-fra-form-57-from-news|A Real-Time System to Populate FRA Form 57 from News]] — a related library study of government-document extraction using semantic form interpretation and question answering rather than visual subsection detection.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/8BE6M9).
