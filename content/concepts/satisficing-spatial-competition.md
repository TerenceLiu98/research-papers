---
title: Satisficing Spatial Competition
type: concept
aliases:
  - Satisficing Electoral Competition
  - Voter-Tolerance Spatial Competition
tags:
  - spatial-electoral-competition
  - political-polarization
  - game-theory
  - bifurcation-theory
  - satisficing
---

## Overview

Satisficing spatial competition models voters as evaluating each party against an acceptability threshold that varies smoothly with ideological distance. Unlike nearest-party models, a voter may accept neither party, one party, or both parties. A tolerance or width parameter controls how broadly each party appeals and can therefore change the equilibrium from convergence to polarization.

## Key Ideas

- A satisfaction kernel $f(|x-u_i|/q)$ assigns higher acceptance probability to a party nearer a voter's ideal point $x$. Larger $q$ makes satisfaction decay more slowly with ideological distance and represents greater voter tolerance or broader party appeal.
- Independent satisfaction judgments allow abstention when neither party is acceptable and equal splitting when both are acceptable. For two parties, the probability of supporting party $i$ is $p_i=s_i(1-s_j)+s_is_j/2$.
- Party objectives require a denominator distinction. Expected support $V_i=\int\rho(x)p_i(x)\,dx$ counts votes (or the fraction of all potential voters if $\rho$ is normalized). The share of votes actually cast is $V_i/\sum_jV_j$; abstention makes these different objectives. In Yang et al.'s model, local increases in vote counts can produce two-party separation, whereas the strict two-party vote-share variant converges to the median. Their minor-party extensions restore separation under the latter objective.
- A fixed, centrist electorate can coexist with party polarization. Yang et al. estimate party appeal widths from within-party congressional ideological dispersion and obtain a historical fit between predicted and observed interparty distance of $r=0.75$ for 1861-2015. This supports consistency with the mechanism, not causal identification. Their negative width-separation relationship is not global: in the symmetric Gaussian model, separation also tends to zero as the width vanishes.
- Center-distance coordinates distinguish where competition occurs from how differentiated the parties are: $m=(u_1+u_2)/2$ is the endogenous center and $2d=u_1-u_2$ is party separation.
- In a symmetric electorate, party-label symmetry makes the polarization equilibrium condition odd in $d$. Under transversality and cubic nondegeneracy conditions, tolerance can act as a bifurcation parameter: high tolerance supports co-location, while lower tolerance supports two label-symmetric polarized equilibria.
- Electorate asymmetry can shift the endogenous center and imperfectly unfold the symmetric bifurcation. When stable branches are separated by an unstable branch, slow changes in tolerance can produce history-dependent switching and political hysteresis.
- At very high tolerance, a quadratic expansion of the satisfaction kernel makes expected vote maximization approximate squared-distance minimization. With suitable regularity and moment conditions, party positions approach the voter mean. The classical median-voter location is recovered when symmetry makes the mean and median coincide.
- Multidimensional versions distinguish the number of issues from [[Ideological Dimensionality|the number of independent ideological axes]]. In a symmetric Gaussian model, higher effective dimension sharply lowers the expected vote-share threshold above which centrist positioning is strategically favored.
- The framework separates equilibrium claims from dynamics. A bifurcation diagram describes possible equilibria and their local stability; claims about delayed switching or observed lock-in additionally require an adjustment process and empirical evidence.

## Important Papers

- [[Symmetry Breaking, Hysteresis, and Convergence to the Mean Voter in two-party Spatial Competition]]
- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]] (Yang et al., 2020).
- [[Beyond the median voter: A model of how the ideological dimension shapes party polarization]]

## Related Concepts

- [[Co-Adaptive Political Polarization]]
- [[Ideological Dimensionality]]
- [[Opinion Dynamics]]
- Median voter theorem
- Spatial competition
- Pitchfork bifurcation
- Political hysteresis
