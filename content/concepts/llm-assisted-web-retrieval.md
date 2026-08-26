---
title: LLM-Assisted Web Retrieval
type: concept
aliases:
  - LLM-Based Web Retrieval
  - Domain-Focused Web Retrieval
tags:
  - information-retrieval
  - web-crawling
  - llm-classification
  - query-expansion
  - human-in-the-loop
---

## Overview

LLM-assisted web retrieval is a domain-focused information-gathering workflow that uses language models alongside search, crawling, scraping, and human review. The model can expand or localize queries, filter candidate pages, classify retrieved content, and help identify new exclusion rules. It is most useful when relevant information is distributed across heterogeneous sites and cannot be captured by a single fixed query or classifier.

## Key Ideas

- Discovery combines a domain vocabulary with multilingual query construction, search-engine retrieval, classical query expansion, and LLM-generated terms.
- Focused crawling and page-level scraping collect evidence from candidate pages and related pages such as organizational descriptions or about pages.
- LLM classification can support zero-shot or lightly adapted filtering when positive examples are scarce, but prompts, rejection criteria, and model choice remain part of the system design.
- Blacklists and structured output constraints reduce predictable noise and make downstream records machine-readable.
- Human verification remains important for high-integrity datasets because web content is ambiguous, incomplete, and dynamic. Re-crawling is needed when the target domain changes over time.
- A reusable pipeline still requires domain-specific terminology, coverage checks, multilingual quality control, and explicit reporting of false positives and missed results.

## Important Papers

- [[A Real-Time System to Populate FRA Form 57 from News]]
- [[An Application for Development and Interactive Visual Engagement with the SHARECITY 200 Food Sharing Initiative (FSI) Database in the CULTIVATE Project]]
- Wu, Cho, Davies, and Jones (2024), "LLM-based Automated Web Retrieval and Text Classification of Food Sharing Initiatives." [DOI](https://doi.org/10.1145/3627673.3680090)
- Jagerman et al. (2023), "Query expansion by prompting large language models." [arXiv](https://arxiv.org/abs/2305.03653)
- Robertson (1990), "On term selection for query expansion."
- Hou et al. (2023), "PromptBoosting: Black-box text classification with ten forward passes."

## Related Concepts

- [[Food Sharing Initiatives]]
- Focused crawling
- Web scraping
- Multilingual information retrieval
- Query expansion
- Zero-shot text classification
- Human-in-the-loop machine learning

