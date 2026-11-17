---
title: "When Groups Fall Apart: Identifying Transnational Polarization During the Arab Uprisings"
type: paper
authors:
  - Robert Kubinec
  - John Owen
year: 2021
doi: 10.1017/pan.2020.46
venue: Political Analysis
tags:
  - political-methodology
  - political-polarization
  - ideal-point-estimation
  - social-media
---

## TL;DR

A joint Bayesian item-response and vector-autoregression model separates domestic and transnational components of changing ideological polarization in Egyptian and Tunisian retweets during 2013. Following Egypt's July 3 coup, Egyptian Islamist elites received approximately 50% more retweets from Islamist users and 25% fewer from secularist users. Model-based impulse responses suggest that Tunisian Islamist polarization dampened further polarization among Egyptian Islamists. The transmission channels themselves are not causally identified.

## Research Question

How can changes in domestic group polarization be distinguished from responses to ideological allies abroad while accounting for uncertainty in measuring political positions?

## Motivation

Raw activity spikes cannot distinguish increased attention from ideological separation. Moreover, domestic reactions and cross-border feedback occur together. The paper studies short-term activation of social cleavages, rather than treating polarization as a permanently segregated social structure.

## Contributions

- Jointly estimates latent group positions and their temporal interdependence, propagating measurement uncertainty into time-series inference.
- Models absent retweet interactions through a separate selection component instead of assuming all users saw every elite's tweets.
- Uses impulse-response simulations to distinguish domestic persistence from cross-border feedback.
- Finds that transnational alignment can accompany a dampening, rather than amplification, of domestic polarization.

## Method

Retweet counts measure agreement between citizens and elite groups on Islamist–secularist and democratic–authoritarian dimensions. A Poisson IRT component estimates time-varying elite-group positions with fixed citizen discrimination parameters and citizen intercepts. A logistic hurdle shares elite positions but uses separate citizen parameters to represent selective exposure or participation.

The temporal prior links each group's current position to its own previous position, the previous position of its ideological allies in the other country, and a post-coup indicator. Cross-country links are restricted to ideological allies. Location, orientation, and variance constraints identify the latent scales. Joint estimation combines [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]] with a multivariate time-series structure.

Ten-day impulse-response simulations set internal or external lag coefficients to zero to separate modeled channels. The authors explicitly distinguish these measurement counterfactuals from causal interventions on transmission mechanisms. Only the coup coefficient receives a proposed causal interpretation, conditional on the exact timing being exogenous. Stan estimation parallelizes Hamiltonian-sampler gradient calculations; the paper reports a converged chain within 48 hours using 700 cores.

## Experiments

### Data

The observational application covers March 31–December 31, 2013, or 275 days. The curated elite sample contains 148 accounts: 92 Egyptian and 56 Tunisian. Collection retains approximately 1.2 million original tweets after removing elite retweets. Citizens must have retweeted at least five elites and two elite groups. The final sample contains 6,134 citizens and 119,470 observed citizen–elite interactions, expanded with absent interactions to 11,807,950 observations.

### Findings

- Religious polarization increased after the coup in both countries, with larger effects in Egypt. The approximately +50% and −25% estimates for Egyptian Islamist elites are discrimination-weighted marginal changes in retweet counts, not compounded daily growth rates.
- Democracy-axis effects were weaker and not uniformly polarizing. Both Egyptian groups attracted more retweets from pro-democratic users; Tunisian effects were not statistically distinguishable.
- Indirect religious-axis responses generally counterbalanced direct responses, most strongly among Egyptian Islamists.
- Tunisian Islamists showed little response to Egyptian allies' polarization: the external influence parameter had posterior mean 0.017 and reported HPD interval [−0.088, 0.112].
- The pronounced indirect democracy-axis result was a small authoritarian-direction shift among Tunisian democrats in response to their allies' movement.

These are empirical model estimates, not results from a randomized experiment or a comparative prediction benchmark (Sections 4–6).

## Limitations

The coup-timing assumption is contestable given public anticipation and the military ultimatum. Domestic and international lag coefficients do not identify causal mechanisms. Strategic depolarization is an interpretation, not a directly tested behavioral mechanism.

Retweets must provide a noisy signal of agreement, and elite classifications must contain valid ideological information. Citizen positions are fixed over the study period. Selection thresholds restrict the audience, and the API caps retrieval at 100 retweeters per tweet. The hurdle models selective observation but cannot directly establish which tweets users saw.

Twitter is used as a measurement source; the study does not identify what share of polarization was transmitted through Twitter rather than other media or offline networks. Supplementary coding and diagnostic material is referenced but not included in the supplied Markdown. The extraction contains damaged equations and one inconsistent coup date; July 3 follows the repeated chronology in the main text.

## Related Concepts

- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: joint latent trajectories and cross-country autoregressive dependence.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: positions inferred from audience behavior, here using retweets rather than follower ties.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: shared-position selection component for absent interactions.

## Related Papers

- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: related library treatment of temporal priors and selective missingness; this paper cites an earlier 2019 Kubinec manuscript, not that later version.
- Martin and Quinn (2002), “Dynamic Ideal Point Estimation via Markov Chain Monte Carlo for the U.S. Supreme Court, 1953–1999”: cited foundation for dynamic latent-position measurement.

Replication resources reported by the paper: [Code Ocean](https://doi.org/10.24433/CO.0409732.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/Z6BCTJ).
