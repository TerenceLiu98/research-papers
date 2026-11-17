---
title: "It’s All in the Name: A Character-Based Approach to Infer Religion"
type: paper
authors:
  - Rochana Chaturvedi
  - Sugat Chaturvedi
year: 2024
doi: "10.1017/pan.2023.6"
tags:
  - political-methodology
  - religion-inference
  - character-based-classification
---

## TL;DR

Character-based classifiers infer Muslim versus non-Muslim identity from Indian names with full test-set coverage, overcoming dictionary lookup failures on unseen names. With an individual's and parent/spouse's names concatenated, linear SVM achieves macro-F1 of 97.33% on REDS and 96.56% on rural Uttar Pradesh data. Predictions remain probabilistic proxies for identity.

## Research Question

Can character patterns improve the accuracy, coverage, and speed of religion inference from names, and support aggregate studies of political representation?

## Motivation

Fine-grained religion data are scarce in South Asia, whereas administrative name lists are widespread. Manual classification limits scale, and dictionary methods cannot reliably cover unseen names or spelling variants. Linguistic differences among naming traditions motivate models that generalize across name parts.

## Contributions

- Compares character-based discriminative models with dictionary and generative language-model baselines.
- Evaluates both individual classification and aggregate religious counts.
- Uses layer-wise relevance propagation on a CNN to interpret learned character patterns.
- Applies name classification to Indian electoral candidates during 1962–2021.

## Method

The training source is the 2006 Rural Economic & Demographic Survey (REDS): 115,180 observations with self-reported religion, split 80:10:10. A separate test set contains 20,000 rural Uttar Pradesh household heads whose religion was independently annotated from their own and relatives' names; annotator agreement is 99.91%.

Names are uppercased and cleaned of special characters, numbers, and excess spaces. Models use either single names or names concatenated with a parent/spouse's name. TF-IDF character n-grams feed L2-regularized logistic regression and linear SVM with balanced class weights. A character CNN learns local features directly. Baselines are Name2community dictionary matching and separate Muslim/non-Muslim character language models, classified by lower perplexity.

Layer-wise relevance propagation attributes CNN outputs to input characters. Reported patterns include Arabic-derived endings and context-dependent relevance: the same character can contribute differently within different name parts. These explanations describe model behavior rather than establishing an individual's religion.

## Experiments

Table 4 reports macro-F1 percentages:

| Model | REDS single | U.P. single | REDS concatenated | U.P. concatenated |
| --- | ---: | ---: | ---: | ---: |
| Name2community | 93.39 | 93.11 | 94.24 | 93.76 |
| Language model | 89.78 | 85.27 | 92.67 | 91.21 |
| Logistic regression | 95.23 | 90.24 | 97.32 | 96.49 |
| SVM | 95.64 | 91.45 | 97.33 | 96.56 |
| CNN | 95.86 | 90.67 | 96.76 | 94.16 |

Baseline scores cover only unambiguously classified names. Name2community single-name coverage is 65.28% on REDS and 57.34% on U.P.; concatenation raises it to 72.55% and 72.72%. Discriminative models cover 100%. Thus, baseline F1 values are not full-sample comparisons. The authors report 50,000–500,000 names/second for discriminative models versus 0.4 for Name2community in their experiments.

First-name-only subsets reduce discriminative-model F1 to approximately 85%, while first-and-last-name subsets reach around 96%. Concatenation particularly helps the shorter U.P. names. CNN has lower Muslim recall than SVM with concatenated inputs. SVM is the authors' preferred classifier; logistic regression is preferred when probabilities are required.

For aggregate counts, 10,000 bootstrap draws of 1,000 people compare absolute Muslim-count errors. SVM and logistic regression perform similarly and generally outperform the baselines. Individual F1 alone does not determine aggregate accuracy.

The electoral application classifies candidates using SVM and excludes constituencies reserved for scheduled castes and tribes. Muslim candidate shares rise with population shares, while vote shares stagnate and national legislative representation declines. Proposed explanations, including vote splitting, are interpretations rather than causal tests. A supplementary U.S. application is reported to improve Black-voter count estimation relative to BISG, but detailed supplementary evidence is absent from the supplied text.

## Limitations

The principal task is binary, so non-Muslim predictions do not identify a particular religion. U.P. labels measure perceived religion from names rather than independent self-reports. Name length and training composition affect performance: women comprise about 10% of training observations, and single-name performance is lower for women. Transfer to other populations requires validation.

Names do not strictly determine identity. The authors discuss risks of discriminatory use and harm to misclassified people. Their expectation that research benefits outweigh harms is an ethical assessment, not an empirical result. The supplied Markdown omits numbered footnote text and the supplementary material, limiting reconstruction of tuning details and additional analyses.

## Related Concepts

- [[concepts/name-based-demographic-inference|Name-Based Demographic Inference]] provides the broader measurement framework.
- [[concepts/bayesian-improved-surname-geocoding|Bayesian Improved Surname Geocoding]] combines names with geography; the paper proposes character models as alternatives to surname dictionaries within such workflows.

## Related Papers

- Susewind (2015), “What’s in a Name? Probabilistic Inference of Religious Community from South Asian Names”: dictionary-based baseline.
- [[papers/validating-the-applicability-of-bayesian-inference-with-surname-and-geocoding-to-congressional-redistricting|Validating the Applicability of Bayesian Inference with Surname and Geocoding to Congressional Redistricting]] separately examines aggregate demographic estimation and the value of retaining probabilities.

## Source and Replication

*Political Analysis* 32 (2024), 34–49; published online 23 March 2023. Replication DOI: 10.7910/DVN/JOEVPN. Synthesized from the supplied parsed Markdown for Cognitio job 36c07b81-4c9f-4ebc-804a-7b6fc406eed2.
