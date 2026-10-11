---
title: Multidimensional Bayesian IRT Model for Hierarchical Latent Structures
type: paper
authors:
  - Juliane Venturelli S. L.
  - Flavio B. Goncalves
  - Dalton F. Andrade
year: null
source_job_id: "7c3eb021-b053-40fb-9123-8d9e91cf920d"
tags:
  - item-response-theory
  - bayesian-measurement
  - hierarchical-latent-traits
  - educational-assessment
---

## TL;DR

This paper combines hierarchical latent abilities, items that measure multiple abilities, binary responses with pseudo-guessing, and ordered responses in one Bayesian IRT model. A variance constraint gives every latent trait a standard Normal marginal prior, while a blocked MCMC scheme estimates traits and item parameters jointly. Simulations support parameter recovery under the tested structures; an application to 44,000 Enem participants estimates a general ability alongside five domain abilities. These findings do not independently validate the general score for admissions decisions.

## Research Question

How can a Bayesian item response model jointly estimate domain-specific and general abilities on a common scale while allowing multidimensional binary and graded items?

## Motivation

Separate subject tests can measure correlated abilities, and individual questions can require skills from multiple domains. Averaging independently estimated domain scores ignores those relationships and can combine incompatible scales. Earlier higher-order models discussed in the paper restrict items to one domain, assume known item parameters, or leave scale and inference issues unresolved. [[concepts/hierarchical-latent-trait-models|Hierarchical Latent Trait Models]] address the relationship between specific and general abilities within [[concepts/item-response-theory|Item Response Theory]].

## Contributions

- Combines a multilevel latent-trait hierarchy with genuinely multidimensional items and mixed binary/ordered outcomes.
- Specifies residual variances so that every trait has a standard Normal marginal prior, with additional structural restrictions for identification.
- Derives augmented, blocked posterior sampling, including joint trait updates and collapsed updates for ordered-response thresholds.
- Investigates recovery, hierarchy misspecification, and a joint analysis of Enem subject tests and essay scores.

## Method

### Hierarchy and Identification

For respondent $j$ and level $k$, the model specifies

$$
\boldsymbol\theta_j^{(k)}=\Lambda^{(k+1)}\boldsymbol\theta_j^{(k+1)}+\boldsymbol\epsilon_j^{(k)}.
$$

Each row of $\Lambda^{(k+1)}$ has one nonzero loading: each lower trait has exactly one parent. Each upper trait must explain at least three traits immediately below it. The top-level traits have standard Normal priors, and a lower trait with loading $\lambda$ has residual variance $1-\lambda^2$. Proposition 1 establishes standard Normal marginal priors at every level. This is a shared prior scale, not equality of posterior variances or substantive interchangeability of the traits.

Only bottom-level traits directly enter item response probabilities. Additional restrictions on the item discrimination matrix address identification; Section 2 gives a triangular zero pattern as one option. The hierarchy and item loading pattern are specified rather than learned through a structure-selection procedure.

### Response Models and Posterior Sampling

Binary items use a three-parameter normal-ogive model,

$$
P(Y_{ij}=1)=c_i+(1-c_i)\Phi(\mathbf a_i^\top\boldsymbol\theta_j^{(1)}-b_i),
$$

where $\mathbf a_i$ may load on several abilities, $b_i$ is a location parameter, and $c_i$ is a pseudo-guessing probability. Graded items use differences between Normal cumulative probabilities at ordered thresholds. Responses are conditionally independent given the modeled traits and parameters.

Binary guessing indicators and latent Normal variables support Gibbs updates. Conditional independence across respondents and a recursive factorization across levels allow joint draws of each respondent's entire trait vector. Hierarchical loadings require Metropolis-Hastings steps. For graded thresholds, integrating out augmented responses avoids narrow conditional intervals; separate proposals move the threshold vector's location and its positive spacings (Section 3 and Appendix B).

## Experiments

### Simulations

Simulations 1-3 use four first-level traits, one general trait, 45 binary items per domain, and no guessing. Sample sizes are 500, 2,000, and 5,000. With true loadings $(0.95,0.90,0.85,0.80)$, posterior means at 500 respondents are $(0.957,0.905,0.852,0.836)$; at 5,000 they are $(0.949,0.900,0.853,0.794)$ (Table 1). Reported posterior uncertainty generally decreases with sample size.

