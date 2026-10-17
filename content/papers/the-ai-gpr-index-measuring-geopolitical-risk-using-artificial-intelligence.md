---
title: "The AI-GPR Index: Measuring Geopolitical Risk using Artificial Intelligence"
type: paper
authors:
  - Matteo Iacoviello
  - Jonathan Tong
year: 2026
tags:
  - geopolitical-risk
  - text-as-data
  - large-language-models
  - economic-measurement
  - human-validation
---

## TL;DR

The September 25, 2026 manuscript introduces a daily geopolitical risk index by applying GPT-4o mini to about 4.6 million newspaper articles from 1960-2025. Graded article scores produce an intensity-weighted share of news coverage, with additional classifications for threats, acts, oil disruptions, countries, and directed country pairs. Human audits indicate much higher recall than a comparable keyword index with slightly better precision. Applications associate higher risk with lower stock returns and delayed trade contraction, and use oil-related news to identify a contractionary oil supply shock.

## Research Question

Can semantic classification improve the measurement of geopolitical risk in historical news, while supporting economically useful distinctions between anticipated threats, realized acts, energy disruptions, and bilateral tensions?

## Motivation

Keyword proximity searches can mistake historical, fictional, or incidental references for current risk and miss relevant coverage expressed in other terms. Binary classifications also discard intensity. The paper retains the geopolitical risk framework of Caldara and Iacoviello (2022), combining broad keyword retrieval with [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] to improve article assessment.

## Contributions

- Constructs a daily series from three U.S. newspapers with an explicit scoring rubric and normalization by total publishing volume.
- Audits both retrieved and excluded articles, comparing model scores with human judgments and a reconstructed keyword baseline.
- Adds overlapping threat/act series, regional oil measures, country measures for 200 countries, and directed indices for the top 1,200 country pairs.
- Demonstrates financial, macroeconomic, and bilateral-trade applications of [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]].

## Method

**Corpus and scoring.** ProQuest articles from the New York Times, Washington Post, and Chicago Tribune form a universe of 8,514,822 articles over 1960-2025. A broad keyword screen retrieves 4,571,496; 1,166,083 receive positive model scores. GPT-4o mini sees the headline and first 2,000 characters, uses a zero-shot 0-1 rubric at temperature zero, and returns structured JSON. The rubric excludes historical retrospectives and purely domestic events without international implications.

**Aggregation.** For article scores $S_{it}$ and total newspaper output $A_t$, define

$$
q_t=\frac{\sum_{i=1}^{N_t}S_{it}}{A_t},\qquad
\mathrm{AI\text{-}GPR}_t=100\frac{q_t}{\overline q_{1985\text{-}2019}}.
$$

The denominator includes articles rejected by the screen. This measures the intensity-weighted share of coverage, rather than the average risk among retrieved articles or an event probability. The authors report approximately $450 and 250 hours to score the corpus with five parallel API calls; these are manuscript-specific implementation figures.

**Additional classifications.** Positive-score articles receive threat, act, or both labels; both contributes to each subindex, so these are not additive components. Oil classification further restricts articles to scores above 0.5 and oil/energy keyword matches before identifying disruptions and affected regions. Country classification assigns initiator, respondent, or spillover roles; directed pairs distinguish who acts on whom as portrayed in coverage.

## Experiments

### Measurement Validation

The human audit covers 2,447 articles across three strata: 400 excluded by the keyword screen, 1,451 retrieved but scored zero, and 596 retrieved and scored positive. Of these, 2,101 are double-coded. Reported model-consensus correlation is 0.85, compared with 0.78 between human coders. Agreement is a benchmark against fallible human judgments, not proof of access to true geopolitical risk.

Table A.5 reports the following percentages after weighting strata to represent the full corpus and comparing against individual coder ratings:

| Measure | AI-GPR | Keyword GPR |
| --- | ---: | ---: |
| Share flagged | 13.7 | 3.3 |
| False-discovery rate among flagged articles | 13.2 | 18.1 |
| Miss rate among human-positive articles | 23.8 | 82.5 |

The unweighted retrieved-strata false-discovery rates are 13.2% and 16.3%; these should not be confused with the corpus-weighted comparison. Re-scoring 10,000 excluded articles yields 0.6% model-positive cases, all below the scale midpoint. The human check of 400 excluded articles finds positive content in two articles for one coder and twelve for the other.

