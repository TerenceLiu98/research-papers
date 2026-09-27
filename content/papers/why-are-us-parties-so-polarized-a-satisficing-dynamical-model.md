---
title: "Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model"
type: paper
authors:
  - Vicky Chuqiao Yang
  - Daniel M. Abrams
  - Georgia Kernell
  - Adilson E. Motter
year: 2020
tags:
  - spatial-electoral-competition
  - political-polarization
  - satisficing
  - dynamical-systems
---

## TL;DR

Two parties can polarize while the electorate's ideological distribution stays fixed if voters accept parties that are sufficiently satisfactory and parties adjust their positions to increase expected vote counts. Narrower party appeal can favor separation over convergence. Using within-party dispersion in congressional ideology as an input, the fitted model reproduces aspects of U.S. party polarization during 1861-2015; predicted and observed interparty distance have Pearson correlation 0.75. This is a historical model fit, not an identified causal effect of party homogeneity.

## Research Question

Can voter satisficing and changes in parties' ideological inclusiveness explain increasing separation between congressional Democrats and Republicans without increasing ideological dispersion in the public?

## Motivation

The standard [[concepts/hotelling-downs-model|Hotelling-Downs Model]] predicts median convergence when two parties seek votes from citizens who choose the nearest party. The authors contrast this prediction with rising congressional polarization and evidence of a broadly centrist electorate. [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]] changes voter choice: a citizen may accept either party, both, or neither, making abstention and the breadth of party appeal central to electoral incentives.

## Contributions

- Derives continuous party-position dynamics from probabilistic voter satisfaction, abstention, and local increases in expected vote counts.
- Shows analytically and numerically that stable party separation can occur with a fixed, unimodal voter distribution.
- Links model inclusiveness to within-party congressional ideological dispersion and fits historical party trajectories.
- Examines independent survey measures of satisfaction, alternative legislative polarization measures, a two-dimensional extension, and a different party objective in the supplement.

## Method

The electorate has a fixed Gaussian ideological density $\rho(x)$ centered at zero with standard deviation $\sigma_0$. Party $i$ occupies $\mu_i$ and satisfies a voter at $x$ with probability

$$
s_i(x)=\exp\left[-\frac{(x-\mu_i)^2}{2\sigma_i^2}\right].
$$

The width $\sigma_i$ represents voter tolerance or party inclusiveness. Under the model's factorized satisfaction probabilities, voters satisfied with neither party abstain, those satisfied with one choose it, and those satisfied with both split equally. Thus, for $j\ne i$,

$$
p_i(x)=s_i(x)[1-s_j(x)]+\tfrac12 s_i(x)s_j(x),
\qquad
V_i=\int_{-\infty}^{\infty}\rho(x)p_i(x)\,dx.
$$

Parties follow the gradient of their own expected vote count (main-text Equations 1-3):

$$
\frac{d\mu_i}{dt}=k\frac{\partial V_i}{\partial\mu_i},\qquad k>0.
$$

For equal widths $\sigma_1=\sigma_2=\sigma$, symmetric separated equilibria merge at the center at $\sigma_c/\sigma_0\approx0.807$. High inclusiveness supports central convergence; below the threshold, stable separated positions are possible. The equilibrium distance is not globally monotone in width: Equation 6 also approaches zero as $\sigma\to0$. The negative inclusiveness-polarization relationship emphasized in the empirical analysis therefore concerns a relevant parameter range, not every possible width.

For estimation, the authors use first-dimension DW-NOMINATE scores for the combined House and Senate. Each party's mean gives its position, and its standard deviation supplies $\sigma_i=b\sigma_{\mathrm{data},i}$. Starting from observed positions in 1861, simulations update inclusiveness every Congress while keeping the electorate fixed. Minimizing absolute trajectory errors gives $\sigma_0=0.93$, $b=3.73$, and $k=2.54$ (Section 4.5).

## Experiments

