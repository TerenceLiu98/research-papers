---
title: "Introducing an Interpretable Deep Learning Approach to Domain-Specific Dictionary Creation: A Use Case for Conflict Prediction"
type: paper
authors:
  - Sonja Häfner
  - Martin Hofer
  - Maximilian Nagl
  - Julian Walterskirchen
year: 2023
doi: 10.1017/pan.2023.7
tags:
  - text-as-data
  - conflict-measurement
  - interpretable-machine-learning
---

## TL;DR

Neural-network sensitivities turn conflict reports and observed fatalities into a weighted, 1,100-term Objective Conflict Dictionary (OCoDi). On held-out 2021 reports, its Random Forest regression achieves MSE 1.59 and R² 0.64, compared with 1.75 and 0.60 for fine-tuned ConfliBERT. This demonstrates text-based inference of country-month conflict intensity; it does not establish advance forecasting of future violence.

## Research Question

Can supervised neural networks produce transparent domain-specific dictionaries that retain predictive accuracy while reducing manual lexical annotation and deployment complexity?

## Motivation

General sentiment dictionaries need not measure conflict intensity, and event-coding dictionaries were designed to extract events. Complex language models offer task adaptation but make individual word contributions harder to inspect. External outcome supervision offers a way to learn relevant vocabulary without manually labeling words.

## Contributions

- Introduces a reusable workflow for extracting signed lexical weights from neural-network gradients.
- Builds OCoDi from English CrisisWatch reports matched to UCDP GED fatalities.
- Compares dictionary scores with sentiment dictionaries, event coding, text scaling, and a domain-specific transformer under a temporal test split.

## Method

Over 14,000 ICG CrisisWatch reports from 2003–2021 are matched to country-month fatalities, with the natural logarithm as the target. Preprocessing excludes names and geographical terms; a document-term representation retains 3,000 frequent words and 1,000 bigrams. Training uses 2003 through the first half of 2020, validation the second half of 2020, and testing 2021.

A feed-forward network uses Swish hidden activations, a ReLU output, Adam, regularization, dropout, and early stopping. Random search considers 200 hyperparameter configurations with ten network fits per configuration, including dictionary size. Selection evaluates the resulting dictionary through a Random Forest rather than choosing solely by network accuracy.

For each input term, the method computes the root mean square of output derivatives across training observations and assigns the sign of the mean derivative. Large positive and negative sensitivities identify terms associated with higher and lower fatalities. The final dictionary contains 1,100 terms. A document score sums matched signed weights and divides by document length. Random Forest and XGBoost map this scalar score to log fatalities; ConfliBERT predicts the outcome directly.

## Experiments

Table 2 reports held-out regression performance on the log-fatality target:

| Approach | Random Forest MSE / R² | XGBoost MSE / R² |
| --- | --- | --- |
| OCoDi | 1.59 / 0.64 | 1.60 / 0.63 |
| Vader | 2.61 / 0.40 | 2.60 / 0.41 |
| Harvard IV-4 | 3.13 / 0.29 | 2.99 / 0.32 |
| Wordfish | 4.39 / −0.00 | 4.40 / −0.00 |
| Wordscores | 2.20 / 0.50 | 2.21 / 0.50 |
| CAMEO | 2.68 / 0.39 | 2.65 / 0.39 |

ConfliBERT's direct regression gives MSE 1.75 and R² 0.60. OCoDi's correlation with log fatalities is 0.735, below ConfliBERT's 0.792 despite its better regression error. The best source neural network reaches R² 0.65 and the network average approximately 0.64. The authors also report weaker performance for a Lasso-derived dictionary and advantages in unweighted dictionary comparisons, with details deferred to supplementary material.

## Limitations

Predictions overestimate some low-fatality observations and increasingly underestimate high-fatality cases. Evaluation uses one expert-report corpus; transfer to general news or other outcomes remains untested. Fatalities operationalize only one aspect of conflict. Signed sensitivities describe fitted associations rather than causal word effects, and outcome supervision does not remove choices about corpus, target, and preprocessing. The article argues computational efficiency but the supplied main text does not provide a runtime benchmark. Several implementation details require the supplement, including zero-fatality handling in the logarithmic target.

## Related Concepts

- [[concepts/supervised-dictionary-induction|Supervised Dictionary Induction]] — external outcomes determine lexical inclusion and weights.
- [[concepts/text-scaling-models|Text Scaling Models]] — Wordscores and Wordfish provide comparison document scores.

## Related Papers

- [[papers/creating-and-comparing-dictionary-word-embedding-and-transformer-based-models-to-measure-discrete-emotions-in-german-political-text|Widmann and Wich (2023)]] — compares lexical and transformer methods for political emotion classification; its different ranking emphasizes task-specific evaluation.
- Horel et al. (2018), *Sensitivity Based Neural Networks Explanations* — source of the sensitivity-based importance measure.
- Hu et al. (2022), *ConfliBERT: A Pre-Trained Language Model for Political Conflict and Violence* — domain-specific transformer comparator.

Published in *Political Analysis* 31, 481–499. [Article](https://doi.org/10.1017/pan.2023.7). [Replication data](https://doi.org/10.7910/DVN/Y5INRM).
