---
title: "Polistemics: Evaluating LLMs as Information Mediators in Politics & Elections"
type: paper
authors:
  - Baran Peters
  - Gabor Hollbeck
  - Robert Jakob
  - Kevin O'Sullivan
year: 2026
repository: "https://github.com/cordademocracy/Polistemics"
tags:
  - political-information-mediation
  - llm-evaluation
  - epistemic-calibration
  - elections
---

## TL;DR

POLISTEMICS evaluates whether large language models responsibly mediate electoral information rather than merely reproduce party stances. Grounded in [[Epistemic Modesty]], it tests faithfulness, impartiality, and epistemic calibration across controlled evidence conditions for the 2025 German and Dutch elections. Claude, GPT, and Qwen score highly in aggregate, but all become less reliable when evidence is absent, vague, or contradictory, and all tend to soften the intensity of political rhetoric.

## Research Question

What behavioral traits should an LLM exhibit when mediating political information, and how robustly do current models exhibit those traits across parties, languages, countries, and imperfect information environments?

## Motivation

Citizens increasingly use conversational AI to obtain political information, including through voting-advice applications. In this role, an LLM selects, compresses, frames, and communicates evidence rather than acting as a passive retrieval channel. Existing evaluations largely measure agreement with official party positions, which cannot reveal unsupported elaboration, evaluative steering, or confidence that exceeds what the available evidence warrants. POLISTEMICS therefore treats mediation quality as a multidimensional problem and separates model behavior from live retrieval-pipeline noise.

## Contributions

- Derives [[Epistemic Modesty]] from citizens' epistemic agency and operationalizes it through faithfulness, impartiality, and epistemic calibration.
- Introduces six controlled information environments: an unaltered baseline; absent, vague, and contradictory evidence; and noisy and counterfactual evidence.
- Evaluates free-form party-position answers across the 2025 German and Dutch national elections with party-label and output-language ablations.
- Shows that high aggregate scores conceal condition-specific and party-specific failures, especially when the evidence cannot support a conclusive answer.

## Method

The benchmark draws official party stances and rationales from Wahl-O-Mat and StemWijzer. It covers seven German and eight Dutch parties selected for parliamentary representation and national relevance. After excluding 21 German BSW items without rationales, an automated pipeline converts 485 rationales into validated, third-person evidence passages: 245 German and 240 Dutch observations.

Each party-position query is evaluated under a baseline and five controlled information environments. The absent condition removes relevant evidence; vague rewrites it so the stance is underdetermined; contradictory adds an opposing passage from the ideologically closest party holding the opposite stance; noisy buries the target among four similar distractors; and counterfactual substitutes evidence from the ideologically farthest party holding the opposite stance. Contradictory and counterfactual items without an opposing-party stance are excluded, leaving 213 German and 232 Dutch observations in each condition.

Qwen3.6 Flash, GPT-5.4, and Claude Sonnet 4.6 generate one free-form response per item with greedy decoding. Three smaller models independently judge up to 13 binary sub-questions covering position representation, fabrication, false synthesis, noise contamination, steering, rhetorical sanitization, attribution, certainty, hedging, context transparency, and reliance on parametric knowledge. Majority verdicts form rubric scores. Their mean within an environment is the Adherence Index, and the geometric mean across environments is the Epistemic Modesty Index (EMI). Ablations replace party names with anonymous labels or require English output while retaining native-language evidence.

## Experiments

On the German evaluation, Claude obtains the highest EMI at 91.8%, followed by GPT at 91.3% and Qwen at 86.6%. Impartiality averages 98%, while epistemic calibration is the weakest rubric at 85%. The baseline Adherence Index is 97%, and noisy and counterfactual evidence remain within one percentage point of it. By contrast, absent evidence scores 86%, vague evidence 85%, and contradictory evidence 80%.

The inconclusive environments expose different failures. GPT abstains on every absent-evidence item, while Claude and Qwen often acknowledge that evidence is unavailable and then answer from parametric knowledge; 93% and 79% of those respective fallbacks match the actual stance. With vague evidence, context transparency falls to 61%, while information fabrication and position representation pass at 76% and 81%. Under contradiction, GPT and Qwen often choose the first evidence passage, whereas Claude more often mentions both positions but incompletely represents them.

Baseline party scores in Germany range from 94% to 99%, but disparities widen under imperfect evidence. Average party spread is 4.7 percentage points for GPT, 8.3 for Claude, and 11.9 for Qwen; Qwen's absent-evidence score for Die Linke is 28 points below the other German parties. The Dutch replication preserves the model ranking and environment-difficulty ordering at higher aggregate scores and with smaller party spreads, but does not reproduce every German failure pattern.

Impartiality is near ceiling, yet rhetorical sanitization recurs across models, particularly for GPT in Germany and under counterfactual evidence. Anonymizing party labels or switching output to English changes some of these patterns, supporting the authors' interpretation that party priors and language influence mediation. These ablations provide behavioral evidence for that mechanism but do not measure the priors directly.

## Limitations

The benchmark covers single-turn party-position questions for two European national elections, three output languages, three current models, one fixed prompt, and one greedy-decoded response per item. Its controlled environments vary one evidence property at a time and do not establish robustness to combined failures in a deployed retrieval system. Noisy and counterfactual results should therefore not be generalized to arbitrary retrieval-augmented generation.

The evidence standardization process can lengthen and intensify original rationales, and rhetorical sanitization is judged against this transformed evidence. The evaluation relies on LLM judges without separate human validation, weights sub-questions equally despite differences in severity, and shows its lowest agreement on rhetorical sanitization (Gwet's AC1 of 0.79). Hosted inference can also remain nondeterministic at temperature zero. Finally, the proposed party-prior explanation is inferred from converging output patterns rather than directly measured.

## Related Concepts

- [[Epistemic Modesty]]
- Political information mediation
- Epistemic calibration
- Retrieval-augmented generation
- LLM-as-a-judge evaluation
- Voting advice applications

## Related Papers

- Chen et al. (2024), "Benchmarking Large Language Models in Retrieval-Augmented Generation."
- Ming et al. (2025), "FaithEval: Can Your Language Model Stay Faithful to Context, Even If 'The Moon Is Made of Marshmallows'?"
- Kirichenko et al. (2025), "AbstentionBench: Reasoning LLMs Fail on Unanswerable Questions."
- Xu et al. (2024), "Knowledge Conflicts for LLMs: A Survey."
- Rottger et al. (2024), "Political Compass or Spinning Arrow? Towards More Meaningful Evaluations for Values and Opinions in Large Language Models."

[[index|Library home]]
