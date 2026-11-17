---
title: "Cardiac health assessment across scenarios and devices using a multimodal foundation model pretrained on data from 1.7 million individuals"
type: paper
authors: [Xiao Gu, Wei Tang, Jinpei Han, Veer Sangha, Fenglin Liu, Shreyank N. Gowda, Antonio H. Ribeiro, Patrick Schwab, Kim Branson, Lei Clifton, Antonio Luiz P. Ribeiro, Zhangdaihong Liu, David A. Clifton]
year: 2026
doi: "10.1038/s42256-026-01180-5"
tags: [foundation-models, physiological-sensing, multimodal-learning]
---

## TL;DR

CSFM learns reusable cardiac representations from ECG, PPG, and available text reports using masked reconstruction. Pretraining on records reported to cover approximately 1.7 million individuals supports fine-tuning and frozen-feature use across sensor configurations and five task families. The evidence is retrospective; blood-pressure estimation uses subject-specific calibration data.

## Research Question

Can one pretrained encoder adapt to different ECG lead counts, ECG/PPG availability, and cardiac prediction tasks without redesigning its input layers?

## Motivation

Hospital ECGs, ICU monitors, and wearable sensors produce different channel configurations. Conventional models with fixed input channels fragment training data and complicate transfer. Combining heterogeneous records could provide reusable features even when text or signal channels are absent.

## Contributions

- A shared transformer representation for available waveform channels and optional clinical or machine-generated reports.
- Masked pretraining on MIMIC-III-WDB, MIMIC-IV-ECG, and CODE-Full, with Tiny, Base, and Large variants.
- Evaluation of diagnostic classification, demographic prediction, blood-pressure reconstruction, clinical outcomes, and template-based ECG question answering, plus cross-modality waveform reconstruction.

## Method

Ten-second waveforms are divided into 0.1-second non-overlapping patches, linearly projected, and augmented with channel and temporal embeddings. Text tokens receive type and positional embeddings. Available tokens are concatenated with a global class token; absent channels need not be supplied.

Pretraining masks 75% of biosignal tokens and 50% of text tokens. A transformer encodes visible tokens and a shallow decoder reconstructs missing signal patches and text, using signal reconstruction and token prediction losses. Downstream classification and scalar regression use the global representation; dense waveform prediction aggregates intermediate features through a convolutional head. Alternatively, frozen embeddings feed logistic regression, random forests, or XGBoost.

MIMIC-III reports are weakly matched within one week of waveform segments and describe diagnostic ECGs rather than the ICU recordings themselves. CODE-Full contributes roughly 1.5 million segments, one per subject. The paper acknowledges unresolvable subject overlap between de-identified MIMIC-III and MIMIC-IV records.

## Experiments

Results summarize three random seeds. Comparisons include conventional networks trained from scratch, handcrafted features, and pretrained models including Chronos, MOMENT, ECG-FM, ECGFounder, PaPaGei, D-BETA, and MERL.

| Task / dataset | Best reported CSFM | Conventional comparator |
| --- | --- | --- |
| Disease classification, CinC17 | Macro-F1 0.677 | 0.634 |
| Disease classification, PTB-XL | Macro-F1 0.357 | 0.328 |
| Disease classification, SimBand | Macro-F1 0.398 | 0.357 |
| One-year mortality, CODE-15 | AUC 0.844 | 0.816 |
| ICU false alarms, VTaC | AUC 0.967 | 0.931 |

These are best reported results across variants, not measurements of one uniformly selected model. The diagnosis confidence intervals overlap, and SimBand results show substantial variability. CSFM-Large does not consistently improve on Base.

Reduced-lead experiments cover 12, 6, 2, and 1 ECG leads. On PTB-XL, fine-tuning with 10% of training data can match conventional models using 100%. Frozen embeddings with XGBoost sometimes approach fully fine-tuned performance. ECG-QA selects among valid candidate answers rather than generating open-ended clinical advice.

VitalDB blood-pressure evaluation excludes test segments but includes other segments from the same subjects for calibration. Demographic evaluation instead uses subject-separated data. CODE-15 test subjects are excluded from CODE-Full pretraining. PPG-to-ECG and single-lead-to-12-lead synthesis are evaluated using reconstruction error and real/synthetic classification transfer; a real–synthetic performance gap remains.

## Limitations

Interpretability, computational cost, and demographic coverage remain concerns. Cross-dataset subject overlap cannot be fully resolved, and some baseline comparisons may be affected by pretraining exposure (notably PaPaGei on VitalDB). Weak text–waveform matching introduces temporal and measurement mismatch. Calibration-based blood-pressure results do not establish performance on entirely unseen subjects without calibration. Retrospective benchmark gains do not demonstrate improved clinical outcomes or prospective deployment safety.

Source consistency: one Results paragraph reverses CODE-15 and VTaC when naming the outcome datasets. The assignments above follow Methods and Figure 3: CODE-15 for mortality, VTaC for ICU alarms. Supplementary-only details are not independently reconstructed here.

## Related Concepts

- [[concepts/time-series-foundation-models|Time Series Foundation Models]]: reusable pretraining applied to cardiac representation learning and task adaptation.
- [[concepts/photoplethysmography|Photoplethysmography]]: optical waveforms complement ECG and can also serve as the sole available modality.

## Related Papers

The paper compares frozen representations with Chronos and MOMENT as general time-series baselines, and with ECGFounder and ECG-FM as domain-specific baselines. It adapts the masked-autoencoder approach of He et al. (2022) to heterogeneous waveform and text tokens; these relationships are reported in the supplied article.

Source: [published article](https://doi.org/10.1038/s42256-026-01180-5). The article provides [model weights and inference code](https://github.com/guxiao0822/Cardiac-Sensing-FM).
