---
title: 'Human–AI Interactions in Public Sector Decision Making: “Automation Bias” and “Selective Adherence” to Algorithmic Advice'
type: paper
authors:
  - Saar Alon-Barkat
  - Madalina Busuioc
year: null
tags:
  - public-administration
  - human-ai-decision-making
  - discrimination
---

## TL;DR

Three Dutch survey experiments (total N = 2,854) find no greater adherence to algorithmic than equivalent human-expert advice when it conflicts with qualitative evidence. Citizen respondents in Study 2 more often followed negative advice about a Moroccan-Dutch teacher, consistent with [[concepts/selective-adherence|Selective Adherence]], but this pattern reversed among civil servants surveyed after the childcare benefits scandal. The findings distinguish stereotype-consistent reliance from general [[concepts/automation-bias|Automation Bias]].

## Research Question

Do public decision-makers defer more to algorithmic than human advice despite contradictory evidence? Does adherence depend on the decision subject’s ethnicity, and does an algorithmic source amplify that disparity?

## Motivation

Human oversight is often expected to counter algorithmic discrimination. That safeguard depends on how people process recommendations: resisting advice generally can coexist with accepting it when it confirms stereotypes. Comparing equivalent numerical advice from humans and algorithms isolates source effects more directly than comparing algorithmic advice with no advice.

## Contributions

- Separates hypotheses about general algorithmic deference, stereotype-consistent adherence across sources, and additional amplification by algorithms.
- Tests these hypotheses with conflicting numerical and qualitative evaluations in a public-sector personnel decision.
- Replicates source comparisons across two citizen samples and a civil-servant sample, documenting contextual variation in ethnicity effects.

## Method

Participants act as school-board members and choose which of three female teachers should not receive a renewed contract. Each teacher has a qualitative HR evaluation and a numerical performance prediction (4, 6, or 8). The lowest score conflicts with the qualitative evidence. Random assignment attributes identical numerical advice to either machine learning or human consultants; both are described as 95% accurate. This accuracy is part of the vignette, not a measured model result.

The binary outcome is selecting the lowest-scoring teacher for non-renewal. Studies 2 and 3 additionally randomize whether that teacher has a Dutch or Moroccan-sounding surname. Logistic regressions estimate source and ethnicity effects and their interaction. Ethnicity analyses include only respondents of Dutch descent. Studies 1 and 2 vary the degree of conflicting evidence; Study 3 uses only the high-conflict version. Studies 1 and 2 exclude failed attention checks and completions under three minutes; Study 3 has no attention check.

## Experiments

| Study | Sample | Adherence: algorithm / human | Source effect |
| --- | --- | --- | --- |
| 1, February 2020 | 605 citizens | 11.5% / 11.9% | OR 0.96, 95% CI [0.58, 1.58], p = .876 |
| 2, March 2020 | 904 citizens | 10.8% / 9.5% | OR 1.16, 95% CI [0.75, 1.80], p = .498 |
| 3, February 2021 | 1,345 civil servants | 4.8% / 8.6% | OR 0.54, 95% CI [0.34, 0.83], p = .006 |

Source-effect p values are two-sided (Tables 1–4 and 7–8). Most respondents followed the qualitative evaluation instead of the numerical score.

For Study 2’s ethnicity analysis (n = 792), adherence was 12.3% for the Moroccan-Dutch teacher versus 8.6% for the Dutch teacher. The ethnicity odds ratio was 1.50 (95% CI [0.95, 2.40]); significance depends on the preregistered directional test: one-sided p = .042, two-sided p = .083. This is a 50% increase in odds, not a 50% increase in probability. The source-by-ethnicity interaction was not significant (OR 0.50, p = .147; Tables 5–6).

Study 3’s ethnicity analysis (n = 1,203) reversed the disparity: 5.0% versus 8.3%, respectively (OR 0.57, 95% CI [0.35, 0.91], two-sided p = .020). Its interaction was also insignificant (p = .480; Tables 9–10). The authors suggest heightened awareness after the childcare benefits scandal as an explanation; the design does not causally identify that explanation.

## Limitations

The experiments concern one hypothetical education decision in the Netherlands, without repeated algorithm interaction or real employment consequences. Civil servants were not demographically representative, and social desirability may affect discrimination measures. Sample, timing, and procedural differences prevent attributing the Study 3 reversal solely to the scandal. Nonsignificant source effects do not establish equivalence, and interaction tests have limited power. Following a score amid conflicting evidence is the operational outcome; the experiment does not establish ground-truth teacher performance.

The supplied Markdown does not establish the publication year or article DOI, so the year is left unset. The reported data identifier is [Harvard Dataverse, DOI 10.7910/DVN/TQYJNF](https://doi.org/10.7910/DVN/TQYJNF).

## Related Concepts

- [[concepts/automation-bias|Automation Bias]]: tested as stronger adherence to algorithmic than equivalent human advice amid conflicting evidence.
- [[concepts/selective-adherence|Selective Adherence]]: reliance contingent on stereotype alignment rather than source alone.
- [[concepts/calibrated-reliance|Calibrated Reliance]]: low overall reliance does not establish appropriate or equitable advice use.

## Related Papers

- [[papers/putting-a-human-in-the-loop-increasing-uptake-but-decreasing-accuracy-of-automated-decision-making|Putting a human in the loop]]: also separates algorithm uptake from the effectiveness of human intervention; it studies prediction accuracy rather than ethnicity-linked personnel decisions.
- Green and Chen (2019), “Disparate Interactions: An Algorithm-in-the-Loop Analysis of Fairness in Risk Assessments”: cited evidence of selective reliance in pretrial risk assessment.
- Stevenson (2018), “Assessing Risk Assessment in Action”: cited observational evidence on differential overrides and the erosion of pretrial-release effects.
