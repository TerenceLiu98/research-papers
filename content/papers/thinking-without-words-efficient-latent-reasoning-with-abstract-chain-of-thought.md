---
title: "Thinking Without Words: Efficient Latent Reasoning with Abstract Chain-of-Thought"
type: paper
authors:
  - Keshav Ramji
  - Tahira Naseem
  - Ramón Fernandez Astudillo
year: null
source_job_id: "bda4bec4-a3b8-4dfa-8f35-a7a220286b75"
tags:
  - latent-reasoning
  - chain-of-thought
  - token-efficiency
  - reinforcement-learning
  - constrained-decoding
---

## TL;DR

Abstract Chain-of-Thought replaces a natural-language rationale with a bounded sequence from a newly reserved discrete vocabulary. A three-round warm-up alternates a verbal-CoT information bottleneck with on-policy self-distillation, after which GRPO jointly optimizes the abstract trace and answer under constrained decoding. Across Qwen3 and Granite models, the full method approaches or exceeds verbal-CoT post-training on MATH-500, AlpacaEval, and HotpotQA while using 1.9--11.6 times fewer reasoning tokens. Cold-start RL and warm-up alone are weaker, so the result depends on their combination rather than on reserved tokens by themselves.

## Research Question

Can an instruction-tuned language model learn, entirely through post-training, to replace long verbal chains of thought with short discrete latent traces while retaining response quality?

## Motivation

Verbal chain-of-thought can improve multi-step reasoning but increases inference cost and exposes rationales that may not faithfully describe the computation producing an answer. Continuous latent-reasoning methods shorten traces but require hidden-state recurrence or other departures from ordinary token generation. Abstract-CoT tests whether a standard autoregressive model can instead learn a compact, bounded, nonverbal reasoning medium in its discrete token space.

## Contributions

- Introduces a reserved abstract vocabulary and delimiters for emitting short intermediate traces before an answer.
- Develops a policy-iteration warm-up that alternates bottlenecked supervised learning from verbal rationales with self-distillation from prompt-only, on-policy abstract traces.
- Warm-starts GRPO from that model and restricts abstract rollouts to the reserved codebook while optimizing both trace and response tokens.
- Evaluates the method across three model sizes and families and five reasoning or instruction-following benchmarks.
- Reports ordered and length-sensitive abstract traces plus a power-law-like token-frequency distribution, while treating their semantic interpretation as an open question.

## Method

The tokenizer is extended with 64 reserved tokens and beginning and ending delimiters. Abstract generation is constrained to those tokens plus the end delimiter and capped at 128 tokens.

During bottlenecked SFT, training sequences contain the prompt, a gold verbal rationale, an abstract sequence, and the answer. Abstract positions can attend to the prompt and verbal rationale, but answer positions cannot attend directly to the rationale; the abstract hidden states are therefore the only route by which rationale information can reach the answer. The first iteration uses uniformly sampled abstract tokens. Later iterations generate them on-policy with the current model.

Self-distillation then removes the verbal rationale: the warm-up model generates a constrained abstract trace from the prompt, and standard causal SFT trains on that trace followed by the gold answer. The paper repeats the two phases for three policy-iteration rounds, with three epochs per phase.

The second stage applies GRPO for one million episodes. Each rollout first generates a constrained abstract trace and then an unconstrained response. A generative reward model, gpt-oss-20b, scores the result; policy updates and KL regularization cover both abstract and answer tokens. This lets the method operate on verifiable and open-ended tasks without assigning human meanings to individual codebook entries.

## Experiments

### Setup

Warm-up uses 600,000 subsampled Dolci-Think-SFT examples, while reinforcement learning uses Dolci-Think-RL prompts and responses. Evaluation covers MATH-500, AlpacaEval-LC-2.0, 500 HotpotQA examples, AIME 2025, and GPQA-Diamond. The main models are Qwen3-4B, Qwen3-8B, and Granite 4.0 Micro (3B), with a Qwen3-32B scaling experiment. Comparisons include direct generation, pause tokens, stepwise internalization, SFT with and without verbal CoT, verbal-CoT SFT plus RL, cold-start Abstract-CoT RL, and warm-up alone.

