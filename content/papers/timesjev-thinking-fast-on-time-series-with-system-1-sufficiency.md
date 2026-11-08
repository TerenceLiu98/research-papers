---
title: "TimesJev: Thinking Fast on Time Series with System 1 Sufficiency"
type: paper
authors:
  - Chenghao Liu
  - Wei Fan
  - Jindong Han
  - Dongjie Wang
  - Aniket Mahanti
  - Pengyang Wang
  - Hao Liu
year: null
source_job_id: "2bf121a4-2567-46ec-b5ca-e9ed362f9dde"
tags:
  - time-series-reasoning
  - system-1-reasoning
  - sufficient-dimension-reduction
  - feature-selection
---

## TL;DR

TimesJev replaces raw numerical sequences with a small, task-selected set of named time-series features, then maps their values into a frozen one-pass decision model's embedding space. The paper frames this design through [[concepts/system-1-sufficient-representations|System 1 Sufficient Representations]], separating predictive information lost by compression from the model's inability to use the retained information. On 13 TSQA datasets, its Decider-4B variant reports 89.78% overall accuracy with 34.1 ms latency, while the Decider-2B variant reports 87.02% at 19.9 ms.

## Research Question

Can a language model answer fixed-choice questions about time series accurately in one forward pass if the raw series is compressed into a representation that both preserves answer-relevant information and is usable by the model?

## Motivation

Explicit [[concepts/time-series-reasoning|Time Series Reasoning]] systems often generate hundreds or thousands of intermediate tokens. This raises latency, yet raw numeric sequences remain difficult for language models to interpret reliably. Direct-decision models avoid decoding a reasoning trace, but their limited test-time computation makes failures in recognizing noisy temporal patterns especially consequential. TimesJev therefore moves pattern extraction before the frozen model and asks what a compact, decision-sufficient interface should preserve.

## Contributions

- Defines System 1 sufficiency using two requirements: the compressed representation must preserve the answer distribution available from the full series, and an encoder must make that distribution realizable by the frozen decision model.
- Decomposes excess expected log loss into a sufficiency divergence caused by compression and a realizability divergence caused by the model-interface constraint.
- Learns a fixed-size subset of interpretable temporal features with stochastic gates and a variational prediction objective.
- Encodes selected feature values and identities as learned value-token embeddings while leaving the System 1 backbone frozen.
- Evaluates two Decider backbones on anomaly detection, activity classification, multiple-choice QA, and true/false QA across 13 TSQA datasets.

## Method

For a time series $X$, context $C$, and answer $Y$, TimesJev constructs a compact representation $T=F_S(X)$ from a library of named statistical and temporal features. Its analysis writes the best achievable model loss above the full-data conditional entropy as

$$
R_\Psi^*(T)-H(Y\mid C,X)=\Delta_{\mathrm{suff}}+\Delta_{\mathrm{real}}.
$$

The sufficiency term measures how much answer information is lost when replacing $X$ with $T$. Because the true conditional distribution is unknown, the method minimizes a variational predictor's cross-entropy. Each candidate feature receives a stochastic gate $z_j=\operatorname{clip}(\mu_j+\epsilon_j,0,1)$, and training combines answer-prediction loss with a penalty on the expected number of active gates. The final representation retains the $K$ features with the largest gate parameters; the main experiments use $K=32$.

The realizability term measures the gap between the answer distribution supported by the representation and what the frozen System 1 model can express through the allowed input encoder. For every selected feature, a shared MLP receives a four-component numerical transform of its value plus a one-hot feature identity. Its output replaces a special value token's embedding. The prompt retains the feature name and printed value, while only the value-token encoder is trained. At inference, the system computes the selected features, inserts their learned embeddings, and reads the answer from candidate probabilities without decoding intermediate reasoning.

## Experiments

The evaluation uses four fixed-choice task groups from TSQA: anomaly detection in four domains, six-class human activity recognition, multiple-choice QA, and true/false QA. The feature library contains 69 features for most tasks and 240 for multichannel activity recognition. Reported training uses three epochs, seed 42, and a frozen Decider backbone; the value-token MLP has 0.54M trainable parameters.

TimesJev with Decider-4B reaches 89.78% overall accuracy, compared with 61.77% zero-shot and 85.41% after LoRA fine-tuning of the same backbone. With Decider-2B, it reaches 87.02%, compared with 53.97% zero-shot and 85.80% with LoRA. The strongest reported non-TimesJev overall result is 86.91% for LoRA-tuned Qwen3.5-9B.

The Decider-4B and Decider-2B variants use approximately zero decoded answer tokens and report latencies of 34.1 ms and 19.9 ms. Other zero-shot reasoning models in the table generate 32 to 1,535 tokens and take 481 to 12,528 ms; LoRA-tuned baselines take 66.0 to 112 ms. These comparisons mix architectures and output procedures, so they establish the end-to-end operating point rather than isolating compression alone.

Ablations support both stages. Removing stochastic-gate selection lowers the Decider-2B overall accuracy from 87.02% to 70.60%, while removing learned value tokens lowers it to 48.84%. Adding the raw series does not improve any task. Accuracy peaks between 16 and 32 selected features and then falls, consistent with a trade-off between losing predictive information and overloading the model interface. Shuffling feature values reduces anomaly-detection and classification performance toward chance, although true/false QA changes little, suggesting that many questions in that task can be answered from textual context.

## Limitations

- The formulation covers decisions over fixed candidate sets; forecasting, imputation, and open-ended answers are outside the evaluated setting.
- Features come from a fixed, manually specified library, and one selected subset is shared across inputs rather than adapted to each question.
- The method depends on supervised task data to learn both feature selection and embedding alignment.
- A direct answer provides no generated rationale. Named features offer inspectable evidence, but the paper does not evaluate explanation generation or whether users interpret that evidence correctly.
- True/false QA is only weakly affected by value perturbations, so aggregate performance partly reflects questions solvable from context without the series.
- The main comparisons vary model family, parameter count, fine-tuning method, and decoding behavior; they do not isolate every source of the accuracy and latency differences.
- All reported training runs use one seed, and the paper evaluates one benchmark family rather than cross-benchmark or distribution-shift generalization.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/system-1-sufficient-representations|System 1 Sufficient Representations]]
- [[concepts/time-series-reasoning|Time Series Reasoning]]
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]
- [[concepts/numerical-decoding-through-structured-choices|Numerical Decoding Through Structured Choices]]
- [[concepts/time-series-anomaly-detection|Time Series Anomaly Detection]]

## Related Papers

- Kong et al. (2025), "Time-MQA: Time Series Multitask Question Answering with Context Enhancement": introduces the TSQA benchmark and the Time-MQA comparison models.
- Yu et al. (2024), "Distilling System 2 into System 1": provides a related route to direct answers by distilling outputs from explicit reasoning systems.
- Yamada et al. (2020), "Feature Selection Using Stochastic Gates": supplies the differentiable feature-selection mechanism.
- Jin et al. (2024), "Time-LLM: Time Series Forecasting by Reprogramming Large Language Models": exemplifies aligning time-series representations with a language model's input space.
- Merrill et al. (2024), "Language Models Still Struggle to Zero-Shot Reason about Time Series": documents limitations of language models on raw time-series reasoning.

[[index|Library home]]
