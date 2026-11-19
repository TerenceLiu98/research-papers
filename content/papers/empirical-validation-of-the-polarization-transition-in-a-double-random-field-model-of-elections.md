---
title: Empirical Validation of the Polarization Transition in a Double-Random Field Model of Elections
type: paper
authors:
  - Jan Korbel
  - Remah Dahdoul
  - Stefan Thurner
year: 2026
doi: "10.1103/9gjj-1df6"
tags:
  - campaign-spending
  - political-polarization
  - sociophysics
---

## TL;DR

A close election can conceal two groups that vote almost unanimously for opposing parties. Korbel, Dahdoul, and Thurner predict this outcome when the groups are similar in size and both campaigns are strong enough to outweigh pressure to vote with neighbors. Fitting the model to US House elections yields a threshold of about \$1.83 million per campaign in 2020 dollars for an evenly divided district.

## Research Question

When does campaign influence outweigh local social influence, and can election returns and expenditures identify where that transition occurs?

## Motivation

An incumbent can win despite being outspent, while two expensive campaigns can end in a near tie. A model that combines peer influence with separate audiences for rival campaigns makes predictions about both patterns.

## Contributions

- The authors derive spending thresholds that depend on the relative sizes of the two campaign audiences. When both fields are strong, the predicted vote share approaches the fraction following each campaign.
- They use races where incumbents survive a spending disadvantage to estimate the strength of peer alignment relative to campaign influence. The same fit predicts where close outcomes should become common in evenly divided districts.

## Method

Each voter has a binary preference, tends to agree with neighbors, and follows one campaign. In the mean-field approximation, the average preferences of the two audiences are $m_\pm=\tanh[(\tilde J m \pm h^\pm)/T]$, where $\tilde J$ measures peer coupling, $h^\pm$ are campaign field magnitudes, and $T$ controls willingness to switch. If fraction $p$ follows the positive campaign, the vote margin is $m=p m_+ +(1-p)m_-$. Campaign polarization is the within-race contrast $\pi=(m_+-m_-)/2$. For two equally sized audiences voting in opposite directions, $m=0$ and $\pi=1$.

The authors use spending as a proxy for field strength and the district's previous vote share as a proxy for $p$. At low spending, two stable majorities can coexist at the same expenditures. The classifier selects the incumbent's party in that region when an incumbent runs. Elsewhere, the sign of the predicted margin selects the winner.

## Experiments

The analysis covers 6,357 qualifying Democratic-Republican House contests out of 9,135 district elections from 1980 through 2020. Maximizing winner classification accuracy gives $T=0.922$ in units of peer coupling and a symmetric critical expenditure of \$1.83 million. Including hysteresis yields a small accuracy gain over the model without hysteresis (McNemar $p=6.76\times10^{-7}$). Incumbents usually outspend challengers, so the two rules often agree.

Figure 4 tests a separate prediction about margins. Among districts with prior vote share between 45% and 55% and campaign expenditures within \$100,000 of each other, 39% of outcomes fell within a ten-point margin below the threshold, compared with over 70% above it. The share of competitive districts where both campaigns exceeded the threshold rose sharply in 2018 and 2020.

## Limitations

Election returns reveal the total vote, while campaign polarization depends on how each audience voted. The margin comparison therefore tests an observable consequence of the model. Establishing the proposed mechanism would require independent evidence on campaign exposure and individual preferences. The threshold also depends on treating spending as proportional to influence and approximating social ties by their average strength. Its calibration covers two-party US House contests.

## Related Concepts

- [[concepts/random-field-ising-model|Random-Field Ising Model]] supplies the two opposing local fields and the coupling among neighbors.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]] explains how the same expenditures can sustain either majority, depending on the prior state.
- [[concepts/political-polarization|Political Polarization]] includes several kinds of division. This paper measures alignment of vote choice with campaign following.

## Related Papers

- [[papers/symmetry-breaking-hysteresis-and-convergence-to-the-mean-voter-in-two-party-spatial-competition|Symmetry Breaking, Hysteresis, and Convergence to the Mean Voter in two-party Spatial Competition]] also derives electoral hysteresis. Its stable branches describe party platform positions as voter tolerance varies, whereas the branches here describe voting majorities as spending varies.
