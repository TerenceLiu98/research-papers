---
title: "Transfer Entropy as a Measure of Information Flow in LLMs and VLMs"
type: paper
authors:
  - Anonymous Authors
year: null
source_job_id: "9ea8c0e3-29ac-4072-b334-7d0d8fa45572"
tags:
  - transfer-entropy
  - transformer-interpretability
  - model-compression
  - vision-language-models
---

## TL;DR

The paper develops a low-cost activation-difference proxy motivated by [[concepts/transfer-entropy|Transfer Entropy]] to profile Transformer layers and rank them for pruning. Removing four of twelve RoBERTa layers preserves much of the reported GLUE performance after recovery fine-tuning; CLIP pruning beats matched pruning baselines but substantially reduces retrieval recall. The practical score measures squared cosine alignment and should be treated as a relative diagnostic, not calibrated information flow or established causal influence.

## Research Question

Can a tractable information-theoretic diagnostic reveal depth-dependent representation reuse in language and vision-language Transformers and identify removable layers?

## Motivation

Attention probabilities describe routing weights but do not directly quantify the additional predictive information supplied by another representation. Exact conditional information estimation is impractical for high-dimensional hidden states. The paper seeks a cheap proxy usable during fine-tuning across architectures.

## Contributions

- Develops a local linear–Gaussian formulation, a trace approximation, and a finite-difference cosine proxy for adjacent-layer analysis.
- Uses high scores to select successor layers for structured pruning, with smoothing, optional permutation-null calibration, and architectural safeguards.
- Profiles RoBERTa, T5, Llama-3.2-3B, Qwen-2.5-7B, CLIP, and LLaVA.
- Extends the diagnostic to visual/text representation alignment and heuristic attention-head role classification.

## Method

The proposed layerwise target is

$$
I(X_{\ell+1}^{t+1};X_\ell^{t+1}\mid X_{\ell+1}^{t}),
$$

where $t$ indexes training updates. This uses the updated lower-layer state rather than the lagged source in conventional temporal TE. A local Gaussian perturbation model yields a covariance-based log-determinant expression; a first-order trace truncation and rank-one approximation motivate

$$
\widehat{\mathrm{TE}}_\ell=\frac{1}{2(B-1)}\sum_{i=1}^{B-1}\cos^2(\Delta z_{\ell+1,i},\Delta z_{\ell,i}).
$$

The differences are between adjacent batch items, not directly between training checkpoints. Algorithm 1 caches pre- and post-update activations on a fixed probe batch, optionally pools tokens, and regularizes cosine denominators. Its final aggregation uses post-update differences; the cached conditioning state does not explicitly enter that calculation. The extra score computation is linear in batch size and hidden width, excluding probe forward passes.

Scores are averaged or exponentially smoothed, optionally corrected using a shuffled-source baseline, and used to prune the highest-scoring successors. The authors interpret strong alignment as representation reuse. Embeddings, prediction heads, and minimum module depths are preserved; recovery fine-tuning follows removal.

For LLaVA, visual and textual pooled activation changes are compared within each decoder layer. For CLIP heads, CLS/EOT attention masses and within-layer score thresholds assign sink, broadcaster, or benign labels. These are diagnostic classifications rather than independently validated causal roles.

## Experiments

### Layer profiles

RoBERTa shows a mid-depth peak; Llama and Qwen show broader middle-layer plateaus. T5 encoder and decoder profiles differ, with a generally elevated encoder and a mid-depth decoder peak. CLIP vision scores peak late, whereas text scores remain broadly elevated. In LLaVA, visual/text change alignment increases toward upper decoder layers across Flickr8k and MSCOCO. These observations support architecture-dependent profiles within the tested settings.

### Pruning results

RoBERTa is fine-tuned for six epochs, loses four of twelve layers, and receives five further epochs of recovery. Selected Table 1 results are:

| Method | MNLI | SST-2 | QNLI | STS-B |
| --- | ---: | ---: | ---: | ---: |
| No pruning | 0.7840 | 0.9220 | 0.8731 | 0.9075 |
| High-score pruning | 0.7860 | 0.9186 | 0.8548 | 0.9063 |
| SlimLLM | 0.7660 | 0.8979 | 0.8548 | 0.9043 |
| Low-score pruning | 0.3470 | 0.9094 | 0.5094 | 0.2896 |

STS-B uses correlation; the other selected columns use accuracy. Reverse ranking sharply harms several tasks, supporting the empirical ranking criterion.

T5 loses four decoder layers. Table 5 reports SVAMP accuracy rising from 0.2600 to 0.3400, but ANLI falling from 0.3890 to 0.3690, CQA from 0.5807 to 0.5717, and e-SNLI from 0.5375 to 0.5350. The accompanying prose incorrectly describes an ANLI improvement; the table is followed here.

CLIP uses rank-8 LoRA with two warm-up epochs and three recovery epochs. Removing two vision and two text layers gives image-to-text/text-to-image R@1 of 27.36%/16.67%, versus 42.20%/26.66% unpruned, 25.65%/15.91% for Short-LVLM, and 26.83%/16.18% for Streamline. Larger pruning budgets worsen recall despite maintaining an advantage over these baselines (Table 2).

Appendix J describes at most 5,000 training and 1,000 evaluation examples per language task. Larger decoder models receive short rank-4 LoRA adaptation; their profiles do not constitute a demonstrated pruning-performance evaluation. An unusually high RoBERTa learning rate of 0.02 collapses scores and performance. A controlled Gaussian rank sweep checks qualitative agreement between approximation variants rather than exact TE recovery in full Transformers.

## Limitations

- Local linearity, Gaussian perturbations, trace truncation, and rank-one covariance assumptions restrict the information-theoretic interpretation. Finite batches, pooling, and multiple active directions can bias estimates.
- Squared cosine similarity is symmetric in its two inputs; assigning architectural direction does not make that score an independently identified asymmetric or causal information measure.
- Score normalization is inconsistent: Equation 18 is bounded by 0.5, Appendix G uses an unhalved proxy bounded by 1, and T5 descriptions report values above 0.9. Absolute cross-model comparisons require clarification.
- The pruning tables do not report uncertainty across repeated runs. Recovery training contributes to the reported outcomes, and CLIP suffers substantial absolute degradation.
- Head labels depend on heuristic thresholds and attention-mass conventions. They should not be equated with demonstrated intervention effects.
- The supplied manuscript is anonymous and gives no identifiable publication year or stable identifier for this paper; these are not inferred from its references.

## Related Concepts

- [[concepts/transfer-entropy|Transfer Entropy]]: conditional predictive information underlying the proposed diagnostic.
- [[concepts/granger-causality|Granger Causality]]: the related prediction-based framework, equivalent up to scaling under appropriate Gaussian assumptions.
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]: the broader goal of explaining internal model computation.

## Related Papers

- Schreiber (2000), “Measuring Information Transfer”: foundational TE definition cited in the manuscript.
- Barnett, Barrett, and Seth (2009), “Granger Causality and Transfer Entropy Are Equivalent for Gaussian Variables”: the cited Gaussian connection.
- [[papers/granger-causality-detection-with-kolmogorov-arnold-networks|Granger Causality Detection with Kolmogorov-Arnold Networks]]: a library comparison using explicit lagged prediction and sparse input mappings, rather than hidden-state alignment; not claimed as a citation by this manuscript.

[[index|Library home]]
