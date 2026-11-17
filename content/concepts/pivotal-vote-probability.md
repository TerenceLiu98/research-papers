---
title: Pivotal Vote Probability
type: concept
aliases:
  - Pivotal Probability
definition: "The probability that casting a specified ballot changes the election winner relative to a specified alternative, such as abstention, given beliefs about other ballots and tie-breaking rules."
tags:
  - electoral-systems
  - strategic-voting
---

## Overview

Pivotal vote probability measures a ballot's chance of changing the winner. Its definition requires a counterfactual: casting a ballot versus abstaining differs from choosing between two ballots. Baltz uses abstention as the baseline.

## Key Ideas

- Pivotality depends on electoral rules, beliefs about other votes, and the treatment of ties.
- In IRV, a ballot can directly elect the candidate it supports or indirectly change the winner by altering the elimination sequence.
- Lower ballot positions become active after higher-ranked candidates are eliminated; truncated rankings must therefore be represented explicitly.
- Expected instrumental benefit weights each pivotal event by the utility change it produces. A high chance of changing the winner alone does not establish a beneficial strategic deviation.
- Similar pivotal probabilities across voting rules do not establish similar observed voter behavior.

## Important Papers

- [[papers/the-probability-of-casting-a-pivotal-vote-in-an-instant-runoff-voting-election|The Probability of Casting a Pivotal Vote in an Instant Runoff Voting Election]] (Baltz, 2025): decomposes IRV pivotality into direct and indirect events for arbitrary candidate counts and ballot lengths.

## Related Concepts

- [[concepts/costly-voting|Costly Voting]]: instrumental benefits from pivotal events can enter the participation calculus.
- [[concepts/expressive-voting|Expressive Voting]]: expressive benefits can motivate participation even when the probability of affecting the winner is small.
