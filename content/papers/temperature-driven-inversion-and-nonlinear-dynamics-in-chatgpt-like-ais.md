---
title: Temperature-driven inversion and nonlinear dynamics in ChatGPT-like AIs
type: paper
authors:
  - Neil F. Johnson
  - Frank Yingjie Huo
  - Bella Li
year: null
source_job_id: "4543abd0-402f-4229-979f-2e8aefbbfda4"
tags:
  - transformer-dynamics
  - text-generation
  - model-steering
---

## TL;DR

Across 12,000 continuations from 11 language models, increasing decoder temperature shifts outputs from recurrent to complex/noisy regimes. The entropy of this binary population split peaks at equal occupation and then falls. A learned hidden direction in Llama-3.1-70B predicts repetition on held-out trajectories and permits interventions that change it.

## Research Question

How does decoder temperature reorganize autoregressive output regimes, and can a measurable internal coordinate predict and influence repetition?

## Motivation

Temperature broadens next-token probabilities at fixed context, but sampled tokens also change future contexts. This feedback motivates studying complete trajectories and internal dynamics alongside local sampling entropy.

## Contributions

- Reports a cross-model transfer through equal occupation of recurrent and complex/noisy output sectors.
- Connects prompt-dependent frozen, periodic, intermittent, and noisy regimes to a common population description.
- Constructs a repetition-associated hidden coordinate using training trajectories, tests its predictive value on separate seeds, and evaluates causal steering with orthogonal controls.

## Method

The survey uses four GPT-2 sizes, six Pythia sizes, and Llama-3.1-70B, five fixed prompts, and continuations of up to 300 tokens. Character 3–5-gram TF–IDF sentence similarities define symbolic recurrence trajectories. Fixed rules classify frozen, sparse, periodic, intermittent, complex, and noisy outputs; the first four form the recurrent sector. Models receive equal weight in cross-model summaries.

For complex/noisy fraction $q$, the order parameter is $m=1-2q$, binary mixing entropy is $S_2=-q\ln q-(1-q)\ln(1-q)$, and the occupancy-defined inverse-temperature product is $\beta_{\mathrm{eff}}\Delta=\ln[(1-q)/q]$. This effective quantity is distinct from inverse decoder temperature. The entropy maximum and sign reversal follow mathematically from crossing $q=1/2$.

The internal experiment uses base Llama-3.1-70B with 4-bit weights, bfloat16 computation, full-vocabulary sampling, and one fixed prompt. Ten training seeds define a normalized direction between mean normalized hidden states in the upper and lower repetition quartiles. Ten disjoint test seeds at 14 temperatures yield 140 test trajectories. States after the first 16 steps are centered on the training mean and projected onto this direction; repetition is the fraction of repeated four-word sequences.

An effective map includes bias, linear gain, cubic saturation, one-step memory, and noise. Six fitted candidate maps test whether nonlinear current-state terms or lagged information improve prediction. Steering applies five strengths from −2 to 2 at three temperatures, paired with same-seed zero-strength controls and four orthogonal directions.

## Experiments

| Analysis | Reported result |
| --- | --- |
| Population crossing | All 11 models cross equal occupation at temperatures 0.425–0.562; the unweighted mean crosses at 0.517. Mean complex/noisy occupancy is 0.932 at temperature 1. |
| Prompt dependence | Llama prompt P4 is predominantly frozen from temperatures 0.1–0.8; word n-gram analysis relative to near-greedy decoding supports a noise-induced ordering window. |
| Held-out prediction | Trajectory-average coordinate correlates with repetition at rank correlation 0.933, with 95% interval 0.914–0.948; within-temperature centering leaves correlation 0.565. |
| Memory | Adding the previous coordinate improves held-out prediction at all 14 temperatures by 1.1–8.0%, median 4.6%; current-coordinate linear, polynomial, and spline maps perform similarly. |
| Steering | Mean repetition and later-coordinate slopes are 0.056 and 0.041 per steering unit. At temperature 1, strength 2 raises repetition by 0.255, with 95% interval 0.097–0.433. |
| Orthogonal controls | Across 36 direction/strength/temperature combinations, behavioral change correlates 0.842 with later coordinate change versus 0.199 with immediate change. |

Intervals resample seed clusters or paired test seeds, as appropriate. Zero-strength interventions reproduce unperturbed token sequences exactly (Methods; Figures 2–6).

## Limitations

The entropy result concerns a coarse binary classification, not the entropy of full texts or proof of thermodynamic negative temperature. Survey conclusions are bounded by five prompts and 300-token continuations. Internal prediction and steering are tested on one quantized model under one prompt; general transfer is unestablished. Similar performance of current-coordinate map families does not identify cubic saturation uniquely, although lagged-state gains support memory.

The supplied Markdown references supplementary classifier rules, detailed configurations, and diagnostics but does not contain that supplement. It provides no explicit publication year or paper identifier; year is therefore unset. The reported Zenodo identifier, 10.5281/zenodo.21752973, identifies the manuscript/code package rather than being assigned here as the paper DOI.

## Related Concepts

- [[concepts/model-steerability|Model Steerability]]: interventions connect a repetition-associated direction to behavioral changes.
- [[concepts/multi-turn-hidden-state-trajectory-geometry|Multi-Turn Hidden-State Trajectory Geometry]]: related temporal monitoring, but across dialogue turns rather than successive generated tokens.

## Related Papers

- Holtzman et al. (2020), *The Curious Case of Neural Text Degeneration*: cited background on repetitive generation.
- Arnold et al. (2024), *Phase Transitions in the Output Distribution of Large Language Models*: cited temperature-transition work.
- Hiraoka and Inui (2025), *Repetition Neurons: How Do Language Models Produce Repetitions?*: cited causal repetition analysis.
- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory]]: related library reading on internal perturbation response; not claimed as a citation in this manuscript.

[[index|Library home]]
