---
title: "The Multiclass Classification of Newspaper Articles with Machine Learning: The Hybrid Binary Snowball Approach"
type: paper
authors:
  - Miklós Sebők
  - Zoltán Kacsuk
year: 2021
doi: 10.1017/pan.2020.27
tags:
  - text-as-data
  - political-methodology
  - semi-supervised-learning
---

## TL;DR

Hybrid binary snowball (HBS) combines human validation, one-versus-rest SVM ensembles, and iterative training-set expansion to classify Hungarian newspaper articles into 21 policy topics. The authors report over 83% precision while labeling 20,194 of 34,670 target articles (58.2%). This is a precision–coverage tradeoff: the labeled share is not measured recall.

## Research Question

Can limited human coding and validation support high-precision policy-topic classification in a new newspaper corpus with imbalanced classes?

## Motivation

Comparative Agendas Project coding commonly relies on costly double-blind human annotation. Automating a reliable subset of articles could reduce that burden even if many articles remain unclassified. Transfer between newspapers tests whether an existing coded corpus can replace initial target-corpus annotation.

## Contributions

- Integrates human validation, binary classification, and training-set expansion into a budget-conscious workflow.
- Distinguishes intracorpus expansion from intercorpus reuse of labeled data.
- Demonstrates the workflow on Hungarian front-page reporting with uneven topic frequencies.

## Method

The source corpus is Népszabadság; the initially unlabeled target is Magyar Nemzet. Inputs are the full article text appearing on front pages. Preprocessing removes stopwords, stems words, excludes tokens shorter than two characters and tokens appearing in fewer than five documents, and applies TF–IDF weighting.

Each topic receives a one-versus-rest SVM classifier. When the positive-to-negative ratio is below 10%, negatives are undersampled without replacement. Seven sampled training sets and seven SVM runs per sample produce 49 votes per topic. A topic verdict requires unanimity; an article receives a label only when exactly one topic supplies a verdict. Table 1 specifies ten maximum SVM iterations and regularization parameter 0.1.

New labels enter subsequent training rounds through [[concepts/self-training|Self-Training]]. In the reported target-corpus application, expansion occurs automatically over three rounds, followed by human validation of topic-stratified samples. All articles in categories smaller than 100 are inspected; larger categories use samples designed for approximately ±5 percentage-point precision intervals at 95% confidence. The general workflow allocates human effort to initial source coding and validation rather than exhaustive target annotation.

## Experiments

| Quantity | Reported result |
| --- | --- |
| Target articles | 34,670 |
| Labeled after three rounds | 20,194 |
| Target coverage | 58.2% |
| Precision summarized in introduction | Over 83% |
| Topic-level precision | Above 80% for most topics |
| Full coding round runtime | Roughly 30 minutes on a Spark cluster versus 3–4 days on a desktop |

Sections 4–6 report that undersampling improved recall but reduced precision, motivating ensemble unanimity. Later rounds added progressively fewer labels. Environment, macroeconomics, and government operations were weaker categories. Simulations favored SVM over Naive Bayes and showed that stronger precision could sacrifice recall; detailed numerical simulation tables are not reproduced in the supplied Markdown.

## Limitations

Coverage is not recall: the sample-based validation does not establish how many true members of each target topic remain uncoded. Comparisons with human intercoder reliability are the authors' benchmark framing, rather than a direct equivalence between reliability and predictive precision. Evidence comes from two newspapers in the same language and domain; broader domain independence remains a proposal.

Overlapping policy areas and heterogeneous categories complicate single-label assignment. Similar hospital-law stories can be assigned to health care or government operations. Automatic reuse of labels makes training quality consequential, and the optimal stopping round remains unresolved. Dictionary corrections, refined categories, active learning, and alternative representations are proposed extensions rather than established improvements in this application.

## Related Concepts

- [[concepts/self-training|Self-Training]]: accepted machine labels enlarge the training set.
- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]]: a distinct model family facing the shared problem of implementing substantive coding rules and validating automated measurements.

## Related Papers

- Loftis and Mortensen (2020), “Collaborating with the Machines: A Hybrid Method for Classifying Policy Documents”: cited precedent for allocating human effort to validation.
- Burscher, Vliegenthart, and De Vreese (2015), “Using Supervised Machine Learning to Code Policy Issues: Can Classifiers Generalize Across Contexts?”: prior work on cross-context policy classification.

Published in *Political Analysis* 29, 236–249 (2021), online 11 November 2020. Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/CFHOCU).
