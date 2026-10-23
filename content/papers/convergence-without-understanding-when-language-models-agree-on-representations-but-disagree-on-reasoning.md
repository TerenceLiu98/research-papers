---
title: "Convergence Without Understanding: When Language Models Agree on Representations but Disagree on Reasoning"
type: paper
authors:
  - Muhammad Usama
  - Dong Eui Chang
year: null
source_job_id: "01b29153-2eeb-4573-a06e-5a8c9d0e9aa2"
tags:
  - representational-similarity
  - language-model-reasoning
  - mechanistic-interpretability
  - causal-ablation
---

## TL;DR

Across 16 language models and 800 reasoning problems, high representational similarity does not reliably indicate shared reasoning. Models are more similar on hard problems than easy ones in three of four domains, similarity falls sharply from pre-decision to post-decision layers, and cross-model correctness signals are decodable but have little causal effect under the tested subspace ablations. The results support a [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]: shared geometry can reflect common input processing or architecture without implying shared computation.

## Research Question

Does representational convergence across language models extend to the reasoning processes that transform representations into predictions, or can models agree geometrically while differing functionally?

## Motivation

The Platonic Representation Hypothesis treats increasing similarity across model representations as evidence that independently trained systems approach shared structure in the data. Aggregate similarity measures such as centered kernel alignment (CKA), however, do not condition on problem difficulty, computational stage, or whether aligned information affects predictions. Establishing what convergence means therefore requires separating shared encoding from shared reasoning and correlational accessibility from causal use.

## Contributions

- Compares hidden-state representations across 16 instruction-tuned language models from 8 families, spanning 1.5B to 72B parameters, on 800 problems from GSM8K, ARC-Challenge, TruthfulQA, and HellaSwag.
- Stratifies similarity by collective problem difficulty and reports a difficulty inversion: mean CKA is 0.897 on hard problems and 0.830 on easy problems in the 14-model core cohort.
- Separates computational stages and reports a generation gap, with pre-decision CKA of 0.875 and post-decision CKA of 0.274.
- Combines cross-model linear probes with representational-subspace and attention-head ablations to distinguish decodable correctness information from causal influence on outputs.
- Evaluates alternative similarity metrics, larger models, base models, random initialization, prompt variants, sample sizes, and domain-specific behavior.

## Method

The core analysis evaluates 14 instruction-tuned models from eight architectural families, with two 70B-scale models added for scale validation. Each model answers 200 problems from each of four reasoning benchmarks. Hidden states are extracted at the final input-token position at every layer, and each response is scored for correctness. Difficulty is defined collectively: hard problems are solved by 0--4 of the 14 core models, medium problems by 5--9, and easy problems by 10--14.

Linear CKA is the primary representation-similarity measure, averaged over all 91 core-model pairs with bootstrap confidence intervals. Mutual nearest-neighbor overlap and SVCCA provide complementary checks. Layer depth is normalized across architectures. The authors define pre-decision and post-decision stages using the first layer at which a correctness probe exceeds chance, then compare similarity across these stages.

For cross-model transfer, an $L_2$-regularized logistic probe is trained on one model's intermediate states to predict its correctness and evaluated on a second model. To test causal use, the study removes the probe-associated correctness subspace by orthogonal projection and measures prediction flips. A separate intervention zeros individual attention-head outputs at three depths. Attention entropy is measured across six models to examine its association with problem difficulty and CKA.

## Experiments

The principal difficulty analysis finds CKA of 0.897 for hard problems and 0.830 for easy problems, a gap of +0.067 ($p<0.001$); MNN yields a corresponding gap of +0.061. The inversion appears in ARC-Challenge (+0.110), TruthfulQA (+0.084), and weakly in HellaSwag (+0.007), but reverses on GSM8K: hard problems have CKA 0.76 and easy problems 0.89. The paper interprets this mathematics exception through constrained solution strategies, while explicitly treating that account as requiring independent validation. The inversion emerges in middle layers, peaks late, persists when 70B and 72B models are included (+0.062), and is stronger in a four-model base-model control (+0.117).

Pre-decision representations have mean CKA 0.875, compared with 0.274 after the decision boundary; 89 of 91 model pairs have a gap above 0.40. This generation gap suggests that cross-model agreement is concentrated in input processing rather than output computation.

Cross-model correctness probes reach 66% accuracy, compared with a 55% permutation baseline and a 62.9% majority-class baseline. Removing the inferred correctness subspace changes 1.5% of predictions in the original protocol and 5.5% on the expanded high-agreement set. Individual-head ablations produce larger maximum flip rates, 43.3%--63.3% for the tested multi-head-attention models and 20% for grouped-query-attention models, but the paper cautions that zeroing a whole head measures general head importance rather than correctness-specific causality.

Across six models, attention entropy correlates negatively with the number of models solving a problem ($r=-0.41$ to $-0.48$), consistent with harder problems producing more diffuse attention. This evidence is correlational. Randomly initialized models also have higher CKA than trained models (0.864 versus 0.612), while embedding-layer CKA is near zero and mid-layer CKA reaches 0.944. Together, these baselines indicate that raw similarity reflects both architectural constraints and learned transformations.

## Limitations

- The model range ends at 72B parameters, so behavior at substantially larger scales is unknown.
- The main causal intervention assumes a linear correctness subspace; nonlinear or distributed causal structure may be missed.
- The original causal-ablation protocol has only five universally solved problems, limiting its power. The expanded protocol raises the flip rate but changes the selection criterion.
- Attention entropy is associated with difficulty but is not causally manipulated, so it does not establish the proposed homogenization mechanism.
- The difficulty inversion is domain-dependent and reverses for GSM8K; the proposed explanation based on algorithmic constraint is post hoc.
- CKA remains sensitive to transformations and sample-feature ratios despite mean centering, alternative metrics, and sample-size checks.
- Per-head flip rates are not correctness-specific because zeroing an entire head broadly disrupts the residual stream.

## Related Concepts

- [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]: the paper's central distinction between aligned geometry and shared computation.
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]: shared representational structure can support comparison or translation without proving identical causal use.
- [[concepts/cross-model-representational-disagreement|Cross-Model Representational Disagreement]]: complements aggregate CKA with sample-level variation across models.
- [[concepts/linear-probing|Linear Probing]]: provides evidence that correctness is decodable, which the ablations distinguish from causal deployment.

## Related Papers

- Huh et al. (2024), "The Platonic Representation Hypothesis": supplies the convergence hypothesis whose functional interpretation is tested here.
- Kornblith et al. (2019), "Similarity of Neural Network Representations Revisited": introduces CKA, the study's primary similarity measure.
- Braun, Grant, and Saxe (2025), "Not All Solutions Are Created Equal: An Analytical Dissociation of Functional and Representational Similarity in Deep Linear Neural Networks": provides the analytical decoupling that this paper tests empirically in language models.
- [[papers/discovering-cross-language-reasoning-invariance-in-llms-with-geometry-invariant-sparse-autoencoders|Discovering Cross-Language Reasoning Invariance in LLMs with Geometry-Invariant Sparse Autoencoders]]: similarly finds that increased geometric alignment need not imply functional interchangeability, in a cross-language sparse-feature setting.
- [[papers/logit-distance-bounds-representational-similarity|Logit Distance Bounds Representational Similarity]]: studies the converse relationship between output closeness and recoverable representation geometry.

Source scope: supplied parsed manuscript. It provides a code repository but no explicit publication year or stable paper identifier.

[[index|Library home]]
