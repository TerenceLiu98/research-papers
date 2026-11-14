---
title: "Inside the Loop: A Mechanistic Study of Weight-Tied Transformers on Depth-Bound Algorithmic Tasks"
type: paper
authors:
  - Magnus Sesodia
  - Juil Sock
  - Philip Torr
  - Christian Schroeder de Witt
year: null
source_job_id: "08a9c737-79c9-4768-9315-a9919a497cd0"
tags:
  - looped-transformers
  - algorithmic-reasoning
  - mechanistic-interpretability
---

## TL;DR

On directed permutation traversal, a four-layer transformer repeated eight times solves the task in 5/5 seeds at learning rate 0.001, versus 0/5 for an untied 32-layer model. Lowering the learning rate lets the untied model solve in 4/5 seeds. Probes reveal gradual intermediate-hop computation in most looped seeds, with several hops packed into an iteration when needed. Interventions support causal use of the patched states, but cross-permutation transfer is weak.

## Research Question

Does weight tying help models learn sequential algorithms beyond merely supplying effective depth, and how do intermediate algorithmic states map onto loop iterations?

## Motivation

Repeated blocks increase effective depth without adding parameters or output tokens. Directed permutation traversal supplies ground-truth intermediate nodes, making it possible to distinguish gradual algorithm execution from a compressed simulation of an untied stack.

## Contributions

- Separates effective depth from the allocation of distinct layers and recurrent iterations in a controlled capability grid.
- Shows that optimization settings and intermediate supervision can rescue untied models, qualifying the advantage as one of learning rather than representational impossibility.
- Combines controlled linear probes, full-node logit lenses, and activation patching to characterize iteration-dependent progress.

## Method

A prompt contains shuffled edges of a single cycle over 16 nodes and five queries. Each query requests the node reached after H hops, with H ranging from 1 to 15. The reference state at hop h is the h-fold application of the permutation to the start node. Because backward traversal can shorten walks on a cycle, the main mechanistic analysis uses H ≤ 8; a 32-node control removes this shortcut for H ≤ 15.

An L × T model repeats L decoder layers T times, giving effective depth LT. Models use width 256, eight attention heads, RMSNorm, SwiGLU, and RoPE. The looped 4 × 8 model has 3.22M parameters versus 25.72M for the untied 32-layer model. Looped models also use iteration embeddings and zero-initialized attention/MLP output projections, so weight tying is not the sole architectural difference.

Training uses AdamW for 100,000 steps and a hop curriculum reaching all 15 lengths by step 30,000. Linear-probe selectivity subtracts shuffled-label control accuracy from real-label accuracy; onset is the first depth reaching 0.5. Main probes split 5,000 prompts into 4,000 training and 1,000 held-out prompts. Some controls use an older query-row split. The logit lens scores complete node strings. Patching replaces both the readout-position state and first-answer-digit state with donor activations.

## Experiments

Table 1 reports seeds solving every hop at a training-time accuracy threshold of 0.8:

| Setting | Looped 4 × 8 | Untied 32-layer |
| --- | --- | --- |
| 16 nodes, learning rate 0.001 | 5/5 | 0/5 |
| 16 nodes, learning rate 0.0003 | 5/5 | 4/5 |
| 16 nodes, learning rate 0.0001 | 1/5 | 1/5 |
| 16 nodes, auxiliary intermediate loss, rate 0.001 | Not tested in this variant | 2/5 |
| 32 nodes, rate 0.0003: solved-chain depth per seed | 6, 0, 1 | 1, 1, 1 |

No configuration with effective depth at most eight solves the full task. At effective depth 32, strongly looped configurations succeed much more often than the untied or twice-looped configurations at rate 0.001. At rate 0.0003, the 4 × 8 model reaches a solution after about 45,000 steps on average versus 55,000 for the untied model.

Probes show ordered intermediate-node onsets in most looped seeds. Successful untied models without auxiliary loss generally reveal these nodes late in the stack; intermediate supervision produces a more gradual staircase. At eight hops, a 4 × 8 model roughly advances one hop per iteration, while an 8 × 4 model packs multiple hops into iterations. These are learned schedules at fixed training budgets, not evidence of extrapolation to extra test-time loops.

For shared-permutation donor prompts, patching makes all answers follow the donor after iteration two in two of three highlighted seeds and after iteration six in the third. Across different permutations, the composed-walk answer exceeds chance in only one of five 4 × 8 seeds, reaching 0.19, and in no tested 2 × 16 seed (Appendix C).

## Limitations

- Evidence concerns one synthetic task and models no larger than about 26M parameters; natural-language and pretrained-model generalization remain open.
- The capability grid uses one learning rate, with only selected architectures evaluated across three rates. Iteration embeddings and initialization also differ between families.
- Solve counts use last-query digit accuracy during training; mechanistic evaluations use first-query full-answer accuracy, including the delimiter. These metrics are not interchangeable, and copying prior prompt answers yields about 0.36 on the former.
- Some probes split query rows rather than prompts, allowing shared permutations across fitting and evaluation. Figure 5 also selects seeds with answer accuracy at least 0.95.
- One successful looped seed has weakly decodable middle hops. The logit lens tracks successive nodes in only one seed per iteration budget, and cross-permutation patching does not establish a generally transferable node-update algorithm.
- The supplied Markdown states no explicit publication year or stable paper identifier; year is left unspecified rather than inferred from references.

## Related Concepts

- [[concepts/algorithmic-state-tracking|Algorithmic State Tracking]]: intermediate permutation states make sequential progress measurable.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: separates layer reuse from effective depth.
- [[concepts/latent-reasoning|Latent Reasoning]]: computation proceeds in hidden states without explicit reasoning tokens.

## Related Papers

- [[papers/a-mechanistic-analysis-of-looped-reasoning-language-models|A Mechanistic Analysis of Looped Reasoning Language Models]] studies recurrent convergence and inference stages; this paper instead grounds intermediate states in a known algorithm.
- [[papers/looped-transformers-are-better-at-learning-learning-algorithms|Looped Transformers Are Better at Learning Learning Algorithms]] motivates the iterative inductive-bias perspective cited here.

[[index|Library home]]
