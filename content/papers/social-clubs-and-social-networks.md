---
title: Social Clubs and Social Networks
type: paper
authors:
  - Chaim Fershtman
  - Dotan Persitz
year: 2021
venue: "American Economic Journal: Microeconomics"
volume: 13
issue: 1
pages: "224-251"
url: "https://www.jstor.org/stable/10.2307/27046197"
tags:
  - social-networks
  - network-formation
  - game-theory
  - club-congestion
---

## TL;DR

Individuals choose club memberships that jointly generate a weighted social network. Larger clubs provide more direct contacts but weaker links, while chains of small clubs lose value through indirect connections. The model characterizes how membership fees, congestion, and entry rules affect stable club structures. Its complete-star-empty efficiency result applies within classes of equal-sized clubs; it is not a characterization of all heterogeneous club environments. Clustering and segregation are theoretical implications, not empirically tested findings.

## Research Question

How does endogenous club membership shape social networks when individuals trade off membership costs, congestion within clubs, and depreciation along indirect paths? When do stable affiliations maximize aggregate welfare, and how does incumbent control over admission change stability?

## Motivation

Social ties often arise through shared schools, workplaces, associations, or other social contexts. Choosing one affiliation can create many links at once, so independent bilateral link decisions miss both group membership and congestion externalities. [[concepts/club-based-network-formation|Club-Based Network Formation]] makes these contexts strategic choices and distinguishes weak direct ties in large clubs from weak indirect connections through small clubs.

## Contributions

- Models affiliation choices and their induced weighted network, with benefits from direct and indirect connectivity net of membership fees.
- Introduces open and closed [[concepts/clubwise-stability|Clubwise Stability]], differing in whether incumbents can block entry.
- Characterizes welfare within equal-club-size environments and stability for complete and star club architectures.
- Shows that the balance between congestion and indirect-path depreciation affects which forms of weak connection can be stable.
- Provides mechanisms for clustering through shared clubs and for segregation through admission restrictions or heterogeneous congestion functions.

## Method

An environment is $G=(N,S,A)$: individuals, clubs, and affiliations. Every membership costs the same fee $c$. Two individuals are directly linked when they share a club. For a nonincreasing congestion function $h(m)\in[0,1]$, their direct link has weight

$$
w_{ij}(G)=\max_{s\in S_G(i)\cap S_G(j)}h(n_G(s)).
$$

Thus the smallest shared club determines link quality. An indirect path has the product of its edge weights; $d(i,j\mid G)$ is the largest such product across paths, or zero when disconnected. The paper's term "shortest weighted path" therefore means maximum product, not fewest edges. Utility is

$$
u_i(G)=\sum_{j\ne i}d(i,j\mid G)-c\,|S_G(i)|.
$$

Open stability rules out profitable individual exit, individual entry, and coordinated formation of a new club. Closed stability retains exit and formation conditions but allows an incumbent harmed by entry to veto admission. Strong efficiency maximizes the sum of utilities. These are distinct criteria because affiliation changes can affect others' connectivity and link quality.

The main architectures are **All Paired** (one two-person club per pair), **Grand Club** (everyone in one club), **$m$-Complete** (each pair shares exactly one club, all of size $m$), and **$m$-Star** (one central individual belongs to every club of size $m$, while each peripheral belongs to one). The analysis uses reciprocal congestion $h(m)=1/(m-1)$ and exponential congestion $h(m)=a+\delta^{m-1}$, with $0<\delta<1$, $a\geq0$, and $a+\delta<1$, as examples.

## Experiments

The supplied article reports analytical propositions and constructed examples, with no original empirical experiment or estimated network model. Proofs are referred to an online appendix absent from the supplied Markdown.

### Stability and welfare results

| Setting | Reported result | Source |
| --- | --- | --- |
| No congestion, $h=1$, and $0<c<n-1$ | Open-stable environments are minimally connected affiliations whose weakest membership loses at least $c$ contacts on exit; the Grand Club uniquely maximizes welfare. For $c>n-1$, only Empty is stable and efficient. | Proposition 1 |
| Fixed club size $m$ | Among $m$-uniform environments, $m$-Complete is efficient at low fees, $m$-Star at intermediate fees, and Empty at high fees, subject to existence of the architectures. | Proposition 2 |
| Very low positive fees | All Paired is uniquely open-stable and strongly efficient for $0<c<\min\{h(2)-h(2)^2,h(2)-h(3)\}$, when this interval is nonempty. | Section III.C |
| $m$-Complete, $m<n$ | Fees must deter formation of smaller clubs yet remain low enough to prevent exit. The upper bound is $(m-1)[h(m)-h(m)^2]$; the admissible interval can be empty. | Proposition 3 |
| $m$-Star | The central individual's exit incentive imposes $c\leq(m-1)h(m)$. Lower bounds deter peripheral entry and new clubs, including groups drawn from different original clubs. | Proposition 4 |
| Reciprocal congestion | A 2-Star is open-stable for $c\in[0,1]$; a Grand Club is open-stable for $c\in[1-1/(n-1),1]$. A 3-Star with $n\geq9$ is stable only at $c=1$, where that architecture exists. | Claims 1-3 |