On 2,050 articles, baseline score correlations are 0.87 with each of GPT-4o, GPT-5-mini, and GPT-5, and 0.91 with Llama 3.1 8B Instruct (Table A.1). Repeated calls, temperature changes, and full-text scoring are reported to make little difference. Date-anchored prompting around four historical crises barely changes the series, but cannot remove future knowledge from model parameters.

The baseline correlates 0.97 with an index counting all positive scores equally, so graded intensity is not the main driver of time-series movements. Correlations fall to 0.70 when all retrieved articles count equally and 0.48 for an unnormalized sum of the top 30 scores (Table A.2). Normalization and content selection therefore matter. Table 1 reports correlation 0.69 with the keyword index and lower standard deviation, 48.52 versus 60.55.

### Economic Applications

- **Stock returns, 1960-March 2026.** Weekly excess returns regress on standardized changes in risk. A one-standard-deviation increase is associated with a 0.136 percentage-point decline (SE 0.057; 3,452 weeks), versus 0.097 (SE 0.053) for the keyword index. An AR(4) decomposition separates predictable changes from residuals: persistent threats have coefficient -0.220 (SE 0.103), and surprise acts -0.090 (SE 0.042). Persistent acts and surprise threats are not statistically significant. The regressions explain little weekly return variation ($R^2=0.004$).
- **Oil proxy VAR.** Section 6.2 and Appendix A.9 describe six monthly variables, 12 lags, and January 1985-May 2026 estimation. The instrument sums WTI price changes around dates flagged by elevated Oil GPR threats, shifted back one day to align news and market timing. The reported first-stage F-statistic is 45. A shock normalized to raise oil prices by 33 log points produces a consumer-price peak about 1% above baseline and GDP about 1.5% below baseline after a year; displayed intervals are 80% bootstrap bands.
- **Bilateral trade, 1962-2020.** Local projections use CEPII two-way real merchandise trade, risk standardized within pair, pair fixed effects, origin-year and destination-year effects, three lags of trade and risk, and a regional trade agreement indicator. Standard errors cluster by origin, destination, and year. Risk largely unwinds within a year, while trade reaches a trough roughly 3.5% below baseline after two years before recovering (Figure 9, 90% intervals).

## Limitations

- Three English-language U.S. newspapers measure a particular news perspective. Country roles describe attributed actions, and coverage intensity is not a source-independent measure of events or objective risk.
- The audit identifies over-scoring of some economic disputes and domestic unrest, temporal-attribution errors, scoring of background conflicts, and compression at the top of the scale. Human labels also disagree; pooled agreement does not establish calibration across every period or country.
- Initial keyword retrieval and 2,000-character truncation remain selection decisions. Oil measures add a score threshold and another keyword filter. Validation of the headline score does not automatically establish the accuracy of each downstream label.
- Prompt stability and cross-model correlations support robustness but do not guarantee reproducibility after API changes or rule out hindsight contamination. Open-weight agreement is demonstrated on a sample, not a full reconstruction.
- Stock and trade results are observational relationships conditional on their specifications. The oil interpretation depends on proxy-VAR identification assumptions; a strong first stage alone does not establish instrument validity.
- The supplied manuscript has inconsistent sample descriptions: Section 2.1 says the oil VAR ends in 2024, whereas Section 6.2 and Appendix A.9 say May 2026. Some figures extend beyond the stated March 2026 endpoint. The oil prompt also lists natural disasters despite the intended geopolitical scope. These discrepancies are retained as unresolved source issues.
- No DOI or arXiv identifier for this manuscript is supplied in the parsed text.

## Related Concepts

- [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]

## Related Papers

- Caldara and Iacoviello (2022), "Measuring Geopolitical Risk," American Economic Review 112(4), 1194-1225: source of the construct and keyword baseline, reconstructed here on the same newspapers.
- Carlson and Dell (2025), "A Unifying Framework for Robust and Efficient Inference with Unstructured Data," arXiv:2505.00282: cited complementary approach to correcting classifier-based measures with human validation data.
- Verduzco-Bustos and Zanetti (2026), "The Effects of Geopolitical Oil Price Shocks": cited basis for the news-conditioned oil-price instrument.
- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: related library work on score heaping, calibration, and imperfect human benchmarks; not cited in this manuscript.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: related library work distinguishing useful text-based estimates from valid uncertainty; not cited in this manuscript.

[[index|Library home]]
