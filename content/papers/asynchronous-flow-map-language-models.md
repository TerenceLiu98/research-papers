---
title: Asynchronous Flow Map Language Models
type: paper
authors:
  - Chanhyuk Lee
  - Wonjung Kim
  - Patrick Pynadath
  - Jaehoon Yoo
  - Satoshi Hayakawa
  - Ruqi Zhang
  - Jinwoo Kim
  - Seunghoon Hong
year: 2026
arxiv: "2610.42018"
source_job_id: "1656e7d9-df3e-48df-bcdd-63d21dc9fc7b"
tags:
  - language-modeling
  - flow-matching
  - one-step-generation
---

## TL;DR

An asynchronous flow map language model (aFMLM) learns to generate a whole sequence in one pass from a teacher that denoises some positions ahead of others. With the same teacher denoiser, distilling an entropy-bounded schedule raises one-step GSM8K code-generation accuracy from 1.6% under a synchronous schedule to 11.4%.

## Research Question

Can a parallel generator benefit from a prediction order when it must output every token in the same forward pass?

## Motivation

In Sudoku, resolving a constrained cell helps determine its neighbors. An iterative denoiser can exploit that dependency by advancing confident cells first. A one-step generator has no intermediate sampling step at which to commit to a cell, but its successive network layers can still refine different positions at different depths.

## Contributions

- The authors formulate a deterministic flow whose state includes both token representations and their individual denoising times. This gives even a state-dependent schedule a well-defined map between two global times.
- They derive training objectives for a student to approximate that map. A prescribed order also permits training from scratch, which they demonstrate with a Sudoku solver's ordering.
- They measure whether the order in which a student's predictions stabilize across layers reflects the schedule used in training.

## Method

The teacher learns to recover clean one-hot tokens from noisy continuous representations. Diffusion forcing exposes it to different noise levels within a sequence. During sampling, a scheduler determines how quickly each token advances toward its clean endpoint. Top-K advances the most confident positions faster. The entropy-bounded scheduler varies how many positions to prioritize according to their combined uncertainty.

For an adaptive schedule, token representations alone do not specify the next update. The student therefore learns a finite-interval update of the joint state, with a denoiser head for token content and a time head for local progress. At equal start and end times, the teacher denoiser and scheduler supply local training targets. Across a finite interval, self-distillation enforces consistency with the flow. At inference the student maps initial noise directly to the final sequence without calling the scheduler.

## Experiments

Table 1 reports one-step exact grid accuracy on Sudoku and zero-shot accuracy on GSM8K for code generators trained on TinyGSM. Values are percentages.

| One-step model or schedule | Sudoku Easy | Sudoku Medium | Sudoku Hard | GSM8K |
| --- | ---: | ---: | ---: | ---: |
| Undistilled teacher (aFLM) | 71.1 | 26.5 | 6.1 | 0.3 |
| Synchronous student | 77.1 | 36.8 | 6.4 | 1.6 |
| Entropy-bounded student | 79.1 | 47.8 | 11.8 | 11.4 |
| Top-K student | 81.4 | 46.4 | 14.4 | 10.5 |
| Prescribed solver order, trained from scratch | 82.5 | 44.5 | 10.0 | N/A |

The teacher itself benefits from ordering when given multiple steps. At 32 steps, switching from synchronous to entropy-bounded sampling raises Sudoku Hard accuracy from 40.1% to 95.6% and GSM8K accuracy from 7.4% to 36.4% (Figure 2).

To probe the student, the authors decode each layer and record the earliest layer after which each token's prediction stays fixed. On GSM8K, the mean per-example Spearman correlation with the teacher's token order is 0.271 for the entropy-bounded student and 0.091 for the synchronous student. On Sudoku Hard, alignment with the prescribed solver order differs only slightly, at 0.516 versus 0.500 (Table 3).

## Limitations

The evaluation covers constrained grid completion and short math-program generation. Even the best one-step schedule solves only 14.4% of hard Sudoku grids, well below the 32-step teacher. The layer probe measures agreement in ordering and cannot establish that settling one token causes another to settle.

## Related Concepts

- [[concepts/diffusion-forcing|Diffusion Forcing]] trains the teacher on combinations of tokenwise noise levels so the same denoiser can be evaluated under different schedules.
- [[concepts/average-velocity-fields|Average Velocity Fields]] describe finite-interval transport. Here the interval update must also account for changes in each token's local time.

## Related Papers

- [[papers/expanding-flow-maps|Expanding Flow Maps]] also learns finite-interval updates with local time coordinates. Its flow additionally changes the number of active positions, whereas aFMLM schedules progress on a fixed set of positions.
