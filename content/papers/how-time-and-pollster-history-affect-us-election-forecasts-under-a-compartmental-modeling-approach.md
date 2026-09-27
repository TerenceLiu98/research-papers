---
title: "How Time and Pollster History Affect U.S. Election Forecasts under a Compartmental Modeling Approach"
type: paper
authors:
  - Ryan Branstetter
  - Samuel Chian
  - Joseph Cromp
  - William L. He
  - Christopher M. Lee
  - Mengqi Liu
  - Emma Mansell
  - Manas Paranjape
  - Thanmaya Pattanashetty
  - Alexia Rodrigues
  - Alexandria Volkening
year: 2026
doi: "10.1137/24M1719505"
arxiv: "2411.01730"
venue: "SIAM Journal on Applied Dynamical Systems"
source_job_id: fb5f4b0c-7b92-4121-b697-0101cd55d4bf
tags:
  - election-forecasting
  - opinion-dynamics
  - compartmental-models
  - polling
---

## TL;DR

A poll-fitted Republican-Undecided-Democratic compartmental model generally forecasts more accurately near Election Day and performs better for presidential than gubernatorial races. Adjusting polls by each pollster's historical signed error substantially improves the 2020 presidential forecasts and several Senate cycles, but worsens some states and the 2014 Senate forecasts, with no clear gubernatorial benefit. The 2024 postscript likewise finds that improved winner calls and Brier scores can coexist with little improvement in late presidential margin errors.

## Research Question

How does forecast accuracy change within and across U.S. election cycles, and does correcting polls for historical pollster tendencies improve forecasts from a fixed compartmental model?

## Motivation

Election forecasts depend on both the model of voting intentions and decisions about aggregating imperfect polls. Evaluating only final forecasts or winner calls obscures changes over time, differences between election types, and errors in predicted margins. The study holds the underlying [[concepts/compartmental-election-forecasting|compartmental forecasting model]] fixed while comparing unadjusted polls with a simple historical adjustment related to [[concepts/polling-house-effects|polling house effects]].

## Contributions

- Extends a prior model's evaluation to monthly presidential forecasts for 2004-2020 and Senate and gubernatorial forecasts for 2012-2022, followed by a 2024 assessment.
- Reconciles more than 1,500 pollster-name strings into an estimated 481 polling organizations for 2004-2022, releasing the imperfect alias library for reuse.
- Compares baseline poll aggregation with historical signed-error correction before parameter fitting, using winner-call accuracy, swing-state margin error, and Brier scores.
- Provides adaptable data-processing software and distinguishes published real-time forecasts from additional retrospective forecasts in the 2024 postscript.

## Method

**Dynamics.** The cRUD model, inherited from Volkening et al. (2020), tracks Democratic, Republican, and undecided/other fractions in region $i$, with $U_i=1-D_i-R_i$. For party $P\in\{D,R\}$, its deterministic equation is

$$
\frac{dP_i}{dt}=-\gamma_P^iP_i+
U_i\sum_{j=1}^{M}\beta_P^{ij}\frac{N^j}{N}P_j.
$$

Committed voters can become undecided, while undecided voters acquire a party preference through within- or between-region transmission. Directional influence coefficients need not be symmetric. Competitive states are modeled individually; reliably Democratic and Republican states are grouped into two population-weighted superstates. These are modeling assumptions about [[concepts/opinion-dynamics|opinion dynamics]], not identified causal effects of interpersonal persuasion.

**Baseline data and fitting.** The pipeline excludes polls whose end dates follow the forecast date, excludes national polls, and aggregates eligible state polls into eleven 30-day bins within 330 days of Election Day. Missing interior bins are linearly interpolated; leading or trailing empty bins use the nearest observed bin. A swing state with no polls is omitted from the dynamical system and reported as a zero-margin, 50-50 race. Such a race counts as an incorrect winner call and remains in Brier evaluation. States without polls inside a superstate receive its shared forecast. Nonnegative parameters minimize squared deviations between deterministic trajectories and binned polling fractions (Section 2.2.1).

**Historical adjustment.** For an election in year $y$, the stated procedure uses only elections from 2004 through $y-1$ to estimate pollster $k$'s mean signed error:

$$
\Delta_y^k=\frac{1}{N_{y-1}^k}\sum_{\ell=1}^{N_{y-1}^k}
\left[(R_\ell^{\mathrm{result}}-D_\ell^{\mathrm{result}})
-(R_\ell^{\mathrm{poll}}-D_\ell^{\mathrm{poll}})\right].
$$

Each current poll's Republican share increases by half the estimated correction and its Democratic share decreases by half, before binning and fitting. Positive corrections therefore move margins Republicanward. This is a historical error adjustment, not an estimator that separates house bias from sampling variance. Equation 2.7 labels the correction $\Delta_y^k$, whereas the subsequent application writes $\Delta_{y-1}^k$; this summary follows the explicit prior-election cutoff described in the text and Figure 3 rather than inferring an additional year of lag.

**Simulation and scoring.** With fitted parameters, the stochastic model runs 10,000 times from January to Election Day. Additive noise has strength $\sigma=0.0015$; covariance uses regional demographic similarity in education, non-Hispanic Black population share, or Hispanic population share, selecting one similarity matrix randomly per simulation. Euler-Maruyama uses a 0.1-day step. The mean terminal Republican-minus-Democratic share gives the forecast margin; terminal outcomes give win probabilities. Mean absolute margin-of-victory (MOV) error is evaluated over individually forecast swing states, whereas winner-call accuracy and Brier scores unpack superstates into individual races (Sections 2.3-2.4; Appendices A-B).

## Experiments

