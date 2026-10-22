---
title: Analysis of Main Risk Factors Causing Stroke in Shanxi Province Based on Machine Learning Models
type: paper
authors:
  - Junjie Liu
  - Yiyang Sun
  - Jing Ma
  - Jiachen Tu
  - Yuhui Deng
  - Ping He
  - Rongshan Li
  - Fengyun Hu
  - Huaxiong Huang
  - Xiaoshuang Zhou
  - Shixin Xu
year: null
source_job_id: "7ee211e6-9117-4ce2-b4c5-29abbdfb1f7d"
tags:
  - stroke-risk
  - clinical-risk-stratification
  - interpretable-machine-learning
  - shap
  - random-forests
---

## TL;DR

Using community screening records from Shanxi Province and records for 2,000 hospitalized stroke patients, Liu et al. compare decision trees, random forests, support-vector machines, multilayer perceptrons, and logistic regression for stroke-risk analysis. Blood pressure, physical inactivity, body mass index, glucose, smoking, and lipid measurements rank prominently. A logistic model assigns mean predicted probabilities of 7.20%, 19.02%, and 83.89% to the low-, medium-, and high-risk groups. These are model outputs under a relabeling scheme that combines high-risk residents with hospitalized stroke cases, not prospective incidence estimates.

## Research Question

Which clinical and lifestyle variables are most informative for classifying residents into China National Stroke Prevention Project (CSPP) risk levels in Shanxi Province, and can those qualitative levels be translated into model-based probabilities?

## Motivation

The CSPP uses eight modifiable or clinical factors plus histories of stroke and transient ischemic attack to classify residents as low, medium, or high risk. The authors argue that the relative importance of these factors can vary geographically, motivating a province-specific analysis rather than direct transfer of rankings developed for other populations.

## Contributions

- Ranks the CSPP "8+2" factors using decision-tree and random-forest impurity and permutation importance.
- Extends the analysis to lifestyle, demographic, and medical measurements, comparing random forest, support-vector machine, and multilayer-perceptron classifiers.
- Uses [[concepts/shap-feature-attribution|SHAP Feature Attribution]] to estimate the direction as well as the magnitude of feature contributions in the random-forest model.
- Fits a logistic model to convert the paper's binary relabeling of screening categories and hospitalized cases into predicted probabilities for each CSPP risk group.

## Method

### Data and preprocessing

The study uses two Shanxi census datasets: 2,000 hospitalized stroke patients from 2018 and 27,583 community residents surveyed from 2017 through 2020. The community data initially contain 11,739 low-risk, 7,630 medium-risk, and 8,214 high-risk residents under CSPP rules. After cleaning, the paper reports 23,289 community records with 32 retained features: 9,718 low-risk, 6,742 medium-risk, and 5,610 high-risk records.

Columns with more than 60% missingness are removed, inconsistent values are corrected using medical constraints, and remaining missing values are encoded as -1. The original records contain 177 variables covering demographics, lifestyle, measurements, surgery, and chronic disease history.

### Risk-level classification and interpretation

A decision tree ranks the ten CSPP factors. A random forest then classifies three risk levels from a broader feature set and is compared with an RBF support-vector machine and a multilayer perceptron selected by grid search. Feature importance, permutation importance, and TreeSHAP summarize the fitted models. A missing-feature experiment and recursive feature elimination assess sensitivity to incomplete inputs and reduced feature sets.

### Probability model

For logistic regression, low- and medium-risk community records are relabeled as class 0, while high-risk community records and hospitalized stroke cases are relabeled as class 1. The resulting class counts are 19,369 and 10,214. Correlated and low-variance features are removed before fitting an L2-penalized model. Training and testing use an 80/20 split repeated 100 times with reshuffling.

## Experiments

### Classification performance

The decision tree classifies the CSPP labels with reported accuracy 0.9721. This high score partly reflects that the labels themselves are deterministic functions of the same "8+2" inputs used by the classifier.

For the broader lifestyle and measurement feature set, the random forest performs best among the three compared models:

