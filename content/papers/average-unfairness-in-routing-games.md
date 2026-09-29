---
title: Average Unfairness in Routing Games
type: paper
authors:
  - Pan-Yang Su
  - Arwa Alanqary
  - Bryce L. Ferguson
  - Manxi Wu
  - Alexandre M. Bayen
  - Shankar Sastry
year: 2026
venue: AAMAS 2026
doi: 10.65109/HAKF7947
tags:
  - routing-games
  - fairness
  - constrained-optimization
  - algorithmic-game-theory
---

## TL;DR

The paper introduces average unfairness, the ratio of mean travel latency to the shortest latency among used routes within each origin-destination commodity. Its worst-case value at system-optimal flows equals the known bounds for loaded and user-equilibrium unfairness, although the measures differ on individual flows. At a common tolerance, constraining average unfairness permits total latency no greater than constraining loaded unfairness. Strict improvement requires additional conditions; even parallel-link networks allow equality when the loaded constraint already permits the system optimum.

## Research Question

How unfair can system-optimal routing be under an average-user measure, how does that measure compare with existing worst-user measures, and when does changing the fairness constraint improve routing efficiency?

## Motivation

Centralized routing can reduce total travel time while assigning some users longer trips. Loaded unfairness measures only the largest disparity and ignores how many travelers incur it. [[concepts/average-unfairness-in-routing|Average Unfairness in Routing]] instead weights experienced latency by flow, while retaining the best-served user's latency as the reference. This changes the fairness objective and the feasible set of the constrained optimization problem.

## Contributions

- Defines average unfairness and interprets it as expected latency-ratio envy relative to the best-served user in the same commodity.
- Proves a tight class-wide bound determined by latency steepness, matching the existing bounds for loaded and user-equilibrium unfairness (Theorem 3.2).
- Establishes pointwise comparisons and counterexamples separating the three measures (Section 3.2).
- Gives sufficient conditions for strict cost improvement under average rather than loaded unfairness, and characterizes used links in parallel-link constrained optima (Section 4.1).
- Illustrates the trade-offs with approximate constrained solutions on four transportation networks (Section 4.2).

## Method

The model is a [[concepts/nonatomic-routing-games|Nonatomic Routing Game]] on a finite directed network with positive demands $r_i$ and nonnegative, continuous, nondecreasing edge latencies. Path flows satisfy each commodity's demand. Total latency is $C(f)=\sum_e f_e\ell_e(f_e)$, and $C_i(f)$ is commodity $i$'s total latency. System-optimal flows minimize $C$; Nash flows put positive flow only on minimum-latency paths.

Let $m_i(f)$ and $M_i(f)$ be the minimum and maximum latencies among **used** paths for commodity $i$, and let $L_i^{NE}$ be that commodity's equilibrium latency. The three measures are

$$
U^A(f)=\max_i\frac{C_i(f)}{r_i m_i(f)},\qquad
U^L(f)=\max_i\frac{M_i(f)}{m_i(f)},\qquad
U^{UE}(f)=\max_i\frac{M_i(f)}{L_i^{NE}}.
$$

The average is within commodities; the overall measure takes their maximum. The paper adopts $0/0=1$. Used-path fairness does not characterize Nash equilibrium, because unused routes may be faster.

