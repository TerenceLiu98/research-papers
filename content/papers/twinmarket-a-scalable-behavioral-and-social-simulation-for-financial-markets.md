---
title: "TwinMarket: A Scalable Behavioral and Social Simulation for Financial Markets"
type: paper
authors:
  - Yuzhe Yang
  - Yifei Zhang
  - Minghao Wu
  - Kaidi Zhang
  - Yunmiao Zhang
  - Honghai Yu
  - Yan Hu
  - Benyou Wang
year: null
tags:
  - llm-agents
  - agent-based-models
  - financial-markets
  - social-simulation
  - simulation-validity
---

## TL;DR

TwinMarket couples heterogeneous LLM investors, a [[concepts/belief-desire-intention-architecture|Belief-Desire-Intention architecture]], a changing social network, and an order-driven market. In a China A-share simulation, it reports closer agreement with several historical market statistics than two rule-based baselines, deterioration when cognitive or social components are removed, and rumor-induced selling cascades. A 1,000-agent demonstration extends the main 100-agent experiments. The results support a configurable simulation of market feedback, with limited evidence for prospective prediction, human behavioral fidelity, or general scaling laws.

## Research Question

Can empirically initialized LLM investors, interacting through trading and social media, generate realistic individual behavior and aggregate market patterns, and how do their beliefs and information exposure shape collective outcomes?

## Motivation

Financial markets offer observable transactions and aggregate price dynamics for studying how individual decisions accumulate into collective behavior. The paper seeks to combine the contextual reasoning of LLM agents with explicit market execution and social influence. This is a form of [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]] in which language-based decisions affect prices, portfolios, social exposure, and subsequent beliefs.

## Contributions

- A BDI-driven daily cycle connecting perception, active information retrieval, trading, social actions, and belief revision.
- Investor initialization from transaction-derived biases, demographics, trading styles, and historical market information.
- A social graph based on evolving trading similarity, with engagement- and recency-based post recommendations.
- Micro- and macro-level validation, component ablations, rumor interventions, repeated runs with two LLM backbones, and population/participation scaling demonstrations.

## Method

### Investors and Data

The source uses 639 Xueqiu users and 11,965 transactions to initialize personas and behavioral biases; 83,246 Guba transactions inform stock recommendations. CSMAR supplies stock data, while Sina, 10jqka, and CNINFO supply news and company announcements. Table 18 reports approximately 1.044 million news articles and 5,600 announcements. The market centers on the SSE 50 and ten aggregated industry indices (Section 3; Appendices C-D).

Prompts encode disposition effects, lottery preference, underdiversification, and turnover. GPT-4o ranks agents by a constructed notion of rationality: the top 40% receive fundamental-analysis strategies and the remaining 60% technical-analysis strategies. The top 10% receive ten times the capital of other agents. These are initialization choices, so subsequent inequality develops from an already unequal capital distribution.

Synthetic trading histories seed portfolios and social connections. Initial beliefs use the BRAR sentiment index as an anchor, sampled dimension scores, and LLM-generated narratives. Beliefs cover economic fundamentals, valuation, short-term trends, surrounding sentiment, and self-assessed investment ability.

### Daily Cognitive and Market Cycle

Each agent observes news, posts, market data, and its history; forms goals and retrieval queries; commits to trading and social actions subject to constraints; and revises its beliefs after environmental feedback. The paper formalizes this as belief formation, desire generation, intention planning, execution, environment response, and belief update (Appendix E.2).

The environment performs a single daily call auction using price/time priority and a maximum-executable-volume clearing rule, with a daily price limit of plus or minus 10%. Executed trades update cash and holdings. After initialization, simulated trading supplies technical indicators; valuation ratios combine simulated prices with fixed initial fundamental quantities, such as earnings or book value per share (Appendices C.1.2 and E.5).

### Social Exposure and Feedback

Industry-specific trading intensity weights past transactions by exponential time decay. Weighted Jaccard similarity determines social connections; sufficiently similar neighbors supply candidate posts. A hot score combines net votes and post age, and each agent receives the top-ranked posts. Appendix B.1 selects a similarity threshold of 0.2 and a decay factor of 0.5 after graph sensitivity analysis.

