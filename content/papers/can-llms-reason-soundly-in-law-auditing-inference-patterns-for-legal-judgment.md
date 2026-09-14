---
title: "Can LLMs Reason Soundly in Law? Auditing Inference Patterns for Legal Judgment"
type: paper
authors:
  - Lu Chen
  - Yuxuan Huang
  - Yixing Li
  - Dongrui Liu
  - Qihan Ren
  - Shuai Zhao
  - Kun Kuang
  - Zilong Zheng
  - Quanshi Zhang
year: null
tags:
  - legal-llms
  - neural-network-interpretability
  - interaction-primitives
  - model-auditing
---

## TL;DR

The paper audits legal LLM judgments by decomposing target-token scores into [[concepts/and-or-interaction-primitives|AND/OR interaction primitives]] and comparing them with expert annotations of relevant, irrelevant, and forbidden phrases. It reports substantial unreliable interaction strength even for correct judgments, including dependence on another person's actions and occupation information. The evidence concerns selected phrases in curated cases; exact score reconstruction does not itself establish legally sound reasoning or recover the model's internal reasoning steps.

## Research Question

Can phrase-interaction explanations reveal and quantify reliance on inappropriate evidence behind apparently correct legal judgments?

## Motivation

Output accuracy can conceal dependence on facts that should not determine a judgment. The authors seek an audit of the input combinations supporting a prediction, complementing evaluation of generated answers. They frame the study as a warning illustrated by cases, rather than an exhaustive benchmark of legal reasoning.

## Contributions

- Applies an existing AND/OR decomposition to legal judgment scores and labels interaction effects using domain annotations.
- Defines a reliable-strength ratio, interaction-order distributions, and a cancellation metric.
- Studies four LLMs across English and Chinese legal datasets and illustrates incorrect entity matching, occupation sensitivity, and reliance on semantically irrelevant phrases.

## Method

For a fixed target sequence, the scalar score is the sum of token log-odds conditioned on the input and preceding target tokens (Equation 1). The audit selects ten informative phrases, enumerates their $2^{10}$ masking states, and holds the remaining input constant. Masking replaces token embeddings with learned constant baseline values (Appendices L.6-L.7).

The score is split into AND and OR components using learnable parameters, optimized by minimizing summed absolute interaction effects. An AND term activates when all phrases in its subset are present; an OR term activates when any is present. The full decomposition reconstructs every enumerated masked score exactly, whereas keeping only salient effects gives a sparse approximation. The cited sparsity arguments require conditions; reconstruction and semantic correctness are separate properties.

Sixteen legal experts and volunteers label phrases by majority vote as relevant ($\mathcal R$), irrelevant, or forbidden ($\mathcal F$). Relevant phrases directly support the target judgment; forbidden phrases include actions attributable to a different person. For an AND subset $S$, the entire effect is treated as reliable when $S\cap\mathcal R\ne\emptyset$ and $S\cap\mathcal F=\emptyset$, and unreliable otherwise. Thus, an AND term may contain irrelevant phrases and still count as reliable. For OR terms, the reliable component is $R_S^{\mathrm{OR}}=|S\cap\mathcal R|I_S^{\mathrm{OR}}/|S|$; the remainder is unreliable (Equations 4-5).

The principal metric is

$$
s^{\mathrm{reliable}}=
\frac{\sum_{o\in\{\mathrm{AND},\mathrm{OR}\}}\sum_{S\in\Omega^o}|R_S^o|}
{\sum_{o\in\{\mathrm{AND},\mathrm{OR}\}}\sum_{S\in\Omega^o}|I_S^o|}.
$$

This measures the share of salient absolute interaction strength assigned to reliable effects, not the fraction of correct judgments or a simple count of sound reasoning patterns. Interaction order is the number of selected phrases in a subset. The conflict metric measures cancellation of signed effects within each interaction type relative to total absolute strength (Section 3.1).

## Experiments

