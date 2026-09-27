---
title: Electoral Rule Disproportionality
type: concept
aliases:
  - Vote-Seat Disproportionality
tags:
  - electoral-systems
  - party-competition
  - political-representation
---

## Overview

Electoral rule disproportionality concerns how electoral rules translate vote shares into unequal seat shares. In spatial competition, this transformation changes the parliamentary influence a party can gain by moderating its platform and attracting additional voters.

## Key Ideas

- A power-law model assigns party $j$ seat share $S_j=V_j^n/\sum_k V_k^n$. With $n=1$, seats are proportional to votes; larger $n$ amplifies the advantage of larger parties. With a unique vote winner, the limit as $n$ grows approaches winner-take-all allocation.
- The rule parameter and realized disproportionality are distinct. Two parties with equal vote shares receive equal seat shares at every finite $n$, even though their incentives to gain extra votes change with $n$.
- Under the [[concepts/parliamentary-mean-model|Parliamentary-Mean Model]], additional seats increase a platform's weight in implemented policy. A stronger seat reward for additional votes can make moderation attractive to a policy-motivated party.
- Electoral rules can also affect entry. In the three-potential-party model of Matakos, Troumpounis, and Xefteris, stronger disproportionality eventually makes the centrist party's seat return insufficient to cover entry cost. This is a conditional mechanism, not a universal claim about which parties disappear.
- Empirical proxies require care: the 2013 paper uses a non-FPTP indicator and log average district magnitude, both increasing with proportionality. These proxies are not direct estimates of the model's exponent or measures of an election's realized vote-seat discrepancy.

## Important Papers

- [[papers/electoral-rule-disproportionality-and-platform-polarization|Electoral Rule Disproportionality and Platform Polarization]] derives direct moderation and indirect entry channels, with observational evidence for the electoral-rule association and weaker evidence for a separate party-count effect.
- Theil (1969), "The desired political entropy," and Taagepera (1986), "Reformulating the cube law for proportional representation elections," are cited by that manuscript for the vote-to-seat mapping.

## Related Concepts

- [[concepts/parliamentary-mean-model|Parliamentary-Mean Model]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/effective-number-of-parties|Effective Number of Parties]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]
