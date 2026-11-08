---
title: "Media preference increases polarization in an agent-based election model"
type: paper
authors:
  - Andrea Di Benedetto
  - Claudia E. Wieners
  - Henk A. Dijkstra
  - Henk T. C. Stoof
year: 2023
doi: "10.1016/j.physa.2023.129014"
tags:
  - opinion-dynamics
  - political-polarization
  - echo-chambers
  - agent-based-models
  - media-selection
---

## TL;DR

This paper develops a two-party [[concepts/opinion-dynamics|opinion-dynamics]] model in which voters respond to neighboring voters and more influential media nodes. After tuning a fixed-media baseline to several aggregate features of U.S. presidential elections, the authors let voters replace disagreeing media with politically aligned sources. This selective rewiring increases same-opinion voter clustering from 0.55 to 0.63, lowers the modeled probability of changing opinion from 0.15 to 0.06, and reduces the standard deviation of average opinion from 0.09 to 0.03. The results demonstrate an [[concepts/echo-chambers|echo-chamber]] mechanism inside a calibrated simulation, not an empirical causal estimate of media choice.

## Research Question

Can voters' preference for politically congenial media generate echo chambers, network segregation, and reduced willingness to change political opinions in an agent-based election model?

## Motivation

Models of political opinion formation often emphasize interpersonal network structure and decision rules while treating media influence only implicitly. Yet voters can select media that agree with their prior views, potentially coupling media exposure to the evolution of political attitudes. The paper makes media explicit as high-authority network nodes so that selective exposure and external influences, including economic conditions, can be studied together in a stylized election system.

## Contributions

- Extends an Ising-like voter model with influential media nodes that transmit external conditions to voters but are not influenced by their neighbors.
- Represents voting intentions with three states: Blue, non-voter, and Red, allowing turnout as well as party choice to evolve.
- Tunes a baseline configuration to reproduce selected aggregate properties of U.S. presidential elections: vote-share variability, roughly two consecutive victories per party, about 40% non-voters, and no persistent majority.
- Introduces a media-preference feedback in which voters probabilistically replace disagreeing media with aligned sources after the model reaches equilibrium.
- Connects selective media rewiring to stronger voter clustering, more distinct opinion communities, and less frequent opinion switching.

## Method

The population contains 10,000 nodes on a hierarchical scale-free social network. Voters hold opinions in $\{-1,0,1\}$, representing Blue, non-voting, and Red intentions. Sixty media nodes hold continuous opinions in $[-1,1]$; each is connected to about 2,000 voters and receives ten times the weight of a voter in a neighbor's weighted average opinion. Each day, 100 randomly selected voters compare that average with transition thresholds and may change state.

Media opinions change with a simplified version of the Fair presidential vote equation. A random economic term favors or harms the incumbent, while a duration term penalizes a party after repeated terms in office. State-dependent voter transition thresholds supply an additional stabilizing feedback that favors the current minority and prevents consensus or long-term power lock-in.

Each simulation spans 320 model years, with elections every four years. The baseline fixes voter-media connections. In the feedback condition, activated after 40 election cycles, a partisan voter may drop a connected medium on the opposite side and replace it with a same-side medium; non-voters similarly prefer media close to neutral. The paper evaluates average opinion, opinion-switching probability, average neighbor opinion, and same-opinion voter-voter clustering.

## Experiments

The baseline takes about ten election cycles to reach a statistical steady state. Its tuned configuration produces approximately 40% non-voters, an average of about two consecutive mandates per party, no persistent majority, and opinion fluctuations comparable to the historical targets selected by the authors. Even without media rewiring, local interaction produces voter-voter clustering of 0.55, above the random-composition reference value of 0.34.

Activating media preference raises voter-voter clustering to 0.63 while the reference remains 0.34. The probability of changing opinion falls from 0.15 to 0.06, and the standard deviation of average population opinion falls from 0.09 to 0.03. Distributions of neighbor opinions also overlap less across Blue, Red, and non-voter groups. The authors interpret the combination of stronger segregation and lower opinion mobility as increased [[concepts/political-polarization|political polarization]], even though aggregate opinion fluctuates less.

Sensitivity analyses reported in the supplement vary media influence and switching thresholds. Too little relative media influence can produce persistent partisan majorities, while too much makes population opinion track external influence too strongly. The reported feedback comparison therefore applies to the tuned regime rather than all parameter settings.

## Limitations

The model is deliberately stylized: it assumes a two-party system, three voter states, a fixed interpersonal network, prescribed media-opinion ranges, and media that influence voters without reciprocal influence. Its minority-favoring transition feedback is needed to prevent consensus and power lock-in but has no direct observational support. Parameters are tuned to selected U.S. election aggregates rather than estimated from individual voter-media behavior.

The match to aggregate election features does not uniquely validate the micro-level mechanisms, and the simulation does not identify a real-world causal effect of selective media exposure. The model's complexity also prevents an analytical solution. Results may change in multiparty systems, with endogenous media behavior, alternative network structures, or empirically estimated rewiring and opinion-update rules.

## Related Concepts

- [[concepts/echo-chambers|Echo Chambers]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/co-adaptive-political-polarization|Co-Adaptive Political Polarization]]
- [[concepts/media-ecology|Media Ecology]]

## Related Papers

- [[papers/the-dynamics-of-political-polarization|The dynamics of political polarization]]
- [[papers/political-polarization-as-a-co-adaptive-process|Political Polarization as a Co-Adaptive Process]]
- [[papers/nonlinear-polarization-modeling-via-dual-threshold-diffusion-evolution-dynamics|Nonlinear Polarization Modeling via Dual-Threshold Diffusion-Evolution Dynamics]]
- [[papers/competing-activists-political-polarization|Competing Activists-Political Polarization]]

[[index|Library home]]
