---
title: Bayesian Process Tracing
type: concept
aliases:
  - BPT
definition: "Bayesian process tracing evaluates within-case causal explanations by updating prior beliefs using the relative likelihood of observed evidence under competing hypotheses."
tags:
  - process-tracing
  - bayesian-inference
  - qualitative-methods
---

## Overview

Bayesian process tracing evaluates within-case causal explanations by updating prior beliefs using the relative likelihood of observed evidence under competing hypotheses. Implementations can assign numerical probabilities or express comparisons narratively. Both require explicit reasoning about what evidence would be expected under each explanation.

## Key Ideas

- **Hypotheses describe possible worlds.** Two causal factors can coexist even when hypotheses about their particular combinations are mutually exclusive. Exhaustiveness is a separate question about coverage of possible explanations.
- **Likelihoods differ from posterior beliefs.** The probability of evidence under a hypothesis is an input to updating, not the probability that the hypothesis is true after observing evidence.
- **Contingencies affect evidence interpretation.** An apparent alibi can have a different likelihood if deliberately fabricated; these possibilities need substantive justification.
- **Sequential evidence needs coherent conditioning.** Multiplying marginal likelihoods assumes conditional independence within each hypothesis. Dependent evidence requires conditioning on earlier observations.
- **Confidence depends on the analysis specification.** Concentrated posteriors do not independently validate the hypothesis set or elicited probabilities. Sensitivity checks and transparent reasoning help assess how assumptions drive conclusions.
- **Narrative analysis needs bookkeeping.** Verbal comparisons must retain earlier evidence and prior weights to represent cumulative updating coherently.

- **Theory revision changes the updating problem.** Updating belief in a fixed hypothesis differs from modifying its content. Zaks (2021) calls for explicit guidance on priors and previously examined evidence after such revisions, and emphasizes additional evidence as a check on stability.

- **Iteration can reopen the full comparison.** Bennett, Charman, and Fairfield prescribe assessing a newly introduced hypothesis against the original background information and all accumulated evidence. They distinguish this coherent recalculation from discarding earlier observations. Their defense addresses Zaks’s critique, while practical elicitation and cognitive-bias concerns remain relevant.
- **Evidence is pair-relative.** A likelihood ratio of one leaves the odds between that pair unchanged. For n hypotheses, n − 1 independent ratios against a reference determine the remaining pairwise ratios.

## Important Papers

- [[papers/understanding-bayesianism-fundamentals-for-process-tracers|Understanding Bayesianism: Fundamentals for Process Tracers]]: clarifies exclusive hypothesis construction, relative evidentiary support, multiple comparisons, and full-evidence iteration in response to Zaks.

- [[papers/updating-bayesians-a-critical-evaluation-of-bayesian-process-tracing|Updating Bayesian(s): A Critical Evaluation of Bayesian Process Tracing]]: evaluates claims about iteration, timing, rival explanations, and bias, and proposes implementation and validation priorities.

- [[papers/return-to-the-scene-of-the-crime-revisiting-process-tracing-bayesianism-and-murder|Return to the Scene of the Crime: Revisiting Process Tracing, Bayesianism, and Murder]]: Zaks's worked critique of hypothesis construction, likelihood elicitation, and numerical and narrative updating.
- Fairfield and Charman (2017), “Explicit Bayesian Analysis for Process Tracing: Guidelines, Opportunities, and Caveats”: methodological foundation discussed in Zaks's critique.

## Related Concepts

- Bayesian updating: the probabilistic rule underlying evidence-based belief revision.
- Hypothesis specification: defines the alternative explanations over which relative support is assessed.
- Sensitivity analysis: examines dependence of conclusions on prior and likelihood choices.
