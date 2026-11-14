---
title: Looped Transformers Are Better at Learning Learning Algorithms
type: paper
authors:
  - Liu Yang
  - Kangwook Lee
  - Robert D. Nowak
  - Dimitris Papailiopoulos
year: null
source_job_id: "1fc8610a-e3fa-4d07-96a5-74798c5c8492"
tags:
  - in-context-learning
  - looped-transformers
  - algorithm-learning
---

## TL;DR

A one-layer, input-injected looped Transformer learns synthetic regression tasks with performance comparable to a 12-layer Transformer using 0.79M rather than 9.48M parameters. Training over a late window of loop outputs can produce stable predictions beyond the training iteration count. This is parameter efficiency with additional sequential computation, and the learned solver retains an error floor and distribution-dependent failures.

## Research Question

Can a shared Transformer update learn iterative data-fitting procedures in context more parameter-efficiently than an untied stack?

## Motivation

Traditional regression solvers repeatedly apply simple updates. An untied Transformer need not organize its computation this way. Reusing a decoder block supplies an iterative inductive bias for [[concepts/in-context-learning|In-Context Learning]], while repeatedly injecting the prompt keeps each update conditioned on the observed examples.

## Contributions

- Develops input injection and truncated-window supervision for training looped decoder Transformers from scratch.
- Compares synthetic linear, sparse linear, decision-tree, and two-layer ReLU function learning, with architecture, sample-efficiency, probing, and distribution-shift analyses.
- Shows that parameter savings and stable iteration can coexist without identifying a distribution-independent learning algorithm.

## Method

A prompt contains example input-output pairs followed by a query. Training supervises predictions across prompt prefixes. With prompt representation P and zero initial state, the shared update is:

$$
Y_{t+1}=M_\theta(Y_t+P),\qquad Y_0=0.
$$

The squared prediction loss is evaluated over a late iteration window controlled by maximum unroll count b and truncation parameter T, starting at max(b−T, 0). The source's parsed loss equation omits the explicit loss operator, so its intended squared-error objective is described here rather than reproducing that expression. Input injection outperforms simply initializing the recurrence with P: the weight-tying-only ablation deteriorates beyond its trained horizon (Section 4).

Both models use width 256 and eight heads; the baseline has 12 layers and the looped model one. Adam uses learning rate 0.0001 without weight decay or gradient clipping. Training schedules gradually increase b, alongside the inherited curriculum over dimension and context length. Larger b increases forward computation; larger T increases training memory and may destabilize optimization.

## Experiments

The main linear task uses Gaussian weights and inputs, dimension 20, and 40 context examples. Evaluation uses 1,280 prompts and 90% confidence intervals from 1,000 bootstrap trials.

| Function class | Selected b | Selected T | Reported finding |
| --- | --- | --- | --- |
| Linear regression | 20 | 15 | Matches the standard Transformer and approaches least squares |
| Sparse linear regression | 20 | 10 | Improves sample-limited performance over the standard Transformer |
| Depth-four decision tree | 70 | 15 | Matches or exceeds baseline performance in the reported comparisons |
| Two-layer ReLU network, 100 hidden units | 12 | 5 | Comparable performance with fewer parameters |

For sparse regression with 40 examples, Section 5.4 reports errors of 0.000612 for the looped model, 0.0017 for the standard Transformer, 0.000132 for Lasso, and 8.21e−14 for least squares. The advantage over tuned Lasso concerns fewer than ten context examples, not final numerical precision. Tests across sparsities 1, 3, 6, 9, and 12 support the advantage with limited context.

The looped model learns linear tasks from fewer distinct training prompts. Probes for the gradient component and least-squares weights improve progressively across loops, supporting iterative representational refinement without proving exact gradient descent. A one-layer looped model needs roughly 20 iterations to match an eight-layer standard model in the architecture sweep.

Distribution shifts reveal mixed behavior: skewed covariance and noisy outputs can favor the looped model, whereas scaling inputs by three worsens performance relative to the untied model. Appendix G reports leave-one-dataset-out experiments across ten OpenML datasets with numerical features and binary labels. For example, wind accuracy is 0.757 ± 0.006 versus 0.668 ± 0.007, while pollen is 0.51 ± 0.005 versus 0.532 ± 0.004 for looped and standard models respectively. These results are not uniformly positive.

## Limitations

- Stable iteration is empirical and depends on b, T, and task. Short training horizons can diverge when extended; larger windows can destabilize training.
- The learned fixed-point predictions have an error floor and do not generalize as an exact solver across arbitrary input distributions (Section 6).
- Fewer parameters do not establish lower latency or compute; matching an untied model can require more block evaluations.
- Probing demonstrates decodable statistics, not causal identification of an optimization algorithm.
- The source differs on sparse-task context count between Section 5.4 and Appendix B, and on the sample-efficiency context count between prose and Figure 5. Those counts should not be treated as uniquely specified.
- No explicit publication year or stable identifier for this paper appears in the supplied text; year remains unset.

## Related Concepts

- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/cyclic-fixed-points-in-looped-transformers|Cyclic Fixed Points in Looped Transformers]]: related convergence framework; this paper evaluates a single-layer injected recurrence, not a theorem about multi-layer cycles.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: related parameter-sharing perspective, with no teacher-trajectory distillation in this study.

## Related Papers

The source builds on Garg et al. (2022), *What Can Transformers Learn In-Context? A Case Study of Simple Function Classes*, and contrasts with the linear-attention gradient-descent analysis of von Oswald et al. (2022), *Transformers Learn In-Context by Gradient Descent*. It cites Dehghani et al. (2018), *Universal Transformers*, and Bai et al. (2019), *Deep Equilibrium Models*, for recurrent computation and fixed-point modeling.

[[papers/recurrent-looped-transformer|Recurrent Looped Transformer]] is related library reading: it recurs across ordinary tokens, whereas this paper repeatedly processes a fixed prompt across depth. This is a conceptual comparison, not a claimed source citation.

[[index|Library home]]
