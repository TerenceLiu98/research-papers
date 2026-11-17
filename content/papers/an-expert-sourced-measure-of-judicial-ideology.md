---
title: An Expert-Sourced Measure of Judicial Ideology
type: paper
authors:
  - Kevin L. Cope
year: 2025
doi: 10.1017/pan.2025.10009
tags:
  - judicial-politics
  - political-measurement
  - text-as-data
---

## TL;DR

Jurist-Derived Judicial Ideology Scores (JuDJIS) quantify lawyers’ written evaluations of federal judges using a human-coded hierarchical ngram dictionary. For circuit judges, the scores discriminate conservative from liberal en banc votes with AUC 0.736, compared with 0.672–0.675 for appointing-party and Judicial Common Space measures and 0.645 for clerk-based ideology. Repeated evaluations enable time-varying measurement; the article validates circuit ideology, while broader judicial coverage and non-ideology traits are part of the larger initiative.

## Research Question

Can expert observations of judicial conduct yield more informative, dynamic measures of judicial ideology than political proxies such as appointing-party affiliation, senators’ voting records, or clerks’ campaign contributions?

## Motivation

[[concepts/judicial-ideology-measurement|Judicial Ideology Measurement]] must distinguish beliefs expressed through judging from the politics of appointments and associated actors. Votes reveal outcomes but omit reasoning and courtroom conduct. The Almanac of the Federal Judiciary supplies repeated evaluations by lawyers and former clerks with direct experience of individual judges.

## Contributions

- Introduces a transparent dictionary method that prioritizes longer phrases to preserve context and avoid contradictory nested matches.
- Converts repeated expert comments into judicial ideology estimates with uncertainty reflecting comment quantity and dispersion.
- Presents 470 circuit judges’ scores and validates them against three established proxy measures.
- Provides a framework for additional judicial traits, whose empirical development is deferred to future work.

## Method

The Almanac has collected robust lawyer evaluations since 1990. Surveyors seek a cross-section of practitioners familiar with each judge, typically interviewing eight to ten lawyers per survey and approximately 16–30 distinct lawyers over a decade. Comments are anonymous and may be abridged by the publisher.

The circuit ideology pipeline extracts 4,791 unique phrases of two to nine words, then applies length-specific frequency thresholds to retain 2,176 dictionary entries. Three trained law-student coders assign each phrase a score from −3 to +3 or a non-salient code; the author resolves disagreements. Of dictionary entries, 45.4% receive ideological scores, which are rescaled to [−1, 1].

Within a comment, the algorithm retains the longest scored phrase among nested matches. Separate non-overlapping phrases can each contribute. It averages retained phrase scores within comments, then averages comments within the judge’s chosen year or period. This two-stage aggregation gives comments equal weight rather than pooling all phrases directly. It is a dictionary-based approach to [[concepts/text-scaling-models|Text Scaling Models]].

## Experiments

The main validation codes judges’ liberal or conservative votes in 414 en banc decisions from 1990–2023 across the numbered circuits and D.C. Circuit (Section 3).

| Measure | Vote correlation | Two-SD marginal effect | Logit observations | ROC AUC |
| --- | --- | --- | --- | --- |
| JuDJIS | 0.408 | 0.453 | 2,745 | 0.736 |
| Appointing-president party | 0.351 | 0.349 | 3,016 | 0.672 |
| Judicial Common Space | 0.323 | 0.335 | 2,999 | 0.675 |
| Clerk-Based Ideology | 0.264 | 0.284 | 1,445 | 0.645 |

Marginal effects express probability changes associated with a two-standard-deviation increase in conservativeness, not causal effects. Observation counts vary by measure. The article reports significantly better AUC for JuDJIS than each comparator. Its AUC exceeds JCS by 0.061; the reported 34.9% improvement refers specifically to the excess above the 0.5 random-ranking baseline.

A robustness analysis uses 4,482 three-judge panel decisions, over 95% unanimous, and reports similar but less decisive advantages. Across 21 comparisons spanning data forms and specifications, JuDJIS performs better in all 21, significantly in 20. These are reported predictive-validity analyses, not evidence here of prospective forecasting performance.

Section 4 and Figures 7–8 describe 470 circuit judges over 1990–2024. Mean tenure-averaged ideology is 0.133 and standard deviation 0.344; Republican-appointed and Democratic-appointed means are 0.319 and −0.123, respectively. Positive values indicate greater conservativeness.

## Limitations

- Different judges have different evaluator pools. Systematic evaluator differences and demographic bias cannot be definitively excluded.
- Ideological language changes over time: a score is relative to contemporary norms, so long-run movement need not indicate equivalent substantive change.
- Few evaluations and disagreement produce wider intervals. One-dimensional averages can conceal heterogeneous or libertarian positions.
- Dynamic accuracy cannot be benchmarked against an equivalent dynamic federal appellate measure in this study. Potential multidimensionality and coverage of over 2,200 lower-court judges should not be conflated with the circuit results demonstrated here.
- The supplied text’s introductory roadmap says 1990–2017, whereas Section 4 and figure captions report 1990–2024. The latter dates describe the presented circuit dataset. Supplementary analyses are summarized only as reported in the supplied article.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/KZ5BJF). Article and supplementary material identifier: [DOI](https://doi.org/10.1017/pan.2025.10009).

## Related Concepts

- [[concepts/judicial-ideology-measurement|Judicial Ideology Measurement]]: connects the latent judicial construct to votes, political proxies, and observer evaluations.
- [[concepts/text-scaling-models|Text Scaling Models]]: maps coded textual evidence onto a numerical ideological dimension.

## Related Papers

- Epstein et al. (2007), “The Judicial Common Space”: cited source of the appointment-linked comparator.
- Bonica et al. (2017), “Measuring Judicial Ideology Using Law Clerk Hiring”: cited source of the clerk-based comparator.
- Martin and Quinn (2002), “Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953–1999”: cited precedent for dynamic judicial measurement.
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models]]: a library comparison on numerical ideological measurement from text; it uses direct LLM scoring rather than the human-coded dictionary used here and is not presented as a citation in this article.
