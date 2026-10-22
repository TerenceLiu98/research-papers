---
title: "Diversity, Efficiency, and Incentives in Political Prediction Markets"
type: paper
authors:
  - Harry Crane
  - Koleman Strumpf
year: 2026
venue: "Working paper"
source_job_id: fa21c5bf-f3ea-47f6-aa40-228c480cadc2
tags:
  - prediction-markets
  - election-forecasting
  - market-efficiency
  - political-behavior
---

## TL;DR

Using anonymized Kalshi trades from the final month of the 2024 U.S. election, PredictIt user data from 2016, and named New York election bettors from 1900, the paper finds that traders were demographically unrepresentative but that demographic and geographic political differences did not meaningfully characterize the high-volume trading that carried prices. Kalshi outperformed the examined poll-based forecasts in the national, battleground-state, and Senate comparisons, though not in thin House markets. The evidence supports the [[concepts/marginal-trader-hypothesis|marginal-trader hypothesis]]: price-setting volume came mainly from active, often two-sided traders whose positions were largely unrelated to inferred partisanship.

## Research Question

Do political prediction markets require traders who resemble the electorate to produce accurate, politically unbiased prices, or can financial incentives prevent an unrepresentative trader pool's preferences from reaching market prices?

## Motivation

Criticism of 2024 election markets often inferred biased prices from a young, male, or politically selected user base. That inference treats a market price as though it were an average response from a representative survey. The paper instead asks how traders' identities relate to their positions and how strongly each trader's dollars affect price formation in [[concepts/prediction-markets|prediction markets]].

## Contributions

- Provides a large-scale trader-level test of whether demographic and partisan selection biases election-market prices.
- Separates trader representativeness from financially weighted behavior: selection can distort prices only when traders' beliefs or positions depend on type at the margin carrying volume.
- Compares Kalshi prices with market-based and poll-based forecasts across presidential, state, Senate, governor, and House contests.
- Tests the mechanism across trade-intensity cohorts and with trade direction, profitability, and a price-based calibration score.
- Adds two contrasting settings: PredictIt under an $850 per-contract cap in 2016 and demographically selected New York election bettors in 1900.

## Method

**Kalshi data.** The main sample contains anonymized user- and trade-level activity from 4 October through 5 November 2024, Kalshi's first month of election trading. The analysis compares trader demographics and home geography with the electorate, classifies buy-side positions as Republican- or Democratic-aligned, and divides users into cohorts by trade count. Home-zip 2024 Republican vote share supplies a fractional partisan attribution rather than an individual party label. Sex is imputed, while age and location come from platform records.

**Forecast evaluation.** Daily election probabilities from Kalshi, Polymarket, PredictIt, Betfair, UK bookmakers, Silver Bulletin, FiveThirtyEight, and *The Economist* are compared over common availability windows. Metrics include Brier score and the return to mechanically trading a forecast against Kalshi prices.

**Behavioral tests.** The paper asks whether the relationship between inferred politics and position direction persists among the traders whose dollars move prices. It estimates cohort-specific partisan gaps, dollar-weighted regressions, profitability, and a calibration statistic comparing each cohort's realized winning positions with the probabilities implied by purchase prices.

**Aggregation framework.** Under a linear-demand benchmark, price is a financially weighted average of subjective probabilities. Price error is therefore the financially weighted belief error, not a function of demographic representativeness by itself. In an own-type projection model, distortion is approximately the product of the financially weighted selection gap and the extent to which beliefs depend on trader type.

## Experiments