The historical study generates five forecasts per cycle, labeled July-November, corresponding to 121, 91, 61, 31, and 1 days before Election Day. Polls come from RealClearPolitics for 2004/2008, HuffPost Pollster for 2012-2016, and FiveThirtyEight for 2018 onward. Election results come from Dave Leip's Atlas. Available FiveThirtyEight forecasts provide reference comparisons, including multiple Senate model variants where available. Percentage-point changes below concern margin error, not relative percentage improvements.

| Evaluation | Reported result | Scope |
| --- | --- | --- |
| Time and race type | Accuracy generally improves nearer Election Day; presidential forecasts perform best and gubernatorial forecasts worst | Baseline results, Section 3.1 and Figure 6 |
| October presidential baseline | Mean swing-state MOV errors are approximately 2.2 points in 2004, 6.4 in 2008, 2.2 in 2012, 5.4 in 2016, and 4.3 in 2020 | About one month before each election; not final forecasts |
| 2020 presidential adjustment | Mean swing-state MOV error improves by about 1.8 points over baseline, averaging monthly forecasts | Section 3.3; most swing states improve |
| 2020 FiveThirtyEight comparison | Adjusted mean swing-state MOV error is about 0.64 points lower on average across the same five forecast dates | Does not establish superiority across all cycles or metrics |
| Negative cases | Nevada's late-2020 MOV error increases by over 4 points; 2014 Senate mean swing-state MOV error worsens by almost 2 points | Historical corrections can shift in the wrong direction |
| Other races | Adjustments generally improve 2018, 2020, and 2022 Senate forecasts; no clear gubernatorial improvement | Both variants still exceed nearly all FiveThirtyEight Senate variants' MOV errors in 2020/2022 |

**2024 forecast provenance.** Baseline forecasts were posted regularly in real time. Only one extended forecast was published before the election, on arXiv on 4 November, using polls downloaded on 28 October for Figure 10. The subsequent monthly extended forecasts are retrospective additions in Section 5. The postscript uses poll downloads from 28 October for forecasts before November and 11 November for final forecasts, with the described end-date filtering, and election results accessed on 13 November. Presidential fitting uses Harris-versus-Trump polls only.

The historical pollster adjustments for 2024 average 2.1 points toward Republican candidates. In the postscript's October and November presidential forecasts, the extended approach correctly calls every state's winner, while the baseline misses Michigan and Nevada. From October onward, the approaches have similar presidential MOV errors, although adjustment consistently improves the Brier score. The authors interpret this combination as corrections overshooting in several states. Senate forecasts generally improve under adjustment; gubernatorial forecasts remain similar (Figures 11-13).

## Limitations

- Historical mean signed errors mix sampling variance, persistent house effects, industry-wide misses, changing preferences, and other errors. The method assumes enough sampling error cancels and that past tendencies remain useful despite pollsters changing their methods.
- Pollster identity reconciliation involves ambiguous sponsors, collaborators, renamed organizations, and judgment calls. The estimated 481 organizations are not a verified census, and early cycles have much less historical data for correction.
- Sparse polls, superstate aggregation, a two-party representation, and a fixed additive noise strength simplify the forecast problem. Additive noise can briefly make the undecided fraction negative; positivity-preserving noise is proposed as future work.
- Better winner calls do not guarantee accurate margins or calibrated uncertainty. Correlated states, repeated forecasts, and a small number of election cycles limit how broadly performance differences can be generalized. The observed incumbency pattern is descriptive.
- The 2024 monthly extended evaluation is partly retrospective. Poll end-date filtering should not be conflated with documented availability of every poll or revision at each historical forecast time.
- The supplied Markdown does not include the supplementary state definitions or detailed Senate/gubernatorial figures. Findings attributed to those figures here are limited to what the main text reports. Runoff outcomes usually supply evaluation results, with a stated exception for Georgia's 2022 Senate race.

## Related Concepts

- [[concepts/compartmental-election-forecasting|Compartmental Election Forecasting]]: poll-fitted regional differential equations and stochastic forecast distributions.
- [[concepts/polling-house-effects|Polling House Effects]]: systematic pollster tendencies and the limits of historical correction.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: interaction-based changes in voting intentions.

## Related Papers

- Volkening, Linder, Porter, and Rempala (2020), "Forecasting elections using compartmental models of infection," [DOI: 10.1137/19M1306658](https://doi.org/10.1137/19M1306658): direct model and software precursor (reference 108).
- Shirani-Mehr, Rothschild, Goel, and Gelman (2018), "Disentangling bias and variance in election polls," [DOI: 10.1080/01621459.2018.1448823](https://doi.org/10.1080/01621459.2018.1448823): cited treatment separating poll bias and variance (reference 91).
- Linzer (2013), "Dynamic Bayesian forecasting of presidential elections in the States," [DOI: 10.1080/01621459.2012.737735](https://doi.org/10.1080/01621459.2012.737735): cited alternative combining historical information and polls (reference 74).
- [[papers/social-opinions-prediction-utilizes-fusing-dynamics-equation-with-llm-based-agents|Social opinions prediction utilizes fusing dynamics equation with LLM-based agents]]: related Wiki reading, not a cited source; also uses contagion-inspired opinion updates, but evaluates social-media trajectories with supplied event information rather than electoral outcomes.

Code and formatted data or download instructions: [authors' GitLab repository](https://gitlab.com/alexandriavolkening/forecasting-elections-using-compartmental-models-2), identified in source reference 30.

Bibliographic note: The supplied source cites its 2024 preprint and includes a later post-election assessment. The [SIAM publication record](https://epubs.siam.org/doi/full/10.1137/24M1719505) confirms the canonical title and the journal publication in 2026, volume 25(1), pages 160-195. The frontmatter uses the journal year; the research summary follows the supplied Markdown.

[[index|Library home]]
