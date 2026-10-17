---
title: Self-Supervised Dynamical System Representations for Physiological Time-Series
type: paper
authors:
  - Yenho Chen
  - Maxwell A. Xu
  - James M. Rehg
  - Christopher J. Rozell
year: null
tags:
  - self-supervised-learning
  - physiological-time-series
  - dynamical-systems
  - representation-learning
---

## TL;DR

PULSE learns physiological time-series representations by separating shared dynamical information from sample-specific initial conditions and training them to reconstruct random crops. It leads the reported single-split linear-probe comparisons on PPG, ECG, and EEG, and improves transfer to two related datasets. Its theoretical recovery result concerns independent samples from the same system; the practical same-window crop strategy approximates that setting.

## Research Question

Can a self-supervised objective preserve the underlying dynamics of physiological signals while filtering sample-specific variation, producing representations that distinguish physiological states with few labels and transfer across related datasets?

## Motivation

Contrastive augmentations can change a signal's clinical meaning, while ordinary masked reconstruction may exploit temporal relationships that do not reflect forward dynamics. Sequential variational autoencoders impose dynamical structure but reconstruct all observed variation, including nuisance factors. The paper targets system information shared across independently realized trajectories, treating initial conditions and observation/process noise as sample-specific under its generative model.

## Contributions

- Introduces [[concepts/dynamical-cross-reconstruction|Dynamical Cross-Reconstruction]] as a structured pretraining objective that separates system estimation from the trajectory being reconstructed.
- Develops a graphical-model result characterizing the minimal shared latent information under whole-sample versus partial temporal masking.
- Evaluates noisy synthetic systems, physiological classification, limited-label probing, related-dataset transfer, and component ablations.

## Method

The generative model groups windows by shared system parameters, with independent initial conditions and sample-specific noise. A dilated convolutional system encoder observes the whole source window. A separate two-layer CNN estimates the target's initial latent state from a local receptive field. A GRU evolves that state using the inferred system representation as input; a linear observation map produces reconstructed measurements. Squared reconstruction error trains the encoders and decoder (Section 3.2).

System variables contain time-invariant and time-varying components. Max pooling produces the time-invariant component, while a CNN produces a time-varying component constrained to one dimension and temporally pooled to discourage copying local observations. The downstream window embedding is the pooled system-encoder output.

Ideal training would pair independent windows known to share system parameters. Without those labels, PULSE instead keeps the full window as the system-encoder input and samples random crops with different starting states as reconstruction targets. This assumes cropping preserves the underlying physiological system identity.

Theorem 1 assumes an acyclic fully factorized generative model, invertible generative functions, and independent samples from the same system. Under its masking formulation, fully hiding one series makes system parameters the minimal shared latent variables; partial masks instead expose sample-specific boundary states. This characterizes information in the assumed graph, rather than guaranteeing exact recovery by the practical crop-trained neural network. Appendix H's explanation of latent clustering through decoder reuse and smoothness is a hypothesis.

## Experiments

**Synthetic systems.** Lorenz, Thomas, and Hindmarsh-Rose trajectories yield five-class parameter-identification tasks at noise levels 0, 1, 3, and 5. Table 1 averages over three systems and ten random dataset/model seeds per system. PULSE accuracies are 99.58%, 96.09%, 83.42%, and 77.34%, leading the practical baselines at each noise level. The label-assisted independent-pair oracle reaches 99.29%, 97.26%, 89.00%, and 82.65%. It improves on practical PULSE at positive noise levels, but not at zero noise, despite the text's broader claim. The positive oracle exceeds the partial-mask negative oracle throughout.

**Linear probing.** Frozen embeddings feed logistic regression. The main protocol uses 70/15/15 intersubject splits and five model initializations. Contrastive and sequential-VAE baselines share a dilated convolutional encoder; masked-autoencoder baselines retain their transformer encoders. Table 2 reports:

| Dataset and task | PULSE accuracy (%) | Best baseline accuracy (%) | PULSE AUROC (%) |
| --- | --- | --- | --- |
| HAR: activity recognition | 93.27 | 95.35 (REBAR) | 99.42 |
| WESAD PPG: affect/stress states | 64.27 | 61.35 (TimeMAE) | 80.29 |
| MIT-BIH ECG: atrial fibrillation | 87.41 | 81.54 (REBAR) | 94.93 |
| Sleep-EDF EEG: sleep staging | 85.56 | 84.25 (DSVAE) | 96.17 |

Appendix E adds five-fold cross-validation and SimMTM. PULSE has the highest mean accuracy on all four datasets: HAR 95.30 +/- 1.72%, PPG 63.87 +/- 2.50%, ECG 88.01 +/- 1.12%, and EEG 84.25 +/- 1.63%. These are means and standard deviations across folds with different initialization seeds; they do not establish that every advantage is statistically significant.

**Limited labels.** Table 3 averages five label subsets for each of five initializations. With 1% of labels, PULSE accuracy is 84.74% on HAR, 84.77% on ECG, 42.97% on PPG, and 80.69% on EEG. It leads the listed SSL methods at both 1% and 5%, but the supervised EEG baseline wins at 5% (84.90% versus 80.45%). In cross-validation, TimeMAE exceeds PULSE on PPG at 1% (44.40 +/- 4.83% versus 43.51 +/- 5.81%; Table 7).

**Transfer.** With a two-layer classification head and 40 epochs of fine-tuning, PULSE achieves 95.82% accuracy and 98.51% AUROC for EEG-to-Epilepsy, and 83.67% accuracy and 97.20% AUROC for HAR-to-Gesture (Table 4). The best listed baseline accuracies are 95.27% and 78.83%, respectively. Results average five seeds; TimeMAE and SimMTM are absent from this table.

**Ablations.** Average linear-probe accuracy drops by 7.62 percentage points without time-varying parameters, 1.22 with shared system/initial-state inference, 6.42 without random crops, and 9.68 with randomly paired segments regardless of dynamics (Table 5).

## Limitations

- Same-window crops are not independent trajectories. Their shared noise and sample-specific variation create a gap between the implemented objective and the recovery theorem, acknowledged in Appendix I.
- The assumed generative factorization may omit relevant physiological complexity. Invertibility is a theoretical assumption; the synthetic experiments explicitly include chaotic systems for which inversion is impractical.
- Baseline encoders are only partially matched, so the entire comparison cannot isolate training objective from architecture. Transfer evidence covers two related-dataset tasks.
- Better classification does not by itself establish recovery of physical parameters, clinically validated mechanisms, or complete nuisance removal.
- The supplied Markdown does not identify the publication year, venue, or a stable identifier for this paper. These are left unspecified.

## Related Concepts

- [[concepts/dynamical-cross-reconstruction|Dynamical Cross-Reconstruction]]
- [[concepts/disentangled-representations|Disentangled Representations]]: separates shared system factors from sample-specific initial states under explicit assumptions.
- [[concepts/linear-probing|Linear Probing]]: evaluates the class information available in frozen system embeddings.

## Related Papers

- Xu et al. (2024), "REBAR: Retrieval-based reconstruction for time-series contrastive learning": a baseline that uses reconstruction to select contrastive pairs.
- Yingzhen and Mandt (2018), "Disentangled sequential autoencoder": the static/dynamic latent-factor baseline.
- Kong and Zhang (2023), "Understanding masked image modeling via learning occlusion invariant feature": supplies the shared-latent-variable analysis used in the proof.
- [[papers/joint-embeddings-go-temporal|Joint Embeddings Go Temporal]]: a library comparison using masked latent prediction for temporal representation learning; not a cited baseline in PULSE.

[[index|Library home]]
