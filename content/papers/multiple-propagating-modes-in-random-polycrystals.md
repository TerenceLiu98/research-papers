---
title: Multiple Propagating Modes in Random Polycrystals
type: paper
authors:
  - Ming Huang
  - Stanislav I. Rokhlin
  - Michael J. S. Lowe
year: 2026
doi: "10.1103/dxwt-yhh9"
tags:
  - polycrystals
  - elastic-waves
  - multiple-scattering
---

## TL;DR

Grain-scale simulations resolve two coherent waves with the same polarization in a single-phase polycrystal. One wave dominates at long wavelengths. As the wavelength approaches the scale of the grains, a second wave with a distinct phase velocity survives over a comparable distance. A third root of the dispersion equation decays too rapidly to produce a visible spectral ridge.

## Research Question

Do the additional roots predicted by multiple-scattering theory correspond to waves that propagate through a random polycrystal, and what determines when they can be resolved?

## Motivation

Two coherent waves can arise in materials with two constituents, such as fluid-saturated porous solids. A single-phase polycrystal poses a different test. Its grains share an elastic stiffness tensor in their own crystal frames, but their random orientations expose an incident wave to different stiffnesses along its path.

## Contributions

- The simulations resolve two modes under transverse excitation in iron and under longitudinal excitation in SrMgSn. Each pair appears in the component of displacement parallel to the source polarization.
- In iron, the injected wavefront breaks up within about one grain correlation length. Two pulses with different speeds emerge in the averaged field beyond that depth. The authors attribute the surviving coherence to forward multiple scattering.

## Method

The authors simulate a plane pulse in three-dimensional aggregates of lossless, randomly oriented cubic grains. To recover the coherent displacement, they average across the cross section at each depth and over 20 independent grain-orientation realizations. They high-pass filter the field to reduce the contribution of long-lived low frequencies, then Fourier transform in time and depth. At each frequency, the centers of separated spectral peaks give the modal wavenumbers, and the half-widths of Lorentzian fits to the power spectrum estimate attenuation.

For an independent prediction, the authors solve the dispersion equation for the mean Green's function using the first-order smoothing approximation. Its scattering terms include conversion into one longitudinal and two transverse channels. The resulting complex roots predict a phase velocity and an attenuation coefficient for each mode.

## Experiments

- **Transverse excitation in iron (Figs. 1 and 2).** Two ridges separate near 10 MHz, where the reference wavelength is about 1.4 times the grain correlation length. Their fitted velocities closely follow the first two theoretical roots. At high frequency these modes sample predominantly the slow and fast transverse channels. Their attenuations are of the same order.
- **Longitudinal excitation in SrMgSn (Fig. 3).** In this more strongly anisotropic material, the second ridge appears near 3 MHz, at a reference wavelength of about four correlation lengths. The lower-wavenumber ridge tracks the first root closely. The second mode travels more slowly than the theory predicts. In both materials the third root has the largest predicted attenuation and no resolved ridge.

## Limitations

The observations come from finite-element simulations of two cubic materials. The weak-scattering approximation reproduces phase velocities closely in iron, but its attenuation estimates deviate in the geometric regime. Quantitative agreement is poorer in the more anisotropic SrMgSn. The paper reports no public simulation data or software supporting the study.

## Related Concepts

- [[concepts/coherent-wave-field|Coherent Wave Field]] explains how a reproducible signal survives averaging over disordered grain configurations.
- [[concepts/complex-wavenumber|Complex Wavenumber]] connects each predicted root to the position and width of a measured spectral peak.

## Related Papers

Calvet and Margerin (2012, ref. 17) used causality to argue that a single effective mode cannot reproduce the geometric-limit velocity and attenuation. Gower, Abrahams, and Parnell (2019, ref. 12) proved that multiple effective waves contribute to the mean field in particulate materials. The simulations here resolve a second wave in a single-phase aggregate.
