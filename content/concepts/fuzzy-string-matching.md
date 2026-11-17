---
title: Fuzzy String Matching
type: concept
aliases:
  - Approximate String Matching
definition: "Fuzzy string matching compares nonidentical strings to identify approximate correspondences despite spelling, formatting, or abbreviation differences."
tags:
  - record-linkage
  - string-similarity
---

## Overview

Fuzzy string matching supports linkage when exact equality of identifiers fails. In entity matching, lexical resemblance supplies evidence of identity but cannot establish it alone: similar names may denote different entities.

## Key Ideas

- Edit distance measures character changes; substring and composition measures capture other forms of overlap. Their usefulness depends on the discrepancy pattern.
- Learned combinations can adapt these comparisons to labeled examples rather than impose one universal distance threshold.
- Human review can correct proposed matches and improve subsequent predictions. High match scores still require empirical validation.
- Precision measures the correctness of returned matches; recall measures recovery of true matches. Improving one does not automatically improve the other.

## Important Papers

- [[papers/adaptive-fuzzy-string-matching-how-to-merge-datasets-with-only-one-messy-identifying-field|Adaptive Fuzzy String Matching]]: combines lexical distances using a random forest refined through human review across three linkage applications.

## Related Concepts

- [[concepts/probabilistic-record-linkage|Probabilistic Record Linkage]]: estimates identity probabilities from imperfect identifiers; approximate string comparisons can supply its features.
- [[concepts/text-embedding-models|Text Embedding Models]]: semantic representations can complement lexical resemblance when names differ substantially.
