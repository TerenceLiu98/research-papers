---
title: Rumor propagation on hypergraphs
type: paper
authors:
  - Kleber Andrade Oliveira
  - Pietro Traversa
  - Guilherme Ferraz de Arruda
  - Yamir Moreno
year: 2026
doi: 10.1038/s41467-026-70096-w
tags:
  - rumor-spreading
  - higher-order-networks
  - social-contagion
  - critical-transitions
---

## TL;DR

The paper extends rumor spreading to groups with threshold rules for both transmission and cessation. A spreader stops when enough of their groups are already informed. Simulations exhibit distinct subcritical extinction mechanisms and continuous transitions in the parameter settings examined. Telegram cascade comparisons are most similar near the simulated critical point, supporting a possible mechanism for near-critical information spreading without identifying the true stopping process.

## Research Question

How does group-dependent cessation change rumor propagation on hypergraphs, and can the resulting cascade sizes and timing account for patterns in observed group-mediated communication?

## Motivation

Messaging platforms organize communication through overlapping groups. Pairwise models omit this structure, while spontaneous recovery omits the classical rumor-model idea that people stop spreading after encountering others who already know the rumor. The paper combines [[concepts/hypergraphs|Hypergraphs]] with interaction-dependent cessation to extend [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]. Here, "rumor" denotes circulating information; the empirical analysis does not establish that the messages are false.

## Contributions

- Introduces a group-threshold transmission process coupled to a node-level stifling process determined by awareness across that node's groups.
- Explains why subcritical extinction can be driven by immediately available stifling events or delayed until further transmission occurs, with heterogeneous seed groups producing mixed behavior.
- Reports continuous transitions across the tested homogeneous, heterogeneous, and empirical hypergraphs, contrasting with abrupt transitions in some other higher-order contagion models.
- Compares simulated and observed Telegram cascades using timing and a mean-to-variance ratio of cascade sizes; reports a similar email comparison in supplementary material.

## Method

Each node is ignorant ($X$), a spreader ($Y$), or a stifler ($Z$), with $X_i+Y_i+Z_i=1$. Node degree $k_i$ counts group memberships. For hyperedge $e_j$, let $T_j$ count its spreaders and let $S_i$ count incident hyperedges whose members are all informed (spreaders or stiflers).

- **Transmission:** At rate $\lambda$, an eligible hyperedge converts all its ignorant members to spreaders. Eligibility requires $T_j\geq\operatorname{round}(\theta_\lambda |e_j|)$.
- **Stifling:** At rate $\alpha$, an eligible spreader becomes a stifler. Eligibility requires $S_i\geq\operatorname{round}(\theta_\alpha k_i)$.
- **Initialization and termination:** Gillespie simulations begin with all members of one randomly selected hyperedge spreading and all other nodes ignorant. They stop when no transitions remain possible; threshold constraints can leave some spreaders stranded.

The model measures absorption time and final stifler fraction $z$. A susceptibility peak estimates the critical transmission rate. When large outbreaks exist, the reported order parameter and susceptibility retain runs with final stifler fraction greater than $N^{-1/2}$; when none meet this cutoff, all runs are included. This conditioning separates large outbreaks from stochastic early extinctions and matters when interpreting the transition estimates (Methods).

At low annihilation thresholds, stifling is already enabled by the seed group and proceeds through exponential waiting times governed by $\alpha$. At intermediate thresholds and $\lambda\ll\alpha$, additional transmission is needed before stifling, giving an absorption-time scale $\tau\propto\lambda^{-1}$. High stifling thresholds can yield macroscopic reach even at arbitrarily small positive transmission rates, while sufficiently high transmission thresholds prevent propagation. These regimes depend on structure, parameters, and the seed; continuous transitions are not asserted for every possible setting.

For empirical comparisons, users become nodes and Telegram channels/groups become hyperedges. Shared URLs identify cascades. For ordered timestamps $t_0,\ldots,t_s$, observed survival time is $\widetilde\tau=t_s-t_0$ and average inter-event time is $\langle t'\rangle=\widetilde\tau/s$. This last-message duration is a proxy for activity cessation, distinct from observing each individual's transition to a stifler.

## Experiments