This design creates feedback between trading similarity, information exposure, and later trades. It models a hypothesized social mechanism rather than reproducing a measured platform recommendation algorithm. Rumor experiments replace selected news with exaggerated negative headlines delivered to high-centrality users and follow their effects through the simulated network (Section 5.2; Appendix E.4).

## Experiments

### Main Validation

Section 4 describes 100 GPT-4o agents over five months beginning June 15, 2023. Other experiments use shorter windows, as specified below. The micro-level evidence includes increasing wealth inequality and a negative association between turnover and returns: the top 10% ranked by return average 4.02% turnover and 6.65% return, whereas the bottom 50% average 7.03% turnover and -10.52% return (Table 3).

Table 4 compares four [[concepts/financial-market-stylized-facts|Financial Market Stylized Facts]]:

| System | Return kurtosis | Negative-return autocorrelation | Volume-return significance | GARCH alpha + beta |
| --- | ---: | ---: | --- | ---: |
| Real data | 7.26 | 0.14 | p < 0.01 | 0.95 |
| TwinMarket | 5.24 | 0.11 | p < 0.01 | 0.89 |
| ABM-HPM | 4.47 | 0.05 | p < 0.01 | 0.82 |
| ABM-BH | 4.99 | 0.19 | p < 0.01 | 0.72 |

TwinMarket is closer to the real-data values on the three numerically differentiated columns. All systems satisfy the same reported volume-return significance threshold, so that column does not establish relative superiority. The source calls negative-return autocorrelation a leverage-effect measure; it is not a direct estimate of the return-to-future-volatility relationship.

### Ablations

Table 5 reports daily normalized index-price errors and correlations:

| Variant | RMSE | MAE | Correlation | Kurtosis |
| --- | ---: | ---: | ---: | ---: |
| Full TwinMarket | 0.02 | 0.02 | 0.77 | 5.24 |
| Without BDI | 0.07 | 0.05 | 0.34 | 4.25 |
| Without heterogeneity | 0.09 | 0.08 | -0.61 | 3.58 |

Removing either component worsens trajectory fit and reduces return kurtosis. However, the source's blanket statement that all realism measures deteriorate is too broad: without heterogeneity, its leverage proxy is 0.13 and GARCH persistence is 0.90, both closer to the Table 4 real-data values than the full model's 0.11 and 0.89.

The social-interaction ablation runs from June 15 to August 15, 2023, with 100 agents. Removing the social platform increases RMSE from 0.02 to 0.18 and changes correlation from 0.77 to -0.50 (Table 8). In a separate June 15-July 15 experiment, full BDI achieves RMSE/MAE of 0.0158/0.0143; freezing beliefs yields 0.0342/0.0298, and removing active information seeking yields 0.0532/0.0443 (Table 9).

Temperature tests from 0.3 to 1.3 leave buy/sell counts broadly stable while reported average volume generally increases. Selected industry results differ: consumer-goods kurtosis is 3.06 and technology/telecommunications kurtosis is 6.53 (Tables 6-7). These are within-simulation comparisons, not separate validations against each industry's observed distribution.

### Emergence, Repeated Runs, and Scale

- **Belief-price feedback:** Figure 10 shows co-moving belief scores and prices in a simulated boom-bust pattern. This supports feedback within the model but does not independently identify a human causal mechanism.
- **Rumors:** Negative rumor exposure lowers beliefs and prices, and the sell/buy ratio rises from 0.495 to 0.997. High-centrality users receive more engagement, and trading-similarity clusters intensify under rumor exposure (Figures 11-13).
- **Repeated runs:** Appendix B.3 runs GPT-4o and Gemini-1.5-Flash three times each over June 15-August 15. Mean RMSE is 0.023 and 0.024, respectively, with relative standard deviations of 31.13% and 16.34%. GPT-4o kurtosis averages 4.433 with 20.85% relative standard deviation; its GARCH alpha has 63.17% relative standard deviation. These percentages are relative standard deviations, not confidence intervals or absolute error bars (Table 10).
- **Scaling:** Section 7 varies daily activation among 10%, 20%, 40%, and 80% of agents and reports decreasing RMSE/MAE with increasing participation. Figure 15 shows a 1,000-agent simulation. The supplied prose gives no fitted scaling exponent, numerical curve values, or matched runtime/cost benchmark.

