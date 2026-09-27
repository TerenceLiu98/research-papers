---
title: "How They Vote: Issue-Adjusted Models of Legislative Behavior"
type: paper
authors:
  - Sean M. Gerrish
  - David M. Blei
year: null
source_job_id: "de24fcdf-523c-43d2-9738-724e21ebd55b"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - topic-models
  - variational-inference
---

## TL;DR

Gerrish and Blei augment a legislator's general ideal point with issue-specific offsets, weighted by topics estimated from bill text. Across six U.S. Congresses, the model modestly improves held-out vote log likelihood and exposes voting patterns concealed by a single left-right ordering. The evaluation predicts missing votes on bills with observed votes, not votes on entirely unseen bills. Issue interpretations are exploratory and conditional on the text representation and voting model.

## Research Question

Can bill content explain systematic departures from a legislator's overall ideological position while preserving an interpretable general political scale?

## Motivation

A one-dimensional roll-call model assumes the same ordering of legislators across bills. Legislators who diverge from their party on particular issues can therefore be poorly represented even when aggregate prediction is strong. Adding unrestricted latent dimensions relaxes this restriction but makes substantive interpretation difficult. [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]] instead attach deviations to named policy topics.

## Contributions

- Extends a logistic ideal-point model with legislator-specific issue offsets and shrinkage toward the general position.
- Uses labeled topic estimates from bill text to connect voting deviations to policy areas.
- Develops a factorized variational approximation fitted with stochastic gradients.
- Evaluates held-out votes and permuted-topic controls, and decomposes training-fit changes by issue, legislator, and bill.

## Method

### Text-Conditioned Voting Model

For legislator $u$ and bill $d$, let $x_u$ be the general ideal point, $a_d$ the bill polarity, $b_d$ its popularity intercept, and $\mathbf z_u$ a vector of issue offsets. With estimated topic proportions $\bar{\boldsymbol\theta}_d=\mathbb E_q[\boldsymbol\theta_d\mid\mathbf w_d]$, the probability of a yes vote is

$$
\Pr(v_{ud}=\mathrm{yes})
=\sigma\!\left[a_d\left(x_u+\mathbf z_u^\top\bar{\boldsymbol\theta}_d\right)+b_d\right].
$$

For a bill entirely about issue $k$, the effective position is $x_u+z_{uk}$. Setting all offsets to zero recovers the ordinary one-dimensional model. Standard Normal priors regularize $x_u,a_d,b_d$, and Laplace priors regularize issue offsets. The latter encourage exact sparsity under MAP estimation and near-sparsity under Bayesian inference; the variational offsets are not guaranteed to be exactly zero.

### Issue Coding and Inference

The paper uses the 74 most frequent Congressional Research Service subject labels to define topics. Its labeled-LDA procedure estimates topic word distributions from tagged documents, then infers each bill's mixture from its words. Stop words are removed and common phrases grouped as n-grams. Topic expectations are computed before fitting the voting model and treated as fixed observations, so their uncertainty is not propagated into the voting posterior.

A fully factorized Gaussian variational family approximates the posterior over general positions, offsets, and bill parameters. Monte Carlo samples approximate gradients of the variational objective, optimized with decreasing step sizes. House and Senate models are fitted separately for each two-year Congress. The supplementary sections cited for implementation and significance-testing details are absent from the supplied Markdown.

## Experiments

### Data and Held-Out Votes

The study covers Congresses 106-111, spanning 1999-2010, using GovTrack roll calls with available bill text. It reports 865 unique lawmakers, 3,113 bills, and 1,208,709 votes. Six-fold cross-validation compares the standard model, the issue-adjusted model, and issue-adjusted models with topic vectors randomly reassigned across bills. Table 1 reports the following average test log likelihoods at regularization $\lambda=1$; higher is better.

