---
title: How Open Lists Undermine the Electoral Support of Cohesive Parties
type: paper
authors:
  - Thomas Bräuninger
  - Thomas Däubler
  - Robert Huber
  - Lukas Rudolph
year: 2021
doi: "10.1017/S0007123421000417"
tags:
  - electoral-systems
  - ballot-structure
  - party-cohesion
  - ideological-voting
  - survey-experiments
---

## TL;DR

In a German survey experiment, open lists reduce support for cohesive parties when voters know candidates' immigration positions, benefiting internally divided competitors, especially the CDU/CSU. A spatial model explains this as voters choosing candidates expected to shift their party's position. Switching among voters with similar evaluations of their two preferred parties is strongest near the parties' immigration-policy midpoint. An additional frame emphasizing candidates' influence on party policy produces no detectable aggregate effect.

## Research Question

When does allowing voters to choose individual candidates change which party they support, and which voters move from cohesive to internally heterogeneous parties?

## Motivation

Open lists can make policy differences within a party electorally relevant when a salient issue cuts across party lines. Extending Blumenau et al.'s (2017) UK Brexit experiment, the authors examine German immigration politics after the European migrant crisis. They retain party-level evaluations in the voting model rather than assuming candidate choice displaces party considerations.

## Contributions

- Formalizes how candidate choice can alter the party position voters expect, creating incentives to switch from cohesive to heterogeneous parties.
- Predicts the location of switching intervals from issue preferences, other party evaluations, and expected candidate influence; aggregate gains depend on how many voters occupy those intervals.
- Tests ballot structure and candidate information with real German parties and fictitious candidates, combining randomized first-round comparisons with repeated choices.
- Finds support for information-dependent switching and the midpoint prediction, but not for the additional policy-influence emphasis frame.

## Method

Using normalized notation for the parsed equation, voter utility is

$$
U_{ij}=v_{ij}-\beta\left(x_i-[y_j+\Delta_j]\right)^2,
\qquad \Delta_j=\gamma\lambda z_j.
$$

Here $x_i$ is the voter's immigration position, $y_j$ the party position, $v_{ij}$ evaluations on other issues and non-policy attributes, and $\beta>0$ immigration salience. The indicators $\lambda$ and $\gamma$ denote open lists and candidate information. The candidate-associated shift $z_j$ affects the expected party position only when both indicators equal one. Party evaluations therefore remain relevant under open lists. Information may separately change issue salience or party evaluations.

When a heterogeneous party offers a candidate who shifts its expected position toward a cohesive competitor, the indifference point moves. With equal other evaluations, the switching interval lies near the midpoint of the parties' positions; unequal evaluations relocate it. Larger expected shifts widen the interval, but gains require voters in that interval.

The survey recruited 6,600 online-panel respondents using age, gender, education, and regional quotas, and ran from 11 January to 19 February 2019. Four randomized conditions crossed open versus closed lists with information versus no information on candidates' views about asylum seekers' family reunification. Each of six parties fielded four fictitious candidates. AfD candidates uniformly favored stricter rules, Green candidates uniformly favored more lenient rules, and the other parties offered both positions. A fifth condition added a frame emphasizing that parties consider candidates' electoral performance in future policy decisions.

Respondents voted twice in hypothetical federal list-tier elections, with ballot type changing and information held constant. First-round effects are estimated with OLS linear probability models; Table 1 contains 5,281 observations. Within-respondent transitions and subgroup comparisons provide additional tests. Overall party ratings proxy the model's other evaluations. Descriptive 2017 GLES data contextualize voter and perceived party positions; they are distinct from the experimental sample.

## Experiments

Table 1 reports the following effects. Entries are percentage points, converted from the reported probability-scale coefficients. The final column sums rounded coefficients and compares open with closed lists among informed respondents; it is not the interaction alone.

| Outcome | Open list without information | Open list x information | Open list with information |
| --- | ---: | ---: | ---: |
| Cohesive parties combined | -2 | -7 | -9 |
| AfD | -1 | -5 | -6 |
| Greens | -1 | -2 | -3 |
| CDU/CSU | -2 | +6 | +4 |

For cohesive parties combined, the interaction has $p=0.006$ and the informed open-list contrast has $p=0.001$. The AfD interaction is significant at $p<0.05$ and the CDU/CSU interaction at $p<0.01$; the Green interaction is not significant. The study finds no discernible open-list effect without information. Information alone increases AfD support by about five percentage points, consistent with a possible salience effect, although that mechanism is not separately identified.

Among informed respondents who chose the AfD under closed lists in round one, 72% retain that choice under open lists in round two. About 10% move to the CDU/CSU and 5-6% each to the Left, FDP, and SPD. Among initial Green supporters, 77% remain, about 9% move to the Left, and about 6% each to the CDU/CSU and SPD (Figure 6). These are transitions conditional on first-round support, not electorate-wide vote-share changes.

Among respondents with near-equal evaluations of the AfD and another top-ranked party, open-list effects are strongest at immigration self-placements 7 and 8 on the 0-10 scale from facilitating to restricting immigration (Figure 7). This supports the predicted switching pattern among moderately restrictive voters. The corresponding Green subgroup results do not reach conventional significance. The policy-influence emphasis frame does not change aggregate voting relative to ordinary open lists with information, providing no support for Hypothesis 2.

## Limitations

- The experiment concerns hypothetical choices with supplied positions and fictitious candidates in one national issue context. It does not directly estimate the effect of an enacted electoral reform or subsequent party-policy change.
- The quota sample is not a probability sample, although the authors report party preferences resembling those in probability surveys.
- Power is insufficient to distinguish AfD and Green effects reliably. A weaker Green estimate does not establish a statistically significant difference between the parties.
- Expected candidate influence is central to the model, but the null emphasis-frame result leaves its proposed amplification unsupported. The model also abstracts from variation in perceived influence and expectations about other voters' candidate choices.
- Information can change immigration salience as well as reveal candidate positions. Electoral gains from candidate differentiation may coexist with losses caused by greater issue salience.
- The supplied Markdown omits footnote bodies and the online appendices. Appendix robustness claims are available only through the main text's descriptions. The year above records the stated first online publication in December 2021.

Replication data and instructions: [Harvard Dataverse](https://doi.org/10.7910/DVN/WUTLH8). Article and supplementary-material reference: [paper DOI](https://doi.org/10.1017/S0007123421000417).

## Related Concepts

- [[concepts/personal-vote|Personal Vote]]: candidate selection can express policy preferences within parties.
- [[concepts/ideological-voting|Ideological Voting]]: spatial proximity operates through expected party positions as well as current party labels.
- [[concepts/party-preference-cohesion|Party Preference Cohesion]]: within-party disagreement supplies differentiated candidate options.
- [[concepts/voter-issue-salience|Voter Issue Salience]]: information may change the weight of immigration in party choice.

## Related Papers

- Blumenau et al. (2017), "Open/closed list and party choice: experimental evidence from the UK": the cited experimental predecessor on Brexit; this paper extends its mechanism and tests another context.
- [[papers/electoral-systems-and-ideological-voting|Electoral systems and ideological voting]]: a related Wiki study of cross-national associations between ballot structure and ideological distance; it addresses broader institutional variation rather than this randomized candidate-information mechanism.
- [[papers/party-ambiguity-and-individual-preferences|Party ambiguity and individual preferences]]: a related Wiki study of perceived ambiguity and sympathy. Uncertainty about party positions differs from being offered candidates with known, distinct positions.

[[index|Library home]]
