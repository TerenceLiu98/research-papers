---
title: "Talent vs Luck: The Role of Randomness in Success and Failure"
type: paper
authors:
  - A. Pluchino
  - A. E. Biondo
  - A. Rapisarda
year: 2018
tags:
  - agent-based-modeling
  - success-inequality
  - randomness
  - research-funding
  - meritocracy
---

## TL;DR

The [[concepts/talent-vs-luck-model|Talent vs Luck Model]] combines normally distributed talent with random opportunities and multiplicative gains and losses. Its simulations generate a power-law-like distribution of success in which the most successful agents are usually not the most talented. In simulated research-funding comparisons, small grants distributed broadly or randomly raise the share of talented agents ending above their initial capital more efficiently than allocations based on prior success. These findings are properties of a stylized model, not estimates of how real careers or funding systems respond.

## Research Question

Can random events reconcile a roughly Gaussian distribution of individual talent with a highly unequal distribution of success, and which resource-allocation rules best preserve opportunities for talented individuals when luck strongly affects outcomes?

## Motivation

Observed success is often treated as evidence of underlying merit even though careers depend on external opportunities and setbacks. This creates an identification problem for [[concepts/outcome-based-meritocracy|Outcome-Based Meritocracy]]: past performance can reflect both talent and realized luck, so rewarding past winners may amplify chance advantages. The paper asks whether a minimal agent-based model can reproduce this mismatch and compare possible funding responses.

## Contributions

- Introduces a spatial agent-based model in which talent affects the ability to exploit lucky events, while unlucky events reduce success independently of talent.
- Shows how multiplicative random events can transform homogeneous initial capital and normally distributed talent into a highly unequal, power-law-like success distribution.
- Separates individual and population-level claims: talent improves an individual's chance of exploiting an opportunity, but more numerous moderately talented agents are more likely to include the most fortunate extreme winner.
- Compares egalitarian, prior-success-based, mixed, and random funding rules under a common simulated career process.
- Varies the talent distribution and prevalence of favorable events to examine education, training, and environmental opportunity as stylized interventions.

## Method

The model contains 1,000 stationary agents on a periodic $201\times201$ grid and 500 mobile event points. Each agent starts with capital $C(0)=10$ and a fixed talent $T\in[0,1]$ drawn from a truncated normal distribution with mean 0.6 and standard deviation 0.1. Half of the event points are lucky in the reference setting. Events perform random walks, while careers run for 80 six-month steps, representing 40 years.

When a lucky event intersects an agent, capital doubles with probability $T$; when an unlucky event intersects an agent, capital halves regardless of talent. No intersection leaves capital unchanged. Talent therefore changes the probability of converting an opportunity into success, while exposure to opportunity is random and gains and losses are multiplicative. The simulations were implemented in NetLogo (Section 2).

The funding experiments distribute resources every five years. They compare equal allocations to everyone, allocations to the most successful agents, mixed allocations, and allocations to randomly selected shares of the population. The principal policy outcome is $P_T$, the percentage of agents with $T>m_T+\sigma_T$ whose final capital exceeds their initial capital. Efficiency is the increase above the no-funding value divided by total distributed capital (Section 3.1).

## Experiments

In one reference run, the final success distribution has a reported power-law tail slope of -1.27 and follows an 80/20 split. The highest-capital agent has talent 0.61, close to the population mean, while the most talented agent ($T=0.89$) finishes below one capital unit. Lucky- and unlucky-event counts are strongly associated with final capital in this constructed process (Section 2.1).

Across 100 runs, the aggregate tail slope is -1.33. The overall maximum capital is 40,960 for an agent with talent 0.6048; the most talented agent among the 100 run winners has talent 0.91 and capital 2,560. Across 10,000 runs, winner talent is approximately Gaussian with mean 0.667 and standard deviation 0.09. Agents above one standard deviation in talent nevertheless have higher average capital than average-talent agents, while only 32% of that high-talent group finish above their initial capital in the 100-run experiment (Section 2.2).

In the variable-budget funding comparison, giving every agent one unit every five years has the highest normalized efficiency. It raises $P_T$ from 32.05% without funding to 69.48% using 8,000 total units. Funding a random 25% with five units produces $P_T=68.00\%$ using 10,000 units, whereas funding the currently best 25% with five units produces $P_T=41.08\%$ for the same total. When every strategy receives 80,000 units, equal allocation again ranks first ($P_T=98.14\%$), closely followed by random funding of 50% ($P_T=97.12\%$) and a mixed rule ($P_T=96.13\%$); allocations restricted to prior top performers rank lower (Figures 10-12).

Changing the talent distribution produces modest increases in the share of high-talent agents ending above initial capital: $P_T=38\%$ after doubling the talent standard deviation and $37.5\%$ after raising mean talent to 0.7. Changing environmental opportunity has a larger modeled association: $P_T=62.18\%$ with 80% lucky events and $8.75\%$ with 20% lucky events (Section 3.2).

## Limitations

The results come from a deliberately simple toy model and are not calibrated or validated against longitudinal career or grant data. Capital is used interchangeably as wealth and success, while talent compresses intelligence, skill, effort, persistence, and related traits into one fixed scalar. Agents begin equally, remain spatially fixed, do not interact socially, and encounter exogenous events whose lucky or unlucky status is stipulated.

The doubling and halving rules impose multiplicative inequality, and the model makes talent relevant only to exploiting favorable events. Its policy rankings are therefore conditional on these assumptions, the selected parameter values, and the outcome $P_T$. The simulations do not model peer review, project quality, collaboration, learning, behavioral responses to incentives, administrative costs, or the scientific value produced by funded work. Broad or random funding performing well inside this model does not by itself establish that either policy would outperform expert selection in practice.

The education and environment experiments reinterpret parameter changes rather than modeling educational institutions or countries. Their reported differences should be read as sensitivity analyses, not causal estimates of education or national opportunity.

## Related Concepts

- [[concepts/talent-vs-luck-model|Talent vs Luck Model]]
- [[concepts/outcome-based-meritocracy|Outcome-Based Meritocracy]]
- [[concepts/research-diversification|Research Diversification]]: broad funding is motivated partly by preserving a diversity of ideas, although the model does not represent research topics directly.

## Related Papers

- Sinatra et al. (2016), "Quantifying the evolution of individual scientific impact": cited evidence that a scientist's highest-impact work can occur at any career stage.
- Fortin and Currie (2013), "Big Science vs. Little Science: How Scientific Impact Scales with Funding": cited evidence motivating diversified rather than concentrated funding.
- Mongeon et al. (2016), "Concentration of research funding leads to decreasing marginal returns": cited evidence on funding concentration and research output.
- [[papers/the-paradox-of-competition-how-funding-models-could-undermine-the-uptake-of-data-sharing-practices|The Paradox of Competition: How Funding Models Could Undermine the Uptake of Data Sharing Practices]]: a library comparison using a different agent-based model of competitive funding and researcher behavior; it is not cited by this paper.

[[index|Library home]]
