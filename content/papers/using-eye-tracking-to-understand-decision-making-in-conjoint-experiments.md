---
title: "Using Eye-Tracking to Understand Decision-Making in Conjoint Experiments"
type: paper
authors:
  - Libby Jenke
  - Kirk Bansak
  - Jens Hainmueller
  - Dominik Hangartner
year: 2021
doi: "10.1017/pan.2020.11"
source_job_id: "a11b4bb3-4e6f-474d-a23f-f71ecea7dfca"
tags:
  - conjoint-experiments
  - eye-tracking
  - political-methodology
---

## TL;DR

Eye movements support interpreting conjoint choice metrics as measures of attribute importance. As conjoint tables grow, respondents inspect more cells but a smaller fraction of available information, while estimated choice effects remain fairly stable. The pattern is consistent with selective information processing under bounded rationality.

## Research Question

Do attribute-importance measures inferred from choices correspond to visual attention, and how do respondents adapt information search when conjoint tasks contain more attributes or profiles?

## Motivation

Conjoint choices reveal which attribute contrasts influence selection but conceal how respondents acquire information. Distinguishing indiscriminate disengagement from selective processing helps explain whether larger tables undermine response quality.

## Contributions

- Validates choice-based importance measures against fixation patterns, including within-respondent rankings.
- Experimentally varies both attribute count and profile count while recording information search.
- Shows that stable choice effects can coexist with incomplete and increasingly selective visual coverage.

## Method

The study uses [[concepts/eye-tracking|Eye Tracking]] during presidential-candidate conjoint tasks. Each of 122 Duke laboratory participants completes six randomly ordered blocks of 20 tasks: five, eight, or eleven attributes crossed with two or three profiles. Party and gender are always included; other attributes and row order vary across respondent–blocks. Attribute levels vary randomly across tasks, with unequal assignment probabilities for some attributes. Choices are self-paced.

A Tobii T60XL records gaze at 60 Hz. Nonoverlapping areas of interest map fixations to attribute cells. The fixation classifier uses a 30-degree-per-second velocity threshold and a 60 ms minimum duration. The analysis compares AMCEs and attribute-specific marginal $R^2$ with fixation frequency. Within each respondent–block, separate choice regressions on each attribute yield marginal $R^2$ rankings, compared with fixation rankings using Spearman correlation. A search metric adjusts vertical versus horizontal transitions for table dimensions: positive values indicate within-profile search, negative values within-attribute search.

## Experiments

The sample includes university students and community members; 39% are students and 86% identify as Democrats or Democratic-leaning. Data were collected in July 2019.

- **Importance validation (Section 4.1):** the median within-respondent–block rank correlation is 0.32, and approximately 81% of correlations are positive. Both statistics have reported randomization-inference $p<0.0001$ across 10,000 shuffles. Policy attributes receive both large choice effects and substantial visual attention.
- **Complexity (Sections 4.2–4.3):** from the smallest to largest table, the fraction of cells viewed declines from about 71% to 45%, while cells viewed increase from about seven to fifteen and fixations from about seventeen to thirty-two. The table itself grows from ten to thirty-three cells.
- **Choice stability:** the AMCE for strongly supporting rather than strongly opposing gun control is 52 percentage points (95% CI 40–65) in the smallest design and 46 points (39–53) in the largest. The broader pattern of effects and attribute rankings remains fairly stable.
- **Search strategy:** moving from two to three profiles increases the share of tasks with within-profile search by approximately ten, thirteen, and six percentage points for five, eight, and eleven attributes, respectively (each $p<0.01$). Adding attributes at fixed profile count produces no systematic search-strategy change.
- **Repeated tasks (Section 4.4):** fixation counts decline with practice while AMCEs remain similar. Task-number interaction diagnostics provide little evidence of systematic choice drift over 120 tasks.

The authors interpret these findings as adaptation that preserves attention to relevant information while reducing processing costs. They do not directly identify a unique cognitive heuristic. Replication materials are identified in the source at [Harvard Dataverse](https://doi.org/10.7910/DVN/TISLDL). The journal volume is 2021; online publication was June 4, 2020.

## Limitations

Fixations imperfectly represent cognitive processing because of processing delays and peripheral vision. The single laboratory sample is young and disproportionately Democratic and female, and the study targets conjoint behavior rather than real-world voting. Individual importance rankings are noisy with only twenty tasks per block. No memory measure distinguishes online updating from memory-based judgment. Results do not establish robustness beyond the tested complexity range, nor eliminate social-desirability bias or guarantee validity in unfamiliar decision domains.

## Related Concepts

- [[concepts/eye-tracking|Eye Tracking]]: fixation allocation and transitions measure information acquisition alongside stated choices.

## Related Papers

- [[papers/attention-and-political-choice-a-foundation-for-eye-tracking-in-political-science|Attention and Political Choice: A Foundation for Eye Tracking in Political Science]]: a later methodological guide that discusses this study and broader gaze-measurement constraints.
- Bansak et al. (2019), “Beyond the Breaking Point? Survey Satisficing in Conjoint Experiments”: earlier evidence of stable choice effects as attribute counts increase; this paper adds gaze evidence and profile-count manipulation.
- Meißner, Musalem, and Huber (2016), “Eye Tracking Reveals Processes that Enable Conjoint Choices to Become Increasingly Efficient with Practice”: related marketing evidence on selective processing and practice.
