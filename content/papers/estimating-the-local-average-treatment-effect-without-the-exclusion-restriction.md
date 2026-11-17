---
title: "Estimating the Local Average Treatment Effect Without the Exclusion Restriction"
type: paper
authors:
  - Zachary Markovich
year: 2025
source_job_id: "140ed36e-11d4-42d3-87cd-6ca8fa19642d"
doi: "10.1017/pan.2025.10005"
tags:
  - causal-inference
  - noncompliance
  - political-methodology
---

## TL;DR

Compliance Probability Weighting (CPW) weights randomized treatment and control means by estimated complier probabilities. With consistent probability estimates and an ordering assumption on assignment effects, its probability limit is a lower bound on the complier effect. A stronger common-sign assumption yields conservatism in magnitude. This replaces point identification under exclusion or principal ignorability with assumption-dependent conservative estimation.

## Research Question

Can randomized experiments with noncompliance support informative inference about complier effects when the exclusion restriction and principal ignorability are implausible?

## Motivation

An advertisement can influence someone who fails a factual manipulation check, violating exclusion when that check defines treatment receipt. Directly conditioning on passing the check also selects on a post-treatment variable. Pre-treatment predictors of compliance offer a way to reweight the randomized comparison without selecting observed passers.

## Contributions

- Decomposes the gap between the intention-to-treat effect and the complier effect into covariate-composition differences and within-covariate effect differences.
- Shows how compliance-probability weights remove the composition component and establishes conditions for conservative limits.
- Compares CPW with IV and ITT in simulations and reanalyzes a political-advertising experiment.

## Method

Write assignment as $Z$, receipt as $T$, and complier status as $C=1\{T(1)=1,T(0)=0\}$. The paper defines $\tau=Y(1,T(1))-Y(0,T(0))$ and LATE as $E[\tau\mid C=1]$. Without exclusion, this is the assignment effect among compliers, including possible direct assignment pathways; it is not an isolated receipt effect.

Estimate $q(X)=P(C=1\mid X)$ from pre-treatment covariates, then subtract the control outcome mean weighted by $\hat q$ from the similarly weighted treatment mean, normalizing within each arm. Section 5 gives the limit

$$
\theta_{CPW}=\int E[\tau\mid X=x]f_{X\mid C=1}(x)\,dx.
$$

Random assignment, sampling and moment conditions, SUTVA, positive complier probabilities, and consistent estimation of $q$ underpin the result. Assumption 8 requires the complier-distribution average of $E[\tau\mid X,C=1]-E[\tau\mid X]$ to be nonnegative, implying $\theta_{CPW}\leq LATE$. Assumption 9 additionally orders effects within every covariate stratum and gives them a common sign, implying $|\theta_{CPW}|\leq|LATE|$. The weaker condition alone does not establish attenuation toward zero.

The theorem does not directly require monotonicity, but identifying complier probabilities requires additional assumptions. The implemented heterogeneous-first-stage approach uses monotonicity; the application invokes one-sided noncompliance. Bootstrap methods supply uncertainty estimates, distinct from the conservatism of the estimand.

## Experiments

Simulations use 100 datasets per parameter combination, sample sizes from 100 to 1,000, and 10 covariates. Compliance-prediction strength varies through $\sigma\in\{0,1,10\}$; noncomplier effects are 0, 0.25, or 0.5, against a complier effect of 1. CPW resembles ITT with uninformative covariates and improves as compliance becomes predictable. IV performs well under exclusion but overestimates as noncomplier effects increase (Section 6).

The Kalla and Broockman (2022) reanalysis uses regional ad assignment, knowledge of an embedded immigration fact as receipt, and an immigration-attitude index as outcome. Section 7 reports CPW **0.092**, with 95% interval **[0.034, 0.11]**, compared with ITT **0.0089**, interval **[-0.025, 0.043]**. The authors interpret this as evidence of persuasion among attentive compliers; it does not establish a comparable effect across the electorate.

## Limitations

Complier-probability misspecification defeats the guarantee. Weak predictors can add variance without reducing the gap from LATE. Effect ordering and common-sign restrictions require substantive justification, and a conservative probability limit is not point identification or a general finite-sample confidence-coverage guarantee. Supplementary proofs and additional simulations are referenced but absent from the supplied Markdown. The parsed weight formula has inconsistent summation indices; the description above follows the stated within-arm weighted-mean procedure.

## Related Concepts

- [[concepts/compliance-probability-weighting|Compliance Probability Weighting]]: reweights assignment effects toward the covariate distribution of compliers.

## Related Papers

- Kalla and Broockman (2022), “Outside Lobbying” Over the Airwaves: A Randomized Field Experiment on Televised Issue Ads: source of the empirical reanalysis.
- Ding and Lu (2017), Principal Stratification Analysis Using Principal Scores: prior principal-score framework discussed by the paper.
- [[papers/how-much-should-we-trust-instrumental-variable-estimates-in-political-science-practical-advice-based-on-67-replicated-studies|How Much Should We Trust Instrumental Variable Estimates in Political Science?]]: related library treatment of IV validity and inference; this paper cites its earlier 2023 version titled around over 60 replicated studies.

Replication materials: [Dataverse](https://doi.org/10.7910/DVN/Y6JJ0A). Article and supplementary-material identifier supplied in the source: [publisher DOI](https://doi.org/10.1017/pan.2025.10005).
