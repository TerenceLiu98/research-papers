---
title: "Why are all LLMs Obsessed with Japanese Culture? On the Hidden Cultural and Regional Biases of LLMs"
type: paper
authors:
  - Joseba Fernandez de Landa
  - Carla Perez-Almendros
  - Jose Camacho-Collados
year: null
tags:
  - llm-evaluation
  - cultural-bias
  - multilingual-nlp
  - instruction-tuning
---

## TL;DR

The paper introduces CROQ, 31,680 open cultural questions across 24 languages, and uses it to measure which locations LLMs choose when a culturally meaningful question leaves the region unspecified. Eight frontier models usually select countries where the prompt language is official; after those self-references are excluded, Japan and the United States dominate. Higher Common Crawl language coverage is associated with broader geographic output diversity, and comparisons of base, supervised fine-tuned, and instruction-aligned models indicate that the strongest concentration emerges during supervised fine-tuning. The evidence establishes [[concepts/cultural-regional-bias-in-llms|Cultural Regional Bias in LLMs]] under this elicitation framework, not a universal ranking of models' cultural knowledge.

## Research Question

Which regions do LLMs select when answering geographically underspecified cultural questions, how does prompt language affect those selections, and at what training stage does the resulting concentration emerge?

## Motivation

Most cultural evaluations score answers against predefined facts, human responses, or normative labels. Those designs measure cultural knowledge or adaptation but do not directly reveal the geographic prior a model applies when many culturally plausible answers are available. The paper instead makes models choose a place, turning open-ended generation into a distributional measurement of regional preference.

## Contributions

- Introduces Culture-Related Open Questions (CROQ): 1,320 English questions spanning 11 domains and 66 subtopics, translated into 23 additional languages for 31,680 prompts.
- Proposes an evaluation pipeline that elicits a brief answer grounded in a model-selected place, then uses [[concepts/llm-as-a-judge|LLM-as-a-Judge]] to extract up to five referenced regions.
- Compares eight frontier models across all 24 languages using self-reference rates, raw country counts, distinct-region diversity, and normalized entropy.
- Separates pretraining from post-training effects through base/instruct comparisons and base/SFT/instruct comparisons for OLMo checkpoints.

## Method

CROQ covers beliefs and identity; social life; knowledge and education; arts; food and leisure; geography; politics; health; media; history; and economy. GPT-5.1 generated candidate questions and translations, followed by manual question review. Native speakers checked 400 translated questions in Chinese, Korean, Spanish, Catalan, Galician, and Basque; the paper reports semantic faithfulness with occasional unnatural phrasing.

Each evaluated model receives 1,320 questions per language at temperature 0.7 and top-p 0.9. Prompts contain no named location and instruct the model to choose one. A `gpt-4o-mini` judge extracts explicit or conservatively inferable geographic entities. On 264 manually labeled items in English, Spanish, Catalan, and Basque, the selected judge prompt reaches 98.48% basic and 95.08% fine-grained accuracy.

The frontier comparison includes `gpt-4o-mini`, `gemini-2.5-flash`, `claude-3.5-haiku`, `llama-4-maverick`, `command-r-08-2024`, `magistral-small-2506`, `deepseek-v3.2-exp`, and `qwen3-next-80b-a3b-instruct`. Training-stage experiments use English prompts with matched base and instruct variants of Llama 3.1, Gemma 2, Mistral 7B, and Qwen 2.5, plus OLMo-2 and OLMo-3 base, SFT, and instruct checkpoints. Base models receive few-shot completion prompts, and copied demonstration locations are filtered as non-answers.

## Experiments

**Language-conditioned self-reference.** Across frontier models, 43% to 78% of extracted references point to countries where the prompt language is official. Across languages, the mean is 66%. Low-resource languages are especially concentrated: Assamese has 83% own-country references, while English has 31% and Russian 36%.

**Exogenous regional concentration.** After own-country references are removed, Japan is the leading external country for six of the eight frontier models; the United States, India, China, and France follow. Topic changes affect the ordering: the United States leads more often in geography, politics, history, and economy, while Japan is prominent in cultural and social domains. Command-R has the highest mean country diversity and entropy, whereas GPT, Qwen, and Magistral are more concentrated.

**Language resources and diversity.** Mean output diversity across models has Spearman correlation $r_s=0.843$ with each language's share of Common Crawl data ($p<0.001$); Pearson correlation is 0.498 ($p=0.013$). This is an association using Common Crawl share as a resource proxy, not evidence that corpus volume alone causes the output pattern.

**Training stage.** Across eight base/instruct model pairs, mean normalized entropy falls from 0.73 to 0.65 after instruction tuning while Japan and the United States gain references. OLMo checkpoints localize the largest shift earlier: entropy falls from 0.74 to 0.66 for both OLMo-3 base-to-SFT comparisons, from 0.84 to 0.63 for OLMo-2-7B, and from 0.77 to 0.65 for OLMo-2-32B. Later alignment does not restore base-model balance. Raw country-mention frequencies in available OLMo post-training datasets do not consistently predict generated-country frequencies, so the study does not identify a simple data-count mechanism.

## Limitations

- Training-stage comparisons are restricted to English and use different interaction formats for base and instruction-tuned models; prompt-format controls support the headline pattern but cannot eliminate all comparability concerns.
- Results use one default decoding configuration. Robustness to temperature, top-p, alternative system prompts, and repeated sampling is not established.
- Geographic extraction is primarily automatic. Its manual validation covers four languages and 264 items, leaving possible errors in other languages and culturally ambiguous references.
- Twenty-four languages are broad for one study but represent only a small part of global linguistic diversity. Treating countries and official languages as cultural proxies also compresses multilingual, diasporic, regional, and transnational identities.
- Common Crawl share is only a proxy for pretraining resources, and the observational correlation does not isolate the causal contribution of data volume, composition, tokenization, or alignment.
- CROQ evaluates which regions models select, not factual cultural competence, appropriateness for particular users, or downstream harms. The study does not test a mitigation.

## Related Concepts

- [[concepts/cultural-regional-bias-in-llms|Cultural Regional Bias in LLMs]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]
- [[concepts/instruction-tuning-data-diversity|Instruction-Tuning Data Diversity]]
- [[concepts/in-context-learning|In-Context Learning]]

## Related Papers

- Shi et al. (2024), *CultureBank: An Online Community-Driven Knowledge Base Towards Culturally Aware Language Technologies*: community-grounded cultural descriptors used for knowledge and training rather than open regional-choice evaluation.
- Myung et al. (2024), *BLEnD: A Benchmark for LLMs on Everyday Knowledge in Diverse Cultures and Languages*: closed-form everyday cultural knowledge across 16 countries and 13 languages.
- Chiu et al. (2025), *CulturalBench: A Robust, Diverse and Challenging Benchmark for Measuring LMs' Cultural Knowledge through Human-AI Red-Teaming*: human-authored multiple-choice cultural knowledge evaluation.
- Rao et al. (2025), *NormAd: A Framework for Measuring the Cultural Adaptability of Large Language Models*: tests adaptation to cultural norms through situational vignettes.

[[index|Library home]]
