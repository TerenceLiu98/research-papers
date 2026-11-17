---
title: "PopBERT. Detecting Populism and Its Host Ideologies in the German Bundestag"
type: paper
authors:
  - Lukas Erhard
  - Sara Hanke
  - Uwe Remer
  - Agnieszka Falenska
  - Raphael Heiko Heiberger
year: 2024
doi: "10.1017/pan.2024.12"
tags:
  - populism
  - text-as-data
  - political-communication
  - multilabel-classification
---

## TL;DR

PopBERT fine-tunes German BERT on 8,795 sentences annotated by five specialists to detect moralizing anti-elitism, people-centrism, and associated left- or right-wing host ideologies. It achieves micro-F1 0.77 on a held-out sentence test set and provides dimension-specific measures for Bundestag speeches from 2013–2021.

## Research Question

Can a contextual language model measure populist rhetoric and its host ideologies at sentence level while producing substantively credible aggregate measures of parties and politicians?

## Motivation

Dictionaries struggle with contextual meanings and implicit appeals. Assigning populism labels from party membership instead risks learning group differences rather than the intended construct. The paper instead annotates communications directly, distinguishing moralized people-versus-elite rhetoric from ordinary political criticism and separating populist dimensions from host ideology.

## Contributions

- A five-annotator dataset with 8,795 German parliamentary sentences and four overlapping labels.
- A GBERT-large multilabel classifier that learns populist dimensions separately from their ideological attachments.
- Validation through held-out prediction, qualitative examples, expert-survey comparisons, alternative aggregation rules, and selected external examples.

## Method

Open Discourse supplies 32,348 faction-attributed speeches, comprising 1,258,876 sentences from the 18th and 19th Bundestag terms. The initial 2,858-sentence sample balances parties and dictionary-positive versus dictionary-negative cases. Seven subsequent active-learning rounds emphasize ambiguous cases and underrepresented categories.

Coders label anti-elitism and people-centrism independently, requiring moralistic language. Left-wing and right-wing ideology are annotated only when at least one core dimension is present: class-based inclusion and nativist exclusion respectively inform these labels. A label is positive if **any one of the five coders** assigns it, rather than by majority vote. This inclusive target retains minority interpretations but changes what measured agreement with the labels means.

GBERT-large feeds a linear layer with tanh activation and a sigmoid output layer, trained with binary cross-entropy. An 80/20 train/test split and five-fold grid search within training select batch size 8, learning rate 9e-6 with cosine annealing, weight decay 0.01, and three epochs.

For aggregate populism, the authors multiply mean anti-elitism and mean people-centrism scores. They compare this with the mean (Bollen), minimum (Goertz), and thresholded conjunction (Sartori). Aggregating dimensions before combining them does not require both to occur in the same sentence.

## Experiments

### Held-out Classification

Table 2 reports performance against the any-coder labels:

| Dimension | Precision | Recall | F1 |
| --- | ---: | ---: | ---: |
| Anti-elitism | 0.81 | 0.88 | 0.84 |
| People-centrism | 0.70 | 0.73 | 0.71 |
| Left-wing ideology | 0.69 | 0.77 | 0.73 |
| Right-wing ideology | 0.68 | 0.66 | 0.67 |
| Micro average | 0.75 | 0.80 | 0.77 |
| Macro average | 0.72 | 0.76 | 0.74 |

### Substantive Validation

Applied to the full corpus, predicted label frequencies are 7.4% anti-elitism, 2.1% people-centrism, 1.2% left-wing ideology, and 0.5% right-wing ideology. These are model estimates, not independently observed prevalence. AfD leads in anti-elitism and right-wing rhetoric; DIE LINKE leads in left-wing rhetoric.

Across six parties in the 19th term, correlations with CHES and POPPA are respectively 0.872 and 0.830 for anti-elitism, and 0.785 and 0.823 for people-centrism. Alternative aggregation rules yield broadly similar party patterns, though the multiplicative index particularly separates AfD from other parties.

For 17 selected prototypical statements drawn from earlier studies, PopBERT identifies at least one core dimension in 16 (94.1%). The missed example concerns restoring sovereignty, outside the model's specified dimensions. This is a small positive-example check, not a representative external-domain benchmark. Dictionary comparisons illustrate missed contextual expressions but do not constitute a matched comprehensive benchmark.

## Limitations

- Annotator agreement is limited: Fleiss' kappa ranges from 0.244 for people-centrism to 0.410 for anti-elitism. The any-coder rule preserves disagreement through inclusive binary labels rather than modeling individual perspectives.
- Training covers formal German parliamentary speech in a specific period. Generalization to other periods, domains, or languages remains uncertain; the supplied multilingual model is a starting point rather than demonstrated cross-language equivalence.
- Sentence-level annotation supports flexible aggregation but sacrifices context that could reduce coder disagreement.
- Expert-survey correlations use only six parties, and the 17 external examples cannot estimate false-positive rates in a new corpus.
- Supplementary details referenced by the article, including prediction thresholds, are not included in the supplied text.

## Related Concepts

- [[concepts/populism-and-ultranationalism|Populism and Ultranationalism]]: Host-ideology labels distinguish people-versus-elite rhetoric from nativist exclusion; left-wing populism need not involve national exclusion.

## Related Papers

- [[papers/its-all-about-us-vs-them-comparing-chinese-populist-discourses-on-weibo-and-twitter|It's All About US vs THEM!]]: Related library reading on contextual classification of Chinese online populism and its overlap with ultranationalism; not a cited validation study here.
- Bonikowski, Luo, and Stuhler (2022), “Politics as Usual?”: Cited neural measurement of populism in US campaign rhetoric.
- Klamm, Rehbein, and Ponzetto (2023), “Our Kind of People?”: Cited German parliamentary entity-detection approach, distinct from sentence-level dimension classification.
- Jankowski and Huber (2023), “When Correlation Is Not Enough”: Cited critique of using party membership as a proxy training label for populism.

Source: Supplied parsed article text, including Tables 1–2 and Sections 3–6. Ingest job: `cba2d099-8a24-4f46-ae5a-16a2469b0f65`.
