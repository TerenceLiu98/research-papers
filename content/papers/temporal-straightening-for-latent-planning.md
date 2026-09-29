---
title: Temporal Straightening for Latent Planning
type: paper
authors:
  - Ying Wang
  - Oumayma Bounou
  - Gaoyue Zhou
  - Randall Balestriero
  - Tim G. J. Rudner
  - Yann LeCun
  - Mengye Ren
year: null
source_job_id: "29ba8005-9335-4a65-9b1f-5bebac5f5ef9"
tags:
  - world-models
  - representation-learning
  - latent-planning
  - temporal-straightening
---

## TL;DR

Penalizing changes in latent trajectory direction improves gradient-based goal-reaching in four simulated environments. Jointly training a visual representation and a JEPA predictor with this curvature loss produces a more useful Euclidean goal cost than frozen DINOv2 features. Gains are strongest with spatial representations; long-horizon manipulation remains difficult, and some configurations do not improve. The conditioning theory applies to linear dynamics under explicit assumptions, rather than guaranteeing convex planning with the nonlinear models used in experiments.

## Research Question

Can regularizing latent trajectory geometry make Euclidean goal distances more informative and gradient-based action optimization more effective in learned world models?

## Motivation

Pretrained visual features can preserve semantic information while inducing curved trajectories and misleading distances between states. A planner minimizing latent terminal error may then struggle even when the world model is differentiable. [[concepts/temporal-straightening|Temporal Straightening]] adapts representation geometry to observed transitions without requiring expert trajectories or temporal negative samples.

## Contributions

- Combines latent prediction with a cosine-based curvature penalty in an action-conditioned [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]].
- Relates near-identity linear state transitions to bounds on the effective condition number of the planning Hessian, with a directional justification for the cosine proxy.
- Evaluates open-loop planning and model predictive control (MPC), representation dimensions, regularization variants, and gradient descent versus cross-entropy search.
- Uses distance heatmaps and a teleportation example to examine whether representations reflect transition structure rather than appearance alone.

## Method

An observation encoder produces $z_t$, an action encoder embeds controls, and a causally masked ViT predicts subsequent latents from a history of three frames and actions. The visual representation is either a frozen DINOv2 backbone with a trainable CNN projector or a ResNet trained from scratch. Proprioception is included when available.

For consecutive latent displacements $v_t=z_{t+1}-z_t$, training combines

$$
\mathcal L_{\mathrm{pred}}=\|\hat z_{t+1}-\operatorname{sg}(z_{t+1})\|_2^2,
\qquad
\mathcal L_{\mathrm{curv}}=1-\frac{v_t^\top v_{t+1}}{\|v_t\|_2\|v_{t+1}\|_2},
\qquad
\mathcal L=\mathcal L_{\mathrm{pred}}+\lambda\mathcal L_{\mathrm{curv}}.
$$

The curvature term acts only on visual features. For spatial representations, the main experiments use a learned aggregation head for straightening while retaining spatial prediction targets. Stop-gradient on the prediction target is the main anti-collapse mechanism; the authors acknowledge that collapse remains possible in theory. A detached image decoder is trained for visualization, not as a reconstruction objective for the world model.

Planning differentiates through predicted rollouts to optimize actions. Main short-horizon evaluations use 25 environment steps with frameskip five, giving five model transitions. Open-loop planning executes the full plan; MPC executes the first five-step chunk and replans. Maze MPC uses weighted intermediate goal costs; PushT uses terminal loss within the subplanner horizon. Table 4 specifies Adam, 100 optimization steps, learning rate 0.1, and zero action initialization.

For linear dynamics $z_{t+1}=Az_t+Ba_t$, the terminal-MSE Hessian is $H=2J^\top J$, where $J=[A^{K-1}B,\ldots,B]$. Its nonzero spectrum is related to the controllability Gramian $JJ^\top$. With square invertible $B$ and $\varepsilon=\|A-I\|_2<1$, the paper bounds

$$
\kappa_{\mathrm{eff}}(H)\leq\kappa(B)^2
\left(\frac{1+\varepsilon}{1-\varepsilon}\right)^{2(K-1)}.
$$

This controls an upper bound on conditioning. The cosine argument assumes constant latent speed and bounded action changes and controls $A-I$ only along visited velocity directions. A uniform spectral bound needs additional coverage assumptions; low-dimensional actions require additional controllability assumptions (Appendix C).

## Experiments

Training uses offline trajectories: 1,920 for Wall, 2,000 for PointMaze-UMaze, 4,000 for PointMaze-Medium, and 18,500 for PushT. Evaluation samples reachable start-goal pairs from test trajectories. Table 1 reports success percentages over 50 episodes per evaluation seed, with mean and standard deviation over three evaluation data seeds, not three stated training seeds.

