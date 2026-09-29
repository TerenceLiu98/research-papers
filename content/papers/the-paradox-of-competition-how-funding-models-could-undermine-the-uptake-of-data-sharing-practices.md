---
title: "The paradox of competition: How funding models could undermine the uptake of data sharing practices"
type: paper
authors:
  - Thomas Klebel
  - Federico Bianchi
  - Tony Ross-Hellauer
  - Flaminio Squazzoni
year: 2025
doi: 10.1016/j.respol.2025.105340
tags:
  - open-science
  - research-funding
  - data-sharing
  - agent-based-modeling
---

## TL;DR

An agent-based model of 100 research teams finds that highly selective large grants can accelerate initial data sharing while producing lower long-run uptake than more distributive funding. Weak sharing incentives have little effect, and stronger incentives cannot fully overcome sharing costs. Network influence complicates this comparison: the most distributive scheme can also reduce sharing by weakening the need to share to obtain funding. These are conditional simulation results, not measured effects of actual funding reforms.

## Research Question

Can funder incentives sustain widespread data sharing? Do highly competitive large grants help adoption? How does scientific community structure change the speed and eventual extent of uptake?

## Motivation

Data sharing requires resources, preparation, and skills, while grant competition rewards other dimensions of research performance. The paper argues that evaluating sharing policies requires modeling how teams adjust their behavior after funding success or failure. Immediate adoption can be a poor guide to whether a practice persists (Sections 1-2).

## Contributions

- Couples grant allocation, costly sharing, and adaptive team behavior in a scenario model of scientific funding.
- Separates the weight placed on sharing in proposal evaluation from the fraction of teams funded out of a fixed pool.
- Compares transient and long-run sharing alongside resource inequality and funding persistence.
- Tests how peer influence changes adoption and reveals non-monotonic responses to incentives and funding selectivity.

## Method

Teams start with uniformly distributed resources and receive equal baseline funding each round, with baseline rate $\beta=1/n$. Preparing proposals costs 5% of current resources. Proposal scores are normally distributed with standard deviation 0.15 and mean

$$
\mu_{i,t}=(1-\alpha)R_{i,t}+\alpha e_{i,t},
$$

where resources are normalized to $[0,1]$, $e$ is sharing effort, and $\alpha$ is the funder's sharing incentive. Top-ranked teams receive grants. The model holds the funding pool fixed while varying the funded fraction from 10% to 60% in ten-percentage-point increments, trading grant size against coverage (Section 3.1).

Sharing is a binary draw with probability $p_{i,t}=1/(1+\exp(-g e_{i,t}))$, with $g=1$ in the main simulations. Without networks, effort equals an adaptive utility initialized at -4. Utility increases when a team shared and its resources increased, or when it did not share and its resources failed to increase; otherwise it decreases. Table 1 gives a utility adjustment of 0.03. Sharing costs are $\lambda\beta p_{i,t}$, with $\lambda=0.1$: the cost cap is 10% of baseline funding, not 10% of total resources (Section 3.2).

With networks, effort averages the team's utility and the fraction of neighbors that shared in the preceding round minus 0.5. Peer influence therefore favors sharing when a majority of neighbors shared and discourages it when a minority shared. The experiments compare no network with random and two structured scientific-community networks. Degree, clustering, and path length vary together, so this is not an isolated manipulation of clustering (Section 3.3).

## Experiments

Each condition has 100 runs and up to 30,000 steps until stable dynamics. Outcomes include sharing rates, Gini coefficients for current and accumulated resources, effort by funding status, and correlations measuring initial-resource advantage and persistence of funding. Figures report means with bands of one standard deviation across runs (Section 3.4).

| Comparison | Reported result | Scope |
| --- | --- | --- |
| Incentive weight from 0 to 0.7, with 10% funded | A 10% weight yields only a small increase; a qualitative change appears at weights of at least 30%, with about half of teams sharing in the long run | No-network baseline, Section 4.1 |
| Stronger incentives above that threshold | Sharing largely plateaus, while greater funding turnover can reduce resource inequality and the association between initial resources and later funding | Not equivalent to eliminating all funding persistence |
| Funded fraction from 10% to 60%, with incentive weight 0.4 | More selective schemes show faster uptake followed by decline to lower long-run sharing; at funding coverage of at least 50%, the funded/unfunded effort difference disappears | No-network comparison, Section 4.2 |
| Adding peer networks | Sharing generally reaches lower levels than without networks; adoption often spikes and then declines | Differences among network structures are subtler than the difference from no network |
| Network exceptions | A 30% incentive can outperform stronger incentives; funding 60% of teams yields lower sharing than other funding schemes in random and high-clustering networks | Stronger incentives or wider funding coverage are not uniformly better, Section 4.3 |

The inequality result runs against the authors' initial concern: sharing incentives can give initially disadvantaged teams an alternative route to funding. However, disappearance of the correlation with initial resources does not imply absence of path dependence. In the funding-scheme experiments, the correlation between consecutive funding outcomes eventually approaches one (Sections 4.1-4.2).

## Limitations

The model is abstract and is not calibrated or validated against observed policy reforms. Simulation steps do not establish real-world adoption times. Incentive weights of 30-40% are deliberately strong and acknowledged as potentially unrealistic. The experiments operationalize incentives as proposal-score weights, so they do not directly establish the effects of enforced mandates with sanctions.

Behavior follows resource-based adaptation and a particular conformity rule. The model omits normative culture change, competing funders and mixed funding schemes, institutional interventions, and opportunity costs such as being scooped. It also does not model investments in infrastructure that could lower sharing costs. Sharing frequency is not a direct measure of data usability, reproducibility, or innovation; concerns about effects on research quality are discussion-level implications.

The main text reports sensitivity checks for sharing costs, proposal variability, and the logistic gain factor, including an amplification for larger gain in less competitive conditions. The supplementary results and model code are not included in the supplied Markdown and were not inspected. The parsed text contains damaged formulas and captions; the summary follows the explicit equations and accompanying prose rather than reconstructing missing details.

Source metadata: the supplied text gives the article DOI in its supplementary-data statement. The year above follows the DOI's 2025 component; a separate publication-date header is absent. The paper provides a [replication-code location](https://www.comses.net/codebase-release/a81cf8e7-1da9-4631-85c7-c511b9983ae9/) and an [article DOI](https://doi.org/10.1016/j.respol.2025.105340).

## Related Concepts

- [[concepts/research-data-sharing-incentives|Research Data Sharing Incentives]]: sharing rewards interact with preparation costs, funding coverage, and adaptive behavior.
- [[concepts/social-network-analysis|Social Network Analysis]]: community topology determines which peers enter the sharing-expectation rule.

## Related Papers

- Smaldino, Turner, and Contreras Kallens (2019), "Open science and modified funding lotteries can impede the natural selection of bad science": cited comparison on funding design and research practices.
- Ross-Hellauer et al. (2022), "Dynamics of cumulative advantage and threats to equity in open science: A scoping review": cited motivation for examining resource inequality.
- Woods and Pinfield (2022), "Incentivising research data sharing: A scoping review": cited background on sharing-policy evidence.
- [[papers/a-model-of-long-term-conflict-resolution-and-cooperation|A Model of Long-Term Conflict Resolution and Cooperation]]: a library comparison, not a citation in this paper, that also distinguishes immediate intervention gains from persistence under social learning in a different domain.

[[index|Library home]]
