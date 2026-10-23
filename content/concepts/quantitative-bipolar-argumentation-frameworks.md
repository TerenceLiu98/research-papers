---
title: Quantitative Bipolar Argumentation Frameworks
type: concept
aliases:
  - QBAFs
  - Quantitative Bipolar Argumentation Framework
tags:
  - computational-argumentation
  - argument-graphs
  - gradual-semantics
---

## Overview

A quantitative bipolar argumentation framework (QBAF) is an argument graph with separate attack and support relations, a base score for each argument, and a gradual semantics that converts this structure into final argument strengths. It extends a bipolar argumentation framework by making the degree of acceptability explicit rather than representing only discrete acceptance.

## Key Ideas

- A QBAF is a tuple consisting of arguments, directed attacks, directed supports, and base scores in the unit interval. Attack and support relations are disjoint.
- A gradual semantics updates an argument's base score using the strengths of its attackers and supporters. Under DF-QuAD, multiple influences are aggregated and then move the score down toward zero or up toward one.
- Paths allow indirect relations. A speech argument can count as pro or con for a target according to whether its path to the target contains an even or odd number of attacks.
- Base scores encode prior strength before relational evidence is applied. Their choice can affect absolute strengths and should be specified and tested rather than treated as neutral.
- In parliamentary debate modeling, policy provisions can serve as root proposal arguments while statements from speakers supply attacking or supporting speech arguments. Sharing the proposal roots aligns source and summary graphs without requiring every statement to match exactly.
- Discrete extension semantics and gradual semantics answer different questions. A binary acceptance status can remain unchanged even when the balance of support changes sharply; continuous strengths can reveal that difference.

## Important Papers

- [[Evaluating LLM-Driven Summarisation of Parliamentary Debates with Computational Argumentation]]: uses provision-anchored QBAFs to compare parliamentary debates with LLM-generated summaries.
- Amgoud and Ben-Naim (2018), "Evaluation of Arguments in Weighted Bipolar Graphs."
- Baroni, Rago, and Toni (2018), "How Many Properties Do We Need for Gradual Argumentation?"
- Rago, Toni, Aurisicchio, and Baroni (2016), "Discontinuity-Free Decision Support with Quantitative Argumentation Debates."

## Related Concepts

- [[Argument Relation Classification]]
- [[Argumentative Summary Faithfulness]]
- Computational argumentation
- Bipolar argumentation frameworks
- Gradual argumentation semantics
