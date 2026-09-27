---
title: Latent-Context Voting Models
type: concept
aliases:
  - Conditionally Independent Voting Models
tags:
  - roll-call-voting
  - latent-variable-models
  - statistical-physics
---

## Overview

Latent-context voting models represent collective votes as a mixture of conditionally independent decisions. Each voter has preferences, while a shared, partly unobserved context determines how those preferences translate into yea or nay. Marginalizing over context induces correlations without requiring direct voter-to-voter couplings in the conditional model. This is a statistical representation of collective behavior, not by itself evidence that interactions are absent.

## Key Ideas

- **Conditional independence differs from marginal independence.** With context $\sigma$, the joint distribution is $P(\mathbf s)=\sum_\sigma Q(\sigma)\prod_i P(s_i\mid\sigma)$. Voters can be strongly correlated because the same context affects them all.
- **Preferences and context play different roles.** In the model developed in [[papers/collective-contributions-to-polarized-voting|Collective contributions to polarized voting]], ternary context coordinates activate, reverse, or suppress preference dimensions. A dot product sets each voter's effective field, with $P(s_i=1\mid\sigma)=[1+\exp(-2h_i^{\mathrm{eff}})]^{-1}$.
- **Context energy is not context probability.** In Lee's joint energy parameterization, $Q(\sigma)\propto e^{-g(\sigma)}\prod_i 2\cosh(h_i^{\mathrm{eff}}(\sigma))$. The voter partition factors are necessary when converting contextual energies into mixture weights. This distinction matters when interpreting fitted context frequencies and their entropy.
- **Consensus can share the same representation as division.** A field component common to all voters permits near-unanimous outcomes, while heterogeneous components support competing coalitions. The model's $K$ counts the consensus dimension as well as heterogeneous preference dimensions.
- **Latent context and direct interaction accounts can agree statistically.** Marginalizing hidden context can yield higher-order effective interactions. Pairwise Ising or Hopfield forms require additional restrictions or approximations; matching a vote distribution does not identify a causal social mechanism.
- **Entropy requires a specified object and scale.** Conditional independence implies $H(\mathbf s,\sigma)=H(\sigma)+\sum_i H(s_i\mid\sigma)$, where conditional entropies average over context. Per-voter changes must be distinguished from their sum. Observed vote entropy additionally subtracts $H(\sigma\mid\mathbf s)$.
- **Latent dimensions need substantive validation.** A context may represent issue framing or institutional procedures, but assigning those meanings requires evidence beyond the inferred coordinates. Symmetry-related coordinates can encode the same distribution.

## Important Papers

- [[papers/collective-contributions-to-polarized-voting|Collective contributions to polarized voting]] (Lee, 2026): fits a generalized restricted Boltzmann machine to Senate roll calls and examines consensus, multidimensional coalitions, and entropy trends.
- Lee and Cantwell (2024), "Valence and interactions in judicial voting": a precursor cited by Lee for incorporating consensus in voting models.
- Kruis and Maris (2016), "Three representations of the Ising model": cited by Lee for the connection between interaction and latent-variable representations.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: multiple preference directions can support context-dependent coalitions.
- [[concepts/political-polarization|Political Polarization]]: observed partisan division may change with preferences, contexts, or both.