| Analysis | Reported result | Scope |
| --- | --- | --- |
| Historical congressional fit, 1861-2015 | Predicted versus observed party separation: $r=0.75$, $p=6.1\times10^{-15}$ | Figure 4C; fitted parameters and observed inclusiveness inputs, rather than a held-out forecast |
| Gaussian electorate approximation | $R^2=0.74$ for aggregated ANES self-reported ideology, 1972-2012 | Figure S1; supports the distributional approximation, not historical invariance throughout 1861-2015 |
| Independent satisfaction proxy | ANES-derived width versus congressional width: $r=0.51$, $p=0.03$; versus party separation: $r=-0.58$, $p=0.01$ | Supplement Section 3.1; 18 survey years, 55,674 individuals |
| Alternative legislative metric | Inclusiveness versus separation: $r=-0.77$, $p=2\times10^{-16}$ for DW-NOMINATE and $r=-0.59$, $p=2\times10^{-8}$ for the alternative metric | Supplement Section 3.2; alternative metric uses House roll calls, 1941-2015 |

The ANES check treats a feeling thermometer score of at least 50 toward liberals or conservatives as satisfaction, locates those groups at opposite ends of the seven-point ideology scale, and fits Gaussian satisfaction widths. The alternative legislative score is half the difference between a representative's rates of voting with Republican and Democratic majorities.

Nearest-party utility-maximizing voters restore central convergence in the comparison model (Section 5.1). Two-dimensional numerical examples retain separation at smaller widths. Changing the parties' objective to their share of votes cast, $V_i/\sum_j V_j$, also changes the result: exactly two parties converge to the median, while the supplement's minor-party extensions restore separation. A four-party example with two major and two minor parties reproduces qualitatively similar historical trajectories (Supplement Section 4).

## Limitations

The empirical results establish compatibility with the proposed mechanism. Both modeled inclusiveness and observed polarization are primarily derived from the same congressional score distributions, and the three parameters are fitted to the historical trajectories. The independent ANES check supports the association but does not identify its causal direction or directly observe individual satisficing choices in elections.

The main model assumes one ideological dimension, Gaussian voter and satisfaction profiles, a stationary electorate, equal choice probabilities among acceptable parties, and local gradient adjustment. Congressional dispersion is a proxy for voter tolerance and party appeal. Party inclusiveness is supplied externally rather than explained by the model; primaries, campaign finance, Southern realignment, and other institutional changes are omitted. Deviations from the historical data occur around the World Wars and the recent Republican rightward shift.

The vote-count objective matters: the strict two-party vote-share variant does not produce the same polarization outcome. Section 4.2 calls the symmetric transition a subcritical pitchfork; this summary retains the stated threshold and equilibrium behavior without treating that subtype label as independently verified.

Source metadata are incomplete: the year follows the existing Wiki's citation of Yang et al. (2020); the supplied Markdown does not give a publication year or stable paper identifier, and its code-repository URL is truncated.

## Related Concepts

- [[concepts/satisficing-spatial-competition|Satisficing Spatial Competition]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]

## Related Papers

- Downs (1957), "An economic theory of political action in a democracy": the nearest-party convergence benchmark cited in the paper.
- Hill and Tausanovitch (2015), "A disconnect in representation? Comparison of trends in congressional and public polarization": cited evidence for different elite and public polarization trends.
- [[papers/symmetry-breaking-hysteresis-and-convergence-to-the-mean-voter-in-two-party-spatial-competition|Symmetry Breaking, Hysteresis, and Convergence to the Mean Voter in two-party Spatial Competition]]: a related Wiki paper studying general satisfaction kernels, asymmetry, and hysteresis.
- [[papers/beyond-the-median-voter-a-model-of-how-the-ideological-dimension-shapes-party-polarization|Beyond the median voter: A model of how the ideological dimension shapes party polarization]]: a related Wiki paper extending satisficing competition to multiple ideological dimensions.

[[index|Library home]]
