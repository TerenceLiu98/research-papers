---
title: Evaluating Player Actions in Professional Counter Strike using Temporal Heterogeneous Graph Neural Networks
type: paper
authors: []
year: null
paper_id: "20251422"
source_job_id: "fd70f8bb-d9cd-476e-9cbe-acb48a28999a"
tags:
  - esports-analytics
  - graph-neural-networks
  - feature-attribution
---

[[index|Library home]]

## TL;DR

A temporal heterogeneous graph neural network predicts Counter-Strike 2 round outcomes from player states and map structure, reporting accuracy above 76% and AUC 0.8549. Round-specific ridge surrogates and SHAP then attribute changes in predicted win probability to events, including eliminations and utility usage. These are explanations of model predictions, rather than established causal action values.

The supplied manuscript identifies itself as “Other Sports Paper ID: 20251422” but provides no author list or explicit publication year; these metadata remain unspecified.

## Research Question

Can spatial and temporal representations of Counter-Strike game states support context-sensitive evaluation of player actions, including actions that cause no damage?

## Motivation

Damage-based statistics omit positioning, grenade use, and other tactical contributions. Identical events can also carry different significance depending on equipment, map control, and time remaining. Predicting round-winning probabilities provides a common scale on which to examine these differences.

## Contributions

- A heterogeneous graph representation combining player features with an expert-assisted map graph.
- A temporal graph classifier producing snapshot-level round-win probabilities.
- A multiscale event explanation procedure using ridge regression and Shapley attribution.
- Case studies illustrating opening kills, defuse attempts, and grenade exchanges.

## Method

The dataset contains 114 professional Inferno matches from S-tier tournaments between October 2023 and September 2024. Replay states sampled at 4 Hz become graphs with map and player node types. Map nodes represent areas roughly sized to smoke-grenade coverage, with traversability edges and additional engagement locations identified through elimination clustering and expert correction. Player nodes contain over 160 features, connect to their nearest map node, and have self-loops. Global features include time, bomb state, and team aggregates.

Twenty snapshots form a five-second dynamic graph; additional windows offset by 2.5 seconds yield approximately 90,000 examples. The selected architecture applies two heterogeneous attention layers, each ordered as player self-loop processing, player-to-map propagation, and map-to-map propagation, followed by three further map convolution layers. Separate GraphGRU modules model the two node types over time; flattened representations and dense layers produce defender-win predictions.

For each analyzed round, event tables encode state changes over consecutive snapshots and over one- through five-second intervals. Ridge regressions with regularization parameter 0.1 intentionally fit these local tables closely to explain predicted probability changes. SHAP values are filtered to remove unchanged-feature contributions and contributions more than two seconds after a player's death, then aggregated across intervals. Equation 4.3 scales an action's signed attribution by the sum of absolute feature attributions and multiplies it by the probability change.

## Experiments

Reported results from Table 3.1:

| Model | Log-loss | F1 | AUC |
| --- | ---: | ---: | ---: |
| Random baseline | 0.693 | 0.5 | 0.5 |
| Logistic regression | 0.4688 | 0.7387 | 0.7564 |
| XGBoost | 0.5353 | Not reported | 0.7913 |
| Proposed THGNN | 0.4587 | 0.7463 | 0.8549 |

The manuscript reports accuracy exceeding 76% and describes favorable calibration, but its text supplies no numerical ECE. The tabular comparators predict individual snapshots without temporal history.

Illustrative opening kills change estimated win probabilities by approximately 15–30 percentage points across contexts. A defuse start produces a reported 25-point increase, while an incendiary retrieval and selection produces nearly five points. These examples demonstrate the model's behavior; they do not measure the benefit of deploying its recommendations.

## Limitations

- Evidence is restricted to Inferno and the collected professional matches; cross-map transfer is not established.
- The supplied text does not specify train/test splitting, uncertainty intervals, or ablations separating temporal history from graph structure. Overlapping windows make separation by match or round especially relevant.
- Local surrogate fidelity and attribution accuracy are not quantitatively evaluated. Filtering and averaging SHAP values introduce domain assumptions, and correlated state changes complicate action-level credit.
- As a mathematical caveat, the signed normalization in Equation 4.3 does not generally guarantee that action values sum to the observed probability change when attributions have mixed signs; a zero denominator is also unspecified.
- Case-study interpretation and broadcast agreement do not establish causal effects or improvements in coaching outcomes.

## Related Concepts

- [[concepts/shap-feature-attribution|SHAP Feature Attribution]]: explains the fitted round-specific surrogate's probability-change predictions.
- [[concepts/probability-calibration|Probability Calibration]]: essential when interpreting prediction differences as changes in winning chances.

## Related Papers

- Xenopoulos, Doraiswamy, and Silva (2020), *Valuing Player Actions in Counterstrike: Global Offensive*: the manuscript's principal predecessor, using tabular XGBoost predictions and damage-based Win Probability Added.
- Seo et al. (2016), *Structured Sequence Modeling with Graph Convolutional Recurrent Networks*: cited foundation for graph recurrent processing.
- Lundberg and Lee (2017), *A Unified Approach to Interpreting Model Predictions*: cited basis for SHAP attribution.
