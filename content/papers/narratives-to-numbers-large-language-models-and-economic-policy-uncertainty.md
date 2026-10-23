---
title: "Narratives to Numbers: Large Language Models and Economic Policy Uncertainty"
type: paper
authors:
  - Ethan Hartley
year: null
source_job_id: "e8b35863-f7b5-4b03-a91e-241073c5196b"
tags:
  - text-as-data
  - economic-policy-uncertainty
  - large-language-models
  - measurement-error
  - multilingual-nlp
---

## TL;DR

Fine-tuned Longformer and Llama 3.1 classifiers identify economic policy uncertainty in news more accurately than the canonical bag-of-words rule and produce monthly indices that align more closely with human audit labels. The strongest full-text model raises F1 by 46% relative to the keyword baseline and recall from 45% to 82%. The paper also shows that decision thresholds and probability aggregation materially change the resulting series, then applies the classifiers to more than 360 million historical U.S. newspaper articles and exploratory multilingual corpora.

## Research Question

How does replacing keyword rules with supervised language-model classifiers change article-level identification and aggregate [[concepts/economic-policy-uncertainty-measurement|Economic Policy Uncertainty Measurement]], and how well do learned classifiers transfer to noisy historical text and multilingual news?

## Motivation

Economic policy uncertainty is latent, so news-based indices depend on a model that maps text into article labels and then aggregates those labels over outlets and time. The standard Baker, Bloom, and Davis approach uses a fixed dictionary, making the resulting index sensitive to exact vocabulary, OCR errors, language, classifier thresholds, and aggregation rules. Classification errors can become nonclassical, time-varying measurement error in downstream regressions, yet applied work often treats the finished index as directly observed.

## Contributions

- Benchmarks bag-of-words rules, support vector machines, BERT, Longformer, and Llama 3.1 against the original human-audited EPU corpus.
- Treats the text classifier, decision threshold, and aggregation rule as explicit components of the measurement process rather than hidden preprocessing choices.
- Compares binary threshold rules with probability aggregation and documents how precision-recall choices alter index baselines, peaks, and usable sample size.
- Applies a fine-tuned Longformer to more than 360 million OCR-derived U.S. newspaper articles from 1800-1964, extending news-based EPU measurement into the nineteenth century.
- Tests an English-trained multilingual Llama classifier on translations into 29 languages and constructs provisional Africa-wide and Bangladesh indices.

## Method

The main audit corpus contains 10,393 deduplicated articles with full text and human EPU labels. The random split assigns 7,275 articles to training, 2,078 to validation, and 1,040 to testing; a temporal robustness split holds out 818 articles from 2006-2012. A 4,596-article subset supplies multilabel policy categories, and 730 held-out articles include auditor certainty ratings.

The paper fine-tunes BERT, Longformer, and Llama 3.1 (8B) classification models with input lengths from headlines to 2,048 tokens, selecting configurations by validation loss. It compares them with the canonical keyword rule and grid-searched SVMs using accuracy, precision, recall, and F1. Model probabilities become binary labels through validation-selected Youden, high-recall, high-precision, or F1-maximizing thresholds. A probabilistic alternative aggregates article probabilities directly. Newspaper-level article shares are standardized, averaged, and rescaled following the canonical EPU pipeline.

## Experiments

### Article-Level Classification

LLMs trained on headlines alone perform similarly to the full-text keyword rule. Models using the first 128 tokens exceed the keyword baseline and match full-article SVMs. At 2,048 tokens, the best model improves F1 by 46% relative to bag-of-words and raises recall from 45% to 82%. Longformer also improves F1 by 29-106% across the four sufficiently represented policy categories: monetary, fiscal and government spending, tax, and trade policy.

The Longformer probabilities become more decisive as human auditor certainty rises. Its error rate falls from about 37% on uncertain articles to 18% on articles auditors regard as certain, while the bag-of-words error rate remains near 40% across certainty levels. Performance also converges across short and long articles as the permitted context length increases.

### Index Construction

Under a temporal split, the bag-of-words index correlates 0.47 with the human audit series in sample and 0.24 out of sample. The corresponding average correlations for LLM indices are 0.78 and 0.76. Within the audit sample, direct probability aggregation reaches a correlation of 0.81, but the paper cautions that small background probabilities can accumulate across large corpora, dilute peaks, or create volume-driven spikes.

Thresholds encode substantive trade-offs. A high-recall rule expands coverage while admitting more false positives; a high-precision rule produces a smaller set of clearer positives; Youden's rule balances sensitivity and specificity. The historical application demonstrates that these choices materially change index amplitude and baseline, especially at scale.

### Historical and Multilingual Applications

The historical application classifies more than 360 million American Stories articles from 1800-1964. The precision-threshold series extends the U.S. index into the nineteenth century and correlates 0.33 with the original index over 1900-1964. Event annotations remain ex post interpretations; a separate zero-shot Llama topic-classification exercise supports four illustrative episode assignments but does not validate every spike.

For multilingual transfer, the English-trained Llama classifier is tested on translated audit articles in 29 languages with language-specific thresholds. Every reported language exceeds the English keyword baseline, with relative F1 gains of 21-46%, although performance is lower for less represented languages such as Tigrinya and Khmer. The paper then constructs exploratory indices from 132,869 Voice of America articles in five African languages and more than two million Bangla articles from nine Bangladesh outlets. The Africa series uses a recall-oriented threshold because the precision rule returns only 21 positives; the Bangladesh series uses a precision-oriented threshold because its corpus is much larger.

## Limitations

- The evidence is anchored in one U.S. audit corpus, a limited architecture set, and labels whose construction helped determine the keyword baseline; results may not generalize to other constructs or domains.
- The paper does not re-estimate downstream macroeconomic models, so better classification and audit alignment do not establish how substantive estimates change.
- Probabilistic aggregation is not automatically superior: small nonzero scores can accumulate in very large corpora and respond to changing media volume.
- Historical newspaper text contains OCR errors, outlet composition changes, and uneven coverage. Matching index spikes to known events is partly ad hoc, and the historical series correlates only 0.33 with the original index during their overlap.
- Translated audit tests evaluate mechanical cross-language transfer, not whether an English-trained U.S. construct has equivalent meaning across countries. Native-speaker labels are unavailable.
- The Africa series reflects uneven Voice of America coverage and an external U.S. editorial perspective. Both cross-country indices are presented as exploratory rather than validated national measures.
- The supplied manuscript does not state a publication year, DOI, or arXiv identifier, so those metadata are not inferred.

## Related Concepts

- [[concepts/economic-policy-uncertainty-measurement|Economic Policy Uncertainty Measurement]]
- [[concepts/news-based-geopolitical-risk-measurement|News-Based Geopolitical Risk Measurement]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]]

## Related Papers

- Baker, Bloom, and Davis (2016), "Measuring Economic Policy Uncertainty": introduces the canonical dictionary-based EPU index and the human audit corpus used here.
- Keith et al. (2020), "Uncertainty over Uncertainty": examines assumptions and annotation choices underlying text-based EPU measures.
- Carlson and Dell (2025), "A Unifying Framework for Robust and Efficient Inference with Unstructured Data": studies inference when machine predictions become structured variables.
- [[papers/the-ai-gpr-index-measuring-geopolitical-risk-using-artificial-intelligence|The AI-GPR Index: Measuring Geopolitical Risk using Artificial Intelligence]]: uses semantic scoring and human auditing to construct a related news-based risk measure.

[[index|Library home]]
