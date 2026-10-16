---
title: "Parapolitics and Roll-Call Voting in Colombia: A Bayesian Euclidean and Spherical Spatial Analysis"
type: paper
authors:
  - Juan Sosa
  - Carolina Luque
  - Juan Valero
year: null
source_job_id: "63b262c1-b0cf-4bfd-9254-ed177b33babe"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - circular-policy-spaces
  - bayesian-measurement
  - colombia
---

## TL;DR

Bayesian Euclidean and circular models of Colombia's 2006-2010 Senate recover a voting alignment that the authors interpret as opposition versus non-opposition rather than conventional left-right ideology. Coalition-aligned positions are positively associated with implication in the parapolitics scandal under both models. Reported AUCs of 0.624 and 0.611 indicate modest discrimination; the observational analysis does not identify a causal effect of paramilitary influence on voting.

## Research Question

What latent alignment organizes Senate roll calls during the parapolitics scandal, how sensitive is that alignment to linear versus circular geometry, and how is it associated with senators' recorded scandal involvement?

## Motivation

Party labels need not describe the principal division in legislative voting. Strategic alignment, replacements, and fragmented coalitions complicate a left-right interpretation of the Colombian Senate. Comparing a linear model with [[concepts/circular-voting-models|Circular Voting Models]] tests whether the substantive pattern persists when latent positions can wrap around a circle (Sections 1-2).

## Contributions

- Constructs a database of 147 senators and 136 plenary roll calls, combining political affiliations, replacements, participation, and recorded parapolitics involvement.
- Applies Euclidean and spherical latent-factor models to the same legislative term and compares their estimated positions after circular alignment and projection.
- Carries ideal-point draws into a second-stage logistic analysis of scandal implication and reports coefficient and AUC distributions.

## Method

### Data and Linear Scaling

Roll calls come from Congreso Visible. Historical senator information was assembled using Wikipedia and checked against Congreso Visible and Colombian news reports. The 147 senators include replacements; three with no plenary voting records are excluded from ideal-point estimation, leaving 144 (Sections 3 and 5.1).

The one-dimensional Euclidean model uses a response probability of the form

$$
\Pr(y_{ij}=1)=G(\mu_j+\alpha_j\beta_i),
$$

where $\beta_i$ is a senator's position and $\mu_j,\alpha_j$ are vote-specific parameters. Normal priors regularize the parameters, and two senators from opposing parties anchor the scale at opposite signs. Section 2 derives a probit specification, but Section 5.1 explicitly reports using a logit link in the implementation. The reported Stan run has 80,000 iterations, 16,000 warm-up iterations, and thinning by five, leaving 12,800 draws.

### Circular Scaling and Comparison

The circular model places senator and Yea/Nay positions on the unit circle. Its utility uses squared [[concepts/geodesic-distance|Geodesic Distance]], $\rho(a,b)=\arccos(\cos(a-b))$. A symmetric beta CDF rescaled to $[-\pi^2,\pi^2]$ maps the difference of squared distances to a voting probability. Angular positions have von Mises priors; hierarchical gamma priors govern concentration parameters. The authors report using SLFM1D with geometry-adapted Hamiltonian Monte Carlo, running 30,000 iterations and discarding 10,000 (Sections 2.2 and 5.2).

Posterior draws are aligned using Carlos Cardenas Ortiz and Guillermo Alfonso Jaramillo Martinez as references for location and orientation. For cross-model comparison and regression, the manuscript then uses $p_i^{(b)}=\tan(\beta_i^{(b)}-\pi/2)$. It calls this a log-map transformation; this tangent formula has singularities and should not be treated as a globally distance-preserving representation of the circle. Three senators with extreme projected values are omitted from the reported cross-model correlation.

Missing votes are omitted in the Euclidean analysis and imputed under a missing-at-random assumption in the circular analysis. Thus the comparison changes both geometry and missing-data treatment. The authors report consistent substantive patterns across these approaches.

