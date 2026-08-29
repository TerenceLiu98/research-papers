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

- In the voter mechanism, an agent copies another agent's binary state. The noisy extension adds an intrinsic mechanism that can change the selected agent independently of its neighbors.
- For a well-mixed population with symmetric opinions, the number of agents in one state is sufficient to describe the macroscopic birth-death process. Its stationary distribution is symmetric around equal coexistence.
- In the local formulation, weak noise relative to herding produces a bimodal finite-population distribution concentrated near consensus, while stronger noise produces a unimodal distribution centered on coexistence. The associated critical noise scale decreases with population size, so this standard transition is a finite-size effect.
- State-dependent or nonlinear update rates can create additional stationary shapes. [[Polarization-induced stress in the noisy voter model]] modifies the intrinsic rate using the fraction of unlike pairs and obtains W- and M-shaped distributions in addition to the standard bimodal and unimodal phases.
- The distinction between local and global parameter scaling matters. A transition that vanishes when fixed per-agent rates are taken to the thermodynamic limit can persist under a different population-size scaling of the rates.
- Stationary-distribution modality summarizes where the system spends time, but it does not by itself identify mechanism-level probability currents or establish that a stylized state variable measures empirical social polarization.

## Important Papers

- [[Polarization-induced stress in the noisy voter model]]
- [[Stochastic Thermodynamics of Social Imitation beyond Energetics]]
- Kirman (1993), "Ants, rationality, and recruitment."
- Carro, Toral, and San Miguel (2016), "The noisy voter model on complex networks."
- Peralta, Carro, San Miguel, and Toral (2018), "Analytical and numerical study of the non-linear noisy voter model on complex networks."
- Pymar and Rivera (2021), "On the stationary distribution of the noisy voter model."

## Related Concepts

- [[Opinion Dynamics]]
- [[Stochastic Thermodynamics]]
- Birth-death processes
- Finite-size scaling
- Consensus formation
- Nonequilibrium steady states
