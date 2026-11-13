---
title: A Network-Based Measure of Cosponsorship Influence on Bill Passage in the United States House of Representatives
type: paper
authors:
  - Sarah Sotoudeh
  - Mason A. Porter
  - Sanjukta Krishnagopal
year: 2026
doi: 10.1140/epjds/s13688-026-00689-4
source_job_id: b633b4c1-d980-45a3-88db-6fc6cdbffd08
tags:
  - legislative-politics
  - political-networks
  - cosponsorship
---

## TL;DR

A success-weighted, exponentially decayed cosponsorship score separates passed and failed House bills more strongly than eigenvector, closeness, or strength centrality in the 111th–115th Congresses. Maximum cosponsor influence produces greater separation than mean influence. These are retrospective associations: eventual outcomes enter the score, including the focal bill's outcome.

## Research Question

Can a network measure incorporating successful legislative collaboration distinguish bills that pass in the U.S. House from those that fail?

## Motivation

Cosponsor counts alone miss variation in collaborators' legislative success. The paper uses [[concepts/legislative-cosponsorship-networks|Legislative Cosponsorship Networks]] to combine collaboration frequency, outcomes, and recency. Passage means passage in the originating House chamber, not enactment into law.

## Contributions

- Defines a symmetric, outcome-weighted influence measure with temporal decay and separate Democratic and Republican components.
- Compares mean and maximum aggregation of legislator scores into bill scores.
- Tests three influence half-lives and three conventional centrality comparators.

## Method

Representatives are nodes; sponsorship and cosponsorship are treated identically. Joint participation creates undirected weighted edges without self-edges. Monthly tensors count jointly supported bills by introduction month, separately for all bills and bills that eventually pass. Each series is accumulated with exponential weights, using decay rate $k=\ln(0.5)/h$ for half-life $h$ in months (Sections 4–4.1).

For each legislator and each party, sum decayed successful collaborations across party members, divide by the corresponding sum for all collaborations, and divide again by that party's size. Sum the two party components to obtain legislator influence. Bill influence is either the mean or maximum score among its sponsor and cosponsors in its introduction month (Sections 4.2–4.3).

Compare mean scores for passed and failed bills within nonoverlapping four-month periods. Relative separation is the difference between these group means divided by the failed-bill mean. Centrality comparators use the largest connected component of the network whose pairwise weights are decayed passed-bill counts divided by decayed total-bill counts.

## Experiments

Data comprise House bills introduced from January 2009 through January 2019, covering Congresses 111–115, obtained through ProPublica with supplementary legislator identifiers. Resolutions are excluded. House passage rates range from 7.3% to 13.49% across these Congresses (Table 1).

| Score | Mean relative separation, six-month half-life |
| --- | ---: |
| Mean influence | 0.139 |
| Maximum influence | 0.248 |
| Mean eigenvector centrality | 0.004 |
| Maximum eigenvector centrality | 0.002 |
| Mean closeness centrality | 0.004 |
| Maximum closeness centrality | 0.002 |
| Mean strength centrality | 0.004 |
| Maximum strength centrality | 0.003 |

Passed bills have higher influence scores in every reported four-month period. Maximum-score separation is 0.248, 0.223, and 0.203 for half-lives of 6, 12, and 24 months, with standard errors 0.0139, 0.0119, and 0.0107 respectively. Corresponding mean-score separations are 0.139, 0.122, and 0.109 (Sections 5.1–5.3; Appendix A). These values measure score separation, not classification accuracy or changes in passage probability.

## Limitations

The tensors assign eventual passage outcomes to introduction months, and the authors explicitly include the focal bill in its own score. Consequently, this design does not establish prospective prediction from information available at introduction. The authors argue the individual bill's contribution is small, but that does not remove the timing issue.

Influence is a proxy, not a causally identified interpersonal effect. Bill topics, committee roles, seniority, demographics, and interest-group funding are not isolated. Results emphasize aggregate bill comparisons rather than validated legislator rankings. Symmetric ties erase sponsor–cosponsor asymmetry. Maximum-score separation supports an association with influential cosponsors, not a causal claim that adding one such legislator outperforms adding several others. The suggested connection between declining scores after about 2015 and polarization remains a hypothesis. Comparison with [[concepts/legislative-effectiveness|Legislative Effectiveness]] scores is proposed future work.

## Related Concepts

- [[concepts/legislative-cosponsorship-networks|Legislative Cosponsorship Networks]]
- [[concepts/social-network-analysis|Social Network Analysis]]
- [[concepts/legislative-effectiveness|Legislative Effectiveness]]

## Related Papers

- [[papers/legislative-prediction-via-random-walks-over-a-heterogeneous-graph|Legislative Prediction via Random Walks over a Heterogeneous Graph]] uses cosponsorship and bill-text graphs to predict individual votes; the present paper instead compares aggregate bill passage outcomes.
- Fowler's *Connecting the Congress: A study of cosponsorship networks* (2006), cited in the source, provides the connectedness-based antecedent; the present measure explicitly incorporates legislative outcomes.

Published as an article in press in *EPJ Data Science*. [Paper DOI](https://doi.org/10.1140/epjds/s13688-026-00689-4). [Author code](https://github.com/sarahsotoudeh/LegislativeInfluence).

[[index|Library home]]
