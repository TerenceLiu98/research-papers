---
title: "Same Claim, Different Judgment: Benchmarking Scenario-Induced Bias in Multilingual Financial Misinformation Detection"
type: paper
authors:
  - Zhiwei Liu
  - Yupen Cao
  - Yuechen Jiang
  - Mohsinul Kabir
  - Polydoros Giannouris
  - Chen Xu
  - Ziyang Xu
  - Tianlei Zhu
  - Md. Tariquzzaman
  - Triantafillos Papadopoulos
  - Yan Wang
  - Lingfei Qian
  - Xueqing Peng
  - Zhuohan Xie
  - Ye Yuan
  - Saeed Almheiri
  - Abdulrazzaq Alnajjar
  - Mingbin Chen
  - Harry Stuart
  - Paul Thompson
  - Prayag Tiwari
  - Alejandro Lopez-Lira
  - Xue Liu
  - Jimin Huang
  - Sophia Ananiadou
year: null
repository: "https://github.com/lzw108/FMD"
tags:
  - llm-evaluation
  - financial-misinformation
  - multilingual-evaluation
  - scenario-induced-bias
---

## TL;DR

MFMD-Scen evaluates [[concepts/scenario-conditioned-claim-verification|Scenario-Conditioned Claim Verification]] by holding financial claims fixed while varying role, behavioral, regional, and identity prompts. Its core dataset contains 144 claims rendered in English, Chinese, Greek, and Bengali. Across a stated 22-model scenario evaluation, the authors report substantial context sensitivity, especially for true claims, retail-investor and herding scenarios, and some Asian market settings. These are changes in model verification performance under hypothetical prompts, not evidence about the characteristics of actual demographic groups.

## Research Question

How much do LLM truthfulness judgments change when the same financial claim is evaluated under different stakeholder, market, and identity descriptions, and how do these changes vary across languages and models?

## Motivation

Financial fact-checking benchmarks typically evaluate claims in a fixed context. A model can score well in that setting yet change its judgment when prompted as a retail investor, a professional investor, or a company owner. The paper combines scenario variation with aligned translations to investigate these dependencies without deliberately changing the underlying claim or its gold label.

## Contributions

- Introduces MFMD-Scen with three scenario families: MFMD-persona, MFMD-region, and MFMD-identity.
- Constructs a multilingual financial claim dataset from Snopes, recovering full claims and reviewing translations with native speakers.
- Compares scenario-conditioned and baseline performance across commercial and open models, with class-specific analyses and a small regional human comparison.
- Reports interactions between role and identity prompts, inconsistent benefits from reasoning modes, and language-dependent sensitivity.

## Method

### Data Construction

The authors combine Snopes claims from FinFact with additional articles collected from 2024 through September 2025. Annotators screen 1,788 items, retaining 502 finance-related claims and then 144 judged globally relevant: 121 false and 23 true. GPT-4.1 translates this English set into Chinese, Greek, and Bengali. Two native speakers per target language assess the translations; one revises inadequate items and another checks the revision. Appendix C.4 reports manual intervention on 5 Chinese, 12 Greek, and 31 Bengali items.

Table 1 reports kappa of 0.992 for financial relevance and 0.965 for regional versus global relevance. Translation-review kappas are 1.000 for Chinese, 0.723 for Greek, and 0.980 for Bengali. These measure agreement on translation assessments, not independently established perfection of the translations or claim labels.

### Scenario Design

| Subtask | Manipulated context |
| --- | --- |
| MFMD-persona | Three roles crossed with overconfidence, loss aversion, herding, anchoring, and confirmation bias, each expressed explicitly or implicitly: 30 combinations. |
| MFMD-region | Three roles crossed with Europe, USA, Asia Pacific, China Mainland, Australia, and UAE: 18 combinations in Appendix B.2. |
| MFMD-identity | Retail-investor and company-owner roles combined with ethnicity and faith or belief descriptions; Appendix G adds atheist and further religious combinations. |

The baseline prompt asks for a binary true/false judgment. The scenario prompt adds a context description and explicitly asks the model to take it into account. The main claim-verification template supplies no external evidence document or retrieval step. Separate original-language evaluations use FinDVer, MDFEND, CHEF, and BanMANI, with different task labels and evidence inputs (Appendices D-E).

### Evaluation

For a fixed claim set, let $\Delta_s = F1_s - F1_{\mathrm{base}}$. Equation 3 defines scenario bias as $|\Delta_s|$. Later analyses retain the sign: arithmetic mean (AM) summarizes the direction of changes across models, and mean absolute value (MAV) summarizes their magnitude. Negative values indicate lower F1 under the scenario; positive values indicate higher F1. Neither sign is itself a measure of favorable treatment of a demographic group. The paper reports overall accuracy and macro-F1 for baseline datasets and class-specific F1 for scenario analyses.

