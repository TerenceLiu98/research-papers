---
title: "Less Annotating, More Classifying: Addressing the Data Scarcity Issue of Supervised Machine Learning with Deep Transfer Learning and BERT-NLI"
type: paper
authors:
  - Moritz Laurer
  - Wouter van Atteveldt
  - Andreu Casas
  - Kasper Welbers
year: 2024
doi: 10.1017/pan.2023.20
tags:
  - political-text
  - natural-language-inference
  - transfer-learning
---

## TL;DR

Across eight political text classification tasks, BERT-NLI improves macro-F1 by 10.7–18.3 percentage points over classical TF-IDF classifiers with 100–2,500 labeled texts. The authors report that 500 examples yield similar average performance to classical models trained on roughly 5,000. Intermediate entailment training and natural-language label descriptions are especially useful with scarce, imbalanced labels.

Published online June 9, 2023; appeared in *Political Analysis* 32 (2024), 84–100. [Paper](https://doi.org/10.1017/pan.2023.20).

## Research Question

How much can pretrained language representations and transferable task representations reduce annotation requirements for supervised political text classification, particularly for minority classes?

## Motivation

Political research often introduces new categories with few examples, making training a classifier from scratch expensive. Pretrained language representations encode contextual similarities, while intermediate natural language inference training supplies a reusable task that can express new categories without replacing the classification head.

## Contributions

- Compares classical classifiers, pretrained transformers, and NLI-trained transformers across eight tasks from five datasets.
- Separates the practical roles of language representations, transferable task structure, and verbalized labels.
- Measures learning curves and class-sensitive performance to assess annotation requirements and imbalance.
- Releases reusable NLI models, cleaned data, and replication code.

## Method

Despite the BERT terminology, both transformer conditions use DeBERTaV3-base. The NLI variant receives intermediate training on 1,279,665 hypothesis–context pairs from eight general-purpose NLI datasets.

Researchers translate each codebook class into a natural-language hypothesis. For downstream fine-tuning, each labeled text is paired with its correct hypothesis and labeled true, and with one randomly sampled incorrect hypothesis labeled neutral. At inference, every text is evaluated against every candidate hypothesis; the class with the highest entailment score wins. This retains the NLI task head and supplies semantic information about labels. The entailment score is a classification device, not a judgment of objective truth.

Baselines are SVM and logistic regression with either TF-IDF or averaged word embeddings. For quasi-sentences, preprocessing experiments compare isolated text with adjoining sentences to better approximate the context available to human coders.

## Experiments

The eight tasks cover Manifesto topics; economic-news sentiment; State of the Union policy topics; Supreme Court case topics; CoronaNet policy measures; and Manifesto stances toward the military, protectionism, and traditional morality. Random training samples range from zero to 10,000 texts where dataset size permits. Hyperparameters are selected on validation data, with final holdout testing and three random training samples to assess variability.

Macro-F1 is the primary metric, accompanied by accuracy/micro-F1 and balanced accuracy. Macro-F1 averages class-specific F1 scores, giving minority classes equal weight. Three tasks admit majority-only accuracy above 90%, making accuracy alone misleading.

| Reported comparison | Result |
|---|---|
| BERT-NLI versus classical TF-IDF, 100–2,500 texts | +10.7–18.3 macro-F1 points averaged across eight tasks |
| BERT-NLI versus classical averaged embeddings | +8.0–11.7 macro-F1 points over the same sample-size interval |
| Approximate annotation comparison | 500 BERT-NLI examples versus roughly 5,000 classical examples for similar average macro-F1 |
| BERT-NLI versus classical TF-IDF, averaged over 100–2,500 examples | +14.6 macro-F1 points versus +8.3 accuracy/micro-F1 points |

The larger macro-F1 gains support improved minority-class performance. BERT-NLI is most useful with at most about 1,000 examples and pronounced imbalance. At approximately 2,000 or more examples, converging performance makes the simpler standard transformer attractive. These are empirical guidelines, not universal sample-size thresholds; only four datasets support more than 2,500 training examples.

## Limitations

Transformer fine-tuning requires more computation and software expertise than classical methods. NLI training data are richer in English; multilingual performance is not established by these experiments. Hypothesis wording must adequately express the construct: the authors observe weaker relative performance for complex traditional-morality labels than for military stance. Better minority-class performance can accompany weaker majority-class performance. Pretraining bias, interpretability, and substantive measurement validity remain concerns. Random-sample learning curves do not establish gains from active learning, which is proposed as future work. Supplementary analyses are referenced by the supplied article but are not reproduced in the parsed source.

## Related Concepts

- [[concepts/natural-language-inference|Natural Language Inference]]: provides the transferable task and verbalized class hypotheses that enable zero-shot prediction and data-efficient fine-tuning.

## Related Papers

- [[papers/political-debate-efficient-zero-shot-and-few-shot-classifiers-for-political-text|Political DEBATE]]: extends political NLI classification through domain-specific training and a curated political entailment dataset.
- Yin, Hay, and Roth (2019), *Benchmarking Zero-Shot Text Classification: Datasets, Evaluation and Entailment Approach*: cited as the antecedent entailment formulation.
- Wang et al. (2021), *Entailment as Few-Shot Learner*: cited as a refinement of entailment-based transfer.

Replication: [GitHub](https://github.com/MoritzLaurer/less-annotating-with-bert-nli), [Dataverse](https://doi.org/10.7910/DVN/8ACDTT).
