---
title: "Soft Token Alignment for Cross-Lingual Reasoning"
type: paper
authors:
  - Jiayi He
  - Jungsoo Park
  - Wei Xu
  - Alan Ritter
year: null
tags:
  - multilingual-reasoning
  - cross-lingual-alignment
  - soft-tokens
  - supervised-fine-tuning
  - continuous-reasoning
---

## TL;DR

SOLAR adds a [[concepts/soft-token-alignment|Soft Token Alignment]] loss to supervised fine-tuning: it represents each response position as a top-$k$ probability-weighted mixture of vocabulary embeddings, pools these mixtures across the response, and pulls each non-English summary toward a stop-gradient English counterpart. Across MGSM, AIME 2024, AIME 2025, and GPQA, the method improves Qwen3 accuracy and cross-lingual consistency over standard fine-tuning, with especially large benefits for low-resource languages. Ablations attribute the gain to truncated embedding-space mixtures and full-response alignment rather than hard tokens, final hidden states, or raw probability vectors, although the evidence is limited to parallel reasoning data, moderate model scales, and mostly short-answer math and science tasks.

## Research Question

Can continuous soft-token representations provide a better training signal than discrete tokens for keeping semantically equivalent multilingual reasoning traces aligned without forcing models to reason in English?

## Motivation

Multilingual models can encode similar semantics in intermediate layers yet diverge near generation, where a shared distribution is collapsed into a language-specific token and script. Inference-time soft thinking retains a mixture of likely token embeddings, but it does not train parallel reasoning paths to remain aligned. SOLAR tests whether those mixtures can serve as a cross-lingual auxiliary target during supervised fine-tuning.

## Contributions

- Introduces SOLAR, an auxiliary objective that aligns mean-pooled soft-token summaries from parallel English and non-English reasoning traces.
- Separates the alignment representation from generation: training remains teacher-forced on discrete reference tokens, while soft tokens are used only to compute the auxiliary loss.
- Evaluates accuracy and cross-lingual consistency on four benchmarks and multiple Qwen3 and Gemma3 model sizes.
- Compares discrete and soft representations across model depth and measures whether fine-tuning preserves target-language script use.
- Ablates the alignment target, pooling granularity, top-$k$ filter, temperature, loss weight, representation space, and pivot language.

## Method

At each response position, SOLAR filters the next-token distribution to its top $k$ entries, renormalizes it, and takes the expected vocabulary embedding:

$$
\mathbf e_t^{\mathrm{soft}}=\sum_{v\in V}\widetilde p_\theta(v\mid \mathbf e_{1:t-1})\mathbf E[v].
$$

It mean-pools these embeddings over the complete reasoning trace and final response. For every parallel pair, cosine distance aligns the non-English summary with the English summary, with stop-gradient on the English branch. A non-English training example uses

$$
\mathcal L_{\mathrm{SFT}}^{(\ell)}=\mathcal L_{\mathrm{CE}}^{(\ell)}+\lambda\left(1-\cos(\bar{\mathbf e}_{\mathrm{en}}^{\mathrm{soft}},\bar{\mathbf e}_{\ell}^{\mathrm{soft}})\right),
$$

while English examples receive only cross-entropy loss. The main configuration uses English as pivot, $k=30$, soft-token temperature $\tau=1.0$, and alignment weight $\lambda=0.5$.

## Experiments

### Setup

The authors fine-tune Qwen3-4B/8B and Gemma3-4B/12B on M-s1k, a 1,000-item multilingual long-chain-of-thought dataset translated into ten languages. Evaluation covers the seven training languages shared by MGSM and XReasoning: English, French, Japanese, Swahili, Telugu, Thai, and Chinese. The four benchmarks are MGSM, AIME 2024, AIME 2025, and GPQA Diamond. Results average five runs for MGSM and GPQA and ten for each AIME set. The principal metrics are accuracy and cross-lingual consistency (CLC), the fraction of questions answered correctly in both English and a comparison language.

