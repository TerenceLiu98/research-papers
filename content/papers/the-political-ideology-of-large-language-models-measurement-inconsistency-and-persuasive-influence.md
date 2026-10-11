---
title: "The Political Ideology of Large Language Models: Measurement, Inconsistency, and Persuasive Influence"
type: paper
authors:
  - Nouar Aldahoul
  - Hazem Ibrahim
  - Aaron R. Kaufman
  - Talal Rahwan
  - Yasir Zaki
year: null
source_job_id: "0e5292b2-5f50-4d4a-ac07-8a1c0397b56d"
tags:
  - political-ideology
  - llm-evaluation
  - political-persuasion
  - survey-experiments
---

## TL;DR

Across a roster of 43 LLMs, measured political positions depend on the role, issue, and human comparison group; moderate aggregate scores can conceal opposing partisan positions. In a preregistered experiment with 1,523 U.S. participants, the reported pooled effect on immediate policy alignment is +3.5 percentage points, driven by explicitly steered advocacy. Unsteered conversations show no detectable influence (-0.2 points), with a confidence interval excluding the registered smallest meaningful contrast. Expressed ideology and persuasive effects are distinct empirical outcomes.

## Research Question

How do LLMs' expressed positions compare with those of U.S. legislators, Supreme Court justices, and voters, how do positions vary across issues, and does interacting with these models change users' policy attitudes?

## Motivation

A single left-right score can conflate centrism with a mixture of opposing positions. Moreover, finding partisan content does not establish that users adopt it. The paper connects [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]] to a randomized test of [[concepts/llm-political-persuasion|LLM Political Persuasion]], distinguishing natural discussion from advocacy induced by a system prompt.

## Contributions

- Joint scaling of LLM answers and human responses across legislative, judicial, and survey settings, plus issue-specific comparisons.
- Prompt-framing, response-order, and repeated-response checks; a three-family base-versus-instruct comparison.
- An analysis of ideological framing when real user questions are replayed across models.
- A held-out, preregistered persuasion experiment separating advocacy direction from steering strength, with multiplicity correction and futility stopping.
- A survey platform for randomized chatbot interactions and conversation logging, described alongside replication resources in the supplied manuscript.

## Method

### Measuring Expressed Positions

Models answer as a legislator, justice, or voter. The legislative analysis combines 1,221 roll calls with 1,327 legislators from the 110th-119th Congresses and uses two-dimensional W-NOMINATE. The judicial matrix contains 16 justices and 40 LLMs over 1,749 cases, with Bayesian one-dimensional [[concepts/item-response-theory|Item Response Theory]] and pairwise vote agreement. Human vote records cover 1,444 cases; the remaining 305 lack recorded per-justice votes. Displayed samples vary after exclusions.

The voter analysis uses 46 CES 2022 policy items and 60,000 respondents, comparing LLM and demographic-group scores using PCA; its first component explains 32% of response variation. CES 2024 provides an additional analysis, although its item count is inconsistent across the supplied sections. Issue-level scores are normalized against average strong Democrats and strong Republicans. These scales describe conditional responses, not internal beliefs or a universal political-neutrality baseline.

Consistency measures include variance of conservative-coded binary answers and inverse posterior standard error from a 2PL model. These are the authors' operational measures, not interchangeable definitions of ideological coherence. Five alternative prompt framings retain refusals as a third response class. The base/instruct comparison uses Falcon 3, Llama 3.1 70B, and Qwen 2.5 7B, aggregating five repetitions under each of two answer orderings.

### Naturalistic Questions

From 42,300 U.S. WildChat conversations, an LLM classifier flags 1,493 as political; restricting conversation length yields 1,019 opening political questions. Five alternative models answer these questions. Three LLM judges classify and rank their responses alongside the original GPT-3.5/4 answer, with anonymized, shuffled labels. The complete-judge subset contains 883 conversations. This measures generated framing, not effects on the original users.

### Persuasion Experiment

Each participant considers gun control, immigration, policing, and taxes in randomized order, with one of two proposals per topic. Independent topic-level assignment selects one of six conditions: liberal or conservative model direction crossed with explicit or unsteered advocacy, a balanced neutral chat, or no conversation. Topic-specific model selection follows the scaling exercise. Steering strength changes the system prompt while retaining the model; "base" here means an unsteered conversational condition, not a pretrained base checkpoint. Participants see neither model identity nor assigned direction and record Support/Oppose after a timed three-minute chat or directly in control.

The primary intention-to-treat analysis includes 1,523 participants and 6,072 topic-slots, retaining 391 silent chat-slots. Mixed-effects logistic regression includes respondent random intercepts, proposal fixed effects within topic, and preregistered covariates. The paper reports toward-advocated contrasts comparing conservative- and liberal-pole conditions, with odds ratios and average marginal effects. Table 2 specifies a conservative-coded outcome, so an individual liberal-arm odds ratio below one denotes movement in the advocated direction.

H1-H3 receive Holm correction; moderator tests use three separate Benjamini-Hochberg families of six. Recruitment stops at the 1,500-participant look under a futility-only rule for the unsteered contrast, below the planned maximum of 2,000. Outcomes are post-treatment policy choices, not individual pre/post change scores.

## Experiments

### Ideology and Robustness

