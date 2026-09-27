---
title: Modeling Item Response Theory with Stochastic Variational Inference
type: paper
authors:
  - Mike H. Wu
  - Richard L. Davis
  - Benjamin W. Domingue
  - Chris Piech
  - Noah D. Goodman
year: 2022
date: "2022-07-29"
source_job_id: "4ddb3a90-b430-43a4-94ee-6d3539cc4ca5"
tags:
  - item-response-theory
  - variational-inference
  - bayesian-measurement
  - educational-assessment
  - deep-generative-models
---

## TL;DR

VIBO fits Bayesian item response models using amortized variational inference, producing held-out response accuracy close to the tested Hamiltonian Monte Carlo (HMC) baseline at much lower computational cost on large datasets. It also supports learned nonlinear response functions, which improve predictive accuracy for the Deep and Residual variants across six educational and language datasets. These results concern the evaluated training budgets and predictive tasks; they do not establish exact posterior recovery or the psychometric validity of the learned nonlinearities.

## Research Question

Can Bayesian inference for item response theory scale to hundreds of thousands of respondents while retaining useful uncertainty estimates, and can the same inference machinery support more expressive response functions?

## Motivation

[[concepts/item-response-theory|Item Response Theory]] connects observed answers to latent abilities and item characteristics. Joint maximum likelihood gives point estimates, marginal maximum likelihood relies on integration over abilities, and sampling-based Bayesian inference can become expensive as data and latent dimensionality grow. The paper uses [[concepts/amortized-variational-inference|Amortized Variational Inference]] to share inference computations across respondents and make nonlinear extensions computationally feasible.

## Contributions

- Introduces the Variational Item response theory Lower Bound, VIBO, and an inference architecture that conditions ability estimates on item characteristics and observed responses.
- Evaluates inference speed, synthetic parameter recovery, held-out response prediction, and posterior predictive summaries against MLE, EM, and HMC.
- Develops Link, Deep, and Residual response models that learn departures from conventional logistic IRT.
- Studies continuous partial-credit responses, alternative posterior aggregation schemes, KL regularization, and normalizing-flow posterior extensions.

## Method

### Posterior Structure and Optimization

For respondent $i$, write $\mathbf r_i$ for responses, $\mathbf a_i$ for ability, and $\mathbf d$ for all item characteristics. The implemented approximation is

$$
q_\phi(\mathbf a_i,\mathbf d\mid\mathbf r_i)
=q_\phi(\mathbf a_i\mid\mathbf d,\mathbf r_i)
\prod_j q_\phi(\mathbf d_j).
$$

The ability network shares parameters across respondents. Item distributions are learned separately and are **not amortized**, although their fitted parameters depend on the response data. Independent standard Normal priors and diagonal-Gaussian variational components enable reparameterized stochastic gradients. Conditioning ability on sampled item characteristics allows dependence in the joint approximation despite these simple components.

VIBO combines expected response log likelihood with regularization toward the ability and item priors. Minibatches of respondents and usually one Monte Carlo sample estimate gradients. The experiments use Adam with learning rate 0.005, batch size 16 or 128 for the two largest datasets, and generally 100 epochs. The appendix reports fixing the KL weight at $\beta=0.5$ after examining its sensitivity.

The supplied equations write positive KL divergences as additive terms in a maximized lower bound, while the proof also uses expected $\log(p/q)$ ratios. These signs are inconsistent: under the usual KL definition, those ratios give negative KL penalties. This summary describes the intended regularized inference procedure without treating the displayed plus-KL formula as a valid ELBO. A $\beta$-weighted training objective also should not automatically inherit the ordinary ELBO guarantee for arbitrary $\beta$.

### Combining Responses and Extending the Model

The ability encoder combines item-response Gaussian experts through a normalized product. The paper specifies prior substitution for missing entries and evaluates mean, recurrent, and attention-based alternatives. This accommodates incomplete response vectors; it does not explicitly model the probability that a response is missing.

| Variant | Response-model change |
| --- | --- |
| Link | Learns a scalar link applied to the linear ability-item score. |
| Deep | Uses neural embeddings of ability and items, then a joint network predicting response probability. |
| Residual | Adds a learned correction to a conventional IRT score, initialized to yield no correction. |

The nonlinear networks use three-layer MLPs with 64 hidden units and ELU activations. Nonlinear comparisons generally use five ability dimensions; the separate TIMSS curve analysis also examines one and two dimensions. A continuous DuoLingo extension uses a truncated Normal response model with fixed variance 0.1. VIBO-NF applies ten planar flows to enrich the ability and item posterior approximations.

## Experiments

### Data and Evaluation

Synthetic 2PL and ideal-point/unfolding data vary respondent count, item count, and latent dimensionality. Real-data sizes from Table 1 are:

| Dataset | Respondents | Items |
| --- | ---: | ---: |
| CritLangAcq | 669,498 | 95 |
| WordBank | 5,520 | 797 |
| DuoLingo | 2,587 | 2,125 |
| Gradescope | 1,254 | 98 |
| PISA 2015 science | 519,334 | 183 |
| TIMSS 2007 | 3,479 | 28 |

The main inference comparison uses the first five datasets; TIMSS supports further nonlinear and aggregation analyses. DuoLingo repeated responses are averaged and rounded for binary experiments, and the other assessment datasets also receive the described binary preprocessing. Prediction tests hold out 10% of responses. Additional measures include correlation with synthetic true abilities, posterior predictive response totals, and log marginal likelihood estimated with 1,000 importance samples.

