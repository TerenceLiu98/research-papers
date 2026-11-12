---
title: "Same Contacts, Different Rooms: Meeting Format Shapes LLM Group Influence Beyond Pairwise Contact Counts"
type: paper
authors:
  - Zhexi Gu
  - Shusheng Cao
  - Runping Zhu
year: null
tags:
  - llm-agents
  - social-influence
  - higher-order-networks
---

## TL;DR

Holding every pairwise contact count fixed, merging triads into five-person meetings changes LLM group support more than rearranging triads: 4.36 versus 2.59 percentage points (pp) RMS across six models and 14 topics. Resizing amplifies the initial core majority by 1.72 pp. Meeting-wise pairwise predictors recover some effects that aggregated networks miss; their prediction difference is an exact sigmoid Jensen gap.

## Research Question

Do pairwise contact counts suffice to predict one-step LLM group influence, and how much does preserving meeting membership improve otherwise identical pairwise predictors?

## Motivation

Contact networks discard which peers appeared together. Separating meeting format from contact frequency allows the authors to test this information loss without changing members or initial stances.

## Contributions

- A contact-matched comparison of regrouping and resizing across 161,280 matched configurations.
- A predictor comparison separating influence weights from where nonlinear responses are averaged.
- An exact aggregation-error identity and a variance bound connecting meeting-level heterogeneity to prediction disagreement.

## Method

Each configuration contains six instances of one model with fixed stances and human-written ArgKP-2021 arguments. Three schedules share the same pair-contact matrix: base and regroup contain 40 triads; resize contains 26 meetings, including six five-person meetings of the core. Each intervention removes and adds 60 dyadic exposures. The study enumerates 1,920 configurations per model–topic cell using three cores, ten sixth-member choices, and 64 stance patterns.

Every meeting resets to the initial state. Support is the sigmoid of the support-versus-oppose option-logit difference. Group support averages probabilities across each member's meetings and then equally across members. This is a one-step response measure, not sequential opinion evolution.

Pairwise predictors add weighted single-peer logit effects to a no-peer baseline. Sum, Mean, Size, and Stance rules vary the weights; Size and Stance weights transfer from an independent micro-experiment with the target topic excluded and no fitting to group outcomes. The static-network comparator averages Size-rule logits before applying the sigmoid, while the meeting-wise rule averages probabilities. Base and regroup have identical contacts and attendance counts, forcing the static comparator's regroup prediction to zero.

[[concepts/nonlinear-aggregation-in-group-influence|Nonlinear Aggregation in Group Influence]] describes the resulting Jensen gap. Small logit variance bounds disagreement between the two placements; it does not establish that either predicts observed LLM behavior accurately.

## Experiments

The main models are Granite4.2-3B, LFM2.5-1.2B, Gemma4-E2B, MiniCPM5-2B, Phi4-mini, and Qwen3.5-4B. Intervals use 20,000 topic-cluster bootstrap draws, treating models as fixed.

| Result | Reported evidence |
| --- | --- |
| Resize exceeds regroup | RMS 4.36 versus 2.59 pp; difference 1.77 [1.50, 2.03] pp; 81/84 model–topic cells |
| Resize amplifies the core majority | 1.72 [1.41, 2.02] pp; positive in every model; regroup magnitude at most 0.03 pp in majority-directed mean |
| Placement improves resize prediction selectively | Identical Size weights gain 0.58 [0.32, 0.84] in contrast R² for LFM and 0.51 [0.38, 0.64] for Granite; other four gains within 0.02 |
| Meeting-wise rules capture regroup effects | Size-rule R² reaches 0.76 for LFM, 0.62 for Granite, and 0.30 for Gemma |
| Prediction remains incomplete | No tested low-parameter rule beats the resize no-change baseline meaningfully for Phi or Qwen; naive summation overshoots in five models |
| Dispersion tracks aggregation disagreement | Auxiliary-design log–log correlation 0.97; identity reconstructed within 6.4 × 10⁻¹⁶ across 15,552 conditions |

Contrast R² is one minus prediction MSE divided by the observed effect's second moment; zero means predicting no change. Robustness checks preserve the resize-over-regroup direction with incidence weighting, six further topics, five additional models, and full-answer likelihood scoring on two topics (Appendix Table 3).

## Limitations

The analysis is exploratory, uses saved measurements, and reports pointwise intervals. Its main evidence covers small open-weight models, fixed prompts, binary readouts, and one-step responses. Contact matching does not equalize meeting count or token cost. Human-written arguments do not make these estimates of human group behavior. Sequential state updates and long-run outcomes remain untested here.

The sigmoid changes curvature, so low variance is sufficient, not necessary, for a small Jensen gap: symmetric logits can cancel exactly (Appendix C). Agreement between two pairwise approximations is distinct from empirical predictive accuracy.

The supplied manuscript does not explicitly state its publication year, venue, DOI, or arXiv identifier; these remain unspecified. Its code repository is listed as https://github.com/ZachGu-00/llm-meeting-format (Appendix E).

## Related Concepts

- [[concepts/nonlinear-aggregation-in-group-influence|Nonlinear Aggregation in Group Influence]]: why readout placement matters with identical weights.
- [[concepts/hypergraphs|Hypergraphs]]: preserve group co-attendance beyond pairwise counts.
- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]: interaction can amplify initial preferences.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes artificial-agent findings from human behavioral inference.

## Related Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]]: a library comparison examining population size and long-run naming conventions, rather than contact-matched one-step meetings.
- [[papers/higher-order-interactions-shape-collective-human-behaviour|Higher-order interactions shape collective human behaviour]]: a library comparison providing broader context for explicitly represented groups.
- Neuhäuser, Lambiotte, and Schaub (2021), *Consensus dynamics on temporal hypergraphs*: cited by the manuscript for differences between temporal and aggregated dynamics.

[[index|Library home]]
