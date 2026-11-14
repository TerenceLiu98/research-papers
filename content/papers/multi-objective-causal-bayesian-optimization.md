---
title: Multi-Objective Causal Bayesian Optimization
type: paper
authors:
  - Shriya Bhatija
  - Paul-David Zuercher
  - Jakob Thumm
  - Thomas Bohne
year: null
tags:
  - causal-inference
  - bayesian-optimization
  - multi-objective-optimization
---

[[index|Library home]]

## TL;DR

MO-CBO searches over both which variables to intervene on and their assigned values to recover trade-offs between multiple expected outcomes. CAUSAL PARETOSELECT combines graphical intervention-set pruning with batch Bayesian optimization. On three small structural causal models, it improves front coverage over a baseline that intervenes on every treatment variable; in the confounded synthetic example, that baseline cannot reach the causal Pareto front.

## Research Question

How can a known causal graph guide economical discovery of Pareto-optimal interventions when several outcomes conflict and the causal mechanisms may be unknown?

## Motivation

Ordinary multi-objective Bayesian optimization fixes its input variables. In a causal system, fixing an additional variable also severs its incoming causal paths, potentially changing which outcomes are attainable. Choosing the intervention set is therefore part of the optimization problem, especially under hidden confounding.

## Contributions

- Defines a causal Pareto front over intervention set-value pairs and decomposes its search into local multi-objective problems (Section 3).
- Develops a graphical characterization of possibly Pareto-optimal minimal intervention sets and claims that restricting search to these sets preserves the global front (Section 4.1).
- Introduces CAUSAL PARETOSELECT, which allocates batches across local problems using relative hypervolume improvement (Section 4.2).

## Method

Each objective is an interventional expectation, $\mu_i(X_s,x_s)=\mathbb{E}[Y_i\mid\mathrm{do}(X_s=x_s)]$. For a fixed treatment subset, independent Gaussian processes approximate these objectives and DGEMO proposes diverse batches. The algorithm chooses one local batch using hypervolume improvement normalized by the local front's hypervolume, evaluates it, and updates that subset's surrogate. It finally filters the union of local solutions for global nondominance.

Graphical pruning uses the minimal unobserved-confounders' territory around the targets and its external parents, called the interventional border. Theorem 4.8 characterizes candidate subsets as those equal to the interventional border in their own intervened graph. Non-manipulable variables are handled through the projection described in Section 4.1. These are the paper's stated theoretical results, distinct from finite-budget empirical performance.

## Experiments

Section 5 evaluates two synthetic models and HEALTH, a simplified model of PSA and statin-related outcomes. Each experiment uses five initial samples per intervention set, batches of five, and ten random seeds. The comparator is DGEMO acting on all treatment variables. Generational distance measures proximity to the true front; inverted generational distance measures coverage. The budget counts individual intervened variables, rather than just evaluation calls.

| Setting | Reported outcome |
| --- | --- |
| SYNTHETIC-1, without hidden confounding | Both methods approach the front; pruning four treatment variables to the subset of two target parents improves coverage per intervention budget. |
| SYNTHETIC-2, with hidden confounding | Two candidate subsets remain. Only interventions on the subset containing X2 and X3 reach the global front; intervening on all treatments breaks a beneficial causal path. |
| HEALTH | Both methods reach the front, but interventions on BMI and Aspirin provide denser coverage at the same variable-level budget. |

Figures 4–7 support qualitative comparisons; the supplied prose does not give exact final GD or IGD values.

## Limitations

The graph is assumed known, and the experiments do not establish robustness to incorrect causal structure. The algorithm needs initial interventional data and uses independent outcome surrogates; the authors identify missed shared information as a limitation. Evidence covers three small models and one baseline, with HEALTH explicitly described as a simplified illustrative example rather than clinical validation. The graphical reduction does not itself establish finite-budget convergence of the optimizer.

The supplied Markdown does not identify a publication year, venue, or stable paper identifier; these metadata are left unspecified.

## Related Concepts

- [[concepts/causal-pareto-optimization|Causal Pareto Optimization]]
- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]]: the broader study of conflicting criteria; this paper seeks nondominated interventions without selecting preference weights.

## Related Papers

- Aglietti et al. (2020), *Causal Bayesian Optimization*: the single-outcome foundation extended here.
- Lee and Bareinboim (2018), *Structural Causal Bandits: Where to Intervene?*: the graphical intervention-set analysis generalized to multiple targets.
- Konakovic Lukovic, Tian, and Matusik (2020), *Diversity-Guided Multi-Objective Bayesian Optimization with Batch Evaluations*: supplies DGEMO, used both inside the proposed algorithm and as its baseline.
