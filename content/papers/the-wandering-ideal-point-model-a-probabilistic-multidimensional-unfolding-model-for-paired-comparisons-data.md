---
title: "The Wandering Ideal Point Model: A Probabilistic Multidimensional Unfolding Model for Paired Comparisons Data"
type: paper
authors:
  - Geert De Soete
  - J. Douglas Carroll
  - Wayne S. DeSarbo
year: 1986
tags:
  - paired-comparisons
  - multidimensional-unfolding
  - ideal-point-models
  - stochastic-transitivity
  - maximum-likelihood
---

## TL;DR

The paper introduces the [[concepts/wandering-ideal-point-model|Wandering Ideal Point Model]], a probabilistic multidimensional unfolding model in which a respondent's ideal point is resampled from a multivariate normal distribution for every paired comparison. Because choice depends on both proximity to the mean ideal point and separation between alternatives, the model satisfies moderate stochastic transitivity without requiring strong stochastic transitivity. A two-dimensional application to celebrity preferences fits substantially better than Thurstone's Case V model, and an isotropic version has the lowest AIC among the models compared.

## Research Question

Can a probabilistic multidimensional unfolding model represent pairwise choices affected by both utility and similarity, without imposing the strong stochastic transitivity that empirical choice proportions often violate?

## Motivation

Pairwise choices are not determined solely by scalar utility differences. Very dissimilar alternatives can elicit relatively moderate choice proportions even when their utilities differ, while similar alternatives can produce extreme proportions. Existing moderate-utility models often require a known feature structure, whereas the then-existing probabilistic multidimensional unfolding models appeared to retain strong stochastic transitivity. The authors seek a spatial model that learns the stimulus configuration and permits the weaker empirical regularity.

## Contributions

- Defines a probabilistic unfolding model with fixed stimulus locations and a normally distributed ideal point for each subject, newly sampled on every comparison.
- Derives paired-choice probabilities in probit form and permits subject-specific, nonidentity covariance matrices for ideal-point variation.
- Proves that the model implies moderate stochastic transitivity and provides a counterexample showing that it need not imply strong stochastic transitivity.
- Characterizes the single-subject case, including translation, rotation, and scale invariances and a diagonal covariance representation.
- Develops a Fisher-scoring maximum-likelihood procedure using a Moore-Penrose generalized inverse to accommodate parameter nonidentification.
- Demonstrates the model on replicated judgments about nine celebrities and compares it with Thurstone, factorial, and wandering-vector alternatives.

## Method

Each stimulus $j$ has a fixed point $\mathbf{x}_j$ in an $r$-dimensional Euclidean space. Subject $i$ has a trial-specific ideal point

$$
\mathbf{Y}_i \sim N(\boldsymbol{\mu}_i, \boldsymbol{\Sigma}_i).
$$

On a comparison of $j$ and $k$, the subject samples $\mathbf{y}_i$ and chooses whichever stimulus is closer. The resulting probability is

$$
p_{ijk}=\Phi(z_{ijk}),
$$

where

$$
z_{ijk}=\frac{\mathbf{x}_k'\mathbf{x}_k-\mathbf{x}_j'\mathbf{x}_j-2(\mathbf{x}_k-\mathbf{x}_j)'\boldsymbol{\mu}_i}{2\sqrt{(\mathbf{x}_k-\mathbf{x}_j)'\boldsymbol{\Sigma}_i(\mathbf{x}_k-\mathbf{x}_j)}}.
$$

The triangle inequality for the covariance-weighted stimulus distance establishes moderate stochastic transitivity. A numerical configuration with probabilities $0.98$, $0.69$, and $0.82$ supplies a direct violation of strong stochastic transitivity.

For one aggregate subject, the origin can be placed at the mean ideal point and the covariance matrix diagonalized. The paper fits the model by maximizing the binomial paired-comparison likelihood with Fisher scoring. Since translation, rotation, and scale transformations leave probabilities unchanged, the information matrix is rank deficient and its Moore-Penrose generalized inverse is used in the updates.

## Experiments

The illustration uses Rumelhart and Greeno's pairwise preferences from 234 undergraduates over nine celebrities: three politicians, three athletes, and three movie stars. Respondents are treated as replications, so the single-subject formulation applies. The paper compares two-dimensional unconstrained and isotropic WIP models with a saturated null model, Thurstone's Case V model, a two-dimensional factorial model, and a two-dimensional wandering vector model.

| Model | Effective parameters | AIC (reported with constant offset) | Test against saturated model |
| --- | ---: | ---: | ---: |
| Thurstone Case V | 8 | 718.7 | $\chi^2=81.6$, df = 28, $p<0.001$ |
| Factorial model, 2D | 22 | 672.1 | $\chi^2=7.0$, df = 14 |
| Wandering vector model, 2D | 16 | 668.8 | $\chi^2=15.4$, df = 20 |
| WIP model, 2D | 19 | 669.1 | $\chi^2=9.8$, df = 17 |
| WIP model, 2D, isotropic covariance | 17 | **665.1** | $\chi^2=10.1$, df = 19 |

The multidimensional models account for the data well, whereas Case V is rejected. Constraining the two wandering variances to equality changes the likelihood-ratio statistic by only $0.3$ on 2 degrees of freedom, so the restriction is not rejected. The isotropic WIP model has the best reported AIC, and its map separates politicians, athletes, and movie stars into clusters.

The appendix also reports a Monte Carlo check of the competing Zinnes-Griggs model: none of 20,000 randomly generated two- or three-dimensional configurations violated strong stochastic transitivity. This is evidence from simulation rather than a proof.

## Limitations

The empirical application contains only one aggregated paired-comparison matrix and nine stimuli, so it does not establish performance across domains or at the individual-subject level. The model's geometric invariances make its raw parameters nonunique, requiring constraints or generalized-inverse estimation. The paper leaves realistic covariance restrictions for multiple ideal-point distributions to future work. Its comparison with the Zinnes-Griggs model relies on a finite Monte Carlo study and an approximation to the doubly noncentral $F$ distribution, so the claimed strong-transitivity property remains suggestive rather than proven. Finally, the likelihood assumes independent paired-comparison observations.

## Related Concepts

- [[concepts/wandering-ideal-point-model|Wandering Ideal Point Model]]
- [[concepts/euclidean-preferences|Euclidean Preferences]]
- [[concepts/discrete-choice-unfolding-models|Discrete-Choice Unfolding Models]]
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]
- Moderate stochastic transitivity
- Paired comparisons

## Related Papers

- Carroll (1980), "Models and methods for multidimensional analysis of preferential choice (or other dominance) data": introduces the wandering vector model that motivates the unfolding analogue.
- De Soete and Carroll (1983), "A maximum likelihood method for fitting the wandering vector model": supplies the related estimation framework.
- Zinnes and Griggs (1974), "Probabilistic, multidimensional unfolding analysis": develops the principal probabilistic unfolding model used for comparison.
- Rumelhart and Greeno (1971), "Similarity between stimuli: An experimental test of the Luce and Restle choice models": provides the paired-comparison data.

[[index|Library home]]
