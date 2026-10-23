---
title: "Managing Congestion in Matching Markets"
type: paper
authors:
  - Nick Arnosti
  - Ramesh Johari
  - Yash Kanoria
year: null
tags:
  - matching-markets
  - market-design
  - search-frictions
  - mean-field-games
---

## TL;DR

A dynamic two-sided matching model shows how costly applications, costly screening, and uncertainty about applicant availability create [[concepts/matching-market-congestion|Matching Market Congestion]]. Equilibrium is either screening-limited, with employer participation and welfare suppressed by rejected offers, or application-limited, with applicants over-applying in a tragedy of the commons. Application limits can improve one or both sides' welfare; higher application costs reproduce employer-side gains but hurt applicants, while a suitable market-wide wage can reproduce the aggregate welfare of a binding application limit under stated conditions.

## Research Question

How do decentralized application and screening decisions generate congestion in asynchronous matching markets, and which simple platform interventions can reduce the resulting welfare losses?

## Motivation

On online labor, dating, and accommodation platforms, participants often cannot observe whether a potential partner is still available. Applicants may pay to contact employers who never inspect their applications, while employers may pay to screen candidates who have already matched. Standard search models do not jointly capture costly screening, uncertain availability, and employers making multiple offers, yet these features determine whether more applications improve matching or merely displace effort.

## Contributions

- Formulates a stochastic dynamic market in which applicants choose application intensity and employers decide whether to enter, screen sequentially, and make offers.
- Establishes existence and uniqueness of a stationary mean-field equilibrium and classifies it into screening-limited and application-limited regimes.
- Characterizes applicant and employer welfare and identifies when congestion is particularly severe: employers obtain zero welfare in the homogeneous screening-limited regime, while applicant welfare can be far below its frictionless benchmark when applicants are abundant in an application-limited market.
- Shows that a binding application limit can raise employer welfare, applicant welfare, or both; in every screening-limited market, some limit is a strict Pareto improvement within the model.
- Compares application limits with higher application costs and platform-set wages, separating reductions in application volume from transfers and direct applicant costs.
- Justifies the mean-field analysis as a large-market approximation using a stochastic contraction argument and proves approximate optimality in sufficiently large finite markets.

## Method

Employers arrive at rate proportional to market size and remain active for one unit of time. Applicants arrive at relative rate $r$, remain for one unit, and apply independently across active employers at an intensity they choose. Compatibility is independently realized with probability $\beta$. An employer pays a cost for each screened applicant and screens sequentially until hiring or exhausting the pool; an applicant pays per application and accepts the first compatible offer.

The stationary mean-field state is summarized by $p$, the probability that an application produces an offer, and $q$, the probability that a screened applicant remains available. Applicants choose application intensity $m$ as a best response to $p$. Employers screen whenever the expected benefit $\beta q$ exceeds the screening cost, exit when it falls short, and may mix at equality. Consistency equations connect $(m,\alpha)$, where $\alpha$ is the fraction of employers that screen, to $(p,q)$. The paper proves that these equations and the two sides' best responses admit a unique mean-field equilibrium.

The regime distinction follows employer participation. In a **screening-limited** equilibrium, some employers do not screen because low applicant availability makes screening break even; homogeneous employer welfare is therefore zero. In an **application-limited** equilibrium, all employers screen, but applicants do not internalize the congestion imposed by additional applications. The paper derives welfare expressions and studies an application cap $\ell$, a higher per-application cost, and a platform-set wage.

For finite-market justification, the authors discretize applicant age into bins. They show that the deterministic state update contracts toward its stationary point, bound stochastic deviations around that update, and use the resulting concentration to establish the limiting offer and availability distributions. Mean-field strategies then form an additive approximate equilibrium for large markets, subject to the theorem's bounded-application conditions.

## Experiments

The evidence is theoretical and numerical rather than empirical. The analytical results include:

| Setting | Reported result |
| --- | --- |
| Unregulated market | The stationary mean-field equilibrium exists and is unique. |
| Screening-limited regime | Homogeneous employer welfare is zero; some application limit strictly improves both applicant and employer welfare. |
| Application-limited regime | When applicants are relatively abundant, uncoordinated over-application can make applicant welfare a small fraction of its frictionless benchmark. |
| Application limits | Applicant and employer welfare are unimodal in the induced application volume; an appropriate limit improves the side harmed by congestion. |
| Higher application costs | For any application intensity attainable by a limit, a unique higher cost gives employers the same welfare, but equilibrium applicant welfare weakly decreases with the cost. |
| Platform-set wage | When a binding limit induces full employer screening, a suitable wage without a limit reproduces the same strategies and aggregate welfare, but redistributes welfare toward employers. |
| Large finite markets | Mean-field offer and availability laws are asymptotically valid, and mean-field strategies are approximately optimal for sufficiently large markets. |

Numerical figures map welfare gains over the model's parameter space. One reported illustration finds that a single application limit attains at least three quarters of each side's separately optimized welfare across the displayed parameter grid. The paper presents this as numerical evidence and a conjectured general bound, not as a theorem.

## Limitations

- The base model has homogeneous agents, independent compatibility, fixed lifetimes, random applications, and no preference ranking among acceptable partners. Heterogeneity extensions cover employer selectivity or applicant skill but do not remove all of these restrictions.
- Availability is unobserved by employers and prices are not formed endogenously. The wage exercise gives the platform a common price-setting instrument rather than modeling bargaining or decentralized wage posting.
- The results concern a benchmark asynchronous market and do not estimate intervention effects from platform data. Numerical parameter sweeps illustrate the model rather than validating it externally.
- Welfare comparisons omit platform objectives and distributional concerns beyond the two modeled sides. Equal aggregate welfare under a wage and an application limit can conceal different applicant and employer outcomes.
- The finite-market approximation is asymptotic. Its approximate-equilibrium theorem restricts attention to employers receiving at most a fixed number of applications, and it does not supply an empirical market-size threshold for a particular platform.

## Related Concepts

- [[concepts/matching-market-congestion|Matching Market Congestion]]: wasted applications and screening caused by decentralized competition and uncertain availability.
- [[concepts/graphon-mean-field-games|Graphon Mean Field Games]]: another mean-field framework for strategic interaction in large populations; the present paper instead studies a homogeneous dynamic matching market and proves a finite-market approximation through contraction.

## Related Papers

- Albrecht, Gautier, and Vroman, "Equilibrium Directed Search with Multiple Applications": a cited multiple-application search model in which employers make only one offer.
- Galenianos and Kircher, "Directed Search with Multiple Job Applications": a cited comparison for multiple applications and large-market search.
- Coles et al., "The Job Market for New Economists: A Market Design Perspective": cited work on limited signals of applicant interest in a congested matching market.
- Fradkin, "Search, Matching, and the Role of Digital Marketplace Design in Enabling Trade": cited empirical motivation concerning unavailable partners and failed transactions on Airbnb.

The supplied Markdown does not state a publication year or stable paper identifier, so neither is inferred here.

[[index|Library home]]
