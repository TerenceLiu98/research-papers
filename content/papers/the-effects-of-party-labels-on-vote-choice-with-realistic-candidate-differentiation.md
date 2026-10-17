---
title: The effects of party labels on vote choice with realistic candidate differentiation
type: paper
authors:
  - Noam Titelman
  - Benjamin E. Lauderdale
year: 2024
doi: 10.1017/psrm.2024.20
tags:
  - electoral-behavior
  - party-cues
  - survey-experiments
  - conjoint-experiments
  - british-politics
---

## TL;DR

An October 2021 British survey experiment randomized whether respondents saw party labels alongside realistic Labour and Conservative candidate profiles. Labels increased Conservative candidate selection among 2019 Conservative voters from 44.2% to 58.1%, while Labour selection among past Labour voters barely changed (76.7% to 77.7%). Candidate party remained the strongest predictor even without visible labels. The authors interpret policy information and labels as largely substitutable signals, while finding some remaining responsiveness to policy proximity. The design does not separate affective party attachment from policy-based reasons for supporting a party.

## Research Question

How much does revealing party affiliation change candidate choice when respondents already see policy positions and demographics drawn from realistic party-specific distributions? Does explicit affiliation weaken the relationship between voter-candidate policy proximity and choice?

## Motivation

Observational candidate comparisons face selection problems because positions and candidate recruitment respond to constituencies. Independently randomized conjoint attributes avoid some confounding but can produce implausible combinations of party and policy. This study preserves realistic correlations within candidate profiles while independently manipulating label visibility. It also addresses an interpretive problem: voters can infer party from policy, just as they can infer unobserved policies from party.

## Contributions

- Constructs synthetic candidate populations benchmarked to the joint distributions of 2017 Labour and Conservative candidates.
- Identifies the average causal effect of revealing party labels over the sampled profile distribution, while explicitly separating this from model-dependent attribute estimates.
- Documents asymmetric label effects across previous party voters and examines whether policy proximity predicts choices beyond candidate party.
- Shows why a small effect of explicit labels need not imply that party affiliation is unimportant.

## Method

The authors combine British Elections Study (BES) candidate information for 632 candidates per party with Representative Audit of Britain responses from 385 Labour and 148 Conservative candidates. Missing attributes are imputed separately by party using multivariate imputation by chained equations, with random forests for continuous variables and predictive mean matching for other variables. The resulting synthetic populations retain estimated within-party relationships among attributes (Section 3).

Each task draws one candidate from each party's population. Profiles display age, sex, local origins, council experience, left-right placement, EU referendum vote, and positions on redistribution, immigration, environmental protection, and local service cuts. Candidate side and attribute order within three blocks are randomized. Label visibility is independently randomized at respondent level and held fixed across five tasks.

For regression analyses, choice is coded as +1 for candidate A, -1 for candidate B, and 0 for uncertainty or nonvoting. Predictors include candidate attribute differences and relative proximity to the respondent:

$$
d_{ij}=|x_{ijB}-x_{ijR}|-|x_{ijA}-x_{ijR}|.
$$

Positive values indicate that A is closer to the respondent on attribute j. Models compare labeled and unlabeled conditions, include candidate party even when hidden from respondents, and examine past Labour and Conservative voters separately.

Random assignment identifies the label-revelation effect. Individual attributes are correlated rather than independently randomized, so attribute coefficients are not design-based average marginal component effects; a causal interpretation requires modeling assumptions.

## Experiments

YouGov fielded the experiment in October 2021 to 1,636 BES online-panel respondents: 808 saw labels and 828 did not. Respondent demographics, issue positions, and past votes came from earlier panel waves, measured months or years before the experiment.

### Label revelation

Section 4 reports the following candidate-choice percentages. Differences below are calculated from the reported percentages, in percentage points.

| 2019 voter group | Candidate selected | Without labels | With labels | Difference |
| --- | --- | ---: | ---: | ---: |
| Conservative | Conservative | 44.2% | 58.1% | +13.9 |
| Labour | Labour | 76.7% | 77.7% | +1.0 |
| Brexit Party | Conservative | 14.6% | 63.9% | +49.3 |

