---
title: Party-Switching Networks
type: concept
aliases:
  - Party Affiliation Switching Networks
tags:
  - political-ideology
  - party-switching
  - social-network-analysis
---

## Overview

Party-switching networks represent political parties as nodes and movements of affiliated politicians as directed edges. Edge weights count transfers during a specified observation period. They describe relationships between parties through membership exchange and can provide evidence about ideological proximity when switching plausibly reflects political affinity.

## Key Ideas

- **Observation and timing:** Candidate records can include unsuccessful candidates as well as elected officials. An affiliation change is observed when a candidate reappears under another party; election-year aggregation may conceal when the switch actually occurred.
- **Direction and scale:** Outgoing and incoming transfers have different implications for party composition. Their importance depends on transfer volume relative to the origin and destination parties' sizes.
- **Communities and locality:** Groups of parties with substantial exchange can be compared with external ideological labels. Agreement supports a relationship between network structure and ideology, without showing that every transfer is ideologically motivated.
- **Dynamic composition:** Faustino et al. initialize party ideology distributions from surveys, then simulate the departure and arrival of members biased toward ideological affinity. Stable membership dampens modeled changes. This is a specific generative assumption, not a property that follows automatically from the graph.
- **Identification:** Affiliation records alone do not supply a left-right orientation or directly observe members' beliefs. External anchors and assumptions determine how network movements become ideological trajectories.
- **Validation:** Community-label agreement, randomized network comparisons, and external validation of continuous positions answer different questions. Randomizing destinations while holding origins fixed preserves outgoing transfer totals, but does not by itself preserve a directed network's full degree sequence.
- **Scope:** Strategic opportunities, institutional rules, or organizational changes can also motivate switches. Network proximity must therefore be interpreted in its political setting; it does not identify causal ideological influence.

## Important Papers

- [[papers/a-data-driven-network-approach-for-characterization-of-political-parties-ideology-dynamics|A data-driven network approach for characterization of political parties' ideology dynamics]]: combines Brazilian candidate-switching networks, community analysis, and survey-initialized ideology updates for 2000-2018.
- Desposato (2006), "Parties for rent? ambition, ideology, and party switching in Brazil's chamber of deputies": substantive background cited by Faustino et al. on the motives behind affiliation changes.

## Related Concepts

- [[concepts/social-network-analysis|Social Network Analysis]]: representation and analysis of relationships among social actors or groups.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: an alternative framework for estimating changing political positions from repeated responses.
- [[concepts/text-scaling-models|Text Scaling Models]]: ideology measurement from textual behavior rather than affiliation movements.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: models of changing opinions through social interaction; switching networks observe membership movement rather than individual opinion change.
