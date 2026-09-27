---
title: "Polarization, abstention, and the median voter theorem"
type: paper
authors:
  - Matthew I. Jones
  - Antonio D. Sirianni
  - Feng Fu
year: 2022
doi: "10.1057/s41599-022-01056-0"
tags:
  - spatial-electoral-competition
  - political-polarization
  - voter-turnout
  - third-party-voting
  - dynamical-systems
---

## TL;DR

Two candidates maximizing expected electoral support can separate from the median, and even move beyond their respective voter-cluster centers, when voters may abstain or support fixed ideological third parties. A probabilistic extension of the [[concepts/hotelling-downs-model|Hotelling-Downs Model]] maps these outcomes across voter distributions and behavioral parameters. Applications to two observed U.S. opinion distributions illustrate the mechanism but do not estimate voting behavior or identify the causes of actual candidate polarization.

## Research Question

Under what combinations of voter ideology, abstention, and third-party appeal do strategically motivated major candidates converge to the median, separate moderately, or become more extreme than their voter bases?

## Motivation

Nearest-candidate voting gives two major candidates incentives to approach the median. Abstention and ideological third-party alternatives change the tradeoff: moving toward the center may attract moderate voters while losing support from the base. The paper asks whether this tradeoff can generate elite polarization through electoral incentives, with voter preferences held fixed and without assuming that major candidates intrinsically prefer extreme policies.

## Contributions

- Combines probabilistic major-party choice, indifference-related abstention, and fixed extremist third-party alternatives in a one-dimensional spatial model.
- Separates voter-cluster distance and within-cluster dispersion from three parameters governing voting behavior.
- Maps three candidate-position regimes: convergence, separation within voter-cluster centers, and separation beyond those centers.
- Examines a fixed centrist third-party alternative and substitutes two observed, asymmetric opinion distributions for the symmetric model electorate.

## Method

Voters and major candidates occupy $[0,1]$. The theoretical electorate has normalized density

$$
f(x)=\frac{c}{\sigma\sqrt{2\pi}}
\left[
e^{-(x-0.5-\alpha/2)^2/(2\sigma^2)}+
e^{-(x-0.5+\alpha/2)^2/(2\sigma^2)}
\right],
\qquad \int_0^1 f(x)\,dx=1.
$$

The component centers are separated by $\alpha$, each component has standard deviation $\sigma$, and symmetry fixes the median at $0.5$. Increasing component separation relative to dispersion produces a more distinctly bimodal electorate.

For a voter at $x$ and major candidates at $b$ and $r$, the four behavioral utility weights are (Equations 2-5)

$$
\begin{aligned}
u_B&=|b-x|^{-P}, & u_R&=|r-x|^{-P},\\
u_A&=Q\left(1-\left||b-x|-|r-x|\right|\right),
&u_T&=(1-x)^{-R}+x^{-R}.
\end{aligned}
$$

The authors call $P$ pragmatism, $Q$ the relative cost of voting, and $R$ rebelliousness. $P$ controls distance sensitivity and the appeal of major candidates; $Q$ scales abstention, whose weight is highest when the voter is equally distant from both candidates; $R$ controls the appeal of fixed third parties at the endpoints. Each action has probability $p_k=u_k/(u_B+u_R+u_A+u_T)$. Third-party voting is aggregated into one behavioral category, although its utility includes both endpoints.

Candidate support is $V_i(b,r)=\int_0^1 f(x)p_i(x;b,r)\,dx$. Candidates follow local gradients of their own support (Equations 6-8):

$$
\dot b=\frac{\partial V_B}{\partial b},
\qquad
\dot r=\frac{\partial V_R}{\partial r}.
$$

Although the paper describes this as vote-share maximization, these integrals measure expected support as a fraction of the full electorate. They are not normalized by turnout and do not directly maximize winning probability. Stream plots and parameter maps describe outcomes under the specified adaptive dynamics.

