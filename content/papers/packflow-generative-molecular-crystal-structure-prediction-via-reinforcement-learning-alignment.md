---
title: "PackFlow: Generative Molecular Crystal Structure Prediction via Reinforcement Learning Alignment"
type: paper
authors:
  - Akshay Subramanian
  - Elton Pan
  - Juno Nam
  - Maurice Weiler
  - Shuhui Qu
  - Cheol Woo Park
  - Tommi S. Jaakkola
  - Elsa Olivetti
  - Rafael Gómez-Bombarelli
year: null
tags:
  - molecular-crystals
  - flow-matching
  - reinforcement-learning
---

## TL;DR

PackFlow jointly generates heavy-atom coordinates and unit-cell parameters from molecular connectivity, then uses energy- and force-based reinforcement learning to improve proposals for downstream crystal relaxation. Physics alignment reduces the 60M model's clash rate from 2.53% to 1.53–1.71% without changing its sampler. Two blind-test case studies show improved relaxed minima, rather than establishing comprehensive polymorph recovery.

## Research Question

Can a learned joint coordinate–lattice proposal distribution reduce the search burden of molecular crystal structure prediction, and can inexpensive physical feedback improve that distribution before relaxation?

## Motivation

Molecular packing combines discrete symmetry choices with continuous orientations, conformations, and cell geometry. Candidate generation must cover useful basins, while repeated relaxation and energy ranking are costly. Predicting lattice parameters alongside coordinates makes generated proposals usable by periodic energy models.

## Contributions

- A bond-conditioned transformer for joint coordinate and lattice flow matching.
- Physics alignment using within-template group-relative updates, normalized energy/force advantage mixing, and a single-time policy-score surrogate.
- Proposal-quality comparisons against Genarris and end-to-end relaxation studies on two unseen blind-test crystals.

## Method

PackFlow uses [[concepts/flow-matching|Flow Matching]] on unwrapped, mean-centered Cartesian heavy-atom coordinates and six lattice parameters. Covalent bond features bias attention at every transformer layer. Independent coordinate and lattice times during pretraining improve over shared times; sampling integrates from Gaussian noise to structures. A deterministic lattice frame fixes the representation, without explicit rotation equivariance or space-group enforcement.

Physics alignment samples multiple packings with the same molecule and unit-cell contents. Negative heavy-atom energies and mean force norms from UMA-s-1p1 with the OMC task provide rewards. Each reward channel is standardized within its group before weighted mixing and clipping. A PPO-style objective penalizes drift from the pretrained reference. Its importance ratios and KL-like penalty use differences of single-time flow-regression losses: these are empirical score surrogates, not exact ODE endpoint likelihoods. Sampling and MLIP evaluation are outside the gradient path.

For evaluation, RDKit adds hydrogens, followed by up to 25 hydrogen-only FIRE steps and 1,000 full atom-and-lattice relaxation steps, with a 0.05 eV/Å force threshold. This implements the propose–relax–rank workflow of [[concepts/molecular-crystal-structure-prediction|Molecular Crystal Structure Prediction]].

## Experiments

The CSD-derived homomolecular dataset has 83,299 training, 30,364 validation, and 37,558 test structures. Refcode families are disjoint across splits. Filters constrain elements, space groups, asymmetric-unit multiplicities, and unit cells to at most 250 atoms.

Selected proposal metrics from main-text Table 2 (lower is better):

| Model | Density error % | Clash % | AMD L∞ | Generation seconds |
|---|---:|---:|---:|---:|
| Genarris Plain | 27.89 | 0.28 | 0.903 | 0.120 |
| Genarris Rigid Press | 19.77 | 1.93 | 0.541 | 0.312 |
| PackFlow-Base-60M | 4.69 | 2.53 | 0.286 | 0.128 |
| PA, force only | 5.91 | 1.53 | 0.284 | 0.128 |
| PA, equal mixing | 5.39 | 1.62 | 0.278 | 0.128 |
| PA, energy only | 5.21 | 1.71 | 0.277 | 0.128 |

Alignment improves clashes and structural proximity but worsens density error relative to the base model. Genarris Plain retains the lowest clash rate. Timing covers generation only, using one V100 for PackFlow and 32 CPU cores for Genarris; it is not total pipeline latency.

Removing bonds in shorter ablation runs raises clashes from 2.74% to 19.01%. Shared flow times worsen density error and clashes. Appendix F reports instability without reference regularization and with small groups.

For OBEQOD (rigid) and XAFPAY01 (flexible), 100 samples yield best PackFlow candidates closer to experiment in density–relative-energy space than Genarris. One energy difference is slightly above approximately 5 kJ/mol and the other below it. Genarris can start with lower average unrelaxed energies yet reach worse relaxed minima. Figure 5 applies a bond-length validity filter; these plots do not establish unconditional success rates.

## Limitations

Evidence is restricted to homomolecular crystals and two selected end-to-end cases. Heavy-atom rewards omit hydrogen-sensitive interactions. Learned energy rankings do not model crystallization kinetics, solvents, or finite-temperature free energies. Dense head-wise bond biases impose quadratic memory costs. The model has neither guaranteed rotational invariance nor enforced crystal symmetry. Refcode-family separation is the reported split criterion; it should not be interpreted as a stronger chemical-scaffold exclusion guarantee.

The supplied Markdown does not explicitly identify this paper's publication year or persistent identifier; `year` is left null. Source job: `b7e1bad5-5721-4178-bb42-6bf08a6c51ef`.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: learns joint coordinate and lattice transport.
- [[concepts/molecular-crystal-structure-prediction|Molecular Crystal Structure Prediction]]: separates proposal coverage from relaxed energy ranking.

## Related Papers

- OXtal (Jin et al., 2025; source reference 27): related molecular crystal generation; PackFlow emphasizes explicit lattice output. No runnable comparison is reported.
- Genarris 3.0 (Yang et al., 2025; reference 19): geometric rigid-press baseline.
- DeepSeekMath (Shao et al., 2024; reference 36): supplies the group-relative policy-optimization foundation adapted here to flow-model score surrogates.
