---
title: Question-Conditioned Sentence Selection
type: concept
aliases:
  - Main Content Selection for Reading Comprehension
tags:
  - machine-reading-comprehension
  - sentence-selection
  - reinforcement-learning
---

## Overview

Question-conditioned sentence selection constructs a reading context by choosing sentences relevant to a question from candidate passages. The selected context is then passed to an answer extractor. The selection unit is a sentence, allowing useful content from multiple passages to be combined without retaining every passage in full.

## Key Ideas

- **Question relevance and answer utility differ.** A passage can overlap strongly with a question while contributing little evidence for its answer. Downstream answer quality is therefore an important evaluation target.
- **Selections can depend on history.** Conditioning on previously selected sentences allows a policy to account for content already included. This gives the model the capacity to reduce repetition, but does not itself prove that redundancy decreases.
- **Action constraints shape accessible evidence.** MC-MDP selects from a moving window and advances past the chosen sentence. Window size controls local choice, and candidate ordering can affect what content is available later.
- **Selection and extraction are separate stages.** Improvements in answer-span scores establish pipeline utility. Sentence-level evidence coverage and redundancy need their own measurements to explain why the selector helps.
- **Reward definitions matter.** Overlap-based rewards such as F1 and ROUGE-L require explicit scoring targets, aggregation rules, and return definitions for reproducible policy learning.

## Important Papers

- [[papers/teaching-machines-to-extract-main-content-for-machine-reading-comprehension|Teaching Machines to Extract Main Content for Machine Reading Comprehension]]: MC-MDP combines question-aware sentence embeddings with a window-constrained policy and reports improved MSMARCO answer scores with Match-LSTM and BiDAF.

## Related Concepts

- [[concepts/key-information-extraction|Key Information Extraction]]: an adjacent extraction task that produces structured fields and relationships; sentence selection instead produces the context for an answer reader.
- Machine reading comprehension: the downstream question-answering task.
- Markov decision processes and policy gradients: the sequential decision and learning framework used by MC-MDP.
