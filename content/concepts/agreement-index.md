---
title: Agreement Index
type: concept
aliases:
  - Three-Option Voting Cohesion
tags:
  - legislative-politics
  - roll-call-voting
  - political-parties
---

## Overview

The Agreement Index measures the cohesion of a group whose members can vote Yes, No, or Abstain. It treats abstention as an expressed voting option and maps agreement to a zero-to-one scale. It describes observed voting unity, without distinguishing shared preferences from party discipline.

## Key Ideas

For counts $Y,N,A$, total expressed votes $T=Y+N+A>0$, and largest option count $M=\max(Y,N,A)$,

$$
AI=\frac{M-\tfrac12(T-M)}{T}=\frac{3M-T}{2T}.
$$

- **Endpoints:** Unanimity yields 1; equal division across the three options yields 0. A group with no expressed votes has an undefined index. Abstention is distinct from absence.
- **Why include abstention:** With 10 Yes, 10 No, and 100 Abstain votes, the index equals 0.75. A Rice index based only on Yes and No equals zero, discarding the coordinated abstentions.
- **Relation to other measures:** Hix, Noury, and Roland describe their index as a linear rescaling of Attina's three-option measure, which can be negative. Their empirical correlation with the Rice index is 0.98, but this does not make the measures interchangeable when abstention is common.
- **Relative cohesion:** Dividing a party's index by the chamber's index on the same vote adjusts descriptively for chamber consensus. The ratio can exceed 1 and is undefined if chamber agreement is zero. It is a separate quantity from the bounded absolute index.
- **Interpretation:** High agreement can arise from common preferences, leadership pressure, or a consensual agenda. Comparing parties or periods also requires attention to which votes are recorded and how vote-level scores are aggregated.
- **Cohesion versus coalitions:** Within-group agreement differs from the frequency with which two groups' majorities vote together. Groups can each be cohesive while consistently opposing each other.

## Important Papers

- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: introduces the index and compares absolute and chamber-relative cohesion across transnational party groups.

## Related Concepts

- [[concepts/conditional-party-government|Conditional Party Government]]: distinguishes the conditions for delegation to party leaders from a descriptive voting-unity measure.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: agreement patterns alone do not establish the number of underlying preference dimensions.
