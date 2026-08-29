---
title: Dynamic Hysteresis
type: concept
aliases:
  - Dynamical Hysteresis
tags:
  - nonlinear-dynamics
  - nonequilibrium-systems
  - periodic-driving
  - response-theory
---

## Overview

Dynamic hysteresis is the lagged response of a driven system that traces a loop when an observable is plotted against a cyclic external field. Unlike static hysteresis, a loop can arise solely because the system relaxes on a finite timescale and cannot follow the drive instantaneously. The loop area measures the response lag or dynamic loss and can scale systematically with driving frequency.

## Key Ideas

- For an observable $M$ and field $h$, the loop area can be written as $A=|\oint M\,dh|$. Its value depends on the driving waveform, amplitude, frequency, transient removal, and the system's relaxation law.
- Narrow loops indicate nearly adiabatic tracking, while wider loops indicate a larger phase lag. A power-law area $A\sim f^\kappa$ is normally an asymptotic statement over a specified frequency regime, not a universal fit at all frequencies.
- Different mechanisms can yield the same exponent. Switching through metastable states and a relaxation rate that vanishes near a field zero-crossing can both produce square-root behavior under suitable assumptions.
- In [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]], the driven mean-field relaxation rate is $|h(t)|$. Its linear zero-crossing creates a bottleneck of temporal width $f^{-1/2}$, leading to $A\propto f^{1/2}$ in the quasi-adiabatic regime.
- Cancellation of a parameter from a leading mean-field response equation does not imply that the full finite-network dynamics are parameter independent; correlations and finite-time effects can remain outside the closure.

## Important Papers

- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]
- Sides, Rikvold, and Novotny (1998), "Hysteresis loop areas in kinetic Ising models: Effects of the switching mechanism."
- Broner, Goldsztein, and Strogatz (1997), "Dynamical hysteresis without static hysteresis: scaling laws and asymptotic expansions."

## Related Concepts

- [[Voter Model]]
- [[Opinion Dynamics]]
- Nonequilibrium response
- Periodic driving
- Metastability
- Relaxation dynamics
