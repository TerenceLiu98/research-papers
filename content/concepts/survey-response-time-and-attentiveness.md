---
title: Survey Response Time and Attentiveness
type: concept
aliases:
  - Response-Time Paradata for Survey Attention
definition: "Question-level response timing provides an unobtrusive proxy for survey engagement through both response speed and variation across items, with unusually fast or slow patterns potentially indicating inattention."
tags:
  - survey-methodology
  - response-time
---

## Overview

Response-time paradata record how long respondents spend on survey pages or questions. Their value for assessing attention depends on interpreting patterns in relation to question demands: quick answers to simple items can be appropriate, while long intervals can reflect either deliberation or distraction.

## Key Ideas

- Global duration obscures whether time is allocated to complex questions or spent intermittently on simple ones.
- Attentiveness need not increase monotonically with duration. Rushing and distracted multitasking can produce distinct inattentive patterns.
- Dimension reduction and clustering can summarize timing patterns, but behavioral validation is necessary to interpret clusters as attention categories.
- Open-ended effort, response consistency under scale reversal, screener passage, and experimental responsiveness provide complementary validation signals.
- Experimental analyses should consider whether timing features occur after treatment. Excluding respondents based on attention can also alter external validity.

## Important Papers

- [[papers/racing-the-clock-using-response-time-as-a-proxy-for-attentiveness-on-self-administered-surveys|Racing the Clock]]: combines PCA and three-component Gaussian mixture clustering to distinguish fast-inattentive, attentive, and slow-inattentive behavior.

## Related Concepts

- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]: represent heterogeneous timing distributions and uncertainty in group membership.
