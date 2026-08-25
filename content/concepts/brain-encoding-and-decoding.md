---
title: Brain Encoding and Decoding
type: concept
aliases:
  - Neural Encoding and Decoding
  - Brain Decoding
tags:
  - neuroimaging
  - neuroscience
  - brain-computer-interfaces
  - machine-learning
---

## Overview

Brain encoding and decoding are complementary modeling tasks. Encoding predicts neural measurements from stimuli, cognitive states, or behavior; decoding predicts stimuli, behavior, or latent cognitive states from neural measurements. The framework is used in cognitive neuroscience, computational neuroscience, and brain-computer interfaces.

## Key Ideas

- Encoding and decoding are not simply inverse versions of one another. They can use different targets, regularization, validation designs, and interpretations, and a successful decoder does not by itself establish a mechanistic brain representation.
- fMRI supports spatially distributed voxel- or region-level models, while EEG and MEG support models of fast temporal dynamics. The acquisition modality shapes the appropriate representation and validation scheme.
- Trial-to-trial biological variability, sensor noise, source mixing, and limited subject counts make uncertainty quantification and leakage-resistant evaluation essential.
- Nonlinear and time-dependent relationships motivate deep learning, dynamical models, sequence models, and hybrid statistical-machine-learning approaches, but these methods can be data-inefficient and difficult to interpret.
- Small studies motivate hierarchical modeling, transfer learning, structured regularization, Bayesian approaches, and borrowing strength across subjects, tasks, modalities, or datasets.
- Brain-computer interfaces provide an application setting in which decoding must also satisfy computational, latency, robustness, and usability constraints.
- Generalization should be tested across held-out trials, subjects, sessions, sites, stimuli, or datasets as appropriate. Cross-validation alone cannot repair a mismatched estimand or a biologically implausible interpretation.

## Important Papers

- [[Statistical Opportunities in Neuroimaging]]
- Cao, Huang, and Zhang (2021), "When Computational Representation Meets Neuroscience: A Survey on Brain Encoding and Decoding."
- Kriegeskorte and Douglas (2019), "Interpreting encoding and decoding models."
- Varoquaux et al. (2017), "Assessing and tuning brain decoders: cross-validation, caveats, and guidelines."
- Saha et al. (2021), "Progress in Brain Computer Interface: Challenges and Opportunities."

## Related Concepts

- [[Neuroimaging Data Analysis]]
- [[Multimodal Neuroimaging Data Integration]]
- [[High-Dimensional EEG Signals]]
- [[Functional Empirical Band Analysis]]
- [[Multitaper Spectral Estimation]]
- Brain-computer interfaces
- Neural representation
- Stimulus-response modeling
