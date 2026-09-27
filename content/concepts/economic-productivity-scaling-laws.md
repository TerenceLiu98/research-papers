---
title: Economic Productivity Scaling Laws
type: concept
aliases:
  - Scaling Laws for Economic Productivity
tags:
  - economic-productivity
  - scaling-laws
  - human-ai-interaction
---

## Overview

Economic productivity scaling laws are empirical relationships between the resources used to train AI models and the economic outcomes of people working with them. They extend scaling analysis beyond model loss or benchmark accuracy to task time, output quality, and productivity under a specified workflow. An observed relationship is conditional on the models, workers, tasks, and compute range studied.

## Key Ideas

- **Measure the assisted worker.** A model's prediction performance does not directly determine the speed or quality of a human-AI workflow. Experiments must measure the joint outcome, including human interaction with the model.
- **Separate time, quality, and rewards.** Faster task completion and better output are different benefits. Earnings per minute can combine them, but its interpretation depends on the payment and quality-bonus rules. It need not equal a market wage or economy-wide productivity.
- **Distinguish empirical slopes from universal laws.** Regressing an outcome in levels on log compute gives an additive change for a multiplicative compute increase. Expressing that change relative to a sample mean does not make it a constant percentage effect at every scale. Log-outcome specifications answer a different question.
- **Keep model comparisons distinct from a compute-only intervention.** Random access to models can identify effects of using those systems. Attributing differences exclusively to training compute requires accounting for other model differences.
- **Allow worker heterogeneity.** Merali's translation experiment finds larger time savings from model scaling among workers who were slower on an unaided baseline. That split describes baseline speed and does not by itself identify long-run effects on skill or wage inequality.
- **State extrapolation assumptions.** Applying a relationship outside the observed compute range or task domain requires evidence or explicit assumptions. Aggregating to the economy additionally requires assumptions about exposure, adoption, labor shares, and the cost of implementation. Training resources and deployment costs are separate quantities.

## Important Papers

- [[papers/scaling-laws-for-economic-productivity-experimental-evidence-in-llm-assisted-translation|Scaling Laws for Economic Productivity: Experimental Evidence in LLM-Assisted Translation]] (Merali, 2024): an experiment with 300 translators and 13 LLMs reports 12.3% less task time, 0.18 SD higher quality, and 16.1% higher experimental earnings per minute per tenfold increase in model training compute. Its macroeconomic projection relies on additional transfer and adoption assumptions.
- Kaplan et al. (2020), "Scaling Laws for Neural Language Models": the model-performance scaling literature cited as motivation by Merali; it does not itself establish assisted worker productivity effects.

## Related Concepts

- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]: connects measured benefits to inference and deployment costs when choosing models for a workflow.
