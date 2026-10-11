---
title: Bayesian neural networks for macroeconomic analysis
type: paper
authors:
  - Niko Hauzenberger
  - Florian Huber
  - Karin Klieber
  - Massimiliano Marcellino
year: null
doi: "10.1016/j.jeconom.2024.105843"
source_job_id: "8799adff-dad1-4779-a87c-4f231f81ef0a"
tags:
  - bayesian-neural-networks
  - macroeconomic-forecasting
  - stochastic-volatility
  - shrinkage-priors
---

## TL;DR

Bayesian neural networks combining a linear component, shrinkage priors, uncertain activation functions, and stochastic volatility improve short-term US macroeconomic density forecasts in the reported evaluation. Shallow networks forecast about as well as deep networks despite weaker in-sample fit. Gains in point forecasts are smaller and variable-dependent; accounting for changing shock variance matters more consistently than adding depth.

## Research Question

Can neural networks provide useful nonlinear forecasts and predictive uncertainty when macroeconomic samples contain only hundreds of observations but many predictors, temporal dependence, and changing volatility?

## Motivation

Large neural networks can overfit short macroeconomic series, while choosing architectures and activation functions creates a costly specification search. Linear models remain competitive in ordinary periods, but nonlinearities and changing uncertainty may become important during recessions. The paper therefore combines a linear baseline with a regularized nonlinear component and a separate model for shock variance.

## Contributions

- Uses [[concepts/bayesian-activation-function-averaging|Bayesian Activation-Function Averaging]] over four candidate functions to reduce manual specification choices.
- Applies [[concepts/horseshoe-shrinkage-in-neural-networks|Horseshoe Shrinkage in Neural Networks]] to regularize weights and suppress irrelevant neurons in small samples.
- Incorporates [[concepts/stochastic-volatility|Stochastic Volatility]] and posterior simulation to produce predictive densities that integrate parameter and volatility uncertainty.
- Compares shallow and deep networks in a nonlinear Phillips-curve simulation and a recursive US forecasting exercise, separating fit, point accuracy, and density accuracy.

## Method

The conditional mean combines linear coefficients and a neural-network approximation:

$$
y_t=x_t'\gamma+f(x_t)+\varepsilon_t,
\qquad \varepsilon_t\sim\mathcal N(0,\exp(\nu_t)).
$$

Log variance follows an AR(1) process,

$$
\nu_t=\mu_\nu+\rho_\nu(\nu_{t-1}-\mu_\nu)+\varsigma_t,
\qquad \varsigma_t\sim\mathcal N(0,\xi_\nu^2).
$$

Horseshoe priors regularize both the linear coefficients and network weights. Each row of a hidden-layer weight matrix has a shared neuron-level scale and coefficient-specific local scales. This induces continuous shrinkage toward zero, rather than literal discrete removal of neurons (Sections 2.4-2.5).

The activation candidates are leaky ReLU, sigmoid, ReLU, and tanh, with equal prior probabilities. Section 2.3 describes a weighted activation combination; the sampler in Section 2.6 selects a categorical activation indicator. Posterior prediction therefore averages over sampled activation choices. The flexible shallow specification uses neuron-specific choices; the flexible deep specification uses one choice per layer. Other variants estimate a common choice or fix ReLU.

[[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]] uses Hamiltonian Monte Carlo for hidden-layer weights, Gaussian conditional updates for the linear coefficients and output weights, inverse-gamma updates for shrinkage auxiliaries, categorical activation updates, and stochastic-volatility updates. The authors run 20,000 MCMC iterations and discard 10,000 as burn-in (Section 2.6).

## Experiments

### Synthetic Phillips Curve

The simulation generates 20 series of length 350 from a threshold-style nonlinear Phillips curve. Inflation's response to labor-market tightness changes when tightness reaches one. Networks use three predictors, one to three hidden layers, and three to fifteen neurons per layer. Shallow flexible-activation networks recover the mean function most accurately among the tested configurations; increasing depth generally worsens recovery. For the flexible model, gains from additional width largely flatten after six neurons (Section 3).

### US Forecasting

The data span January 1960 through December 2020. The paper reports 252 monthly hold-out periods from January 2000 through December 2020 and recursive expanding-window one-month-ahead forecasts of CPI inflation, industrial-production growth, and employment growth. Information sets use the target's first lag, that lag plus eight principal components, or first lags of 120 economic and financial series. Networks have one or three hidden layers, with width set to the input dimension.

