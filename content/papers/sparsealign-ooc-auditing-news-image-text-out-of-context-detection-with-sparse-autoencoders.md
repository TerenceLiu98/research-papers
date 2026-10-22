---
title: "SparseAlign-OOC: Auditing News Image-Text Out-of-Context Detection with Sparse Autoencoders"
type: paper
authors:
  - Guoxin Wang
  - Junjie Liu
  - Shaowu Chen
year: null
tags:
  - sparse-autoencoders
  - multimodal-misinformation
  - mechanistic-interpretability
  - vision-language-models
  - human-evaluation
---

## TL;DR

SparseAlign-OOC audits CLIP-embedding detectors for [[concepts/out-of-context-multimodal-misinformation-detection|out-of-context multimodal misinformation]] with separate TopK [[concepts/sparse-autoencoders|Sparse Autoencoders]] for image-text pair representations and detector hidden states. In a blinded 250-item audit, selected pair-space SAE coordinates yield 18/50 coherent alignment groups, compared with 9/50 for prototype clustering, 7/50 for PCA, 4/50 for a dense autoencoder, and 0/50 for random groups. A deep-MLP replication preserves the ordering, while activation coverage and representation-space interventions connect the audited factors to detector behavior.

## Research Question

Can sparse decomposition expose recurring, human-auditable relations between news images and captions and show that those relations are functionally connected to an out-of-context detector's decisions?

## Motivation

Out-of-context misinformation can pair an authentic image with plausible but misleading text. CLIP-based detectors may exploit entity agreement, event-scene compatibility, topical association, publisher artifacts, or other shortcuts, yet their dense representations do not reveal which factors drive a prediction. The paper therefore distinguishes a recurring cross-modal alignment relation from mere topical coherence and tests both semantic auditability and decision relevance.

## Contributions

- Introduces a two-level audit: a pair-space SAE produces inspectable image-caption groups, while a hidden-state SAE traces decision-associated sparse features.
- Defines a blinded five-way human audit separating coherent alignment, topical clusters, source/style artifacts, incoherence, and uncertainty.
- Compares SAE groups with PCA coordinates, dense-autoencoder coordinates, k-means prototypes, and random groups under a common annotation format.
- Connects feature semantics to behavior through activation-coverage analysis, pair-to-hidden prediction, hidden-state ablation, and direct pair-space intervention.
- Adds a stronger-detector replication, cross-seed analysis, TopK sensitivity checks, and source, entity, label, and unimodal-shortcut diagnostics.

## Method

The detector receives normalized 512-dimensional CLIP image and text embeddings and concatenates the two embeddings, their elementwise absolute difference, and their elementwise product into a 2,048-dimensional pair representation. A compact MLP maps this representation to a 512-dimensional hidden state and then to a binary pristine/OOC prediction.

The pair-space branch z-scores the pair representation and trains an 8,192-coordinate TopK SAE with 64 active features per example. Candidate audit features are ranked by the absolute difference between their mean OOC and pristine activations; the four highest-activation examples for each selected coordinate form a blinded audit item. PCA-512, a 512-dimensional dense autoencoder, 100 MiniBatchKMeans prototypes, and random groups provide baselines.

The hidden-state branch trains another 8,192-coordinate TopK SAE with 32 active features on the detector's hidden states. Reconstruction tests first measure whether the sparse representation preserves decisions. Feature ablations then measure target-logit drops and prediction flips. Ridge prediction from pair-space codes to intervention-important hidden features and direct removal of audited pair-space coordinates connect human-readable groups to the classifier.

Three annotators independently label each group as coherent image-text alignment, topical, source/style artifact, incoherent/unclear, or unsure. Alignment requires a repeated relation between visible evidence and caption content, not just a common entity, event, or news domain.

## Experiments

Experiments use the merged-balanced NewsCLIPpings split with 71,072 training, 7,024 validation, and 7,264 test examples after embedding availability checks. The compact detector reaches 0.689 macro-F1 and 0.760 AUROC; a deeper MLP reaches 0.718 macro-F1 and 0.796 AUROC.

