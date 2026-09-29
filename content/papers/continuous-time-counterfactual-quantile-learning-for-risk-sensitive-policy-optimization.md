---
title: Continuous-Time Counterfactual Quantile Learning for Risk-Sensitive Policy Optimization
type: paper
authors:
  - Yi He
  - Anpeng Wu
  - Ruoxuan Xiong
  - Yingrong Wang
  - Kun Kuang
year: 2026
doi: 10.1145/3770854.3780271
venue: KDD 2026
tags:
  - causal-inference
  - continuous-time-modeling
  - counterfactual-quantiles
  - risk-sensitive-policy-optimization
---

## TL;DR

CT-CQL learns continuous-time counterfactual outcome distributions using stochastic differential equations (SDEs), adversarial Fokker-Planck residual training, and an augmented inverse probability weighting (AIPW) correction. Simulated trajectories support quantile-constrained policy search. The paper reports improved prediction and treatment-effect errors on most simulated benchmark comparisons and an offline MIMIC-III blood-pressure analysis. Identification depends on observed-history adjustment and model assumptions; the clinical analysis does not establish the effects of deploying the proposed policy.

## Research Question

Can a model estimate the evolving distribution of outcomes under alternative treatment policies, then use its upper quantiles to choose interventions subject to dosage, duration, and safety constraints?

## Motivation

An average outcome can conceal adverse tails, and decisions based on isolated time points can miss intervening dynamics. The paper combines longitudinal causal adjustment with distributional modeling so that policy selection can respond to predicted risk as well as expected utility.

## Contributions

- Formulates continuous-time counterfactual distribution and quantile estimation for constrained policy learning.
- States identification results under consistency, positivity, sequential ignorability, and SDE specification and regularity assumptions.
- Introduces Minimax-FPE training with a generator, neural drift, differentiable critic, propensity model, and auxiliary losses.
- Evaluates simulated causal prediction, component ablations, temporal subsampling, and offline ICU forecasting and alert metrics.

## Method

### Dynamics and Identification

Observed histories contain outcomes, treatments, and time-varying covariates. A policy maps the history before the current treatment to an action. The model represents outcome dynamics by

$$
dY_t=\mu_\theta(t,H_t)\,dt+\sigma_\theta(t,H_t)\,dW_t.
$$

For the scalar Markov formulation, the associated density evolves according to

$$
\partial_t p=-\partial_y(\mu p)+\tfrac12\partial_y^2(\sigma^2p).
$$

Section 3 assumes consistency, treatment overlap, sequential ignorability given observed history, and correctly specified regular stochastic dynamics with nondegenerate diffusion. Its identification argument uses a Markov representation, with longer histories proposed as augmented states. Appendix B gives a discrete-observation-time recursion for the counterfactual CDF and a sketch of longitudinal AIPW identification.

### Minimax-FPE Training

Section 4.3 specializes to neural drift and constant diffusion. Training minimizes density-dynamics mismatch under worst-case structured drift perturbations. A generator produces trajectories, DriftNet parameterizes the drift, and a discriminator supplies an automatic-differentiation surrogate for the Fokker-Planck residual. PropensityNet estimates treatment assignment from observed history. The total objective combines residual, initial-condition, AIPW correction, treatment-consistency, and parameter-regularization losses, with alternating discriminator maximization and generator/drift minimization.

The paper attributes double robustness to the outcome/propensity correction. Proposition 1 states a quantile-error bound proportional to the FPE error plus the square root of the DR error. Appendix B.3 additionally requires positive density near the target quantile for inverse-CDF stability. These are conditional theoretical claims, not empirical certificates for each learned policy.

### Counterfactual Policy Search

Euler-Maruyama simulation under a candidate policy yields samples of the outcome at each time. Sample means estimate policy contrasts; empirical quantiles support a constraint such as

$$
q_{0.95}(Y_t(\pi))\leq Y_{\mathrm{safe}}.
$$

Bayesian optimization searches parameterized policies, scores estimated utility, and rejects or penalizes candidates violating dosage, intervention-duration, or quantile constraints. Continuous-time modeling still uses discrete observations and numerical rollout. The paper also describes a binary-treatment adaptation using action probabilities.

## Experiments

### Data and Protocol

- **Synthetic continuous treatment:** 60-step trajectories, six time-varying covariates, and 10,000/1,000/3,000 train/validation/test trajectories.
- **Tumor growth:** 60-step simulated trajectories with chemotherapy and radiotherapy indicators, three covariates, and the same split sizes. Appendix D.2 emphasizes an unconfounded treatment setting to isolate modeling effects.
- **MIMIC-III:** 100-step ICU trajectories, 25 time-varying and three static covariates, two binary treatment indicators, and 4,293/920/920 train/validation/test samples. Appendix D.3 identifies the target as diastolic blood pressure.

