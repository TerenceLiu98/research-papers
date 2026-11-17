---
title: Large language models as uncertainty-calibrated optimizers for experimental discovery
type: paper
authors:
  - Bojana Ranković
  - Ryan-Rhys Griffiths
  - Philippe Schwaller
year: 2026
doi: 10.1038/s42256-026-01283-z
tags:
  - bayesian-optimization
  - scientific-discovery
  - representation-learning
---

## TL;DR

GOLLuM jointly adapts a language encoder and a Gaussian process through GP marginal likelihood, learning representations suited to experimental optimization. Across 23 computational chemistry and materials benchmarks, its main T5 variant achieves 36.3% top-5% coverage versus 29.7% for domain-feature GP optimization and matches that baseline’s final performance with a median 41% fewer iterations.

## Research Question

Can a general-purpose language model learn outcome-relevant representations from small experimental datasets while supplying a probabilistic surrogate suitable for sequential optimization?

## Motivation

Scientific optimization depends on representations that make nearby candidates have similar outcomes. Specialized chemical descriptors require domain choices, while fixed language embeddings can encode textual similarity poorly aligned with experimental performance. Directly prompted optimizers also produce duplicate, invalid, or unusable suggestions.

## Contributions

- Couples language representation adaptation to GP marginal likelihood rather than supervised regression followed by post hoc uncertainty estimation.
- Compares projection-only, encoder-adaptation, and combined variants across 23 tasks using fixed hyperparameters.
- Relates optimization performance to representation geometry: learned GP lengthscale divided by average embedding distance correlates with optimization success across 14 representations (reported correlation 0.92).
- Shows outcome-aligned chemical groupings emerging during adaptation, including separation of high-yield iodide and lower-yield chloride conditions in the Buchwald–Hartwig benchmark.

## Method

Experimental parameters are rendered into standardized text templates; molecular tasks can use SMILES directly. A language encoder maps descriptions into vectors. A Matérn-5/2 GP models outcomes and supplies the posterior used for acquisition-based selection.

The method applies [[concepts/deep-kernel-learning|Deep Kernel Learning]]: the covariance is evaluated on a learned transformation, and its parameters are optimized jointly with GP hyperparameters through log marginal likelihood. The variants are PLLM (linear projection with ELU on frozen embeddings), LLMϕ (LoRA encoder adaptation), and PLLMϕ (both). Separate learning rates are used for representation and GP parameters. The main cross-domain configuration is PLLMϕ with T5.

The authors interpret the resulting geometry as implicit contrastive learning: outcome-similar experiments become closer without an explicit contrastive loss. This is an interpretation of the learned representations, rather than an independent guarantee of calibration or chemical causality.

## Experiments

All experiments are computational evaluations of existing datasets. The suite includes 12 organic chemistry, three analytic/process chemistry, three materials/catalysis, and five molecular-property tasks. Runs start from ten randomly selected below-median outcomes and perform 50 sequential experimental iterations. Main optimization comparisons use 20 seeds; direct-prompting comparisons use ten seeds per Buchwald–Hartwig product.

Top-5% coverage measures discovery of the design space’s highest-performing 5% of conditions, as clarified by Figure 3. The article’s general metric description is less precise; coverage should not be read simply as the fraction of acquired trials that are successful.

| Comparison | Reported result |
| --- | --- |
| Across 23 tasks | GOLLuM 36.3%; domain-feature GP 29.7%; BoChemian 26.5%; LAPEFT 12.1% coverage |
| Process chemistry | 25.4% versus GP 13.4% coverage, approximately 90% relative improvement |
| Buchwald–Hartwig | Adapted T5 43%; static T5 24%; DRFP 38% coverage |
| Sample efficiency | Median 41% fewer iterations to match traditional GP’s final performance |

The Buchwald–Hartwig space contains 3,955 reactions across five products. Static language embeddings obtain approximately 15–26% coverage. Direct prompting exhibits roughly 10–80% failure rates across tested models, with invalid conditions, duplicates, unparsable outputs, and timeouts among the reported response categories. Improvements are smaller where specialized molecular fingerprints already provide strong representations.

## Limitations

Exact GPs scale cubically in observation count, limiting larger campaigns. Text interfaces may lose useful structure for protein conformations or crystal geometries. The evaluation establishes retrospective computational performance, not prospective laboratory safety or success. Visualization of chemically meaningful clusters supports interpretability but does not establish causal mechanisms. The supplied main text does not provide enough calibration measurements to independently assess every claim of calibrated uncertainty.

## Related Concepts

- [[concepts/deep-kernel-learning|Deep Kernel Learning]] supplies the joint representation–kernel training mechanism.
- [[concepts/gaussian-process-regression|Gaussian Process Regression]] supplies the probabilistic outcome surrogate.
- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]] provides the broader sequential decision framework; this paper targets optimization rather than general parameter information gain.

## Related Papers

- Ranković and Schwaller (2023), “BoChemian: large language model embeddings for Bayesian optimization of chemical reactions”: the fixed-embedding precursor compared here.
- Wilson et al. (2016), “Deep kernel learning”: the foundational learned-feature GP framework cited by this paper.
- Kristiadi et al. (2024), “A sober look at LLMs for material discovery: are they actually good for Bayesian optimization over molecules?”: related evaluation of language-based molecular optimization, cited in the source.

Source: [published article](https://doi.org/10.1038/s42256-026-01283-z). The paper provides [code and datasets](https://github.com/schwallergroup/gollum) and a [Zenodo code archive](https://doi.org/10.5281/zenodo.20625386).
