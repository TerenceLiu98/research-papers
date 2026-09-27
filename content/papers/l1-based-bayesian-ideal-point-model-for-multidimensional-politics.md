---
title: L1-based Bayesian Ideal Point Model for Multidimensional Politics
type: paper
authors:
  - Sooahn Shin
  - Johan Lim
  - Jong Hee Park
year: 2025
date: "2024-12-03"
venue: Journal of the American Statistical Association
volume: 120
issue: 550
pages: "631-644"
doi: "10.1080/01621459.2024.2425461"
source_job_id: "bd6851b5-5fc1-4062-b14e-54798bdb6246"
tags:
  - ideal-point-estimation
  - political-methodology
  - bayesian-inference
  - identifiability
  - legislative-behavior
---

## TL;DR

Shin, Lim, and Park propose the Bayesian Manhattan-distance ideal point model (BMIM), using $\ell_1$ distance to reduce continuous rotational ambiguity to finitely many coordinate permutations and sign changes. Two-dimensional simulations recover nonpartisan, two-party, and multiparty configurations. An application to the late Gilded Age US House separates partisan and regional monetary-policy cleavages. Identification and recovery depend on the model's geometry, priors, and normalization; axis signs and ordering still require alignment.

## Research Question

Can a spatial voting model recover correlated political dimensions without fixing selected legislators' multidimensional positions or defining successive dimensions by residual variance?

## Motivation

Euclidean distances are preserved when all actor and policy positions are rotated together. Consequently, equivalent voting predictions can coexist with different coordinate-level interpretations. The paper illustrates how principal-axis restrictions can combine correlated cleavages and how a misspecified anchor can distort Bayesian ideal points. [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]] therefore matters for interpreting dimensions, beyond obtaining a good fit to votes.

## Contributions

- Introduces a spatial voting likelihood with linear utility in Manhattan distance, estimating both legislators' ideal points and roll-call Yea/Nay positions.
- States identification up to location shifts and signed permutations, with a centering constraint removing location ambiguity (Section 3.4, Theorem 1).
- States a posterior concentration result modulo signed permutations under a bound keeping true vote probabilities away from zero and one (Theorem 2).
- Uses multivariate slice sampling and evaluates recovery in synthetic voting systems and historical congressional roll calls.

## Method

### Voting Model

For legislator $i$ and roll call $j$, let $\mathbf x_i$ be the ideal point and $\mathbf o_{yj},\mathbf o_{nj}$ the Yea and Nay positions in an $s$-dimensional space. Deterministic utilities are

$$
u_{ijy}=-\|\mathbf x_i-\mathbf o_{yj}\|_1,
\qquad
u_{ijn}=-\|\mathbf x_i-\mathbf o_{nj}\|_1.
$$

Under the unit-variance utility-difference convention in Section 3.1, the model's probit probability is

$$
\Pr(y_{ij}=1)=\Phi\!\left(
\|\mathbf x_i-\mathbf o_{nj}\|_1
-\|\mathbf x_i-\mathbf o_{yj}\|_1
\right).
$$

The prior uses multidimensional standard Normal distributions for actor and alternative positions, subject to $\sum_i\mathbf x_i=\mathbf 0$. This fixes the origin and supplies a scale convention. Table 2 contrasts BMIM's linear utility and $\ell_1$ distance with BIRT's quadratic utility and WNOMINATE's Gaussian utility based on Euclidean distance.

### Identification and Estimation

The global linear distance-preserving transformations of $\ell_1$ space are signed permutations. There are $2^s s!$ such transformations, or eight in two dimensions. They reorder or reverse axes without continuously mixing them. The authors' identification theorem applies this geometry to the voting model; it is a model-conditional claim, not a guarantee that any observed vote matrix reveals uniquely named policy dimensions.

The posterior result measures error in a weighted parameter norm after minimizing over signed permutations. It concerns growth in both the number of actors $N$ and votes $M$, assuming $\max_{ij}[p^*_{ij}(1-p^*_{ij})]^{-1}$ is bounded. The supplied text refers the proofs to supplementary Appendices A and B, which are not included.

