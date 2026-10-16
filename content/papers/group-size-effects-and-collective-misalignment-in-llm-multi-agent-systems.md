---
title: Group size effects and collective misalignment in LLM multi-agent systems
type: paper
authors:
  - Ariel Flint
  - Luca Maria Aiello
  - Romualdo Pastor-Satorras
  - Andrea Baronchelli
year: null
tags:
  - llm-agents
  - collective-bias
  - population-size
  - naming-game
  - nonlinear-dynamics
---

## TL;DR

In a binary [[concepts/naming-game|Naming Game]], interactions among homogeneous LLM agents can amplify, create, or reverse initial word preferences. Across four models and eleven word pairs, increasing population size generally makes the selected convention more predictable, with strongly model-dependent thresholds and some persistent non-consensus cases. Cached LLM policies and a mean-field model connect these outcomes to memory-dependent behavior and competing basins of attraction.

## Research Question

How does population size change the direction, strength, and convergence dynamics of [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]], beyond comparisons between one agent and a single fixed-size group?

## Motivation

Single-agent neutrality does not establish neutrality after interaction. Evaluations at one group size can also miss reversals or persistent mixed states that occur at another size. The paper uses a controlled coordination task to isolate this dependence on scale, without instructing agents to seek population-wide consensus.

## Contributions

- Distinguishes amplification, induction from neutrality, and reversal of individual bias in collective coordination outcomes.
- Maps population-size effects on consensus probability and consensus-time distributions across four LLMs and eleven word pairs.
- Uses precomputed memory-conditioned policies to simulate populations beyond the practical scale of repeated model calls.
- Derives mean-field equations and analyzes equilibrium stability on the probability simplex to explain large-population behavior.

## Method

Randomly selected pairs simultaneously choose one of two words. Matching choices earn each agent 100 points; mismatches cost each 50 points. Each agent remembers its last $H=5$ interactions, including both choices and resulting scores. Agents start with empty memories, receive no population-level information, and use policies from the same underlying model within each population. One population round consists of $N$ pairwise interactions.

For every possible memory state $M$, the authors extract and normalize next-token probabilities over the two permitted words. Simulated agents sample from the cached policy $q(M)$ instead of generating text at every interaction. There are $(4^{H+1}-1)/3$ possible memory states, including partially filled memories. The prompt requests the answer before its explanation and randomizes option order. The principal temperature is 0.5; the open-weight models are run with 4-bit quantization.

Individual bias is the empty-memory selection probability. Neutrality means a Jensen-Shannon distance below 0.005 from the uniform distribution. Collective bias measures how frequently a convention becomes the consensus outcome across runs; the empirically favored outcome is called the strong word. Runs stop after 1,000 population rounds or when at least 98% of the previous $3N$ interactions successfully coordinated. This operational stopping rule differs from exact absorbing consensus.

Writing $x_k$ for the fraction of agents in memory state $k$ and $P_k(i,j)$ for a focal agent's transition probability after interaction, the mean-field equation is

$$
\frac{dx_k}{dt}=-x_k+\sum_{i,j}x_i x_jP_k(i,j).
$$

Its time coordinate absorbs a factor of two relative to the pair-interaction derivation in the supplement. Stability is evaluated with a reduced Jacobian respecting $\sum_k x_k=1$. Both homogeneous equilibria can be stable, so preference for one outcome need not imply instability of the other. The basins reached from initially empty memories also matter.

## Experiments

The models are Microsoft Phi-4, OpenAI GPT-4o, Qwen QwQ-32B, and Meta Llama 3.1 70B Instruct. The eleven word pairs include gender, nationality, racial, and other contrasting terms. Figures 1-2 use $N=24$ and 1,000 runs per condition; Figure 4 constructs consensus-time distributions from 100,000 observations.

| Finding | Reported evidence |
| --- | --- |
| Individual and collective preferences diverge | Figure 1 illustrates amplification for American/Mexican, induction for White/African, and reversal for straight/gay in Llama and GPT populations. |
| Similar initial tendencies can yield opposing conventions | Qwen and Phi favor her collectively, whereas GPT and Llama favor his (Figure 2). |
| Scale thresholds vary substantially | Llama on short/tall is already deterministic at $N=2$; Qwen on Black/White retains finite-size effects up to roughly $10^4$ agents (Figure 3). |
| Reversal can require a minimum size | Llama initially prefers straight, but collective preference reverses toward gay for $N\geq6$. |
| Larger populations do not universally reach consensus | Large Llama populations on old/young and less/more, and a small fraction of small Qwen populations on husband/wife, fail to converge within the run limit (Figures S4-S8). |

Small populations often reach either convention rapidly through early fluctuations. Intermediate sizes exhibit prolonged mixed states and consensus-time distributions with heavy right tails. In sufficiently large populations that reach consensus, trajectories concentrate on the strong word and a characteristic convergence time. The authors report deterministic selection above model-and-word-specific thresholds; this is an empirical simulation result supported by the mean-field limit, not proof that every finite population has zero probability of the alternative outcome.

Policy validation compares direct generation with cached-policy simulations for Phi on her/his and husband/wife and Llama on straight/gay (Figure S2). Direct-generation points use 50 runs, or 20 for Llama, versus 1,000 simulation runs. For Phi on his/her with $H=3$, 1,000 generations per full memory state yield significant differences in 4 of 64 binomial tests at the 5% level; reported deviations preserve preference direction (Figure S3).

## Limitations

The design tests homogeneous populations, binary actions, random local pairing, finite memory, and a fixed coordination payoff structure. It does not establish the same scale effects for heterogeneous agents, open-ended tasks, other networks, or real-world collusion and deception. Bias here is an imbalance between equally rewarded conventions, not a direct measurement of discriminatory conduct or general alignment failure.

Cached policies are conditional on the chosen prompts, decoding setup, and model implementations. Direct-generation validation covers selected cases rather than all model-word combinations. The finite stopping horizon requires reporting convergence failures alongside convention frequencies. The discussion claims temperature robustness, but the supplied supplement does not provide a detailed temperature sweep.

The supplied Markdown does not state this paper's publication year, venue, DOI, or arXiv identifier. These are left unspecified rather than inferred from its references.

## Related Concepts

- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]: divergence between isolated preferences and interaction-generated outcomes.
- [[concepts/naming-game|Naming Game]]: local coordination as a mechanism for convention formation.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: competing stable attractors provide a relevant framework; this paper does not demonstrate a hysteresis loop.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: helps distinguish experiments on artificial populations from validated claims about human societies.

## Related Papers

- Flint Ashery, Aiello, and Baronchelli (2025), *Emergent social conventions and collective bias in LLM populations*, Science Advances 11(20), eadu9368 (source reference 21): the immediate empirical precursor, extended here through population-size sweeps and analytical modeling.
- Baronchelli et al. (2006), *Sharp transition towards shared vocabularies in multi-agent systems*, Journal of Statistical Mechanics, P06014 (source reference 35): the minimal naming-game baseline.
- De Marzo, Castellano, and Garcia (2024), *AI agents can coordinate beyond human scale*, arXiv:2409.02822 (source reference 24): studies globally informed agents, a different information structure from local-memory coordination here.
- [[papers/multi-agent-strategic-games-with-llms|Multi-Agent Strategic Games with LLMs]]: a library comparison, not a source citation, that also varies agent count in a controlled game but studies conflict rather than naming conventions.

[[index|Library home]]
