---
title: Involution Game with Migration and Spatial Heterogeneity of Social Resources
type: paper
authors:
  - Bo Li
  - Qiwen Ge
  - Yong Shi
year: null
tags:
  - involution
  - evolutionary-game-theory
  - agent-based-modeling
  - migration
  - resource-heterogeneity
---

## TL;DR

A lattice-based evolutionary game couples costly competition for fixed resources with migration toward successful agents. The simulations report that resource abundance and regional inequality can sustain high-effort strategies, while finer spatial mixing can reduce their prevalence. Whether migration is possible often matters more than its positive rate, but the supplied text contradicts itself about whether migration raises or lowers involution. The results are model-based mechanisms, with unresolved specification and theoretical inconsistencies, rather than validated policy effects.

## Research Question

How do agent mobility, regional resource inequality, and total resource availability jointly determine excessive effort and spatial concentration?

## Motivation

In [[concepts/involution-games|Involution Games]], agents spend more effort to gain a larger share of a resource pool that their effort does not expand. Earlier spatial models considered heterogeneous resources but largely omitted mobility. Delivery workers and stores motivate allowing agents to relocate toward more successful competitors, potentially changing both local competition and strategy adoption.

## Contributions

- Combines two effort strategies, local resource competition, and payoff-guided migration on a partially occupied lattice.
- Separately varies resource totals, regional disparities, spatial mixing, effort costs, a utility multiplier, population density, migration propensity, and imitation noise.
- Develops a mean-field approximation linking regional sorting to the resource level experienced by agents and to strategy-payoff thresholds.
- Distinguishes the presence of migration from its rate, while documenting finite-time and high-noise exceptions to rate insensitivity.

## Method

An $N\times N$ periodic square lattice has at most one agent per cell and two equal-area regions with resource levels $M_1$ and $M_2$. Because the regions have equal area, fixing $M_1+M_2$ fixes the total lattice resource at a given $N$. Agents choose low effort $C$ or high effort $D$, with default costs $e_C=0.1$ and $e_D=0.2$. High-effort prevalence $F_D$ measures involution; $P_{M_1}$ measures the fraction of agents in the first region.

Each agent competes at its own cell and its four von Neumann neighbors. Equation (2) allocates each cell's resource in proportion to competing effort and averages net returns across the five competitions:

$$
\pi_i=\frac{1}{5}\sum_{j\in\mathcal N(i)}
\left(\frac{e_i}{\sum_{\ell\in\mathcal N(j)}e_\ell}M(j)-e_i\right),
$$

where the denominator sums effort of occupied cells. Effort redistributes resources and incurs costs; it does not create resources.

