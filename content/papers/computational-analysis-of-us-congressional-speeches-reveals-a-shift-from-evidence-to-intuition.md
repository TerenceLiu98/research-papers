---
title: Computational analysis of US congressional speeches reveals a shift from evidence to intuition
type: paper
authors:
  - Segun T. Aroyehun
  - Almog Simchon
  - Fabio Carrella
  - Jana Lasser
  - Stephan Lewandowsky
  - David Garcia
year: 2025
doi: 10.1038/s41562-025-02136-2
venue: Nature Human Behaviour
tags:
  - computational-text-analysis
  - political-communication
  - congressional-politics
---

## TL;DR

Across US congressional speeches from 1879–2022, evidence-oriented rhetoric declines after a mid-1970s peak in both major parties. A dictionary–embedding measure associates this shift with polarization, subsequent income inequality, and lower legislative productivity. These are observational relationships; the measure captures rhetorical orientation rather than whether assertions are true.

## Research Question

How has the balance between evidence-based and intuition-based language changed in Congress, and how does it relate to polarization, inequality, and legislative output?

## Motivation

Appeals to facts and external evidence and appeals to feelings, instincts, and personal experience offer different rhetorical grounds for truth claims. Measuring their historical balance can illuminate political discourse without conflating sincerity, factual accuracy, and reliance on evidence.

## Contributions

- Constructs and validates an evidence-minus-intuition (EMI) score using human-rated dictionaries and corpus-trained embeddings.
- Tracks rhetoric across parties and chambers over 1879–2022, with topic and temporal-embedding robustness checks.
- Relates session-level EMI to roll-call polarization, income concentration, and three measures of legislative productivity.

## Method

The Methods report 8,435,769 retained speeches, averaging approximately 199 tokens, after filtering procedural material, duplicates, noisy text, short speeches, and speakers outside the two major parties. Longer speeches are split into approximately 150-token chunks, with undersized final chunks merged into their predecessor.

Seed vocabularies are expanded using fastText and colexification networks, then screened through human judgments. The final dictionaries contain 49 evidence keywords and 35 intuition keywords. Using [[concepts/distributed-dictionary-representations|Distributed Dictionary Representations]], the authors average corpus-trained 300-dimensional Word2Vec vectors for each dictionary and for each text's content words. Each text receives two cosine similarities. These are centered within length bins and separately standardized before subtracting intuition from evidence. Session scores average EMI over two-year congressional periods.

Time-series regressions include lagged outcomes, relevant covariates, and selected EMI–polarization interactions, with heteroskedasticity- and autocorrelation-adjusted uncertainty. Polarization is the party difference in the first DW-NOMINATE dimension; the primary inequality measure is the top 1% pretax income share. Productivity models include policy mood, party control, and prior productivity.

## Experiments

### Measurement validation

A stratified set of 592 texts receives 4,563 ratings from 156 participants. Human evidence-minus-intuition judgments have intraclass correlation 0.714; EMI achieves overall classification AUC 0.79. Decade-level AUC ranges from 0.60 to 0.94, so validation strength varies historically. Topic macroaveraging and embeddings trained on balanced two-decade slices preserve the qualitative trend.

### Historical and institutional associations

- EMI peaks in 1975–1976 and subsequently declines: reported linear slope −0.032, P < 0.001, R² = 0.927. Both parties and chambers show the decline.
- EMI and polarization correlate negatively (r = −0.615). Main Results and Table 3 support a significant polarization coefficient in the EMI model and a nonsignificant EMI coefficient in the polarization model; inconsistent Methods prose prevents a clean directional interpretation.
- Previous-session EMI correlates with subsequent inequality at r = −0.948. The adjusted inequality model reports an EMI coefficient of −0.11, controlling for previous inequality, polarization, and their interaction.
- In productivity models, EMI is positively associated with the major legislation index (b = 0.67, 95% CI [0.14, 1.20]) and legislative productivity index (b = 0.83, 95% CI [0.40, 1.26]). Its coefficient for log law counts is not significant at 0.05 (P = 0.0988).
- Extending productivity models historically with patent counts as a proxy for policy mood retains a significant EMI association only for major legislation, not the combined index or law counts.

## Limitations

The study does not identify causal effects of rhetoric on inequality or legislative activity. Institutional procedures, party leadership, media incentives, and changes in executive power offer possible explanations not isolated by the design. DW-NOMINATE captures legislative ideological distance, not all forms of polarization. Static averaged embeddings and dictionary choices constrain interpretation; human validation is weaker in several early decades.

The supplied text has internal inconsistencies worth retaining for reuse: Methods prose reverses the polarization result supported by Main Results and Table 3, and model equations and table labels differ in lag notation. The inequality coefficient's confidence interval is [−0.20, −0.02] in Results but [−0.17, −0.05] in Table 4. Reporting-summary exclusion counts do not reconcile with the Methods corpus totals. These discrepancies are not resolved by the supplied Markdown. Productivity models also have relatively few session observations and mixed residual-stationarity diagnostics.

## Related Concepts

- [[concepts/distributed-dictionary-representations|Distributed Dictionary Representations]] — the reusable method for measuring semantic affinity to validated lexical constructs.

## Related Papers

- [[papers/constructing-vec-tionaries-to-extract-message-features-from-texts-a-case-study-of-moral-content|Constructing Vec-tionaries to Extract Message Features from Texts]] — a related dictionary–embedding approach that fits weighted semantic axes rather than averaging dictionary vectors.
- Lasser et al. (2023), “From alternative conceptions of honesty to alternative facts in communications by US politicians” — cited precursor distinguishing fact-speaking and belief-speaking in politicians' social-media communication.
- Garten et al. (2018), “Dictionaries and distributions” — cited source of distributed dictionary representation.

Source: supplied parsed Markdown, Cognitio job `92403340-541d-40f7-8e3f-47a977d19ac8`. [Published paper](https://doi.org/10.1038/s41562-025-02136-2). [Data archive](https://doi.org/10.17605/OSF.IO/Z6UTW). [Code archive](https://doi.org/10.5281/zenodo.14288137).
