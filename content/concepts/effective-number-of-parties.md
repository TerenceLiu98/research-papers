---
title: Effective Number of Parties
type: concept
aliases:
  - Effective Party Number
  - Laakso-Taagepera Index
tags:
  - effective-number-of-parties
  - party-systems
  - electoral-systems
  - political-measurement
---

## Overview

The effective number of parties is a concentration-adjusted count of parties in an electoral or legislative system. Rather than giving every party equal weight, it converts the distribution of vote or seat shares into the number of equally sized parties that would produce the same concentration.

## Key Ideas

- For party shares $p_i$, the standard Laakso-Taagepera measure is

  $$
  N=\frac{1}{\sum_i p_i^2}.
  $$

  A system with two equally sized parties has $N=2$; unequal shares produce an effective count below the raw count.
- The effective number of vote-winning parties, $N_V$, uses vote shares, while the effective number of seat-winning parties, $N_S$, uses seat shares. Their difference summarizes part of the electoral system's transformation of votes into representation.
- The measure is the inverse Herfindahl concentration index. It is sensitive to fragmentation among consequential parties while limiting the influence of parties with negligible shares.
- Raw and effective counts answer different questions. Raw counts determine how many parties are present, whereas effective counts describe how dispersed electoral support or legislative representation is.
- In logical models of electoral systems, effective party numbers can connect institutional quantities such as district magnitude and assembly size to downstream outcomes. Such relationships are stylized expectations, not identities for every election.
- [[Party-System Polarization]] can rise nonlinearly with the effective party number: the one-party anchor forces zero dispersion, while the incremental expected polarization from additional parties diminishes as the count grows.
- Incomplete party-share data require care because omitted shares can bias concentration. Coverage thresholds or estimators designed for incomplete shares should be reported explicitly.

## Important Papers

- Laakso and Taagepera (1979), "Effective number of parties: A measure with application to West Europe."
- Taagepera (1997), "Effective number of parties for incomplete data."
- Shugart and Taagepera (2017), *Votes from Seats: Logical Models of Electoral Systems*.
- [[Party system polarization and the effective number of parties]]

## Related Concepts

- [[Party-System Polarization]]
- [[Quantitatively Predictive Logical Models]]
- Electoral-system seat product
- Party-system fragmentation
- Vote-seat disproportionality
- Herfindahl concentration index
