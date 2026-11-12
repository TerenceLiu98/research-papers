---
title: "Algorithmic Intervention Decreases Polarization in Content Moderation"
type: paper
authors:
  - Anna Bertani
  - Saeedeh Mohammadi
  - Taha Yasseri
year: null
tags:
  - content-moderation
  - polarization
  - signed-networks
---

[[index|Library home]]

## TL;DR

Following Community Notes’ transition to bridging-based scoring in early 2022, latent rating positions became less bimodal and contributor networks less aligned into opposing camps, even as negative interactions increased. Independent evaluations did **not** establish a statistically significant improvement in note helpfulness. These are observational associations, not identified causal effects.

## Research Question

Does rewarding agreement between contributors who previously disagreed change the structure of contributor interactions and the helpfulness of community-written notes?

## Motivation

Majority-based moderation can reward coordinated partisan support. Bridging-based aggregation instead seeks agreement across different rating histories, potentially changing incentives for both writing and evaluating notes. The study asks whether this redesign changes participation itself, beyond selecting different notes.

## Contributions

- Compares latent contributor and note positions before and after the scoring redesign.
- Separates the prevalence of negative interactions from their organization into opposing groups.
- Checks persistence among contributors active in both periods and evaluates notes independently of platform classifications.

## Method

The comparison covers English-language notes from July 2021–February 2022 and March–September 2022. Filtered samples contain 4,139 notes and 2,196 raters before, and 4,666 notes and 2,171 raters after; these are period counts and need not represent distinct people across periods.

The Core matrix-factorization scorer models ratings as

$$\hat r_{un}=\mu+i_u+i_n+f_u\cdot f_n.$$

Rater and note intercepts represent rating leniency and adjusted helpfulness; latent factors capture patterns of agreement. Notes require at least five ratings and raters at least ten ratings, followed by a contributor helpfulness filter. The fitted note intercept determines Helpful (at least 0.40), Not Helpful (at most −0.08), or unresolved status. The comparison majority rule uses positive-rating thresholds of 84% and 29%.

Directed network edges run from raters to note authors. A beta-binomial construction retains sufficiently certain positive or negative relationships. Antagonism is the fraction of negative edges. Alignment is the reduction in minimum two-group frustration relative to sign-randomized networks with the same topology and sign counts. Simulated annealing approximates minimum frustration; bootstrap intervals quantify uncertainty in the null mean.

## Experiments

| Measure | Before | After | Reported evidence |
| --- | --- | --- | --- |
| Contributor latent positions | More bimodal | Less bimodal | KS D = 0.128, p < 0.001 |
| Note latent positions | More bimodal | Less bimodal | KS D = 0.142, p < 0.001 |
| Network alignment | 0.740 | 0.649 | p < 0.001 |
| Network antagonism | 0.320 | 0.390 | p < 0.001 |
| External helpfulness mean | 15.5 | 28.8 | Mann–Whitney p = 0.155; Cohen’s d = 0.24 |

Full-sample rater leniency and fitted note helpfulness did not change significantly (p = 0.200 and 0.645). Monthly bimodality declined gradually. Bridging classified fewer notes overall than majority scoring, although its Helpful and Not Helpful shares increased over time.

External evaluation sampled 80 notes per period **without conditioning on platform status**, with ten independent evaluations per note (1,600 judgments). Scores range from −100 to +100, subtracting the percentage of Not Helpful judgments from Helpful judgments. Nonnegative-score notes increased from 55 to 63 out of 80; this descriptive change does not establish improved selection accuracy.

Fixed-contributor analyses retained the decline in latent polarity and network alignment. In this subset, rater leniency also changed significantly (p = 0.007), while note helpfulness did not (p = 0.175). Network conclusions persisted across alternative edge-uncertainty thresholds.

## Limitations

The before–after design cannot exclude concurrent platform changes, population growth, or changes in topics. Fixed-contributor comparisons address turnover only partially. Latent factors measure rating disagreement rather than directly observed political ideology. Results concern the early English-language system. The external helpfulness difference is statistically inconclusive, and the sample does not isolate notes selected as Helpful. Alignment confidence intervals reflect the specified null-model resampling, not every source of uncertainty.

The supplied manuscript gives no explicit publication year or paper identifier; `year` is therefore unknown. Its dataset is listed at https://doi.org/10.5281/zenodo.20591253. The methods date the transition to February 28, while the supplement documents a March 3 announcement.

## Related Concepts

- [[concepts/bridging-based-moderation|Bridging-Based Moderation]]
- [[concepts/social-trust-networks|Social Trust Networks]]

## Related Papers

- [[papers/opinion-dynamics-on-signed-graphs-and-graphons|Opinion Dynamics on Signed Graphs and Graphons]] — a related mathematical treatment of signed interactions; the present paper studies an observed moderation redesign.
