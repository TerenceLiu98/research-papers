---
title: 'Thirst Traps and Quick Cuts: The Effects of TikTok "Edits" on Evaluations of Politicians'
type: paper
authors:
  - Kevin Munger
  - Valerie Li
year: 2025
venue: Social Media + Society
source_job_id: "7fe10f93-515d-4eaf-9a5b-08f18ed1a7d9"
tags:
  - political-communication
  - short-form-video
  - candidate-attractiveness
  - survey-experiments
---

## TL;DR

In a June 2024 survey experiment with 2,303 attentive Prolific respondents, exposure to selected TikTok edits increased perceived attractiveness of both Donald Trump and Joe Biden. Trump's "badass" edit increased favorability by 3.114 points on a 100-point feeling thermometer; his thirst-trap edit had a smaller, less statistically decisive effect. Neither Biden edit significantly changed favorability. The experiment establishes effects of the selected video conditions, while differences in video quality and content prevent attributing the candidate contrast to a particular mechanism.

## Research Question

Can user-created short videos that portray politicians as attractive or impressive change perceived physical attractiveness and overall favorability? Do these effects vary with viewers' age, gender, partisanship, or TikTok use?

## Motivation

Political fan edits combine existing footage, music, filters, and cuts to convey a particular impression of a public figure. Their persuasive purpose can be aesthetic and affective without asserting that the montage depicts a real event. This shifts attention from factual belief to the malleability of [[concepts/candidate-attractiveness|Candidate Attractiveness]] and political evaluations. Editing tools also let ordinary users rework professional footage, linking political fandom to the wider [[concepts/media-ecology|Media Ecology]].

## Contributions

- Distinguishes two inductively identified genres: thirst-trap edits emphasize attractiveness, while badass edits emphasize power, intimidation, or impressiveness.
- Tests existing popular videos rather than researcher-produced stimuli, retaining variation in how the genres appear on TikTok.
- Separates attractiveness from favorability outcomes and reports weak, inconsistent evidence for the preregistered dimensions of treatment-effect heterogeneity.
- Describes control-group attractiveness ratings of Trump, Biden, Robert F. Kennedy Jr., and Bernie Sanders, including their associations with respondent characteristics.

## Method

The researchers recruited 2,807 survey completers using Prolific quotas for US Census gender, race, and age categories. Three attention checks, including an audiovisual check, excluded 504 respondents (18%), leaving 2,303. Fieldwork occurred in June 2024 before the Biden-Trump debate.

Respondents were randomized between a control group (1,139) watching three nonpolitical celebrity edits and a treatment group (1,164) watching one edit each of Biden, Trump, and RFK, in randomized order. Within treatment, Biden genre was randomized between thirst trap (577) and badass (587); Trump genre was independently randomized between thirst trap (579) and badass (585). Everyone in treatment saw the same RFK thirst-trap edit. RFK treatment results are referred to an appendix that is not included in the supplied Markdown.

Stimuli were chosen from popular videos encountered through TikTok hashtag API searches for "biden edit" and "trump edit." The introduction describes popularity in likes, while the stimuli-selection section describes views. The API does not provide a controlled global sample. Video lengths range from 23 seconds for Biden badass to 52 seconds for Biden thirst trap; the Trump videos last 36 and 37 seconds. Content and production quality also vary.

Regression specifications estimate pooled and genre-specific treatment effects for each focal politician, controlling for age, gender, education, internet use, TikTok use, and partisanship. Favorability uses a 100-point feeling thermometer. The supplied text does not clearly specify the attractiveness scale's endpoints, so those coefficients are retained in their reported units. Treatment-versus-control estimates compare multi-video exposure conditions; within-treatment genre randomization supports comparisons between the selected edits of a candidate.

