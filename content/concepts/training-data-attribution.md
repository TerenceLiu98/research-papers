---
title: Training Data Attribution
type: concept
aliases:
  - TDA
  - Training Data Influence
  - Data Attribution
tags:
  - data-attribution
  - interpretability
  - influence-functions
---

## Overview

Training data attribution studies how training examples, groups, or sources affect a model's predictions and behavior. It supports data valuation, debugging, bias analysis, provenance, and model auditing, but different methods answer different questions: similarity to a prediction, local influence on a fixed model, and the counterfactual effect of removing data and retraining are not interchangeable estimands.

## Key Ideas

- Influence-function methods approximate how upweighting a training example changes a test loss, commonly through an inverse Hessian-vector product. Exact calculations are impractical for modern language models, motivating curvature approximations, sketches, low-rank methods, and iterative solvers.
- Attribution estimates can be sensitive to non-convexity, incomplete optimization, mini-batch order, model scale, and stochastic training. Agreement with leave-one-out retraining is therefore an empirical question rather than a default guarantee.
- Retrieval-based evidence can identify similar or potentially supporting training passages, but similarity alone does not establish causal influence.
- Group and source attribution can be more appropriate than token-level scores when behavior arises from repeated patterns distributed across many examples.
- Architecture can make attribution easier. [[concepts/prototype-language-models|Prototype Language Models]] expose sparse prediction coordinates grounded in training neighborhoods and move influence calculations from the full parameter space into a structured prototype subspace.
- Attribution quality depends on the target estimand, model access, computational budget, and validation protocol. Useful audits should state which notion of influence is measured and what evidence checks it.

## Important Papers

- Koh and Liang (2017), "Understanding black-box predictions via influence functions": adapts classical influence functions to model predictions.
- Ilyas et al. (2022), "Datamodels": learns how subsets of training data relate to model outputs across repeated training runs.
- Grosse et al. (2023), "Studying large language model generalization with influence functions": scales approximate influence analysis to language models.
- Park et al. (2023), "TRAK": uses projected gradients to attribute model behavior at scale.
- Hammoudeh and Lowd (2024), "Training data influence analysis and estimation": surveys attribution methods and evaluation.
- [[papers/prototype-language-models|Prototype Language Models]]: treats attribution as an architectural design problem and performs cached influence calculations in a sparse prototype space.

## Related Concepts

- [[concepts/prototype-language-models|Prototype Language Models]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- Influence functions
- Data valuation
- Machine unlearning
- Training-data provenance
