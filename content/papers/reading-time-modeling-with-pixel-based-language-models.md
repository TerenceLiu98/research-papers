---
title: "Reading Time Modeling with Pixel-Based Language Models"
type: paper
authors:
  - Junlin Li
  - Sara Alhajeri
  - Tatsuki Kuribayashi
year: null
source_job_id: "2455932f-d1eb-4507-a88f-a5e83a3b1c68"
tags:
  - pixel-language-models
  - computational-psycholinguistics
  - reading-time-modeling
  - eye-tracking
  - tokenization-free-models
---

## TL;DR

This paper uses [[concepts/pixel-language-models|Pixel Language Models]] to estimate visual word prediction difficulty from masked text-image patches, with blurred future context as an approximation to parafoveal vision. Across eye-movement data from 459 readers in eight languages, pixel-space predictors add information beyond token-level surprisal and entropy. They are generally weaker than token predictors for fixation duration when used alone, but are comparable or stronger for word skipping in Persian, Korean, and Chinese; joint models usually predict reading behavior better than either modality alone.

## Research Question

Can tokenization-free prediction in pixel space explain human reading times and word-skipping behavior, either independently of or complementarily to token-level surprisal, across languages and writing systems?

## Motivation

Language-model surprisal is widely used to test expectation-based accounts of reading, but its value depends on a tokenizer and vocabulary that were not designed as cognitive models. Subword boundaries can shift probability costs between words, and token identities omit visual and orthographic information available to readers. Pixel models render text directly, making glyph form, layout, and partially visible future text available to a predictive model. The paper tests whether this representation offers a useful bottom-up counterpart to token-level lexical prediction.

## Contributions

- Introduces pixel-based language models into computational cognitive modeling of naturalistic reading.
- Defines visual word prediction difficulty (VWPD) by masking a target word's image patches and aggregating their reconstruction error, measured with mean squared error or structural similarity.
- Models parafoveal information by Gaussian-blurring future context while retaining the unblurred preceding context.
- Compares pixel-space difficulty and entropy with monolingual GPT-2, multilingual GPT, and BERT predictors across Latin, Perso-Arabic, Hangul, and Hanzi writing systems.
- Shows that visual and token-level prediction measures contribute complementary psychometric information, with especially strong visual predictors of skipping in several non-Latin scripts.

## Method

The approach renders each sentence as an image and divides it into patches processed by PIXEL-M4, a masked-autoencoder-style visual Transformer. For each target word, the method masks its patches one at a time and sums reconstruction errors over the word span. The primary VWPD measure uses one minus structural similarity for most languages and mean squared error for Simplified and Traditional Chinese, following a preliminary comparison. A related visual-entropy measure treats reconstructed pixel intensities as black-versus-white probabilities.

To reduce the mismatch between bidirectional masked pretraining and incremental reading, the main `pixel_uni` condition retains preceding patches but applies Gaussian blur to future context. An unblurred condition tests the contribution of that approximation. PIXEL-M4 is used directly for English and Chinese and fine-tuned on 100,000 C4 examples for the other languages. Token baselines use surprisal or entropy from language-specific GPT-2 and BERT models and from mGPT.

Generalized additive mixed models predict first-fixation duration, first-pass reading time, total reading time, first-pass skipping, and overall skipping. Controls include current and previous word length and frequency, sentence position, subject-level slopes, and stimulus intercepts. Psychometric predictive power is the log-likelihood gain over a matched baseline; the study estimates uncertainty with 100 crossed random-effects bootstrap runs and checks the main patterns with 10-fold cross-validation.

## Experiments

The evaluation combines MECO Wave 1 and Wave 2 with the Persian Sentence Reading corpus. It covers German, English, Spanish, Persian, Korean, Simplified Chinese, Traditional Chinese, and Turkish, totaling 459 readers. The writing systems include Latin script, Perso-Arabic abjad, Hangul, and Hanzi.

For fixation and reading-time measures, VWPD alone is generally less predictive than token-level surprisal. Adding VWPD to GPT-2 surprisal, however, substantially improves psychometric predictive power, indicating that visual reconstruction difficulty captures information not represented by token prediction. Interaction models sometimes improve first-pass measures further, particularly in German, Spanish, and Turkish. Exploratory analyses suggest that high lexical surprisal can weaken or reverse the VWPD relationship with first-fixation duration while strengthening its relationship with refixation, but the paper presents this as an interpretation rather than a confirmed processing mechanism.

For first-pass and overall skipping, pixel predictors are comparable to or stronger than token predictors in Persian, Korean, and both Chinese datasets. Visual entropy and token entropy show a similar complementary pattern. The appendix's 10-fold cross-validation preserves the main conclusions: combining visual and token predictors helps, and visual prediction is particularly informative for skipping in several non-Latin scripts.

Structural-similarity VWPD is slightly better than or comparable to mean-squared-error VWPD for most languages, whereas the Chinese datasets favor mean squared error. Blurring future context produces only modest overall gains, with somewhat clearer skipping improvements in Persian, Korean, and Traditional Chinese. Whole-word versus patchwise masking also varies by language, including opposite tendencies for Traditional Chinese and Korean.

## Limitations

- VWPD is sensitive to text rendering, but the experiments use only the bigram rendering strategy associated with the multilingual PIXEL model.
- Gaussian blur is a tentative parafoveal approximation. Kernel size and sigma are not extensively tuned, alternative corruptions are not tested, and the method does not represent the graded acuity of human peripheral vision.
- The strongest standalone pixel-model results concern skipping; pixel predictors are generally weaker than token surprisal for fixation-duration measures.
- Several analyses vary by language, script, metric, and masking choice, so the observed non-Latin-script pattern should not be treated as a universal property of writing systems.
- The interaction analyses offer plausible processing interpretations but do not directly establish the proposed cognitive mechanisms.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier, so those metadata are not asserted here.

## Related Concepts

- [[concepts/pixel-language-models|Pixel Language Models]]
- Computational psycholinguistics
- Surprisal theory
- Parafoveal processing
- Eye-movement modeling
- Tokenization-free language modeling

## Related Papers

- [[papers/scaling-multilingual-pretraining-of-pixel-language-models|Scaling Multilingual Pretraining of Pixel Language Models]]: studies how language, script, and model capacity affect the multilingual pixel-model family used here.
- Rust et al. (2023), "Language Modelling with Pixels": introduces the PIXEL masked-autoencoder architecture.
- Kesen et al. (2025), "Multilingual Pretraining for Pixel Language Models": introduces the multilingual PIXEL-M4 checkpoint used in the experiments.
- Nair and Resnik (2023), "Words, Subwords, and Morphemes: What Really Matters in the Surprisal-Reading Time Relationship?": motivates concern about tokenizer-dependent cognitive estimates.
- Goodkind and Bicknell (2018), "Predictive Power of Word Surprisal for Reading Times Is a Linear Function of Language Model Quality": supplies the psychometric predictive-power comparison used in the evaluation.
- Wilcox et al. (2023), "Testing the Predictions of Surprisal Theory in 11 Languages": motivates the cross-lingual and cross-validated reading-time analysis.

[[index|Library home]]
