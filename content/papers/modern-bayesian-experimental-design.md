---
title: Modern Bayesian Experimental Design
type: paper
authors:
  - Tom Rainforth
  - Adam Foster
  - Desi R Ivanova
  - Freddie Bickford Smith
year: null
source_job_id: 00aadd2e-6d86-4f46-bd9f-f193e300e8d6
tags:
  - bayesian-experimental-design
  - adaptive-design
  - expected-information-gain
  - simulation-based-methods
  - active-learning
---

## TL;DR

This review organizes modern [[concepts/bayesian-experimental-design|Bayesian Experimental Design]] around expected information gain and the computational methods needed to estimate and optimize it. Debiased Monte Carlo, variational bounds, stochastic gradients, and likelihood-free methods broaden the problems that can be addressed. For sequential experiments, learned design policies can amortize computation, act nearly instantly at deployment, and optimize information across the full experimental horizon. These gains remain conditional on the adequacy of the underlying model, and robust behavior under misspecification is unresolved.

## Research Question

How have recent computational methods changed the practical scope of Bayesian experimental design, particularly for sequential, adaptive, and likelihood-free experiments, and which limitations remain most important?

## Motivation

Experimental design determines what data become available for scientific inference, yet optimizing acquisition has historically received less attention than analyzing already collected data. Bayesian experimental design (BED) offers a unified model-based framework for selecting informative experiments, but expected information gain is usually difficult both to estimate and to optimize. Sequential settings compound this cost because inference and design optimization may need to be repeated after every observation.

## Contributions

- Presents expected information gain (EIG) as the central information-theoretic objective for BED and relates it to mutual information, posterior-to-prior KL divergence, and expected predictive uncertainty reduction.
- Explains why nested estimation creates bias and unfavorable computational scaling, then surveys multilevel debiasing, functional approximation, variational bounds, and stochastic-gradient optimization.
- Covers implicit likelihood models, for which simulation is possible even when likelihood density evaluation is not.
- Recasts Bayesian adaptive design as policy learning and highlights deep adaptive design (DAD), which moves expensive computation before deployment and can optimize non-myopically over an experimental sequence.
- Identifies open problems in scaling, discrete designs, connections to active learning and reinforcement learning, model misspecification, downstream analysis, and model construction.

## Method

**Information-theoretic formulation.** A design $\xi$ controls an outcome $y$ generated under a model $p(y\mid\theta,\xi)$ and prior $p(\theta)$. The principal objective is

$$
\operatorname{EIG}_\theta(\xi)
=\mathbb E_{p(\theta)p(y\mid\theta,\xi)}
\left[\log p(y\mid\theta,\xi)-\log p(y\mid\xi)\right],
$$

which is the mutual information between $\theta$ and $y$ conditional on the design. The target $\theta$ need not be a model parameter; it may be a prediction, optimum, or another quantity of interest. More general posterior-dependent utilities also fit within BED, although the review concentrates on EIG (Section 2.1).

**Adaptive design.** In Bayesian adaptive design, the posterior and predictive model are updated from the history $h_{t-1}$ before selecting $\xi_t$. Traditional methods greedily maximize the next-step incremental EIG. Their repeated inference and optimization are expensive, and greediness ignores how a present design changes future information opportunities (Sections 2.2 and 4).

**Estimating EIG.** The marginal likelihood $p(y\mid\xi)$ or posterior $p(\theta\mid y,\xi)$ is generally intractable inside an outer expectation. Nested Monte Carlo is consistent as both sample counts increase, but it is biased at finite inner sample size and typically cannot improve beyond mean-squared-error order $C^{-2/3}$ in total cost. Multilevel Monte Carlo can instead produce unbiased finite-variance estimators and recover the conventional $C^{-1/2}$ Monte Carlo rate under stated assumptions, at potentially substantial per-sample cost (Sections 3.1-3.2).

