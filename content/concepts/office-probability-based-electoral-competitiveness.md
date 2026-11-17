---
title: Office-Probability-Based Electoral Competitiveness
type: concept
aliases:
  - Electoral Competitiveness from Office Probabilities
definition: "An actor-specific approach to electoral competitiveness that integrates uncertainty about election results with uncertainty about government formation to estimate the probability of entering or retaining executive office."
tags:
  - electoral-competitiveness
  - coalition-politics
---

## Overview

Office probabilities connect electoral competition to the prospect that a party exercises executive power after an election. In multiparty parliamentary settings, uncertainty remains after votes are counted because several coalitions may form from the same seat distribution.

## Key Ideas

- Integrate the probability of entering office conditional on each election outcome over the distribution of possible outcomes.
- Model election uncertainty and coalition bargaining separately, then propagate both into party-level predictions.
- Distinguish safety ($p$), vulnerability ($1-p$), and outcome uncertainty, which peaks near $p=0.5$.
- A weighted average of incumbent parties’ retention probabilities is distinct from the joint probability that the entire coalition survives unchanged.
- Calibration asks whether predicted probabilities match observed frequencies; predictive discrimination asks how well the measure separates eventual winners and losers. Both depend on model specification and available information.

## Important Papers

- [[papers/a-general-approach-to-measuring-electoral-competitiveness-for-parties-and-governments|Cronert and Nyman (2021)]] develops and evaluates a four-step election-simulation and coalition-formation procedure in Sweden and across 34 democracies.

## Related Concepts

- [[concepts/electoral-closeness-in-proportional-representation|Electoral Closeness in Proportional Representation]] measures vote distances to candidate seat thresholds; office probabilities additionally require uncertainty and government-formation assumptions.
- [[concepts/gamsons-law|Gamson’s Law]] concerns portfolio allocation among coalition members, a different outcome from whether a party joins government.
