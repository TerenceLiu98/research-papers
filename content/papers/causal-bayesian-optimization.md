---
title: Causal Bayesian Optimization
type: paper
authors:
  - Virginia Aglietti
  - Xiaoyu Lu
  - Andrei Paleyes
  - Javier González
year: null
tags:
  - causal-inference
  - bayesian-optimization
---

[[index|Library home]]

## TL;DR

Causal Bayesian Optimization (CBO) selects both which variables to intervene on and their values. A known causal graph reduces candidate intervention sets, while observationally informed Gaussian process priors and cost-normalized expected improvement guide experiments. Synthetic and application-inspired simulator experiments show that smaller intervention sets can reduce cost and reach outcomes unavailable when every variable is fixed.

## Research Question

How can observational data and a known causal graph guide economical optimization of an expected outcome through sequential interventions?

## Motivation

Fixing every controllable variable can sever useful causal pathways. Optimizing over intervention subsets therefore changes both evaluation cost and attainable outcomes. Observations can inform causal effects when identification assumptions hold, but interventions remain needed beyond observational coverage.

## Contributions

- Formulates causal global optimization over intervention subsets and values, including the option of no intervention.
- Uses minimal and possibly-optimal minimal intervention sets to reduce the search space.
- Introduces causal Gaussian process priors informed by do-calculus estimates, a cost-aware acquisition rule, and an observation–intervention policy.

## Method

For each retained subset, CBO models the expected outcome under intervention with a separate Gaussian process. Its prior mean is an observational estimate of the interventional expectation. Its kernel adds a product of estimated interventional standard deviations to an RBF kernel (Equations 2–4). Actual interventions update the posterior.

The acquisition rule compares expected improvement per intervention cost across subsets using a shared incumbent. An epsilon-greedy policy chooses whether to collect observations or intervene; the proposed probability uses observational convex-hull coverage relative to the intervention domain and the current observation count relative to a specified maximum. New observations update causal priors, while new interventions refine the selected surrogate (Sections 3.3–3.5).

Graphical pruning distinguishes minimal intervention sets, which exclude redundant manipulated variables, from possibly-optimal sets, which can be optimal in a compatible structural model. This uses earlier causal-bandit results rather than learning the graph.

## Experiments

Comparators are ordinary BO intervening on all treatment variables and CBO with a zero-mean RBF prior. Results track convergence and cumulative intervention cost across initializations; synthetic experiments also vary observational sample size and cost structure.

| Setting | Setup and reported finding |
| --- | --- |
| Toy model | 100 observations and 3 initial intervention points; the reported optimum sets Z to −3.20. CBO converges faster; the all-variable baseline pays twice the per-evaluation node cost. |
| Confounded synthetic model | 10 initial intervention points and varying observation counts. Candidate subsets contain at most two variables, versus three for BO. The reported optimum sets B and D to (−5.0, 3.28); the causal prior improves convergence. |
| Coral ecology | A linear simulator fitted to 50 real observations generates 500 observations, with 1 initial intervention point. A maximum of three manipulated variables yields 25 candidate subsets. The optimum sets aragonite saturation, total alkalinity, and dissolved inorganic carbon to (2, 2550, 1950). All-five-variable BO violates the intervention constraint and is not a viable comparator. |
| Healthcare | A PSA simulator supplies 500 observations and 3 initial intervention points. The reported optimum sets aspirin and statin to (0, 1) within their simulated domains. |

The ecology and healthcare results are simulator evaluations, not prospective field or clinical interventions. The supplied text supports qualitative convergence comparisons rather than precise percentage improvements.

## Limitations

CBO assumes a known graph and relies on identifiable causal effects for observational prior construction. Graph uncertainty and multi-objective optimization are left for future work. Separate Gaussian processes require maintaining multiple surrogate models; the paper reports cubic time and quadratic storage in the number of function evaluations for GP operations. It supplies no general finite-budget regret guarantee for its expected-improvement algorithm. The parsed text contains inconsistent optimization-direction notation and acquisition pseudocode, so the account above states the intended cost-normalized rule without treating those expressions as an implementation specification.

The supplied Markdown does not explicitly identify the paper's publication year or stable identifier; these are left unspecified.

## Related Concepts

- [[concepts/causal-global-optimization|Causal Global Optimization]]
- [[concepts/gaussian-process-regression|Gaussian Process Regression]]
- [[concepts/causal-pareto-optimization|Causal Pareto Optimization]]

## Related Papers

- Lee and Bareinboim (2018), *Structural Causal Bandits: Where to Intervene?*: supplies graphical intervention-set reasoning used here.
- Lee and Bareinboim (2019), *Structural Causal Bandits with Non-Manipulable Variables*: addresses restrictions on manipulability.
- [[papers/multi-objective-causal-bayesian-optimization|Multi-Objective Causal Bayesian Optimization]]: the library's related extension to conflicting outcomes and Pareto-front discovery.
