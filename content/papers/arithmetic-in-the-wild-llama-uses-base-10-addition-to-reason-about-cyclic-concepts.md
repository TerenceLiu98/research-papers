---
title: "Arithmetic in the Wild: Llama uses Base-10 Addition to Reason About Cyclic Concepts"
type: paper
authors:
  - Sheridan Feucht
  - Tal Haklay
  - Usha Bhalla
  - Daniel Wurgaft
  - Can Rager
  - Raphael Sarfati
  - Jack Merullo
  - Thomas McGrath
  - Owen Lewis
  - Ekdeep Singh Lubana
  - Thomas Fel
  - Atticus Geiger
year: null
source_job_id: "46ae8212-ef20-4f5c-af7f-bd243732c17f"
tags:
  - mechanistic-interpretability
  - representation-geometry
  - neural-arithmetic
---

## TL;DR

Llama-3.1-8B answers month, weekday, and hour offset questions using a shared numerical addition mechanism before mapping the sum back to a cyclic concept. Cross-task interventions, Fourier-probe steering, and neuron ablations implicate 28 neurons in the layer-18 MLP. Their periodic structure follows base-10 arithmetic rather than the calendar's own cycle. Circular concept representations therefore do not, by themselves, identify the algorithm used for computation.

## Research Question

Does circular representation geometry imply that a pretrained language model computes calendar arithmetic by rotating within a concept-specific circle, or does it reuse an arithmetic mechanism across domains?

## Motivation

Earlier work found circular month and weekday representations, while toy modular-arithmetic transformers compute with periodic features. These observations motivate a circular-computation hypothesis, but identifying an algorithm requires interventions on intermediate representations and model components. This paper distinguishes the geometry of a concept from the geometry used to compute with it.

## Contributions

- Localizes the combination of input concept and offset to the final-token representation around the layer-18 MLP using [[concepts/distributed-alignment-search|Distributed Alignment Search]].
- Uses bidirectional patching between addition and cyclic prompts to expose a pre-modulo sum, such as six plus August yielding 14 before conversion to February.
- Shows that [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]] learned from addition can steer cyclic tasks.
- Identifies 28 addition-related neurons, about 0.2% of the layer-18 MLP, whose activation patterns and output directions organize into period-specific groups.

## Method

**Tasks and localization.** Enumerate every starting concept and offsets from 1 through twice the cycle length for months, weekdays, and 24-hour time. Standard addition uses both operands from 1 through 100. DAS learns orthonormal low-rank residual-stream subspaces for input concept, offset, and output while freezing the model. Training uses 3,584 prompt pairs and testing uses 512 pairs, sampled from correctly answered prompts. Subspace dimensions range up to 8 for months and weekdays and 16 for hours and addition (Appendix D).

**Cross-task intervention.** Patch within the orthonormalized joint span of source and target output subspaces. If cyclic prompts compute an ordinary sum, patching six months after August into an addition prompt should expose 14; patching a sum of 14 into a month prompt should favor February. Distinguishing sums that lead to the same month tests whether the intermediate state retains the pre-modulo value (Section 3).

**Fourier probes and steering.** Fit affine probes to recover sine and cosine of the sum at candidate periods. Appendix G.1 uses addition operands from 1 through 199 for probe training, a wider range than the baseline task. Periods 2, 5, 10, 20, 50, and 100 are emphasized. Steering modifies probe coordinates toward a target sum, with periods selected by overlap with each task's DAS subspace. The main steering results use amplification factor 10 (Section 4; Appendix G).

**Neuron decomposition.** Select layer-18 neurons whose down-projection direction has normalized overlap greater than 0.4 with the addition output subspace. The threshold is chosen by visual inspection. Analyze their gate, up, and down projections, and test zero ablation, sign reversal, and retention of only these neurons within that MLP. Neurons sharing a period jointly write a vector whose angle approximates the sum modulo that period. Seventeen of 28 meet the appendix's split-activation criterion on hours; in plain addition, inputs appear more mixed (Section 5; Appendix H).

