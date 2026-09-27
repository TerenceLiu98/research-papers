---
title: "Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes"
type: paper
authors:
  - Maya Okawa
  - Tomoharu Iwata
  - Yusuke Tanaka
  - Hiroyuki Toda
  - Takeshi Kurashima
  - Hisashi Kashima
year: 2021
venue: "KDD 2021"
doi: "10.1145/3447548.3467248"
source_job_id: "7b7d1bca-f65d-4d77-9a5c-936668cd1630"
tags:
  - hawkes-processes
  - temporal-point-processes
  - event-prediction
  - neural-networks
  - information-diffusion
---

## TL;DR

Dynamic Hawkes Processes (DHP) model changing community activity by coupling a learned nonnegative function with a time transformation of the triggering kernel. A mixture of monotonic neural networks makes the integrated intensity analytically tractable. On four 2020 event datasets, DHP achieves the lowest reported count-prediction MAPE among six methods and the lowest NLL among the five methods with comparable likelihoods. The learned states support descriptive interpretations of changing activity, but do not establish its causes.

## Research Question

Can a multivariate Hawkes model learn time-varying community states from timestamped events, improve event prediction, and retain an exactly computable likelihood?

## Motivation

Conventional Hawkes kernels encode how past events affect current arrivals through elapsed time. Fixed kernel parameters cannot directly describe changes in a receiving community's responsiveness, such as changing interest in news. Handcrafted temporal functions require assumptions about those changes, while unrestricted neural modulation can make the likelihood integral difficult to evaluate. DHP couples modulation and time rescaling so that the integral remains tractable (Sections 1 and 4).

## Contributions

- Introduces a latent dynamics function per receiving community that modifies both the instantaneous magnitude and temporal decay of excitation.
- Learns an antiderivative with a mixture of [[concepts/monotonic-neural-networks|Monotonic Neural Networks]], obtaining nonnegative latent dynamics by automatic differentiation.
- Derives an analytic integrated intensity by substitution for kernels with known antiderivatives.
- Evaluates predictive performance on Reddit hyperlinks, COVID-19 news, protests, and reported crimes, with sensitivity analyses and qualitative community-interaction visualizations.

## Method

### Dynamic Intensity

An event is a pair $(t_j,m_j)$ giving its time and community. For receiving community $m$, [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]] use

$$
\lambda_m(t)=\mu_m+
f_m(t)\sum_{j:t_j<t}g_{m,m_j}\bigl(F_m(t)-F_m(t_j)\bigr),
\qquad F_m'(t)=f_m(t)\geq0.
$$

Here $\mu_m$ is a constant background rate, $g_{m,m_j}$ is a nonnegative triggering kernel, and $F_m(t)-F_m(t_j)=\int_{t_j}^{t}f_m(u)\,du$ is elapsed time measured on a learned scale (Equations 5-6). The same receiving-community function scales excitation and changes its decay in calendar time. Setting $f_m(t)=1$ recovers the conventional multivariate Hawkes formulation.

For an exponential kernel, an event contributes

$$
\alpha_{m,m_j}f_m(t)
\exp\{-\beta_{m,m_j}[F_m(t)-F_m(t_j)]\}.
$$

For constant $f_m(t)=c$, this becomes $c\alpha_{m,m_j}\exp[-c\beta_{m,m_j}(t-t_j)]$: the amplitude and decay rate change together (Section 4.1). Pair-specific latent functions are proposed as an extension; the experiments use one function per receiving community.

### Neural Parameterization and Learning

The model parameterizes an antiderivative as

$$
F_m(t)=\sum_{c=1}^{C}\pi_c\Phi_m^c(t)+b_0t,
\qquad
f_m(t)=\sum_{c=1}^{C}\pi_c\frac{d\Phi_m^c(t)}{dt}+b_0.
$$

Each $\Phi_m^c$ is a feedforward monotonic network. Nonnegative network weights, mixture coefficients, and $b_0$, together with monotonic activations, ensure $f_m(t)\geq0$. Hidden layers use tanh and the last layer uses softplus. Only differences of $F_m$ enter the intensity, so an additive integration constant does not affect the model (Equations 8-10).

If $G_{m,m_j}'=g_{m,m_j}$, then for $t_j\leq a<b$ the contribution of a past event integrates to

$$
\int_a^b g_{m,m_j}\bigl(F_m(t)-F_m(t_j)\bigr)f_m(t)\,dt
=G_{m,m_j}\bigl(F_m(b)-F_m(t_j)\bigr)
-G_{m,m_j}\bigl(F_m(a)-F_m(t_j)\bigr).
$$

This substitution supplies the likelihood compensator without numerical quadrature for the chosen kernels. Network and kernel parameters are jointly trained by minimizing negative log likelihood with minibatch Adam (Section 4.2). Appendix C uses the same integral to predict counts in a future interval using events observed before its start.

## Experiments

### Data and Protocol

Table 1 reports these datasets, all collected in 2020:

| Dataset | Events | Communities | Observation period |
| --- | ---: | --- | --- |
| Reddit | 23,059 | 25 subreddits | March 1-August 31 |
| News | 19,541 | 40 news websites | January 20-March 24 |
| Protest | 22,313 | 35 countries | March 1-November 21 |
| Crime | 29,318 | 13 Chicago community areas | March 1-December 19 |

