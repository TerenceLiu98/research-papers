---
title: "LLM-XTM: Enhancing Cross-Lingual Topic Models with Large Language Models"
type: paper
authors:
  - Minh Chu Xuan
  - Tien-Phat Nguyen
  - Dinh Viet Sang
  - Linh Ngo Van
  - Diep Thi-Ngoc Nguyen
  - Trung Le
year: null
tags:
  - topic-modeling
  - cross-lingual-nlp
  - large-language-models
---

[[index|Library home]]

## TL;DR

LLM-XTM enhances a trained cross-lingual topic model through repeated LLM topic-word refinement, kernel distribution matching, and multilingual document-topic alignment. Reported coherence and composite topic quality improve across three neural backbones and three main datasets, although uniqueness and in-language classification sometimes decline.

## Research Question

Can black-box LLM feedback improve both bilingual topic descriptors and document-topic assignments without requiring token probabilities or document-by-document LLM prompting?

## Motivation

Lexical alignment can leave paired topics semantically inconsistent. Refining displayed words alone does not ensure that document-topic posteriors improve. The framework combines topic-level semantic guidance with an explicit document-level target while retaining the backbone objective.

## Contributions

- A second training phase applicable to InfoCTM, NMTM, and XTRA.
- Word-frequency voting across repeated LLM refinements, supplying targets without token-probability access.
- Complementary topic-word MMD and document-topic KL losses, evaluated through intrinsic metrics, transfer classification, and ablations.

## Method

After backbone training, extract the top 15 words per language for each topic. Periodically request multiple bilingual refinements, count word occurrence across responses, and retain frequently proposed words. These empirical counts define a normalized refined distribution.

[[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] compares the model's weighted top-word distribution with the refined distribution using a Gaussian kernel on cosine-based embedding distances. BGE-M3 supplies word and document representations. Embed each refined bilingual topic list and compute document-topic cosine similarities; a temperature softmax gives the semantic target $\hat\theta_d$.

The second phase minimizes the original backbone objective plus weighted MMD and $\sum_d\operatorname{KL}(\theta_d\|\hat\theta_d)$. The question-answering analogy describes embedding matching, not a separate generative QA task. Appendix G reports 30 refinement epochs, five sampled refinement rounds, and a single NVIDIA P100 GPU.

## Experiments

The main benchmarks are English–Chinese EC News and Amazon Review, and English–Japanese Rakuten Amazon. Table 2 reports five-seed means for rerun systems; MCTA and MTAnchor results are taken from prior work. Metrics are cross-lingual NPMI (CNPMI), topic uniqueness (TU), and topic quality, $\mathrm{TQ}=\max(0,\mathrm{CNPMI})\times\mathrm{TU}$.

| Backbone | EC News TQ, base → enhanced | Amazon Review TQ | Rakuten Amazon TQ |
| --- | --- | --- | --- |
| XTRA | 0.076 → 0.084 | 0.052 → 0.069 | 0.033 → 0.035 |
| InfoCTM | 0.039 → 0.056 | 0.034 → 0.047 | 0.028 → 0.035 |
| NMTM | 0.028 → 0.032 | 0.026 → 0.035 | 0.008 → 0.011 |

Table 3's Rakuten Amazon ablation gives CNPMI 0.016 for full NMTM enhancement, versus 0.012 without either alignment loss, 0.011 without self-consistency, and 0.013 when replacing MMD with optimal transport. This supports the combination in this setting, rather than a universal ranking of discrepancies.

Table 5 evaluates linear SVMs on document-topic features. InfoCTM's Japanese cross-lingual accuracy rises from 0.7342 to 0.7875 on Rakuten Amazon. Improvements are not universal: NMTM's Chinese in-language Amazon accuracy falls from 0.7210 to 0.7071.

Appendix H extends evaluation to Airiti thesis abstracts, where NMTM TQ rises from 0.0259 to 0.0371. Appendix I compares refinement engines on Amazon Review: Llama-3.3-70B matches Gemini 2.5 Flash at TQ 0.0351, while Mistral-7B-v0.3 reaches 0.0297 against a 0.0262 baseline. Automated LLM ratings supplement these metrics; they are not human judgments.

## Limitations

The authors identify dependence on a useful backbone initialization and latency from repeated LLM calls. Self-consistency measures agreement, not calibrated factual or semantic correctness. Topic uniqueness falls for XTRA on all three main datasets and for InfoCTM on EC News; aggregate quality gains therefore do not imply preservation of every quality dimension. Evaluation covers limited language pairs and relies on pretrained multilingual representations.

The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier for this paper; the year is left null. Section 4.6 contains inconsistent numeric scales for coherence and Appendix G describes refinement frequency in steps while Section 3.1 describes epochs, so those details require clarification for reproduction.

## Related Concepts

- [[concepts/llm-guided-topic-refinement|LLM-Guided Topic Refinement]]
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/zero-shot-cross-lingual-topic-modeling|Zero-shot Cross-lingual Topic Modeling]]: a distinct setting where a topic model transfers to unseen languages.

## Related Papers

- [[papers/neural-topic-modeling-with-large-language-models-in-the-loop|Neural Topic Modeling with Large Language Models in the Loop]]: the cited LLM-ITL predecessor uses confidence-weighted refinement; LLM-XTM uses repeated black-box sampling and adds bilingual document alignment.
- [[papers/cross-lingual-contextualized-topic-models-with-zero-shot-learning|Cross-lingual Contextualized Topic Models with Zero-shot Learning]]: cited work on multilingual contextual representations and zero-shot topic inference.

## Source

Summary based on the supplied parsed manuscript for Cognitio job `40f7af06-2a96-4d93-bc33-9f02e95028c0`. Results above refer to its tables and appendices.
