---
title: Markov-Switching Latent Space Network Models
type: concept
aliases:
  - MS-LS Models
tags:
  - latent-space-models
  - dynamic-networks
  - markov-switching
  - bayesian-inference
---

## Overview

Markov-switching latent space network models represent temporal networks through a finite collection of latent configurations. A hidden Markov chain selects the configuration at each time, allowing earlier states to recur. Nodes occupy continuous positions within each state; the states label periods, not discrete communities of nodes.

## Key Ideas

- **Shared regime, node-specific positions.** With $x_{it}=\zeta_{i,S_t}$, all nodes switch configurations together, while each retains its own position in each regime. Positions remain fixed within a regime rather than following unrestricted daily trajectories.
- **Distance and popularity play different roles.** A weighted specification uses $\log\lambda_{ijt}=\alpha_i+\alpha_j-\beta\lVert x_{it}-x_{jt}\rVert^2$ for conditionally Poisson edges. Individual effects accommodate popular nodes without forcing universal latent proximity.
- **Interpretation needs measurement information.** Casarin, Peruzzi, and Steel couple network counts with a Beta-logistic text-slant likelihood. Shared positions then support a political interpretation of one coordinate; geometric separation alone is not automatically ideological polarization.
- **Parsimony depends on few regimes.** The latent-variable count is $O(dKN+T)$ rather than $O(dTN)$. This saves parameters when the number of states $K$ is small relative to the number of periods $T$, at the cost of restricted dynamics.
- **Identification has geometric and state components.** Scale, location, reflection, rotation, and state-label ambiguities require appropriate constraints. Ordering states by median pairwise distance gives a separation ordering, whose substantive meaning still depends on the measurement model.
- **Poisson edges can yield overdispersed strength.** Mixing over latent positions and regimes permits strength variability beyond a homogeneous Poisson graph. State-specific moments and differences between state means both matter.
- **Regime recovery is conditional.** Poorly separated configurations make state inference difficult. Good network fit does not validate causal explanations or establish population-wide changes in attitudes.

## Important Papers

- [[papers/media-bias-and-polarization-through-the-lens-of-a-markov-switching-latent-space-network-model|Media Bias and Polarization Through the Lens of a Markov Switching Latent Space Network Model]]: combines weighted audience networks and text slant, derives strength moments, and estimates European Facebook polarization regimes.
- Park and Sohn (2020), "Detecting Structural Changes in Longitudinal Network Data": related changepoint work cited by the media application; not asserted to have the same observation model.

## Related Concepts

- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: combining measurement channels through shared positions.
- [[concepts/social-network-analysis|Social Network Analysis]]: weighted ties, latent proximity, and nodal strength.
- [[concepts/political-polarization|Political Polarization]]: one substantive interpretation requiring validation beyond network fit.
