---
title: Moral Foundation Measurements Fail to Converge on Multilingual Party Manifestos
type: paper
authors:
  - Marvin Stecker
  - Frederic R. Hopp
year: 2025
doi: 10.1017/pan.2025.10011
venue: Political Analysis
tags:
  - moral-psychology
  - computational-text-analysis
  - measurement-validity
  - multilingual-analysis
---

## TL;DR

Six approaches to measuring moral foundations disagree substantially on 810 party manifestos in four languages. Measurement choice can reverse estimated relationships between party ideology and moral rhetoric. Contextualized concept representations (CCR) show promising cross-language stability, but the comparison does not establish a universally accurate instrument.

## Research Question

Do moral-foundation instruments agree on the same English texts, remain consistent across original and translated texts, and support the same conclusions about ideology and moral rhetoric?

## Motivation

Tools grounded in the same theory can operationalize moral language through different vocabularies, reference materials, and training data. Their apparent interchangeability can conceal measurement choices that shape substantive political findings.

## Contributions

- Compares dictionary, embedding, and fine-tuned transformer approaches within a shared multilingual corpus.
- Distinguishes agreement between instruments, correlations among foundations within an instrument, and agreement across languages.
- Demonstrates sensitivity of ideological associations to measurement choice through a multiverse-style reanalysis of Bos and Minihold (2022).

## Method

The corpus comprises 961,455 sentences from 810 manifestos by 324 parties in 29 countries: 327 Spanish, 118 Dutch, 228 English, and 137 German manifestos. Sentences receive virtue and vice scores for five foundations, averaged to document scores. English originals or Manifesto Project translations support a common-language comparison.

| Instrument | Operationalization |
| --- | --- |
| MFD and MFD2 | Dictionary matches relative to sentence length |
| eMFD | Crowdsourced word-level foundation scores with virtue/vice separation |
| DDR | Similarity between averaged word embeddings and seed-word representations |
| CCR | Sentence-embedding similarity to MFQ agreement items for virtues and moral-violation vignettes for vices |
| MoralBERT | Ten independently fine-tuned classifiers for foundation–polarity categories |

CCR uses all-MiniLM-L6-v2 for English and paraphrase-multilingual-MiniLM-L12-v2 for original-language texts. The cross-language comparison focuses on MFD, DDR, and CCR. Kendall’s tau assesses agreement; it is not a direct measure of classification accuracy.

The substantive analysis matches 92 manifestos to CHES GAL–TAN placements within a two-year window. Regressions control for year and government participation, with country random effects where applicable. Compared with Bos and Minihold, this analysis uses continuous document-level scores and omits sentiment controls; it is an adapted reanalysis rather than an exact replication.

## Experiments

### Agreement within and between instruments

Between-instrument correlations are generally low, with MFD and its expanded successor MFD2 relatively aligned. Within DDR, correlations among foundations are mostly 0.6–0.9, raising concerns about distinguishing domains. CCR spans approximately 0.2–0.8; MoralBERT correlations vary in sign and magnitude. Raw mean scores differ substantially (DDR 0.43, CCR 0.06, MoralBERT 0.04), but different scoring scales prevent interpreting these as directly comparable prevalence estimates.

### Cross-language comparison

Section 4.2 reports CCR correlations mostly around 0.6, with virtues more stable than vices. It reports most DDR correlations above 0.6 and MFD correlations ranging from zero to above 0.5. The discussion instead describes DDR as having the lowest overall convergence, conflicting with this results narrative. The supplied text therefore supports caution about a definitive DDR-versus-MFD ranking. CCR also reportedly best matches Manifesto Project annotations of “Traditional Morality”; that category is not a complete gold standard for all five foundations.

### Ideological associations

In the 92-manifesto analysis, eMFD and DDR mostly yield no relationship with GAL–TAN positioning. Other instruments identify relationships for selected foundations, sometimes with opposing signs. For example, dictionary-based fairness associations are negative whereas CCR suggests a positive association. Original-language analyses also differ across linguistic contexts, where measurement differences and political-context differences cannot be separated cleanly.

## Limitations

- Results concern formal party manifestos and need not transfer to speeches, news, or social media.
- Translation quality, dictionary adaptation, and embedding domains may each contribute to disagreement. DDR uses only one embedding family.
- The authors do not comprehensively assess regression assumptions despite skewed scores and nesting of manifestos within parties.
- CCR virtue and vice scores use different reference instruments, so their contrasts also reflect reference-material choices.
- Instrument disagreement reveals sensitivity, not which instrument measures the true construct. The supplied text also contains an inconsistent significance inequality and the cross-language ranking discrepancy noted above; neither should be treated as a reliable quantitative rule.

## Related Concepts

- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: the shared theoretical framework does not guarantee equivalence among textual operationalizations.

## Related Papers

- [[papers/constructing-vec-tionaries-to-extract-message-features-from-texts-a-case-study-of-moral-content|Constructing Vec-tionaries to Extract Message Features from Texts: A Case Study of Moral Content]]: complementary work validating dictionary-informed embedding measures against human judgments in tweets; it is not benchmarked here.
- Bos and Minihold (2022), “The Ideological Predictors of Moral Appeals by European Political Elites”: the substantive design adapted for the ideology analysis.
- Atari, Omrani, and Dehghani (2023), “Contextualized Construct Representation”: supplies the psychometric-reference approach used for CCR.

Source: supplied parsed Markdown, Cognitio job `77e33c58-3cc0-4167-b09c-0c31dadf6d25`. [Published paper](https://doi.org/10.1017/pan.2025.10011). [Replication data](https://doi.org/10.7910/DVN/FZVF5X).