Reddit events are hyperlinks assigned to their target subreddit. Source-subreddit labels are withheld from training and used for qualitative interaction evaluation. News comes from GDELT, protests from ACLED, and crimes from the Chicago Data Portal (Section 5.1; Appendix D.1).

Datasets are split chronologically 70%/10%/20% for training, validation, and testing. Validation likelihood controls early stopping and hyperparameter selection. Baselines are homogeneous Poisson (HPP), reinforced Poisson (RPP), self-correcting point process, static multivariate Hawkes, and recurrent marked temporal point process (RMTPP). Searches cover one to five layers, one to five mixture components, and exponential, power-law, and Rayleigh kernels. The selected DHP models use power-law kernels, eight hidden units per layer, and three mixtures except for Crime, which uses five (Section 5.3; Appendix D.2).

### Reported Results

Table 2 gives the following results; parentheses are reported standard deviations for MAPE. Lower values are better. The comparator columns show the best baseline for each metric and dataset.

| Dataset | DHP NLL | Best baseline NLL | DHP MAPE | Best baseline MAPE |
| --- | ---: | --- | --- | --- |
| Reddit | -6.447 | Hawkes: -5.696 | 0.305 (0.045) | RMTPP: 0.311 (0.061) |
| News | -6.301 | Hawkes: -6.167 | 0.442 (0.039) | RMTPP: 0.446 (0.125) |
| Protest | -6.914 | Hawkes: -6.260 | 0.318 (0.049) | HPP: 0.345 (0.060) |
| Crime | -6.983 | SelfCorrecting: -6.803 | 0.117 (0.008) | SelfCorrecting: 0.123 (0.005) |

RMTPP's NLL is omitted because the authors consider its likelihood definition incomparable with the other methods. DHP therefore leads five baselines on reported MAPE and four on reported NLL. The MAPE gains over the strongest baseline are small on Reddit and News; the table supplies no significance tests or repeat count.

Predictions use successive 15-minute intervals, updating the observed history at each interval's start. Despite the metric's name, Equation 14 takes the absolute error **after summing counts over intervals** within each community, then averages the relative errors over communities:

$$
\mathrm{MAPE}=\frac{1}{M}\sum_{m=1}^{M}
\frac{\left|\sum_s\hat N_s^m-\sum_s N_s^m\right|}
{\sum_s N_s^m}.
$$

It is thus a relative error in community totals, not an average of interval-level absolute percentage errors; errors across intervals can cancel.

### Sensitivity and Case Studies

The power-law kernel performs best across all four datasets in the reported kernel comparison. Layer count has little effect on three datasets, while deeper networks improve Protest NLL. Mixture-count performance is described as broadly stable; the text reports slightly increasing NLL on Protest and Crime as mixture count grows, so it does not support a uniform improvement from adding components (Section 5.6).

Visualizations compare inferred Reddit interactions with observed hyperlinks and interpret changing Reddit, news, and protest activity in relation to the pandemic. These are qualitative patterns rather than direct measurements of awareness, interest, or preventive behavior (Section 5.7).

## Limitations

- **Coupled dynamics:** The same latent function controls excitation amplitude and transformed time. The authors acknowledge that this coupling may limit flexibility and propose relaxing it (Section 6).
- **Community-level scope:** Communities are supplied as event labels. The model discovers their fitted activity dynamics, not community membership. Independently changing pairwise latent dynamics remain future work.
- **Interpretation:** Predictive gains and visual alignment with pandemic trends do not identify causal diffusion mechanisms or validate the latent functions as psychological states.
- **Evaluation scope:** Evidence covers four selected datasets from 2020. The reported count metric can hide interval-level timing errors, and RMTPP has no comparable NLL result.
- **Forecasting scope:** Appendix C's displayed count predictor sums only events preceding the forecast interval. It does not explicitly integrate over excitation from unobserved events arising within that interval; the exact likelihood calculation should not be read as a general exact multistep count forecast.
- **Source quality:** The supplied Markdown contains damaged symbols, malformed kernel-table expressions, and inconsistent likelihood-sign labels. The summary uses the recoverable intensity and substitution equations, reports Table 2 values as supplied, and does not reconstruct missing numerical figure values.

## Related Concepts

- [[concepts/dynamic-hawkes-processes|Dynamic Hawkes Processes]]: community-dependent modulation and time rescaling of excitation.
- [[concepts/monotonic-neural-networks|Monotonic Neural Networks]]: constrained antiderivatives whose derivatives are nonnegative.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: a complementary approach to flexible triggering kernels and uncertainty; DHP uses maximum likelihood and learned temporal modulation.
- [[concepts/social-network-analysis|Social Network Analysis]]: the inferred interaction visualizations concern changes in relationships among labeled communities.

## Related Papers

- Du et al. (2016), "Recurrent marked temporal point processes: Embedding event history to vector": the RMTPP baseline (reference [9]).
- Omi et al. (2019), "Fully neural network based model for general temporal point processes": cited inspiration for monotonic neural parameterization (reference [28]).
- Rizoiu et al. (2018), "SIR-Hawkes: linking epidemic models and Hawkes processes to model diffusions in finite populations": a cited example of domain-specific changing diffusion dynamics (reference [31]).
- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]]: a related library paper about timestamp misalignment, a different issue from evolving community states; it is not evaluated here.
- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: a related library treatment of Bayesian kernel inference, not a baseline in this paper.

[[index|Library home]]
