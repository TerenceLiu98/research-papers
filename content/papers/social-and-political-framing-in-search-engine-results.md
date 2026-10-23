---
title: "Social and Political Framing in Search Engine Results"
type: paper
authors:
  - Amrit Poudel
  - Tim Weninger
year: null
tags:
  - search-engine-auditing
  - political-communication
  - news-framing
  - algorithmic-bias
---

## TL;DR

This paper audits Google News, Bing News, and DuckDuckGo News with neutral and politically cued versions of 57 contentious-topic queries. Platform and query wording are associated with differences in headline semantics, frame visibility, source selection, source ideology, and factuality. Google generally returns more centrist and higher-factuality sources, while Bing and DuckDuckGo have more similar source distributions. The study is a cross-sectional audit of U.S. English-language results collected during the 2024 election period, not evidence of effects on users.

## Research Question

How do news search engines and political cues in queries jointly shape the semantic content, narrative frames, source mix, ideological leaning, and factuality of returned news results?

## Motivation

Search rankings determine which sources and headlines users encounter first, while users commonly treat highly ranked results as credible. Because ranking systems are opaque and political queries may themselves alter retrieval, evaluating only a platform's nominal neutrality misses the interaction between query formulation and algorithmic curation. The paper treats news search engines as gatekeepers whose source and ranking choices can structure political information exposure.

## Contributions

- Compares three news-search platforms using matched neutral, Biden-cued, and Trump-cued variants of 57 political and social topics.
- Separates four dimensions of curation: headline semantic dissimilarity, generic news frames, source-distribution divergence, and source-level ideology and factuality.
- Uses mixed-effects models to account for repeated results within queries, alongside ANOVA, Tukey comparisons, and bootstrap analysis.
- Shows that platform differences and query cues can be audited as distinct, measurable components of political search results.

## Method

### Data collection

The authors derive 57 contentious topics from ProCon.org and construct three variants of each: neutral, appended with Biden, and appended with Trump. These variants represent cues about political figures rather than observed user ideology. SerpWow retrieves U.S., English-language results from Google News, Bing News, and DuckDuckGo News during one ten-hour window in fall 2024. Collection extends to five pages when available, while analysis focuses on the top 20 results. The resulting corpus contains 29,112 results: 12,048 from Google, 15,474 from DuckDuckGo, and 1,590 from Bing.

### Semantic and framing analysis

MPNetv2 encodes headlines into 128-dimensional vectors. The study samples 10,000 headline pairs, measures cosine distance, and fits linear mixed-effects models to compare semantic dissimilarity by platform and query condition.

GPT-4 assigns each headline one of six generic frames: conflict, game/strategy, thematic/issue, human interest, episodic, or economic consequences. Repeated headlines receive the same label in 1,334 of 1,423 cases (93.75%). Human-human agreement is modest ($\kappa=.23$); where human coders agree, GPT-4 reaches $\kappa=.69$ and macro-$F_1=.74$ against the majority label. A mixed-effects model predicts normalized result rank from frame, platform, and query condition.

### Sources, ideology, and factuality

The authors compare source-frequency distributions with [[concepts/rank-turbulence-divergence|Rank Turbulence Divergence]]. Media Bias/Fact Check labels supply a seven-point political-bias scale and an ordinal factuality scale; conspiracy, satire, and unknown sources are excluded. Two-way ANOVA and Tukey tests assess overall differences, while mixed-effects models include random intercepts for query and fixed effects for platform, query condition, and rank.

## Experiments

**Semantic content.** Politically cued queries produce more internally divergent headlines than neutral queries, particularly on Bing and DuckDuckGo. Google exhibits the most stable semantic dissimilarity across query conditions. The manuscript also describes neutral queries as providing “semantically diverse” bridging results in its discussion, which conflicts with the earlier report that neutral results are more semantically similar.

**Frames and ranking.** Thematic/issue frames dominate across platforms. Bing and DuckDuckGo return relatively more episodic, human-interest, and conflict framing than Google, while political cues increase conflict and game/strategy framing. In the rank model, thematic frames appear higher and episodic frames lower than conflict frames; query condition does not significantly predict rank.

**Source distributions.** Google differs substantially from Bing (RTD 0.5896) and DuckDuckGo (0.5781), whereas Bing and DuckDuckGo are closer (0.3141). Google more often surfaces sources including NPR, Pew Research, CNN, and The Guardian; Bing strongly favors MSN. Counts of unique sources do not significantly vary jointly by platform and query condition ($\chi^2(4,N=2{,}046)=1.39$, $p=.85$), despite the manuscript calling this test significant.

**Ideology and factuality.** Source bias varies by platform ($F(2,5143)=30.69$, $p<.001$) and query condition ($F(2,5143)=15.01$, $p<.001$), without a significant interaction. Google returns more centrist sources than Bing and DuckDuckGo. The manuscript reports a counterintuitive shift toward more left-leaning sources for right-cued queries, while also describing those results as more partisan. Factuality varies by platform ($F(2,5143)=9.05$, $p<.001$) and query condition ($F(2,5143)=5.89$, $p=.003$): Google is highest overall, and neutral queries outperform left-cued queries. Rank does not measurably predict either source bias or factuality.

## Limitations

- The single ten-hour snapshot was collected in late September 2024, close to the U.S. presidential election; it cannot establish longitudinal stability or generalize to quieter political periods.
- The audit covers U.S. English-language news verticals and 57 ProCon.org topics. It does not establish behavior in other countries, languages, issue sets, or general web search.
- Political-figure names operationalize query cues, not users' political identities or intentions.
- Headline-only analysis may miss frames and ideological nuance in article bodies, and publication dates were not constrained.
- MBFC outlet-level ratings are proxies for the ideology and factuality of individual results; excluding unrated categories changes the analyzed sample.
- Human agreement on frame labels is low, and GPT-4 agreement is evaluated only where human coders agree. The manuscript also inconsistently says the classifier uses five predefined frames while listing six.
- The observational audit does not measure attention, belief change, polarization, or any causal effect on users.
- Several narrative claims conflict with reported results, including descriptions of neutral-query semantic diversity, Google-versus-DuckDuckGo factuality variability, and the unique-source chi-square test.
- The supplied manuscript states no publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/search-engine-auditing|Search Engine Auditing]]
- [[concepts/rank-turbulence-divergence|Rank Turbulence Divergence]]
- [[concepts/issue-framing-effects|Issue Framing Effects]]

## Related Papers

- Kulshrestha et al. (2019), "Search Bias Quantification": develops methods for separating political bias attributable to users and ranking systems.
- Trielli and Diakopoulos (2022), "Algorithmic Agenda Setting": audits search media during the 2020 U.S. election.
- Urman, Makhortykh, and Ulloa (2022), "The Matter of Chance": compares election-related results across six search engines.
- [[papers/frameaxis-characterizing-microframe-bias-and-intensity-with-word-embedding|FrameAxis]]: measures semantic framing and intensity in political news headlines using embedding axes rather than predefined generic frames.

Source: supplied parsed manuscript, Cognitio job `62c6612a-b222-4811-991a-2f63144fc18c`.

[[index|Library home]]
