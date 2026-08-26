---
title: "Muscles in Time: Learning to Understand Human Motion by Simulating Muscle Activations"
type: paper
authors:
  - David Schneider
  - Simon Reiß
  - Marco Kugler
  - Alexander Jaus
  - Kunyu Peng
  - Susanne Sutschet
  - M. Saquib Sarfraz
  - Sven Matthiesen
  - Rainer Stiefelhagen
year: 2024
url: "https://simplexsigil.github.io/mint"
tags:
  - muscle-activation
  - biomechanics
  - human-motion
  - motion-capture
  - musculoskeletal-modeling
  - sequence-modeling
  - synthetic-data
---

## TL;DR

Muscles in Time (MinT) enriches AMASS motion-capture sequences with muscle activations simulated in OpenSim. The resulting synthetic dataset contains 9.8 hours of analyzed recordings from 227 subjects and 402 simulated muscle strands. A benchmark comparing VQ-VAE, LSTM, fully convolutional, Mamba2, and transformer models shows that the 16-layer transformer is strongest on the reported lower- and upper-body metrics for predicting activation sequences from pose motion.

## Research Question

Can large-scale biomechanical simulation provide useful muscle-activation supervision for human-motion understanding when measured EMG datasets are small and expensive to collect? The paper also asks whether temporal neural models can estimate simulated muscle activations directly from pose sequences, avoiding the computational cost of running OpenSim for every new motion.

## Motivation

RGB, depth, and motion-capture systems expose the external geometry of movement but do not directly reveal the muscle activations that produce it. Public EMG and surface-EMG datasets typically cover few subjects, muscles, or motion types. OpenSim can model internal dynamics, but subject-specific force and motion inputs make simulation compute-intensive and sensitive to modeling choices. MinT provides a scalable simulated complement to measured data while retaining the motion diversity of existing capture datasets.

## Contributions

- Builds MinT by mapping AMASS SMPL-H motion into validated OpenSim models and simulating activation time series for lower-body and thoracolumbar muscles.
- Provides 9.8 hours of analyzed data covering 227 subjects, 187 activity labels, and 402 simulated muscle strands, with muscle activations, effective muscle forces, ground-reaction forces, and motion metadata.
- Describes a reproducible processing pipeline using virtual markers, estimated anthropometrics, ground-reaction-force estimation, inverse kinematics, trajectory optimization, and static optimization.
- Establishes a motion-to-muscle-activation benchmark and evaluates five sequence models with RMSE, Pearson correlation coefficient (PCC), and symmetric mean absolute percentage error (SMAPE).
- Shows that activation features can group activities with related motion patterns and that a temporal transformer can learn activation sequences from pose motion.

## Method

### Dataset construction

MinT starts from AMASS, which unifies marker-based motion-capture sequences as SMPL pose and shape parameters. The final dataset uses the EyesJapan, BMLrub, KIT, BMLmovi, and TotalCapture subsets. SMPL-H surface vertices are assigned to 67 virtual mocap markers following the transfer procedure of Bittner et al.; soft-tissue dynamics are omitted to keep marker positions consistent. Subject height and weight are approximated from the body model, and standard parameters from the source models are used instead of fitting subject-specific anatomy.

The pipeline uses Lai et al.'s validated lower-body model and Bruno et al.'s thoracolumbar model. OpenSim inverse kinematics recovers model kinematics. OpenSimAD, as used by OpenCap, estimates ground-reaction forces from kinematics and the musculoskeletal model. A trajectory-optimization procedure derives lower-body activations, while its estimated forces are passed to static optimization for the thoracolumbar region.

Because trajectory optimization is expensive, sequences are processed in 1.4-second segments with overlapping 0.14-second buffers and then recombined. The reported configuration uses 50 collocation points per second, an error tolerance of $10^{-3}$, and a 2,500-iteration limit; non-converging segments are discarded. Marker adjustments, model-to-ground offsets, and constrained vertebral ranges address transfer and contact problems. The released data stores activation values in $[0,1]$ at 50 frames per second, with gaps marking failed segments.

### Motion-to-activation benchmark

Pose sequences are normalized to a 263-dimensional descriptor and divided into 1.4-second clips sampled at 20 frames per second. The predictor maps each temporal input to 402 activation channels: 80 lower-body strands and 322 thoracolumbar strands. The benchmark compares an adapted VQ-VAE motion architecture, LSTM, fully convolutional network, Mamba2 Mixer, and a 16-layer transformer. Models are trained from scratch for 300,000 iterations with batch size 256 unless otherwise noted. RMSE measures amplitude error, PCC measures scale- and offset-invariant temporal similarity, and SMAPE measures relative error while remaining less scale-sensitive than RMSE.

## Experiments

The 16-layer transformer performs best among the evaluated models for both body models and all listed activity groups. For all lower-body muscles, it reports RMSE 0.048, PCC 0.54, and SMAPE 45.1; for the upper-body model, it reports RMSE 0.033, PCC 0.55, and SMAPE 107.7. For walking, the transformer reaches PCC 0.77 for both models, with RMSE 0.044 for the lower body and 0.019 for the upper body. The paper emphasizes PCC and SMAPE because many strands are rarely active: near-zero activations can make RMSE appear small while producing large percentage errors.

Using tsfresh features, FINCH clustering, and h-NNE visualization, the authors find that activation sequences group not only within action categories but also across categories that share motion patterns, such as sideways movement. Qualitative examples show the model tracking alternating leg activations during jumping jacks and the left-leg activation pattern of a kick, with some underestimation at activation peaks.

An appendix experiment transfers the transformer to the Muscles in Action dataset, whose VIBE-derived poses are noisier than AMASS motion capture. Fine-tuning only the first and last transformer blocks affects about 8% of trainable weights and gives similar RMSE to full fine-tuning, but full fine-tuning performs better on PCC and SMAPE. The authors interpret this as limited evidence that MinT-trained temporal representations transfer across pose domains, not as validation against physiological measurements.

## Limitations

MinT provides simulation targets rather than direct measurements of human muscle activation, and the synthetic-to-real gap is unavoidable. The models use standard anatomical parameters rather than subject-specific bodies, and the activations are not validated against EMG in this work. Missing external-force information excludes most motions with non-foot contacts or object interactions; lifting and throwing are retained only under a negligible-object-mass assumption. Failed optimization segments can alter the activity distribution relative to AMASS, and the simulation pipeline is too compute-intensive and hyperparameter-sensitive for routine online use. Dataset coverage also has unequal ethnicity and body-weight representation.

## Related Concepts

- [[Muscle Activation Estimation]]
- [[Video-Based Biomechanics]]
- Motion capture
- Musculoskeletal modeling
- Sequence-to-sequence learning
- Skeleton-based action recognition

## Related Papers

- [[BioHuman: Learning Biomechanical Human Representations from Video]]
- Chiquier and Vondrick (2023), "Muscles in Action."
- Uhlrich et al. (2023), "OpenCap: Human Movement Dynamics from Smartphone Videos."
- Lai, Arnold, and Wakeling (2017), "Why are antagonist muscles co-activated in my simulation? A musculoskeletal model for analysing human locomotor tasks."
- Bruno, Bouxsein, and Anderson (2015), "Development and validation of a musculoskeletal model of the fully articulated thoracolumbar spine and rib cage."
