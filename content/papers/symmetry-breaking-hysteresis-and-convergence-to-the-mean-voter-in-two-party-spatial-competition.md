---
title: "Symmetry Breaking, Hysteresis, and Convergence to the Mean Voter in two-party Spatial Competition"
type: paper
authors:
  - Daniel Miranda Machado
  - Roberto Venegeroles
year: null
tags:
  - spatial-electoral-competition
  - political-polarization
  - bifurcation-theory
  - hysteresis
  - median-voter-theorem
  - satisficing
---

## TL;DR

This paper replaces nearest-party voting with a general satisficing model in which a tolerance parameter controls how quickly voter satisfaction declines with ideological distance. Under symmetry and suitable nondegeneracy conditions, decreasing tolerance drives a supercritical pitchfork bifurcation from party convergence to two polarized equilibria. Electorate asymmetry can unfold this bifurcation into an S-shaped equilibrium diagram with hysteresis, while sufficiently high tolerance leads both parties toward the electorate's mean rather than, in general, its median.

## Research Question

How does voter tolerance for ideological distance determine whether two vote-maximizing parties converge or polarize, and how do electorate asymmetry and very high tolerance change the equilibrium center?

## Motivation

The Hotelling-Downs framework predicts convergence to the median voter under standard conditions, but persistent party separation suggests that centripetal incentives are not universal. [[Satisficing Spatial Competition]] offers a different behavioral foundation: voters may be satisfied with neither, one, or both parties, and the breadth of acceptable ideological positions changes the parties' strategic incentives. The paper asks whether this simple change can generate polarization, path dependence, and a distribution-sensitive political center without imposing extremist candidates or exogenous polarization shocks.

## Contributions

- Formulates a one-dimensional two-party game with a shared, general satisfaction kernel and a tolerance parameter $q$, rather than fixing one functional form.
- Introduces center-distance coordinates that separate the midpoint of party positions from their polarization distance.
- Derives local conditions for a supercritical pitchfork bifurcation in symmetric electorates and an imperfect unfolding under asymmetric electorates.
- Shows how an S-shaped equilibrium set can support hysteresis, so polarization can persist when tolerance returns toward earlier levels.
- Establishes, under additional moment and regularity assumptions, that large-$q$ best responses and the non-polarized equilibrium converge to the electorate's mean; the median is recovered when symmetry makes the two coincide.
- Provides explicit Gaussian and Cauchy examples with calculated critical tolerance values.

## Method

A voter at ideological position $x$ is satisfied with a party at $u_i$ with probability

$$
s_i(x,u_i)=f_q(|x-u_i|), \qquad f_q(t)=f(t/q),
$$

where $f$ is smooth, strictly unimodal, maximized at zero, and decays with distance. The width $q>0$ measures tolerance. A voter satisfied with only one party chooses it; a voter satisfied with both splits equally between them; a voter satisfied with neither abstains. Each party chooses its position to maximize its expected vote share under voter density $\rho$.

The analysis rewrites party positions as

$$
m=\frac{u_1+u_2}{2}, \qquad d=\frac{u_1-u_2}{2},
$$

where $m$ is the endogenous center and $2d$ is party separation. The first-order conditions split into a component even in $d$ and a component odd in $d$. For an even voter density, $m=0$ and the problem reduces to an odd scalar equation

$$
\Psi_q(d)=\mu(q)d+\beta(q)d^3+o(d^3).
$$

A pitchfork occurs when $\mu(q_c)=0$, the crossing is transversal, and the effective cubic coefficient is nonzero. A negative effective cubic coefficient gives the supercritical case studied in the examples. For asymmetric densities, the paper uses the implicit function theorem to track a tolerance-dependent center and studies the imperfectly unfolded equilibrium branches.

For the high-tolerance limit, the paper proves strict concavity and uniqueness of each player's maximizer on a common compact interval for sufficiently large $q$, under extra assumptions on $f''$ and moments of $\rho$. A quadratic expansion of the satisfaction kernel then makes the limiting objective equivalent to minimizing squared ideological distance, whose unique minimizer is the voter mean.

## Experiments

The evidence consists of analytical examples and numerical equilibrium diagrams rather than empirical estimation.

- With a Gaussian satisfaction kernel and Gaussian voter density, the paper derives $q_c \approx 0.807379$. The linear coefficient crosses zero with negative slope and the cubic coefficient is negative, yielding a supercritical pitchfork.
- With a Cauchy kernel and Gaussian density, the smallest positive root is $q_c \approx 0.975328$; with a Cauchy kernel and Cauchy density, it is $q_c \approx 0.906803$. Both examples again satisfy the reported supercritical conditions.
- An asymmetric two-component Gaussian electorate with $(d_1,\sigma_1)=(1,0.8)$ and $(d_2,\sigma_2)=(-1.2,1.4)$ produces shifted equilibrium branches and a hysteresis loop in the numerical diagrams. At high tolerance, both party positions approach

$$
\bar{x}=-\frac{d_1\sigma_1+d_2\sigma_2}{\sigma_1+\sigma_2},
$$

the mean of that specified density.

## Limitations

The model is deliberately stylized: ideology is one-dimensional, both parties use the same satisfaction kernel and tolerance parameter, and party objectives are expected vote shares. The bifurcation results are local and require regularity, transversality, and nondegeneracy conditions; hysteresis is demonstrated through an asymmetric parametric example rather than proved for every asymmetric electorate. The high-tolerance results add finite-moment and kernel-curvature assumptions.

The numerical examples illustrate the theory but do not estimate tolerance or validate the mechanism against electoral data. The model also omits party-specific activist constraints, reputational commitments, multidimensional issue salience, voter misperception, institutional rules, and explicit adjustment dynamics. The proposed gradient-like dynamics explain equilibrium selection qualitatively, so empirical claims about the speed, delay, or reversibility of political polarization remain outside the evidence presented.

## Related Concepts

- [[Satisficing Spatial Competition]]
- [[Co-Adaptive Political Polarization]]
- [[Opinion Dynamics]]
- Median voter theorem
- Pitchfork bifurcation
- Political hysteresis

## Related Papers

- Yang, Abrams, Kernell, and Motter (2020), "Why Are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model."
- Venegeroles (2025), "Beyond the Median Voter: A Model of How the Ideological Dimension Shapes Party Polarization."
- [[Political Polarization as a Co-Adaptive Process]]
- Macy et al. (2021), "Polarization and Tipping Points."

[[index|Library home]]
