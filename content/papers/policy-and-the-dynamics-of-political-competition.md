---
title: Policy and the Dynamics of Political Competition
type: paper
authors:
  - Michael Laver
year: null
tags:
  - party-competition
  - agent-based-modeling
  - spatial-electoral-competition
---

## TL;DR

Simple adaptive party rules generate sustained multiparty competition with limited information. Vote-seeking Hunters find dense electoral regions without knowing voter locations, yet usually avoid the exact center in multiparty systems. Calibration to Irish polling reproduces several aggregate features of party support better than a static baseline.

## Research Question

Can continuous adaptation by voters and party leaders explain multiparty dynamics without assuming fully informed strategic optimization or an equilibrium endpoint?

## Motivation

The [[concepts/hotelling-downs-model|Hotelling-Downs Model]] supplies a spatial account of voter choice, but equilibrium analysis does not directly describe the persistent fluctuations visible in polling. Laver makes those fluctuations an object of explanation and replaces counterfactual policy searches with limited-information behavioral rules.

## Contributions

- Implements continuous feedback between nearest-party voter choice and heterogeneous party adaptation in NetLogo.
- Compares four party rules and shows that their competitive performance depends on the surrounding mix of opponents.
- Evaluates simulations against the means and temporal standard deviations of Irish party support, including a systematic sweep of rule assignments.

## Method

Discrete voters have ideal points in a real policy space and support the closest party. Parties adjust policy, voters reconsider affiliations, and the process repeats between elections as well as during campaigns. The four rules are:

| Rule | Policy update |
| --- | --- |
| Aggregator | Move to the coordinate-wise mean ideal point of current supporters. |
| Hunter | Repeat a unit move when support increased; otherwise take a random unit move in the opposite half-space. |
| Predator | Move toward the largest party; remain still when already largest. |
| Sticker | Keep the initial policy position. |

Hunters need their previous direction and recent support totals, not voter ideal points or rival locations. Aggregators represent supporter-constrained policy setting; Stickers represent ideological commitment. These rules specify different information requirements and objectives.

## Experiments

**Generic simulations.** Table 1 reports mean Hunter distances from the electorate's center of 0.19 voter-distribution standard deviations with two parties, 0.51 with three, and 0.93 with ten. Multiparty Hunters occupy a region around the center: a central party becomes vulnerable to competitors and retreats when support falls. All-Aggregator simulations reach steady states; this is a simulation finding and conjecture about general behavior, not a convergence proof. With three Hunters and one Predator, the Predator is largest in only 5% of recorded cycles and smallest in 87%. A fixed Sticker attracts a lone Hunter toward its position, but does not systematically drag multiple Hunters in the same way.

**Irish calibration.** The main text uses 43 quarterly observations during 1986–97, five parties, and two dimensions: economic policy and attitudes toward the British presence in Northern Ireland. Expert survey estimates initialize party positions and the electorate's mean; voters are drawn from a normal distribution. Each rule configuration receives 500 independent 43-cycle runs.

The independently motivated HHSSS configuration makes Fianna Fail and Fine Gael Hunters and the remaining parties Stickers. Mean simulated support for these two parties is 49.2% and 25.9%, versus poll means of 51.0% and 25.4%. Mean-party-size absolute error is 3.1 percentage points, compared with 4.9 for the static model and 2.3 for actual election results against polls. Labour support is overestimated by 7.3 percentage points.

Sweeping all 243 assignments of Aggregator, Hunter, and Sticker rules yields four best-fitting configurations with the same HHS prefix. HHSHH improves mean-size error to 2.6 points and the error in temporal standard deviations to 0.8 points (Table 2). Fit concerns aggregate statistical signatures, not recovery of the exact historical sequence.

## Limitations

Voter ideal points and party decision rules are fixed in the baseline; nearest-party switching omits inertia and nonpolicy attachments. Party entry, evolving preferences, and multilevel competition are extensions rather than established results here. Matching support distributions does not uniquely identify actual party strategies or establish the causal explanation for Labour's size.

The supplied text contains an internal numerical discrepancy: Table 2 gives HHSSS a standard-deviation fit error of 1.5, while the prose reports 0.8. Its table caption also says 1986–89, whereas the surrounding analysis specifies 1986–97. Publication year and a stable identifier are absent from the supplied Markdown; the year is left unset rather than inferred.

## Related Concepts

- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: nearest-party spatial choice provides the baseline, while adaptive multiparty behavior changes its dynamics.
- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]: a distinct modification of spatial competition that changes voter acceptance; Laver instead retains nearest-party choice and changes party adaptation.

## Related Papers

- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]]: another dynamic account of party separation with fixed voter preferences, using voter satisfaction and vote gradients rather than Laver's limited-information rules.
- Kollman, Miller, and Page (1992), “Adaptive Parties in Spatial Elections”: the cited adaptive-party predecessor; Laver questions the information and sequencing requirements of extending counterfactual search to multiple parties.
