---
title: Heterogeneous Federated Reinforcement Learning Using Wasserstein Barycenters
type: paper
authors:
  - Luiz Manella Pereira
  - M. Hadi Amini
year: null
tags:
  - federated-learning
  - reinforcement-learning
  - optimal-transport
  - wasserstein-barycenters
  - model-fusion
---

## TL;DR

FedWB periodically fuses identically structured neural networks by treating flattened, shifted, and normalized layer weights as probability distributions and computing [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]. On distributed MNIST and heterogeneous CartPole environments, the reported experiments show stronger early learning than arithmetic federated averaging, but both approaches eventually reach similar performance and Wasserstein aggregation costs more to compute. The evidence is limited to small simulations, and the claimed distributed speedups are extrapolated rather than measured on distributed hardware.

## Research Question

Can Wasserstein-barycenter model fusion replace arithmetic parameter averaging in distributed neural-network training and [[concepts/heterogeneous-federated-reinforcement-learning|Heterogeneous Federated Reinforcement Learning]], producing a global model that learns effectively across partitioned data or distinct environments?

## Motivation

Federated averaging combines local parameters cheaply but ignores the geometry represented by the local weight distributions. The paper asks whether transport-based averaging can provide a more informative aggregation step. Its reinforcement-learning setting also requires one global policy to work across environments that differ in their dynamics, represented here by CartPole systems with different pole lengths.

## Contributions

- Introduces FedWB, a synchronous distributed-training procedure that replaces arithmetic parameter averaging with layerwise Wasserstein-barycenter fusion.
- Adapts the same aggregation procedure to deep Q-networks trained with experience replay in heterogeneous environments.
- Compares FedWB with FedAvg on distributed MNIST and with a DQN averaging baseline on heterogeneous CartPole.
- Identifies an empirical trade-off: FedWB improves earlier in training, while arithmetic averaging is cheaper and eventually reaches similar performance in the reported experiments.

## Method

Each agent receives the same neural-network architecture and trains locally. After a local training interval, a central server collects corresponding weight matrices. For each matrix, FedWB flattens the weights, applies a minimum-weight shift intended to obtain nonnegative values, normalizes them to sum to one, and computes a Wasserstein barycenter across agents. It then reverses the normalization using averages of the stored scaling terms, reshapes the result, and broadcasts the resulting global model back to every agent.

For MNIST, the training set is split into nearly equally represented local partitions. Agents train in parallel with stochastic gradient descent, aggregate after each local epoch, and replace their local parameters with the fused global parameters.

For heterogeneous reinforcement learning, each agent has a CartPole environment with a different pole length and maintains online and target Q-networks. Agents collect transitions using an epsilon-greedy policy, train from replay batches, periodically update their target networks, and fuse their Q-network parameters through FedWB. The intended output is one global DQN that controls all of the environments.

## Experiments

**Distributed MNIST.** The data contain 60,000 training images and 10,000 test images. The implementation runs on one computer with an NVIDIA GeForce RTX 2070. As the number of agents increases, more epochs are generally needed to exceed 90% test accuracy, although the pattern is non-monotonic. The paper's theoretical time calculation, which excludes synchronization and communication costs, reports relative times of 1.0 for one agent, 0.75 for two, 0.50 for three, 0.20 for ten, and 0.15 for thirty agents. These figures are architectural extrapolations, not distributed wall-clock measurements.

With ten agents, the global model rises from near-zero initial accuracy to above 80% after the first aggregation and exceeds 95% by roughly 25 epochs; local-model accuracies then span about 90% to nearly 100%. In the comparison against conventional training and FedAvg, FedWB improves more rapidly in early epochs but flattens, while FedAvg catches up. Conventional single-model training reaches the highest final accuracy in the displayed comparison but requires more time per 25 epochs according to the authors' discussion.

**Heterogeneous CartPole.** Pole length varies across agents. Models train for at most 600 episodes, and performance is the duration for which the pole remains balanced, shown both per episode and with a 50-episode moving average. FedWB begins with and maintains higher control duration than FedAvg early in training. Around episode 450 their capabilities become close, and by the end both can reach the environment cap of 500 actions.

## Limitations

The experiments use MNIST and CartPole, so they do not establish performance on large neural networks, complex control tasks, or realistic federated deployments. All simulations run on one GPU-equipped computer. The MNIST speed comparison omits communication, synchronization, and Wasserstein-solver overhead and therefore does not demonstrate realized distributed speedup.

The paper reports trajectories from the selected experimental setup but does not provide uncertainty estimates, repeated-run variability, or statistical tests. CartPole learning is sensitive to exploration schedules and other hyperparameters, and the paper notes substantial temporal variance. The comparison also changes optimization and architecture details relative to the described FedAvg setup, including stochastic rather than mini-batch gradient descent and a different hidden-layer design, which limits attribution of differences solely to aggregation.

FedWB requires identical model architectures and incurs a more expensive aggregation step than arithmetic averaging. Flattening and shifting each weight matrix produces a one-dimensional probability representation, but the experiments do not establish that this representation preserves neuron correspondence or functional equivalence between independently trained networks. The proposed switch from FedWB to FedAvg is a conclusion suggested by the observed trade-off, not an experimentally evaluated hybrid algorithm.

## Related Concepts

- [[concepts/heterogeneous-federated-reinforcement-learning|Heterogeneous Federated Reinforcement Learning]]
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- McMahan et al. (2017), "Communication-Efficient Learning of Deep Networks from Decentralized Data": introduces Federated Averaging, the arithmetic-aggregation baseline.
- Singh and Jaggi (2020), "Model Fusion via Optimal Transport": aligns neurons layer by layer through optimal transport before averaging.
- Akash, Li, and Garcia Trillos (2022), "Wasserstein Barycenter-Based Model Fusion and Linear Mode Connectivity of Neural Networks": studies one-shot fusion of neural networks through layerwise probability measures and Wasserstein barycenters.
- Jin et al. (2022), "Federated Reinforcement Learning with Environment Heterogeneity": develops Q-network and policy-network averaging baselines for heterogeneous environments.

[[index|Library home]]
