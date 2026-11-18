---
title: "Analysing How People Orient to and Spread Rumours in Social Media by Looking at Conversational Threads"
type: paper
authors:
  - Arkaitz Zubiaga
  - Maria Liakata
  - Rob Procter
  - Geraldine Wong Sak Hoi
  - Peter Tolmie
year: 2016
doi: 10.1371/journal.pone.0150989
tags:
  - social-media
  - rumor-refutation
  - stance-detection
---

## TL;DR

Across 330 Twitter conversation threads containing 4,842 tweets from nine news events, users generally support rumours before verification, including those later disproven. True rumours are resolved in about two hours at the median, versus over fourteen hours for false rumours. The study separates conversational stance, certainty, and evidence from eventual truth, showing why apparent confidence and audience support are unreliable substitutes for verification.

## Research Question

How do rumour diffusion, support, denial, certainty, and evidence change before and after a claim is confirmed or debunked, and how do these patterns differ across users?

## Motivation

A rumour is circulating, unverified information; it need not be false. Earlier event-specific studies reached conflicting conclusions about Twitter's capacity for self-correction. Separating responses before verification from those after resolution helps distinguish early collective judgment from reactions to established corrections.

## Contributions

- An event-based collection and journalist annotation workflow that can discover rumours not specified in advance.
- A conversational annotation scheme covering support or response type, certainty, and evidentiality, including nested replies.
- A public annotated corpus and descriptive analysis of diffusion and conversation across rumour lifecycles.

## Method

Event keywords and hashtags retrieve candidate tweets, with event-dependent retweet thresholds selecting source posts for journalist review. Journalists retrospectively label rumours, group threads into stories, identify eventual truth status, and mark a resolving tweet where available. Recursive conversation collection expands 2,695 rumour source tweets into 34,849 tweets. A random subset of 330 threads covers 140 stories: 159 threads concern true claims, 68 false claims, and 103 unresolved claims.

The scheme distinguishes source support, denial, or underspecification from reply agreement, disagreement, requests for information, and comments. Nested replies are annotated relative to both their parent and the source tweet: agreement with a denial is opposition to the underlying rumour. Certainty has three levels. Evidence categories include firsthand experience, URLs, quotations, pictures, reasoning, and no evidence; multiple evidence types may apply. Comments are exempt from certainty and evidence annotation.

Crowdsourcing produces 68,247 judgments from 233 annotators, aggregated by majority vote. The analysis compares pre- and post-resolution periods using retweet timing, normalized counts, conversational ratios, and reported Wilcoxon tests. Requests for information are pooled with denials for the support analysis. User reputation is proxied by the logarithm of followers divided by accounts followed.

## Experiments

This is an observational corpus study, not a trained prediction-system benchmark. The sample includes 297 English and 33 German threads from five breaking-news events and four specific rumour cases.

| Analysis | Reported finding |
|---|---|
| Resolution delay | Median about 2 hours for true rumours and over 14 hours for false rumours |
| Retweet timing | Unverified source posts produce an early burst that fades within roughly 20 minutes; denial posts receive comparatively little amplification |
| Support and denial | Support generally prevails before resolution; denial exceeds support for false stories after debunking |
| Certainty | No statistically significant pre/post change for true or false rumours |
| Evidence in false-rumour discussions | Median evidence ratio falls from 0.8944 before resolution to 0.667 afterward; reported p = 0.01382 |
| Annotation agreement | 62.3% overall agreement with majority labels; source tweets are easier than replies |

High-follow-ratio users tend to support rumours, express certainty, and cite external evidence even when claims ultimately prove false. Of 42 users with follow ratios of at least four, 38 are news organisations. Other examined attributes, including account age, verification, and posting frequency, yield no significant differences.

## Limitations

Retweet thresholds privilege circulating, popular claims, and delayed collection may miss early posts. Events and languages are unevenly represented. Resolving tweets are unavailable for many ultimately resolved claims, restricting temporal comparisons. Agreement is measured against the majority vote rather than a chance-corrected independent reference. Evidence presence does not establish evidence quality, and the reputation proxy largely identifies news organisations in this sample. Observational before/after differences do not identify causal effects of corrections.

The supplied text contains two numerical ambiguities: it reports 132 conversations associated with resolving tweets in the methods but 129 in the results, and its nonnegative support-ratio formula is accompanied by negative reported medians. These discrepancies are left unresolved; the summary does not reproduce those medians as raw support ratios. Automated veracity prediction is proposed as future work, not evaluated here.

## Related Concepts

- [[concepts/stance-detection|Stance Detection]]: annotation separates agreement with a message from support for its underlying claim.
- [[concepts/rumor-refutation-on-social-media|Rumor Refutation on Social Media]]: correction timing and weak amplification of denials constrain self-correction.
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: empirical lifecycle patterns can inform model design, while unverified rumours must remain distinct from established misinformation.

## Related Papers

- [[papers/stance-detection-a-practical-guide-to-classifying-political-beliefs-in-text|Stance detection: a practical guide]]: a complementary methodological account of target-dependent stance measurement; this paper supplies a conversational annotation application.
- Zubiaga et al. (2015), *Crowdsourcing the Annotation of Rumourous Conversations in Social Media*: the cited precursor validates the annotation scheme and crowdsourcing procedure on a smaller subset.
- Starbird et al. (2014), *Rumors, False Flags, and Digital Vigilantes*: the cited Boston Marathon case study motivates broader event coverage and explicit separation of pre/post-resolution responses.

[Paper](https://doi.org/10.1371/journal.pone.0150989). [Dataset](https://doi.org/10.6084/m9.figshare.2068650).
