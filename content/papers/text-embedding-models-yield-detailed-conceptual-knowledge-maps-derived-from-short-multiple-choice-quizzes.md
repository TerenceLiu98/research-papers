---
title: Text embedding models yield detailed conceptual knowledge maps derived from short multiple-choice quizzes
type: paper
authors:
  - Paxton C. Fitzpatrick
  - Andrew C. Heusser
  - Jeremy R. Manning
year: 2026
doi: 10.1038/s41467-026-69746-w
source_job_id: 3c1cc0ff-bc55-4047-bf51-d7d3c3555d85
tags:
  - educational-assessment
  - text-embeddings
  - conceptual-learning
---

## TL;DR

A lecture-trained topic model turns short quiz responses into spatial estimates of conceptual knowledge. In 50 undergraduates, similarity-weighted responses predict success on other questions and reveal content-specific learning after two videos. The detailed maps are interpolated estimates, not direct measurements of every represented concept.

## Research Question

Can the semantic geometry of lecture transcripts and quiz questions reveal what learners know, beyond an overall quiz score, and track changes after instruction?

## Motivation

Identical scores can conceal different conceptual gaps. [[concepts/text-embedding-models|Text Embedding Models]] provide a shared coordinate system for course content and assessment items without manually labeling every concept.

## Contributions

- Aligns individual questions with specific moments in lecture transcripts using latent topic vectors.
- Estimates knowledge along lecture trajectories from a few quiz responses and tests its association with held-out question correctness.
- Visualizes knowledge and changes in knowledge over a continuous conceptual space.

## Method

Latent Dirichlet allocation is trained only on overlapping windows from the two automated lecture transcripts; quiz questions are subsequently projected into that space. Windows contain up to 30 caption lines, averaging 62.22 seconds and 73.8 words after preprocessing. The main model uses 15 topics, and lecture trajectories are interpolated to one vector per second.

Knowledge at a coordinate is the weighted proportion of correctly answered questions, with weights given by correlations between topic vectors rescaled to [0, 1]. For lecture traces, the scaling uses the minimum and maximum correlations across the relevant lecture timepoints and quiz questions (Eqs. 1–2).

Question-level analyses exclude the target response from the knowledge estimate, then fit logistic generalized linear mixed models accounting for participant and question variation. All-question and within-lecture analyses rebalance the remaining responses to remove the mechanical dependence between target correctness and the remaining proportion correct. Nested-model comparisons use 10,000 parametric bootstrap replicates. This is a held-out-response association test, not an independently evaluated deployment classifier.

Visualization uses a separate 100-topic model, log-transformed topic vectors, UMAP, and a 100 × 100 grid. Radial-basis weighting with smoothing parameter 50 produces knowledge maps; pointwise differences produce learning maps. The main statistical analyses remain in the original 15-dimensional space.

## Experiments

Fifty Dartmouth undergraduates watched Khan Academy's *Four Fundamental Forces* and *Birth of Stars*, in that order. Three quizzes occurred before, between, and after the videos. Each contained five questions per lecture and three general physics questions. All 39 questions appeared once per participant, with randomized quiz assignment and question/answer order.

| Analysis | Reported result |
| --- | --- |
| All other questions predict target correctness | Odds ratios 8.126, 14.902, and 37.409 for Quizzes 1–3; all bootstrap p < 0.001. |
| Within-lecture prediction | Significant in five of six lecture-by-quiz comparisons; Four Fundamental Forces on Quiz 3 was not significant (OR 2.485, p = 0.170). |
| Across-lecture prediction | Not significant on Quizzes 1–2; significant after both lectures on Quiz 3 (OR 11.294, p < 0.001; OR 7.302, p = 0.038). |
| Content-specific learning | Forces knowledge increased after the first video; star-formation knowledge increased after the second. |

Odds ratios compare estimated knowledge of 1 versus 0, not classification accuracy. The authors attribute the nonsignificant final within-forces comparison partly to ceiling effects. Distance-based analyses support gradually changing correctness across nearby coordinates, with no apparent change in the spatial falloff across quizzes.

Supplementary comparisons described in the main text find that BERT embeddings and Jaccard word overlap distinguish this narrow lecture content less effectively than the specialized LDA representation. This does not establish a general advantage over transformer embeddings.

## Limitations

- Evidence comes from 50 students and two introductory physics-related videos; broader domain and population transfer remain untested.
- Smoothness is a modeling assumption supported within the sampled region. Dense maps do not supply independent observations at untested coordinates.
- Topic vectors do not explicitly represent prerequisite dependencies, causality, or knowledge graphs.
- The 2D visualization uses a different topic count and geometry from the inferential analyses.
- Personalized tutoring and improved educational outcomes are proposed applications, not evaluated interventions.
- The supplied Methods text mentions 15 questions per quiz in the smoothness procedure, whereas the design and Fig. 1 specify 13. The design summary above follows the latter.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: semantic geometry supplies the weights connecting observed responses to untested content.

## Related Papers

- Heusser, Fitzpatrick, and Manning (2021), *Geometric models reveal behavioral and neural signatures of transforming experiences into memories*: cited methodological predecessor for embedding naturalistic content trajectories.
- [[papers/modeling-item-response-theory-with-stochastic-variational-inference|Modeling Item Response Theory with Stochastic Variational Inference]]: a library comparison using latent abilities and item parameters for response prediction, rather than transcript-derived conceptual geometry; not a cited comparison in this paper.

Source: [Nature Communications](https://doi.org/10.1038/s41467-026-69746-w). Data and code archive: [Zenodo](https://doi.org/10.5281/zenodo.17783435).
