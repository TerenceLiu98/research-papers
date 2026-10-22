---
title: "A Decomposition of Partisan Advantage in Electoral District Maps"
type: paper
authors:
  - Jeffrey T. Barton
  - Jon X. Eguia
year: 2024
pii: "S026137942400129X"
tags:
  - redistricting
  - partisan-advantage
  - gerrymandering
  - electoral-fairness
  - political-geography
---

## TL;DR

This paper decomposes a party's seat advantage under an electoral map into four additive terms: the chosen fairness ideal, political geography, legal redistricting constraints, and mapmakers' discretion. Applied to 2021-2022 U.S. congressional maps using recent statewide elections, a jurisdiction-based geographic benchmark, and ALARM simulated maps, the framework attributes much of the advantage in Florida, Texas, and Illinois to discretionary map choice, while many other large advantages are mainly structural. The numerical attribution is benchmark-dependent, especially because the ensemble's treatment of the Voting Rights Act can classify discretionary packing as a legal constraint.

## Research Question

How much of a party's advantage in an electoral district map comes from the normative standard used to define fairness, the geographic distribution of voters, legal constraints on district design, and discretionary choices among legally admissible maps?

## Motivation

An enacted map can produce a large seat advantage without that entire advantage being attributable to partisan mapmaking. Single-member districts routinely convert vote majorities into larger seat majorities; residential and turnout patterns affect how votes aggregate; and legal requirements restrict the feasible map set. Courts and statutes also invoke different standards: some compare outcomes with an explicit vote-to-seat ideal, while others ask whether an enacted map is unusually favorable relative to maps satisfying neutral criteria. A single summary measure therefore obscures both the normative baseline and the mechanism producing the observed seat allocation.

## Contributions

- Defines an additive [[concepts/partisan-advantage-decomposition|Partisan Advantage Decomposition]] that separates fairness-ideal, geographic, legal, and discretionary components.
- Connects two common evaluations of redistricting: total advantage relative to an explicit ideal and discretionary advantage relative to a neutral ensemble benchmark.
- Operationalizes the framework for 44 congressional maps used in the 2022 election across states with at least two House seats.
- Compares proportional representation, the Efficiency Gap, and the Quadratic Rule rather than treating partisan fairness as a single uncontested criterion.
- Shows how [[concepts/redistricting-ensembles|Redistricting Ensembles]] can identify the discretionary component while also documenting how ensemble design affects its interpretation.

## Method

For party $k$, let $I_k$ be its ideally fair seats, $T_k$ the seats expected from statewide vote share alone, $G_k$ a geographic benchmark, $N_k$ a neutral benchmark incorporating geography and redistricting rules, and $S_k$ its seats under the enacted map. The paper writes partisan advantage as

$$
PA_k\mid I=S_k-I_k=(S_k-N_k)+(N_k-G_k)+(G_k-T_k)+(T_k-I_k).
$$

The four terms are, respectively, discretion $d_k$, electoral law $\ell_k$, geography $g_k$, and the fairness ideal $i_k(I)$. The paper calls $i_k(I)+g_k+\ell_k$ structural advantage and $d_k$ discretionary advantage.

The application averages outcomes from selected 2016, 2018, and 2020 presidential, Senate, and gubernatorial elections. It evaluates three ideals: proportionality, the Efficiency Gap's piecewise-linear vote-to-seat rule, and the Quadratic Rule. A historical cubic vote-to-seat curve supplies $T_k$. The Jurisdictional benchmark supplies $G_k$ by allocating seats in proportion to the population of counties, cities, or townships won by a party. The mean result across 5,000 state-specific ALARM maps supplies $N_k$; these simulated maps encode population balance, contiguity, and modeled state redistricting criteria. Actual outcomes $S_k$ come from aggregating the same election data under enacted maps.

## Experiments

Across the 44 analyzed maps, 26 favor Republicans and 18 favor Democrats under the paper's chosen ideals. Averaging the Efficiency Gap and Quadratic Rule results, maps favoring Republicans provide close to 26 seats of total Republican advantage, maps favoring Democrats provide more than 17 seats of Democratic advantage, and the net national advantage is about 8-9 Republican seats. The exact totals vary by ideal: Table 3 reports net Republican advantages of 9.74 seats under the Efficiency Gap and 7.24 under the Quadratic Rule.

The decomposition indicates that the fairness ideal accounts for about one-third of the aggregate advantage in Republican-favoring maps and more than two-thirds in Democratic-favoring maps. Geography and modeled legal rules jointly account for about one-third of the former, while discretion accounts for roughly one-third of each party's aggregate advantage. State cases clarify the distinction:

- Florida and Texas have Republican discretionary advantages of 3.26 and 3.22 seats; Illinois has a Democratic discretionary advantage of 2.87 seats (the paper records Republican advantage, so Illinois is $-2.87$).
- Large Democratic advantages in California and New York and Republican advantages in states including Alabama, Tennessee, and Louisiana are attributed mainly to structural terms rather than enacted-map discretion.
- The Michigan commission's map uses a Democratic discretionary effect to offset a Republican structural advantage.
- Court-drawn maps generally show little discretionary advantage or discretionary effects that counter structural advantage.
- Maps under unified partisan control tend toward the favorable edge of, or beyond, the ALARM ensemble's simulated range; Florida, Texas, and Illinois are the clearest cases.

These are retrospective calculations for the supplied election results, not forecasts under uncertain future vote patterns.

## Limitations

Every component depends on a selected benchmark. The Jurisdictional benchmark uses political subdivisions of unequal size and may mix geography with the scale at which votes are aggregated. An equal-population, minimally constrained map ensemble could produce a different geographic component.

The ALARM neutral benchmark also encodes substantive modeling choices. It limits county and municipal splits and favors compactness even where state law does not impose identical requirements. Its Voting Rights Act implementation requires at least as many majority-minority districts as the enacted plan. If the enacted plan packs more minority voters than legally required, the decomposition can misattribute a discretionary Republican advantage to law. The paper cites subsequent Alabama and Georgia litigation as evidence that this issue is consequential.

The study uses one geographic benchmark and one neutral-ensemble source, exact historical election inputs, and no electoral noise model. It therefore describes how the enacted maps would translate those elections, but it neither estimates behavioral responses to alternative maps nor provides broad probabilistic forecasts. The framework is adaptable, but the reported numerical components should not be treated as invariant properties of a state or map.

## Related Concepts

- [[concepts/partisan-advantage-decomposition|Partisan Advantage Decomposition]]
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]
- [[concepts/geographic-polarization|Geographic Polarization]]
- [[concepts/electoral-rule-disproportionality|Electoral Rule Disproportionality]]

## Related Papers

- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]] separates enacted-map effects from changing political geography and declining competition across redistricting cycles.
- [[papers/redistricting-reforms-reduce-gerrymandering-by-constraining-partisan-actors|Redistricting reforms reduce gerrymandering by constraining partisan actors]] studies how districting institutions restrict partisan mapmakers.

[[index|Library home]]