The source lists a [pre-analysis plan](https://osf.io/skvwq) and [replication repository](https://github.com/kmunger/SMS_edits). These are source-provided links, not independently reviewed materials. The DOI in the parsed header is corrupted and is omitted from metadata.

## Experiments

### Main effects

Tables 3 and 4 report the following genre-specific coefficients relative to the celebrity-edit control condition. Parentheses contain standard errors.

| Selected edit | Attractiveness effect (SE) | Favorability effect (SE) |
| --- | ---: | ---: |
| Trump thirst trap | 0.201 (0.049), p < .01 | 2.171 (1.275), p < .10 |
| Trump badass | 0.177 (0.049), p < .01 | 3.114 (1.271), p < .05 |
| Biden thirst trap | 0.354 (0.053), p < .01 | 0.158 (1.268), not significant |
| Biden badass | 0.109 (0.053), p < .05 | -0.221 (1.261), not significant |

All four selected edits increased attractiveness ratings. The thirst-trap point estimate is larger for each candidate, but the paper states that the Trump genre difference is not significant. Trump's thirst-trap favorability estimate meets the paper's p < .10 threshold, not p < .05. Neither Biden favorability estimate is statistically significant. Attractiveness regressions use 2,302 observations for Trump and 2,303 for Biden; all favorability regressions use 2,303.

Pooling genres gives attractiveness effects of 0.189 for Trump and 0.231 for Biden, both p < .01. Pooled favorability effects are 2.645 for Trump (p < .05) and -0.033 for Biden (not significant).

### Heterogeneity and descriptive results

Tests by age, partisanship, and TikTok use for favorability, and by age and gender for attractiveness, yield little consistent evidence of moderation. The authors treat an isolated younger-viewer thirst-trap result as likely noise given the number of comparisons.

Among controls, RFK has the highest average attractiveness rating and Trump the lowest. Older respondents and frequent TikTok users rate all four politicians as more attractive; men rate Trump and Biden as more attractive than women do. These are descriptive associations, not treatment effects. Prior exposure to attractive celebrity edits also complicates interpretation of absolute politician ratings.

## Limitations

- **Stimulus scope:** One video per candidate-genre combination cannot establish an average effect across all edits. Candidate, genre, duration, footage, and production quality are not fully separable. The authors' explanation that Trump videos were better is post hoc, not an experimentally identified quality effect.
- **Exposure and outcomes:** Forced viewing in a survey differs from voluntary viewing and algorithmic feeds. Immediate ratings do not establish persistence, voting effects, or effects of repeated exposure.
- **Population and time:** Quotas and attention screening do not make the sample a probability sample. Results concern particular videos of prominent older White men in June 2024. The proposed extension to less prominent, female, or non-White candidates is a hypothesis.
- **Preregistration ambiguity:** The introduction describes preregistered positive main effects, but Note 2 says the preregistered expectations were null main effects and heterogeneous treatment effects only. The supplied text does not resolve this conflict; the main findings should not be described as unambiguously confirmed preregistered predictions.
- **Advertising comparison:** The discussion compares effect magnitudes with published television-ad experiments. This is not a direct experimental comparison or an equivalence test.

## Related Concepts

- [[concepts/candidate-attractiveness|Candidate Attractiveness]]: appearance judgments are measured separately from general political favorability.
- [[concepts/visual-political-bias|Visual Political Bias]]: editing and portrayal can convey political impressions; this experiment studies audience effects rather than classifying source ideology.
- [[concepts/media-ecology|Media Ecology]]: archival footage, editing tools, creators, audiences, and platform incentives jointly shape the content available for exposure.

## Related Papers

- [[papers/predicting-the-politics-of-an-image-using-webly-supervised-data|Predicting the Politics of an Image Using Webly Supervised Data]]: a library connection on political meaning in visual portrayal; it predicts source leaning rather than estimating persuasion and is not presented as a cited comparison.
- Guinaudeau, Munger, and Votta (2022), "Fifteen seconds of fame: TikTok and the supply side of social video": cited framework for content supply and limits of TikTok sampling.
- Coppock, Hill, and Vavreck (2020), "The small effects of political advertising are small regardless of context, message, sender, or receiver: Evidence from 59 real-time randomized experiments": cited comparison for modest favorability effects.
- Giacomin and Rule (2020), "How static facial cues relate to real-world leaders' success: A review and meta-analysis": cited background distinguishing subjective evaluations from electoral outcomes.

[[index|Library home]]