Comparators include a horseshoe linear diffusion-index regression with stochastic volatility, UC-SV, LASSO, elastic net, BART, random forests, and a back-propagation BNN. All except the back-propagation BNN, random forests, and elastic net include stochastic volatility. Table 2 reports average log predictive likelihood (LPL) differences and RMSE ratios against the linear diffusion-index benchmark.

| Target, large information set | Shallow-flex LPL difference | Deep-flex LPL difference | Shallow-flex RMSE ratio | Deep-flex RMSE ratio |
| --- | --- | --- | --- | --- |
| Inflation | 0.09 | 0.09 | 0.94 | 0.94 |
| Industrial production | 0.16 | 0.16 | 0.97 | 0.98 |
| Employment | 0.38 | 0.41 | 1.01 | 1.01 |

Positive LPL differences and RMSE ratios below one favor the BNN. For these two specifications, inflation and industrial-production LPL gains are significant at 5%; employment LPL gains at 10%. Inflation RMSE improvements are significant at 5%, while the displayed industrial-production and employment RMSE ratios are not marked significant. The tests are one-sided Diebold-Mariano comparisons with the benchmark, not pairwise tests between shallow and deep networks.

Density improvements are particularly pronounced during turbulent periods. Employment's better density scores coexist with slightly worse point forecasts in the large-information setting. For industrial production, some competing methods yield better point forecasts than the BNNs. These results support a predictive-distribution advantage rather than universal point-forecast superiority (Section 4.2).

### Volatility and Depth

Removing stochastic volatility substantially reduces most density scores. For example, large-information shallow-flex LPL differences change from 0.09 to -0.06 for inflation, 0.16 to -0.58 for industrial production, and 0.38 to -5.83 for employment. Homoskedastic deep-flex remains above the benchmark for industrial production (0.03) and employment (0.28), so the ablation is not uniformly negative (Table 3).

Deep networks achieve much stronger in-sample fit without a corresponding general forecasting advantage. Shallow-flex beats the benchmark's monthly density score in 54.0%, 54.0%, and 55.6% of periods for inflation, industrial production, and employment; deep-flex does so in 48.8%, 46.4%, and 53.6% (Table 5). These frequencies are distinct from average score improvements, which can reflect a few large gains.

## Limitations

- Evidence concerns three US targets at a one-month horizon and one synthetic DGP. It does not establish performance across countries, longer horizons, or causal policy interventions.
- Activation averaging yields generally modest gains with stochastic volatility. Depth adds fit and computation but little consistent forecast improvement; architecture choices are reduced, not eliminated.
- Comparator volatility specifications differ, so broad method rankings do not isolate the contribution of neural-network mean functions alone. The within-BNN volatility ablation offers a more direct comparison.
- Posterior simulation integrates uncertainty under the specified model, but finite MCMC does not guarantee exact posterior recovery. Good predictive scores alone do not establish mixing or calibration.
- The supplied Markdown has corrupted prose, missing mathematical characters, and no substantive online appendix. Its forecast-window description also says training extends through January 2000 before forecasting the next month, which does not align exactly with its stated January 2000 hold-out start; the summary retains the reported 252-period evaluation without resolving that discrepancy.
- The publication year is not explicitly present in the supplied text. The DOI is given in the supplementary-material notice; its embedded year is not treated as publication-year metadata.

## Related Concepts

- [[concepts/bayesian-activation-function-averaging|Bayesian Activation-Function Averaging]]: uncertainty over the nonlinear transformations used by the network.
- [[concepts/horseshoe-shrinkage-in-neural-networks|Horseshoe Shrinkage in Neural Networks]]: regularization at neuron and weight levels.
- [[concepts/stochastic-volatility|Stochastic Volatility]]: changing conditional shock variance.
- [[concepts/sampling-based-inference-for-bayesian-neural-networks|Sampling-Based Inference for Bayesian Neural Networks]]: posterior simulation and predictive averaging.

## Related Papers

- Ghosh, Yao, and Doshi-Velez (2019), "Model selection in Bayesian neural networks via horseshoe priors": cited antecedent for network shrinkage.
- Benigno and Eggertsson (2023), "It's Baaack: The Surge in Inflation in the 2020s and the Return of the Non-Linear Phillips Curve": motivates the simulation's nonlinear inflation mechanism.
- Stock and Watson (2002), "Macroeconomic forecasting using diffusion indexes": basis for the factor-regression benchmark.
- [[papers/do-bayesian-neural-networks-need-to-be-fully-stochastic|Do Bayesian Neural Networks Need To Be Fully Stochastic?]]: a related library paper, not a citation in this source; also distinguishes useful predictive distributions from fidelity to a full Bayesian posterior.

[[index|Library home]]
