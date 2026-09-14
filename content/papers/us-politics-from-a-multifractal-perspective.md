---
title: "U.S. Politics from a multifractal perspective"
type: paper
authors:
  - Wolfgang Schadner
year: 2022
doi: "10.1016/j.chaos.2021.111677"
tags:
  - sociophysics
  - multifractal-analysis
  - political-time-series
  - prediction-markets
---

## TL;DR

Daily U.S. presidential approval, Google search attention, and election-contract prices exhibit anti-persistence and positive surrogate-corrected multifractal widths in this study. Across nine series, the estimated Hurst exponent ranges from 0.158 to 0.459. These are descriptive scaling results: the paper does not test an election forecasting model, a profitable trading strategy, or an intervention that changes political support.

## Research Question

Do political time series exhibit dependence that requires multiple scaling exponents, and does this multifractality remain after accounting for finite sample length and heavy-tailed distributions?

## Motivation

Approval polls, search attention, and [[Prediction Markets]] are used to assess political support or anticipated election outcomes. Their temporal dependence may therefore matter for interpreting changes and designing forecasts. The paper applies methods from statistical physics to temporal political signals, complementing studies of cross-sectional voting and [[Opinion Dynamics]].

## Contributions

- Applies [[Multifractal Detrended Fluctuation Analysis]] (MF-DFA) to three types of political signals covering selected presidents and candidates over 2008-2021.
- Combines fully overlapping segments with focus-based regression, adopting existing methodological refinements rather than introducing a new estimator.
- Uses iterated amplitude adjusted Fourier transform (IAAFT) surrogates to estimate the component of multifractal width attributable to finite size and distributional effects.
- Reports anti-persistence in every series, with larger corrected widths for the Democratic signals than their Republican counterparts in the selected comparisons.

## Method

Approval proportions and prediction-market probabilities are logit-transformed; the analysis targets changes in the transformed signals. Google Trends series are converted into log-changes. Daily Google data are reconstructed by rescaling normalized monthly-window downloads against the corresponding lower-frequency series over the full horizon (Section 4.2).

MF-DFA cumulatively sums the input, fits a linear trend within each overlapping window, and aggregates detrended fluctuations at different window sizes $s$ and moment orders $q$. Positive orders emphasize large fluctuations, while negative orders emphasize small ones. The generalized Hurst exponents are estimated jointly using a shared focus at the full series length $N$:

$$
\log_2 F_q(s)=h(q)(\log_2 s-\log_2 N)+\log_2 F(N).
$$

The implementation uses $q\in[-10,10]$ in steps of 0.5, with logarithmically spaced scales, a series-specific minimum scale between 16 and 32, and maximum scale $N/12$. The second-order exponent is $H=h(2)$; values below 0.5 indicate anti-persistence under the adopted scaling interpretation. Variation in $h(q)$ is summarized by $\Delta h=|h(q_{\min})-h(q_{\max})|$. The singularity-spectrum width $\Delta\alpha$ provides a complementary summary.

IAAFT surrogates are intended to preserve the marginal distribution and linear dependence while disrupting nonlinear dependence. The paper subtracts their estimated widths from those of the original series:

$$
\Delta h_{\mathrm{nlc}}=\Delta h-\Delta h_{\mathrm{spur}},
\qquad
\Delta\alpha_{\mathrm{nlc}}=\Delta\alpha-\Delta\alpha_{\mathrm{spur}}.
$$

These residuals operationalize the paper's term "true multifractality." Regression fit and visual inspection of singularity spectra serve as diagnostics; the author cautions that imposing a common focus can mislead for monofractal signals.

## Experiments

The empirical analysis uses FiveThirtyEight aggregated approval ratings for Obama and Trump, Google searches for "Obama," "Trump," and "Biden," and PredictIt end-of-day election-win contract prices for the major-party nominees in 2016 and 2020. Biden's approval history was excluded because it was too short at the time. Table values below reproduce Tables 1-3, including their reported rounding; $N$ is the reported observation count.

