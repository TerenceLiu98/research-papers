---
title: Institutional Leeway
type: concept
aliases:
  - Partisan Leeway
tags:
  - institutional-design
  - redistricting
  - game-theory
  - causal-inference
---

## Overview

Institutional leeway measures how much a political actor can shape an outcome within a sequence of formal institutional constraints. In redistricting, McCartan et al. (2026) construct it from the equilibrium of a game spanning proposals, vetoes, stalemate resolution, and court review. The resulting scalar preserves strategic interactions that a simple commission indicator or count of veto points would miss.

## Key Ideas

- **Sequence matters:** An independent initial map drawer may remain constrained by a later partisan veto. Institutional effects depend on who acts, in what order, and under whose control.
- **Equilibrium as measurement:** Backward induction maps a vector of procedural features into expected partisan utility. The score is a treatment summary constructed without fitting it to observed electoral outcomes; it is not itself an estimate of seats gained.
- **Realized versus maximum control:** Realized leeway uses observed partisan control and retains a partisan sign. Its absolute value measures magnitude. Maximum leeway evaluates institutional permissiveness under unified partisan control, separating rules from current officeholders.
- **Model nonpartisan uncertainty:** In the redistricting application, nonpartisan actions and litigation outcomes are moves by nature. Averaging over parameter draws assesses sensitivity to these specifications, but stable rankings do not establish that the underlying game is correct.
- **Sufficiency is an assumption:** Using leeway as a causal treatment requires configurations with the same score to have the same potential outcomes. Reforms that influence outcomes through omitted dimensions can violate this reduction.
- **Measurement and identification are separate:** A theoretically grounded score can be combined with continuous-treatment difference-in-differences, but confounding still requires an identification strategy. [[concepts/redistricting-ensembles|Redistricting Ensembles]] can adjust the outcome baseline for geography without proving parallel trends.
- **Counterfactual use is conditional:** Hypothetical institutional rules can be mapped to new scores and evaluated with an estimated dose-response relationship. Nationwide reform projections depend on extrapolation, political geography, and the assumed stability of that relationship.

## Important Papers

- [[papers/redistricting-reforms-reduce-gerrymandering-by-constraining-partisan-actors|Redistricting Reforms Reduce Gerrymandering by Constraining Partisan Actors]]: develops the score from 14 procedural features and combines it with simulation-adjusted causal analysis of the 2010 and 2020 congressional redistricting cycles.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: distinguish institutional influence on enacted plans from the specified geographic baseline.
- [[concepts/geographic-polarization|Geographic Polarization]]: changing spatial voting patterns can alter electoral outcomes independently of institutional leeway.