The paper describes the Conservative increase as significant and the Labour increase as nonsignificant. Among past Conservatives, Labour selection falls from 17.4% to 11.2%, and uncertainty/nonvoting from 38.4% to 30.6%. The large Brexit Party contrast mainly reflects movement out of uncertainty/nonvoting; the text does not supply that subgroup's sample size. These comparisons concern hypothetical choices between the two presented parties, not national vote shares.

### Policy proximity and inferred party

Tables 1 and 2 show substantial partisan sorting on left-right placement: 67.5% of past Conservatives were closer to the Conservative candidate, and 60.4% of past Labour voters were closer to Labour. Alignment is less consistent on particular policies. For redistribution, past Conservatives were almost equally often closer to Conservative and Labour candidates (39.7% versus 37.9%); for immigration, past Labour voters were nearly evenly split (33.2% closer to Conservative versus 33.1% to Labour).

In the pooled proximity model for past Conservative and Labour voters, all six political-position proximity measures significantly predict choice without labels. With labels, left-right placement, redistribution, and spending cuts remain significant; immigration, environment, and Brexit do not. This pattern of significance does not by itself establish that every between-condition coefficient difference is significant (Section 6).

Matching candidate party to past vote remains the strongest predictor in the unlabeled condition, including in proximity models. Alternative specifications using respondent-candidate interactions, attribute interactions, and quadratic terms do not eliminate that relationship, according to the main text's account of appendix analyses (Section 7). The authors favor an explanation in which respondents infer party affiliation from the profiles. That mechanism is an interpretation of the pattern, not a separately randomized or directly measured mediator.

## Limitations

- Correlated profile attributes require model-based inference for individual policy effects. Randomization of visibility does not turn hidden candidate-party coefficients into causal effects of seeing a label.
- Inferred party can summarize omitted policies, performance expectations, or affective attachment. These motives cannot be separated by the experiment, and it does not adjudicate policy voting versus partisan identity.
- Profiles are benchmarked to 2017 candidates, choices were elicited in 2021, and respondent positions were measured earlier. The political moment and the composition of 2019 party electorates may explain some asymmetry.
- The survey supplies more policy information than voters may ordinarily encounter. Realistic joint profiles improve one aspect of realism without establishing generalization to actual elections or other party systems.
- The supplied Markdown contains the main article and references but not the appendix analyses themselves. Their robustness findings are summarized only as reported in the main text; exact figure-only uncertainty estimates are not reconstructed.

## Related Concepts

- [[concepts/party-cues|Party Cues]]: explicit affiliation and inference from other attributes can provide overlapping information.
- [[concepts/ideological-voting|Ideological Voting]]: relative policy proximity predicts some choices even with party labels.
- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]: a distinct approach to changing conjoint allocation and estimands; the present experiment samples a fixed, empirically benchmarked profile distribution.

## Related Papers

- Kirkland and Coppock (2018), "Candidate choice without party labels: new insights from conjoint survey experiments": prior experimental work on label omission and candidate attributes, discussed in the article.
- Fowler (2020), "Partisan intoxication or policy voting?", and Rogers (2020), "Sobering up after 'partisan intoxication or policy voting?'": the debate about competing explanations for partisan choices.
- Orr, Fowler, and Huber (2023), "Is affective polarization driven by identity, loyalty, or substance?": cited for reciprocal inference between policy information and partisan affiliation.
- De la Cuesta, Egami, and Imai (2019), "Improving the External Validity of Conjoint Analysis: The Essential Role of Profile Distribution": cited working paper motivating attention to the profile distribution.
- [[papers/adaptive-randomization-in-conjoint-survey-experiments|Adaptive Randomization in Conjoint Survey Experiments]]: a library comparison on targeting context-specific extremes rather than realistic average label effects; not a citation in this article.

## Source

Based on the supplied parsed article. The source records acceptance on 7 February 2024 and gives DOI `10.1017/psrm.2024.20`; no volume, issue, or pagination is supplied. The year above follows the source's 2024 article metadata. The replication URL contains a broken identifier in the parsed text and is not reconstructed here.

[[index|Library home]]