### Main Results

For Qwen3-4B, SOLAR improves over SFT by 1.5 to 3.8 accuracy points and 3.1 to 4.5 CLC points across the four benchmarks. Its average across benchmarks is 48.25% accuracy and 41.51% CLC, compared with 45.67% and 37.76% for SFT. For Qwen3-8B, the corresponding averages are 70.21% and 64.55%, versus 68.65% and 62.31% for SFT. The paper reports the largest gains in low-resource languages; for example, the English-pivot Qwen3-4B configuration reaches 53.48% MGSM accuracy in Swahili.

Representation probes show an inverted-U pattern in cross-lingual similarity across depth and concentrate SOLAR's change in the final layer. On Qwen3-4B, discrete final-layer cross-lingual similarity rises from 0.14 in the base model to 0.30 after SFT and 0.50 after SOLAR; on Qwen3-8B it rises from 0.23 to 0.50 and 0.76. Script analysis indicates that the gains do not require English reasoning: SOLAR-tuned Qwen3-4B and Qwen3-8B produce target-script reasoning on MGSM at reported rates of 98.13% and 98.16%.

### Ablations

Full-response soft-token pooling gives the best aggregate Qwen3-4B result. Hard-token and final-hidden-state targets remain close to SFT, while an untruncated vocabulary mixture trails top-$k$ SOLAR. Values $k=10$, 30, and 50 form a performance plateau, whereas $k=1$ reduces to hard selection. Raw probability-space alignment performs poorly on MGSM (60.27% accuracy and 44.76% CLC) relative to embedding-space alignment (78.27% and 75.61%), consistent with different languages placing probability mass on largely disjoint token subsets. English is also a stronger pivot than Chinese or French in the reported experiment, especially for Swahili.

## Limitations

SOLAR requires parallel long reasoning traces; extending it to new languages entails translation and mathematical-fidelity checks. Fine-tuning is evaluated only on Qwen3 and Gemma3 models at 4B--12B scale, despite broader representation probes. The tasks are mathematical reasoning and graduate-level science question answering with short verifiable answers, so response-level mean pooling may not transfer to open-ended generation. Step-level alignment is based on relative position rather than content-aware correspondence. The paper does not test reinforcement-learning integration, larger or mixture-of-experts models, multimodal models, or alternatives such as KL and Jensen--Shannon divergence for probability-space alignment. English-pivot performance also depends on the strength of English representations and should not be read as evidence that English is universally the best pivot.

The supplied Markdown does not state a stable paper identifier or publication year; these metadata are left unasserted.

## Related Concepts

- [[concepts/soft-token-alignment|Soft Token Alignment]]
- [[concepts/latent-reasoning|Latent Reasoning]]
- Multilingual reasoning
- Cross-lingual representation alignment
- Supervised fine-tuning
- Chain-of-thought reasoning

## Related Papers

- [[papers/large-reasoning-models-are-not-yet-multilingual-latent-reasoners|Large Reasoning Models Are (Not Yet) Multilingual Latent Reasoners]]: provides complementary diagnostic evidence about where multilingual reasoning representations converge and diverge across layers.
- Zhang et al. (2025), "Soft Thinking: Unlocking the Reasoning Potential of LLMs in Continuous Concept Space": introduces the inference-time soft-token mechanism repurposed by SOLAR as a training signal.
- Liu and Niehues (2025), "Middle-Layer Representation Alignment for Cross-Lingual Transfer in Fine-Tuned LLMs": supplies the MidAlign baseline for hidden-state alignment.
- She et al. (2024), "MAPO: Advancing Multilingual Reasoning through Multilingual-Alignment-as-Preference Optimization": provides a preference-optimization baseline based on translation scores.
- Bu et al. (2025), "AlignX: Advancing Multilingual Large Language Models with Multilingual Representation Alignment": combines intermediate-layer contrastive alignment with language matching.

[[index|Library home]]
