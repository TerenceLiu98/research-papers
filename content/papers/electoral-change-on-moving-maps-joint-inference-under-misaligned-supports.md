---
title: "Electoral Change on Moving Maps: Joint Inference under Misaligned Supports"
type: paper
authors:
  - Junjie Liu
year: null
source_job_id: 05fcfef6-1c46-4a07-a8a8-ec71453df1a7
tags:
  - electoral-geography
  - change-of-support
  - bayesian-modeling
  - political-methodology
---

## TL;DR

A joint baseline-change model estimates electoral swing on fixed geographic targets while retaining each election's native reporting units in the likelihood. Pennsylvania experiments show substantially less artificial swing under no change and 15.7% lower mean swing RMSE than separate reconstruction under moderate and independent mismatch. Gains depend on the spatial pattern of change: smoothing can improve whole-map accuracy while attenuating hotspots and producing poorly calibrated simultaneous bands.

The supplied manuscript does not state a publication year, venue, or identifier for this paper.

## Research Question

When can aggregate vote-share change on fixed geographic units be distinguished from apparent change caused by shifting reporting boundaries, and what information is lost by making the maps comparable through common coarsening?

## Motivation

Separate harmonization reconstructs each election on a target map and subtracts the estimates. Different reconstruction errors can turn stable, heterogeneous electoral geography into apparent swing. Exact aggregation to common larger units solves count comparability on that support, but can erase local contrasts and change proximity-based exposure definitions. These are distinct consequences of [[concepts/change-of-spatial-support|Change of Spatial Support]].

## Contributions

- Decomposes apparent swing into transformed genuine change and a differential reconstruction term for fixed linear operators.
- Develops the Joint Electoral Contrast estimator, combining a shared spatial baseline with separately regularized incremental change.
- Evaluates null pseudo-change, genuine-swing recovery, hotspot amplitudes, and simultaneous uncertainty as separate performance criteria.
- Uses U.S. Latino geographic swing and Berlin refugee-accommodation proximity to distinguish stability under near nesting from the geographic costs of common coarsening.

## Method

### Fixed Target and Reconstruction Error

For fixed target units, the estimand is $\Delta_j=p_{j1}-p_{j0}$. With linear reconstruction operators $H_t$, separate harmonization satisfies

$$
\widehat{\Delta}=H_1p_1-H_0p_0
=H_1\Delta+(H_1-H_0)p_0.
$$

The second term can remain when true change is zero. This identity applies to the specified linear rule, not generally to nonlinear posterior means. Geometric mismatch alone cannot determine its sign or magnitude; baseline geography also matters. [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]] diagnose geometric alignment, whereas the U.S. application's weighted operator discrepancy also incorporates vote totals.

### Observation Model and Shared Baseline

Each election contributes observed focal-party counts $D_{gt}$ among two-party totals $N_{gt}$ on its own reporting units:

$$
D_{gt}\mid N_{gt},p_t\sim\operatorname{Binomial}(N_{gt},q_{gt}),
\qquad q_{gt}=\sum_j w_{gtj}p_{jt}.
$$

Weights normalize allocated exposure within reporting units. Pennsylvania uses target voting-age population; the U.S. application allocates Census-block voting-age population through intersections. These constructed weights are conditioned on, not estimated from voting locations.

The latent logits share a baseline:

$$
\eta_{j0}=\alpha+u_j,\qquad
\eta_{j1}=\alpha+\gamma+u_j+v_j,
\qquad p_{jt}=\operatorname{logit}^{-1}(\eta_{jt}).
$$

Proper graph-GMRF priors regularize baseline $u$ and incremental change $v$. Baseline precision ranges over $\{0.3,1,3\}$ and change precision over $\{1,3,10,30\}$. Inference mixes Laplace approximations over these grids. This evaluates shared baselines and stronger change smoothing together; the experiments do not isolate their contributions. It is a finite-target form of [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]].

### Contrast Summaries

Transformed posterior draws yield probability-scale swing. A posterior max-t construction supplies simultaneous nominal 95% bands; positive or negative declarations require the entire interval to exceed a two-percentage-point magnitude threshold, with five points as sensitivity analysis. Point-recovery scores instead use logistic-normal approximations to endpoint means. Consequently, the scored estimate and the draw-based band center can differ. Posterior probability conditional on the model is distinct from repeated-sampling coverage of the true map.

## Experiments

### Pennsylvania Known-Truth Comparisons

All methods receive the same counts, geometry, target units, and exposure within each paired dataset. Fine truth is constructed for these experiments rather than independently observed historical voting behavior at every location.

