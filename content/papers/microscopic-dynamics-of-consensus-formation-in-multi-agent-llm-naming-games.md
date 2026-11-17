---
title: Microscopic dynamics of consensus formation in multi-agent LLM Naming Games
type: paper
authors:
  - Cristiano De Nobili
  - Vijayasri Iyer
  - Alessandro Codello
  - Raffaella Burioni
year: null
tags:
  - naming-game
  - llm-agents
  - statistical-physics
---

## TL;DR

Two conditional listener acceptance rates connect LLM decisions to consensus in an inventory-based [[concepts/naming-game|Naming Game]]. Three models exhibit permissive, near-deterministic, and conservative regimes. A two-word mean-field approximation predicts ordering when $3\pi-2\phi-1>0$, while temperature effects also depend on evolving inventories.

## Research Question

How does decoding temperature change microscopic decisions and thereby alter the speed and population-size scaling of decentralized convention formation?

## Motivation

Population agreement alone does not identify its mechanism. Temperature can change erroneous acceptance, missed consolidation, or neither, depending on the model.

## Contributions

- Separates in-inventory acceptance from out-inventory acceptance.
- Derives a two-word ordering threshold and an arbitrary-vocabulary mean-field hierarchy with an approximate inventory-size closure.
- Measures architecture-dependent temperature responses and effective finite-size scaling.

## Method

Agents on a complete graph start with empty inventories. A random speaker selects a stored word, inventing from 10,000 English words when empty. The listener receives its inventory and the proposed word and produces a single YES/NO token. YES collapses both inventories to the proposed word; NO adds it to the listener's inventory. The fixed prompt asks whether to add the word. Strict consensus means one distinct word remains population-wide.

The rates are $\pi=P(\mathrm{YES}\mid w\in P_j)$ and $\phi=P(\mathrm{YES}\mid w\notin P_j)$. An in-inventory NO misses a collapse; an out-inventory YES repaints the listener. With $m$ the probability of inventory membership, $\Delta=m\pi-(1-m)\phi$ is a phenomenological drift proxy, not an exact diversity change. Rare repaints can help escape late deadlocks.

For constant rates and two words, fractions $x,y,z$ hold A, B, and both. The imbalance $u=x-y$ satisfies

$$
\dot u=\frac{z}{2}(3\pi-2\phi-1)u.
$$

Ordering amplifies an imbalance when $3\pi-2\phi-1>0$. At $\phi=0$, the threshold is $\pi_c=1/3$. The constant-rate infinite-population approximation does not guarantee finite-run convergence.

## Experiments

Ollama serves llama3.1:8b, mistral:7b, and phi3:14b. Population sizes are 50, 70, 90, 110, and 150; eleven temperatures span 0.05–2.0. Configurations use 10–15 seeds and horizons of 100,000 interactions, extended to 175,000 for Phi-3. Consensus-time plots show medians and interquartile ranges, with censored outcomes marked as lower bounds.

| Model | Regime | Mean effective $\beta$ in $t_c\sim N^\beta$ | Mean fitted $\alpha$ in $t_c\sim e^{\alpha T}$ |
| --- | --- | --- | --- |
| Llama 3.1 8B | Permissive, repaint dominated | $1.61\pm0.28$ | $0.67\pm0.14$ |
| Mistral 7B | Near deterministic | $1.28\pm0.13$ | $0.01\pm0.02$ |
| Phi-3 14B | Conservative, missed collapses | $1.59\pm0.47$ | $0.43\pm0.31$ |

Llama's consolidation acceptance falls from approximately 1 to 0.55 as temperature rises; early repaint acceptance reaches about 0.50 at temperature 2. Its fitted temperature response implies roughly fourfold slowing over a temperature increase of 2. Mistral approaches $(\pi,\phi)=(1,0)$ with little temperature sensitivity.

Phi-3's consolidation acceptance falls from about 0.75 to 0.30 while repaint acceptance stays near zero. At $N=150$, low-temperature inventories reach roughly 34 words per agent, versus fewer than roughly 4 at high temperature. The illustrated high-temperature trajectories converge faster despite lower acceptance (Figures 5–6). This inversion differs from the positive aggregate temperature-fit coefficient reported in Section VI; the source does not fully reconcile the summaries.

## Limitations

The narrow population-size window supports effective exponents, not established universality classes. Phi-3 shows substantial censoring and path dependence; the authors describe its exponent as a lower bound. Prompt rewordings are not systematically tested. The rate pair averages over word identity, inventory size, and heterogeneity and is not a complete microscopic description.

The source's claim that consensus is always reached coexists with explicit runs that do not converge within the horizon. Consensus occurring at each tested temperature should not be read as every seed completing. Section VI says Phi-3's uncertainty overlaps zero, although its printed $0.43\pm0.31$ interval does not. No fragmented phase is demonstrated, even where plateau rates cross the theoretical critical line.

The supplied Markdown does not establish this paper's publication year or stable identifier; these remain unspecified.

## Related Concepts

- [[concepts/naming-game|Naming Game]]: inventory learning and collapse form the baseline.
- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]: selection of the winning convention complements the convergence mechanisms studied here.

## Related Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]]: source reference 14 studies memory-conditioned binary coordination and attraction basins, whereas this paper retains inventory updates and varies temperature.
- Baronchelli, Dall'Asta, Barrat, and Loreto (2007), Physical Review E 76, 051102: source reference 7 supplies the stochastic negotiation model recovered at $\phi=0$.
- Ashery, Aiello, and Baronchelli (2025), Science Advances 11, eadu9368: source reference 11 studies emergent conventions and collective bias.
