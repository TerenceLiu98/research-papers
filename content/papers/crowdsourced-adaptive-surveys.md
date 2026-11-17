---
title: Crowdsourced Adaptive Surveys
type: paper
authors:
  - Yamil Ricardo Velez
year: 2025
doi: 10.1017/pan.2024.34
tags:
  - survey-methodology
  - public-opinion
  - adaptive-randomization
---

## TL;DR

Crowdsourced adaptive surveys combine language-model conversion of open-ended responses with a growing question bank and adaptive item selection. Applications to issue importance, Latino information environments, and local politics uncover participant-generated concerns beyond researcher-selected seed items. The method prioritizes high mean ratings; these indicate importance or perceived accuracy, not necessarily measurement quality or factual truth.

## Research Question

Can survey instruments evolve during fieldwork to discover and measure concerns and beliefs that researchers did not anticipate, while keeping the number of questions per respondent fixed?

## Motivation

Fixed questionnaires can miss emerging events and community-specific concerns. Computerized adaptive tests generally optimize measurement on established latent scales, while wiki surveys emphasize pairwise comparisons. This approach allows a changing item bank and ordinal or continuous ratings (Sections 1–2).

## Contributions

- Integrates participant-written content, automated structuring and filtering, and adaptive selection in one survey workflow.
- Uses Gaussian Thompson sampling to prioritize highly rated questions with respondent-level updates.
- Demonstrates discovery of personally important issues and political claims beyond initial researcher-provided batteries.
- Allows exploratory slots within conventional surveys and proposes using discoveries to construct later fixed instruments.

## Method

Participants submit open-ended responses that language models convert into structured items. Embedding similarity and relevance or toxicity filters control admission to the question bank. Participants rate their own submission and a fixed number of existing items. [[concepts/thompson-sampling|Thompson Sampling]] balances exploration with allocation toward items having high mean ratings; the applications use a Gaussian variant for rating outcomes (Section 2).

For issue importance, GPT-4 receives the five nearest existing items retrieved using 1,536-dimensional ada embeddings to avoid redundant topics. For the Latino application, an ada generation model fine-tuned on 87 hand-coded examples classifies whether submissions are falsifiable claims. An embedding similarity threshold above .90 excludes near-duplicates, and a moderation endpoint filters toxic content. Falsifiability screening does not establish whether a claim is true.

Figures 2 and 3 report inverse-probability-weighted estimates with 95% confidence intervals. Adaptive selection gives promising items more observations, so uncertainty differs across items. The supplied main text does not provide the supplementary estimator details.

## Experiments

| Application | Design | Reported findings |
| --- | --- | --- |
| Issue importance | CloudResearch Connect quota sample, N = 820, September 11–13, 2023; eight Gallup seed topics; own issue plus eight adaptive items; five-point personal-importance ratings | Economic and healthcare concerns rank highly. Mental health access, privacy protections, and candidate transparency emerge beyond broad seed categories. Figure 2 includes items with at least 50 ratings. |
| Latino information environments | 319 self-identified U.S. Latinos, July 6–7, 2023; four fact-checking seed claims; own submission, four bank items, and six fixed items; four-point perceived-accuracy ratings | Highly rated claims often concern actual events or party stereotypes; the author reports lower ratings for objectively false claims. Figure 3 includes claims with more than ten ratings. |
| Local politics | Additional application summarized in Section 6 and attributed to Appendix K | Participants raise immigration, gun policy, Gaza, and environmental concerns, showing that nominally national issues also appear in local agendas. Sample details are absent from the supplied main text. |

In the Latino study, the claim about a major explosion near the White House receives a mean perceived-accuracy rating of 1.50 (SE .15), whereas the claim that Trump held classified documents in vacation homes receives 3.43 (SE .12). These are respondents' ratings, not automated fact-checking outputs. Participant-generated claims, rather than the small seed set from fact-checkers, include the most readily believed items (Section 5).

## Limitations

- Convenience samples and quota balancing do not establish population representativeness.
- Maximizing mean ratings can undersample low-prevalence concerns or traits. The paper suggests uniform bank sampling when broad coverage matters more than finding highly rated items.
- Late-arriving items have less opportunity to accumulate evidence. Prompt design, redundancy filtering, and toxicity handling influence what enters the bank.
- The author reports no detected demographic drift in this study; contextual or deconfounded bandits are proposed extensions, not evaluated solutions here.
- Exploratory discovery should be distinguished from confirmatory measurement. The paper suggests later fixed batteries and preregistration across phases.
- Supplementary appendices referenced in the main text are not included in the supplied Markdown. Detailed local-study results and supplementary comparisons cannot be reconstructed from it.

## Related Concepts

- [[concepts/thompson-sampling|Thompson Sampling]]: adaptive allocation over an expanding set of survey items.
- [[concepts/voter-issue-salience|Voter Issue Salience]]: distinguishes personal importance ratings from naming a national problem.

## Related Papers

- Salganik and Levy (2015), “Wiki Surveys: Open and Quantifiable Social Data Collection”: the cited participatory-survey precedent, using pairwise comparisons.
- Montgomery and Cutler (2013), “Computerized Adaptive Testing for Public Opinion Surveys”: the cited approach to efficient latent-trait measurement with existing scales.
- [[papers/adaptive-randomization-in-conjoint-survey-experiments|Adaptive Randomization in Conjoint Survey Experiments]]: a library comparison using Thompson sampling to search fixed experimental contexts and independently validate selected extremes. CSAS instead expands a participant-generated question bank; this later paper is not a citation in the source.
