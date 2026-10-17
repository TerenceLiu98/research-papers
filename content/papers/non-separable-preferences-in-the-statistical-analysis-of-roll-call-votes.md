---
title: Non-Separable Preferences in the Statistical Analysis of Roll Call Votes
type: paper
authors:
  - Garret Binding
  - Lukas F. Stoetzer
year: 2023
date: "2022-05-24"
venue: Political Analysis
volume: 31
pages: "352-365"
doi: "10.1017/pan.2022.11"
source_job_id: "d6e83797-94d5-4898-9216-dbdecc3cbb09"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - spatial-voting
  - bayesian-measurement
---

## TL;DR

Binding and Stoetzer extend multidimensional roll-call IRT with a weight matrix that allows deviations across policy dimensions to interact in legislators' utility. Simulations show that imposing separability can instead produce correlated ideal points and exaggerate the dominant dimension's salience. Applications find non-separability in much of the postwar U.S. Senate and four of five European Parliament sessions, although its smaller magnitude in the latter leaves other estimates largely unchanged. Interpretation depends on substantively identifying the latent axes.

## Research Question

How does allowing preferences across latent dimensions to be non-separable change estimated ideal points, dimensional salience, and the interpretation of legislative conflict?

## Motivation

Conventional multidimensional roll-call models sum dimension-specific utility losses. This excludes the possibility that legislators evaluate the direction of deviations across issues jointly, as in a package combining concessions on economic and social policy. [[concepts/non-separable-spatial-preferences|Non-Separable Spatial Preferences]] distinguish such interactions from correlations in legislators' positions. Ignoring the interactions can distort the inferred political space even when vote predictions remain similar.

## Contributions

- Derives a probit IRT model from quadratic spatial utility with a symmetric positive-definite weight matrix.
- Uses covariate-based hierarchical ideal-point distributions to orient substantive dimensions while estimating salience and cross-dimensional utility interactions.
- Demonstrates distortions from imposing separability in 1,000 simulated legislatures.
- Compares separable and non-separable specifications in 37 U.S. Congresses and five European Parliament sessions.

## Method

For legislator $i$, ideal point $\theta_i$, and policy outcome $p$, utility is

$$
v_i(p)=-(p-\theta_i)^\top A(p-\theta_i).
$$

The diagonal entries of $A$ represent dimensional salience; off-diagonal entries represent non-separability. In two dimensions, the loss contains $2A_{12}(p_1-\theta_{i1})(p_2-\theta_{i2})$. With the axes held fixed, positive $A_{12}$ favors opposite-direction deviations relative to otherwise comparable same-direction deviations; negative $A_{12}$ favors the latter. The interpretation concerns deviations from each actor's ideal point, not absolute policy labels.

Normal utility differences with variance one imply

$$
\Pr(y_{ij}=1)=\Phi(\beta_j^\top A\theta_i+\alpha_j),
$$

where $\beta_j=2(Y_j-N_j)$ and, from the expanded utility difference in Equation 2, $\alpha_j=-Y_j^\top AY_j+N_j^\top AN_j$. The supplied text corrupts the subsequent inline definition of $\alpha_j$; this expression follows the preceding expansion. Setting all off-diagonal entries of $A$ to zero gives the separable specification.

Identification is central: if $A=R^\top R$, then $\beta_j^\top A\theta_i=(R\beta_j)^\top(R\theta_i)$. The likelihood alone cannot distinguish the weight matrix from transformed latent positions and discriminations. The authors constrain location and scale and model ideal-point means through substantive covariates to address orientation. Senate covariates distinguish parties and senators from racially liberal coastal states versus former Confederate states; European Parliament covariates distinguish left/right and EU-favorable/EU-sceptic party groups. Incumbents' previous-session deviations from group means also predict their current positions.

Bayesian estimation uses standard Normal item priors and $\theta_{id}\sim N(\widehat\theta_{id},1)$. The decomposition $A=T\Omega T$, with diagonal scale matrix $T$, uses positive truncated-Normal scales and an LKJ correlation prior with shape one. This ensures positive definiteness. Posterior sampling uses Stan's No-U-Turn Sampler, with convergence assessed by $\widehat R$.

## Experiments

### Monte Carlo Simulations

