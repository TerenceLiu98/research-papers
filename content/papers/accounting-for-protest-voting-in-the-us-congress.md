---
title: Accounting for Protest Voting in the U.S. Congress
type: paper
authors:
  - Anthony Fowler
  - Jefrey B. Lewis
year: 2026
source_job_id: "331d61d1-0265-45ff-bd53-457c806b0cf3"
revalidated_job_id: "66e8442c-93a6-4e45-84e8-5f7b94a952c1"
tags:
  - legislative-politics
  - ideal-point-estimation
  - roll-call-voting
---

## TL;DR

A mixture model separates spatial voting from member-specific protest behavior in U.S. House roll calls. Accounting for rare defections moves the Squad from apparently moderate positions to the liberal extreme and improves correspondence with campaign-finance ideology scores in 20 of 21 Congresses. Most downstream substantive differences remain modest.

## Research Question

How does allowing legislators to oppose proposals they prefer to the status quo change measured ideology and conclusions about polarization, representation, and elections?

## Motivation

Standard spatial scaling treats opposition as evidence about policy preferences. Expressive opposition to a party's insufficiently ambitious proposal can therefore make an extremist appear moderate. The paper distinguishes this behavior from sincere ideological dissent and from leadership-induced party unity.

## Contributions

- Introduces a member-specific protest propensity separate from ideological location.
- Estimates adjusted ideal points for the 51st–117th Congresses and examines the 118th Congress as an additional illustration.
- Validates scores against qualitative cases and campaign-finance measures, then examines consequences for substantive political research.

## Method

The baseline logistic spatial model is $p_{ij}=\Lambda(\beta_j(x_i-\alpha_j))$. For majority-party members on roll calls with at least 90% majority-party yea support, the model instead sets

$$
\Pr(y_{ij}=1)=(1-\rho_i)p_{ij},\qquad
\Pr(y_{ij}=0)=\rho_i+(1-\rho_i)(1-p_{ij}).
$$

Thus a nay can reflect either spatial preferences or a latent protest component. Abstentions are uninformative. EM alternates posterior component assignments with weighted spatial-model maximum likelihood using L-BFGS; member protest propensities are updated from provisional assignments. This extends [[concepts/item-response-theory|Item Response Theory]] with a restricted behavioral mixture.

Unlike [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]], protest propensity can differ between equally extreme legislators. Its nonmonotonicity is restricted to highly cohesive majority-party votes rather than being permitted across all items.

## Experiments

These are observational measurement and validation analyses, not randomized experiments.

- **Face validity:** In the 117th Congress, standard IRT ranks Squad members between 56th and 187th most liberal; adjusted estimates place them among six of the seven most liberal members. Jared Golden remains the most moderate Democrat under both models.
- **External correspondence:** Majority-party correlations with campaign-finance scores improve in 20 of 21 Congresses. Adjusted scores outperform MC3-GGUM on this criterion in 7 of 10 overlapping Congresses.
- **Historical prevalence:** Protest is eligible on 27.4% of bills, with an expected 3.0 protest votes per eligible bill. The authors estimate fewer than one in 500 individual roll-call votes are protests and only two roll calls whose outcomes were changed by them.
- **Robustness:** Cohesion thresholds from 70% to 95% yield no substantial changes in conclusions. Allowing minority-party protests or protest yea votes produces rank correlations above 0.999 with baseline ideology estimates in the 117th Congress.
- **Substantive applications:** The article reports greater polarization, stronger district–representative ideological correspondence, and a larger electoral penalty for extremism after adjustment. Conditional on ideology, protest is associated with weaker fundraising; no electoral reward for protest itself is found. Detailed analyses are assigned to the supplementary material.

## Limitations

Eligibility depends on observed caucus votes and uses an arbitrary cohesion threshold. The baseline excludes minority-party protest and protest yea votes. The model identifies a restricted behavioral component, not legislators' motives; omitted ideological considerations remain conceptually possible. External score correlations support validity without establishing ground truth. Most substantive applications change modestly, and supplementary analyses are not included in the supplied Markdown.

The source gives inconsistent historical start years (1889 in the introduction and 1887 in Section 5); the Congress range above preserves its explicit sample definition. Author spelling follows the supplied Markdown. Replication data identifier: https://doi.org/10.7910/DVN/HARTMV (not the article DOI).

## Related Concepts

- [[concepts/legislative-protest-voting|Legislative Protest Voting]]: expressive opposition separated from spatial preference voting.
- [[concepts/item-response-theory|Item Response Theory]]: underlying latent measurement framework.
- [[concepts/party-discipline|Party Discipline]]: observed disunity need not imply ideological moderation or low polarization.
- [[concepts/generalized-graded-unfolding-model|Generalized Graded Unfolding Model]]: an alternative treatment of ends-against-the-middle responses.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: foundational spatial model extended by the protest mixture.
- [[papers/ends-against-the-middle-measuring-latent-traits-when-opposites-respond-the-same-way-for-antithetical-reasons|Ends Against the Middle]]: comparison with nonmonotonic unfolding models.
- [[papers/large-scale-ideal-point-estimation|Large-Scale Ideal Point Estimation]]: optimization approach used for weighted spatial estimation.
