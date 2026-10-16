---
title: Naming Game
type: concept
tags:
  - convention-formation
  - agent-based-models
  - coordination
---

## Overview

The naming game studies how a shared convention can emerge through local interactions without centralized agreement. Agents propose names and update their internal states based on exchanges. The precise update rule determines whether names spread, coexist, or converge to consensus.

## Key Ideas

- **Classical inventory dynamics.** In the minimal model described by Baronchelli et al., a speaker selects a stored word, or invents one if its inventory is empty. A hearer who recognizes the word and the speaker both retain only that word; otherwise the hearer adds it to its inventory.
- **Binary variants isolate selection.** Restricting the vocabulary to two alternatives makes it possible to measure which convention wins across repeated runs. Fixed selection bias in an inventory model differs from history-dependent LLM choice probabilities.
- **LLM coordination is a distinct implementation.** In Flint et al.'s version, both agents choose simultaneously, receive matching or mismatching payoffs, and retain a bounded interaction history. The model uses conditional word probabilities rather than the classical inventory deletion rule.
- **Local incentives can produce global agreement.** Agents need not know the population state or be told to achieve consensus. Repeated pairwise coordination can suffice under suitable rules.
- **Finite populations and mean-field limits answer different questions.** Simulations reveal fluctuation-driven outcomes and convergence-time distributions. Mean-field equations describe population fractions in the large-system limit and permit stability analysis.
- **Define consensus operationally.** A threshold on recent successful interactions is different from exact equality of every agent's state or an absorbing equilibrium.

## Important Papers

- Baronchelli et al. (2006), *Sharp transition towards shared vocabularies in multi-agent systems*, Journal of Statistical Mechanics, P06014: the minimal naming-game model cited by Flint et al.
- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]] uses a binary, finite-memory LLM version to study population-size effects and collective bias.

## Related Concepts

- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]: convention frequencies can diverge from initial agent preferences.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: attraction basins help interpret competing stable consensus states, without implying that every naming game exhibits hysteresis.
