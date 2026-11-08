---
title: "Logic Before Language: Pre-pretraining on Formal Derivations Fosters Skill Acquisition and Compressibility"
type: paper
authors:
  - Jo-Ku Cheng
  - Nikolaos Aletras
  - Marco Valentino
year: null
source_job_id: "c72bd1bb-1427-436a-ac5f-911c02210513"
tags:
  - symbolic-pre-pretraining
  - formal-logic
  - language-model-pretraining
  - representation-geometry
  - model-pruning
---

## TL;DR

The paper initializes a 254M-parameter language model by training its Transformer backbone on synthetic formal-logic derivations before approximately 100B tokens of natural-language pretraining. Compared with ordinary pretraining and symbolic baselines based on formal languages or algorithms, Logic-PPT reaches an 80% elemental-task threshold with 36B fewer natural-language tokens, finishes at 87.4% mean accuracy on 17 selected tasks, and is more robust to Wanda pruning. Its activation and weight spectra are also more concentrated, although the main long-run comparisons use one seed and do not test post-training or broad downstream transfer.

## Research Question

Can [[concepts/symbolic-pre-pretraining|Symbolic Pre-pretraining]] on formal derivations impart transferable structural biases that accelerate natural-language skill acquisition, persistently reorganize a model's internal representations, and improve robustness to weight pruning?

## Motivation

Earlier symbolic pre-pretraining uses narrow primitives such as bracket languages, set operations, or sorting. These tasks isolate hierarchy or procedural transformations but do not jointly exercise variable binding, quantification, relational dependencies, and predicate-argument composition. Their evaluations also commonly use fewer than 10B subsequent language tokens, leaving the persistence and internal effects of their initialization unclear. Formal derivations provide a richer controlled source of structure and allow the paper to study behavioral, mechanistic, and compression outcomes over a longer training horizon.

## Contributions

- Introduces Logic-PPT, which trains a Transformer backbone to predict the next step in synthetic propositional, term-logic, and first-order derivations before natural-language pretraining.
- Curates 247 inference-rule schemata and generates proof trees through backward chaining, structure-preserving symbol renaming, and post-order serialization.
- Compares logic, formal-language, algorithmic, and random initialization under roughly matched symbolic token budgets and the same approximately 100B-token language-pretraining setup.
- Tracks learning with held-out perplexity, BLiMP, and 17 elemental tasks, rather than evaluating only final checkpoints.
- Relates behavioral differences to layerwise centered kernel alignment, activation RankMe and spectral decay, weight stable rank, and robustness under Wanda pruning.

## Method

Logic-PPT begins with a library of 49 propositional, 77 term-logic, and 121 first-order schemata. A generator samples a goal and applies compatible rules backward for at most ten expansions. The leaves become premises, while a post-order traversal yields a valid forward derivation. Five injective symbol-renaming variants preserve each tree's topology and rule sequence while varying its surface form.

Each derivation becomes a sequence of next-step prediction examples containing the premises, previously derived steps, and final goal. A character-level model is trained with loss only on the target step. After this symbolic stage, the logic-specific embedding and output head are discarded; the 14-layer Qwen3-style Transformer backbone is retained and attached to newly initialized Mistral-tokenizer embeddings and head. All parameters are then trained on FineWeb-Edu with a causal language-modeling objective.

The model has a 220M-parameter backbone and 254M parameters in total. Logic-PPT observes 2.600B symbolic tokens. Formal-PPT uses Dyck and Shuffle-Dyck data, Alg-PPT uses set, sort, and union tasks, and PT starts the language stage from random initialization. The symbolic budgets are approximately matched, though task-specific sequence lengths, loss positions, and some optimization settings differ.

For mechanistic analysis, the authors extract final non-padding-token activations from 15,000 held-out examples. CKA measures layer similarity; RankMe and covariance spectral decay characterize activation-space dimensionality; and stable rank characterizes attention and MLP weight spectra. Wanda pruning then removes weights according to magnitude times input-activation norm at sparsities up to 40%.

## Experiments

