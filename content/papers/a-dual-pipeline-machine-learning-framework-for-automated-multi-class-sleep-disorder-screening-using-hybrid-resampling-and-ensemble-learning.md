---
title: "A dual pipeline machine learning framework for automated multi class sleep disorder screening using hybrid resampling and ensemble learning"
type: paper
authors:
  - Md Sultanul Islam Ovi
  - Muhsina Tarannum Munfa
  - G. M. M. Miftahul Alam Adib
  - Syed Sabbir Hasan
year: 2026
tags:
  - tabular-classification
  - imbalanced-classification
  - feature-selection
---

## TL;DR

Two independently evaluated feature-processing pipelines show that resampling benefits depend on the classifier and representation. Four configurations achieve 74/75 correct predictions (98.667%) on a small synthetic sleep-label benchmark; this is methodological evidence, not clinical validation.

## Research Question

How do scaling, feature selection, representation learning, and hybrid resampling interact across classifiers for three-class sleep-disorder label prediction?

## Motivation

High accuracies across lifestyle-based studies obscure differences in preprocessing and validation. Comparing components under one protocol helps identify when class balancing helps and when it degrades predictions.

## Contributions

- Compares statistical and wrapper-based processing paths across nine classifiers, without fusing their representations or predictions.
- Uses component ablations to expose interactions between feature selection and SMOTETomek.
- Reports held-out classification metrics, Wilson accuracy intervals, macro AUC, and CPU timings.

## Method

The synthetic Sleep Health and Lifestyle dataset contains 374 records: 219 None, 78 Sleep Apnea, and 77 Insomnia. A stratified split reserves 299 training records and 75 test records before preprocessing. Removing Person ID, separating blood pressure, encoding occupation, and adding eight derived features yields 27 predictors.

Pipeline 1 evaluates RobustScaler, the five highest mutual-information features, and optional LDA projection to two dimensions. Pipeline 2 evaluates MinMaxScaler, Boruta selection of 11 predictors, and an optional autoencoder with architecture 11–32–16–32–11. Its 16-dimensional latent space expands rather than compresses the selected inputs. It trains for ten epochs on the original training records.

SMOTETomek combines [[concepts/synthetic-minority-oversampling|Synthetic Minority Oversampling]] with Tomek-link boundary cleaning, using three SMOTE neighbors. Resampling follows representation construction and affects training data only. The classifiers are logistic regression, KNN, random forest, XGBoost, gradient boosting, Extra Trees, AdaBoost, MLP, and LightGBM.

Randomized search evaluates up to 50 settings with stratified eight-fold internal validation, selecting by mean accuracy; MLP settings remain fixed. Learned preprocessing and resampling are fitted on the complete training partition before internal folds, so internal validation is optimistically biased. The authors report that the final test partition remains untouched throughout model development.

## Experiments

Selected held-out results from Tables 12–13:

| Classifier | Processing | Accuracy (%) | Macro F1 (%) | Macro AUC |
| --- | --- | --- | --- | --- |
| KNN | RobustScaler + MI + SMOTETomek | 98.667 | 97.850 | 0.9818 |
| XGBoost | RobustScaler + MI + SMOTETomek | 98.667 | 97.850 | 0.9942 |
| LightGBM | RobustScaler + MI + SMOTETomek | 98.667 | 97.850 | 0.9892 |
| Extra Trees | MinMaxScaler + Boruta + SMOTETomek | 98.667 | 97.840 | 0.9967 |

All four accuracy estimates have a reported 95% Wilson interval of 92.83–99.76%. One test prediction changes accuracy by 1.333 percentage points. AUC ranks configurations differently: MinMax-scaled logistic regression obtains 0.9993 AUC at 97.333% accuracy. AUC is shown on the decimal scale used by the values and narrative, despite Table 12's percent heading.

Ablations (Tables 15–16) are the central evidence. For KNN, adding resampling to scaling alone reduces accuracy from 94.667% to 89.333%; after mutual-information selection, it raises accuracy from 96.000% to 98.667%. Extra Trees shows the same interaction: resampling after scaling lowers 96.000% to 94.667%, while resampling after Boruta raises 96.000% to 98.667%. LDA does not improve the strongest KNN configuration. Adding the autoencoder to Boruta reduces Extra Trees accuracy to 93.333%, or 92.000% with resampling.

Selected Pipeline 1 KNN records 1.04 seconds of training time versus 901.54 seconds for XGBoost at equal accuracy. All selected configurations transform and predict the entire 75-record test set in under 400 ms on the reported CPU environment. Internal Wilcoxon comparisons for KNN and Extra Trees each give one-sided p = 0.00391; these use biased internal folds and are supplementary evidence.

## Limitations

Synthetic records and unverified labels cannot establish diagnostic validity. The single small test split lacks repeated or external validation; Wilson intervals do not measure variability across splits. Preprocessing and resampling outside internal folds compromise internal model-selection scores and significance tests. Calibration and subgroup fairness are not evaluated. Laptop timings exclude acquisition and clinical integration. Cross-paper accuracy differences are contextual because protocols and populations differ.

## Related Concepts

- [[concepts/synthetic-minority-oversampling|Synthetic Minority Oversampling]]: interpolation supplies minority examples; this study adds boundary cleaning and demonstrates representation-dependent gains.

## Related Papers

- [[papers/smote-synthetic-minority-over-sampling-technique|SMOTE: Synthetic Minority Over-sampling Technique]]: foundational resampling method used by SMOTETomek.
- Kursa and Rudnicki (2010), “Feature selection with the Boruta package”: cited basis for shadow-feature selection.
- Monowar et al. (2025), “Advanced sleep disorder detection using multi-layered ensemble learning and advanced data balancing techniques”: same-dataset comparison discussed by the authors, with differing evaluation procedures.
