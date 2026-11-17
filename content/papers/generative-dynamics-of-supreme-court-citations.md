---
title: "Generative Dynamics of Supreme Court Citations: Analysis with a New Statistical Network Model"
type: paper
authors:
  - Christian S. Schmid
  - Ted Hsuan Yun Chen
  - Bruce A. Desmarais
year: 2022
doi: "10.1017/pan.2021.20"
source_job_id: "03f8c0d6-b61a-434f-a5b9-2cc8fb62ef9c"
tags:
  - citation-networks
  - judicial-politics
  - network-inference
---

## TL;DR

A citation exponential random graph model (cERGM) models new citations conditional on an immutable citation history, allowing network growth and within-term mutual citations. Across 66 Supreme Court terms, dependence terms substantially improve fit over a covariate-only model: the latter has an average AIC 5,525 points higher and BIC 5,582 points higher. Transitivity, reciprocity, and concentration on popular precedents matter alongside case attributes.

## Research Question

Which opinions cite which precedents, and how do case attributes and network dependence jointly shape those directed citations?

## Motivation

Case-level citation counts discard the identity of citing–cited pairs. Independent-dyad models retain that identity but cannot represent interconnected citation choices. Citation networks also require a special temporal support: old opinions cannot cite future opinions, historical citations persist, and new opinions introduce new citation opportunities.

## Contributions

- A constrained ERGM for growing, partially acyclic citation networks, implemented in the R package `cERGM`.
- A substantive theory of transitivity, within-term reciprocity, and popularity in judicial citations.
- Term-specific estimates separating temporal variation in case-attribute associations from network dependence.

## Method

Let C_t contain citations and noncitations introduced by opinions in term t, and C_<t the fixed historical network. The model assigns probability proportional to exp(θ′h(C_t,C_<t)) over admissible configurations of C_t. Mutual citations are allowed within a term; citations from older to newer terms are excluded. Conditional citation log odds are the coefficient vector multiplied by the change in network statistics when a tie is toggled.

Covariates include ideological distance between majority-coalition medians, shared issue area, shared opinion author, precedent age and age squared, majority size, ideological breadth, and prior overruling. Network terms include mutual dyads, cross-term transitive ties, within-term geometrically weighted outgoing shared partners, and geometrically weighted indegree. At the selected indegree decay of 1, a negative coefficient favors concentration on fewer recipients. Shared-partner decay is fixed at 0.25 to balance structural fit and degeneracy. Receiver outdegree is an additional network-derived covariate. Raw triangle and in-2-star terms caused degeneracy and were replaced with more stable specifications.

Simulation-based estimation uses `ergm` through the `cERGM` wrapper. Separate models for each term allow parameters to change with court composition and network growth.

## Experiments

The combined Supreme Court Database, Martin–Quinn scores, and CourtListener data cover 1937–2015: 10,020 cases and 112,939 citation ties. The authors estimate 66 models for 1950–2015, retaining earlier cases as history. The article appeared online in July 2021 and in Political Analysis 30 (2022), pages 515–534.

The full specification improves AIC and BIC throughout the modeled period relative to a model excluding reciprocity, transitivity, and popularity. The main text reports that supplementary simulations reproduce degree and shared-partner distributions without degeneracy; this is structural fit assessment, not held-out forecasting.

- Both transitivity terms are positive and statistically significant in every term.
- Reciprocity is positive and significant in most estimable terms, with a typical conditional log-odds increment near 0.50.
- The popularity term is negative and significant in nearly every term, supporting concentration of citations.
- Contrary to the hub hypothesis, receiver outdegree is negative and significant in every term, averaging roughly −0.025 in log odds per additional outgoing citation.
- Recent precedents, common authorship, shared issues, and not being overruled favor citation. Majority size and ideological distance lack consistent effects; ideological breadth is approximately null across the period.

## Limitations

Positive and negative citations are not distinguished, apart from a prior-overruling indicator. Ideology measured by the median majority justice may inadequately capture opinion ideology, potentially leaving ideological clustering in transitivity terms. Proposed explanations involving case complexity or compromise jurisprudence are interpretations rather than identified causal mechanisms. Some terms have no mutual dyads or citations to overruled cases, yielding coefficients of negative infinity rather than finite estimates. Detailed estimation and diagnostic results are delegated to an appendix not included in the supplied Markdown.

## Related Concepts

- [[concepts/citation-exponential-random-graph-models|Citation Exponential Random Graph Models]]: network inference with growing nodes and fixed historical citations.

## Related Papers

- [[papers/exponential-random-graph-models-for-dynamic-signed-networks|Exponential Random Graph Models for Dynamic Signed Networks]]: another extension of ERGMs to constrained temporal relations; its signed, changing ties differ from persistent citation edges.
- Clark and Lauderdale (2010), “Locating Supreme Court Opinions in Doctrine Space”: cited dyadic citation model used to infer opinion positions rather than explain citation formation.

Replication data: https://doi.org/10.7910/DVN/T03YJD.
