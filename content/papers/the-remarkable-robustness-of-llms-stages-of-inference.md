---
title: "The Remarkable Robustness of LLMs: Stages of Inference?"
type: paper
authors:
  - Vedang Lad
  - Jin Hwa Lee
  - Wes Gurnee
  - Max Tegmark
year: null
source_job_id: "ff902caa-6381-44fd-a956-85fa9646193c"
tags:
  - mechanistic-interpretability
  - layer-interventions
  - transformer-dynamics
---

## TL;DR

Single-layer deletion and adjacent-layer swapping reveal substantial robustness in the middle of decoder-only transformers and much greater sensitivity at their ends. The authors organize these interventions and complementary representation analyses into a hypothesis of four overlapping stages: detokenization, feature engineering, prediction ensembling, and residual sharpening. The reported 72–95% top-1 retention describes agreement with the original model's predictions, not ground-truth task accuracy.

## Research Question

How does tolerance to structural interventions vary across transformer depth, and can that variation explain how specialized components coexist with iterative representation refinement?

## Motivation

Circuit analyses identify specialized components, while iterative-inference accounts emphasize overlapping computations and self-repair. A depth-dependent account could connect these views and explain why removing or rearranging some layers has relatively little effect.

## Contributions

- Measures the effects of deleting individual layers and swapping adjacent layers without fine-tuning.
- Combines intervention sensitivity, representational similarity, semantic probes, logit-lens distributions, attention patterns, and neuron statistics into a four-stage hypothesis.
- Studies prediction and suppression neuron ensembles and tests the effects of repeating blocks of layers.

## Method

A swap reverses the execution order of two complete neighboring transformer blocks. Zero ablation removes a block while preserving the corresponding swap ordering: the example sequence 1–2–4–3–5 becomes 1–2–4–5. Measurements include output KL divergence, loss, prediction entropy, top-1 agreement, and downstream benchmark performance.

Centered kernel alignment compares representations across layers. Local-attention measurements and a synthetic multi-token-word task examine early processing. Layer-wise linear probes on Word-in-Context (WiC) measure accessible lexical semantics. The logit lens projects intermediate residual states through the unembedding to estimate evolving token distributions.

MLP neurons are classified through the vocabulary-space projection of their output weights: high kurtosis with positive skew identifies prediction neurons, while negative skew identifies suppression neurons. A balanced suffix task tests whether individual or grouped neuron activations predict an upcoming token ending in “-ing.” Layer repetition duplicates each layer within a selected block in place, rather than rerunning the whole block as a unit.

## Experiments

The study covers 16 models from GPT-2, Pythia, Phi, Qwen 2.5, and Llama 3.2, spanning 124M–6.9B parameters. Default evaluation uses one million tokens sampled from the Pile. The main layer-intervention results cover four GPT-2 and four Pythia models; complementary analyses extend across the five families. Benchmarks include HellaSwag, ARC-Easy, and LAMBADA.

| Observation | Interpretation proposed by the authors |
| --- | --- |
| First-layer deletion or swapping produces high-entropy predictions; early attention emphasizes nearby tokens. | Detokenization integrates local context into useful representations. |
| WiC probe accuracy peaks around intermediate depth while logit-lens predictions remain uncertain. | Feature engineering precedes confident output prediction. |
| Middle layers tolerate intervention, with swaps generally less damaging than deletion. | Overlapping computation and possible self-repair support robustness. |
| Prediction neurons emerge around mid-depth and peak near 85% depth as intermediate predictions approach the final output. | Prediction ensembling combines feature-derived signals. |
| Suppression neurons become dominant near the end and MLP output norms increase. | Residual sharpening filters or adjusts the final prediction. |

On the suffix task, prediction-neuron ensemble probes outperform individual probes and sometimes the model's top-1 baseline. Repeating later blocks generally lowers entropy; the manuscript also reports benchmark improvements for repetition near 80–90% depth, with a Qwen HellaSwag example in Appendix A.10. These observations support targeted hypotheses rather than establishing a general accuracy benefit from repetition.

## Limitations

Stage boundaries are approximate and stages can coexist within one layer. Aggregate patterns need not describe each token's processing path, and model-specific differences are not causally isolated. GPT-2 is notably more tolerant of final-layer swaps than some other models. Probe accessibility, neuron-weight statistics, and reduced entropy do not independently establish the proposed causal mechanisms. The neuron ensemble demonstration concerns one suffix-classification task.

The supplied Markdown does not give an explicit publication year or stable paper identifier; these metadata are left unset. Several figure references and captions are inconsistent, so the summary relies on the described experiments rather than inferring precise values from missing plots.

## Related Concepts

- [[concepts/stages-of-transformer-inference|Stages of Transformer Inference]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]

## Related Papers

The manuscript cites Belrose et al., *Eliciting Latent Predictions from Transformers with the Tuned Lens* (2023), Rushing and Nanda, *Explorations of Self-Repair in Language Models* (2024), and Gurnee et al., *Universal Neurons in GPT2 Language Models* (2024) as foundations for intermediate prediction, self-repair, and neuron classification. It also relates its robustness findings to Men et al., *ShortGPT* (2024), and Gromov et al., *The Unreasonable Ineffectiveness of the Deeper Layers* (2024).

[[index|Library home]]
