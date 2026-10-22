---
title: Partisan Advantage Decomposition
type: concept
aliases:
  - Decomposition of Partisan Advantage
  - Structural and Discretionary Partisan Advantage
tags:
  - redistricting
  - partisan-advantage
  - electoral-fairness
  - political-geography
---

## Overview

Partisan advantage decomposition separates the difference between a party's enacted-map seats and an ideally fair seat allocation into effects attributed to the fairness standard, political geography, legal redistricting constraints, and mapmakers' discretion. It makes explicit that an observed seat advantage is relative to a normative ideal and need not be wholly caused by intentional gerrymandering.

## Key Ideas

- **Construct a benchmark chain:** Compare ideal seats $I$, vote-share-expected seats $T$, a geographic allocation $G$, a neutral allocation under legal constraints $N$, and enacted-map seats $S$.
- **Use an additive identity:** $S-I=(S-N)+(N-G)+(G-T)+(T-I)$. The terms correspond to discretion, electoral law, geography, and the fairness ideal.
- **Distinguish total and discretionary advantage:** Total advantage evaluates an enacted outcome against a normative ideal. Discretionary advantage compares it with a representative outcome among maps satisfying modeled constraints.
- **Keep the fairness ideal visible:** Proportionality, the Efficiency Gap, the Quadratic Rule, or another vote-to-seat ideal can yield different fair seat counts from the same votes. The ideal component records rather than conceals this normative choice.
- **Interpret components relative to their models:** A geographic benchmark determines what counts as geography, while a [[concepts/redistricting-ensembles|Redistricting Ensemble]] determines what counts as a neutral legal baseline. Changing either can move advantage between components.
- **Do not equate residuals with intent:** An enacted-minus-neutral difference identifies unusual map choice relative to the modeled ensemble. Establishing deliberate partisan intent requires additional legal, procedural, or historical evidence.
- **Separate structure from discretion carefully:** Defining fairness, geography, and law as structural is analytically useful, but ensemble criteria can encode prior discretionary choices. Minority-district requirements are a salient example when simulated plans inherit features of an enacted map rather than independently modeling legal necessity.

## Important Papers

- [[papers/a-decomposition-of-partisan-advantage-in-electoral-district-maps|A Decomposition of Partisan Advantage in Electoral District Maps]] introduces the four-factor framework and applies it to 2021-2022 U.S. congressional maps.
- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]] uses simulated maps to separate enacted boundaries from geographic change and electoral competition.

## Related Concepts

- [[concepts/redistricting-ensembles|Redistricting Ensembles]]
- [[concepts/geographic-polarization|Geographic Polarization]]
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]
- [[concepts/firm-gerrymandering|Firm Gerrymandering]]
