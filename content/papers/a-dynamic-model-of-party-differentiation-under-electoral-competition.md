---
title: A Dynamic Model of Party Differentiation under Electoral Competition
type: paper
authors:
  - Junjie Liu
  - Wencheng Lin
year: 2026
tags:
  - spatial-electoral-competition
  - party-system-polarization
  - endogenous-turnout
  - wasserstein-gradient-flows
  - electoral-geography
---

## TL;DR

Parties represented as ideological distributions can separate despite a fixed, centrist electorate when electoral feedback exceeds internal diffusion. Under homogeneous proportional representation (PR), the local reflection-odd seat-share feedback cancels for two parties, but survives with three or more; valuing raw votes restores a differentiation channel even for two parties. Synthetic experiments distinguish the instability threshold, its growth rate, and eventual separation. Geographic sorting activates additional institutional curvature in multiparty competition.

## Research Question

When do small differences between otherwise identical party profiles decay, and when do party objectives, competitor count, internal dispersion, and vote-to-seat rules amplify them into sustained differentiation?

## Motivation

Point-platform models combine party location and ideological breadth too tightly to describe separated but internally diverse parties. Endogenous abstention also makes acquiring votes different from maximizing the share of votes cast or seats won. The paper combines [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]] with [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]] to model these distinctions within a common dynamic framework.

## Contributions

- An exact consideration-set choice formula for any fixed number of parties, including abstention, coupled to smooth electoral allocation rules.
- Distributional party adaptation with entropy-driven diffusion, separating within-party breadth from between-party polarization.
- A local spectral criterion comparing strategic gain with diffusion, including the two-party cancellation under pure seat-share maximization.
- A conditional connection to point-platform thresholds as diffusion vanishes, and an institutional decomposition into homogeneous responsiveness and geographic curvature.
- Synthetic stationary, spectral, nonlinear, and matched-electorate experiments that separate onset, speed, and outcome.

## Method

Party $i$ has a unit-mass ideological distribution $\mu_i$, with density $f_i$. Voter acceptance averages a Gaussian compatibility kernel over this distribution:

$$
a_i(x)=\int K_\sigma(x,y)\,d\mu_i(y),\qquad
K_\sigma(x,y)=\exp[-\|x-y\|^2/(2\sigma^2)].
$$

Acceptance events are independent conditional on voter location. Voters choose uniformly from acceptable parties and abstain if none qualifies. For $K$ parties (Equation 4),

$$
p_i(a)=a_i\int_0^1\prod_{j\ne i}[1-(1-z)a_j]\,dz,
\qquad p_0(a)=\prod_j(1-a_j).
$$

Integrating against district voter density gives unconditional support $q_{id}$, turnout $T_d=\sum_iq_{id}$, and valid-vote share $v_{id}=q_{id}/T_d$. The party objective is

$$
J_i=(1-\theta)\bar q_i+\theta S_i^R+\varepsilon H(f_i),
\qquad H(f_i)=-\int f_i\log f_i.
$$

Here $\theta$ weights seat returns relative to raw support, and $\varepsilon$ controls diffusion. Simultaneous unilateral Wasserstein ascent gives coupled transport-diffusion equations with no-flux boundaries:

$$
\partial_t f_i+\nabla\cdot(f_i\nabla\psi_i)=\varepsilon\Delta f_i,
\qquad
\psi_i=\frac{\delta[(1-\theta)\bar q_i+\theta S_i^R]}{\delta\mu_i}.
$$

The electoral maps are fixed-district-weight PR, softmax plurality, and a stylized smooth MMP entitlement with a direct-mandate floor. District-weight PR differs from nationally pooled PR when turnout varies across districts. Geographic PR and MMP simulations include a smooth five-percent threshold; the analytical homogeneous PR benchmark is threshold-free.

For an even common stationary density $f^*$, the paper examines perturbations $f_i=f^*+\delta z_i g$ with $\sum_i z_i=0$ and $g$ odd. Its strategic response operator $\mathcal B_{K,\theta}$ defines the gain

$$
\nu=\sup_{g\ne0,\;g\text{ odd}}
\frac{\langle g,\mathcal B_{K,\theta}g\rangle}{\int g^2/f^*}.
$$

Theorem 1 gives local decay for $\nu<\varepsilon$ and a growing odd mode for $\nu>\varepsilon$. For $K=2$, the response coefficient is $(1-\theta)/2$, so the strategic odd operator vanishes at $\theta=1$. For $K\ge3$, the seat component remains positive, although a positive channel alone does not establish instability.

Under pure seat maximization in a homogeneous electorate, Theorem 2 states

$$
\mathcal L_R^{\mathrm{odd}}(\varepsilon)
=g_R\mathcal L_{\mathrm{PR}}^{\mathrm{odd}}(\varepsilon/g_R),\qquad g_R>0.
$$

