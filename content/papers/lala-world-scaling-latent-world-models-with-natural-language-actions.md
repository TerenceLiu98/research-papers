---
title: "LaLa-World: Scaling Latent World Models with Natural Language Actions"
type: paper
authors:
  - Junha Song
  - Geonmo Gu
  - Jeongeun Park
  - Heejeong Nam
  - Lucas Maes
  - Byeongho Heo
  - Dongyoon Han
  - Sangdoo Yun
year: null
tags:
  - world-models
  - joint-embedding-predictive-architectures
  - language-conditioned-models
  - model-predictive-control
  - robot-learning
---

## TL;DR

LaLa-World uses natural-language descriptions as a common action interface for training one latent future predictor across heterogeneous control trajectories, image-editing pairs, and videos. Its Qwen3.5-based predictor forecasts frozen visual features rather than pixels. In the reported experiments, the jointly trained model has the best average MPC score among the tested latent world models, and a matched comparison reports higher planning performance than an RAEv2 generative baseline with lower training and inference cost. Fine-tuning the predictor into LaLa-Policy yields competitive LIBERO and RoboCasa policies with substantially faster inference than the adapted Cosmos Policy baseline.

## Research Question

Can a [[concepts/joint-embedding-predictive-architectures|JEPA-style]] latent world model use language to unify incompatible action spaces and actionless visual data, while retaining efficient planning and providing a useful initialization for robot-policy learning?

## Motivation

Action-conditioned [[concepts/world-models|World Models]] commonly receive numerical controls whose dimensions and meanings depend on the domain. This prevents a single predictor from directly pooling many control datasets and excludes most image and video data, which lack numerical action annotations. Video generation models avoid this interface problem through text conditioning, but synthesizing visual detail makes repeated model-predictive rollouts expensive. LaLa-World asks whether language can provide the flexible interface without requiring pixel reconstruction.

## Contributions

- Expresses numerical controls and observed visual changes as language-conditioned transitions, allowing one predictor to train on seven control datasets together with OpenVid-1M, OmniEdit, and ShareGPT-4o-Image.
- Uses a pretrained language model as the future predictor itself: text tokens, projected visual tokens, and learned spatial query tokens are processed in one network to predict the next visual latent grid.
- Compares joint and per-domain latent world models across simulation and robot planning, including zero-shot RoboCasa evaluation and qualitative action descriptions without exact magnitudes.
- Matches language conditions, training data, visual encoder, and approximate predictor scale in a comparison with an RAEv2 generative world model.
- Fine-tunes the pretrained predictor into LaLa-Policy, which jointly predicts action chunks and future visual representations.

## Method

**Shared transition format.** Numerical action vectors are converted with domain-specific fixed templates that retain component direction and magnitude. Captioned video transitions and instructed image edits supply descriptions of visual change instead. The combined training pool therefore represents every transition as past observations, a language condition, and a future observation. Numerical controls are also rendered in qualitative form by mapping magnitudes to three bins: *slightly*, an unmodified direction, or *far*.

**Latent predictor.** A frozen DINOv2-S/14 or DINOv3-L/16 encoder maps frames to patch representations. A two-layer MLP projects those patches into the embedding space of a Qwen3.5-0.8B backbone. Text tokens and projected visual tokens receive learned or sinusoidal position information, and one learned query per target patch reads out the future latent grid. The trainable predictor minimizes squared error to the frozen encoder's next-frame representation. It receives neither proprioception nor a pixel-reconstruction objective.

**Planning.** Model-predictive control uses the cross-entropy method to optimize candidate numerical action sequences. Each candidate is verbalized, rolled forward autoregressively in latent space, and scored by squared distance between its terminal predicted representation and the encoded goal image. The selected numerical controls are executed in the simulator, followed by replanning where required.

**Policy adaptation.** LaLa-Policy adds proprioceptive inputs, action queries, and a diffusion-transformer action generator. Given camera observations and a task instruction, the predictor supplies conditioning features for an action chunk while also predicting the visual representation at the end of that chunk. Fine-tuning combines flow-matching action loss with future-latent regression.

## Experiments

**Latent-space planning.** Across Wall, PointMaze, Push-T, MetaWorld Reach and Reach-Wall, LaLa-World averages 72.1% success, versus 64.6% for JEPA-WMs and 62.3% for DINO-WM. Across Rope, Granular, zero-shot RoboCasa Reach and Place, and offline DROID evaluation, it has the best reported group average at 50.5%. The gains are not uniform: JEPA-WMs scores higher on PointMaze and DROID, while LaLa-World leads the remaining tasks in the two main tables.

