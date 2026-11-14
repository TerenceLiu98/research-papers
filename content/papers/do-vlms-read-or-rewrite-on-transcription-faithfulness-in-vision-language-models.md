---
title: "Do VLMs Read or Rewrite? On Transcription Faithfulness in Vision-Language Models"
type: paper
authors:
  - Gwang Gook Lee
  - Kenan Emir Ak
  - Jay Mohta
  - Yan Xu
  - Dimitrios Dimitriadis
year: null
tags:
  - document-understanding
  - optical-character-recognition
  - vision-language-models
  - faithfulness
---

[[index|Library home]]

## TL;DR

FaithC4 tests whether models reproduce legible but improbable text rather than silently correcting it. Across 1,455 documents in English, Chinese, and Korean and 15 systems, perturbations expose errors hidden by clean-text OCR evaluation. English WER increases reach 6.90 percentage points for a general VLM, compared with at most 0.72 for the two traditional OCR baselines; substantial exceptions make model-specific evaluation essential.

## Research Question

When visible text conflicts with linguistic expectations, do vision-language models transcribe it literally, and what internal representations accompany rewriting?

## Motivation

Correcting a typo can improve readability while corrupting an exact record. Clean-text benchmarks cannot distinguish reliable visual transcription from successful linguistic reconstruction. [[concepts/transcription-faithfulness|Transcription Faithfulness]] matters especially for identifiers and other strings whose exact characters carry the information.

## Contributions

- FaithC4 supplies controlled, fully legible perturbations with the modified text as ground truth.
- Evaluation separates document accuracy, rewriting, and errors propagated into untouched words.
- Qwen3-VL-4B probes associate rewriting with final-layer representation similarity to the original input.
- Prompt ablations and a real-document identifier extraction task examine mitigation and downstream relevance.

## Method

The authors sample mC4 passages: 500 English, 500 Chinese, and 455 Korean documents, rendered as dense single pages with 9-point serif text. Scrambling, random substitution, and visually similar substitution change approximately 5% of characters. Chinese uses four-character windows and omits scrambling. The comparison includes eight general VLMs, five OCR-specialized VLMs, Tesseract, and docTR; docTR is English-only.

Metrics are whitespace-token WER for English and Korean, character error rate for Chinese, and normalized character edit-distance similarity for all languages. Document comparisons retain successfully processed documents across the applicable conditions for each model and language. Word-level analyses use successful documents within each condition. Refusals, repetition, truncation, and other complete failures are excluded and analyzed separately.

A separate probe highlights one word per English document, comparing original and perturbed inputs through Qwen3-VL-4B. It records FFN-output cosine similarity at the last input token and attention to highlighted image patches at the first generation step. These measurements support an association, rather than a causal intervention on the proposed mechanism.

## Experiments

Selected English results from Table 2 (WER increase in percentage points):

| System | Scramble | Visual | Random |
| --- | ---: | ---: | ---: |
| Gemini-3-Flash | 0.13 | 0.23 | -0.01 |
| Tesseract | 0.17 | 0.72 | 0.20 |
| MinerU2.5-Pro | 0.61 | 0.84 | 0.10 |
| Qwen3-VL-4B | 3.31 | 3.04 | 1.33 |
| InternVL3.5-4B | 6.90 | 6.77 | 3.21 |

The category trend has exceptions: Gemini-3-Flash is particularly robust in English, and OCR-specialized systems vary substantially. Chinese and Korean results also vary by script, baseline competence, and perturbation; Chinese CER and Korean WER are not directly interchangeable.

Untouched-word errors reach 7.3 times the clean baseline for Qwen3-VL-4B under scrambling (Table 6). This is a multiplicative per-word error comparison, not a 7.3-point WER increase. In the separate single-word probe, rewriting occurs in 4.9% of scramble cases, 6.0% of visual cases, and 0% of random cases (Table 8). Rewrites concentrate among representations closest to the original at layer 35. Scrambled words of length 4–6 show 7.6–10.0% rewriting, versus no observed rewrites at length eight or greater (Table 10).

Explicit no-correction instructions reduce perturbation degradation in two Qwen models but increase clean baseline WER (Appendix F). Enabling thinking provides little consistent additional benefit. Scaling improves some clean baselines without monotonically improving perturbation robustness.

On 150 product-compliance PDFs, OCR followed by Claude Sonnet 4.5 yields median exact-match ASIN extraction F1 of 93.5%, versus 68.6% for direct VLM extraction (Appendix G). Qwen3.5-4B is a strong direct-model exception at 93.79%. This downstream task connects transcription quality to [[concepts/key-information-extraction|Key Information Extraction]].

## Limitations

The main benchmark uses synthetic pages, three scripts, and controlled character changes rather than handwriting or scanning degradation. Mechanistic probing covers one model and does not establish a universal word-length threshold. Failure exclusions make accuracy conditional on successful processing, with different retained document sets across models. Traditional baselines have limited multilingual coverage.

The source contains numerical inconsistencies: Appendix G labels Qwen3.5's 2.29-point and PaddleOCR's 3.19-point changes as random-condition degradation, while Table 2 places these in the scramble column. Its reported correlation should therefore be treated cautiously. Table 5 gives an error-type distribution whose rows sum to 100%, without a verbatim category; its rewriting percentages should not be conflated with all-token rewrite rates or Table 8's probe rates. Appendix F baseline values also differ from the main tables.

The supplied Markdown does not state a publication year or stable paper identifier; these are left unspecified. Source: Cognitio job `93f41140-d475-45eb-ab32-5df18a7e3c5a`, supplied parsed Markdown. The paper names the project repository as https://github.com/gwanglee/DoVLMsRead.

## Related Concepts

- [[concepts/transcription-faithfulness|Transcription Faithfulness]]
- [[concepts/key-information-extraction|Key Information Extraction]]

## Related Papers

- He et al. (2025), “Seeing is believing? mitigating OCR hallucinations in multimodal large language models.” The source contrasts obscured evidence with FaithC4's legible but altered text.
- Lee et al. (2025), “VLIND-Bench: Measuring Language Priors in Large Vision-Language Models.” Related evaluation of linguistic priors, cited in the source.