### Main Results

On Qwen3-8B, full Abstract-CoT scores 90.8 on MATH-500 with 144 average generated tokens, 60.8 on AlpacaEval with 225 tokens, and 58.8 F1 on HotpotQA with 171 tokens. Verbal-CoT SFT plus RL scores 92.6/1,671, 58.4/496, and 58.1/735, respectively. Across the three principal models, the reported reasoning-trace compression is 10.4--11.6 times on MATH-500, 1.9--2.2 times on AlpacaEval, and 4.0--4.3 times on HotpotQA.

The harder Qwen3-8B evaluations show a similar efficiency-quality tradeoff. Abstract-CoT reaches 50.5% on GPQA-Diamond with 174 tokens versus 51.5% with 1,382 tokens for verbal-CoT SFT plus RL. On AIME 2025 it reaches 24.4% with 3,438 tokens versus 25.6% with 9,343 tokens. Qwen3-32B preserves the reported pattern, nearly matching MATH-500 and outperforming the verbal baseline on AlpacaEval and HotpotQA with substantially fewer tokens.

### Ablations and Analysis

Cold-start RL commonly underperforms the base model, and warm-up alone generally remains below verbal-CoT SFT, whereas their combination is consistently strong. Pause-token fine-tuning is comparably short but degrades performance, and stepwise internalization requires 22 iterations while remaining weaker in the reported comparison.

Permuting abstract tokens reduces Qwen3-8B MATH-500 accuracy from 87.4 to 83.2 before RL and from 90.6 to 82.8 after RL, indicating that token order matters. Truncating traces to 32 tokens lowers Abstract-CoT from 90.6 to 84.6, compared with 92.6 to 80.8 for verbal CoT. During RL, codebook use develops a power-law-like frequency profile dominated by one token. These observations support learned structure and reuse, but do not establish interpretable concepts or a unique compositional algorithm.

## Limitations

- The abstract traces are not human-readable, and frequency, permutation, and truncation analyses do not reveal what individual tokens mean or prove mechanistic compositionality.
- The approach trades inference tokens for substantial post-training compute: warm-up uses repeated SFT and distillation, and RL runs for one million episodes on up to 32 H100 GPUs.
- Reported token counts combine reasoning and response tokens and do not directly measure wall-clock latency, memory use, energy, or serving cost.
- The main evidence covers Qwen3 and Granite instruction-tuned models and a limited benchmark set; HotpotQA uses only 500 examples.
- Training depends on verbal-CoT supervision during warm-up and on a generative reward model during RL, so the learned behavior may inherit errors or preferences from both.
- A fixed 128-token abstract budget may be insufficient for longer-horizon problems; difficulty-adaptive budgets and hierarchical codebooks are proposed rather than evaluated.
- The supplied Markdown does not state a stable paper identifier or publication year, so those metadata are left unasserted.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]
- Chain-of-thought reasoning
- Constrained decoding
- Self-distillation
- Group Relative Policy Optimization
- Test-time computation

## Related Papers

- [[papers/soft-token-alignment-for-cross-lingual-reasoning|Soft Token Alignment for Cross-Lingual Reasoning]]: uses continuous mixtures of vocabulary embeddings as a training signal rather than generating a discrete latent trace.
- [[papers/when-llms-develop-languages-symbolic-communication-for-efficient-multi-agent-reasoning|When LLMs Develop Languages: Symbolic Communication for Efficient Multi-Agent Reasoning]]: learns compact discrete protocols through frozen-model multi-agent search rather than weight-space post-training.
- Hao et al. (2025), "Training Large Language Model to Reason in a Continuous Latent Space": replaces verbal steps with continuous hidden states and provides a contrasting latent-reasoning mechanism.
- Deng et al. (2024), "From Explicit CoT to Implicit CoT: Learning to Internalize CoT Step by Step": supplies the stepwise-internalization comparison.
- Goyal et al. (2024), "Think Before You Speak: Training Language Models with Pause Tokens": motivates the filler-token baseline.

[[index|Library home]]