| Signal | Candidate | $N$ | $H$ | Raw $\Delta h$ | Corrected $\Delta h_{\mathrm{nlc}}$ | Corrected $\Delta\alpha_{\mathrm{nlc}}$ |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Approval | Obama | 2918 | 0.387 | 0.318 | 0.065 | 0.086 |
| Approval | Trump | 1458 | 0.459 | 0.275 | 0.032 | 0.038 |
| Search attention | Obama | 3257 | 0.233 | 0.221 | 0.072 | 0.089 |
| Search attention | Trump | 1820 | 0.158 | 0.271 | 0.070 | 0.083 |
| Search attention | Biden | 581 | 0.238 | 0.415 | 0.157 | 0.155 |
| Election contracts | Trump 2020 | 1131 | 0.385 | 0.276 | 0.089 | 0.113 |
| Election contracts | Biden 2020 | 771 | 0.428 | 0.844 | 0.341 | 0.342 |
| Election contracts | Trump 2016 | 509 | 0.373 | 0.422 | 0.088 | 0.117 |
| Election contracts | Clinton 2016 | 509 | 0.440 | 0.665 | 0.401 | 0.513 |

Search attention has the strongest anti-persistence. A separate DFA comparison gives pre-presidency versus in-office $H$ values of 0.355 versus 0.226 for Obama, 0.265 versus 0.132 for Trump, and 0.253 versus 0.124 for Biden. Approval has comparatively small corrected multifractal widths, whereas the Democratic election-contract series have the largest corrected widths. Reported regression $R^2$ values range from 0.978 to 0.999.

The author describes the corrected widths as significant. The supplied text reports neither confidence intervals nor a surrogate-test significance threshold, so positive residual widths should be distinguished from a documented hypothesis test. Behavioral overreaction, campaign coverage, and nomination uncertainty are proposed interpretations rather than identified causes.

## Limitations

- The small selection of candidates, unequal observation lengths, and different proportions of campaign and presidency periods limit comparisons. Biden's short search series lacks the later presidency periods available for Obama and Trump. The party contrast does not establish a general partisan effect.
- High regression fit and smooth spectra support the fitted scaling description but do not independently establish a behavioral mechanism, deterministic chaos, or forecast improvement. Finite-size corrections remain conditional on the surrogate construction and analysis parameters.
- The text does not specify the number of surrogate realizations or provide uncertainty estimates for the corrected widths. The very small Obama-Trump search-attention difference therefore warrants particular caution.
- The supplied Markdown contains apparent equation and date inconsistencies. In particular, Table 3 repeats the end date `2/11/20` for all four contract series, including 2016 contracts, despite differing observation counts and election contexts. Exact market end dates are left unresolved here. The overlapping-window indexing and zero-order fluctuation formula are also not reproduced as implementation instructions.
- Proposed campaign timing and trading implications are speculative. No out-of-sample forecasts, transaction-cost analysis, intervention tests, or direct estimates of controllable local persistence are reported.

## Related Concepts

- [[Multifractal Detrended Fluctuation Analysis]]
- [[Prediction Markets]]
- [[Opinion Dynamics]]

## Related Papers

- Kantelhardt et al. (2002), "Multifractal detrended fluctuation analysis of nonstationary time series," *Physica A* 316, 87-114: foundational MF-DFA method (source reference 54).
- Mukli, Nagy, and Eke (2015), "Multifractal formalism by enforcing the universal behavior of scaling functions," *Physica A* 417, 150-167: focus-based regression (reference 81).
- Schreiber and Schmitz (2000), "Surrogate time series," *Physica D* 142, 346-382: surrogate methodology (reference 104).
- Lebo and Cassino (2007), "The aggregated consequences of motivated reasoning and the dynamics of partisan presidential approval," *Political Psychology* 28, 719-746: approval dynamics (reference 60).
- Brown, Reade, and Vaughan Williams (2019), "When are prediction market prices most informative?" *International Journal of Forecasting* 35, 420-428: information efficiency around poll releases (reference 15).

Bibliographic note: The supplied Markdown omits the title and records online availability on 20 December 2021. The [publisher record](https://www.sciencedirect.com/science/article/pii/S0960077921010316) supplies the title, DOI, and journal issue: *Chaos, Solitons & Fractals* 155 (February 2022), 111677. The frontmatter uses the issue year; the research summary is based on the supplied Markdown.

[[index|Library home]]
