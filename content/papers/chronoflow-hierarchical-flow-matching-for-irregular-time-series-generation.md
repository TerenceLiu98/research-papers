---
title: "ChronoFlow: Hierarchical Flow Matching for Irregular Time Series Generation"
type: paper
authors:
  - Changhun Kim
  - Sunguk Jang
  - Jeongjun Lee
  - Juhwan Choi
  - Sangchul Hahn
  - Grigorios Chrysos
  - Eunho Yang
  - Juho Lee
year: null
source_job_id: a4aaafe1-887b-4179-b1cc-f0949636ab37
tags:
  - irregular-time-series
  - time-series-generation
  - flow-matching
  - temporal-point-processes
  - electronic-health-records
---

[[index|Library home]]

## TL;DR

ChronoFlow generates complete irregular time series rather than values on a supplied observation grid. It factorizes generation into global observation statistics, joint observation-time and feature-panel patterns, and values conditioned on the realized pattern. Across five benchmarks, it has the lowest mean among the evaluated generators in 21 of 30 dataset-metric comparisons; eICU ablations favor the hierarchy and sorted temporal coupling, but the evidence does not establish downstream utility, privacy, or independent optimality of every factorization choice.

## Research Question

How should a generative model represent and synthesize an irregular time series when it must jointly determine how many observation occasions occur, when they occur, which features are observed together, and what values they take?

## Motivation

Fixed-grid generators can merge distinct timestamps and constrain samples to a chosen resolution. Continuous-time prediction methods often generate values at supplied times or predict only the next observation time, leaving feature co-observation structure implicit. ChronoFlow instead represents a sample as observation times $\tau$, a binary occasion-by-feature panel $B$, and observed values $x$. This makes the sampling process itself part of the generated object.

The paper also argues that full irregular-sample generation needs diagnostics beyond interpolation and extrapolation. Its evaluation separates overall distinguishability, observation counts and timing, feature co-observation, marginal values, within-feature transitions, and asynchronous cross-feature dependence.

## Contributions

- Introduces an occasion-panel representation in which each observation occasion has a continuous time and a binary set of observed features.
- Factorizes complete-sample generation as $p(M,r)\,p(\tau,B\mid M,r)\,p(x\mid\tau,B)$, proceeding from global statistics to sampling patterns to measurement values.
- Uses a common [[concepts/flow-matching|Flow Matching]] objective across continuous variables and continuous relaxations of discrete counts and panels.
- Defines six complementary diagnostics for full irregular samples and probes five direct metrics with controlled corruptions.
- Compares the model with four adapted full-generation baselines on Activity, eICU, PhysioNet 2012, MIMIC-III, and MIMIC-IV, and studies alternative factorizations and upstream error propagation on eICU.

## Method

An irregular sample is $S=(\tau,B,x)$ with $M$ observation occasions and $F$ features. The global frequency vector $r$ records the fraction of occasions at which each feature is observed.

**IntensityFlow** generates $(M,r)$ with an MLP velocity field. The count and frequencies are mapped to a continuous interval for training; inference rounds the count and projects each frequency onto the lattice induced by the generated count.

**PatternFlow** jointly generates times and feature panels conditioned on $(M,r)$. A Transformer processes one slot token per occasion, combining its noisy time, noisy panel, slot embedding, flow time, and shared global-statistics embedding. Separate output heads predict time and panel velocities. Source and target times are independently sorted during training, with their panels permuted accordingly; this is the optimal one-dimensional assignment for squared temporal cost, not a claim of optimal coupling for the joint time-panel distribution. At inference, times are clipped and sorted, panels are thresholded, and an empty panel activates its highest-scoring feature.

**ValueFlow** generates values only after the sampling pattern is fixed. Each active measurement becomes an event token containing feature identity, time, and noisy value. A Set Transformer with shared embeddings and register tokens produces a permutation-equivariant value field without imposing an arbitrary order on simultaneous or asynchronous measurements.

All three stages use linear-path flow matching and are trained simultaneously. Downstream stages receive ground-truth upstream variables during training but generated variables during inference, creating a conditioning shift examined by the oracle interventions.

## Experiments

The evaluation uses five naturally irregular benchmarks: Activity and four de-identified clinical datasets (eICU, PhysioNet 2012, MIMIC-III, and MIMIC-IV). Each model generates as many samples as the test set contains. The main results average three independently trained seeds and compare ChronoFlow with Poisson + LatentODE, LogNormMix + mTAN, LogNormMix + TFM, and FlexTPP.

