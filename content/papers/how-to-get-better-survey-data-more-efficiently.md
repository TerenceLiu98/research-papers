---
title: How to Get Better Survey Data More Efficiently
type: paper
authors:
  - Mollie J. Cohen
  - Zach Warner
year: 2021
doi: "10.1017/pan.2020.20"
tags:
  - survey-methodology
  - quality-control
  - machine-learning
---

## TL;DR

Thirty complementary quality-control variables nearly recover the interview publication decisions obtained with 141 checks in the 2016/17 AmericasBarometer. Automated metadata checks and light human auditing both matter. The evidence concerns prediction of cancellation decisions, rather than direct measurement of latent interview quality or monetary cost savings.

## Research Question

Which interview quality-control procedures contribute the most information, and how well does a smaller set generalize across countries and survey rounds?

## Motivation

Enumerator fabrication and deviations from sampling or interview protocols can compromise survey inference. Reviewing every available signal consumes scarce fieldwork resources, while detecting problems during fieldwork makes replacement and retraining more feasible.

## Contributions

- Compares 141 procedures on a common cross-national sample containing both published and canceled interviews.
- Identifies a smaller set combining interview-, enumerator-, cluster-, and sample-level evidence.
- Evaluates reduced-feature classification, blind re-auditing, and transfer across countries and rounds.

## Method

The outcome is LAPOP's binary cancellation versus publication decision. Predictors comprise 12 real-time SurveyToGo flags, 65 scripted metadata checks, and 64 human-coded audit checks. The authors compare 36 classifiers using a 75% training and 25% validation split, SMOTE for imbalance, and fivefold cross-validation repeated five times. Hyperparameters maximize ROC AUC; variable importance is summarized across the ten best-performing models.

The selected 30 variables include completion percentage, sampling-cluster size, interview duration, consent reading, enumerator success and refusal rates, skipped or misread questions, GPS availability, and Percentmatch—the maximum proportion of identical substantive answers shared with another interview. Table 1 ranks these checks. This implements [[concepts/survey-interview-quality-control|Survey Interview Quality Control]] through complementary automated and manual evidence.

## Experiments

The main sample contains 13,253 interviews from Argentina, Bolivia, Chile, Guatemala, Haiti, Jamaica, Mexico, Peru, and Uruguay, collected January–June 2017. Of these, 933 were canceled and 12,320 published.

| Evaluation | Reported result |
| --- | --- |
| Reduced versus full checks | Mean RMSE approximately 0.07 versus 0.04; all ten reduced models have AUC above 0.90 and RMSE below 0.10. |
| Classification tradeoff | Four reduced models improve recall; precision declines by 0.05–0.28 across models. Approximately 100 additional published interviews are flagged among 3,313 validation interviews. |
| Blind re-audit | Among 24 randomly sampled cases from 158 misclassifications, 12 re-audits favor the model and 12 uphold the original decision. |
| Cross-country transfer | Mean AUC falls to approximately 0.78, with substantial country-pair variation (Table 2). |
| Transfer to 2018/19 | Argentina AUC is approximately 0.92; the authors report performance declines of about 4% for Argentina and 3% for an additional Ecuador exercise. |

The feature-count comparison indicates diminishing returns after approximately 30 checks. Similar discrimination does not mean identical precision or probability error.

## Limitations

Cancellation is a coarse, institution-specific proxy for quality, and some predictors also informed the original decisions. Auditor discretion and retrospective checks prevent a simple deterministic correspondence, but prediction does not independently establish true quality. The small re-audit cannot establish absence of systematic error.

The study does not estimate procedure-specific costs: staffing and programming costs vary by organization and setting. Cross-country transfer is less reliable than within-country prediction; Haiti's sample is a capital-city oversample. The selected procedures should guide local adaptation rather than serve as universal thresholds. Detailed model and variable appendices referenced in the article are not present in the supplied Markdown.

## Related Concepts

- [[concepts/survey-interview-quality-control|Survey Interview Quality Control]]: combines audit and metadata evidence to assess protocol adherence.
- [[concepts/survey-response-time-and-attentiveness|Survey Response Time and Attentiveness]]: a related use of timing evidence, with a distinct focus on respondent attention rather than enumerator compliance.

## Related Papers

- [[papers/racing-the-clock-using-response-time-as-a-proxy-for-attentiveness-on-self-administered-surveys|Racing the Clock]]: a complementary library paper on timing-based assessment in self-administered surveys.
- Gomila et al. (2017), “The Audio Check”: cited antecedent on audio auditing and fabrication detection.
- Kuriakose and Robbins (2016), “Don't Get Duped”: cited source for duplication-based Percentmatch checks.

Published in *Political Analysis* 29, 121–138 (2021), online November 11, 2020. [Article](https://doi.org/10.1017/pan.2020.20). Replication: [Code Ocean](https://doi.org/10.24433/CO.5039798.v1) and [Dataverse](https://doi.org/10.7910/DVN/SV9B3E).
