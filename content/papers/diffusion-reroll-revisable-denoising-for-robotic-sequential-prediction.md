---
title: "Diffusion ReRoll: Revisable Denoising for Robotic Sequential Prediction"
type: paper
authors:
  - Seonsoo Kim
  - Seongil Hong
  - Jun-Gill Kang
year: 2026
venue: "10th Conference on Robot Learning (CoRL 2026)"
url: "https://seonsoo-p1.github.io/DiffusionReRoll"
source_job_id: "ff2d90fa-3bc0-4216-9b32-53370fa35721"
tags:
  - diffusion-models
  - robotic-sequential-prediction
  - diffusion-planning
  - robot-learning
---

[[index|Library home]]

## TL;DR

Diffusion ReRoll makes diffusion-based sequence generation revisable across a prediction horizon. It trains a per-token denoiser on randomized piecewise-linear noise profiles, then uses a schedule matrix that selectively re-noises partially resolved regions so they can be refined with updated context from other regions. Across the reported long-horizon planning, LIBERO-10 policy, unified video-action, and real-world navigation experiments, this combination generally improves over matched full-sequence or causal-denoising baselines. Gains are less consistent on short atomic RoboCasa tasks, and revision adds schedule-dependent inference cost.

## Research Question

Can a diffusion sequence model revise earlier and later parts of a horizon during generation, instead of committing through one monotonic full-sequence or causal denoising pass?

## Motivation

Standard [[concepts/diffusion-models|Diffusion Models]] usually move an entire sequence monotonically from noise to a clean sample. [[concepts/diffusion-forcing|Diffusion Forcing]] permits a separate noise level for each token, but causal schedules can still resolve early tokens before later constraints become informative. This premature commitment is especially consequential in long-horizon robotic planning and action prediction, where distant parts of a trajectory constrain one another. The paper asks whether selective re-noising can turn the denoising process itself into a revision mechanism rather than requiring a separate repair model.

## Contributions

- Introduces Diffusion ReRoll, a schedule-matrix sampler that selectively moves token regions back to higher noise levels and denoises them again under updated cross-horizon context.
- Aligns training with deployment through randomized linear chunks: contiguous sequence regions receive locally linear, token-wise noise profiles, with masking and reversed chunks for bidirectional settings.
- Defines forward and bidirectional schedules whose denoising slope, reset noise level, ReRoll count, and meeting behavior control how information propagates through the horizon.
- Evaluates the method in maze planning, manipulation policy learning, joint video-action modeling, and real-world visual navigation, with ablations on schedule choices, training alignment, latency, and action-video consistency.

## Method

**Per-token schedules.** A schedule matrix $S_{m,t}$ assigns token $t$ a discrete noise level at sampler row $m$. A downward transition uses a deterministic DDIM update, an unchanged level preserves the token, and an upward transition applies forward Gaussian noising. This last transition is a ReRoll event. The model uses full attention and per-token noise conditioning; ReRoll changes the training distribution and sampler rather than requiring a new denoiser backbone.

**Revisable denoising.** The schedule is organized into virtual piecewise-linear chunks, or denoising waves. When a chunk edge reaches a reset level, the associated region is re-noised and attached to an adjacent wave. Regions that would otherwise be committed can therefore be refined using newly resolved context. The main controls are denoising slope, reset noise level, and number of ReRoll events. Bidirectional variants either preserve waves from both endpoints (the meeting matrix) or use terminal context early before a forward wave takes over.

**Training alignment.** Training samples randomized contiguous chunks with varied slopes and starting levels instead of independent token noise. A suffix can remain at full noise in forward training; bidirectional training mixes forward examples with masked and full-horizon patterns containing reversed right-side chunks. The paper's ablation finds that applying a ReRoll schedule to a model trained with independent token noise does not consistently help, whereas aligned linear-chunk training and repeated revision work together.

**Deployment cost.** More ReRoll events create more sampler rows. For receding-horizon control, the paper reduces blocking latency by retaining and re-encoding the unexecuted suffix, stopping once the executable prefix is clean, and overlapping the final causal updates with action execution. These optimizations reduce blocking work but do not necessarily reduce total denoising computation.

## Experiments

**Long-horizon planning.** On six OGBench PointMaze and AntMaze tasks, ReRoll obtains the best reported mean in every guidance-replanning and goal-inpainting row. Average success is 88.1% versus 72.8% for Diffusion Forcing under guidance-based replanning, and 90.8% versus 73.8% for Diffuser under goal inpainting. Values average three training seeds. The largest individual guidance gain is on AntMaze Giant: 86.4% versus 49.1% for Diffusion Forcing and 16.0% for Diffuser.

