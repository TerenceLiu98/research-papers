---
title: "What Would You Say? Estimating Causal Effects of Social Context on Political Expression"
type: paper
authors:
  - William Small Schulz
year: 2024
doi: "10.1017/pan.2024.15"
tags:
  - political-expression
  - survey-experiments
  - text-scaling
---

## TL;DR

The “What Would You Say?” (WWYS) survey instrument measures intended use of political catchphrases under randomized hypothetical audiences. Its ordinal Wordsticks model separates lexical ideology from outspokenness. Demonstration experiments find reduced outspokenness with strangers and ideological accommodation toward opposing interlocutors, rather than aggregate polarization toward ideological allies.

## Research Question

How can surveys estimate social contexts’ causal effects on the amount and ideological content of political expression without assuming access to respondents’ true beliefs?

## Motivation

Existing documents exclude unspoken opinions and people who avoid political expression. Direct questions about freedom of speech may capture politicized attitudes, while trait scales do not identify which views people suppress in particular contexts. A survey of concrete phrase choices can measure both intended expression and abstention.

## Contributions

- Introduces WWYS as a context-sensitive survey measure of political expression.
- Adapts Wordfish into an ordinal item-response model with separate lexical ideology and outspokenness dimensions.
- Operationalizes self-censorship and ideological code-switching as treatment effects relative to a close-friend reference condition.
- Combines survey, behavioral, and experimental validation while retaining phrase-level interpretability.

## Method

Respondents indicate whether they would use selected political phrases with a specified audience. Most studies present 20 phrases sampled from larger inventories; Study 4 uses 11 fixed items. Phrase selection combines substantive judgment with a lasso-based analysis of approximately one million tweets.

Wordsticks models ordinal responses using respondent lexical ideology, respondent outspokenness, phrase ideological slant, and category thresholds. Outspokenness captures general willingness to use phrases rather than document length. Lexical ideology describes expressed language, not a recovered true preference. Study 3 explicitly asks about sincere usage, excluding quotation, sarcasm, and jokes.

For causal analyses, phrase parameters are learned from Studies 2, 4, and 5 and held fixed when estimating respondent traits in Studies 1 and 3. This avoids allowing the experimental sample to redefine the outcome scale. Randomized audience contrasts estimate changes relative to speaking with a close friend. The author favors “code-switching” over “preference falsification” because the latter implies an unverifiable authenticity standard.

## Experiments

Five U.S. studies provide data: Study 1 (503, Prolific, 2021), Study 2 (800, MTurk, 2021), Study 3 (901, Prolific and MTurk, 2023), Study 4 (755, MTurk, 2022), and Study 5 (2,339, AmeriSpeak, 2023). Study 5 supplies training data only; this paper analyzes audience treatment effects in Studies 1 and 3.

Behavioral validation uses 2,000 manually coded tweets from 265 users. Lexical ideology correlates with mean coded tweet ideology at 0.29 among 172 users with ideologically labeled tweets. Outspokenness correlates with coders’ mean ideological certainty at 0.16 and with respondents’ self-rated outspokenness at 0.31. Issue ideology and ideological identity independently predict lexical ideology.

Reported experimental regression estimates below use standardized nonbinary variables; parentheses contain standard errors (Table 2, model 2; Table 3, model 3).

| Audience versus close friend | Lexical ideology | Outspokenness |
| --- | --- | --- |
| Newly met stranger | −0.04 (0.06) | −0.57 (0.12) |
| Most liberal interlocutor | −0.21 (0.06) | −0.12 (0.11) |
| Most conservative interlocutor | 0.21 (0.06) | −0.24 (0.11) |

Subgroup analyses attribute ideological shifts mainly to liberals and conservatives accommodating out-groups. Aggregate in-group effects are not statistically significant; some individual phrases nevertheless show polarizing changes. Moderate respondents’ effects are also not significant, but power analyses caution against interpreting this as evidence of no effect.

## Limitations

WWYS measures hypothetical self-reported expression, not natural conversation. Phrase selection defines the measured lexical space and can introduce researcher bias. Behavioral validation is limited by few tweets, a short instrument, and recruitment of left-of-center Twitter users. The substantive tests were not preregistered and use nonrepresentative online panels; the representative Study 5 sample does not establish population-level treatment results here.

Close friends are a relative reference, not verified authentic beliefs. Network homophily can affect contrasts with ideological interlocutors. Lexical shifts combine identity signals, style, and substantive framing, without identifying motives such as politeness or persuasion. The argument that dishonest survey responses merely attenuate treatment effects requires survey-response desirability to be invariant across assigned contexts. Results concern a U.S. left-right space and do not establish effects in other countries or online settings.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: Wordsticks extends document scaling to ordinal elicited phrase usage and makes abstention observable.

## Related Papers

- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: motivates behavioral validation of latent text scales against human judgments.
- Slapin and Proksch (2008), “A Scaling Model for Estimating Time-Series Party Positions from Texts”: Wordfish supplies the modeling foundation.
- Carlson and Settle (2016), “Political Chameleons”: compares public and private opinions in laboratory interactions; WWYS instead randomizes hypothetical audiences in surveys.
