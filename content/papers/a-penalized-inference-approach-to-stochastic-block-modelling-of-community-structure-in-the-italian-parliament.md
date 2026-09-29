---
title: A penalized inference approach to stochastic block modelling of community structure in the Italian Parliament
type: paper
authors:
  - Mirko Signorelli
  - Ernst C. Wit
year: 2017
doi: "10.1111/rssc.12234"
source_job_id: "fa4e4c16-133d-481f-b297-ea41815e65e9"
tags:
  - stochastic-block-models
  - legislative-networks
  - penalized-likelihood
  - political-polarization
---

## TL;DR

Signorelli and Wit extend block modelling to weighted legislative cosponsorship networks, separating party productivity from pairwise party interactions and deputy attributes. Adaptive lasso estimation produces reduced graphs of positive, negative, and zero block interactions. Applied to four Italian Chamber of Deputies legislatures during 2001-2015, these graphs suggest a shift from collaboration organized around two coalitions toward more fragmented, cross-coalition cooperation. The analysis is associational and aggregates each legislature over time.

## Research Question

How can a weighted network of individual bill cosponsorships reveal preferential collaboration between known parliamentary groups, after accounting for their overall activity and deputies' observed characteristics?

## Motivation

Raw connectivity can make a highly productive party appear to collaborate preferentially with every other party. Italy's numerous parliamentary groups also generate many possible pairwise interactions, making unrestricted estimates difficult to interpret. The paper seeks a sparse representation that distinguishes group activity from excess or reduced collaboration conditional on the model.

## Contributions

- Extends Poisson block modelling with group main effects, block interactions, and node- or edge-specific covariates (Section 3).
- Uses adaptive lasso to select between-group interactions and covariate effects while retaining unpenalized group productivity effects (Section 4.1).
- Defines reduced collaboration and repulsion graphs from interaction signs, avoiding a threshold on raw predicted connectivity (Section 4.3).
- Compares tuning criteria in four simulation settings and applies the method to Italian legislative networks (Sections 4.2 and 5).

## Method

For deputies $i$ and $j$ in known groups $r$ and $s$, the undirected edge weight counts their jointly cosponsored bills. Independent Poisson processes motivate the baseline model

$$
Y_{ij}\sim\operatorname{Poisson}(\mu_{ij}),\qquad
\log\mu_{ij}=\theta_0+\alpha_r+\alpha_s+\phi_{rs}+\mathbf{x}_{ij}^{\mathsf T}\beta.
$$

Here $\theta_0$ captures overall activity, $\alpha_r$ group productivity, and $\phi_{rs}$ the interaction between groups. Identifiability requires $\sum_r\alpha_r=0$ and $\sum_s\phi_{rs}=0$ for every $r$, with symmetric interactions. Covariates allow deputies within a group to differ, so the extension relaxes the stochastic equivalence of a strict block model. Memberships are supplied, not discovered.

The adaptive lasso maximizes log likelihood minus $\delta\sum_j w_j|\theta_j|$. The intercept and group main effects have zero penalty weights; between-group interactions and covariate coefficients receive weights based on inverse squared absolute maximum-likelihood estimates. Within-group interactions are derived as $\phi_{rr}=-\sum_{s\ne r}\phi_{rs}$ and cannot be penalized independently under this parameterization. BIC selects the tuning parameter in the application.

The reduced graph has parties as nodes. Positive fitted interactions define collaboration edges, negative interactions define repulsion edges, and exact zeros represent model-selected indifference. Zero interaction does not mean zero expected cosponsorship. Negative interaction means less collaboration relative to the fitted baseline, not a directly observed hostile act.

The application controls for gender, education, seniority, age difference, constituency effects, and shared constituency. It also adds $\mathrm{TR}_{ij}=\sum_{k\ne i,j}y_{ik}y_{jk}$ to approximate transitivity and uses penalized pseudolikelihood. This network-derived covariate goes beyond the independent-edge baseline; the authors explicitly describe its inclusion as exploratory.

## Experiments

### Simulation Evidence

