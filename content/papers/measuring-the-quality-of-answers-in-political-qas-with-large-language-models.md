---
title: "Measuring the Quality of Answers in Political Q&As with Large Language Models"
type: paper
authors:
  - R. Michael Alvarez
  - Jacob Morrier
year: 2025
doi: "10.1017/pan.2025.10007"
source_job_id: "40f996fb-0493-4a5d-a23a-4845af213071"
tags:
  - political-methodology
  - text-as-data
  - semantic-similarity
  - parliamentary-accountability
---

## TL;DR

The paper measures political answer relevance by how readily an observed answer can be recognized from alternative answers given its question. A fine-tuned Sentence-BERT bi-encoder turns this idea into a cosine-similarity score without quality labels for training. Across 58,343 Canadian parliamentary exchanges from 2006–2021, responses are substantially more relevant than random replies; government backbenchers and ideologically closer parties tend to receive more relevant answers. Relevance is one dimension of answer quality, not a sufficient measure of accountability.

## Research Question

Can self-supervised question–answer matching measure meaningful variation in political answer quality, and how does that variation relate to parliamentary power and party affiliation?

## Motivation

Political Q&As combine oversight with strategic messaging. Detailed manual taxonomies of evasion are expensive to apply at scale. Recognizability supplies a continuous, corpus-based operationalization of relevance while avoiding the need to label training examples for quality.

## Contributions

- Repurposes semantic retrieval as a substantive measurement task: observed-pair similarity becomes an answer-relevance measure.
- Validates the measure against random pairings and 500 manually categorized exchanges.
- Examines party and government-status correlates in five Canadian legislatures, retaining the negative finding for the minority-government hypothesis.

## Method

Two identical Sentence-BERT encoders independently embed questions and answers. Their cosine similarity is the final measurement. The model starts from `multi-qa-mpnet-base-cos-v1` and uses Multiple Negatives Ranking Loss: each observed answer is the positive for its question, while other answers in the batch are negatives. For batch size $K$, the objective is

$$
-\frac{1}{K}\sum_i\log\frac{\exp(\alpha\cos(x_i,y_i))}{\sum_j\exp(\alpha\cos(x_i,y_j))}.
$$

Here $\alpha$ is a fixed scale. The corpus split is 5% training, 1% validation, and 94% inference, sampled randomly without stratification. Hyperparameters are selected using mean reciprocal rank truncated at ten. Human labels are used for validation of the substantive construct, not model training. This is an application of [[concepts/text-embedding-models|Text Embedding Models]], rather than generative answer grading.

## Experiments

The corpus contains 58,343 exchanges from the 39th–43rd Canadian House of Commons legislatures, covering 2006–2021. Official English transcripts include professional translations of French interventions; the study focuses on four parties that held official status during the period.

Observed pairs have a markedly different similarity distribution from randomly paired questions and answers. In a random sample of 500 inference exchanges, manual full, intermediate, and non-reply categories have mean similarities of 0.627, 0.545, and 0.433 respectively. All category differences are reported significant at the 95% confidence level. The overall inference mean is 0.539. These are group averages, not classification thresholds, and even non-replies are generally more relevant than random answers.

Reversing the training direction to use answers as anchors produces scores correlated at 0.959 with the main measure. Pretrained and fine-tuned scores correlate at 0.744; the authors report consistent substantive results with pretrained scores and supplementary robustness checks concerning embedding estimation and backbencher exchanges in training.

Government backbenchers receive substantially more relevant replies than opposition MPs, consistent with friendly, prearranged questions. Third parties generally receive more relevant replies than the official opposition, and perceived ideological proximity also corresponds to higher relevance. Evidence that minority governments provide better answers is mixed and does not confirm the hypothesis: Conservative and Liberal comparisons differ, and the latter overlaps the COVID-19 pandemic. These are observational associations.

## Limitations

Recognizability does not establish factual accuracy, completeness, civility, or new information: repeating a question may score well. Friendly planted questions can yield strong similarity without effective scrutiny. Question framing and endogenous questioning strategies complicate comparisons and preclude causal attribution to party or government status.

Fine-tuning could learn predictable evasion, potentially inflating relevance, although the reported comparisons do not show a general increase in scores. Validation-category averages do not establish accurate individual reply classification. Transfer beyond Canadian Question Period is proposed rather than demonstrated; follow-up questions may require preceding conversational context. Supplementary robustness results are reported by the article but the supplied Markdown does not contain the supplement's detailed analyses.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: reusable sentence representations support observed-pair scoring and contrastive fine-tuning.
- [[concepts/cross-encoders|Cross-Encoders]]: a distinct joint-encoding approach to pairwise text measurement, useful for understanding the architectural alternative rather than a tested baseline here.

## Related Papers

- [[papers/using-cross-encoders-to-measure-the-similarity-of-short-texts-in-political-science|Using Cross-Encoders to Measure the Similarity of Short Texts in Political Science]]: related library work on validating political-text similarity measures; it uses joint pair encoding and different substantive tasks.
- Reimers and Gurevych (2019), “Sentence-BERT: Sentence Embeddings Using Siamese BERT-Networks”: the cited representation-learning foundation.
- Peterson and Spirling (2018), “Classification Accuracy as a Substantive Quantity of Interest: Measuring Polarization in Westminster Systems”: cited precedent for treating predictive performance as a political measurement.

Replication data and code: [Dataverse preservation copy](https://doi.org/10.7910/DVN/MXNQ7F).