## Experiments

Baseline accuracy from Appendix A, Tables 1-2:

| Task | Prompts | Full offset range accuracy | Offsets within one cycle |
| --- | --- | --- | --- |
| Months | 288 | 65.3% | 81.9% |
| Weekdays | 98 | 71.4% | 91.8% |
| Hours | 1,152 | 70.8% | 97.0% |
| Addition | 10,000 | 97.2% | Not applicable |

Errors concentrate on larger offsets and sums requiring wraparound. Explicit modular-addition prompts also perform poorly, including for moduli 7, 12, and 24.

DAS places the main input-combination step around layer 18. Table 4 reports post-MLP output interchange intervention accuracies of 85.2% for months, 98.3% for weekdays, 94.3% for hours, and 96.6% for addition. Concept-specific output circles become reliably recoverable only around layers 22-25 under the paper's PCA-based circular probes (Section 2).

Addition-to-cycle patching reaches at least 40% accuracy for each cyclic task, with months comparable to clean performance on the evaluated range. Reverse patching distinguishes pre-modulo sums even when they share an output concept. For incorrectly answered month prompts, the correct sum is exposed in 63% of interventions. Some patches instead produce the sum plus 100; the reported above-60% month-to-addition result includes these echoes (Section 3).

Layer-18 ablation results from Appendix H, Table 6:

| Task and range | Clean | Keep only the 28 neurons in this MLP | Zero the 28 neurons |
| --- | --- | --- | --- |
| Weekdays, offsets 1-7 | 91.84% | 89.80% | 40.82% |
| Months, offsets 1-12 | 81.25% | 77.78% | 36.81% |
| Hours, offsets 1-24 | 93.06% | 80.56% | 50.69% |
| Addition, operands 1-100 | 94.60% | 86.36% | 24.11% |

The rest of the network remains intact in the keep-only condition. Table 6's clean accuracies differ from Appendix A's baseline values; the supplied text does not reconcile these differences, so the tables are reported separately. Alternative prompt templates also show sensitivity to these neurons, although both clean accuracy and retained performance vary substantially (Table 7).

## Limitations

- Evidence concerns Llama-3.1-8B, three cyclic domains, and forward addition. Backward offsets, distance questions, and other models are outside the study.
- The downstream mapping from numerical sum to concept is observed but not mechanistically explained. Weekday enumeration is unresolved: cross-task patching uses an empirical +4 adjustment, while Fourier steering uses Saturday as zero (Appendix E).
- Steering requires strong amplification and varies by prompt. Successful average steering does not establish that the selected Fourier coordinates fully determine downstream computation.
- The 28-neuron set is threshold-dependent and may omit neurons needed for larger sums. One hours neuron falls outside the addition set and is excluded from the shared-set analysis.
- DAS is trained on correctly answered prompts and reports the best tested subspace dimension. Its intervention accuracy should not be read as unrestricted task accuracy.
- The supplied Markdown contains extraction artifacts and differing baseline values across tables. No publication year or stable identifier for this paper is supplied; the year is unset.

## Related Concepts

- [[concepts/distributed-alignment-search|Distributed Alignment Search]]
- [[concepts/fourier-features-for-neural-arithmetic|Fourier Features for Neural Arithmetic]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] is cited for circular calendar representations and the circular-probe procedure. The present study investigates the intermediate computation behind related tasks in Llama-3.1-8B.
- Zhou et al. (2024), "Pre-trained Large Language Models Use Fourier Features to Compute Addition," and Kantamneni and Tegmark (2025), "Language Models Use Trigonometry to Do Addition," provide the numerical-representation precedents discussed in the paper.
- Geiger et al. (2023), "Finding Alignments Between Interpretable Causal Variables and Distributed Neural Representations," supplies the DAS methodology.

Code repository listed in the supplied paper: [goodfire-ai/arithmetic-wild](https://github.com/goodfire-ai/arithmetic-wild).

[[index|Library home]]
