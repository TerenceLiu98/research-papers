---
title: "Prototype Language Models"
type: paper
authors:
  - Dan Ley
  - Giang Nguyen
  - Himabindu Lakkaraju
  - Julius Adebayo
year: 2026
tags:
  - interpretable-language-models
  - training-data-attribution
  - prototype-learning
  - model-steering
---

## TL;DR

PRISM replaces a language model's dense output pathway with a sparse, non-negative mixture of learned prototypes plus a residual. Because each prototype is trained toward recurring token-state neighborhoods, a prediction can be decomposed into prototype logit contributions and linked to nearby training contexts. Models from 124M to 1.6B parameters retain competitive downstream performance while enabling substantially cheaper attribution, inspectable task controllers, and inference-time behavior suppression.

## Research Question

Can training-data influence be made a native property of a language model's prediction pathway, rather than reconstructed afterward from its dense parameters, without imposing a large cost in predictive quality or training efficiency?

## Motivation

Gradient-based [[concepts/training-data-attribution|Training Data Attribution]] is expensive at language-model scale and relies on approximations to inverse Hessian-vector products. Its usual assumptions also fit stochastic, non-convex language-model training poorly. The paper instead treats attribution as an architectural problem: if next-token predictions pass through sparse components anchored to training neighborhoods, those components can serve simultaneously as predictive features, attribution coordinates, and intervention handles.

## Contributions

- Introduces Prototypes for Interpretable Sequence Modeling (PRISM), an autoregressive architecture whose output is an additive mixture of sparse prototype contributions and an explicit residual.
- Shows theoretically that clustering and sparse prototype co-usage yield a structured prototype-space Hessian, with prototype-local blocks and cross-prototype coupling governed by an activation co-usage matrix.
- Develops cacheable prototype-space influence scores and reports roughly 500x faster attribution than dense post-hoc baselines at equivalent memory.
- Scales PRISM from 124M to 1.6B parameters and up to 50B training tokens, while exposing training-grounded prediction decompositions.
- Demonstrates sparse prototype controllers and direct prototype suppression as ways to adjust behavior without changing model weights.

## Method

For a final hidden state $z_t$ and prototype bank $P=[p_1,\ldots,p_K]$, PRISM computes cosine similarities, applies ReLU, and retains the top-$k$ activations. The active prototypes reconstruct part of the hidden state,

$$
\hat z_t = \sum_{i \in \mathcal K_t} a_{t,i}p_i, \qquad r_t=z_t-\hat z_t.
$$

With output projection $W$, the logits decompose as

$$
\ell_t = Wr_t + \sum_{i \in \mathcal K_t}a_{t,i}Wp_i.
$$

Each $Wp_i$ is therefore a fixed vocabulary signature, while $a_{t,i}Wp_i$ is its local contribution. Cross-entropy and reconstruction losses preserve language-model fidelity; two clustering losses encourage every prototype to remain close to some token state and every token state to be represented by a nearby prototype. Prototype cards summarize vocabulary signatures and highly activating training contexts.

For attribution, the method represents prototype co-usage with $G_A=\sum_t a_ta_t^\top$. The local Hessian separates into a reconstruction term controlled by $G_A$ and prototype-local clustering blocks. This permits cached, lower-dimensional influence calculations. For control, linear task-specific weights or selected prototype groups directly rescale prototype logit contributions.

## Experiments

- **TinyStories diagnostics:** On a 124M backbone, adding standard clustering raises prototype coverage from 0.179 to 0.987 while validation cross-entropy changes from 1.2435 to 1.2513. Native PRISM training produces much stronger grounding than fitting a prototype head to a pretrained dense model (0.987/0.869 versus at most 0.473/0.264 on the two grounding metrics).
- **Attribution:** Sparse clustering localizes prototype co-usage and supports cached influence estimates. At equal memory, the reported attribution procedure is about 500x faster than dense post-hoc baselines while preserving useful attribution signal.
- **Scaling:** Matched models are trained on FineWeb-Edu and Nemotron-CC. At 1.6B parameters and 10B FineWeb tokens, PRISM slightly exceeds the dense GPT average across seven zero-shot tasks (48.95 versus 48.89), though smaller models and the 10B-token Nemotron model trail their dense counterparts. A 20B-token FineWeb run reaches 49.94, and a 50B-token Nemotron run reaches 49.75.
- **Efficiency:** The XL prototype bank adds 26.2M parameters, or 1.7% over the 1.558B backbone. On one H200, PRISM reaches 40.4k tokens/s versus GPT's 41.5k (97.3% throughput), with peak allocated memory rising from 49.1 GB to 50.9 GB.
- **Controllers:** Across four non-binary multiple-choice tasks, a frozen-model prototype controller improves mean accuracy by 2.72 points, compared with 0.32 for a matched post-hoc SAE controller. Binary-task gains are inconsistent and excluded from that mean.
- **Suppression:** Suppressing 86 of 16,384 prototypes selected by a keyword-based discovery heuristic reduces mean judged NSFW content from 0.668 to 0.154 over 50,000 paired samples, while mean writing quality is nearly unchanged (1.010 versus 1.003).

## Limitations

- Attribution is token-level and tied to the final prediction interface; it does not yet provide coherent document-level provenance or trace computations through intermediate transformer layers.
- Prototype-space influence describes a fixed trained model and is not equivalent to the counterfactual effect of removing data and fully retraining across stochastic runs.
- The residual preserves predictive capacity but leaves some behavior outside the prototype explanation path.
- Automated prototype labels are lightweight summaries generated from vocabulary signatures and retrieved contexts, not guarantees of stable or complete semantic meaning.
- The safety experiment selects prototype groups with a keyword heuristic that can flag broad demographic or gender language; the authors identify false positives and human review as open needs.
- Competitive performance is not uniform: several smaller and Nemotron comparisons remain below matched dense baselines, despite favorable FineWeb results at 1.6B scale.

## Related Concepts

- [[concepts/prototype-language-models|Prototype Language Models]]
- [[concepts/training-data-attribution|Training Data Attribution]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]

## Related Papers

- Li et al. (2018), "Deep learning for case-based reasoning through prototypes": establishes learned prototypes as inspectable evidence for neural predictions.
- Chen et al. (2019), "This looks like that": develops prototype-based, case-oriented explanations for image classification.
- Koh and Liang (2017), "Understanding black-box predictions via influence functions": a foundational gradient-based attribution approach that motivates PRISM's Hessian analysis.
- Park et al. (2023), "TRAK: Attributing model behavior at scale": a scalable post-hoc attribution baseline discussed by the paper.
- Cunningham et al. (2024), "Sparse autoencoders find highly interpretable features in language models": a post-hoc sparse decomposition contrasted with PRISM's jointly trained predictive coordinates.
- [[index|Library home]]