| Chamber | Congress | Standard ideal point | Issue-adjusted | Permuted issues |
| --- | --- | --- | --- | --- |
| Senate | 106 | -0.209 | -0.208 | -0.210 |
| Senate | 107 | -0.209 | -0.209 | -0.210 |
| Senate | 108 | -0.182 | -0.181 | -0.183 |
| Senate | 109 | -0.189 | -0.188 | -0.203 |
| Senate | 110 | -0.206 | -0.205 | -0.211 |
| Senate | 111 | -0.182 | -0.180 | -0.186 |
| House | 106 | -0.168 | -0.166 | -0.210 |
| House | 107 | -0.154 | -0.147 | -0.211 |
| House | 108 | -0.096 | -0.093 | -0.100 |
| House | 109 | -0.120 | -0.116 | -0.123 |
| House | 110 | -0.090 | -0.087 | -0.098 |
| House | 111 | -0.182 | -0.180 | -0.187 |

The authors report improvements in every chamber and Congress, although the Senate's 107th Congress is tied at the displayed precision. Gains are small in aggregate. Correctly matched topics outperform the permuted-topic controls throughout; the experiment uses five permutations. This supports the predictive relevance of the bill-topic correspondence, without establishing a causal interpretation of the offsets.

The regularization study reports good generalization over $\lambda=0.0001$ to $1000$, with the best held-out log likelihood for $1\leq\lambda\leq10$. It fixes variational variances at $\exp(-5)$. The supplied text inconsistently labels the session for this analysis, preventing a reliable date assignment.

### Exploratory Findings

- In the 111th House, general ideal points from the two models correlate at 0.998. The authors report stronger party separation under the adjusted model, with permutation-test $p<0.001$ (Section 4.2).
- Procedural topics are among those with the largest training-fit gains and exhibit stronger partisanship. The authors interpret this as consistent with procedural cartel theory, rather than as a causal test of that theory.
- Section 4.4.2 reports Ron Paul's training accuracy increasing from 83.8% to 87.9%. His issue-level gains include international affairs, while some other issue areas fit worse. These are training diagnostics, not the held-out results above.
- Donald Young's offsets expose unusual votes on symbolic resolutions and landmark naming that his general ideal point does not reveal.
- The largest bill-level deterioration in the 111th House occurs for H.R. 3534, the Consolidated Land, Energy, and Aquatic Resources Act of 2010. The authors associate this failure with a diffuse mixture spanning several topics and suggest sparser bill representations as future work.

## Limitations

- Bill polarity and popularity require observed votes. The model cannot predict votes on a wholly held-out bill from text alone.
- Topic proportions are fixed estimates, and the factorized posterior omits dependencies among latent parameters. The supplied material does not establish calibrated uncertainty for issue positions.
- Fit improvements do not independently validate issue positions as sincere preferences or identify what causes legislative behavior. More parameters also make per-legislator training improvements easier to obtain.
- Results depend on the issue coding; bills spanning many topics can fit worse. The data exclude roll calls without available bill text, and separate session fits do not constitute a longitudinal trajectory model.
- Source inconsistencies matter for replication: Section 4.3 says Congresses 106-110 despite the six-session table and 1999-2010 coverage, and associates the 109th Congress with 1999-2000 in its sensitivity paragraph. Figure 5 calls the illustrated House members senators. An earlier passage gives Paul's baseline training accuracy as 80%, whereas Section 4.4.2 gives 83.8%; the paired comparison above follows the latter section.
- The source contains malformed mathematical notation and references unavailable supplementary sections A.1-A.5. Publication year, venue, and a stable paper identifier are not supplied, so these are not inferred from bibliography dates.

## Related Concepts

- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: topic-weighted departures from a legislator's general position.
- [[concepts/item-response-theory|Item Response Theory]]: the underlying respondent-item framework for roll-call probabilities.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the substantive question of whether one ordering adequately represents issue-dependent positions.

## Related Papers

- Gerrish and Blei (2011), "Predicting legislative roll calls from text": cited predecessor that predicts bill parameters from text for unseen-bill prediction; the present paper instead targets issue-specific legislator behavior.
- Ramage, Hall, Nallapati, and Manning (2009), "Labeled LDA: A supervised topic model for credit attribution in multi-labeled corpora": cited basis for connecting document topics to named labels.
- Clinton, Jackman, and Rivers (2004), "The statistical analysis of roll call data": cited Bayesian ideal-point foundation.
- [[papers/nonparametric-ideal-point-estimation-and-inference|Nonparametric Ideal-Point Estimation and Inference]]: a library comparison that tests shared ordinal rankings across issue groups under different assumptions; it is not cited in the supplied paper.

[[index|Library home]]
