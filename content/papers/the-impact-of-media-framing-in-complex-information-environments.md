---
title: The Impact of Media Framing in Complex Information Environments
type: paper
authors:
  - Nicolai Berk
year: 2025
doi: 10.1080/10584609.2025.2456519
tags:
  - political-communication
  - political-framing
  - public-opinion
  - causal-inference
---

## TL;DR

A 2017 editorial change at Germany’s Bild increased crime emphasis in immigration coverage by approximately 42%, yet a panel difference-in-differences analysis finds a precisely estimated near-zero change in readers’ immigration attitudes. The result establishes a scope condition for framing effects on a highly politicized issue, rather than showing that media framing never matters.

## Research Question

Does a substantial, persistent shift in news framing change immigration attitudes under naturally occurring exposure and competing information?

## Motivation

Framing experiments often ensure attention, isolate messages, select issues with relatively weak attitudes, and measure immediate responses. Everyday news consumption relaxes all four conditions. This study connects measured changes in media content to longitudinal audience attitudes to examine that gap.

## Contributions

- Documents a sudden content shift using supervised classification of a large news corpus.
- Combines that shift with panel readership and attitude measurements to estimate changes within individuals.
- Evaluates substantive equivalence, alternative outcomes, and possible explanations for resistance to persuasion.

## Method

Kai Diekmann left Bild in February 2017 following pressure associated with sexual-harassment allegations; successor Julian Reichelt favored more critical immigration coverage. The author argues that the timing supplies plausibly exogenous variation in content.

Two fine-tuned German BERT classifiers identify migration articles and crime content within them. The corpus contains 2.5 million articles from six German outlets during 2013–2019, including approximately 90,000 migration articles. Migration classification achieves test accuracy 95.5% and F1 0.91; crime classification achieves F1 0.857, recall 0.92, and precision 0.80. Other outlets provide comparison trends for the content shift.

The GLES election panel supplies 15 waves during 2016–2020, with immigration attitudes measured in 13 waves on a seven-point scale. Treated respondents reported reading Bild before the change; controls reported no Bild readership before or in subsequent waves. Individual and wave fixed effects estimate the reader-by-post-change interaction. Time-varying individual controls are omitted to avoid conditioning on possible consequences of treatment. The main panel has only one pretreatment wave; a separate GLES long-term panel supplies supporting pretrend evidence.

The paper sets a smallest effect size of interest of 0.15 scale points, compared with a literature-informed expected effect of 0.6 points. These are substantive benchmarks, not directly comparable randomized treatments.

## Experiments

This is an observational quasi-experiment, not randomized exposure.

| Outcome | Reported finding |
| --- | --- |
| Crime emphasis in Bild migration coverage | Approximately 5 percentage points higher, a roughly 42% relative increase |
| Immigration attitudes | +0.019 scale points; reported p = 0.22; significantly smaller than the 0.15-point benchmark |
| Integration attitudes, immigration as most important problem, AfD thermometer | Confidence intervals include zero; effects smaller than the rescaled 0.08-SD benchmark |
| Association between immigration and crime attitudes | No detected effect |

Alternative specifications and the long-term panel support the main finding. Low-interest and low-income subgroups have estimates near the substantive threshold, but these are not statistically significant. Tests find no systematic moderation by other news consumption or convincing evidence of attitude-based selective departure from Bild. Wave-specific estimates never exceed the substantive threshold, although some intermediate periods are statistically significant.

Average absolute attitude movement on a separate ten-point measure falls from 2.25 during 2014–2016 to 1.73 during 2016–2018. This supports an interpretation of attitude crystallization after immigration became politicized, but does not identify that mechanism causally.

## Limitations

- Identification depends on parallel trends and the plausibility of the editorial timing; the main panel cannot directly test pretreatment trends.
- Reported readership measures potential exposure, not attention to particular crime-framed articles. Content avoidance or limited cognitive engagement remains possible.
- A single outlet, issue, and historical setting cannot establish the typical size of real-world framing effects.
- Attitude crystallization is a partial explanation, not a conclusively isolated mechanism.
- The supplied main text references supplementary analyses but does not contain their full specifications. Numerical results here follow the main text.

## Related Concepts

- [[concepts/issue-framing-effects|Issue Framing Effects]]: tests whether emphasizing crime changes immigration evaluations under natural exposure.
- [[concepts/equivalence-testing|Equivalence Testing]]: distinguishes an imprecise nonsignificant estimate from evidence against effects exceeding a substantive threshold.

## Related Papers

- Related Wiki comparison, not a claimed citation: [[papers/how-government-controlled-media-shifts-policy-attitudes-through-framing|How government-controlled media shifts policy attitudes through framing]] finds effects of assigned state-media frames in China; differences in exposure, issues, and setting prevent a direct causal comparison across studies.
- Barabas and Jerit (2010), “Are survey experiments externally valid?”: cited comparison of experimental and real-world communication effects.
- Druckman and Leeper (2012), “Learning more from political communication experiments: Pretreatment and its effects”: cited account of prior exposure as a scope condition.

Published in *Political Communication*, 42(5), 757–773. [Article DOI](https://doi.org/10.1080/10584609.2025.2456519).
