---
title: Deep Reinforcement Learning for Scalable Offline Three-Dimensional Packing
type: paper
authors:
  - Hao Yin
  - Hongjie He
  - Fan Chen
year: 2026
venue: AAAI 2026
source_job_id: "b9e35aa0-94cf-41c3-8249-8741fa522f3f"
tags:
  - neural-combinatorial-optimization
  - reinforcement-learning
  - strip-packing
  - three-dimensional-packing
---

## TL;DR

The paper combines a Pack-Q-Network (PQNet), four-direction bidding, and training-free dynamic candidate selection to solve offline three-dimensional [[concepts/strip-packing|strip packing]] with 20 to 1,000 items. On synthetic instances in a 100 by 100 container, the method reports 82.4%-96.0% space utilization and exceeds the strongest listed baseline at each tested item count by 3.2-13.1 percentage points. Its evidence is limited to synthetic cuboids and simplified packing constraints.

## Research Question

Can a deep reinforcement-learning packing policy expand beyond placements allowed by a single heuristic direction while keeping attention costs manageable enough to plan up to 1,000 offline items?

## Motivation

Offline three-dimensional packing jointly chooses an item, one of its rotations, and a feasible placement. Attention-based policies can learn these coupled decisions, but their memory and computation grow with the number of items. Heuristic action masks reduce that cost but can also exclude useful placements. The paper addresses both problems within [[concepts/neural-combinatorial-optimization|neural combinatorial optimization]]: richer placement exploration for solution quality and bounded processing sets for scale.

## Contributions

- Introduces PQNet, an attention-based action-value model that jointly represents rotated unpacked items, available extreme maximal spaces, and already packed items.
- Constructs a bidding-based multi-policy (BBMP) framework in which four parameter-sharing PQNets view the container from its four bottom corners and bid over their feasible actions.
- Proposes dynamic candidate selection (DCS), which reuses a pretrained BBMP model to rank items outside the bounded processing set without additional training.
- Evaluates one method across 20-1,000 items and three container base sizes, with component ablations and tests of generalization across item counts and container sizes.

## Method

The task is three-dimensional strip packing: the container has fixed length and width but variable height, and every cuboid is known before packing. The state contains unpacked-item dimensions, the positions and dimensions of packed items, and available spaces maintained by an extreme maximal space heuristic. An action selects an item, one of six rotations, and an available space. The dense reward is the stepwise reduction in unused volume below the current maximum packing height.

**Pack-Q-Network.** PQNet encodes all six rotations of each unpacked item with a Transformer encoder. A second encoder represents packed items, and a decoder fuses those representations into available-space features through cross-attention. Dot products between rotated-item and space features produce action values; a feasibility mask removes invalid placements. Including packed items is intended to expose occupied geometry that a space-only representation omits.

**Bidding-based multi-policy.** Four homogeneous PQNets correspond to the four bottom corners of an available space. Coordinate reflections make each corner appear as the origin of its network's observation, allowing all four networks to share parameters. Their masked action values are concatenated, and the globally highest-valued feasible action wins the bid. This produces one conflict-free placement while considering four approach directions.

**Dynamic candidate selection.** When the instance exceeds the number of items processed during training, unpacked items are split into a bounded processing set and a larger candidate set. After each placement, DCS uses the pretrained item encoder and space features to estimate each candidate's best prospective value across rotations, spaces, and the four PQNets. The highest-valued candidate enters the vacated processing-set slot. Candidate items query the small processing set rather than attending to one another, keeping the expensive attention context bounded. The selector requires no separate training.

## Experiments

Cuboid dimensions are sampled from synthetic uniform ranges relative to the container. Evaluation covers 20, 30, 50, 100, 120, 200, 500, and 1,000 items in a 100 by 100 container; 50-item tests also use 200 by 200 and 400 by 200 containers. Reported results average 1,024 instances. The proposed method is evaluated over ten independently sampled datasets, for which the paper reports variance below $10^{-6}$.

