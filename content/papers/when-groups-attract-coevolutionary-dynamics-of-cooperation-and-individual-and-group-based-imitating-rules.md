---
title: "When groups attract: coevolutionary dynamics of cooperation and individual- and group-based imitating rules"
type: paper
authors:
  - Dini Wang
  - Peng Yi
  - Gang Yan
  - Feng Fu
year: null
source_job_id: "1400f3fa-86c1-4b4f-9a3b-f6fafca4012a"
tags:
  - evolutionary-game-theory
  - cooperation
  - hypergraphs
  - higher-order-networks
  - social-learning
  - public-goods-games
---

## TL;DR

Wang, Yi, Yan, and Fu study how cooperation and the rule used to choose imitation targets coevolve in public goods games on hypergraphs. They compare individual-biased (IB), group-biased (GB), and group-and-individual-biased (GIB) imitation. Across analytical calculations, simulations, and many synthetic and empirical hypergraphs, GB most strongly promotes cooperation, while cooperators preferentially adopt GB when rules coevolve. The advantage depends on higher-order structure: a single well-mixed group suppresses cooperation, whereas shared nodes or groups can connect otherwise isolated groups and intermediate group sizes can help cooperation. Separate LLM prompts favor GIB, showing that heuristic rule preference need not match evolutionary success in the game.

## Research Question

How do individual-level and group-level success biases compete and coevolve with cooperation when people interact in overlapping groups rather than only in pairs? Which hypergraph structures make cooperation and group-biased imitation more likely to spread?

## Motivation

Social learners can observe both the success of an individual and the success of the group to which that individual belongs. These signals need not agree: defectors can receive higher individual payoffs in a public goods game, while groups with more cooperators can have higher average payoffs. A pairwise network cannot represent this distinction without collapsing group membership. [[concepts/hypergraphs|Hypergraphs]] provide the population structure, while [[concepts/public-goods-games|Public Goods Games]] provide the collective-action dilemma.

## Contributions

- Defines a common hypergraph model for three imitating rules: IB biases selection of the individual role model, GB biases selection of the group but samples its member neutrally, and GIB biases both stages.
- Derives a weak-selection mutation-selection equilibrium for every behavior-rule combination on an arbitrary connected hypergraph, including cooperation thresholds based on a rescaled synergy factor.
- Shows a mutual reinforcement between cooperation and GB: GB has the lowest cooperation threshold among the single rules, and cooperators are most associated with GB when the rules coevolve.
- Identifies structural conditions that qualify this result. A single well-mixed group cannot favor cooperation in the three-rule model, while anchoring several groups through a shared node or group can restore it; intermediate group sizes are often most favorable.
- Compares evolutionary outcomes with six LLM families' choices among imitation rules. The LLM prompts favor GIB, whereas the evolutionary dynamics favor GB for spreading cooperation.

## Method

Individuals occupy nodes of an unweighted hypergraph and belong to one or more hyperedges. Each individual carries a social behavior, cooperator (C) or defector (D), and an imitating rule. On every hyperedge of size $g$, each cooperator pays cost 1, the total contribution is multiplied by synergy factor $r$, and the benefit is shared equally. If a group contains $n_C$ cooperators, the per-game payoffs are

$$
f_C = \frac{n_C r}{g} - 1, \qquad f_D = \frac{n_C r}{g}.
$$

An individual's payoff sums the games on its incident hyperedges. Group payoff is the average payoff of its members, and payoff becomes fitness through $F=e^{\delta f}$. At each asynchronous update, a focal individual mutates to a uniformly chosen behavior-rule combination with probability $v$; otherwise it selects a group and then a role model within that group according to its current rule, copying both the role model's behavior and rule.

The analytical framework uses mutation-weighted reproductive values, neutral identity-by-state probabilities, and first-order weak-selection terms. For a coevolving rule set $\mathcal U$, the stationary frequency of a behavior-rule pair has the form

