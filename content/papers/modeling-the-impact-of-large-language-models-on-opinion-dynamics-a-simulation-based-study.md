---
title: "Modeling the impact of large language models on opinion dynamics: A simulation-based study"
type: paper
authors:
  - Chao Li
  - Xing Su
  - Haoying Han
  - Cong Xue
  - Chunmo Zheng
  - Chao Fan
year: null
tags:
  - opinion-dynamics
  - agent-based-models
  - large-language-models
---

## TL;DR

An extension of bounded-confidence opinion dynamics represents LLM influence through a fixed scalar opinion and three user reliance strategies. In simulations, universal partial reliance yields mean opinion standard deviation 0.370 versus 0.267 without LLM use, a reported 38.6% increase; universal full reliance yields zero dispersion. These are outcomes of an abstract model, not measurements of human responses to deployed LLMs.

## Research Question

How do LLM output opinions, cognitive acceptability, and population reliance patterns affect opinion change, convergence, and fragmentation, and can added agents counter an extreme external opinion?

## Motivation

Peer influence models do not explicitly distinguish people who ignore LLMs, combine their outputs with social information, or adopt their outputs entirely. Modeling these strategies separately makes their collective consequences testable within a common simulation framework.

## Contributions

- Extends the Hegselmann–Krause family with LLM influence, degree-based authority, heterogeneous stubbornness, and random-event considerations.
- Compares opinion change, convergence time, standard deviation, and cluster counts over a systematic parameter grid.
- Tests interventions that introduce agents holding opposite, neutral, or random fixed opinions.

## Method

The model uses an Erdős–Rényi social network with scalar opinions in [-1, 1], initially uniform, and uniformly sampled stubbornness. A confidence threshold determines which neighboring opinions an agent accepts. Accepted neighbors are weighted by authority, defined as degree divided by the number of other agents; stubbornness determines the weight retained on the agent’s current opinion.

Nonusers (NIN) update from neighbors. Partial users (NINL) also include the LLM when its opinion falls within their confidence bound; the LLM has authority 1. Full users (NIL) simply adopt the LLM opinion at the next step. The LLM opinion is constant throughout a run. Thus the model studies an assumed influence mechanism without generating language or simulating adaptive conversation.

Convergence uses a change tolerance of 0.005. Final dispersion is measured by sample standard deviation; cluster counts use single-linkage hierarchical clustering with a cut at 0.2. The paper interprets one cluster as consensus and two as polarization, so the latter is an operational cluster definition.

## Experiments

The main sweep fixes 100 agents and 100 rounds after preliminary sensitivity comparisons with 300 agents or rounds. It evaluates 7,986 combinations of confidence threshold, the three population proportions, and LLM opinion, with 100 repetitions per combination (798,600 runs in this sweep). Confidence and proportions vary in increments of 0.1, and LLM opinion in increments of 0.2.

- **Reliance and dispersion:** Figure 5B averages 121 settings for each universal reliance strategy. Standard deviations are 0.370 for partial reliance, 0.267 for nonuse, and 0 for full reliance.
- **Opinion direction:** The LLM output value is positively associated with mean final-minus-initial opinion change. More full reliance generally accelerates collective convergence and reduces fragmentation; partial reliance generally sustains slower, more dispersed dynamics.
- **Distinct diversity measures:** Table 3 associates maximum cluster count with mean population proportions 0.23/0.71/0.06 (nonuse/partial/full), approximately the conclusion’s 4:12:1 ratio. Maximum standard deviation instead corresponds to 0.37/0.31/0.32. These summaries should not be conflated into one universally optimal diversity setting.
- **Intervention:** With LLM opinion fixed at -1, each round has probability 0.1 of adding two agents whose opinions remain fixed at +1, 0, or a random value in [-1, 1]. Each strategy is evaluated over 726 parameter settings with 100 repetitions. All improve mean opinion change relative to the original scenario; the paper reports no significant difference among the three approaches, but describes neutral and random additions as more robust because their outcome ranges are narrower.

## Limitations

The study lacks empirical validation against real opinion trajectories. Random network topology omits important community and small-world structure, reliance categories cannot change over time, and a common fixed LLM opinion excludes personalization and conversational feedback. Full-reliance consensus follows directly from the update rule. The practical costs and possible adverse effects of adding opinion sources are not tested. Policy and platform suggestions remain proposed applications rather than validated interventions.

Publication year and a stable identifier are not stated in the supplied Markdown; the year is left unknown rather than inferred from cited works.

## Related Concepts

- [[concepts/bounded-confidence-models|Bounded Confidence Models]] — confidence-gated averaging underlies the update rules.
- [[concepts/opinion-dynamics|Opinion Dynamics]] — separates opinion movement, convergence, dispersion, and fragmentation.

## Related Papers

- [[papers/public-opinion-dissemination-simulation-based-on-large-language-model-multi-agent-systems|Public opinion dissemination simulation based on large language model multi-agent systems]] — a related library study that actually combines LLM-generated text with probabilistic agent behavior; the present paper instead represents LLM influence numerically.

[[index|Library home]]
