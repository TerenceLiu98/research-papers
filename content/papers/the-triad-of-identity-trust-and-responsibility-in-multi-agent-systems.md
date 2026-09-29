---
title: The Triad of Identity, Trust and Responsibility in Multi-Agent Systems
type: paper
authors:
  - Jayati Deshmukh
  - Vahid Yazdanpanah
  - Sebastian Stein
  - Sarvapali D. Ramchurn
year: 2026
doi: "10.65109/VTZX9616"
venue: AAMAS 2026
tags:
  - multi-agent-systems
  - cooperation
  - trust
  - computational-transcendence
---

## TL;DR

The paper extends [[concepts/computational-transcendence|Computational Transcendence]] with trust propagation so that agents can account for the welfare of indirectly connected agents. In simulated iterated prisoner's dilemma games, the resulting CT+ model earns higher rewards than random play and a noisy tit-for-tat baseline. Increasing identity elasticity raises mutual cooperation from 22% to 64% to 83% across the tested low, medium, and high settings. Responsibility here means welfare-sensitive cooperation; broader ethical responsibility and resistance to strategic exploitation are not established by these experiments.

## Research Question

How can an agent's disposition to identify with others, its experience-based trust, and the network connecting agents jointly support cooperative behavior beyond immediate neighbors?

## Motivation

Purely self-interested payoff maximization can undermine collective welfare in social dilemmas. Earlier Computational Transcendence models incorporate the payoffs of agents within an identity set, but restrict interactions to direct neighbors. The paper asks how indirect trust can extend that approach when agents encounter neighbors, indirectly connected agents, and disconnected agents.

## Contributions

- Combines agent-level identity elasticity with directed, experience-dependent semantic distances.
- Extends direct identification through distance aggregation along a shortest-hop path.
- Compares CT+ with two baseline strategies and studies network topology and identity elasticity.
- Discusses supply chains, cybersecurity, and climate agreements as potential applications, without evaluating those domains.

## Method

An undirected graph represents direct social connections, while semantic distances on those connections are directed. Every agent plays with every other agent, including disconnected agents: the social graph determines identification and trust rather than restricting encounters.

For agent $a$, elasticity $\gamma_a$ controls how strongly others' payoffs enter its utility. A smaller semantic distance $d_a(b)$ means stronger identification with neighbor $b$. Equation (1) defines normalized utility over the neighborhood $N_a$:

$$
u_i(a)=\frac{\pi_i(a)+\sum_{b\in N_a}\gamma_a^{d_a(b)}\pi_i(b)}{1+\sum_{b\in N_a}\gamma_a^{d_a(b)}}.
$$

Agents periodically update neighbor distances using relative reward and cost contributions, with learning rate $\lambda$ (Equation 2). The simulations treat costs as negligible. This updates relational weights through experience rather than changing the agent-level elasticity.

For connected non-neighbors, CT+ aggregates positive edge distances $x_j$ along a path with the fewest hops:

$$
d_a^+(b)=\left(\prod_{j=1}^{n}x_j\right)^{1/(\alpha n)}
=\exp\left(\frac{1}{\alpha n}\sum_{j=1}^{n}\log x_j\right),
$$

where $n$ is the path length and $\alpha$ is a scaling constant (Equations 3-4). Disconnected agents receive infinite distance. This is a model of transitive trust; it does not establish that trust is generally transitive in real settings. The displayed utility equation remains written over direct neighbors even though the prose extends decision making to indirect connections, leaving the exact integration incompletely specified in the supplied text.

## Experiments

The NetworkX simulations use 25 agents, 100 initial rounds, semantic-distance updates, and a further 100 rounds with updated distances. Results aggregate ten random seeds per setting. The text also describes distance convergence at changes below $\epsilon=0.01$. Prisoner's dilemma payoffs are mutual cooperation $R=6$, temptation $T=10$, mutual defection $P=1$, and the exploited cooperator's payoff $S=0$.

**Baselines (Section 5.1).** Each population uses a single strategy. Random agents cooperate with probability 0.5. TFT (0.9) follows tit-for-tat 90% of the time and chooses randomly otherwise. CT+ has higher reported rewards and reaches mutual cooperation in almost 60% of games. The source gives no exact reward means for this comparison in the prose. These are homogeneous-population comparisons, not mixed-strategy tournaments or an evaluation against noiseless tit-for-tat.

**Network topology (Section 5.2).** Erdos-Renyi networks produce a more even reward distribution than the tested Watts-Strogatz and Barabasi-Albert networks. Figure 4 reports Nash products of normalized utilities of $3.06\times10^{-18}$, $2.98\times10^{-18}$, and $2.64\times10^{-18}$, respectively. The authors describe a few high-reward agents and many low-reward agents in the latter two networks; this is a result for the tested configurations rather than a general ranking of network families.

**Elasticity (Section 5.3).** Using Erdos-Renyi networks, the paper reports:

| Elasticity setting | Sampling interval | Average reward per agent | Mutual cooperation |
| --- | --- | --- | --- |
| Low | [0.05, 0.35] | 18,031 | 22% |
| Medium | [0.35, 0.65] | 26,125 | 64% |
| High | [0.65, 0.95] | 27,803 | 83% |

The reward figures are reported aggregate agent rewards, not per-encounter payoffs. Medium elasticity already produces substantial cooperation, with further gains at high elasticity.

## Limitations

- Responsibility is operationalized as incorporating others' welfare and cooperating in a particular game. The experiments do not measure accountability, competing ethical principles, or human judgments of responsible behavior.
- There is no direct CT-without-trust ablation, so the comparisons do not isolate the contribution of trust propagation from identity-weighted utility.
- The evaluated populations are small and homogeneous in strategy. Supply-chain, cybersecurity, and multilateral climate scenarios are illustrative; adversarial resilience, behavior-switching attacks, and open-world entry or exit are not tested.
- Exact action-selection rules, distance initialization and bounds, several network parameters, and values of $\alpha$ and $\lambda$ are not specified in the supplied text. Shortest-hop path selection is used, while most-reliable and minimum-distance alternatives are deferred to future work.
- The supplied Markdown contains damaged mathematical symbols and omits the target of the simulation-code footnote. Exact implementation recovery is therefore limited. It also lists Stein before Yazdanpanah in the opening author blocks, but reverses them in the ACM citation; this page follows the explicit ACM reference format.

## Related Concepts

- [[concepts/computational-transcendence|Computational Transcendence]]: identity-weighted utility and its trust-mediated extension.
- [[concepts/reputation-based-cooperation|Reputation-Based Cooperation]]: behavior-informed assessments can support cooperation beyond direct experience.
- [[concepts/social-trust-networks|Social Trust Networks]]: related graph-based representation of trust; CT+ uses positive distances on an undirected social graph rather than a signed trust graph.
- [[concepts/network-games|Network Games]]: network structure affects strategic outcomes, although CT+ permits encounters between all pairs.

## Related Papers

- Deshmukh and Srinivasa (2022), "Computational transcendence: Responsibility and agency": the cited foundation for identity-weighted utility (reference 12).
- Ramchurn, Huynh, and Jennings (2004), "Trust in multi-agent systems": cited background on individual and system-level trust (reference 32).
- Richters and Peixoto (2011), "Trust transitivity in social networks": cited motivation for indirect trust (reference 34).
- [[papers/a-model-of-long-term-conflict-resolution-and-cooperation|A Model of Long-Term Conflict Resolution and Cooperation]]: a library comparison using repeated social dilemmas, reciprocity, and imitation to study cooperation; not cited by this paper.

[[index|Library home]]
