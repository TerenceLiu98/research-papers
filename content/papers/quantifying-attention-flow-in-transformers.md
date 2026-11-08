---
title: Quantifying Attention Flow in Transformers
type: paper
authors:
  - Samira Abnar
  - Willem Zuidema
year: null
tags:
  - transformers
  - attention
  - interpretability
---

## TL;DR

Attention rollout and attention flow trace attention through successive Transformer layers to estimate input-token relevance. Both account for residual connections and improve upper-layer agreement with ablation and gradient importance on subject–verb agreement, but gains on sentiment classification are small and do not establish faithful causal explanations.

## Research Question

How can attention weights over contextualized hidden embeddings be converted into relevance scores over original input tokens?

## Motivation

Repeated self-attention mixes information across positions. A high-layer embedding therefore no longer corresponds exclusively to the token at that position, making a single attention map a misleading proxy for input relevance.

## Contributions

- Introduces [[concepts/attention-rollout|Attention Rollout]], which composes attention matrices across layers.
- Introduces [[concepts/attention-flow|Attention Flow]], which computes maximum flows through a layered attention graph.
- Evaluates both against token blank-out and input-gradient scores, with additional sentiment and masked-pronoun examples.

## Method

Average attention over heads at each layer, then add the identity and row-normalize to approximate residual connections: $A_l=(W_l+I)/2$ for row-normalized attention $W_l$. The graph contains token-position nodes at each layer and edges directed toward the preceding layer.

Rollout recursively computes $R_l=A_lR_{l-1}$ with $R_0=I$. It sums products of edge weights over paths to each input token. Flow instead treats attention weights as capacities and solves a maximum-flow problem separately between a hidden node and each input node. Capacity constraints prevent overlapping paths from double-counting shared edges. Rollout tends to give concentrated weights; flow can highlight a broader set of potentially relevant tokens.

Appendix A.1 discusses head-specific analysis while aggregating lower-layer heads to account for mixing. Neither procedure models the full value transformations and nonlinear computations of a Transformer.

## Experiments

The main model is an unmasked six-layer Transformer encoder with eight heads and hidden size 128, using a CLS embedding for verb-number classification on the Linzen et al. subject–verb agreement dataset. Reported accuracy is 0.96. Blank-out replaces individual tokens with UNK and measures the change in correct-class probability.

Tables 1–2 report Spearman correlations over 2,000 test examples. Final-layer values are reproduced below; uncertainty is shown as reported, without assigning an unstated interpretation to ±.

| Reference importance | Raw attention | Rollout | Flow |
| --- | --- | --- | --- |
| Blank-out | 0.29 ± 0.39 | 0.71 ± 0.24 | 0.70 ± 0.22 |
| Input gradients | 0.46 ± 0.35 | 0.54 ± 0.31 | 0.61 ± 0.28 |

The improvement is not uniform across depth: first-layer raw attention correlates more strongly with blank-out (0.69 versus 0.32 for both alternatives) and gradients (0.53 versus 0.22). Flow is not uniformly better than rollout either.

For DistilBERT fine-tuned on SST-2, Table 3 uses 100 test examples. Final-layer gradient correlations are only 0.09 ± 0.21 for raw attention, 0.13 ± 0.20 for rollout, and 0.14 ± 0.21 for flow. Qualitative BERT masked-pronoun examples show both methods agreeing with the prediction in one example and only flow doing so in another.

## Limitations

- These are attention-only approximations; agreement with gradients or ablations is not proof of causal faithfulness.
- All reported analyses use encoders without causal masking. The authors warn that decoder masking biases both methods toward early tokens and suggest receptive-field normalization before decoder use.
- Sentiment-task correlations remain low, limiting broad conclusions from the stronger agreement-task results.
- Head averaging suppresses head-specific variation; flow requires more computation than rollout.
- The supplied Markdown does not explicitly state the publication year or stable paper identifier, so these are not inferred from cited works.

## Related Concepts

- [[concepts/attention-rollout|Attention Rollout]]
- [[concepts/attention-flow|Attention Flow]]
- [[concepts/attention-as-message-passing|Attention as Message Passing]]

## Related Papers

- Brunner et al., “On Identifiability in Transformers” (2020), motivates the loss of token identifiability across layers.
- Jain and Wallace, “Attention is not Explanation” (2019), provides context for caution about attention-based explanations.
- [[papers/transformers-are-graph-neural-networks|Transformers are Graph Neural Networks]] supplies a complementary graph interpretation of attention; this is a library connection, not a claimed citation in the paper.

[[index|Library home]]
