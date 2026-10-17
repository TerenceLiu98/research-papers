---
title: News-Based Geopolitical Risk Measurement
type: concept
aliases:
  - Newspaper-Based Geopolitical Risk Indices
tags:
  - geopolitical-risk
  - text-as-data
  - economic-measurement
---

## Overview

News-based geopolitical risk measurement converts newspaper discussion of wars, terrorism, and international tensions into time series. Dictionary methods count qualifying articles; semantic methods can score their relevance and intensity. The resulting index measures risk as represented in the sampled news coverage, with its geographic perspective and editorial selection.

## Key Ideas

- **Define the construct before retrieval.** Current threats, realized events, and escalation differ from historical recollection, fictional depictions, and domestic unrest without international implications. A broad retrieval screen can precede a more selective semantic assessment.
- **Make the denominator explicit.** Dividing summed scores by all newspaper articles estimates an intensity-weighted coverage share. Dividing by retrieved articles instead estimates conditional average intensity. Rescaling to a reference-period mean changes units, not the underlying coverage perspective.
- **Separate intensity from prevalence.** A graded score and a positive/zero classification answer different questions, even when their aggregated series move together. AI-GPR reports a 0.97 correlation between these constructions.
- **Preserve overlap and direction.** Articles can describe both threats and acts, so overlapping subindices need not sum to the headline index. Initiator/respondent labels yield directed country-pair measures; country co-mentions alone do not establish a directed relationship.
- **Audit the entire pipeline.** Validation must include articles rejected before model scoring. Stratified audits require population weights, and false discoveries among flagged articles differ from misses among human-positive articles. Human disagreement remains part of the measurement problem.
- **Validate specialized measures separately.** Oil-related thresholds, keyword screens, and regional labels add further opportunities for selection and classification error beyond the headline score.
- **Distinguish measurement from identification.** A smoother series or stronger correlation with economic outcomes does not by itself establish lower measurement error or a causal effect. Historical scoring also requires attention to hindsight and model-version dependence.

## Important Papers

- [[papers/the-ai-gpr-index-measuring-geopolitical-risk-using-artificial-intelligence|The AI-GPR Index: Measuring Geopolitical Risk using Artificial Intelligence]]: combines keyword retrieval with LLM intensity scores, full-corpus human auditing, and threat/act, oil, and directed bilateral decompositions.
- Caldara and Iacoviello (2022), "Measuring Geopolitical Risk": dictionary-based foundation cited and reconstructed by the AI-GPR manuscript.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: turns an explicit construct rubric into numeric text scores; aggregation and validation determine how these become an index.
