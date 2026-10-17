---
title: Hierarchical Bayesian Aldrich-McKelvey Scaling
type: paper
authors:
  - Jørgen Bølstad
year: 2024
doi: 10.1017/pan.2023.18
source_job_id: "8877d878-328f-412e-9df5-23fcbe7bc875"
tags:
  - political-measurement
  - ideal-point-estimation
  - bayesian-measurement
  - hierarchical-models
---

## TL;DR

Hierarchical Bayesian Aldrich-McKelvey scaling (HBAM) estimates citizens and political actors on a common ideological scale while correcting respondent-specific shifting, stretching, and scale reversal. It pools individual parameters and models self-placements as noisy observations. In ANES 2012 and simulations, HBAM improves on unpooled Bayesian scaling; the hierarchical model without scale flipping underfits the empirical data.

Published in *Political Analysis* 32 (2024), 50-64; first published online June 8, 2023.

## Research Question

Can hierarchical priors and a likelihood that includes noisy self-placements and scale flipping improve ideological position estimates when each respondent places only a few political actors?

## Motivation

Respondents interpret ideological scales differently, making raw placements difficult to compare. [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]] estimates individual shifts and stretches, but its unpooled Bayesian implementation (BAM) estimates these parameters from sparse observations. Transforming self-placements by a stretch estimate near zero can produce extreme posterior draws, while posterior medians alone do not repair the resulting uncertainty estimates.

## Contributions

- Replaces separate, diffuse individual priors with hierarchical distributions that share information across respondents.
- Includes self-placements in the likelihood and directly estimates latent respondent positions with population priors.
- Introduces positive- and negative-stretch mixture components to accommodate scale flipping.
- Compares BAM, restricted HBAM without flipping (HBAM0), and full HBAM using prediction, parameter recovery, and interval-width diagnostics; provides Stan implementations through hbamr.

## Method

### Baseline and Hierarchical Extension

For respondent $i$ and stimulus $j$, the baseline model is

$$
Y_{ij}\sim\mathcal N(\alpha_i+\beta_i\theta_j,\sigma_{ij}^2),
\qquad \chi_i=\frac{V_i-\alpha_i}{\beta_i}.
$$

Here $\theta_j$ is the stimulus position, $V_i$ the observed self-placement, and $\alpha_i$ and $\beta_i$ the respondent's shift and stretch. BAM uses uniform priors on these individual parameters and fixes two stimulus positions for identification.

HBAM0 instead uses $\alpha_i\sim\mathcal N(0,\sigma_\alpha^2)$ and $\beta_i\sim\operatorname{Lognormal}(0,\sigma_\beta^2)$, with population dispersion learned from data. Fixed prior location and median stretch identify the latent scale. It adds

$$
V_i\sim\mathcal N(\alpha_i+\beta_i\chi_i,\sigma_i^2),
\qquad \chi_i\sim\mathcal N(0,\sigma_\chi^2).
$$

Thus respondent positions are estimated jointly rather than obtained solely by dividing a self-placement residual by a noisy stretch parameter (Sections 2.1-2.2).

### Scale Flipping

HBAM expands both stimulus-placement and self-placement likelihoods into two-component normal mixtures. Each respondent has component-specific shifts, stretches, and latent positions; the first stretch is positive and the second negative. Stretch magnitudes have lognormal priors, with component medians at $1$ and $-1$. The non-flipping weight has the hierarchy

$$
\lambda_i\sim\operatorname{Beta}(\psi\delta,(1-\psi)\delta),
\qquad \psi\sim\operatorname{Beta}(8.5,1.5).
$$

The prior mean of $\psi$ is 0.85, corresponding to a 15% prior flipping probability. Component-specific positions share a normal population prior. Discrete component indicators are marginalized during fitting and sampled afterward to combine component-specific posterior draws (Section 2.3).

