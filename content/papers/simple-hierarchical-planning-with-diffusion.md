---
title: Simple Hierarchical Planning with Diffusion
type: paper
authors:
  - Chang Chen
  - Fei Deng
  - Kenji Kawaguchi
  - Caglar Gulcehre
  - Sungjin Ahn
year: null
source_job_id: "ba56bf7a-ca21-4a64-888a-712ec7605b67"
tags:
  - diffusion-models
  - hierarchical-planning
  - offline-reinforcement-learning
---

[[index|Library home]]

## TL;DR

Hierarchical Diffuser (HD) generates a sparse sequence of subgoals, then uses a second diffusion planner to fill in the intervening trajectories. Temporal subsampling expands the high-level model's effective receptive field while shortening its sequence. On the reported D4RL benchmarks, HD improves long-horizon navigation and its dense-action variant improves average locomotion and kitchen scores over Diffuser. A constructed Maze2D task also demonstrates composition of familiar trajectory segments into unseen start-goal routes.

## Research Question

Can fixed-interval temporal abstraction make diffusion-based offline planning faster and more effective while retaining the ability to compose trajectories for new goals?

## Motivation

Flat diffusion planners denoise full state-action trajectories, which becomes expensive over long horizons. The authors also observe incomplete coverage of distinct routes in generated plans. Increasing convolution kernel size improves coverage and in-distribution performance, but increases model size and computation. [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]] offers another way to represent long-range dependencies while retaining local detail through a separate planner.

## Contributions

- Introduces Sparse Diffuser (SD), trained on every $K$-th state-action pair, and HD, which adds shared low-level trajectory refinement between adjacent subgoals.
- Introduces dense-action variants that preserve intermediate actions alongside sparse states to improve return prediction.
- Evaluates navigation, locomotion, manipulation, receptive-field changes, subgoal spacing, compositional generalization, and wall-clock cost.
- Provides a denoising-loss generalization analysis relating temporal subsampling and conditional Rademacher complexity under stated assumptions (Appendices F-H).

## Method

For a trajectory spanning $T=HK$ environment steps, the high-level planner models subgoals $g_i=s_{iK}$. Standalone SD retains the corresponding actions and can execute its first action before replanning. In HD, the basic high-level model uses only the subgoal states because its generated actions are unnecessary for low-level execution.

Both levels use [[concepts/diffusion-models|Diffusion Models]] trained by noise prediction. A separate return predictor guides denoising toward high-return trajectories. The high-level predictor sees the subsampled representation but targets the return of the full trajectory. The shared low-level diffuser models $K+1$-state segments and has a segment-return predictor.

At inference, HD first generates the subgoal sequence, fixing the initial state throughout denoising. For each adjacent pair $(g_i,g_{i+1})$, the low-level model generates a dense segment with both endpoints fixed at every denoising step. All segments can be generated in parallel for open-loop execution. Closed-loop execution generates only the first segment, executes its first action, and replans from the observed state. The experiments use open-loop execution for Maze2D and closed-loop execution for AntMaze, MuJoCo, and FrankaKitchen (Appendix B).

SD-DA and HD-DA concatenate the $K$ intervening actions with each sparse state along the feature dimension. These actions help the high-level return predictor infer events omitted by state subsampling; HD-DA still discards them when refining the subgoals. The default interval is $K=15$ for long-horizon tasks and $K=4$ for MuJoCo (Appendix A).

The theoretical analysis bounds expected denoising loss using empirical loss, a term depending on the number of retained temporal positions, and conditional Rademacher complexity. It assumes independent trajectory samples and bounded expected coordinate losses; Appendix G adds network parameterization, norm, and sample-count assumptions for comparing complexities. This concerns diffusion-loss generalization, not a direct guarantee of control return or compositional OOD success. The supplied equations contain inconsistent radical placement and corrupted proof notation, so the exact bound is not reproduced.

## Experiments

Tables 1-2 report the following benchmark averages. These are benchmark scores, not success percentages. Navigation results use 100 planning seeds; locomotion and kitchen results use five planning seeds.

| Benchmark | Diffuser | Hierarchical variant | Score |
| --- | --- | --- | --- |
| Maze2D, three tasks | 119.5 | HD | 139.9 |
| Multi2D, randomized goals | 129.4 | HD | 149.9 |
| AntMaze, three tasks | 36.0 | HD | 88.8 |
| Gym-MuJoCo, nine dataset/task pairs | 77.5 | HD-DA | 84.6 |
| FrankaKitchen, partial and mixed | 53.1 | HD-DA | 72.5 |

