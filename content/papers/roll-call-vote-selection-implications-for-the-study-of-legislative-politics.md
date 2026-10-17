---
title: "Roll-Call Vote Selection: Implications for the Study of Legislative Politics"
type: paper
authors:
  - Caitlin Ainsley
  - Clifford J. Carrubba
  - Brian F. Crisp
  - Betul Demirkaya
  - Matthew J. Gabel
  - Dino Hadzic
year: 2020
doi: "10.1017/S0003055420000192"
source_job_id: "63674a1b-33b9-4f6d-8a6f-a546ced27f8e"
tags:
  - legislative-politics
  - roll-call-voting
  - selection-bias
  - political-measurement
---

## TL;DR

Roll-call records can misrepresent legislative behavior because politicians strategically choose which votes become public. A catalogue of 145 chambers shows that roll calls are the exclusive voting method in only 18. Evidence from 15 chambers does not support the claim that low request thresholds ensure high roll-call prevalence. Simulations show that position-taking alone, with sincere voting, can obscure moderate legislators' differences, distort party cohesion in either direction, and conceal a second policy dimension. Increasing the number of recorded votes at roughly fixed prevalence does not resolve these problems in the model.

## Research Question

When do recorded roll calls provide an informative sample of all legislative votes? In particular, do easy request procedures or position-taking incentives justify treating the record as representative for estimating ideal points, cohesion, and policy dimensionality?

## Motivation

Legislatures often use voice votes, rising in places, or other methods without public individual-level records. Researchers consequently observe a selected subset of legislative decisions. Final-passage votes alone also omit amendments and procedural decisions that may reveal important conflicts. A large recorded sample is therefore insufficient evidence that the votes needed to distinguish legislators or policy dimensions are observed.

## Contributions

- Catalogues standard voting procedures, alternatives, and actors empowered to invoke them across 145 chambers in 105 countries, using official standing orders circa 2018.
- Measures roll-call prevalence relative to all votes in 15 chambers, distinguishing coverage from raw recorded-vote counts.
- Formalizes a position-taking mechanism in which parties seek a public unity advantage without changing legislators' votes.
- Compares measurement using all simulated votes with measurement using strategically recorded votes, isolating consequences for three common research targets.

## Method

The empirical catalogue defines a roll call as a vote producing a publicly accessible record of individual choices. Standard procedure refers to most legislative business, rather than only final passage. The prevalence comparison combines 11 chambers with suitable plenary records and four cases from previous studies; it is a convenience sample.

The formal model has two parties with leaders located at 0 and 1. Members' ideal points are uniformly distributed around their leader, with heterogeneity parameter $d$. Leaders may introduce randomly available proposals; any single member may request a roll call at cost $k$. Legislators vote sincerely for the nearer policy alternative, regardless of whether the vote is recorded. Leaders value both policy outcomes and publicly demonstrated unity relative to the other party, with $\alpha$ weighting policy utility.

Unity is the share of a proposing party supporting its proposal, or of the opposing party opposing it; cohesion averages unity across votes. A sufficiently large relative unity advantage motivates a costly recording request. This definition should not be conflated with similarity of underlying preferences or with every conventional cohesion index.

Baseline simulations generate 100-member chambers, draw $d$ uniformly from $[0.5,2]$ and the right party's seat share from $[0.2,0.8]$, and consider 1,000 candidate motions. Baseline values are $\alpha=0.5$ and $k=0.1$, with variations across analyses. Leaders can reject unfavorable motions but cannot freely construct the agenda. Separate two-dimensional simulations generate 500 candidate motions per dimension and compare W-NOMINATE eigenvalue diagnostics for all votes and the roll-call subset.

## Experiments

The empirical results are descriptive; the measurement comparisons use simulated legislatures.

| Analysis | Reported result | Interpretation |
| --- | --- | --- |
| Voting-rule catalogue | 105 of 145 chambers (72%) use a non-roll-call standard procedure; only 18 (12%) exclusively use roll calls | Recording selection potentially affects most catalogued chambers |
| Prevalence, Table 1 | Mean prevalence is about 12%; examples range from 0.1% in Barbados's lower chamber to 66.1% in Switzerland's lower chamber | Request availability and a large vote count do not establish broad coverage |
| Request thresholds | Correlation between required membership share and prevalence is 0.18, with $p=0.51$ | This sample does not support an inverse threshold-prevalence relationship |
| Ideal points, Figures 1-2 | Selected votes assign identical estimated positions to many genuinely distinct moderates; this is rare in the full sample | Selection removes votes that discriminate among interior legislators |
| Cohesion, Figure 4 | At about 32% roll-call prevalence, mean absolute RCV/non-RCV cohesion difference is 8.2 percentage points; 39% of simulated legislatures have a gap of at least 10 points for one party | Aggregate error can be substantial and has no uniform direction |
| Dimensionality, Figure 5 | At about 11% prevalence, the elbow diagnostic misses the second dimension in 10 of 25 legislatures, versus one of 25 with all votes; the eigenvalue-greater-than-one rule misses it in five of 25 RCV samples | Observing topics from both dimensions does not ensure recovery of both dimensions |
| Higher prevalence | At 64% prevalence, 10.3% of ideal points are collocated at the median, versus 2.8% using all votes; at 25% prevalence, second-dimension recovery rises to 80-96% | Coverage improves recovery at different rates for different targets |
| Larger samples, Figure 6 | Increasing recorded-vote counts while prevalence remains around 9-12% does not eliminate the three measurement problems | More observations under the same selection process need not supply missing discriminating votes |

## Limitations

- The 145-chamber catalogue depends on digital availability and language coverage. The 15-chamber prevalence sample is not representative of all legislatures, and its observation periods differ.
- Individual choices on unrecorded votes are generally unavailable. The cross-national evidence establishes exposure to selection and patterns of coverage; it does not directly estimate measurement bias in each chamber.
- The simulations establish a mechanism under two-party spatial preferences, common knowledge, sincere voting, and limited agenda control. They do not estimate the actual prevalence or strength of relative-unity incentives in each real legislature.
- Higher prevalence helps under the simulated selection process, but the paper supplies neither a universal safe threshold nor a general correction estimator. Its dimensionality results depend on the stated eigenvalue heuristics.
- The supplied Markdown contains damaged mathematical notation and missing footnote and appendix text. Table 1 reports Swiss prevalence of 66.1%, despite nearby prose claiming less than half of votes are recorded in all four named mandatory-final-passage cases. The table value is retained here. An inconsistent dimensionality paragraph gives 243 votes on each dimension alongside 547 total; those component counts are not used.

## Related Concepts

- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: strategic selection of whole votes into the public record.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: informative voting contrasts can disappear even when multiple policy topics remain represented.
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]: distinguishes underlying preference similarity from cohesion measured on selected votes.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: a related observation-process problem; individual nonresponse and whole-vote selection require distinct models.

## Related Papers

- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: cited work examining a different mechanism behind apparent low dimensionality, namely party separation.
- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: a library comparison illustrating the distinction between a complete roll-call record and representative coverage of all legislative votes; not identified as a citation in this source.
- Carrubba, Gabel, and Hug (2008), "Legislative Voting Behavior, Seen and Unseen": cited treatment of selection when party discipline can change votes.
- Hug (2010), "Selection Effects in Roll Call Votes": cited comparison of Swiss individual voting behavior under expected recorded and unrecorded procedures.

Source: [article DOI](https://doi.org/10.1017/S0003055420000192). The paper identifies [replication materials](https://doi.org/10.7910/DVN/XI7ENB); these were not independently inspected.

[[index|Library home]]
