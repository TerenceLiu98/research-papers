---
title: On the optimal integration of intelligent agents into network systems to steer cooperation
type: paper
authors:
  - Feng Fu
  - Xingru Chen
  - Nicholas A. Christakis
year: 2026
tags:
  - evolutionary-game-theory
  - cooperation
  - human-ai-interaction
---

## TL;DR

Randomly embedding a moderate fraction of fixed-policy bots can maximize cooperation among payoff-imitating individuals on regular networks. Both neutral and prosocial bots produce an intermediate optimum in the studied settings: bots initially shield cooperators but eventually obstruct the interactions and imitation pathways that sustain cooperation. Prosocial bots require a smaller critical presence than neutral bots.

## Research Question

How do the prevalence and local influence of embedded agents affect fixation and long-run cooperation in a hybrid network, and when does an intermediate deployment maximize cooperation?

## Motivation

Interventions embedded within social networks change incentives while leaving ordinary individuals free to adapt. Optimizing these interventions requires accounting for both local payoff effects and the loss of ordinary social contacts as bots occupy more nodes.

## Contributions

- Extends evolutionary graph modeling with a fixed third node type that supplies behavior-dependent payoffs.
- Derives weak-selection fixation and low-mutation cooperation predictions using an extended pair approximation.
- Distinguishes the minimum bot fraction needed to favor cooperation from the fraction maximizing cooperation, comparing neutral and TFT-like policies.

## Method

Ordinary nodes play C or D in a symmetric two-strategy game with payoffs R, S, T, P. Bots occupy randomly selected nodes with prevalence $p_e$ and contribute $\alpha_C$ to cooperating neighbors and $\alpha_D$ to defecting neighbors. Neutral bots have both contributions zero; TFT-like bots use $\alpha_C=R$ and $\alpha_D=P$. Here intelligence means executing a prescribed policy, not general cognition.

The base model uses death-birth social imitation: a randomly selected ordinary individual copies an ordinary neighbor with probability proportional to exponential fitness $\exp(\beta\pi)$ based on accumulated payoff. Bots affect payoffs but are not imitated. Their positions and policies remain fixed. Closed-form analysis focuses on degree-$k$ regular graphs and weak selection.

If $\rho_C$ and $\rho_D$ are single-mutant fixation probabilities within the ordinary subpopulation, the low-mutation abundance is

$$
\lambda_C=\frac{\rho_C}{\rho_C+\rho_D}.
$$

This measures cooperation among ordinary individuals, excluding bots. The approximation combines a selection term quadratic in bot prevalence with a declining factor reflecting the number of ordinary neighbors available for imitation (Equations 3–5).

For donation games with benefit $b$ and cost $c$, the critical prevalence is

$$
p_e^*=\max\left\{0,\frac{(c/b)k-1}{k-1}\right\}
$$

for TFT-like bots, and

$$
p_e^*=\max\left\{0,\frac{(c/b)k-1}{(c/b)(k-1)}\right\}
$$

for neutral bots. These are thresholds for favoring cooperation, not optimal deployment fractions. Beyond the threshold, excessive bot presence can impede cooperator clustering and strategy transmission.

## Experiments

Figure 2 compares predictions with simulations on random regular graphs of 800 nodes and degree 4, with selection strength 0.002 and mutation rate 0.0001. Normalized donation-game payoffs are $R=1$, $S=-0.4$, $T=1.4$, and $P=0$. Each bot-placement realization is averaged over four billion time steps, then across 40 independent realizations; error bars show standard deviations.

The text locates the cooperation maximum at bot fractions around 0.4–0.5 for this example, with TFT-like bots reaching their optimum below neutral bots. Agreement deteriorates especially above a bot fraction of 0.5. Figure 3 compares critical and optimal prevalence as cost-to-benefit ratios vary. Supplementary results are reported for lattices, snowdrift games, heterogeneous networks, and LLM-powered policies with random or targeted placement; the supplied Markdown does not include those supplementary experimental details.

## Limitations

Analytical predictions rely on weak selection, rare mutation, pair approximation, and a sufficiently large ordinary population. High bot prevalence undermines the large-population approximation. Real human strategy updating need not follow payoff-based imitation; these results are theoretical and simulated, not a human-subject demonstration. Optimal fractions depend on game payoffs, policy, and network structure and should not be generalized into a universal deployment quota.

The main source reports supplementary LLM extensions without providing their full protocols here. The parsed text contains corrupted mathematical symbols; only unambiguous expressions are retained. It establishes a 2026 acceptance date but supplies no stable identifier for this paper.

## Related Concepts

- [[concepts/hybrid-human-ai-societies|Hybrid Human-AI Societies]]: heterogeneous populations in which embedded agents alter collective behavior.
- [[concepts/network-games|Network Games]]: local interaction structure shapes payoffs and strategic adaptation.

## Related Papers

- [[papers/evolutionary-games-on-networks-with-negative-edge-based-environmental-feedback|Evolutionary games on networks with negative edge-based environmental feedback]]: a library comparison using pair approximation for cooperation, but with changing edge environments rather than fixed bot nodes.
- [[papers/the-butterfly-defects-tracing-cooperation-in-llm-agent-networks|The Butterfly Defects: Tracing Cooperation in LLM Agent Networks]]: a library comparison of cooperation in LLM populations; its prompt-driven behavior differs from the base model's payoff imitation.
- Ohtsuki et al. (2006), “A simple rule for the evolution of cooperation on graphs and social networks”: source reference 62 and the bot-free analytical benchmark.

The source lists simulation code at https://github.com/fufeng/multiLLM.
