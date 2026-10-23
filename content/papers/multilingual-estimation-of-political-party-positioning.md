---
title: "Multilingual estimation of political-party positioning: From label aggregation to long-input Transformers"
type: paper
authors:
  - Dmitry Nikolaev
  - Tanise Ceron
  - Sebastian Padó
year: 2023
doi: "10.18653/v1/2023.emnlp-main.591"
venue: EMNLP
source_job_id: "12341169-1250-4110-801c-87d29c9ae166"
tags:
  - text-as-data
  - political-text-scaling
  - multilingual-nlp
  - party-manifestos
  - long-document-modeling
---

## TL;DR

Statement-level label aggregation estimates manifesto RILE scores more reliably than direct long-input Transformer regression across 1,314 manifestos, 41 countries, and 27 languages. The best label-aggregation correlations with gold RILE scores are 0.73 when transferring to held-out countries and 0.90 when transferring from pre-2019 to 2019-2021 manifestos. BigBird reaches 0.55 and 0.71, respectively, but its scores regress strongly toward zero; Longformer reaches only 0.16 and 0.35.

## Research Question

Can NLP approximate the Standard Right-Left (RILE) positions of political-party manifestos across languages, countries, and election cycles, and can models operating directly on long raw texts replace a statement-classification-and-aggregation pipeline?

## Motivation

The Manifesto Project computes RILE from manually assigned policy-category labels, making coverage expensive and slow. Automatic scaling could extend analysis to new elections, countries, and historical gaps, but it must handle long documents and transfer across political and linguistic contexts. This study tests whether noisy statement predictions can still yield useful aggregate positions and whether long-input models can avoid the separate problem of identifying statement boundaries.

## Contributions

- Evaluates multilingual party-position estimation on 1,314 manifestos from 41 countries and 27 languages, including comparatively low-resource languages.
- Compares statement-level label aggregation with direct long-document prediction using BigBird and Longformer.
- Tests multilingual encoders against an English machine-translation pipeline for label aggregation.
- Separates geographic transfer, using leave-one-country-out evaluation, from temporal transfer to manifestos published in 2019-2021.
- Analyzes coarse versus fine label prediction, regression to the mean, sign errors, and cross-country variation in right-wing categories.

## Method

### Target and data

The RILE score is

$$
\mathrm{RILE}=\frac{R-L}{R+L+O},
$$

where $R$, $L$, and $O$ are the percentages of manifesto statements assigned to right, left, and other Manifesto Project categories. Scores range from -1 to 1. The data combine the annotated 2022a Manifesto Project release with its South American collection, exclude pre-2000 manifestos and languages lacking a readily available free translation model, and retain 1,314 manifestos.

Two evaluation settings represent different deployment conditions. **X-COUNTRY** repeatedly holds out one country, so the model receives no training data from the target country. **X-TIME** trains on material before 2019 and tests on 2019-2021 material; only 18 countries contribute test manifestos in this setting.

### Label aggregation

Statement classifiers predict either all 143 Manifesto Project categories or the three RILE-relevant classes. One track fine-tunes XLM-RoBERTa; the other translates statements into English with OPUS-MT through EasyNMT and classifies pooled `all-mpnet-base-v2` representations. Predicted labels are aggregated with the RILE formula.

### Direct long-input prediction

English translations are concatenated into chunks of at most 4,095 tokens; chunks shorter than 1,000 tokens are discarded. BigBird and Longformer regress each chunk's RILE score through a tanh-bounded head, and the manifesto prediction averages its chunk values. A separate five-class experiment bins RILE into hard left, centre left, centrist, centre right, and hard right.

The study reports accuracy and weighted macro F1 for statement classifiers, Spearman correlation for continuous RILE estimates, and accuracy and F1 for the five-class models. It also examines absolute errors, error direction, and predicted-score distributions.

## Experiments

### Statement labels and aggregate scores

Predicting all 143 categories is difficult: X-COUNTRY accuracy is 0.46 for XLM-R and 0.47 for the translation pipeline; X-TIME accuracy is 0.54 and 0.48. Collapsing the target to right, left, and other raises accuracy to 0.70-0.71 in X-COUNTRY and 0.74-0.77 in X-TIME.

| Method | X-COUNTRY Spearman | X-TIME Spearman |
| --- | ---: | ---: |
| XLM-R, 143-label aggregation | 0.73 | 0.88 |
| XLM-R, 3-way aggregation | 0.72 | 0.90 |
| BigBird regression | 0.55 | 0.71 |
| Longformer regression | 0.16 | 0.35 |

Fine-grained classification errors therefore do not prevent useful aggregate estimation. The confusion analysis indicates that many errors remain within the same coarse RILE group rather than crossing from left to right or vice versa. Directly training on the three groups adds no X-COUNTRY benefit and only a modest X-TIME gain.

### Long-input classification and errors

For five-way stance classification, BigBird obtains manifesto-level F1 scores of 0.71 in X-COUNTRY and 0.68 in X-TIME; Longformer obtains 0.63 and 0.59. These scores conceal strong central compression: BigBird never correctly predicts either extreme class in the reported X-COUNTRY confusion matrix.

Both continuous approaches regress toward the mean, but BigBird is especially concentrated near zero. The XLM-R aggregation model better matches the gold dispersion while underestimating the heavy right tail. In cross-country transfer, right-leaning manifestos are sometimes shifted across zero, and the authors connect this pattern to greater cross-country variability and lower average prevalence among right-coded categories. Errors are smaller in X-TIME, where target-country training data are available.

## Limitations

- The target is tied to the Manifesto Project's contested RILE construction and category scheme; the study does not establish transfer to other political dimensions or coding systems.
- The label-aggregation pipeline uses gold sub-sentence statement boundaries. A real deployment must infer these boundaries, simplify sentence labeling, or use a multi-label formulation, so its advantage over raw-text models is not an end-to-end comparison.
- Long-input models are trained on machine-translated text and less effectively recover score dispersion, especially ideological extremes. Rank correlation for BigBird therefore overstates calibration in absolute RILE units.
- X-TIME covers only 18 countries and differs from X-COUNTRY in both target familiarity and test-set composition. The two correlations should not be read as an isolated estimate of temporal versus geographic difficulty.
- The observed difficulty with right-wing categories is an empirical pattern in this dataset and coding scheme, not evidence of a universal linguistic property of right-wing discourse.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: the broader family that includes statement aggregation, count models, semantic scaling, and direct long-text prediction.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: RILE fixes a single left-right axis whose substantive coverage varies across political systems.
- [[concepts/text-embedding-models|Text Embedding Models]]: XLM-R and MPNet supply representations for the statement-level classifiers.

## Related Papers

- [[papers/political-text-scaling-meets-computational-semantics|Political Text Scaling Meets Computational Semantics]]: evaluates embedding-based graph scaling and also uses Manifesto Project RILE scores, but does not use supervised statement aggregation.
- [[papers/text-based-ideal-points|Text-Based Ideal Points]]: jointly estimates positions and politically differentiated language from authored texts without manifesto labels.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: places classification and embedding approaches within a broader measurement taxonomy.

Source: [ACL Anthology](https://aclanthology.org/2023.emnlp-main.591/). Summary based on the supplied parsed paper; publication metadata verified against the official record.

[[index|Library home]]
