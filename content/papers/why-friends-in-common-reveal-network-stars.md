---
title: Why friends in common reveal network stars
type: paper
authors:
  - Alec McGail
  - Scott Feld
year: 2026
tags:
  - network-science
  - network-sampling
  - friendship-paradox
---

## TL;DR

Repeated appearances in randomly sampled neighbor lists strongly favor high-degree nodes. McGail and Feld derive an exact recurrence extending the friendship paradox to common neighbors and illustrate how two or three shared nominations can reveal hubs in highly skewed Facebook and citation networks.

## Research Question

How does expected total degree increase with the number of sampled individuals sharing a neighbor, and how much sampling is needed to encounter such common neighbors?

## Motivation

Friend nominations provide local access to well-connected people without a complete network map. Repeated nominations promise stronger targeting, but their usefulness depends on degree heterogeneity and the sampling design. Applications include identifying influential individuals, monitoring contagion, and locating frequently cited work; these are motivations rather than tested intervention outcomes.

## Contributions

- Extends the [[concepts/friendship-paradox|Friendship Paradox]] through falling-factorial degree weighting.
- Derives the expected number of common-neighbor instances in a uniform node sample.
- Demonstrates the practical contrast between highly skewed networks and networks constrained by physical proximity.
- Distinguishes global hubs found through random sampling from local hubs found through restricted sampling frames.

## Method

For degree $d_i$, define $w_i^{(k)}=(d_i)_k=d_i(d_i-1)\cdots(d_i-k+1)$. Counting common-neighbor instances across sets of $k$ distinct sampled neighbors weights node $i$ by $w_i^{(k)}$. Let $M_k$ and $V_k$ be the mean and variance of degree under these weights. Reweighting by $d_i-k$ gives (Eq. 7):

$$
M_{k+1}=M_k+\frac{V_k}{M_k-k}.
$$

The recurrence applies when the next weighted distribution exists. At $k=0$ it recovers $M_1=M_0+V_0/M_0$. Expected degree rises strictly while weighted variance is positive and eventually reaches the maximum degree. Under this counting scheme, the result depends on the degree distribution, not clustering or assortativity. Directed networks use receiver in-degrees or sender out-degrees as appropriate.

For a uniform sample of $s$ nodes from $N$, let $E_k$ count expected common-neighbor **instances**, allowing the same node to count for multiple subsets. Equations 8–9 give

$$
E_1=sM_0,\qquad
E_{k+1}=E_k(M_k-k)\frac{s-k}{N-k}\frac{1}{k+1}.
$$

These are expected instance counts, not probabilities of finding a distinct hub. The degree-distribution analysis predicts much stronger amplification under long tails than under narrow distributions. Its truncated power-law illustration is a surrogate for the Barabási–Albert degree tail, not an exact finite-network result for that generative model.

## Experiments

The authors run 300 sampling repetitions per empirical illustration, collecting complete friend or citation lists until a target first reaches $k$ nominations and breaking ties uniformly. The Facebook network contains 63,392 users and 816,886 friendships, with mean degree 25.8. The citation network comprises 66,408 sociology articles from 2010–2019 and about 1.77 million distinct cited works, with mean in-degree about 1.99.

| Network | Nominations $k$ | Mean sampled nodes | Mean target degree | Target degree: 5th–95th percentiles |
| --- | ---: | ---: | ---: | --- |
| Facebook | 2 | 12.8 | 208.6 | 22–740 |
| Facebook | 3 | 46.9 | 382.8 | 61–1,098 |
| Citations | 2 | 11.4 | 468.7 | 12–1,412 |
| Citations | 3 | 37.9 | 848.4 | 140–2,056 |

Tables 1–2 report broad variation despite large mean gains. The mean Facebook degree at $k=3$ exceeds the degree of 99.9% of users; the mean citation count at $k=2$ exceeds that of 99.99% of cited works. These compare means with population ranks, not per-run success probabilities. Separately, the paper reports top-5% success rates of about 64% and 98% for twice-nominated Facebook and citation targets.

Four less-skewed networks—an Indian village, the Western US power grid, a French high school, and the *C. elegans* chemical connectome—require three or four nominations and sampling roughly 1–5% of the population to reach the reported top-5% threshold.

## Limitations

The practical first-hit simulations do not sample exactly from the theoretical weighted distribution. At $k=1$, choosing one random neighbor of one random ego gives an ego-based mean, which need not equal the edge-based $M_1$ when degrees are correlated. For higher $k$, stopping at the first repeated nomination favors nodes reaching the threshold faster.

Nonrandom samples can identify local stars without identifying global hubs. Full neighbor lists may be difficult to collect, and incomplete or biased reporting remains an open question. Much of the analysis concerns means rather than sampling variability. Intervention benefits and a proposed connection to preferential attachment are not tested here. The supplied Markdown references supplementary proofs and results without including the full supplement.

## Related Concepts

- [[concepts/friendship-paradox|Friendship Paradox]] — repeated nominations extend the degree bias of random edge endpoints.
- [[concepts/chung-lu-graphs|Chung-Lu Graphs]] — an expected-degree model illustrating heterogeneous degrees and size-biased neighbor distributions; the present recurrence does not require that model.

## Related Papers

- Feld (1991), *Why your friends have more friends than you do* — the original mean-degree identity extended here (reference 1).
- Kumar, Krackhardt, and Feld (2024), *On the friendship paradox and inversity* — clarifies the ego-based versus alter-based sampling distinction used in the simulation discussion (reference 6).
- Zhang, Kolaczyk, and Spencer (2015), *Estimating network degree distributions under sampling* — related inference from partial network observations (reference 23).
