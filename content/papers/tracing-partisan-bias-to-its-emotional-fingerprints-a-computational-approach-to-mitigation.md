---
title: "Tracing Partisan Bias to Its Emotional Fingerprints: A Computational Approach to Mitigation"
type: paper
authors:
  - Junjie Liu
  - Xi Luo
  - Sirong Wu
  - Gengchen Sun
  - Yuhui Deng
year: null
tags:
  - media-bias
  - multi-document-summarization
  - affective-computing
  - llm-evaluation
---

## TL;DR

This paper treats partisan framing as a measurable emotional pattern rather than only a left-right label. It uses the [[concepts/valence-arousal-dominance-model|Valence-Arousal-Dominance Model]] to characterize language in left-, centre-, and right-leaning AllSides articles, then trains NeutraSum, a BART-based multi-document summarizer with equal-distance and contrastive losses intended to suppress polarized representations. NeutraSum reports competitive content-preservation scores and the lowest emotional scores among the evaluated systems, but its evidence is limited by a U.S.-centric dataset, an unstable [[concepts/llm-as-a-judge|LLM-as-a-Judge]] metric, and a political-compass test that measures general model disposition rather than summary-specific bias.

## Research Question

Can partisan bias in news be identified through its emotional language and mitigated by training a multi-document summarizer to remain equidistant from polarized representations while aligning with expert-written summaries?

## Motivation

Prior neutral-news summarization methods often operationalize neutrality through centre-labelled sources, title neutralization, or polarity regularization. The authors argue that centre-labelled reporting is not necessarily bias-free and that one-dimensional polarity misses distinctions such as anger and sadness, which can share negative valence but differ in arousal. They therefore model partisan framing through valence, arousal, and dominance and use those dimensions both to diagnose source language and evaluate generated summaries.

## Contributions

- Applies the three-dimensional [[concepts/valence-arousal-dominance-model|VAD model]] to emotional language extracted from partisan news and reports statistically different negative-emotion profiles across political leanings.
- Introduces NeutraSum, a BART-based multi-document summarizer trained with standard generation loss, an equal-distance loss, and a contrastive loss.
- Proposes an explainable evaluation pipeline in which a language model identifies a summary's topic, attitude, rationale, and stance-bearing words before a VAD lexicon scores the selected vocabulary.
- Evaluates content preservation, emotional-language scores, general political disposition, and ablations of the two neutrality losses.

## Method

NeutraSum concatenates same-event left-, centre-, and right-leaning articles and learns to generate an expert-written summary with cross-entropy loss. An auxiliary dataset supplies polarized left and right articles. The equal-distance loss minimizes the absolute difference between the generated-summary representation's cosine similarity to averaged left and right representations, placing it near their semantic bisector. The contrastive NT-Xent loss treats the generated-summary representation as an anchor, the expert summary as a positive, and polarized auxiliary articles as negatives. The final objective gives the three losses equal weight.

For evaluation, a four-step prompting pipeline asks Llama 3.1-8B-Instruct to identify the main topic or character, its depicted attitude, reasons for that attitude, stance-bearing vocabulary, and political leaning. The extracted vocabulary is scored with a VAD lexicon; words with valence above 0.65 or below 0.35 are also aggregated separately. A Political Compass Test provides a distinct macro-level diagnostic of the fine-tuned model's general ideological disposition. ROUGE and BLEU compare generated and expert summaries for content preservation.

## Experiments

The manuscript prose says the primary AllSides data contain 3,464 same-event triplets and expert summaries, but Table II reports 3,951 articles for each political leaning: 3,160 training, 395 validation, and 396 test articles per leaning. The two counts are not reconciled in the supplied text. Polarized articles from a separate auxiliary dataset support the neutrality losses. Training uses BART-large models, learning rates of $3\times10^{-5}$ and $2\times10^{-5}$, output lengths from 100 to 250 tokens, and one NVIDIA 4090 GPU.

The source-language analysis finds no significant group differences for positive-emotion metrics, but reports differences for negative valence ($p=0.011$), negative arousal ($p=0.007$), and negative dominance ($p=0.010$). A Tukey test finds higher overall arousal for left versus centre articles ($p=0.032$); other pairwise comparisons are not significant.

Against LexRank, BARTCNN, PEGASUSMULTI, BARTMULTI, NEUSFT, and NEUS-TITLE, NeutraSum reports BLEU 11.99, ROUGE-1 recall 52.91%, ROUGE-2 recall 27.87%, and ROUGE-L recall 48.08%. These scores are strong but not best on every metric: all-source input has higher ROUGE scores, LexRank has BLEU 12.21, and the loss-weight setting 0.2:0.5:0.3 reaches BLEU 12.24 and ROUGE-L 49.24% in the appendix.

On the proposed emotional metric, NeutraSum reports VAD totals of 2.88, 1.72, and 1.95, lower than the listed model baselines but above the expert summary's 2.34, 1.48, and 1.58. Its Political Compass coordinate is $(-0.38, 2.41)$. Removing contrastive loss changes it to $(0.42, 2.61)$; removing equal-distance loss changes it to $(0.38, 2.51)$. Because the ablation variants remain close on summary metrics and differ modestly on emotional scores, the evidence supports the joint objective's reported balance more clearly than an isolated causal contribution from either loss.

## Limitations

- AllSides centers U.S. political topics, limiting cross-cultural and multilingual generalization.
- The LLM-based evaluator can inherit bias and instability. Its selected stance words make the score inspectable, but do not make it a definitive measure of political neutrality.
- The Political Compass Test measures responses to general propositions, not bias in a particular generated summary.
- Equidistance from left and right representations does not by itself establish factual accuracy, neutrality, or freedom from subtler tonal framing; centre-labelled content is also acknowledged to contain bias.
- The paper focuses on semantic and lexical neutrality and may miss rhetorical structure, omissions, factual selection, and other framing mechanisms.
- The supplied manuscript does not report repeated-run uncertainty, human evaluation of summary neutrality, or cross-dataset testing.
- The dataset prose and Table II report inconsistent sample counts, and the supplied text does not explain the discrepancy.

## Related Concepts

- [[concepts/valence-arousal-dominance-model|Valence-Arousal-Dominance Model]]: supplies the three affective dimensions used to define and score emotional fingerprints.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: describes the evaluation pattern and its reliability risks.
- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: a related embedding-based approach that separates semantic direction from strength in framed language.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: distinguishes textual framing measurements from evidence about audience effects.

## Related Papers

- [[papers/frameaxis-characterizing-microframe-bias-and-intensity-with-word-embedding|FrameAxis: Characterizing Microframe Bias and Intensity with Word Embedding]]: measures directional and intensity differences in political text along semantic axes; NeutraSum instead uses VAD scores and trains a neutralizing summarizer.
- Lee et al. (2022), "NeuS: Neutral Multi-News Summarisation for Mitigating Framing Bias": supplies the AllSides task and a title-neutralization baseline extended here.
- Bang, Lee, and Fung (2023), "Mitigating Framing Bias with Polarity Minimisation Loss": provides a polarity-based mitigation approach contrasted with the paper's multidimensional affective account.
- Mohammad (2018), "Obtaining Reliable Human Ratings of Valence, Arousal, and Dominance for 20,000 English Words": supplies the affective lexicon underlying the emotional metric.

Source: supplied parsed manuscript, Cognitio job `c006f1ed-bfdd-4032-a33f-fe5a62dd10c9`. Publication year, venue, and stable paper identifier are not stated in the supplied text; the year is left unknown.

[[index|Library home]]
