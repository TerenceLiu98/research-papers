---
title: The Varieties of Schelling Model Experience
type: paper
authors:
  - Marlyn Boke
  - Timothy Sorochkin
  - Jesse Anttila-Hughes
  - Alan O. Jamison
year: 2026
source_job_id: "b0e29c75-404b-4b7a-a43f-4e06892c69d0"
tags:
  - agent-based-models
  - segregation
  - statistical-physics
---

## TL;DR

Across 54 variants of the Schelling model, increasing agents' minimum acceptable share of same-group neighbors produces zero, one, or two transitions in segregation. In the two-transition case, the population segregates at moderate thresholds and becomes mixed again at high thresholds. Two mechanisms yield that mixed outcome. Agents who require an immediately satisfactory destination can freeze in place, while agents who accept any vacancy can keep moving indefinitely.

## Research Question

Which relocation rules preserve Schelling's result that a population can segregate even when individuals would accept mixed neighborhoods? What accounts for the transitions that appear or disappear when those rules change?

## Motivation

Studies using the Schelling model differ in how far agents search, which destinations they accept, and how long they keep looking. An observed level of segregation at a single preference threshold gives little indication of how these choices affect collective behavior across thresholds.

## Contributions

The authors classify relocation rules by the number of transitions in their phase diagrams. They trace the onset of segregation to a cascade of moves that starts with fluctuations in the initial neighborhoods. They also distinguish two roles for vacancies. A vacancy provides a destination when agents compete for space, and fewer occupied sites make a neighborhood's composition more sensitive to each arrival or departure.

## Method

The main simulations start with two equally numerous groups placed randomly on a square lattice with open boundaries. At each step, a randomly selected agent checks the same-group share within a fixed radius. An isolated agent is satisfied by convention. A dissatisfied agent searches for a destination. The design crosses three search procedures (nearest first, distance-weighted, or random), three acceptance rules (any available site, an improvement, or full satisfaction), three search budgets (one attempt, a finite budget, or unlimited), and two occupancy rules (exclusive or shared).

For each rule set, the authors map segregation over the homophily threshold and occupation density. Their main measure is $2Q-1$, where $Q$ is the mean same-group neighbor share. They also measure relocation activity at convergence, which distinguishes a frozen mixed population from one whose members continue to move.

## Experiments

| Class | Outcome as the threshold rises | Variants with fixed classification |
| --- | --- | ---: |
| 0 | The population stays mixed throughout. | 10 |
| 1 | Segregation emerges, typically at a threshold between 0.35 and 0.50, and persists. | 14 |
| 2 | Segregation emerges, then recedes at a second threshold, typically between 0.50 and 0.80. | 20 |

The remaining ten variants use distance-weighted search and can shift between classes 0 and 2 as search radius changes (Section III.A). Nearest-first moves tend to affect overlapping neighborhoods, containing the cascade. Smaller neighborhoods have more variable initial compositions, and each move affects a larger share of the neighbors. With the eight surrounding sites used in Schelling's original specification, the authors recover an onset near 0.30 despite nearest-first search (Figure 10).

Allowing dissatisfied agents to accept a partial improvement lets them build up favorable neighborhoods through successive moves (Figure 12). Allowing agents to share sites gives a different result. Several agents can move into the same satisfactory neighborhood, extending segregation to higher thresholds, but this process still needs a satisfactory destination to exist initially. The threshold where the expected number of such destinations falls below one closely tracks the observed upper transition (Figure 14).

Measures based on cluster size, cluster count, and contact between groups recover the same transition counts and locations as the neighborhood-composition measure (Appendix A).

## Limitations

The classification covers the specified rule combinations under random initialization, equal group sizes, and a common preference threshold. The numerical transition locations depend on neighborhood size, density, and search range. They describe simulated populations and do not estimate residential preferences from observed moves.

## Related Concepts

- [[concepts/schelling-segregation-model|Schelling Segregation Model]] explains how one household's relocation changes the neighborhoods that other households evaluate.

## Related Papers

- Schelling's *Dynamic Models of Segregation* (1971) supplies the nearest-satisfactory-site rule examined in Figure 10.
- [[papers/eco3s-complex-socio-economic-system-simulation-via-agent-based-models|Eco3S]] uses Schelling segregation as a test of an automatically generated simulation. The phase diagrams here give that test a more specific question: under which relocation rules should segregation emerge?