Simulations 4-7 use 5,000 respondents and fix item parameters at their true values to isolate trait estimation. Under hierarchical data, fitting independent subtests and averaging estimated domain abilities gives general-trait RMSE 0.313, versus 0.271 for the correctly specified hierarchical analysis (Table 2). Fits to independent subtests yield loadings near zero, while a unidimensional generating model yields loadings near one (Table 3). These examples support recovery of limiting structures, not a general calibrated hypothesis test.

Simulation 8 uses 10,000 respondents, five domain traits, 180 binary items, and five graded items, with selected cross-loadings and binary pseudo-guessing. Table 4 reports loading posterior means $(0.951,0.897,0.850,0.800,0.742)$. The text reports good trait and item recovery overall but only middling recovery of some guessing parameters. Its fifth true loading is inconsistent: the prose gives 0.80, whereas Table 4 gives 0.75.

### Enem 2017

The application samples 44,000 students who selected English as their foreign language, completed all five exams, and were not disqualified. The initial assessment has 180 binary questions and five essay components. The authors select cross-loading items subjectively from textual and mathematical complexity and remove nine items after a pilot fit estimates negative discrimination.

| Domain | General-factor loading, posterior mean | 95% credible interval |
| --- | ---: | --- |
| Humanities | 0.980 | [0.979, 0.982] |
| Natural Sciences | 0.964 | [0.962, 0.967] |
| Language | 0.936 | [0.934, 0.939] |
| Mathematics | 0.892 | [0.886, 0.896] |
| Essay | 0.686 | [0.680, 0.692] |

Table 6 indicates strong but unequal associations with the general factor. Natural Sciences item 86 has estimated discrimination 0.65 on Natural Sciences and 1.07 on Mathematics (Table 7), illustrating the selected cross-loading structure. Table 8 reports correlations among posterior trait means of 0.92-0.99 across the four binary-test domains and 0.69-0.73 between those domains and Essay. These are fitted-score correlations, not separate estimates of population latent correlations or external validity.

## Limitations

- The hierarchy is restricted to one parent per lower trait and at least three children per upper trait. Multiple-parent structures are proposed as future work; the examples use two levels.
- Simulations 4-7 fix item parameters, so their RMSE comparison excludes uncertainty from item calibration. Guessing parameters are less reliably recovered in the mixed-item experiment.
- The Enem analysis uses a selected sample, subjective cross-loadings, and pilot-based exclusions. It does not report held-out predictive comparisons, external criterion validity, or downstream admissions outcomes.
- Claims of computational efficiency are supported by the sampling construction and recovery examples, but the supplied text does not give a runtime benchmark or detailed numerical convergence diagnostics.
- The supplied source specifies Uniform(-1,1) loading priors in Section 2 but positive-only support in Appendix B, equation (25). Several appendix equations also contain apparent transcription or notation defects. The algorithm should not be implemented from those expressions without checking them. Simulation 8's fifth loading differs between prose and table as noted above.
- The supplied Markdown has no publication year, venue, DOI, or arXiv identifier. The year is left null, and author names are transcribed from its byline without expanding uncertain initials.

## Related Concepts

- [[concepts/hierarchical-latent-trait-models|Hierarchical Latent Trait Models]]: relates domain abilities to general factors while controlling latent scales.
- [[concepts/item-response-theory|Item Response Theory]]: connects response probabilities to respondent traits and item characteristics.

## Related Papers

- Sheng and Wikle (2008), "Bayesian multidimensional IRT models with a hierarchical structure": prior hierarchical Bayesian modeling discussed in the introduction.
- de la Torre and Song (2009), "Simultaneous estimation of overall and domain abilities: A higher-order IRT model approach": joint domain and general abilities with known item parameters, as characterized by this paper.
- Huang et al. (2013), "Higher-order item response models for hierarchical latent traits": extends the hierarchy beyond two levels and estimates item parameters.
- Mun et al. (2019), "Multivariate higher-order IRT model and MCMC algorithm for linking individual participant data from multiple studies": related multiple-study model with more than one higher-order trait.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: a library comparison on scalable approximate inference and flexible response functions; not a citation in the supplied manuscript.

[[index|Library home]]
