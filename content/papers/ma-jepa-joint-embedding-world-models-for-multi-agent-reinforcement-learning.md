---
title: "MA-JEPA: Joint-Embedding World Models for Multi-Agent Reinforcement Learning"
type: paper
authors:
  - Brandon Gary Kaplowitz
  - Osaze James Obahor
  - Christian Schroeder de Witt
year: null
source_job_id: "e7754807-b7f8-4681-a6ee-f7e0a621631c"
tags:
  - world-models
  - multi-agent-reinforcement-learning
  - model-based-reinforcement-learning
  - joint-embedding-predictive-architectures
  - centralized-training-decentralized-execution
---

## TL;DR

MA-JEPA is a reconstruction-free world model for cooperative multi-agent reinforcement learning. During centralized training, a joint predictor maps all agents' local latent states and joint actions to each agent's next observation embedding; the same local posterior used with real observations converts that prediction into the actor state. On eight StarCraft Multi-Agent Challenge tasks, MA-JEPA matches or exceeds the strongest comparator mean win rate on four maps and exceeds the strongest model-free baseline on seven, but it trails the model-based DMAWM baseline on several maps and is unstable on kiting tasks.

## Research Question

Can a joint-embedding world model capture action-dependent interactions during centralized training while keeping the policy state and execution process fully decentralized?

## Motivation

An agent's local transition can depend on its teammates' simultaneous actions, so a world model conditioned only on the focal agent's history is incomplete. A centralized model can capture those interactions, but training an actor on a centralized state creates an information mismatch at decentralized execution. MA-JEPA addresses both issues by using centralized information only to predict the next local observation embedding and passing that prediction through the agent's ordinary local posterior.

## Contributions

- Introduces a model-based centralized-training/decentralized-execution architecture in which a joint predictor supplies agent-specific observation embeddings rather than centralized actor states.
- Extends [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] to multi-agent latent imagination without an observation-reconstruction loss.
- Combines parameter-shared local recurrent world models, a training-only joint interaction model, decentralized actors, and a centralized critic.
- Studies how gradients from factual outcome prediction and joint embedding prediction shape local representations, finding task-dependent effects and the best average result from enabling both routes across the three ablation maps.

## Method

Each agent independently maintains a deterministic Transformer history state and a categorical stochastic latent inferred from its local observation embedding. Their concatenation is the state used by a shared decentralized policy. Local posterior and dynamics predictors learn to match an exponential-moving-average target embedding; SIGReg regularizes the online embeddings against collapse. The vector-observation configuration has no observation decoder.

During training, a joint Transformer consumes synchronized local states, the joint action, roster presence, and controllability. It predicts each agent's next local observation embedding as well as reward, discounted continuation, legal actions, and liveness. The predicted embedding is trained against both the EMA target and the stopped online encoding. Direct multi-step heads cover horizons 1, 2, 4, and 8, while recurrent self-fed supervision covers horizons 2, 4, and 5.

For imagined rollouts, each decentralized actor samples from its own local state. The joint model predicts the consequence of the synchronized action, but only as the observation-side input to the same local posterior used during real interaction. A centralized critic evaluates the collection of stopped local states and PPO updates the actors from five-step imagined returns. The joint predictor and critic are absent at execution.

The paper also gives conditional theoretical results. Under a whitened action-conditioned Gaussian model, every global minimizer of the stated population squared-error objective recovers the physical state up to an orthogonal transformation; after fixing that encoder, empirical Gaussian transition estimates are consistent for observed actions. A separate finite-alphabet result establishes consistency of empirical complete-successor laws under fixed parameters and collection policy. These assumptions do not establish identifiability or consistency for the full neural implementation.

## Experiments

The main study evaluates eight SMAC v1 maps using StarCraft II 4.10.0 and three available seeds, with matched nominal interaction budgets of 100K steps on six maps, 200K on `2c_vs_64zg`, and 400K on `corridor`. Comparators are DMAWM, MAPPO, QMIX, and MAT; each checkpoint evaluation uses 100 episodes.

| Map | MA-JEPA win rate, mean (SD) | Strongest comparator |
| --- | ---: | ---: |
| `2s_vs_1sc` | 97.3 (2.5) | MAPPO: 100.0 (0.0) |
| `2s3z` | 78.7 (14.5) | DMAWM: 88.0 (7.0) |
| `8m` | 92.0 (1.0) | DMAWM: 92.0 (4.6) |
| `MMM` | 91.0 (3.0) | DMAWM: 90.0 (4.6) |
| `so_many_baneling` | 95.0 (6.1) | DMAWM: 99.5 (0.7) |
| `3s_vs_4z` | 74.0 (7.5) | DMAWM: 95.7 (2.3) |
| `2c_vs_64zg` | 78.3 (9.5) | DMAWM: 75.3 (8.9) |
| `corridor` | 66.0 (3.5) | DMAWM: 50.0 (44.9) |

MA-JEPA therefore ties or leads the strongest reported mean on `8m`, `MMM`, `2c_vs_64zg`, and `corridor`. It exceeds the strongest model-free baseline on seven maps; `2s_vs_1sc` is the exception. Results on `3s_vs_4z` and the related kiting setting discussed by the authors have higher variance, which they hypothesize reflects recurrent action sequences extending beyond the five-step imagination horizon.

Across three gradient-ablation maps, the full method averages 77.0% win rate, versus 71.1% without factual JEPA gradients, 69.8% without outcome gradients, and 73.9% without either. Individual ablations win on particular tasks, so this supports a balanced default rather than uniform benefit from either gradient route.

## Limitations

- Evaluation is limited to eight discrete-action SMAC v1 tasks; continuous control, broader environments, and changing team compositions are not tested.
- The main results use only three available seeds, and variance is substantial on some tasks.
- MA-JEPA does not uniformly outperform DMAWM and is notably weaker on `2s3z`, `so_many_baneling`, and `3s_vs_4z` by mean win rate.
- The explanation of kiting failures as a horizon or latent-representation problem is a hypothesis, not a causal diagnosis.
- The factorial gradient ablation covers three maps, and its effects reverse across tasks.
- Direct multi-step action alternatives are discriminative negatives rather than observed counterfactual outcomes; distinct legal actions can have equivalent consequences.
- The theoretical results apply to restricted Gaussian or fixed finite-alphabet settings and should not be read as guarantees for the trained architecture.
- The supplied manuscript does not state a publication year, venue, or stable paper identifier, so these metadata remain unset.

## Related Concepts

- [[concepts/world-models|World Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]

## Related Papers

- Xue et al. (2026), "Learning Disentangled Multi-Agent World Model for Decentralized Control": DMAWM is the strongest model-based comparator across several SMAC maps.
- Egorov and Shpilman (2022), "Scalable Multi-Agent Model-Based Reinforcement Learning": MAMBA is a Dreamer-style multi-agent world-model predecessor.
- Zhang et al. (2025), "Decentralized Transformers with Centralized Aggregation Are Sample-Efficient Multi-Agent World Models": MARIE combines decentralized dynamics with centralized aggregation but trains policies on reconstructed observations.
- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture": supplies the JEPA representation-learning framework.
- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels": a single-agent, action-conditioned JEPA world-model predecessor.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]]: the representation-identification result that MA-JEPA extends to joint-action prediction under a restricted Gaussian model.
- [[papers/jedi-joint-embedding-diffusion-world-model-for-online-model-based-reinforcement-learning|JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning]]: another reconstruction-free JEPA world model, evaluated in single-agent online control with diffusion dynamics.

[[index|Library home]]
