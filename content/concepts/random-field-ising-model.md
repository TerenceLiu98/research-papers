---
title: Random-Field Ising Model
type: concept
aliases:
  - RFIM
  - Random Field Ising Model
definition: An Ising model in which interacting binary spins experience local external fields drawn from a distribution and held fixed as the spins equilibrate.
tags:
  - statistical-physics
  - quenched-disorder
  - opinion-dynamics
---

## Overview

In a ferromagnetic random-field Ising model, neighboring spins favor agreement, while each site's external field favors one of the two spin orientations. Two sites with identical neighbors can therefore experience opposite local pressures. A bimodal field distribution represents two kinds of sites whose proportions and field strengths can vary independently.

## Key Ideas

- The local field stays fixed as the spin changes. This persistent variation across sites is called quenched disorder. Temperature controls fluctuations in spin orientation for a given field configuration.
- A population average can hide strong local alignment. With equal numbers of sites under strong positive and negative fields, nearly every spin can follow its own field while the total magnetization is near zero.
- In the bimodal mean-field model, sufficiently strong neighbor coupling can sustain two stable majorities at weak fields. Their coexistence makes the response to a field change depend on the starting state.

## Important Papers

- [[papers/empirical-validation-of-the-polarization-transition-in-a-double-random-field-model-of-elections|Empirical Validation of the Polarization Transition in a Double-Random Field Model of Elections]] represents campaign audiences by the two field signs and estimates field magnitudes from expenditures in US House races.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]] uses coupled binary choices to study how social influence interacts with persistent individual preferences or exposures.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]] describes the dependence on prior state when multiple stable responses coexist at the same field strengths.
