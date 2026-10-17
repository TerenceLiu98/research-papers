---
title: "H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning"
type: paper
authors:
  - Wancong Zhang
  - Basile Terver
  - Michael Rabbat
  - Yann LeCun
  - Randall Balestriero
year: null
source_job_id: "67cdcf75-8823-40b1-8285-caf1c1b11f69"
tags:
  - world-models
  - hierarchical-planning
  - self-supervised-learning
  - visual-control
---

## TL;DR

H-JEPA jointly learns action-conditioned predictive models at progressively coarser timescales, with a distinct latent space at each level. Top-down planning turns upper-level predictions into lower-level subgoals. Three-level H-JEPA achieves 73.3% success on Visual AntMaze versus 18.0% for flat LeWM, while compute sweeps favor the hierarchy. Ablations distinguish benefits from shorter planning subproblems and more useful goal-cost representations. On DROID, inverse-dynamics supervision counters scene-only representations, and hierarchy improves offline path fidelity; physical robot task success is not evaluated.

## Research Question

Can reward-free, reconstruction-free world models learn a hierarchy of representations that improves long-horizon visual planning, and which gains come from temporal decomposition versus abstract goal costs?

## Motivation

A single latent space must preserve fine control dynamics while providing a useful distance to distant goals. Long flat rollouts compound prediction error and enlarge action search. [[concepts/hierarchical-latent-world-models|Hierarchical Latent World Models]] distribute these demands across timescales: lower levels model short transitions, while higher levels predict farther ahead and supply subgoals.

## Contributions

- An end-to-end hierarchy of [[concepts/joint-embedding-predictive-architectures|JEPAs]], each with its own state encoder, action encoder, predictor, and latent prediction objective.
- Probe evidence linking larger temporal-frequency gaps to selective loss of fast-varying information at upper levels, alongside environments where this abstraction does not emerge.
- Controlled comparisons with flat LeWM and shared-space HWM, plus cost-only ablations separating representation effects from hierarchical planning.
- An extension to diverse DROID scenes using inverse dynamics, with analysis of why marginal distribution regularization can preserve rank while allowing temporal collapse.

## Method

**Hierarchical training.** Level 1 encodes images and action blocks; Visual AntMaze additionally supplies proprioception. Upper state encoders transform lower-level latents, while action encoders pool intervening commands into macro-actions. Stride controls temporal spacing and window size controls the observations summarized by each state. All experiments use window size one. Simulation models use upper strides of two; the headline two-level DROID model uses stride three.

Each level minimizes latent prediction error plus SIGReg, which encourages an isotropic Gaussian embedding distribution. Losses propagate through lower encoders, without reconstruction, reward supervision, EMA targets, or stop-gradient latent targets in the headline setup. Simulation models build on a ViT-Tiny LeWM base; DROID uses a ViT-S/16 base. Post-hoc image decoders serve visualization only (Sections 2 and C).

**Top-down planning.** Gradient descent optimizes the top-level macro-action sequence against the goal embedding. Its predicted states become subgoals. A lower planner rolls out its own dynamics and maps predictions through the next encoder before measuring subgoal distance, aligning both time and representation space. Simulation control follows the first subgoal, executes an action prefix, and replans. DROID planning is a single open-loop plan with intermediate and terminal subgoal costs (Sections 2.2 and E).

**Preserving action-relevant content.** Diverse scenes permit a representation that varies between episodes but stays constant within each episode. Such a representation can satisfy marginal anti-collapse regularization while supporting an identity predictor that ignores actions. DROID adds inverse-dynamics regression from consecutive states to their intervening action; upper-level macro-action targets are detached, and macro-actions receive their own SIGReg term. Appendix L's feasibility construction assumes an atomless, observable episode background. Its inverse-dynamics lower bound concerns exact collapse and depends on action variation unexplained by episode identity; it does not guarantee removal of distractors.

## Experiments

### Simulation Planning

Final evaluations use 50 start-goal tasks per environment and report mean success with standard error across three paired model/planner seeds. Candidate counts are selected on separate compute-sweep tasks under a 100-TFLOP mean planning budget. The following values come from Table 1, Table 9, and the flat AntMaze result in Section 4.2; depths shown are the strongest reported hierarchical means for these environments.

| Environment | Flat LeWM success (%) | H-JEPA success (%) | H-JEPA levels |
| --- | --- | --- | --- |
| Visual AntMaze | 18.0 +/- 3.5 | 73.3 +/- 3.5 | 3 |
| FourRoomDistractors | 40.7 +/- 6.8 | 96.0 +/- 1.1 | 3 |
| OGBench Cube | 32.0 +/- 6.1 | 60.0 +/- 5.0 | 3 |
| Push-T | 40.0 +/- 2.3 | 45.3 +/- 1.3 | 2 |

