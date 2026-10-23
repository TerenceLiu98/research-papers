---
title: The Maki-Thompson model with random awareness
type: paper
authors:
  - Cristian F. Coletti
  - Denis A. Luiz
  - Alejandra Rada
year: 2025
source_job_id: "3a5fbf9d-36f7-4290-a1c5-8c8b128dc0dc"
tags:
  - rumor-spreading
  - stochastic-processes
  - density-dependent-models
  - law-of-large-numbers
---

## TL;DR

The paper generalizes the Maki-Thompson rumor model by assigning each individual a random number of exposures before they begin spreading, with an additional probability of becoming a stifler after the first exposure. Because the resulting population process has countably many awareness states, the authors prove a functional law of large numbers for density-dependent Markov processes in $\ell^p$ spaces. They use the deterministic limit to characterize final state proportions and the maximum spreader proportion, and show through parameter examples that random awareness can produce multiple endogenous waves of rumor propagation.

## Research Question

How can a Maki-Thompson rumor process accommodate heterogeneous, randomly distributed awareness thresholds, and what does its large-population limit imply about outbreak extinction, final state proportions, peak prevalence, and repeated propagation waves?

## Motivation

Classical Daley-Kendall and Maki-Thompson models use a small fixed set of states. The $k$-spreading Maki-Thompson model delays spreading until a fixed number of exposures, but it still assumes the same threshold for everyone. Random individual thresholds produce countably many listener states and therefore cannot be represented in any fixed finite-dimensional integer lattice. This motivates both a more heterogeneous [[concepts/misinformation-spreading-models|rumor spreading model]] and an extension of the density-dependent population-process law of large numbers beyond finite-dimensional state spaces.

## Contributions

- Defines the Maki-Thompson model with random awareness (MT-RA), in which $p_i$ is the probability that an individual begins spreading after exactly $i$ exposures and $p_0$ is the probability of becoming a non-spreading anti-gossip individual after first contact.
- Proves a functional law of large numbers for density-dependent stochastic processes with countably many transitions in $\ell^p(\mathbb R)$, under bounded-rate summability and Lipschitz drift conditions.
- Derives almost-sure large-population limits for the absorption time and the proportion in every listener state at absorption.
- Characterizes the limiting maximum spreader proportion through critical points of the accelerated deterministic trajectory and gives sufficient conditions for that maximum to be unique.
- Recovers the fixed-threshold $k$-spreading Maki-Thompson model as a special case and proves that its limiting spreader trajectory has a unique maximum.
- Exhibits parameter distributions for which MT-RA has two propagation peaks without an external shock.

## Method

The population is homogeneously mixed and closed. At time $t$, $Y^n(t)$ counts spreaders, $X_i^n(t)$ counts individuals who have not started spreading after their current exposure history, and the remaining population consists of stiflers. The probabilities $(p_i)_{i\geq 0}$ determine the random exposure threshold. Conditional hazards

$$
q_1=p_1, \qquad q_i=\frac{p_i}{\sum_{k\geq i}p_k},\quad i\geq 2,
$$

give the probability that an $i$-listener starts spreading at the next relevant contact. Contacts either advance a listener to the next awareness state, turn the listener into a spreader, immediately stifle an anti-gossip individual, or turn a spreader into a stifler after contact with someone who already knows the rumor.

For the general limit theorem, the scaled process is written as a sum of independent time-changed Poisson processes with countably many jump vectors. If the weighted supremum of transition rates is summable and the aggregate drift $F$ is Lipschitz, then on every finite time interval the stochastic trajectory converges almost surely and uniformly in the $\ell^p$ norm to the solution of

$$
X(t)=X(0)+\int_0^t F(X(s))\,ds.
$$

The proof centers the Poisson processes, controls their combined contribution through the summability condition, and applies Gronwall's inequality.

The rumor process is then time-changed by cumulative spreader activity. In this accelerated time, listener coordinates satisfy a triangular system: $x_1(t)=x_1^0e^{-t}$, while each subsequent state receives flow from the preceding state and loses mass at unit rate. Explicit solutions yield the limiting state proportions. The accelerated absorption time is the positive root at which the limiting spreader coordinate reaches zero. Differentiating that coordinate gives the equation used to locate candidate peaks and determine the global maximum.

## Experiments

