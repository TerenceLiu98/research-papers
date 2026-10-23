---
title: Economic Policy Uncertainty Measurement
type: concept
aliases:
  - EPU Measurement
  - News-Based Economic Policy Uncertainty Indices
tags:
  - economic-policy-uncertainty
  - text-as-data
  - economic-measurement
  - measurement-error
---

## Overview

Economic policy uncertainty measurement converts news coverage of economic policy and uncertainty into a time series. A measurement pipeline selects a corpus, maps articles to binary labels or graded scores, aggregates them by outlet and period, and normalizes the resulting series. The finished index therefore reflects both latent policy uncertainty and design choices in retrieval, classification, thresholding, aggregation, and media coverage.

## Key Ideas

- **Treat the classifier as part of the measure.** Dictionary rules, supervised classifiers, and language models implement different mappings from text to labels. Article-level errors propagate into the aggregate series and can become nonclassical, time-varying measurement error in downstream analysis.
- **Preserve the denominator and normalization.** An article count becomes an interpretable coverage share only relative to a stated corpus and period. Newspaper standardization and reference-window rescaling affect comparability without removing selection in outlets or articles.
- **Thresholds express an estimand trade-off.** Lower thresholds improve recall and increase the positive sample; higher thresholds favor precision and clearer peaks. A balanced rule such as Youden's index is another choice, not a neutral default.
- **Probabilities change aggregation.** Summing predicted probabilities retains classifier uncertainty and avoids a hard cutoff, but many small scores can accumulate in large corpora, dampen peaks, or make the series sensitive to changes in article volume.
- **Validate both levels.** Article-level F1, precision, recall, calibration, and agreement with human certainty do not fully validate the aggregate series. Index-level comparisons should also examine temporal holdouts, human-audit benchmarks, outlet composition, event interpretation, and sensitivity to aggregation rules.
- **Historical transfer is a measurement shift.** Contextual models can tolerate OCR corruption better than exact keyword matching, but historical vocabulary, newspaper composition, and digitization quality still change across time.
- **Cross-language transfer requires construct validation.** Similar predictions on translated text test mechanical multilingual robustness. They do not establish that policy uncertainty has identical operational meaning across countries or that an external outlet represents domestic perceptions.

## Important Papers

- [[papers/narratives-to-numbers-large-language-models-and-economic-policy-uncertainty|Narratives to Numbers: Large Language Models and Economic Policy Uncertainty]]: compares keyword, SVM, and fine-tuned language-model classifiers; studies threshold and aggregation choices; and presents historical and multilingual applications.
- Baker, Bloom, and Davis (2016), "Measuring Economic Policy Uncertainty": establishes the widely used dictionary-counting and newspaper-normalization design.
- Keith et al. (2020), "Uncertainty over Uncertainty": analyzes the assumptions, annotations, and text measurements underlying EPU indices.
- Carlson and Dell (2025), "A Unifying Framework for Robust and Efficient Inference with Unstructured Data": develops inference methods for estimators that consume predictions from unstructured data.

## Related Concepts

- [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]]
- [[concepts/text-scaling-models|Text Scaling Models]]
