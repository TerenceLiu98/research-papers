---
title: "Trajectory Matching: Discrete Flow Matching with Structured Actions"
type: paper
authors:
  - Niklas Kemper
  - Marten Lienen
  - David Lüdke
  - Stephan Günnemann
year: null
tags:
  - discrete-flow-matching
  - structured-generation
  - graph-generation
  - molecular-generation
---

[[index|Library home]]

## TL;DR

Trajectory matching trains a discrete flow on complete action sequences rather than conditioning only on endpoint states. This makes simulation-free flow-matching targets tractable for size-changing, multi-component, and prerequisite-dependent actions. The framework recovers factorized discrete flow matching as a special case; in the reported graph experiments, domain-aligned actions guarantee tree validity, raise MOSES molecular validity from 92.8% for DeFoG to 99.2% for fragment growth, and support zero-shot substructure extension and linking.

## Research Question

Can discrete flow matching retain its simulation-free conditional-to-marginal training principle while replacing fixed-size, independent component edits with user-defined structured actions?

## Motivation

Standard discrete flow matching obtains tractable endpoint-conditioned rates by factorizing states and transitions across components. That construction is poorly matched to operations such as attaching a molecular fragment, adding a node together with an edge, or growing a hierarchy: these actions can alter state size, change several components, and require earlier actions. Autoregressive models can express such operations but commit to sequential generation and often to a fixed order. The paper seeks a principled non-autoregressive flow construction in which the action vocabulary and generation order become modeling choices.

## Contributions

- Introduces [[concepts/trajectory-matching|Trajectory Matching]], which conditions a continuous-time Markov chain on a complete valid action trajectory and then marginalizes over a distribution of trajectories.
- Proves that the resulting marginal action rate generates the marginal probability path and that conditional training has the same gradients as matching the marginal rate.
- Derives a Rao-Blackwellized target that averages over trajectory continuations consistent with the current state, reducing gradient variance without changing the expected gradient.
- Shows that independent component actions with uniformly sampled orderings recover factorized discrete flow matching, while partial-order action systems cover hierarchy growth and molecular construction.
- Instantiates the framework with fixed-size bond editing, atom growth, fragment growth, molecule editing, and rooted-tree growth.

## Method

The state evolves through actions $a \in A(s)$ with time-dependent rates $u_t(s,a)$. A trajectory

$$
\tau:s_I=s_0\xrightarrow{a_1}s_1\xrightarrow{a_2}\cdots\xrightarrow{a_n}s_n=s_F
$$

fixes which actions occur and their order, while a trajectory-conditioned continuous-time Markov chain randomizes their execution times. Under the paper's uniform schedule, the number of completed actions at time $t$ follows $K_t\sim\mathrm{Binomial}(n,t)$, and at state $s_i$ only the next action has positive rate, $(n-i)/(1-t)$. This gives a closed-form conditional path that can be sampled without simulating the chain.

Training samples endpoints, a valid trajectory from $q(\tau\mid s_I,s_F)$, a time, and an intermediate trajectory state, then regresses a model action rate against the conditional rate with a Bregman divergence. Averaging these targets over trajectories yields a marginal rate that transports the source distribution to the target distribution. Rao-Blackwellization conditions on the sampled intermediate state and averages over compatible trajectory suffixes; for independent actions this supervises every remaining action, while a fully sequential dependency chain reduces to next-action supervision.

The trajectory distribution is application-specific. Independent actions can be uniformly permuted. Dependent fixed action sets use linear extensions of a dependency partial order. When different decompositions produce different action sets, a latent variable selects a decomposition before a compatible trajectory is sampled. Sampling the learned model uses Euler integration and can apply multiple compatible actions in one step, so trajectory-conditioned supervision does not force autoregressive inference.

## Experiments

**Hierarchy generation.** GrowHierarchy attaches a child to an existing node, so every reachable state is a connected rooted tree. On the Tree benchmark it reports 100% valid, unique, and novel samples and a graph-statistics Ratio of $2.5\pm0.6$. At 10 Euler steps, validity remains 100%, whereas the factorized DeFoG baseline falls to 8%.

**Molecular graph generation.** The study evaluates BondEdit, AtomGrow, FragGrow, and MolEdit on QM9, ZINC, and MOSES with a shared graph-transformer backbone. BondEdit matches the fixed-size discrete-flow baselines in the reported regime. On ZINC, FragGrow reports 98.9% validity and FCD $1.22\pm0.03$; on MOSES it reports 99.2% validity, compared with 92.8% for DeFoG, while retaining 99.9% uniqueness. The stronger fragment action improves validity but does not dominate every metric: its MOSES novelty is 90.7%, below AtomGrow's 94.6% and MolEdit's 99.3%.

**Downstream transfer.** A single AtomGrow model trained on ZINC starts from supplied partial structures without retraining. It achieves a valid-and-connected rate of 94.6% on extension across 11 seeds, versus 33.8% for an adapted BondEdit baseline, and 78.8% on linking across six fragment pairs, versus 57.0%.

**Target variance.** The appendix reports that Rao-Blackwellized supervision improves target stability and examines trajectory-distribution choices, while noting that exact averaging is generally intractable outside the derived dependency families.

## Limitations

- Performance depends on domain-specific choices of action vocabulary and trajectory distribution; complex actions need not help when independent component edits already reflect the problem structure.
- Efficient training requires sampling valid trajectories and preferably computing Rao-Blackwellized rates. General dependency DAGs can make exact rates intractable and require specialized constructions.
- The empirical study is limited to trees and molecular graphs across four datasets, so broader domain generality remains untested.
- Some advantages are structural guarantees induced by the chosen action space rather than improvements learned from data, and the molecular variants trade off validity, novelty, and distributional metrics.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/trajectory-matching|Trajectory Matching]]: the paper's full-action-sequence conditioning framework for discrete flows.
- [[concepts/flow-matching|Flow Matching]]: the conditional-to-marginal regression principle underlying the construction.
- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: a separate framework for preserving temporal couplings in irregular stochastic time series; its use of “trajectory” is distinct from an ordered discrete action sequence.
- [[concepts/diffusion-models|Diffusion Models]]: related iterative generative processes, including fixed-size discrete diffusion baselines used in the evaluation.

## Related Papers

- Gat et al. (2024), “Discrete Flow Matching”: a factorized fixed-product-space formulation recovered as a special case.
- Campbell et al. (2024), “Generative Flows on Discrete State-Spaces”: discrete flow matching for multimodal discrete states and protein co-design.
- Holderrieth et al. (2024), “Generator Matching”: the general conditional-to-marginal Markov-generator framework in which trajectory matching is situated.
- Havasi et al. (2025), “Edit Flows: Flow Matching with Edit Operations”: handles sequence insertions, substitutions, and deletions through an augmented factorized alignment space; the paper derives its rates as a trajectory-matching instance.
- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]]: a foundational discrete-diffusion approach based on structured transition matrices.
- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]]: studies representative and endpoint coupling choices for fixed-size graph flow matching.
