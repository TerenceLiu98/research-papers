---
title: "The Condorcet Jury Theorem, Free Speech, and Correlated Votes"
type: paper
authors:
  - Krishna K. Ladha
year: 1991
tags:
  - condorcet-jury-theorem
  - correlated-voting
  - majority-rule
  - free-speech
  - democratic-theory
---

## TL;DR

This paper generalizes the [[Condorcet's Jury Theorem]] from independent to correlated votes. Using a Cantelli-inequality bound, it shows that majority rule can outperform the average voter when the average probability of a correct vote exceeds .5 and average vote interdependence is sufficiently low. The paper connects low or negative correlations to free speech and competing schools of thought, while emphasizing that free speech alone does not guarantee accurate collective choice.

## Research Question

Under what conditions can majority-rule voting still select the superior of two alternatives more accurately than an individual voter when votes are correlated rather than independent, and what does this imply for free speech and the design of advisory groups?

## Motivation

The classical Condorcet Jury Theorem provides a mathematical rationale for majority rule, but its independence assumption excludes common information, communication, social influence, and shared beliefs that are common in real decisions. The paper therefore asks whether the theorem can be extended without requiring every pair of votes to be independent. It also clarifies the meaning of a correct alternative and of the assumption that each voter is more likely than not to identify it.

## Contributions

- Extends Condorcet's result to heterogeneous voters with correlated binary votes by constraining the average joint probability of simultaneous correct votes.
- Derives a sufficient condition under which the majority's success probability exceeds the average individual accuracy, using the variance of the average vote and Cantelli's inequality.
- Shows that, when individual accuracies are equal, the condition can be expressed through the average pairwise correlation, not each individual correlation.
- Establishes an asymptotic result: as group size grows and average interdependence approaches zero, majority accuracy approaches one even without independence.
- Connects opposing schools of thought and free speech to the possibility of lower or negative vote correlations, while noting that voters must still be correct on average more than half the time.

## Method

Each voter is represented by a binary variable \(X_i\), equal to one when the voter selects the superior alternative. The paper allows heterogeneous accuracies \(p_i = P(X_i = 1)\) and pairwise joint probabilities \(r_{ij} = P(X_i = 1, X_j = 1)\). It summarizes individual accuracy with \(\bar{p}\) and interdependence with the average \(\bar{r}\) and average pairwise correlation \(\bar{\rho}\).

The variance of the average vote is \(\sigma^2 = \bar{p}/n + (n-1)\bar{r}/n - \bar{p}^2\). Proposition 1 applies Cantelli's inequality to obtain a lower bound for the probability that a majority selects the superior alternative. It gives a sufficient threshold \(\bar{r} < r^*(n, \bar{p})\) for the majority to outperform the average voter. When all voters have the same accuracy \(p\), the threshold is expressed as \(\bar{\rho} < \rho^*(n,p)\).

## Experiments

The paper uses analytical and numerical examples rather than a dataset or statistical experiment. Its three-voter counterexample has marginal accuracy \(p = .55\), pairwise zero covariance, but non-independent votes; the majority selects the superior alternative with probability .3925, below the individual accuracy. This demonstrates that pairwise uncorrelatedness is not enough for the classical result.

For equal voter accuracy \(p = .6\), the reported correlation threshold is \(\rho^*(37,.6) = .0008\) for a group of 37 and \(\rho^*(9,.6) = -.094\) for a group of nine. The five-voter Example 2 combines three relatively informed voters with two less accurate voters whose votes are negatively correlated with the informed voters; the resulting average vote has zero variance and the majority selects the superior alternative with probability one. The paper also reports that, under the stated distributional restrictions, majority accuracy decreases as average correlation increases.

## Limitations

The main proposition gives a sufficient lower bound, not the exact majority-success probability, and its small-group thresholds can require strong negative average correlation. The comparative-static claim that lower correlation increases majority accuracy requires additional assumptions about the distribution of the average vote, such as convergence to a well-behaved limiting distribution or particular hypergeometric or Polya structures. The analysis is theoretical and its link from free speech to vote correlations is argued conceptually rather than estimated with political data. Finally, the formal setup focuses on two alternatives and largely maintains a common-goal interpretation of the superior alternative.

## Related Concepts

- [[Condorcet's Jury Theorem]]
- [[Correlated Voting]]
- [[Free Speech and Democratic Choice]]
- [[Opinion Dynamics]]

## Related Papers

- Condorcet (1976), *Condorcet: Selected Writings*, edited by Keith Michael Baker.
- Grofman, Owen, and Feld (1983), "Thirteen Theorems in Search of the Truth."
- Miller (1986), "Information, Electorates, and Democracy: Some Extensions and Interpretations of the Condorcet Jury Theorem."
- Lindley (1985), "Reconciliation of Discrete Probability Distributions."
- Ladha (n.d.), "Condorcet's Jury Theorem in Light of De Finetti's Theorem: Majority-Rule Voting with Correlated Votes."

[[index|Library home]]
