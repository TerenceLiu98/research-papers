---
title: "Temporal Sparse Autoencoders: Leveraging the Sequential Nature of Language for Interpretability"
type: paper
authors:
  - Usha Bhalla
  - Alex Oesterling
  - Claudio Mayrink Verdun
  - Himabindu Lakkaraju
  - Flavio P. Calmon
year: null
source_job_id: "1a7a750c-3fee-43cd-a268-e951d264daad"
tags:
  - sparse-autoencoders
  - mechanistic-interpretability
  - temporal-representation-learning
  - feature-disentanglement
---

## TL;DR

Temporal Sparse Autoencoders (T-SAEs) add a contrastive temporal-consistency objective to a hierarchical [[concepts/sparse-autoencoders|Sparse Autoencoder]]. The objective encourages one feature subset to remain stable across adjacent tokens while another reconstructs the residual. On Pythia-160m and Gemma 2-2B, the resulting high-level features carry more semantic and contextual information than the tested Matryoshka and BatchTopK baselines while retaining similar reconstruction and automated-interpretability scores. The paper also reports more coherent feature steering and a safety-dataset audit, but its temporal hierarchy, models, and steering evaluation remain limited in scope.

## Research Question

Can the sequential structure of language serve as self-supervision for learning sparse features that separate temporally persistent semantic and contextual information from local syntactic information?

## Motivation

Standard SAEs treat token activations as independent samples. Their learned features can therefore be token-specific, noisy, or dominated by local syntax even when the underlying model representation contains higher-level semantic structure. The paper starts from the linguistic premise that semantics and intent usually persist across nearby tokens, whereas many syntactic properties vary locally, and turns this distinction into a training prior.

## Contributions

- Formalizes language generation using high-level, temporally consistent variables and low-level, token-specific variables.
- Introduces [[concepts/temporal-sparse-autoencoders|Temporal Sparse Autoencoders]], which divide their sparse code into high- and low-level feature subsets and apply a contrastive temporal loss only to the high-level subset.
- Evaluates semantic, contextual, and syntactic information with sparse and dense probes across Pythia-160m and Gemma 2-2B representations and multiple text datasets.
- Studies reconstruction, sparsity, feature smoothness, automated interpretation, absorption, feature steering, and the use of learned features to audit preference data.

## Method

The model uses a Matryoshka-style reconstruction objective. High-level features reconstruct the input approximately, while the complete high- and low-level code reconstructs the remaining residual. A symmetric contrastive term makes high-level codes for adjacent tokens similar and codes from different sequences dissimilar, preventing a constant-feature collapse. The low-level subset receives no temporal constraint and is expected to capture information left unexplained by the high-level reconstruction.

Experiments train 16,000-feature BatchTopK models with $k=20$ on layer 8 of Pythia-160m and layer 12 of Gemma 2-2B. T-SAEs use a 20:80 high-to-low feature split and temporal-loss weight 1.0. Training and core testing use the Pile; probes use MMLU, Wikipedia, and FineFineWeb. Baselines include Matryoshka SAEs, BatchTopK SAEs, and the original model latents where applicable.

## Experiments

Probes and t-SNE visualizations indicate that T-SAE high-level features encode more semantic and sequence-context information, while their low-level features retain syntactic information. Matryoshka features are reported to emphasize syntax and to show less specialization between their feature subsets. Over spliced passages, highly active T-SAE features change at semantic boundaries and vary more smoothly within passages, enabling sequence-level summaries that are harder to obtain from the tested baselines.

Core SAE metrics remain close to the baselines. On Pythia-160m, T-SAE versus Matryoshka results are 0.94 versus 0.95 for fraction variance explained, 0.93 versus 0.94 for reconstruction cosine similarity, and $0.81 \pm 0.17$ versus $0.83 \pm 0.16$ for automated interpretability. On Gemma 2-2B, both achieve 0.75 fraction variance explained; cosine similarity is 0.88 versus 0.89, and both automated-interpretability means are 0.83. T-SAE high-level features are smoother than their low-level features and the corresponding Matryoshka split under the paper's reported measures. Absorption is comparable: mean absorption fraction is $0.24 \pm 0.16$ for T-SAE and $0.22 \pm 0.16$ for Matryoshka.

In an HH-RLHF case study, T-SAE feature differences between chosen and rejected responses recover safety-related themes and expose a length/formality correlation associated with cases where annotators prefer an irrelevant response over a harmful but responsive one. This is evidence that the features can support dataset auditing, not that they identify every causal source of preference.

For [[concepts/model-steerability|Model Steerability]], 30 selected Gemma features are evaluated by an LLM judge for target-concept success and linguistic coherence, with manual verification. The paper reports that T-SAE features Pareto-dominate the tested SAE baselines: they affect semantics over a wider range of intervention strengths and avoid some token-repetition failures seen with local baseline features.

Ablations show that the prior determines the recovered information. Expanding the high-level subset improves semantic and contextual probes but reduces syntax performance; sampling a previous token from a wider window improves context but harms syntax; replacing the contrastive objective with sample-wise temporal similarity improves reconstruction metrics while reducing semantic and contextual probe performance.

## Limitations

- Computing paired adjacent-token activations increases memory use and forces smaller batches under a fixed budget.
- The method uses only one high/low split, although linguistic structure can persist at token, sentence, paragraph, and document scales. Additional levels would increase compute and memory costs.
- The conventional cosine-softmax contrastive loss was developed for dense representation spaces; its geometry may be poorly matched to sparse, nonnegative SAE codes.
- The main experiments cover two model families and selected layers. The Llama-3.1-8B scaling study uses only 20% of the planned training steps and provides qualitative t-SNE evidence.
- Semantic and contextual probes rely on proxy labels such as MMLU category and question identity. These measurements do not establish that every learned feature has a stable human-level meaning or causal role.
- The steering study uses selected matched features and an LLM judge. Its results do not establish performance for arbitrary features, models, or intervention protocols.

## Related Concepts

- [[concepts/temporal-sparse-autoencoders|Temporal Sparse Autoencoders]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- Feature disentanglement
- Contrastive representation learning
- Mechanistic interpretability

## Related Papers

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] analyzes how encoder design constrains which concepts an SAE can isolate.
- [[papers/universal-sparse-autoencoders-interpretable-cross-model-concept-alignment|Universal Sparse Autoencoders: Interpretable Cross-Model Concept Alignment]] adds a different structural prior by learning a shared sparse feature space across models.
- Bussmann et al. (2025), "Learning Multi-Level Features with Matryoshka Sparse Autoencoders," supplies the hierarchical reconstruction baseline adapted by T-SAEs.
- Menon et al. (2025), "Analyzing (In)Abilities of SAEs via Formal Languages," also uses temporal signal to study SAE feature quality.
- Wu et al. (2025), "AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders," motivates the paper's steering evaluation.

[[index|Library home]]
