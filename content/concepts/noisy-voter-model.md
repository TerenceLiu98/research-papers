---
title: Noisy Voter Model
type: concept
aliases:
  - NVM
  - Voter Model with Noise
tags:
  - opinion-dynamics
  - sociophysics
  - stochastic-processes
  - phase-transitions
---

## Overview

The noisy voter model extends the voter model by combining social copying with spontaneous, idiosyncratic state changes. Noise prevents the consensus states from being permanently absorbing and creates a stationary distribution over population configurations. The model is a basic setting for studying how finite population size, intrinsic variation, social imitation, network structure, and nonlinear response shape collective behavior.

## Key Ideas

- Selective exposure changes the effective copying rate even on a fixed network. In [[papers/effect-of-algorithmic-bias-and-network-structure-on-coexistence-consensus-and-polarization-of-opinions|Peralta et al. (2021)]], hiding disagreeing neighbors at each update can stabilize opposite majorities in two weakly connected communities at low noise. A population-wide opinion share near one-half can therefore conceal strong agreement within each community.

- In the multistate homogeneous model, grouping all other opinions yields an exact single-opinion birth-death process. For more than two states, marginals are generally asymmetric: distinct boundary thresholds separate two boundary peaks, a decreasing marginal, and an interior peak. Heterogeneous-rate closure is approximate, and combining single-opinion hitting times into consensus-switching times requires an additional independence approximation. See [[papers/consensus-and-diversity-in-multistate-noisy-voter-models|Consensus and diversity in multistate noisy voter models]].

- [[papers/is-the-voter-model-a-model-for-voters|Is the Voter Model a Model for Voters?]] couples residence and workplace imitation through census commuting flows. Its imperfect-imitation noise yields a noisy diffusion approximation that reproduces stationary electoral dispersion and logarithmic spatial correlations. This external-noise formulation should be distinguished from the standard spontaneous-flip birth-death model; its calibrated target is local vote-share fluctuations around the national mean.

- In the voter mechanism, an agent copies another agent's binary state. The noisy extension adds an intrinsic mechanism that can change the selected agent independently of its neighbors.
- For a well-mixed population with symmetric opinions, the number of agents in one state is sufficient to describe the macroscopic birth-death process. Its stationary distribution is symmetric around equal coexistence.
- In the local formulation, weak noise relative to herding produces a bimodal finite-population distribution concentrated near consensus, while stronger noise produces a unimodal distribution centered on coexistence. The associated critical noise scale decreases with population size, so this standard transition is a finite-size effect.
- State-dependent or nonlinear update rates can create additional stationary shapes. [[Polarization-induced stress in the noisy voter model]] modifies the intrinsic rate using the fraction of unlike pairs and obtains W- and M-shaped distributions in addition to the standard bimodal and unimodal phases.
- Fixed individual preferences provide another mechanism. The noisy [[concepts/partisan-voter-model|Partisan Voter Model]] can have a trimodal stationary distribution for balanced preferences and a discontinuous switch of its dominant peak despite a single stable deterministic fixed point. These additional regimes disappear in the thermodynamic limit at fixed positive noise. Numerical critical ratios depend on the copying convention: adopting a selected disagreeing neighbor with probability one-half gives the zero-preference threshold $a/h=1/(2N)$ in the partisan-model paper.
- The distinction between local and global parameter scaling matters. A transition that vanishes when fixed per-agent rates are taken to the thermodynamic limit can persist under a different population-size scaling of the rates.
- Stationary-distribution modality summarizes where the system spends time, but it does not by itself identify mechanism-level probability currents or establish that a stylized state variable measures empirical social polarization.

## Important Papers

- [[papers/partisan-voter-model-stochastic-description-and-noise-induced-transitions|Partisan Voter Model: Stochastic description and noise-induced transitions]]
- [[Polarization-induced stress in the noisy voter model]]
- [[Stochastic Thermodynamics of Social Imitation beyond Energetics]]
- Kirman (1993), "Ants, rationality, and recruitment."
- Carro, Toral, and San Miguel (2016), "The noisy voter model on complex networks."
- Peralta, Carro, San Miguel, and Toral (2018), "Analytical and numerical study of the non-linear noisy voter model on complex networks."
- Pymar and Rivera (2021), "On the stationary distribution of the noisy voter model."

## Related Concepts

- [[concepts/partisan-voter-model|Partisan Voter Model]]
- [[Opinion Dynamics]]
- [[Stochastic Thermodynamics]]
- Birth-death processes
- Finite-size scaling
- Consensus formation
- Nonequilibrium steady states
