---
title: Neural Topic Modeling with Large Language Models in the Loop
type: paper
authors:
  - Xiaohao Yang
  - He Zhao
  - Weijie Xu
  - Yuanyuan Qi
  - Jueqing Lu
  - Dinh Phung
  - Lan Du
year: null
aliases:
  - LLM-ITL
tags:
  - topic-modeling
  - large-language-models
  - optimal-transport
  - interpretability
---

## TL;DR

LLM-ITL uses an LLM's suggested topic words to regularize neural topic models during training. Confidence-weighted optimal transport and a corpus-only warm-up improve automatic topic coherence across eight base models and four datasets: Table 1 reports relative gains of 7.4% to 70.6%, while document-label alignment changes by -3.5% to +4.2%. Coherence gains can coexist with reduced topic diversity, and the evidence does not establish universal improvements in human interpretability or corpus coverage.

## Research Question

Can LLM guidance improve the semantic coherence of neural topics while preserving the document-topic representations learned from a corpus, without sending every document to an LLM?

## Motivation

Neural topic models learn global topic-word distributions and document-level topic mixtures, but their leading words can be difficult to interpret. Document-level LLM topic discovery adds inference cost and may miss corpus-wide structure. LLM-ITL instead asks the LLM to refine a model's topic word lists and feeds these suggestions back into training.

## Contributions

- A modular training objective for integrating LLM suggestions into eight neural topic models.
- Semantic alignment between original and refined word distributions through optimal transport over word embeddings.
- Confidence weighting and delayed refinement to balance LLM guidance with corpus information.
- Evaluation separating topic coherence, document-label alignment, diversity, and composite topic quality.

## Method

**Topic suggestions.** The base neural topic model learns topic-word distributions and document-topic mixtures. The LLM receives each topic's highest-weighted words, produces a short label, identifies irrelevant words, and suggests a refined list. Suggestions outside the corpus vocabulary are removed. The structured prompting procedure requests a two-word label and ten refined words in the main setting (Section 3.1 and Appendix H).

**Semantic alignment.** An [[concepts/optimal-transport|Optimal Transport]] loss aligns a topic's original word distribution with its LLM-refined word distribution. The ground cost is cosine distance between pretrained GloVe word embeddings, and the experiments use the POT package to compute transport. Unlike coordinate-wise divergences, this objective accounts for semantic distances between different words (Sections 3.2 and 5.1).

**Confidence and warm-up.** Each topic's transport loss is weighted either by the product of probabilities of the generated label's tokens or by one minus the fraction of original words identified as intruders. The first requires access to generation probabilities; the second uses the generated answer. These are task-specific confidence proxies, not demonstrated calibrated probabilities of correctness. Training minimizes

