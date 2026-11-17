---
title: "Conflicted voters: A spatial voting model with multiple party identifications"
type: paper
authors:
  - Sacha Bourgeois-Gironde
  - João V. Ferreira
year: 2020
doi: "10.1016/j.jebo.2016.12.003"
hal: "hal-02909682"
tags:
  - electoral-behavior
  - voter-turnout
  - partisan-identity
  - spatial-voting
---

## TL;DR

A theoretical model connects party identification, turnout, and candidate positioning. Citizens who identify with both parties abstain whenever no candidate position is acceptable to both: the **conflicted voter’s curse** can silence even a majority. Moderate convergence depends on shared ideological ground, the electoral weight of conflicted voters, and candidates’ ideological constraints.

## Research Question

How do multiple party identifications shape participation and the equilibrium positions of two competing candidates?

## Motivation

Standard spatial models often start with fixed individual ideal points and blur the distinction between parties and candidates. This paper instead lets party ideologies shape preferences and gives voting intrinsic identity benefits and betrayal costs. It thereby explains why mixed or moderate citizens might abstain even when they could collectively change an election result.

## Contributions

- Unifies turnout and vote choice through identity-based utility rather than the probability of casting a decisive ballot.
- Derives abstention from incompatible party identifications and characterizes satisfactory preferred positions when ideological overlap exists.
- Compares plurality-maximizing candidates with unrestricted platforms against candidates restricted to their party’s acceptable positions.

## Method

Party $p$ has an ideological point $\delta_p$ and a Euclidean acceptance region $A_p=\{x:\|x-\delta_p\|\leq d_p\}$. Their intersection $O_{br}=A_b\cap A_r$ represents shared ideological ground. Each citizen identifies with one or both parties, with positive weights $I_i^p$.

Utility combines weighted distance costs, identity gains for supporting accepted positions, and a betrayal cost whenever a position violates any identification. The assumed betrayal cost exceeds each individual party identity gain. Abstention gives zero utility. A citizen therefore participates exactly when at least one candidate is accepted by every party she identifies with (Proposition 1). Participation breaks a turnout tie; equally valued candidates receive equal voting probabilities.

Single-party identifiers prefer their party’s ideological point. With overlap, dual identifiers prefer one of two compromise points, $\alpha_b$ or $\alpha_r$, closest within the overlap to the corresponding party point. Their leaning depends on the relative weights $I_i^b/d_b$ and $I_i^r/d_r$. Without overlap, they have no satisfactory voting position. Candidates maximize expected vote margins in a zero-sum, pure-strategy electoral game.

## Experiments

This is an analytical theory paper, with propositions and appendix proofs rather than new experiments or estimated effects. Existing empirical studies motivate assumptions; they do not directly test the complete model.

| Setting | Analytical result |
| --- | --- |
| Unrestricted candidates, overlap, odd electorate | A convergent equilibrium exists at one of the four party or compromise points (Theorem 1). |
| Unrestricted candidates, overlap, unequal totals of partisans plus similarly leaning dual identifiers | Between one and four equilibrium pairs use those four points; balanced cases can yield broader sets (Theorem 2). |
| Unrestricted candidates, no overlap, unequal partisan counts | Candidates converge to the ideological point of the larger partisan group; conflicted voters abstain (Section 3.1). |
| Ideologically constrained candidates, overlap excluding both party ideal points, odd electorate | Convergence to a compromise point exists exactly when conflicted voters are collectively pivotal: $N_{br}\geq|N_b-N_r|$ (Theorem 4). |
| Constrained candidates, weak overlap, nonpivotal conflicted voters leaning in both directions | The minority candidate seeks the compromise position; the majority candidate retains a range of winning platforms near its party point (Theorem 5). |
| Constrained candidates, no overlap | Every pair of positions within the respective party acceptance regions is an equilibrium; only single-party identifiers participate (Theorem 6). |

Collective pivotality here means that the group can alter the outcome, not that each individual has a substantial pivotal-vote probability. Convergence to a compromise mobilizes all citizens under the model’s turnout rule.

## Limitations

- The deterministic abstention result relies on betrayal aversion and discontinuous acceptance thresholds. Probabilistic participation could change both turnout and equilibrium positions.
- Shared perceptions, equally weighted issue dimensions, and two party reference points reduce the relevant geometry to a single axis, despite a formally multidimensional domain.
- Nonpartisans, negative identifications, endogenous party ideologies, and evolving identifications are excluded. These are proposed extensions rather than established results.
- The convergence conditions require their stated electorate and overlap assumptions. Strong overlap can permit constrained-candidate convergence without pivotal conflicted voters.
- The supplied text has damaged mathematical expressions. Its Theorem 3 wording and subsequent discussion differ on the equal-partisan-count boundary case; the summary above reports only the unambiguous unequal-count case.
- Publication year and DOI follow the supplied citation header (Journal of Economic Behavior and Organization 174, 360–379); the HAL submission date is a separate repository date.

## Related Concepts

- [[concepts/expressive-voting|Expressive Voting]]: identity utility can motivate participation, while incompatible identities can make expression costly.
- [[concepts/partisan-sorting|Partisan Sorting]]: the model lets party cues shape ideological preferences, while dual identification preserves conflict between affiliations.

## Related Papers

- [[papers/partisan-alignment-increases-voter-turnout-evidence-from-redistricting|Partisan Alignment Increases Voter Turnout: Evidence from Redistricting]]: a complementary empirical study of identity-related participation incentives; it does not directly test this dual-identification model.
- Brennan and Hamlin (1998), “Expressive Voting and Electoral Equilibrium”: a cited spatial account of intrinsic expressive voting motivations.
- Akerlof and Kranton (2000), “Economics and Identity”: a cited foundation for incorporating social identity into utility.