| Evidence | Reported result | Interpretation |
| --- | --- | --- |
| Trader composition | Kalshi election traders were 86% male and about half were under 30; volume came from areas that voted 28% Republican | Traders were not representative, and geographic selection pointed toward Harris rather than Trump |
| Forecast accuracy | In common-window national comparisons, four uncapped market forecasts had Brier scores of 0.166-0.185, versus 0.241-0.252 for three poll-based models; Kalshi also led the examined poll models in seven battleground states and nineteen Senate races | Nonrepresentativeness did not imply inferior accuracy in these contests |
| Negative case | In 24 House contracts opened six days before Election Day with under $250,000 total volume, FiveThirtyEight scored 0.192 versus Kalshi's 0.241 | The market advantage did not extend to the thin House sample |
| Activity concentration | Traders with more than 5,000 trades were 0.2% of users but 78.7% of volume; traders with more than 100 trades accounted for 93% | A small active group dominated the price-relevant margin |
| Direction by cohort | One-trade users put 72.6% of main-contract volume long Harris; the most active cohort put 63.5% long Trump | Trade direction changes sharply with activity rather than tracking a fixed demographic composition |
| Partisan attribution | The dollar-weighted Republican-minus-Democratic direction gap fell from about 7 percentage points among casual cohorts to -0.2 points among traders with more than 100 trades | Inferred partisanship was unrelated to direction where volume concentrated |
| Calibration | One-trade users paid prices implying a 43.8% win rate and realized 27.5% ($z=-50.6$); traders with more than 5,000 trades differed by one point, 51.8% versus 50.8% ($z=-2.7$) | The heaviest cohort paid approximately fair prices in this outcome-based check |
| PredictIt replication | Registered Democrats placed 35.8% of shares long Trump and Republicans 57.6% | Preference alignment was larger in the capped market, consistent with weaker scope for profit-motivated capital to dominate |
| Historical comparison | All 80 matched New York bettors in 1900 were men, 44% were bankers or brokers, and median age was 41; historical markets nevertheless predicted nearly every presidential winner from 1884-1940 | Accurate markets have operated with differently selected trader populations |

## Limitations

- The Kalshi evidence covers one election and only its final month, when election forecasts are generally most accurate. Many contest outcomes share the same national shock, so the accuracy comparisons are not independent replications.
- Kalshi tracked other betting venues closely. The data show that Kalshi's participant composition did not noticeably distort its price, but cannot identify which venue originally discovered the price.
- Partisanship is inferred ecologically from home-zip voting rather than observed for Kalshi users, and sex is imputed. Homogeneous-zip checks and PredictIt's registration data reduce but do not eliminate this concern.
- Profit and realized calibration are evaluated after one known election. Directional traders can appear skilled or unskilled because their candidate won or lost; the paper notes that its calibration statistic treats positions as independent.
- Direction is constructed from classified buy-side flows, covering 92.6% of buy-side dollars. Two-sided positions may reflect liquidity provision or inventory rather than a directional belief.
- The historical evidence establishes demographic selection and long-run forecast accuracy, but lacks comparable trader-level behavior. The PredictIt comparison has only 962 presidential-market users, including 239 registered with a major party.
- The aggregation model is a transparent benchmark, not a universal equilibrium result; heterogeneous budgets and risk preferences can break the simple weighted-average interpretation of price.

## Related Concepts

- [[concepts/prediction-markets|Prediction Markets]]: event-contingent contracts whose prices are evaluated as forecasts.
- [[concepts/marginal-trader-hypothesis|Marginal-Trader Hypothesis]]: active, financially consequential traders can discipline prices even when the average participant is biased or unrepresentative.
- [[concepts/expressive-voting|Expressive Voting]]: a related account of actions chosen to express political identity rather than change an outcome or earn a return.

## Related Papers

- Forsythe, Nelson, Neumann, and Wright (1992), "Anatomy of an Experimental Political Stock Market," *American Economic Review* 82(5), 1142-1161: proposes the marginal-trader hypothesis for the Iowa Electronic Markets.
- Rhode and Strumpf (2004), "Historical Presidential Betting Markets," *Journal of Economic Perspectives* 18(2), 127-141: documents the accuracy and institutional history of early U.S. election betting markets.
- Rothschild and Sethi (2016), "Trading Strategies and Market Microstructure: Evidence from a Prediction Market," *Journal of Prediction Markets* 10(1), 1-29: studies trader behavior and market microstructure on Intrade.
- Wolfers and Zitzewitz (2004), "Prediction Markets," *Journal of Economic Perspectives* 18(2), 107-126: overview of prediction-market design and interpretation.

[[index|Library home]]
