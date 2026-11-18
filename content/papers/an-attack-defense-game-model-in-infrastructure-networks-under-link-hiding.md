---
title: "An attack–defense game model in infrastructure networks under link hiding"
type: paper
authors:
  - Gaoxin Qi
  - Jichao Li
  - Xueming Xu
  - Gang Chen
  - Kewei Yang
year: 2022
doi: "10.1063/5.0112907"
tags:
  - network-security
  - game-theory
  - infrastructure-networks
---

## TL;DR

Property-weighted hiding of network links can mislead an attacker about node importance and attack costs. A defender-first Stackelberg model finds improved protection in simulations on a scale-free network and the IEEE 30-bus network, although hiding is counterproductive in some scale-free settings.

## Research Question

How does concealing topology change resource-constrained attack and defense decisions, and when can this information advantage improve infrastructure protection?

## Motivation

Physical dependencies make the consequences of attacking individual facilities depend on network topology. An attacker with an incomplete network map may misrank targets and underfund attacks, giving the defender an additional protection mechanism beyond allocating resources.

## Contributions

- A node-property-based probabilistic link-hiding rule with a topology-dependent admissible hiding coefficient.
- A defender-first game incorporating different observed networks, property-dependent costs, and unsuccessful underfunded attacks.
- Equilibrium simulations, an alternative connectivity metric, and a comparison with random topology reconnection.

## Method

The actual network is an undirected simple graph with node properties $r_i$ and degrees $k_i$. An existing edge is hidden with probability

$$
p_{ij}=\alpha M\frac{r_i+r_j}{\sum_i k_i r_i}.
$$

The expected hidden-edge count is $\alpha M$. The sufficient bound $\alpha\leq 2\bar r/(r_{(1)}+r_{(2)})$, where $\bar r=\sum_i k_i r_i/\sum_i k_i$, keeps probabilities at most one. Hidden edges remain physically present; the attacker sees an incomplete graph while the defender knows the actual graph.

Node costs are $c_i=r_i^\beta$. Each player's budget is a fraction $\theta$ of the total cost computed from its own network view. Consequently, equal budget coefficients need not mean equal absolute resources after hiding. Protected nodes cannot be destroyed. For an unprotected target, attack success is one if allocated cost meets actual cost; otherwise it is the ratio of perceived to actual cost (Eq. 7).

The action space is restricted to high-property and low-property node selection, giving two strategies per player. The defender commits to a mixture and anticipates the attacker's best response through a strong [[concepts/stackelberg-games|Stackelberg equilibrium]], with ties resolved in the defender's favor. Candidate follower responses are enumerated and the best feasible leader mixture is selected.

The defender values the fraction of the actual network's largest connected component retained; the attacker evaluates damage using its observed network. The differing graph views mean these perceived payoffs need not sum to one. Experiments use degree as the node property.

## Experiments

- **Scale-free network:** a Barabási–Albert graph with 1,000 nodes, mean degree 4, and largest degrees 70 and 44. The hiding bound is approximately 0.17; experiments include hiding coefficients 0, 0.1, and 0.15 and budget coefficients from 0.1 to 0.9. Payoffs are averaged over 1,000 runs. Greater cost heterogeneity generally strengthens hiding's benefit, but small cost exponents and attack budgets combined with large defense budgets can make hiding harmful (Section IV.A).
- **IEEE 30-bus network:** 30 nodes and 41 links, with cost exponent 1 and hiding coefficients up to 0.5. The abstract reports about 22.8% average damage reduction under equal resource coefficients; Section IV.D describes approximately 23% higher defender payoff. These descriptions should not be treated as interchangeable relative-effect estimators. Benefits are larger when attack resources dominate defense resources.
- **Alternative metric:** replacing largest-component size with natural connectivity also yields benefits from hiding on the IEEE network, while changing equilibrium strategy choices.
- **Reconnection baseline:** under high-degree removal with half the links concealed or altered, Section IV.F reports robustness values 6.6 without deception, 9.9 with hiding, and 9.1 with random reconnection, averaged over 1,000 runs. The stated improvements over baseline are 50.0% and 37.8%; their difference is 12.2 percentage points, not a 12.2% relative improvement over reconnection.

## Limitations

The model assumes rational players, one round, perfect protection of defended nodes, and only two ranking-based strategies per side. It does not model an attacker learning hidden topology through probing or link prediction. The hiding coefficient is constrained by topology, and practical concealment costs are not included in the node-resource model. Structural connectivity results do not directly establish electrical operating reliability.

Part of the benefit comes from reducing the attack budget computed from the observed graph, rather than only changing target selection at a fixed absolute budget. The extracted text also has a normalization ambiguity: Eq. 12 defines an averaged robustness measure using component fractions, whereas the reported values exceed one. Preserve the reported comparison without interpreting those values as normalized fractions.

## Related Concepts

- [[concepts/stackelberg-games|Stackelberg Games]]: defender commitment, best responses, and leader-favorable tie breaking determine the equilibrium.

## Related Papers

- [[papers/nonlinear-dynamics-of-state-dependent-attacks-in-network-systems-a-stackelberg-game-approach|Nonlinear dynamics of state-dependent attacks in network systems: A Stackelberg game approach]]: another network-security application, using attacker-first commitment and bilinear dynamics rather than defender-first topology deception.
- Zeng et al., “Stackelberg game under asymmetric information in critical infrastructure system: From a complex network perspective” (2019), reference 24: supplies the random reconnection deception baseline.

Source: *Chaos* 32, 113109 (2022), [DOI](https://doi.org/10.1063/5.0112907).
