---
title: Distributed Dictionary Representations
type: concept
aliases:
  - Distributed Dictionary Representation
definition: "Representing a lexical construct by averaging its dictionary words' embeddings and measuring a text's semantic similarity to that vector."
tags:
  - computational-text-analysis
  - word-embeddings
---

## Overview

Distributed dictionary representations map a researcher-defined vocabulary and a target text into the same embedding space. Averaging dictionary-word vectors yields a construct representation; averaging text-word vectors yields a document representation. Cosine similarity measures semantic affinity even when a text does not literally contain a dictionary entry.

## Key Ideas

- Dictionary selection supplies the substantive meaning of the construct; the embedding corpus supplies its distributional context.
- Averaging accommodates different dictionary sizes but does not establish construct validity. Human ratings and domain-specific validation remain necessary.
- Contrasting two construct similarities can yield a relative rhetorical orientation. Length adjustment and standardization are additional measurement choices, not inherent features of dictionary averaging.
- Temporal applications require checking semantic stability and changes in corpus composition. Averaged vectors also discard word order and do not directly establish factual truth.

## Important Papers

- Garten et al. (2018), “Dictionaries and distributions: combining expert knowledge and large scale textual data content analysis: distributed dictionary representation” — methodological source cited by the congressional study.
- [[papers/computational-analysis-of-us-congressional-speeches-reveals-a-shift-from-evidence-to-intuition|Aroyehun et al. (2025)]] — combines validated evidence and intuition dictionaries with congressional Word2Vec embeddings, length adjustment, and human validation to construct EMI.

## Related Concepts

- [[concepts/supervised-dictionary-induction|Supervised Dictionary Induction]] — learns lexical weights from observed outcomes; distributed dictionary representation instead embeds a supplied vocabulary to measure semantic affinity.
