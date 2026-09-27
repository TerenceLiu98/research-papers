---
title: "Partisan Voter Model: Stochastic description and noise-induced transitions"
type: paper
authors:
  - Jaume Llabres
  - Maxi San Miguel
  - Raul Toral
year: 2023
source_job_id: 1f772205-0dd7-400e-b582-840e7e64b6a1
tags:
  - voter-model
  - opinion-dynamics
  - stochastic-processes
  - finite-size-effects
  - noise-induced-transitions
---

## TL;DR

Fixed preferences in the [[concepts/partisan-voter-model|Partisan Voter Model]] support deterministic coexistence, but finite populations without spontaneous flips eventually reach consensus. A small-preference reduction gives exit probabilities, consensus times, and a quasi-stationary distribution. Adding spontaneous flips produces finite-size transitions in stationary-distribution shape, including a discontinuous switch of the dominant peak and, for balanced preferences, trimodality. These noisy transitions disappear in the thermodynamic limit at fixed positive noise.

## Research Question

How do fixed individual preferences change stochastic consensus formation and the finite-size noise-induced transition of the [[concepts/noisy-voter-model|Noisy Voter Model]]?

## Motivation

Neutral imitation in the [[concepts/voter-model|Voter Model]] preserves average opinion in the ensemble. Partisan preferences instead select a deterministic population state. The paper asks how this selection competes with fluctuations, absorbing consensus states, and independent opinion changes. Distinguishing eventual absorption from long-lived coexistence is essential because deterministic and finite-population stochastic descriptions can yield different long-time outcomes.

## Contributions

- Revisits the deterministic partisan model and develops a stochastic reduction by eliminating a fast variable describing alignment with preferences.
- Derives approximate analytical exit probabilities and mean consensus times, checked against simulations and numerical recursions for the full model.
- Distinguishes the absorbing stationary law from the distribution conditioned on avoiding consensus, and explains the noncommuting large-population and long-time limits.
- Introduces spontaneous flips to obtain the noisy partisan voter model and maps symmetric and asymmetric stationary regimes, including continuous and discontinuous changes in the dominant mode.

## Method

The model has $N$ agents on a complete graph, binary states, and fixed preferences. A fraction $q$ prefers $+1$. At rate $h$, an agent selects a neighbor; if their states differ, adoption occurs with probability $(1+\varepsilon)/2$ when the new state matches the agent's preference and $(1-\varepsilon)/2$ otherwise. Preference strength is homogeneous. The analysis focuses on small positive $\varepsilon$; the zealot endpoint $\varepsilon=1$ is excluded. The noisy version additionally flips each agent independently at rate $a$.

Let $x_b^c$ be the fraction with state $b$ and preference $c$. The two macroscopic coordinates are

$$
\Delta=x_+^+-x_-^-,\qquad
\Sigma=x_+^++x_-^-,\qquad
m=1-2q+2\Delta.
$$

Here $\Sigma$ is the satisfied fraction and $m$ is magnetization. Consensus occurs at $\Delta=q-1$ or $q$. Without spontaneous flips, a stable interior coexistence solution exists for

$$
q_c^-<q<q_c^+,\qquad q_c^\pm=\frac{1\pm\varepsilon}{2},
$$

with

$$
\Delta^*=\frac{(1+\varepsilon)(2q-1)}{2\varepsilon},
\qquad \Sigma^*=\frac{1+\varepsilon}{2}.
$$

At the thresholds, this solution merges with a consensus point; outside them, the favored consensus is stable. For small $\varepsilon$, $\Sigma$ relaxes faster than $\Delta$. Substituting its nullcline into the transition rates yields an approximate one-dimensional birth-death process and a Fokker-Planck description. Backward equations give the exit probability in terms of the imaginary error function and consensus times through numerical integrals (Sections II.B and Appendices A-C).

Finite noiseless systems ultimately place all probability at the two absorbing endpoints, with weights given by the exit probabilities. The formal smooth stationary density is nonnormalizable. Conditioning on survival instead gives a quasi-stationary distribution, computed numerically from the reduced master equation in Appendix D. Taking $N\to\infty$ before $t\to\infty$ retains deterministic coexistence for interior initial states in the coexistence regime; reversing the limits yields consensus.

With $a>0$, consensus is no longer absorbing. The deterministic system has one stable fixed point, yet the finite-population stationary density may have several peaks. The reduced theory obtains this density from its drift and diffusion coefficients and classifies transitions by peak appearance, disappearance, and relative height (Section III and Appendix E).

## Experiments

The evidence is analytical and computational, with Gillespie simulations of the full model and no empirical voter data.

