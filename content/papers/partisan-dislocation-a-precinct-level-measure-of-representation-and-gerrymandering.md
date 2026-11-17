---
title: "Partisan Dislocation: A Precinct-Level Measure of Representation and Gerrymandering"
type: paper
authors:
  - Daryl R. DeFord
  - Nicholas Eubank
  - Jonathan Rodden
year: 2022
doi: 10.1017/pan.2021.13
source_job_id: 8e6f4819-c5cf-4e4f-9467-973b39e09e8c
tags:
  - redistricting
  - political-representation
  - spatial-analysis
---

## TL;DR

[[concepts/partisan-dislocation|Partisan Dislocation]] compares the Democratic share of a voter's assigned district with that of a district-sized neighborhood around that voter. It identifies local disruptions of partisan communities and provides a continuous statistic for evaluating enacted and simulated maps. Keeping these communities together can conflict with statewide partisan fairness.

## Research Question

Can a geographically grounded measure locate packing and cracking without defining a fair allocation of seats, and how does that measure relate to statewide fairness criteria?

## Motivation

A strongly Democratic district can reflect residential clustering rather than strategic packing. Statewide seat statistics cannot identify which neighborhoods were separated from nearby co-partisans, and may miss manipulations of safe seats. A local geographic baseline makes those disruptions visible.

## Contributions

- Defines a signed, voter-level measure and its district- and state-level absolute averages.
- Illustrates neighborhood-level packing and cracking and compares the aggregate measure with conventional fairness statistics and simulated maps.
- Demonstrates a geographically contingent tension between community preservation and partisan symmetry.

## Method

For representative voter point $v$, let $D_{d(v)}$ be its district's Democratic two-party vote share and $D_{N_k(v)}$ the Democratic share among its $k$ nearest neighbors. Equation 1 defines

$$
PD_v=D_{d(v)}-D_{N_k(v)}.
$$

Positive values mean the district is more Democratic than the surrounding neighborhood; negative values mean it is more Republican. The sign does not describe the individual voter's party. Average absolute partisan dislocation (AAPD) averages $|PD_v|$ across representative voters in a district or state, avoiding cancellation.

The authors generate representative Democratic and Republican points proportional to precinct-level 2008 presidential returns, locate them uniformly within precincts, and compare neighborhood composition with 2014 district composition. Neighborhood size represents the average district population at the legislative scale under study. The data cover the 49 states using precincts.

For congressional comparisons, ReCom in GerryChain generates 100,000 alternative plans per state. Plans are contiguous and population balanced within 1% of ideal; the captions specify preserving the enacted number of districts with more than 45% Black or Hispanic population. These constraints operationalize minority representation for the analysis rather than exhaustively establishing legal compliance. Seat-share calculations add 3.69 percentage points to Republican support to obtain national two-party parity; the other reported measures are uniform-swing invariant.

## Experiments

- **Local diagnostics (Section 4):** Austin illustrates cracking; the New Orleans–Baton Rouge district illustrates packing alongside minority-representation objectives. Pittsburgh's Democratic core has low dislocation while nearby Democratic suburbs placed in Republican districts have high dislocation.
- **Pennsylvania replacement map:** Statewide AAPD falls from approximately 0.052 to 0.045 under the court-drawn map. The paper reports a 12.5% reduction; the displayed rounded values do not reproduce that percentage exactly.
- **Cross-state comparisons (Section 5):** AAPD broadly tracks mean–median differences, partisan Gini, and ensemble-based departures in seats and responsiveness, but flags cases such as Texas that some seat-based measures miss. Table 1 reports overall averages of 0.053 under unified Republican control and 0.041 under both unified Democratic and non-unified/independent control; these are descriptive associations.
- **Ensemble comparison:** Enacted maps in prominent gerrymandering cases have elevated AAPD relative to their own state ensembles, including ensembles preserving the specified minority-district count.
- **Trade-off (Section 6):** Comparing the highest and lowest 1% of ensemble AAPD scores shows that low-dislocation plans can have greater partisan asymmetry in states such as Illinois, Michigan, Pennsylvania, and Wisconsin. The same conflict is not evident in Iowa and Arizona.

## Limitations

Uniform placement within precincts introduces spatial measurement error, especially where precincts are large relative to districts; the authors caution against applications at scales such as city councils. Repeated representative-point generation produces little score variation in the reported supplementary analysis, but this does not eliminate within-precinct spatial error. Historical presidential voting supplies a proxy for partisanship, not observed individual locations or responses to new boundaries.

High dislocation does not by itself establish improper intent or normative undesirability: minority representation can require disruptive boundaries. Baseline dislocation varies by state, so the authors recommend constrained ensemble comparisons for high-stakes evaluation. Minimizing AAPD is not equivalent to maximizing partisan symmetry. Claims about potential litigation uses describe the paper's historical argument, not current legal guidance.

## Related Concepts

- [[concepts/partisan-dislocation|Partisan Dislocation]]: the local measure introduced here.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: supply within-state reference distributions for AAPD.
- [[concepts/partisan-symmetry|Partisan Symmetry]]: a distinct objective that can conflict with low dislocation.
- [[concepts/electoral-district-compactness|Electoral District Compactness]]: describes shape rather than neighborhood partisan mismatch.

## Related Papers

- [[papers/implementing-partisan-symmetry-problems-and-paradoxes|Implementing Partisan Symmetry: Problems and Paradoxes]]: a separate library paper examining why symmetry scores need not constrain extreme partisan outcomes; not a citation in this source.
- DeFord, Duchin, and Solomon (2021), “Recombination: A Family of Markov Chains for Redistricting”: supplies the ensemble sampler.
- Chen and Rodden (2013), “Unintentional Gerrymandering: Political Geography and Electoral Bias in Legislatures”: explains why spatial clustering can produce partisan bias without strategic boundaries.

Published in *Political Analysis* 30 (2022), 403–425; first published online June 30, 2021. [Article](https://doi.org/10.1017/pan.2021.13). The source provides [Code Ocean replication](https://doi.org/10.24433/CO.7980425.v1) and [Dataverse data and code](https://doi.org/10.7910/DVN/MERAIC).
