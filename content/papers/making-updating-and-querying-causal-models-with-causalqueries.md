---
title: Making, Updating, and Querying Causal Models with CausalQueries
type: paper
authors:
  - Till Tietz
  - Lily Medina
  - Georgiy Syunyaev
  - Macartan Humphreys
year: null
tags:
  - causal-inference
  - bayesian-inference
  - statistical-software
---

## TL;DR

CausalQueries converts a user-specified graph over binary variables into a distribution over causal response types, updates that distribution with Stan, and evaluates factual, interventional, and counterfactual queries. One fitted model supports multiple estimands, including quantities that are not identified by the data alone.

## Research Question

How can researchers specify, update, and query diverse binary causal models through one coherent interface, including confounding, imperfect compliance, incomplete observations, and nested counterfactuals?

## Motivation

Conditional probability tables alone do not determine joint counterfactual responses such as compliance types or probabilities of causation. Estimator-specific software also fragments analyses across treatment effects, mediation, and case-level inference. Explicit distributions over response types provide a common representation for these tasks.

## Contributions

- A three-stage R interface: `make_model()`, `update_model()`, and `query_model()`.
- Automatic enumeration and parameterization of [[concepts/causal-response-types|Causal Response Types]], with configurable confounding, type restrictions, and Dirichlet priors.
- A generic Stan model whose data inputs encode the causal structure and observation strategies.
- Query syntax supporting interventions, factual or counterfactual conditions, and nested interventions, with population and new-case interpretations.

## Method

For a binary node with $p$ binary parents, there are $2^{2^p}$ possible deterministic response functions. A unit's causal type combines its response functions across nodes. Without unobserved confounding, nodal-type distributions factorize; bidirected edges allow dependence, represented through conditional type distributions. Monotonicity restrictions remove prohibited types.

Independent Dirichlet priors are assigned to parameter families. The model maps their probabilities to observable events and uses multinomial likelihoods for event counts, separately accounting for observation strategies. Incomplete observations are handled under missingness at random conditional on observed data; explicitly specified censored event types alter the likelihood. Stan supplies posterior draws rather than a proof of identification.

Queries propagate interventions through each causal type and average the resulting values with type probabilities. For example, `Y[X = 1] - Y[X = 0]` defines the average treatment effect. Conditioning on `X[Z = 1] > X[Z = 0]` selects compliers. Nested interventions can hold a mediator at its counterfactual value to define direct effects.

Population conditional queries average model-specific conditional quantities. New-case queries instead integrate the joint query-and-evidence probability and divide by the integrated evidence probability. These generally differ because observing a new case can change beliefs about the model.

## Experiments

The paper illustrates the workflow by replicating a medication noncompliance analysis using the model `Z -> X -> Y; X <-> Y`. Table 1 reports:

| Query | Posterior mean | SD | Reported credible interval |
| --- | ---: | ---: | --- |
| Average treatment effect | 0.55 | 0.10 | [0.37, 0.73] |
| Probability of causation among X = 0, Y = 0 | 0.63 | 0.15 | [0.38, 0.89] |
| Complier average effect | 0.70 | 0.05 | [0.59, 0.80] |

A censoring demonstration changes the estimated mean effect from 0.590 to 0.015 when discordant X/Y observations are declared censored (Section 7.4), illustrating how observation assumptions affect inference.

Appendix C reports four parallel chains with 4,000 iterations, replicated eight times. Increasing the number of direct parents of an outcome from one to three increases the reported parameter count from 6 to 262 and runtime from 7.70 to 52.47 seconds. For the one-parent model, increasing observations from 10 to 10,000 increases runtime from 5.82 to 8.48 seconds. These are hardware-dependent demonstrations, not general performance guarantees.

## Limitations

- Binary variables and rapidly growing type spaces restrict practical model complexity; the method assumes a supplied causal structure rather than learning it.
- Uniform parameter priors need not imply neutral priors on causal estimands. Nonidentified quantities can remain sensitive to priors even with extensive data.
- Priors are independent across parameter families, limiting correlated prior beliefs.
- Independently sampled units are assumed; hierarchical structures and clustering are not inherently supported.
- Posterior computation can fail: a mediation example with an unobserved mediator reports a largest R-hat of 1.53 and low effective sample sizes.
- Nonlinear queries such as risk ratios require combining simpler queries in the described implementation.

The supplied manuscript does not establish its publication year or a stable paper identifier; these are left unspecified. Parsed code contains transcription artifacts, so this page summarizes the method rather than reproducing those blocks as executable examples.

## Related Concepts

- [[concepts/causal-response-types|Causal Response Types]] — the discrete representation underlying likelihood construction and counterfactual evaluation.
- [[concepts/conditional-causal-discovery|Conditional Causal Discovery]] — a distinct task involving uncertainty over graphs and conditioning on causal effects; CausalQueries instead takes the graph as supplied.

## Related Papers

- Chickering and Pearl (1996), “A Clinician’s Tool for Analyzing Non-Compliance”: the motivating replication and Bayesian causal-query precedent.
- Frangakis and Rubin (2002), “Principal Stratification in Causal Inference”: strata defined by potential responses provide the connection to compliance-type analysis.
- Humphreys and Jacobs (2023), *Integrated Inferences*: the framework underlying the package.
- Duarte et al. (2023), “An Automated Approach to Causal Inference in Discrete Settings”: related discrete causal parameterization used for bounds, rather than posterior distributions.