| Model | Average precision | Average recall | Average accuracy |
| --- | ---: | ---: | ---: |
| Random forest | 0.8435 +/- 0.0123 | 0.8532 +/- 0.0097 | 0.8503 +/- 0.0130 |
| Multilayer perceptron | 0.8124 +/- 0.0351 | 0.8172 +/- 0.0283 | 0.8146 +/- 0.0294 |
| Support-vector machine | 0.7623 +/- 0.0215 | 0.7538 +/- 0.0263 | 0.7573 +/- 0.0250 |

The random forest's class-level recall is 0.9531 for low risk, 0.7850 for medium risk, and 0.7182 for high risk, indicating materially weaker detection of the high-risk class than its overall accuracy suggests.

### Feature rankings

For the CSPP factors, the paper reports decision-tree importance values of 0.4995 for hypertension, 0.08486 for physical inactivity, and 0.07889 for diabetes mellitus. Random-forest importance instead ranks hypertension (0.3966), hyperlipidemia (0.1229), and physical inactivity (0.1146) highest.

With the broader variables, the five leading random-forest feature-importance values are systolic blood pressure (0.3670), diastolic blood pressure (0.1541), physical inactivity (0.0904), body mass index (0.0721), and fasting blood glucose (0.0531). TreeSHAP associates higher diastolic and systolic blood pressure, physical inactivity, body mass index, smoking, fasting blood glucose, and triglycerides with greater modeled risk, while higher HDL is associated with lower modeled risk.

### Logistic outputs

Across the repeated splits, the fitted logistic model reports these mean predicted probabilities:

| CSPP group | Mean probability | Reported 95% interval |
| --- | ---: | ---: |
| Low risk | 0.0720 | 0.0665-0.0774 |
| Medium risk | 0.1902 | 0.1808-0.1996 |
| High risk | 0.8389 | 0.8293-0.8486 |

Because class 1 combines prevalent hospitalized stroke cases with high-risk community residents, these quantities estimate the fitted composite label under the study design. They are not directly validated probabilities of a future stroke over a specified time horizon.

## Limitations

- The community labels are constructed from CSPP risk factors, so models using those factors partly reproduce the screening rule rather than independently predict clinical outcomes.
- The logistic target combines high-risk status with hospitalization for stroke. The cross-sectional design does not establish prospective incidence or calibrate risk over a defined follow-up period.
- Encoding all retained missing values as -1 can make missingness an artificial predictive category; the paper acknowledges that this may introduce bias.
- Feature importance and SHAP values describe the fitted models and do not establish that a variable causes stroke. Correlated predictors can also redistribute attribution among related measurements.
- Validation uses random train/test splits from the same regional data. The paper reports no temporal, hospital-level, or external geographic validation.
- The reported cleaned total is 23,289, but the accompanying low-, medium-, and high-risk counts sum to 22,070. The abstract ranks diabetes mellitus third by decision-tree importance, whereas the results and discussion identify hyperlipidemia as third; the source does not reconcile either discrepancy.
- The source does not report a publication year, DOI, or other stable identifier in the supplied text, so those fields are not inferred here.

## Related Concepts

- [[concepts/shap-feature-attribution|SHAP Feature Attribution]]: decomposes fitted predictions into feature contributions but remains dependent on the model and feature representation.
- Clinical risk stratification: the paper operationalizes the CSPP low-, medium-, and high-risk categories and then models those labels.
- Permutation importance: measures the loss in predictive performance after disrupting one feature, with interpretation complicated by correlated predictors.

## Related Papers

- Letham et al. (2015), "Interpretable Classifiers Using Rules and Bayesian Analysis: Building a Better Stroke Prediction Model": cited interpretable rule-based stroke model.
- Hung et al. (2019), "Development of an Intelligent Decision Support System for Ischemic Stroke Risk Assessment in a Population-Based Electronic Health Record Database": cited EHR-based stroke-risk system.
- Lundberg and Lee (2017), "A Unified Approach to Interpreting Model Predictions": cited foundation for SHAP.
- [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer: Ambivalent Cognitive Effects of XAI in Augmented Decision-Making under Uncertainty]]: library comparison on how explanations affect human use of model advice rather than on clinical prediction accuracy.

[[index|Library home]]
