---
title: "Looped Language Models Improve Compositional Tool Calling"
type: paper
authors:
  - Andrei Cristian Popescu
  - Haitz Sáez de Ocáriz Borde
  - Pietro Liò
year: 2026
source_job_id: "11b29c50-a806-4dc2-bc60-b055e24d8608"
tags:
  - looped-language-models
  - tool-calling
  - recurrent-depth
  - adaptive-computation
---

## TL;DR

Repeated latent computation improves multi-call and dependency-aware tool use more consistently than isolated API invocation. Across native Ouro models and recurrent Llama and OLMo retrofits, the largest gains appear on BFCL's parallel categories and NESTful's nested workflows; increasing inference depth generally helps until performance saturates. Ouro's token-level adaptive exit gate recovers most of the fixed-depth gains with fewer average iterations, but the evidence comes from static, single-turn benchmarks and does not establish behavior in live tool-use episodes.

## Research Question

Does recurrent latent computation improve [[concepts/compositional-tool-calling|Compositional Tool Calling]], and can adaptive recurrent depth allocate that computation more efficiently than a uniform inference budget?

## Motivation

Correct tool use can require more than selecting one function and grounding its arguments. Multi-tool requests require a model to construct a call set, preserve ordering and output-to-input dependencies, and maintain intermediate state. Looped language models repeatedly refine hidden representations before producing each token, increasing test-time computation without increasing parameter count. The paper tests whether this architectural mechanism benefits structured action generation rather than only conventional reasoning benchmarks.

## Contributions

- Evaluates native Ouro-1.4B and Ouro-2.6B models and recurrent retrofits of Llama-3.2-1B and OLMo-2-1B on API-Bank, BFCL v3, and NESTful.
- Uses matched supervised fine-tuning for controlled comparisons and varies inference depth while holding model parameters fixed to isolate the contribution of recurrent computation.
- Shows that the clearest gains occur on independent multi-call and dependency-aware workflows, while results on predominantly single-call API-Bank are smaller and model-dependent.
- Compares fixed recurrent depth with Ouro's learned token-level exit gate, finding a better measured compute-performance frontier from adaptive stopping.
- Provides qualitative NESTful examples in which deeper recurrence corrects function selection, call ordering, argument names, missing calls, and intermediate-variable references.

## Method

A looped Transformer repeatedly applies a shared block to its hidden state and reads a token distribution after each iteration. The paper studies two forms. Ouro models are natively recurrent and learn a distribution over exit depths during training. Retrofitted Llama and OLMo models replace repeated layer groups with shared recurrent blocks; their training depth is sampled from a Poisson-lognormal distribution, and supervision is applied at the final sampled readout.

All controlled models are fine-tuned on the Hermes Function-Calling V1 dataset with a shared recipe. Tool-use solutions are represented as directed acyclic graphs whose nodes are function calls and whose edges denote output-to-input dependencies. API-Bank emphasizes individual-call grounding, BFCL separates single calls from independent parallel call sets, and NESTful evaluates nested call sequences with explicit dependencies.

Fixed-depth experiments run Ouro for one through four iterations and the retrofitted models for one, two, four, or eight iterations. Adaptive experiments use Ouro's pretrained exit gate: each generated token exits when cumulative exit probability crosses a selected threshold. Evaluation reports BFCL semantic AST accuracy, NESTful execution win rate and sequence metrics, and API-Bank call correctness, exact match, and parse rate.

## Experiments

| Evaluation | Reported result | Evidence boundary |
| --- | --- | --- |
| BFCL controlled models | Ouro-2.6B SFT reaches 86.4% overall accuracy. The OLMo retrofit improves from 39.1% to 41.8%, and the Llama retrofit from 21.4% to 32.9%; gains are concentrated in multi-call categories. | Ouro lacks a non-looped checkpoint with identical pretraining, so its comparisons use similarly scaled Qwen and Llama models under matched fine-tuning rather than a fully matched architecture. |
| NESTful full evaluation | Ouro-1.4B improves from 0.110 to 0.191 win rate after SFT, and Ouro-2.6B from 0.190 to 0.371. | The full table does not report matched non-looped retrofit results; depth analyses use a fixed 500-example subset. |
| API-Bank | Looped and non-looped differences are small or inconsistent. The OLMo retrofit is worse than its parent on call correctness, while the Llama retrofit improves call and exact scores but has a lower parse rate. | This benchmark mostly measures isolated API invocation, so it does not directly test the paper's main compositional claim. |
| Fixed recurrent depth | BFCL accuracy and NESTful win rate generally rise with additional iterations, especially on multi-call or dependent tasks, before saturating. | Depth effects vary by model and task; Ouro-2.6B is near saturation after three iterations, and not every category improves monotonically. |
| Adaptive inference | Ouro's exit gate matches or slightly exceeds the best fixed-depth BFCL point with fewer average iterations; on NESTful, Ouro-2.6B matches fixed depth four at lower average depth. | Average loop count is a compute proxy; the paper does not report matched-hardware end-to-end latency. |

The qualitative examples support an iterative-refinement account: later passes sometimes replace unsupported functions, repair argument schemas, restore omitted dependent calls, and bind the correct intermediate output. They illustrate possible corrections rather than estimating their frequency across the benchmarks.

## Limitations

- No non-looped Ouro model with identical pretraining is publicly available, preventing a fully matched comparison for the native recurrent family.
- Extra recurrent iterations increase per-token computation; average loop depth does not by itself establish wall-clock efficiency.
- The benchmarks are static and single-turn. They do not test recovery from failed executions or changing observations in live, multi-turn episodes.
- The strongest retrofit gains remain below native Ouro performance on deeply nested workflows, so post-hoc recurrence is not equivalent to recurrent pretraining.
- The fixed-depth NESTful analysis uses a held-out 500-example subset rather than the complete evaluation set.
- Qualitative correction examples are not claimed to represent the overall error distribution.

## Related Concepts

- [[concepts/compositional-tool-calling|Compositional Tool Calling]]: the paper's central task, represented as function-call nodes and dependency edges.
- [[concepts/latent-reasoning|Latent Reasoning]]: recurrent iterations refine hidden representations without requiring explicit intermediate reasoning tokens.
- [[concepts/adaptive-computation|Adaptive Computation]]: Ouro selects a token-level exit depth rather than applying the same recurrence budget everywhere.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: weight sharing separates effective inference depth from the number of distinct parameters.

## Related Papers

- Zhu et al. (2025), "Scaling Latent Reasoning via Looped Language Models": introduces the Ouro family and its dynamic token-level computation.
- McLeish et al. (2025), "Teaching Pretrained Language Models to Think Deeper with Retrofitted Recurrence": supplies the recurrent Llama and OLMo checkpoints used for shared-backbone comparisons.
- Geiping et al. (2025), "Scaling Up Test-Time Compute with Latent Reasoning": studies recurrent depth as latent test-time computation.
- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]]: analyzes the hidden-state and attention dynamics of Ouro and recurrent retrofits.
- Basu et al. (2025), "NESTful: A Benchmark for Evaluating LLMs on Nested Sequences of API Calls": evaluates dependency-preserving tool workflows.
- Patil et al. (2025), "Berkeley Function Calling Leaderboard": evaluates single and independent multi-call function generation.

[[index|Library home]]
