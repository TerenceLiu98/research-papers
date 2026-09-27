---
title: Polling House Effects
type: concept
aliases:
  - Pollster House Effects
tags:
  - polling
  - election-forecasting
  - measurement-error
---

## Overview

Polling house effects are systematic tendencies for an organization's polls to favor a party or candidate because of its methodology. They are distinct from random sampling error and from shifts shared across an industry. Observed historical poll errors can inform a correction, but their average does not isolate a persistent house effect by itself.

## Key Ideas

- **Attribution is difficult:** A signed difference between a poll and the eventual result can reflect sampling variation, nonresponse, likely-voter selection, changing preferences, or late deciders as well as a pollster-specific tendency.
- **Historical adjustment uses a temporal cutoff:** Branstetter et al. average each pollster's past election-result-minus-poll margins using only earlier election years. Adding that correction to current Republican-minus-Democratic margins makes historical Democratic overprediction shift current polls Republicanward, and vice versa.
- **Correction and weighting differ:** Shifting a poll's margin addresses an estimated directional tendency. Giving more weight to a pollster judged accurate changes its influence in aggregation. The studied extension implements the former and proposes the latter as future work.
- **Persistence is an assumption:** Pollsters can revise their methods after a miss. Historical corrections may then overshoot or move polls away from the result. Small historical samples also undermine the assumption that sampling errors cancel.
- **Identity resolution precedes estimation:** Pollster names, abbreviations, sponsors, and collaborations must be reconciled across datasets and years. Incorrectly merging or splitting organizations changes their estimated histories.
- **Alternative anchors have tradeoffs:** Post-election results can identify retrospective errors but cannot anchor a real-time forecast of that same election. Estimating house effects from current polls under a zero-net-bias assumption avoids reliance on older elections but remains vulnerable to a shared polling miss. These alternatives are discussed, not empirically compared, in the linked paper.

## Important Papers

- [[papers/how-time-and-pollster-history-affect-us-election-forecasts-under-a-compartmental-modeling-approach|How Time and Pollster History Affect U.S. Election Forecasts under a Compartmental Modeling Approach]]: estimates historical corrections for 481 identified organizations and reports both improvements and failures across election cycles.
- Shirani-Mehr, Rothschild, Goel, and Gelman (2018), "Disentangling bias and variance in election polls," [DOI: 10.1080/01621459.2018.1448823](https://doi.org/10.1080/01621459.2018.1448823): cited by the linked paper for distinguishing bias and variance.
- Jackman (2005), "Pooling the polls over an election campaign," [DOI: 10.1080/10361140500302472](https://doi.org/10.1080/10361140500302472): cited discussion of house-effect estimation and historical pollster information.

## Related Concepts

- [[concepts/compartmental-election-forecasting|Compartmental Election Forecasting]]: one forecasting framework in which poll corrections change fitted parameters and forecast distributions.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: changing preferences must be distinguished from systematic errors in measuring them.
