---
title: Forward-Chaining Temporal Point Process
type: paper
authors:
  - Chao Yang
  - Wendi Ren
  - Shuang Li
year: null
tags:
  - temporal-point-processes
  - neuro-symbolic-learning
  - synthetic-data
---

## TL;DR

FC-TPP generates continuous-time event sequences from a predicate-level latent state refined through multi-hop logical inference. Its strongest reported gains concern scarce or incomplete data and adherence to reliable rules. Incorrect rules can make generation worse than using no rules.

## Research Question

Can explicit reasoning over latent predicates improve the realism, rule adherence, and controllability of generated event sequences when observations are limited or incomplete?

## Motivation

A statistical history embedding need not represent eligibility conditions or other domain constraints explicitly. FC-TPP makes these conditions part of the state that drives generation, allowing rule implications to influence each sampling step.

## Contributions

- A recurrent history encoder coupled to a predicate-based symbolic state.
- A learnable, multi-hop forward-chaining layer applied before next-event generation.
- Experiments on synthetic logic processes, urban simulation, clinical records, kitchen actions, and furniture assembly, including rule scrambling and low-data evaluations.

## Method

A GRU-style encoder updates a history state from each event mark and inter-event gap. Predicate-specific projections match this state to anchored semantic embeddings using rescaled cosine similarity. The resulting predicate scores undergo a fixed number of reasoning hops: rule slots are matched to predicate anchors, soft AND aggregates body evidence, and soft OR combines evidence for rule heads. See [[concepts/differentiable-forward-chaining|Differentiable Forward Chaining]].

The decoder conditions only on the refined predicate state and factorizes the next-event distribution into an inter-arrival-time distribution and a categorical mark distribution. Training maximizes autoregressive log-likelihood. Generation alternates sampling, recurrent updating, predicate matching, and reasoning. Human templates or LLM proposals initialize trainable rule embeddings; optional further LLM queries enrich the rule set during training (Sections 3–4).

The finite-hop continuous relaxation approximates logical completion; it is not a demonstrated guarantee that every sampled trajectory satisfies all rules.

## Experiments

The six datasets are Syn@5, Syn@10, LogiCity, MIMIC-IV sepsis trajectories, EPIC-100 cooking verbs, and IKEA ASM TV-bench assembly. Splits are 80%/10%/10%; Table 2 reports means and standard deviations over three runs. Baselines include THP, AVAE, GNTPP, UFM-TPP, prompting and question-answering generators, and an adapted LAMP.

Generation evaluation combines distributional metrics, discriminator score (DS; lower is better), GPTScore (higher is better), and rule violations where rules are known. [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] is computed on pooled time-and-mark sequence embeddings.

| MIMIC-IV model | DS ↓ | GPTScore ↑ | MMD ↓ |
| --- | --- | --- | --- |
| GNTPP | 0.38 ± 0.03 | 0.60 ± 0.05 | 0.56 ± 0.04 |
| FC-TPP | 0.34 ± 0.03 | 0.70 ± 0.06 | 0.48 ± 0.08 |

Other findings qualify the overall advantage:

- On Syn@5, true rules yield rule violation rate 0.28, compared with 0.71 for scrambled rules and 0.42 without supplied rules (Table 1).
- On EPIC-100 with full training data, GNTPP has better DS and GPTScore, while FC-TPP has better MMD. On LogiCity, LAMP has lower MMD than FC-TPP (0.73 versus 0.92; Table 2).
- With 20% of EPIC-100 training data, FC-TPP reports DS 0.45, GPTScore 0.53, and MMD 1.25, improving on the best corresponding baseline values reported in Appendix D.4.
- On MIMIC-IV, adding recurrent encoding, multi-hop reasoning, and rule refinement progressively improves the ablation results; final MMD is 0.48 versus 0.57 with all three ablated (Table 11).
- Dynamic reasoning improves MIMIC-IV MMD from 0.48 to 0.45 but increases reported time from 4.08 to 4.73 minutes (Table 13).
- A gated history/symbolic hybrid slightly outperforms the symbolic-only decoder on a synthetic rare-event prediction task (Table 14).

## Limitations

Rule quality, coverage, and prompting affect performance. LLM-based rule-conditioned evaluation does not establish clinical validity, and the authors acknowledge evaluation circularity and potential bias. The claimed zero-shot setting changes rules in an already trained model; it does not mean learning a generator without data. High-quality rare-disease validation remains outstanding.

Soft reasoning leaves nonzero rule violations. Pooled-embedding MMD and text-based scoring offer partial evidence of sequence realism. The supplied text also describes a recurrent encoder in the method but a Transformer in its complexity discussion, so those complexity statements should not be treated as a verified implementation specification.

Publication year, venue, and a stable identifier are not established in the supplied Markdown.

## Related Concepts

- [[concepts/differentiable-forward-chaining|Differentiable Forward Chaining]]: propagating soft predicate evidence through rules before decoding.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: distributional comparison used in generation evaluation.

## Related Papers

- [[papers/learning-hawkes-processes-under-synchronization-noise|Learning Hawkes Processes Under Synchronization Noise]] addresses corrupted timestamps in event-process estimation, whereas FC-TPP studies rule-guided generation with limited or incomplete histories. These are distinct observation and modeling problems.

[[index|Library home]]
