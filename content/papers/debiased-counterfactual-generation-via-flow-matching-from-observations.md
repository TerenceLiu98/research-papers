---
title: Debiased Counterfactual Generation via Flow Matching from Observations
type: paper
authors:
  - Hugh Dance
  - Peter Orbanz
  - Johnny Xi
  - Benjamin Bloem-Reddy
year: null
tags:
  - counterfactual-generation
  - flow-matching
  - causal-inference
  - semiparametric-efficiency
  - optimal-transport
---

## TL;DR

DECFM estimates a counterfactual outcome distribution by transporting the observed outcome distribution within a treatment arm instead of generating from a fixed noise law. Under positivity, the source and target share support and tail class; under mild confounding they can also be statistically close. A new efficient-influence-function correction gives a doubly robust flow-matching estimator, while an entropic-optimal-transport extension seeks straighter, lower-energy paths. The reported experiments favor this observational source on difficult outcome geometries and image rebalancing tasks.

## Research Question

Can a counterfactual outcome distribution be estimated more accurately by learning a [[concepts/deconfounding-flows|Deconfounding Flow]] from the observed treatment-arm distribution, while retaining the robustness and efficiency guarantees of semiparametric counterfactual estimators?

## Motivation

Existing debiased generative estimators generally treat the counterfactual distribution as an unstructured target generated from a conventional base law. Yet the observed conditional distribution $P_{Y\mid A=a}$ and counterfactual distribution $P_{Y(a)}$ are mixtures of the same conditional outcome laws $P_{Y\mid X=x,A=a}$; only their covariate mixing distributions differ. Starting from observed outcomes can therefore preserve support, tails, modes, and confounder-invariant semantic content that a Gaussian source must learn from scratch.

## Contributions

- Shows that, under positivity, $P_{Y\mid A=a}$ and $P_{Y(a)}$ have identical support and tail class.
- Bounds their total-variation distance by the product of covariate shift and variation of the conditional outcome mechanism, and bounds the displacement of their Brenier map under a Wasserstein-Lipschitz condition.
- Shows that features whose conditional distribution is invariant to the confounder have the same distribution under the observational source and counterfactual target.
- Derives a flow-matching moment equation whose dependence on the empirical source distribution requires a new efficient influence function, then establishes double robustness and semiparametric efficiency.
- Extends the estimator with minibatch entropic [[concepts/optimal-transport|Optimal Transport]] to target lower-energy flows in high-dimensional settings.

## Method

For treatment arm $a$, the method learns a time-dependent velocity field whose ODE transports

$$
P_{Y\mid A=a}\longrightarrow P_{Y(a)}.
$$

With independently coupled endpoints, a source sample $Y_0\sim P_{Y\mid A=a}$ is interpolated with a target sample $Y_1\sim P_{Y(a)}$. Because $Y_1$ is counterfactual and unavailable directly, the population flow-matching score is expressed through the identified conditional outcome distribution and estimated with an augmented inverse-propensity moment.

The paper's efficient influence function contains two corrections: one for the counterfactual target law and another for the observational source law that appears inside the model objective. Cross-fitted nuisance estimates of the propensity score and conditional outcome distribution yield a one-step estimator. Its leading remainder is a product of nuisance errors, giving double robustness; under stated rate and regularity conditions, the estimator reaches the semiparametric efficiency bound.

For high-dimensional outcomes, the independent endpoint coupling may induce curved paths through averages of incompatible velocities. DECFM-EOT instead estimates a minibatch entropic-OT coupling between the empirical observational source and a plug-in counterfactual target, optionally tilted toward doubly robust moment estimates. This produces simpler paths empirically, but estimation error in the learned coupling is not covered by the fixed-coupling first-order correction.

## Experiments

**Outcome geometry ablation.** On 1,000-sample synthetic designs, using $P_{Y\mid A=a}$ rather than a Gaussian source gives comparable Wasserstein-1 error for a Gaussian target (0.15 versus 0.13), but lower error for inverse-Gamma outcomes (0.71 versus 1.04) and disconnected mixtures of uniforms (0.04 versus 0.08). Results average 50 trials.

