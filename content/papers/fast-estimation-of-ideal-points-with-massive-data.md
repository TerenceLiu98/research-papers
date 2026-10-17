---
title: Fast Estimation of Ideal Points with Massive Data
type: paper
authors:
  - Kosuke Imai
  - James Lo
  - Jonathan Olmsted
year: 2016
doi: "10.1017/S000305541600037X"
source_job_id: "61323028-3717-46c0-8a80-9dd24f10321e"
tags:
  - ideal-point-estimation
  - political-methodology
  - variational-inference
  - expectation-maximization
---

## TL;DR

Imai, Lo, and Olmsted derive EM and variational EM algorithms that make large ideal-point models substantially faster to estimate. Across roll calls, surveys, judicial votes, and social networks, reported point estimates closely resemble MCMC estimates at much lower computational cost. Uncertainty requires separate treatment: the paper uses parametric bootstrap, which can underestimate standard errors for actors with many missing responses.

## Research Question

Can analytically tractable updates make Bayesian ideal-point estimation scalable across large, heterogeneous datasets while retaining useful point estimates and uncertainty measures?

## Motivation

Jointly scaling voters and politicians, linking institutions, and estimating trajectories across many periods produce far more parameters than a single legislative roll-call matrix. Slow MCMC estimation can force researchers to split datasets or simplify temporal models. The paper develops computational alternatives within established measurement models and implements them in the R package `emIRT`.

## Contributions

- Closed-form EM updates for the standard binary probit ideal-point model, using conditional maximization for actor and item parameters.
- A reparameterized three-category ordinal model supporting mixed binary, ordinal, and continuous outcomes.
- Variational algorithms for dynamic and covariate-based hierarchical models, generalized Wordfish with multiple documents per actor, and a network distance model.
- Empirical and simulated comparisons of runtime and point recovery, plus a parametric-bootstrap assessment of estimation uncertainty.

## Method

### Binary and Mixed Outcomes

The standard model uses latent propensities

$$
y^*_{ij}=\alpha_j+\mathbf{x}_i^\top\boldsymbol\beta_j+\epsilon_{ij},
\qquad \epsilon_{ij}\sim N(0,1),\qquad y_{ij}=\mathbf{1}(y^*_{ij}>0).
$$

Independent Gaussian priors regularize actor positions and item coefficients. The E-step computes truncated-normal conditional means of propensities; alternating conditional maximization updates positions and item parameters. The target is the joint posterior mode for positions and item parameters, rather than the marginal likelihood obtained by integrating positions out. Missing votes are treated as ignorable. Correlations between successive parameter blocks provide the stopping rule, with scale and orientation handled through identification and rescaling conventions.

For three-category responses, a transformation fixes latent thresholds at zero and one and replaces their original values with an intercept and item-specific variance. Conjugate priors are changed accordingly, so this is not simply a computational rewrite of an identical prior model. Responses with more than three categories are coarsened; continuous observations can enter the mixed-outcome formulation directly.

### Structured and Non-Roll-Call Models

- **Dynamic:** [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]] use Gaussian random-walk priors. The variational factorization separates actors, item parameters, and latent propensities but retains dependence across an actor's trajectory. Forward-backward variational Kalman updates estimate those trajectories.
- **Hierarchical:** Positions are group-specific linear functions of covariates plus Gaussian residuals, with group-specific residual variances. Variational updates approximate the posterior. A constrained special case represents legislator-specific linear time trends comparable to DW-NOMINATE.
- **Text:** Generalized Wordfish models term counts with a Poisson log mean combining document verbosity, term frequency, term discrimination, and actor position. Multiple documents can share an actor position; local variational approximations provide updates.
- **Networks:** A probit model makes following more likely when user and politician positions are close in squared Euclidean distance, controlling for user activity and politician popularity. Variational position updates additionally use second-order Taylor approximations.

### Uncertainty

Fit the model, simulate responses from fitted probabilities while preserving the observed missingness pattern, and refit each replicate. Bootstrap estimates are aligned to a common scale before summarizing uncertainty. These intervals concern repeated sampling under the assumed model; they are distinct from Bayesian posterior credible intervals. The paper cautions that variational posterior variances themselves are often too small.

## Experiments

Reported runtimes are illustrative comparisons under the paper's hardware, implementations, initializations, and stopping rules, not universal speedup guarantees.

