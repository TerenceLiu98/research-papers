---
title: Connected Social Media
type: paper
authors:
  - Zhiqian Jiang
  - Baixiao Liu
  - Yuchen Xu
  - Bohui Zhang
year: 2026
doi: 10.1017/S0022109026103317
journal: Journal of Financial and Quantitative Analysis
tags:
  - social-media
  - corporate-governance
  - media-bias
  - text-as-data
  - difference-in-differences
---

## TL;DR

Chinese listed firms receive more favorable coverage from WeChat outlets linked through investment, personnel, or common ownership. Across 286 negative traditional-news events involving 54 firms, connected outlets' relative tone increases by 0.013 after the event. Their coverage emphasizes longer-term development rather than the adverse news, consistent with [[concepts/optimism-shifting|Optimism Shifting]]. Connected coverage is also associated with higher short-horizon stock returns, but the observational evidence does not establish that firms direct each article or that coverage improves price efficiency.

## Research Question

Do firms use [[concepts/connected-social-media|Connected Social Media]] to counter negative traditional-media coverage, which topics do these outlets emphasize, and how do managerial incentives and market outcomes relate to this response?

## Motivation

Social media can operate as an independent information source or as a firm's official disclosure channel. This paper examines an intermediate arrangement: separately operated outlets with economic or personnel connections to the focal firm. Their apparent third-party status makes the relationship relevant to evaluating information credibility. China provides a setting with extensive WeChat use, a large retail-investor presence, and different institutional constraints on traditional and social media.

## Contributions

- Documents firm-outlet connections and their association with favorable reporting beyond firms' own official accounts.
- Compares connected and unconnected outlets around the same negative-news events, separating general tone differences from event-specific responses.
- Uses article-topic classifications to distinguish favorable treatment of the same news from shifts toward other, forward-looking themes.
- Examines stock-price and career incentives alongside market-return, insider-profit, and executive-turnover associations.

## Method

**Data and connections.** The sample spans January 2016 through July 2023. Datayes supplies financial articles from approximately 700 corporate-operated WeChat accounts, covering 5,274 listed firms before relevance filters. Individual, government, and listed firms' own official accounts are excluded. Qichacha records identify direct investment, shared key personnel, and shared investment in third-party entities. Connection indicators use prior-year status and remain active after an initial link, even if the observable relationship ends. Table 1's relevance-filtered sample contains 4,978 firms, of which 730 are ever connected.

**Text measurement.** Datayes identifies firm mentions with BERT-CRF, assigns relevance scores from 0 to 2, and estimates firm-specific sentiment with an attention-based CNN on a scale from -1 to 1. The analyses retain relevance scores 1 and 2 and weight sentiment by relevance. Qwen assigns the most relevant of nine topics to each article-firm pair for the mechanism analysis.

**Event design.** A negative event is a firm-date whose mean relevance-adjusted traditional-news tone is in that day's bottom decile. The baseline requires connected and unconnected coverage in both the pre-event [-10, -1] and post-event [0, +10] windows and excludes events within 15 days of a prior event for the firm. This yields 25,580 article-firm observations around 286 events for 54 firms. The difference-in-differences coefficient on connection status times the post-event indicator compares changes in tone across outlet types. Models include year-month, event, relative-event-date, and outlet fixed effects, with standard errors clustered by event.

**Identification.** Reported dynamic estimates show no significant pre-event differences and an immediate response on days 0 and 1. These diagnostics support the design but do not establish parallel counterfactual trends or eliminate endogenous connection formation and article selection. Broader firm-level outcome regressions are separate analyses, rather than estimates of mediation through the baseline news events.

## Experiments

The evidence consists of observational regressions and robustness analyses.

| Analysis | Reported result | Location |
| --- | --- | --- |
| General tone advantage | Connection coefficients 0.023 and 0.019, both SE 0.006, across 154,286 matched article-firm observations | Table 4 |
| Baseline negative-news response | Connection x post coefficient 0.013, SE 0.005; 23.6% of mean tone 0.055 | Table 5 |
| Relaxed event samples | Coefficients 0.016 and 0.014 for 639 and 1,401 events | Table 5 |
| Positive-news placebo | Coefficient 0.008, SE 0.007; not statistically significant | Table 5 |
| Daily abnormal return with connected coverage | +0.003, SE 0.001, with firm fixed effects; +0.002, SE 0.001, without a significance marker with event fixed effects | Table 6 |
| Two- and three-day cumulative returns | +0.005 and +0.006 with firm fixed effects; +0.004 for both with event fixed effects; all statistically significant | Table 6 |
| Topic agreement with event-date traditional news | Connected outlets are 11.7 percentage points less likely to match the dominant topic in the fixed-effects specification, SE 2.2 points | Table 7B |

