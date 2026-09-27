---
title: Day-of-Week Effects
type: concept
aliases:
  - Day of the Week Effect
  - Weekday Effects
tags:
  - calendar-effects
  - scientometrics
  - observational-data
---

## Overview

Day-of-week effects are systematic differences in an observed outcome across days of the weekly cycle. In submission metadata, the outcome might be a count, a share, or a normalized frequency. An observed weekday association does not by itself establish that changing the day would change an individual submission's outcome.

## Key Ideas

- **Define the population and denominator.** The proportion of accepted papers submitted on Tuesday is different from the proportion of Tuesday submissions that are accepted. Estimating the latter requires the full submission denominator, including unsuccessful manuscripts.
- **Separate weekends from weekday contrasts.** A seven-day test can reject uniformity entirely because weekends differ. A Monday-Friday test answers whether the working-week distribution is itself nonuniform.
- **Define the calendar consistently.** Weekend conventions, changes in those conventions, holidays, and server time zones can affect day classification. A recorded resubmission date may differ from the first submission date.
- **Distinguish raw shares from adjusted contrasts.** A regression coefficient compares a modeled outcome with a reference day conditional on the included controls. It need not rank days in the same order as raw counts, particularly when outcomes are normalized within weeks.
- **Interpret normalization at its own scale.** Dividing a day's count by one seventh of its weekly total measures concentration within that week. The ratio is unchanged if all daily counts in the week increase proportionally, so a calendar association with this ratio does not establish a change in total research output.
- **Respect aggregation and dependence.** Pooled findings can be dominated by one journal. Repeating a daily outcome across articles does not create independent daily measurements, and geographic patterns can be summarized with [[concepts/location-quotients|Location Quotients]] without assigning them a causal explanation.

## Important Papers

- [[papers/day-of-the-week-submission-effect-for-accepted-papers-in-physica-a-plos-one-nature-and-cell|Day of the week submission effect for accepted papers in Physica A, PLOS ONE, Nature and Cell]] (Boja et al., 2018): reports strong weekday/weekend differences among accepted papers in four journals. Only PLOS ONE rejects uniformity in the separate weekdays-only test; the accepted-only sample cannot estimate acceptance rates by day.

## Related Concepts

- [[concepts/location-quotients|Location Quotients]]: express relative concentration of calendar activity across regions.
- Selection on outcomes: observing only successful events changes the conditional distribution being measured.
- Seasonal adjustment: distinguishes weekly patterns from other recurring calendar associations.
