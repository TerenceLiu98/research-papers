---
title: "Stay Tuned: Improving Sentiment Analysis and Stance Detection Using Large Language Models"
type: paper
authors:
  - Max Griswold
  - Michael W. Robbins
  - Michael S. Pollard
year: 2025
doi: "10.1017/pan.2025.10023"
tags:
  - stance-detection
  - text-as-data
  - fine-tuning
---

## TL;DR

Target-aware GPT models outperform lexicon and supervised sentiment baselines on election tweets, especially when a text mentions both candidates. In-target tuning gives the strongest continuous stance results, but GPT-4 Omni few-shot prompting sometimes approaches it without a statistically significant gap. Party-affiliation proxy labels can help transfer learning, particularly for binary stance.

[Article](https://doi.org/10.1017/pan.2025.10023) · [Replication data](https://doi.org/10.7910/DVN/KHNBZL). The supplied text reports online publication on December 17, 2025.

## Research Question

How do model family, tuning data, and prompting affect continuous target-specific stance estimation, particularly when one tweet mentions multiple political candidates?

## Motivation

A tweet can praise one candidate while criticizing another. Overall sentiment therefore need not measure either candidate's stance. Continuous scores also preserve intensity differences that binary labels discard.

## Contributions

- Compares lexicon, supervised transformer, and generative models against both party-based proxies and human-coded stance.
- Separates single-target from dual-target texts to test target disambiguation.
- Compares in-target tuning, cross-dataset proxy tuning, and prompting, including how their ranking changes under binary evaluation.

## Method

Baselines are VADER, NRC EmoLex, SiEBERT, and DeBERTa NLI; generative models are GPT-3.5 Turbo (0125) and GPT-4 Omni (2024-08-06). Prompts request sentiment, target-specific stance, stance with four examples, or a three-stage reasoning-assisted estimate. Temperature is zero, though small output variations remain.

Congressional tweets receive +1 when author and candidate share a party and −1 otherwise. User tweets receive the average of two human coders' scores on [−1, 1]. Models are tuned separately for Biden and Trump. The paper calls training on the evaluation dataset's benchmark “in-target” and transferring from the other dataset “cross-target”; this is not a test of unseen candidate identities.

Congressional data use an 80% tuning / 20% evaluation split, with tuning further split 80/20. For each candidate, 250 single-target user tweets supply 200 training and 50 test examples; another 250 are held out. All 126 dual-target user tweets are evaluation-only. Pearson correlation is the primary continuous metric; binary evaluation uses Matthews correlation. Correlation measures association rather than absolute calibration.

## Experiments

The politician corpus contains 20,442 tweets referencing Biden or Trump from September 20, 2020 to January 21, 2021. User data contain 500 tuning tweets and 626 evaluation tweets. Human coder agreement is ICC 0.85 (95% CI 0.835–0.864); party affiliation correlates 0.87 with human stance in the separate congressional validation sample.

- **Untuned models:** lexicons poorly distinguish stance. VADER's correlation for Biden in dual-target user tweets is −0.10 (95% CI −0.27–0.075). SiEBERT reaches 0.54 (0.45–0.62) for single-target Biden tweets. GPT-4 Omni leads the compared models (Section 6.2).
- **Continuous tuning:** in-target GPT-4 Omni performs best across the reported settings. Both tuning sources improve GPT models, but supervised-model gains are uneven: user-label tuning does not significantly improve the supervised baselines, while party-based transfer improves DeBERTa NLI (Section 6.3).
- **Binary stance:** proxy-based cross-target tuning can outperform in-target tuning for GPT-3.5 and supervised models. GPT-4 Omni's preferred source differs by candidate without significant differences. Proxy-trained outputs are nearly binary, which limits intensity recovery.
- **Prompting:** few-shot and reasoning prompts improve on simpler prompts. GPT-4 Omni sometimes approaches tuned performance, with nonsignificant gaps; generic sentiment prompts perform poorly on dual-target texts (Section 6.4).

## Limitations

Evaluation uses a single split because of tuning costs, with limited repeated runs and no open-source LLM comparison. Results concern short US election tweets and two candidates; the user sampling frame overrepresents high-volume users. Party affiliation is a proxy, not direct observation of expressed stance. Model bias, possible contamination, prompt sensitivity, and unequal candidate performance complicate generalization. Sarcasm and settings with greater annotator disagreement were not systematically tested. The supplied Markdown references supplementary analyses but does not include their full contents.

## Related Concepts

- [[concepts/stance-detection|Stance Detection]]: target-specific opinion measurement, extended here to continuous scores and multiple targets within one text.

## Related Papers

- [[papers/sentiment-is-not-stance-target-aware-opinion-classification-for-political-text-analysis|Sentiment is Not Stance]]: establishes the measurement distinction this study extends through generative models, tuning, and continuous benchmarks.
