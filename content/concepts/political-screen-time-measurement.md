---
title: Political Screen-Time Measurement
type: concept
aliases:
  - Political Actor Screen Time
definition: "Measurement of how long identified political actors are visibly present in video, used to compare attention across actors, outlets, and periods."
tags:
  - political-communication
  - content-analysis
  - computer-vision
---

## Overview

Political screen-time measurement quantifies the duration of visible appearances by identified actors. Face detection, identity recognition, and tracking can automate this task across news archives. The resulting measure captures visual exposure, with an interpretation that depends on sampling, recognition accuracy, and the denominator used for comparisons.

## Key Ideas

- Identity templates and pretrained embeddings allow new actors to be measured without training a new identity classifier.
- Aggregating recognition over tracklets can stabilize labels compared with classifying each frame independently.
- Absolute duration, share among selected actors, and ratios of those shares answer different questions. A party-leader share depends on which leaders enter the denominator.
- Screen-time equality operationalizes stopwatch fairness, but does not measure whether coverage is favorable, critical, or substantively balanced.
- Sparse frame annotations may conceal false positives. Validation should reflect background identities, face sizes, and the footage used for substantive comparisons.
- Sampled programs support sample-based comparisons; gaps in coverage limit continuous trend inference.

## Important Papers

- [[papers/face-detection-tracking-and-classification-from-large-scale-news-archives-for-analysis-of-key-political-figures|Girbau et al. (2023)]]: validates template-based recognition and tracklet voting across U.S. and Japanese television and applies the outputs to candidate and incumbent visibility.

## Related Concepts

- [[concepts/visual-political-bias|Visual Political Bias]]: broader portrayal and selection effects beyond duration.
- [[concepts/automated-visual-framing-analysis|Automated Visual Framing Analysis]]: contextual interpretation that complements exposure measurement.
