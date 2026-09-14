---
title: "Ideological polarization in static networks: A multidimensional approach for opinion alignment"
type: paper
authors:
  - Favio Di Ciocco
  - Hugo Pérez-Martínez
  - Jesús Gómez-Gardeñes
  - David Soriano-Paños
  - Pablo Balenzuela
year: null
tags:
  - opinion-dynamics
  - political-polarization
  - ideological-dimensionality
  - homophily
  - static-networks
---

## TL;DR

A two-topic model of [[Opinion Dynamics|opinion dynamics]] combines fixed social contacts, similarity-weighted influence, and topic correlation to produce consensus, one-topic polarization, four-group polarization, and two-camp ideological alignment. Under a fully connected, equally populated cluster approximation at strong social influence, the reported homophily threshold is $\beta_c=1$ for ideological polarization and approximately $1.145$ for four-group polarization with uncorrelated topics. Cross-cutting agreement can moderate single-topic distributions, while topic correlation can remove that effect by reducing [[Ideological Dimensionality|effective dimensionality]]. Matching 55 pairs of 2020 ANES response distributions to simulations provides a descriptive empirical comparison.

## Research Question

How do homophily, social influence, and correlation between two issues determine the emergence and stability of polarized opinion configurations on a static network, and do the model's configurations resemble joint opinion distributions in survey data?

## Motivation

Single-issue models omit the possibility that people disagree on one issue but agree on another. Such cross-cutting agreement can change how strongly neighbors influence one another even when the issues have no direct coupling. Conversely, correlated topics can align otherwise distinct divisions into a common ideological axis. The paper extends a static-network opinion model to capture both mechanisms without changing the contact network itself.

## Contributions

- Combines continuous two-topic opinions with homophily-dependent influence weights on fixed, undirected contacts.
- Distinguishes neutral and radicalized consensus, one-dimensional polarization, uncorrelated two-dimensional polarization, and ideological polarization.
- Analyzes consensus fixed points and representative polarized clusters, then compares their stability conditions with simulation phase maps.
- Examines how a second topic changes the marginal distribution and bimodality of opinions on the first.
- Clusters paired ANES response histograms and maps them to model parameters using Jensen-Shannon distance.

## Method

Agent $i$ has opinions $\mathbf{x}_i=(x_i^{(1)},x_i^{(2)})$, with sign indicating stance and magnitude indicating conviction. Writing $c=\cos\delta$ for topic correlation, the update equation for topic $v$ and the other topic $u$ is

$$
\dot{x}_i^{(v)}=-x_i^{(v)}+K\sum_j A_{ij}w_{ij}\tanh\left(x_j^{(v)}+c x_j^{(u)}\right),\qquad u\ne v.
$$

Here $K$ sets social influence and $A$ is a fixed, unweighted, undirected adjacency matrix. Influence weights vary with opinions and can be asymmetric:

$$
w_{ij}=\frac{(d_{ij}+\epsilon)^{-\beta}}{\sum_l A_{il}(d_{il}+\epsilon)^{-\beta}},\qquad \epsilon=0.002K.
$$

For a node with neighbors, the effective weights satisfy $\sum_j A_{ij}w_{ij}=1$. Larger $\beta$ increases the relative influence of similar neighbors. The distance uses the same topic correlation as the dynamics:

$$
d_{ij}^2=(x_i^{(1)}-x_j^{(1)})^2+(x_i^{(2)}-x_j^{(2)})^2
+2c(x_i^{(1)}-x_j^{(1)})(x_i^{(2)}-x_j^{(2)}).
$$

Thus topic coupling affects both neighbors' contributions and perceived similarity (Section 2.1).

The main simulations use 10,000 agents on an Erdos-Renyi network with mean degree 10, fourth-order Runge-Kutta integration with time step 0.1, and uniformly sampled initial opinions in $[-K,K]$ on each axis. Each parameter combination has 100 realizations. The first sweep varies $\beta\in[0,1.5]$ and $K\in[0,10]$ at $c=0$; the second varies $\beta\in[0,1.5]$ and $c\in[0,0.5]$ at $K=10$.

Classification uses manually chosen thresholds (Appendix A.1). Mean unnormalized conviction below 0.1 identifies neutral consensus. Otherwise, variances computed after dividing opinions by $K$ distinguish radicalized consensus (both below 0.4), one-dimensional polarization (only one at least 0.4), and two-dimensional polarization (both at least 0.4). Within the last category, normalized covariance above 0.25 identifies ideological alignment; other cases are classified as uncorrelated polarization.

