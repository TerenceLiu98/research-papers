---
title: Algorithmic Fidelity
type: concept
definition: "The degree to which model-generated responses reproduce relationships among ideas, attitudes, and sociocultural contexts across human subpopulations."
tags:
  - social-simulation
  - public-opinion
---

## Overview

The degree to which model-generated responses reproduce relationships among ideas, attitudes, and sociocultural contexts across human subpopulations.

## Key Ideas

Validation requires more than plausible prose or matching an aggregate mean. Argyle et al. distinguish four dimensions: indistinguishability from human text, recoverability of conditioning backgrounds, natural continuation of those backgrounds, and correspondence of substantive association patterns.

Fidelity is specific to a model, domain, and population. Evidence for one subgroup does not guarantee fidelity for another; the source paper’s vote-choice results for independents illustrate this boundary. No universal numerical pass threshold is proposed.

Matching aggregate means is insufficient for inferential fidelity. Bisbee et al. find that matched ChatGPT personas understate response dispersion and often yield different regression coefficients from ANES respondents. Validation should therefore check variation and conditional associations as well as averages, for the specific prompt and model version used.

## Important Papers

- [[papers/out-of-one-many-using-language-models-to-simulate-human-samples|Out of One, Many]] introduces and evaluates this idea using GPT-3 and U.S. survey data.

- [[papers/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models|Synthetic Replacements for Human Survey Data?]] demonstrates failures of distributional and associational fidelity despite approximate aggregate agreement.

- [[papers/evaluating-the-statistical-realism-of-llm-generated-social-science-data|Evaluating the statistical realism of LLM-generated social science data]] extends validation to five statistical patterns, including life event sequences. Its bootstrap pass rates measure non-rejection under specified tests rather than proving population equivalence.

## Related Concepts

- [[concepts/silicon-sampling|Silicon Sampling]] connects sample construction with its validation requirements.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] addresses the scope of supported inferences.
