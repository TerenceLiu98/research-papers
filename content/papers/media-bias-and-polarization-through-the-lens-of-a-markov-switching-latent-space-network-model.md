---
title: Media Bias and Polarization Through the Lens of a Markov Switching Latent Space Network Model
type: paper
authors:
  - Roberto Casarin
  - Antonio Peruzzi
  - Mark F. J. Steel
year: 2025
source_job_id: "7b372270-46a5-4a02-9574-f4580b7f4cf5"
tags:
  - latent-space-models
  - markov-switching
  - media-bias
  - political-polarization
  - bayesian-inference
---

## TL;DR

A Bayesian latent-space model combines shared Facebook commenters with text-derived political leaning to estimate news-outlet positions and recurring polarization regimes. For France, Germany, Italy, and Spain in 2015-2016, static leaning estimates correlate 0.73 with Pew survey placements of 25 overlapping outlets. A two-dimensional, five-state specification has the best DIC and log pointwise predictive density among eight compared models. Country trajectories do not support a uniform shift toward greater in-platform polarization.

## Research Question

Can audience-duplication networks and textual indicators jointly identify media leaning and changes in polarization while distinguishing ideological proximity from outlet popularity?

## Motivation

Shared audiences contain information about perceived similarity, but network structure alone does not identify a political axis. Text-derived slant can help interpret that axis. Meanwhile, static analyses miss temporal changes, and unrestricted time-varying coordinates require many latent variables. [[concepts/joint-latent-space-models|Joint Latent Space Models]] couple the two measurement channels; [[concepts/markov-switching-latent-space-network-models|Markov-Switching Latent Space Network Models]] represent temporal variation through recurring configurations.

## Contributions

- Combines Poisson network weights and a Beta-logistic model for observed text slant through shared latent coordinates.
- Uses a common hidden Markov state to switch all outlets between regime-specific positions.
- Derives nodal-strength moments for weighted temporal latent-space networks, including their capacity for overdispersion, and uses these for model diagnostics.
- Constructs European daily audience-duplication networks and evaluates inferred leaning against an external survey, alongside simulation and model comparisons.

## Method

For each day, a binary user-by-outlet matrix records whether a user commented on an outlet's posts. Its one-mode projection gives off-diagonal counts of distinct commenters shared by pairs of outlets. Conditional on latent positions and parameters,

$$
Y_{ijt}\sim\operatorname{Poisson}(\lambda_{ijt}),\qquad
\log\lambda_{ijt}=\alpha_i+\alpha_j-\beta\lVert x_{it}-x_{jt}\rVert^2.
$$

Static outlet effects $\alpha_i$ capture engagement, while distance lowers expected audience overlap. The observed slant proxy $L_{it}\in(0,1)$ is modeled separately:

$$
L_{it}\sim\operatorname{Beta}(\mu_{it}\phi,(1-\mu_{it})\phi),\qquad
\operatorname{logit}(\mu_{it})=\gamma_0+\gamma_1^\top x_{it}.
$$

The proxy compares outlet texts with political-party texts and associates textual similarity with Chapel Hill Expert Survey left-right placements. Shared coordinates connect the network and text likelihoods; the proxy is not inserted directly into the network intensity (Sections 2.1 and 4.1).

For hidden state $S_t\in\{1,\ldots,K\}$, $x_{it}=\zeta_{i,S_t}$ and $\Pr(S_t=k\mid S_{t-1}=l)=q_{lk}$. Regime-specific positions have zero-centered normal priors with variance $\sigma_k^2 I_d$. The latent-variable count scales as $O(dKN+T)$ rather than $O(dTN)$ for fully time-varying positions; this is a parameter-count argument, not a runtime benchmark.

Inference uses Gibbs sampling with Metropolis-Hastings updates and forward-filtering backward-sampling for states. Identification fixes $\beta=1$, centers coordinates, anchors reflection, and orders regimes by median pairwise distance. For $d>1$, the text loading is restricted to $(1,0,\ldots,0)$ to identify the political axis, with Procrustes handling the other coordinates (Section 3).

Theoretical results express strength moments as mixtures over states. Between-state mean differences contribute to conditional variance, permitting overdispersion despite conditionally Poisson edges. These results concern the network model; the text likelihood is excluded from the Section 2.2 derivations.

## Experiments

**Simulation.** Twenty outlets over 100 periods are generated with one latent dimension and two regimes. The sampler runs 50,000 iterations, discards 30,000, and thins by ten. The authors report recovery of positions, individual effects, and states; including the text proxy narrows the displayed 99% credible ellipses. Regime detection deteriorates when regimes are poorly separated (Section 3.3).