## Limitations

- **Scope and mechanics:** The study targets China's A-share market with simplified daily clearing and a stated zero-sum environment. Continuous trading, other market institutions, and transfer to other populations remain future work. The abstract's reference to recessions is not backed by a separately evaluated macroeconomic recession model.
- **Behavioral validation:** Biases, strategy shares, capital inequality, and trading-based homophily are built into initialization or interaction rules. Plausible logs, aggregate statistics, and emerging clusters do not establish that individual decisions or influence mechanisms match real investors. The comparison of bias summaries in Tables 19-20 is not an equivalence test of population representativeness.
- **Temporal leakage and prediction:** Appendix E.6 describes relative dates and neutral entity identifiers as safeguards. Removing social interaction does not isolate or rule out historical knowledge leakage. The supplied qualitative examples retain real company names; Xueqiu and Guba source periods extend beyond the simulation start; and initial sentiment variance uses a 20-trading-day window centered on that start. The text does not establish a fully chronological held-out forecasting protocol or explain how all potentially future information is excluded.
- **Measurement and uncertainty:** Three runs per backbone reveal substantial parameter variation. A shared significance threshold does not measure relative correlation strength, and negative-return autocorrelation is an incomplete leverage-effect proxy. In Table 7, technology-sector GARCH alpha plus beta equals 1.05, which does not meet the usual finite-variance stationarity condition.
- **Reporting consistency:** Appendix D.3 initializes belief scores on a 0-10 scale, while Appendix E.1 describes scores from 1 to 5; the conversion is unspecified. Different experimental windows and repeated-run aggregates should not be pooled with the headline single-run results.
- **Metadata and source coverage:** The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for TwinMarket; these remain unspecified. It lists `https://freedomintelligence.github.io/TwinMarket` as the project resource. Many prompt examples occur only as image references, so their full contents are not recoverable from the supplied Markdown text.

## Related Concepts

- [[concepts/belief-desire-intention-architecture|Belief-Desire-Intention Architecture]]: separates beliefs, goals, and committed actions in the agent loop.
- [[concepts/financial-market-stylized-facts|Financial Market Stylized Facts]]: statistical targets for validating aggregate market behavior.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: language-based decisions operate within explicit social and market rules.
- [[concepts/economic-world-models|Economic World Models]]: trades generate prices and portfolios that feed back into later decisions.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes aggregate resemblance from validated behavioral distributions and intervention effects.

## Related Papers

- Rao and Georgeff et al. (1995), "BDI agents: From theory to practice": the cited cognitive-architecture foundation (reference 20).
- Li et al. (2024), "EconAgent: Large Language Model-Empowered Agents for Simulating Macroeconomic Activities": cited background on LLM economic agents (reference 23).
- Gao et al. (2024), "Simulating Financial Market via Large Language Model Based Agents": a cited financial-market simulator discussed as ASFM (reference 24).
- Cont (2001), "Empirical properties of asset returns: Stylized facts and statistical issues": the cited market-validation framework (reference 37).
- [[papers/from-economic-agents-to-agentic-economies-a-systems-blueprint-for-economic-world-models|From Economic Agents to Agentic Economies: A Systems Blueprint for Economic World Models]]: a library comparison on endogenous economic feedback and empirical alignment, not a citation in TwinMarket.
- [[papers/public-opinion-dissemination-simulation-based-on-large-language-model-multi-agent-systems|Public opinion dissemination simulation based on large language model multi-agent systems]]: a library comparison using explicit interaction rules with LLM-generated social behavior, not a citation in TwinMarket.

[[index|Library home]]
