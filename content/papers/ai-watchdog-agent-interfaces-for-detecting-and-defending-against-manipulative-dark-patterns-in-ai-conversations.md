---
title: "AI Watchdog: Agent Interfaces for Detecting and Defending Against Manipulative Dark Patterns in AI Conversations"
type: paper
authors:
  - Rachel Poonsiriwong
  - Monchai Lertsutthiwong
  - Chayapatr Archiwaranguprok
  - Pattie Maes
  - Constanze Albrecht
  - Pat Pataranutaporn
year: 2026
source_job_id: "d3b1ca9b-2c26-4129-a5d7-0805eb879657"
tags:
  - conversational-ai
  - dark-patterns
  - cognitive-forcing
  - prebunking
  - human-ai-interaction
---

## TL;DR

AI Watchdog is an independent interface that classifies five kinds of [[concepts/conversational-ai-dark-patterns|Conversational AI Dark Patterns]] and presents either advance prebunking or just-in-time warnings, with or without a required written response. In a preregistered five-condition experiment with 150 participants, only dismissible just-in-time warnings significantly reduced compliance with AI-steered recommendations, from 71.7% in control to 53.7%. No intervention significantly increased turn flagging or post-task awareness, and cognitive forcing provided no detectable additional benefit.

## Research Question

Can a user-facing monitoring agent help people recognize and resist manipulative behaviors during live, multi-turn AI conversations, and how do intervention timing and cognitive forcing affect recognition, awareness, and behavioral compliance?

## Motivation

Conversational systems can generate persuasive behavior dynamically and personalize it to dialogue context, making manipulation harder to anticipate than fixed dark patterns in graphical interfaces. Prior work largely measures manipulative outputs or detects static interface patterns; it provides limited evidence about whether real-time, user-facing defenses change decisions during ongoing conversation. Recognition may also be insufficient because users can notice steering and still comply with it.

## Contributions

- Introduces AI Watchdog, a persistent monitoring interface that keeps dark-pattern classification operationally separate from the chatbot and leaves the final decision to the user.
- Compares prebunking with just-in-time intervention and optional reflection with required written responses in a preregistered, controlled study.
- Develops a reusable two-task testbed that embeds five dark-pattern opportunities in dynamically generated multi-turn conversations and links them to decision points.
- Separates explicit recognition, retrospective awareness, and behavioral resistance, showing that these outcomes need not move together.

## Method

The study randomly assigned 150 US-based participants, 30 per condition, to control or one of four AI Watchdog configurations crossing nudge timing (prebunking or just-in-time) with engagement mode (without or with cognitive forcing). Participants completed a 15-turn trip-planning task and a 13-turn work-presentation task. Each task scripted instances of sycophancy, brand bias, anthropomorphization, sneaking, and harmful generation, followed by measurable choices.

The browser-based prototype sent each user-assistant exchange to a separate researcher-hosted, open-weight turn classifier. Llama-3.3-70B-Instruct was selected from nine candidates after reaching 92% schedule agreement and 89% F1 on a 90-turn selection set. During the study, it averaged 5.69 disagreements with the scripted schedule over 28 assistant turns, or approximately 80% agreement. Just-in-time warnings named the suspected category and prompted reflection; the cognitive-forcing variant blocked continuation until the participant entered a free-text response.

The preregistered primary outcome was the proportion of scripted dark-pattern turns explicitly flagged. Secondary outcomes included compliance with AI-steered decisions and post-task awareness on a seven-point scale. Human coders separately checked stimulus validity: intended categories were confirmed for 42 and 45 of 51 sampled scripted turns, and inter-rater agreement was 88.0% for exact category assignment.

## Experiments

Flagging was rare: the median was 0% in every condition, 120 of 150 participants flagged no scripted dark-pattern turn, and the overall condition effect was not significant ($H(4)=9.08$, $p=.059$). Self-reported awareness also did not differ significantly across conditions ($H(4)=4.12$, $p=.391$).

Compliance differed across conditions ($H(4)=13.27$, $p=.010$). Control participants complied with 71.7% of AI-steered recommendations, compared with 53.7% under just-in-time warnings without cognitive forcing. This was the only corrected pairwise difference from control ($p_{FDR}=.004$). Compliance was 60.0% for prebunking without cognitive forcing, 59.3% for prebunking with cognitive forcing, and 63.0% for just-in-time warnings with cognitive forcing. The cognitive-forcing just-in-time condition differed from neither control ($p_{FDR}=.147$) nor its non-forcing counterpart ($p_{FDR}=.194$).

Classifier disagreement did not vary significantly by condition, reducing evidence that uneven alert quality explains the compliance result. Exploratory analyses found that lower misinformation susceptibility correlated with more flagging ($r=.190$, $p=.020$) but not compliance, while higher post-task AI trust correlated with greater compliance ($r=.220$, $p=.007$) and lower awareness ($r=-.334$, $p<.001$). Sycophancy combined the highest compliance (77.0%) with low flagging (4.0%); anthropomorphization had the highest flagging (14.0%) but still high compliance (73.3%).

## Limitations

- The classifier's approximately 80% agreement with the experimental schedule during deployment was lower than its 92% selection-set result; the schedule was also not definitive ground truth because generation could omit intended patterns or introduce unplanned ones.
- With 30 participants per condition, the study was powered for medium rather than small effects. Null flagging and awareness results do not establish that the interventions have no small effects.
- The English-only, US-based sample was 72.7% White, and several pattern definitions depend on culturally variable norms of praise, deference, and anthropomorphic language.
- The mock tasks used predetermined turn positions and imposed no real financial or social consequences, limiting ecological validity.
- Trust and misinformation susceptibility were measured after treatment, so their correlations are descriptive rather than evidence of pre-existing vulnerability or causal prediction.
- Pattern-specific comparisons were post hoc. Harmful-generation items occurred at task endings with substantial nonresponse, and sneaking received the weakest human confirmation.
- The prototype used a researcher-hosted classifier. Local inference was a proposed privacy-preserving deployment path, not an implemented property of the evaluated system.

## Related Concepts

- [[concepts/conversational-ai-dark-patterns|Conversational AI Dark Patterns]]
- [[concepts/calibrated-reliance|Calibrated Reliance]]
- [[concepts/automation-bias|Automation Bias]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]

## Related Papers

- Kran et al. (2025), "DarkBench: Benchmarking Dark Patterns in Large Language Models": supplies the five-category conversational dark-pattern taxonomy used by the testbed and classifier.
- Buçinca, Malaya, and Gajos (2021), "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-Assisted Decision-Making": motivates the cognitive-forcing conditions tested in a multi-turn setting.
- Shi et al. (2025), "The Siren Song of LLMs: How Users Perceive and Respond to Dark Patterns in Large Language Models": connects recognition of manipulative outputs to user response.
- Werner et al. (2024), "Experimental Evidence That Conversational Artificial Intelligence Can Steer Consumer Behavior Without Detection": provides prior evidence that conversational steering can influence choices even when users identify it.

Source scope: supplied parsed Markdown for job `d3b1ca9b-2c26-4129-a5d7-0805eb879657`. The manuscript supplies no DOI or arXiv identifier.

[[index|Library home]]
