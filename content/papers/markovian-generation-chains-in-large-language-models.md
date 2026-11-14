---
title: Markovian Generation Chains in Large Language Models
type: paper
authors:
  - Mingmeng Geng
  - Amr Mohamed
  - Guokan Shang
  - Michalis Vazirgiannis
  - Thierry Poibeau
year: null
source_job_id: "9d3d009f-fee5-4009-8d00-a1b0f272dd36"
tags:
  - large-language-models
  - iterative-generation
  - markov-chains
---

## TL;DR

Repeated LLM rephrasing and round-trip translation can settle into repeated strings or continue producing new forms. Greedy decoding typically produces early recurrence, while sampling sustains more variation. Sentence-level Markov kernels describe this inference-time process, but finite trajectories and approximate kernel estimates do not establish convergence to a stationary distribution.

## Research Question

How do text diversity, recurrence, and semantic drift evolve when each LLM call receives only the previous output and a task prompt?

## Motivation

Generated text is repeatedly rewritten or translated in communication pipelines. Understanding these transformations requires separating inference-time dynamics from parameter updates in [[concepts/regurgitative-training|Regurgitative Training]].

## Contributions

- Formalizes [[concepts/markovian-generation-chains|Markovian Generation Chains]] using sentences as states and prompted model calls as transitions.
- Measures exact recurrence, distinct strings, and lexical and semantic drift across models, domains, decoding settings, and task variants.
- Connects the process to entropy behavior and KL contraction, and evaluates approximate transition kernels against held-out trajectories.

## Method

For fixed model, prompt, and decoding configuration, the process is $s^{(t+1)} \sim P(\cdot\mid s^{(t)})$. Calls carry no conversation history. Round-trip translation composes the two directional kernels. Alternating prompts or models gives a time-varying kernel, or a homogeneous chain if the schedule phase is included in the state.

The first recurrence time is the first exact string repetition, censored at $T+1$ when none occurs within $T$ transitions. Diversity counts distinct strings; drift metrics include BLEU, ROUGE-1, METEOR, ChrF, TF-IDF cosine, BERTScore, anchor preservation, and compression ratio. These distinguish surface variation from meaning preservation.

For a doubly stochastic kernel, sentence-distribution entropy cannot decrease. General prompted kernels have no such guarantee. KL divergence contracts when both distributions pass through the same kernel; this alone does not imply convergence or a unique stationary distribution (Section 2).

## Experiments

The main study uses 150 first-sentence seeds from each of BookSum, ScriptBase-alpha, and News2024, with 50 transitions. Models are Mistral-7B-Instruct, Llama-3.1-8B-Instruct, Qwen2.5-7B-Instruct, and GPT-4o-mini. Greedy decoding is compared with sampling at temperature 0.7 and top-p 0.9.

Greedy chains typically repeat early; sampling yields more distinct strings and non-monotonic stepwise similarity. Seed-length associations vary by domain: GPT-4o-mini sampling has Pearson correlations of 0.638 on BookSum, 0.231 on ScriptBase, and 0.385 on News2024 (Table 9).

Extended GPT-4o-mini sampling runs use 500 transitions and 150 seeds per dataset (Table 3):

| Dataset | Mean distinct strings, 50 steps | Mean distinct strings, 500 steps | Chains with new forms in final 50 steps |
| --- | ---: | ---: | ---: |
| ScriptBase | 24.1 | 104.2 | 67.3% |
| BookSum | 24.2 | 105.6 | 66.0% |
| News2024 | 30.7 | 162.8 | 76.0% |

Core-state kernels fitted on the first half of trajectories yield held-out return-time log correlations of 0.53–0.73. Their stationary distributions perform worse than simply reusing first-half occupancy: median total-variation errors are 0.41 versus 0.33 for ScriptBase, 0.31 versus 0.25 for BookSum, and 0.34 versus 0.26 for News2024 (Table 4).

Prompt alternation increases variation without eliminating repeats. Paragraph experiments use 450 seeds and show rare whole-paragraph recurrence but repeated component sentences. Round-trip translation exhibits greater surface variability with sampled GPT-4o-mini than with Google Translate v3. The source also reports an alternating-model ablation with GPT-4o-mini and a model labeled DeepSeek V4 Flash.

## Limitations

The experiments emphasize English, first sentences, selected models, and controlled prompts. Equal temperatures are not directly comparable across models. Exact string diversity is not semantic diversity, and recurrence under stochastic decoding does not prove that a chain remains trapped thereafter. Continued novelty over 500 steps does not establish asymptotic divergence.

Kernel estimation pools all non-core strings into one tail state and applies smoothing; it approximates the induced process rather than recovering its full kernel. The stationary estimates do not outperform the occupancy baseline. Real pipelines with human intervention or retained history exceed the tested setting.

The supplied Markdown does not identify the paper's publication year, venue, DOI, or arXiv identifier; these are left unspecified.

## Related Concepts

- [[concepts/markovian-generation-chains|Markovian Generation Chains]]
- [[concepts/regurgitative-training|Regurgitative Training]] — updates model parameters using generated data, unlike the fixed-model inference studied here.

## Related Papers

- Mohamed et al. (2025), *LLM as a Broken Telephone: Iterative Generation Distorts Information*, studies distortion under repeated generation (cited by this paper).
- Perez et al. (2025), *When LLMs Play the Telephone Game*, studies cultural attractors in multi-turn settings (cited by this paper).
- [[papers/regurgitative-training-the-value-of-real-data-in-training-large-language-models|Regurgitative Training: The Value of Real Data in Training Large Language Models]] provides a library comparison for synthetic-data training, a different mechanism from inference-time recursion.

[[index|Library home]]