| Setting | Data and comparison | Reported result |
| --- | --- | --- |
| Congressional roll calls | House and Senate, sessions 102-112; comparisons with `pscl::ideal`, W-NOMINATE, and optimal classification | For the 102nd House, high-precision EM takes about 6 seconds versus over 2.5 hours for MCMC; EM with 100 bootstrap replicates takes under a minute. Most point estimates closely agree after rescaling. |
| Binary-model simulation | Up to 10,000 legislators and 1,000 bills | High-precision EM takes under 15 minutes versus about 2.5 hours for W-NOMINATE at that size. |
| Japanese candidate and voter surveys | 19,443 respondent-wave records, 98 questions; three-category EM versus customized three- and five-category MCMC | EM takes 68 seconds; MCMC takes 3 hours 54 minutes and 4 hours 24 minutes, respectively. Politician estimates correlate above 0.95 with both MCMC versions. |
| Supreme Court trajectories | 45 justices, 77 terms, 5,164 case votes; 697 justice-term positions | Variational EM takes 4 seconds versus just over 5 days for 1.2 million MCMC iterations; 100 bootstrap replicates finish within several minutes. Overall position correlation is 0.93, rising to 0.96 without Douglas. |
| Historical House linear trends | 10,474 legislators, 36,177 positions, 48,381 bills | Eight-thread estimation takes just under 5 hours; positions correlate 0.97 with DW-NOMINATE. |
| Generalized Wordfish simulation | Largest case: 1,000 actors, 5,000 words, 100,000 documents | Estimation finishes in under 2.5 hours; position correlations with truth exceed 0.99 across the reported simulations. |
| Twitter follow network | 10,000 users and 176 political elites, a subset of the replication data | Variational EM takes 35 minutes versus 6.5 days for 500 RStan posterior draws; the paper reports close agreement for both user and elite positions. |

A separate binary-model uncertainty study simulates 1,000 roll-call datasets from fitted 112th House parameters and uses 100 bootstrap replicates per dataset. Standard-error bias is associated with missingness rather than systematically with ideological extremity. Hierarchical simulations show weaker recovery and greater prior sensitivity when the number of groups is small.

## Limitations

- EM point estimates do not characterize the full posterior. Variational factorization and the additional approximations for text and networks can affect both estimates and uncertainty.
- Missingness is assumed ignorable. Actors with over 40% missing votes account for conspicuous discrepancies in congressional point estimates, and heavy missingness can cause bootstrap standard errors to be too small.
- Ordinal coarsening sacrifices information, and the conjugate reparameterization changes priors. Agreement in the Japanese survey does not establish harmless coarsening in other datasets.
- Timing comparisons depend on stopping criteria and implementation. Close point estimates do not establish equivalent posterior inference or calibrated interval coverage.
- The supplied text has internal inconsistencies: Figure 10's caption gives different dynamic-simulation timing and position counts from its surrounding prose; the largest hierarchical simulation's stated position total does not match its listed group dimensions; and the historical House section and Figure 12 differ on the final Congress covered. Those conflicting summaries are not used as precise benchmark claims here. Several parsed update equations are also visibly corrupted and should be checked against the original article before implementation.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: actor positions and item discrimination define the response model.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal dependence is retained within each variational trajectory.
- [[concepts/text-scaling-models|Text Scaling Models]]: the generalized Wordfish extension links counts to actor positions.
- [[concepts/social-media-ideal-point-estimation|Social Media Ideal Point Estimation]]: the network application infers positions from following behavior.
- [[concepts/variational-louis-method|Variational Louis' Method]]: a related approach to recovering uncertainty without repeated bootstrap refits.

## Related Papers

- Clinton, Jackman, and Rivers (2004), "The Statistical Analysis of Roll Call Data": the Bayesian binary model whose estimation is accelerated here.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": the random-walk model and MCMC comparison.
- Quinn (2004), "Bayesian Factor Analysis for Mixed Ordinal and Continuous Responses": the mixed-outcome modeling foundation.
- Slapin and Proksch (2008), "A Scaling Model for Estimating Time-Series Party Positions from Texts": the Wordfish model extended to multiple documents per actor.
- Lewis and Poole (2004), "Measuring Bias and Uncertainty in Ideal Point Estimates via the Parametric Bootstrap": the uncertainty procedure adopted here.
- [[papers/uncertainty-aware-ideal-point-estimation-via-variational-em|Uncertainty-Aware Ideal Point Estimation via Variational EM]]: a library connection addressing standard-error computation through variational Louis information; it cites this paper.

Source DOI: `10.1017/S000305541600037X`. Replication-data DOI reported in the references: `10.7910/DVN/HAU0EX`.

[[index|Library home]]
