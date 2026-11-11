---
title: "Energy-Based Reasoners: Your Recurrent Reasoner Should Be an Energy-Based Model"
type: paper
authors:
  - William Xingxu Chen
  - Alexi Gladstone
  - Zeyu Michael Li
  - Heng Ji
  - Yilun Du
year: null
source_job_id: "b331aef5-a0db-4242-bd86-a8fc27020a22"
tags:
  - energy-based-models
  - latent-reasoning
  - algorithmic-reasoning
---

## TL;DR

Energy-Based Reasoners (EBRs) learn a scalar energy over latent states and use its gradient for recurrent refinement, its value for candidate selection, and its tangent-gradient norm for stopping. A 1.8M-parameter model reaches 99.41 ± 0.12% single-sample Sudoku-Extreme accuracy and 99.90 ± 0.06% with five samples. State-based explorative modeling (SXM) trains persistent alternative trajectories to support diverse valid solutions.

## Research Question

Can one learned energy jointly guide latent reasoning, evaluate candidate solutions, and allocate inference computation while supporting problems with multiple valid answers?

## Motivation

Recurrent reasoners increase effective depth by reusing a computation block, but their updates need not follow an explicit objective. Separate halting heads or convergence checks evaluate progress without directly guiding it. EBRs connect these functions through a learned landscape over a single latent state.

## Contributions

- Introduces energy-gradient recurrence with a shared objective for refinement, stopping, and selection.
- Extends explorative modeling to persistent trajectories, matching candidate states to available valid targets.
- Evaluates accuracy, inference FLOPs, convergence, and solution coverage on Sudoku-Extreme, Maze-Hard, N-Queens, and Graph Coloring.

## Method

Given input x and latent state z, the idealized update is gradient descent on a learned scalar energy E(z; x). In practice, each step normalizes the state, adds Gaussian noise, takes an energy-gradient step, and projects each token state back to unit RMS. A two-block Transformer and shared per-token energy head define the scalar energy; a separate linear readout decodes predictions. Maze-Hard uses nonnegative softplus token energies to discourage longer detours.

Training divides trajectories into segments and detaches their endpoints between segments. Prediction losses supervise the final seven descent steps, with larger weights on later states. Differentiating through energy gradients requires second-order derivatives. A convergence loss aligns a residual-derived convergence score with endpoint correctness, discouraging incorrect stationary predictions. Step counts and step sizes are randomized during training; inference uses 21 descent steps per segment.

SXM advances K persistent trajectories without retaining a training graph, selects the endpoint with the lowest loss against the stored target, then replays that trajectory with gradients. Reverse SXM additionally matches graded states to available valid solutions. To reduce collapse, assigned targets are temporarily excluded until 75% of an input's solutions have been used. N-Queens and Graph Coloring also train from mixtures of noise and solution embeddings; inference starts from Gaussian noise.

At inference, trajectories stop when the tangent-gradient norm falls below a threshold or reach the segment cap. Multiple samples are ranked by endpoint energy, without a separate verifier. The paper's Pass@n denotes this selected prediction's accuracy, not oracle success among n samples.

## Experiments

Main results report mean ± standard deviation over three training seeds; ablations use one seed. Sudoku has 1,000 training puzzles with validity-preserving augmentation and 422,786 test puzzles. Maze-Hard has 1,000 training and 1,000 test mazes.

| Task | Single sample | Lowest-energy of five samples |
| --- | --- | --- |
| Sudoku-Extreme exact accuracy | 99.41 ± 0.12% | 99.90 ± 0.06% |
| Maze-Hard labeled-path exact accuracy | 87.37 ± 1.10% | 88.27 ± 0.32% |
| Maze-Hard any-shortest-path accuracy | 94.07 ± 0.91% | 94.77 ± 0.59% |

With eight Sudoku samples and stopping threshold 0.2, accuracy is 99.92 ± 0.05% at approximately 0.61 TFLOPs per puzzle, versus 6.60 without early stopping: a 10.8× reduction. The reported approximately 345× advantage compares this configuration with EqR's 128-sample cost of roughly 210 TFLOPs and published 99.8% accuracy. It is a FLOP comparison, not measured wall-clock speedup. Sudoku training costs 1.92 EFLOPs versus GRAM's 2.26; on multi-solution tasks EBR costs 1.2–3.7× more training FLOPs.

With approximately 7.1M parameters, single-sample validity is 100% on 8×8 N-Queens and 99.51% on 10×10, with zero aggregate conflicting edges on both Graph Coloring sizes. Twenty samples recover 98.1 ± 0.2% and 92.0 ± 0.9% coverage on N-Queens. Graph Coloring coverage is 88.6 ± 0.1% and 54.5 ± 0.5% using the uncapped denominator matching the reported GRAM comparison; capped coverage is 89.0 ± 0.1% and 85.3 ± 0.8%.

Within the EBR training configuration, replacing gradient recurrence with a direct transition lowers single-sample Sudoku accuracy from 98.96% to 60.05%; removing convergence loss lowers it to 45.32%. These are component ablations, not reproductions of TRM. Forward and reverse SXM improve multi-solution validity and coverage; increasing Sudoku candidate count beyond two does not further improve accuracy.

## Limitations

- Evidence concerns small models on structured algorithmic tasks; language reasoning and larger-scale models remain untested.
- Second-order gradients and candidate rollouts add training cost, implementation complexity, and hyperparameters. Convergence is not a correctness guarantee.
- Maze improvements are modest, and SXM provides no gain there. The proposed explanation involving limited training data is not tested by varying dataset size.
- Baselines largely use published results and different selection protocols. EqR's sample-scaling curve uses a 2,048-puzzle subset, whereas its headline comparison uses published full-test accuracy.
- Coverage definitions require care: GRAM's N-Queens metric excludes solutions beyond its first 20. Applying that definition reduces EBR's 10×10 coverage from 92.0% to 89.3%; Graph Coloring tables instead align denominators explicitly.
- The supplied Markdown does not identify this paper's publication year, venue, DOI, or arXiv ID; these are not inferred from its references.

## Related Concepts

- [[concepts/energy-based-latent-reasoning|Energy-Based Latent Reasoning]]: a scalar landscape defines recurrent updates and evaluation.
- [[concepts/latent-reasoning|Latent Reasoning]]: computation proceeds through internal states rather than textual traces.
- [[concepts/adaptive-computation|Adaptive Computation]]: convergence controls per-trajectory inference depth.
- [[concepts/stochastic-latent-trajectory-search|Stochastic Latent Trajectory Search]]: independent noisy trajectories explore alternative solutions.

## Related Papers

- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]]: uses generative denoising dynamics for recurrent reasoning; EBR instead learns a scalar objective whose gradient updates the latent state.
- [[papers/probabilistic-tiny-recursive-model|Probabilistic Tiny Recursive Model]]: introduces stochastic recursive trajectories but selects them with a learned halting head.
- Baek et al., *Generative Recursive Reasoning* (2026), supplies the multi-solution benchmarks and GRAM baseline.
- Gladstone et al., *Explorative Modeling: Unlocking a Third Pretraining Axis and End-to-End Generation* (2026), supplies the bidirectional matching principle extended by SXM.

[[index|Library home]]
