---
title: Unbundling Polarization
type: paper
authors:
  - Nathan Canen
  - Chad Kendall
  - Francesco Trebbi
year: 2020
venue: Econometrica
jstor: "48584113"
source_job_id: "4e773294-55a7-487b-b941-bfc97d7925f4"
tags:
  - legislative-politics
  - political-polarization
  - structural-estimation
---

## TL;DR

Combining internal whip counts with U.S. House roll calls from 1977–1986, Canen, Kendall, and Trebbi estimate a structural model separating ideological differences from party discipline. Discipline accounts for roughly 34–44% of perceived ideological polarization in their decomposition. Counterfactuals distinguish its influence on bill passage from the stronger influence of ideological polarization on the policies proposed.

## Research Question

How much partisan separation in legislative voting reflects legislators' preferences versus party control, and how do these mechanisms affect agenda selection and policy outcomes?

## Motivation

Party unity alone cannot identify party influence: like-minded legislators can vote together without pressure. Conversely, scaling votes under sincere voting can attribute discipline to ideology. Parties also select alternatives, acquire information, and abandon proposals before floor votes, making the observed agenda endogenous.

## Contributions

- Models policy proposals, costly whip counts, bill abandonment, targeted discipline, and final voting in one sequential framework.
- Uses prewhipping responses and subsequent votes to separate preferences from party influence without declaring all lopsided votes free of discipline.
- Estimates the unobserved mass of status quos left unchallenged under explicit distributional and agenda-setting assumptions.
- Compares counterfactual changes to discipline and ideological polarization, including historically consequential legislation.

## Method

Two parties have one-dimensional preference distributions and party objectives represented by their median members. A recognized proposer draws a status quo, chooses an alternative, and decides whether to purchase a whip count. Counting provides information and the option to abandon an unfavorable proposal before paying the cost of a floor vote. Whips then influence members who oppose the party but are sufficiently close to the voting threshold; their maximum influence depends on rewards and effort costs.

Whip responses are assumed truthful on average, allowing idiosyncratic noise but excluding systematic deception. Aggregate and individual shocks distinguish initial intentions from final votes. The first estimation step uses a pseudo-likelihood to recover legislator positions, party discipline, and bill-specific voting thresholds; location and shock-variance normalizations identify the latent scale. The second step estimates agenda-selection thresholds and the status quo distribution, accounting for observation conditional on a count or roll call. Assumptions needed for agenda recovery are additional to those identifying preferences and discipline.

The polarization decomposition in Table II is

$$
\text{discipline share}=\frac{y_R^{\max}+y_D^{\max}}{(\theta_R^m-\theta_D^m)+y_R^{\max}+y_D^{\max}}.
$$

This is a model-based decomposition of apparent ideological separation, not a fraction of all political disagreement attributable to parties.

## Experiments

The empirical setting is the 95th–99th Congresses. Archival coverage includes Democratic whip counts for 1977–1986 and Republican counts for 1977–1980. Section 5 describes 340 counted bills, 238 matched to floor votes; Table I reports an estimation sample of 711 legislators, 315 whip-counted bills, and 5,424 roll calls. These are distinct sample counts. Ambiguous responses, including undecided and no response, are coded as not supporting leadership.

| Evidence | Reported result |
| --- | --- |
| Discipline share, Congresses 95–99 | 34.2%, 37.9%, 35.3%, 43.8%, 43.5% (Table II). |
| Underlying ideological separation | Party-median distance rises from 1.395 to 1.698 in the model's normalized units. |
| In-sample fit | 85.5% of roll-call choices and 63% of whip responses correctly predicted; DW-NOMINATE obtains 85.9% while excluding 892 roll calls retained here. |
| Majority agenda selection | Approximately 7 of 100 potential issues are never pursued, 86 go directly to the floor, and 7 are counted; about 2 of those 7 are abandoned. |
| Fixed-policy counterfactual | Removing discipline reverses approval of some debt-limit increases and reduces support for the 1983 Social Security amendments and 1984 tax legislation. |
| Endogenous-policy counterfactual | Removing whipping principally changes approval probabilities; increasing ideological separation moves proposed policies by 6–15% of the party-median distance relative to baseline. |

The paper reports robustness checks using final-passage votes, exempting lopsided votes from whipping, and excluding votes splitting Northern and Southern Democrats. The lopsided-vote specification lowers the average discipline contribution by about seven percentage points but retains the main conclusion. Monte Carlo exercises assess the two-step estimator. These are reported analyses, not replications performed for this page.

## Limitations

Identification depends on informative prewhipping reports and the absence of systematic deception. Coding ambiguous responses and inferring the proposing party from leadership voting are substantive measurement choices. Republican archival coverage ends earlier than Democratic coverage.

The model uses a single policy dimension, fixed fundamental member ideologies, party-median objectives, and no cross-party whipping. Recovering never-pursued policies depends on the structural agenda model and status quo distribution. It does not explicitly model how current alternatives become future status quos. Counterfactual legislative outcomes are model predictions, not experimental treatment effects, and the historical sample does not establish the present-day discipline share.

## Related Concepts

- [[concepts/party-discipline|Party Discipline]]: distinguishes induced unity from shared preferences.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: related selection problem; this paper models whether proposals reach the floor, rather than only whether votes are recorded.
- [[concepts/ideological-voting|Ideological Voting]]: spatial preference component of observed choice.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: cited Bayesian roll-call framework; this paper adds internal counts as identifying information for discipline.
- Snyder and Groseclose (2000), “Estimating Party Influence in Congressional Roll-Call Voting”: cited approach relying on distinctions between close and lopsided votes.
- [[papers/roll-call-vote-selection-implications-for-the-study-of-legislative-politics|Roll-Call Vote Selection: Implications for the Study of Legislative Politics]]: library connection on selective observation of legislative decisions, not asserted as a citation in this paper.

Published in *Econometrica* 88(3), 1197–1233. [Source record](https://www.jstor.org/stable/10.2307/48584113).

[[index|Library home]]
