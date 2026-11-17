---
title: "Conformity to popular, not average, opinions: Models, data, and evolution"
type: paper
authors:
  - Kaleda K. Denton
  - Marcus W. Feldman
  - Jonathan F. Johannemann
year: 2026
tags:
  - opinion-dynamics
  - conformity
  - social-learning
---

## TL;DR

Copying densely clustered opinions can explain numerical belief revision better than averaging peers’ estimates. Extending a continuous-trait conformity model with personal beliefs, the authors report better held-out fit than one- and two-stage French–DeGroot models across five experimental conditions under log-likelihood-based fitting. Illustrative simulations show faster movement toward extreme population averages and poorer crowd accuracy under conformity.

## Research Question

Does conformity to popular clusters, rather than weighted averages, better describe individual opinion revision, and does this distinction change collective dynamics?

## Motivation

An average can lie far from every observed opinion: equally sized groups estimating 0 and 100 have mean 50. A person copying a popular cluster may instead choose either endpoint. Treating both processes as averaging can obscure different mechanisms of consensus and polarization.

## Contributions

- Extends continuous-trait conformity to incorporate personal beliefs and samples of fewer than three peers.
- Compares two- and four-parameter conformity models with two French–DeGroot averaging baselines using human estimation data.
- Demonstrates different population outcomes across complete, static random, and adaptively rewired networks.

## Method

For each candidate opinion, compute its **k-dispersal**, the sum of distances to its k nearest other opinions. Positive conformity strength d favors candidates with below-average dispersal; negative d favors dispersed candidates, and zero gives random copying. The observer’s own opinion joins the candidate set, with its adoption weight multiplied by alpha before probabilities are renormalized. A chosen opinion centers a normal distribution truncated to [0, 1], with pre-truncation standard deviation sigma.

The French–DeGroot baselines update the opinion vector using a row-stochastic trust matrix T or its square. Personal opinions receive weight alpha relative to each peer. For density-based comparison, their weighted-average predictions center truncated normal distributions with pre-truncation standard deviation sigma times the square root of the sum of squared normalized weights, assuming independent initial estimates.

The two-parameter conformity model fixes d = 0.8 and k = 2 while fitting alpha and sigma, matching the baselines’ parameter count. The four-parameter version fits all four. HyperOpt’s tree-structured Parzen estimator optimizes the sum of log predictive densities; mean and median density objectives are sensitivity analyses.

## Experiments

The reanalysis uses Almaatouq et al.’s scatterplot-correlation experiments: 719 and 702 participants, groups of 12, and 20 rounds. Five nonsolo conditions vary static versus chosen neighbors and performance feedback. After exclusions, odd rounds supply 9,931 training observations and even rounds 9,971 test observations. Subset A removes unchanged guesses; subset B removes players who revise little. Pairwise t tests and Wilcoxon tests compare participant-averaged predictive densities to account for repeated rounds.

Under log-likelihood fitting, both conformity variants significantly outperform both averaging models in every condition for the full data and both subsets (Section 2.3). Fitted conformity sigma values are below 0.08, versus above 0.2 for averaging. The four-parameter model selects positive d in all five conditions. Mean-density optimization mostly preserves the performance advantage, but median-density results are mixed for the full data and subset A; alternative objectives can also yield negative fitted d.

Simulations use 100 agents, up to three sampled peers, 1,000 steps, and 30 replicates, with alpha = 2, sigma = 0.08, d = 0.8, and k = 2. They compare uniform initial opinions with a polarized initialization. In complete and static random networks, conformity often moves the population mean toward extremes faster and sustains more polarization. Adaptive networks reward accuracy relative to truth 0.9: conformity yields population means farther from truth than averaging. Personal beliefs remain fixed in this adaptive scenario, whereas they update over time in the other two scenarios.

## Limitations

The simulations illustrate possible long-run consequences rather than reproduce the behavioral experiment. The empirical analysis models exposure to initial peer estimates even though participants could observe subsequent revisions in real time. Odd/even splitting evaluates held-out rounds, not unseen participants. Model rankings and inferred conformity depend on the fitting objective. The causal connection between higher polarization and reduced crowd wisdom remains unresolved. Supplementary tables are cited by the supplied text but are not included, so exact significance values are not reproduced. No stable paper identifier is supplied.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: contrasting microscopic updating rules changes collective predictions.
- [[concepts/conformity-to-continuous-traits|Conformity to Continuous Traits]]: popularity is defined through local opinion density.

## Related Papers

- Heinrich Mora et al. (2025), “Conformity to continuous and discrete ordered traits”: the conformity model extended here.
- Almaatouq et al. (2020), “Adaptive social networks promote the wisdom of crowds”: supplies the behavioral data and adaptive-network comparison. Data: https://doi.org/10.7910/DVN/EOYZKH.
- [[papers/opinion-dynamics-statistical-physics-and-beyond|Opinion dynamics: Statistical physics and beyond]]: broader context for distinguishing influence mechanisms from collective outcomes.

Study code reported in the paper: https://github.com/kaleda/estimation-biases.
