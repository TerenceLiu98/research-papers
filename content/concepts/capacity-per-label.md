---
title: Capacity Per Label
type: concept
aliases:
  - CpL
  - Capacity per Label (CpL)
tags:
  - neural-network-capacity
  - natural-language-processing
  - model-pruning
  - classification
  - generalization
---

## Overview

Capacity per label (CpL) measures how much a model can dilute its trainable architecture while preserving the accuracy of an undiluted reference model for a fixed number of output labels. It is intended for multi-output tasks, such as language-model token prediction and classification, where perfect memorization is not the relevant operating point and the loss remains positive.

## Key Ideas

- CpL treats the output-label count as a central part of task difficulty. In token prediction, the labels can correspond to vocabulary items; in fine-tuning, they can correspond to relation or class labels.
- The operational procedure fixes the dataset size, label set, noise or data-generation process, training protocol, and reference accuracy, then searches for the largest weight dilution that preserves the reference accuracy.
- CpL differs from capacity per weight (CpW), which counts perfectly classifiable patterns per trainable weight. CpW can remain nearly unchanged as hidden layers are added, while finite-error multi-output accuracy can fall as the number of outputs grows.
- A noisy-archetype model motivates CpL by assigning each archetype a unique label and generating labeled examples through Bernoulli input noise. More labels increase confusion among noisy neighborhoods, while additional examples do not necessarily change the dilution needed to preserve accuracy.
- CpL is a comparative diagnostic, not an architecture-independent constant. Results depend on the reference model, pruning pattern, label distribution, noise level, optimizer, and which layers are diluted.
- Layer-specific tolerance can reveal functional differences that a single global parameter count hides. In BERT experiments, QKV attention layers, the first transformer block, and the classifier head tolerate less pruning than several other layers.

## Important Papers

- [[NLP Models Capacity per Weight Capacity per Label]]
- Baldi and Vershynin (2019), "The capacity of feedforward neural networks."
- Gardner and Derrida (1988), "Optimal storage properties of neural network models."
- Agliari et al. (2024), "Hebbian dreaming for small datasets."
- Han et al. (2018), "FewRel: A large-scale supervised few-shot relation classification dataset with state-of-the-art evaluation."

## Related Concepts

- Capacity per weight
- Model pruning
- Multi-output classification
- Masked language modeling
- Generalization from noisy examples
- [[Gradient Leading-Term Analysis]]
