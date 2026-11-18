---
title: "LatentMT: Machine Translation with Latent Reasoning"
type: paper
authors:
  - Wei-Rui Chen
  - Samar M. Magdy
  - Chiyu Zhang
  - Wenhui Zhu
  - Zhipeng Wang
  - Muhammad Abdul-Mageed
year: null
source_job_id: "6d5653e6-2887-4ae9-8fdf-c5954a2f08e1"
tags:
  - machine-translation
  - latent-reasoning
  - recurrent-depth
---

## TL;DR

LatentMT adapts a frozen 2.6B Ouro looped language model with language-pair-specific LoRA adapters. Across 32 English-source translation directions, it beats a same-protocol Qwen3-8B baseline on aggregate benchmark scores, with most benefits from recurrence arriving in the first two to four steps. Stronger literary-specialized models still lead on Chinese translation, and the low-resource average advantage over EMMA-500-8B is small.

## Research Question

Can compact recurrent models provide competitive machine translation, and how quickly do translation gains saturate as latent computation depth increases?

## Motivation

Repeated use of shared Transformer weights can increase computation without increasing parameter storage or emitting reasoning tokens. Pair-specific adapters let one backbone serve multiple translation directions, motivating compact local translation systems.

## Contributions

- Evaluates latent recurrent translation on Chinese, Egyptian Arabic, and 30 low-resource language/script targets.
- Compares fixed depths from one to six on two benchmarks and connects quality saturation to hidden-state and token-preference stabilization.
- Measures training and inference efficiency against a larger explicit-reasoning baseline on DRT.

## Method

Ouro-2.6B-Thinking remains frozen while LoRA adapters learn target-side causal language modeling; prompt tokens are masked from the loss. A shared Transformer stack updates hidden states repeatedly before next-token prediction. Adaptive early exit is disabled, so each token uses the run's fixed depth. This instantiates [[concepts/latent-reasoning|Latent Reasoning]] through recurrent hidden-state refinement.

DRT and ArzEn-MultiGenre use LoRA rank 32, alpha 64, and three and six training epochs respectively. OLDI/Flores uses rank 16, alpha 32, and four epochs. All use dropout 0.05 and AdamW with learning rate 0.0002. Generation uses temperature 1.0 and top-p 0.7. Trained models receive zero-shot prompts; out-of-box models receive five exemplars.

## Experiments

| Benchmark | Data and setting | Reported results |
| --- | --- | --- |
| DRT, English to Chinese | 19,264 training and 2,000 test examples | Depth five: 29.37 BLEU, 76.57 COMET, 69.21 COMETKiwi; Qwen3-8B SFT: 13.19, 54.82, 45.14. DRT-14B leads with 36.46 BLEU and 80.64 COMET. |
| ArzEn-MultiGenre, English to Egyptian Arabic | 22,224 training and 1,666 test examples | Best overall BLEU is 24.47 at depth four, versus 19.16 for Qwen3 and 17.19 for fine-tuned Google NMT. Google remains stronger on Songs and Novels; LatentMT's advantage is concentrated in Subtitles. |
| OLDI/Flores, 30 targets | Per target: 6,193 training and 1,012 test examples; depth four | Mean BLEU/chrF++: 12.71/29.94, versus Qwen3's 8.27/21.76 and EMMA-500-8B's 12.51/29.13. Individual languages do not uniformly benefit. |

On DRT, depth one to two increases BLEU from 20.25 to 27.90; depth five reaches 29.37. Egyptian Arabic rises from 15.35 at depth one to 24.47 at four, then fluctuates. Manual LQM annotation covers 30 Chinese and 60 Egyptian Arabic segments and likewise finds early reductions in severe errors.

At DRT depth six, adjacent-step mean cosine distance falls from 0.1585 to 0.0141, and top-1 token flip rate from 0.3201 to 0.0388. These observations support stabilization, not a causal identification of the internal algorithm. Egyptian Arabic cosine distances are not strictly monotonic at every transition.

On DRT, depth two retains 97.9% of the peak average of three quality metrics. Relative to the explicit-reasoning Qwen3 baseline, reported inference latency falls by 61.9% at depth two and 8.5% at five; peak inference memory falls by 52.2% and 26.9%. Both depths reduce peak training memory by over 63%. These comparisons include the baseline's longer emitted reasoning traces.

## Limitations

- Evidence uses one recurrent backbone; matched fine-tuning does not match model pretraining or isolate architecture alone.
- Depth sweeps and human analysis cover Chinese and Egyptian Arabic; the 30-target evaluation fixes depth at four.
- Human evaluation is small, with one trained native-speaking linguist per language. The supplied text does not report uncertainty intervals or repeated-seed results.
- GPU efficiency measurements do not demonstrate deployment on edge hardware. Adaptive early exit is deliberately excluded.
- Benchmark-leading averages apply to the displayed comparisons, not universal superiority across languages, genres, or translation systems.
- The supplied Markdown does not establish a publication year or stable identifier for this paper; these are left unspecified.

## Related Concepts

- [[concepts/latent-reasoning|Latent Reasoning]]: translation improves through internal recurrent computation without explicit intermediate text.

## Related Papers

- Zhu et al. (2025), “Scaling Latent Reasoning via Looped Language Models”: introduces the Ouro backbone used here.
- Geiping et al. (2025), “Scaling Up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach”: studies the recurrent-depth scaling mechanism.
- [[papers/looped-language-models-improve-compositional-tool-calling|Looped Language Models Improve Compositional Tool Calling]]: studies the same recurrent-computation principle for structured tool calls, including adaptive exit rather than only fixed depth.