More precisely, Proposition 2's two welfare thresholds for fixed $m$ are

$$
c_1=(m-1)[h(m)-h(m)^2],\qquad
c_2=(m-1)h(m)+\frac{(n-m)(m-1)}{m}h(m)^2.
$$

An $m$-Complete environment maximizes welfare for $0\leq c\leq c_1$, an $m$-Star for $c_1\leq c\leq c_2$, and Empty for $c\geq c_2$. Boundary ties are allowed. Comparing different club sizes additionally requires the congestion function; arbitrary mixtures of sizes are outside this result.

### Weak connections and institutional examples

Section III.E compares $h(3)$, a direct link in a three-person club, with $h(2)^2$, an indirect connection through two two-person clubs. When congestion is stronger, $h(3)<h(2)^2$, a 2-Star becomes stable over a fee interval where 3-Complete is not. When $h(3)>h(2)^2$, the paper shows how 3-Complete can instead emerge as stable, using the additional sufficient condition $h(3)\geq0.15$. These are conditional architecture comparisons, not a unique prediction for every environment. A stable 3-Complete environment can still yield less welfare than a 2-Star because individuals do not internalize all congestion effects.

Section IV constructs an Almost Grand Club with one excluded individual. That person would gain from entry, but incumbents would lose from congestion: the environment can be closed-stable while failing open stability. Section V.A gives a six-person example with four type-X individuals, $h_X(m)=1/3$, and two type-Y individuals, $h_Y(2)=1$ and $h_Y(m)=0$ for $m>2$. Separate clubs are open-stable for $c\in[2/3,1]$, despite no preference over partners' types.

Clustering arises because each club projects to a clique (Section V.B). This supplies an alternative mechanism to preferences for similar partners or transitive ties, but the paper does not estimate their relative empirical importance.

## Limitations

- Most results assume homogeneous individuals, identical membership fees, and link quality determined only by the smallest shared club. Heterogeneous skills appear in an example rather than a general characterization.
- Welfare results for $m$-uniform environments do not establish the optimum over arbitrary mixtures of club sizes. Stable structures need not be efficient, and efficient stars may fail stability because the center bears disproportionate costs.
- Equal-size complete and star architectures require compatible population sizes. The authors explicitly set aside integer-existence problems.
- Stability checks particular entry, exit, and new-club deviations; it is not a dynamic convergence theorem or immunity to every coordinated replacement of memberships. The discussion of sequential integration and segregation is suggestive.
- The supplied Markdown has damaged equations and missing footnotes. Its open new-club condition prints a weak inequality where the closed version uses a strict one, despite describing their formation conditions as shared. This summary does not treat that discrepancy as a substantive difference between the concepts. The online appendix is unavailable here, so its proofs and additional numerical examples are not independently assessed.

## Related Concepts

- [[concepts/club-based-network-formation|Club-Based Network Formation]]: affiliations generate links jointly, with membership costs and congestion externalities.
- [[concepts/clubwise-stability|Clubwise Stability]]: admissible membership deviations and incumbent entry vetoes.
- [[concepts/hypergraphs|Hypergraphs]]: explicit club membership preserves group structure that a pairwise projection can erase.
- [[concepts/social-network-analysis|Social Network Analysis]]: connectivity, weighted paths, and clustering in induced networks.

## Related Papers

- Jackson and Wolinsky (1996), "A Strategic Model of Social and Economic Networks": cited connections-model foundation and pairwise-stability comparison.
- Feld (1981), "The Focused Organization of Social Ties": cited account of social contexts organizing relationships.
- Granovetter (1973), "The Strength of Weak Ties": cited motivation for distinguishing forms of weak connection.
- Page and Wooders (2007), "Networks and Clubs": cited related work on clubs and network formation.
- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: a later library comparison, not a citation in this article; discusses explicit group representations and information lost through pairwise projection.

[[index|Library home]]