The pair-space SAE reconstructs with 0.684 explained variance, while a probe on its codes reaches 0.607 macro-F1 and 0.655 AUROC. PCA-512 and the dense autoencoder retain more predictive signal, with AUROC values of 0.744 and 0.741, respectively, establishing that predictive retention and coordinate-level auditability differ.

In the primary audit, coherent-alignment counts are 18/50 for SAE, 9/50 for prototypes, 7/50 for PCA, 4/50 for dense AE, and 0/50 for random groups. SAE's alignment rate is 36%, versus 18% for the strongest baseline; the 18-point difference has a bootstrap 95% CI of [2, 34]. The replication produces 11/30 SAE alignment groups versus 6/30 prototypes. Pooled counts are 29/80 and 15/80, a 17.5-point gap with 95% CI [5.0, 30.0] and Holm-adjusted one-sided Fisher $p=0.018$.

Coverage tracks activation: the annotated concept is present in 39/50 top-active buckets, 27/50 random-active buckets, 16/50 near-threshold buckets, and 5/50 inactive or low-active buckets. Cross-seed decoder matches show moderate rather than perfect concept stability, with mean cosine similarity near 0.56 and activation Pearson correlations of 0.50-0.53.

The hidden SAE reconstruction flips 0.5% of predictions. Removing the four largest active hidden features lowers the target logit by 0.618 and flips 69.5% of predictions, compared with 0.061 and 15.1% for random active features. Direct removal of four audited pair-space coordinates gives a 0.214 logit drop and 18.6% flip rate, versus 0.052 and 5.8% for random active coordinates. Human-labeled alignment features produce a 21.9% flip rate, compared with 12.4% for topical, 4.6% for incoherent/unclear, and 5.2% for random SAE features.

Shortcut tests show weak unimodal predictability within SAE alignment groups (image-only AUROC 0.54; text-only 0.57), despite strong dataset-level metadata shortcuts. A publisher-mismatch heuristic reaches 0.759 macro-F1 and 0.771 AUROC, while a source-metadata probe reaches 0.759 macro-F1 and 0.808 AUROC. The visual-ID mismatch field perfectly separates constructed labels and is treated as leakage rather than a valid input.

## Limitations

- Evidence is limited to NewsCLIPpings, distributed CLIP embeddings, and compact or deep MLP detectors; the paper does not establish generalization to end-to-end vision-language transformers, retrieval systems, or newer multimodal foundation models.
- Human alignment rates describe coordinates selected by large OOC-pristine activation differences, not the entire SAE dictionary.
- Interventions operate in learned representation spaces and establish functional dependence there; they are not input-level counterfactual edits of images or captions.
- Moderate cross-seed feature matching shows that individual learned concepts are not fully stable.
- NewsCLIPpings has substantial publisher and metadata structure. The reported diagnostics reduce, but do not eliminate, concern about dataset-specific regularities.
- The supplied manuscript states no publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/out-of-context-multimodal-misinformation-detection|Out-of-Context Multimodal Misinformation Detection]]
- [[Model Steerability]]
- [[Concept Bottleneck Models]]

## Related Papers

- Luo et al. (2021), "NewsCLIPpings: Automatic Generation of Out-of-Context Multimodal Media": supplies the benchmark and CLIP embedding setting.
- Papadopoulos et al. (2024), "VERITE: A Robust Benchmark for Multimodal Misinformation Detection Accounting for Unimodal Bias": motivates explicit shortcut and unimodal-bias checks.
- Radford et al. (2021), "Learning Transferable Visual Models From Natural Language Supervision": provides the shared image-text representation family used by NewsCLIPpings.
- Huben et al. (2024), "Sparse Autoencoders Find Highly Interpretable Features in Language Models": motivates sparse feature decomposition for mechanistic interpretation.

[[index|Library home]]
