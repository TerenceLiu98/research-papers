---
title: "Deep Learning with Non-Linear Factor Models: Adaptability and Avoidance of Curse of Dimensionality"
type: paper
authors:
  - Mehmet Caner
  - Maurizio Daniele
year: 2022
tags:
  - deep-learning
  - factor-models
  - covariance-estimation
  - portfolio-optimization
  - high-dimensional-statistics
---

## TL;DR

This paper develops a sparse [[Deep Neural Network Factor Models|deep neural network factor model]] (DNN-FM) for asset returns with additive nonlinear effects of observed factors. Under smoothness, sparsity, subgaussian-noise, and sampling assumptions, it derives prediction and return-covariance error rates that do not depend on the number of factors, and introduces an absolute-deviation adaptive threshold for the residual covariance matrix. Simulations generally favor DNN-FM over linear-factor and shrinkage benchmarks as the factor count grows. In rolling S&P 500 portfolios, DNN-FM has the lowest volatility when the 120-month estimation window exceeds the asset count and the highest reported Sharpe ratio after the paper's assumed transaction costs, but precision-matrix consistency requires the substantially narrower regime $J \ll n$.

## Research Question

Can a sparse deep neural network replace the linear return-factor relationship with a flexible nonlinear one while retaining uniform prediction guarantees and consistent covariance and precision-matrix estimates in high-dimensional portfolios?

## Motivation

Linear factor models impose a fixed linear effect of each factor on each asset. This can miss nonlinear responses and abrupt changes, particularly in volatile periods. Generic nonparametric regression, however, can deteriorate quickly as the number of factors grows. The paper asks whether an additive compositional structure estimated by a sparse ReLU network can provide flexibility without placing the factor dimension in the leading convergence rates, and whether its fitted residuals can support portfolio covariance estimation.

## Contributions

- Extends sparse deep-network risk bounds from Gaussian errors to subgaussian innovations and makes the expected-risk bounds uniform over multiple response variables.
- Specializes the compositional model to additive nonlinear factor effects and derives a uniform in-sample prediction bound with a neural estimation term and a term for the number of assets.
- Introduces an adaptive residual-covariance threshold based on mean absolute, rather than squared, deviations from each estimated covariance entry. The paper argues that this choice is less sensitive to large residual products and better suited to estimated deep-learning residuals.
- Proves spectral-norm consistency for the thresholded residual covariance and sup-norm consistency for the return covariance. Their stated rates do not contain the number of observed factors.
- Gives a consistent return precision-matrix estimator under additional eigenvalue, symmetry, sparsity, and dimensional-growth restrictions.
- Evaluates function, covariance, precision-matrix, and global-minimum-variance portfolio performance in simulations and a rolling empirical application.

## Method

For asset $j$ at time $i$, the model is

$$
Y_{j,i}=f_{0,j}(X_i)+u_{j,i}, \qquad
f_{0,j}(X_i)=\sum_{m=1}^{d} f_{j,m}(X_{m,i}),
$$

where $X_i$ contains $d$ observed factors and each asset may have different univariate factor-response functions. A separate bounded, sparse feedforward ReLU network estimates each $f_{0,j}$, while all assets share network depth and layer widths. The compositional smoothness assumptions make each first-stage component depend on one factor, which is the structural reason the prediction rate avoids direct dependence on $d$.

With $J$ assets and $n$ observations, Theorem 2 bounds the maximum in-sample squared prediction error by terms of orders

$$
r_{n1}=O\!\left(n^{-2\beta/(2\beta+1)}\log^3 n\right),
\qquad
r_{n2}=O\!\left(\sqrt{\frac{\log J}{n}}\right).
$$

Writing $a_n^2=r_{n1}+r_{n2}$, the residual covariance is first estimated from $\hat u_{j,i}=Y_{j,i}-\hat f_j(X_i)$. For entry $(j,k)$, the data-dependent scale is

$$
\hat\theta_{j,k}=\frac{1}{n}\sum_{i=1}^{n}
\left|\hat u_{j,i}\hat u_{k,i}-\hat\sigma_{j,k}\right|,
$$

and the hard-thresholded estimate retains $\hat\sigma_{j,k}$ only when $|\hat\sigma_{j,k}|\geq \hat\theta_{j,k}\omega_n$, with $\omega_n$ of order $\sqrt{\log J/n}+a_n$. If $s_n$ is the largest number of nonzero entries in a row of the true residual covariance, Theorem 3 gives spectral error $O_p(\omega_n s_n)$. Adding the sample covariance of the fitted factor functions yields a return-covariance estimator with entrywise error $O_p(\omega_n)$ in Theorem 4.

