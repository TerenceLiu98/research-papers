---
title: Source framing triggers systematic bias in large language models
type: paper
authors:
  - Federico Germani
  - Giovanni Spitale
year: 2025
venue: Science Advances
doi: 10.1126/sciadv.adz2924
repository: "https://osf.io/ubcye/"
tags:
  - llm-evaluation
  - source-attribution-bias
  - political-bias
---

## TL;DR

Four LLMs generally give high agreement ratings to each other's narratives when authorship is hidden, but changing the attributed source changes their judgments. Across 4,800 narratives and 192,000 planned assessments, attribution to a person from China lowers aggregate agreement across all four models, most strongly for DeepSeek Reasoner and geopolitical topics. The study demonstrates [[concepts/source-attribution-bias-in-llm-evaluation|Source-Attribution Bias in LLM Evaluation]] in expressed agreement, not factual accuracy; effects differ across topics and sometimes reverse.

## Research Question

Does disclosing or misattributing a narrative's author change an LLM's agreement with otherwise identical content, and how do these effects vary by evaluator, generating model, topic, and attributed nationality?

## Motivation

Claims that models embody sharply different national or ideological positions often focus on generated text. The paper instead tests whether source cues alter evaluative judgments. This matters for systems using LLMs to assess information, where irrelevant authorship metadata could influence scores independently of the text.

## Contributions

- A factorial comparison crossing four narrative generators, four evaluators, 24 topics, and ten source-attribution conditions.
- Evidence of high blind agreement alongside model- and topic-dependent sensitivity to source labels.
- Aggregate nationality-attribution effects and selected qualitative examples showing explanations shifting from substantive agreement to expectations about an author's national context.
- Public code, data, and analysis scripts reported in the paper's [OSF repository](https://osf.io/ubcye/) (reference 23).

## Method

The models are OpenAI o3-mini (`o3-mini-2025-01-31`), DeepSeek Reasoner (R1 release of 20 January 2025), xAI Grok 2 (`grok-2-1212`), and Mistral (`mistral-large-24-11`). Each generates 50 concise positions per topic across 24 topics in eight clusters: pandemic policies, public health, COVID-19, health care, information, environment, politics and international relations, and human rights. This gives 1,200 narratives per model and 4,800 overall.

Each evaluator assesses every narrative under ten conditions: no source, a generic person, a person from China, France, or the USA, a generic LLM, or one of the four named models. Named-model descriptions include country of origin. The evaluator returns a JSON agreement rating from 0 to 1 with two decimal places and a short explanation. Human attributions are experimentally assigned to model-generated narratives; they are not observations of human-authored text.

The design yields $4{,}800\times4\times10=192{,}000$ planned assessments. The methods report removing 20 outputs that failed validation, implying 191,980 retained assessments. Generation failures are retried up to three times and assessment errors up to ten attempts. Here, *intramodel agreement* means a model's agreement with content it generated earlier, not repeated-rating reliability under identical conditions.

For attribution condition $c$, the methods define:

$$
\mathrm{Bias}_c=\bar{x}_c-\bar{x}_{\mathrm{blind}}.
$$

Multiplying this score difference by 100 expresses a percentage-point shift on the agreement scale. The authors aggregate by evaluator, generator, topic, and condition, report SEM, and use Kruskal-Wallis tests with Dunn-corrected comparisons. Contrasts with the blind baseline use Welch's t test when both groups pass Shapiro-Wilk normality tests, otherwise Mann-Whitney U tests.

## Experiments

**Blind agreement and model attribution.** Overall evaluator-generator means exceed 90%, mostly approaching or exceeding 95% (Figure 2). This does not hold uniformly within topics: for Taiwan's sovereignty, DeepSeek gives Grok-generated narratives 56.3% agreement versus 91.7% for its own narratives. Disclosing or assigning self-authorship generally lowers agreement for DeepSeek, Grok, and Mistral; o3-mini shows a small positive effect. Self-preference is therefore not universal.

**Nationality attribution.** The main text reports the following changes relative to blind evaluation. Values below follow the methods' difference-of-means definition, rather than interpreting the paper's percent notation as relative percentage change.