- **Comparison group matters:** Models span much of the legislative partisan interval, but all included models have Democratic-side scores in the CES 2022 PCA. Issue-level estimates reveal strongly liberal and conservative positions within individual models.
- **Consistency depends on the setting:** The detailed CES results report mean LLM response variance 0.60, close to strong partisans (0.61) and below the median voter (about 0.79). Legislative and judicial analyses instead report more switching across party positions among models than within-party defection among humans; the coding differs between these groups.
- **Framing sensitivity:** Among 33 models meeting answer-coverage criteria under every variation, average Cohen's kappa is 0.765 for voter rewordings, 0.717 without role-play, and 0.621 when addressed as an LLM (Supplementary Table 3). Some excluded models refuse extensively under alternative framings, so these averages do not describe all 43 models.
- **Training-stage comparison:** All three instruction-tuned variants move leftward relative to their corresponding base checkpoints on both CES scales. This is evidence about the selected variants; it does not separately identify the effects of supervised tuning, RLHF, or particular preference datasets.
- **Conversational framing:** In Table 1, net liberal classification is +6.3 points for original GPT responses and ranges from +7.1 for Grok to +23.5 for Mistral among alternatives. Average pairwise judge kappa is 0.38. The table's values take precedence here over inconsistent prose about the range.

### Confirmatory Persuasion Results

| Contrast | Odds ratio [95% CI] | Average marginal effect, percentage points | Reported p |
| --- | --- | ---: | --- |
| H1: Pooled persuasion | 1.48 [1.28, 1.72] | +3.5 | < .0001 |
| H2: Unsteered / informational | 0.98 [0.82, 1.17] | -0.2 | .829 |
| H3: Explicit minus unsteered | 3.36 [2.46, 4.61] | +10.6 | < .0001 |

Table 2 and the accompanying text report that H1 and H3 remain significant after Holm correction. Both explicit directions move responses toward the advocated side: conservative-explicit OR 2.16 and liberal-explicit OR 0.65 on the conservative-coded outcome. The unsteered interval excludes the registered meaningful contrast of approximately 1.56 (derived from a per-arm OR of 1.25), rather than establishing exactly zero influence.

Per-protocol estimates, after excluding silent slots, are 1.58, 1.02, and 3.66 for H1-H3, respectively. Separate neutral-only and control-only baselines preserve the conclusions (Supplementary Table 15). Exploratory topic estimates are strongest for taxes; policing is not statistically significant. No trust, familiarity, perceived-neutrality, political-interest, or news-breadth moderator survives correction. Out-partisanship survives only in the pooled analysis (OR 0.51; adjusted p = .037), with less movement when advocacy opposes the participant's party; the authors flag this reversal from the pilot for replication.

## Limitations

- The experiment measures immediate policy alignment after short conversations on four U.S. topics. It does not establish durable attitude change, electoral effects, or cumulative influence from everyday use. Campaign-advertising comparisons involve different outcomes and are only magnitude benchmarks.
- Role prompts, item selection, refusal handling, model versions, and human reference groups condition the ideology estimates. Binary answer variance measures the mixture of conservative and liberal choices, not psychological inconsistency; inverse IRT standard error also depends on test information and latent position.
- The introduction describes inconsistency near the median voter, whereas the detailed CES results put the LLM mean near strong partisans. The source also alternates between 46 items per CES year, 92 combined items, and 40 CES 2024 items in a supplementary caption. These discrepancies remain unresolved.
- Naturalistic response labels rely on LLM judges with modest agreement. Despite a claim that judging laboratories are absent from the generation panel, Anthropic and Mistral appear in both. Table 1 also contradicts prose calling Grok the least neutral model: Mistral's neutral share is 64.4%, versus Grok's 66.2%.
- A nonsignificant neutral-versus-control difference (OR 1.03, 90% CI [0.84, 1.27]) does not alone establish the preregistered equivalence claim; the supplied results do not report the equivalence bounds or test. The steering manipulation argues against a pure user-mirroring account, but does not identify every conversational mechanism.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for this manuscript. `year` is therefore left null. Model lists and version references contain inconsistencies; the text's anonymous replication resource and survey toolkit were not independently inspected or executed.

## Related Concepts

- [[concepts/role-conditioned-llm-ideology|Role-Conditioned LLM Ideology]]: expressed positions depend on elicitation context.
- [[concepts/llm-political-persuasion|LLM Political Persuasion]]: randomized evidence separates advocacy from naturally expressed positions.
- [[concepts/item-response-theory|Item Response Theory]]: latent scaling of judicial and survey responses.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: aggregate scales can obscure issue-specific differences.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: judges supply the naturalistic-conversation classifications.

## Related Papers

- Rozado (2024), "The political preferences of LLMs": cited questionnaire-based audit (reference 15).
- Clinton, Jackman, and Rivers (2004), "The statistical analysis of roll call data": cited foundation for political scaling (reference 32).
- Costello, Pennycook, and Rand (2024), "Durably reducing conspiracy beliefs through dialogues with AI": cited evidence on a different persuasion setting and persistence outcome (reference 47).
- Related Wiki reading, not a claimed citation: [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]] formally models domain-specific positions on a shared scale; the present study uses separate role and issue comparisons.
- Related Wiki reading, not a claimed citation: [[papers/source-framing-triggers-systematic-bias-in-large-language-models|Source framing triggers systematic bias in large language models]] tests context-dependent model judgments, rather than human attitude change.

[[index|Library home]]
