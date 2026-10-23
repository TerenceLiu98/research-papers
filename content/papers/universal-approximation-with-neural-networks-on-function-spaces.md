---
title: "Universal Approximation with Neural Networks on Function Spaces"
type: paper
authors:
  - Wataru Kumagai
  - Akiyoshi Sannai
  - Makoto Kawano
year: 2024
doi: 10.1080/0952813X.2022.2123563
tags:
  - universal-approximation
  - function-spaces
  - neural-networks
  - equivariant-learning
  - neural-processes
---

## TL;DR

This paper proves a [[concepts/universal-approximation-on-function-spaces|universal approximation theorem on function spaces]] for uniformly continuous maps from $C_0(S)$ to $C_0(T)$, allowing the index domains $S$ and $T$ to be noncompact and the activation to be an unbounded non-polynomial function such as ReLU. It then uses a kernel-embedding decomposition to justify neural-network approximation of continuous, permutation-invariant, group-equivariant learning algorithms on noncompact domains.

## Research Question

Can finite-hidden-layer fully connected neural networks uniformly approximate maps between infinite-dimensional function spaces when the functions are indexed by noncompact domains, and can this result supply a theoretical foundation for symmetry-aware neural processes?

## Motivation

Earlier operator-level universal approximation results assumed compact input and output index sets. That excludes common settings such as functions on Euclidean space and leaves a gap in neural-process constructions whose translation or group symmetries act on noncompact domains. The paper addresses this gap for spaces of continuous functions that vanish at infinity.

## Contributions

- Extends universal approximation from compact index domains to closed, potentially noncompact domains for uniformly continuous maps $F:C_0(S)\to C_0(T)$.
- Allows any continuous non-polynomial activation, including unbounded activations such as ReLU.
- Shows that approximation on a compact subset of the input function space can be achieved by a three-layer FNN whose affine maps are integral transforms.
- Proves a decomposition theorem for continuous learning algorithms that are invariant to dataset permutations and equivariant under a group action.
- Connects the decomposition to approximation of symmetry-aware neural processes on noncompact domains.

## Method

The functional FNN replaces finite-dimensional affine layers with bounded affine maps induced by integral transforms. Its main theorem considers a uniformly continuous map

$$
F:C_0(S)\rightarrow C_0(T),
$$

where $S$ and $T$ are closed domains and $C_0$ contains continuous functions that vanish at infinity. For every compact $E\subset C_0(S)$ and tolerance $\varepsilon>0$, the theorem constructs a three-layer FNN that approximates $F$ uniformly on $E$.

The proof uses the noncompact Arzela-Ascoli criterion. Compact families in $C_0$ are equivanishing, so their inputs and outputs can be uniformly truncated to sufficiently large compact balls with continuous cutoff functions. The compact-domain approximation theorem can then be applied, and uniform continuity controls the error introduced by truncation.

For the symmetry application, a labeled dataset is embedded into $C_0(S)^2$ using sums of an invariant kernel evaluated at its input locations. Under the paper's closedness, bounded-cardinality, multiplicity-one, kernel interpolation, and invariance assumptions, a continuous permutation-invariant and group-equivariant algorithm factors as $F=\rho\circ e$. The embedding $e$ is concrete; the remaining continuous equivariant function-space map $\rho$ is the object covered by the approximation theorem.

## Experiments

The paper is theoretical and reports no empirical experiments. Its evidence consists of the universal approximation theorem, the noncompact function-space argument, and the symmetry-aware decomposition theorem.

## Limitations

- The main approximation theorem requires the target map to be uniformly continuous, which is stronger than continuity on the full function space.
- Approximation is uniform on a chosen compact subset $E$, not globally over all of $C_0(S)$.
- Inputs and outputs must vanish at infinity; the theorem does not directly cover arbitrary bounded continuous functions on noncompact domains.
- The symmetry decomposition imposes substantial conditions on the dataset domain and kernel, including bounded dataset size, multiplicity one, interpolation, nonnegativity, and group invariance.
- The paper establishes existence, not approximation rates, learnability, optimization behavior, or finite-sample generalization.
- Only fully connected function-space networks are treated. Extensions to convolutional and recurrent architectures are left for future work.

## Related Concepts

- [[concepts/universal-approximation-on-function-spaces|Universal Approximation on Function Spaces]]
- [[concepts/neural-operators|Neural Operators]]
- [[concepts/functional-neural-networks|Functional Neural Networks]]
- Kernel mean embeddings
- Group equivariance
- Neural processes

## Related Papers

- Guss and Salakhutdinov (2019), "On Universal Approximation by Neural Networks with Uniform Guarantees on Approximation of Infinite Dimensional Maps."
- Stinchcombe (1999), "Neural Network Approximation of Continuous Functionals and Continuous Functions on Compactifications."
- Gordon et al. (2019), "Convolutional Conditional Neural Processes."
- Kawano et al. (2021), "Group Equivariant Conditional Neural Processes."

[[index|Library home]]