**Policy learning.** Across five LIBERO-10 observation/horizon settings, average official-reset success is 62.7% for ReRoll and 40.1% for Diffusion Policy; under the open-gripper reset, ReRoll also has the highest mean in all five settings. The official $2/16/8$ result has high seed variance ($51.0 \pm 24.1$), and changing the reset protocol substantially alters all methods' results. On four selected single-task RoboCasa skills, gains are mixed: ReRoll improves some CloseSingleDoor and CoffeePressButton settings but does not consistently outperform Diffusion Forcing or Diffusion Policy on CoffeeServeMug and PnPCounterToSink.

**Unified video-action modeling.** Applied to Unified World Models on LIBERO-10, ReRoll reaches 94.4% action-only policy success, 93.9% joint policy success, and 69.7% OOD joint success, compared with 86.5%, 86.7%, and 58.1% for the full-sequence UWM baseline. Its generated-video zero-action diagnostic has the lowest implied terminal displacement, 0.3006 m versus 0.3170 m for UWM + Diffusion Forcing and 0.3283 m for UWM. This is a consistency diagnostic under an out-of-distribution intervention, not a general video-quality measure.

**Real-world navigation and ablations.** Three independently trained policies per method are evaluated on a Clearpath Jackal, with three trials per circuit direction and five per subtask for each seed. ReRoll has the highest mean in both circuit directions and all three OOD subtasks, while all methods perform strongly on the in-distribution Zig-Zag subtask. Ablations favor intermediate reset levels, non-causal attention, and aligned linear-chunk training. Performance generally saturates after a moderate ReRoll count, while delayed execution of previously committed actions causes ReRoll's largest LIBERO performance drop despite leaving it with the highest mean.

## Limitations

- New tasks may require joint tuning of the training noise distribution and deployment schedule to balance accuracy, horizon structure, and inference cost.
- The evidence for cross-horizon revision is empirical; the paper provides neither a characterization of when revision helps nor convergence guarantees.
- Evaluation uses Transformer denoisers and benchmark-scale datasets. It does not establish effectiveness in large general-purpose robot models.
- ReRoll is not uniformly better: the selected atomic RoboCasa tasks show mixed results, and delayed committed actions reduce its advantage.
- Several comparisons change more than the sampler alone. Full-sequence baselines retain task-specific architectures or objectives, while the most controlled attribution is the matched Diffusion Forcing versus ReRoll comparison.
- LIBERO results depend strongly on reset behavior and best-checkpoint selection from test rollouts; the official short-horizon setting also has substantial seed variance.
- Additional revision can increase sampler updates. Sliding-window reuse and pipelining reduce blocking latency under the tested deployment assumptions but do not remove the total-compute tradeoff.

## Related Concepts

- [[concepts/revisable-denoising|Revisable Denoising]]: selective re-noising and repeated refinement under updated sequence context.
- [[concepts/diffusion-forcing|Diffusion Forcing]]: the per-token noise-level interface from which ReRoll constructs its schedule matrices.
- [[concepts/diffusion-models|Diffusion Models]]: the forward noising and reverse denoising foundation.
- [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]]: a different approach to long-horizon diffusion planning that explicitly separates sparse subgoals from local refinement.
- [[concepts/world-models|World Models]]: learned predictive models used here in the joint video-action evaluation.

## Related Papers

- Chen et al. (2024), "Diffusion Forcing: Next-Token Prediction Meets Full-Sequence Diffusion": provides per-token noise conditioning and causal schedule matrices; ReRoll adds structured training and selective resets.
- Janner et al. (2022), "Planning with Diffusion for Flexible Behavior Synthesis": supplies the full-sequence Diffuser planning baseline.
- Chi et al. (2025), "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion": supplies the full-sequence action-prediction baseline.
- Zhu et al. (2025), "Unified World Models: Coupling Video and Action Diffusion for Pretraining on Large Robotic Datasets": supplies the joint video-action model adapted to per-token schedules.
- [[papers/simple-hierarchical-planning-with-diffusion|Simple Hierarchical Planning with Diffusion]]: addresses long-horizon planning through explicit temporal abstraction rather than repeated re-noising.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: uses diffusion forcing as a shared future-video interface and highlights the need to evaluate action sensitivity separately from visual prediction quality.
