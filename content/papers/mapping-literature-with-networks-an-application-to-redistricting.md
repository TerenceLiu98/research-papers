---
title: "Mapping Literature with Networks: An Application to Redistricting"
type: paper
authors:
  - Adeline Lo
  - Devin Judge-Lord
  - Kyler Hudson
  - Kenneth R. Mayer
year: 2023
doi: 10.1017/pan.2023.4
source_job_id: f1fb59b7-3295-4a8c-8ace-2c0faaa18f8d
tags:
  - literature-review
  - network-analysis
  - redistricting
---

## TL;DR

The paper organizes scholarship as a network of concepts and theorized relationships. Its redistricting application maps 115 articles into 57 concepts and 69 edges, making recurring themes, untested relationships, and candidate causal pathways inspectable through a spreadsheet-based workflow and the R package netlit.

## Research Question

How can researchers make literature reviews more systematic, transparent, and reproducible while identifying conceptual connections and gaps?

## Motivation

Reviews based on familiarity, prestige, or citation prominence can obscure contributions and confuse fashionable topics with the structure of a field. Explicit inclusion rules and a concept-level representation make review judgments easier to inspect and extend.

## Contributions

- Translates review questions into network operations: centrality for prominent concepts, communities for research clusters, missing edges for possible theoretical connections, and edge attributes for empirical coverage.
- Provides an accessible spreadsheet-to-network workflow implemented in netlit.
- Demonstrates how local concept neighborhoods can inform causal theory building and discussion of potential confounders.

## Method

Researchers select a corpus using explicit keywords, time windows, and outlets, then record concepts and posited relationships from each article. Directed edges encode hypothesized direction; attributes retain source studies, signs, and empirical status. Measurement-focused studies appear as self-ties. Iterative reading and visualization help consolidate synonymous concepts without relying on terminology alone.

The application searches nine journals for articles since 2010 with efficiency gap, gerrymander, partisan symmetry, or redistrict in the title or abstract, and adds qualifying post-2010 peer-reviewed Google Scholar results with at least 50 citations. The resulting graph distinguishes empirically studied relationships from those only theorized. Missing links suggest questions for investigation, rather than demonstrating that a relationship exists. See [[concepts/concept-based-literature-networks|Concept-Based Literature Networks]].

## Experiments

This is an illustrative review, not a predictive benchmark. The corpus contains 115 articles, 57 concepts, and 69 relationships. Partisan advantage is the most central concept, with degree 14. The graph highlights work on metrics, automated districting, and downstream political effects, themes also identified by Mayer's expert review and McGhee's 2020 review.

The authors argue that network inspection adds detail: self-ties identify measurement work; edge patterns connect district-boundary changes to campaign resources and voting; and the relative separation of constituency-change research from minority-representation research suggests a possible bridge. Neighborhoods around community preservation expose hypothesized pathways involving voter information and rolloff. The paper mentions supplementary biased-sampling experiments but the supplied Markdown does not provide their numerical results.

## Limitations

Corpus boundaries, citation thresholds, and interpretive coding still shape the graph. Explicit criteria do not eliminate selection bias or systemic underrepresentation. Missing edges describe the selected and coded literature, not necessarily the entire field; empirically studied edges do not certify causal identification. The expert-review comparison is a thought exercise rather than a controlled assessment of reviewer performance.

The source's secondary centrality rankings differ between Table 1 and the application prose: the table gives degree five for several concepts, whereas the prose reports eight for efficiency gap, partisan gerrymandering, and community preservation. These values should not be harmonized without replication data.

## Related Concepts

- [[concepts/concept-based-literature-networks|Concept-Based Literature Networks]]: the general review framework.
- [[concepts/partisan-dislocation|Partisan Dislocation]]: an example of a newer measurement concept represented by a self-tie.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: part of the automated map-generation literature discussed in the application.

## Related Papers

- [[papers/partisan-dislocation-a-precinct-level-measure-of-representation-and-gerrymandering|Partisan Dislocation: A Precinct-Level Measure of Representation and Gerrymandering]]: cited as an example of emerging measurement work.
- McGhee (2020), “Partisan Gerrymandering and Political Science”: the expert review used for comparison.

Published in *Political Analysis* 31, 669–678. [Article](https://doi.org/10.1017/pan.2023.4). Replication resources supplied by the source: [Code Ocean](https://doi.org/10.24433/CO.0502881.v1) and [Dataverse](https://doi.org/10.7910/DVN/NV66YN).
