---
title: Multi-Order Interactions
type: concept
aliases:
  - Context-Order Interactions
tags:
  - neural-network-interpretability
  - feature-interactions
  - representation-learning
---

## Overview

Multi-order interactions measure how two input variables jointly affect a model score when evaluated within contexts of a fixed size. They separate the Shapley bivariate interaction index by contextual complexity, allowing the same variable pair to be compared under sparse, intermediate, and nearly complete contexts.

## Key Ideas

- **Fixed pair, changing context:** For a masked-input score $v(S)$, the pairwise effect is $\Delta v(i,j,S)=v(S\cup\{i,j\})-v(S\cup\{i\})-v(S\cup\{j\})+v(S)$. The order-$m$ interaction averages this effect over contexts $S\subseteq N\setminus\{i,j\}$ with $|S|=m$, for $m=0,\ldots,n-2$.
- **Aggregation:** Averaging the signed order-specific effects across orders gives the Shapley bivariate interaction index. Averaging their absolute magnitudes across pairs and samples instead measures representation strength. Taking absolute values after context averaging permits cancellation within an order.
- **Contextual variability:** A fixed pair admits $\binom{n-2}{m}$ contexts at order $m$. This count peaks at intermediate orders, but the count alone does not specify their semantic diversity or gradient statistics.
- **Interaction bottleneck:** The Deng et al. study reports strong low- and high-order effects with weak intermediate-order effects in the evaluated DNNs. Its learning-strength explanation is conditional on assumptions about interaction gradients.
- **Order modulation:** Classification and entropy objectives on differences of masked scores can change the interaction-strength profile. Their order weights overlap: the method emphasizes a range without exactly isolating every contribution in it.
- **Interpretation boundaries:** Context order depends on the chosen input units and baseline. A small context need not be spatially local. Empirical links with train-test gaps, fitting, and robustness require their own evaluations and are not consequences of the interaction definition alone.

## Important Papers

- [[papers/the-interaction-bottleneck-of-deep-neural-networks-discovery-proof-and-modulation|The Interaction Bottleneck of Deep Neural Networks: Discovery, Proof, and Modulation]] reports the bottleneck, conditional learning-strength analysis, modulation losses, and comparisons of model behavior.
- Zhang et al. (2020), "Interpreting and Boosting Dropout from a Game-Theoretic View," ICLR: the foundational multi-order formulation cited as reference [57] by the bottleneck paper.
- Zhang et al. (2020), "Game-Theoretic Interactions of Different Orders," arXiv:2010.14978: reference [56] for the axiomatic treatment cited by the bottleneck paper.

## Related Concepts

- [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]]: both analyze masked-input scores, but AND/OR order counts variables in a subset effect. Context order counts variables accompanying a fixed pair, so their order-strength curves should not be equated.
