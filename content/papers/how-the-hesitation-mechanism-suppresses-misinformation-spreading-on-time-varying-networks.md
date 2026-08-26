---
title: "How the Hesitation Mechanism Suppresses Misinformation Spreading on Time-Varying Networks"
type: paper
authors:
  - Yong-wang Gong
  - Michael Small
year: null
tags:
  - misinformation
  - information-diffusion
  - time-varying-networks
  - activity-driven-networks
  - contagion-models
  - monte-carlo
---

## TL;DR

This paper proposes an ignorant-hesitator-spreader-recovery (IHSR) model for misinformation spreading on [[Activity-Driven Networks]]. A fraction of users is skeptical: after encountering a spreader, they may hesitate before spreading the misinformation. A mean-field analysis and Monte Carlo simulations show that increasing the fraction of skeptical users or their skepticism level raises the spreading threshold and lowers the final prevalence. Among the tested targeting rules, assigning skepticism to low-activity nodes suppresses misinformation more effectively than random or high-activity selection.

## Research Question

How does a hesitation mechanism change misinformation spreading when the underlying social network is time-varying, and how do the fraction, skepticism level, and activity-based selection of skeptical users affect the spreading threshold and final prevalence?

## Motivation

Many misinformation models use static networks, even though social-media contacts change over time. The paper combines a temporal activity-driven network with heterogeneous user responses: normal users spread misinformation immediately, while skeptical users can enter a temporary hesitator state. This makes it possible to study both changing connectivity and a behavioral delay in one tractable spreading model.

## Contributions

- Introduces an IHSR compartment model on an activity-driven network, separating normal ignorant users from skeptical ignorant users.
- Represents skepticism with the proportion of skeptical nodes `p` and a common skepticism level `tau`, which determines the rates of entering the hesitator and spreader states.
- Derives a mean-field spreading condition and threshold that increase with `p` and `tau`.
- Validates the theoretical dynamics and threshold with Monte Carlo simulations under multiple initial conditions and parameter settings.
- Compares random, maximum-activity, and minimum-activity selection of skeptical nodes and finds that minimum-activity selection produces the lowest final prevalence in the tested model.

## Method

The underlying activity-driven network has `N` nodes. Each node has activity `alpha`; at each time step, active nodes create `m` links to randomly selected nodes, and all links are replaced at the next step. The activity distribution is `F(alpha)`. The mean-field analysis uses the activity-conditioned neighbor distribution

$$
F(\alpha' \mid \alpha) = \frac{(\alpha' + \alpha)F(\alpha')}{\alpha + \langle \alpha \rangle}.
$$

Nodes occupy ignorant (`I`), hesitator (`H`), spreader (`S`), or recovery (`R`) states. Ignorant nodes are divided into normal (`I^n`) and skeptical (`I^s`) users. A normal ignorant node becomes a spreader at rate `beta_1`. A skeptical ignorant node becomes a hesitator at

$$
\beta_H = (1-e^{-\tau})\beta_1
$$

or a spreader at `beta_L = e^{-tau} beta_1`. A hesitator becomes a spreader at rate `beta_2`, and a spreader recovers at rate `mu`. The model tracks activity-conditioned state fractions and closes them through the probability of contacting spreaders.

Near the misinformation-free state, the authors linearize the infection probabilities and reduce the dynamics to the activity-weighted spreader density and its activity moment. With `beta_1 = beta` and `beta_2 = c beta`, the predicted threshold is

$$
\beta_c = \left(1 + \frac{p(1-e^{-\tau})}{c}\right)
\frac{\mu}{m(\langle \alpha \rangle + \sqrt{\langle \alpha^2 \rangle})}.
$$

When `p = 0` or `tau = 0`, this reduces to the standard activity-driven-network threshold. The hesitation mechanism therefore changes the threshold through the additional factor involving `p`, `tau`, and `c`.

## Experiments

The simulations use `N = 5,000`, `m = 6`, an activity distribution proportional to `alpha^-2.5`, five activity values from `0.5` to `0.9`, recovery rate `mu = 0.5`, and `beta_2 = 0.5 beta_1` unless otherwise specified. Results average 50 independent runs. Ten percent of nodes are used as spreading seeds for temporal-dynamics validation; threshold experiments use 0.1% seeds.

- The mean-field trajectories closely match Monte Carlo simulations across outbreak and misinformation-free regimes, different values of `p`, `tau`, and `beta`, and initial seed fractions of 5%, 10%, and 15%. The theory slightly overestimates the final recovery density in outbreak cases, which the authors attribute to the near-threshold linearization.
- The final recovery density changes sharply around a critical spreading rate. The simulated transition agrees approximately with the analytical threshold, and the threshold increases with both the proportion of skeptical users and their skepticism level.
- Above threshold, increasing `p` lowers the final recovery size for fixed spreading rates. Increasing `tau` also lowers it, with a larger effect at smaller spreading rates.
- In the selection comparison, minimum-activity selection gives the lowest final prevalence, random selection is intermediate, and maximum-activity selection gives the highest prevalence for `0 < p < 1`. The simulations show that minimum-activity selection can spread misinformation faster initially, but high-activity non-skeptical nodes then recover earlier and the final prevalence is lower.
- Additional simulations with `mu = 0.3` and `c = 0.7` preserve the qualitative threshold result.

## Limitations

The model assigns every skeptical user the same global skepticism level and does not represent heterogeneous skepticism. It also omits other responses such as fact-checking and debunking. The mean-field threshold relies on a small-spreader approximation, and the simulations use synthetic activity-driven networks and selected parameter values rather than observed platform data. The explanation for why low-activity targeting performs best is consequently a result of this model and its recovery dynamics, not a general empirical targeting rule.

## Related Concepts

- [[Activity-Driven Networks]]
- [[Misinformation Spreading Models]]
- [[Rumor Refutation on Social Media]]
- [[Opinion Dynamics]]
- Time-varying networks
- Social contagion

## Related Papers

- [[Who Should Fight the Spread of Fake News?]]
- Gong and Small (2024), "Misinformation spreading on activity-driven networks with heterogeneous spreading rates."
- Perra, Goncalves, Pastor-Satorras, and Vespignani (2012), "Activity driven modeling of time varying networks."
- Xia, Jiang, Song, and Song (2015), "Rumor spreading model considering hesitating mechanism in complex social networks."
- Hu, Pan, Hou, and He (2018), "Rumor spreading model with the different attitudes towards rumors."
- Moreno, Nekovee, and Pacheco (2004), "Dynamics of rumor spreading in complex networks."
