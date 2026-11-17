---
title: Name-Based Demographic Inference
type: concept
aliases:
  - Name-Based Identity Inference
definition: "Name-based demographic inference estimates group membership from statistical associations between personal names and demographic labels, using dictionaries or learned name features."
tags:
  - demographic-inference
  - political-methodology
---

## Overview

Personal names can provide probabilistic signals of group membership when direct demographic reports are unavailable. Their informativeness depends on naming conventions, linguistic origins, the target category, and the population. Inferred membership is a measurement proxy, not an identity declaration.

## Key Ideas

- Dictionary coverage and classification accuracy are separate properties. Character features can classify names absent from reference lists.
- Relatives' names can add information, but their use relies on associations between household members' identities.
- Self-reports and human name-based annotations provide different validation targets: recorded identity versus perceived identity.
- Evaluate aggregate count errors separately from individual classification. Class-specific false positives and false negatives affect population estimates differently.
- Validate across name lengths, populations, and demographic subgroups. High overall scores can conceal weaker minority recall or subgroup performance.
- Sensitive identity predictions can facilitate discrimination and harm people who are incorrectly classified; probabilistic interpretation remains essential.

## Important Papers

- [[papers/its-all-in-the-name-a-character-based-approach-to-infer-religion|Chaturvedi and Chaturvedi (2024)]] compares dictionaries, character n-gram classifiers, and a CNN for religion inference in India, evaluating coverage, individual performance, and aggregate counts.

## Related Concepts

- [[concepts/bayesian-improved-surname-geocoding|Bayesian Improved Surname Geocoding]] augments surname information with residential demographics through Bayes' rule.
