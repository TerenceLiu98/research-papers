---
title: Placebo Sampling Designs
type: concept
aliases:
  - Placebo Sampling
  - Placebo Sampling-Controlled Average Treatment Effect
definition: "Experimental designs that randomly assign placebo recipients to stimuli from a corpus, making the treatment comparison relative to an average over that corpus rather than one selected placebo."
tags:
  - experimental-design
  - causal-inference
  - survey-experiments
---

## Overview

A placebo sampling design randomizes the content of the placebo condition as well as assignment to experimental arms. It provides a corpus-average baseline and reduces sensitivity to a single researcher-selected stimulus.

## Key Ideas

- A pure control receives no informational intervention; a placebo reproduces ancillary aspects of treatment delivery while omitting its intended active component.
- The treatment-minus-corpus contrast identifies the substantive component only if the treatment's average nonspecific effect matches the sampled corpus's average nonspecific effect.
- With a pure-control arm, researchers can estimate the average placebo effect separately from the treatment effect.
- Random sampling supports inference about the chosen corpus, not every possible placebo. Generation prompts and corpus inclusion decisions still define the baseline.
- Many distinct stimuli improve coverage of baseline variation but leave little information for estimating each stimulus's effect.
- Automated generation is one corpus-construction method; sampling existing texts follows the same logic.

## Important Papers

- [[papers/placebo-selection-in-survey-experiments-an-agnostic-approach|Placebo Selection in Survey Experiments: An Agnostic Approach]]: formalizes the design and demonstrates it with GPT-2-generated news vignettes in two survey experiments.

## Related Concepts

- [[concepts/individual-treatment-effects|Individual Treatment Effects]]: potential outcomes distinguish unit-level causal components from the average contrasts identified by randomized assignment.
