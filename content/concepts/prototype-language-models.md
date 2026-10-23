---
title: Prototype Language Models
type: concept
aliases:
  - Prototypical Language Models
  - PRISM
tags:
  - interpretable-language-models
  - prototype-learning
  - case-based-reasoning
---

## Overview

Prototype language models form token predictions through a small set of learned vectors that are anchored to recurring neighborhoods of training examples. Their purpose is to make the evidence behind a prediction inspectable and directly editable: active prototypes expose additive token-logit contributions, while nearby training contexts give those components a case-based interpretation.

## Key Ideas

- A prototype bank supplies an explicit intermediate basis between the transformer's hidden state and its vocabulary logits. Sparse routing limits each prediction to a small active set.
- Non-negative activations make prototype contributions additive and easier to inspect, while a residual path can preserve information not captured by the prototype reconstruction.
- Clustering objectives distinguish prototypes from arbitrary dictionary directions by encouraging them to lie near real token representations and cover recurring training neighborhoods.
- Prototype vocabulary signatures describe global tendencies; their activation-weighted signatures describe context-specific effects on a particular next-token prediction.
- Because prototypes participate causally in prediction, rescaling them can support [[concepts/model-steerability|Model Steerability]]. Their training neighborhoods also provide coordinates for [[concepts/training-data-attribution|Training Data Attribution]].
- Unlike [[concepts/sparse-autoencoders|Sparse Autoencoders]] fitted after training, prototype language models can jointly shape the backbone and sparse interface. A residual, however, means the prototype path may not explain all computation.

## Important Papers

- [[papers/prototype-language-models|Prototype Language Models]]: introduces PRISM, scales sparse prototype prediction to 1.6B parameters, and evaluates prototype-space attribution, controllers, and behavior suppression.
- Li et al. (2018), "Deep learning for case-based reasoning through prototypes": develops neural prototype explanations in a this-looks-like-that form.
- Chen et al. (2019), "This looks like that": introduces ProtoPNet for interpretable image recognition.
- Xie, Vosoughi, and Hassanpour (2023), "Proto-LM": applies prototype networks to interpretable language-model-based classification.
- Yordanov et al. (2026), "Prototype Transformer": studies language-model architectures designed around prototypes.

## Related Concepts

- [[concepts/training-data-attribution|Training Data Attribution]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Case-based reasoning
- Interpretable-by-design machine learning
- Sparse representations
