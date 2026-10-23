---
title: Matryoshka Concept Bottleneck Models
type: paper
authors:
  - Ziye Chen
  - Hongbin Lin
  - Jie Li
  - Lijie Hu
year: null
tags:
  - concept-bottleneck-models
  - interpretable-machine-learning
  - concept-interventions
  - hierarchical-representations
  - human-in-the-loop-learning
---

## TL;DR

Matryoshka Concept Bottleneck Models (MCBM) order supervised concepts by maximum relevance and minimum redundancy, then jointly train prediction heads on nested prefixes of that order. One model can therefore operate at several concept budgets and prioritize expert corrections without retraining. On CUB, LAD, and CelebA, the reported results show competitive full-budget prediction, strong gains over random ordering at small budgets, and dataset-dependent saturation; the theoretical intervention-cost result is conditional on how quickly the probability of needing deeper concepts decays.

## Research Question

Can one [[concepts/concept-bottleneck-models|Concept Bottleneck Model]] support accurate prediction and efficient human intervention across multiple concept budgets, without training and maintaining a separate model for every bottleneck size?

## Motivation

Standard concept bottlenecks usually expose a flat, fixed concept set. Verifying the full set can be expensive, while simply reducing its size sacrifices predictive information and training separate models for several budgets adds operational overhead. Fine-grained tasks also contain correlated concepts, so ranking concepts by relevance alone can spend a small intervention budget on redundant attributes.

## Contributions

- Introduces MCBM, which combines a global minimum-redundancy, maximum-relevance (mRMR) concept order with nested task heads trained in one run.
- Provides a standard variant with a separate classifier per prefix and an Efficient MCBM variant that masks one shared classifier, reducing head memory and permitting arbitrary prefix lengths.
- Characterizes expected intervention cost under geometric concept growth and geometric decay in the probability of requiring deeper intervention.
- Evaluates predictive performance, concept correction, ranking strategy, backbone choice, leakage, ordering stability, training strategy, and matched-head intervention on CUB-200-2011, LAD, and CelebA.

## Method

Before network training, MCBM greedily orders the concept vocabulary with mRMR. Each next concept is selected for high mutual information with the target and low average mutual information with concepts already selected. The image encoder predicts all supervised concept logits, which are permuted into this fixed order.

The standard architecture attaches linear classifiers to selected prefixes such as the first 8, 16, or 32 concepts. Training combines concept supervision with task losses from every prefix head, so early coordinates receive supervision from more heads and must remain useful on their own. Efficient MCBM replaces the separate heads with one shared weight matrix and prefix masks. This removes per-level head parameters and supports stopping at any integer prefix, with some loss of specialization.

For intervention, an expert corrects concepts in ranked prefix order and stops when the prediction is satisfactory. The analysis assumes geometrically increasing prefix sizes and geometric decay in the probability of requiring deeper correction. It yields constant, logarithmic, or polynomial expected cost depending on the relationship between these rates; logarithmic cost occurs in the balanced regime, rather than unconditionally. A separate Hellman-Raviv-based bound relates post-intervention error to label information retained by the corrected prefix plus a soft-to-hard distribution-shift penalty.

## Experiments

The paper evaluates CUB with 112 concepts, LAD with 256 concepts, and CelebA with 40 attributes, reporting accuracy, macro F1, and accuracy after correcting the top $k$ concepts. Comparisons include independently trained and sequential CBMs, sparse and label-free CBMs, random concept ordering, and the shared-head Efficient MCBM.

On CUB, standard MCBM reports 73.20% accuracy at 112 concepts, compared with 70.38% for Independent CBM and 74.06% for Label-free CBM; Efficient MCBM reports 72.94%. Prefix performance saturates differently by task: CUB is near its full result by 32 concepts, CelebA changes little beyond 8, while LAD continues improving through 256. Efficient MCBM remains close to the standard model at full width, including 97.14% versus 97.89% accuracy on LAD.

mRMR matters most at small budgets. On CUB at $K=8$, the mRMR model obtains about 34% macro F1 while random ordering is about 3%; the gap closes at full width, where ordering no longer changes the available vocabulary. Under simulated correction, CelebA approaches perfect accuracy after three ranked interventions, while LAD begins substantial recovery around 125 interventions.

Additional diagnostics report top-prefix concept accuracy from 92.44% at $K=8$ to 96.27% at $K=112$. A sequential version that blocks task gradients into the concept extractor reaches 72.09% task accuracy at $K=16$ and 73.75% at $K=112$. Across five CUB runs, the selected top sets through $K=32$ have intersection-over-union 1.00, and a learned weight ordering correlates with mRMR at Spearman 0.934. Matched prefix heads also outperform applying partial hard corrections to the full head: 88.71% versus 83.03% accuracy at 16 corrected concepts and 98.46% versus 91.92% at 32.

## Limitations

- The method depends on a complete, reliable, and human-meaningful concept vocabulary; missing or biased concepts limit both prediction and intervention.
- The intervention-cost regimes depend on geometric information concentration. The fitted CUB decay has $R^2=0.4808$, and tasks with diffuse information can fall into a polynomial-cost regime.
- Experiments cover visual attribute benchmarks, not clinical, scientific, or other deployed high-stakes workflows.
- Joint training can leak task information through concept logits. The sequential experiment reduces this concern but does not establish interpretability for every concept or setting.
- Efficient MCBM trades head specialization for memory. Randomly sampling one training level is reported as 2.35 times faster than supervising all levels, but substantially degrades the smallest prefixes.
- Physical truncation reduces model and verification cost but does not replace calibration, fairness analysis, domain auditing, or expert oversight.

## Related Concepts

- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/matryoshka-sparse-autoencoders|Matryoshka Sparse Autoencoders]]
- [[concepts/causal-concept-bottlenecks|Causal Concept Bottlenecks]]
- Hierarchical representation learning
- Concept intervention
- Minimum-redundancy, maximum-relevance feature selection

## Related Papers

- [[papers/learning-multi-level-features-with-matryoshka-sparse-autoencoders|Learning Multi-Level Features with Matryoshka Sparse Autoencoders]]
- [[papers/zero-shot-concept-bottleneck-models|Zero-shot Concept Bottleneck Models]]
- [[papers/concept-embedding-models-beyond-the-accuracy-explainability-trade-off|Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off]]
- [[papers/causally-reliable-concept-bottleneck-models|Causally Reliable Concept Bottleneck Models]]

[[index|Library home]]
