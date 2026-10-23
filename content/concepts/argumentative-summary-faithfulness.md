---
title: Argumentative Summary Faithfulness
type: concept
aliases:
  - Argument-Aware Summary Evaluation
  - Argument Structure Preservation
tags:
  - summarization-evaluation
  - argumentation
  - faithfulness
  - large-language-models
---

## Overview

Argumentative summary faithfulness concerns whether a summary preserves the reasoning structure of its source: the claims at issue, the arguments for and against them, and the resulting balance of support. It is narrower than general semantic similarity and stronger than checking whether isolated summary sentences are entailed by the source.

## Key Ideas

- A summary can use source-consistent language while changing the apparent balance of a debate. Omitting several objections, for example, can turn a contested proposal into an apparently consensual one without introducing an obviously false sentence.
- Shared outcome nodes provide alignment. For parliamentary debates, policy provisions can anchor both source and summary argument graphs even when their speech arguments are differently worded or compressed.
- Single-graph measures describe whether arguments connect to an outcome and how pro and con arguments are balanced. Pairwise measures test whether a summary preserves acceptance status, the direction of net support, or numerical argument strength.
- Binary preservation can be too coarse. In the parliamentary-debate case study, d-preferability consistency is perfect because all relevant proposal nodes retain the same rejection status, while gradual strength metrics expose large shifts.
- Tolerance-based strength accuracy makes the evaluation criterion explicit. Its interpretation depends on the selected tolerance, graph extraction quality, base scores, and gradual semantics.
- Speech-level precision and recall would directly identify omitted and hallucinated arguments, but require a defensible method for matching paraphrased arguments across source and summary.
- Human validation remains necessary. A formal metric can localize structural differences, but agreement with readers' judgments and usefulness for downstream democratic understanding are separate empirical claims.

## Important Papers

- [[Evaluating LLM-Driven Summarisation of Parliamentary Debates with Computational Argumentation]]: defines five provision-centered metrics and applies them to LLM summaries of European Parliament debates.
- Fabbri et al. (2021), "SummEval: Re-evaluating Summarization Evaluation."
- Li et al. (2024), "Which Side Are You On? A Multi-task Dataset for End-to-End Argument Summarisation and Evaluation."
- Roush et al. (2024), "OpenDebateEvidence: A Massive-Scale Argument Mining and Summarization Dataset."

## Related Concepts

- [[Quantitative Bipolar Argumentation Frameworks]]
- [[Argument Relation Classification]]
- Summary faithfulness
- Natural language inference
- Parliamentary debate summarization
