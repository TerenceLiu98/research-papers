---
title: "Political Polarization as a Co-Adaptive Process"
type: paper
authors:
  - Stuart Soroka
  - Georgia Kernell
  - P. J. Lamberson
year: 2026
doi: "10.1093/joc/jqag001"
tags:
  - political-polarization
  - political-communication
  - media-effects
  - system-dynamics
  - co-adaptation
---

## TL;DR

This paper models political polarization as a reciprocal process in which public attitudes adapt to media while media content, platforms, and technologies adapt to public demand. In 10,000-run system-dynamics simulations, neither random technological shocks nor human in-group bias alone reliably produces sustained polarization. Combining human bias with media-public co-adaptation does: under the main parameterization, 99% of simulations end more polarized than they began.

## Research Question

Can a reciprocal model of adaptation between media and the public explain persistent increases in political polarization more plausibly than a model in which exogenous changes in media affect the public unidirectionally?

## Motivation

Accounts of political polarization often treat communications technologies as external causes of changes in public opinion. Yet media technologies and content are designed in response to users, markets, and political conditions. Treating those changes as endogenous may therefore alter both explanations of historical polarization and estimates of media effects. The paper formalizes this reciprocal relationship as [[Co-Adaptive Political Polarization]].

## Contributions

- Reframes media and public polarization as a cumulative, reciprocal adaptation process rather than a one-way technological effect.
- Develops comparable unidirectional and co-adaptive system-dynamics models, with and without a public bias toward polarization.
- Shows that co-adaptation can amplify a persistent directional bias even though reciprocal adjustment without bias has a balancing effect.
- Derives empirical implications involving local media markets, media-ownership regulation, bipartisan shocks, and the measurement of media polarization.

## Method

The model represents media polarization as \(x\) and aggregate affective public polarization as \(y\). Public polarization closes a proportion \(\alpha\) of the gap between its previous level and a media-dependent target. In biased variants, that target is \(x + \beta\), where \(\beta \geq 0\) captures a persistent tendency toward polarization. The unidirectional model lets media follow a nonnegative random walk driven by exogenous shocks. The co-adaptive model adds media adjustment toward prior public polarization at rate \(\gamma\).

The authors simulate each model for 40 time steps from initial media and public polarization values of 10. Random media shocks are drawn from a standard normal distribution. The main comparisons use \(\alpha = 0.3\), \(\gamma = 0.3\), and, where bias is present, \(\beta = 1\). Each condition is evaluated over 10,000 simulations using final mean public polarization, the share of final values above 10, and the share of individual time steps in which public polarization increases. Sensitivity analyses vary \(\beta\) and \(\gamma\).

The paper motivates its outcome using American National Election Studies feeling-thermometer data, where affective polarization is the difference between in-party and out-party evaluations. These data illustrate that the partisan evaluation gap roughly doubled over the past half-century, but they are not used to estimate or causally validate the model parameters.

## Experiments

Without bias, the unidirectional model ends at mean public polarization 10.12, with 50% of simulations above the starting value. Adding bias shifts the mean to 11.12 and the share above 10 to 58%, but random technological shocks still push the system in either direction. Co-adaptation without bias also remains centered near the initial state: its mean is 10.01 and 50% of runs finish above 10. Reciprocal adjustment in this case dampens shocks rather than reinforcing them.

The combination of co-adaptation and bias produces the paper's central result. Mean final public polarization rises to 16.11; 99% of simulations finish above 10; and public polarization increases in 67% of all simulated time steps. The feedback lets the media adapt toward a biased public, after which the public adapts toward the newly polarized media environment.

The qualitative result persists under weaker bias, although its magnitude falls. With \(\gamma = 0.3\), reducing \(\beta\) from 1 to 0.25 lowers the share of runs ending above 10 from 99% to 71%. Slower media adaptation moderates the process: with \(\gamma = 0.1\), the corresponding shares range from 81% at \(\beta = 1\) to 59% at \(\beta = 0.25\). A supplementary time-varying example reports 98% of runs increasing when \(\gamma\) rises linearly from 0 to 0.6, compared with 99% when it remains at 0.3.

## Limitations

The simulations demonstrate implications of assumed feedback structures; they do not establish that co-adaptation caused observed U.S. polarization. Media and the public are each compressed into one aggregate variable, polarization is measured on an abstract scale, and the main adjustment and bias parameters are fixed rather than estimated from data. The models omit heterogeneity across people, parties, outlets, and media systems, as well as multidimensional or skewed ideological distributions.

The definition of media polarization deliberately combines content, platforms, market structure, technological affordances, algorithms, and audience selectivity. This breadth makes the theory portable but creates a difficult empirical measurement problem. The authors also note that adjustment rates and bias may vary over time or become endogenous; when parameters vary, the model is path dependent and the direction of their effect on final polarization can be ambiguous.

## Related Concepts

- [[Co-Adaptive Political Polarization]]
- Affective polarization
- Media polarization
- In-group bias
- Selective exposure
- System dynamics
- Reinforcing spirals

## Related Papers

- Slater (2007), "Reinforcing Spirals."
- Prior (2013), "Media and Political Polarization."
- Chadwick (2013), "The Hybrid Media System: Politics and Power."
- Wlezien and Soroka (2024), "Media Reflect! Policy, the Public, and the News."

[[index|Library home]]