On AntMaze-Large, HD scores 83.6 +/- 5.8 versus 0.0 +/- 0.0 for Diffuser and 67.3 +/- 3.1 for HiGoC. On kitchen partial/mixed, HD-DA scores 73.3 +/- 1.4 and 71.7 +/- 2.7. HD-DA has the highest reported MuJoCo average, but is not best on every task: HDMI scores 44.9 versus 38.1 on HalfCheetah medium-replay and 99.6 versus 94.7 on Hopper medium-replay.

**Ablations.** Table 3 separates subsampling from refinement: Maze2D averages are 119.5 for Diffuser, 133.4 for SD, and 139.9 for HD; MuJoCo averages are 77.5, 80.7, and 81.7. Dense actions further improve guidance validation loss on all three medium-replay locomotion environments in Table 4. Larger flat-model kernels improve in-distribution performance up to a threshold. Increasing $K$ is not uniformly beneficial: Maze2D averages are 139.9 at $K=15$ and 137.7 at $K=21$, while the MuJoCo appendix comparison gives 84.6 at $K=4$ and 81.8 at $K=8$.

**Compositional OOD task.** Training uses two million Maze2D transitions on diagonal routes; testing requires unseen start-goal pairs assembled from familiar route segments, with a 300-step limit. Table 5 reports 100% success for HD and 0% for Diffuser with kernel sizes 5, 13, 19, and 25. HD has cosine similarity 0.98 and trajectory MSE 198.2 against controller-generated reference paths, compared with 0.85-0.93 and 758.5-1311.1 for the baselines. Appendix E computes trajectory discrepancies using 100 sampled plans per model per test task and ten reference paths. These results describe this constructed task, not unrestricted OOD planning.

**Timing.** Table 6 measures seconds per 100 training updates and per complete plan on one NVIDIA RTX 8000 (Appendix D).

| Task | Training, Diffuser / HD | Planning, Diffuser / HD |
| --- | --- | --- |
| U-Maze | 26.6 / 8.0 | 1.1 / 0.8 |
| Medium Maze | 132.7 / 8.7 | 9.9 / 3.1 |
| Large Maze | 119.7 / 8.6 | 9.9 / 3.3 |
| Hopper-Medium-Expert | 12.3 / 9.9 | 1.3 / 1.0 |

The medium/large maze entries imply approximately 14-15 times faster training updates and 3 times faster planning. The prose's 10-times speedup statement does not match the planning entries. Horizons differ slightly to accommodate divisibility by $K$: Diffuser/HD use 256/255 steps for medium and 384/390 for large maze.

## Limitations

- Offline dataset coverage and quality constrain attainable plans; unfamiliar trajectories may remain difficult.
- Fixed subgoal spacing introduces a task-dependent hyperparameter and can omit details needed for feasible control and accurate return guidance.
- Evidence covers state-based simulated tasks. Visual planning is proposed future work.
- Planning-seed uncertainty does not establish robustness across independent training runs. The compositional experiment is a specific synthetic navigation setup.
- The source uses $H$ for both coarse-plan length and environment-step horizons in different sections. The method description above distinguishes $H$ subgoal intervals from $T$ environment steps.

Source note: The supplied Markdown states no publication year, venue, DOI, or arXiv identifier for this paper. The year is left null; identifiers of cited works are not assigned to it. Numerical summaries above follow the tables where prose or captions disagree.

## Related Concepts

- [[concepts/hierarchical-diffusion-planning|Hierarchical Diffusion Planning]]: sparse subgoal generation followed by conditioned local refinement.
- [[concepts/diffusion-models|Diffusion Models]]: iterative denoising and gradient-guided trajectory generation.
- [[concepts/world-models|World Models]]: learned environment models for planning; HD jointly generates trajectories instead of using a separate sequential rollout model and search procedure.

## Related Papers

- Janner et al. (2022), "Planning with Diffusion for Flexible Behavior Synthesis": Diffuser, the underlying flat trajectory model and principal baseline (cited as 2022a/2022b in the source).
- Li et al. (2023), "Hierarchical Diffusion for Offline Decision Making": HDMI, a hierarchical diffusion baseline using explicit subgoal preprocessing.
- Li et al. (2022), "Hierarchical Planning through Goal-Conditioned Offline Reinforcement Learning": HiGoC, a non-diffusion hierarchical AntMaze comparator.
- [[papers/temporal-straightening-for-latent-planning|Temporal Straightening for Latent Planning]]: a library comparison, not a source citation; improves planning through latent geometry and gradient optimization rather than temporally subsampled trajectory diffusion.