All three implementations use the same heteroskedastic error specification, with respondent-level variance and stimulus-specific allocation, to support comparison. Models are implemented in Stan. The paper supplies [replication materials](https://doi.org/10.7910/DVN/VX0YPW) and the [hbamr package](https://cran.r-project.org/package=hbamr).

## Experiments

### ANES 2012

Respondents place themselves, the Democratic and Republican parties, Barack Obama, and Mitt Romney on seven-point liberal-conservative scales. Ten-fold cross-validation holds out reported stimulus placements, with at most one observation from each respondent in each fold. Table 1 reports expected log pointwise predictive density (ELPD; higher is better):

| Model | ELPD | Standard error of ELPD |
| --- | ---: | ---: |
| BAM | -28,049.2 | 146.5 |
| HBAM0 | -30,350.9 | 120.7 |
| HBAM | -27,405.3 | 107.6 |

Full HBAM predicts best. The poorer HBAM0 result shows that pooling with positive-only stretches is too restrictive for these data (Section 3.1).

For BAM, 8% of respondents have 95% credible intervals more than 50% wider than the range containing 95% of pooled respondent-position draws; neither hierarchical model has such cases. One illustrated BAM respondent has draws beyond both -10,000 and 10,000. BAM and HBAM posterior-median respondent positions correlate at 0.6 (Section 3.4).

Both models recover ideological shifting associated with self-placement. HBAM also reveals a V-shaped association between absolute stretch and self-placement extremity that is largely absent under BAM. These are model-based descriptive patterns, not independent validation of true individual ideology (Sections 3.2-3.3).

### Monte Carlo Study

The study generates 1,000 datasets for each combination of $J\in\{4,8,12\}$ stimuli and non-flipping probability $\psi\in\{0.85,1\}$, with 500 respondents per dataset and varying error scales. Other generating parameters come from the empirical HBAM fit. Recovery is evaluated through correlations between posterior-median estimates and true positions, avoiding dependence on arbitrary latent-scale units.

HBAM matches or exceeds the other models in respondent-position recovery across the reported scenarios. BAM is particularly noise-sensitive with four stimuli. HBAM0 and HBAM perform similarly without flipping, while HBAM0 deteriorates when flipping occurs. BAM's share of extremely wide intervals reaches about 25% in the worst scenarios. Stimulus recovery is strong for all models, with smaller differences than for respondents (Section 4; Figures 7-8).

## Limitations

- Recovery results concern the simulated parameter settings, whose remaining parameters are calibrated to the empirical HBAM fit. They do not establish robustness to arbitrary population distributions or nonlinear scale use.
- The cross-validation tests held-out placements from observed respondents, rather than prediction for entirely new respondents. The interval-width diagnostic measures extremity relative to an estimated population range, not frequentist coverage.
- The model assumes that respondent-specific shifting and stretching relate self-placements to stimulus placements. Cross-district scaling additionally requires shared bridging stimuli.
- The paper reports that the analogous shifting pattern is not clear in ANES 1980, so the substantive pattern observed in 2012 should not be assumed universal.
- The supplied Markdown omits footnote bodies and supplementary details, and sometimes loses the subscript distinguishing HBAM0 from HBAM. Its prose and Table 2 also disagree on the upper endpoint for the non-flipping hyperparameter. No precise interval for that parameter is inferred here. The demonstrated near-zero-division problem is summarized as extreme draws and intervals, without treating that observation alone as a proof of an unnormalizable posterior.

## Related Concepts

- [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]]: the respondent-specific transformation framework extended by HBAM.
- [[concepts/blackbox-scaling|Blackbox Scaling]]: related survey scaling based on low-dimensional response structure, with a different observation model.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: another use of hierarchical measurement, modeling dependence in legislative or judicial votes rather than survey scale interpretation.

## Related Papers

- Aldrich and McKelvey (1977), "A Method of Scaling with Applications to the 1968 and 1972 Presidential Elections": original least-squares scaling method.
- Hare et al. (2015), "Using Bayesian Aldrich-McKelvey Scaling to Study Citizens' Ideological Preferences and Perceptions": Bayesian predecessor and source of the empirical comparison.
- Lo, Proksch, and Gschwend (2014), "A Common Left-Right Scale for Voters and Parties in Europe": cited application informing realistic stimulus counts and scale-flipping frequencies.
- [[papers/modgirt-multidimensional-dynamic-scaling-of-aggregate-survey-data|MODGIRT: Multidimensional Dynamic Scaling of Aggregate Survey Data]]: a library comparison targeting changing group preferences from aggregate survey responses, whereas HBAM targets individual and stimulus positions from placements.

[[index|Library home]]
