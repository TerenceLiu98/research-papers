---
title: Multiple Change-Point Detection for Poisson Processes
type: paper
authors:
  - Charlotte Dion-Blanc
  - Diala Hawat
  - Emilie Lebarbier
  - Stephane Robin
year: null
source_job_id: 11ed4303-4001-4c7d-b91c-1fdeb0d8ad73
tags:
  - change-point-detection
  - poisson-processes
  - point-processes
  - dynamic-programming
  - cross-validation
---

## TL;DR

For a piecewise-constant Poisson intensity, a segment-additive contrast that is strictly concave in segment length attains its optimum at event times or immediately before them. This converts exact continuous-time multiple change-point detection into a finite dynamic program. A Poisson-Gamma contrast avoids zero-length maximum-likelihood segments, and independent Poisson thinning supplies a cross-validation criterion for selecting the number of segments. The construction also covers marked Poisson processes and a restricted class of piecewise Hawkes processes.

## Research Question

How can multiple offline change-points in continuous-time Poisson event data be located exactly, and how can the number of segments be selected without imposing an arbitrary time grid?

## Motivation

Discretizing event times can lose localization accuracy or increase computation, while directly optimizing common continuous-time contrasts is difficult because they are discontinuous at event times and the segmentation space is continuous. Standard Poisson maximum likelihood also favors degenerate segments that isolate a single event in an interval of vanishing length. The paper seeks an exact continuous-time solution that addresses both optimization and model selection.

## Contributions

- Proves that segment additivity and strict concavity in segment duration reduce the continuous segmentation problem to a finite grid containing each event time and its left limit (Sections 3.2-3.3).
- Uses dynamic programming to obtain an exact optimum for a fixed number of segments in $O(n^2K)$ time, where $n$ is the event count and $K$ the number of segments (Section 3.3).
- Introduces a Poisson-Gamma marginal contrast whose hyperparameters regularize away zero-length segments; the suggested default is $a=1$ and $b=1/n$ (Section 4 and Appendix F).
- Selects $K$ by repeatedly thinning events into independent learning and test Poisson processes, fitting with the regularized contrast and evaluating held-out Poisson likelihood (Section 7).
- Extends the framework to exponential marks and to a piecewise Hawkes-type process whose regime changes multiply the complete baseline conditional intensity (Sections 5-6).

## Method

The event process has a piecewise-constant intensity over unknown segments. Within every allocation of event counts to segments, the paper assumes a contrast of the form

$$
\gamma(\boldsymbol{\tau})=\sum_{k=1}^K C(\nu_k,\Delta\tau_k),
$$

with each cost strictly concave in the segment duration. The resulting joint contrast is strictly concave within an inter-event cell, so a minimum occurs on its boundary. All candidate change-points can therefore be restricted to event times or their left limits and optimized by dynamic programming.

The ordinary Poisson likelihood is admissible for this reduction but becomes unbounded when a segment collapses around one event. The proposed Poisson-Gamma contrast integrates each segment intensity under an independent Gamma prior. Posterior means estimate segment intensities after segmentation.

For model selection, each event is independently assigned to a learning process with probability $f$ and otherwise to a test process. Poisson thinning makes these processes independent and preserves their change-points. The method fits each candidate $K$ on the learning events, rescales its intensities by $(1-f)/f$, and scores it on test events. The study uses $f=4/5$.

For marked events, a parallel Gamma regularization is applied to exponential mark rates. For the piecewise Hawkes process, regime coefficients multiply a shared exponential Hawkes baseline. A compensator-based time transformation maps its events to a piecewise-constant Poisson process before applying the same segmentation method.

## Experiments

Synthetic Poisson experiments use six alternating-intensity segments and vary both expected event count and adjacent-segment intensity ratio. Recovery improves with more events and stronger contrasts: at mean intensity 1,000, the correct six segments are recovered from an intensity ratio of three, while at mean intensity 100 the ratio must be about ten. Under constant intensity, the reported false-alarm proportion ranges from 7% to 16% across tested event rates. The continuous-time dynamic-programming and cross-validation method outperforms binned-Poisson and inter-event exponential PELT baselines on segment count and Hausdorff localization, especially in low-signal settings (Section 8.2.1).

Marked-process simulations show complementary information from event rates and marks. When both carry changes, the mean selected segment count is 5.998 for a true value of six and the mean Hausdorff distance is 0.056; either signal alone is weaker (Table 1). Piecewise-Hawkes simulations show localization close to the known-parameter case when baseline parameters are estimated from a sufficiently long homogeneous period (Section 8.2.3).

Real-data illustrations select four segments for 63 Kilauea eruptions, with change-points at 1918, 1934, and 1952, and two segments for 40 Mauna Loa eruptions, with a change-point at 1843. For Mount Etna, event times and lava-volume marks each select two segments but locate different changes, illustrating the marks' influence. A piecewise-Hawkes analysis of a Thailand aftershock sequence detects three major earthquakes, with a 15-day delay for the second, plus an additional end-of-activity change (Section 9).

## Limitations

- Low event counts make cross-validation conservative and reduce change-point localization accuracy.
- The $O(n^2K)$ dynamic program can be expensive for large event streams; the paper suggests pruned dynamic programming as a possible acceleration but does not evaluate it.
- The Hawkes extension requires known or accurately estimated baseline excitation parameters. Without a homogeneous learning period, grid search adds computation and sensitivity to grid resolution.
- The Hawkes time transformation requires regime changes to act as a common multiplicative factor on the entire baseline intensity; other structural changes are outside the theory.
- The real eruption dates were originally annual counts and were converted to continuous dates by uniform random placement within each year, adding unresolved timing uncertainty.

## Related Concepts

- [[concepts/continuous-time-poisson-change-point-detection|Continuous-Time Poisson Change-Point Detection]]
- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]

## Related Papers

- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]]
- [[index|Library home]]
