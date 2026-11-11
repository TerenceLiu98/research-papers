---
title: Dispersion Loss Counteracts Embedding Condensation and Improves Generalization in Small Language Models
type: paper
authors:
  - Chen Liu
  - Xingzhi Sun
  - Xi Xiao
  - Alexandre Van Tassel
  - Ke Xu
  - Kristof Reimann
  - Danqi Liao
  - Mark Gerstein
  - Tianyang Wang
  - Xiao Wang
  - Smita Krishnaswamy
year: null
source_job_id: "88982b42-cf04-4083-bffb-f5a46f2bd836"
tags:
  - representation-geometry
  - language-models
  - regularization
---

## TL;DR

An angular dispersion penalty reduces directional concentration of contextual token representations and improves average downstream scores in small Transformers without adding parameters. Qwen3-0.6B trained from scratch improves from 34.84 to 36.01 across ten tasks, although four tasks decline.

## Research Question

Can explicitly counteracting token embedding condensation reproduce useful geometric properties of larger models and improve smaller language models?

## Motivation

Smaller models within the studied Transformer families tend to align contextual token vectors in a narrow cone as depth increases. Larger models resist this pattern more strongly. The authors hypothesize that this geometry limits small-model expressivity; favorable geometry is not reliably transferred by the studied distillation comparisons.

## Contributions

- Defines condensation through pairwise token cosine similarities approaching one and tracks its evolution across layers.
- Compares GPT2, Qwen1, Qwen2.5, Qwen3, and Bloom, including a controlled experiment varying only MLP width.
- Introduces angular dispersion regularization and compares decorrelation, norm-regularized Euclidean repulsion, and orthogonalization.
- Tests continued training and full pre-training with downstream language understanding evaluations.

## Method

For each sequence, collect contextual token vectors at each layer and summarize all pairwise cosine similarities. Heatmaps average over 100 WikiText-103 sequences; Spearman and Kendall correlations between layer index and mean similarity quantify depth trends. These correlations measure monotonicity, not absolute concentration.

With normalized angular distance $D(z_i,z_j)=\arccos(\operatorname{cos}(z_i,z_j))/\pi$, the objective is

$$
\mathcal L=\mathcal L_{\mathrm{CE}}+\lambda_{\mathrm{disp}}\log\sum_{i\ne j}\exp[-D(z_i,z_j)/\tau].
$$

The penalty is computed within sequences and aggregated across layers. Appendix A normalizes vectors, clamps cosine values away from the endpoints using a straight-through adjustment, excludes diagonal pairs, and uses log-sum-exp. Its log-mean version differs from the displayed log-sum objective by a constant for fixed token count. Defaults are $\lambda_{\mathrm{disp}}=0.1$ and $\tau=1$. Pairwise computation costs $O(N^2F)$; token subsampling can reduce overhead.

## Experiments

The controlled scale experiment trains four GPT2-like models for 1B tokens with fixed depth and embedding dimension but different MLP widths. Larger MLPs show less condensation. OLMo-3-1025-7B checkpoints show strong condensation at initialization that training progressively mitigates. Qwen2.5-based distilled models do not consistently inherit a less condensed geometry.

Mid-training uses 200M WikiText tokens and three random seeds. Table 2 reports the following ten-task averages (mean ± standard deviation):

| Model | Cross-entropy | With dispersion | Change |
| --- | --- | --- | --- |
| GPT2 | 34.95 ± 0.11 | 35.61 ± 0.12 | +0.66 |
| GPT2-medium | 38.55 ± 0.18 | 39.35 ± 0.15 | +0.80 |
| Qwen3-0.6B | 45.93 ± 0.37 | 47.45 ± 0.16 | +1.52 |
| Qwen3-1.7B | 54.57 ± 0.17 | 55.68 ± 0.21 | +1.11 |

Benchmarks are ANLI R2, LAMBADA, OpenBookQA, PIQA, TruthfulQA, WinoGrande, ARC Easy, ARC Challenge, MedMCQA, and MMLU. The first six are zero-shot; the final four use one shot for GPT2 and five for Qwen3. Reported training-time multipliers for dispersion are 1.03–1.05 relative to cross-entropy. GPT2 late-layer regularization outperforms early-layer regularization, 35.37 versus 34.96 (Table 3).

Full pre-training uses Qwen3-0.6B, C4, 156B tokens, and 640 GPUs. Table 5 reports a +1.17-point average gain, including PIQA +4.0 and TruthfulQA +7.4. ANLI drops 2.0 points, OpenBookQA 2.0, WinoGrande 3.5, and ARC Easy 1.5.

## Limitations

- Average gains are not universal task gains, and several GPT2 alternatives are not statistically distinguishable from dispersion in Table 2.
- The intervention supports a role for geometry but does not establish that condensation explains all benefits of model scaling. Benefits in substantially larger models remain future work.
- Full pre-training results do not include the multi-seed uncertainty reported for mid-training.
- Rank correlations can obscure absolute geometric differences; angular diversity alone does not demonstrate semantic utility.
- Appendix E's Gaussian-padding upper-bound proof invokes an almost-sure inequality that does not follow from chi-square support. Its strict cosine bounds also cannot hold at zero original cosine. Treat this auxiliary argument separately from the empirical results.
- No publication year or stable identifier is explicit in the supplied Markdown; year is left unset.

## Related Concepts

- [[concepts/embedding-condensation|Embedding Condensation]]
- [[concepts/geometry-aware-regularization|Geometry-Aware Regularization]]

## Related Papers

- [[papers/geolan-geometric-learning-of-latent-explanatory-directions-in-large-language-models|GeoLAN]]: a library comparison involving geometric regularization with scale-dependent outcomes; it uses different objectives and does not constitute a direct replication.
- Wang and He (2025), *Diffuse and Disperse*: cited precursor using representation regularization for image generation.
- Li et al. (2026), *On the Predictive Power of Representation Dispersion in Language Models*: cited concurrent work emphasizing dispersion and perplexity.

[[index|Library home]]
