---
title: Mastering percolation-like games with deep learning
type: paper
authors:
  - Michael M. Danziger
  - Omkar R. Gojala
  - Sean P. Cornelius
year: null
tags:
  - percolation
  - network-robustness
  - deep-reinforcement-learning
---

## TL;DR

Deep Q-learning learns sequential attacks on square lattices under three different failure criteria. Trained agents outperform random attacks, but transfer depends on the objective: network-mode training transfers reasonably to flow mode, while the reverse can fail badly; network and noodle strategies transfer poorly in both directions. The experiments show objective-sensitive attack strategies, without proving globally optimal play.

## Research Question

Can a common reinforcement-learning architecture learn to disable a lattice in few moves under different definitions of functionality, and how well do learned strategies transfer between those definitions?

## Motivation

Random-failure percolation and fixed attack heuristics do not capture an attacker adapting actions to the current configuration. Turning failure into a single-player game makes the stopping condition explicit and allows optimization of moves to completion rather than cumulative damage along the attack trajectory.

## Contributions

- Defines network, flow, and surface-to-volume-based noodle games on a shared lattice representation.
- Trains convolutional Q-functions with a constant per-move penalty.
- Uses cross-objective evaluation and spatial Q-value visualizations to reveal differences between learned strategies.

## Method

Each cell has one of four states: active, inactive, attacked, or blocked. The player attacks an active cell, removing it from connectivity; components then become inactive according to the game rules.

| Mode | Functionality criterion |
| --- | --- |
| Network | The active largest component must remain larger than the largest inactive component. Preserving a large inactive component can therefore help end the game. |
| Flow | Active components must connect the top and bottom boundaries. |
| Noodle | A component becomes inactive when its boundary-face count divided by its number of sites exceeds a threshold K. |

The reward is −1 per move, with terminal value zero, so maximizing undiscounted return minimizes completion time. A ten-layer convolutional encoder uses 3×3 kernels and 64-dimensional cell embeddings. Channel-wise minimum, maximum, sum, and mean pooling supply global features; a prediction head combines these with local cell features. Ineligible actions receive negative-infinite Q-values.

Training uses Adam, squared Bellman error, experience replay with capacity one million, batches of 128, and a periodically copied target network. The manuscript calls its stabilization approach double Q-learning, although its written account emphasizes fixed target networks. Exploration decreases from 1.0 to 0.05 over 100,000 epochs. Training lasts one million epochs, with ten rollout games and target-network updates every 1,000 epochs.

Boards are 20×20, with open-site probability p sampled uniformly from [0.5, 1.0]; initially terminal boards are discarded. The blocked fraction is 1−p.

## Experiments

Figures 3 and 7 report completion steps over 1,000 random boards or simulated games, with standard-deviation error bars. Trained agents outperform random play on their own tasks. The difference is small near the percolation threshold around p = 0.6 and grows on more open boards.

**Transfer between network and flow.** The network agent performs reasonably on flow, though less effectively than the flow-trained agent. The flow agent can require very many moves on network mode: cutting top-to-bottom passage does not necessarily satisfy the component-size stopping condition.

**Transfer involving noodle.** Network and noodle agents are each poor at the other's task. This supports sensitivity to the failure criterion rather than a universally transferable attack policy.

**Strategy inspection.** Q-value maps identify choke points and, in network mode, actions that preserve a large inactive component. Multiple moves can have similar predicted value. Supplementary examples illustrate all three modes on 10×10 boards.

## Limitations

The main evaluation uses synthetic square lattices and random-attack baselines; it does not establish superiority to exact solvers or strong dismantling heuristics. Neither optimality nor generalization to arbitrary graph topologies is demonstrated. Graph convolution and defensive restoration are proposed extensions. Cross-task asymmetry suggests, but does not formally establish, a hierarchy of task difficulty.

The supplied Markdown gives no publication year or stable paper identifier, so year is left unknown. Its Figure 6 caption says the noodle ratio should fall below K = 2, contradicting the main text and Figure 2, which define inactivation above the threshold; this summary follows the latter definition. Supplementary captions also label p as the blocked fraction, unlike the main data-generation description.

## Related Concepts

- [[concepts/lattice-percolation|Lattice Percolation]]: supplies the lattice connectivity setting and random-attack comparison; adaptive attacks change the occupation process.

## Related Papers

- [[papers/machine-learning-percolation-model|Machine Learning Percolation Model]]: learns observables and thresholds from lattice configurations, whereas this paper learns actions that cause failure.
- [[papers/a-game-theoretic-attack-defense-framework-for-the-study-of-network-resilience|A game-theoretic attack-defense framework for the study of network resilience]]: a complementary library comparison involving repeated strategic attack–defense interactions; the present game has one player and cumulative removals.

Source implementation reported in the manuscript: [blue_zero](https://github.com/spcornelius/blue_zero).
