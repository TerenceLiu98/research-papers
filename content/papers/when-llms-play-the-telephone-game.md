---
title: "When LLMs Play the Telephone Game: Cultural Attractors as Conceptual Tools to Evaluate LLMs in Multi-Turn Settings"
type: paper
authors:
  - Jérémy Perez
  - Grgur Kovač
  - Corentin Léger
  - Cédric Colas
  - Gaia Molinaro
  - Maxime Derex
  - Pierre-Yves Oudeyer
  - Clément Moulin-Frier
year: null
source_job_id: "ebe61bfd-e02a-4a35-99be-451f25b83a34"
tags:
  - large-language-models
  - cultural-evolution
  - multi-turn-evaluation
---

## TL;DR

Repeatedly passing text between frozen LLMs changes its toxicity, sentiment, readability, and length in ways that single-turn evaluation misses. The authors estimate property-specific cultural attractors and report stronger attraction under more open-ended instructions, with toxicity showing stronger attraction than the other measured properties.

## Research Question

How do text properties evolve through repeated LLM transformations, and how do model choice, task constraints, sampling temperature, and instruction tuning affect convergence?

## Motivation

Outputs from one model increasingly become inputs to another. Small directional transformations can accumulate across these interactions. [[concepts/cultural-attractors|Cultural Attractors]] provide a way to characterize the resulting dynamics in [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]. Here, culture means socially transmitted information, rather than values associated with a particular human group.

## Contributions

- Adapts transmission-chain experiments from cultural evolution to frozen LLMs.
- Compares first-generation and later-generation property distributions.
- Defines regression-based estimates of attractor position and strength.
- Tests task, model, temperature, and fine-tuning effects, with additional prompt and initial-text controls.

## Method

Each agent receives the preceding text and a fixed instruction: rephrase, take inspiration, or continue. Only the generated output is transmitted onward. Main chains run for 50 steps, with 20 initial texts and five seeds per model-task condition. The initial set comprises five scientific abstracts, ten news articles, and five social-media comments selected to span property values.

The methods and results specify six models: GPT-4o-mini, GPT-3.5-turbo-0125, Llama3-8B-Instruct, Llama3-70B-Instruct, Mistral-7B-Instruct-v0.2, and Mixtral-8x7B-Instruct-v0.1. This supersedes the introduction's five-model description. Main sampling uses temperature 0.8 and top-p 0.95.

Metrics are Detoxify toxicity, VADER sentiment, Gunning–Fog readability difficulty, and character count. Kolmogorov–Smirnov tests compare generation-one distributions with subsequent generations. Bayesian additive models compare attractor estimates across tasks, models, and properties.

For each condition and property, the authors fit final values to initial values as $y=I+sx$. Iterating this fitted map gives a theoretical fixed point $I/(1-s)$ when $|s|<1$. They report strength as $1-s$. This is a fitted block-of-generations relationship, not a directly estimated one-step transition law. Appendix B.5 qualitatively checks predictions fitted at generation 10 against generation-50 distributions.

## Experiments

- **Distribution shifts:** later generations generally depart from generation-one distributions, especially for inspiration and continuation tasks. Toxicity rapidly concentrates near zero; Llama sentiment distributions can become bimodal.
- **Task effects:** estimated attraction follows Continue > Take Inspiration > Rephrase. The 95% credible interval for Continue minus Rephrase strength is [0.2195, 0.4187] (Appendix B.3, Table 2).
- **Property effects:** toxicity attraction exceeds length attraction, with a posterior difference interval of [0.2422, 0.4747] (Table 4).
- **Model effects:** Llama3-70B and GPT-4o-mini exhibit weaker attraction than GPT-3.5, Llama3-8B, and Mixtral in the reported comparisons. This does not establish a general model-size law.
- **Controls:** experiments with 100 initial texts and five instruction paraphrases on Llama3-8B show similar patterns. A controlled manipulation from minor to radical changes supports the task-constraint interpretation, except for length.
- **Temperature and tuning:** higher temperature appears to strengthen attraction for rephrasing and inspiration, but not continuation. Base-versus-Instruct comparisons suggest tuning shifts length attractors downward and difficulty attractors upward.
- **Heterogeneous chains:** alternating Mistral and Llama agents sometimes yields attractor positions outside the interval between homogeneous-chain estimates.

## Limitations

The main design uses homogeneous linear chains and four automated proxies; it does not establish dynamics in general human–AI networks or measure all aspects of semantic preservation. Mistral continuation outputs sometimes degenerate into hashtags, which are filtered from the main analyses and examined separately. The regression approximation can obscure multimodality. Mathematically, $1-s$ lies in [0,1] only for slopes in [0,1], despite the paper's broader convergence condition $|s|<1$; contraction in general depends on $|s|$. Repeated KS tests are reported without multiplicity correction, justified by the authors as interpretation of trends rather than isolated threshold crossings.

The supplied Markdown does not establish a publication year or a stable paper identifier; the year is left unspecified. Reproduction resources reported by the paper are the [code and data repository](https://github.com/jeremyperez2/TelephoneGameLLM) and [companion website](https://sites.google.com/view/telephone-game-llm).

## Related Concepts

- [[concepts/cultural-attractors|Cultural Attractors]]
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/regurgitative-training|Regurgitative Training]]: feedback through training data, distinct from the frozen-model transmission studied here.

## Related Papers

- Acerbi and Stubbersfield (2023), “Large language models show human-like content biases in transmission chain experiments,” is a direct precursor cited by the authors.
- [[papers/regurgitative-training-the-value-of-real-data-in-training-large-language-models|Regurgitative Training: The Value of Real Data in Training Large Language Models]] studies synthetic-output feedback through parameter updates; the present paper studies feedback through inference inputs.

[[index|Library home]]
