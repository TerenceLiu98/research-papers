---
title: A Multinomial Framework for Ideal Point Estimation
type: paper
authors:
  - Max Goplerud
year: 2019
doi: "10.1017/pan.2018.31"
source_job_id: "e0862aaa-144d-4f39-9f81-9247356810cd"
tags:
  - ideal-point-estimation
  - item-response-theory
  - bayesian-measurement
  - survey-nonresponse
---

## TL;DR

The multinomial ideal-point framework (mIRT) combines stick-breaking response probabilities with Polya-Gamma augmentation to fit mixed binary, ordinal, and unordered categorical items using Gibbs sampling or an EM algorithm without variational approximation. Simulations and four empirical comparisons support position recovery in the tested settings. A 2008 ANES application models nonresponse as a response category and finds item-specific ideological patterns, but does not establish respondents' motives for withholding answers.

Published in *Political Analysis* 27:69-89 (2019), with online publication on 9 October 2018. Replication data are identified in the paper by DOI `10.7910/DVN/LD0ITE`.

## Research Question

Can one tractable ideal-point framework accommodate heterogeneous categorical responses and common model extensions while allowing nonresponse to carry information about the latent scale?

## Motivation

Binary and ordinal scaling methods can discard unordered responses, collapse richer scales, or treat nonresponse as ignorable. A flexible multinomial model permits those responses to contribute to measurement without forcing a "don't know" category into an assumed ordinal position. A common estimation framework also reduces the need for a separate inference procedure for every extension.

## Contributions

- Applies [[concepts/stick-breaking-multinomial-models|Stick-Breaking Multinomial Models]] to multidimensional two-parameter IRT with varying numbers of categories across items.
- Derives an exact augmentation-based EM procedure targeting joint posterior modes and a corresponding Gibbs sampler for posterior inference.
- Shows how covariates, network structure, and dynamic priors can enter the framework while retaining the augmentation strategy.
- Uses category-specific response curves to explore ideological nonresponse in an ANES moral-values scale.

## Method

### Response Model

For respondent $i$, item $j$, and ordered category index $k<K_j$, define a conditional stopping probability

$$
\sigma_{ij}^{k}=\operatorname{logit}^{-1}\left(\kappa_j^k+(\beta_j^k)^\top x_i\right).
$$

The unconditional probabilities are

$$
p_{ij}^{k}=\sigma_{ij}^{k}\prod_{n<k}(1-\sigma_{ij}^{n}),
\qquad
p_{ij}^{K_j}=\prod_{n<K_j}(1-\sigma_{ij}^{n}).
$$

Here $x_i$ is the latent position, and intercepts and discrimination vectors vary by item and category. Each observed response contributes binary decisions only through its stopping category (Equations 3-6). Binary [[concepts/item-response-theory|Item Response Theory]] is the two-category case. Ordinal items can follow their substantive order, while unordered items require a chosen computational order. Linear stick-breaking logits and linear softmax logits impose different functional forms; the probability factorization does not make those fitted models identical.

### Estimation and Extensions

Polya-Gamma latent weights make the complete-data log-likelihood quadratic in the linear predictors. For a reached binary decision with predictor $\psi$, the E-step uses

$$
\mathbb E[\omega\mid\psi]=\frac{\tanh(\psi/2)}{2\psi},
$$

with continuous limit $1/4$ at zero. Gaussian priors then permit conditional maximization over positions, discrimination parameters, and intercepts. The paper uses standard normal priors for positions and diffuse normal priors for item parameters, with default intercept prior means informed by empirical stick-breaking frequencies (Section 3).

"Exact" refers to the augmentation and conditional expectation, without a variational likelihood approximation. It does not supply posterior uncertainty from a mode alone or guarantee a global optimum. The ANES analysis initializes Gibbs sampling at the EM estimates and summarizes predicted probabilities with posterior medians and 95% credible intervals.

Observed covariates change the predictor; [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]] change the prior linking positions across periods. A squared-distance network specification retains the augmentation but requires more complicated conditional maximization (Section 4).

