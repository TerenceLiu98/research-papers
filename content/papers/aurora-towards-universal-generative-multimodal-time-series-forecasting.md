---
title: "Aurora: Towards Universal Generative Multimodal Time Series Forecasting"
type: paper
authors:
  - Xingjian Wu
  - Jianxin Jin
  - Wanghui Qiu
  - Peng Chen
  - Yang Shu
  - Bin Yang
  - Chenjuan Guo
year: null
tags:
  - time-series-forecasting
  - foundation-models
  - multimodal-learning
  - flow-matching
---

## TL;DR

Aurora is a 210.8M-parameter multimodal forecasting model that uses text and images rendered from historical series to guide temporal attention and initialize probabilistic generation. Pretraining on more than one billion time points with generated textual descriptions enables zero-shot forecasting and adaptation with limited target data. Experiments across five benchmarks report strong aggregate results, including a 27.0% average MSE reduction against Sundial on TimeMMD; individual datasets and metrics still favor other models.

## Research Question

Can cross-domain pretraining combine temporal observations with domain-specific text and endogenous images to improve zero-shot point and probabilistic forecasting, including when text is unavailable?

## Motivation

Similar historical trajectories can have different futures in different domains. Numeric-only [[concepts/time-series-foundation-models|Time Series Foundation Models]] must infer that distinction from the observed series, whereas text can supply contextual knowledge. Aurora brings multimodal conditioning into reusable pretraining and uses that context both to select temporal relationships and to construct plausible starting trajectories for generation.

## Contributions

- A multimodal pretrained forecaster supporting zero-shot inference, 10% few-shot adaptation, and missing-text inference.
- Token compression through learned cross-attention queries, followed by modality-guided temporal self-attention and feature fusion.
- [[concepts/prototype-guided-flow-matching|Prototype-Guided Flow Matching]], which initializes future patches from context-dependent trend and period prototypes plus Gaussian noise.
- Evaluation on TimeMMD, TSFM-Bench, ProbTS, TFB, and EPF, with component, modality, prototype-bank, and sampling analyses.

## Method

**Inputs and encoding (Section 3.1).** Aurora processes variables independently, normalizes each series with RevIN, and embeds non-overlapping temporal patches. An FFT-derived period determines how the history is reshaped into a two-dimensional array, repeated into image channels, and resized for a pretrained vision encoder. These images are transformations of observed history, not independent external measurements. BERT encodes associated text. Learned queries compress each auxiliary modality through cross-attention.

Text and image guiders produce unnormalized cross-attention scores, $A_T$ and $A_I$. A learned matrix $W$ connects them into a temporal correlation bias:

$$
C=A_IWA_T^\top,\qquad
O=\operatorname{softmax}\!\left(\frac{QK^\top+C}{\sqrt d}\right)V.
$$

This changes which temporal patches attend to one another. Subsequent cross-attention aligns the auxiliary representations with temporal tokens, and their outputs are added to the temporal representation (Equations 12-21).

**Generation (Section 3.2).** A causal transformer and a cross-attention transformer generate a condition for each future patch. A retriever uses aligned text and image representations and future-position embeddings to produce softmax weights over 1,000 learnable prototypes. The bank is initialized using trigonometric, exponential, logarithmic, and polynomial bases. Weighted combinations provide patch prototypes $\tilde P_i$.

For target patch $y_i$, generation starts from $y_i^{(0)}=\tilde P_i+\epsilon_i$, with $\epsilon_i\sim\mathcal N(0,I)$. An AdaLN-conditioned MLP learns the [[concepts/flow-matching|Flow Matching]] objective

$$
\mathbb E_{t,y_i^{(0)},y_i}
\left\|v_\theta\big((1-t)y_i^{(0)}+ty_i,t\mid h_i\big)
-\big(y_i-y_i^{(0)}\big)\right\|^2.
$$

Inference uses Euler integration from each noisy prototype and concatenates the resulting patches. Different noise draws supply predictive samples; Appendix A.5 uses 100 samples for empirical CRPS evaluation. Random text masking during pretraining supports inference without text, while the endogenous image remains available.

**Pretraining (Appendix A).** Public datasets include subsets of ERA5, IoT, Monash, UEA, UCR, and other sources. Appendix A.1 describes GPT-4 generating sample-level descriptions from series and domain descriptions, a second GPT-4 agent checking quality, and manual checks on sampled descriptions. The authors state that evaluation datasets are excluded from pretraining, even where domains overlap. Training uses eight 80GB A800 GPUs for approximately 30 days, AdamW with initial learning rate $5\times10^{-5}$, batch size 8,192, 11 historical tokens, four future tokens, and reference patch length 48. Downstream patching is dataset-dependent, with 11 historical tokens retained.

## Experiments

