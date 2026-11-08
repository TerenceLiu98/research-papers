---
title: "The JEPA Paradox in Language: The Geometry of Linguistic Alternatives"
type: paper
authors:
  - Anh Trac Duc Dinh
  - Khang Nhat Hoang Vo
year: null
source_job_id: "769f28ca-ac3d-4a5b-808b-5c2edb62502e"
tags:
  - joint-embedding-predictive-architectures
  - language-representation-learning
  - representation-collapse
  - latent-prediction
---

## TL;DR

The paper argues that deterministic squared-error latent prediction is poorly matched to masked text because a context can admit several valid completions whose embeddings do not share a meaningful center. In matched diagnostic experiments, text JEPA shows low context-target predictability and elevated conditional target variance before its held-out representation rank collapses; a separately scaled downstream study finds chance-level classification and zero retrieval. The evidence diagnoses the tested standalone T-JEPA recipe, not predictive learning for language in general: distributional, mixture-based, contrastive, or semantically coarser objectives may preserve multiple plausible completions.

## Research Question

Why does deterministic JEPA-style latent prediction transfer successfully across continuous modalities but fail to serve as a standard standalone objective for text encoders?

## Motivation

[[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] predict a masked target representation from visible context. Under squared error, the optimal deterministic prediction is the conditional mean. This is useful when valid targets cluster near one meaningful point, but masked language can remain lexically or semantically ambiguous even with substantial context. The paper asks whether this mismatch explains weak text representations more directly than model capacity or optimization alone.

## Contributions

- Introduces [[concepts/conditional-concentration-in-latent-prediction|Conditional Concentration in Latent Prediction]] as the condition that valid target representations cluster around a meaningful conditional center.
- Organizes the proposed failure mechanism around predictability, non-collapse, and low conditional variance, linking ambiguous completions to centroid prediction or loss-reducing representational compression.
- Constructs T-JEPA as a BERT-based language analogue of I-JEPA and tracks mutual-information, conditional-variance, effective-rank, cosine-similarity, loss, and transfer diagnostics.
- Separates standalone text JEPA from LLM-JEPA and DLLM-JEPA, whose JEPA losses accompany distributional generative objectives rather than replacing them.

## Method

For a masked context representation $z_C$ and target position $p_j$, a predictor minimizes squared error to the stopped-gradient target $z_T^{(j)}$ from an EMA encoder. Its Bayes-optimal output is

$$
g^*(z_C,p_j)=\mathbb E[z_T^{(j)}\mid z_C,p_j].
$$

The loss decomposes into predictor approximation error plus conditional target variance. If several plausible text completions retain separated representations, the second term remains nonzero and the mean may be a centroid corresponding to no coherent completion. If the encoder instead merges those alternatives, it can lower variance while discarding lexical, syntactic, or semantic distinctions. EMA and stop-gradient stabilize the target branch but do not impose full-rank covariance.

The proposed temporal signature is: context-target information saturates, conditional variance stays high, train and validation losses diverge, held-out effective rank degenerates, and downstream transfer fails. The study estimates predictability with an InfoNCE proxy, collapse with effective rank and pairwise cosine statistics, and conditional variance with sixteen candidate completions from a frozen masked-language-model oracle. Image variability is estimated from augmented masked regions.

## Experiments

### Matched Diagnostic Study

I-JEPA is trained on 100,000 ImageNet-1K images with a ViT-H/16 encoder; T-JEPA is trained on 100,000 English C4 sentences with a 24-layer BERT-Large encoder and a six-layer predictor. Both use a 90/10 split, EMA momentum 0.996, fifteen epochs, and a ten-epoch linear warmup followed by cosine decay. Five additional T-JEPA runs resample both the data subset and seed.

T-JEPA's validation mutual-information proxy stays below 0.35 nats. Its validation effective rank is still about 4.66 at step 2,000, placing limited predictability before the reported instability at step 9,340. Validation rank later falls to 1.57 while training rank rises to 494.39-545.44. At the instability point, reported conditional variance is 0.0116 on validation text versus 0.0059 for images. Text variance later drops to about 0.0012 only after the representation contracts, so the authors interpret the decrease as collapse rather than resolved ambiguity. The qualitative sequence recurs across five text runs.

### Downstream Transfer

A separate comparison pretrains T-JEPA, BERT, Barlow Twins, VICReg, and BYOL on three million C4 sentences with a shared BERT-base backbone, then freezes each encoder. T-JEPA reports IMDB accuracy of $50.02\pm0.13$, SNLI accuracy of $33.34\pm0.12$, and zero nDCG@10 and recall@100 on both FEVER and MSMARCO. BERT reaches $81.91\pm1.35$ and $59.72\pm1.25$ accuracy on IMDB and SNLI, respectively, with nonzero retrieval scores. Barlow Twins with masking is the strongest tested non-generative baseline on most classification metrics, though its retrieval remains near zero.

## Limitations

- The image-text comparison matches broad JEPA training choices but not architectures, data geometry, augmentations, or parameter counts; it supports a mechanism within the tested setups rather than a modality-wide impossibility result.
- The ten-epoch warmup was selected to slow collapse enough to observe its stages. The authors report faster collapse with shorter schedules, but this diagnostic choice limits direct comparison with standard pretraining recipes.
- The InfoNCE quantity is a proxy with a 2,048-item queue, and conditional variance depends on completions from a frozen masked-language model and on the chosen image augmentations. Neither directly identifies the true conditional distribution.
- The theory assumes separated representations for plausible completions and local regularity for images. These assumptions describe the claimed trade-off but are not established universally for learned encoders or masking schemes.
- The diagnostic study uses 100,000 examples, while downstream evaluation uses three million sentences, BERT-base, and different baselines. The two studies jointly support the narrative but are not one controlled experiment.
- Reported downstream evidence covers two classification and two retrieval benchmarks. It does not test token-level tasks, semantic-span targets, probabilistic predictors, mixture objectives, or a T-JEPA model augmented with SIGReg.
- The supplied manuscript gives no publication year, venue, DOI, or arXiv identifier, so none is inferred from its 2026 references.

## Related Concepts

- [[concepts/conditional-concentration-in-latent-prediction|Conditional Concentration in Latent Prediction]]: whether a deterministic target has a representative conditional center.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: the masked latent-prediction family studied here.
- Masked language modeling: a distributional alternative that predicts uncertainty over discrete tokens.
- Mutual information: motivates the context-target predictability diagnostic.

## Related Papers

- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture": the I-JEPA reference and image baseline.
- Baevski et al. (2022), "data2vec: A General Framework for Self-Supervised Learning in Speech, Vision and Language": a modality-general latent-target predecessor.
- Huang, LeCun, and Balestriero (2026), "LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures": combines JEPA with a language-modeling loss rather than training JEPA alone.
- Nam (2026), "DLLM-JEPA": combines a JEPA term with masked diffusion language modeling.
- Balestriero and LeCun (2025), "LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics": supplies SIGReg, which the paper argues can prevent marginal collapse without ensuring conditional predictability.

[[index|Library home]]
