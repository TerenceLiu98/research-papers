---
title: How government-controlled media shifts policy attitudes through framing
type: paper
authors:
  - Jennifer Pan
  - Zijie Shao
  - Yiqing Xu
year: 2021
doi: 10.1017/psrm.2021.35
tags:
  - political-framing
  - authoritarian-media
  - survey-experiments
  - china
---

[[index|Library home]]

## TL;DR

An online survey experiment with 830 respondents in China finds that realistic state-television news segments move domestic and foreign policy attitudes toward opposing positions by emphasizing different issue attributes. Effects appear in direct choices and composite indices, with no apparent moderation by measured predispositions and some persistence after 48 hours. The experiment tests alternative frames across respondents, rather than successive policy reversals within the same audience.

## Research Question

Can government-controlled media shift public attitudes toward opposing policy positions by changing how an issue is framed, and do predispositions or political knowledge constrain those effects?

## Motivation

Authoritarian governments sometimes reverse policy, creating a need to redirect attitudes previously encouraged by state media. Prior beliefs and source credibility could limit this influence. Conversely, control over competing messages may prevent audiences from connecting their predispositions to a new policy position. [[concepts/issue-framing-effects|Issue Framing Effects]] provide a mechanism: changing the weight attached to attributes such as efficiency or public welfare can change a policy evaluation without changing the evaluation of each attribute itself.

## Contributions

- Tests opposing frames for both state-owned enterprise (SOE) reform and China-Philippines relations using professionally produced videos resembling CCTV's Xinwen Lianbo.
- Measures effects on explicit policy choices and related policy indices, alongside heterogeneity by pretreatment predispositions and political knowledge.
- Examines short-term persistence and broader outcomes, finding issue-specific attitude effects but no evidence of effects on regime trust, patriotism, or the measured self-reported political behaviors.

## Method

The quota sample includes 830 respondents from 26 Chinese provinces and varies in gender, age, and education; it is not nationally representative. Each respondent watches one roughly two-minute video about SOE reform and one about China-Philippines relations. Assignment is independent across issues, and video order is randomized.

| Issue | Frame supporting one position | Opposing frame | Control |
| --- | --- | --- | --- |
| SOE reform | Market competition improves efficiency | State-led reform serves public welfare | Background facts without a stated state position |
| China-Philippines relations | Cooperation advances mutual prosperity | Hawkish policy defends territorial sovereignty | Background facts without a stated state position |

Scripts draw on original state broadcasts. Each issue uses the same academic interviewee across its conditions, with professional voiceovers and Chinese captions. Before treatment, two seven-item additive indices measure economic and sovereignty predispositions. After each video, manipulation checks precede a three-category policy choice and a nine-item composite policy index. Four factual questions measure political knowledge later in the survey.

Regressions include individual characteristics and provincial fixed effects. Kernel-based interaction estimates examine moderation. A follow-up survey measures attitudes 48 hours later (Sections 3-4).

## Experiments

### Immediate policy effects

The following approximate effects compare each frame with its issue-specific control. Higher scores indicate more market-oriented or more cooperative preferences; direct outcomes use a 1-3 scale and composite outcomes are standardized (Section 4, Figures 2-3).

| Treatment | Direct preference change | Composite index change |
| --- | ---: | ---: |
| Market | +0.30 points | +0.30 SD |
| State | -0.30 points | -0.20 SD |
| Dove | +0.15 points | +0.19 SD |
| Hawk | -0.30 points | -0.26 SD |

Both foreign-policy treatments also shift SOE preferences toward state-led reform relative to the foreign-policy control. The authors suggest that foreign-policy messages make the state's role in national interests salient. SOE treatments do not appear to affect foreign-policy preferences.

### Moderation and robustness

Frames shift preferences across measured predispositions, which themselves remain associated with posttreatment attitudes. After controlling for predisposition, political knowledge sometimes strengthens effects, particularly for the State and Dove frames. These findings do not establish identical effects for every subgroup.

Results remain substantively similar when restricting to respondents who identify CCTV as the source, pass response-quality checks, answer factual checks correctly, or endorse the relevant policy as correct. The age-consistency and speed checks retain 762 of 830 respondents. There is no evidence of treatment effects on the measured patriotism, nationalism, efficacy, central or local government trust, or self-reported political behavior outcomes.

### Persistence

The follow-up reaches 353 of 556 respondents targeted for recontact, a 63% rate. Policy preferences retain the expected directional pattern. Permutation tests reject sharp nulls for State versus Control and Market versus State on SOE outcomes, and Dove versus Hawk on foreign-policy outcomes. The reported p-values are 0.001, 0.000 (as rounded in the source), and 0.012. This supports persistence for some contrasts and respondents through 48 hours, rather than establishing persistence for every treatment-control comparison.

## Limitations

- The nonrepresentative online sample and two policy domains limit population and issue generalization.
- Each respondent receives only one frame per issue. The study does not directly test repeated reversals, accumulated exposure, or credibility loss after visible inconsistency.
- Single-frame exposure approximates a consensus information environment. Media control and access to competing frames are not experimentally varied, so the proposed mainstream-consensus mechanism is an interpretation rather than an independently identified effect.
- The authors cannot fully exclude learning, social desirability, or demand effects. Familiar issues and indirect policy measures support their framing interpretation but do not isolate it conclusively.
- Follow-up attrition and limited statistical power constrain persistence claims; outcomes beyond 48 hours are not measured.
- The supplied Markdown references appendix tables and transcripts but does not include the appendix. Detailed specifications and supplementary results are summarized only to the extent reported in the main text. The year above is the stated first-online publication year.

## Related Concepts

- [[concepts/issue-framing-effects|Issue Framing Effects]]: changing the relative salience of policy attributes can redirect attitudes.
- [[concepts/frame-specific-ideal-points|Frame-Specific Ideal Points]]: a related measurement approach connecting rhetorical frames to political positions; it does not itself identify framing effects on audiences.
- [[concepts/llm-political-persuasion|LLM Political Persuasion]]: a different communication setting sharing the need to distinguish immediate attitude change, persistence, and moderator evidence.

## Related Papers

- Chong and Druckman (2007), "Framing theory": cited framework for attribute availability, accessibility, and applicability.
- Druckman and Nelson (2003), "Framing and deliberation: How citizens' conversations limit elite influence": cited account of knowledge and predisposition as distinct influences on framing susceptibility.
- Geddes and Zaller (1989), "Sources of popular support for authoritarian regimes": cited basis for the mainstream-consensus argument.
- Related Wiki reading, not a claimed citation: [[papers/tea-party-in-the-house-a-hierarchical-ideal-point-topic-model-and-its-application-to-republican-legislators-in-the-112th-congress|Tea Party in the House]] models framing differences among legislators, whereas this study estimates audience responses to assigned frames.
