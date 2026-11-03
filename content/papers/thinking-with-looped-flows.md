---
title: Thinking with Looped Flows
type: paper
authors:
  - Ayhan Suleymanzade
  - Chanhyuk Lee
  - Floor Eijkelboom
  - Nicholas M. Bofi
  - İsmail İlkan Ceylan
  - Jinwoo Kim
year: null
source_job_id: "d3cd0d93-f02e-4ab2-bc76-9df7cc61eca8"
tags:
  - recurrent-reasoning
  - flow-matching
  - test-time-compute
  - algorithmic-reasoning
  - stochastic-inference
---

## TL;DR

Looped flows train a recurrent reasoner as a stateful denoiser on an ordered sequence of progressively less noisy local objectives, with gradients stopped between recurrent steps. Inference couples the hidden-state recurrence to ODE or SDE integration of a probability flow, so additional integration steps increase computation and independent noise samples produce diverse solutions. With 5--7M parameters, the method reports 97.9% accuracy on Sudoku-Extreme, 58.8% pass@2 on ARC-AGI-1, and 12.2% pass@2 on ARC-AGI-2, while its multi-solution experiments recover more valid solutions than the compared baselines.

## Research Question

Can [[concepts/flow-matching|Flow Matching]] provide temporally coordinated local supervision for recurrent hidden-state reasoning, avoiding long backpropagation through time while preserving depth scaling and diverse conditional sampling?

## Motivation

Looped models repeatedly update a hidden state, but practical training usually backpropagates through only one or a few updates. Later losses therefore cannot directly teach early states what information future steps will need, and learned recurrence can fail to converge or settle at an incorrect fixed point. Flow models offer a complementary structure: independently supervised denoising problems at different noise levels can collectively define a coherent trajectory. The paper combines these mechanisms so local denoising losses organize [[concepts/latent-reasoning|Latent Reasoning]] across recurrent time.

## Contributions

- Defines a stateful denoiser that jointly predicts a clean categorical solution and updates a recurrent state along a probability-flow trajectory.
- Temporally aligns locally supervised recurrent steps by sorting their noise levels and sharing the problem, target, and source noise across steps, while stopping gradients between hidden states.
- Couples recurrence to deterministic Euler integration or a stochastic noise-backtracking sampler, allowing depth scaling with a finer temporal grid and diversity from independent source samples.
- Evaluates the method on four single-solution and two multi-solution reasoning benchmarks, with ablations of time conditioning, noisy interpolation, decreasing noise, shared noise, recurrence, and stochastic integration.
- Analyzes Sudoku trajectories using convergence and spurious-attractor criteria, reporting recovery from most failures of the Tiny Recursive Model baseline.

## Method

For condition $c$, categorical target $x_1$, and Gaussian source $x_0$, training constructs the linear interpolant

$$
I_t=(1-t)x_0+tx_1.
$$

A stateful denoiser receives $I_t$, recurrent state $z_t$, and $c$, then returns a clean-solution prediction $\hat x_t$ and the next recurrent state. One training rollout samples $k+1$ times, orders them so noise decreases, and reuses the same $(c,x_0,x_1)$ at every step. Each prediction receives a cross-entropy loss against $x_1$, but $z_t$ is stop-gradient input to the next step. Thus the model is locally trained at every noise level without backpropagating through the complete recurrence. The experiments use $k=16$ and an auxiliary adaptive-computation head trained to predict whether the decoded solution is already correct.

At inference, the denoiser parameterizes the probability-flow velocity

$$
\hat b_t(x_t,z_t;c)=\frac{\hat x_t-x_t}{1-t}.
$$

Euler integration advances the visible flow state while the denoiser advances the hidden state. A stochastic alternative first moves the visible state to an earlier noise level with fresh Gaussian noise, then takes an Euler step forward; its small-step limit corresponds to an SDE whose stochasticity is controlled by $\gamma$. Inference may use more grid points than training, and best-Q ensembling selects among independent trajectories using the auxiliary correctness head.

The implementation adapts the Tiny Recursive Model architecture. It uses a 5M-parameter MLP-Mixer on Sudoku and a 7M-parameter noncausal Transformer on the other tasks. The recurrent state contains two hidden feature tensors, and each denoiser call repeats a shared two-layer network before decoding the solution. On Sudoku and ARC-AGI-2, later training interpolants may use the previous prediction as a stop-gradient pseudotarget to reduce exposure to an almost-clean ground-truth solution.

## Experiments