Baselines are RMSN, CRN, ACTIN, and RR-DR. Main experiments report mean and standard deviation over 10 replications; the separate tumor ablation uses 20 runs and patient-weighted summaries.

### Reported Results

Selected CT-CQL entries from Tables 1 and 2; smaller errors are better:

| Dataset and horizon | RMSE | ATE error | Root PEHE |
| --- | --- | --- | --- |
| Synthetic, one step | 2.28 +/- 0.16 | 0.47 +/- 0.03 | 0.58 +/- 0.09 |
| Synthetic, five steps | 2.78 +/- 0.28 | 1.09 +/- 0.13 | 1.74 +/- 0.23 |
| Synthetic, full horizon | 3.20 +/- 0.49 | 2.35 +/- 0.25 | 3.97 +/- 0.30 |
| Tumor, one step | 0.64 +/- 0.04 | 0.06 +/- 0.01 | 0.32 +/- 0.08 |
| Tumor, five steps | 0.62 +/- 0.04 | 0.06 +/- 0.02 | 0.34 +/- 0.08 |

CT-CQL has the lowest reported mean in these comparisons except synthetic five-step root PEHE: RMSN reports **1.03 +/- 0.66**, below CT-CQL's **1.74 +/- 0.23**. This contradicts Section 5.2's blanket statement that CT-CQL wins every metric and horizon.

Table 4's full-horizon tumor RMSE is **1.045 +/- 0.08**, compared with **1.269 +/- 0.12** without minimax training, **1.140 +/- 0.09** without AIPW, and **1.292 +/- 0.17** for a fixed-grid discrete-time variant. Removing AIPW also increases full-horizon ATE error from **0.0753** to **0.098** and root PEHE from **0.370** to **0.487**.

The representative synthetic policy example reports KL divergence **0.003** and a simulator-ground-truth trajectory that remains largely within the designated safe range after optimization. This is an illustrative trajectory, not an aggregate policy-benefit estimate.

For MIMIC-III, Section 5.4 reports an anticipated-event fraction of **46% +/- 2%**, extra interventions during no-event periods of **4% +/- 0%**, and nominal 90% prediction-interval coverage of **93.06% +/- 5.30%**. Test RMSE is **0.522 +/- 0.020** across 10 runs on 920 patients. Appendix E.2 reports worse RMSE with coarser observations: **0.610 +/- 0.038** at twice the interval and **0.772 +/- 0.067** at four times the interval.

## Limitations

- **Causal assumptions:** Sequential ignorability requires adequate observed confounder adjustment. The text's references to robustness against latent confounding should not be interpreted as identification under arbitrary unmeasured confounding. Neither AIPW nor a training penalty establishes this assumption from data.
- **Theory-to-implementation gap:** Appendix B gives compressed proof sketches. The main text's pointwise correction, implementation loss, and appendix's longitudinal weighting are different expressions; the supplied derivation does not fully reconcile them. Proposition 1 references Assumptions 1-5, but only four numbered assumptions appear. Its CDF-error control is asserted before applying quantile stability.
- **Optimization and safety:** The minimax existence lemma requires convex-concave structure that is not established for the neural implementation. Constraints evaluated on estimated distributions and finite rollouts do not by themselves certify continuous-time or clinical safety.
- **Evidence scope:** Counterfactual ground truth is available in simulation, while MIMIC-III provides offline forecasting and alert evidence. The unconfounded tumor setup limits what its AIPW ablation establishes about confounding correction. Baselines chiefly target mean outcomes; the study does not establish superiority over every distributional causal approach.
- **Source fidelity:** The supplied Markdown contains corrupted symbols and incomplete cross-references. Authors are ordered here according to its ACM reference block, which differs from the extracted affiliation-block order. Numerical summaries follow the tables where prose disagrees.

## Related Concepts

- [[concepts/counterfactual-quantile-learning|Counterfactual Quantile Learning]]: estimating policy-specific outcome tails for decision-making.
- [[concepts/double-machine-learning|Double Machine Learning]]: related use of outcome and propensity nuisance models; CT-CQL's DR loss does not itself establish the cross-fitting and inference conditions of DML.
- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: related distribution-aware decision-making, with return distributions as a different target from time-specific potential outcomes.

## Related Papers

- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: a thematic library connection using distributional counterfactuals for testing under a two-period design, rather than continuous-time policy optimization; not a claimed citation in CT-CQL.
- [[papers/value-flows|Value Flows]]: a thematic connection through generative distribution modeling and risk-sensitive decisions, using reinforcement-learning returns rather than longitudinal causal outcome distributions; not a claimed citation in CT-CQL.
- Bang and Robins (2005), "Doubly robust estimation in missing data and causal inference models": the DR foundation cited as reference 4.

Source: [DOI](https://doi.org/10.1145/3770854.3780271). The paper lists [project code](https://github.com/Eliza-YiHe/CT-CQL/).

[[index|Library home]]