For differentiable latencies with convex $x\ell(x)$ (the paper's "standard" condition), marginal latency is $\hat\ell(x)=\ell(x)+x\ell'(x)$. Define

$$
\gamma(\mathcal L)=\sup_{\ell\in\mathcal L}\sup_{x>0}
\frac{\hat\ell(x)}{\ell(x)}.
$$

Theorem 3.2 states that the supremum of each unfairness measure over system-optimal flows and instances with latencies in $\mathcal L$ equals $\gamma(\mathcal L)$ when the class also includes all constant functions. Standard differentiable latencies suffice for the upper bounds; constants are additionally used for tightness. For nonnegative-coefficient polynomials of degree at most $n$, the bound is $n+1$. Pigou-network constructions approach the average-unfairness bound; equality of class-wide suprema does not imply equality on an individual flow.

For finite ratios, Proposition 3.7 gives $U^L>U^A>1$ whenever used-path latencies differ within a commodity, and $U^L=U^A=1$ otherwise. Loaded and UE unfairness have no general ordering across multiple commodities. At a single-commodity system optimum, $U^L\geq U^{UE}$, with equality only when both are one. Average and UE unfairness have no general ordering, even at system optima.

The constrained system optimum minimizes $C(f)$ subject to $U(f)\leq1+\beta$. Feasible-set inclusion yields $C^A(\beta)\leq C^L(\beta)$ for $\beta\geq0$. Under standard differentiable latencies and $\beta>0$, Proposition 4.4 ensures strict improvement if a loaded-constrained optimum is not system-optimal and uses a globally minimum-latency path for every commodity. Parallel-link networks satisfy the path condition (Corollary 4.5). On general networks, Example 4.3 gives equal constrained costs above the system optimum, so strict improvement is not universal. Corollary 4.6 shows that, for each of the three constraints on parallel links, used links form a prefix of an ordering by free-flow latency; tied latencies can require different orderings for different solutions.

## Experiments

Section 4.2 uses BPR latencies $\ell_e(f_e)=\xi_e[1+0.15(f_e/\kappa_e)^4]$ on four benchmark networks:

| Network | Vertices | Edges | Commodities |
| --- | ---: | ---: | ---: |
| Anaheim | 416 | 914 | 1,406 |
| Sioux Falls | 24 | 76 | 528 |
| Massachusetts | 74 | 258 | 1,113 |
| Friedrichshain | 224 | 523 | 506 |

Following Jalota et al. (2023), the authors solve convex programs with objective

$$
\alpha C(f)+(1-\alpha)\sum_e\int_0^{f_e}\ell_e(s)\,ds,
\qquad \alpha\in[0,1],
$$

varying $\alpha$ in increments of 0.01. The endpoints recover Nash and system-optimal flows. They evaluate all three unfairness measures on the resulting path assignments and report cost normalized by the system-optimal cost.

The reported comparisons favor average over loaded unfairness at all plotted comparisons except one point in network (d). Average and UE constraints have no consistent dominance ordering across networks and tolerances. These curves come from an interpolation-based approximation to constrained optimization, not certified exact solutions of every CSO problem. The supplied text does not give numerical percentage improvements.

## Limitations

- The setting has divisible traffic and fixed demand. Atomic congestion games and broader applications remain future work; traveler compliance is not tested.
- Average unfairness does not bound the worst user's relative delay at the same numerical tolerance as loaded unfairness. A cost reduction reflects a different fairness requirement.
- Strict CSO improvement excludes zero tolerance and, in parallel networks, cases where loaded-constrained routing already reaches the system optimum. General networks can yield equal costs above that optimum.
- Fairness depends on path assignments: identical edge flows and total costs can produce different loaded unfairness. Changes in path support can also disrupt continuity of the fairness measure.
- Ratios with zero minimum latency and positive total latency are not finite. The stated $0/0$ convention does not by itself justify extending strict finite-ratio comparisons to that case.
- The supplied Markdown contains damaged symbols, omitted footnotes, and a citation to benchmark source [18] whose bibliography entry is absent. Numerical conclusions here follow the prose and table; no precise values are inferred from the untranscribed plots.

## Related Concepts

- [[concepts/average-unfairness-in-routing|Average Unfairness in Routing]]: flow-weighted latency relative to the best-served used route.
- [[concepts/nonatomic-routing-games|Nonatomic Routing Games]]: equilibrium, marginal-cost routing, and fairness-constrained system optimization.

## Related Papers

- Jahn et al. (2005), "System-Optimal Routing of Traffic Flows with User Constraints in Networks with Congestion": cited foundation for routing unfairness and constrained system optima.
- Correa, Schulz, and Stier-Moses (2007), "Fast, Fair, and Efficient Flows in Networks": cited loaded-unfairness bound.
- Roughgarden (2002), "How unfair is optimal routing?": cited UE-unfairness bound.
- Jalota et al. (2023), "Balancing fairness and efficiency in traffic routing via interpolated traffic assignment": source of the numerical interpolation procedure.

[[index|Library home]]
