---
title: "JEPA-Reasoner: Generative Latent Space Reasoner"
type: paper
authors:
  - Anonymous authors
year: null
source_job_id: "2a419969-fece-49d7-a7dc-0b7ab873adf8"
tags:
  - latent-reasoning
  - joint-embedding-predictive-architectures
  - robustness
---

## TL;DR

JEPA-Reasoner generates a normalized latent trajectory before a separately trained Talker reconstructs text. The anonymous review manuscript reports 99.87% exact-match accuracy on synthetic tree routes and 48.2% eight-shot GSM8K accuracy with a roughly 0.9B-parameter system. Noise experiments support improved relative robustness in several settings, but smaller variants often have lower absolute accuracy than coupled baselines. The supplied manuscript does not identify its year or a stable paper identifier.

## Research Question

Can separating continuous reasoning from token reconstruction extend [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] to sequential generation while reducing feedback from token errors?

## Motivation

Token sampling can introduce errors into subsequent generation. A separately generated latent trajectory provides a persistent conditioning signal for text reconstruction and allows the reasoner to train directly against latent targets.

## Contributions

- Adapts JEPA-style prediction to autoregressive latent generation with a separate reconstruction model.
- Combines next-token pretraining, EMA embedding targets, scaled cosine loss, and normalized latent feedback.
- Studies mixed latent representations on tree search, perturbation robustness on synthetic grammar completion, and arithmetic word-problem performance.

## Method

The reasoner uses token embeddings and modified Transformer blocks with non-learnable QK normalization. RMS and L2 normalization place predictions on the unit hypersphere; predicted vectors feed back into the Transformer without a vocabulary projection.

Pretraining uses teacher-forced next-token prediction, tied embeddings, a temporary language-model head, and disabled L2 normalization. Subsequent self-supervised training removes that head, restores L2 normalization, and minimizes scaled cosine distance, with scale 4 and an EMA target-embedding momentum of 0.98.

With the reasoner frozen, Talker learns token reconstruction through cross-entropy. Mono-Talker reconstructs a sequence in one forward pass from latent vectors alone. Dual-Talker encodes the latent trajectory and autoregressively decodes tokens with access to prior tokens. Experiments use hard-coded action filters; general tool routing is proposed rather than demonstrated.

## Experiments

- **Tree search (§5.1):** Randomly named binary trees of depth at most four yield 99.87% route exact match. Sibling-vector planes rank in the closest 1.72% on average; the correct sibling has the larger projection coefficient in 99.89% of cases. These geometric observations suggest mixed alternatives, without demonstrating a general breadth-first search algorithm.
- **Grammar completion (§5.2; Appendix B):** Models complete sequences of roughly 600–700 symbols under 0–30% input-token corruption. Reasoner-plus-Talker models have 132M, 209M, or 315M parameters versus 157M, 229M, or 338M for baselines. At 30% corruption, large-model four-step accuracy is 48.6% versus 45.2% for the Transformer, while clean accuracy is 66.5% versus 68.6%. Smaller reasoners retain a larger fraction of clean performance but often remain worse in absolute terms.
- **Latent noise (Table 4):** Large JEPA-Reasoner scores 0.4588 without noise and 0.4468 at the highest noise level, versus 0.3740 and 0.3629 for the COCONUT-style comparator. Middle and small reasoners score below their corresponding comparators at every listed noise level.
- **GSM8K (Tables 5–6):** A 694M reasoner with a 198M Mono-Talker scores 37.1% five-shot and 48.2% eight-shot, compared with 20.7% and 20.8% for the base Transformer. These are gains of 16.4 and 27.4 percentage points. The manuscript also lists external model comparisons, which should not be treated as matched-training ablations.
- **Readout probes (Appendix C):** Two training examples show that changing latent content redirects Dual-Talker output and Gaussian latent replacement disrupts coherence. This establishes dependence in these examples, not universal inability of the decoder to reason independently.

## Limitations

Evidence is concentrated in small synthetic tasks and one arithmetic benchmark. Training-stage changes and additional Talker parameters complicate causal attribution of GSM8K gains solely to decoupling. Tree-vector mixtures and PCA plots do not establish simultaneous independent reasoning threads. Unit-norm states bound magnitude but do not prove stability of repeated latent transitions. Token errors cannot alter an already completed latent trajectory, yet Dual-Talker can still propagate errors within its own output history.

The manuscript calls CFG evaluation exact match in §5.2, while Appendix B defines Table 7 accuracy as the fraction of correct symbols; these metrics should not be conflated. Its statement that five-to-eight-shot accuracy nearly doubles is also inconsistent with the reported change from 37.1% to 48.2%.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- [[index|Library home]]

## Related Papers

- Hao et al. (2024), *Training Large Language Models to Reason in a Continuous Latent Space*: the manuscript's COCONUT reference and basis for its coupled latent comparator.
- [[papers/denoising-with-a-joint-embedding-predictive-architecture|Denoising with a Joint-Embedding Predictive Architecture]]: cited generative JEPA work that uses diffusion rather than the proposed autoregressive latent trajectory.
- [[papers/what-matters-for-latent-reasoning-with-flow-matching|What Matters for Latent Reasoning with Flow Matching]]: a library comparison concerning latent generation and readout dependence, using flow-generated codes rather than JEPA-style feedback; not a cited comparison in this manuscript.