| Check | Setting and reported result |
| --- | --- |
| Exit probability | Figure 3 uses $N=1000$, $\varepsilon=0.05$, and several preference fractions. The reduced formula agrees well with simulations; even small increases above $q=0.5$ raise the probability of positive consensus. |
| Full-model recursions | Figure A1 uses $N=100$. Exit probabilities agree satisfactorily for preferences up to approximately $0.5$ in the authors' checks, whereas consensus times show systematic discrepancies at larger preferences. |
| Consensus-time scaling | Figure 5 supports exponential growth with $N$ inside the coexistence interval and logarithmic growth outside it. At the illustrated threshold $q=q_c^+=0.525$, the numerical scaling is consistent with $N^{1/2}$. |
| Quasi-stationarity | At $N=1000$, $\varepsilon=0.15$, the symmetric distribution peaks at zero. For $q=0.55$, its mode is approximately $0.393$, near but not equal to the deterministic value $0.383\ldots$ (Figure 6). |
| Symmetric noisy regimes | At $q=0.5$, $N=1000$, $\varepsilon=0.05$, Figure 10 compares noise ratios $a/h=0.00035$, $0.00045$, and $0.001$ with the reduced stationary density. Boundary-dominant trimodality gives way to center-dominant trimodality, followed by unimodality. |
| Asymmetric noisy regimes | For $q=0.6$, Figures 11-13 show five regimes. Depending on preference strength, increasing noise moves the dominant peak continuously from the favored boundary or switches it discontinuously to an interior peak. |

The asymmetric examples distinguish two parameter paths. Figure 12 fixes $q=0.6$ and $\varepsilon=0.1<2q-1$ and increases $a/h$, showing a continuous departure of the dominant mode from the favored consensus boundary. Figure 13 instead fixes $q=0.6$ and $a/h=0.0004$ and increases $\varepsilon$, passing through regions IV, V, I, and II; the dominant mode jumps only at the I-to-II transition. At finite $N$, an interior stationary mode need not coincide with the deterministic fixed point (Section III.B.2).

For the noiseless coexistence regime, the reduced large-$N$ consensus-time asymptotic is

$$
\tau\sim\exp\left[\frac{N\varepsilon^2}{2(1-\varepsilon^2)}
\left(1-\frac{|1-2q|}{\varepsilon}\right)^2\right].
$$

This expression applies to nonabsorbing initial states and does not describe the logarithmic regime outside the coexistence interval. For balanced preferences in the noisy model, the dominant-peak transition is discontinuous even though both sides can remain trimodal. The subsequent loss of boundary peaks is a separate boundary. The reported empirical scaling is $(a/h)_c=N^{-1}\Phi(N^{0.439}\varepsilon)$ and $(a/h)_c^*=N^{-1}\Phi^*(\varepsilon)$; $0.439$ is a fitted exponent. Both intermediate regions vanish as $N$ grows. With $\varepsilon=0$, the ordinary noisy-voter threshold is $a/h=1/(2N)$ under this paper's copying convention.

## Limitations

- The analysis assumes all-to-all interactions, binary states, immutable preferences, and a common preference strength. Structured networks and nonlinear interactions are proposed as future work; political behavior is not empirically calibrated.
- The one-variable stochastic theory uses adiabatic elimination and, for the diffusion description, a large-$N$ expansion. Its analytical results are not exact solutions of the full two-variable process. Consensus-time errors increase at larger preferences; the quasi-stationary computation also uses reduced rates.
- The finite-size noisy transitions are changes in a probability distribution despite a single deterministic attractor. They do not establish thermodynamic multistability. The reported scaling collapse does not establish a universal exact exponent.
- The supplied Markdown has inconsistent summary statements about symmetry, absorbing endpoints, and modality. This page follows Section II's endpoints $q-1,q$, its large-$N$ equal exit weights at $q=1/2$ for nonabsorbing initial states, and Section III's distinction between peak dominance and peak disappearance. The asymmetric quasi-stationary mode need not equal the deterministic fixed point.
- The source is dated November 8, 2023. No DOI, arXiv identifier, or publication venue is given in the supplied text, so none is inferred.

## Related Concepts

- [[concepts/partisan-voter-model|Partisan Voter Model]]
- [[concepts/voter-model|Voter Model]]
- [[concepts/noisy-voter-model|Noisy Voter Model]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]

## Related Papers

- Masuda, Gibert, and Redner (2010), "Heterogeneous voter models": earlier partisan-model work cited by the source.
- Masuda and Redner (2011), "Can partisan voting lead to truth?": earlier analysis of fixed preferences cited by the source.
- [[papers/polarization-induced-stress-in-the-noisy-voter-model|Polarization-induced stress in the noisy voter model]]: a related Wiki paper that changes the spontaneous-flip rate with opinion balance; it provides a distinct mechanism for additional stationary modes.

[[index|Library home]]
