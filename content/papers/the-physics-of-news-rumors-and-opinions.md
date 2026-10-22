---
title: "The Physics of News, Rumors, and Opinions"
type: paper
authors:
  - Guido Caldarelli
  - Oriol Artime
  - Giulia Fischetti
  - Stefano Guarino
  - Andrzej Nowak
  - Fabio Saracco
  - Petter Holme
  - Manlio De Domenico
year: 2026
tags:
  - sociophysics
  - information-diffusion
  - opinion-dynamics
  - misinformation
  - complex-networks
---

## TL;DR

This review organizes the physics of online information and opinion around a common problem: how microscopic interaction rules, heterogeneous network structure, platform design, and non-Poissonian timing produce macroscopic cascades, consensus, polarization, or fragmentation. It connects network null models and statistical-physics frameworks with empirical social-media research, while emphasizing that human cognition, strategic behavior, platform-specific visibility, and uneven data access limit direct transfers from physical models.

## Research Question

Which structural and dynamical mechanisms govern the spread of news, rumors, and opinions in modern socio-technical systems, and how can statistical physics and network science help explain or mitigate misinformation, polarization, and related collective outcomes?

## Motivation

Online information systems combine active users and automated accounts, algorithmic curation, rapidly changing connections, heterogeneous attention, and cross-platform communication. These ingredients produce out-of-equilibrium collective behavior that is difficult to explain from content, individual psychology, or static network structure alone. The review argues that parsimonious physical models can connect local mechanisms to population-level regularities, provided they are treated as testable coarse-grained descriptions rather than literal accounts of human behavior.

## Contributions

- Connects structural network models, generative models, and maximum-entropy null models to the analysis of information flow on directed, weighted, signed, temporal, multilayer, and higher-order networks.
- Organizes spreading mechanisms from percolation, branching, epidemic, independent-cascade, and linear-threshold models through rumor-specific stifling and socially reinforced [[concepts/threshold-contagion|Threshold Contagion]].
- Synthesizes how centrality, core-periphery organization, communities, homophily, echo chambers, temporal heterogeneity, and cross-platform coupling constrain diffusion.
- Reviews misinformation as a distinct empirical and modeling problem shaped by credibility, novelty, emotional content, coordinated amplification, bots, corrections, and platform architecture.
- Unifies discrete, continuous, and coevolutionary [[concepts/opinion-dynamics|Opinion Dynamics]], including the [[concepts/voter-model|Voter Model]], [[concepts/q-voter-model|Q-Voter Model]], [[concepts/noisy-voter-model|Noisy Voter Model]], Deffuant-Weisbuch and Hegselmann-Krause bounded-confidence models, flocking-inspired models, and adaptive networks.
- Identifies intervention families including monitoring, bot and coordination detection, feed changes, optimal-percolation strategies, fact-checking, accuracy prompts, inoculation, and reputation systems, while noting their ethical and operational constraints.

## Method

The article is a narrative and technical review rather than a new empirical study. It first establishes network-science foundations: heavy-tailed degree distributions, clustering, assortativity, communities, probabilistic and generative graph models, and null-model testing. It then maps physical models to social processes, including percolation and branching processes, epidemic compartments, random walks, threshold and independent-cascade dynamics, spin systems, and synchronization.

The review uses this framework to compare social-media platforms and information disorders, then separates information diffusion into microscopic adoption mechanisms, mesoscale network constraints, temporal and multilayer effects, cascade characterization, and misinformation interventions. Its final major part surveys opinion models by state space and interaction rule, followed by coevolving network-opinion dynamics and non-Markovian timing. Throughout, the authors relate stylized models to reported digital-trace evidence and distinguish structural or dynamical explanations from predictive machine-learning correlations.

## Experiments

The paper reports no original experiment or meta-analysis. Instead, it compares findings and model behaviors across the literature.

- Evidence on complex contagion indicates that repeated exposure and the structural diversity of sources can matter more than exposure count alone. This motivates reinforcement and threshold models beyond single-contact epidemic analogies.
- Classical Daley-Kendall and Maki-Thompson rumor models represent loss of interest through contact-driven stifling, unlike spontaneous recovery in standard epidemic models. Data-calibrated extensions add attention, memory, heterogeneous activity, credibility, and behavioral response.
- Empirical cascades are typically heterogeneous in size, depth, speed, and temporal profile. Community structure can trap diffusion, while bridging users and mesoscale mediation structures can connect otherwise separated audiences.
- Studies of misinformation do not yield a platform-independent prevalence estimate: results depend on definitions, samples, exposure measures, and ranking systems. The review reports a 2025 European platform study in which misinformation-targeting posts ranged from about 2% on LinkedIn to about 20% on TikTok, while low-credibility accounts received substantially more engagement on several platforms.
- Opinion models show how local imitation, nonlinear group influence, bounded confidence, noise, and rewiring can yield consensus, coexistence, polarization, or fragmentation. Coevolutionary models make the feedback between homophily and network restructuring explicit.
- Human communication is bursty and temporally correlated rather than Poissonian. Aging and memory can change consensus times, coarsening, stationary states, and even model universality classes, so static or memoryless approximations can miss qualitative behavior.

These comparisons support the review's central claim that no single model covers the full information ecosystem. Different empirical signatures require different minimal mechanisms, and apparent agreement should be evaluated against calibrated baselines and null models.

## Limitations

The evidence base is concentrated in online traces from a small set of platforms and high-income democracies, especially the United States. Institutional differences such as electoral systems can alter political communication and polarization, limiting cross-country generalization.

Definitions of misinformation, disinformation, mal-information, rumors, and fake news vary across studies. Platform APIs, sampling procedures, recommendation systems, moderation policies, and private or encrypted communication also shape what researchers can observe. Consequently, differences in measured prevalence or diffusion may reflect measurement and visibility as well as user behavior.

Many reviewed models assume homogeneous or monotone influence, fixed topology, memoryless interaction, or directly observable state variables. Human memory, strategic intent, identity, semantic content, cognitive bias, and adaptive participation lack simple physical analogues. Parameters such as thresholds, transmission probabilities, and social influence are often difficult to calibrate, while sharp phase-transition interpretations remain context dependent. Proposed interventions also face scalability, evasion, censorship, privacy, and causal-validation challenges.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]
- [[concepts/threshold-contagion|Threshold Contagion]]
- [[concepts/social-reinforcement-and-weakening|Social Reinforcement and Weakening]]
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]
- [[concepts/activity-driven-networks|Activity-Driven Networks]]
- [[concepts/social-network-analysis|Social Network Analysis]]

## Related Papers

- [[papers/spreading-dynamics-of-information-on-online-social-networks|Spreading Dynamics of Information on Online Social Networks]]
- [[papers/rumor-propagation-on-hypergraphs|Rumor Propagation on Hypergraphs]]
- [[papers/minimizing-the-misinformation-concern-over-social-networks|Minimizing the Misinformation Concern over Social Networks]]
- [[papers/political-polarization-as-a-co-adaptive-process|Political Polarization as a Co-Adaptive Process]]

[[index|Library home]]
