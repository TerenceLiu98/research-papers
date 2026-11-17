---
title: Mass media interventions and social reinforcements drive rumor propagation
type: paper
authors:
  - Yafang Dong
  - Liang’an Huo
  - Matjaž Perc
  - Stefano Boccaletti
year: 2026
doi: 10.1103/vxkg-41kp
tags:
  - rumor-spreading
  - multilayer-networks
  - social-reinforcement
---

## TL;DR

A three-layer rumor model couples online and offline spreading with traditional and new mass media. Simulations associate traditional media with stronger suppression of single-channel spreaders and new media with stronger suppression of dual-channel spreaders, with nonmonotonic effects in some intervention regimes. A fit to 1,116 Twitter records supports the online trajectory; offline propagation remains unobserved.

## Research Question

How do heterogeneous channel use, media interventions, and positive and negative social reinforcement jointly change rumor propagation across online and offline networks?

## Motivation

Treating media as homogeneous or channels as independent obscures both cross-channel amplification and competition for attention. Individuals active in both channels can transmit differently from those using only one, while repeated exposure can encourage adoption or reduce interest depending on the individual's current state.

## Contributions

- Couples an online scale-free network, a homogeneous offline contact network, and a heterogeneous mass-media layer.
- Separates ignorant, online-only spreader, offline-only spreader, dual-channel spreader, and stifler states.
- Derives a next-generation-matrix threshold and explores intervention and channel-activity response surfaces.
- Fits the online spreader component to a single Twitter rumor dataset.

## Method

The five densities are $i,s_1,s_2,s_3,r$, with total spreaders $s=s_1+s_2+s_3$ and observable online spreaders $s_1+s_3$. Accounts map to individuals across online and offline layers. A willingness reduction factor lowers single-channel transmission relative to dual-channel transmission. Media suppression depends on intervention intensity, trust, and channel exposure; interlayer coefficients represent attention-limited coupling (Section II).

Social reinforcement is state-dependent: exposure through both channels converts ignorants into dual-channel spreaders, but converts single-channel spreaders into stiflers. Dual-channel spreaders are assumed immune to this reinforcement rule. These transitions enter five coupled mean-field equations, with demographic turnover and return from stifling to ignorance.

Under degree-uncorrelated mixing, the authors linearize around the rumor-free equilibrium and report $R_0=\rho(FV^{-1})$, where $F$ represents new spreading and $V$ other transitions. Detailed matrices are deferred to supplementary material. Response Surface Methodology fits simulated steady states to characterize nonmonotonic channel interactions.

## Experiments

Baseline values include online transmission $\beta_A=0.4$, offline transmission $\beta_B=0.2$, turnover $\mu=0.17$, reinforcement parameter $\delta_0=0.5$, and interaction rate $\theta=0.9$. Several remaining parameters are selected within plausible ranges rather than empirically estimated.

- **Media interventions (Figures 5–6):** Six combinations of new and traditional media intensities compare single-channel and dual-channel densities. Traditional media more strongly reduces single-channel steady states; new media more strongly suppresses dual-channel spreaders. With weak traditional intervention, increasing new-media intensity can raise online-only spreading. With strong traditional intervention, it can raise offline-only spreading. These are model response patterns, not estimated causal policy effects.
- **Initial composition (Figure 7):** Dual-channel-dominated initial conditions yield the fastest and strongest spreading in the tested scenarios, followed by online-only and offline-only dominance.
- **Channel activity (Figure 8):** Fitted response surfaces peak for offline-only spreaders at online/offline frequencies approximately $(22.06,16.11)$ and for dual-channel spreaders at $(17.46,21.22)$. These parameter-specific simulation peaks support a cooperation-to-competition interpretation; they are not universal thresholds.
- **Twitter fit (Figure 9):** After removing incomplete entries, 1,116 tweets and retweets remain for a rumor concerning Brett Kavanaugh's confirmation hearings. The model fits $s_1+s_3$ to online records from Bodaghi's dataset, DOI `10.5281/zenodo.2563864`. The text reports visual agreement without a numerical predictive-error metric or held-out evaluation.

## Limitations

Static network structure, homogeneous offline mixing, and assumed behavioral transitions constrain interpretation. Emotional mechanisms and cultural variation are left for future work. Several parameters lack empirical estimates, and reinforcement immunity of dual-channel spreaders is an assumption.

The abstract describes validation of offline prediction, but Section III.D fits only online activity. Differences between total modeled spreaders and observed Twitter activity do not independently validate hidden offline dynamics. The supplied Markdown contains damaged mathematical notation, and the referenced supplement containing derivations and fitted parameter tables is absent. The full threshold expression is therefore not reconstructed here. Computational code and data are available from the corresponding author on reasonable request according to the paper.

## Related Concepts

- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: compartmental diffusion with channel-specific spreader states.
- [[concepts/social-reinforcement-and-weakening|Social Reinforcement and Weakening]]: repeated exposure has opposing effects depending on prior participation.
- [[concepts/rumor-refutation-on-social-media|Rumor Refutation on Social Media]]: media suppression interacts with audience channel use.

## Related Papers

- [[papers/spreading-dynamics-of-information-on-online-social-networks|Spreading dynamics of information on online social networks]]: a complementary library paper models exposure-dependent reinforcement and audience depletion; the present work assigns reinforcement effects by spreader state and channel.
- Zhai et al. (2024), “A multilayer network model of interaction between rumor propagation and media influence,” cited as reference 23: related multilayer media modeling.
- Granell, Gómez, and Arenas (2013), “Dynamical interplay between awareness and epidemic spreading in multiplex networks,” cited as reference 33: a related coupled-diffusion framework.