The study simulates 1,000 legislatures with 100 legislators and 250 votes each. Scenarios vary non-separability, relative dimensional salience, and ideal-point correlations. Group-membership covariates structure the two ideal-point dimensions.

- At zero non-separability, both specifications yield equal estimates in the reported comparison.
- At larger absolute non-separability, the separable model overweights the dominant dimension, underweights the secondary dimension, and recovers ideal points less accurately. It introduces cross-dimensional correlations consistent with the sign and magnitude of the omitted interaction.
- The non-separable model recovers the interaction and avoids these systematic patterns. Both models' ideal-point recovery becomes harder as non-separability increases, with greater deterioration for the separable model.
- The authors report generally better approximate leave-one-out predictive fit for the non-separable specification but little difference in in-sample predictions. These supplementary comparisons are described in the supplied main text; numerical fit differences are not supplied.

### U.S. Senate

The analysis fits each of 37 Congresses between 1945 and 2019. Non-separability is substantial in most Congresses. During the 89th-98th Congresses (1965-1985), the non-separable model assigns roughly equal salience to interparty and intraparty conflict, whereas the separable model gives greater weight to intraparty conflict. Both specifications subsequently show rising interparty salience.

From the 86th through 102nd Congresses (1959-1993), the separable specification produces substantially greater positive cross-dimensional ideal-point correlation. Cross-model correlations for the intraparty dimension fall to approximately 0.6-0.8 in this period. Post-Civil Rights comparisons place liberal Republicans farther toward the liberal end and conservative Democrats farther toward the conservative end of the racial/social dimension under the non-separable model. Positive interaction estimates imply a preference for combining liberal deviations on one axis with conservative deviations on the other, conditional on the chosen orientation.

### European Parliament

Across five sessions from 1979 to 2004, four have positive non-separability estimates whose 95% credible intervals exclude zero. With the paper's axis orientation, the interaction favors combinations of rightward deviations and greater EU integration, or leftward deviations and less integration. Estimates increase in the fourth and fifth sessions. Nevertheless, the comparatively small magnitude means salience, ideal points, and covariate relationships are very similar across specifications.

## Limitations

- The applications assume two dimensions rather than estimating their number. More dimensions are possible in principle but are not demonstrated in these applications.
- Quadratic utility, Normal utility differences, a common weight matrix within each fitted legislature, and conditional independence of votes remain modeling restrictions.
- Non-separability is identified relative to substantive axis constraints. Its sign and policy meaning change with axis orientation; observed vote fit alone cannot uniquely separate utility interactions from transformed latent coordinates.
- The suggested relevance to legislative package deals is an interpretation of the utility model, not a causal test of package formation or passage.
- Strong interactions reduce effective dimensionality; perfect substitutes or complements describe a limiting, degenerate geometry rather than an interior positive-definite weight matrix.
- The supplied Markdown omits the supplementary analyses and footnote bodies and contains some corrupted notation. Detailed sampling settings and numerical supplementary fit comparisons cannot be reconstructed from it.

## Related Concepts

- [[concepts/non-separable-spatial-preferences|Non-Separable Spatial Preferences]]: interactions between policy deviations in utility.
- [[concepts/item-response-theory|Item Response Theory]]: the latent legislator-item response framework.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: why substantive identification is needed to interpret the weight matrix and axes.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinct substantive dimensions can contribute to a lower-dimensional effective decision space.

## Related Papers

- Clinton, Jackman, and Rivers (2004), "The Statistical Analysis of Roll Call Data": the cited Bayesian IRT derivation extended here.
- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: cited critique of inferring preference dimensionality from roll-call fit; party separation is a different mechanism from utility non-separability.
- [[papers/nonparametric-ideal-point-estimation-and-inference|Nonparametric Ideal-Point Estimation and Inference]]: cited alternative relaxing parametric utility and error assumptions, which this paper retains while relaxing separability.
- Stoetzer and Zittlau (2020), "Vote Choice and the Nonseparability of Economic and Social Issues": cited account of cross-issue dependence in electoral choice.

Published online on 24 May 2022; the journal volume is dated 2023. Article: [10.1017/pan.2022.11](https://doi.org/10.1017/pan.2022.11). Replication data cited in the source: [10.7910/DVN/XLY5AJ](https://doi.org/10.7910/DVN/XLY5AJ).

[[index|Library home]]
