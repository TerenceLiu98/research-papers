---
title: "Ideology Prediction of German Political Texts"
type: paper
authors:
  - Sinclair Schneider
  - Florian Steuber
  - Joao A. G. Schneider
  - Gabi Dreo Rodosek
year: 2026
source_job_id: "48b49edf-2115-429e-8cd6-41ac102a179d"
tags:
  - political-text-scaling
  - german-nlp
  - political-ideology
  - domain-generalization
  - transformers
---

## TL;DR

The paper maps German political text to a continuous score from -1 (left) to 1 (right) by converting six-party multilabel probabilities into a weighted sum of party vectors. Models are trained on Bundestag and Wahl-O-Mat statements and evaluated in domain and on separate newspaper and politician-tweet corpora. DeBERTa-large has the highest reported in-domain F1 (0.844) and reaches 0.864 party-origin accuracy for tweets longer than 100 words; Gemma-2-2B has the lowest post-optimization newspaper MAE (0.172). These results support the usefulness of domain-specific data and compact encoders, but newspaper labels are outlet-level proxies, the same newspaper corpus guides vector optimization and its reported post-optimization evaluation, and a single left-right axis collapses substantively different political motives.

## Research Question

Can a transformer classifier trained on German party agreement data place political texts on a continuous, locally grounded left-right scale and retain useful performance when applied to different text genres such as news articles and politicians' tweets?

## Motivation

Categorical labels such as left, center, and right cannot express distances within a category and depend on a fixed class scheme. Existing English-language resources also do not directly encode the German party system. The paper therefore combines supervised party classification with [[concepts/text-scaling-models|Text Scaling Models]]: party-specific agreement probabilities are geometrically aggregated into a scalar position whose anchors are derived from German party responses.

## Contributions

- Introduces a geometric conversion from six-party multilabel outputs to a continuous score on $[-1,1]$.
- Builds training data from Bundestag speeches and interruptions plus official Wahl-O-Mat party responses, with synthetic paraphrases intended to increase linguistic variation.
- Compares 13 encoder- and decoder-based transformers ranging from 210 million to 9 billion parameters.
- Evaluates genre transfer on approximately 10 million articles from 33 German news outlets and 535,200 tweets from 597 members of the 20th and 21st Bundestag.
- Reports that architecture and domain-specific training data can matter more than parameter count in this setting.

## Method

### Data and labels

The Bundestag source contains 34,174 speeches from October 2017 through September 2024. Speeches with recorded interruptions are retained, and interruption sentiment supplies party agreement or disagreement labels, producing 32,246 annotated statements. Five generated rewrites per text at different registers expand this source to 449,209 statements.

Wahl-O-Mat contributes 1,751 statements from elections between 1998 and 2021 with official party responses coded as approval, neutrality, or rejection. The same enrichment procedure expands it to 87,210 labeled statements. The combined Bundestag and Wahl-O-Mat training resource contains 570,416 samples. For the enriched Wahl-O-Mat text, the paper reports mean cosine similarity of 0.74 to the original and a fifth percentile of 0.54 using Qwen3-Embedding-8B; similarity is evidence of semantic proximity, not a direct test that ideological framing is unchanged.

A separate DeBERTa classifier filters political from nonpolitical newspaper content at a probability threshold of 0.8. It is trained on 234,978 balanced newspaper texts and has reported test F1 of 0.99, with anticipated degradation outside that domain.

### Party probabilities and continuous scaling

Thirteen models are fine-tuned for four epochs to predict agreement with any of six parties: Die Linke, Bündnis 90/Die Grünen, SPD, FDP, CDU/CSU, and AfD. The conversion fixes Die Linke at $-90^\circ$, FDP at $0^\circ$, and AfD at $90^\circ$. Positions for the Greens, SPD, and CDU are determined from pairwise distances in Wahl-O-Mat responses, where identical, neutral-versus-directional, and opposed answers receive distances 0, 0.5, and 1. The resulting angles are $-65.2^\circ$, $-53.9^\circ$, and $37.9^\circ$.

Each angle defines a unit vector $v_i=(\sin\theta_i,\cos\theta_i)$. For predicted party probabilities $p_i$, the method computes

$$
v_{\mathrm{res}}=\sum_i p_i v_i
$$

and rescales the angle of $v_{\mathrm{res}}$ from the semicircle to $[-1,1]$. This is a supervised aggregation of party affinity, not a latent position recovered independently of the chosen parties and anchors. It also differs from [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]], which asks an instruction-tuned model to return a position directly.

