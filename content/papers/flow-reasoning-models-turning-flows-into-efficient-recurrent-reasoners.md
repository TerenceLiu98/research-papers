---
title: "Flow Reasoning Models: Turning Flows Into Efficient Recurrent Reasoners"
type: paper
authors:
  - Alec Helbling
  - Andrey Bryutkin
  - Mauro Martino
  - Duen Horng (Polo) Chau
  - Nima Dehmamy
  - Hendrik Strobelt
year: null
source_job_id: "0afc66f7-a6ae-4343-b2b3-7f13afe11b3e"
tags:
  - flow-matching
  - recurrent-reasoning
  - exposure-bias
---

## TL;DR

Flow Reasoning Models feed clean categorical predictions back into a flow denoiser to revise structured solutions in parallel. Fixed-Point Forcing trains this conditioning channel on detached inference rollouts, raising peak exact solve rates to 99.5% on Sudoku-Extreme, 100.0% on Zebra, and 99.9% on Maze-Unique. The paper reports matching EqR's 98.7% Sudoku peak with an estimated 44× fewer inference FLOPs.

## Research Question

Can continuous flows over discrete outputs support efficient recurrent reasoning, and can training on model-generated conditioning states make greater recurrent depth reliably correct errors?

## Motivation

Sequential commitments impede revision, while naive flow integration does not itself teach iterative solution correction. Self-conditioning provides a directly decodable recurrent state, but one-pass training carries differ from deeply recurrent inference carries. This form of [[concepts/exposure-bias|Exposure Bias]] can stabilize confidently incorrect solutions.

## Contributions

- Introduces recurrent solution refinement through the clean-prediction channel of a standard noncausal flow denoiser.
- Introduces Fixed-Point Forcing (FPF), changing the conditioning-state distribution while retaining the canonical flow path and endpoint objective.
- Evaluates accuracy, profiled inference computation, three-seed training ablations, and convergence diagnostics across three structured reasoning tasks.

## Method

For fixed problem specification $c$, one-hot solution $x_1$, and Gaussian noise $\varepsilon$, construct $x_t=(1-t)\varepsilon+tx_1$. A categorical denoiser predicts the clean solution with tokenwise cross-entropy; its prediction determines velocity $(D_\theta^t-x_t)/(1-t)$. Only the solution is noised.

Self-conditioning feeds the previous clean prediction $s$ into the next evaluation. At fixed flow state and time, $s^{(k+1)}=D_\theta^t(x_t\mid c,s^{(k)})$ defines a recurrent refinement map. Flow integration and this reasoning depth are distinct operations.

FPF samples a supervision time $t$ and a rollout start uniformly before $t$, runs the self-conditioned inference integrator to $t$, and detaches its final prediction. That prediction enters only the carry channel: the loss-bearing input remains the ground-truth-derived canonical interpolant, and the cross-entropy target is unchanged. No gradients pass through the rollout. Because time and flow state evolve during carry construction, the fixed-state attractor interpretation is not a literal description of that rollout.

Training first learns conventional self-conditioning, then initializes FPF from the selected weights with fresh optimizer and EMA states. The reported FPF configuration uses rollout depth 16, rollout probability 0.5, and four supervised states. Backbones contain 7M, 25M, and 8M parameters for Sudoku, Zebra, and Maze respectively.

## Experiments

Table 2 reports mean ± sample standard deviation over three training seeds, with checkpoint and inference configuration selected by validation solve rate:

| Training recipe | Sudoku-Extreme | Zebra | Maze-Unique |
| --- | --- | --- | --- |
| Base flow | 13.1 ± 0.7% | 62.3 ± 29.1% | 77.6 ± 16.7% |
| Self-conditioning | 32.6 ± 3.7% | 36.9 ± 18.0% | 96.2 ± 3.0% |
| Fixed-Point Forcing | 99.2 ± 0.3% | 99.9 ± 0.2% | 98.0 ± 1.8% |

These seed aggregates differ from the peak accuracies of 99.5%, 100.0%, and 99.9% in Table 1. Self-conditioning alone worsens Zebra's mean and leaves substantial variance; FPF improves all three means. Maze-Unique's best comparison accuracy is 100.0%, slightly above FRM's peak.

Sudoku uses 1,000 difficulty-balanced training puzzles per seed and a fixed 1,000-puzzle test subset. Zebra uses the mixed 3×3–6×6 protocol with canonical solution grids. Maze-Unique contains 1,000 training and 1,000 test mazes of size 30×30 with unique solution paths.

On Sudoku, adjacent-state symmetric-KL residual predicts correctness with AUROC 0.50 under conventional self-conditioning and 1.00 under FPF; the base-flow value is 0.74. FPF decreases gold-target loss with depth, whereas conventional self-conditioning can sharpen incorrect predictions. These are empirical diagnostics, not correctness certificates.

## Limitations

- Evidence concerns small models on structured puzzles; larger-scale and less structured reasoning remain future work.
- Zebra MDLM and adaptive-MDLM headline values are published results the authors could not reproduce. Their profiled MDLM reproduction reaches 49.2%; unavailable comparisons are omitted from compute frontiers.
- FLOPs are profiled arithmetic estimates, excluding memory traffic, launch overhead, and other runtime costs. The 44× ratio is not a measured latency speedup or training-cost comparison.
- Solved-puzzle mean NFE uses the first correct point on a trajectory and is an oracle diagnostic unless correctness is independently detectable.
- The supplied manuscript gives no explicit publication year or stable identifier; year is left unset rather than inferred from its references.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: supplies the canonical noise-to-solution path and clean-prediction velocity parameterization.
- [[concepts/exposure-bias|Exposure Bias]]: explains the mismatch between one-pass training carries and recursively generated inference carries.

## Related Papers

- Chen et al. (2023), “Analog Bits”: self-conditioning precedent for continuous encodings of discrete outputs.
- Huang et al. (2025), “Self Forcing”: trains on generated video context; FPF instead changes the recurrent conditioning channel without differentiating through rollouts.
- Huang et al. (2026), “Equilibrium Reasoners”: solution-aligned attractor reasoning and the Sudoku matched-accuracy FLOP comparison.
- [[papers/thinking-with-looped-flows|Thinking with Looped Flows]] is related library reading, not a claimed manuscript citation: it carries hidden features through temporally aligned denoising, whereas FRM recurs directly through clean solution predictions.