The six reported diagnostics are a learned set-classifier distinguishability score, feature co-observation error, an MMD over sample-level pattern embeddings, an MMD over consecutive within-feature transitions, mean feature-wise Wasserstein-1 distance for values, and error in time-weighted cross-feature correlations. These metrics are descriptive and complementary rather than calibrated tests of distributional equality.

ChronoFlow has the lowest mean among generators in 21 of 30 dataset-metric cells. It leads five of six metrics on eICU and Activity, four on MIMIC-III and MIMIC-IV, and three on PhysioNet 2012. On eICU, its Set-Discr. is 0.0995 versus 0.3629 for the next-lowest baseline, and its Value-W1 is 0.0504 versus 0.1081. Results are not uniform: FlexTPP has lower temporal-transition discrepancy on PhysioNet 2012 and MIMIC-III, while ChronoFlow has worse co-observation and pattern discrepancies than FlexTPP on MIMIC-IV.

In the eICU factorization study, ChronoFlow has lower means on all six metrics than the tested reverse-order and joint alternatives. Removing sorted temporal coupling raises Pattern-MMD² from 0.0002 to 0.0382 and Set-Discr. from 0.0995 to 0.4316. Because the alternative architectures differ in capacity and conditioning, this supports the complete evaluated hierarchy but does not isolate every design choice.

Replacing generated $(M,r)$ with ground truth on eICU reduces Set-Discr. from 0.0995 to 0.0153 and co-observation error from 0.0380 to 0.0128, implicating upstream statistics as one source of residual error. These interventions do not identify IntensityFlow as the sole bottleneck, and supplying ground-truth patterns makes pattern-based metrics partly tautological. Increasing ODE integration from 10 to 50 steps improves fidelity, while results change little from 50 to 500 steps; the default uses 100.

## Limitations

- Counts, frequencies, and panels are generated through continuous relaxations followed by rounding, projection, and thresholding. Decoded panels are not constrained to reproduce sampled feature frequencies exactly.
- Downstream stages train on ground-truth upstream variables but consume generated ones at inference, so errors can propagate through the hierarchy.
- Self-attention scales quadratically in the number of occasions or active measurements; the experiments exclude unusually dense records and do not establish performance on longer, denser series.
- Factorization and oracle studies are limited to eICU, and the alternatives do not isolate the benefit of every conditioning variable or generation order.
- The benchmarks have finite timestamp resolution, so the reported evaluation does not establish fidelity below that resolution.
- The evidence addresses fidelity for the selected datasets, adapters, and metrics. It does not establish downstream utility, formal privacy, absence of memorization, or clinical suitability.
- The Activity split is by subject, making its real-real reference reflect cross-subject shift rather than a general lower bound.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier; its code link is anonymous.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the common velocity-regression and ODE-sampling framework used in all three stages.
- [[concepts/continuous-time-series-generation|Continuous Time Series Generation]]: the broader problem of synthesizing trajectories and their temporal support; ChronoFlow specifically generates native irregular observation patterns and values.
- [[concepts/trajectory-flow-matching|Trajectory Flow Matching]]: a related approach that models irregular clinical trajectories and next observation times, but does not generate the same occasion-panel hierarchy.

## Related Papers

- [[papers/trajectory-flow-matching-with-applications-to-clinical-time-series-modeling|Trajectory Flow Matching with Applications to Clinical Time Series Modeling]]: a continuous-time clinical model used with a learned pattern generator as one full-generation baseline.
- [[papers/fm-ts-flow-matching-for-time-series-generation|FM-TS: Flow Matching for Time Series Generation]]: applies rectified flow to fixed-grid time-series generation, forecasting, and imputation.
- [[papers/diff-mn-diffusion-parameterized-moe-ncde-for-continuous-time-series-generation-with-irregular-observations|Diff-MN: Diffusion Parameterized MoE-NCDE for Continuous Time Series Generation with Irregular Observations]]: generates continuous trajectories from irregular observations but evaluates a different irregular-to-continuous setting.
- Rubanova et al., "Latent Ordinary Differential Equations for Irregularly-Sampled Time Series" (2019): supplies the Poisson-process latent ODE baseline.
- Shukla and Marlin, "Multi-Time Attention Networks for Irregularly Sampled Time Series" (2021): supplies the value model paired with LogNormMix in one baseline.
- Draxler et al., "Transformers for Mixed-type Event Sequences" (2025): supplies FlexTPP, adapted here to generate feature identities, inter-event times, values, and sequence termination.

Source: supplied parsed manuscript, Cognitio job `a4aaafe1-887b-4179-b1cc-f0949636ab37`. Publication metadata is unspecified in the source.