### Newspaper-guided adjustment

Article scores are averaged within each outlet and compared with survey-based outlet ratings. The authors then optimize the four non-extreme party vectors against newspaper MAE while limiting each displacement to 0.25; the Linke and AfD endpoints remain fixed. This improves fit but makes the post-optimization newspaper errors in-sample with respect to this adjustment. The newspaper corpus is therefore an independent domain for the pretrained classifiers, but not a fully held-out test for the final optimized vectors.

## Experiments

### In-domain classification

The held-out 20% portions of the Bundestag and Wahl-O-Mat data evaluate party multilabel classification. DeBERTa-large (435M parameters) records the best reported F1, 0.844. Gemma-2-9B and EuroBERT-610M follow at about 0.82 and 0.79, respectively. Training time ranges from roughly nine hours for several encoder models to more than seven days for Gemma-2-2B under different GPU configurations, so runtime is not a controlled architecture comparison.

### Newspaper transfer

For 33 outlets, the benchmark is an outlet-level audience survey transformed to the $[-1,1]$ scale. Gemma-2-2B has the best post-optimization result, MAE 0.172 and MSE 0.043; Gemma-2-9B also has MAE 0.172 and MSE 0.043. DeBERTa-large reaches MAE 0.182. Across all 13 models, constrained vector optimization reduces error on average, with reported paired standardized effects of 0.37 for MAE and 0.36 for MSE. Because optimization targets these same outlets, the improvement does not establish transfer to unseen newspapers.

### Tweet transfer

The tweet corpus is balanced at 89,200 posts for each of the six parties, and party membership of the author supplies the label. The evaluation bins tweets by length and asks which party vector is nearest to the aggregate prediction. Accuracy generally rises with available text: the best reported performance is 0.864 for DeBERTa-large on tweets longer than 100 words. This evaluates party-origin prediction, not direct agreement with human ideology judgments, and author affiliation can differ from the stance of an individual tweet.

### Model size

The reported correlation between parameter count and newspaper error is weak, around -0.25. The 435M-parameter DeBERTa model leads in-domain and performs strongly on tweets, while the 2B Gemma model leads on the newspaper metric. The experiments consequently do not support model size alone as a reliable selection rule.

## Limitations

- The output is constrained to one left-right dimension. The paper's own party correlations show that Die Linke and AfD can agree on policies for different reasons, illustrating the loss described by [[concepts/ideological-dimensionality|Ideological Dimensionality]].
- Party anchors bound the measurable range: positions beyond Die Linke or AfD cannot be distinguished, and changing party systems or political realignment requires new data and recalibration.
- Synthetic rewrites may alter political framing. Embedding similarity checks semantic overlap but do not establish label preservation or absence of ideological bias.
- Newspaper ground truth is assigned at outlet level, although the classifier acts on articles. Aggregation cannot show that any individual article has the outlet's average orientation.
- The final party-vector adjustment and its reported post-optimization newspaper metric use the same 33 outlets, leaving its generalization to unseen publishers untested.
- Tweet labels use author party rather than hand-coded textual stance. Short texts, quotations, irony, and statements requiring background knowledge remain difficult; the paper gives examples where quoted content or a historical slogan is misclassified.
- The classifier provides no rationale and may fail on novel political principles absent from its training data. The authors advise against using individual predictions to block content or discriminate among people.
- The linguistic and political setting is German. Translation or deployment in another country would not preserve the meaning of the scale without local adaptation and validation.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- [[papers/multilingual-estimation-of-political-party-positioning|Multilingual estimation of political-party positioning: From label aggregation to long-input Transformers]]: also converts supervised statement labels into continuous party positions, but uses Manifesto Project categories and evaluates cross-country and temporal transfer.
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: estimates political positions by direct prompting and validates against expert, crowd, and roll-call benchmarks.
- [[papers/political-text-scaling-meets-computational-semantics|Political Text Scaling Meets Computational Semantics]]: uses semantic document similarities and graph scaling rather than party multilabel probabilities.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: situates classification, embedding, count, topic, and prompted approaches within a common measurement framework.

The supplied manuscript provides code and dataset links but no stable identifier for the paper itself. The Bundestag/Wahl-O-Mat dataset is identified as `10.57967/hf/4924` in the manuscript.

[[index|Library home]]