On the four single-solution tasks, one looped-flow trajectory reports 97.9 +/- 0.4% accuracy on Sudoku-Extreme, 86.7 +/- 1.1% on Maze-Hard, 58.8 +/- 1.8% pass@2 on ARC-AGI-1, and 12.2 +/- 1.9% pass@2 on ARC-AGI-2. The corresponding Tiny Recursive Model results quoted by the paper are 87.4%, 85.3%, 44.6%, and 7.8%. Five-trajectory best-Q ensembling raises Sudoku to 99.3 +/- 0.2%, Maze to 86.9 +/- 1.5%, and ARC-AGI-1 to 59.5 +/- 1.9%; ARC-AGI-2 remains 12.2 +/- 0.9% with lower variation.

Sudoku accuracy increases from 74.5% with 8 inference steps to 97.9% with 128, showing scaling beyond the 16-step training rollout. On roughly 65,000 Sudoku test instances, TRM fails on 12.6%; 88.3% of those failures meet the paper's non-convergence criterion and 11.7% its spurious-attractor criterion. Looped flows solve 89.9% and 98.0% of those two subsets, respectively, resolving 90.9% of the observed TRM failures.

For multi-solution reasoning, 20 independent samples are evaluated per problem. On 8x8 and 10x10 N-Queens, looped flows report first-sample validity of 99.9 +/- 0.1% and 94.4 +/- 0.7%, with valid-solution coverage of 91.4 +/- 0.4% and 61.5 +/- 0.1%. On 8- and 10-vertex Graph Coloring, they report 0.7 +/- 0.6 and 1.0 +/- 1.0 aggregate conflicts, with coverage of 89.4 +/- 0.7% and 55.2 +/- 0.3%. These are the strongest values in the paper's comparison table.

Training ablations on ARC support the combined formulation: removing both time conditioning and noisy interpolation lowers ARC-AGI-1 from 58.8% to 43.6% and ARC-AGI-2 from 12.2% to 5.0%. Removing decreasing noise or noise sharing also reduces both results. Stochastic integration usually improves accuracy or coverage, but deterministic ODE integration retains substantial diversity, indicating that independent initial noise is itself an important source of solution variation. A flow model without recurrence memorizes the Sudoku training data in the reported comparison; self-conditioning helps, but remains below recurrent states trained across decreasing noise levels.

## Limitations

- The evidence covers structured grid, graph, and ARC tasks. It does not establish the method on natural-language reasoning, open-ended generation, or substantially larger models.
- Strong results use task-dependent inference grids of 16--128 steps, and some comparisons use multiple trajectories. The paper does not provide matched-compute, latency, or energy comparisons across methods.
- Most baselines are compared through published results rather than a single controlled implementation and hardware setup.
- Sharing noise across training steps permits an algebraic shortcut that can recover the target from two interpolants. Improvement with additional inference steps rules out exclusive reliance on repeating the first prediction, but does not prove that the shortcut is absent from learned representations.
- The recurrence-stability analysis is restricted to Sudoku and depends on an operational residual threshold and low-dimensional trajectory visualizations; it is not a general convergence guarantee.
- Time sampling, stochasticity, pseudotarget use, weight decay, and inference depth vary by task. This improves task performance but limits attribution to one universal configuration.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier, so those metadata are left unset.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: supplies the local denoising objectives, probability-flow velocity, and numerical integration framework.
- [[concepts/latent-reasoning|Latent Reasoning]]: the recurrent state carries computation that is not externalized as a textual trace.
- [[concepts/adaptive-computation|Adaptive Computation]]: an auxiliary correctness head identifies saturated training rollouts and scores candidates for best-Q ensembling.
- [[concepts/stochastic-latent-trajectory-search|Stochastic Latent Trajectory Search]]: independent source samples create alternative hidden-state and flow trajectories, although diversity here arises from probability transport rather than direct recurrent-state perturbation.
- [[concepts/diffusion-models|Diffusion Models]]: score-based SDEs and noise schedules provide closely related tools for stochastic probability transport.

## Related Papers

- Jolicoeur-Martineau (2025), "Less Is More: Recursive Reasoning with Tiny Networks": supplies the TRM architecture, local-gradient training problem, and primary baseline.
- Wang et al. (2025), "Hierarchical Reasoning Model," and Movahedi et al. (2026), "Fixed-Point Reasoners": recurrent reasoning baselines that motivate stability and inference-depth comparisons.
- Baek et al. (2026), "Generative Recursive Reasoning": a stochastic recurrent baseline for multi-solution tasks.
- [[papers/probabilistic-tiny-recursive-model|Probabilistic Tiny Recursive Model]]: injects noise directly into TRM recurrence and selects parallel trajectories with the same kind of learned Q head.
- Lee et al. (2026), "Flow Map Language Models": the non-recurrent categorical-flow baseline used in the recurrence ablation.
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]] is related library reading, not a citation claimed by the supplied paper: both use ordered denoising objectives to train persistent recurrence, but that method removes timestep conditioning and can discard progressive denoising at inference.

[[index|Library home]]
