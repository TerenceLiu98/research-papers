---
title: Predictability of Collective Behavior in Networks of LLM Agents
type: paper
authors:
  - Fabian Baumann
  - Michele Starnini
year: null
tags:
  - llm-agents
  - network-dynamics
  - social-contagion
---

[[index|Library home]]

## TL;DR

Measuring an LLM agent's sharing probability separately for the number of sharing neighbors and its total degree predicts information cascades in the studied synthetic networks. Replacing these measurements with a fraction-only response can substantially mispredict cascade size and tipping seeds. Network statistics alone cannot correct the error because its magnitude and direction also depend on the post-specific response.

## Research Question

Which features of an individual agent's local environment must be measured to predict collective information spreading?

## Motivation

Single-agent behavior can be probed directly, but responses measured in well-mixed groups need not transfer to networks with heterogeneous degrees. Equal fractions of sharing neighbors can describe different decision contexts: two of ten contacts and twenty of one hundred need not induce equal sharing probabilities.

## Contributions

- Measures post-specific, degree-resolved sharing probabilities and connects them to network cascade theory.
- Converts repeated independent decisions into an effective monotone adoption response, allowing a hidden-threshold interpretation.
- Compares full LLM simulations, probabilistic replacements, and mean-field predictions against degree-blind alternatives.
- Derives a first-order averaging-error expansion showing how response deviations are amplified near tipping points.

## Method

Agents use `mistral:7b` through Ollama at temperature 0.3, with a fixed engagement-oriented prompt and no memory. For each post and measured pair $(m,k)$, 200 queries estimate $f(m,k)$, the probability of sharing given $m$ sharing contacts among $k$ neighbors. Measurements cover 147 degrees between 1 and 155. Nonanswers are retried; after five consecutive nonanswers, the decision is sampled uniformly.

Randomly chosen seeds share initially. Sharing is irreversible; agents reconsider only when exposure increases. If several neighbors share in one round, every intermediate exposure level is evaluated until adoption. Consequently (Eq. 2),

$$
F_{\mathrm{eff}}(m,k)=1-\prod_{j=1}^{m}[1-f(j,k)],\qquad F_{\mathrm{eff}}(0,k)=0.
$$

This cumulative response is monotone even when the single-decision response is not. A tree-based mean-field calculation averages it over binomial neighbor counts, weighting degrees by $kp_k/\langle k\rangle$ along edges and by $p_k$ for final population size. The smallest fixed point determines the cascade reached from the seeds. The calculation assumes locally tree-like networks and uncorrelated neighboring degrees.

The degree-blind baseline averages interpolated response curves at equal fractions $m/k$, assigning each observed degree equal weight. Alternative baselines use agent or neighbor weights, or the response measured at degree 155. The first-order error contains both a direct response change and propagation amplified by susceptibility $1/(1-G')$; it is not reliable when the two cascades differ by order one.

## Experiments

Four political posts are tested on 1,000-agent Erdős–Rényi networks with mean degrees 2 and 5 and Barabási–Albert networks with three links per arriving node. Full LLM experiments generally use 100 cascades at 12 seed fractions; the gun-right BA case uses nine. Monte Carlo replacements use 500 cascades at each of 25 seed fractions between 0.005 and 0.30.

- **Context matters:** sharing probability for two of ten contacts is at most 0.01, versus 0.20–0.94 for twenty of one hundred, depending on the post (Section 2.3).
- **Content changes error direction:** for gun-right on sparse ER networks, degree averaging underpredicts final size by up to about 0.5; it generally overpredicts for the other combinations.
- **Weighted averages remain imperfect:** Table S2 reports mean absolute cascade-size errors across twelve post–network cases of 0.140 for plain averaging, 0.090 for agent weighting, and 0.076 for neighbor weighting. These are mean-field comparisons, not errors against full LLM simulations.
- **Heterogeneity amplifies plain-averaging error:** controlled rewiring at fixed mean degrees 6, 7, 9, and 12 yields positive rank correlations of 0.89–1.00 across all sixteen post-by-degree sweeps. Weighted averages have exceptions to this trend (Section S8).
- **Tipping shifts:** on ER mean degree 5, first-order predicted shifts are 0.027, 0.023, 0.013, and 0.035 for migration-stopped, police-defunded, gun-right, and migration-limited, respectively; Monte Carlo shifts are 0.026, 0.023, 0.013, and 0.039 (Table S4).

The degree-resolved response closely reproduces full LLM cascades, with some earlier spreading in the LLM runs for police-defunded and migration-limited.

## Limitations

Evidence covers one model, one prompt, four posts, memoryless agents, and synthetic networks. Rewording robustness is untested. Police-defunded on both ER networks is actually closer to the degree-averaged cascade than the degree-resolved one. Finite-size effects smooth transitions, and clustering violates the tree approximation. The first-order expansion overestimates one continuous-transition error by about 34% and fails for widely separated cascades. Measuring responses costs about two million queries per post; transfer requires coverage of the destination network's degrees. Memory, personas, and richer messages require additional conditioning rather than automatic reuse of this response.

The supplied Markdown does not explicitly identify this manuscript's publication year or stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/threshold-contagion|Threshold Contagion]]: the repeated-exposure protocol induces a degree-dependent random threshold.
- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]: population outcomes depend on interaction-conditioned behavior.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: predictive agreement within artificial populations does not establish human behavioral validity.

## Related Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]]: cited as a well-mixed population study linking individual policies to collective outcomes; this paper instead resolves local network degree.
- [[papers/contagion-in-graphons|Contagion in graphons]]: a complementary library connection on irreversible threshold propagation and seeding, using continuum network models rather than measured LLM responses.