Four settings generate networks with $n=50,100,\ldots,500$ nodes and compare models along a grid of 100 penalty values. Evaluation measures correct zero/nonzero classification of between-group interactions, comparing 10-fold cross-validation, AIC, BIC, GIC, and modified BIC with the best accuracy available on the grid. Supplementary Table 1 varies the number of zero interactions from 10 to 30 and the minimum nonzero magnitude from 0.2 to 0.1, with maximum magnitude 0.5.

The authors report that all criteria quickly attain the grid's maximum accuracy in the dense setting. BIC and GIC perform better in the sparser and weaker-signal settings. The supplied text does not tabulate numerical accuracy values, so no precise performance margin is inferred from the figure captions.

### Italian Chamber of Deputies

The application combines Briatte's cosponsorship networks with deputy attributes from the Chamber website. It covers XIV (2001-2006), XV (2006-2008), XVI (2008-2013), and the observed portion of XVII (2013-2015), with 8, 13, 8, and 10 parliamentary groups respectively.

Selected estimates from Table 1 are log-mean coefficients, not probability changes:

| Covariate | XIV | XV | XVI | XVII |
| --- | ---: | ---: | ---: | ---: |
| Female-female, relative to male-male | 0.604 | 0.714 | 0.689 | 0.642 |
| Same electoral constituency | 0.527 | 0.516 | 0.537 | 0.535 |
| Age difference | -0.020 | 0.000 | -0.061 | -0.040 |
| Transitivity | 0.189 | 0.131 | 0.058 | 0.067 |

Shared constituency and female-female pairs have positive estimates in every legislature. Education effects vary over time; most regional effects are shrunk to zero. Age difference is negative in three legislatures and selected out in XV.

The reduced graphs for XIV and XV largely reflect within-party and within-coalition collaboration. XVI retains much of the early-legislature majority/opposition division despite later coalition changes. XVII contains cross-coalition collaboration, while M5S has a positive interaction only with the mixed group among other groups. The authors interpret these patterns as growing fragmentation of the earlier two-coalition structure, not as a direct measure of every dimension of ideological polarization.

## Limitations

- Legislature-level aggregation prevents the analysis from tracking deputies' party switching and time-varying interaction rates. Group memberships come from the Chamber website; a dynamic membership model is discussed but not estimated.
- Observation windows differ. Lower intercepts in XV and XVII partly reflect shorter periods, complicating comparisons of raw activity across legislatures.
- The transitivity extension uses penalized pseudolikelihood whose performance for this term was not established in the paper. Positive estimates should be read with that caveat.
- Within-group interactions are constrained sums of between-group effects, rather than independently selected parameters. Sparse graph interpretation depends on the chosen parameterization and penalty.
- Simulation conclusions concern support recovery in the specified Poisson block settings, not predictive superiority across arbitrary dependent networks.
- Proposed explanations involving the 2005 electoral-law change and early-legislature concentration of cosponsorship are hypotheses, not identified causal results. The latter would require temporally disaggregated data.

## Related Concepts

- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: combines known party blocks with observed heterogeneity in weighted edges.
- [[concepts/social-network-analysis|Social Network Analysis]]: models legislative collaboration as relational data.
- [[concepts/signed-political-networks|Signed Political Networks]]: a conceptual connection through positive and negative reduced-graph interactions, whose signs here are model-derived deviations from baseline.

## Related Papers

- [[papers/estimating-stochastic-block-models-in-the-presence-of-covariates|Estimating Stochastic Block Models in the Presence of Covariates]]: a library comparison that estimates latent communities and nonparametric connection probabilities, whereas this paper conditions on known groups and models counts with a parametric predictor. This is not a citation claimed by the source.
- Anderson, Wasserman, and Faust (1992), "Building stochastic blockmodels": cited precedent for reduced graphs; this paper replaces connectivity thresholds with interaction signs.
- Zou (2006), "The adaptive lasso and its oracle properties": cited basis for weighted penalization and conditional variable-selection consistency.
- Briatte (2016), "Network patterns of legislative collaboration in twenty parliaments": cited source of the legislative network data.

Published in *Journal of the Royal Statistical Society: Series C*, as identified in the supplied manuscript. DOI: `10.1111/rssc.12234`.

[[index|Library home]]
