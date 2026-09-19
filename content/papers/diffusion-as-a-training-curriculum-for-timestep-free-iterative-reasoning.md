---
title: "Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning"
type: paper
authors:
  - Mariia Drozdova
  - Aidan Sirbu
  - Pietro Miotti
  - Robert Obryk
  - Mayalen Etcheverry
  - Eyvind Niklasson
  - Blake Richards
year: null
tags:
  - diffusion-models
  - iterative-reasoning
  - recurrent-neural-networks
  - test-time-compute
  - algorithmic-reasoning
---

## TL;DR

The paper turns a continuous diffusion denoiser into an anytime solver by adding a persistent hidden state and removing timestep conditioning. Ordered annealed corruption is important during training, but progressive denoising is unnecessary for the strongest Sudoku result: repeatedly replacing non-clue variables with fresh maximal Gaussian noise while preserving hidden memory reaches 99.90% exact solve on Sudoku-Extreme at 10,000 recurrent steps. The result connects [[concepts/diffusion-models|Diffusion Models]] to [[concepts/adaptive-computation|Adaptive Computation]], but the evidence is limited to Sudoku and grid-maze benchmarks.

## Research Question

Can a diffusion model with an uncorrupted recurrent memory learn timestep-free iterative reasoning, so that inference can continue beyond the rollout lengths and backpropagation window used in training?

## Motivation

Standard diffusion models carry information through the evolving noisy sample, while recursive reasoners maintain a separate hidden state. The authors ask whether continuous diffusion training can provide a curriculum for a shared recurrent update whose memory accumulates computation independently of the corruption trajectory. If so, inference depth becomes an adjustable compute axis rather than a horizon fixed by a denoising schedule.

## Contributions

- Adds a persistent, unsupervised hidden state to a diffusion denoiser and uses the same update at every denoising step without a timestep or iteration embedding.
- Trains long-lived staggered rollouts with ordered annealed corruption while backpropagating through only four denoising steps at a time.
- Shows monotonic depth scaling beyond the 20-160-step training rollouts, reaching 99.90% exact solve on Sudoku-Extreme at 10,000 inference steps.
- Separates the roles of training and inference noise: an ordered annealed schedule is critical during training, while constant maximal corruption supports near-perfect inference.
- Uses hidden-state interventions to show that the clean recurrent memory, rather than the visible diffusion state alone, carries spatially structured, instance-specific progress.

## Method

For clean target representation $y$, clue mask $m$, clue embedding $e$, and Gaussian noise $\varepsilon_k$, the visible state follows a variance-preserving corruption path:

$$
x_k = \operatorname{Pin}\left(a(t_k)y+b(t_k)\varepsilon_k,e,m\right),
\qquad
a(t)=\sin\left(\frac{\pi t}{2}\right),\quad
b(t)=\cos\left(\frac{\pi t}{2}\right).
$$

The pinning operator keeps clues fixed. A shared recurrent denoiser $F_\phi$ maps the current visible state and persistent memory to a clean prediction and the next memory:

$$
(\hat y_k,h_{k+1})=F_\phi(x_k,h_k,e,m).
$$

For Sudoku, $F_\phi$ is an eight-loop, four-head Transformer block whose attention is restricted to cells sharing a row, column, or box. Its latent output has separately normalized observable and memory readouts. For mazes, the corresponding update is an eight-loop local convolutional block on the $30\times30$ grid.

Training maintains staggered persistent rollouts whose lengths are sampled uniformly from 20 to 160. Each visible input is freshly corrupted from the target at the current schedule level, while memory persists across steps. The masked mean-squared error supervises every predicted observable state, but not the memory directly. Gradients span $L=4$ denoising steps; memory is detached after each segment and reset only when its episode ends.

At inference, the model may use an annealed schedule or hold the corruption level fixed. Under constant maximal corruption, every non-clue visible variable is replaced by fresh Gaussian noise after each update while the hidden state remains uncorrupted. A rollout can stop after its decoded prediction remains unchanged for a patience window.

## Experiments

### Sudoku-Extreme

