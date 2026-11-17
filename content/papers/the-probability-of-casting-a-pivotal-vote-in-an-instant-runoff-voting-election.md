---
title: The Probability of Casting a Pivotal Vote in an Instant Runoff Voting Election
type: paper
authors:
  - Samuel Baltz
year: 2025
doi: 10.1017/pan.2024.32
tags:
  - electoral-systems
  - strategic-voting
---

## TL;DR

Baltz derives a general expression for the probability that an instant runoff voting (IRV) ballot changes the winner relative to abstention. It covers arbitrary candidate and voter counts and partially completed rankings by combining direct and indirect pivotal events. Illustrative simulations report similar orders of magnitude for pivotal probabilities in IRV and single-member district plurality (SMDP).

## Research Question

How can the probability of casting a decisive IRV ballot be calculated from expectations about other voters' rankings, and do IRV's counting rules mechanically reduce opportunities to affect the winner?

## Motivation

Claims that IRV encourages sincere voting can reflect psychological or institutional effects rather than the mechanical counting rule. Assessing the latter requires accounting for both the strategic opportunities IRV removes and those it creates. Earlier formal treatments derived pivotal probabilities for limited candidate counts.

## Contributions

- Generalizes the pivotal-probability calculation beyond three- or four-candidate contests.
- Separates direct winner-changing events from indirect changes mediated by elimination order.
- Connects event probabilities to expected utility and accommodates truncated ballots.
- Provides an illustrative comparison with plurality under identical stylized preference structures.

## Method

A ballot ranks up to L candidates out of a field of κ. Round-specific totals depend on initial rankings and transfers from eliminated candidates. The calculation sums over eligible elimination sequences and ballot positions; a lower-ranked candidate matters only once higher-ranked candidates have been eliminated.

**Direct pivotality** occurs when ranking a candidate causes that candidate to win. Equation 8 combines the probability of reaching a final contest with tie-breaking and tie-creating events. The displayed expressions use one-half weights for the relevant tie outcomes.

**Indirect pivotality** occurs when ranking one candidate changes the elimination sequence and causes another candidate to win. Equation 14 sums over baseline sequences and alternative continuations that yield a different winner. The illustrative Alaska example shows that ranking Bye can cause Peltola to win even when Peltola is absent from the added ballot; its preference distribution is explicitly hypothetical.

The paper combines the mutually exclusive categories as:

$$
p(\beta)=p_{\mathrm{direct}}(\beta)+p_{\mathrm{indirect}}(\beta).
$$

Equation 15 weights each event by the utility difference between the resulting winner and the winner under abstention. Blank positions contribute zero, and sums stop at the permitted ballot length. Two independence assumptions, described in the supplementary material, allow the displayed factorization into products rather than joint probabilities.

## Experiments

The main text summarizes supplementary simulations using uniformly distributed preferences and preferences following a power law. For matched stylized electorates, IRV and SMDP produce pivotal probabilities of similar orders of magnitude. This is suggestive evidence of comparable mechanical opportunities to cast a decisive vote, rather than an estimate of actual strategic behavior. The supplied text does not include simulation sample sizes, detailed parameter settings, or numeric result tables.

Replication code is identified at [Code Ocean](https://codeocean.com/capsule/1700151/tree/v1), with DOI 10.24433/co.7671909.v1.

## Limitations

- The simulations are highly stylized; they do not establish equivalence across real elections or preference distributions.
- A decisive ballot need not benefit its voter. Strategic choice requires event-specific utility changes as well as pivotal probabilities, and multiple ballots can have equal expected utility.
- Applying the framework requires a probability model for other voters' rankings. The independence assumptions underlying the displayed products must be distinguished from a general joint-probability treatment.
- The supplied Markdown contains corrupted mathematical expressions, especially Equation 6, and omits the supplementary derivations and simulation details. This summary retains the documented decomposition without reconstructing damaged formulas.

## Related Concepts

- [[concepts/pivotal-vote-probability|Pivotal Vote Probability]]: the central quantity, extended to elimination-based elections.
- [[concepts/costly-voting|Costly Voting]]: pivotality supplies an instrumental benefit term in participation calculations.

## Related Papers

- Bouton (2013), “A Theory of Strategic Voting in Runoff Elections”: an earlier formal treatment whose limited-candidate pivotal calculations motivate the generalization.
- Eggers and Nowacki (2024), “Susceptibility to Strategic Voting: A Comparison of Plurality and Instant-Runoff Elections”: a directly related comparison cited as a precursor.
- Riker and Ordeshook (1968), “A Theory of the Calculus of Voting”: the classical framework motivating pivotal probability as an ingredient of instrumental voting utility.