### Association with Scandal Implication

A logistic regression predicts recorded scandal involvement from the signed ideal point. It is fitted separately across posterior ideal-point draws; the two anchor legislators are removed, and extreme circular projection draws are additionally excluded. The authors summarize the resulting slope and AUC distributions as posterior quantities. This is a sequential uncertainty analysis rather than the unified hierarchical model proposed in their future-work discussion (Section 6.1).

## Experiments

### Voting Structure

The Euclidean posterior means range from -1.68 to 1.31. Under the chosen orientation, 94.3% of coalition senators have positive estimated positions. Opposition, independent, and minority senators cluster on the other side. Circular estimates reproduce the broad grouping, with a more dispersed coalition arc. The authors interpret this as opposition versus non-opposition alignment, while noting that independents and minorities are not simply formal opposition members (Section 6).

Of 144 positions, 94 have intervals excluding zero; 49 of the remaining 50 belong to coalition senators. Low participation is associated with wide intervals. The correlation between Euclidean posterior means and projected circular estimates is **0.824 after excluding three senators with extreme projections** (Figure 10).

### Scandal Association

Among implicated senators, 83% have positive Euclidean estimates and 57.4% fall between 0.78 and 1.17. Table 4 reports the following regression summaries; intervals are the 2.5th and 97.5th percentiles.

| Quantity | Euclidean mean (95% interval) | Circular mean (95% interval) |
| --- | --- | --- |
| Intercept | -2.317 (-2.993, -1.681) | -2.330 (-3.371, -1.394) |
| Signed ideal-point slope | 0.522 (0.320, 0.734) | 0.530 (0.231, 0.852) |
| AUC | 0.624 (0.571, 0.675) | 0.611 (0.542, 0.671) |

Both slope intervals exclude zero. These estimates support a directional association with the coalition-aligned side of the scale, not a symmetric effect of extremism at either pole. No held-out classification evaluation is described, and these AUCs should not be presented as externally validated prediction performance.

## Limitations

- One Senate term limits temporal and institutional generalization. The single-predictor association does not adjust for party membership, district, seniority, or other potential confounders.
- Recorded scandal implication is assembled from historical and media sources; it should not be equated with a uniform legal finding or conviction.
- Legal proceedings and replacements affect participation. Omitting missing votes or imputing them under missing at random does not establish robustness to informative absence; see [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]].
- Agreement across fitted positions does not establish predictive superiority of circular geometry. No quantitative out-of-sample or information-criterion comparison is supplied here.
- Tangent projection is unstable near its singularities, and exclusions condition both the cross-model comparison and circular regression. The manuscript does not fully specify the extreme-draw exclusion threshold. Similar slope magnitudes also depend on the scales used.
- The theoretical probit description differs from the reported logit implementation. The supplied Markdown has damaged notation and supplies no explicit publication year, venue, or stable paper identifier; the year remains unknown.

## Related Concepts

- [[concepts/circular-voting-models|Circular Voting Models]]: alternative geometry for latent voting preferences.
- [[concepts/geodesic-distance|Geodesic Distance]]: circular utility uses intrinsic angular distance.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: explains the need for posterior orientation conventions.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: a relevant alternative when participation depends on latent positions.

## Related Papers

- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: related library treatment of Yu and Rodriguez's circular framework, which this manuscript attributes to Yu (2020) and Yu and Rodriguez (2021).
- Luque and Sosa (2023), "A Bayesian spatial voting model to characterize the legislative behavior of the Colombian Senate 2010-2014": cited application to the subsequent Senate term and methodological predecessor.
- Clinton, Jackman, and Rivers (2004), "The statistical analysis of roll call data": cited Bayesian Euclidean scaling foundation.
- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: cited in the discussion of future extensions; studies domain-specific preferences rather than changing latent geometry alone.

[[index|Library home]]
