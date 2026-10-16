---
title: "A Dynamic Dirichlet Process Mixture Model for the Partisan Realignment of Civil Rights Issues in the U.S. House of Representatives"
type: paper
authors:
  - Nuannuan Xiang
  - Yuki Shiraito
year: 2025
draft_date: "2025-02-12"
source_job_id: "f1c6eb48-c091-4f11-af3e-bca7dab99ee1"
tags:
  - bayesian-nonparametrics
  - dynamic-clustering
  - legislative-behavior
  - civil-rights
---

## TL;DR

A dynamic Dirichlet process mixture follows state-party coalitions without fixing their number or requiring simultaneous transitions. Joint analysis of four kinds of House legislative activity over 1933-1973 supports gradual civil-rights realignment beginning before the 1960s, with faster changes around the late 1940s and during the Civil Rights Movement. This page summarizes the February 12, 2025 draft.

## Research Question

When and how did Democratic and Republican state parties change their civil-rights alignments, and how can a model recover gradual, abrupt, or repeated changes in latent groups from longitudinal observations?

## Motivation

An elite-led break in the 1960s and an earlier transformation among local party members imply different coalition trajectories. Roll calls alone provide incomplete evidence because committees blocked many civil-rights bills. Schickler's legislative data add discharge petitions, floor speeches, and sponsorships, but analyzing each activity separately does not directly estimate evolving cross-state and cross-party coalitions (Sections 1-2).

## Contributions

- Extends [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]] with a Markov assignment process that combines individual persistence and dependence on the preceding period's full partition.
- Introduces an intergenerational Chinese restaurant interpretation and a blocked Gibbs estimation procedure with forward filtering and backward sampling.
- Combines binary and count measurements in one model of state-party alignments.
- Evaluates abrupt and gradual simulated transitions and reexamines regional coalitions in the U.S. House.

## Method

For unit $i$ in period $t$, $Y_{it}\sim f(\Theta_{g_{it}})$, where cluster parameters are shared across units and time. The first period uses an ordinary DP mixture. The [[concepts/dynamic-dirichlet-process-mixtures|Dynamic Dirichlet Process Mixtures]] construction in this paper then uses

$$
\Pr(g_{it}=k\mid g_{i,t-1},q^t,p)
=p\,\mathbf{1}\{k=g_{i,t-1}\}+(1-p)q_k^t.
$$

Here $p$ has a Beta prior, and the stick-breaking weights $q_k^t$ depend on cluster counts in period $t-1$. Direct inheritance occurs with probability $p$; reassignment can also select the old cluster, so $p$ is not the total probability of remaining. Even at $p=0$, previous-period counts preserve temporal dependence (Sections 3.1-3.3).

The empirical unit is a party in a state during a Congress. Members of that delegation share a cluster-specific profile: Bernoulli probabilities for pro-civil-rights votes, discharge-petition signatures, and at least one supportive floor speech, plus a Poisson rate for bill sponsorships. Beta and Gamma priors support conjugate updates. Votes coded zero include both opposition and absence. Activity types and observations are conditionally independent given their cluster parameters (Sections 2.2 and 4.1; SI B).

Inference truncates the stick-breaking representation at a large $K$, then updates component parameters, indicators of direct inheritance, $p$, mixture weights, and assignment trajectories. [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]] summarize alignment across parties, states, and regions, with 95% credible intervals in the empirical figures. Shared membership describes similarity of modeled behavior rather than a one-dimensional ideological score.

## Experiments

### Historical Application

The data cover the 73rd through 92nd Congresses (1933-1973), with varying availability of votes and petitions and incomplete temporal coverage for some other activities (SI A). Section 4.3 reports:

| Comparison | Reported pattern |
| --- | --- |
| Northern Democrats and Republicans | Cross-party co-membership declines rapidly in the 1940s, both pooled across states and within states (Figure 3). |
| Southern Democrats and Republicans | Co-membership rises rapidly in the early 1950s from previously near-zero levels; the authors interpret alignment as predating Eisenhower's party-building efforts (Figure 3). |
| Northern and Southern Democrats | Co-membership declines rapidly in the 1930s and is near zero by the early 1940s (Figure 4). |
| Northern parties and Southern Democrats | Alignment rises temporarily in the late 1940s and early 1950s; Northern Republicans show greater alignment than Northern Democrats during that peak and afterward (Figure 4). |
| Northern Republican solidarity | Within-region co-membership declines steadily in the 1940s and 1950s (Figure 5). |
| Southern Democratic solidarity | Co-membership peaks in the early 1950s and falls rapidly after 1955 (Figure 5). |

The authors suggest that Truman's 1948 civil-rights advocacy and the Dixiecrat revolt may explain the temporary Republican alignment with Southern Democrats. This is a historical interpretation of the estimated pattern, not an identified causal effect (Section 5).

### Simulations

SI C uses 50 representatives, 30 sessions, and four voting issues, starting with three groups of sizes 20, 20, and 10. One design changes memberships at sessions 11 and 21 and ends with two occupied groups. The other spreads individual transitions across sessions 6-25. Although generating vote probabilities vary over time, fitted cluster-by-issue probabilities are constant. The authors report recovery of almost all transition points and separation of same-group from different-group pairs in posterior co-membership plots (Figures C.1-C.2). No numerical accuracy summary or comparative baseline benchmark is provided.

## Limitations

- State-party membership imposes a common behavioral profile on a delegation; individual departures are treated as idiosyncratic. Co-membership does not itself establish coordinated coalition action or identify who caused realignment.
- Cluster-specific activity parameters are constant across time, and the empirical vote and petition probabilities do not vary by bill within a cluster. Changing agendas and item difficulty are not separately modeled.
- Coding absence with opposition and uneven activity coverage affect the measurement of support. Combining activities does not identify the process selecting which bills reach a vote.
- The supplied draft describes inference but does not report the empirical truncation value, chain lengths, convergence diagnostics, or a systematic prior-sensitivity analysis. Its two simulation illustrations do not establish performance across a broad range of settings.
- The supplied Markdown contains inconsistent mathematical indices and notation, especially in SI B. The transition equation above follows the explicit transition kernel in Section 3.4; the appendix should not be treated as implementation-ready pseudocode. No venue or stable paper identifier is supplied.

## Related Concepts

- [[concepts/dynamic-dirichlet-process-mixtures|Dynamic Dirichlet Process Mixtures]]: evolving partitions with an unknown occupied group count.
- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: the static clustering foundation.
- [[concepts/posterior-co-clustering-probabilities|Posterior Co-Clustering Probabilities]]: label-invariant summaries of uncertain alignments.

## Related Papers

- [[papers/identifying-intraparty-voting-blocs-in-the-uk-house-of-commons|Identifying Intraparty Voting Blocs in the U.K. House of Commons]]: cited legislative application of static DP clustering; this paper adds a joint temporal assignment process.
- Schickler (2016), *Racial Realignment: The Transformation of American Liberalism, 1932-1965*: source of the historical argument and reanalyzed legislative data.
- Caron, Davy, and Doucet (2012), "Generalized Polya Urn for Time-varying Dirichlet Process Mixtures": closest dynamic comparison in Section 3.3; the proposed model retains dependence on all preceding assignments even without direct inheritance.
- Fox et al. (2011), "A Sticky HDP-HMM with Application to Speaker Diarization": cited precedent for persistent latent states.

[[index|Library home]]
