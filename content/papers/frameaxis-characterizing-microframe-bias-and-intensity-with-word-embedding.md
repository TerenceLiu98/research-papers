---
title: "FrameAxis: Characterizing Microframe Bias and Intensity with Word Embedding"
type: paper
authors:
  - Haewoon Kwak
  - Jisun An
  - Elise Jing
  - Yong-Yeol Ahn
year: null
tags:
  - computational-framing
  - text-as-data
  - word-embeddings
  - political-communication
---

## TL;DR

FrameAxis characterizes text along antonym-defined semantic axes, separating average direction (microframe bias) from strength of use (microframe intensity). Using 1,621 axes, it recovers interpretable sentiment and aspect distinctions in restaurant reviews and explores partisan patterns in news headlines. Human raters prefer its selected axes to random alternatives in 87.5% of bias comparisons and 75.0% of intensity comparisons. The method supports exploratory framing analysis; embedding stereotypes and missing sentence context constrain interpretation.

## Research Question

Can an unsupervised, interpretable method identify which semantic perspectives a corpus emphasizes and which side of each perspective it favors, without requiring annotated frames?

## Motivation

Framing studies often require expert codebooks and close reading, while computational approaches can depend on a small inventory of predefined categories. Antonym axes offer a larger, reusable vocabulary for exploring text. Separating direction from intensity also distinguishes a corpus that strongly invokes both poles from one that scarcely invokes either, even when their average directions are similar.

## Contributions

- Defines [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]] using frequency-weighted word similarities to semantic axes.
- Combines predefined or expert-selected axes with bootstrap comparisons and topic-relevance ranking.
- Explains aggregate measurements through word contribution diagrams and document-level spectra.
- Demonstrates the approach on aspect-labeled restaurant reviews and political news headlines, with a human comparison against random microframe sets.

## Method

### Axes and aggregation

The authors extract 1,828 adjective antonym pairs from WordNet and retain 1,621 whose poles occur in the 300-dimensional GloVe model trained on 840 billion tokens. For pole words $w^+$ and $w^-$, an axis and a word's contribution are (Methods, Equations 1-3):

$$
v_f=v_{w^+}-v_{w^-},\qquad
c_f^w=\frac{v_w\cdot v_f}{\|v_w\|\|v_f\|}.
$$

With word counts $n_w$ in target text $t$ and background corpus $T$:

$$
B_f^t=\frac{\sum_{w\in t}n_wc_f^w}{\sum_{w\in t}n_w},\qquad
I_f^t=\frac{\sum_{w\in t}n_w(c_f^w-B_f^T)^2}{\sum_{w\in t}n_w}.
$$

Intensity is a second moment around the **background** mean, rather than the target text's own variance. Words far from that baseline can increase intensity on either side of an axis. The authors manually exclude non-informative topic terms, such as restaurant aspect names or news issue labels, when embedding associations would distort the measurements.

### Selection and explanation

The procedure compares a target corpus with 1,000 bootstrap samples of equal size from the full corpus, using two-tailed tests at $p=0.05$. Significant axes are ranked by the absolute difference between the observed statistic and the bootstrap mean; this reported effect size is unstandardized.

Topic relevance can instead be ranked before examining target texts: average the cosine similarities between topic words and both poles, or score template sentences with a pretrained OpenAI GPT model. For the latter approach, the lower perplexity of singular/plural templates is retained for each pole, and the two pole scores are summed. Word-level explanations decompose bias and intensity into frequency-weighted contributions and compare them with a background corpus. Document spectra show heterogeneity hidden by corpus averages.

## Experiments

### Restaurant reviews

SemEval-2014 Task 4 supplies positive and negative reviews grouped by food, service, price, and ambience. High-intensity axes include savory/unsavory for food and hospitable/inhospitable for service, with bias directions aligning with sentiment labels. The bad/good axis has an average rank of 1.5 for positive-negative bias separation across aspects, whereas irreligious/religious ranks 1,298.8 (Figure 3).

In the MTurk evaluation, 15 workers per aspect-sentiment pair choose between the ten selected significant axes and ten random axes. The reported accuracy measures preference for the selected set, not document classification accuracy (Table 1):

| Review group | Bias selection | Intensity selection |
| --- | --- | --- |
| Positive service | 1.000 | 0.867 |
| Positive price | 0.867 | 0.733 |
| Positive food | 0.933 | 0.800 |
| Positive ambience | 1.000 | 0.600 |
| Negative service | 0.867 | 0.867 |
| Negative price | 0.667 | 0.667 |
| Negative food | 0.867 | 0.733 |
| Negative ambience | 0.800 | 0.733 |
| Average | 0.875 | 0.750 |

The authors attribute some intensity errors to easily interpreted generic axes appearing in random sets. A comparison with log odds ratios illustrates that FrameAxis produces axis-specific word explanations; it does not establish superior predictive accuracy over that baseline.

### Political headlines

The paper reports 50,073 AllSides headlines from 572 media sources. In the immigration analysis, outlets with fewer than 20 relevant headlines are filtered out. Conservative outlets lean more toward illegal and use the illegal/legal axis more intensely than liberal outlets (Figure 5). In gun-related headlines, liberal outlets show greater intensity and a stronger tilt toward tense on the relaxed/tense axis. Party coverage tilts toward good and rational for ideologically aligned parties, with higher intensity when highlighting negative perspectives (Figure 6).

Topic relevance does not guarantee group separation: the four most relevant abortion axes show no statistically significant liberal-conservative difference in average bias ($p>0.1$; Figure 7).

## Limitations

- Static embeddings can supply stereotyped associations that look like corpus framing. The paper's GloVe example places immigrant closer to illegal than legal. Iterative word inspection and exclusion require human judgment and do not guarantee complete removal of such effects.
- Bag-of-words aggregation misses negation and composition: a negative sentence about absent ambience is scored toward beautiful. A Sentence Transformers example reverses that ordering, but is a proof of concept rather than a systematic replacement evaluation.
- Microframes need not correspond directly to expert-defined rhetorical frames. Textual direction and intensity do not by themselves establish persuasion or other audience effects.
- Human evaluation compares selected sets with random alternatives; the political examples demonstrate descriptive plausibility rather than gold-standard framing recovery. The described bootstrap procedure does not report a multiple-testing correction across the 1,621 axes.

## Related Concepts

- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: the central distinction between semantic direction and emphasis.
- [[concepts/text-embedding-models|Text Embedding Models]]: vector geometry supplies semantic associations beyond exact pole-word matches.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: audience responses are a separate research target from measuring textual framing.
- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: the paper motivates antonym axes partly through established moral dimensions.

## Related Papers

- An, Kwak, and Ahn (2018), "SemAxis: A lightweight framework to characterize domain-specific word semantics beyond sentiment": the cited semantic-axis foundation extended to corpus bias and intensity.
- Kozlowski, Taddy, and Evans (2019), "The geometry of culture: Analyzing the meanings of class through word embeddings": cited use of embedding geometry to study cultural meanings.
- [[papers/political-text-scaling-meets-computational-semantics|Political Text Scaling Meets Computational Semantics]]: a related library paper using semantic representations to scale political documents; FrameAxis instead measures text on specified antonym axes. This is a methodological comparison, not a claimed citation in the supplied paper.

Source: supplied parsed manuscript, Cognitio job `64312380-3e0b-4b5d-9e06-17bb23d4bb35`. Publication year, venue, and stable paper identifier are not stated in the supplied text; the year is left unknown.

[[index|Library home]]
