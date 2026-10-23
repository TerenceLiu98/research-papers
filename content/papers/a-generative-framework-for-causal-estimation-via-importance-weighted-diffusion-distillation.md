---
title: A Generative Framework for Causal Estimation via Importance-Weighted Diffusion Distillation
type: paper
authors:
  - Xinran Song
  - Tianyu Chen
  - Mingyuan Zhou
year: null
source_job_id: "bef80433-0467-4940-a2eb-ca56253fcd0c"
tags:
  - causal-inference
  - diffusion-models
  - importance-weighting
  - knowledge-distillation
  - potential-outcomes
---

## TL;DR

Importance-Weighted Diffusion Distillation (IWDD) first fits a conditional diffusion model to observational outcomes, then distills it into a one-step generator using independently sampled covariates and balanced binary treatments. This [[concepts/implicit-importance-weighting-by-marginal-sampling|marginal-sampling adjustment]] targets the same product-of-marginals objective as ideal inverse-propensity weighting without estimating propensities. On 12 ACIC 2018 datasets, IWDD has the highest reported out-of-sample win rates for both potential-outcome RMSEs and PEHE. However, the manuscript's general claim that marginal sampling always has no greater gradient variance than explicit weighting is not established by its proof and is false without additional conditions.

## Research Question

Can a pretrained conditional diffusion model be distilled into a fast generator for potential outcomes while correcting observational treatment imbalance without explicitly estimating inverse-propensity weights?

## Motivation

Under consistency, conditional unconfoundedness, and [[concepts/causal-overlap|causal overlap]], conditional outcome models can identify mean potential outcomes. Observational treatment assignment nevertheless concentrates training data on some covariate-treatment pairs and leaves others sparse. Explicit inverse-propensity weighting addresses this imbalance but can become unstable when estimated propensities approach zero or one. Iterative diffusion sampling is also expensive. The paper seeks both a balancing mechanism that avoids explicit propensity estimation and a one-pass conditional generator.

## Contributions

- Defines IWDD as a two-stage procedure: observational-data diffusion pretraining followed by score-based distillation into a one-step generator.
- Rewrites an inverse-propensity-weighted divergence under the observed joint law as an unweighted divergence under the product of the observed covariate marginal and a balanced Bernoulli treatment law.
- Implements that target by shuffling sampled covariates and independently drawing treatments during generator updates, while training a fake score network on observational covariate-treatment pairs.
- Compares KL- and Fisher-divergence distillation and reports substantially greater stability for the Fisher/score-identity formulation.
- Evaluates potential-outcome prediction and conditional treatment-effect estimation on a synthetic example, ACIC 2016, ACIC 2018, and IHDP.

## Method

The teacher $f_\phi(y_t;\sigma,x,z)$ is a covariate- and treatment-conditional [[concepts/diffusion-models|diffusion model]] trained with an EDM noise schedule on observed triples $(x,z,y)$. The student is an implicit conditional generator

$$
y_g=G_\theta(x,z,\varepsilon),\qquad \varepsilon\sim\mathcal N(0,I).
$$

For a balanced target treatment law $p_{\mathrm{rct}}(z)=\operatorname{Bernoulli}(0.5)$, the paper defines

$$
w(x,z)=\frac{p_{\mathrm{data}}(x)p_{\mathrm{rct}}(z)}{p_{\mathrm{data}}(x,z)}
=\frac{p_{\mathrm{rct}}(z)}{p_{\mathrm{data}}(z\mid x)}.
$$

The change-of-measure identity gives

$$
\mathbb E_{p_{\mathrm{data}}(x,z)}[w(x,z)D_\theta(x,z)]
=\mathbb E_{p_{\mathrm{data}}(x)p_{\mathrm{rct}}(z)}[D_\theta(x,z)].
$$

IWDD therefore samples covariates from their empirical marginal and treatments independently from a fair Bernoulli distribution instead of estimating $p(z\mid x)$ and multiplying by inverse weights. In each iteration, it shuffles a covariate minibatch, resamples treatment, generates $y_g$, and updates the student against the frozen teacher and a trainable fake score network. The generator uses the randomized pairs; the fake score network uses the original observational pairs. Fisher divergence with score-identity distillation supplies the alternating losses because the manuscript reports that its KL alternative is unstable and can collapse.

