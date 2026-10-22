---
title: "Temperature shocks and industry earnings news"
type: paper
authors:
  - Jawad M. Addoum
  - David T. Ng
  - Ariel Ortiz-Bobea
year: 2023
doi: "10.1016/j.jfineco.2023.07.002"
venue: Journal of Financial Economics
tags:
  - climate-finance
  - temperature-extremes
  - corporate-earnings
  - analyst-forecasts
  - market-efficiency
---

## TL;DR

Combining daily gridded U.S. temperatures with public firms' establishment locations, Addoum, Ng, and Ortiz-Bobea find that extreme temperatures predict quarterly earnings in 24 of 59 industries, with effects that vary in sign by industry and season. Revenue changes account for about three quarters of the significant earnings responses, and establishment-visit evidence supports a consumer-demand channel. Analysts usually incorporate the effects by the earnings-announcement date, but forecasts and stock prices do not react detectably around 8,584 observable intra-quarter temperature events.

## Research Question

How do extreme temperature exposures at firms' operating locations affect industry earnings, through which economic channels do those effects operate, and how quickly do analysts and investors incorporate this information?

## Motivation

Average effects can conceal economically important heterogeneity when temperature shocks benefit some sectors and harm others, or when the same temperature has different effects across seasons. Establishment-level weather is also observable before accounting results arrive, making it a potential source of timely cash-flow news and a test of how financial-market participants process climate-related information.

## Contributions

- Measures quarterly firm exposure by matching daily PRISM temperatures on 4-by-4-kilometer grids to NETS establishment locations and aggregating them with establishment sales weights.
- Estimates nonlinear temperature-earnings response functions separately across 59 six-digit GICS industries and four calendar quarters, revealing bidirectional and season-specific effects hidden by population averages.
- Separates revenue and operating-cost responses and supplements them with SafeGraph visit data, weekday-only exposure tests, and tradable versus non-tradable comparisons to distinguish consumer-demand and labor-productivity channels.
- Compares realized earnings, analyst forecasts, earnings surprises, and abnormal returns to study when observable temperature information reaches market expectations.

## Method

The main sample links PRISM daily minimum and maximum temperatures from 1981-2015 to establishments of publicly traded U.S. firms in NETS over 1990-2015. The authors approximate hourly exposure from daily temperatures, aggregate time in one-degree Celsius bins across establishments using sales weights, and align the resulting distributions with firms' fiscal quarters. Quarterly IBES earnings per share are scaled by beginning-of-quarter share price; Compustat supplies revenue, cost, and firm controls, while CRSP supplies returns.

For each industry and calendar quarter, earnings are regressed on a third-order Chebyshev representation of the temperature-exposure distribution, precipitation, lagged firm controls, firm fixed effects, and time fixed effects. The design uses within-firm deviations in realized weather and estimates predictive cash-flow relationships rather than a structural effect of long-run climate change. Critical cold and heat thresholds are derived from statistically significant marginal effects.

Mechanism tests decompose earnings into revenue, cost of goods sold, and SG&A. A separate 2018-2021 SafeGraph analysis covers 870,464 establishments in hotels, restaurants, arts, entertainment, and recreation. Poisson fixed-effects models test whether visits fall on spring days at or below the paper's 4 degrees Celsius threshold. Event studies then measure forecast changes and Carhart four-factor abnormal returns around firm-specific extreme-temperature days.

## Experiments

### Earnings Sensitivity

Earnings are sensitive to extreme temperatures in 24 of 59 industries. Hot summers are consistently adverse in construction and engineering, leisure products, gas utilities, and capital markets, while cold spring conditions reduce earnings in several travel- and consumer-facing industries. Warm autumn conditions increase earnings in airlines, metals and mining, and capital markets but reduce them in machinery. A doubling of exposure frequency in the extreme 5% tails implies an average absolute earnings change of 37.4 basis points: an average increase of 48 basis points among positive-response industries and a 28-basis-point decrease among negative-response industries.