The following Table 1 subset compares frozen DINOv2 patch features with a trained spatial projector, with and without straightening. Each entry is open-loop / MPC success (%); uncertainty is retained for the straightened model.

| Environment | Frozen DINOv2 | Projector, no curvature loss | Projector + straightening |
| --- | --- | --- | --- |
| Wall | 52.67 / 76.67 | 80.00 / 90.67 | 90.67 +/- 0.94 / 100.00 +/- 0.00 |
| UMaze | 35.33 / 80.67 | 44.00 / 81.33 | 94.00 +/- 1.63 / 100.00 +/- 0.00 |
| Medium | 40.83 / 76.67 | 72.00 / 96.67 | 82.67 +/- 3.77 / 98.67 +/- 0.94 |
| PushT | 56.00 / 66.00 | 70.00 / 78.67 | 77.33 +/- 6.18 / 85.33 +/- 4.99 |

Frozen features have shape $14\times14\times384$; projected features retain the spatial grid with eight channels. The no-curvature projector is an important control because representation training itself improves most of these results. Spatial straightening uses $\lambda=0.1$. Spatial encoder learning rates differ between straightened and unregularized training ($10^{-5}$ versus $10^{-6}$; Table 3), so those comparisons also include an optimization-setting difference.

**Geometry and ablations.** Maze distance heatmaps are compared with grid-based A-star distances, providing qualitative evidence of improved alignment with feasible paths. Preserving spatial structure generally helps more than retaining many channels. The aggregation-head variant performs best in the reported comparison. Smoothness and temporal contrastive regularization do not improve the tested PushT setup (Appendices B.4-B.6); this does not establish their failure in other settings.

**Planner trade-off.** CEM uses 200 candidate sequences and 10 iterations. The authors report roughly tenfold greater wall-clock planning time than gradient-based planning in their comparison, including PushT timing on a single L40S GPU. CEM often achieves higher success, but neither its advantage nor the benefit of straightening is universal: for the spatial projector on Medium, CEM success decreases from 92.67% to 86.67% after straightening (Table 5).

**Longer horizons.** With goals sampled 50 environment steps away, the straightened spatial projector reaches 13.33% open-loop and 24.00% MPC success on PushT, compared with 3.33% and 27.33% for frozen DINO-WM. Adding an aggregated-feature goal cost with weight 0.1 raises these to 20.00% and 33.33%. On Medium, the straightened projector achieves 68.00% / 88.00%, versus the baseline's 35.00% / 65.33% (Table 2). The added global cost helps MPC or ties its mean across the listed straightened models, but can reduce open-loop success on Medium.

## Limitations

- Evidence covers visually simple 2D simulation, not real-world robotic deployment. Long-horizon prediction errors still produce drift and failed manipulation.
- Benefits depend on architecture and task. In Table 1, global DINOv2-projector PushT MPC drops from 11.33% to 8.67%; spatial ResNet PushT open-loop success changes from 71.33% to 70.67%. Broad prose claims of improvement across all settings exceed the tabulated results.
- The linear conditioning analysis does not prove convergence guarantees for nonlinear predictors or guarantee recovery of geodesic distances. Directional cosine control is weaker than a global near-identity transition bound.
- Symmetric Euclidean costs cannot fully represent asymmetric reachability. Teleported-PointMaze supplies qualitative examples, not an aggregate success-rate evaluation, and its heatmaps do not resolve this asymmetry.
- Appendix B.1 describes Gaussian action initialization whereas Table 4 specifies zero initialization. The summary follows the concrete hyperparameter table and preserves the discrepancy.
- The supplied Markdown gives no publication year, venue, or stable identifier for this paper. Bibliography years and identifiers belong to cited works and are not used to infer its metadata.

## Related Concepts

- [[concepts/temporal-straightening|Temporal Straightening]]
- [[concepts/world-models|World Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/slow-feature-analysis|Slow Feature Analysis]]: a conceptual comparison between slow variation and directional straightness, not an evaluated SFA baseline.

## Related Papers

- Zhou et al. (2025), "DINO-WM: World Models on Pre-Trained Visual Features Enable Zero-Shot Planning": the principal frozen-feature baseline and a training-data source.
- Goroshin, Mathieu, and LeCun (2015), "Learning to Linearize Under Uncertainty": prior curvature regularization for video representations discussed in the paper.
- Sobal et al. (2025), "Learning from Reward-Free Offline Data: A Case for Planning with Latent Dynamics Models": related JEPA planning from offline simulator data.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]]: a library comparison on latent geometry and conditional planning guarantees; not a citation in the supplied bibliography.

[[index|Library home]]
