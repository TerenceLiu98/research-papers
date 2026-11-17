---
title: "Adaptive Fuzzy String Matching: How to Merge Datasets with Only One (Messy) Identifying Field"
type: paper
authors:
  - Aaron R. Kaufman
  - Aja Klevs
year: 2022
doi: 10.1017/pan.2021.38
tags:
  - record-linkage
  - human-in-the-loop
  - political-methodology
---

## TL;DR

Adaptive Fuzzy String Matching (AFSM) learns how to combine string-distance measures using a random forest and iterative human correction. Applications to organizations, cities, and candidate names demonstrate useful single-field linkage, with 88.0% precision for high-scoring organization matches. Transfer without further labeling succeeds in one application, rather than establishing universal transferability.

## Research Question

Can a learned combination of lexical comparison measures improve matching when datasets share only one messy identifying field?

## Motivation

Typos, abbreviations, incomplete names, and reordered letters favor different similarity measures. Choosing one measure discards complementary information. Missing matches reduce usable observations, while incorrect matches can bias subsequent analysis.

## Contributions

- Combines multiple string-distance features in an application-adapted supervised classifier.
- Introduces iterative human review of proposed matches to refine that classifier.
- Validates linkage across organizations, places, and individuals, and provides an R implementation.

## Method

Compute a vector of string-distance measures for candidate pairs, including edit-, substring-, and composition-based comparisons. Fit an initial supervised model to labeled match/nonmatch pairs; the preferred learner is a random forest. Rank remaining pairs by predicted match probability, have humans correct the top batch, append these labels to the training set, and refit. Algorithm 1 stops when the false-positive rate is below 1% or the model converges; the main text does not fully specify the convergence criterion or rate denominator.

The review policy selects high-scoring proposals, rather than explicitly sampling near the decision boundary. The baseline training set is reused across the three applications, with varying additional human input. Exhaustive comparison involves the product of the two dataset sizes; the city application restricts candidates to the same state.

## Experiments

| Application | Validation and findings |
| --- | --- |
| Campaign donors and amicus organizations | Multiple review iterations. Precision evaluation samples 200 proposals per method, 4,000 total, with three Mechanical Turk judgments per pair and majority coding. At scores of 0.95–1, AFSM achieves 88.0% precision, versus 85.0% for Jaccard and 76.3% for Jaro–Winkler. Recall is evaluated using withheld manually identified matches; numerical recall results are deferred to the unavailable supplement. |
| Misspelled PPP cities | One review iteration; correctly spelled cities are removed and remaining strings compared against an almost 30,000-city list within state. Manual review finds every proposed match above 0.95 correct. Above 0.75, most incorrect matches involve cardinal directions. The main text does not give the validation count. |
| Incumbent voting in the 2016 CCES | The organization-trained baseline captures nearly all true matches, and the first review iteration finds no new true positives. The paper describes near-perfect accuracy at threshold 0.2, but its stated error-rate sentence is internally inconsistent (see below). |

## Limitations

- Section 3.3 says both the true-positive and false-negative rates are below 1%. Under standard definitions these rates are complementary. The supplied text cannot support silently replacing “true-positive” with “false-positive”; the supplementary table would be needed to resolve this.
- Scores are not demonstrated to be calibrated probabilities: organization pairs scoring at least 0.95 have 88.0% observed precision. The algorithm's stopping threshold is not a guarantee of held-out precision.
- Human labels and application-specific identity judgments remain important. Directional city errors illustrate that similar spelling can identify a different place.
- Details of model tuning, drawbacks, recall curves, and supplementary evaluations are outside the supplied Markdown. Three applications do not establish reliable transfer to all identifier domains.

## Related Concepts

- [[concepts/fuzzy-string-matching|Fuzzy String Matching]]: the single-identifier comparison problem AFSM addresses.
- [[concepts/probabilistic-record-linkage|Probabilistic Record Linkage]]: the broader linkage setting; AFSM scores can also serve as comparison features within it.

## Related Papers

- [[papers/probabilistic-record-linkage-using-pretrained-text-embeddings|Probabilistic Record Linkage Using Pretrained Text Embeddings]]: a later library paper adds semantic embeddings and LLM labeling to single-field linkage and evaluates AFSM as a comparator.
- Fellegi and Sunter (1969), *A Theory for Record Linkage*: foundational multi-field probabilistic linkage framework cited by this article.

Source: supplied parsed article, Sections 1–4 and Algorithm 1. Published online 11 October 2021; journal issue: *Political Analysis* 30 (2022), 590–596. [Article](https://doi.org/10.1017/pan.2021.38), [replication data](https://doi.org/10.7910/DVN/4031UL), and [R implementation](https://github.com/aaronrkaufman/stringmatch).
