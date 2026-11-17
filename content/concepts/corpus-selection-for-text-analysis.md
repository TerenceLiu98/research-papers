---
title: "Corpus Selection for Text Analysis"
type: concept
aliases:
  - Corpus Construction
  - Text Corpus Selection
definition: "Corpus selection specifies which documents from a source universe enter a text analysis, shaping relevance, population coverage, and the interpretation of downstream measurements."
tags:
  - text-as-data
  - measurement
---

## Overview

Corpus selection connects a substantive target population to the documents actually analyzed. Retrieval errors can omit relevant texts or include irrelevant ones, changing both precision and representativeness before a classifier is applied.

## Key Ideas

- In longitudinal archives, source transitions can change segmentation and metadata coverage even when document lengths remain stable. Define whether procedural turns and inserted remarks belong to the target population.

- Distinguish the source universe, the relevant population, and the retrieved corpus.
- Keyword retrieval makes inclusion rules inspectable and portable, but omitted synonyms, vocabulary change, and sentiment-laden search terms can bias coverage.
- Archive subject categories may incorporate expertise, yet proprietary or changing assignment rules complicate replication.
- Validate relevance on sampled documents and compare narrower and broader searches. Higher relevance alone does not establish representative coverage.
- Assess sensitivity of substantive measures to retrieval choices, rather than treating similar document-count trends as evidence of equivalent corpora.

## Important Papers

- [[papers/automated-text-classification-of-news-articles-a-practical-guide|Automated Text Classification of News Articles: A Practical Guide]] — documents low overlap and different tone trends across two plausible retrieval strategies for economic news.

## Related Concepts

Population coverage and measurement error connect retrieval design to the validity of downstream text measures. Human relevance coding evaluates inclusion quality but cannot by itself identify all omitted relevant documents.