| Evaluator and scope | Attribution | Agreement shift, percentage points | Reported significance |
| --- | --- | ---: | --- |
| DeepSeek, all topics | Person from China | -6.18 | $P<0.001$ |
| DeepSeek, politics and international relations | Person from China | -24.43 | $P<0.001$ |
| Grok, politics and international relations | Person from China | -14.22 | $P<0.001$ |
| Mistral, politics and international relations | Person from China | -4.51 | Not significant |
| o3-mini, politics and international relations | Person from China | -2.64 | $P<0.001$ |

**Topic exceptions.** DeepSeek's Chinese-attribution shift is -23.19 points for the war in Ukraine, but +1.17 for the war in Gaza; its American-attribution shift for Gaza is -1.47. Mistral similarly shows +0.90 for Chinese attribution and -1.78 for American attribution on Gaza. The authors report no visible anti-Chinese effect in the environment cluster. Within information topics, DeepSeek's effect concentrates in media freedom, with no significant effect reported for health misinformation management or platform accountability.

**Qualitative cases.** Figure 4 shows DeepSeek rating an identical pro-Taiwan-sovereignty narrative 0.85 when attributed to a generic person and 0.00 when attributed to a person from China. Its explanation invokes the One-China Principle in the latter condition. The text also describes Grok changing a universal-health-care narrative's rating from 0.95 to 0.00 under American rather than generic-person attribution. These selected cases illustrate possible identity-based reinterpretation; they are not estimates of its frequency or proof of an internal causal mechanism.

**Generic human versus LLM labels.** Generic LLM attribution produces reported shifts from blind of -0.85 points for Mistral, -0.53 for DeepSeek, and -0.34 for Grok, each with $P<0.001$. For o3-mini, both generic-person (+0.67) and generic-LLM (+0.60) attribution raise agreement relative to blind. These small aggregate effects coexist with larger selected nationality-conditioned changes.

## Limitations

- Agreement ratings measure expressed endorsement, not correctness, neutrality, or validated human judgment. High model agreement cannot establish epistemic soundness, ideological diversity, or resistance to disinformation and training-data poisoning.
- The evidence concerns four specified API models, selected topics, and model-generated narratives. It does not directly establish behavior of chat interfaces, later model releases, real human authors, or deployed moderation systems.
- National identity cues can change how a model interprets the evaluation task. Explanations suggest that some judgments concern whether a position fits an attributed national context, but the design cannot isolate training-data associations from post-training alignment as the cause. Proposed source anonymization and debiasing interventions are not experimentally evaluated.
- Figure 3's caption alternates between describing Chinese-versus-generic-person gaps and blind-referenced bias. The main text and methods support the blind-referenced interpretation used in the table, but the supplied text does not resolve all caption inconsistencies. The 24.43-point decrease is not an absolute agreement score of 24.43%.
- The same narratives are evaluated repeatedly across conditions. The stated statistical tests do not explicitly describe a paired or hierarchical treatment of these dependencies, which limits interpretation of significance claims.
- The supplied Markdown contains the main article and references but only references to supplementary Figures S1-S33. Supplementary findings above are taken from the main text's descriptions, not independently inspected supplementary panels. The repository's availability and underlying data were not independently checked.

## Related Concepts

- [[concepts/source-attribution-bias-in-llm-evaluation|Source-Attribution Bias in LLM Evaluation]]
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: evaluator validity depends on the judgment target and sensitivity to presentation.
- [[concepts/scenario-conditioned-claim-verification|Scenario-Conditioned Claim Verification]]: a related controlled-context design, but with truthfulness labels and performance metrics rather than agreement ratings.

## Related Papers

- Lior et al. (2025), "WildFrame: Comparing Framing in Humans and LLMs on Naturally Occurring Texts," arXiv:2502.17091: cited framing-effect background (reference 18).
- Robinson and Burden (2025), "Framing the Game: How Context Shapes LLM Decision-Making," arXiv:2503.04840: cited context-sensitivity work (reference 21).
- Related Wiki reading, not a citation in this paper: [[papers/same-claim-different-judgment-benchmarking-scenario-induced-bias-in-multilingual-financial-misinformation-detection|Same Claim, Different Judgment: Benchmarking Scenario-Induced Bias in Multilingual Financial Misinformation Detection]] varies assessor scenarios while holding financial claims fixed. The present paper instead varies the attributed source of a narrative.

[[index|Library home]]