The return precision estimator applies an inverse-of-a-matrix-sum identity to the fitted-function covariance and thresholded residual covariance. Theorem 5 gives spectral error $O_p(J^2\omega_n s_n)$, subject to $J^2\omega_n s_n\to0$ and the paper's additional eigenvalue and symmetry assumptions.

Implementation uses an 80/20 chronological training-validation split, an $L_1$ penalty on network weights, 20% dropout, early stopping, and Adam. In simulations and the application, the threshold rate is set to $3\sqrt{\log J/n}$.

## Experiments

The Monte Carlo study uses 500 replications with $n\in\{60,120,240\}$, $J\in\{50,100,200\}$, and $d\in\{1,3,5,7\}$. The first design combines linear and quadratic factor effects and considers both independent and banded cross-sectionally correlated innovations. The second design adds quadratic transformations and pairwise interactions. Comparators are an observed static factor model with POET residual covariance, linear shrinkage, nonlinear shrinkage, and single-factor nonlinear shrinkage.

In the first design with independent errors, DNN-FM has lower reported function-estimation error than the static factor model in every table entry. For $d=7$ and $J=200$, its function error falls from 5.75 at $n=60$ to 3.43 at $n=240$, its covariance error falls from 1.36 to 1.13, and its precision error falls from 2.09 to 0.52. With correlated errors at the same dimensions, the respective changes are 5.49 to 4.06, 1.33 to 1.10, and 2.01 to 0.81. The second design remains broadly favorable to DNN-FM, but its precision errors can increase with $d$ in smaller samples because the pairwise-interaction data-generating process does not match the additive model.

The empirical study forms global minimum variance portfolios from monthly excess returns of 227 stocks that were S&P 500 constituents on December 31, 2021. It uses a rolling 120-month window, portfolio sizes $J\in\{50,100,200\}$, and the Fama-French three factors as observed inputs. Two evaluation periods end in December 2019 and December 2021; the latter includes the COVID-19 crisis. At $J=50$ and $J=100$, DNN-FM has the lowest reported annualized standard deviation in both periods. At $J=200$, where assets outnumber observations in each rolling window, shrinkage methods have lower standard deviation. With transaction costs fixed at 50 basis points per trade, DNN-FM has the highest reported Sharpe ratio for every portfolio size: 0.478, 0.472, and 0.663 in the first period and 0.555, 0.529, and 0.650 in the second. Its turnover is below the shrinkage estimators but above simpler equal-weighted and linear-factor portfolios.

## Limitations

- Factor-count-independent rates rely on the additive compositional structure, bounded functions, common smoothness conditions, sparse bounded network weights, independent observations over time, observed factors, and subgaussian innovations. They do not establish dimension-free behavior for arbitrary nonlinear factor interactions or dependent financial time series.
- Covariance results permit $J>n$, but precision-matrix consistency does not. It requires $J\ll n$, $J^2\omega_n s_n\to0$, control of covariance eigenvalues, and symmetry of $\Sigma_u^{-1}\Sigma^f$; the paper notes commuting or conformably block-diagonal matrices as examples satisfying the symmetry condition.
- The threshold choice used in experiments is presented as a lower bound chosen to produce positive-semidefinite estimates in those runs, rather than as a general finite-sample guarantee.
- In the second simulation design, pairwise interactions violate the fitted additive structure and produce some factor-count sensitivity, especially for precision estimation in smaller samples.
- The empirical study uses one U.S. equity universe, monthly data, three observed factors, a single 120-month window, and one transaction-cost setting. It reports performance differences without uncertainty intervals or tests, and its best-volatility result does not extend to $J=200$.
- The paper is dated September 12, 2022 in the supplied manuscript; no venue, DOI, or arXiv identifier is given there.

## Related Concepts

- [[Deep Neural Network Factor Models]]
- Nonlinear factor models
- Sparse covariance estimation
- Adaptive covariance thresholding
- High-dimensional portfolio optimization
- Nonparametric additive models

## Related Papers

- Schmidt-Hieber (2020), "Nonparametric regression using deep neural networks with ReLU activation." Supplies the sparse compositional-network approximation framework extended here to subgaussian errors and multiple responses.
- Fan, Liao, and Mincheva (2011), "High-dimensional covariance matrix estimation in approximate factor models." Provides the principal linear-factor covariance and precision comparison.
- Fan, Liao, and Mincheva (2013), "Large covariance estimation by thresholding principal orthogonal complements." Supplies the POET benchmark used in the simulations and portfolio study.
- Freyberger, Neuhierl, and Weber (2020), "Dissecting characteristics nonparametrically." Studies additive nonlinear structure in expected stock returns using adaptive group lasso.
- Ledoit and Wolf (2017), "Nonlinear shrinkage of the covariance matrix for portfolio selection: Markowitz meets Goldilocks." Supplies nonlinear-shrinkage portfolio benchmarks.

[[index|Library home]]
