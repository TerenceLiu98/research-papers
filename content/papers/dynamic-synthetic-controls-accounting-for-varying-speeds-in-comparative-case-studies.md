---
title: "Dynamic Synthetic Controls: Accounting for Varying Speeds in Comparative Case Studies"
type: paper
authors:
  - Jian Cao
  - Thomas Chadefaux
year: 2024
doi: 10.1017/pan.2024.14
tags:
  - causal-inference
  - synthetic-control
  - time-series
---

## TL;DR

Dynamic synthetic control (DSC) warps donor trajectories to account for differing response speeds before applying synthetic control. It transfers timing relationships learned from untreated histories without aligning against treated post-intervention outcomes. Simulations and placebo comparisons in three empirical applications show lower errors than standard synthetic control under the evaluated designs.

## Research Question

How can comparative case studies distinguish treatment effects from differences in how quickly units respond to common shocks?

## Motivation

Units may follow similar underlying processes at different, time-varying speeds. Contemporaneous donor averages can then fit poorly or attribute timing differences to treatment. A fixed lag cannot generally represent speed differences that change with the direction of a series.

## Contributions

- Formulates heterogeneous response speeds as omitted time-varying lag effects in standard synthetic control.
- Introduces a three-step alignment procedure using [[concepts/dynamic-time-warping|Dynamic Time Warping]].
- Evaluates treatment-effect error in simulations and untreated-unit placebo error in three established applications.
- Provides the R package `dsc`; the supplied article reports online publication on 5 November 2024.

## Method

1. Align the treated unit's pretreatment history with each donor using DTW, storing a warping path. The treated cutoff maps to a donor-specific index, so the corresponding donor segments need not share the same calendar cutoff.
2. Use two sliding windows to match each post-cutoff donor segment to a similar segment in that donor's earlier history. Combine this within-donor alignment with the earlier donor-to-treated alignment to infer a post-treatment warping path.
3. Warp the donor's pre- and post-treatment segments, concatenate them, and apply standard synthetic control to the warped donor series.

The estimated effect is the observed treated outcome minus its weighted warped-donor counterfactual. Direct alignment to the treated post-treatment series is avoided because it could erase treatment-induced changes in either levels or speed. The transfer instead relies on historical patterns carrying useful information about inherent response-speed relationships.

## Experiments

**Monte Carlo study (Section 4.1).** Panels contain ten units over 100 periods, with nine donors and a shared ARIMA process observed at different speeds. The parameter ψ controls how strongly speed depends on whether the process rises or falls rather than random variation. Evaluation uses treatment-effect MSE over periods 61–70. DSC wins in 77% of comparisons (reported Wilcoxon p < 0.001). Mean logged MSE is 0.90 for standard SC and −0.50 for DSC. At ψ = 1, the mean log MSE ratio is −1.39; its exponentiation implies a 75.19% reduction on the geometric-ratio scale, not an arithmetic mean percentage reduction. The abstract separately summarizes improvements as up to 70%.

**Empirical reanalyses (Section 4.2).** Untreated-unit placebo comparisons use leave-one-unit-out resampling to expand the comparison set. Tests concern paired log MSE ratios:

| Application | Treated-unit finding | Placebo comparison |
| --- | --- | --- |
| Basque terrorism and GDP | Effect similar to standard SC | t = −7.91, p < 0.0001 |
| California Proposition 99 | About 31 fewer cigarette packs, versus 26 in the original study | t = −4.88, p < 0.001 |
| German reunification | Effect broadly similar to standard SC | t = −4.15, p < 0.001 |

Negative test statistics favor DSC. These empirical results establish improved reconstruction of untreated trajectories in the reported comparisons; the actual treated-unit counterfactuals remain unobserved.

## Limitations

Historical timing relationships must remain informative for post-treatment donor patterns. Avoiding direct post-treatment alignment protects the treatment signal but does not independently establish causal identification. The paper leaves sensitivity to unobservable variables and endogenous regressors for future research. Simulation gains depend on the examined process and speed designs; empirical placebo improvements do not determine which treated-unit estimate is true. The supplied Markdown omits the supplementary algorithm and several footnote details, so implementation settings cannot be fully reconstructed from it.

## Related Concepts

- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: supplies the temporal alignment paths used to transform donors.

## Related Papers

- [[papers/a-bayesian-alternative-to-synthetic-control-for-comparative-case-studies|A Bayesian Alternative to Synthetic Control for Comparative Case Studies]]: a complementary approach to evolving counterfactual trajectories using latent factors and posterior prediction rather than donor warping.
- Abadie and Gardeazabal (2003), “The Economic Costs of Conflict: A Case Study of the Basque Country”: source of the terrorism application.
- Abadie, Diamond, and Hainmueller (2010), “Synthetic Control Methods for Comparative Case Studies”: source of the California application.
- Abadie, Diamond, and Hainmueller (2015), “Comparative Politics and the Synthetic Control Method”: source of the reunification application.
