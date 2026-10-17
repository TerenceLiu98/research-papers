---
title: Multidimensional multiple group IRT models with skew normal latent trait distributions
type: paper
authors:
  - Juan L. Padilla
  - Caio L.N. Azevedo
  - Victor H. Lachos
year: 2018
doi: "10.1016/j.jmva.2018.05.003"
source_job_id: "d21dd732-c4e6-462d-bdd6-bd45c9248d55"
tags:
  - item-response-theory
  - latent-trait-estimation
  - bayesian-inference
  - skew-normal-distributions
---

## TL;DR

The paper extends multidimensional multiple-group IRT with group-specific skew-normal latent distributions whose means and covariances are parameterized separately from asymmetry. Bayesian estimation and posterior predictive checks support a two-dimensional skew-normal model for 3,000 university entrance-exam candidates, with asymmetry detected in three of six groups. Model-selection criteria disagree about dimensionality, and the two retained factors lack clear subject-area interpretations.

## Research Question

Can a multiple-group multidimensional IRT model accommodate asymmetric latent populations while retaining interpretable population moments, practical scale constraints, Bayesian estimation, and diagnostics for dimensionality and model fit?

## Motivation

Normal latent distributions can be restrictive when ability populations are asymmetric. In an ordinary skew-normal parameterization, location and dispersion are not the actual mean and covariance, which complicates fixing a reference population's measurement scale. [[concepts/centered-skew-normal-latent-trait-distributions|Centered Skew-Normal Latent Trait Distributions]] address this by exposing the moments directly while allowing group-specific asymmetry.

## Contributions

- Defines a multivariate centered skew-normal parameterization and embeds it in a compensatory three-parameter probit MIRT model with shared item parameters and group-specific population distributions.
- Discusses reference-group and loading restrictions for diagonal and full covariance structures.
- Develops data-augmented Metropolis-Hastings within Gibbs estimation and posterior predictive diagnostics at population, group, and item levels.
- Uses replicated tetrachoric-correlation eigenvalues alongside deviance-based criteria to assess dimensionality.

## Method

For item $i$, respondent $j$, and observed group $k$, the response probability is

$$
P(Y_{ijk}=1\mid\theta_{jk},a_i,b_i,c_i)
=c_i+(1-c_i)\Phi(a_i^\top\theta_{jk}-b_i),
\qquad
\theta_{jk}\sim\mathrm{SNCP}_D(\mu_k,\Psi_k,\delta_k).
$$

Here $a_i$ is a discrimination vector, $b_i$ a threshold, $c_i$ the guessing lower asymptote, and $\Phi$ the standard normal CDF. Multiple traits contribute additively to the probit predictor. The groups are known populations, not inferred mixture classes (Section 2.2).

The centered distribution transforms a standardized skew-normal vector by subtracting its mean, whitening its covariance, and applying the desired population covariance and mean. Consequently, $\mu_k$ and $\Psi_k$ are the actual first two moments. A conditional normal representation with a half-normal auxiliary variable supports sampling; zero asymmetry recovers the normal case (Section 2.1).

The reference group has zero mean and either identity covariance or unit marginal variances with estimated correlations. For diagonal covariances, the authors discuss zero and sign restrictions on discriminations. For full covariances, Section 2.3.2 claims that nonzero reference-group correlations remove the need for discrimination restrictions. This is the paper's identification claim; centered moments alone should not be read as a general resolution of [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]] or coordinate labeling.

Response augmentation introduces normal probit variables and Bernoulli guessing indicators. Population priors include normal means, inverse-Wishart covariances, and beta-based asymmetry priors; guessing probabilities have beta priors. Covariance and asymmetry updates use Metropolis-Hastings, while other updates use available Gibbs conditionals. The asymmetry proposals respect the joint constraint $\delta_k^\top\delta_k<1$. The reported sampling schedule is 55,000 iterations, 5,000 burn-in iterations, and thinning by 50, yielding 1,000 retained draws (Section 3.1).

Posterior predictive checks compare observed and replicated score distributions, item success proportions, and chi-square discrepancies. Replicated tetrachoric-correlation eigenvalues assess whether candidate dimensions reproduce the response dependence structure. DIC, EAIC, and EBIC supply additional model comparisons. Missing-by-design responses are supported; other ignored missing responses require the paper's missing-at-random assumption (Sections 3.1-3.3).

