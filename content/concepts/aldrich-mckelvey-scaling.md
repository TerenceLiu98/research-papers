---
title: Aldrich-McKelvey Scaling
type: concept
aliases:
  - Bayesian Aldrich-McKelvey Scaling
  - HBAM
tags:
  - political-measurement
  - ideal-point-estimation
  - bayesian-measurement
---

## Overview

Aldrich-McKelvey scaling places respondents and political actors on a common latent scale by estimating how each respondent shifts and stretches reported actor positions. It addresses differing interpretations of ideological or policy scales using placements of shared stimuli, such as parties or candidates.

## Key Ideas

- **Respondent-specific scale use:** The expected placement of actor $j$ by respondent $i$ is $\alpha_i+\beta_i\theta_j$. The intercept shifts the scale, the stretch changes its spread, and a negative stretch reverses its orientation.
- **Identification:** Latent positions can be shifted and rescaled without changing fit. Fixing stimulus positions or imposing appropriate prior location and scale conventions selects a common coordinate system.
- **Self-placement uncertainty:** Transforming self-placement as $(V_i-\alpha_i)/\beta_i$ becomes unstable when posterior stretch draws approach zero. Modeling self-placement as a noisy observation and estimating the respondent's latent position directly allows uncertainty and population information to enter jointly.
- **Partial pooling:** Hierarchical distributions for shifts, stretches, and respondent positions share information across individuals. This is especially useful when each respondent places only a few stimuli.
- **Scale flipping needs explicit accommodation:** A positive-only lognormal stretch prior excludes reversals. HBAM uses positive and negative components with learned respondent-specific weights, retaining hierarchical regularization while allowing reversed placements.
- **Comparability needs shared stimuli:** Bridging actors connect otherwise distinct respondent groups or districts. Hierarchical priors alone do not supply the missing common measurement reference.
- **Prediction and recovery are different checks:** Held-out placements test predictive fit; simulated latent positions test recovery under a specified generating process. Neither alone proves that empirical ideological positions are substantively correct.

## Important Papers

- Aldrich and McKelvey (1977), "A Method of Scaling with Applications to the 1968 and 1972 Presidential Elections": introduces the original scaling procedure.
- Hare et al. (2015), "Using Bayesian Aldrich-McKelvey Scaling to Study Citizens' Ideological Preferences and Perceptions": develops the unpooled Bayesian implementation.
- [[papers/hierarchical-bayesian-aldrich-mckelvey-scaling|Hierarchical Bayesian Aldrich-McKelvey Scaling]]: combines hierarchical priors, noisy self-placement modeling, and scale-flipping mixtures; compares prediction and recovery with the unpooled and positive-only alternatives.

## Related Concepts

- [[concepts/blackbox-scaling|Blackbox Scaling]]: related recovery of political coordinates from survey response matrices.
- [[concepts/hierarchical-ideal-point-estimation|Hierarchical Ideal-Point Estimation]]: uses hierarchical structure to model actor and item dependence in voting data.
- [[concepts/party-position-measurement|Party-Position Measurement]]: the wider measurement task to which estimated stimulus locations contribute.
