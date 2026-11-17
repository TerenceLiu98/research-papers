---
title: "Placebo Selection in Survey Experiments: An Agnostic Approach"
type: paper
authors:
  - Ethan Porter
  - Yamil R. Velez
year: 2022
doi: 10.1017/pan.2021.16
tags:
  - survey-experiments
  - causal-inference
  - experimental-design
---

## TL;DR

Sampling placebo vignettes from a large corpus reduces dependence on a researcher's chosen baseline. Across two survey experiments with 2,975 participants, GPT-2-generated placebos had a pooled average effect of 0.01 control-group standard deviations. This does not establish that all placebos are inert: the corpus must match the treatment's nonspecific effects to isolate its theoretically relevant component.

## Research Question

How should researchers select placebo conditions when they lack precise knowledge of the ancillary effects that those conditions should absorb?

## Motivation

A review of 22 articles from eight political science journals, published during 2009–2020, found that all held treatment mode constant, but 55% assumed inert placebos, 45% tested alternative hypotheses, and only 27% used unambiguously apolitical content. Choosing a baseline can amplify or attenuate the estimated treatment effect.

## Contributions

- Formalizes the distinction between pure controls, placebo effects, and the theoretically relevant treatment component.
- Introduces [[concepts/placebo-sampling-designs|Placebo Sampling Designs]] to average over many baseline stimuli.
- Demonstrates automated corpus construction and examines variation by sentiment and political content.

## Method

Write the treatment outcome as the untreated outcome plus a substantive component and a nonspecific component. A single-placebo comparison isolates the substantive component only when treatment and placebo nonspecific effects agree on average. Sampling from multiple placebos replaces that requirement with equality between the treatment's average nonspecific effect and the corpus-average effect; randomization alone does not guarantee it.

The authors generated 5,000 GPT-2 news vignettes using a “Today” prompt. Participants assigned to placebo received a randomly selected vignette. The paper's distribution API contains 4,696 vignettes, a distinct count from initial generation. The design can also use existing text corpora and does not require GPT-2.

## Experiments

Each of 2,975 Mechanical Turk participants completed two randomly ordered experimental blocks, collected in two waves in June and July 2020. One replicated free-speech/public-order framing of a KKK march; the other replicated an individual-responsibility frame about student loan repayment. Each included treatment, placebo, and pure-control arms. Pooled regressions used block and wave fixed effects and respondent-clustered standard errors.

Table 3 reports 5,903 observations; effects below are relative to pure control in control-group standard deviation units.

| Condition | Estimate | Standard error | 95% CI |
| --- | ---: | ---: | --- |
| Student loans frame | 0.13 | 0.04 | [0.04, 0.21] |
| Free speech frame | 0.21 | 0.05 | [0.12, 0.30] |
| Public safety frame | 0.12 | 0.05 | [0.03, 0.22] |
| Pooled placebo | 0.01 | 0.03 | [-0.06, 0.08] |

Political and apolitical placebo estimates were 0.04 and -0.02 respectively; their difference was not statistically significant (p = 0.19). Nevertheless, the student-loan treatment contrast was 0.09 against political placebos and 0.15 against apolitical placebos, crossing the conventional significance threshold only for the latter. Positive- and negative-valence placebo effects were also indistinguishable from zero. Survey-duration comparisons found no significant differences between placebo and treatment arms, offering indirect evidence against differential noncompliance.

## Limitations

The evidence concerns two text-based experiments and one generated corpus. Corpus sampling reduces single-stimulus sensitivity but leaves prompt choice, corpus construction, and equality of nonspecific effects consequential. Few respondents receive any particular vignette, limiting precise vignette-specific estimates. Survey duration is only a proxy for compliance. The literature review's search for “placebo” may miss studies using other terminology. A near-zero pooled effect does not establish universal placebo neutrality.

## Related Concepts

- [[concepts/placebo-sampling-designs|Placebo Sampling Designs]]: randomizes baseline content to estimate a corpus-level comparison.

## Related Papers

- Nelson, Clawson, and Oxley (1997), “Media Framing of a Civil Liberties Conflict and Its Effect on Tolerance”: source of the march-framing replication.
- Mullinix et al. (2015), “The Generalizability of Survey Experiments”: source of the student-loan replication.
- Wells and Windschitl (1999), “Stimulus Sampling and Social Psychological Experimentation”: supplies the stimulus-sampling rationale.

Published in *Political Analysis* 30:481–494 (2022), online June 14, 2021. Replication data: DOI 10.7910/DVN/4PYOXP.