| Analysis | Setup and reported result | Source |
| --- | --- | --- |
| Homogeneous finite-size analysis | Truncated-Poisson degrees and group sizes with distribution parameter 4; $\theta_\lambda=0.3$, $\theta_\alpha=0.2$, and 1,000 simulations per setting. Critical rate converges to $0.27\pm0.01$; peak susceptibility scales approximately as $N^{0.68}$. | Figure 3 |
| Seed dependence | A 10,000-node power-law hypergraph with exponent 2.3, $\theta_\lambda=0.5$, and $\theta_\alpha=0.1$ exhibits exponential, inverse-rate, or mixed subcritical behavior depending on the seed group; reported critical rate is approximately 0.12. | Figure 2 |
| Synthetic cascade timing | A 10,000-node power-law hypergraph with exponent 2.3, $\theta_\lambda=0.5$, and $\theta_\alpha=0.08$ has a transition around $\lambda_c=0.4$, with large variability near criticality and a macroscopic supercritical branch. | Figure 4 |
| Telegram structure and cascades | Source data contain 317,224,715 messages from 2,200,040 users. The reconstructed largest component has 2,199,885 nodes and 143,475 hyperedges; 2,314,550 distinct URLs occur in at least two messages. | Methods |
| Telegram model comparison | Uses $\alpha=1$, estimated $\theta_\lambda=0.1$, assumed $\theta_\alpha=0.01$, and 1,000 simulations per rate. Timing patterns resemble empirical cascades near criticality, but the empirical plot lacks the simulated supercritical branch. | Figure 5 |
| Cascade-size statistic | Across 38 logarithmically spaced rates in $[10^{-7},10^{-1}]$, the absolute difference between empirical and simulated mean/variance ratios is smallest near the susceptibility peak. | Figure 6; Methods |

The main text also reports similar email results in Supplementary Figures 5-6. The supplied Markdown does not include that supplement, so its detailed results cannot be independently summarized here. The article's reported continuous transitions are numerical findings over examined settings, not a theorem excluding discontinuous transitions.

## Limitations

- **Unobserved mechanism:** Stifling times and the annihilation threshold cannot be measured from the Telegram data. The threshold is selected rather than estimated, leaving rigorous calibration open.
- **Cascade proxy:** Repeated URLs identify shared information, not verified rumors or misinformation. Posting-derived group membership and observable message events provide an incomplete view of exposure and awareness.
- **Limited distributional comparison:** A mean/variance ratio is a summary statistic, not a full distributional goodness-of-fit test. Its agreement near criticality supports compatibility rather than unique identification of the proposed mechanism.
- **Timing assumptions:** The simulation is Markovian, whereas empirical communication need not be. Simulation rates can rescale time, and Figure 5 applies an observation-duration cutoff; similarity does not establish absolute-rate calibration. Survival time and average inter-event time also share timestamps and satisfy the identity above.
- **Conditional transition evidence:** Hypergraph heterogeneity, seed choice, thresholds, and exclusion of small outbreaks affect reported behavior. Necessary and sufficient conditions for discontinuous transitions remain unresolved.
- **Source quality:** Several extracted formulas have corrupted symbols or missing exponent signs. Ambiguous scaling expressions are omitted rather than reconstructed; supplementary-only evidence is identified as reported by the authors.

Published online on 26 February 2026 in Nature Communications. The article DOI is supplied in its Additional Information section. Author-provided resources: [Telegram hypergraph](https://zenodo.org/records/15674015) and [simulation code and results](https://doi.org/10.5281/zenodo.18468019).

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: retain overlapping groups, node membership counts, and group sizes.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: group thresholds govern both spreading and the conditions for stopping.
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: ignorant-spreader-stifler dynamics with interaction-dependent cessation.

## Related Papers

- de Arruda, Petri, and Moreno (2020), "Social contagion models on hypergraphs," Physical Review Research 2, 023032: threshold contagion foundation cited as reference 12.
- Ferraz de Arruda et al. (2022), "From subcritical behavior to a correlation-induced transition in rumor models," Nature Communications 13, 3049: pairwise rumor-model comparison for inverse-rate absorption times (reference 27).
- Notarmuzi et al. (2022), "Universality, criticality and complexity of information propagation in social media," Nature Communications 13, 1308: prior near-criticality evidence discussed by the authors (reference 24).
- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: a related library Perspective on explicit groups and contagion, rather than a work cited by this paper.

[[index|Library home]]