**Causal benchmarks.** On semi-synthetic ACIC 2019, 401(k), and TWINS designs and ten ACIC 2016 challenge datasets, DecFM has the lowest or tied-lowest mean Wasserstein-1 error among KDE, targeted score estimation, influence-function, doubly robust kernel, and DoubleGen baselines. Its reported errors are 0.05, 0.04, 0.25, and 0.35, respectively; DoubleGen matches 0.05 on the Gaussian ACIC design but is worse on the other three. Synthetic-design results use ten seeds, while ACIC 2016 averages ten challenge datasets.

**ColorMNIST.** The experiment confounds digit identity (1 or 6) with foreground color in 20,000 images. Across confounding strengths and U-Net widths, both independent and entropic-OT deconfounding flows improve sliced-Wasserstein error over Gaussian-base flow matching. The EOT variant performs best overall and changes color while preserving digit structure.

**CelebA.** A roughly 20,000-image sample induces an association between sex and hair color, then targets each sex under the population hair-color distribution. Relative to the already favorable observational source, applying DECFM reduces sliced-Wasserstein-2 distance by roughly 40-50%. DECFM-EOT gives the best reported results, with trajectories primarily editing hair color while retaining other image content.

## Limitations

- Causal interpretation requires consistency, no unobserved confounding, and [[concepts/causal-overlap|Causal Overlap]]; generative rebalancing without a causal interpretation still depends on the chosen nuisance attributes and conditional law.
- The method relies on sufficiently accurate propensity and conditional-outcome nuisance estimates. Weak overlap can destabilize estimation and can also make the source-to-target transport difficult.
- Shared support and tails do not guarantee an easy transport when the outcome mechanism varies strongly with covariates.
- The EOT coupling is estimated from data, but its error is not debiased by the efficient influence function derived for a fixed coupling.
- Image results cover controlled ColorMNIST and one CelebA attribute-rebalancing construction; they do not establish general fairness or safe deployment.
- The supplied manuscript does not state a publication year, venue, DOI, or stable paper identifier.

## Related Concepts

- [[concepts/deconfounding-flows|Deconfounding Flows]] use observed treatment-arm outcomes as the source distribution for counterfactual generation.
- [[concepts/flow-matching|Flow Matching]] supplies the velocity-regression objective and ODE transport model.
- [[concepts/optimal-transport|Optimal Transport]] supplies the Brenier-map analysis and the minibatch entropic coupling used to shorten paths.
- [[concepts/causal-overlap|Causal Overlap]] supports identification and implies the shared-support and shared-tail result.

## Related Papers

Works cited in the source, without matching Paper pages found in this library:

- Kennedy et al. (2023), "Semiparametric doubly robust targeted double machine learning: A review": background for efficient influence-function estimation.
- Melnychuk et al. (2023), "Causal normalizing flows: from theory to practice": a flow-based counterfactual distribution estimator using a conventional generative source.
- Martinez-Taboada and Kennedy (2024), "An efficient doubly-robust test for the kernel treatment effect": related debiased distributional estimation.
- Luedtke and Fukumizu (2025), "DoubleGen: Debiased generative modeling of counterfactuals": the closest debiased flow-matching baseline in the experiments.
- Tong et al. (2023), "Improving and generalizing flow-based generative models with minibatch optimal transport": basis for minibatch OT coupling.

Library connections:

- [[papers/flow-matching-for-scalable-simulation-based-inference|Flow Matching for Scalable Simulation-Based Inference]] uses flow matching for amortized conditional distribution estimation, but does not target confounding correction.
- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]] uses transport to stabilize causal estimation under limited overlap, whereas DECFM transports outcome distributions to construct a generative counterfactual law.
- [[papers/a-primer-on-optimal-transport-for-causal-inference-with-observational-data|A Primer on Optimal Transport for Causal Inference with Observational Data]] surveys transport formulations for causal adjustment.

[[index|Library home]]
