---
title: "Racing the Clock: Using Response Time as a Proxy for Attentiveness on Self-Administered Surveys"
type: paper
authors:
  - Blair Read
  - Lukas Wolters
  - Adam J. Berinsky
year: 2022
doi: "10.1017/pan.2021.32"
tags:
  - survey-methodology
  - response-time
  - soft-clustering
---

## TL;DR

Response-time attentiveness clustering (RTAC) uses question-level timing patterns to distinguish fast-inattentive, attentive, and slow-inattentive survey respondents. Principal-component reduction followed by a three-component Gaussian mixture identifies groups that differ in open-ended effort, framing effects, scale consistency, and screener passage. Its central insight is that long completion times can reflect distraction rather than careful engagement.

## Research Question

Can unobtrusively collected response times identify survey attentiveness without adding instructional manipulation checks, while recognizing both rushing and distracted respondents?

## Motivation

Total completion time hides how respondents allocate time across questions. Complex questions discriminate between response behaviors more strongly than simple demographic items. A fast-versus-attentive dichotomy also overlooks multitaskers who alternate between rapid responses and long interruptions.

## Contributions

- A three-type account of attentiveness that allows a nonmonotonic relationship between time and engagement.
- A combination of dimension reduction and probabilistic clustering that retains cross-question patterns without imposing arbitrary speed thresholds.
- Validation against multiple behavioral indicators and comparisons with screeners, global timing, and two-state clustering.

## Method

RTAC starts with a respondent-by-question matrix of logged response times. PCA reduces correlated timing variables; the application retains 19 components explaining 80% of variation. Subsequent components preserve information beyond the dominant pattern associated with long, complex items.

A three-component [[concepts/gaussian-mixture-models|Gaussian Mixture Model]], fitted with expectation-maximization, estimates membership probabilities. Respondents are assigned to their highest-probability component, and inspection of timing distributions supplies the fast, baseline, and slow labels. The three-group structure is theoretically imposed; its attentiveness interpretation requires behavioral validation.

The authors recommend examining assignment stability across retained PCA dimensions rather than treating 80% as a universal threshold. Their application stabilizes around that level (Section 3.3).

## Experiments

The main application uses a 2016 Survey Sampling International online survey. Reported cluster counts are 1,168 fast-inattentive, 987 baseline-attentive, and 362 slow-inattentive respondents, approximately 46%, 40%, and 14% respectively.

| Validation | Reported finding |
| --- | --- |
| Open-ended description of a book, film, or show | Mean lengths are roughly 160 words for attentive respondents, 112 for fast-inattentive respondents, and 80 for slow-inattentive respondents (Figure 6). |
| Tversky–Kahneman framing experiment | The attentive group has a larger effect; restricting to it raises the estimated effect by almost 10 percentage points. Inattentive groups have smaller effects, with especially noisy estimates for the slow group (Figure 7a). |
| Reversed ideological scale | Including the reversed item substantially reduces consistency in both inattentive groups, while attentive-group consistency remains largely unchanged (Figure 7b). |
| Four instructional manipulation checks | Median passage is two among attentive respondents versus one in either inattentive group (Figure 8). |

RTAC and screeners distinguish the expected framing and scale-consistency patterns more successfully than global timing or two-state clustering in these comparisons (Figure 9). The text reports replications across other surveys in Online Appendix C and robustness to omitting experimental or all posttreatment timers in Appendix B; those appendices are not included in the supplied Markdown.

## Limitations

Attentiveness remains latent: timing clusters and validation measures are proxies, not individual ground-truth labels. Slow timing alone does not demonstrate distraction. Component retention and the number of clusters require researcher decisions and survey-specific checks.

Using posttreatment timings to stratify experimental results can complicate causal interpretation; pretreatment-only timers address that concern more directly. Removing inattentive respondents can change the population represented because attentiveness correlates with respondent traits. The authors favor examining effects by attentiveness group over automatic exclusion.

## Related Concepts

- [[concepts/survey-response-time-and-attentiveness|Survey Response Time and Attentiveness]]: timing is informative through both speed and variation across items.
- [[concepts/gaussian-mixture-models|Gaussian Mixture Models]]: provides probabilistic assignments with component-specific distributions.

## Related Papers

- Berinsky, Margolis, and Sances (2014), “Separating the Shirkers from the Workers?”: screener-based attentiveness assessment used as a benchmark in this paper.
- Oppenheimer, Meyvis, and Davidenko (2009), “Instructional Manipulation Checks”: an alternative that inserts explicit checks into the questionnaire.
- Greszki, Meyer, and Schoen (2015), “Exploring the Effects of Removing ‘Too Fast’ Responses and Respondents from Web Surveys”: represents the speed-focused approach extended by the slow-inattentive category.

Published in *Political Analysis* 30, 550–569 (2022); first published online September 15, 2021. [Article](https://doi.org/10.1017/pan.2021.32). [Replication data](https://doi.org/10.7910/DVN/6OGTHL).
