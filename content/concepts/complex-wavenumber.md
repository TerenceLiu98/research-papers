---
title: Complex Wavenumber
type: concept
definition: A complex spatial frequency whose real and imaginary parts describe phase accumulation and exponential amplitude change along the propagation direction.
aliases:
  - Complex Wave Number
tags:
  - wave-propagation
  - dispersion
---

## Overview

With the convention $u(z,t)\propto e^{i(kz-\omega t)}$, writing $k=k_r+i\alpha$ gives an amplitude factor $e^{-\alpha z}$. A forward wave with positive $k_r$ and $\alpha$ advances at phase velocity $\omega/k_r$ and decays to $1/e$ of its initial amplitude over a distance $1/\alpha$.

## Key Ideas

- At a fixed frequency, a dispersion equation can admit several complex wavenumbers. Roots with distinct real parts accumulate phase at different rates, while their imaginary parts determine how far the corresponding signals persist.
- An isolated exponentially decaying mode gives a Lorentzian peak in the spatial power spectrum. Its center estimates $k_r$ and its half-width at half maximum estimates $\alpha$. Fitting a sum of these peaks assumes that interference between the modes is negligible.

## Important Papers

[[papers/multiple-propagating-modes-in-random-polycrystals|Multiple Propagating Modes in Random Polycrystals]] compares spectral peak positions and widths against complex roots of an elastic dispersion equation. Two roots have measurable counterparts at high frequency, while the most strongly attenuated root leaves no resolved peak.

## Related Concepts

A [[concepts/coherent-wave-field|Coherent Wave Field]] can contain several modes with different complex wavenumbers even for one source polarization.