At inference, samples from $G_\theta(x,0,\varepsilon)$ and $G_\theta(x,1,\varepsilon)$ approximate the two conditional potential-outcome laws in one forward pass. Conditional means of these samples support CATE estimation. This causal interpretation still depends on consistency, no unmeasured confounding, and overlap.

## Experiments

The synthetic study trains with only 16% treated cases and evaluates under balanced treatment assignment. For out-of-sample $Y(1)$, IWDD reduces reported RMSE from 3.07 for the pretrained diffusion teacher to 2.76. The KL-distilled alternative performs worse than the teacher and is described as prone to collapse.

On the 12 ACIC 2018 datasets, IWDD reports out-of-sample win rates of 66.7% for $Y(0)$ RMSE and 75% for $Y(1)$ RMSE, with mean RMSEs of 0.880 and 0.950. For PEHE, it reports a 58% out-of-sample win rate and mean PEHE 0.301, compared with 33% and 0.306 for the pretrained teacher. In-sample OffsetNet has better mean potential-outcome RMSE, so IWDD's clearest reported advantage is out-of-sample performance rather than uniform dominance.

The appendix reports additional ACIC 2016 and IHDP results. On IHDP, IWDD has the best listed out-of-sample PEHE (1.655, narrowly ahead of the pretrained model's 1.658) but worse potential-outcome RMSE than several smaller baselines. The manuscript attributes this to IHDP's 747 observations relative to IWDD's parameter count. DiffPO is omitted from ACIC 2016 and IHDP comparisons after numerical failures.

## Limitations

- Identification assumes consistency, conditional unconfoundedness, and positivity. The method does not address unmeasured confounding, and its balanced product-marginal target may require extrapolation where overlap is weak.
- The stated gradient-covariance theorem is not proved in general. Conditional on $x$, the matrix difference is a sum of treatment-specific $g(x,z)g(x,z)^\top$ terms with different coefficients; it cannot generally be factored into the scalar $1/[4\pi(x)(1-\pi(x))]-1$ times a common covariance matrix. For example, with $\pi(x)=0.8$ and a nonzero gradient only for $z=1$, $w=0.625$ and $w^2-w<0$, reversing the claimed positive-semidefinite ordering. Extra restrictions on treatment-specific gradients would be needed.
- The synthetic training assignment is stated as deterministic, $z=\mathbf 1\{x<-1\}$, which violates the paper's strict-overlap assumption and makes the balanced target rely on unsupported covariate-treatment pairs. Its result is therefore evidence about extrapolation, not an identified observational causal comparison under the stated assumptions.
- The text alternates between $p_{\mathrm{rct}}(z)/p(z\mid x)$ and $1/p(z\mid x)$ when describing the weight. For balanced binary treatment these differ by the constant factor $1/2$; this does not change an optimizer under a simple scalar loss but does matter in the variance derivation.
- ACIC and IHDP use simulated or semi-synthetic potential outcomes. The experiments do not establish accuracy for real unobserved counterfactuals, continuous treatments, discrete outcomes, or longitudinal settings.
- The favorable evidence is primarily win rates across benchmark instances. Some mean results are driven by extreme failures of competing methods, and IWDD does not dominate every dataset or metric.
- The supplied manuscript states no publication year, venue, DOI, or identifier for this paper, so none is inferred here.

## Related Concepts

- [[concepts/implicit-importance-weighting-by-marginal-sampling|Implicit Importance Weighting by Marginal Sampling]]
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- [[papers/conformal-diffusion-models-for-individual-treatment-effect-estimation-and-inference|Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference]]: also models conditional potential-outcome distributions with diffusion, but uses estimated propensity weights and conformal calibration for uncertainty sets.
- [[papers/stable-causal-estimation-with-optimal-transport|Stable Causal Estimation with Optimal Transport]]: replaces unstable density-ratio weighting with geometric covariate transport for average causal effects under limited overlap.
- Ma et al. (2024), "DiffPO: A Causal Diffusion Model for Learning Distributions of Potential Outcomes": the principal diffusion-based causal baseline discussed and evaluated by the manuscript.
- Zhou et al. (2024), "Score Identity Distillation: Exponentially Fast Distillation of Pretrained Diffusion Models for One-Step Generation": supplies the Fisher-divergence distillation strategy adapted by IWDD.

[[index|Library home]]
