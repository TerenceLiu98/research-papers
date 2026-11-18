---
title: "Rolling Memory: A New Approach to Annotation with Generative LLMs in Social and Political Research"
type: paper
authors:
  - Joan C. Timoneda
  - Sebastián Vallejo Vera
year: 2025
tags:
  - in-context-learning
  - text-annotation
  - political-methodology
---

## TL;DR

A second annotation pass initialized with 100 model-generated examples improves GPT-4o classification of political nostalgia. The authors report relative performance gains of 3.56% over standard memory prompting and 13.26% over few-shot chain-of-thought prompting for the last-100 variant. The improvement primarily removes weak early-run performance rather than raising late-run performance.

## Research Question

Does retaining previous model annotations improve performance as a task progresses, and can a second pass seeded with informative annotations eliminate the initial memory warm-up period?

## Motivation

Static demonstrations provide limited task context. Accumulating model-generated text–label pairs may help specify the task through [[concepts/in-context-learning|In-Context Learning]], even without correcting their labels. However, the initial portion of a memory-based run has little contextual support.

## Contributions

- Evaluates performance trajectories over 20 shuffled runs rather than relying on one ordering.
- Introduces two-pass annotation with a bounded rolling memory, comparing last-100 and peak-100 initialization.
- Tests whether repetition alone explains improvements using a repeated few-shot CoT control without retained annotation memory.

## Method

The first pass appends each sentence and its predicted label to conversation history. The second pass revisits the same dataset, starting with 100 first-pass annotations. Last-100 uses the final 100; peak-100 selects the 100-observation subset with the highest average F1 after the first 100 observations. Each new annotation replaces the oldest entry, keeping second-pass memory at 100 items. The authors describe this ordering as ensuring seeded items leave memory before they are annotated again.

GPT-4o runs at temperature 0.7, with other parameters at defaults. Zero-shot requests have no history; few-shot CoT uses ten correctly labeled examples with explanations. Last-100 selection requires no ground-truth labels, whereas peak-100 selection depends on measured F1 and therefore labeled reference data. Human labels remain necessary to validate either procedure.

## Experiments

The task is binary political-nostalgia annotation of party-manifesto sentences from 24 European countries, using Müller and Proksch (2024). From 1,200 annotated sentences, the experiment retains all 151 nostalgic examples and samples 449 non-nostalgic examples. Reported human agreement is κ = 0.56; aggregated-rating reliability is ICC(2,k) = 0.84.

Each approach is evaluated over 20 shuffled runs. Trajectory figures report nostalgic-class F1 in sliding windows of 200 observations.

| Comparison or baseline | Reported result |
| --- | --- |
| Zero-shot | Average F1 0.51 |
| Few-shot CoT | Average full-run F1 0.694 |
| Standard memory | Below few-shot CoT for roughly the first 250 observations; plateaus around 400 |
| Last-100 second pass | 3.56% improvement over standard memory; 13.26% over few-shot CoT |
| Peak-100 second pass | 2.77% improvement over standard memory; 12.39% over few-shot CoT |
| Repeated few-shot CoT without memory | Essentially unchanged trajectories |

The percentages are reported relative improvements, not F1 percentage-point differences. Second-pass early-window gains are approximately 0.13–0.16 F1; performance converges toward the end. The authors favor last-100, which performs better and avoids F1-based example selection (Sections 4–5).

## Limitations

Evidence is limited to one binary task and GPT-4o. The 100-item memory size reflects resource and token constraints rather than an optimization study. Generalization to other languages, rare classes, more labels, prompt wording, and other models remains untested here. Two passes and repeated shuffled evaluations increase inference cost. Performance trajectories support contextual adaptation but do not identify an internal learning mechanism. Peak-100 selection uses labeled performance information and should not be treated as a label-free procedure.

The supplied Markdown omits the bodies of numbered footnotes and does not provide a stable identifier for this paper. The year follows its 2025 copyright and acceptance information.

## Related Concepts

- [[concepts/in-context-learning|In-Context Learning]]: previous annotations specify the task without weight updates; memory quality and ordering shape early performance.

## Related Papers

- Timoneda and Vallejo Vera (2025), *Memory Is All You Need: Testing How Model Memory Affects LLM Performance in Annotation Tasks*, arXiv:2503.04874: the accumulating-memory approach extended here.
- Müller and Proksch (2024), *Nostalgia in European Party Politics: A Text-Based Measurement Approach*: provides the human-annotated evaluation data.
