---
title: Functional Introspection
type: concept
tags:
  - introspection
  - self-modeling
  - large-language-models
---

## Overview

Functional introspection concerns a computational system obtaining and using information about its own operations. In Zhang, Yuan, and Zhang's introspection-threshold framework, it comprises self-modeling, self-simulation, self-evaluation, and targeted self-modification. This is a proposed computational criterion, not a claim about subjective experience or an agreed definition covering all introspection research.

## Key Ideas

- A self-model represents how a system behaves; self-simulation uses that representation to predict outcomes on hypothetical inputs. Evaluation compares predictions with outcomes, and modification uses the discrepancies to change operation.
- Self-reports require evidence about their origin. Plausible statements about uncertainty or capabilities may reflect learned language patterns or observable behavior. Privileged-access tests ask whether self-prediction is more reliable or less costly than comparable third-party prediction.
- The threshold paper's literature review describes quasi-introspection: partial capability awareness, limited behavior prediction, and unreliable evaluation. It preserves competing findings about privileged self-access rather than a uniform empirical result.
- Kleene's second recursion theorem establishes behavioral fixed points for total computable transformations of program indices. The paper uses this foundation to motivate bounded self-simulation; existence alone establishes neither efficient implementation nor useful improvements.
- The representation boundary matters. A model of agent code, a low-dimensional activation summary, and a complete representation of model computation support different claims about self-access.
- Bounded simulation makes finite-horizon evaluation possible but leaves behavior outside the horizon uncertified. Extending this to sustained [[concepts/recursive-self-improvement|recursive self-improvement]] requires further assumptions about evaluation, modification, and preservation of useful self-models.

## Important Papers

- [[papers/self-reference-in-large-language-models-the-introspection-threshold-for-recursive-self-improvement|Self-Reference in Large Language Models]]: introduces the four-part operational framework and contrasts its formal criterion with reviewed LLM behaviors.
- Binder et al. (2024), "Looking Inward: Language Models Can Learn About Themselves by Introspection," and Song, Hu, and Mahowald (2025), "Language Models Fail to Introspect About Their Knowledge of Language": cited in that review as contrasting evidence on privileged self-access.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/meta-evolution|Meta-Evolution]]
