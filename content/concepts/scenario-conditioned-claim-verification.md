---
title: Scenario-Conditioned Claim Verification
type: concept
aliases:
  - Scenario-Induced Bias in Claim Verification
tags:
  - llm-evaluation
  - fact-checking
  - prompt-sensitivity
  - multilingual-evaluation
---

## Overview

Scenario-conditioned claim verification evaluates whether a model's truthfulness judgments depend on contextual descriptions of the assessor, such as a role, behavioral tendency, market environment, or identity. The claim and gold label remain fixed while the surrounding prompt changes. This tests whether contextual cues alter verification behavior when they do not supply new evidence about the claim.

## Key Ideas

- **Use a paired baseline.** Compare the same claims with and without scenario information. Aligned translations extend this design across languages, although translation quality and language familiarity remain potential influences.
- **Separate direction from magnitude.** For $\Delta_s = F1_s - F1_{\mathrm{base}}$, a signed mean describes improvement or deterioration; the mean of $|\Delta_s|$ describes average deviation without cancellation. MFMD-Scen calls the absolute change scenario bias, including changes that improve performance.
- **Inspect individual classes.** With imbalanced labels, high accuracy or strong majority-class F1 can coexist with poor recognition of minority-class claims. Baseline performance and class-specific shifts should be read together.
- **Distinguish score stability from judgment stability.** Equal F1 scores can arise from different predictions. An aggregate F1 gap is not a direct measure of how often individual claims change labels.
- **Treat scenarios as compound interventions.** A role description may also change emotional language, expertise cues, or market maturity. Effects of the complete prompt do not isolate each attribute unless the design varies it separately.
- **Keep the interpretation at the model level.** Identity-conditioned responses reveal behavior under hypothetical prompts. They do not establish characteristics of real social groups, and resemblance to a human average score is insufficient to validate a human simulation.

## Important Papers

- [[papers/same-claim-different-judgment-benchmarking-scenario-induced-bias-in-multilingual-financial-misinformation-detection|Same Claim, Different Judgment: Benchmarking Scenario-Induced Bias in Multilingual Financial Misinformation Detection]] introduces MFMD-Scen, combining role, persona, regional, and identity scenarios with 144 financial claims in four languages.

## Related Concepts

- [[concepts/epistemic-modesty|Epistemic Modesty]]: connects truthfulness assessment to faithful representation and certainty justified by available evidence.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes prompted persona behavior from validated correspondence to human populations.