Thus smooth, party-anonymous rules have equivalent local odd boundaries at matched effective diffusion $\varepsilon/g_R$ and corresponding stationary profiles. This does not assert equivalence at the same unadjusted diffusion. Heterogeneous reflected districts can preserve a seat-map Hessian contribution that vanishes in the homogeneous benchmark. At a binary tie, anonymity and seat conservation cancel that institutional Hessian; behavioral vote curvature still determines stability (Appendix E).

## Experiments

All experiments use synthetic electorates. The principal mixed-objective benchmark uses standard Gaussian voters, tolerance ratio $r=\sigma/\sigma_0$, and $\varepsilon=0.002$. Stationary iteration selects an even Gibbs branch; spectral computations locate its local odd thresholds.

| Parties $K$ | Critical $r$, raw-vote objective $\theta=0$ | Critical $r$, seat objective $\theta=1$ |
| --- | --- | --- |
| 2 | 0.7903 | Odd strategic gain is zero |
| 3 | 0.8329 | 0.6310 |
| 4 | 0.8518 | 0.7519 |
| 5 | 0.8585 | 0.7993 |

These are Section 4.1's selected-branch thresholds. Larger seat weights narrow the instability window at sampled values. Boundary movement does not determine speed: at $K=5,r=0.6$, the principal growth rate increases from approximately 0.0290 to 0.0316 as $\theta$ rises from zero to one.

For $K=2,r=0.6$, the critical objective weight is $\theta_c=0.32364$. Full density dynamics below this boundary produce separated, overlapping profiles. At $\theta\approx0.284$, terminal seat-weighted spread is $P=0.1572$ and turnout rises from 0.6418 to 0.6568. At $\theta=0$, $P=0.3771$ and turnout rises from 0.6438 to 0.7120. Here $P$ measures dispersion of party means, not internal profile width. Residual, halved-time-step, and asymmetric-restart checks support these endpoints; convergence at the critical weight remains unresolved through $t=1600$ (Section 4.2).

Stronger diffusion stabilizes the common state in the sampled seat-maximization cases. For $K=3,4,5$, increasing $\varepsilon$ from 0.0005 to 0.004 lowers critical tolerances from 0.6551, 0.7805, 0.8356 to 0.5973, 0.7121, 0.7489, respectively (Section 4.3).

Geographic experiments use five point-platform parties, nine districts, $\sigma=0.65$, and five matched initializations, evaluated at $t=42$. Each heterogeneous electorate is paired with homogeneous districts having exactly its national voter density. At sorting parameter $g=0.70$, district organization changes mean terminal spread by +0.289 under plurality, +0.069 under MMP, and -0.008 under PR. The plurality-PR gap is 0.319 with heterogeneous districts versus 0.022 in the matched homogeneous control (Section 5.3).

The binary seat-maximization geographic comparison is a negative result: all tested local divergence rates are negative, maximum spread is $9.41\times10^{-7}$ at $t=42$, and extensions reduce it below $8\times10^{-12}$ at $t=84$ (Appendix F.4).

## Limitations

- The evidence is theoretical and synthetic, with fixed voter densities and party counts, conditional independence of acceptance, uniform choice within consideration sets, and myopic simultaneous adaptation. It does not identify real-world causal effects of institutional reform or party entry.
- The spectral criterion concerns reflection-odd relative-party perturbations around a selected even stationary branch. It does not classify all perturbations, establish global convergence, or prove uniqueness of the stationary profile. Equality at the boundary needs additional analysis.
- The small-diffusion limit assumes a regular centered branch, a unique centered strategic maximum, and a transverse point-threshold crossing. Homogeneous institutional equivalence requires pure seat maximization and matched effective diffusion.
- Binary cancellation is local to the tie and removes institutional curvature only. Convergence across the tested geographic examples is not a theorem for every electorate or every nonlinear initial state.
- Geographic results use point platforms and smoothed electoral maps, including a stylized MMP rule. National voter density changes across geography parameters; matching controls isolates district organization within each pair, not across the entire parameter family.
- Twelve finite-particle runs illustrate noise-driven symmetry breaking but do not estimate branch-selection probabilities or establish particle-number and time-step convergence. The numerical archive described in the manuscript was not supplied or independently executed for this summary.

Source: supplied manuscript dated September 2026. No DOI, arXiv identifier, or publication venue is stated in the supplied Markdown.

## Related Concepts

- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/party-system-polarization|Party-System Polarization]]
- [[concepts/geographic-polarization|Geographic Polarization]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]]: cited as the satisficing precursor; the present manuscript adds distributional party states, arbitrary fixed party counts, and institutional feedback.
- Lanzetti, Hajar, and Dörfler (2022), "Modeling of political systems using Wasserstein gradient flows": cited distributional modeling precursor (reference 25).
- [[papers/electoral-rule-disproportionality-and-platform-polarization|Electoral Rule Disproportionality and Platform Polarization]]: cited institutional comparison (reference 11); differing choice and payoff assumptions matter when comparing predictions about electoral rules.

[[index|Library home]]
