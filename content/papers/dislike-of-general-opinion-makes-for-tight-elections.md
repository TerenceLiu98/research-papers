---
title: Dislike of general opinion makes for tight elections
type: paper
authors:
  - O. Devauchelle
  - P. Szymczak
  - P. Nowakowski
year: 2024
journal: Physical Review E
doi: 10.1103/PhysRevE.109.044106
tags:
  - opinion-dynamics
  - sociophysics
  - elections
---

## TL;DR

Voters who tend to agree with their neighbors can still divide almost evenly nationwide if they also tend to oppose whichever side leads in the polls. In the authors' spatial Ising model, even weak opposition to the majority can stabilize two similarly sized camps in a sufficiently large electorate. Across 168 binary elections in 31 countries, electorates above roughly one million voters typically had victory margins of about seven percentage points. The election returns establish a size pattern and leave its cause open.

## Research Question

How can a close national vote coexist with strong local majorities, and why might this outcome be more common in larger electorates?

## Motivation

Andrzej Duda won 51% of the vote in Poland's 2020 presidential runoff. The county map showed a clear east-west divide. Independent coin flips could explain a near tie but would leave the geographic clustering unexplained. Local imitation explains why clusters form but can also allow one camp to take over.

## Contributions

The authors identify a split-society phase in which neighboring voters usually agree and the national vote stays near a tie. Its stability depends on how the cost of a boundary between camps grows with population. In two dimensions, the number of neighbor ties crossing a compact boundary grows as $\sqrt{N}$, while the penalty for a fixed national imbalance grows as $N$. This gives larger electorates a stronger incentive to split at the same sensitivity to polls.

## Method

Each voter holds one of two opinions, $s_i=\pm1$. An Ising interaction favors agreement across neighboring nodes. A second energy term, $\varepsilon N\bar{s}^{2}$, penalizes the squared population mean, with $\varepsilon$ measuring sensitivity to the national balance. The authors simulate random single-voter updates using Glauber dynamics. In a low-temperature approximation on a disk, they minimize the length of the boundary for each vote share. The split first becomes energetically preferable to unanimity at $N_t=64/(\pi\varepsilon^2)$ (Sec. VI). The numerical prefactor depends on geometry.

## Experiments

- On a triangular mesh, the fraction of neighbors sharing a voter's opinion was about 0.9 in the split state and 0.5 in the high-temperature disordered state. Both can produce an evenly divided vote. On a mesh with two lobes joined by a narrow neck, the boundary settled at the neck even when 90% of voters initially favored one side (Fig. 2).
- In the split phase, a small external preference can move the boundary between camps. Simulations agreed with the large-population approximation $\chi_0=1/(2\varepsilon)$ for the response of mean opinion to a weak field (Fig. 4).
- The cross-country comparison used direct national elections since 1990 in which two candidates accounted for all votes. The authors measured the difference between the candidates' vote shares. Smaller electorates tended to have wider margins, with the distributions separating near one million votes (Fig. 5 and Appendix E).

## Limitations

The election returns contain no individual measures of poll exposure or reactions to a leading candidate. The authors' estimate of poll sensitivity also relies on a rough estimate of opinion fluctuations from Polish polling. Identical voters, constant parameters, and a two-dimensional network simplify the analysis. Whether a comparable boundary can stabilize two camps on a network with many long-range ties remains open.

## Related Concepts

- [[concepts/anticonformity|Anticonformity]] acts on the national majority signal while local influence favors agreement.
- [[concepts/geographic-polarization|Geographic Polarization]] captures the spatial separation visible on a vote map even when the national totals are close.
- The [[concepts/voter-model|Voter Model]] provides a local-copying baseline in which domains form and can eventually coalesce into consensus.

## Related Papers

- [[papers/depolarizing-power-of-anticonformity|Depolarizing power of anticonformity]] studies dissent from like-minded peers when a middle position is available. Here the reference group is the whole electorate, and a binary choice channels dissent toward the trailing camp.