$$
\mathcal L_{\mathrm{NTM}}+
\gamma\,\mathbf 1[t>T_{\mathrm{refine}}]
\sum_{k=1}^{K}c_k\,d_{\mathrm{OT}}(\mu_k,\mu'_k),
$$

where the base-model loss is minimized in its usual loss convention, $c_k$ is confidence, and the two measures describe original and refined topic words. Corpus-only warm-up precedes refinement. Main experiments use Llama3-8B-Instruct, greedy decoding, a 300-token generation cap, label-token confidence, $\gamma=200$, and refinement during the final 50 steps of the base training schedule. Document-topic proportions are inferred by the trained neural model (Sections 3.3-3.4 and 5.1).

Code and datasets are linked in the source: [LLM-ITL repository](https://github.com/Xiaohao-Yang/LLM-ITL).

## Experiments

**Setup.** Experiments use 20News and R8 with 50 topics, and DBpedia and AGNews with 25 topics, plus additional topic counts in Appendix E. Table D1 lists train/test sizes of 11,778/2,944, 5,485/2,189, 15,598/3,899, and 16,000/4,000, respectively. Vocabulary filtering retains words occurring in more than five and fewer than 80% of documents and present in GloVe. The eight base models are NVDM, PLDA, SCHOLAR, ETM, NSTM, CLNTM, WeTe, and ECRTM; other comparisons include LDA, BERTopic, and TopicGPT.

**Evaluation.** Topic coherence $C_V$ uses the top ten words and Wikipedia as reference through Palmetto. PN averages purity and normalized mutual information after assigning each test document to its highest-weighted topic. Evaluation uses the final training state. Results report five-run means and standard deviations except TopicGPT, which is run once at temperature zero, with GPT-4 for generation and GPT-3.5 for assignment; generation uses 600 sampled training documents per dataset (Appendix D).

Representative ETM results from Table 1 are shown below as reported means:

| Dataset | ETM $C_V$ | + LLM-ITL $C_V$ | ETM PN | + LLM-ITL PN |
| --- | --- | --- | --- | --- |
| 20News | 0.491 | 0.578 | 0.404 | 0.398 |
| R8 | 0.433 | 0.571 | 0.679 | 0.686 |
| DBpedia | 0.513 | 0.704 | 0.762 | 0.742 |
| AGNews | 0.534 | 0.644 | 0.568 | 0.569 |

Across all 32 base-model/dataset combinations in Table 1, coherence improves; PN remains close to the corresponding base model, sometimes declining. TopicGPT has no comparable $C_V$ entry. Thus, these comparisons do not establish a coherence ranking against TopicGPT.

**Ablations.** For ETM on 20News with 50 topics, OT yields $C_V=0.578\pm0.008$, versus 0.479-0.480 for KL, Jensen-Shannon, Hellinger, and total-variation alternatives. OT's PN is slightly lower: $0.398\pm0.010$ versus 0.402-0.405 (Table 3). Earlier refinement improves coherence more but harms alignment; confidence weighting improves PN relative to omitting confidence (Figures 3 and 5). Several alternative LLMs also improve coherence in the ETM/20News study, with larger Llama3 showing stronger gains (Figure 4).

**Additional evidence and cost.** Table E3 shows mixed diversity effects, including ECRTM on 20News at 100 topics declining from 0.965 to 0.631, a 34.6% relative loss. Table E4 nevertheless reports improved coherence-times-diversity scores for all tested base-model settings. Appendix I reports improved Word2Vec-based semantic-distance scores for ETM on all four datasets. Each trial takes a few hours on one 80GB A100; the paper does not supply an end-to-end runtime comparison establishing a fixed speedup. Appendix H's original refinement prompt averages 224.48 input and 197.86 output tokens with a 0.978 extraction success rate, measured on 1,000 sampled topics.

## Limitations

LLM suggestions can shift topics toward pretraining knowledge rather than the corpus. Vocabulary filtering prevents out-of-vocabulary suggestions but cannot guarantee corpus-relevant associations. Warm-up and confidence weighting mitigate this trade-off without eliminating it, particularly for corpora unlike the LLM's training data (Section 7).

Automatic coherence and label-based clustering agreement test different properties; neither alone establishes human interpretability or complete theme coverage. The supplied experiments contain no direct human interpretability study. Diversity losses and PN decreases should remain visible alongside coherence gains; see [[concepts/topic-model-evaluation|Topic Model Evaluation]]. Repeated topic-level LLM calls still incur training cost.

The supplied Markdown omits an explicit publication year and stable paper identifier, so neither is inferred from cited works. Appendix E.3 attributes the maximum diversity gain to NVDM, whereas Table E3 places the 55.5% gain under NSTM. The summary uses the table values and avoids reconstructing damaged appendix table boundaries.

## Related Concepts

- [[concepts/llm-guided-topic-refinement|LLM-Guided Topic Refinement]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]

## Related Papers

- Pham et al. (2024), "TopicGPT: A Prompt-based Topic Modeling Framework": document-level LLM baseline.
- Chang et al. (2024), "Enhanced Short Text Modeling: Leveraging Large Language Models for Topic Refinement": post-hoc refinement contrasted with LLM-ITL's training regularizer.
- Dieng, Ruiz, and Blei (2020), "Topic Modeling in Embedding Spaces": ETM base model used extensively in the ablations.
- [[papers/neural-topic-modeling-via-contextual-and-graph-information-fusion|Neural Topic Modeling via Contextual and Graph Information Fusion]]: a library comparison that also separates coherence improvements from document-representation quality, using contextual and graph information rather than generated refinement targets; it is not a baseline in this paper.

[[index|Library home]]
