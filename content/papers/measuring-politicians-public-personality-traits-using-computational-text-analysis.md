---
title: "Measuring Politicians’ Public Personality Traits Using Computational Text Analysis: A Multimethod Feasibility Study for Agency and Communion"
type: paper
authors:
  - Lukas Birkenmaier
  - Clemens Lechner
year: 2025
doi: 10.1017/pan.2025.10025
tags:
  - political-psychology
  - text-as-data
  - measurement-validation
---

## TL;DR

Theory-guided prompting can detect agency and communion cues in politicians’ statements with moderate agreement with human coding. Few-shot DeepSeek-V3 reaches macro-F1 0.77 and passes targeted functional tests, outperforming the tested SVM, fine-tuned XLM-RoBERTa, and Llama 3-8B alternatives. The target is publicly expressed personality, not intrinsic personality.

## Research Question

Can computational text analysis validly identify politicians’ public personality cues, and which modeling strategies work best for agency and communion?

## Motivation

Citizens judge politicians through observable communication shaped by both dispositions and strategic self-presentation. A scalable measure must define which verbal cues support a trait judgment and validate how models use those cues. General personality inventories and models trained outside political communication may miss domain-specific meanings.

## Contributions

- Operationalizes two public-personality dimensions through a political personality inventory and a human-validated codebook.
- Compares three computational strategies under strong-only versus weak-plus-strong cue definitions and balanced versus unbalanced class distributions.
- Combines human-label agreement, functional tests, and substantive applications using the ValiText validation framework.

## Method

The corpus covers 46 leading German politicians across six parliamentary parties during 2017–2024. Sources include 99 broadcast interviews, Facebook posts, and Bundestag speeches. Sampling 15,000 sentences from each source yields 45,000 sentences.

[[concepts/public-personality-cues|Public Personality Cues]] are operationalized using assertiveness and willingness to take control for agency, and empathy and compassion for communion. Strong cues explicitly signal traits; weak cues require more interpretation. Three annotators coded 1,000 sentences to assess reliability after iterative codebook development, followed by a labeled corpus with at least 200 examples per class for the cue variants. Models predict agency, communion, or none.

The comparison includes a bag-of-words SVM, fine-tuned XLM-RoBERTa-base, and zero-/few-shot prompting of GPT-4o, DeepSeek-V3, and Llama 3-8B. Prompts request a category and a one-sentence explanation. The unbalanced condition doubles the none class relative to each trait class. Results average three random seeds. Functional validation uses 18 units: six positive trait items, six opposite-pole items, and six unrelated sentences; opposite-pole items should be classified as other, not as positive cues.

## Experiments

Human agreement for detecting any cue is Krippendorff’s alpha 0.73 for strong cues and 0.72 for weak-plus-strong cues. Trait-specific agreement ranges from 0.70 to 0.78. In the initial human-coded sample, 94% of sentences lack strong cues and 89% lack either weak or strong cues (Section 4.1).

Selected Table 2 results, all few-shot prompting:

| Model | Dataset | Cue definition | Macro-F1 | SD |
| --- | --- | --- | ---: | ---: |
| DeepSeek-V3 | Balanced | Strong | 0.77 | 0.02 |
| DeepSeek-V3 | Balanced | Weak + strong | 0.76 | 0.01 |
| GPT-4o | Balanced | Strong | 0.76 | 0.01 |
| DeepSeek-V3 | Unbalanced | Strong | 0.77 | 0.01 |
| GPT-4o | Unbalanced | Strong | 0.74 | 0.00 |

XLM-RoBERTa reaches 0.70 on balanced strong cues; SVM reaches 0.63 there, with substantial variability. Llama 3-8B peaks around 0.60 on balanced and 0.55 on unbalanced data. Few-shot GPT-4o and DeepSeek-V3 correctly classify all 18 functional units for strong cues; only DeepSeek-V3 does so for the combined cue definition (Sections 4.2–4.3).

DeepSeek-V3 applications show higher communion shares among economically and culturally left-leaning German parties. Reported shares are 19% for LINKE, 12% for Greens, 10% for SPD, 8% for CDU, and around 6% for AfD and FDP. These are descriptive associations, not causal effects of ideology.

The September 10, 2024 Harris–Trump debate is translated into German before scoring. Personality cues appear in approximately 23% of Harris’s sentences and 10% of Trump’s. Conditional on detected cues, Trump’s distribution is 63% agency and 37% communion; Harris’s is 41% agency and 59% communion. These conditional shares differ from overall cue prevalence (Section 4.4).

## Limitations

Only two traits and sentence-level verbal cues are studied. Nonverbal behavior, prosody, broader context, and other traits remain outside the measure. Public expression cannot separate intrinsic dispositions from strategic presentation. Human agreement is moderate and no classifier exceeds macro-F1 0.80. The benchmark class mixtures also differ substantially from the rarity of cues in the initial sample. The translated U.S. application does not independently establish multilingual validity. Ideological correspondence supplies supporting evidence rather than proof that the measure is unbiased. The authors report no systematic bias in their validation but recommend further checks for politically sensitive applications.

## Related Concepts

- [[concepts/public-personality-cues|Public Personality Cues]]: distinguishes observable signals from intrinsic dispositions and separates cue validity from cue utilization.
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]: related instruction-based measurement; this study classifies cue categories rather than assigning continuous positions.

## Related Papers

- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: related library work comparing prompted and fine-tuned measurement against imperfect human references; not presented as a citation in this source.
- Birkenmaier, Wagner, and Lechner (2024), “ValiText: A Unified Validation Framework for Computational Text-Based Measures of Social Constructs”: supplies the validation framework.
- Lechner et al. (2025), “Mapping the Political Personality (PoliPers)”: supplies the domain-specific inventory.
- Ramey, Klingler, and Hollibaugh (2019), “Measuring Elite Personality Using Speech”: prior computational personality measurement discussed by the authors.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/MSY9L1).