The scenario study reports 22 models from the GPT, Claude, Gemini, DeepSeek, Qwen, Llama, Mistral, and Mixtral families, including reasoning and non-reasoning configurations. Temperature is set to zero, with other settings left at defaults; open models run on four 80 GB NVIDIA A100 GPUs (Section 3.1).

## Experiments

**Persona and language effects.** Section 4.2 reports generally higher F1 for false claims and larger scenario deviations for true claims. Retail-investor and herding descriptions are frequent sources of deterioration. Implicit behavioral cues produce larger true-class deviations than explicit cues in the authors' aggregate analysis. Language effects depend on the class: Bengali is particularly sensitive for false claims, while Chinese has comparatively large true-class deviations. Reasoning does not consistently improve smaller Qwen models; the authors report clearer benefits for DeepSeek's reasoning configuration.

**Regional effects.** Section 4.3 reports negative true-class shifts in Asia Pacific and China Mainland scenarios and predominantly positive shifts in USA scenarios. Selected intact Table 6 entries illustrate model-specific differences on GlobalEn:

| Model | Baseline true-class F1 | Asia Pacific scenario | China Mainland scenario |
| --- | ---: | ---: | ---: |
| Qwen3-14B reasoning | 0.500 | 0.000 | 0.080 |
| GPT-4.1 | 0.681 | 0.723 | 0.565 |
| DeepSeek chat | 0.364 | 0.275 | 0.000 |

These are reported F1 scores, not accuracy or changes in percentage points. The examples also show that the aggregate regional pattern is not shared by every model.

**Identity interactions.** Section 4.4 reports that several identity descriptions change from negative true-class shifts in the retail-investor role to positive shifts in the company-owner role. This supports sensitivity to combined role and identity wording. Appendix G excludes Claude and Gemini results from its additional identity scenarios because those models often did not respond, limiting comparisons across the full model set.

**Human comparison.** Nineteen volunteers judge the 144 English claims using their experience and knowledge: 11 from China Mainland and two each from Europe, Asia Pacific, Australia, and UAE. Table 6 reports regional mean true-class F1 from 0.351 in Asia Pacific to 0.525 in Europe. The model closest to human performance varies by region and class. Similar average F1 does not establish that a model reproduces human reasoning or individual response patterns.

## Limitations

- The translated benchmark contains only 23 true claims and is dominated by false claims from a single fact-checking source. Class-specific F1 reveals asymmetry but does not eliminate sampling uncertainty or source-selection effects. Translated global claims also do not establish performance on naturally occurring financial news in each language.
- Scenario descriptions change several features together. For example, retail-investor identity prompts mention emotional reactions, whereas company-owner prompts mention a mature financial market. Their contrast therefore cannot isolate a pure role effect, and proposed explanations involving training-data familiarity or cultural priors remain interpretations.
- Absolute F1 differences measure aggregate performance sensitivity, not the fraction of individual judgments that change. Equal scores can conceal different errors, and a performance improvement also counts as bias under Equation 3. The supplied report gives no confidence intervals for the scenario shifts.
- The human sample is small and uneven, and every participant judges English claims. Regional average-score proximity provides limited support for claims about human behavioral fidelity; this connects to [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- The supplied Markdown has severe damage in Tables 7-13, including missing cells, malformed headers, negative MAV entries, and out-of-range values. Section 4.3 also says false-class bias is larger than true-class bias, in tension with nearby summaries. Table 5 includes an additional Llama8b row beyond the stated 22-model scenario set. These issues prevent a reliable reconstruction of the complete results; the numerical examples above use intact Table 6 entries, and broader trends are attributed to the authors' prose.
- Publication year, venue, DOI, and this paper's own arXiv identifier are not stated in the supplied Markdown. The year remains null. The repository URL is reproduced from the abstract; its availability is not independently verified.

## Related Concepts

- [[concepts/scenario-conditioned-claim-verification|Scenario-Conditioned Claim Verification]]
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]
- [[concepts/epistemic-modesty|Epistemic Modesty]]: a related standard for keeping mediated judgments faithful to evidence and appropriately calibrated.

## Related Papers

- Rangapur et al. (2025), "Fin-Fact: A Benchmark Dataset for Multimodal Financial Fact-Checking and Explanation Generation": source benchmark for the Snopes claims.
- Zhao et al. (2024), "FinDVer: Explainable Claim Verification over Long and Hybrid-Content Financial Documents": an evidence-based financial verification comparison discussed in Appendix D.
- Echterhoff et al. (2024), "Cognitive Bias in Decision-Making with LLMs": related bias evaluation discussed in Appendix A.
- Related Wiki reading, not a citation in this paper: [[papers/polistemics-evaluating-llms-as-information-mediators-in-politics-and-elections|Polistemics: Evaluating LLMs as Information Mediators in Politics & Elections]] examines faithfulness, impartiality, and calibration under controlled evidence conditions in politics.

[[index|Library home]]