| Items | Proposed utilization | Best listed baseline | Improvement | Proposed time (s) |
| ---: | ---: | ---: | ---: | ---: |
| 20 | 82.4% | 79.2% (YIN) | 3.2 pp | 0.6 |
| 30 | 85.3% | 81.5% (YIN) | 3.8 pp | 0.9 |
| 50 | 89.1% | 84.1% (YIN) | 5.0 pp | 1.5 |
| 100 | 92.8% | 84.4% (JIANG) | 8.4 pp | 5.4 |
| 120 | 93.2% | 84.8% (JIANG) | 8.4 pp | 6.7 |
| 200 | 94.1% | 81.0% (LAFF) | 13.1 pp | 11.6 |
| 500 | 95.4% | 86.9% (LAFF) | 8.5 pp | 31.9 |
| 1,000 | 96.0% | 90.0% (LAFF) | 6.0 pp | 66.3 |

For 50 items, utilization is 89.1%, 88.8%, and 87.0% on the 100 by 100, 200 by 200, and 400 by 200 containers, respectively. The strongest listed baseline reaches 84.1%, 80.8%, and 77.1% in those settings.

Ablations support each component within the tested setup. At 20, 30, and 50 items, removing packed-item encoding from PQNet lowers utilization by 1.0, 0.5, and 0.7 percentage points; using only one direction instead of BBMP lowers it by 1.4, 0.6, and 0.7 points. Replacing DCS with a candidate queue lowers utilization by 0.5, 0.6, 1.3, and 1.5 points at 100, 200, 500, and 1,000 items. A model trained on 50-item, 100 by 100 instances transfers with only a modest reported decline to nearby item counts and other container sizes, but degrades markedly at 500 items and above relative to models trained at those scales.

## Limitations

- All experiments use synthetically sampled axis-aligned cuboids. They do not establish performance for real logistics distributions, irregular objects, weight limits, load-bearing stability, packing order constraints, or robot accessibility.
- The formulation is offline and deterministic. The paper identifies dynamic online packing as future work.
- Cross-scale generalization is incomplete: the 50-item model degrades markedly on 500- and 1,000-item instances, so the architecture can accept those sizes but one trained policy does not retain peak performance across the full range.
- The strongest comparison changes with scale because several learning baselines are unreported or infeasible at larger item counts. The 3.2-13.1 point advantage therefore does not compare against one consistently available competitor.
- DCS ranks candidates by their estimated next-step packing value. It reduces attention cost but does not provide a guarantee of globally optimal candidate ordering or packing.
- The supplied manuscript reports low variance across ten trials but does not provide confidence intervals or significance tests for comparisons with independently implemented baselines.

## Related Concepts

- [[concepts/strip-packing|Strip Packing]]: the fixed-base, variable-height optimization problem studied here.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: learned construction policies for discrete optimization.
- [[concepts/conditional-query-action-decomposition|Conditional-Query Action Decomposition]]: an alternative factorization of item, rotation, and placement decisions used by CQL and RCQL.

## Related Papers

- [[papers/one-model-packs-thousands-of-items-with-recurrent-conditional-query-learning|One Model Packs Thousands of Items with Recurrent Conditional Query Learning]]: scales attention-based packing with bounded recurrent contexts and a candidate queue; DCS directly targets the information lost by that queue.
- Yin, Chen, and He (2024), "Solving Offline 3D Bin Packing Problem with Large-sized Bin via Two-stage Deep Reinforcement Learning": the YIN baseline and a predecessor using two orthogonal packing directions.
- Jiang, Cao, and Zhang (2023), "Learning to Solve 3-D Bin Packing Problem via Deep Reinforcement Learning and Constraint Programming": a sparse-attention learning baseline.
- Que, Yang, and Zhang (2023), "Solving 3D Packing Problem Using Transformer Network and Reinforcement Learning": a Transformer policy with heuristic plane-feature downsampling.
- Parreno et al. (2008), "A Maximal-Space Algorithm for the Container Loading Problem": the extreme maximal space mechanism used to manage available placements.

Code: [Ashenone511/BBMP-DCS](https://github.com/Ashenone511/BBMP-DCS), as provided in the supplied manuscript.

[[index|Library home]]