**Functional and variational approximation.** Learned approximations to the marginal likelihood or posterior share information across simulated outcomes, making approximation and subsequent Monte Carlo costs additive rather than multiplicative. Several objectives give upper or lower bounds on EIG; posterior approximations can also serve as importance proposals. Density-ratio estimation and mutual-information bounds extend these ideas to implicit likelihoods. Bound tightness and the chosen approximation family remain consequential (Section 3.3).

**Optimization and policies.** Black-box optimization repeatedly estimates EIG and can scale poorly. Differentiable models permit stochastic-gradient optimization, using variational lower bounds or unbiased gradient estimates. DAD instead trains a policy $\pi_\phi(h_{t-1})$ to maximize total EIG across all $T$ steps. Once trained, it maps the observed history directly to the next design, avoiding online posterior inference; implicit DAD extends this scheme to likelihood-free models (Sections 3.4 and 4).

## Experiments

This is a methodological review rather than a new empirical benchmark. Its empirical claims synthesize results from the cited literature:

- Debiased multilevel estimators have theoretical and reported practical advantages over ordinary nested Monte Carlo, but may retain high per-sample costs and had not been empirically compared with variational gradient methods in the literature reviewed (Sections 3.2 and 3.4.1).
- Variational and functional methods support explicit and implicit models and can combine estimation with design optimization; their accuracy depends on learned approximations and objective tightness (Sections 3.3-3.4).
- Policy-based adaptive methods, including DAD and reinforcement-learning variants, are reported to improve deployment speed and design quality over traditional greedy strategies. The review attributes these results to amortized online computation, non-myopic objectives, and avoidance of repeated approximate inference (Section 4).
- The cited applications span psychology, clinical trials, physics, bioinformatics, neuroscience, engineering, drug discovery, active learning, and Bayesian optimization. The review does not aggregate them into a common quantitative comparison (Sections 1 and 5.2).

## Limitations

- BED is only as reliable as the model used to simulate outcomes. Bayesian uncertainty within a model does not represent uncertainty that the model itself is wrong; adaptive designs can repeatedly query a narrow region and produce poor datasets under misspecification.
- Current policy methods can still struggle with high-dimensional or nonsmooth models and design spaces, discrete decisions, and long experimental horizons.
- Variational methods can inherit approximation-family and optimization error, while unbiased multilevel estimators can be costly and variable. The review reports no comprehensive head-to-head evaluation across these estimator families.
- Data optimized for one Bayesian model or target may be unsuitable for model checking, model selection, non-Bayesian learning, or other downstream analyses.
- The literature spans multiple disciplines and uses heterogeneous problems and evaluation protocols, limiting direct comparisons between methods.
- The supplied Markdown does not provide a publication year, DOI, arXiv identifier, or venue metadata, so no such identifier is asserted here.

## Related Concepts

- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]] formalizes model-based data acquisition through posterior-dependent expected utility, most commonly EIG.
- [[concepts/neural-simulation-based-inference|Neural Simulation-Based Inference]] provides related likelihood-free posterior and density-ratio approximations for simulator-based models.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]] shares inference computation across observations; DAD similarly amortizes sequential design computation across experimental histories.
- [[concepts/density-ratio-estimation|Density Ratio Estimation]] can estimate the likelihood-to-evidence ratio needed by EIG objectives with implicit likelihoods.

## Related Papers

Works cited in the review, without matching Paper pages found in this library:

- Chaloner and Verdinelli (1995), "Bayesian experimental design: a review": an earlier review of the field.
- Foster et al. (2019), "Variational Bayesian optimal experimental design": variational objectives for scalable design.
- Foster et al. (2020), "A unified stochastic gradient approach to designing Bayesian-optimal experiments": joint stochastic optimization of variational and design parameters.
- Foster et al. (2021), "Deep adaptive design: amortizing sequential Bayesian experimental design": history-to-design policies trained against total information gain.
- Ivanova et al. (2021), "Implicit deep adaptive design: policy-based experimental design without likelihoods": policy learning for implicit likelihood models.
- Goda et al. (2022), "Unbiased MLMC stochastic gradient-based optimization of Bayesian experimental designs": unbiased EIG and gradient estimation using multilevel Monte Carlo.

[[index|Library home]]