| Design | Reported result | Interpretation |
| --- | --- | --- |
| No-change placebo, 120 runs | Target shares with absolute estimated swing above 2 points: naive 53.0%, separate 41.2%, joint 1.6% | Point-estimate magnitude rates, not interval rejection rates |
| Empirical swing, moderate mismatch | Separate RMSE 3.64 points; joint 3.31 | Joint improves mean target-level recovery |
| Empirical swing, independent mismatch | Separate RMSE 4.31 points; joint 3.39 | Across these two mismatch conditions, mean RMSE falls 15.7%, with 397/400 paired wins |
| Empirical swing, identical supports | Separate RMSE 3.19 points; joint 3.22 | A reported 1.1% regularization cost |
| Independent supports, 10-point hotspot dispersion | Whole-map RMSE 6.57 to 6.30 points; within-hotspot MAE 10.48 to 12.83 | Better map-wide accuracy can conceal worse local recovery |

The morphology experiment crosses three support relationships, three change patterns, and two swing dispersions in 1,800 paired datasets. It uses 131 targets, 297 adjacency edges, and 44 reporting regions. Under independent supports, mean paired fractional RMSE gains for smooth, regional, and hotspot change are respectively 53.0%, 42.2%, and 19.1% at five-point dispersion, and 38.7%, 21.2%, and 4.0% at ten points. These are averages of replicate-level relative gains, unlike the empirical-swing ratio of pooled mean RMSEs. Dispersion describes exposure-weighted swing standard deviation, not the swing at every target.

For ten-point hotspots under independent supports, joint reconstruction retains 0.72 of true weighted swing dispersion versus 0.87 for separate reconstruction. Within-hotspot MAE is worse for joint estimation in every hotspot cell. Across all 18 cells, joint correct-call rates are 0.2-22.7% of exposure eligible for a directional call, while 94.7-99.9% of all exposure remains indeterminate and false calls cover at most 0.023%. Joint bands contain the entire true vector in only 30-73% of hotspot replicates, versus 99-100% for separate reconstruction. Rare false declarations therefore do not demonstrate calibrated uncertainty.

A separate statewide municipality-scale illustration fits a connected component of 2,334 units. With only three paired support realizations per condition, reported mean-RMSE gains rise from 11.8% under mild mismatch to 19.1% under moderate and 33.6% under independent mismatch; this is complementary scale evidence rather than additional fine-target replication.

### Substantive Applications

**U.S. Latino geographic swing:** Eight states provide a frozen sample of 17,729 tracts in 440 counties; one tract lacks posterior coverage. Released precinct supports are partly preharmonized and nearly nested, with median operator mismatch 0.007. The plotted fixed-sample smooths use 17,689 tracts with more than 100 votes in 2016. At Latino voter share 0.8, published-style and joint estimates imply 11.3- and 10.9-point pro-Trump swings, respectively; their curves differ by at most 0.61 points. This supports stability of the broad gradient on the same sample, not accuracy at every tract or identification of individual voter switching.

**Berlin exposure reclassification:** Exact aggregation yields comparable returns on 341 common-support units, while 2017 geometry contains 660 finer mail-ballot units. Changing from fine-unit to parent-unit centroid classifications changes refugee-accommodation proximity status for 3.8%, 6.3%, and 9.3% of population at 150, 200, and 250 meters. Denominators cover 659 units with distance data; the missing unit contains 3,512 residents. These are geographic classification differences, not changes in electoral effects. Missing fine 2013 polygons prevent direct observation of the corresponding fine electoral contrasts.

## Limitations

- Shared baselines and change regularization are bundled; improved recovery cannot be attributed to either component alone.
- Fine-scale estimates condition on exposure allocation, geometry, spatial priors, and approximate inference. Crossing supports need not identify every target share.
- Concentrated change can be oversmoothed, with worse hotspot errors and substantial simultaneous-band undercoverage despite better overall RMSE.
- The real-data applications lack independent fine-target truth. The U.S. comparison describes released, partly preharmonized supports; Berlin measures exposure reclassification rather than electoral reconstruction accuracy.
- The estimand is aggregate geographic vote-share change. Turnout, migration, composition, and preferences can all contribute; it does not identify individual transitions.
- The supplied Markdown references supplements and replication outputs but does not include those supplements; implementation and extended results here reflect the main text's reports.

## Related Concepts

- [[concepts/change-of-spatial-support|Change of Spatial Support]]: distinguishes a fixed substantive target from changing observation units.
- [[concepts/relative-nesting-and-relative-scale|Relative Nesting and Relative Scale]]: geometry diagnostics whose interpretation differs from weighted operator mismatch.
- [[concepts/bayesian-spatial-disaggregation|Bayesian Spatial Disaggregation]]: model-dependent recovery from aggregate observations.

## Related Papers

- [[papers/integrating-data-across-misaligned-spatial-units|Integrating Data Across Misaligned Spatial Units]]: develops the support diagnostics cited in this manuscript; the present paper focuses on temporal contrasts and differential reconstruction errors.
- [[papers/spatial-latent-gaussian-modelling-with-change-of-support|Spatial Latent Gaussian Modelling with Change of Support]]: cited precedent for connecting misaligned observations through latent spatial models; the present estimator instead specifies a shared electoral baseline and incremental change on finite targets.

[[index|Library home]]