## Experiments

The evidence consists of numerical model explorations and illustrations using observed ideological distributions.

- **Candidate-position regimes (Figures 4, 6-8).** Varying $\alpha$ and $\sigma$ produces convergence, moderate separation, or separation beyond the component centers. Figure 8 compares $P\in\{2,5\}$, $Q\in\{0,30\}$, and $R\in\{1,5\}$. Strong third-party appeal and/or abstention can support divergence even in broadly unimodal electorates; a highly separated, narrow-cluster electorate can also produce extreme candidates when third-party appeal is high and major-party appeal is low. These are conditional results, not a monotone rule that more voter polarization always creates more candidate polarization.
- **Centrist third party (Figure 5).** With $P=5$, $Q=0$, and $R=5$, replacing extreme third-party alternatives with a fixed centrist alternative pulls major candidates inward in the illustrated bimodal electorate. In more unimodal electorates it can instead prevent convergence or push candidates outward. Centrism is therefore not uniformly depolarizing in this model.
- **Observed distributions (Figure 9).** Both applications use the illustrative parameters $P=2$, $Q=30$, and $R=1$:

| Opinion distribution | Approximate voter median | Approximate modeled major-candidate positions |
| --- | --- | --- |
| Pew Research Center, Summer 2017 Political Landscape Survey | 0.42 | 0.25 and 0.51 |
| Twitter ideology distribution redigitized from Mukerjee et al. (2020), Figure 3 | 0.57 | 0.20 and 0.65 |

These asymmetric examples yield candidates at unequal distances from the median. The authors explicitly state that they cannot infer $P$, $Q$, or $R$ without individual-level data linking opinions to voting behavior. The positions are model outputs under assumed behavior, rather than fitted or validated predictions of actual electoral choices.

## Limitations

The electorate is static, voting decisions are independent, and major candidates adjust along one ideological dimension. The model omits primaries, commitment constraints, candidate personality, strategic third-party entry, electoral geography, district rules, and gerrymandering. Proposed feedback from elite positions to future voter polarization is an interpretation beyond the modeled voter dynamics.

Bimodality of the distribution of voter ideal points must be distinguished from the single-peakedness of each voter's preferences. A bimodal electorate alone does not invalidate classical median convergence with deterministic nearest-candidate voting; the paper itself notes this in its voter-choice discussion. Its results change the voting rule and available alternatives as well as the population distribution.

The utility weights are singular at exact voter-candidate coincidence and at the ideological endpoints. Figure 3 acknowledges interpretation problems at special configurations; the supplied text does not specify a numerical regularization scheme. Local gradient adjustment also does not by itself establish global best responses or a unique Nash equilibrium.

The empirical distributions establish possible behavior for observed opinion profiles, not a causal explanation of U.S. polarization. The supplied Markdown refers to a supplementary tipping-point analysis but does not contain that supplement, so its derivations are not summarized here.

## Related Concepts

- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]: a related approach to probabilistic voting and abstention with a different choice rule.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: relevant to the proposed feedback extension; voters' opinions are fixed in this paper.

## Related Papers

- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]]: cited by Jones et al.; also studies local candidate adjustment with probabilistic voter support.
- Adams, Dow, and Merrill III (2006), "The political consequences of alienation-based and indifference-based voter abstention: applications to presidential elections": cited antecedent for abstention mechanisms.
- [[papers/a-computational-model-of-spatial-politics-hotelling-downs-model-as-statistical-physics|A computational model of spatial politics: Hotelling-Downs model as statistical physics]]: a related Wiki paper using distance-sensitive turnout, activist weighting, and multiple parties.
- [[papers/beyond-the-median-voter-a-model-of-how-the-ideological-dimension-shapes-party-polarization|Beyond the median voter: A model of how the ideological dimension shapes party polarization]]: a related Wiki paper studying ideological dimension in a satisficing model.

[[index|Library home]]
