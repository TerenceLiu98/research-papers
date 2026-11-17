---
title: Smartphone camera oximetry in an induced hypoxemia study
type: paper
authors:
  - Jason S. Hoffman
  - Varun K. Viswanath
  - Caiwei Tian
  - Xinyi Ding
  - Matthew J. Thompson
  - Eric C. Larson
  - Shwetak N. Patel
  - Edward J. Wang
year: 2022
doi: 10.1038/s41746-022-00665-y
tags:
  - mobile-health
  - pulse-oximetry
  - deep-learning
---

## TL;DR

An unmodified smartphone camera and flash, combined with a convolutional model, estimated oxygen saturation over 70–100% in a controlled induced-hypoxemia study of six healthy adults. Subject-held-out MAE was 5.00 percentage points; screening for reference SpO₂ below 90% achieved 81% sensitivity and 79% specificity using an 88% prediction decision boundary. This is development evidence, not validation for clinical replacement of pulse oximeters.

## Research Question

Can camera-only smartphone oximetry generalize to unseen participants across clinically relevant low oxygen saturations, and can its predictions identify hypoxemia?

## Motivation

Earlier smartphone studies concentrated on relatively high saturations, often using brief breath-holding protocols. Such evaluations could conceal errors in the lower ranges where detection matters. A controlled varied fraction of inspired oxygen (FiO₂) protocol provides a broader evaluation distribution.

## Contributions

- A smartphone contact-sensing dataset from controlled desaturation, evaluated over 70–100% SpO₂.
- A camera configuration and CNN pipeline evaluated with participant-held-out regression and threshold-based screening.
- Range-restriction experiments showing how apparently better accuracy can follow from excluding low saturations.
- Public data and preprocessing, visualization, and data-loading code: [study repository](https://github.com/ubicomplab/oximetry-phone-cam-data).

## Method

Six healthy adults aged 20–34 underwent supervised, stair-stepped changes in inspired oxygen. Two Google Nexus 6P phones recorded index fingers, with flash enabled, while a Masimo Radical-7 fingerclip oximeter supplied reference readings. The reference was a transfer-standard device, not arterial blood analysis.

The phones captured 176 × 144 RGB frames at 30 fps. Exposure settings were fixed; red, green, and blue gains were 1×, 3×, and 18× to preserve pulsatile information. Ice packs prevented overheating during prolonged recording. Spatial channel means formed three [[concepts/photoplethysmography|photoplethysmography]] signals. Each example used a three-second, 90-frame window centered on a one-second reference reading. Samples below 70% were excluded from training and evaluation.

A [[concepts/convolutional-neural-networks|CNN]] with three convolutional layers and two fully connected layers regressed SpO₂. Training used MSE and Adam, with training-derived channel normalization. Six subject-held-out splits used four participants for training, one for validation, and one for testing. Hyperparameters were selected using average validation performance across splits.

## Experiments

The collected dataset contained 12,108 samples before the below-70% exclusion; these repeated windows do not constitute independent participants. Results below are reported averages across the six held-out subjects (Results, Figs. 2–4).

| Evaluation | Reported result |
| --- | --- |
| CNN MAE, 70–100% | 5.00 ± 1.90 percentage points |
| CNN root mean squared error | 5.55 ± 1.89 percentage points |
| R² | 0.61 ± 0.15 |
| Ratio-of-ratios baseline MAE | 7.12 ± 1.64 percentage points |
| Reference <90%, prediction boundary 88% | 81% sensitivity, 79% specificity |
| Reference <90%, prediction boundary 90% | 92% sensitivity, 65% specificity |
| ROC AUC for reference <90% | 0.87 |
| Retrained evaluation restricted to 85–100% | 3.07 percentage-point MAE (Fig. 4 table) |

The range-restriction experiment retrained models on each restricted dataset. It therefore compares training-and-evaluation distributions, not merely subsets of fixed predictions. The prose gives 3.06 for the 85% floor, whereas the table gives 3.07. Removing heart-rate information by resampling to three beats increased MAE to 5.35; upsampling low-saturation examples had little effect. Several participants showed overprediction below 80%.

## Limitations

Only six healthy participants were studied, with one dark-skinned participant and five light-skinned participants; demographic performance conclusions are unsupported. The worst participant MAE was 8.56, with callused fingertips proposed as an explanation rather than established causation. Transfer-standard measurement error, including potential skin-tone bias, limits interpretation of the labels.

The 5.55-point root mean squared error exceeded the 3.5% reflectance-oximetry benchmark discussed in the paper. The authors call for arterial blood reference measurements, more diverse participants, and prospective evaluation of a fixed model. Screening boundaries were explored on these study results and need independent validation. Controlled lighting, fixed placement, active cooling, and a single phone model leave real-world usability and cross-device transfer unresolved.

## Related Concepts

- [[concepts/photoplethysmography|Photoplethysmography]]: optical pulsatile signals provide the measurement input.
- [[concepts/convolutional-neural-networks|Convolutional Neural Networks]]: learned temporal and cross-channel features map RGB traces to saturation.

## Related Papers

- Ding, Nassehi, and Larson, *Measuring oxygen saturation with smartphone cameras using convolutional neural networks* (reference 3): earlier camera-only CNN work using breath-holding data, with limited low-saturation coverage.
- Bui et al., *Smartphone-based SpO₂ measurement by exploiting wavelengths separation and chromophore compensation* (2020; reference 2): uses smartphone attachments, unlike this unmodified-camera setup.
- Nemcova et al., *Monitoring of heart rate, blood oxygen saturation, and blood pressure using a smartphone* (2020; reference 8): supplies the ratio-of-ratios approach adapted for comparison.

Source: [npj Digital Medicine 5, 146 (2022)](https://doi.org/10.1038/s41746-022-00665-y).
