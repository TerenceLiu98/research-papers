---
title: "Sentiment is Not Stance: Target-Aware Opinion Classification for Political Text Analysis"
type: paper
authors:
  - Samuel E. Bestvater
  - Burt L. Monroe
year: 2023
doi: "10.1017/pan.2022.10"
tags:
  - political-methodology
  - stance-detection
  - text-as-data
---

## TL;DR

Overall textual positivity is an unreliable proxy for approval of a political target. Across three US political corpora, training classifiers on target-specific stance improves measurement and better recovers ideology–opinion associations than sentiment scoring, even when the sentiment model itself is accurate.

Published in *Political Analysis* 31, 235–256 (2023); first published online April 22, 2022. [Article](https://doi.org/10.1017/pan.2022.10). [Replication materials](https://doi.org/10.7910/DVN/MUYYG4).

## Research Question

When does treating sentiment as stance distort political opinion measurement and downstream statistical inference? Can more sophisticated sentiment classifiers overcome this conceptual mismatch?

## Motivation

Support for a protest can be expressed through anger at its opponents, and opposition can be expressed through satisfaction with the status quo. Topic relevance therefore does not establish that a document's overall polarity measures its position toward that topic.

## Contributions

- Distinguishes general sentiment from target-dependent stance for political text analysis.
- Separates model sophistication from label validity by training SVM and BERT classifiers on both sentiment and stance.
- Demonstrates downstream attenuation of ideology–approval associations when sentiment substitutes for stance.

## Method

The Women’s March replication compares VADER sentiment with a stance-trained BERT classifier. Two further studies compare Lexicoder and VADER dictionaries with SVM and BERT models separately trained on sentiment and stance labels. SVM uses TF-IDF unigram features; BERT uses contextual representations with casefolding. Fivefold cross-validation evaluates mean F1 in the latter studies.

Logistic regressions then relate measured approval to ideology. Survey ideology is self-reported; Twitter ideology uses follower-based Bayesian [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]. Human-coded stance or survey approval supplies a comparison outcome.

## Experiments

- **Women’s March:** 20,000 tweets were sampled for annotation; Table 1 contains 19,612 classified examples, with sentiment–stance correlation 0.44. Stance-trained BERT achieves held-out F1 0.853. Ideology coefficients are −0.35 using VADER, −0.76 using BERT stance, and −1.87 using human stance (Table 2). Sentiment understates support expressed through negative language.
- **Trump survey responses:** nine Mood of the Nation waves yield 7,146 Trump-mentioning responses from 35,842 documents. Sentiment labels derive from proud/hopeful versus angry/worried prompts; stance labels derive from respondent approval answers. Label correlation is 0.51.
- **Kavanaugh confirmation:** 3,660 labeled tweets have sentiment–stance correlation 0.03. Negative language occurs on both sides of the controversy.

Mean stance-prediction F1 (Tables 4 and 7):

| Classifier | Trump responses | Kavanaugh tweets |
|---|---:|---:|
| Lexicoder | 0.633 | 0.572 |
| VADER | 0.620 | 0.514 |
| Sentiment-trained SVM | 0.723 | 0.514 |
| Sentiment-trained BERT | 0.724 | 0.582 |
| Stance-trained SVM | 0.817 | 0.935 |
| Stance-trained BERT | 0.854 | 0.938 |

On Kavanaugh tweets, sentiment-trained BERT achieves sentiment F1 0.954 but stance F1 only 0.582. Its downstream ideology coefficient is −0.005, versus 1.37 for stance-trained BERT and 2.16 for human-coded stance (Table 8). For Trump, corresponding coefficients are 0.41, 0.99, and 2.20 (Table 5). Better sentiment recognition does not resolve an incorrectly specified measurement target.

## Limitations

The demonstrations concern three US political cases, not all text domains. Sentiment can be an appropriate outcome when tone itself is the quantity of interest. Survey labels use question framing and respondent approval rather than independent document-level annotation. Dictionary models can omit unscored documents, so regression sample sizes differ. Even stance-trained models understate the benchmark associations; target-aware labels improve validity without eliminating measurement error. These regressions demonstrate associations rather than causal effects of ideology.

## Related Concepts

- [[concepts/stance-detection|Stance Detection]]: the central target-aware classification task.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: supplies the Twitter authors’ ideology measures.

## Related Papers

- Felmlee et al. (2020), “The Geography of Sentiment Towards the Women's March of 2017”: the replication target, whose sentiment-based support interpretation is reassessed.
- Küçük and Can (2020), “Stance Detection: A Survey”: situates stance classification as a distinct NLP task.
- Mohammad et al. (2016), “SemEval-2016 Task 6: Detecting Stance in Tweets”: an antecedent for target-specific stance evaluation.
