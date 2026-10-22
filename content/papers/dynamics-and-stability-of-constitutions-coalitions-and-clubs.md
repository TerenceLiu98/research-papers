---
title: "Dynamics and Stability of Constitutions, Coalitions, and Clubs"
type: paper
authors:
  - Daron Acemoglu
  - Georgy Egorov
  - Konstantin Sonin
year: null
tags:
  - dynamic-collective-choice
  - institutional-stability
  - coalition-formation
  - political-economy
  - markov-perfect-equilibrium
---

## TL;DR

When current collective choices also redistribute future decision-making power, a reform can be rejected even if it raises everyone's immediate payoff. Under acyclicity, the paper recursively characterizes [[concepts/dynamic-institutional-stability|Dynamic Institutional Stability]] and shows that, for sufficiently patient agents and small transition costs, the axiomatic outcomes coincide with pure-strategy Markov perfect equilibrium outcomes across a broad class of agenda-setting and voting protocols.

## Research Question

Which constitutions, coalitions, clubs, or other institutional states remain stable when each state determines both current payoffs and who can choose future states?

## Motivation

Static comparisons miss a central commitment problem in institutional reform. A group may prefer a proposed arrangement to the status quo yet oppose it because the reform empowers actors who will subsequently choose a less attractive state. Explaining persistence therefore requires evaluating the stable destination of a change, not only its first-step payoff.

## Contributions

- Defines a finite-state framework in which each state specifies stage payoffs and its own set of winning coalitions.
- Gives three axioms for outcome mappings and a recursive construction of stable states under acyclicity; different admissible mappings select the same set of stable states.
- Establishes equivalence between the axiomatic characterization and pure-strategy Markov perfect equilibria when agents are sufficiently patient, state changes impose small transaction costs, and protocols expose all alternatives or agenda setters.
- Shows why stable outcomes may be Pareto dominated: an attractive intermediate state can be unstable and lead to a destination opposed by the currently powerful coalition.
- Supplies tractable sufficient conditions for acyclicity using ordered states, single-crossing or single-peaked preferences, and restrictions on winning coalitions.
- Applies the framework to the joint evolution of political participation and policy toward secular and religious groups.

## Method

There is a finite set of players and a finite set of states. State $s$ assigns every player a stage payoff $w_i(s)$ and a family of winning coalitions $\mathcal W_s$. Thus a state jointly represents an allocation and the political procedure that governs its replacement.

An outcome mapping $\phi$ sends every initial state to an ultimate state. The axiomatic characterization requires:

1. **Desirability:** if $\phi(s)\neq s$, a coalition that is winning in $s$ strictly prefers $\phi(s)$ to $s$.
2. **Stability:** the selected destination is a fixed point, $\phi(\phi(s))=\phi(s)$.
3. **No superior stable alternative:** no other fixed point that can defeat $s$ is preferred by a winning coalition in $s$ to $\phi(s)$.

Under the paper's acyclicity assumptions, states can be ordered recursively. For each state, $\phi$ either leaves it fixed or selects an already identified stable state that defeats it and is not itself defeated, from that state's perspective, by another eligible stable state. Theorem 1 proves existence and characterizes every mapping satisfying the axioms.

The noncooperative game proceeds in discrete time. Protocols specify finite sequences of exogenous proposals or agenda setters, and the current state's winning-coalition rule determines whether a proposal replaces the status quo. A state change temporarily yields a lower transition payoff. Theorem 2 shows that when the discount factor is sufficiently close to one, every axiomatic mapping can be implemented by a pure-strategy Markov perfect equilibrium and every such equilibrium reaches the outcome of an axiomatic mapping after one period.

## Experiments

The paper is theoretical and contains analytical examples rather than statistical experiments.

**Constitutional reform example.** An elite prefers constitutional monarchy to absolutism in current payoff terms, while a middle class with power under constitutional monarchy would subsequently choose democracy. Sufficiently patient elites therefore retain absolutism because the attractive reform is not dynamically stable. The example also produces a Pareto-dominated stable state.

**Political-rights application.** Individuals are ordered from secular to religious. A state combines a connected set of political participants with a policy on religiosity, and a majority or supermajority of current participants chooses the next state. Under increasing differences and mild genericity, the general characterization applies. The propositions show, conditional on the stated payoff inequalities, when participation expands toward an extreme, when it expands to everyone, and how unanimity can support full participation by protecting the existing policy through veto power.

**Ordered-state results.** For ordered agents and states, single-crossing preferences plus a monotonic quasi-median-voter property are sufficient for the required acyclicity. Single-peaked preferences also suffice under the stronger condition that winning coalitions intersect across states.

## Limitations

The sharp equilibrium characterization relies on a finite state space, acyclicity, sufficiently patient players, positive transition costs, and protocols that eventually expose every alternative or every player as an agenda setter. Transition costs are technically important for pure-strategy equilibrium existence even though their discounted payoff effect becomes small as patience increases.

The model has complete information, deterministic transitions, infinitely lived agents, and no binding commitment by newly empowered groups. The authors identify stochastic feasibility or power changes and capital-like state variables as extensions. The political-rights application is a stylized theoretical illustration, not an empirical test of particular countries or religious groups. Its unanimity results are explicitly conditional on such rules being feasible and credible.

Stable outcomes are not generally efficient. The paper's positive efficiency result requires that the current decision makers can reproduce any preferred payoff allocation without surrendering political power; absent that condition, Pareto-dominated stability remains possible.

## Related Concepts

- [[concepts/dynamic-institutional-stability|Dynamic Institutional Stability]]
- [[concepts/clubwise-stability|Clubwise Stability]]: a static membership-deviation concept with institution-specific entry and exit rules, rather than a forward-looking state-transition solution.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: another setting where single-peaked preferences and median-voter logic organize political choice, but without endogenous future decision rules in its baseline form.

## Related Papers

- Roberts (1999), "Dynamic Voting in Clubs": a precursor with majority voting, single-crossing preferences, and nested clubs.
- Barberà, Maschler, and Shalev (2001), "Voting for Voters: A Model of the Electoral Evolution": a precursor on dynamic club admission.
- Chwe (1994), "Farsighted Coalitional Stability": relates consistent and stable sets when transitions follow exogenous rules.
- Gomes and Jehiel (2005), "Dynamic Processes of Social and Economic Interactions: On the Persistence of Inefficiencies": studies dynamic bargaining position and inefficient outcomes with side payments.
- Lagunoff (2009), "The Dynamic Stability and Reform of Political Institutions": connects political reform to time inconsistency in induced social rules.

[[index|Library home]]