**Mechanism.** In Table 7A, R&D, innovation, and human resources account for 32.47% of connected articles versus 5.40% of unconnected articles; strategy, cooperation, and CSR account for 13.93% versus 5.30%. Financial performance accounts for 3.51% versus 12.37%. These content differences support attention redirection, but do not directly measure readers' attention or beliefs. The topic-distribution table and topic-regression table report different sample sizes and should not be treated as interchangeable samples.

**Boundary conditions.** Under the baseline hard/soft-information classification, the tone-response coefficients are 0.011 and 0.015, respectively; the between-group permutation-test p-value is 0.334. Under the expanded definition of hard information, coefficients are 0.008 and 0.025, with p = 0.026. Thus significant soft-information estimates and insignificant hard-information estimates alone do not establish a subgroup difference under both definitions.

**Incentives and broader outcomes.** The tone response is larger before acquisitions announced within three months (0.059 versus 0.013; difference p = 0.013), where shareholder or management interests are tied to market performance, and among poorly performing firms. Career-concern contrasts for volatility (p = 0.106) and CEO tenure (p = 0.072) are weaker than for poor operating performance (p = 0.001). In separate broader samples, connections are associated with roughly 1.5 percentage points higher acquisition-announcement CAR, higher insider trading profits, and 4.5/5.3 percentage points lower CEO/chairman turnover over two/three years (Table 9).

**Robustness and negative findings.** The paper reports random-connection and shifted-date placebos, alternative event definitions and windows, stricter fixed effects, and controls for five direct corporate communication channels. It also reports no significant unconditional tone difference between connected WeChat articles and traditional news. Supplementary analyses described in the main text find no subsequent return reversal through the examined windows up to 30 days; this does not settle price efficiency. The supplementary tables themselves are not included in the supplied Markdown.

## Limitations

- Connections and publication decisions are endogenous. Fixed effects and event timing narrow competing explanations without directly identifying managerial instructions, payments, or editorial coordination.
- The baseline selects 54 firms with coverage on both sides of events. Larger robustness samples help assess filter sensitivity, but the setting remains Chinese listed firms and corporate financial WeChat accounts.
- Treating connections as permanent can misclassify relationships after personnel departures or ownership changes.
- Sentiment and topic labels depend on automated measurement. The supplied text does not provide a Qwen version, full prompts, or independent human-label validation for the topic classification.
- Positive market associations do not distinguish useful information from favorable persuasion. Absence of a short-run reversal does not prove improved informational efficiency.
- The parsed header truncates the DOI; the identifier above follows the complete DOI printed in the Supplementary Material section. Sample denominators and some typography vary across the parsed tables, so results are attributed to their specific analyses.

## Related Concepts

- [[concepts/connected-social-media|Connected Social Media]]: corporate ties to apparently third-party outlets.
- [[concepts/optimism-shifting|Optimism Shifting]]: redirecting coverage toward favorable future prospects.
- [[concepts/interactive-agenda-setting|Interactive Agenda Setting]]: a related attention-selection problem in conversational settings; this paper studies outlet content rather than turn-level influence.
- [[concepts/social-media-news-exposure|Social Media News Exposure]]: separates published content from what audiences actually encounter and consume.

## Related Papers

- Cassella, Dim, and Karimli (2023), "Optimism Shifting": the mechanism precedent cited by the authors; summarized here only through this paper's discussion.
- Ru, Xue, Zhang, and Zhou (2020), "Social Connections Between Media and Firm Executives and the Properties of Media Reporting": cited prior work on relationships and reporting.
- Hossain and Javakhadze (2020), "Corporate Media Connections and Merger Outcomes": cited precedent linking media connections to acquisition outcomes.
- [[papers/measuring-agenda-setting-in-interactive-political-communication|Measuring Agenda Setting in Interactive Political Communication]]: a complementary library entry on measuring topic shifts and influence in interactions, rather than corporate news production.

[[index|Library home]]
