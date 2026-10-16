---
title: "Identifying Intraparty Voting Blocs in the U.K. House of Commons"
type: paper
authors:
  - Arthur Spirling
  - Kevin Quinn
year: null
source_job_id: "aa0c6192-3995-41cb-ad38-b97de4caae88"
tags:
  - legislative-behavior
  - bayesian-nonparametrics
  - voting-blocs
---

## TL;DR

A Dirichlet process mixture of Bernoulli voting profiles identifies intraparty groups without imposing an ideological ordering or fixing the number of blocs. For 424 Labour MPs and 198 nonunanimous divisions in the 1997-2001 House of Commons, the posterior probability of 11 or 12 blocs is 0.882. The groups distinguish government loyalists, left-wing rebels, and issue-specific dissenters whose differences are poorly summarized by a single loyalty continuum.

## Research Question

How can legislative voting records reveal the number, membership, and substantive differences of intraparty blocs when party discipline and strategic opposition voting undermine conventional ideological scaling?

## Motivation

Government rebels and opposition members can vote against the same bill for opposite policy reasons. Standard spatial models can therefore place left-wing Labour rebels between government loyalists and Conservative opponents, even though this ordering contradicts their substantive positions. Aggregate cohesion measures also conceal which MPs form distinct groups and which divisions separate them (Sections 2-3).

## Contributions

- Models binary voting profiles with a Bayesian nonparametric mixture that estimates the occupied bloc count and membership uncertainty.
- Summarizes membership through label-invariant pairwise probabilities, avoiding arbitrary cluster labels across posterior draws.
- Uses division-specific profiles to identify issue differences beyond a rebel-versus-loyalist classification.
- Demonstrates exploratory analysis of the first Blair government, annual comparisons over 1992-2005, and a posterior predictive check.

## Method

For MP $i$ and division $j$, observed votes satisfy $y_{ij}\mid\theta_{ij}\sim\operatorname{Bernoulli}(\theta_{ij})$. Missing votes contribute no likelihood factor. The hierarchical prior is

$$
\boldsymbol\theta_i\mid G\sim G,\qquad
G\sim\operatorname{DP}(\alpha G_0),\qquad
G_0=\bigotimes_{j=1}^{J}\operatorname{Beta}(0.1,0.1).
$$

The application uses $\alpha\sim\operatorname{Gamma}(4,0.75)$ with shape-rate parameterization. [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]] allow MPs to share exactly the same probability vector, forming a bloc. Here $K$ is the number of occupied blocs among the analyzed MPs. The beta base distribution favors probabilities near zero or one and hence internally homogeneous blocs; the concentration parameter controls the prior tendency to form more groups (Section 4).

Inference combines conjugate allocation updates with merge-split moves every third MCMC scan and an auxiliary-variable update for $\alpha$. The empirical run has 510,000 iterations, discards 10,000, and stores every hundredth remaining draw, yielding 5,000 draws. The appendix describes a more general hyperparameter sampler, while the application fixes the beta parameters at 0.1.

[[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]] form a matrix

$$
P_{ii'}=\Pr(\boldsymbol\theta_i=\boldsymbol\theta_{i'}\mid Y).
$$

Euclidean distances between its columns and seriation using a minimized Hamiltonian path order the display. This ordering reveals similar profiles without defining a left-right scale. The substantive interpretation uses the divisions separating groups, including free votes, rather than prespecified labels for rebellious MPs or controversial bills (Section 5.1).

## Experiments

### Data and Bloc Counts

The main analysis retains 424 Labour MPs and 198 divisions after removing unanimous votes, MPs who never voted, and party-switchers Shaun Woodward and Peter Temple-Morris. Records come from the tapiR package. Table 3 gives:

| Occupied blocs $K$ | Posterior probability |
| --- | --- |
| 10 | 0.0478 |
| 11 | 0.4402 |
| 12 | 0.4418 |
| 13 | 0.0684 |
| 14 | 0.0018 |

### Substantive Findings

Core loyalists include Blair, Brown, Straw, and nearly all cabinet members. Together with a second loyalist bloc distinguished principally by the Speaker election, loyalists comprise about 60% of Labour MPs. Left-wing groups differ over welfare cuts, university funding, and freedom-of-information reform. Other blocs separate over firearms, fox hunting, municipal voting rights, and the age of consent (Sections 5.1.1-5.1.3).

Four of the eleven noncore-loyalist blocs differ substantially from the core loyalists on 20-50% of analyzed votes, using a threshold of 0.5 for the difference between bloc-average votes. Similarity to loyalists does not produce the reverse ranking of similarity to the Socialist Campaign Group rebels. This supports multiple patterns of intraparty difference rather than one scalar degree of rebellion (Section 5.1.4).

Annual analyses over 1992-2005, this time including party-switchers, illustrate changing co-membership with a loyalist reference MP. They distinguish, for example, Corbyn's left-wing divergence from Hoey's issue-specific departures. These are descriptive trajectories, not estimates of causal effects of promotion or dismissal (Section 5.1.5).

### Model Check

The authors place the observed vote matrix among 19 posterior predictive matrices in a visual lineup. They judge the observed matrix difficult to distinguish, finding no evidence of poor fit from this check. This is an in-sample posterior predictive assessment, not a held-out prediction benchmark (Section 5.2).

## Limitations

- Blocs summarize expected voting profiles; they do not identify ideological positions, organized factions, or causal peer influence.
- Votes and MPs are conditionally independent given their probability vectors. The authors acknowledge that this is questionable for counterfactual questions about one MP responding to another's vote.
- Omitting missing observations from the likelihood does not model strategic abstention or the process generating nonparticipation.
- The base distribution deliberately favors homogeneous groups, and the concentration prior affects bloc counts. The supplied analysis does not establish robustness across these choices.
- The visual predictive check offers limited evidence about fit; the paper targets useful description of the observed Parliament rather than broad external validity.
- The supplied Markdown omits publication year and stable identifiers and contains damaged mathematical notation. Metadata remains unspecified. It also gives differing full-record division totals (1,278 and 1,279); the main analyzed sample is explicitly 198 divisions.

## Related Concepts

- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: uncertainty over occupied groups and shared voting profiles.
- [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]]: membership summaries invariant to labels.
- [[concepts/item-response-theory|Item Response Theory]]: the conventional latent-response approach contrasted with clustering.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes a compact voting summary from a substantive preference space.

## Related Papers

- Clinton, Jackman, and Rivers (2004), "The Statistical Analysis of Roll Call Data": cited Bayesian scaling approach whose substantive interpretation is challenged in this institutional setting.
- Hartigan (2000), "Bloc Voting in the United States Senate": cited partition-based alternative for legislative blocs.
- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: a later library paper that cites this study and addresses coalitions of ideological opposites through circular geometry while retaining within-bloc rankings.
- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: a library comparison on why aggregate roll-call structure can misrepresent underlying preferences; not cited in the supplied paper.

[[index|Library home]]