The main evaluation uses Sudoku-Extreme, whose approximately 4.25 million puzzles have unique solutions and train/test partitions that are inequivalent under the dataset's Sudoku isomorphisms. With constant maximal noise, exact solve rate reaches 99.90% at 10,000 recurrent steps. The same model reaches 99.56% with annealed inference and 49.39% when clean predictions are propagated without added noise. Performance continues increasing with inference depth despite training rollouts ending at 160 steps.

Training-schedule ablations at 10,000 steps, evaluated with annealed inference, report 99.54 +/- 0.02% for annealed noise with teacher forcing, 82.73 +/- 6.60% for fixed maximal-noise training, 80.50 +/- 7.31% for free-running training, 20.59 +/- 3.40% for independently sampled noise levels, and 0.00 +/- 0.00% for clean-only training. These results support the claim that ordered corruption is a useful training curriculum rather than merely an inference procedure.

Hidden-state interventions at step 200 of a 400-step rollout further separate memory from the observable state. Under annealed inference, the baseline solve rate is 82.50 +/- 0.35%; resetting the observable state raises it to 88.09 +/- 0.09%, while resetting memory lowers it to 58.03 +/- 1.43%. Shuffling memory across cell positions gives 29.38 +/- 17.81%, and globally shuffling its values gives 0.27 +/- 0.18%. Increasing memory width from 64 to 128 improves the 400-step result from 86.39 +/- 1.68% to 96.29 +/- 0.27%, with only a small further increase at width 256.

### Maze transfer and stability

On Maze-Unique, exact solve rises from 40.87 +/- 15.65% at 5 recurrent steps to 98.23 +/- 0.75% at 50 and 98.93 +/- 0.15% at 100 with annealed inference. Constant maximal corruption reaches 98.40 +/- 1.47%, while no injected noise reaches 66.30 +/- 11.88%. Thus stochastic inference transfers, although maximal corruption is not the best reported Maze-Unique setting.

For Sudoku models trained and tested on fully determined puzzles, 99.24 +/- 1.04% of trajectories settle and remain unchanged under 500 additional noisy steps. Models trained on under-determined clue masks wander much more often. The authors treat this as exploratory because solution multiplicity is confounded with clue count and mask geometry.

## Limitations

- The experiments cover structured Sudoku and grid-maze tasks; they do not establish the same behavior for language reasoning or less constrained domains.
- The strongest Sudoku result uses up to 10,000 recurrent steps. The supplied paper does not report end-to-end latency, energy, or comparisons at matched inference compute.
- Constant maximal corruption is best on Sudoku but slightly below annealed inference on Maze-Unique, so the preferred inference schedule is task-dependent.
- The stability experiment does not isolate solution multiplicity from changes in clue count and mask geometry.
- The BPTT and inner-loop ablations show non-monotonic optimization: one-step BPTT cannot propagate information across denoising iterations, while a depth of 16 suffers from vanishing gradients; eight inner loops perform best among the tested settings.
- The supplied Markdown does not state the paper's publication year, venue, or stable identifier, so those metadata are left unasserted.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/adaptive-computation|Adaptive Computation]]

## Related Papers

- [[papers/continuous-thought-machines|Continuous Thought Machines]] is a Wiki comparison, not a citation in the supplied paper: it also uses recurrent internal computation and an observable stopping criterion, but its state representation and training objective differ.
- Saunshi et al. (2025), "Reasoning with latent thoughts: On the power of looped transformers": supplies the looped-Transformer framing used by the Sudoku denoiser.
- Geiping et al. (2025), "Scaling up test-time compute with latent reasoning: A recurrent depth approach": related recurrent depth scaling cited by the paper.
- Wang et al. (2025), "Hierarchical reasoning model," and Jolicoeur-Martineau (2025), "Less is more: Recursive reasoning with tiny networks": recursive-reasoning baselines and benchmark context.
- Baek et al. (2026), "Generative Recursive Reasoning," and Sghaier et al. (2026), "Probabilistic Tiny Recursive Model": stochastic recursive approaches that use parallel trajectories and candidate selection, contrasted with the paper's single rollout.

[[index|Library home]]