Compute sweeps favor deeper models through three levels on AntMaze, FourRoom, and Cube. Push-T deteriorates to 17.3% at three levels and 0.7% at four. Its deeper models retain only 58% and 14% of the flat model's training clips per epoch. Training is epoch-matched, not matched in optimizer steps or training FLOPs, so data availability is a plausible explanation rather than an isolated causal result.

**Representation versus decomposition.** The controlled HWM baseline replaces upper encoders with identity maps. It improves mean success over LeWM in all four environments; H-JEPA adds particularly large gains on AntMaze. With the three-level AntMaze model's level-1 dynamics held fixed, changing only the cost from native level 1 to level 3 raises success from 16.7 +/- 1.8% to 22.0 +/- 2.3%; full hierarchy reaches 73.3 +/- 3.5%. These are within-model ablations, distinct from the separately trained flat LeWM comparison. Projected costs also help FourRoom but offer no clear benefit on Push-T or Cube (Tables 1 and 9).

**Abstraction and data.** Frozen nonlinear probes show reduced recovery of fast body state or distractor position while preserving global position in navigation settings. Appendix F reports gaps of 3.1-12.7 times in environments with selective abstraction, versus 1.2-1.6 times in Push-T, Cube, and DROID, where entity recoverability changes little. Frequency separation is observational evidence, not proof of unpredictability. A separate stagewise AntMaze study achieves 67% with exploratory lower-level data and coherent upper-level data, versus 54% for end-to-end training on their union; reversing the stagewise pairing yields 2% (Appendix G).

### DROID and Collapse

Training uses a re-encoded corpus of 74,530 episodes. Offline evaluation uses 16 selected, held-out pick-and-place clips with favorable visibility, each spanning about 7.2 seconds. Fidelity is one minus the discrete Frechet distance between planned and expert cumulative xyz paths divided by the zero-action path's distance to the expert. Zero denotes the do-nothing baseline, 100% an exact path match, and negative values worse path agreement than doing nothing.

The paper reports higher fidelity at lower planner compute for two-level H-JEPA than LeWM+IDM, and an advantage over shared-space HWM (Figure 9). Exact headline fidelity values are not tabulated in the supplied Markdown. Frozen-encoder reference checkpoints operate at their native 1 fps on 15 compatible clips, whereas the trained models use 5 fps on 16 clips, limiting direct comparison.

The anti-collapse grid finds that SIGReg maintains representation rank, while inverse dynamics is needed for useful planning fidelity in the tested recipe. Increasing SIGReg alone delays but does not prevent slow-feature collapse. Temporal repulsion keeps predictions action-sensitive but does not reliably recover useful fidelity; the smallest coefficient's final mean is 2.44 +/- 5.80%, whereas the Table 12 IDM-on control reaches 30.66 +/- 1.05%. This control is separate from the headline Figure 9 comparison (Appendices K-L).

## Limitations

- DROID measures offline xyz path agreement, not executed manipulation success, orientation accuracy, or gripper correctness. Simulation calibration shows that high fidelity need not imply a successful grasp.
- DROID's small, selected clip set limits coverage. Auxiliary rollout diagnostics remain training-set measurements; frozen-encoder references differ in frame rate and eligible clips.
- Selective abstraction and improved projected costs are environment-dependent. More hierarchy can hurt, particularly when longer training clips exclude much of the available data.
- AntMaze uses proprioception in addition to images. Training costs and optimizer-step counts are not matched across depths.
- The method requires action labels and uses fixed temporal strides. Action-free learning, language goals, joint multi-camera encoding, and closed-loop physical robot evaluation remain future work.
- The supplied text does not explicitly identify the paper's publication year, venue, or stable identifier; the year is left unspecified.

## Related Concepts

- [[concepts/hierarchical-latent-world-models|Hierarchical Latent World Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/world-models|World Models]]
- [[concepts/slow-feature-analysis|Slow Feature Analysis]]

## Related Papers

- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels": the flat LeWM foundation and baseline (reference [53]).
- Zhang et al. (2026), "Hierarchical Planning with Latent World Models": HWM, the shared-latent-space hierarchical comparator (reference [92]).
- Sobal et al. (2022), "Joint Embedding Predictive Architectures Focus on Slow Features": prior scene-only collapse and inverse-dynamics evidence (reference [72]).
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]]: related latent-planning work cited as reference [83].

[[index|Library home]]
