---
title: Deconfounding Flows
type: concept
aliases:
  - Deconfounding Flow
  - DECFM
tags:
  - counterfactual-generation
  - flow-matching
  - causal-inference
  - optimal-transport
---

## Overview

A deconfounding flow is a generative transport from the observed outcome distribution in a treatment arm, $P_{Y\mid A=a}$, to the counterfactual outcome distribution, $P_{Y(a)}$. It uses observed outcomes as a structured source rather than generating the counterfactual law from generic noise. The construction is useful when confounding changes the mixture of outcome features but leaves substantial support, tail behavior, or semantic structure shared between source and target.

## Key Ideas

- **Shared mixture components.** Both distributions mix the same conditional outcome laws $P_{Y\mid X=x,A=a}$. They differ because the observational law mixes over $P_{X\mid A=a}$ while the counterfactual law mixes over the target population law $P_X$.
- **Positivity preserves geometry.** Under [[concepts/causal-overlap|Causal Overlap]], the observational source and counterfactual target have the same support and tail class. This avoids some impossibilities faced by smooth transports from a mismatched fixed base, such as creating disconnected support or heavier tails.
- **Confounding controls transport size.** Their total-variation distance contracts relative to the shift in covariate mixing distributions and the variation of conditional outcomes across covariates. With Wasserstein-smooth outcome mechanisms, the optimal map is close to the identity when covariate shift is small.
- **Invariant content can be reused.** If a feature of the outcome has the same conditional distribution for every confounder value within an arm, that feature has the same marginal law under the source and target. A learned flow can then focus on the varying features rather than reconstructing all content.
- **Debiasing requires two corrections.** In [[concepts/flow-matching|Flow Matching]], using an empirical observational source makes the training objective itself depend on the data law. Efficient estimation therefore corrects both the unidentified counterfactual endpoint and the source distribution inside the objective.
- **Coupling controls path complexity.** Independent source-target coupling is simple to estimate but can create curved, high-energy paths. Minibatch entropic [[concepts/optimal-transport|Optimal Transport]] can yield straighter paths, at the cost of introducing coupling-estimation error that also needs statistical analysis.
- **Causal and rebalancing readings differ.** When the identifying assumptions hold, the target is a potential-outcome distribution. In generative applications, the same formula may instead define an attribute-rebalanced distribution without supporting a causal claim about intervention.

## Important Papers

- [[papers/debiased-counterfactual-generation-via-flow-matching-from-observations|Debiased Counterfactual Generation via Flow Matching from Observations]] introduces DECFM, derives its efficient influence-function correction, and evaluates independent and entropic-OT couplings on synthetic, causal-benchmark, and image tasks.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns the time-dependent velocity field implementing the transport.
- [[concepts/optimal-transport|Optimal Transport]]: characterizes minimal-displacement maps and supplies lower-energy endpoint couplings.
- [[concepts/causal-overlap|Causal Overlap]]: supports counterfactual identification and the shared-support result.
- [[concepts/normalizing-flows|Normalizing Flows]]: related invertible generative transports whose source support and tail mismatch can limit expressivity.