## Experiments

| Setting | Design | Reported evidence |
| --- | --- | --- |
| Multinomial simulation | 2,000 individuals and 100 questions, with varying category counts | Ideal points are strongly correlated with generating positions. Sparse categories weaken recovery of discrimination parameters. |
| Sparse-category comparison | Table 1, maximum category count $M=20$ | Discrimination correlations with truth are 0.818 in the lowest response-count quartile, 0.953 in the middle two quartiles, and 0.984 in the highest quartile. |
| Canonical empirical comparisons | 82nd Congress, dynamic US Supreme Court votes, dynamic UN votes, and the Asahi Todai voter survey | Positions are highly correlated with emIRT and the relevant NOMINATE or MCMC baselines; the supplied prose does not give exact correlations for these plots. |
| ANES moral values | Approximately 25 items from 2008; 2,102 respondents | The mIRT scale correlates 0.898 with a factor-analysis scale; 409 respondents did not answer at least one item (Figure 4). |

For ANES, nonresponse is a separate category on items with more than 1% nonresponse. Ten items receive detailed nonresponse curves. On selected feeling thermometers, conservative positions have predicted nonresponse probabilities around 0.10. Liberal positions also show nonresponse on the Bible item. These associations are consistent with the paper's social-desirability interpretation, but they do not distinguish that mechanism from other reasons for nonresponse. The same-sex-marriage example places civil unions near the center of the recovered scale despite their later position in the category ordering (Section 6).

## Limitations

- Category order matters to the functional form. The paper reports correlations above 0.99 across tested orderings, but offers no general invariance guarantee. It recommends checking alternative orders and flags very many or sparsely populated categories as concerns.
- Sparse response categories can leave item parameters weakly estimated or prior-sensitive even when pooled ideal points recover well. Claims about response curves require uncertainty estimates.
- Similarity to other estimators is not independent validation of the latent construct. Logistic versus probit links, posterior modes versus means, and different categorical specifications complicate comparisons.
- Modeling nonresponse as a category does not identify unobserved substantive answers or prove social desirability, ideological extremism, or deliberate refusal. The application is explicitly exploratory, and small nonresponse categories are not all modeled separately.
- Multidimensional positions require identification constraints. EM convergence and a sampler initialized at a fitted mode do not alone establish full posterior exploration.
- The supplied Markdown contains the main article and references but not Appendices A-D, which are cited for ordering checks, identification, dynamic updates, and missing-data treatment. Some parsed equations are corrupted; the summary retains the core probability model rather than reproducing uncertain update expressions. The simulation prose lists maximum category counts of 3, 5, 10, 15, and 20, while Table 1 also includes 12.

## Related Concepts

- [[concepts/stick-breaking-multinomial-models|Stick-Breaking Multinomial Models]]: decomposes categorical probabilities into sequential binary decisions.
- [[concepts/item-response-theory|Item Response Theory]]: links observed answers to respondent positions and item characteristics.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: motivates retaining information in nonresponse; the categorical approach differs from a separate participation hurdle.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: temporal priors are one extension of the framework.

## Related Papers

- Imai, Lo, and Olmsted (2016), "Fast estimation of ideal points with massive data": cited scalable EM framework and empirical comparator.
- Linderman, Johnson, and Adams (2015), "Dependent multinomial models made easy: Stick-breaking augmentation": cited basis for combining multinomial factorization with tractable augmentation.
- Polson, Scott, and Windle (2013), "Bayesian inference for logistic models using Polya-Gamma latent variables": cited augmentation identity.
- [[papers/uncertainty-aware-ideal-point-estimation-via-variational-em|Uncertainty-Aware Ideal Point Estimation via Variational EM]]: a library comparison using Polya-Gamma augmentation with variational inference and approximate information-based standard errors; not a citation in this article.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: a library comparison using mixed response distributions, temporal priors, and a nonresponse hurdle; not a citation in this article.

[[index|Library home]]
