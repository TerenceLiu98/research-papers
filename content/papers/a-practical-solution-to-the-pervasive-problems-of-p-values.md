---
title: A practical solution to the pervasive problems of p values
type: paper
authors:
  - Eric-Jan Wagenmakers
year: 2007
tags:
  - statistical-inference
  - bayesian-model-selection
---

## TL;DR

Wagenmakers reviews three objections to interpreting Fisherian p values as evidence: dependence on unobserved outcomes, dependence on sampling intentions, and failure to maintain a common evidential meaning across sample sizes. He advocates model comparison and presents the [[concepts/bayesian-information-criterion|Bayesian Information Criterion]] as an accessible approximation to Bayesian hypothesis testing.

## Research Question

Can routine psychological analyses quantify evidence for competing hypotheses without relying solely on a tail probability under the null?

## Motivation

A p value is neither a posterior probability of a hypothesis nor a comparison with an alternative. The article distinguishes Fisherian evidential interpretation from Neyman–Pearson long-run error control, while noting their conflation in practice. Its criticism targets the former interpretation rather than establishing that all frequentist procedures are invalid.

## Contributions

- Explains sampling-distribution and stopping-rule dependence through concrete examples.
- Uses binomial comparisons to show that a fixed p value can accompany increasingly strong Bayesian support for a point null as sample size grows.
- Derives practical BIC-to-evidence transformations and illustrates their computation from ANOVA sums of squares.

## Method

The analysis compares marginal likelihoods: each model averages its likelihood over its parameter prior. The Bayes factor BF01 is the marginal likelihood under H0 divided by that under H1; posterior odds equal BF01 times prior odds. This can support the null as well as the alternative.

For maximum likelihood L, parameter count k, and sample size n, BIC = −2 log L + k log n. Defining ΔBIC10 = BIC(H1) − BIC(H0), the approximation is BF01 ≈ exp(ΔBIC10/2). With equal prior model probabilities, P(H0 | D) ≈ 1/[1 + exp(−ΔBIC10/2)]. The calculation avoids explicit prior elicitation, but is not prior-free: the article interprets it through a unit information prior.

For comparable normal linear models, ΔBIC10 = n log(SSE1/SSE0) + (k1 − k0) log n (Equation 14).

## Experiments

This is a theoretical review with constructed demonstrations, not a new empirical study.

| Demonstration | Reported result | Interpretation |
| --- | --- | --- |
| Nine correct answers out of twelve, uniform alternative prior | BF01 ≈ 0.70; equal-prior posterior P(H0 given D) ≈ .41 | Only weak support for the alternative |
| Repeated tests of accumulating normal observations under a true null | At least one nominal .05 result occurs with probability about .13 after four tests and .25 after twenty | Fixed-sample thresholds do not retain their nominal error rate under repeated inspection |
| Binomial data constructed to keep p approximately .05 | Uniform-prior BF01 ≈ 2.17 for 220/400 successes and 11.69 for 5,098/10,000 | Equal p values need not represent equal relative evidence |
| Synthetic 2 × 2 recall ANOVA, n = 40 | SSE1 = 470.1, SSE0 = 574.2, ΔBIC10 ≈ −4.31; interaction posterior ≈ .90 under equal model priors | Software output supports an approximate quantitative model comparison; interaction p = .0077 |

## Limitations

BIC is an approximation, and its implicit prior can be too diffuse when substantive prior information is available. Its parameter-count penalty ignores differences in functional-form flexibility, especially relevant for nonlinear models. The appropriate sample size can be ambiguous in hierarchical designs. Appendix B distinguishes a general bounded log-evidence approximation error from stronger prior-specific approximations. Model probabilities remain conditional on the candidate models and prior assumptions; they do not replace independent replication. The article deliberately emphasizes cases of disagreement between NHST and Bayesian analysis.

## Related Concepts

- [[concepts/bayesian-information-criterion|Bayesian Information Criterion]]: practical approximation connecting penalized fit to relative evidence.
- [[concepts/multiple-hypothesis-testing|Multiple Hypothesis Testing]]: repeated opportunities for rejection require error accounting; sequential inspection of one accumulating sample is distinct from testing a family of hypotheses.

## Related Papers

The source builds on Kass and Raftery (1995), *Bayes factors*, and Raftery (1995), *Bayesian model selection in social research*. Its synthetic ANOVA example comes from Glover and Dixon (2004), *Likelihood ratios: A simple and flexible statistic for empirical psychologists*.
