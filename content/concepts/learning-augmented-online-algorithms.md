---
title: Learning-Augmented Online Algorithms
type: concept
aliases:
  - Algorithms with Predictions
  - Prediction-Augmented Online Algorithms
definition: Online algorithms that use potentially erroneous predictions to improve sequential decisions while analyzing performance relative to an offline optimum as a function of prediction quality.
tags:
  - online-algorithms
  - learning-augmented-algorithms
---

## Overview

Learning-augmented online algorithms make sequential decisions using forecasts about information that has not yet arrived. Their analysis asks how much accurate predictions help and what guarantees survive inaccurate ones. The prediction interface is part of the algorithmic design: an aggregate frequency estimate can be easier to learn than advice encoding an optimal solution.

## Key Ideas

- **Consistency** measures the competitive ratio with perfect predictions; **robustness** measures worst-case performance under adversarial predictions.
- **Error-dependent guarantees** describe degradation between these extremes. The error metric must match the information actually predicted.
- **Learnability and decision quality are distinct.** Estimating a distribution accurately does not by itself specify a good online allocation rule.
- **Combining prediction and fallback requires problem structure.** In bin packing, reservations for complementary future sizes can temporarily look wasteful. A rule comparing only prefix costs can discard precisely the reservations that make accurate predictions useful.
- **Tradeoffs can be unavoidable.** In fixed-capacity discrete bin packing, very strong consistency with frequency advice forces worst-case robustness to grow with capacity.

## Important Papers

- [[papers/online-bin-packing-with-predictions|Online Bin Packing with Predictions]]: uses item-size frequencies to construct reusable packing profiles and derives error-dependent guarantees for a hybrid with conventional online packing.
- Lykouris and Vassilvitskii (2021), “Competitive caching with machine learned advice”: foundational consistency and robustness framework cited by the bin-packing study.

## Related Concepts

- [[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]]: serving decisions can use forecasts of uncertain demands; prediction quality and system-specific constraints determine whether online guarantees apply.
