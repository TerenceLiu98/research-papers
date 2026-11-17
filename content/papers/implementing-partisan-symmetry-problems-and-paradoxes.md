---
title: "Implementing Partisan Symmetry: Problems and Paradoxes"
type: paper
authors:
  - Daryl DeFord
  - Natasha Dhamankar
  - Moon Duchin
  - Varun Gupta
  - Mackenzie McPike
  - Gabe Schoenbach
  - Ki Wan Sim
year: 2023
doi: 10.1017/pan.2021.49
source_job_id: c2711739-cfa8-48a4-ae06-d2276ca7b060
tags:
  - redistricting
  - electoral-fairness
  - partisan-symmetry
---

## TL;DR

Under linear uniform partisan swing, perfect [[concepts/partisan-symmetry|Partisan Symmetry]] requires district vote shares to be arranged symmetrically around their mean. That arithmetic condition can coexist with extreme partisan seat outcomes. Mathematical counterexamples and redistricting ensembles from Utah, Texas, and North Carolina show that symmetry scores can admit strongly partisan plans and sometimes identify the opposite party as advantaged.

## Research Question

Do implementable partisan symmetry scores reliably detect extreme partisan seat advantages, and what does their ideal value actually require?

## Motivation

The intuitive requirement that parties receive equal seats at equal vote shares requires counterfactual election outcomes. Uniform swing supplies those counterfactuals, but ignores the many spatially distinct ways statewide support can change. A score's symmetry interpretation therefore need not translate into a useful constraint on strategic line drawing.

## Contributions

- Characterizes perfect symmetry in terms of paired district vote shares and mirrored gaps between ordered shares (Theorem 3).
- Derives arithmetic and geographic conditions under which signed scores misidentify seat advantage.
- Supplies geographically feasible examples where stringent symmetry thresholds admit extreme seat outcomes, including in competitive states.

## Method

For ordered two-party shares $v_1\leq\cdots\leq v_k$, let $\bar v$ be their unweighted mean and $v_{med}$ their median. Linear uniform swing adds the same amount to every district. The mean–median score uses the paper's sign convention $MM=v_{med}-\bar v$; partisan bias compares the modeled seat share at mean vote share one-half with one-half. Partisan Gini (PG) measures the area between the seats–votes curve and its central reflection.

Theorem 3 states that perfect symmetry is equivalent to

$$
\frac{v_i+v_{k+1-i}}{2}=\bar v\quad\text{for every }i.
$$

Equivalently, successive vote-share gaps mirror each other. The condition implies zero MM, but zero MM alone does not generally imply perfect symmetry. The paper derives $PG=4|MM|/3$ for three districts and $PG=2|MM|$ for four.

For four equal-turnout districts with mean support between 75% and 87.5%, the minority party can win at most one seat. Every vector giving it that seat nevertheless has positive MM and PB, conventionally interpreted as advantage for the majority party. Geographic upper bounds on district support extend the paradox to less skewed elections (Section 3).

The empirical analysis uses 100,000-step ReCom chains for each state, enforcing population balance, contiguity, and compactness with whole precincts. Each ensemble contains more than 99,600 distinct plans. Statewide Senate votes provide consistent candidate choices across precincts. These [[concepts/redistricting-ensembles|Redistricting Ensembles]] generate counterexamples, not probability estimates of gerrymandering.

## Experiments

| State and election | Republican two-party share | Reported finding |
| --- | ---: | --- |
| Utah, Senate 2016 | 71.55% | 5,734 of 100,000 sampled plans give Democrats one seat; all such plans have PG above .069, MM above .034, and PB at least .25. Plans with very good symmetry scores give Republicans all four seats. |
| Texas, Senate 2012 | 58.15% | More than 98% of sampled plans give Republicans 22–27 of 36 seats. Outliers with at least 28 Republican seats occur more than twice as frequently among near-zero-MM plans as in the full ensemble. |
| North Carolina, Senate 2016 | 53.02% | Highly symmetric plans can produce 11 Republican and two Democratic seats. Four illustrated maps have PG scores .0096, .0099, .0107, and .0115, all within the ensemble's best 2%. |

In Texas, extreme plans favoring either party can obtain near-optimal PG; many Democratic-favoring plans receive positive MM. North Carolina's MM distinguishes seat extremes better, but Republican extremes still span the ideal score of zero. Differential turnout matters because statewide vote share and the unweighted district mean need not coincide.

## Limitations

The exact characterization concerns linear uniform swing. The authors discuss small stochastic perturbations, but do not establish a universal impossibility result for all election models. Ensembles are existence demonstrations, not representative probability samples or formal statistical tests; their criteria do not exhaust every state-specific legal requirement. Utah's stronger geographic argument depends on bounds on attainable district support and turnout assumptions. Historical vote patterns are held fixed rather than forecasting voter or candidate responses to new boundaries.

The critique evaluates symmetry against the goal of constraining extreme partisan seats. The authors explicitly distinguish this practical failure from a logical refutation of symmetry as a normative fairness definition. The supplied Markdown has damaged mathematical typography; the characterization above follows the readable theorem and proof rather than reproducing corrupted expressions.

## Related Concepts

- [[concepts/partisan-symmetry|Partisan Symmetry]]: the fairness standard and score family analyzed here.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: provide feasible counterexamples under geographic constraints.
- [[concepts/partisan-advantage-decomposition|Partisan Advantage Decomposition]]: clarifies why advantage depends on a fairness benchmark and geographic constraints.

## Related Papers

- Katz, King, and Rosenblatt (2020), “Theoretical Foundations and Empirical Evaluations of Partisan Fairness in District-Based Democracies”: the symmetry framework this paper scrutinizes.
- DeFord, Duchin, and Solomon (2021), “Recombination: A Family of Markov Chains for Redistricting”: supplies the ensemble algorithm.
- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]]: a later library comparison using ensembles and stochastic electoral modeling; not a citation in this paper.

Published in *Political Analysis* 31 (2023), 305–324; first published online December 2, 2021. [Article DOI](https://doi.org/10.1017/pan.2021.49). The source provides [replication data](https://doi.org/10.7910/DVN/MVVLQC).
