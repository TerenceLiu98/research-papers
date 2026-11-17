---
title: Silicon Sampling
type: concept
definition: "Generating a synthetic respondent sample by conditioning a language model on backstories drawn from a specified human population."
tags:
  - social-simulation
  - public-opinion
---

## Overview

Generating a synthetic respondent sample by conditioning a language model on backstories drawn from a specified human population.

## Key Ideas

The procedure supplies an external distribution of backstories and generates responses conditional on each profile. It replaces the implicit population composition of training text with a chosen sample composition.

This can correct composition mismatch only if conditional response distributions are sufficiently faithful. Demographic coverage alone cannot repair inaccurate subgroup behavior. Backstories may include political attitudes as well as demographics, so fidelity depends on the information supplied. Generated respondents are stochastic population proxies, not reconstructions of particular people.

## Important Papers

- [[papers/out-of-one-many-using-language-models-to-simulate-human-samples|Out of One, Many]] introduces and evaluates this idea using GPT-3 and U.S. survey data.

## Related Concepts

- [[concepts/algorithmic-fidelity|Algorithmic Fidelity]] connects sample construction with its validation requirements.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]] addresses the scope of supported inferences.