TimeMMD compares zero-shot Aurora with unimodal pretrained models and 10%-data adaptation with fully supervised multimodal models. TSFM-Bench and ProbTS evaluate forecasting without text. EPF and TFB examine short-term forecasting. Benchmark protocols differ: for example, Table 7 gives stride 1 for TSFM-Bench and stride 96 for ProbTS. Baseline entries overlapping their own pretraining are excluded; excessive-runtime omissions are separately marked.

| Evaluation | Reported result | Evidence |
| --- | --- | --- |
| TimeMMD, zero-shot | Average MSE reductions of 27.0% against Sundial and 31.2% against VisionTS | Section 4.2; Table 1 |
| TimeMMD, 10% adaptation | Average MSE reductions of 12.8% against full-shot GPT4MTS and 24.5% against full-shot CALF | Section 4.2; Table 1 |
| TSFM-Bench, zero-shot | Average MSE reductions of 15.1% against Time-MoE and 22.9% against ROSE | Section 4.3; Table 2 |
| ProbTS, zero-shot | Average CRPS reductions of 21.5% against full-shot CSDI and 38.3% against zero-shot MOIRAI | Section 4.3; Table 3 |
| TFB, short-term | Reported aggregate MASE 2.134 and msMAPE 19.964, versus Sundial's 2.158 and 20.096 | Tables 10-11 |
| EPF, short-term | PJM MSE 0.084 versus Sundial and full-shot TimeXer at 0.088 | Table 4 |

Percentages above are author-reported averages, not reductions in a pooled error across unlike dataset scales. TFB is described as containing 8,068 univariate datasets; Aurora leads the reported aggregate rows but not every frequency group.

**Ablations.** Removing modality-guided attention, prototype initialization, or both raises average MSE in each of the nine TimeMMD domain rows of Table 5. For Climate, MSE changes from 0.865 to 1.176, 1.008, and 1.447, respectively. The prototype ablation improves Agriculture MAE from 0.348 to 0.334 despite worsening MSE, so its benefit is not uniform across metrics. Table 18 favors the full model over time-only, time-plus-text, and time-plus-image variants on both listed metrics in every domain. Increasing the bank from 500 to 1,000 prototypes improves all listed domain metrics; moving to 5,000 produces mixed changes (Table 17). Figure 6 reports improving average ProbTS scores as the number of sampled predictions increases, with good performance at 100 samples.

## Limitations

- **Rankings depend on dataset and metric.** Sundial beats Aurora on TimeMMD Security MSE (70.441 versus 72.475), TSFM-Bench Electricity MSE (0.169 versus 0.178), and ProbTS Electricity CRPS (0.081 versus 0.085). On EPF Nord Pool, full-shot TimeXer reaches MSE 0.238 versus Aurora's 0.288. Aggregate leadership does not establish universal dominance.
- **Comparisons mix information and training regimes.** Zero-shot TimeMMD baselines are unimodal, whereas Aurora receives text. Comparisons against fully supervised models also differ in pretraining and target-data access. Component and modality ablations help assess the proposed design, but headline gains do not isolate architecture alone.
- **Text quality and availability matter.** Pretraining descriptions are synthetic. The supplied study does not establish robustness to misleading text or fully document the temporal boundary of the information used to generate every description. Missing-text support does not resolve those questions.
- **Compute is substantial.** Table 9 reports 83.5 ms inference, 18.329G MACs, and 1,265 MB peak GPU memory on Environment at horizon 336 and batch size 1. VisionTS takes 7.4 ms in that comparison. Sampling-based accuracy gains entail additional inference work.
- **Source precision.** The supplied text contains incomplete appendix table cells and inconsistent references to the description-generating LLM: Section 4.1 cites the DeepSeek-V3 report, while Appendix A.1 explicitly specifies GPT-4. This page follows the detailed appendix account and does not infer missing values. No publication year, venue, DOI, or identifier for Aurora itself is established in the supplied Markdown; `year` is therefore null.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable pretraining across temporal domains.
- [[concepts/flow-matching|Flow Matching]]: learning a conditional velocity field for probabilistic generation.
- [[concepts/prototype-guided-flow-matching|Prototype-Guided Flow Matching]]: conditioning the source distribution through retrieved temporal prototypes.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: separating zero-shot use, adaptation, information access, and benchmark exclusions.

## Related Papers

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time-Series Forecasting]]: the cited TimesFM work and a numeric-only foundation-model baseline.
- Liu et al., "Sundial: A Family of Highly Capable Time Series Foundation Models" (2025): a probabilistic foundation-model baseline, listed as arXiv:2502.00816 in the supplied bibliography.
- Chen et al., "VisionTS: Visual Masked Autoencoders Are Free-Lunch Zero-Shot Time Series Forecasters" (2024): cited precedent for rendering time series as images and a zero-shot baseline.
- Lipman et al., "Flow Matching for Generative Modeling" (2023): the cited foundation for the conditional velocity-field objective.

Source-listed resources: [code](https://github.com/decisionintelligence/Aurora) and [model repository](https://huggingface.co/DecisionIntelligence/Aurora). Their current contents were not independently checked.

[[index|Library home]]
