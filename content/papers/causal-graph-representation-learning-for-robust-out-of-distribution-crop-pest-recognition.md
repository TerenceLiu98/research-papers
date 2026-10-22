---
title: "Causal Graph Representation Learning for Robust Out-of-Distribution Crop Pest Recognition"
type: paper
authors:
  - Guangke Li
  - Yue Teng
  - Chenghui Lin
  - Zhaoting Liu
  - Ji Jin
  - Yi Liu
  - Chuanwen Lin
year: 2026
doi: "10.1016/j.patcog.2026.115078"
journal: "Pattern Recognition"
tags:
  - out-of-distribution-generalization
  - causal-representation-learning
  - graph-neural-networks
  - pest-recognition
  - spurious-correlations
---

## TL;DR

This paper proposes Causal Graph Disentanglement (CGD), a crop-pest recognition framework that converts multiscale image patches into spatial graphs, learns complementary task-relevant and bias-related subgraphs, and recombines causal features with shuffled bias features during training. On Pest-OOD, CGD improves over frozen, fine-tuned, and transformer-pooling baselines across three backbones; its broader evidence is more qualified, with strong worst-group gains over matched baselines on Waterbirds but lower performance than some domain-generalization methods.

## Research Question

Can explicit graph structure and representation-level interventions reduce reliance on background shortcuts and improve pest recognition under unseen environmental distributions?

## Motivation

Pest images collected in controlled and field environments can differ substantially in background, lighting, and scene composition. Standard visual classifiers may use these environment-dependent cues instead of pest morphology. The authors argue that convolutional models have limited long-range receptive fields and vision transformers model patch structure only implicitly, motivating an explicit graph over image regions and a mechanism for separating stable task information from contextual bias.

## Contributions

- Introduces CGD, a visual-to-graph framework for out-of-distribution pest recognition.
- Constructs multiscale graphs whose nodes are frozen visual-encoder patch features and whose edges encode eight-neighbor spatial adjacency.
- Learns complementary node and edge masks that partition each graph into task-relevant and bias-related subgraphs, encoded by separate GNN branches.
- Uses branch-specific supervision and mini-batch permutation of bias embeddings to approximate representation-level backdoor adjustment.
- Evaluates the approach on Pest-OOD, Waterbirds, and CUB-200-2011, including component, scale, intervention-weight, batch-size, mask, attention, and computational-cost analyses.

## Method

The Graph Construction Module resizes each image at one or more scales, extracts overlapping patches, encodes them with a frozen ImageNet-pretrained ResNet or ViT, and connects spatially adjacent patches. The Graph Disentanglement Module applies learned sigmoid masks to both node features and edges. Complementary masks produce a putative causal subgraph and bias subgraph, which pass through separate three-layer GCN encoders.

The Feature Recombination Module trains auxiliary causal and bias classifiers while isolating cross-branch gradients. The bias branch uses mean absolute error to emphasize easy-to-learn bias signals; the causal branch uses adaptively weighted cross-entropy. During intervention training, bias embeddings and their labels are permuted across the mini-batch and concatenated with the original causal embeddings. The paper treats this sampling procedure as a Monte Carlo approximation to marginalizing the bias representation in a backdoor-adjustment expression. Scale-specific representations are concatenated for final classification.

The interpretation depends on assumptions that the task-relevant mechanism is invariant across environments, environmental associations are unstable, and no confounders lie outside the two modeled latent roles. The paper explicitly notes that these learned representations are not uniquely identified as true causal and confounding variables.

## Experiments

The primary benchmark is Pest-OOD, with 5,462 train/validation images from one scene and 2,688 test images from diverse scenes across 13 pest classes. Waterbirds tests robustness to bird-background correlation, while CUB-200-2011 tests fine-grained i.i.d. recognition. Results are reported over three random seeds where stated.

On Pest-OOD, CGD reaches accuracy of 88.50% with ResNet-18, 90.54% with ResNet-50, and 93.08% with ViT-B/16. These improve on the corresponding frozen baselines by 2.91, 2.80, and 2.05 percentage points, respectively. With identical ViT-derived graph inputs, CGD's 93.08% accuracy exceeds adapted DISC and CIGA baselines at 91.21% and 89.29%.

On Waterbirds, CGD has the highest worst-group accuracy among matched frozen, fine-tuned, and transformer-pooling settings for every backbone: 63.60% with ResNet-18, 68.48% with ResNet-50, and 68.12% with ViT-B/16. It does not have the best average accuracy in those comparisons and trails Advst and LEAwareSGD in the separate state-of-the-art comparison. On CUB-200-2011, its 74.61% ResNet-18 and 77.05% ResNet-50 accuracy are competitive with GuidedMixup rather than uniformly best.

The full three-module configuration obtains 90.89% Pest-OOD accuracy in the reported ResNet-50 ablation, above every partial configuration. Learned masks retain 81.11% and 55.83% of nodes at the two scales and 74.79% and 30.23% of edges, showing that they do not collapse to all-one masks. Reported compute benefits assume that multiscale node features are precomputed and cached offline.

## Limitations

The causal interpretation is assumption-dependent: the masks receive no ground-truth causal supervision, and the latent decomposition is not identifiable. Stable but spurious backgrounds can therefore be assigned to the task-relevant branch. Online graph construction adds neighborhood-search, indexing, transfer, and latency overhead, while the favorable cost table excludes feature extraction by using cached node features. The strongest results are on the task-specific Pest-OOD benchmark; Waterbirds comparisons are mixed, and CUB primarily establishes that fine-grained accuracy is retained. The paper reports that data will be available on request rather than providing an immediately accessible dataset artifact.

## Related Concepts

- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/disentangled-representations|Disentangled Representations]]
- Out-of-distribution generalization
- Graph neural networks
- Backdoor adjustment
- Shortcut learning

## Related Papers

- [[Toward Causal Representation Learning]]
- Fan et al. (2022), "Debiasing Graph Neural Networks via Learning Disentangled Causal Substructure."
- Chen et al. (2022), "Learning Causally Invariant Representations for Out-of-Distribution Generalization on Graphs."
- Wu et al. (2024), "Graph Out-of-Distribution Generalization via Causal Intervention."
- Liu et al. (2026), "Causal-Inspired Learning-Based Method for Unbiased Pest Recognition."

[[index|Library home]]
