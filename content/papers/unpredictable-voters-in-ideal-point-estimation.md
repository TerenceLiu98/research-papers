---
title: Unpredictable Voters in Ideal Point Estimation
type: paper
authors:
  - Benjamin E. Lauderdale
year: 2010
venue: Political Analysis
volume: 18
issue: 2
pages: "151-171"
url: "https://www.jstor.org/stable/25792002"
source_job_id: "45b647a8-49b6-4597-92d3-12e55ebb2675"
tags:
  - political-methodology
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-measurement
---

## TL;DR

Lauderdale adds legislator-specific latent error variances to a Bayesian spatial voting model, distinguishing ideological moderation from weak responsiveness to the modeled political axes. Simulations generally show small improvements in ideal-point rankings, including under homoskedastic data generation, but recovering relative error scales is much harder and requires many votes. Applications to Congress, the European Parliament, and the UN General Assembly use those scales to describe unusual voting and diagnose omitted dimensions or changing positions. High error is a model-relative diagnostic, not an identified explanation of behavior.

## Research Question

Can roll-call models recover both legislators' relative political positions and how strongly their votes depend on the modeled dimensions, and can this distinction improve substantive interpretation and model diagnosis?

## Motivation

Standard spatial models typically assume equal responsiveness across legislators. Constituency interests and unusual policy commitments can instead make some legislators depart from the dominant voting patterns more often. A homoskedastic model can interpret these departures as moderation even when they arise from other considerations. Adding dimensions helps when many legislators share an omitted conflict, but not necessarily when influences affect only a few legislators or votes. [[concepts/heteroskedastic-ideal-point-estimation|Heteroskedastic Ideal Point Estimation]] summarizes how much each actor's behavior remains unexplained by the common axes.

## Contributions

- Gives legislator-specific error scales a substantive interpretation as relative unpredictability conditional on the fitted spatial model. Poole (2001) had already estimated such parameters; their estimation alone is not claimed as new.
- Develops a Bayesian extension of the quadratic-loss, normal-error voting model, with a Gibbs sampler and an appendix discussing identification.
- Compares homoskedastic and heteroskedastic estimation on identical simulated roll-call matrices, examining recovery of both positions and error scales.
- Demonstrates how error scales distinguish moderation from atypical voting and flag omitted dimensions or failures of constant ideal points.

## Method

### Voting Model

Legislator $i$ has a $d$-dimensional position $\mathbf{x}_i$. Quadratic policy loss and normally distributed utility disturbances yield the probit response model in Equation 1:

$$
\Pr(y_{ij}=1)=\Phi\!\left(\frac{\boldsymbol\beta_j^\top\mathbf{x}_i-\alpha_j}{\sigma_i}\right).
$$

Here $\boldsymbol\beta_j$ and $\alpha_j$ are bill parameters, $\Phi$ is the standard normal cumulative distribution function, and $\sigma_i>0$ is a legislator-specific latent standard deviation. Bill-specific disturbance scales are absorbed into the bill parameters. Holding the numerator fixed, increasing $\sigma_i$ moves the vote probability toward one-half; it does not move the ideal point toward the center. Setting every $\sigma_i=1$ recovers the homoskedastic model.

### Priors, Identification, and Computation

The reported priors are standard normal for ideal points, normal with zero mean and covariance $25I$ for bill parameters, and an inverse-gamma variance prior with hyperparameters $c_0=d_0=0$, which is improper. Error scales are renormalized at each iteration so that

$$
\frac{1}{n}\sum_{i=1}^{n}\frac{1}{\sigma_i}=1.
$$

This fixes the mean inverse standard deviation, not the arithmetic mean of standard deviations. Values above one indicate relatively unpredictable legislators within the fitted chamber and dimensional specification. Spatial scale, orientation, and rotation also require identification restrictions; the error-scale normalization does not independently resolve all spatial indeterminacies.

The sampler alternates between truncated-normal latent utilities, bill parameters, legislator positions, and legislator error variances. Bill-parameter updates weight observations by $1/\sigma_i^2$, giving less influence to unpredictable legislators. Ideal-point uncertainty also reflects their weaker spatial signal. The author modifies compiled MCMCpack code; most empirical fits use 3,000 burn-in and 2,000 retained iterations without thinning, with selected longer runs reportedly yielding no substantive differences.

## Experiments

### Monte Carlo Recovery

Section 2.2 crosses $n,m\in\{10,32,100,320\}$ legislators and votes with $\delta\in\{0,0.25,0.5\}$, drawing inverse error scales from $U(1-\delta,1+\delta)$. Each of the 48 settings has 50 replicated matrices. Both estimators use 1,000 burn-in and 1,000 retained iterations. Kendall's $\tau$ measures agreement between true and posterior-mean rankings.

Selected Table 1 results illustrate the difference between recovering positions and recovering error scales:

| Legislators | Votes | $\delta$ | Ideal points: homoskedastic $\tau$ | Ideal points: heteroskedastic $\tau$ | Error-scale $\tau$ |
| --- | --- | --- | --- | --- | --- |
| 10 | 10 | 0 | 0.711 | 0.747 | Not applicable |
| 100 | 100 | 0.5 | 0.933 | 0.946 | 0.475 |
| 320 | 320 | 0 | 0.968 | 0.973 | Not applicable |
| 320 | 320 | 0.5 | 0.958 | 0.972 | 0.672 |

