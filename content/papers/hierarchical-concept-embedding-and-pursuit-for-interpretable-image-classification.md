---
title: "Hierarchical Concept Embedding & Pursuit for Interpretable Image Classification"
type: paper
authors:
  - Nghia Nguyen
  - Tianjiao Ding
  - Rene Vidal
year: 2026
arxiv: "2602.11448"
tags:
  - interpretable-machine-learning
  - concept-based-models
  - hierarchical-representations
  - sparse-coding
  - image-classification
---

## TL;DR

Hierarchical Concept Embedding & Pursuit (HCEP) represents an image through concepts that form a valid root-to-leaf path in a semantic hierarchy. It builds a dictionary from child–parent embedding differences and applies [[Hierarchical Concept Pursuit]] to recover a coherent path rather than an unconstrained set of concepts. Across synthetic data, ImageNette, CIFAR-100, and ImageNet, the method improves support precision and recall over sparse and hierarchical baselines while retaining competitive classification accuracy, with its largest advantages in few-shot settings.

## Research Question

Can the known hierarchy among semantic concepts be encoded geometrically and enforced during sparse recovery so that an interpretable image classifier produces more faithful concept explanations without sacrificing predictive accuracy?

## Motivation

Sparse concept models explain an image embedding as a combination of human-readable concept embeddings, but ordinary sparse coding treats every concept as an independent dictionary atom. It can therefore select concepts from incompatible branches—such as both animal and vehicle—even when the final class prediction is correct. The paper seeks explanations that respect hypernym–hyponym structure while preserving the scalability of sparse concept recovery and avoiding the concept annotations required by supervised concept bottleneck models.

## Contributions

- Formalizes [[Hierarchical Concept Embedding]] through subtree containment, separation between sibling subtrees, hierarchical orthogonality, and simplex structure among siblings.
- Derives a depth–branch–dimension requirement for the proposed Euclidean construction and gives sufficient conditions for unique parent assignment.
- Constructs a hierarchical dictionary whose atoms are child–parent embedding differences, so a synset is represented by the atoms along its root-to-node path.
- Introduces Hierarchical Beam Orthogonal Matching Pursuit (HB-OMP), which restricts each extension to children of the current node and retains multiple path hypotheses with beam search.
- Evaluates concept recovery and classification on synthetic hierarchies and three real image datasets, including few-shot ImageNet and a taxonomy induced for CIFAR-100.

## Method

HCEP begins with a semantic hierarchy and an embedding for each synset. Its desired geometry places descendants inside progressively narrower cones around their parents while keeping sibling subtree cones disjoint. A child–parent difference should be orthogonal to the parent, and sibling difference directions should form a regular simplex. Under these conditions, the paper shows that representing a hierarchy of depth $L$ and branching ratio $b$ requires embedding dimension at least $L+b-1$.

For every non-root node $j$, the hierarchical dictionary contains the atom $a^{(j)}-a^{(\operatorname{par}(j))}$. These differences describe the refinement from a parent to its child. Telescoping makes a node embedding the sum of atoms on its root-to-node path, turning concept identification into structured support recovery.

HB-OMP searches this dictionary coarse to fine. Each hypothesis stores a sparse code, residual, and deepest selected node. At the next level, only that node's children are candidates. The algorithm extends hypotheses with the most correlated candidate atoms, recomputes coefficients by least squares, and retains the beam with the smallest reconstruction errors. The restricted candidate set improves the exact-recovery coefficient relative to global OMP in cases where problematic off-path atoms are excluded, while the beam reduces the effect of an early wrong branch choice.

For ImageNet and ImageNette, the hierarchy comes from WordNet. For CIFAR-100, it is generated with taxonomy induction. Leaf embeddings are averages of CLIP image embeddings for each class, internal-node embeddings are averages of their children, and a linear classifier consumes the recovered intermediate representation.

## Experiments

The synthetic hierarchy uses branching ratio 3, depth 7, dimension 50, 2,187 leaves, 3,280 dictionary atoms, and five samples per leaf. HB-OMP consistently improves support precision and recall over ordinary OMP as noise and hierarchy depth vary.

Real-data experiments cover ImageNette, CIFAR-100, and ImageNet. Baselines include full-dictionary OMP, concept bottleneck models, direct nearest-neighbor classification, and hierarchical nearest-neighbor traversal. HCEP reports the highest support precision and recall among the interpretable baselines across the three datasets while maintaining comparable classification accuracy. Its advantage grows in few-shot ImageNet, where it also exceeds the interpretable baselines in classification accuracy. A SigLIP replication shows a similar interpretability pattern, and increasing the beam width improves support precision with modest GPU-parallelized runtime overhead.

The empirical geometry checks find that ImageNet branches are generally tightly clustered and separated, while child–parent difference vectors are close to orthogonal to their parent embeddings for ImageNet and CIFAR-100. These observations support, but do not establish universally, the geometric assumptions used by the framework.

## Limitations

The Euclidean construction becomes restrictive for deep or highly branching hierarchies: it needs sufficient ambient dimension, and its subtree cone angles must shrink geometrically with depth. HCEP also depends critically on hierarchy quality; an incorrect or ambiguous taxonomy can force an incorrect explanation path. HB-OMP's beam search adds cost as depth, branching ratio, or beam width grows, even though hypotheses can be parallelized. Finally, the method assumes the input belongs to a leaf class represented in the hierarchy; entirely novel classes require extending the taxonomy before recovery.

## Related Concepts

- [[Hierarchical Concept Embedding]]
- [[Hierarchical Concept Pursuit]]
- Concept bottleneck models
- Sparse coding
- Orthogonal matching pursuit
- Vision-language models

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models."
- Chattopadhyay, Pilgrim, and Vidal (2023), "Information Maximization Perspective of Orthogonal Matching Pursuit with Applications to Explainable AI."
- Bhalla et al. (2024), "Interpreting CLIP with Sparse Linear Concept Embeddings."
- Park et al. (2025), "The Geometry of Categorical and Hierarchical Concepts in Large Language Models."
- Jenatton et al. (2011), "Proximal Methods for Hierarchical Sparse Coding."