All four conditions undergo approximately 108.6B tokens of natural-language training. Logic-PPT opens an early perplexity advantage over PT, but the final differences are small: 11.074 for Logic-PPT and Formal-PPT, 11.088 for Alg-PPT, and 11.183 for PT. BLiMP also saturates early and separates the conditions only weakly.

The 17 selected elemental tasks continue improving. Logic-PPT reaches 80% mean accuracy with 36B fewer language tokens than PT and finishes at 87.4%, compared with 80.3% for Formal-PPT, 77.3% for PT, and 76.8% for Alg-PPT. Its largest category advantages are reported for morphology, reading comprehension, and compositional tasks, where it exceeds the strongest competing condition by 5.5 to 6.7 percentage points.

Layerwise CKA develops clearer block structure under Logic-PPT, and its middle layers remain less similar to PT at the final checkpoint. During the later compression-seeking phase, Logic-PPT has lower RankMe and faster spectral decay in middle and upper layers. Its attention and MLP weights also continue contracting in stable rank during symbolic training after the other symbolic conditions largely plateau. These measurements establish different spectral organization; interpreting it as a more efficient computation remains a hypothesis rather than a direct causal result.

Under Wanda pruning, Logic-PPT retains the highest mean elemental-task accuracy across nearly all reported categories and sparsity levels. At 40% sparsity, its accuracy falls from 0.87 to 0.745, a 14.4% relative decrease, versus 24.7% for PT, 22.0% for Formal-PPT, and 31.6% for Alg-PPT. It also has the smallest reported FineWeb-Edu perplexity increase. At approximately 33% sparsity, its performance is comparable to the dense PT baseline.

## Limitations

- The model is limited to one 254M-parameter Qwen3-style architecture, so the results do not establish scaling behavior across model sizes or families.
- The main 100B-token behavioral, geometric, and pruning comparison uses one run per condition. Three-seed checks cover only CKA at 10B language tokens, not the final results.
- The study is primarily English-language and does not evaluate multilingual transfer.
- It does not test whether the advantage survives supervised fine-tuning, instruction tuning, or broader downstream reasoning and question-answering tasks.
- The symbolic conditions match observed tokens only approximately and differ in sequence length, vocabulary, loss positions, learning rate, and dataset construction.
- The 17-task analysis retains tasks for which at least one condition reaches 80% within the budget; full-suite trajectories are supplied, but the headline aggregate is therefore selection-conditioned.
- CKA, spectral concentration, and stable rank are observational measurements. The pruning experiment demonstrates a functional difference but does not isolate which geometric change causes it.
- The supplied manuscript gives no stable paper identifier or explicit publication year.

## Related Concepts

- [[concepts/symbolic-pre-pretraining|Symbolic Pre-pretraining]]
- [[concepts/self-play-pretraining|Self-Play Pretraining]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]
- [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]

## Related Papers

References discussed in the supplied paper:

- Hu et al. (2025), "Between Circuits and Chomsky: Pre-pretraining on Formal Languages Imparts Linguistic Biases": provides the formal-language pre-pretraining baseline and evidence for linguistic transfer from Dyck-like data.
- Jiang et al. (2026), "Procedural Pretraining: Warming Up Language Models with Abstract Data": provides the algorithmic and procedural comparison used by Alg-PPT.
- Liu et al. (2026), "What Do Language Models Learn and When? The Implicit Curriculum Hypothesis": supplies the elemental-task framework used to track skill acquisition.
- Li et al. (2025), "Tracing the Representation Geometry of Language Models from Pretraining to Post-training": motivates the RankMe and spectral-decay analysis of training phases.
- Sun et al. (2023), "A Simple and Effective Pruning Approach for Large Language Models": introduces Wanda pruning, used for the compression intervention.

Related library reading, without implying citation beyond the list above:

- [[papers/self-play-pretraining-with-zero-data|Self-Play Pretraining with Zero Data]] studies adaptive synthetic pre-pretraining from generated programs rather than fixed symbolic derivations.
- [[papers/convergence-without-understanding-when-language-models-agree-on-representations-but-disagree-on-reasoning|Convergence Without Understanding: When Language Models Agree on Representations but Disagree on Reasoning]] separates representational similarity from functional equivalence.

[[index|Library home]]
