---
title: Measuring Bias and Uncertainty in DW-NOMINATE Ideal Point Estimates via the Parametric Bootstrap
type: paper
authors:
  - Royce Carroll
  - Jeffrey B. Lewis
  - James Lo
  - Keith T. Poole
  - Howard Rosenthal
year: 2009
journal: Political Analysis
volume: 17
issue: 3
pages: "261–275"
url: https://www.jstor.org/stable/25791974
source_job_id: a0e7c316-1136-44fd-8032-ff87d46b4ca9
tags:
  - political-methodology
  - ideal-point-estimation
  - bootstrap
---

## TL;DR

A parametric bootstrap supplies joint-estimation uncertainty for DW-NOMINATE legislative ideal points and quantities derived from them. Across the first 109 U.S. Congresses, conditional standard errors are reported to be 25% smaller on average than the bootstrap estimates. First-dimension positions are generally more precise than second-dimension positions, while chamber and party medians are tightly estimated.

## Research Question

How can researchers estimate sampling uncertainty in dynamic legislative ideal points and derived polarization measures when direct inversion of the full information matrix is impractical?

## Motivation

Traditional DW-NOMINATE uncertainty calculations hold roll-call parameters fixed when estimating legislator standard errors. Joint estimation introduces additional variability. A bootstrap can propagate this variability into individual positions, medians, and partisan overlap without explicitly inverting the enormous Hessian.

## Contributions

- Extends the Lewis and Poole (2004) parametric-bootstrap approach to DW-NOMINATE.
- Addresses initialization, polarity, and scale comparability across dynamic bootstrap configurations.
- Provides 1,000 bootstrap trials for congressional positions and demonstrates uncertainty estimates for substantive functions of those positions.

## Method

DW-NOMINATE combines normally distributed random utility errors with weighted spatial utility and polynomial ideal-point trajectories. The usual two-dimensional linear specification is a constrained form of [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]. Constant ideal-point components and roll-call midpoints lie within a unit hypersphere; time-specific positions can extend beyond it.

Fit the model, simulate each observed vote using its fitted choice probability, and refit the resulting roll-call matrix. Repeat while retaining the observed voting structure. Re-estimation allows uncertainty in roll-call and utility parameters to propagate to legislator coordinates.

The algorithm ordinarily stops when improvement in geometric mean probability falls below 0.001, typically after three to five iterations. To investigate attenuation from shared starting values, the authors perturb legislator coordinates and roll-call midpoints with zero-mean Gaussian noise. Estimated standard errors remain stable as perturbation variance increases from 0 to 0.4.

DW-NOMINATE selects axes by explained voting variation, while starting coordinates preserve polarity. A separate diagonal regression rescales each bootstrap configuration toward the original coordinates to remove interactions between dimension weights and legislator time trends. These are distinct comparability issues related to [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]].

The reported uncertainty calculation centers squared bootstrap deviations on the original estimate rather than the bootstrap mean and divides by the number of trials minus one. The authors intentionally use this somewhat inflated measure rather than the ordinary bootstrap sample standard deviation. Derived statistics are recomputed across trials to obtain empirical intervals.

## Experiments

The application covers Congresses 1–109 (1789–2006), retaining roll calls with at least 2.5% in the minority and legislators casting more than 20 votes in a Congress.

| Quantity | House | Senate |
| --- | ---: | ---: |
| Unique legislators | 10,419 | 1,828 |
| Estimated legislator-session locations | 35,739 | 8,644 |
| Roll calls | 42,029 | 43,188 |
| Individual vote choices | 11,866,698 | 2,479,057 |
| Mean first-dimension standard error | 0.047 | 0.050 |
| Mean second-dimension standard error | 0.110 | 0.094 |

With 1,000 bootstrap trials as the reference, subsamples of roughly 50 trials yield similar individual standard errors; more trials remain useful for intervals on functions such as partisan overlap. This is a stability comparison, not a coverage test against known population parameters.

First-dimension uncertainty is historically small in recent Congresses, partly associated with more votes, larger chambers, and longer-serving members. Second-dimension uncertainty increases as that dimension loses salience. Short careers, extreme positions, and uncertain time trends can produce much larger errors than the chamber averages.

The paper reports tight 95% intervals for floor and party medians and for partisan overlap, defined as the number of legislators between the most conservative Democrat and most liberal Republican. Two-dimensional ellipses illustrate uncertainty for prominent legislators; McCain’s later second-dimension movement is accompanied by increasing uncertainty.

## Limitations

The bootstrap measures repeated-sampling variation under the fitted voting model; it does not establish robustness to model misspecification. Initialization sensitivity checks support the reported estimates but do not prove global optimization. Axis and scale conventions are necessary for meaningful coordinate comparisons. The 1,000-trial reference assesses computational stability rather than frequentist coverage, and weakly informative dimensions or sparse voting histories remain imprecise. Despite the title, the principal empirical output is uncertainty estimation rather than a demonstrated bias-correction procedure.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: polynomial trajectories link legislator positions across Congresses.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: bootstrap coordinates require consistent polarity and scale before aggregation.

## Related Papers

- Lewis and Poole (2004), *Measuring Bias and Uncertainty in Ideal Point Estimates via the Parametric Bootstrap*, Political Analysis 12:105–127: the cited predecessor for W-NOMINATE and quadratic-normal scaling.
- [[papers/fast-estimation-of-ideal-points-with-massive-data|Fast Estimation of Ideal Points with Massive Data]]: another ideal-point estimation framework using parametric bootstrap for uncertainty; the computational estimators and temporal assumptions differ.
