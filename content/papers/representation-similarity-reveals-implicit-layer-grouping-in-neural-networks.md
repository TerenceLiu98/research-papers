---
title: Representation Similarity Reveals Implicit Layer Grouping in Neural Networks
type: paper
authors:
  - Tian Gao
  - Amit Dhurandhar
  - Karthikeyan Natesan Ramamurthy
  - Dennis Wei
year: null
source_job_id: "8376819f-c684-4e3f-a0b6-2868f555fa83"
tags:
  - representation-similarity
  - neural-network-interpretability
  - optimal-transport
---

[[index|Library home]]

## TL;DR

Comparing intermediate activation geometries with [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] reveals groups of similar layers in modular-arithmetic transformers, sentiment-classification BERT models, and a CIFAR-10 ResNet9. The observed boundaries motivate selective fine-tuning and model compression, but geometric similarity alone does not establish causal equivalence of computations.

## Research Question

Can representation similarity identify meaningful groups of neural-network layers without knowing the intermediate functions those layers should compute?

## Motivation

Layer outputs can differ in dimensionality and coordinate systems, making direct coordinatewise comparison inappropriate. Predictive probes also require a specified target. Comparing internal distance structures offers a way to study layer organization without either shared feature coordinates or intermediate labels.

## Contributions

- Applies GW comparison to intermediate representations within and across neural-network blocks.
- Validates the resulting groups against known intermediate targets in modular arithmetic and studies their emergence during fine-tuning.
- Examines practical implications through partial fine-tuning and smaller BERT models, with comparisons against ten similarity measures.

## Method

Evaluate candidate layers on a shared input set and form a within-layer pairwise sample-distance matrix for each representation. Optimize a coupling between the sample distributions to minimize squared disagreement between their internal distances, following Equation 1. This compares spaces of different feature dimensions without requiring cross-space coordinate distances. The formal coupling is over samples, despite an earlier informal description referring to representation dimensions.

The implementation uses POT and a conditional-gradient solver. Pairwise layer discrepancies produce a matrix for visualization or clustering. Spectral clustering of a similarity matrix derived from GW distances separates Yelp BERT blocks 1–8 from blocks 9–12. Smaller transformers are also examined at attention, MLP, and residual-stream locations within each block.

Isometries preserve the underlying geometry, and sample correspondence is optimized rather than fixed to identity. The displayed squared-loss objective should be distinguished from the rooted, normalized GW metric when interpreting metric properties; arbitrary scaling invariance does not follow from isometry invariance.

## Experiments

**Modular arithmetic (§5.1).** A one-block model learns addition modulo 59. Three-block models learn a nested modular-sum task with moduli 59, 31, and 17, either end to end or with intermediate layerwise supervision. All achieve 100% held-out accuracy. For the layerwise-trained model, GW matches the first two intermediate targets most closely to the corresponding residual outputs, with discrepancies 0.02 and 0.03. Layerwise and end-to-end training yield different similarity structures; intra-block transitions also appear near attention computations.

**Sentiment analysis (§5.2; Appendices E–M).** BERT-base is fine-tuned on Yelp and SST2, including dense and NeuroPrune-sparsified variants at 25%, 70%, and 95% sparsity. Dense accuracies are 97.87% and 92.40%, respectively. Yelp shows a boundary near block 9 and a distinct late group; SST2 shows transitions around blocks 10–11 and a separate final block. Comparisons include Euclidean, cosine, mutual information, Wasserstein, RSM, RSA, CCA, CKA, MSID, and augmented GW. The authors judge GW group boundaries clearest, although CKA and RSA also reveal groups in some settings.

| Yelp fine-tuned blocks, plus classifier | Accuracy (%) |
| --- | ---: |
| All | 97.87 |
| 8–12 | 97.47 |
| 9–12 | 97.43 |
| 10–12 | 97.19 |
| 11–12 | 96.70 |
| 12 only | 93.11 |

These are Table 6 values. Fine-tuning blocks 9–12 loses 0.44 percentage points relative to full fine-tuning. Appendix G's prose includes differences inconsistent with this table.

**Compression (Appendix L).** Models retain the first specified number of pretrained transformer blocks and discard later ones. Table 7 reports Yelp accuracy of 97.86% with four blocks versus 97.87% with twelve; SST accuracy is 91.86% with two blocks versus 92.40% with twelve. These results support reduced-depth task models, rather than demonstrating that arbitrary similar layers can be deleted without adaptation.

**Training dynamics (§5.3).** The final BERT block begins separating by iteration 300; additional late-block differences appear at 3,000 and 15,000 iterations. Average GW discrepancy increases alongside improving task performance. Appendix M reports broadly consistent group structure across three random seeds.

**Vision (§5.4; Appendix N).** A trained ResNet9 reaches 91.63% CIFAR-10 test accuracy. GW comparisons reveal four groups more clearly than in the randomly initialized model. Visual inspection of a ship image's activations supports the authors' interpretation of transitions, but does not independently establish each group's function.

## Limitations

- Requires access to intermediate activations and is more expensive than cosine or Euclidean comparisons; approximate optimization can introduce variability.
- Invariances can conceal meaningful differences, and matching sample geometry does not prove identical computations or causal roles.
- Evidence is restricted to the tested architectures and tasks. Much of the metric comparison relies on visual clarity rather than a common quantitative grouping benchmark.
- Seed comparisons are provided, but headline accuracy tables do not supply uncertainty estimates.
- The parsed source contains inconsistent prose/table differences and some malformed equations. Numerical summaries above use the explicit tables. Publication year and stable paper identifiers are not established in the supplied text and are left unset.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares internal sample geometry across layers.
- [[concepts/optimal-transport|Optimal Transport]]: provides the coupling framework for structural comparison.

## Related Papers

- Nguyen, Raghu, and Kornblith (2022), “On the Origins of the Block Structure Phenomenon in Neural Network Representations”: prior work on representation block structure, cited by this paper.
- Kornblith et al. (2019), “Similarity of Neural Network Representations Revisited”: the centered-kernel-alignment baseline.
- Nanda et al. (2023), “Progress Measures for Grokking via Mechanistic Interpretability”: informs the modular-arithmetic experimental setup.
