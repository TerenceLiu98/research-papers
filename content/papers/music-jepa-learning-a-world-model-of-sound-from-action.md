---
title: "Music-JEPA: Learning a World Model of Sound from Action"
type: paper
authors:
  - Ziyu Wang
  - Kun Fang
  - Yann LeCun
year: null
source_job_id: "ae81f97d-b8a3-4cb3-8e37-392d561f962a"
tags:
  - joint-embedding-predictive-architectures
  - world-models
  - music-information-retrieval
  - self-supervised-learning
  - piano-transcription
---

## TL;DR

Music-JEPA treats paired piano audio and MIDI controls as an offline action-conditioned system: a JEPA predicts the next audio representation from the current audio and the next pianoroll-plus-pedal action. Its 6M-parameter state encoder improves over a matched audio-only JEPA on beat tracking, composer identification, and most key-recognition metrics, while remaining mixed against the 95M-parameter MERT. An amortized inverse model also turns latent dynamics into piano transcriptions; note metrics trail supervised systems, but continuous pedal estimation reaches the lowest reported MAE.

## Research Question

Can a [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] learn a useful piano [[concepts/world-models|World Model]] by treating audio as state and aligned performance controls as action, and can those dynamics support music representation learning and transcription through planning?

## Motivation

Prior audio JEPAs primarily learn from passive observations by masking spectrogram regions. They can produce general audio representations without explicitly modeling how an instrument action changes sound over time. Piano recordings paired with aligned MIDI make it possible to test whether action-conditioned latent prediction captures pitch, timing, velocity, and pedal effects while avoiding raw waveform reconstruction.

## Contributions

- Formulates piano sound as an offline action-conditioned dynamical system with 2-second audio states and aligned 88-key velocity pianorolls plus continuous sustain-pedal actions.
- Learns separate state and action encoders, a cross-attention state predictor, and an action-transition predictor using EMA teacher targets and normalized latent regression.
- Evaluates transition sensitivity through temporal, random, noise, pitch, timing, velocity, and pedal perturbations, as well as decoded counterfactual spectrograms.
- Tests frozen audio representations on beat tracking, composer identification, and pseudo-key recognition against an audio-only JEPA and MERT.
- Uses an amortized inverse predictor and action decoder to infer piano controls from consecutive audio states, providing a planning-based route to transcription.

## Method

Each 2-second segment is represented by a 229-bin log-mel spectrogram sampled every 10 ms. Its aligned action contains an 88-pitch velocity pianoroll and a continuous sustain-pedal curve at the same frame rate. ViT encoders map spectrogram and action patches to state and action token sequences. The state predictor reconstructs masked next-state tokens using self-attention and cross-attention to the next action; a separate Transformer predicts the next action representation from the current one.

Training minimizes the sum of next-state and weighted next-action latent mean-squared errors, with action weight 0.5. EMA teacher encoders with momentum 0.95 provide stop-gradient targets, and layer normalization controls representation scale. The complete model has about 19M parameters; downstream tasks use the frozen 6.5M-parameter state encoder, reported as 6M in the comparison table.

For transcription, the desired action sequence is framed as minimizing state-prediction and action-transition errors. Direct gradient optimization is unstable in the high-dimensional action space, so an inverse predictor amortizes this optimization by inferring the next action latent from consecutive state latents and the previous action. A separately trained decoder maps inferred actions back to pianoroll and pedal signals while the JEPA remains frozen.

## Experiments

The model is trained on roughly 200 hours of aligned audio and MIDI from MAESTRO v3.0.0. Under temporal perturbations, Music-JEPA obtains input- and target-state win rates of 0.929 and 0.991, compared with 0.787 and 0.576 for AO-JEPA. The prediction loss responds most strongly to pitch shifts and less strongly to changes within 50 ms or small velocity and pedal perturbations. A separately trained decoder shows that counterfactual actions alter predicted spectrograms, although this is a qualitative diagnostic rather than a direct audio-generation benchmark.

On ASAP beat tracking, Music-JEPA reports F1 scores of 0.6208 and 0.6599 at 70 ms and 100 ms tolerances, exceeding both AO-JEPA and MERT in the reported setup. For composer identification, it leads Top-3 and Top-5 accuracy at 0.7045 and 0.8734, but MERT retains higher weighted F1 and Top-1 accuracy. Its pseudo-key weighted F1 is 0.7617, about 11.5 points above MERT and effectively tied with AO-JEPA; these labels are derived by chroma matching to major scales rather than human key annotations.

Planning-based transcription reaches frame, onset, onset-plus-offset, and onset-plus-offset-plus-velocity F1 scores of 0.8381, 0.7325, 0.5372, and 0.4000. All trail the compared supervised transcription systems. Continuous pedal estimation reaches MAE 0.1222, improving on the three listed comparators, whose MAEs range from 0.1339 to 0.1471.

## Limitations

- Training and evaluation center on classical piano with aligned MIDI from MAESTRO and ASAP; the evidence does not establish generalization to other instruments, genres, recording conditions, or settings without action annotations.
- The method is trained fully offline, so its analogy to learning through interaction does not include environment exploration or online control.
- Amortized inference replaces explicit action-sequence search. The transcription experiment therefore demonstrates use of learned dynamics through a trained inverse model, not successful high-dimensional gradient-based planning.
- Note-level transcription remains substantially below fully supervised systems despite the stronger continuous-pedal result.
- Key recognition uses pseudo-labels obtained by matching chroma to 12 major scales, limiting what the reported scores establish about modulation and broader tonal understanding.
- Perturbation sensitivity and decoded counterfactuals show that predictions depend on states and actions, but do not by themselves establish causal identification of physical sound-production dynamics.
- The supplied manuscript gives no publication venue or stable identifier for Music-JEPA, so those fields are not inferred from its references.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/world-models|World Models]]

## Related Papers

- Fei, Fan, and Huang (2023), "A-JEPA: Joint-Embedding Predictive Architecture Can Listen": a passive audio-JEPA predecessor cited by Music-JEPA.
- Tuncay et al. (2025), "Audio-JEPA: Joint-Embedding Predictive Architecture for Audio Representation Learning": another audio-only latent-prediction predecessor.
- Li et al. (2024), "MERT: Acoustic Music Understanding Model with Large-Scale Self-supervised Training": the large pretrained music encoder used as the non-JEPA downstream baseline.
- [[papers/lewam-end-to-end-world-and-action-modeling-with-jepas|LeWAM: End-to-End World and Action Modeling with JEPAs]]: jointly learns action-conditioned visual dynamics and an action policy for control, whereas Music-JEPA uses paired music controls and a post hoc inverse predictor for transcription.
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]]: optimizes actions directly through latent dynamics and studies representation geometry, contrasting with Music-JEPA's amortized action inference.

Source: supplied parsed manuscript, Cognitio job `ae81f97d-b8a3-4cb3-8e37-392d561f962a`.

[[index|Library home]]
