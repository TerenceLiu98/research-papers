---
title: Measuring Geopolitical Risk
type: paper
authors:
  - Dario Caldara
  - Matteo Iacoviello
year: 2022
tags:
  - geopolitical-risk
  - text-as-data
  - economic-measurement
  - macroeconomics
---

## TL;DR

Caldara and Iacoviello construct newspaper-based geopolitical risk (GPR) indices spanning 1900 onward, separating threats from realized acts. Human audits support the indices’ measurement validity. Higher GPR predicts weaker investment and larger downside risks to economic activity; both threats and acts contribute to the estimated contractions.

## Research Question

Can newspaper coverage provide a consistent measure of geopolitical threats and events across time and countries, and what does that measure reveal about macroeconomic disasters and firm investment?

## Motivation

Conflict deaths, military spending news, financial volatility, and economic policy uncertainty capture different aspects of international crises. A timely measure must also capture unrealized threats and distinguish their effects from realized violence. This motivates [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]].

## Contributions

- Defines geopolitical risk to include threats, realization, and escalation of wars, terrorism, and tensions affecting peaceful international relations.
- Constructs daily and monthly headline indices, threats and acts subindices, and country-specific measures.
- Validates automated measurement against historical episodes, narrative front-page scores, and human article coding.
- Connects geopolitical risk to aggregate activity, disaster probabilities, growth tails, and heterogeneous firm investment.

## Method

**Text measurement (Sections I–II).** The corpus contains about 25 million articles. The recent series begins in 1985 and uses ten newspapers from the United States, United Kingdom, and Canada; the historical series begins in 1900 and uses three US newspapers. Eight dictionary categories combine topic terms with threat or act terms, usually within two words. Exclusion terms reduce false positives from entertainment, historical recollections, and other irrelevant contexts. Qualifying articles are divided by total published articles; the recent and historical indices are normalized to means of 100 over 1985–2019 and 1900–2019, respectively.

The first five categories define geopolitical threats, including military buildups; the remaining three capture war beginnings, escalation, and terrorist acts. Country indices require geopolitical terms plus a country name, capital, or major city. They therefore reflect US news coverage of risks involving that country, rather than local perceptions alone.

**Aggregate identification (Section III).** An eight-variable quarterly structural VAR with two lags uses 1986:I–2019:IV data. GPR is ordered first in a Cholesky decomposition, assuming that contemporaneous covariance with economic variables runs from GPR to those variables. A separate specification orders acts before threats and constructs counterfactual responses holding the other component constant.

**Historical and firm evidence (Sections IV–V).** Annual data for 26 countries over 1900–2019 support disaster-probability and growth-quantile regressions. Firm local projections interact aggregate GPR with industry exposure estimated from daily stock returns. Earnings-call risk mentions within ten words of geopolitical terms, normalized by transcript length, measure firm risk over 2005–2019. Firm and sector-by-quarter fixed effects isolate within-sector variation from aggregate and industry components.

## Experiments

| Evidence | Reported result |
| --- | --- |
| Narrative validation | Correlation of 0.86 with scores from about 44,000 New York Times front pages (Section II). |
| Human article audit | Annual correlation of 0.93 with a human index based on more than 7,000 articles. |
| Newspaper coverage | Historical and recent indices correlate at 0.95 over their overlap; US and non-US newspaper indices correlate at 0.88. |
| US VAR | A two-standard-deviation GPR shock produces an investment trough near −1.5% after about a year and a 0.6% decline in hours after a year (Figure 9). |
| Disaster probability | With country fixed effects and global GPR controls, a one-standard-deviation rise in country GPR is associated with about 9 percentage points higher disaster probability (Table 3). |
| Growth tails | Country GPR coefficients for next-year GDP growth are −0.35 for OLS, −1.44 at the tenth quantile, and 0.30 at the ninetieth quantile (Table 4; percentage-point units). |
| Industry heterogeneity | Following a two-standard-deviation aggregate shock, exposed firms’ investment decline is about 1 percentage point larger during the first year (Figure 11). |
| Firm-specific risk | A two-standard-deviation increase is associated with an investment decline exceeding 1% at its trough, remaining below baseline for up to a year. |

Both acts and threats generate contractionary responses in the VAR counterfactuals. The earnings-call aggregate correlates only 0.19 with newspaper GPR, providing modest rather than strong cross-source agreement.

## Limitations

News attention is a proxy for perceived risk, not a direct probability of conflict. Geographic perspective, editorial choices, and changing language remain relevant despite robustness checks. Slowly unfolding developments recognized only retrospectively may be missed.

Causal interpretation of the VAR depends on its contemporaneous ordering assumptions. The US sample largely contains events occurring abroad, limiting extrapolation to countries experiencing war on their own territory. Historical disaster regressions are associations: adding world-war indicators makes the global GPR coefficient statistically insignificant, while country-specific GPR remains significant. The OLS GDP-growth coefficient is imprecise relative to the stronger lower-tail result. Firm-level associations and stock-return-based industry exposure do not independently establish exogenous firm-level shocks.

## Related Concepts

- [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]]
- [[concepts/economic-policy-uncertainty-measurement|Economic Policy Uncertainty Measurement]]: a related news-based construct with distinct coverage and variation.

## Related Papers

- [[papers/the-ai-gpr-index-measuring-geopolitical-risk-using-artificial-intelligence|The AI-GPR Index: Measuring Geopolitical Risk using Artificial Intelligence]]: a later library paper extending this measurement framework with semantic scoring.
- Baker, Bloom, and Davis (2016), “Measuring Economic Policy Uncertainty”: dictionary-based measurement precedent cited by the paper.
- Hassan et al. (2019), “Firm-Level Political Risk: Measurement and Effects”: earnings-call measurement precedent.

Replication data cited in the supplied manuscript: DOI `10.3886/E154781V1` (dataset identifier, not the paper DOI).

[[index|Library home]]
