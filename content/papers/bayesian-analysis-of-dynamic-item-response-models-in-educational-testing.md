---
title: Bayesian Analysis of Dynamic Item Response Models in Educational Testing
type: paper
authors:
  - Xiaojing Wang
  - James O. Berger
  - Donald S. Burdick
year: 2013
venue: The Annals of Applied Statistics
volume: 7
issue: 1
pages: "126-153"
doi: "10.1214/12-AOAS608"
source_job_id: "e83c5658-27be-4ef8-b454-0ab60c4bd66c"
tags:
  - item-response-theory
  - longitudinal-data
  - educational-assessment
  - bayesian-state-space-models
---

## TL;DR

Wang, Berger, and Burdick introduce [[concepts/dynamic-item-response-models|Dynamic Item Response Models]], which embed a longitudinal ability process in logistic [[concepts/item-response-theory|Item Response Theory]] while adding day-, test-, and item-level variation. A Bayesian analysis supports retrospective trajectory estimation and real-time filtering at irregular test times. In a 25-student reading-test application, the estimated day and test effects provide strong evidence against local independence, and the proposed online estimates are closer to retrospective estimates than MetaMetrics' existing procedure under the paper's surrogate-truth comparison.

## Research Question

How can an item-response model estimate a student's changing ability from irregular longitudinal tests while accounting for uncertain item difficulties and dependence among responses taken on the same day or test?

## Motivation

Classical IRT treats a respondent's ability as fixed and assumes responses are conditionally independent given ability and item difficulty. Neither premise fits long-running computer-adaptive instruction: ability can change between unevenly spaced sessions, several responses can share day- or article-level influences, and automatically generated items are usually seen only once, preventing ordinary item calibration. The MetaMetrics Computer Adaptive Instruction and Testing application additionally needs both retrospective learning trajectories and online estimates for selecting reading material.

## Contributions

- Defines a state-space extension of one-parameter logistic IRT for continuously changing ability observed at irregular times.
- Separates local dependence into student-specific daily and within-day test random effects, while representing generated-item difficulty as variation around a known article-level ensemble mean.
- Supports individual or hierarchical initialization and both full-data retrospective inference and data-to-date online inference.
- Develops a block Gibbs sampler that combines logistic data augmentation with forward filtering and backward sampling of the full latent ability trajectory.
- Establishes posterior propriety under mild response-pattern conditions and evaluates the model with simulation and reading-assessment data.

## Method

For student $i$, day $t$, test $s$, and item $l$, the response probability is

$$
\Pr(X_{itsl}=1)=\operatorname{logit}^{-1}(\theta_{it}-a_{its}+\varphi_{it}+\eta_{its}+\varepsilon_{itsl}).
$$

Here $\theta_{it}$ is ability, $a_{its}$ is the known ensemble mean difficulty of the article, $\varepsilon_{itsl}\sim\mathcal N(0,\sigma^2)$ captures uncertainty in a generated item's difficulty, $\varphi_{it}$ is a daily random effect, and $\eta_{its}$ is a test effect. Test effects within a day are constrained to sum to zero so they are not confounded with the daily effect. Student-specific precisions allow the sizes of day and test effects to differ across students.

Ability evolves according to

$$
\theta_{it}=\theta_{i,t-1}+c_i(1-\rho\theta_{i,t-1})\Delta^+_{it}+w_{it},
\qquad w_{it}\sim\mathcal N(0,\phi^{-1}\Delta_{it}).
$$

The drift favors positive growth through $c_i\geq0$, tapers as ability rises through the fixed parameter $\rho$, and uses capped elapsed time $\Delta^+_{it}=\min(\Delta_{it},\Delta_{T\max})$. The uncapped interval remains in the innovation variance, so a long gap raises uncertainty without forcing indefinitely large expected growth. Process noise lets observed trajectories decline despite the positive-growth prior.

The authors use grade-based normal priors for initial ability and objective improper priors for growth and precision parameters. They express the logistic distribution as a normal scale mixture, augment each binary response with a truncated-normal latent variable, and integrate out item deviations. Conditional on the other variables, the ability path becomes a dynamic linear model and is sampled as a block by forward filtering and backward sampling. Remaining parameters and random effects are updated in Gibbs or Metropolis-within-Gibbs steps.

## Experiments

### Simulation

The simulation contains 10 students, 50 test days per student, four tests per day, and 10 items per test, with irregular intervals and both smooth and strongly nonmonotonic generated ability paths. Across the 500 student-day abilities, nominal 95% credible intervals cover the true value 98.3% of the time. For the reported growth and variance parameters, all but one test-effect standard deviation are covered, giving 96.77% empirical coverage. The model follows smooth growth closely and adapts to nonmonotonic paths only after evidence overcomes its growth-favoring prior.

### MetaMetrics Reading Tests

The underlying database contains 1,983 Mississippi students observed between 2007 and 2009; the reported analysis uses 25 students with different grades, entry times, test schedules, and numbers of responses. Automatically generated cloze items inherit an article's known Lexile-based mean difficulty, with the item-deviation standard deviation fixed by the test design.

Retrospective trajectories generally increase but can decline after long gaps. The 95% credible intervals for nearly all student-specific day- and test-effect standard deviations are well separated from zero, which the authors interpret as strong evidence that local independence is untenable in these data. The estimated process-noise standard deviation is 0.0612 with a 95% credible interval of [0.0477, 0.0757].

For online estimation, the model conditions only on observations available through each date and fixes the process-noise standard deviation at the retrospective estimate of 0.0612. Using retrospective posterior medians as a surrogate rather than observed ground truth, the proposed online estimates have mean squared error 0.0851, compared with 0.1311 for MetaMetrics' then-current partial Bayesian estimates. The online intervals rarely exclude the retrospective estimates, but online paths are more variable than retrospective ones.

## Limitations

- The empirical analysis reports a selected sample of 25 students from a database of 1,983, so it does not establish population-level predictive performance or broad generalizability.
- The online comparison treats retrospective estimates from the same model as a proxy for truth and fixes process noise using the retrospective analysis. It is not an external validation against known ability.
- Positive drift encodes expected learning. Although process noise permits declines, simulations show that this prior can delay adaptation to sharply nonmonotonic trajectories.
- Article ensemble means, item-difficulty variance, and the saturation parameter $\rho$ are supplied by the test system rather than jointly validated in this analysis.
- The observation model is one-dimensional and holds ability constant within a day. Extensions to two- or three-parameter IRT and student-specific saturation are proposed but not evaluated.
- The method uses a high-dimensional MCMC procedure; the paper does not provide a systematic runtime or scalability study for the full 1,983-student database.

## Related Concepts

- [[concepts/dynamic-item-response-models|Dynamic Item Response Models]]: the paper's combination of longitudinal latent ability, response dependence, and uncertain item difficulty.
- [[concepts/item-response-theory|Item Response Theory]]: supplies the logistic respondent-item measurement model.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: a related state-space treatment of changing latent positions in political measurement.

## Related Papers

- Bradlow, Wainer, and Wang (1999), "A Bayesian Random Effects Model for Testlets": cited foundation for representing within-test response dependence with random effects.
- Czado and Song (2008), "State Space Mixed Models for Longitudinal Observations with Binary and Binomial Responses": cited state-space treatment of longitudinal discrete outcomes.
- Martin and Quinn (2002), "Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953-1999": cited dynamic latent-position model using a first-order Markov process.
- West and Harrison (1997), *Bayesian Forecasting and Dynamic Models*: cited foundation for dynamic linear modeling and filtering.

[[index|Library home]]
