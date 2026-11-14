---
title: "When Is Collective Intelligence a Lottery? Multi-Agent Scaling Laws for Memetic Drift in LLMs"
type: paper
authors:
  - Hidenori Tanaka
year: null
tags:
  - multi-agent-systems
  - convention-formation
  - stochastic-processes
---

[[index|Library home]]

## TL;DR

Quantized Simplex Gossip (QSG) explains how agents learning from one another's sampled outputs can develop consensus without any initially preferred answer. Exact variance identities and approximate scaling laws connect this memetic drift to population size, message bandwidth, and adaptation strength; controlled GPT-4o and Claude Haiku 4.5 naming games show matching scaling trends.

## Research Question

When does agreement among interacting LLMs reflect random convention selection, and when does a weak systematic bias determine the winner?

## Motivation

Consensus in a task without ground truth need not demonstrate information aggregation. A neutral stochastic baseline helps distinguish sampling-driven agreement from bias amplification in a [[concepts/naming-game|Naming Game]].

## Contributions

- Introduces QSG, separating continuous agent beliefs from discrete communication and listener adaptation.
- Derives exact one-step polarization identities showing how message sampling adds variance.
- Develops mean-field consensus-time scaling and a diffusion approximation for the drift–selection crossover.
- Tests population-size and bandwidth predictions in simulations and two LLM families.

## Method

Each of N agents holds a distribution over K labels. A uniformly sampled ordered speaker–listener pair interacts, and only the listener updates:

$$x_L'=(1-\alpha)x_L+\alpha y.$$

Hard communication sends one sampled label; Top-m sends the empirical distribution of m independent draws with replacement; Soft sends the full distribution. Here Top-m does **not** mean selecting the highest-probability labels. All three channels have the same conditional mean.

With population mean $\bar x$, polarization $U=\|\bar x\|^2$, and disagreement $V=\sum_i\|x_i-\bar x\|^2$, the exact identity is

$$
\mathbb E[\Delta U\mid X]
=\frac{2\alpha^2V}{N^2(N-1)}
+\frac{\alpha^2}{mN^2}\left(1-U-\frac VN\right).
$$

The second term disappears for Soft exchange. At uniform identical initialization, finite-bandwidth communication produces drift $\alpha^2(1-1/K)/(mN^2)$, while Soft leaves the state unchanged. The population mean is conserved in expectation, not on every trajectory.

Assuming approximately homogeneous agents yields a characteristic time $mN^2/\alpha^2$ in interactions, or $mN/\alpha^2$ in population rounds. For two labels and weak speaker-channel bias h, the diffusion approximation uses $\Gamma_h=mNh/\alpha$; from symmetric initialization the fixation probability is approximately $(1+e^{-\Gamma_h})^{-1}$. Larger N or m makes the same bias more decisive by suppressing drift.

## Experiments

- **QSG simulations:** typically N=24 and K=10; comparisons of Hard, Soft, and Top-m, including direct Monte Carlo checks of the excess-drift identity and inverse-bandwidth scaling (Figure 6).
- **Population-size sweep:** GPT-4o and Claude Haiku 4.5, K=3, N in {2,3,4,6,8,12,16,24,32}, five trials per point, and 30N interactions. Figure 8 reports early drift near $N^{-2}$ and consensus time near $N^2$ in interactions, with one fitted effective adaptation rate per model shared across N.
- **Bandwidth sweep:** GPT-4o, N=4, K=10, m in {1,2,3,4}, ten trials per setting, and 120 interactions. Early drift follows the predicted inverse-m trend (Figure 9).

The Neutral Naming Drift protocol uses memory length 10, shuffled synthetic labels, no external reward, and delayed reveal of the speaker's current output. Probes measure behavior without entering memory. Consensus is operationalized at U ≥ 0.9; reported time-to-consensus aggregates runs also above threshold at the horizon.

## Limitations

QSG assumes well-mixed interactions and a scalar linear adaptation rule. Its fitted effective adaptation rate does not establish that actual LLM belief updates follow that rule. Mean-field time scaling and diffusion fixation probabilities are approximations, distinct from the exact drift identities. Finite-time absorption is proved for Hard copying at α=1; the paper does not prove finite-time or almost-sure absorption for α<1. Heterogeneity and large updates can produce deviations from the mean-field curve.

Finite probe samples make empirical polarization noisy, and conditioning consensus-time summaries on successful runs limits their interpretation. The controlled naming task supports conclusions about convention formation, not accuracy improvements or human social behavior. The supplied manuscript does not state its publication year or a stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/memetic-drift|Memetic Drift]]
- [[concepts/naming-game|Naming Game]]
- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]
- [[concepts/voter-model|Voter Model]]

## Related Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]]: cited precursor on population-size-dependent convention selection; QSG develops a sampling-noise baseline for interpreting such effects.
- [[papers/who-is-the-influencer-consensus-dynamics-in-multi-agent-systems|Who Is the Influencer? Consensus Dynamics in Multi-Agent Systems]]: complementary library work on heterogeneous model influence, whereas QSG isolates neutral sampling and weak asymmetry.
