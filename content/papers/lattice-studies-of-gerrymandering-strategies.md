---
title: Lattice Studies of Gerrymandering Strategies
type: paper
authors:
  - Kyle Gatesman
  - James Unwin
year: 2021
doi: 10.1017/pan.2020.22
source_job_id: 0ddf73a0-8749-4928-afa2-aab4ae97e640
tags:
  - redistricting
  - spatial-analysis
  - monte-carlo-methods
---

## TL;DR

Synthetic lattice populations expose the spatial constraints on partisan district design. Saturation packing wins four of five districts in the four balanced-vote benchmarks, but can leave the final district disconnected. A genetic algorithm preserves connectivity and wins 3.4–3.8 districts on average, producing substantially less compact boundaries than the paper's symmetric baseline.

## Research Question

How do population geography and district connectivity affect the effectiveness of gerrymandering algorithms, and can geometric compactness distinguish their outputs from a nonpartisan construction?

## Motivation

Strategies that sort voters solely by partisanship can allocate geographically scattered units to the same district. A spatial model makes it possible to compare partisan advantage, population balance, and connectivity jointly rather than treating a winning allocation as a feasible district map.

## Contributions

- Constructs stochastic lattice populations with spatially varying partisan preferences for repeated simulation.
- Implements Friedman–Holden packing spatially and documents its fragmentation.
- Introduces spatially restricted Friedman–Holden packing, saturation packing, and a connectivity-preserving genetic algorithm.
- Compares district wins, connected components, and isoperimetric quotients across synthetic configurations, including an urban–rural example.

## Method

Each square-lattice unit has population $P_{ij}$ and signed partisan preference $v_{ij}$. Random walkers starting at the center generate a quasi-Gaussian population. Signed source points contribute preferences proportional to $1/\max(1,d)$, where $d$ is Euclidean distance. District net votes are $N_D=\sum_{(i,j)\in D}P_{ij}v_{ij}$. The reported quantity $X_D=100N_D/P_D$ is a signed vote margin, not an ordinary party vote percentage.

Friedman–Holden packing combines extreme supporters and opponents without adjacency restrictions. Its spatially restricted version connects extreme units by a path and grows districts through adjacent units. Saturation packing first concentrates opposition voters in a district, then uses the restricted procedure. Both spatial packing approaches may leave a disconnected final district.

The genetic algorithm starts with flood-filled connected districts and mutates boundary assignments only when connectivity is preserved. Selection maximizes $G=W/n-g$, where $W$ counts safe proponent districts plus half of contested districts, and $g=(\max_D P_D-\min_D P_D)/P_S$. Population equality is encouraged through a penalty rather than imposed as the packing algorithms' hard tolerance. The illustrated implementation retains 10 of 100 candidates, produces 10 mutations per retained candidate, and runs 12 generations.

## Experiments

The main comparisons use 30 simulated populations per configuration on a $21\times21$ lattice, approximately 4,700 people, five districts, and four balanced-vote source configurations. Section 5 specifies a population tolerance of 5% of the target district population and vote threshold $w=5$ where applicable.

| Method | Mean districts won across benchmark models 1–4 | Connectivity |
| --- | --- | --- |
| Symmetric nonpartisan construction | 2.47, 2.57, 2.50, 2.43 | Connected |
| Friedman–Holden packing | 3, 3, 3, 3 | Substantial fragmentation |
| Spatially restricted packing | 2.9, 3.0, 3.2, 4.0 | Final district may be disconnected |
| Saturation packing | 4, 4, 4, 4 | Final district may be disconnected |
| Genetic algorithm | 3.8, 3.7, 3.4, 3.4 | Connectivity preserved |

Tables 2–8 supply these comparisons. Table 5 reports an average of 5.3 connected components in the final restricted-packing district versus 4.0 for saturation packing. This improvement is not uniform: benchmark 2 favors restricted packing.

For [[concepts/electoral-district-compactness|Electoral District Compactness]], the authors use the Polsby–Popper score $4\pi A/P^2$. Table 9 reports genetic-map mean scores of 0.10–0.13, versus 0.65 for the symmetric construction in Table 10. The parsed Table 9 contains an internally inconsistent model-2 cell (0.5 alongside a row mean of 0.13); these are reported row summaries, not independently reconstructed averages.

The urban–rural model combines a strongly concentrated central population with blue central and red peripheral partisan sources. Tables 11–12 report 4.0 expected blue wins when favoring blue and 3.8 red wins when favoring red, with mean compactness 0.11 in both cases. This is a stylized simulation motivated by U.S. voting geography, not an empirical U.S. districting evaluation.

## Limitations

The experiments are proof of principle on small square lattices with prescribed preferences and mostly central quasi-Gaussian populations. They omit real geographic barriers, third parties, abstention, and uncertainty about voter preferences. Genetic search does not establish global optimality, and its population penalty does not establish compliance with a particular legal tolerance. Repeated population draws assess algorithm behavior; they do not constitute a neutral reference distribution of feasible maps. Compactness separates these outputs from this symmetric baseline, but the study does not establish a universally valid detection threshold or test an optimizer explicitly constrained to remain compact.

## Related Concepts

- [[concepts/electoral-district-compactness|Electoral District Compactness]]: geometric diagnostic applied to the generated maps.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: a complementary comparison framework; this paper repeats partisan optimization over synthetic populations rather than sampling neutral alternative maps for an enacted plan.

## Related Papers

- Friedman and Holden (2008), “Optimal Gerrymandering: Sometimes Pack, But Never Crack”: the nonspatial strategy adapted and tested here.
- [[papers/gerrymandering-and-compactness-implementation-flexibility-and-abuse|Gerrymandering and Compactness: Implementation Flexibility and Abuse]]: complementary library reading on measurement sensitivity in real district geometry; not a citation in this paper.

Published in *Political Analysis* 29, 167–192 (2021), online November 11, 2020. [Article](https://doi.org/10.1017/pan.2020.22). [Replication materials](https://doi.org/10.7910/DVN/OP6EVF).