Because full conditionals are nonstandard, multivariate slice sampling updates all coordinates of one actor or one Yea/Nay position together. The implementation uses shrinking hyperrectangles with tuning parameter $c=4$. Remaining sign and permutation differences are addressed in postprocessing; the detailed alignment procedure is deferred to Appendix J.

## Experiments

### Synthetic Recovery

Section 4 uses $N=100$ actors and $M=1000$ votes in a two-dimensional space. Actor positions follow Normal distributions within clusters, while each coordinate of policy alternatives is sampled uniformly from $[-1,1]$. Each setting uses four chains of 50,000 iterations, discards the first 20,000 iterations, and retains every tenth draw.

| Setting | Reported result after signed-permutation alignment |
| --- | --- |
| Nonpartisan system | Posterior means recover the dispersed configuration and coordinate-wise ordering. |
| Two-party system | Estimates recover two clusters with correlated positions across dimensions. |
| Multiparty system | Estimates preserve four unequal clusters, including two small off-diagonal groups. |

Figure 6 and its discussion report close agreement with planted positions. Exact correlation values are not available in the supplied Markdown text. Comparisons with BIRT and WNOMINATE are assigned to Appendix K; misspecification experiments using Gaussian/quadratic utility and nonuniform policy alternatives are assigned to Appendices L and M. Their detailed results cannot be assessed from this source.

### Late Gilded Age Congress

The main application uses Voteview data for the 53rd House: 372 representatives and 336 roll calls. Sampling runs for 100,000 iterations with 50,000 burn-in iterations and thinning by ten.

The authors interpret BMIM's first dimension as partisan division and its second as the monetary-standard cleavage. Southern Democrats, Western Populists, and the Silver-party representative occupy an anti-gold grouping that is less apparent in the displayed DW-NOMINATE comparison (Figure 7). This is a substantive interpretation supported by historical accounts, not a directly observed ground-truth coordinate system.

Separate analyses of the 52nd through 55th Congresses, covering 1891-1899, suggest that the regional monetary cleavage evident in the 52nd and 53rd Congresses became more aligned with partisan division around the 1896 election (Figure 8). The text refers bill-specific checks and additional temporal analysis to Appendices O and P.

## Limitations

- **Geometry is an assumption:** Switching to Manhattan distance changes the preference model. Recovering simulated positions under this geometry does not establish correctness for arbitrary political preferences.
- **Residual ambiguity remains:** Centering, prior scale, and sign/permutation alignment are still needed. Substantive axis labels require evidence beyond the fitted coordinates.
- **Dimension is supplied:** The demonstrated models use two dimensions; the study does not establish an automatic rule for selecting the number of political dimensions.
- **Evidence is narrower than universal superiority:** The main simulation evidence concerns particular synthetic configurations, and the historical comparison emphasizes interpretation of fitted positions. It does not establish general out-of-sample predictive superiority.
- **Supplementary evidence is unavailable here:** Proofs, computational costs, convergence diagnostics, detailed baseline comparisons, and robustness results are referenced but absent from the supplied Markdown. Several equations also contain extraction artifacts, so the exact contraction rate is not reproduced here.
- **Publication dates differ:** The issue year is 2025; the recorded online publication date is December 3, 2024. Some captions inconsistently date the 53rd House, while Figure 8 labels it 1893-1895.

## Related Concepts

- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: why equivalent configurations can obscure coordinate interpretation.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: correlated policy axes can remain substantively distinct.
- [[concepts/item-response-theory|Item Response Theory]]: related latent-response models and identification assumptions.
- [[concepts/nonparametric-ideal-point-inference|Nonparametric Ideal-Point Inference]]: ordinal identification under different utility assumptions.

## Related Papers

- Clinton, Jackman, and Rivers (2004), "The Statistical Analysis of Roll Call Data": the Bayesian IRT reference used in the paper's comparisons.
- [[papers/nonparametric-ideal-point-estimation-and-inference|Nonparametric Ideal-Point Estimation and Inference]]: a related library paper targeting one-dimensional orderings and tests across groups of votes under shared concave utility, rather than estimating Manhattan-space coordinates.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: a related library paper using bill topics to explain issue-specific departures from a general ideal point.
- [[papers/text-based-ideal-points|Text-Based Ideal Points]]: cited by Shin et al. as an extension of ideal-point measurement to authored text.

[[index|Library home]]
