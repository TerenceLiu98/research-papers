---
title: Dynamic Latent Space Modeling of Inhomogeneous Poisson Network Processes with Applications to International Relations
type: paper
authors:
  - Jie Jian
  - Owen G. Ward
  - Jiguo Cao
source_job_id: "618f57f5-759b-453b-b64d-e4ca8b4b9035"
tags:
  - dynamic-networks
  - latent-space-models
  - point-processes
  - international-relations
  - network-analysis
---

## TL;DR

This paper introduces the Dynamic Latent Space Poisson Process (DLS-PP), a continuous-time model for dyadic event streams in which smooth latent distances capture changing relational affinity and node-specific effects capture baseline activity. Cubic B-spline trajectories, geometric anchoring, dyadic minibatch optimization, and an effective-degrees-of-freedom BIC make the model identifiable and computationally practical. In simulations and an ICEWS application covering 60 economies from 1995 to 2022, DLS-PP generally improves fit and forecasting while separating diplomatic volume from evolving cooperative alignment.

## Research Question

Can a continuous-time network event model recover smooth, identifiable latent trajectories while separating changing dyadic proximity from heterogeneous node activity and remaining scalable to millions of events?

## Motivation

Snapshot-based dynamic network models discard exact event timing, while existing continuous latent-position models often use piecewise-linear paths, omit node-specific activity, or scale poorly. Without activity effects, actors with high event volume can be pulled toward the latent center even when that volume reflects general prominence rather than affinity. The paper therefore combines an inhomogeneous Poisson event model with [[concepts/dynamic-latent-space-models|Dynamic Latent Space Models]] and explicit activity parameters.

## Contributions

- Defines a continuous-time latent-distance intensity for unordered dyads that separates intrinsic node activity from evolving relational proximity.
- Represents trajectories with penalized cubic B-splines, controlling spatial scale, integrated squared velocity, and integrated squared acceleration.
- Establishes identifiability of activity and geometry under anchoring and nondegeneracy conditions, leaving only time-invariant coordinate reflections that do not affect reported distances or intensities.
- Develops a scalable estimator using dyadic minibatch stochastic gradients, profile updates for activity parameters, aligned static-block initialization, and Gauss-Legendre quadrature.
- Selects smoothing parameters with a BIC based on generalized Gauss-Newton curvature and Hutchinson estimation of effective degrees of freedom.

## Method

For each unordered dyad $(i,j)$, events follow an independent inhomogeneous Poisson process with

$$
\log \lambda_{ij}(t)=\beta_i+\beta_j-\lVert z_i(t)-z_j(t)\rVert^2.
$$

The activity parameter $\beta_i$ absorbs a node's general interaction propensity, while distance between two-dimensional trajectories determines their time-varying affinity. Each coordinate of $z_i(t)$ is a cubic B-spline. The penalized objective combines the point-process log-likelihood with a coefficient ridge penalty and quadratic penalties on velocity and acceleration.

Identification fixes one node at the origin and constrains a second node to the horizontal axis. Under the paper's noncollision, noncollinearity, and general-position assumptions, identical intensities imply identical activity parameters and trajectories up to independent, time-invariant sign flips of the coordinate axes. Conditional on trajectories, the activity likelihood is strictly concave for a complete dyad graph with at least three nodes.

Estimation alternates between minibatch stochastic-gradient updates of the trajectory coefficients and fixed-point profile updates of the activity effects. Cumulative intensities are approximated by fixed-grid Gauss-Legendre quadrature. Two static half-window fits are aligned over the remaining reflection group and projected onto the spline basis to initialize the nonconvex optimization. Smoothing parameters are selected using effective degrees of freedom rather than the raw coefficient count.

## Experiments

### Simulations

Two designs test nonlinear multipolar drift with 50 nodes and bipolar consolidation with 200 nodes. Across 30 replications, DLS-PP recovers activity effects and pairwise distances. In the nonlinear design it has the best reported in-sample distance IMSE (0.5383) and KS discrepancy (0.0224), though the homogeneous-baseline model has slightly lower persistence-forecast distance IMSE. In the bipolar design, DLS-PP has the best reported activity recovery, held-out distance error, KS discrepancy, log-likelihood, and count prediction under both extrapolation rules. Constant-velocity extrapolation is unstable for the independently fitted dyadic Poisson baseline, illustrating that flexible in-sample intensity fits need not extrapolate reliably.

### International Cooperation

The application retains cooperative ICEWS events in top-level CAMEO categories 01-08 among 60 large economies from 1995 through 2022. The data pool event direction; aggregate support for this choice includes weighted reciprocity of 0.934 and a 0.987 correlation between log-transformed counts in opposite directions. The final month contains 93,773 held-out events, with 4,198,928 events used for training.

DLS-PP has the best reported in-sample KS discrepancy (0.2435). Under persistence forecasting it also has the best KS discrepancy (0.2777), log-likelihood ($7.25\times10^5$), and count error (79.43) among the five compared methods. Its estimated activity effects broadly decline with GDP rank. The latent trajectories place China, Japan, and South Korea in a tightly clustered movement toward the core; Ukraine, Iraq, and Poland are among the most mobile or sharply changing countries, while Canada, the United Kingdom, the Netherlands, and France are comparatively stable.

## Limitations

- Dyads are modeled as unordered and conditionally independent. Pooling directions is supported by aggregate reciprocity in this application but removes sender-receiver asymmetry.
- Static node activity effects cannot represent activity that itself changes over time.
- ICEWS is generated from news coverage, so event volume reflects media attention and underreporting as well as political behavior; the inferred geometry describes the reported cooperation network.
- Latent trajectories are descriptive associations rather than causal estimates of geopolitical realignment.
- The anchoring assumptions require separated anchor nodes and nondegenerate two-dimensional configurations. Anchor trajectories are constrained, so their movement summaries are not directly comparable with unconstrained nodes.
- Formal trajectory uncertainty is not provided; the paper identifies Laplace curvature approximations as future work.
- Forecast quality depends on the extrapolation rule, and constant-velocity continuation can be fragile for sufficiently flexible models.

## Related Concepts

- [[concepts/dynamic-latent-space-models|Dynamic Latent Space Models]]: time-varying embeddings whose distances encode changing relational affinity.
- [[concepts/relational-event-models|Relational Event Models]]: continuous event-stream modeling; DLS-PP uses exact event times but assumes independent Poisson dyads rather than history-dependent hazards.
- [[concepts/statistical-identifiability|Statistical Identifiability]]: uniqueness of the fitted intensity decomposition up to a specified reflection group.
- [[concepts/markov-switching-latent-space-network-models|Markov-Switching Latent Space Network Models]]: a discrete-regime alternative to smooth continuous trajectories.

## Related Papers

- Hoff, Raftery, and Handcock (2002), "Latent Space Approaches to Social Network Analysis": foundational static latent-distance model.
- Artico and Wit (2023), "Dynamic Latent Space Relational Event Model": continuous-time latent-position model for relational events.
- Rastelli and Corneli (2023), "Continuous Latent Position Models for Instantaneous Interactions": closely related continuous latent-position framework with piecewise-linear paths.
- [[papers/media-bias-and-polarization-through-the-lens-of-a-markov-switching-latent-space-network-model|Media Bias and Polarization Through the Lens of a Markov Switching Latent Space Network Model]]: uses nodal activity and latent distance but represents temporal change through recurring discrete states.

[[index|Library home]]