Revenue responses drive about 75% of significant profitability effects. The study finds little support for crop yields as the primary channel among listed firms, some support for heat-related labor productivity, and its strongest evidence for weather-induced consumer demand. In the SafeGraph sample, daily visits fall by more than 5% on spring days below 4 degrees Celsius; the decline is generally larger on weekends. Non-tradable industries are more temperature-sensitive than tradable industries, especially for spring and autumn extremes.

### Robustness and Adaptation

Sensitivity declines significantly from 1990-2002 to 2003-2015 across both temperature tails and all seasons, which the authors interpret as evidence consistent with adaptation. Results are generally stronger under profitability measures that include extraordinary and special items. Placebo regressions using future weather produce significant industry-quarter effects in 2.1%-2.9% of cases, compared with about 7% using contemporaneous exposure. Employee-weighted and equally weighted establishment exposure, foreign-operation controls, weekday exposure, and additional hedging and adaptation tests provide complementary checks, though results differ across particular industries.

### Analyst and Investor Responses

By the earnings-announcement date, analysts anticipate at least part of the temperature-related earnings movement in most affected industries. Seven industries retain significant forecast surprises: leisure products, personal products, life science tools, construction and engineering, trading companies and distributors, commercial services and supplies, and machinery.

Around 8,584 intra-quarter temperature events, however, changes in consensus forecasts and cumulative abnormal returns are small and statistically insignificant over windows from one to twenty days on either side of the event. Splits by analyst proximity, prior shock experience, local climate beliefs, and political affiliation also show no significant forecast response. The contrast with quarter-end forecasts is consistent with analysts learning later through indirect information such as managerial guidance, but the paper does not directly identify that channel.

## Limitations

- Establishment exposure covers continental U.S. operations, so foreign production, sales, supply chains, and temperature exposure are measured only indirectly. Controls based on geographic segments do not reconstruct foreign weather.
- Sales-weighted establishment locations are proxies for the geographic distribution of economically relevant activity. Alternative employee and equal weights alter some industry-level findings.
- The flexible specifications estimate many industry-by-quarter relationships. The future-weather placebo reduces concern about random findings but does not eliminate multiple-testing or model-selection risk.
- The response functions identify short-run weather relationships over 1990-2015, not the full effects of persistent climate change. Adaptation, migration, general-equilibrium demand shifts, and changing industry composition can alter long-run impacts.
- Mechanism evidence is convergent rather than a formal decomposition. The SafeGraph test uses a later period, selected industries, and visits rather than purchases; weekday and tradability comparisons do not uniquely identify labor productivity or consumer demand.
- Event-study null results do not show that markets ignore all climate information. Events are defined using in-sample estimated thresholds, and economically relevant information may arrive gradually or through channels the design does not observe.
- The authors report that they do not have permission to share the underlying data, limiting independent replication.

## Related Concepts

- [[concepts/weather-exposure-and-corporate-performance|Weather Exposure and Corporate Performance]]
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: the design maps gridded weather to geographically dispersed establishments and relies on within-firm exposure variation.
- [[concepts/financial-market-stylized-facts|Financial Market Stylized Facts]]: the event-study component distinguishes cash-flow predictability from immediate return adjustment.

## Related Papers

- Addoum, Ng, and Ortiz-Bobea (2020), "Temperature shocks and establishment sales": finds negligible population-average effects on U.S. establishment sales and productivity, motivating this paper's industry and seasonal heterogeneity analysis.
- Graff-Zivin and Neidell (2014), "Temperature and the allocation of time: implications for climate change": supplies the heat-sensitive industry classification used to probe labor-productivity mechanisms.
- Hong, Li, and Xu (2019), "Climate risks and market efficiency": provides related evidence that drought risk is not efficiently incorporated into food-stock prices.
- Pankratz, Bauer, and Derwall (2023), "Climate change, firm performance, and investor surprises": studies average extreme-heat effects among single-establishment firms outside the United States.

[[index|Library home]]