A randomly selected focal agent compares its payoff with another randomly selected agent, who need not be nearby. It imitates the comparison agent with probability $[1+\exp((\pi_i-\pi_{i'})/k)]^{-1}$. Larger $k$ means noisier, less payoff-sensitive imitation. The same pair then supplies a [[concepts/success-driven-migration|Success-Driven Migration]] opportunity: the focal agent selects one of the comparison agent's four neighboring cells and, if it is empty, moves there with probability $\mu[1+\exp((\pi_i-\pi_{i'})/k)]^{-1}$. Payoffs for both decisions are those at time $t$. Migration can be long-range and carries no explicit cost.

The mean-field approximation assumes common strategy composition and global density $\rho$ when computing regional payoffs. It introduces $u_C=e_C$, $u_D=\beta e_D$, and $\bar u=F_Du_D+(1-F_D)u_C$, yielding $\mathbb E[\pi_i^r]=M_ru_i/(u_i+4\rho\bar u)-e_i$. The resulting strategy-payoff difference is

$$
\Delta\pi=\bar M\left(\frac{u_D}{u_D+4\rho\bar u}
-\frac{u_C}{u_C+4\rho\bar u}\right)-(e_D-e_C),
\qquad \bar M=P_{M_1}M_1+(1-P_{M_1})M_2.
$$

Under its migration equation, positive mobility and unequal resources drive an initially interior population share toward the richer region. For the default parameters, the authors report low-effort selection below approximately $\bar M=0.585$ and high-effort selection above approximately $0.630$. These are thresholds of the approximation; its claimed mixed-equilibrium structure and correspondence with the simulations need qualification below.

## Experiments

The default system is a $100\times100$ lattice with 2,000 agents ($\rho=0.2$), $k=1$, and $\beta=1$. Conditions run for 3,000 Monte Carlo steps and are averaged over 50 independent runs. Figure 1 specifies averaging the last 300 steps for runs that have not reached an absorbing state. Error bars denote standard deviations, not confidence intervals. The paper reports checks across lattice sizes from $50\times50$ to $200\times200$ at fixed density and across random, clustered, and stratified initial locations.

| Comparison | Reported outcome | Evidence scope |
| --- | --- | --- |
| Resource sum $M_1+M_2=2$, varying disparity | Section 3.3 reports $F_D=0$ without migration; with migration, high effort becomes prevalent at sufficiently extreme disparities. | The precise disparity thresholds conflict with Section 3.4 under nominally matching settings. |
| Resource sum 3 | Section 3.3 reports $F_D=0$ without migration and near-universal high effort with migration, with lower adoption close to equal resources. | This contradicts passages claiming migration generally suppresses involution. |
| Resource sum 5 | Section 3.3 reports $F_D$ close to 1 throughout its mobility and disparity grid. | Abundance supports high effort even without migration in these simulations. |
| Spatial sorting at resource sum 3, $\mu=1$ | $P_{M_1}\approx0.90$ at $M_1/M_2=1.5$ and $0.96$ at ratio 2. | Section 3.2; sorting can still vary with positive migration rate. |
| Effort ratio at resource sum 3, $\mu=1$ | At equal resources, $F_D\approx0.75$ for $e_D/e_C=2$ and below 0.01 for ratio 2.5. | Section 3.5; sufficiently unequal resources can sustain high effort despite larger effort costs. |
| Two regions versus twenty alternating stripes | At $M_1/M_2=0.8$, $F_D$ falls from nearly 1 to about 0.87. | Section 3.6; finer mixing also reduces spatial concentration. |
| Population from 2,000 to 8,000 | At equal resources, $F_D$ rises from about 0.75 at 2,000 agents to 0.99 at 3,000 and 1 at larger populations. | Section 3.7; higher density also restricts concentration through crowding. |

The utility-multiplier sweep reports that increasing $\beta$ favors high effort and that the transition occurs at lower $\beta$ when resources are more abundant. Its interpretation is limited by the missing utility multiplier in the stated simulation payoff equation.

Positive migration rates often produce similar final $F_D$ at $k=1$, but this is not a universal independence result. Section 3.1 reports modest rate effects at intermediate noise, and Section 3.2 reports rate-dependent spatial sorting. At $k\geq50$, mean $F_D$ approaches 0.5 with run-to-run standard deviations around 0.3-0.4; the paper attributes this to drift and lack of convergence within the simulated horizon, not a unique stable mixed equilibrium.

## Limitations

The model has fixed population, two discrete effort levels, stylized static resources, regular-lattice competition, and cost-free migration. It is not calibrated against delivery-worker or retail data. Claims about taxation, wage floors, effort caps, or relocation subsidies are interpretations of the model, not evaluated interventions. The data-availability statement says data are available on request; the supplied Markdown includes no executable implementation.

Several source inconsistencies materially limit reproduction and interpretation:

- **Direction of migration effects:** Section 3.1 first describes suppression, then describes higher involution with mobility at low noise. Section 3.3 supports the latter direction in several settings, while Section 3.8 again claims general suppression. The summary therefore attributes findings to specific sections.
- **Effort versus utility:** Equation (2) uses effort shares with no $\beta$, while Equation (6) uses utility shares with $u_D=\beta e_D$. The supplied model does not explain how the utility sweep enters the simulation payoff.
- **Noise convention:** The simulation Fermi rule divides payoff differences by $k$, while Equations (10) and (13) multiply the mean-field payoff difference by $k/2$ inside the hyperbolic tangent. These conventions imply opposite effects of increasing $k$ on payoff sensitivity.
- **Spatial closure:** The approximation keeps global density in regional payoffs despite migration-driven concentration, and its migration equation does not explicitly enforce destination occupancy. Complete agglomeration cannot describe the lattice at densities above 0.5 because either region contains only half the cells.
- **Equilibrium claims:** Section 4.3 asserts two interior fixed points throughout the reported $0.585$-$0.630$ interval. Unimodality alone does not ensure both roots lie in the admissible $F_D\in(0,1)$ range. Moreover, at equal resources with $M_1+M_2=3$, the approximation has $\bar M=1.5$ and predicts high-effort selection throughout the interior, whereas Section 3.5 reports $F_D\approx0.75$. The asserted qualitative agreement is not a quantitative validation.
- **Labels and numerical consistency:** Section 3.7 calls $M_1$ the poorer region when $M_2/M_1<1$, reversing the stated ratio. Sections 3.3 and 3.4 also give conflicting disparity thresholds at resource sum 2 and $\beta=1$. Exact values from those comparisons should not be pooled into a single phase diagram.

These issues are present in the supplied parsed text; their origin cannot be resolved from that source alone. The Markdown provides no explicit publication year, venue, DOI, or arXiv identifier for this paper, so those details are not inferred from its references.

## Related Concepts

- [[concepts/involution-games|Involution Games]]: costly effort escalation over a fixed resource pool.
- [[concepts/success-driven-migration|Success-Driven Migration]]: relocation toward agents with higher observed payoffs.
- [[concepts/network-games|Network Games]]: spatial interaction structure changes competitive incentives; this paper uses stochastic evolutionary imitation rather than a static equilibrium solution.

## Related Papers

- Wang et al. (2022), "Modeling the social dilemma of involution on a square lattice": cited precursor with two effort strategies and stochastic resource allocation (reference 2).
- Wang and Szolnoki (2022), "Involution game with spatio-temporal heterogeneity of social resources": cited resource-heterogeneity extension (reference 12).
- Helbing and Yu (2009), "The outbreak of cooperation among success-driven individuals under noisy conditions": cited foundation for success-driven migration (reference 17).
- Lee, Cleveland, and Szolnoki (2022), "When costly migration helps to improve cooperation": cited motivation for including migration costs (reference 41).
- [[papers/a-model-of-long-term-conflict-resolution-and-cooperation|A Model of Long-Term Conflict Resolution and Cooperation]]: a library comparison, not a citation in this paper, examining how imitation and interaction opportunities shape cooperation in a different agent-based setting.

[[index|Library home]]
