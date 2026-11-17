---
title: Ballot Pattern Identifiability
type: concept
aliases:
  - Ballot Fingerprinting
definition: "The ability to associate a ballot with a voter through a distinctive pattern of recorded choices, potentially combined with prior coordination and publicly disclosed ballot records."
tags:
  - election-security
  - ballot-secrecy
---

## Overview

A ballot can carry identifying information even after names are removed. Ranked candidates and recorded blank positions create a space of possible patterns; when many patterns remain unused, a prearranged pattern appearing in public results can provide evidence that a cooperating voter submitted it. This cooperative verification differs from identifying an arbitrary voter without their participation.

## Key Ideas

- Risk depends on the size and distribution of the pattern space relative to the reporting population, not simply whether records contain names.
- More permitted ranks and preserved blank positions expand the pattern space. Smaller reporting units reduce the population in which patterns can collide.
- Counting rules and disclosure rules are distinct. Publishing details irrelevant to tabulation can still expose additional signals.
- A large expected number of unused patterns is a measure of statistical opportunity, not proof of actual vote buying or certain attribution.
- Normalizing irrelevant blank positions and aggregating reporting units can reduce identifiability. Restrictions on ballot length can also alter electoral outcomes.

## Important Papers

- [[papers/votes-can-be-confidently-bought-in-some-ranked-ballot-elections-and-what-to-do-about-it|Votes Can Be Confidently Bought in Some Ranked Ballot Elections, and What to Do about It]] (2024): derives ranking-space counts and an occupancy bound, then examines disclosure risks in IRV elections.

## Related Concepts

- [[concepts/pivotal-vote-probability|Pivotal Vote Probability]]: measures whether a ballot changes the winner, a separate property from whether its pattern can identify the voter. In IRV, lower-ranked choices can carry identifying information without becoming active while a higher-ranked candidate remains in contention.
