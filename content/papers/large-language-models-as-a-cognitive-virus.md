---
title: Large-Language Models as a Cognitive Virus
type: paper
authors:
  - Ricard Sole
  - Giulio Rufini
  - Francesca Castaldo
  - Marco Tuccio
  - Luis F. Seoane
  - Manlio de Domenico
  - Santiago F. Elena
  - David C. Krakauer
  - Michael Levin
year: null
tags:
  - human-ai-interaction
  - cognitive-offloading
  - nonlinear-dynamics
  - technological-adoption
---

## TL;DR

A three-state population model shows how socially transmitted LLM use and collective reinforcement of independent cognition can produce [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]], making adoption easier to sustain than to reverse. The associated losses in unaided cognitive competence are conditional on illustrative state weights, not measured effects or inevitable consequences of LLM use. The viral analogy concerns propagation and persistence within a human-technology ecology; the equations model human coupling states, not reproduction of LLM lineages.

## Research Question

Under what conditions can gradual changes in the pressure to adopt LLMs cause discontinuous, history-dependent changes in human cognitive coupling, and which interventions change the tipping thresholds versus the prevalence of dependence among users?

## Motivation

LLMs actively produce and evaluate information, making [[concepts/cognitive-offloading|Cognitive Offloading]] central to their use. Immediate task performance can improve while subsequent unaided competence follows a different trajectory. The paper distinguishes scaffolding, which preserves or develops independent capacity, from substitution, which displaces its exercise. It asks how social learning and institutions that support independent reasoning interact at population scale.

## Contributions

- Formulates transitions among uncoupled or weakly coupled people, autonomous LLM users, and persistently dependent users.
- Derives a physically accessible bistable interval when collective reinforcement of autonomy exceeds the baseline return rate to uncoupled cognition.
- Separates the adoption bifurcations from an assumed mapping between user states and unaided competence.
- Distinguishes interventions that reshape the tipping landscape from those that reduce dependence within an already coupled population (Section IV and Table I).

## Method

The mean-field model uses fractions $U$, $C$, and $D$, with $U+C+D=1$:

$$
\begin{aligned}
\dot U &= -\lambda UC+\rho C+\kappa U^2C,\\
\dot C &= \lambda UC-(\mu+\rho)C+\sigma D-\kappa U^2C,\\
\dot D &= \mu C-\sigma D.
\end{aligned}
$$

Here $\lambda$ is effective social or institutional transmission pressure, $\rho$ governs return from regular use to uncoupled cognition, $\mu$ governs progression to dependence, and $\sigma$ governs recovery to autonomous use. The cooperative term $\kappa U^2C$ assumes that independent cognitive practices become more effective at restoring autonomy when uncoupled people are common. These are aggregate transition rates, not individually identified psychological mechanisms (Section II, Equations 1-3).

Alongside the uncoupled equilibrium $(1,0,0)$, coupled equilibria satisfy

$$
U_\pm^*=\frac{\lambda\pm\sqrt{\lambda^2-4\kappa\rho}}{2\kappa},\qquad
C_\pm^*=\frac{\sigma}{\mu+\sigma}(1-U_\pm^*),\qquad
D_\pm^*=\frac{\mu}{\mu+\sigma}(1-U_\pm^*).
$$

For positive rates and $\kappa>\rho$, the stable lower-$U$ coupled branch and uncoupled equilibrium coexist between

$$
\lambda_{\mathrm{SN}}=2\sqrt{\kappa\rho}
<\lambda<
\lambda_{\mathrm{TC}}=\rho+\kappa.
$$

An unstable branch separates their basins. Increasing transmission destabilizes the uncoupled equilibrium at the upper threshold; reversing from the coupled branch requires crossing the lower threshold. The hysteretic width is $(\sqrt{\kappa}-\sqrt{\rho})^2$. For $\kappa<\rho$, the formal saddle-node is outside the physical simplex and adoption changes continuously; $\kappa=\rho$ marks the boundary.

Section III assigns unaided competence weights through $\langle\Gamma\rangle=\Gamma_uU+\Gamma_cC+\Gamma_dD$. With $\Gamma_u=1$, equilibrium competence is $g+(1-g)U^*$, where $g=(\Gamma_c\sigma+\Gamma_d\mu)/(\mu+\sigma)$. Its direction of change depends on the weights. A quartic effective potential additionally illustrates the equilibria under a reduction in which $C$ and $D$ rapidly relax to their quasi-equilibrium ratio.

## Experiments

The paper reports analytical results and illustrative numerical diagrams, with no original human experiment, fitted adoption dataset, or empirical calibration of competence weights.

Figures 2-3 use $\rho=0.10$, $\kappa=0.40$, $\mu=0.20$, and $\sigma=0.10$. The saddle-node threshold is $0.40$ and the transcritical threshold is $0.50$. Assuming $(\Gamma_u,\Gamma_c,\Gamma_d)=(1,0.5,0.1)$ gives $g=7/30$. Along the quasistatic adoption path, equilibrium competence drops from $1$ to approximately $0.425$ at the upper threshold. Along the reverse path, the coupled branch reaches approximately $0.617$ at the lower threshold before returning to $1$. These are model outputs under the stated assumptions.

The intervention analysis finds that increasing $\rho$ raises resistance to invasion and removes bistability when $\rho\geq\kappa$. Increasing $\kappa$ raises the invasion threshold but also widens hysteresis when $\kappa>\rho$. By contrast, lowering $\mu$ or raising $\sigma$ reduces the dependent share among coupled users, $D^*/(C^*+D^*)=\mu/(\mu+\sigma)$, without moving the two thresholds. The authors interpret these distinctions as routes to cognitive immunization compatible with beneficial LLM use.

## Limitations

The homogeneous mean-field formulation omits network heterogeneity, spatial structure, and adaptive behavioral feedback. It imposes discrete states and a particular quadratic restoration term; dependence arises through regular use rather than directly from the uncoupled state. The model does not explicitly describe the replication or evolution of technological lineages.

Competence is an illustrative readout of the population state, not a measured or dynamically learned quantity. Scaffolding could preserve or improve it, and total human-AI capability differs from unaided human competence. Bifurcations establish possible equilibrium changes, not their real-world speed or inevitability. Proposed interventions are interpretations of parameter changes rather than evaluated programs.

The supplied Markdown contains extraction artifacts and refers to supplementary derivations that are not included. It supplies no explicit publication year, venue, or stable identifier for this paper; the year is therefore left unknown.

## Related Concepts

- [[concepts/cognitive-offloading|Cognitive Offloading]]: the distinction between external task support and retained independent competence.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: coexisting attractors and different forward and reverse switching thresholds.
- [[concepts/ai-mediated-communication|AI-Mediated Communication]]: an adjacent framework for AI participation in producing human messages; its interpersonal scope is narrower than cognitive coupling generally.

## Related Papers

- [[papers/ai-mediated-communication-definition-research-agenda-and-ethical-considerations|AI-Mediated Communication: Definition, Research Agenda, and Ethical Considerations]]: a conceptual comparison within the library concerning AI participation in communication and agency, rather than a citation claimed by the source paper.
- Risko and Gilbert (2016), *Trends in Cognitive Sciences* 20, 676 (source reference 70): background on cognitive offloading.
- Clark and Chalmers (1998), *Analysis* 58, 7 (source reference 18): background on the extended mind.

[[index|Library home]]