The paper reports analytical and numerical illustrations rather than empirical validation or finite-population simulation studies.

Two finite-support threshold distributions demonstrate two-wave trajectories under the standard initial configuration. For $(p_0,\ldots,p_4)=(0.053,0.004,0.023,0.163,0.757)$, the second peak is larger. For $(p_0,\ldots,p_6)=(0.009,0.014,0.002,0.038,0.004,0.167,0.766)$, the first peak is larger.

For Poisson thresholds, the reported cases are:

| $\lambda$ | $x_{1,\infty}$ | $x_{2,\infty}$ | $x_{3,\infty}$ | $y_{\max}$ |
| --- | ---: | ---: | ---: | ---: |
| 2 | 0.238539 | 0.203074 | 0.079212 | 0.093006 |
| 16 | 0.005974 | 0.030592 | 0.078317 | 0.000716 |

The numerical curve suggests, but does not prove, that $y_{\max}(\lambda)$ has a maximum near $\lambda=1.67$ and that the final ignorant proportion approaches zero as $\lambda$ grows.

For Zeta thresholds, $s=1.01$ gives $y_{\max}=0.00379$ and $x_{1,\infty}=0.169622$, while $s=5$ gives $y_{\max}=0.2994$ and $x_{1,\infty}=0.2014504$. The reported large-$s$ limits approach the classical Maki-Thompson values $y_{\max}\approx0.3068$ and $x_{1,\infty}\approx0.203187$.

For thresholds uniform on $\{0,\ldots,k\}$, the MT-RA model differs from the fixed-threshold $k$-spreading model. At $k=2$, the respective reported peak proportions are $0.0848$ and $0.174233$; at $k=3$, they are $0.067350$ and $0.110627$. The authors conjecture that the uniform-threshold peak vanishes as $k$ grows.

## Limitations

- The model assumes a closed, homogeneously mixed population. It does not represent network topology, demographic structure, exogenous shocks, or empirical contact processes.
- The principal conclusions are asymptotic as population size tends to infinity. The supplied paper gives no finite-population approximation rate or uncertainty assessment for the numerical examples.
- The multiple-wave result is demonstrated through selected parameter examples; the paper does not give a general necessary-and-sufficient characterization of distributions that generate multiple waves.
- Several claims about Poisson, Zeta, and uniform parameter families are based on plotted numerical behavior and are explicitly presented as suggestions or conjectures rather than proved results.
- The source does not report calibration to observed rumor outbreaks, so the state proportions and peak sizes are properties of the model rather than estimates of real-world diffusion.
- The supplied Markdown contains extraction damage in some notation. The summary retains only claims and quantities that are stated clearly enough to interpret.
- No DOI, arXiv identifier, or publication venue is provided in the supplied source.

## Related Concepts

- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: the broader family of compartmental and network models for rumor and misinformation diffusion.
- Density-dependent population processes: stochastic population models whose scaled transition rates depend on current population densities; this paper extends their functional law of large numbers to countably many states in $\ell^p$.
- Maki-Thompson rumor model: the classical ignorant-spreader-stifler process generalized by random exposure thresholds in this paper.
- Propagation waves: distinct local peaks in the spreader trajectory, which heterogeneous awareness thresholds can generate endogenously in MT-RA.

## Related Papers

- Maki and Thompson (1973), *Mathematical Models and Applications*: introduces the classical Maki-Thompson rumor model generalized here.
- Rada, Coletti, Lebensztayn, and Rodriguez (2021), "The Role of Multiple Repetitions on the Size of a Rumor": introduces the fixed-threshold $k$-spreading Maki-Thompson model recovered as a special case.
- Lebensztayn, Machado, and Rodriguez (2011), "Limit Theorems for a General Stochastic Rumour Model": an antecedent using density-dependent population-process methods for rumor dynamics.
- Ethier and Kurtz (2009), *Markov Processes: Characterization and Convergence*: the finite-dimensional density-dependent framework extended by the paper.
- [[papers/rumor-propagation-on-hypergraphs|Rumor propagation on hypergraphs]]: studies a different departure from homogeneous pairwise stifling through group-aware interactions.
- [[papers/the-physics-of-news-rumors-and-opinions|The Physics of News, Rumors, and Opinions]]: reviews statistical-physics approaches to information diffusion.

[[index|Library home]]
