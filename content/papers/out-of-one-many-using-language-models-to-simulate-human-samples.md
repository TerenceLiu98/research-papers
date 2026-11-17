---
title: "Out of One, Many: Using Language Models to Simulate Human Samples"
type: paper
authors:
  - Lisa P. Argyle
  - Ethan C. Busby
  - Nancy Fulda
  - Joshua R. Gubler
  - Christopher Rytting
  - David Wingate
year: 2023
doi: 10.1017/pan.2023.2
tags:
  - social-simulation
  - public-opinion
  - simulation-validity
---

## TL;DR

Conditioning GPT-3 on real survey respondents’ demographic and political backstories produces synthetic samples that reproduce several patterns in U.S. public opinion. Three studies support domain-specific algorithmic fidelity, with strong overall vote-choice correspondence but substantial failures for pure independents.

## Research Question

Can a language model reproduce subgroup-specific human response distributions and relationships among attitudes, demographics, and behavior?

## Motivation

Generic model outputs reflect the demographic composition of training text rather than a chosen population. Conditioning on backstories sampled from human surveys offers a way to change that composition while testing whether the model captures the relevant conditional responses.

## Contributions

- Defines [[concepts/algorithmic-fidelity|Algorithmic Fidelity]] through four complementary criteria.
- Introduces [[concepts/silicon-sampling|Silicon Sampling]] using first-person survey-derived backstories.
- Evaluates free-text partisan descriptions, presidential vote choices, and associations among closed-ended survey answers.
- Proposes validated synthetic samples as tools for hypothesis generation, questionnaire piloting, and study design.

## Method

Silicon sampling combines model-generated responses conditional on a backstory with an externally supplied distribution of backstories. Correcting population composition works only insofar as the model’s conditional response distributions are accurate (Section 4).

The four fidelity criteria are human–model text indistinguishability, backward continuity (responses reveal their conditioning background), forward continuity (responses naturally follow the context), and pattern correspondence (human-like associations among variables). The authors prescribe repeated evidence across measures and groups rather than universal numerical thresholds.

Study 1 generates partisan four-word descriptions from respondent profiles. Study 2 conditions on demographics and political characteristics, including ideology and party identification, and obtains candidate-completion probabilities; probabilities above 0.50 become Republican vote predictions. Study 3 uses an interview format, supplying 11 actual ANES answers to predict a twelfth and comparing Cramér’s V associations.

## Experiments

**Partisan descriptions:** 2,873 Lucid evaluators assessed 7,675 human and GPT-3 texts. Human texts were labeled human-generated 61.7% of the time versus 61.2% for model texts (p = 0.44). Writer partisanship was inferred correctly for 59.5% of human texts and 52.2% of model texts; both exceeded one-third chance, but the gap was significant (p < 0.001).

**Vote choice:** Using 2012, 2016, and 2020 ANES profiles, whole-sample tetrachoric correlations were 0.90, 0.92, and 0.94, with agreement of 0.85, 0.87, and 0.89. Reported mean Republican probabilities were 0.391, 0.432, and 0.472 versus human proportions of 0.404, 0.477, and 0.412. For pure independents, correlations fell to 0.31, 0.41, and 0.02, respectively (Table 1).

**Survey associations:** For 2016 ANES items, the reported mean difference between human and GPT-3 Cramér’s V values was 0.026 (Figure 4). This evaluates relationships between supplied human answers and a generated held-out answer, rather than a wholly synthetic joint survey.

## Limitations

Evidence concerns GPT-3 and U.S. politics; transfer to other populations, domains, and models requires validation. Supplying real political attitudes provides substantial predictive information, so these results do not establish prediction from demographics alone. Strong correlations coexist with aggregate vote-share discrepancies and poor performance among independents. The method targets distributions rather than faithful replicas of specific individuals, and stochastic samples vary. The paper does not establish causal effects or universal fidelity thresholds. It also identifies risks of manipulation and targeted misinformation.

## Related Concepts

- [[concepts/algorithmic-fidelity|Algorithmic Fidelity]] defines the validation target.
- [[concepts/silicon-sampling|Silicon Sampling]] defines the population-construction procedure.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] connects domain-specific validation to permissible claims.

## Related Papers

- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] provides a complementary framework emphasizing behavioral variance and scope of inference.

Published in *Political Analysis* 31, 337–351. [Paper](https://doi.org/10.1017/pan.2023.2). [Replication data and code](https://doi.org/10.7910/DVN/JPV20K).
