---
title: One Model Packs Thousands of Items with Recurrent Conditional Query Learning
type: paper
authors:
  - Dongda Li
  - Zhaoquan Gu
  - Yuexuan Wang
  - Changwei Ren
  - Francis C. M. Lau
year: 2021
source_job_id: "8c658e1a-24d2-487c-97a2-1aca1a5a0f76"
tags:
  - neural-combinatorial-optimization
  - reinforcement-learning
  - strip-packing
  - recurrent-attention
---

## TL;DR

Recurrent Conditional Query Learning (RCQL) learns 2D and 3D online and offline [[concepts/strip-packing|strip-packing]] policies by decoding box selection, rotation, and position sequentially. Each decoder conditions on earlier sub-actions, while recurrent attention carries a bounded context of packed boxes across steps. On synthetic 40-box instances, the small model reports average offline gap ratios of 14.56% in 2D and 31.25% in 3D; one model trained on 200-box instances is also evaluated on problems containing up to 1,000 boxes.

## Research Question

Can an end-to-end reinforcement-learning policy represent mutually conditioned packing actions without a Cartesian-product output space, while retaining enough history to generalize across online and offline strip-packing instances of different sizes?

## Motivation

Packing a box requires ordered, dependent choices: which box to select, how to rotate it, and where to place it. Earlier learning systems either omit some of these dependencies, combine them with hand-crafted placement rules, or encode all boxes at once. The paper argues that these choices produce partial observability, rapidly growing action or memory costs, and models tied to a particular instance size. RCQL combines [[concepts/conditional-query-action-decomposition|conditional-query action decomposition]] with recurrent attention to address those constraints.

## Contributions

- Formulates 2D and 3D, online and offline strip packing as a Markov decision process with packed and unpacked substates.
- Introduces separate conditional-query decoders for box selection, rotation, and position, avoiding an explicit Cartesian product of sub-action spaces.
- Adds FIFO state updates, recurrent attention over packed-box context, and a dense reward based on changes in unused bin volume.
- Evaluates a fixed-size policy across instance sizes ranging from 20 to 1,000 boxes and compares it with heuristic, metaheuristic, and learning-based baselines.

## Method

The environment maintains two contexts: a FIFO sequence of recently packed boxes, including their dimensions and coordinates, and a sequence of unpacked candidate boxes. Each packing step selects a box, chooses one of six 3D rotations, and selects discretized horizontal coordinates; the environment then drops the box to its lowest supported height. Online packing omits box selection.

The packed state passes through a Transformer-style recurrent attention encoder. At every layer, the current hidden state attends jointly to current inputs and cached hidden states from the preceding context. With $L$ layers and a FIFO length $B$, the paper characterizes the available context as extending from $B$ to $L B$ while keeping each local attention window bounded.

Three decoders share the encoded packed-state keys and values but use different queries. The selection decoder queries with unpacked-box embeddings; the rotation decoder queries with the selected box; and the position decoder queries with the selected box after rotation. The full action policy factors into the product of these three sub-action policies.

Training uses an on-policy actor-critic objective with Generalized Advantage Estimation and automatic entropy-temperature adjustment. Rather than rewarding only changes in bin height, the dense reward is the reduction in unused volume. Its undiscounted sum is linearly related to negative final bin height for a fixed set of boxes.

## Experiments

Boxes are sampled from two synthetic uniform distributions: a plain dataset spanning the bin side length and a harder dataset whose dimensions span one quarter of that length. The main 40-box table uses 512 hard-dataset instances. Baselines include MAXRECTS_BL or SKYLINE_BL heuristics, genetic algorithms, simulated annealing, MTSL, a REINFORCE rollout model, and an RCQL ablation without conditional queries.

| Setting | RCQL average gap | RCQL large average gap | Best listed non-RCQL result |
| --- | ---: | ---: | ---: |
| 2D offline, 40 boxes | 14.56% | 13.98% | 15.37% (SA) |
| 2D online, 40 boxes | 15.57% | 14.86% | 21.11% (heuristic) |
| 3D offline, 40 boxes | 31.25% | 30.25% | 33.14% (no query) |
| 3D online, 40 boxes | 48.37% | 46.12% | 49.83% (no query) |

The small model uses three encoder layers, one decoder layer, hidden size 128, and context sizes of 20 packed and 20 unpacked boxes. It is trained for 10,000 steps on 200-box instances with Adam and then greedily decoded at several test sizes. At 1,000 boxes, the paper reports about 21 seconds of inference and a 5.64 percentage-point lower gap ratio than the genetic algorithm. Non-recurrent learning baselines reportedly exhaust training GPU memory beyond 60 boxes.

The context ablation generally favors recurrence, especially with short packed-box contexts. For example, with 30 unpacked and 10 packed boxes, recurrence reduces the reported gap ratio from 31.72% to 26.84%. Increasing context is not uniformly beneficial in every table entry, and a 50-by-50 context reportedly takes several weeks and about 11 GB of training memory.

## Limitations

- All reported training and evaluation data are synthetically generated. The paper does not test transfer to real packing distributions, physical stability constraints, or operational constraints beyond non-overlap, support, and bin boundaries.
- The scalability evidence is asymmetric: RCQL is tested through 1,000 boxes, while learning baselines stop beyond 60 boxes because of reported training-memory limits. This does not isolate architecture from differences in training feasibility.
- The source alternately reports 2.16 million and 2.49 million parameters for the small model, so its exact size is internally inconsistent.
- Comparisons use implementations and reward choices described by the authors; some baselines do not cover online settings, and no uncertainty or significance analysis is supplied for the cross-method differences.
- The recurrence ablation is not uniformly better for every context configuration: at 10 unpacked and 20 packed boxes, the non-recurrent gap ratio is lower than the recurrent result (30.61% versus 32.58%).
- The claim that the method generalizes to any mutually conditioned action problem is broader than the packing experiments presented.

## Related Concepts

- [[concepts/strip-packing|Strip Packing]]: the geometric optimization problem used for evaluation.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: learning policies for discrete optimization problems without optimal labels.
- [[concepts/conditional-query-action-decomposition|Conditional-Query Action Decomposition]]: passing earlier sub-actions into later decoders as queries.

## Related Papers

- Vinyals, Fortunato, and Jaitly (2015), "Pointer Networks": establishes attention-based selection from an input sequence.
- Kool, van Hoof, and Welling (2019), "Attention, Learn to Solve Routing Problems!": supplies the attention-model and rollout-baseline context for learned combinatorial optimization.
- Duan et al. (2019), "A Multi-task Selected Learning Approach for Solving 3D Flexible Bin Packing Problem": the principal learning-based packing baseline discussed by the paper.
- Haarnoja et al. (2018), "Soft Actor-Critic": motivates entropy regularization and automatic temperature adjustment.

[[index|Library home]]
