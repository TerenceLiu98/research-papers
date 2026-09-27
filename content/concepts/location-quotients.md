---
title: Location Quotients
type: concept
aliases:
  - Localization Quotient
  - Localization Quotients
  - Location Quotient
tags:
  - spatial-analysis
  - descriptive-statistics
  - scientometrics
---

## Overview

A location quotient compares a category's share within one region with that category's share in a reference population. It measures relative concentration rather than absolute volume. For submission timing, the category can be a weekday or a group of days, and the reference population can be the pooled journal sample.

## Key Ideas

Let $n_{cI}$ count observed papers from country $c$ submitted during interval $I$, and let $n_c$ count all observed papers from that country. Writing $n_I$ and $n$ for the corresponding pooled counts gives

$$
LQ_{cI}=\frac{n_{cI}/n_c}{n_I/n}.
$$

This expresses the definition in the captions of Figures 4-5 of Boja et al. (2018). Values above one indicate overrepresentation relative to the pooled interval share; values below one indicate underrepresentation. A percentage presentation multiplies the ratio by 100, so 100% is the reference level.

- **The reference population matters.** A pooled four-journal sample is a benchmark for those observed papers, not all scientific activity worldwide. Changes in journal composition can change the benchmark.
- **Relative concentration differs from volume.** A country can have a high quotient despite contributing few papers. Small denominators make such comparisons sensitive to individual records; zero local totals or a zero reference share leave the ratio undefined.
- **Calendar grouping matters.** Tuesday-Thursday and Saturday-Monday summaries answer different compositional questions. Because Friday is excluded from both groups, the two quotients are not algebraic complements.
- **Maps remain descriptive.** Color classes show relative concentration; they are not significance tests and do not establish why a country differs. In accepted-paper samples, they also do not measure acceptance probabilities.

## Important Papers

- [[papers/day-of-the-week-submission-effect-for-accepted-papers-in-physica-a-plos-one-nature-and-cell|Day of the week submission effect for accepted papers in Physica A, PLOS ONE, Nature and Cell]] (Boja et al., 2018): maps submission-interval quotients by corresponding-author country using GIS and natural-break color classes.
- Furtuna et al. (2013), "Analysing the spatial concentration of economic activities: a case study of energy industry in Romania." Cited by Boja et al. as the model adapted for their indicator.

## Related Concepts

- [[concepts/day-of-week-effects|Day-of-Week Effects]]: one application of location quotients to geographically varying calendar patterns.
- Relative concentration: compares a local composition with a reference composition.
- Geographic aggregation: country-level summaries do not identify individual researchers' behavior.
