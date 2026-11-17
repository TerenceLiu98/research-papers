---
title: "On Finetuning Large Language Models"
type: paper
authors:
  - Yu Wang
year: 2023
doi: "10.1017/pan.2023.36"
tags:
  - language-models
  - transfer-learning
  - conflict-prediction
---

## TL;DR

Wang shows that a reported dictionary-model advantage in conflict prediction reverses when ConfliBERT is fully fine-tuned. With a longer input window, test MSE falls to 0.87 and R² reaches 0.80, compared with 1.60 and 0.63 for the dictionary-based XGBoost model. The comparison changes the learning rate and training duration as well as trainable parameters.

## Research Question

Does the apparent predictive disadvantage of ConfliBERT relative to a learned conflict dictionary persist when the entire language model can adapt to the task?

## Motivation

Häfner et al. (2023) compare interpretable Objective Conflict Dictionary (OCoDi) models with ConfliBERT, but train only the latter's classification layer. Wang argues that this constrains adaptation and, in the implementation examined, also leaves a randomly initialized pooler frozen.

## Contributions

- Identifies the restricted training setup behind the earlier comparison.
- Demonstrates improved conflict-fatality regression with full-model adaptation and a longer sequence window.
- Quantifies the associated training-time increase while retaining the dictionary approach's interpretability advantage.

## Method

Predict the natural logarithm of country-month fatalities from CrisisWatch text using the earlier study's setting. The unrestricted variant makes all ConfliBERT parameters trainable, lowers the learning rate from 2e-3 to 2e-5, and reduces training from 20 to 10 epochs. A further variant increases maximum sequence length from 256 to 512 tokens. This contrasts [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]] with training only a prediction head on frozen features.

## Experiments

Table 2 reports the following test results; the first three models' scores are reproduced from Häfner et al. (2023).

| Model | MSE | R² | A100 runtime |
| --- | ---: | ---: | ---: |
| OCoDi + random forest | 1.59 | 0.64 | Not reported |
| OCoDi + XGBoost | 1.60 | 0.63 | Not reported |
| ConfliBERT, restricted | 1.75 | 0.60 | 37 minutes |
| ConfliBERT, unrestricted | 0.99 | 0.77 | 50 minutes |
| ConfliBERT, 512-token maximum | 0.87 | 0.80 | 98 minutes |

The paper reports approximately 46% lower MSE and 27% higher R² for the longest-window model relative to OCoDi + XGBoost. These are relative changes, not percentage-point gains. Full fine-tuning reaches validation MSE 1.229 at 500 steps; the restricted model's best reported validation MSE is 1.776 at 8,000 steps.

## Limitations

The evidence concerns one conflict-regression setting, not a universal ranking of language models and dictionaries. Unfreezing parameters coincides with learning-rate and epoch changes, so the comparison does not isolate each intervention. The supplied letter reports no uncertainty intervals or repeated-seed results. Longer inputs improve accuracy but increase runtime, and the dictionary models remain easier to interpret. Several footnote markers lack their corresponding text in the supplied Markdown; architectural parameter counts are therefore not used here as general BERT specifications.

## Related Concepts

- [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]]: adapts pretrained representations to the downstream target.
- [[concepts/linear-probing|Linear Probing]]: helps distinguish frozen-feature readout performance from the adaptability of the underlying model.

## Related Papers

- Häfner et al. (2023), “Introducing an Interpretable Deep Learning Approach to Domain-Specific Dictionary Creation: A Use Case for Conflict Prediction”: the dictionary method and restricted baseline reexamined here. [DOI](https://doi.org/10.1017/pan.2023.7).
- Hu et al. (2022), “ConfliBERT: A Pre-Trained Language Model for Political Conflict and Violence”: introduces the domain-specific encoder used in the experiments.
- Devlin et al. (2019), “BERT: Pre-Training of Deep Bidirectional Transformers for Language Understanding”: establishes the pretraining and downstream fine-tuning framework.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/7PCLRI).
