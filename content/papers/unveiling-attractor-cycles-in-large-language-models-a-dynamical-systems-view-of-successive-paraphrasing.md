---
title: "Unveiling Attractor Cycles in Large Language Models: A Dynamical Systems View of Successive Paraphrasing"
type: paper
authors:
  - Zhilin Wang
  - Yafu Li
  - Jianhao Yan
  - Yu Cheng
  - Yue Zhang
year: null
source_job_id: "d08c020a-e15d-4d0f-b182-94dd0cefa31f"
tags:
  - large-language-models
  - paraphrasing
  - dynamical-systems
---

## TL;DR

Across 15 rounds of successive paraphrasing, tested LLMs tend to alternate between similar textual forms. Increasing temperature or changing prompts and models weakens but does not eliminate this pattern. Random selection among candidate paraphrases offers a better reported diversity–meaning tradeoff than always selecting the highest-perplexity candidate.

## Research Question

Does repeatedly paraphrasing a model’s own output explore diverse expressions, or converge toward recurring forms, and which interventions change this behavior?

## Motivation

Single-step paraphrase quality does not establish diversity over repeated transformations. This matters for rewriting pipelines and synthetic data augmentation, where additional rounds may reproduce familiar expressions rather than add useful variation.

## Contributions

- Frames successive paraphrasing as a discrete dynamical system and measures lag-two textual similarity.
- Documents periodicity alongside decreasing forward and reverse conditional perplexity and candidate diversity.
- Tests task changes, model and prompt variation, temperature, perturbations, history, and candidate selection.
- Connects candidate selection to downstream AG News classification performance.

## Method

The sequence follows $T_{i+1}=P(T_i)$. With normalized Levenshtein distance $d$, the paper defines $\tau=1-\frac{1}{M-2}\sum_{i=3}^{M}d(T_i,T_{i-2})$. Higher scores indicate stronger lag-two similarity. Sentence-embedding cosine similarity measures meaning preservation; the Vendi score measures candidate diversity.

The study uses 1,000 English sentences and 300 paragraphs from ten MAGE domains, plus 400 Chinese sentences from WMT 2019 and Wikipedia. Appendix A specifies 100 English sentences and 30 paragraphs per domain, resolving an inconsistent sentence-count description in Section 3. Models span Mistral-7B, Llama3-8B/70B, Qwen2.5-7B/14B/72B, GPT-4o-mini, and GPT-4o; Chinese experiments use Qwen and GPT-4o-mini. Defaults are temperature 0.6 and top-p 0.9, ten candidates/beams, highest-probability selection, and 15 rounds.

## Experiments

Table 1 reports lag-two similarity of 0.60 for Llama3-70B and 0.92 for Qwen2.5-72B; the latter scores 0.92 in both languages. Forward and reverse perplexity decrease alongside candidate diversity (Figure 3), which the authors interpret as self-reinforcement toward recurring forms.

Paragraph-level analyses find similar patterns for polishing, clarification, alternating style transfer, and round-trip translation. Model switching, prompt switching, and temperatures up to 1.5 retain periodic structure. A more elaborate diversity prompt reduces periodicity from 0.80 to 0.67 (Table 3). Editing 5% of the text yields scores of 0.73 for synonym replacement, 0.62 for word swapping, and 0.66 for insertion/deletion, against 0.77 without perturbations (Table 4). Supplying a previous paraphrase produces a three-step pattern rather than removing recurrence (Figure 8).

Maximum-perplexity candidate selection reduces periodicity but worsens semantic fidelity; random selection provides the authors’ preferred compromise. In a separate five-round AG News augmentation experiment (Table 5):

| Setting | Accuracy | 2-periodicity |
| --- | --- | --- |
| No augmentation | 83.10% | — |
| Minimum-perplexity selection | 83.80% | 0.51 |
| Maximum-perplexity selection | 84.41% | 0.33 |

## Limitations

The authors exclude large reasoning models and leave generalization to other models and complex prompts open. Reverse-perplexity convergence remains unexplained. The observed finite trajectories support approximate recurrence, not a proof of asymptotic limit cycles. Lag-two similarity alone also cannot distinguish a fixed point from a genuine two-cycle; alternating distance-matrix structure supplies additional evidence. Embedding similarity is a proxy for meaning preservation, and the reported classification comparison provides no uncertainty estimates.

The supplied Markdown does not establish a publication year or stable identifier, so these are not inferred.

## Related Concepts

- [[concepts/attractor-cycles-in-iterative-text-generation|Attractor Cycles in Iterative Text Generation]]
- [[concepts/cultural-attractors|Cultural Attractors]]: convergence in text properties rather than necessarily recurring textual forms.
- [[concepts/markovian-generation-chains|Markovian Generation Chains]]

## Related Papers

- [[papers/when-llms-play-the-telephone-game|When LLMs Play the Telephone Game]]: a library comparison studying property-level attraction in repeated text transmission, rather than lag-two paraphrase recurrence.
- Tripto et al. (2023), “A Ship of Theseus: Curious Cases of Paraphrasing in LLM-Generated Texts,” is cited for earlier successive-paraphrasing work.

[[index|Library home]]
