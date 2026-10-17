---
title: Recurrent Looped Transformer
type: paper
authors:
  - Yifan Zhang
  - Jichen Feng
  - Shihan Qin
  - Sun-Yuan Kung
  - Mengdi Wang
year: null
source_job_id: "ebabf2a6-0dc7-4dfa-8a7a-43beab694f7a"
tags:
  - recurrent-neural-networks
  - transformer-architectures
  - algorithmic-reasoning
  - length-generalization
---

## TL;DR

Recurrent Looped Transformer (RLT) combines a parallel causal encoder with a Transformer decoder that feeds its final hidden state into the next token's computation. Across three seeds, selected eight-layer splits achieve 100% parity accuracy at 256 bits after training on at most 40 bits, and the 4+4 split reaches 97.30% final-state accuracy on 256 swap-based permutation operations versus 0.85% for an eight-layer Transformer. Feedback removal eliminates these extrapolation gains; chunked feedback improves known-token parallelism but substantially weakens permutation tracking. Standard permutation tracking and long addition remain unsuccessful.

## Research Question

Can recurrence across ordinary tokens improve algorithmic length generalization, and how do encoder-decoder depth allocation and feedback frequency affect accuracy and sequential execution?

## Motivation

[[concepts/algorithmic-state-tracking|Algorithmic State Tracking]] requires composing updates over an input sequence. A fixed-depth Transformer has a fixed layerwise computation path at each position. RLT adds [[concepts/cross-token-hidden-state-recurrence|Cross-Token Hidden-State Recurrence]] so later tokens can build on completed earlier computations, while retaining encoder-derived global attention memory. The design separates the depth spent encoding inputs from the depth spent updating recurrent state.

## Contributions

- Defines a causal encoder plus recurrent Transformer decoder with one transition shared by prompt and response processing.
- Studies five allocations of eight layers and three feedback schedules across six supervised algorithmic tasks.
- Shows task-dependent depth allocation: parity extrapolates best with one or three decoder layers, while swap-based permutation tracking improves with decoder depth over the tested one-to-four-layer range.
- Specifies complete cache continuation, full-history backpropagation, and current-policy replay; these are execution definitions, with no RL performance experiment.

## Method

The encoder computes causal representations $e_t$ and projected key-value memory $M_{\leq t}$. The decoder's complete state is $H_t=(s_t,C_t^D)$, comprising its final hidden vector and each layer's sliding-window attention (SWA) cache. Starting from a learned $s_\star$ and empty caches, RLT-1 applies

$$
r_{t-1}=\operatorname{RMSNorm}(s_{t-1}),\qquad
g_t=\sigma(W_g[e_t;r_{t-1}]+b_g),
$$
$$
u_t=e_t+\alpha g_t\odot W_s r_{t-1},\qquad
(s_t,C_t^D)=D_\phi(u_t;M_{\leq t},C_{t-1}^D,t).
$$

Each decoder block applies causal SWA, cross-attention to encoder memory restricted to the current prefix, and an FFN. The output predicts the next token. Experiments use feedback scale 0.1, an eight-position SWA window, and one shared encoder-memory projection group. Decoder layers keep separate SWA caches. The 8+0 variant retains the gated recurrent merge even though it has no decoder blocks.

After $t$ tokens, the recurrent path traverses $tL_D$ decoder blocks, while each token evaluates $L_E+L_D$ blocks. This is a fixed block count, not constant computation: global attention work and encoder memory still grow with context. Known tokens are encoded in parallel, but RLT-1's decoder updates follow token order.

RLT-2 holds one feedback vector fixed for each chunk of $B$ tokens, then replaces it with the last output at a complete chunk boundary. Boundaries are anchored at BOS; a partial prompt chunk does not trigger an early update. Known tokens within a chunk run in parallel layer by layer. RLT-0 removes the feedback merge and its parameters entirely. For $T$ known tokens and $L_D\geq1$, decoder block stages are $TL_D$, $\lceil T/B\rceil L_D$, and $L_D$, respectively. Autoregressive generation remains tokenwise for all three variants.

Training uses teacher forcing and backpropagation through recurrent outputs, decoder KV, and encoder memory. The experiments' TBPTT128 window covers every training sequence, so gradients are not truncated. Masking a token's loss does not skip its state update. Exact current-policy replay after a weight update requires rebuilding parameter-dependent states; detached caches can preserve forward values while losing prefix gradients. Prompt/incremental equivalence is proved under fixed parameters, equivalent causal operators, and exact arithmetic, with floating-point execution differences discussed separately.

## Experiments