$$
\langle x_{(s^*,u^*)}\rangle = \frac{1}{2|\mathcal U|} + \frac{\delta(1-v)}{Nv}
\sum_{u'\in\mathcal U}\left(\beta_{(s^*,u^*)}^{u'}r-\gamma_{(s^*,u^*)}^{u'}\right)+O(\delta^2).
$$

The paper defines a critical synergy factor $R^*$, normalized by average hyperedge size, such that cooperation is favored when the rescaled factor $R$ exceeds the threshold. Mean-field expressions are derived for homogeneous hypergraphs and compared with exact analytical results and simulations.

## Experiments

The evidence is theoretical and computational; the paper does not estimate cooperation from human behavioral data.

- **Coauthorship hypergraph:** On a network of 71 authors and 24 joint publications, analytical predictions align with simulations across synergy factors and mutation rates. GB has the lowest critical threshold and highest cooperation, followed by GIB and then IB. With all three rules present, cooperators are most likely to use GB.
- **Synthetic and empirical hypergraphs:** The ranking $R^*_{GB}<R^*_{GIB}<R^*_{IB}$ holds across 2,979 synthetic hypergraphs of size 30. The paper also reports consistent GB advantages across 12,082 small hypergraphs and 24 empirical higher-order populations spanning political collaboration, coauthorship, contact, online social, email, co-review, and Q&A networks. Across 16,469 size-100 synthetic hypergraphs, GB frequency and cooperation have Spearman correlation $\rho_s=0.754$; IB and GIB have correlations $-0.769$ and $-0.630$ with cooperation, respectively.
- **Mechanism and group scale:** In the model, group-biased selection tends to favor cooperator-rich groups because their average payoff can exceed that of defector-rich groups, while individual-biased selection tends to favor defectors. Mean-field analysis predicts that intermediate hyperedge sizes can minimize the cooperation threshold in sufficiently sparse hypergraphs. In one well-mixed hyperedge, cooperation remains below one half; anchoring multiple groups through a shared node or shared group can make cooperation exceed one half at $R=1$, with the best group size depending on the anchoring design and number of groups.
- **LLM rule choices:** Six model families each make 300 randomized pairwise choices among IB, GB, and GIB at temperature zero in several prompt contexts. Averaged across models, GIB receives the highest Elo score, including when the model is assigned a contributor role. When the identities are reframed as individual-, group-, or group-and-individual-oriented, group-oriented identities produce a higher average contributor propensity than individual-oriented identities.

## Limitations

- The analytical results use weak selection and first-order approximations; stronger selection may introduce nonlinear effects.
- Hypergraph membership is fixed, and behavior and imitating rule update on the same timescale. Endogenous group formation and slower-changing learning rules are left for future work.
- The main game is a standard public goods game. Coordination, trust, bargaining, punishment, or other payoff structures could change which imitation rule is advantageous.
- Rare mutation would make initial placement of behaviors and rules more consequential than the reported mutation-selection summaries indicate.
- The LLM study is a prompt-based heuristic comparison, not an evolutionary test or evidence that language models implement the modeled rules in real interactions.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier. Those fields are therefore not inferred here.

## Related Concepts

- [[concepts/hypergraphs|Hypergraphs]]: represent overlapping group interactions without reducing them to pairwise ties.
- [[concepts/public-goods-games|Public Goods Games]]: formalize the contribution dilemma used in the model.
- [[concepts/group-biased-imitation|Group-Biased Imitation]]: captures the central learning rule and its reported relationship with cooperation.
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]: supplies the broader framing for jointly changing behavior and imitation environments.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: a related class of group-based dynamics with structural reinforcement.

## Related Papers

- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: surveys how explicit group structure changes models of cooperation, contagion, and collective behavior.
- Wang, Yi, Hong, Chen, and Yan (2025), "Emergence of cooperation promoted by higher-order strategy updates": cited by the paper as related work on higher-order strategy updating.
- Traulsen and Nowak (2006), "Evolution of cooperation by multilevel selection": cited foundation for selection across individual and group levels.
- Kido and Takezawa (2025), "Empirical evidence for the spread of cooperation through copying successful groups": cited empirical motivation for group-success-biased imitation.

[[index|Library home]]