The models are Qwen2.5-14B-Base, DeepSeek-R1-Distill-Qwen-14B, SaulLM-7B-Instruct, and BAI-Law-13B. Qwen and DeepSeek are evaluated alongside SaulLM on ECtHR from LexGLUE and Learned Hand Crime from LegalBench, and alongside BAI-Law on CAIL2018, LeCaRD, and LEVEN. Section 3.1 reports 100 randomly selected samples per task, with ten informative phrases chosen by two senior legal experts.

For the shared CAIL2018 case studies, the authors condense case descriptions, translate Chinese cases into English for SaulLM, and add sentiment or occupation phrases for targeted audits. They analyze initially correct judgments; occupation substitutions can subsequently change the answer (Appendix L.7).

| Finding | Reported evidence |
| --- | --- |
| Unreliable effects behind correct answers | Section 3.1 describes more than half of interactions as unreasonable or incorrect. Its principal metric is strength-weighted; Figure 2's individual values are not transcribed in the supplied Markdown. |
| Incorrect entity matching | In the Andy/Bob example, reliable strength is 41.5% for SaulLM and 44.5% for BAI-Law despite judgments described as correct (Section 3.2). |
| Occupation sensitivity | SaulLM changes from "Robbery" to "Not mentioned" when the victim's occupation changes from judge to volunteer or programmer. The volunteer comparison explains the fixed "Robbery" score, not the newly generated answer (Figure 11). |
| Irrelevant sentiment | The illustrated assault case has reliable strength of 76.9% for SaulLM and 77.0% for BAI-Law (Appendix K), showing substantial variation across cases. |
| Low-order effects | Figure 3 reports greater strength in interactions involving few selected phrases. This does not directly measure chain-of-thought length. |
| Cancellation | Table 4 ranges from 29.97% for SaulLM on LexGLUE to 98.25% for Qwen on LexGLUE. The other 14 model-dataset entries exceed 60%; SaulLM/LexGLUE is an exception to the prose claim. |

Appendix J reports sparse effects and checks reconstruction across masking states. Appendix G proposes interaction consistency training, reliability-weighted fine-tuning, and reliability-based rewards, but does not report experiments demonstrating those improvements.

## Limitations

The audit is conditional on the selected phrases, fixed background, masking baselines, sparse decomposition, salience threshold, and expert labeling rules. Exact enumeration grows exponentially, motivating the restriction to ten phrases. Neither low interaction order nor cancellation alone proves absent reasoning or erroneous judgment.

Experts select straightforward cases and avoid subtle cross-jurisdictional distinctions. Condensation, translation, added distractors, and selection of correct predictions limit extrapolation to naturally occurring court documents or the prevalence of failures in deployment. The phrase labels operationalize domain relevance; the resulting score is not a general test of legal validity or procedural fairness.

The supplied Markdown omits this paper's publication year, venue, and stable identifier, so the year is left unknown. Some equations and figure captions contain extraction artifacts and numeric inconsistencies. The summary retains clear definitions and explicit table values without inferring missing plot measurements. Medical and financial applications are proposed extensions, not evaluated results.

## Related Concepts

- [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]]: the score-decomposition framework used for the audit.

## Related Papers

- [[papers/layerwise-change-of-knowledge-in-neural-networks|Layerwise Change of Knowledge in Neural Networks]]: a related Wiki paper using the same interaction vocabulary for comparisons across layers; this is a methodological connection, not a citation claimed by the present manuscript.
- Li and Zhang (2023), "Does a Neural Network Really Encode Symbolic Concept?" Cited as theoretical support for interaction explanations (reference 26).
- Ren et al. (2024), "Where We Have Arrived in Proving the Emergence of Sparse Interaction Primitives in DNNs." Cited for conditional sparsity theory (reference 42).
- Zhou et al. (2024), "Explaining Generalization Power of a DNN Using Interactive Concepts." Supplies the sparse extraction approach followed here (reference 61).

[[index|Library home]]
