---
title: "Susceptibility optimization for wisdom of crowds: A social power reformulation and realization framework"
type: paper
authors:
  - Ye Tian
  - Anzhi Sheng
  - Angela Fontan
  - Long Wang
  - Karl H. Johansson
year: null
tags:
  - opinion-dynamics
  - collective-intelligence
  - convex-optimization
---

## TL;DR

The paper optimizes how much agents yield to neighbors by first choosing the weights of their initial estimates in the collective outcome, then realizing those weights through susceptibilities. Under the Friedkin–Johnsen model, this exposes a convex quadratic program. Every target weight vector is realizable exactly when the influence network is strongly connected; mixed-sign biases can then cancel completely.

## Research Question

For a fixed influence network and known individual biases, which susceptibilities minimize squared collective bias, and can agents compute them using local information?

## Motivation

Social influence changes whose initial information dominates a crowd. Simply increasing interaction need not improve accuracy. Optimizing individual responsiveness offers a way to control aggregation while preserving network topology.

## Contributions

- Reformulates a nonconvex susceptibility objective in social-power coordinates with linear feasibility constraints.
- Characterizes optimal weights for uniform-sign and mixed-sign biases; constructs strictly positive bias-canceling weights in linear time in the latter case.
- Proves that full susceptibility realizability is equivalent to strong connectivity, and gives target-specific conditions for general networks.
- Derives all realizing susceptibilities using a Laplacian pseudoinverse and nullspace terms.
- Provides centralized and distributed algorithms with explicit complexity and convergence conditions.

## Method

With row-stochastic influence matrix $W$ and diagonal susceptibility matrix $A$, the dynamics are

$$
y(k+1)=AWy(k)+(I-A)y(0).
$$

Every sink strongly connected component must contain an agent with susceptibility below one. This ensures $\rho(AW)<1$ and defines $V=(I-AW)^{-1}(I-A)$. The average limiting opinion is $x^\top y(0)$, where $x=V^\top\mathbf1/n$ is the social-power vector. For bias vector $\delta$, the objective is $(x^\top\delta)^2$.

Writing $L=I-W$, feasible weights admit a nonnegative delegated-power vector $\gamma$ satisfying

$$
L^\top\gamma=\mathbf1/n-x,\qquad a_i=\frac{\gamma_i}{x_i+\gamma_i}.
$$

Thus minimizing $(x^\top\delta)^2$ over $x\in\Delta_n$, $\gamma\geq0$, and this linear equality is an equivalent convex program. Bounds on susceptibility also translate into linear inequalities in these variables.

For biases of one sign, simplex-optimal weights concentrate on agents with smallest absolute bias. With both signs present, the optimal set is $\{x\in\Delta_n:x^\top\delta=0\}$. Pairing opposite-sign agents and mixing their bias-canceling weights constructs an interior point in $O(n)$ time (Theorem 2).

On a strongly connected network, all realizations of a target $x$ take the form

$$
\gamma=(L^\top)^\dagger(\mathbf1/n-x)+\beta\omega,
$$

where $\omega$ is normalized left eigenvector centrality and $\beta$ ensures nonnegativity. Increasing $\beta$ raises susceptibility without changing social power. For general networks, realizability additionally requires $\mathbf1/n-x\in\operatorname{Null}(L)^\perp$ and nonnegative pseudoinverse-solution coordinates outside sink components (Corollary 1). If the selected simplex optimum is infeasible, a constrained convex program finds the best realizable target.

The centralized algorithm costs $O(n^3)$ when the selected target is realizable. The distributed mixed-sign construction assumes strong connectivity and an opposite-sign neighbor for every agent. Local linear iterations and max-consensus approximate realizing susceptibilities with $O(T|E|)$ communication for $T$ iterations, rather than a network-size-independent total cost.

## Experiments

Evidence consists of analytical results and illustrative numerical examples. Three-agent examples show nonconvexity and how weaker connectivity restricts attainable weights. A five-agent example with biases $(-2,5,3,-6,1)$ compares optimized susceptibilities against uniform susceptibility $0.5$: optimized trajectories approach zero collective bias, while the baseline remains biased. Larger circulation parameter $\beta$ slows convergence despite preserving the optimal limiting outcome.

A disconnected five-agent example shows that a simplex-optimal target can fail realizability; selecting a feasible alternative restores zero bias. The distributed example uses the same five-agent network and shows approximation improving with iteration budget, with initialization affecting finite-budget error. These are synthetic demonstrations, not human or LLM-agent benchmark evaluations.

## Limitations

- Bias information is assumed available. Cross-task calibration is justified when biases are proportional across tasks; arbitrary domain shifts need not preserve the solution.
- The main objective is squared bias, not mean squared error. Variance and lexicographic bias-then-variance optimization are extensions in Remark 6.
- Results concern a fixed linear influence network; time-varying networks and budgeted susceptibilities are future work.
- Strong connectivity alone does not supply the opposite-sign neighbor condition needed by the proposed one-hop distributed pairing procedure.
- The supplied Markdown does not establish this manuscript's publication year or stable identifier; year is left unspecified.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: responsiveness and network structure determine limiting aggregation.
- [[concepts/social-power-realization|Social Power Realization]]: translates desired aggregation weights into feasible interaction parameters.

## Related Papers

- Tian et al. (2026), “Susceptibility optimization and the wisdom of crowds in influence networks”: preliminary IFAC conference version; this manuscript expands realizability, bias cases, and decentralized implementation.
- Tian, Wang, and Bullo (2023), “How social influence affects the wisdom of crowds in influence networks”: prior analysis connecting social power to collective accuracy.
- Abebe et al. (2021), “Opinion dynamics optimization by varying susceptibility to persuasion via non-convex local search”: related susceptibility-based opinion minimization, compared with the uniform-sign case here.
