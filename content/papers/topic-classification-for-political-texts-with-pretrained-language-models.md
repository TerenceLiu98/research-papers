---
title: Topic Classification for Political Texts with Pretrained Language Models
type: paper
authors:
  - Yu Wang
year: 2023
doi: "10.1017/pan.2023.3"
source_job_id: "7b4710a0-b9d3-4c29-9ffb-6be050b80c25"
tags:
  - political-text-analysis
  - transfer-learning
  - topic-classification
---

## TL;DR

Fine-tuning RoBERTa-base on 2,915 labeled New Zealand parliamentary speeches improves 44-topic accuracy from 41.4% to 52.7% over a cross-domain classifier trained on 115,420 policy statements. With 300 training examples, it also surpasses the cross-domain baseline in both evaluated label schemes, although rare topics remain difficult.

## Research Question

Can the small target-domain dataset collected to validate a cross-domain topic classifier instead support a more accurate classifier through pretrained language-model fine-tuning?

## Motivation

Political text annotation is expensive. Cross-domain classification reuses abundant source labels but still requires target labels for validation. Pretrained representations may make those target labels useful for direct supervised adaptation.

## Contributions

- Tests in-domain pretrained-model adaptation against existing cross-domain classifiers on identical main-experiment test sets.
- Reports performance for 44-topic and 8-topic taxonomies, including class-level recall and small-training-set experiments.
- Measures training and inference time on an A100 GPU.

## Method

The paper applies [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]] to a 12-layer, 125-million-parameter RoBERTa-base encoder with a classification head. Cross-entropy training uses learning rate 2e-5, batch size 16, and maximum sequence length 512. Validation accuracy selects the epoch and checkpoint; inference uses batch size 64.

The 4,165 annotated speeches are randomly divided into 2,915 training, 625 validation, and 625 test examples. Results average five random runs. The comparator is the cross-domain classifier of Osnabrügge, Ash, and Morelli (2021), trained on annotated policy statements.

## Experiments

Table 1 reports the following means over five runs:

| Metric | 44 topics: cross-domain | 44 topics: RoBERTa | 8 topics: cross-domain | 8 topics: RoBERTa |
| --- | --- | --- | --- | --- |
| Top-1 accuracy / micro-F1 | 0.414 | 0.527 | 0.515 | 0.631 |
| Top-3 accuracy | 0.656 | 0.744 | 0.819 | 0.904 |
| Top-5 accuracy | 0.752 | 0.828 | 0.921 | 0.969 |
| Balanced accuracy | 0.309 | 0.357 | 0.454 | 0.580 |
| Macro-F1 | 0.294 | 0.328 | 0.449 | 0.574 |

Top-1 accuracy gains are 11.3 and 11.6 percentage points, respectively; the paper's 27.3% and 22.5% improvements are relative gains.

For one run (seed 11), RoBERTa matches or exceeds baseline recall for all 44-topic classes with more than ten test examples except education and equality. Its advantage disappears for some rare classes, including nationalization and underprivileged minority groups. In the 8-topic scheme it improves recall for seven of eight classes, with fabric of society the exception.

The sample-size experiment trains for 20 epochs with 200, 300, or 400 examples and splits the remaining labeled corpus equally between validation and testing. Across five runs, 300 training examples suffice to surpass the reported cross-domain accuracy for both tasks (Figure 1); exact curve values are not supplied in the Markdown.

Training for 20 epochs on 2,915 examples takes 27 minutes on a 40 GB A100. Inference throughput is about 145 speeches per second. The cross-domain comparator's reported 27-minute training time uses a 16-CPU iMac and cross-validation, so this is not a hardware-controlled efficiency comparison.

## Limitations

Evidence comes from one parliamentary corpus and two related topic taxonomies. Sparse in-domain labels can leave rare topics poorly learned even when overall accuracy improves. The 300-example finding concerns training labels alone: substantial additional labeled validation and test sets remain in that experiment. Changing the labeled-data allocation changes evaluation sets, and the small-sample comparison uses the baseline performance reported in the earlier study. The parsed source omits the contents of numbered footnotes, limiting reconstruction of those details.

## Related Concepts

- [[concepts/full-parameter-fine-tuning|Full-Parameter Fine-Tuning]]: adapts pretrained representations and the classification head using target-domain labels.

## Related Papers

- Osnabrügge, Ash, and Morelli (2021), “Cross-Domain Topic Classification for Political Texts”: supplies the target corpus and cross-domain baselines.
- Liu et al. (2019), “RoBERTa: A Robustly Optimized BERT Pretraining Approach”: supplies the pretrained architecture.
- [[papers/cross-lingual-classification-of-political-texts-using-multilingual-sentence-embeddings|Cross-Lingual Classification of Political Texts Using Multilingual Sentence Embeddings]]: a related use of pretrained representations under scarce political-text labels, with fixed multilingual features rather than in-domain encoder adaptation.

Published in *Political Analysis* 31: 662–668. [Replication materials](https://doi.org/10.7910/DVN/FMT8KR).
