---
title: Social Media Data Persistence Bias
type: concept
aliases:
  - Nonrandom Tweet Mortality
  - Tweet Attrition Bias
definition: "Systematic distortion of a social-media dataset when the probability that a record remains retrievable depends on its content, author, or other analytically relevant characteristics."
tags:
  - social-media
  - reproducibility
  - selection-bias
---

## Overview

Social media data persistence bias arises when later retrieval selects a systematically different subset of previously collected records. Deletion, account protection, deactivation, and platform suspension can change the composition of an identifier-based archive. A stable list of identifiers therefore need not imply a stable research dataset.

## Key Ideas

- **Availability is not representativeness.** The share recovered measures attrition but does not establish whether remaining observations preserve substantive relationships.
- **Selection can operate at several levels.** Account suspension removes groups of records together; individual deletions can depend on content or events.
- **Aggregate checks can conceal subgroup changes.** Stable overall mention frequencies need not preserve gender, party, or actor-specific distributions.
- **Access and persistence are distinct.** Restoring API access does not restore records that have disappeared. Conversely, intact records may remain inaccessible because access conditions change.
- **Rebalancing has limits.** Matching known group proportions can diagnose composition effects, but cannot establish recovery of missing textual content or unobserved within-group differences.

## Important Papers

- [[papers/nonrandom-tweet-mortality-and-data-access-restrictions|Nonrandom Tweet Mortality and Data Access Restrictions]]: compares sensitive and nonsensitive datasets and demonstrates changed findings after recrawling violent political tweets.

## Related Concepts

- [[concepts/paper-derived-computational-reproduction|Paper-Derived Computational Reproduction]]: data persistence is a prerequisite for reproducing results even when methods can be reconstructed.
- [[concepts/research-data-sharing-incentives|Research Data Sharing Incentives]]: encourages sharing, while persistence bias concerns whether shared identifiers continue to yield usable observations.
