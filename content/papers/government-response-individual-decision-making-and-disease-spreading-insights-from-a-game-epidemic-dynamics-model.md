---
title: "Government response, individual decision-making, and disease spreading: Insights from a game-epidemic dynamics model"
type: paper
authors:
  - Hanqi Zhang
  - Zhongkui Sun
  - Nannan Zhao
  - Yuanyuan Liu
year: null
tags:
  - behavioral-epidemiology
  - evolutionary-game-theory
  - epidemic-modeling
---

## TL;DR

A degree-structured SIR model couples government-response compliance to payoff-based strategy imitation. Simulations suggest that high-degree groups respond more to intervention effectiveness, while low-degree groups respond more to compliance costs. Behavioral feedback can produce repeated infection peaks and a gap between individual and collective incentives.

## Research Question

How do contact heterogeneity, intervention effectiveness, and individual strategy switching jointly shape epidemic trajectories and social dilemmas?

## Motivation

Government measures depend on compliance, but compliance changes with perceived infection risk and costs. Treating behavior as fixed misses the feedback through which successful prevention reduces incentives to continue cooperating.

## Contributions

- Couples susceptible and infected compliance states to a heterogeneous network SIR model.
- Derives reproduction-number and disease-free stability results, then examines parameter sensitivity and degree-dependent behavior numerically.
- Compares individual and social optima to characterize the cost ranges where preventive behavior is undersupplied.

## Method

For each degree $k$, the model tracks susceptible and infected people who support ($T$) or disregard ($D$) government response, plus recovered people. Birth and natural mortality rates are equal; newborns enter the supporting susceptible compartment. Recovered people do not re-enter transmission.

Transmission rates are $\lambda$, $d\lambda$, and $d^2\lambda$ for DD, mixed, and TT contacts. Thus smaller $d$ means stronger protection. Payoffs combine expected infection cost $C_I$ with compliance cost $C_T<C_I$. Fermi imitation gives adoption probability $[1+\exp(-(\pi_j-\pi_i)/\omega)]^{-1}$; larger $\omega$ increases decision noise, while $\varepsilon$ controls switching speed.

The next-generation matrix yields a reproduction number involving $\langle k^2\rangle/\langle k\rangle$. For the mixed disease-free equilibrium considered in the analysis, local stability changes at $R_0=1$. Its interior feasibility requires $\varepsilon A>b$, where $A=\tanh(C_T/(2\omega))$. The paper's claim that the all-supporting disease-free equilibrium is always unstable uses this condition.

Section 5 compares the payoff-maximizing group compliance fraction with the individual equilibrium fraction. Their divergence at intermediate cost ratios defines a social dilemma.

## Experiments

Numerical experiments use a normalized power-law degree distribution $p(k)\propto k^{-2.7}$, with maximum degree 100. Initial fractions in each degree class are $(S_D,S_T,I_D,I_T,R)=(0.7,0.1,0.1,0.1,0)$. Many trajectory illustrations focus on degree 80.

- **Threshold illustrations:** Figure 2 contrasts $R_0=0.7430$, with infection dying out, and $R_0=4.4588$, with persistent endemic infection.
- **Sensitivity:** 1,000 Latin hypercube samples with uniform parameter distributions produce partial rank correlations. The sampled $R_0$ increases with compliance cost and $d$, and decreases with decision noise and switching speed. Infection cost is absent from this threshold expression, although it enters behavioral payoffs and endemic dynamics.
- **Heterogeneity:** Figures 6–7 show greater responsiveness to protection effectiveness among high-degree groups and to cost ratios among low-degree groups. Stronger protection can increase disregard as perceived risk falls.
- **Repeated waves:** Figure 8 shows more pronounced secondary infection peaks at larger decision noise. These peaks follow the highest initial peak; this is a model mechanism, not empirical identification of outbreak causes.
- **Social dilemma:** Figure 9 compares degrees 10 and 30. The higher-degree group has a wider cost-ratio range separating individual and collective optima.

## Limitations

Evidence consists of theoretical analysis and synthetic numerical experiments, without a fitted epidemic case study. The model uses degree-based mean-field mixing, two strategies, permanent recovery, and a fixed intervention-effectiveness parameter. Endemic equilibria are obtained numerically rather than in closed form.

The stability statements should retain the feasibility condition above. The source's sensitivity discussion describes increasing $\omega$ as improving rational choice, whereas its Fermi rule and repeated-wave discussion identify larger $\omega$ with greater noise. The numerical threshold trend and the interpretation of rationality should therefore be distinguished.

The supplied Markdown has damaged symbols and does not provide a clear publication year or stable identifier for this paper. The year is left null.

## Related Concepts

- [[concepts/coupled-behavior-disease-dynamics|Coupled Behavior–Disease Dynamics]]: reciprocal feedback between protective decisions and infection risk.

## Related Papers

- Saad-Roy and Traulsen (2023), “Dynamics in a behavioral-epidemiological model for individual adherence to a nonpharmaceutical intervention”: the behavioral framework extended to heterogeneous mean field here (source reference 23).
- Traulsen, Levin, and Saad-Roy (2023), “Individual costs and societal benefits of interventions during the COVID-19 pandemic”: informs the individual-versus-social optimum comparison (source reference 47).
- [[papers/evolutionary-games-on-networks-with-negative-edge-based-environmental-feedback|Evolutionary games on networks with negative edge-based environmental feedback]]: a complementary model of strategy–environment feedback and oscillations, with edge environments rather than infection risk.
