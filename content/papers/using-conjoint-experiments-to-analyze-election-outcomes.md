---
title: "Using Conjoint Experiments to Analyze Election Outcomes: The Essential Role of the Average Marginal Component Effect"
type: paper
authors:
  - Kirk Bansak
  - Jens Hainmueller
  - Daniel J. Hopkins
  - Teppei Yamamoto
year: 2023
doi: "10.1017/pan.2022.16"
source_job_id: "18b9d76a-5101-4ae5-8ae6-638487dfa463"
tags:
  - conjoint-experiments
  - causal-inference
  - electoral-behavior
---

## TL;DR

The average marginal component effect (AMCE) measures how changing a candidate attribute changes expected vote share in elections matching the conjoint's voter and profile distributions. Its combination of preference direction and relative intensity makes this interpretation possible. It does not measure the fraction of voters preferring an attribute or the probability of winning an election.

## Research Question

What electoral quantity does the AMCE identify, how does it aggregate multidimensional preferences, and which alternative electoral quantities can typical conjoint data support?

## Motivation

Candidates differ on many attributes simultaneously. A widespread but weak preference for one attribute can matter little for voting, while an intense minority preference can substantially change vote shares. Counting attribute supporters therefore answers a different question from measuring electoral effects.

## Contributions

- Generalizes the connection between AMCEs and Borda scores to arbitrary within-profile attribute distributions, with independently generated competing profiles.
- Establishes the expected-vote-share interpretation for elections matching the conjoint design, including tasks with more than two candidates.
- Distinguishes several probabilities of winning from the fraction of voters preferring an attribute, explaining their different data requirements.
- Provides practical interpretation and design guidance grounded in explicit target voter and attribute distributions.

## Method

Let Y_i(a,z,x) indicate whether voter i selects a focal candidate whose attribute is a, with remaining attributes z, against opponent x. The AMCE averages Y_i(a,z,x) − Y_i(a₀,z,x) over voters and a specified distribution of z and x. The opponent remains drawn from that distribution; the contrast is not simply a contest between candidates fixed to opposite focal levels.

Under preference orderings and independent draws of competing profiles, define a profile's expected Borda score as Q times its probability of defeating a random opponent, where Q is the number of possible profiles. Differences in attribute-level expected Borda scores are proportional to AMCEs. Uniform draws recover conventional Borda scores. The intensity here concerns relative placement among multidimensional profiles, rather than a separately measured cardinal utility (Section 2.3).

Averaging individual choice indicators over the target voter population yields vote share. Averaging the attribute contrast over target profile configurations consequently yields the expected vote-share effect (Proposition 2). Preference heterogeneity and attribute interactions do not invalidate that identity; vote-to-seat rules do not change its vote-share meaning. The [[concepts/population-average-marginal-component-effect|population AMCE]] perspective makes the required target distribution explicit.

For winning probabilities, first average choices across voters for each candidate matchup, threshold the vote share at 0.5, and then average over profile configurations. The paper distinguishes a fixed candidate against a random opponent, a candidate with one fixed attribute against a random opponent, and contests with opposite focal levels fixed (Equations 5–7).

For the fraction preferring an attribute, first average each voter's choices across profile configurations, threshold that personal choice probability at 0.5, and then average the indicators across voters (Equation 8). Reversing the order of averaging around this nonlinear threshold changes the estimand. Ordinary randomization supports design-based AMCE estimation; restricted or target-distribution designs require appropriate adjustment. Estimating the nonlinear alternatives from typical sparse conjoint data requires additional modeling.

## Experiments

This is primarily a formal methodological paper, supported by illustrative rankings, a literature review, and simulation findings summarized from its supplement.

- **Literature review:** among 82 voting articles in four journals during 2015–2019, 87% use aggregate vote shares or individual-level analogs as a key outcome (Section 2.4).
- **Preference illustration:** with three binary attributes, one voter type has average-rank contrasts of 2.5 versus 6.5, 3.5 versus 5.5, and 4 versus 5. These illustrate strong, moderate, and weak relative preferences despite the same direction of preference (Tables 1–2).
- **Estimation feasibility:** the main text reports preliminary simulation support for model-based winning-probability estimation. It reports poor feasibility for estimating the fraction preferring an attribute because each respondent contributes few relevant observations. Detailed simulation settings and numerical performance are in the supplement, which is not included in the supplied Markdown.

## Limitations

The vote-share identity concerns elections matching the target candidate distribution, voter distribution, and number of alternatives. Generalization to actual elections additionally requires credible sampling, profile distributions, and behavioral validity. A positive AMCE need not indicate majority support for an attribute, and its magnitude is not a change in election-winning probability. The Borda result assumes independently generated profiles, although attributes within profiles may be correlated. Nonparametric winning-probability estimation becomes sparse as attributes multiply; the proposed model-based alternatives have preliminary feasibility evidence rather than universal guarantees. Individual preference classification is especially vulnerable to noise from short respondent task sequences.

## Related Concepts

- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: specifies the profile population over which vote-share contrasts are averaged.
- [[concepts/average-component-preference|Average Component Preference]]: an alternative preference summary that also combines direction and intensity.
- [[concepts/individual-marginal-component-effects|Individual Marginal Component Effects]]: respondent-level estimation highlights why noisy personal effects cannot simply be counted as known preferences.

## Related Papers

- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: develops target-distribution designs and estimators needed for substantive population interpretation.
- Hainmueller, Hopkins, and Yamamoto (2014), “Causal Inference in Conjoint Analysis”: provides the causal AMCE framework used here.
- Abramson, Koçak, and Magazinnik (2021), “What Do We Learn about Voter Preferences from Conjoint Experiments?”: supplies the uniform-distribution Borda result and the critique of majority-preference interpretation addressed here.

Published in *Political Analysis* 31:500–518 (2023), online 30 June 2022. [Article](https://doi.org/10.1017/pan.2022.16). [Replication materials](https://doi.org/10.7910/DVN/NBRBHO).
