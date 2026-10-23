---
title: "A Partisan Solution to Partisan Gerrymandering: The Define–Combine Procedure"
type: paper
authors:
  - Maxwell Palmer
  - Benjamin Schneer
  - Kevin DeLuca
year: 2023
doi: "10.1017/pan.2023.39"
source_job_id: 25474daa-e5a9-4577-b491-f7ed48c62049
tags:
  - redistricting
  - gerrymandering
  - institutional-design
  - simulation-methods
---

## TL;DR

The [[concepts/define-combine-procedure|Define–Combine Procedure]] splits redistricting between two self-interested parties: one defines $2N$ contiguous, equal-population subdistricts, and the other pairs them into $N$ final districts. Simulations of U.S. congressional maps find that this structure reduces the party-dependent seat swing from 197 seats under unilateral map drawing to 46 seats, eliminating almost 80% of the simulated swing. The result is evidence about a simplified, computationally approximated mechanism, not proof that every legally constrained implementation would achieve the same gains.

## Research Question

Can a redistricting procedure reduce partisan gerrymandering without requiring bipartisan agreement or a mutually trusted neutral map drawer?

## Motivation

Legislative map drawing permits the controlling party to entrench an advantage, while commissions can fail when partisan members cannot agree or when neither side accepts a neutral arbiter. Existing fair-division proposals often require bargaining structures that are difficult to compute or implement. The paper therefore seeks a simple process in which each party can pursue its own electoral interest while the sequence of choices constrains both parties.

## Contributions

- Introduces the two-stage [[concepts/define-combine-procedure|Define–Combine Procedure]] as a process-based redistricting reform.
- Models the procedure as a finite, perfect-information game in which the Definer anticipates the Combiner's seat-maximizing response.
- Develops a nested short-burst algorithm to approximate strategic outcomes using real electoral and geographic data.
- Evaluates congressional maps across the states on seat swing, proportionality, a geography-aware fairness target, partisan bias, and the efficiency gap.
- Studies compatibility with majority-minority districts and validates the main mechanism with analytical and fully enumerable grid models.

## Method

For a legislature with $N$ single-member districts, the Definer first draws $2N$ contiguous subdistricts with equal populations. The Combiner then joins adjacent pairs to form the final $N$ districts. Both parties are modeled as risk-neutral seat maximizers with complete knowledge of district-level partisan preferences. Because the Combiner moves second, the Definer selects a subdistrict plan while anticipating the Combiner's best response.

The empirical analysis compares DCP with a unilateral redistricting process (URP). URP maps are optimized with the short-burst algorithm. DCP uses a nested version: an outer search proposes $2N$-subdistrict plans, and an inner search identifies the opposing party's most favorable valid pairing. The authors run 10 URP simulation sets and 20 DCP sets for each state and party. Inputs combine 2020 Census geography with 2020 presidential votes; maps require contiguity, a 1% population deviation, and a simple compactness constraint.

The simulations cover states with at least two congressional districts, representing 429 redistricted seats. Evaluation includes the Definer's advantage, deviation from proportionality, deviation from the midpoint of the two parties' extreme URP maps, partisan bias at an even statewide vote, and the efficiency gap.

## Experiments

### National Congressional Simulations

Under simulated unilateral Democratic control, Democrats win 334 of 429 seats (77.9%); under unilateral Republican control, they win 137 (31.9%), a 197-seat swing. Under DCP, Democrats win 249 seats (58.0%) when defining and 211 (49.2%) when Republicans define. Summed state by state, first- versus second-mover status changes 46 seats, almost 80% less than under URP.

| Metric | URP | DCP | Adopted plan |
| --- | ---: | ---: | ---: |
| Definer's advantage | 0.459 | 0.107 | Not observed |
| Deviation from proportionality | 0.269 | 0.157 | 0.187 |
| Deviation from fairness target | 0.230 | 0.063 | 0.094 |
| Partisan bias | 0.304 | 0.069 | 0.080 |
| Magnitude of efficiency gap | 0.241 | 0.109 | 0.103 |

The adopted-plan comparisons use the party controlling each state's actual process. DCP improves most clearly over legislatures and political commissions; its results are comparable to independent commissions and court or special-master plans on several metrics. Alternative vote swings and selected state-legislative maps also eliminate more than 80% of the URP seat swing.

### Voting Rights Act Exercise

For Georgia, the authors generate and freeze four majority-Black districts, then apply URP and DCP to the remaining ten districts. Across ten runs, unilateral control produces a three- to six-seat gap in Democratic seats. DCP produces the same Democratic seat count for either party ordering in seven runs and a one-seat difference in three. This exercise shows that DCP can operate around pre-specified majority-minority districts, but it does not itself resolve what the Voting Rights Act requires.

### Analytical and Grid Validation

An analytical model without geography shows that DCP most clearly constrains a minority party controlling the first stage. Fully solved grid maps support the simulation mechanism and show that geographic contiguity further limits how the Definer can distribute voters. Robustness exercises vary statewide partisanship, geographic clustering, and party objectives.

## Limitations

- Short-burst optimization is heuristic and is not guaranteed to find the most extreme feasible map; nested optimization compounds this approximation.
- The model assumes two risk-neutral, seat-maximizing parties with known and fixed voter preferences. It omits turnout, incumbency, candidate effects, uncertainty, and many strategic objectives of actual mapmakers.
- Simulated maps use fewer legal and political constraints than real redistricting. Comparisons with adopted plans are therefore not one-to-one.
- Results use 2020 presidential votes as a snapshot. Later preference changes can move outcomes outside the simulated bounds.
- The fairness target is the midpoint of the parties' most extreme simulated maps, not a uniquely established normative definition of fairness.
- Majority-minority districts are fixed before DCP in the Georgia exercise. Courts would still adjudicate Voting Rights Act compliance, and the procedure does not determine the legally required number or design of those districts.

## Related Concepts

- [[concepts/define-combine-procedure|Define–Combine Procedure]]: the paper's two-stage institutional mechanism.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: an adjacent simulation tradition that samples reference maps rather than optimizing each party's extreme outcome.
- [[concepts/political-geography|Political Geography]]: spatial clustering constrains both unilateral and Define-Combine maps.
- [[concepts/electoral-responsiveness|Electoral Responsiveness]]: the accountability concern motivating the proposed reform.

## Related Papers

- Kenny et al. (2023), "Widespread Partisan Gerrymandering Mostly Cancels Nationally, but Reduces Electoral Competition": provides a benchmark on bias and competition in the 2020 cycle.
- Cannon et al. (2023), "Voting Rights, Markov Chains, and Optimization by Short Bursts": supplies the optimization method used to search for extreme maps.
- McCartan and Imai (2023), "Sequential Monte Carlo for Sampling Balanced and Compact Redistricting Plans": supplies the underlying plan-generation approach.
- Pegden, Procaccia, and Yu (2017), "A Partisan Districting Protocol with Provably Nonpartisan Outcomes": develops a related adversarial districting protocol.
- Landau, Reid, and Yershov (2009), "A Fair Division Solution to the Problem of Redistricting": applies fair-division reasoning to redistricting.

Article identifier: [10.1017/pan.2023.39](https://doi.org/10.1017/pan.2023.39). Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/XBYFE1).

[[index|Library home]]