For ANES, eleven selected questions yield 55 paired histograms. The authors remove missing and neutral responses, normalize the remaining distributions, and apply the pre-election weight V200010a when both questions are pre-election, otherwise the post-election weight V200010b. They cluster the pairwise Jensen-Shannon distance matrix with K-means and select the number of clusters using the silhouette coefficient. Each survey histogram is mapped to the parameter combination minimizing its mean distance from the 100 simulated distributions at that point (Section 4 and Appendix A.4).

## Experiments

**Analytical stability.** Along the aligned consensus branch, nonzero solutions appear beyond $K(1+c)=1$. For polarized states, the analysis assumes a fully connected population, approximately equal cluster sizes, and sufficiently large $K$. It reports $\beta_c^{\mathrm{ideol}}=1$, compared with $\beta_c^{\mathrm{uncor}}\approx1.145$ at $c=0$; the latter threshold increases with topic correlation. These are thresholds for the analyzed cluster configurations, not universal bounds for arbitrary sparse networks (Section 3.1 and Appendix A.3).

**Network simulations.** At zero topic correlation, low influence produces consensus and sufficiently high homophily favors four-group, uncorrelated polarization. Intermediate regimes mix consensus with long-lived one-dimensional polarization. Sparse contacts can delay depolarization even below the fully connected stability threshold. At $K=10$, increasing topic correlation favors two opposed ideological camps; stronger homophily can preserve four-group configurations despite some correlation (Figures 3-4).

**Marginal opinion distributions.** For the compared polarized configurations, projecting an uncorrelated two-topic distribution onto one topic yields a lower bimodality coefficient than one-dimensional polarization at the same parameters. Agreement on the other topic preserves influence across a disagreement. With ideological alignment, this moderation disappears and the marginal distributions approach the one-dimensional case. Figure 5 reports 95% confidence intervals from 100 configurations; its illustrative uncorrelated comparison uses $K=10$, $\beta=0.6$ (Section 3.3).

**Survey comparison.** The silhouette criterion favors two clusters of ANES histograms: consensus/one-dimensional polarization and two-dimensional polarization. The former maps mainly to low homophily and zero topic correlation. The latter maps to either high homophily with low correlation near the uncorrelated-to-ideological transition, or higher correlation with low homophily where consensus and ideological polarization coexist. The comparison supports a correspondence between distributional categories and simulated regimes, without identifying the actual social-influence parameters of respondents (Figure 6).

## Limitations

The implemented model studies only two topics and nonnegative topic correlation. Main simulations use one network family and a fixed mean degree; analytical polarized-state thresholds additionally rely on fully connected contacts, nearly equal cluster sizes, and strong influence. Long-lived one-dimensional states on sparse networks can eventually depolarize, so finite-time persistence should not be read as asymptotic stability.

State labels depend on manually inspected variance and covariance cutoffs. The ANES questions were selected to include both unimodal and bimodal distributions, and removing neutral responses changes the population being represented. Distributional matching does not establish a causal mechanism, parameter identifiability, or predictive accuracy on held-out data. The authors say retaining inactive respondents would leave the qualitative comparison unchanged, but the supplied text does not report a quantified sensitivity test.

The supplied Markdown contains damaged prose, equations, and references. In particular, Section 3.3 describes an uncorrelated comparison as having no homophily, whereas Figure 5 specifies $\beta=0.6$; the summary uses the figure's explicit setting. Appendix A.2 also prints a negative determinant condition for Jacobian stability, inconsistent with the usual two-dimensional linear stability criterion; that intermediate condition is not reproduced here. Publication year, venue, and this paper's own stable identifier are not recoverable from the supplied text. Its data-availability statement offers data on request.

## Related Concepts

- [[Opinion Dynamics]]
- [[Political Polarization]]
- [[Ideological Dimensionality]]

## Related Papers

- Baumann et al. (2021), "Emergence of polarized ideological opinions in multidimensional topic spaces" (source reference 31): the multidimensional model adapted here to static contacts.
- Pérez-Martínez et al. (2023), "Polarized opinion states in static networks driven by limited information horizons" (source reference 40): the one-dimensional static-network predecessor.
- [[Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: a complementary measurement approach to correlated political dimensions, applied to party positions rather than simulated individual dynamics.
- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]: a separate model distinguishing within-agent alignment from population consensus and finite-time polarization.

[[index|Library home]]