All main models have width 512, FFN width 1,365, four heads, and eight logical layers. Splits are 4+4, 5+3, 6+2, 7+1, and 8+0. Seeds 42, 43, and 44 share training streams and held-out examples. Training uses CPU FP32, global batch 512, and 2,000 updates for addition, parity, and permutation tasks; the main mod-5 results use 5,000 updates. Checkpoints minimize in-distribution validation example loss, with earliest-step tie breaking and no test-score selection.

Formal tasks use 1,024 shared examples per test length and final-answer/state accuracy. Addition uses teacher-forced answer-token accuracy on 256 shared operand pairs, including formatting and EOS. Reported uncertainties below are sample SD across three initializations, in percentage points (Section 3.2).

| Task and test length | RLT-1 split | RLT-1 accuracy (%) | Transformer accuracy (%) |
| --- | --- | --- | --- |
| Parity, 256 bits; trained on 3-40 | 5+3 or 7+1 | 100.00 +/- 0.00 | 50.07 +/- 1.63 |
| Swap-based S5, 256 operations; trained on 32 | 4+4 | 97.30 +/- 2.76 | 0.85 +/- 0.30 |
| Swap-based S5, 512 operations | 4+4 | 55.70 +/- 25.78 | 0.85 +/- 0.30 |
| Flat mod-5, length 63; trained on odd lengths 3-39 | 6+2 | 93.36 +/- 5.69 | 33.20 +/- 2.33 |
| Bracketed mod-5, length 64; trained on 3-40 | 5+3 | 67.97 +/- 2.91 | 46.71 +/- 1.21 |

At split 4+4 and length 64, per-token feedback gives 100% on both parity and swap-based S5. Four-token chunks retain 98.99 +/- 1.66% parity but only 19.60 +/- 6.54% swap-based S5. RLT-0 is near chance on both; parity is 50.23 +/- 3.80%. Across splits, removing feedback leaves these tasks near chance from length 64. Chunking effects depend on allocation: chunk4 5+3 reaches 50.16 +/- 18.77% on length-64 swaps (Section 3.3).

Standard S5 uses all 120 permutations, whereas the swaps generator uses identity and ten single transpositions. Standard S5 remains near its 1/120 reference across variants. All models fit 1-8-digit addition validation, but the main RLT-1/Transformer comparison falls to 14.89-16.84% teacher-forced token accuracy at 32 digits. Reducing feedback scale does not consistently repair addition extrapolation (Appendix J.11).

In a single-seed CPU timing comparison on the two mod-5 tasks at 4+4, chunk4 training steps are 2.27 times as fast as RLT-1; RLT-0 is 4.17-4.30 times as fast. Measurements cover steps 1,001-2,000 and exclude validation, checkpointing, and logging (Appendix J.10).

## Limitations

- Equal layer counts do not match parameters or compute: RLT-1 has 26.10-28.73M parameters versus 25.31M for the Transformer. RLT-0 removes 787,968 feedback parameters per split; RLT-2 preserves RLT-1's parameter count.
- Results concern small supervised algorithmic models. Natural-language pretraining, downstream language tasks, and RL benefits are not evaluated. Proposed large-to-small chunk training schedules are not tested; chunk sizes are trained from scratch.
- Extrapolation is task- and split-dependent. Modular arithmetic deteriorates at longer lengths, flat mod-5 exhibits large seed variation, and swap-based S5 loses accuracy by 512 operations. Standard S5 and long addition remain negative results.
- Addition scores are teacher-forced tokens, not generated whole-answer correctness. RLT-0/RLT-2 addition extrapolation beyond eight digits was not evaluated.
- Sequential decoder prefill and full-history differentiation impose execution costs. Single-seed CPU step timings do not establish accelerator throughput, end-to-end serving latency, or memory savings.
- The supplied text includes September 2026 experiment provenance but no explicit publication year, venue, DOI, or paper arXiv identifier. Publication year is left unset.

## Related Concepts

- [[concepts/cross-token-hidden-state-recurrence|Cross-Token Hidden-State Recurrence]]
- [[concepts/algorithmic-state-tracking|Algorithmic State Tracking]]

## Related Papers

The source discusses Fan et al. (2020), *Addressing Some Limitations of Transformers with Feedback Memory*, for feedback memory; Sun et al. (2024), *You Only Cache Once*, for encoder-derived reusable KV; and Hutchins et al. (2022), *Block-Recurrent Transformers*, for block-level recurrence. It distinguishes these mechanisms from its final-output feedback at the encoder-decoder interface. Grazzi et al. (2024), *Unlocking State-Tracking in Linear RNNs through Negative Eigenvalues*, supplies the permutation-task setup.

[[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]] is related library reading, not a claimed citation: it preserves hidden memory across iterative solver steps, whereas RLT advances recurrence across ordinary input tokens.

Project repository stated in the source: `https://github.com/yifanzhang-pro/recurrent-looped-tranformer`.

[[index|Library home]]