## Experiments

### Campinas Entrance Exam

The application uses the first stage of the University of Campinas 2013 admission exam. A sample of 3,000 candidates who answered all items is divided equally among six intended study areas: Arts, Biological and Health Sciences, Exact and Earth Sciences, Humanities, Medicine, and Technological Sciences. Item 43 is removed for negative biserial correlation, leaving 47 of 48 multiple-choice items. Group 2 is the reference population (Section 4).

Six models cross normal versus centered skew-normal populations with one, two, or three dimensions. The deviance criterion, called EDIC in the application text, and EAIC favor two-dimensional MSNCP; EBIC favors one-dimensional MSNCP. Observed-versus-replicated eigenvalue comparisons favor two dimensions, which the authors retain.

| Evidence | Reported result |
| --- | --- |
| Distribution shape | Groups 1, 2, and 5 show asymmetry in at least one dimension. |
| Group 1, dimension 2 asymmetry | Posterior mean 0.79; 95% credible interval [0.49, 0.94]. |
| Group 2, dimension 1 asymmetry | Posterior mean -0.76; 95% credible interval [-0.99, -0.17]. |
| Group 5, dimension 1 asymmetry | Posterior mean -0.73; 95% credible interval [-0.98, -0.49]. |
| Predictive fit | Group-level posterior predictive p-values range from 0.12 to 0.95; score plots and item checks indicate adequate fit for most items. |
| Factor interpretation | Loadings do not yield a clear subject-area pattern, even after rotation. |

The asymmetry estimates are from Table 2; fit and interpretation follow Section 4 and Figures 2-10. These diagnostics concern the fitted sample rather than held-out predictive accuracy.

### Simulation Evidence

The authors report better estimation than the symmetric model when data arise from MSNCP populations and state that parameters are recovered adequately. Detailed simulation evidence is referred to the online supplement or described as not shown; the supplied Markdown does not provide numerical recovery comparisons. These statements are reported claims, not independently reproduced results.

## Limitations

- Evidence in the supplied main text centers on one exam and complete responders. It does not establish robustness to heavy tails, multimodality, or nonignorable nonresponse; skew-$t$ distributions and other links are future work.
- Dimensionality is not unanimous across criteria, and predictive support for two dimensions does not establish substantive names for the factors.
- The full-covariance identification argument is stated by the authors with its proof deferred to the supplement. General implementation requires checking the applicable constraints and remaining sign or permutation ambiguities.
- The parsed text contains damaged equations and inconsistent entries. For example, Group 5's correlation interval is printed as [0.32, 0.047], so that interval is not reused here. The narrative also calls Group 5 highest on both means, whereas Table 2 gives Group 3 a larger second-dimension mean (0.57 versus 0.49).
- The online supplement was not supplied, limiting inspection of algorithm details and simulation claims.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: shared item response functions connect latent traits to observed answers.
- [[concepts/centered-skew-normal-latent-trait-distributions|Centered Skew-Normal Latent Trait Distributions]]: asymmetry with explicitly parameterized population moments.
- [[concepts/gaussian-mixture-item-response-theory|Gaussian Mixture Item Response Theory]]: an alternative flexible latent-density family, including multiple modes.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: separates scale constraints from orientation and interpretation.

## Related Papers

- Azevedo, Bolfarine, and Andrade (2011), "Bayesian inference for a skew-normal IRT model under the centred parameterization": cited unidimensional predecessor.
- Santos, Azevedo, and Bolfarine (2013), "A multiple group item response theory model with centered skew-normal latent trait distributions under Bayesian framework": cited multiple-group predecessor.
- Arellano-Valle and Azzalini (2008), "The centred parametrization for the multivariate skew-normal distribution": cited centered-distribution approach from which the authors distinguish their construction.
- [[papers/multidimensional-item-response-theory-under-general-latent-distributions|Multidimensional Item Response Theory under General Latent Distributions]]: library comparison using flows and variational estimation for flexible latent distributions; not a citation claimed by this paper.

[[index|Library home]]