The HMC comparison uses 200 samples after 100 warmup steps without parallelization. EM uses R's `mirt` package and 61 quadrature points. Runtime findings therefore compare particular implementations and computational budgets.

### Inference Accuracy and Speed

Table 4 reports the following held-out response accuracies:

| Dataset | MLE | EM | HMC | VIBO |
| --- | ---: | ---: | ---: | ---: |
| CritLangAcq | 0.92 | 0.90 | 0.93 | 0.93 |
| WordBank | 0.88 | 0.83 | 0.88 | 0.88 |
| DuoLingo | 0.80 | 0.83 | 0.89 | 0.89 |
| Gradescope | 0.71 | 0.74 | 0.82 | 0.83 |
| PISA | 0.71 | 0.64 | 0.73 | 0.73 |

For synthetic 2PL data with approximately 1.56 million respondents, the text reports 217 hours for HMC versus 800 seconds for VIBO. For real data, Table 3 reports log runtimes of 13.16 versus 7.94 on CritLangAcq and 12.87 versus 9.84 on PISA for HMC versus VIBO. EM remains faster than VIBO on Gradescope and PISA. Posterior predictive summaries mostly agree between VIBO and HMC, with systematic deviations on DuoLingo; this is narrower evidence than full posterior equivalence.

Small-sample recovery depends on training length: with 100 synthetic respondents, increasing training from 100 to 1,000 epochs raises ability correlation from 0.58 to 0.95. In synthetic ideal-point experiments, EM predicts better at low respondent counts, while VIBO performs better at larger scale. Ablations support amortization and conditioning ability on item characteristics within the tested setup.

### Nonlinear Models and Extensions

Table 8 gives the following accuracy comparison:

| Dataset | 2PL | Link | Deep | Residual |
| --- | ---: | ---: | ---: | ---: |
| CritLangAcq | 0.932 | 0.945 | 0.948 | 0.947 |
| WordBank | 0.880 | 0.888 | 0.889 | 0.889 |
| DuoLingo | 0.886 | 0.891 | 0.897 | 0.894 |
| Gradescope | 0.826 | 0.840 | 0.847 | 0.848 |
| PISA | 0.728 | 0.718 | 0.744 | 0.739 |
| TIMSS | 0.764 | 0.769 | 0.771 | 0.775 |

Deep and Residual improve over 2PL on all six datasets, but Link decreases PISA accuracy by 1.0 percentage point despite improving its reported log likelihood. The ideal-point response model also underperforms 2PL on WordBank, Gradescope, and TIMSS. Greater flexibility is therefore not a uniform improvement across model forms or metrics.

For the one-dimensional TIMSS Booklet 14 comparison, reported log likelihoods are -306.42 for 2PL, -274.50 for LPE, -245.69 for Deep, and -243.55 for Residual (Table 11). Learned item curves exhibit asymmetric and more complex shapes; their substantive psychometric interpretation remains open.

Using continuous DuoLingo responses improves rounded prediction accuracy from 0.897 to 0.905 for Deep and from 0.894 to 0.904 for Residual (Table 10). These are gains of 0.8 and 1.0 percentage points. Flow posteriors improve accuracy on four of five datasets, including PISA from 0.728 to 0.741, but leave DuoLingo unchanged at 0.886 (Table 13). Product aggregation beats mean aggregation on five of six datasets and ties on DuoLingo (Table 6). Sequential aggregation is competitive but more expensive; attention performs especially poorly on WordBank and TIMSS in these tests.

## Limitations

- Training length, KL weight, posterior family, and dimensionality affect recovery. The Gaussian product approximation restricts uncertainty shape; better predictive accuracy does not prove calibrated uncertainty in every setting.
- HMC agreement is conditional on the short, fixed sampling budget. Synthetic high-dimensional recovery deteriorates for both HMC and VIBO under the tested settings.
- Nonlinear response functions weaken conventional interpretations of ability, difficulty, and discrimination. The paper does not establish that fitted nonlinearities represent stable cognitive mechanisms.
- VIBO does not model longitudinal learning. The Deep-IRT comparison imposes an item ordering on static data, limiting conclusions about knowledge tracing.
- Holding out observed responses tests imputation but does not establish robustness to [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]].
- The supplied Markdown contains inconsistent KL signs, mis-scaled parenthetical gains in Tables 10 and 13, and conflicting PISA runtime summaries. The results above retain explicit table entries and compute percentage-point changes directly. Table 14 has a caption but no results. The manuscript date is supplied, but its own venue, DOI, and arXiv identifier are absent.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: latent traits, item parameters, and response-function assumptions.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: shared posterior prediction and the approximation cost of amortization.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: a related measurement family that explicitly models temporal change, unlike this paper's static setting.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: distinguishes incomplete-data prediction from explicit selection modeling.

## Related Papers

- Natesan et al. (2016), "Bayesian prior choice in IRT estimation using MCMC and variational Bayes": cited prior work using an unamortized, independent variational approximation.
- Curi et al. (2019), "Interpretable variational autoencoders for cognitive models": cited comparison that treats ability as the unknown latent variable.
- Yeung (2019), "Deep-IRT: Make deep learning based knowledge tracing explainable using item response theory": cited neural, longitudinal model using point estimates.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: a library comparison on temporal structure, informative missingness, and the accuracy of Bayesian approximations; not a citation in this manuscript.

[[index|Library home]]
