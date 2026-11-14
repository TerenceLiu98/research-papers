---
title: "Who Is the Influencer? Consensus Dynamics in Multi-Agent Systems"
type: paper
authors:
  - Gouki Minegishi
  - Jingyuan Feng
  - Hiroki Furuta
  - Takeshi Kojima
  - Yusuke Iwasawa
  - Yutaka Matsuo
year: null
tags:
  - multi-agent-systems
  - convention-formation
  - opinion-dynamics
---

[[index|Library home]]

## TL;DR

In a synthetic naming game with no correct label, the supplied manuscript reports that stronger models' initial conventions win most often across seven model families. A fitted majority-amplification parameter supports a heuristic energy account of this influence; its connection to in-context learning remains a conjecture.

## Research Question

Whose initial convention does a heterogeneous LLM population adopt when agents disagree and no answer is objectively better?

## Motivation

Accuracy-based debate evaluations conflate influence with correctness. Meaningless labels make convention selection measurable without requiring factual knowledge, allowing the authors to study asymmetric influence between model classes.

## Contributions

- A heterogeneous naming-game protocol that seeds each model class with its own convention.
- Evidence of stronger-model influence across seven within-family comparisons, plus two-label and comparable-size cross-family controls.
- A simplex-based energy model linking fitted majority amplification, called assertion strength, to convention selection.

## Method

The default population has 24 agents, three labels, and 20-slot FIFO memories. Eight agents per model class initially remember only their assigned label. Each interaction selects a random speaker and a different listener; only the listener appends the spoken label and drops its oldest memory entry. Candidate order is shuffled, and prompts specify neither an agreement reward nor a consensus objective. Trials last at most 60 rounds of 24 interactions.

Memory composition approximates each agent's output distribution. For population mean output $\bar{x}$, the proposed energy is

$$
E(\bar{x})=-\frac12\sum_k w_{c(k)}\bar{x}_k^2,
$$

where $c(k)$ denotes the class initially assigned label $k$. The associated replicator flow is

$$
\frac{d\bar{x}_k}{d\tau}=\bar{x}_k\left(w_{c(k)}\bar{x}_k-\sum_l w_{c(l)}\bar{x}_l^2\right),
$$

with time measured in memory lifetimes. Assertion strengths are fitted from observed utterances and memory compositions, controlling for repetition of the latest observed label. Larger weights represent stronger amplification of a memory majority. The energy is a heuristic closure, not an exact derivation of the stochastic interaction process.

## Experiments

The manuscript reports 108 trials per family for GPT-5, GPT-4.1, Claude 5, Gemini, Gemma 4, Qwen 3.5, and Qwen 2.5. These family names and model configurations are those of the supplied source. Within each family, reported win frequencies follow the capability ordering; open-weight comparisons also follow size ordering. Uncertainty is clustered by label set and assignment, with 3,000 bootstrap replicates; unresolved trials count as losses for every class.

- **Two labels:** reported stronger-model win rates are 0.67 for GPT-5, 0.81 for Claude 5, 0.67 for Gemma 4, and 0.83 for Qwen 3.5, versus chance 0.5 (48 trials per comparison, memory length 6).
- **Comparable-size cross-family control:** Gemma 4 31B, Qwen 2.5 32B, and Qwen 3.5 27B win 0.39, 0.36, and 0.25 of trials, respectively; the authors do not identify a definitive dominant model.
- **Energy diagnostics:** Gemma 4 assertion strengths are 3.44, 3.19, and 2.52 in descending model-size order. Its largest model wins 78% of the main trials. Across the three open-weight families, local predicted versus measured motion correlations are 0.55–0.65, and energy falls in 85–86% of rounds.
- **Robustness:** larger populations and longer memories delay consensus. The largest Gemma model remains the most frequent winner across the reported population-size and memory-length sweep.

## Limitations

The experiments use well-mixed populations exchanging single labels; structured networks, free-form debate, and tasks with ground truth are not tested. Meaningless labels remove semantic correctness but do not establish a general causal effect of parameter count independently of model design.

The energy uses two closure approximations that do not hold throughout a run. Small-model victories violate its descent account especially often. An alternative energy improves descent in those trials but gives every consensus vertex equal depth and therefore loses winner discrimination. Both strengths and diagnostic output curves are estimated from the evaluated runs, so agreement is in-sample consistency rather than prospective prediction. The same regression fails to separate large and medium API models. Stronger in-context learning is a proposed explanation, not a directly established mechanism.

Appendix C reports conflicting Gemma two-label rates at memory length 6 (0.67 in the main comparison and 0.73 in the memory sweep); these should not be silently combined. The supplied Markdown does not establish this paper's publication year, venue, or stable identifier, so those metadata are left unspecified.

## Related Concepts

- [[concepts/naming-game|Naming Game]]: convention selection through repeated local exchanges.
- [[concepts/replicator-dynamics|Replicator Dynamics]]: frequency-dependent flow on the probability simplex.
- [[concepts/in-context-learning|In-Context Learning]]: the proposed source of majority amplification.

## Related Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]] studies population-size effects and collective bias in homogeneous naming-game populations; this manuscript instead varies model class within a population.
