---
title: Partisan Symmetry
type: concept
aliases:
  - Partisan Symmetry Standard
definition: "Partisan symmetry requires the same seat share for either party when it receives the same vote share, evaluated through a counterfactual seats–votes relationship."
tags:
  - electoral-fairness
  - redistricting
---

## Overview

Partisan symmetry requires equivalent representation when the parties exchange vote shares. Operationalizing this ideal requires a model of counterfactual elections. It differs from proportional representation and from evaluating whether a map maximizes one party's seats among feasible alternatives.

## Key Ideas

- **Specify swing assumptions:** Linear uniform partisan swing adds the same vote-share increment in every district to construct a seats–votes curve. Other models need not yield the same curve.
- **Distinguish scores:** Mean–median compares the median and mean district share; partisan bias measures seat deviation at an even vote split; partisan Gini measures the area between the curve and its central reflection.
- **Understand perfect symmetry:** Under the linear-swing characterization of DeFord et al., ordered shares satisfy $(v_i+v_{k+1-i})/2=\bar v$ for every pair. This concerns numerical spacing, not the actual number of seats won at the observed vote share.
- **Keep turnout explicit:** The unweighted mean district share equals statewide vote share only under suitable turnout conditions, including equal turnout.
- **Interpret signs carefully:** With the convention MM equals median minus mean, a positive score is often interpreted as favoring the focal party. Feasible counterexamples show that this sign can disagree with which party secures an extreme seat outcome.
- **Separate fairness objectives:** Perfect counterfactual symmetry does not itself prevent extreme observed seat allocations. Assessing strategic map choice requires an explicit geographic and institutional comparison.

## Important Papers

- [[papers/implementing-partisan-symmetry-problems-and-paradoxes|Implementing Partisan Symmetry: Problems and Paradoxes]]: characterizes the standard under linear swing and demonstrates failures as a screen for extreme partisan outcomes.
- Katz, King, and Rosenblatt (2020), “Theoretical Foundations and Empirical Evaluations of Partisan Fairness in District-Based Democracies”: framework examined by DeFord et al.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: compare feasible maps under fixed geographic constraints instead of relying solely on vote-swing counterfactuals.
- [[concepts/partisan-advantage-decomposition|Partisan Advantage Decomposition]]: distinguishes normative fairness from geographic, legal, and discretionary sources of seats.