The advantage in position recovery is generally small and is not uniform across all table entries. More votes improve both estimators' position rankings. Error-scale recovery improves primarily with votes, and also with more legislators and greater true heterogeneity. There is no true error-scale ordering when $\delta=0$. The author reports approximately correct posterior coverage for large matrices; the supplied text does not provide numerical coverage tables.

### Congressional Applications

- **Positions and uncertainty:** In the 109th Senate, Feingold moves from 21st most liberal, with a 95% highest-density interval of ranks 17-26, to 1st with an interval of 1-6. McCain's median rank moves from 58th to 67th, while his 95% posterior rank interval widens from 55-60 to 60-80. Most legislators' positions change little (Section 3.1).
- **Media validation:** Senators described as mavericks have mean one-dimensional $\sigma$ of 1.22 versus 1.01 for others; the 95% interval for the difference is 0.05-0.38. In two dimensions, the means are 1.09 versus 1.01 and the difference interval is -0.02-0.19, including zero. The popular label therefore aligns more clearly with one-dimensional unpredictability (Section 3.2).
- **Iraq authorization:** The six Republican House opponents in 2002 divide into three moderates and three conservative but unpredictable members. Earlier, 106th-Congress one-/two-dimensional scales are 1.54/1.71 for Hostettler, 1.64/1.71 for Duncan, and 4.59/1.84 for Paul. This is an illustrative prediction argument using prior voting histories, without a reported aggregate held-out predictive score (Section 3.3).
- **Institutional circumstances:** Byrd's unpredictability increases after leaving party leadership; Frank's decreases during an ethics investigation. These temporal associations motivate interpretations about legislative constraints but do not independently identify their causal effects (Section 3.4).

### Diagnostic Applications

In the first five European Parliament sessions, 1979-2004, anti-integration members are unusually unpredictable under both one- and two-dimensional models. Each session includes 548-721 members and 886-5,745 roll calls. The shared substantive pattern suggests an omitted integration dimension, consistent with the cited multidimensional account of European parliamentary politics (Section 3.5).

Two-dimensional UN General Assembly fits use six historical periods spanning 1946-2006, with 363-1,289 votes per period. Persistent unpredictability for some countries contrasts with period-specific spikes for Cuba in 1954-69 and Chile and Portugal in 1970-79. The author interprets the latter as failures of constant positions around regime changes and suggests dynamic or change-point extensions; those extensions are not estimated in this paper (Section 3.6).

## Limitations

- Error scales are relative to the chamber, period, and modeled dimensions. They do not measure an absolute, context-independent propensity to act independently.
- High $\sigma_i$ can reflect particularistic interests, an omitted common dimension, or changing positions. The parameter alone cannot distinguish these mechanisms or establish that behavior is intrinsically random.
- The simulations suggest that individual scales are unlikely to be useful with fewer than roughly 100 votes. The paper explicitly cautions against applying this estimator to the short response histories typical of opinion surveys.
- Recovery evidence comes from the specified quadratic-normal model family and short Monte Carlo runs. Small ranking gains do not establish robustness to arbitrary misspecification; aggregate congressional positions largely remain similar.
- Historical examples and media labels provide descriptive validation rather than causal identification. The two-dimensional media comparison includes a null difference within its interval.
- The supplied Markdown omits the text of numbered footnotes and contains inconsistent mathematical notation: the definition of $\alpha_j$ does not match the subsequent sign convention, and the appendix alternates between $\sigma_i$ and $\sigma_i^2$. Its statement that the improper prior has a mean at one is not a valid finite-mean characterization. The summary follows Equation 1 and the explicit variance-prior specification, without treating the appendix as implementation-ready code.

## Related Concepts

- [[concepts/heteroskedastic-ideal-point-estimation|Heteroskedastic Ideal Point Estimation]]: separates position from relative responsiveness to the fitted axes.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: shared patterns among unpredictable actors can suggest missing dimensions.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: explicitly models temporal movement that a static error scale may absorb.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: a library comparison that models issue-associated departures using bill content.

## Related Papers

- Poole (2001), "The geometry of multidimensional quadratic utility in models of parliamentary roll call voting": cited predecessor estimating legislator-specific variances by conditional maximum likelihood.
- Clinton, Jackman, and Rivers (2004), "The statistical analysis of roll call data": cited homoskedastic Bayesian foundation extended by this sampler.
- Martin and Quinn (2002), "Dynamic ideal point estimation via Markov chain Monte Carlo for the U.S. Supreme Court, 1953-1999": cited approach to changing positions.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: library comparison of modeling topic-specific departures rather than summarizing unexplained behavior in one actor-specific scale; not a citation in this paper.
- [[papers/nonparametric-ideal-point-estimation-and-inference|Nonparametric Ideal-Point Estimation and Inference]]: later library comparison targeting ordinal positions under a shared error distribution across voters within each bill; not a citation in this paper.

Source: [JSTOR stable record](https://www.jstor.org/stable/25792002).

[[index|Library home]]
