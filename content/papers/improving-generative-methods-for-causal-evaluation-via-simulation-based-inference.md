---
title: Improving Generative Methods for Causal Evaluation via Simulation-Based Inference
type: paper
authors:
  - Pracheta Amaranath Pboddavarama
  - Vinitra Muralikrisnan
  - Amit Sharma
  - David Jensen
year: null
tags:
  - causal-inference
  - simulation-based-inference
  - synthetic-data
  - causal-estimator-evaluation
  - approximate-bayesian-computation
---

## TL;DR

The paper introduces simulation-based inference for causal evaluation (SBICE), a wrapper around causal data generators that infers a joint posterior over the generator and its data-generating-process parameters. Sequential Monte Carlo approximate Bayesian computation (SMC-ABC) favors configurations whose synthetic datasets resemble a source dataset, yielding more source-consistent causal-estimator evaluations when at least one simulator fits adequately and the source data inform the parameters.

## Research Question

How can researchers choose among causal data generators and uncertain data-generating-process (DGP) parameters without relying on arbitrary fixed settings that may produce synthetic datasets inconsistent with the source data?

## Motivation

Causal estimators cannot usually be cross-validated against observed counterfactual outcomes. Synthetic and semi-synthetic benchmarks address this gap, but their conclusions can depend on the selected generator and on fixed assumptions about treatment effects, confounding, overlap, and effect heterogeneity. The paper shows that Credence, modified Credence, Realcause, and FrugalFlows can produce different distributions and estimator rankings from the same source data, even when given the same average-treatment-effect constraint. Under identification, an incorrect fixed effect must distort the generated observed-data distribution; without identification, multiple causal parameter settings can remain observationally compatible.

## Contributions

- Formalizes why fixed DGP parameter values can conflict with an observed source distribution and why matching a treatment-effect value does not uniquely determine a generated distribution.
- Introduces [[concepts/simulation-based-inference-for-causal-evaluation|Simulation-Based Inference for Causal Evaluation]], which represents uncertainty over both candidate generators and their method-specific parameters.
- Uses likelihood-free Bayesian model selection to down-weight generators and parameter configurations that cannot reproduce the source distribution.
- Proposes bias squared error (BSE), a task-specific posterior predictive check comparing a causal estimator's bias on generated and source datasets.
- Evaluates the framework under simulator misspecification, non-identifiability, prior misspecification, parametric and neural simulators, and synthetic and real-world datasets.

## Method

Let $D=\{X,T,Y\}$ be the source dataset, $G_k$ a candidate generator, and $\theta_k$ its DGP parameters. SBICE targets

$$
p(G_k,\theta_k\mid D) \propto p(D\mid G_k,\theta_k)p(\theta_k\mid G_k)p(G_k).
$$

Each generator is first trained on the source data. SMC-ABC then samples a generator and parameters, generates a synthetic dataset, and retains configurations whose distance from the source falls below a decreasing tolerance. The experiments primarily use sliced Wasserstein distance, with maximum mean discrepancy as an alternative check. Posterior samples generate benchmark datasets on which candidate causal estimators are evaluated. If the source cannot distinguish prior configurations, the posterior remains close to the prior rather than forcing a point choice.

## Experiments

The study first compares four generators on synthetic data, LaLonde RCT and observational samples, and a Postgres systems dataset. Their generated distributions and causal-estimator rankings vary substantially across generator and DGP settings.

SBICE is then evaluated with linear parametric simulators, Frugal parameterizations, FrugalFlows, and Realcause. With well-specified or sufficiently flexible simulators, posterior datasets generally have lower sliced Wasserstein distance and lower mean BSE than prior datasets. On LaLonde, Postgres, and Twins, model selection assigns the final posterior mass to Realcause, the better-fitting candidate in those experiments; posterior BSE falls markedly for most reported estimators. Results using maximum mean discrepancy show similar trends.

The negative results are equally important. Posterior and prior performance can converge when estimators are insensitive to the varied parameter, the source is uninformative, or priors are narrow. Severe functional misspecification can make posterior datasets worse than prior datasets. Some doubly robust estimates contain extreme outliers, and BART or TMLE results are omitted for Twins because their default configurations frequently fail.

## Limitations

- The method depends on having at least one simulator capable of approximating the source distribution; posterior reweighting cannot repair a simulator family with the wrong support or functional structure.
- SMC-ABC is computationally intensive, scales poorly with parameter dimension, and is sensitive to the distance metric and tolerance schedule. The reported experiments use low-dimensional parameter spaces and substantial parallel CPU time.
- Observed data cannot resolve genuinely non-identifiable causal parameters. In such cases SBICE can preserve a set of compatible configurations but cannot recover a unique causal truth.
- Priors that are too narrow or impose an incorrect joint constraint can prevent the posterior from aligning with the source.
- Distributional proximity does not by itself guarantee identical causal-estimator behavior; the paper therefore needs the additional estimator-specific BSE diagnostic.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/simulation-based-inference-for-causal-evaluation|Simulation-Based Inference for Causal Evaluation]]
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]

## Related Papers

- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: addresses instability from limited overlap with transport maps, while SBICE uses distributional distances to select plausible synthetic causal benchmarks.
- Cranmer, Brehmer, and Louppe (2020), "The frontier of simulation-based inference": provides the likelihood-free inference perspective underlying SBICE.
- Parikh et al. (2022), "Validating causal inference methods": introduces Credence, one of the causal generators evaluated and wrapped by SBICE.
- Neal, Huang, and Raghupathi (2020), "RealCause: Realistic causal inference benchmarking": supplies a generator that SBICE selects in the reported real-data comparisons.

[[index|Library home]]