**Data coverage.** The source data cover 225 outlet pages in 2015-2016: 65 French, 49 German, 54 Italian, and 57 Spanish pages. Figure 6 displays matched cumulative networks of 62, 47, 45, and 43 outlets respectively. CrowdTangle coverage does not perfectly match the source pages. For dynamic analysis, the authors additionally remove 13 outlets inactive for more than 15 consecutive days: five French, four German, two Italian, and two Spanish outlets (Sections 4.1 and 4.3).

**Leaning validation.** The static one-dimensional model has a reported correlation of 0.73 with Pew left-right scores for 25 overlapping national outlets. The two-dimensional, two-state dynamic model yields correlations of 0.66 in its lower-polarization state and 0.62 in its higher-polarization state. These are positional correlations, not classification accuracy. In the static fit, the text-proxy relationship is strong for Italy, weak for France, and mostly irrelevant for Germany and Spain (Sections 4.2-4.3).

**Model selection.** Eight models include six latent-space specifications and two Poisson random-graph baselines. The tested static model performs worse than its one-dimensional switching counterparts. Adding the text equation changes network scores little outside Spain and, to some extent, Italy; its main purpose is interpretability. Model $\mathcal M_6$ ($d=2$, $K=5$) performs best on both reported criteria in every country (Table 2).

| Country | Best-model DIC / $10^6$ | Best-model lppd / $10^6$ |
| --- | ---: | ---: |
| France | 4.0949 | -2.0827 |
| Germany | 2.1570 | -1.1107 |
| Italy | 2.6588 | -1.4641 |
| Spain | 3.9590 | -2.0633 |

These are the paper's fitted model-comparison criteria, not a reported held-out forecasting experiment. The authors report that MS-LS posterior predictive strength distributions accommodate observed overdispersion, unlike the simple homogeneous Poisson baseline (Section 4.4).

**Polarization regimes.** The five-state analysis shows a tendency toward lower polarization in France, Germany, and Spain; Italy oscillates, and Spain also switches frequently between extremes. Higher-polarization regimes coincide with lower expected network strength. The second latent dimension captures other similarities, interpreted as including geography or ownership. The results concern medium-term regimes rather than reproduction of daily fluctuations (Section 4.3).

## Limitations

- Commenting and audience overlap are indirect measures of perceived affinity. The observational design does not establish that Facebook causes polarization or that commenters agree with the outlets they visit.
- Findings concern selected outlets and Facebook activity during 2015-2016, not population-wide ideological or affective polarization. External leaning validation covers only 25 outlets, and comparable ground truth for polarization changes is lacking.
- Regime and coordinate identification require substantive and geometric restrictions. Poorly separated regimes are difficult to recover; discrete shared states restrict possible temporal trajectories.
- Country models do not share information through hierarchical priors. Outlet aggregation also suppresses post-level heterogeneity.
- The supplied Markdown refers to supplementary proofs, robustness analyses, and diagnostics without including them. Several extracted equations are damaged; the summary uses the clear observation equations and prose rather than reconstructing ambiguous higher-moment formulas.

The year follows the supplied paper's 2025 citation to its own supplement. The supplied text explicitly identifies [supplementary derivations](https://doi.org/10.1214/25-AOAS2069SUPPA), [replication data and code](https://doi.org/10.1214/25-AOAS2069SUPPB), and a [GitHub repository](https://github.com/BayesianEcon/Dyn-MS-LS-Media); it does not explicitly print the main article DOI.

## Related Concepts

- [[concepts/markov-switching-latent-space-network-models|Markov-Switching Latent Space Network Models]]: recurring network configurations and state uncertainty.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: shared coordinates coupling distinct observation likelihoods.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: audience behavior as a political measurement signal.
- [[concepts/political-polarization|Political Polarization]]: distinguishing network separation from other forms of polarization.

## Related Papers

- Hoff, Raftery, and Handcock (2002), "Latent Space Approaches to Social Network Analysis": cited foundation for latent-distance network models.
- Rastelli, Friel, and Raftery (2016), "Properties of Latent Variable Network Models": cited theoretical antecedent extended to weighted temporal networks.
- Park and Sohn (2020), "Detecting Structural Changes in Longitudinal Network Data": cited related approach to network changepoints.
- [[papers/joint-latent-space-models-for-ranking-data-and-social-network|Joint Latent Space Models for Ranking Data and Social Network]]: library comparison sharing coordinates between rankings and ties, rather than text slant and audience counts; not an evaluated baseline here.
- [[papers/estimating-ideal-points-of-british-mps-through-their-social-media-followership|Estimating Ideal Points of British MPs Through Their Social Media Followership]]: library comparison using follower-network scaling and external ideological validation; not a cited benchmark in this paper.

[[index|Library home]]
