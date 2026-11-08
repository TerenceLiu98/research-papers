---
title: "Multi-dimensional multi-option opinion dynamics leads to the emergence of clusters in social networks"
type: paper
authors:
  - Yimeng Qi
  - Songlin Zhuang
  - Xinghu Yu
  - Zhihong Zhao
  - Weichao Sun
  - Zhan Li
  - Jianbin Qiu
  - Yang Shi
  - Fangzhou Liu
  - Charo I. del Genio
  - Stefano Boccaletti
year: 2024
doi: "10.1016/j.chaos.2024.115983"
tags:
  - opinion-dynamics
  - multidimensional-opinions
  - discrete-choice
  - consensus
  - polarization
  - bifurcations
---

## TL;DR

This paper introduces a networked [[concepts/opinion-dynamics|Opinion Dynamics]] model in which every agent has continuous opinions over several options on several topics but takes one discrete action per topic. Action similarity strengthens influence on existing edges, while cooperative or competitive responses move opinions toward or away from neighbors. The neutral state loses stability at spectral thresholds: cooperative dynamics produces consensus branches, whereas competitive dynamics produces polarized branches. Simulations with 5,000 agents show the same qualitative regimes on scale-free and Watts-Strogatz networks, but this is model evidence rather than empirical validation or a general proof of topology independence.

## Research Question

Can a model coupling multidimensional, multi-option private opinions to discrete public actions explain the emergence of consensus, polarization, and clusters without requiring those outcomes to be selected by a particular network topology?

## Motivation

Many opinion models use one binary state per person. Real decisions can instead involve several correlated topics, more than two options per topic, and a distinction between a continuous internal preference and the discrete action eventually taken. Actions may also be more visible than private opinions and can therefore mediate social influence. The paper combines these features in one analytically tractable model.

## Contributions

- Represents each agent by continuous support or opposition toward multiple options on multiple topics and by a one-hot action for each topic.
- Makes link strength adaptive to action similarity while retaining a fixed underlying contact network.
- Defines cooperative and competitive opinion responses and a payoff rule that couples an agent's action to private opinion, emotional cost, and neighbors' preceding actions.
- Proves boundedness of opinion states under the stated saturation assumptions and derives spectral bifurcation thresholds for loss of stability of the neutral state.
- Uses opinion and action clusters, entropy, consensus error, polarization, and disagreement measures to compare the emerging collective regimes.

## Method

For $N$ agents, $R$ topics, and $M_\alpha$ options on topic $\alpha$, agent $i$ has a continuous opinion vector $\mathbf{x}_i^{(\alpha)}$ and a one-hot action vector $\mathbf{y}_i^{(\alpha)}$. The underlying adjacency matrix $A$ is fixed. Its time-varying influence weight increases when connected agents make matching choices:

$$
W_{ij}=A_{ij}\left(1+\frac{1}{R}\sum_{\alpha=1}^{R}\sum_{l=1}^{M_\alpha}
\delta_{y_{il}^{(\alpha)},y_{jl}^{(\alpha)}}\right).
$$

Opinion change combines relaxation toward neutrality, within-topic option relationships encoded by an opposition matrix, interpersonal influence, and a bounded odd saturation function. A positive interpersonal sign defines cooperative dynamics; a negative sign defines competitive dynamics. Subtracting the mean component of each topic's update preserves that agent's mean opinion across the options of the topic.

Actions are selected separately. A softmax-derived cost makes it less costly to choose an option the agent already favors. The payoff for an option combines that cost, contributions from neighbors who chose it in the preceding round, retained emotional strength, and the agent's opinion toward the option. Each agent chooses the payoff-maximizing option for every topic.

The paper analyzes stability around the neutral opinion state. When topics have multiple options, competitive dynamics is stable below

$$
\beta_1=\frac{1}{1-2\min_i\operatorname{Re}(\lambda_i)},
$$

and cooperative dynamics is stable below

$$
\beta_2=\frac{1}{1+2\max_i\operatorname{Re}(\lambda_i)},
$$

where $\lambda_i$ are eigenvalues of the weighted adjacency matrix used in the linearization. Crossing $\beta_1$ produces polarized branches; crossing $\beta_2$ produces consensus branches. If every topic has only one option, the model yields consensus.

## Experiments

The main simulations use scale-free networks with $N=5{,}000$ agents and three topics containing three, two, and two options. Initial opinions are Gaussian with mean zero and variance $5\times10^{-4}$, the saturation function is $\tanh$, and runs continue to $T=300$ while $\beta$ is swept across the relevant analytical threshold.

Under cooperative dynamics, all agents converge to the same qualitative opinions and actions. The Shannon entropy of both opinion and action clusters falls to zero, and the reported consensus errors become indistinguishable and smaller than 0.05. Under competitive dynamics, option-level opinions develop bimodal distributions. Action clusters settle sooner than opinion clusters, while nonzero polarization indices and a large neighbor-disagreement index indicate persistent conflicting opinions.

Supplementary simulations on Watts-Strogatz networks reportedly reproduce the same qualitative cooperative and competitive regimes. This comparison supports robustness across the two tested synthetic network families; it does not show that topology is irrelevant for all graphs, parameters, transient behavior, or threshold values.

## Limitations

The evidence is analytical and simulation-based; the model is not calibrated to observed opinions, choices, or social ties. Private opinion, emotional cost, peer reward, and action-dependent influence are stylized mechanisms. The simulations use a narrow set of topic counts, initial conditions, network families, and parameter schedules, and the supplied text does not report broad sensitivity analyses or uncertainty across repeated runs.

The claim of network-structure independence concerns the qualitative emergence of consensus and polarization in the tested settings. The bifurcation thresholds themselves depend on the spectrum of a weighted network, and only scale-free and Watts-Strogatz simulations are described. Cluster membership is based on qualitative signs of opinions or matching actions, so its substantive interpretation depends on those operational definitions.

The supplied Markdown contains substantial OCR damage in symbols, prose, and several references. This page retains results that can be reconstructed from the displayed equations and surrounding text but does not attempt to repair unclear derivations. The data-availability statement points to raw simulation data on GitHub without supplying a recoverable URL in the parsed text.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/cognitive-dissonance|Cognitive Dissonance]]: relevant to modeled mismatches between an agent's preferred option and public choice, although the model does not measure psychological discomfort.
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]: another route from local interaction rules to consensus, polarization, and fragmentation.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]

## Related Papers

- [[papers/ideological-polarization-in-static-networks-a-multidimensional-approach-for-opinion-alignment|Ideological polarization in static networks: A multidimensional approach for opinion alignment]]: models continuous opinions on two topics with similarity-weighted influence but does not add a separate discrete action process.
- [[papers/consensus-polarization-and-nonlinear-response-in-a-two-layer-voter-model-with-intra-agent-cross-layer-reconciliation|Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]: separates context-specific binary opinions within each agent and distinguishes personal consistency from population consensus.
- [[papers/behavior-of-nonlinear-opinion-dynamics-over-large-networks|Behavior of Nonlinear Opinion Dynamics over Large Networks]]: studies network-dependent bifurcation and continuum approximation for a scalar saturating opinion model.
- Martins (2008), "Continuous opinions and discrete actions in opinion dynamics problems": the paper's cited predecessor for separating internal continuous opinions from final discrete actions.

[[index|Library home]]