Adding image and video transitions raises the five-domain average from 59.3 to 61.6 and reduces the drop under paraphrased action templates from 6.8 points to 0.6 points. Qualitative actions remain effective on several environments but fail sharply on Push-T, where success falls from 81.2% with numerical language to 4.2% with three-level qualitative magnitudes.

**Matched latent-versus-generative comparison.** With the same DINOv3-L/16 encoder, language interface, and training mixture, full-depth LaLa-World reports a 59.4 average planning score, versus 40.4 for one-step and 48.0 for five-step RAEv2. It reaches the five-step baseline's 12-hour score after two hours of training and plans 2.9 times faster than one-step RAEv2 and 13.9 times faster than five-step RAEv2 in the reported setup. These comparisons concern the authors' adapted RAEv2 baseline, not generative world models generally.

**Policy fine-tuning.** LaLa-Policy initialized from LaLa-World reaches 97.7% average success on LIBERO, compared with 97.3% for Cosmos Policy initialized from Cosmos-Predict2. On RoboCasa it reaches 57.3% with about 50 demonstrations per task and 66.4% with 300 demonstrations, versus 56.0% for the reported Cosmos Policy result in the 50-demonstration setting. Average inference time per trajectory is 0.86 seconds on LIBERO and 2.12 seconds on RoboCasa, reported as 5.2 and 5.5 times faster than Cosmos Policy.

**Additional analyses.** ImageNet transformation retrieval reaches 0.856 mean reciprocal rank with language actions, compared with 0.026 under empty language. Architecture ablations find that Qwen3.5, 3D positional embeddings, and learned query readout produce the strongest language-sensitivity pattern among the tested designs. A separate exploratory planner replaces CEM with an LLM actor and uses 8--96 model rollouts rather than CEM's 4,500--54,000, with task-dependent success losses and gains.

## Limitations

- The world model is supervised only on the next latent state and evaluated with planning horizons no longer than six model steps; long-horizon rollout stability is not established.
- The vision encoder is frozen. This avoids collapse but prevents the representation from adapting to future prediction, and encoder choice produces large, non-uniform differences across environments.
- Language does not eliminate domain-specific engineering: numerical actions still require templates, aggregation rules, and simulator-specific mappings, while qualitative magnitude discretization can discard crucial control precision.
- RoboCasa world-model planning is zero-shot, but the policy experiments are simulator fine-tuning studies. No real-robot policy evaluation is reported.
- The matched generative comparison uses one RAEv2-based implementation and finite denoising budgets; it does not establish a universal advantage over video generation models.
- Planning still depends on expensive CEM search. The exploratory LLM planner reduces rollouts but remains substantially weaker on precision-sensitive tasks.
- The supplied manuscript does not provide a stable paper identifier, explicit publication year, or venue; those metadata are therefore left unspecified.

## Related Concepts

- [[concepts/world-models|World Models]]: action-conditioned predictors used for latent-space imagination and goal-directed planning.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: the reconstruction-free next-representation objective underlying LaLa-World.
- [[concepts/flow-matching|Flow Matching]]: used by LaLa-Policy's action generator and by the RAEv2 comparison baseline.
- [[concepts/diffusion-models|Diffusion Models]]: provide the iterative action-generation and generative-world-model comparison context.

## Related Papers

- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]] predicts complete future latent trajectories with a conditional vector field, whereas LaLa-World uses deterministic next-latent regression and language conditioning.
- [[papers/lewam-end-to-end-world-and-action-modeling-with-jepas|LeWAM: End-to-End World and Action Modeling with JEPAs]] jointly trains latent dynamics and an action policy per task; LaLa-World instead emphasizes cross-domain language-conditioned pretraining with a frozen visual encoder.
- Zhou et al. (2025), "DINO-WM: World Models on Pre-Trained Visual Features Enable Zero-Shot Planning": a frozen-feature, numerical-action planning baseline evaluated in the paper.
- Assran et al. (2025), "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning": a JEPA world-model and robot-planning predecessor.
- Kim et al. (2026), "Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning": the principal video-model policy comparison and adaptation recipe.

Source: supplied parsed manuscript, Cognitio job `d9963b4a-21db-40f8-911f-56ddfc5da5a3`.

[[index|Library home]]
