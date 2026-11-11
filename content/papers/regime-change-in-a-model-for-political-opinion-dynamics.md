---
title: Regime change in a model for political opinion dynamics
type: paper
authors:
  - Alexander Jochim
  - Stefan Bornholdt
year: null
source_job_id: 6596604a-48ef-4281-8381-404c7bd94c2d
tags:
  - opinion-dynamics
  - political-violence
  - agent-based-models
---

## TL;DR

A spatial opinion model combining popularity-dependent adoption, memory against returning to previous opinions, and slow innovation generates recurrent turnover of dominant opinions. Historical Chinese and US violence records show temporal clustering and accelerating rises around aligned peaks; only the Chinese decline matches the model's approximately linear decay. The comparison is qualitative, not a calibrated explanation of regime change.

## Research Question

Can minimal opinion-spreading rules generate recurrent contested transitions, and do their activity profiles resemble within-country patterns of historical political violence?

## Motivation

Political orders repeatedly give way to new dominant ideas. The paper uses [[concepts/opinion-dynamics|Opinion Dynamics]] to isolate a possible mechanism connecting local interaction and population-level turnover. Violence is an imperfect proxy for contested transitions: it need not produce regime change, and regime change can be peaceful.

## Contributions

- Defines a turnover model with no fitted dynamical parameters beyond fixed structural choices and a separation between innovation and spreading timescales.
- Links accelerating adoption and subsequent declining activity to cumulative advantage and shrinking spatial interfaces.
- Tests temporal clustering in thirteen historical series and compares aligned peak shapes.
- Identifies increasing opinion fragmentation as an early warning signal within the simulation.

## Method

On a periodic two-dimensional lattice of N agents, each sweep makes N random neighbor-pair selections. Agent i adopts neighbor j's opinion with probability n_j/N, where n_j is that opinion's population-wide count, only if i has never held it before. One random agent then receives an entirely new opinion. Unlike the [[concepts/voter-model|Voter Model]], adoption is popularity-weighted and irreversible at the individual opinion-history level.

Activity Ψ counts accepted neighbor-induced changes, excluding innovation. Fragmentation is the effective number of opinion groups, Φ = 1/Σ_g p_g². A transition occurs when an opinion first occupies half the population. Period lengths measure intervals between successive transitions.

Historical events are aggregated into five-year bins. Lag-1 autocorrelation is tested against 10,000 permutations, also after subtracting a centered 100-year moving average. Peaks exceeding half the series maximum are aligned and averaged; exponential rise fits and linear versus exponential decline fits summarize shape. Simulation sweeps are not calibrated to calendar years.

## Experiments

Simulations run for one million sweeps, usually with N = 2,500 and four neighbors. Structural comparisons use N = 100, 2,500, 6,400, and 10,000, and neighborhoods of 4, 8, 12, or full connectivity. Larger systems have longer turnover periods; increased connectivity shortens them. Fragmentation rises before the next opinion dominates. Local interfaces explain the approximately linear late decline; a well-mixed approximation instead gives adoption proportional to C²(1−C).

The historical sources count Chinese internecine wars (221 BC–1929 AD), US lethal riots (1780–2010), and internal disturbances in eleven European series. Chinese counts were manually digitized from Lee's historical figure.

| Reported statistic | China | United States |
| --- | --- | --- |
| Fano factor | 8.56 | 19.34 |
| Lag-1 autocorrelation | 0.650 | 0.647 |
| Detrended autocorrelation | 0.545 | 0.378 |
| Detrended permutation p | <0.001 | 0.003 |
| Exponential rise R² | 0.995 | 0.984 |
| Linear decline R² | 0.908 | 0.735 |

An exponential decline does not improve the Chinese fit but fits the US decline better (R² = 0.897). European clustering is weak or absent after detrending, and these records are too sparse for meaningful peak-shape fits. R² measures fit quality rather than statistical significance.

## Limitations

The no-return memory rule excludes historical revival of old ideas. Lattice structure and slow innovation are assumptions, and the absence of tuned parameters does not remove them. Model activity peaks lead to new dominant opinions, whereas real contests can preserve the existing order. Event definitions differ across sources, with European disturbances not necessarily violent; absolute cross-country counts are not compared. Documentation changes and sparse records constrain empirical interpretation. Fragmentation is demonstrated as a warning signal in the model, not validated as a historical forecasting tool. Father-and-son cycles are not reproduced.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: local adoption rules and emergent collective turnover.
- [[concepts/voter-model|Voter Model]]: neighbor imitation provides the starting point for the modified update rule.

## Related Papers

- Bornholdt, Jensen, and Sneppen (2011), *Emergence and decline of scientific paradigms*: cited predecessor for popularity-weighted spreading with memory (doi:10.1103/PhysRevLett.106.058701).
- Turchin (2012), *Dynamics of political instability in the United States, 1780–2010*: source of the US event compilation (doi:10.1177/0022343312442078).
- Horstmeyer et al. (2020), *Predicting collapse of adaptive networked systems without knowing the network*: cited context for warning measures that do not require structural information (doi:10.1038/s41598-020-57751-y).

## Source

Based on the supplied parsed Markdown for job `6596604a-48ef-4281-8381-404c7bd94c2d`. Publication year and paper identifier are not stated in that text and are left unspecified. The manuscript lists code and binned data at https://doi.org/10.5281/zenodo.23989457; this is a repository identifier, not a paper DOI.

[[index|Library home]]
