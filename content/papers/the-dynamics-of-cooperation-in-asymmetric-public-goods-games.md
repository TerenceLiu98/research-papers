---
title: The dynamics of cooperation in asymmetric public goods games
type: paper
authors:
  - Xiaomin Wang
  - Christian Hilbe
  - Boyu Zhang
year: null
tags:
  - cooperation
  - public-goods
  - inequality
---

## TL;DR

Giving more resources to more productive participants raises group surplus in linear public goods games, but lowers it relative to equality in threshold games. Across 16 treatments and 1,692 participants, the effect of aligned inequality depends on the reward function: reciprocity supports linear cooperation, whereas competing contribution norms complicate threshold coordination.

## Research Question

When does aligning unequal endowments with unequal productivity improve cooperation, and does that advantage survive changes in reward function and group size?

## Motivation

Studies of inequality often vary only endowments or productivity, or study only linear rewards. Such designs cannot establish whether the benefits of aligned inequality extend to collective tasks that succeed only after a minimum effective contribution is reached.

## Contributions

- Jointly varies endowments, productivity, reward function, and group size.
- Demonstrates opposite surplus effects of aligned inequality in linear and threshold games, in both two- and four-person groups.
- Combines equilibrium analysis with experiments and a learning model incorporating reciprocity and preferences for equal absolute or relative contributions.

## Method

Player $i$ receives endowment $e_i$, contributes an integer amount $c_i$, and generates effective contribution $p_i c_i$. With $C=\sum_i p_i c_i$, payoff is $e_i-c_i+r_i$. Linear rewards equal $C/n$; threshold rewards equal a fixed amount only when $C\geq\theta$.

Two-player treatments cross two reward functions with full equality, endowment inequality, productivity inequality, aligned inequality, and misaligned inequality. Total endowment is 48, split 24/24 or 36/12. The threshold is half the maximum effective contribution, with reward 20 per player. Four-player treatments duplicate player types and retain equality, aligned inequality, and misaligned inequality.

One-shot Nash equilibria and infinitely repeated subgame-perfect equilibrium payoff sets distinguish incentives from equilibrium selection. Full contributions can be sustained in the repeated two-player linear game except under misaligned inequality. Threshold games already permit positive-contribution equilibria without repetition, but offer multiple possible allocations of contribution burdens.

The learning model uses reactive strategies conditioned on the partner’s previous contribution. Introspection dynamics compares current utility with a randomly sampled alternative strategy. Utility penalizes unequal absolute and relative contributions. Simulations run for $10^7$ updates and fit group surplus separately for each reward function.

## Experiments

The two-player experiments include 550 linear-game and 554 threshold-game participants; four-player experiments add 312 and 276, respectively. Participants are Beijing Normal University students. Two sessions switch roles and partners. Linear sessions last 20–25 rounds, with the first 20 analyzed; threshold sessions last 20 rounds. Three two-player threshold treatments reuse Wang et al. (2023) data. Comparisons use group-level round averages and two-tailed nonparametric tests.

| Outcome | Linear games | Threshold games |
| --- | --- | --- |
| Two-player cooperation | About 70% of endowment under equality, productivity inequality, and aligned inequality; about 55% under misaligned inequality | Success is lower in all three treatments with unequal endowments |
| Group surplus | Highest under aligned inequality | Lower with unequal endowments, whether aligned or misaligned |
| Temporal behavior | Generally stable contributions, with increases under productivity and aligned inequality | Early coordination failures are prominent under unequal endowments |
| Four-player extension | Aligned inequality retains the highest surplus despite similar contribution levels across treatments | Both asymmetric treatments show persistent coordination difficulties and lower surplus |

In the two-player linear game, both participants contribute their full endowment in 43.5% of rounds under aligned inequality, versus 26.1% under endowment inequality and 18.3% under misaligned inequality (Fig. 3 discussion). Under threshold aligned inequality, the richer, more productive participant contributes more both absolutely and proportionally—an exception to the usual pattern.

Best separate simulation fits use selection strength 1, with absolute/relative inequality penalties of (0, 14) for linear games and (18, 94) for threshold games. Several threshold parameter pairs fit similarly well. A common pair (4, 20) fits less convincingly and overestimates threshold success under unequal endowments. These fits support a mechanism interpretation rather than uniquely identifying preferences.

## Limitations

The experiments use known reward functions, equal reward sharing, student participants, and groups of two or four. They omit uncertainty, environmental stochasticity, kinship, and social bonds. Threshold actions are graded contributions rather than binary cooperation decisions. Game durations differ across reward functions, which are analyzed separately. Infinite-horizon equilibrium feasibility is distinct from behavior in finite laboratory sessions. Detailed statistical tests are deferred to the source’s SI Appendix.

The supplied Markdown gives acceptance on December 31, 2025, but no explicit publication year or article DOI; the publication year is therefore left unspecified. OCR corrupts some mathematical notation; the account above uses definitions recoverable from the prose.

## Related Concepts

- [[concepts/public-goods-games|Public Goods Games]]: reward functions determine whether reciprocal incentives or coordination on contribution burdens is central.

## Related Papers

- Hauser et al. (2019), “Social dilemmas among unequals,” *Nature* 572, 524–527: prior evidence for aligned inequality in linear games, replicated and bounded here.
- Hübner et al. (2024), “Efficiency and resilience of cooperation in asymmetric social dilemmas,” *PNAS* 121, e2315558121: related evidence on asymmetric cooperation.
- Wang et al. (2023), “Cooperation and coordination in heterogeneous populations,” *Philosophical Transactions of the Royal Society B* 378, 20210504: supplies three threshold-treatment datasets reanalyzed here.

Data and code: [Zenodo record](https://doi.org/10.5281/zenodo.16918146), as reported in the supplied paper.
