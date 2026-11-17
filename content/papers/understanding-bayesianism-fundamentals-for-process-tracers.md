---
title: "Understanding Bayesianism: Fundamentals for Process Tracers"
type: paper
authors:
  - Andrew Bennett
  - Andrew E. Charman
  - Tasha Fairfield
year: 2022
doi: "10.1017/pan.2021.23"
journal: Political Analysis
volume: 30
pages: "298–305"
tags:
  - process-tracing
  - bayesian-inference
  - qualitative-methods
---

## TL;DR

Bennett, Charman, and Fairfield defend Bayesian process tracing by clarifying hypothesis construction, relative evidentiary support, comparisons among multiple explanations, and iterative research. Their central prescription is to compare distinct causal explanations through likelihood ratios and to incorporate all available evidence coherently when expanding the hypothesis set.

## Research Question

How should qualitative researchers apply Bayesian reasoning when explanations share causal factors, evidence has different implications across rivals, and new hypotheses emerge during research?

## Motivation

The article responds to Zaks’s “Updating Bayesian(s).” The authors argue that several objections conflate causal factors with rival explanations or misinterpret the bookkeeping required by Bayesian updating. They aim to clarify both formal inference and the qualitative reasoning that can benefit from Bayesian principles without numerical probabilities.

## Contributions

- Distinguishes mutually exclusive explanations from mutually exclusive causal factors: rival hypotheses can invoke the same factors in different combinations.
- Defines evidentiary import through relative likelihoods, rather than fit to one hypothesis in isolation.
- Shows that comparisons among n hypotheses require only n − 1 independent likelihood ratios for each evidence item.
- Specifies how to reopen the inferential problem when evidence inspires a new hypothesis, preserving the role of all previously collected evidence.
- Separates causal chronology from evidence-analysis order and from the timing of hypothesis discovery.

## Method

The paper develops conceptual arguments and hypothetical examples, organized around the odds form of Bayes’ rule:

$$
\frac{P(H_i\mid E,I)}{P(H_j\mid E,I)}
=\frac{P(H_i\mid I)}{P(H_j\mid I)}
\frac{P(E\mid H_i,I)}{P(E\mid H_j,I)}.
$$

Here I denotes background information. Evidence is neutral between a specified pair when its likelihood ratio equals one. Evidence that appears unrelated to one explanation may nevertheless favor it over a rival that makes the observation less probable.

**Hypothesis construction.** “A acted alone,” “B acted alone,” and a specified form of collusion are exclusive explanations despite sharing causal actors. Broad negations of a hypothesis generally bundle heterogeneous alternatives whose evidence likelihoods are difficult to assess. The authors recommend explicit plausible rivals. They emphasize that Bayes’ rule remains valid for nonexclusive events; exclusivity facilitates a well-posed comparison rather than being a universal prerequisite for the theorem.

**Multiple hypotheses.** Choose a reference hypothesis and assess likelihood ratios against each rival. Ratios between any other pair follow by division of their ratios against the reference. Adding one hypothesis therefore requires one additional independent ratio per evidence item, although eliciting credible likelihoods can still be difficult.

**Iteration.** When a new explanation emerges, expand the hypothesis set, assess its prior odds using the original background information, evaluate its likelihood ratios for all evidence already available, and calculate posterior odds. Further evidence can then be collected. Reopening the problem does not mean discarding earlier observations.

**Timing.** Causal sequences and temporal information in observations matter substantively. Analysis order does not change a correctly calculated joint likelihood: dependent observations require conditional likelihoods. The authors further defend using evidence known before hypothesis formulation, arguing that its weight comes from its relationship to rivals. Disagreement between logically equivalent calculations can reveal inconsistencies in human judgments.

## Experiments

No new empirical experiment or quantitative benchmark is reported. Section 4 illustrates reasoning with three murder hypotheses and equal prior odds. Credit-card receipts placing B out of town favor A acting alone and the specified collusion over B acting alone, while leaving the first two tied. A voicemail in which B directs the victim near the scene favors collusion. On the authors’ qualitative likelihood assessments, the combined evidence ranks collusion first, A alone second, and B alone third. These are illustrative judgments, not measured probabilities or validated detection results.

The conclusion proposes experiments on whether Bayesian training improves intersubjective agreement and case-study inference; it does not report their outcomes.

## Limitations

- Logical coherence does not establish the accuracy of researchers’ priors, likelihood judgments, or chosen explanations. The authors acknowledge cognitive biases and recommend robustness and consistency checks.
- Complex rivals may remain difficult to distinguish with available evidence. The reduction to n − 1 independent ratios concerns mathematical bookkeeping, not the substantive effort of eliciting them.
- The benefits of training and structured discussion for case-study inference remain proposed empirical research questions here.
- The supplied Markdown omits the referenced appendices and footnote text and contains corrupted equation subscripts. Claims assigned to those appendices, including the detailed critique of the RAR framework, cannot be independently assessed from this source.
- The journal year is 2022; the source records online publication on 26 July 2021.

## Related Concepts

- [[concepts/bayesian-process-tracing|Bayesian Process Tracing]]: clarifies hypothesis specification, comparative evidentiary weight, and coherent iteration within this method.

## Related Papers

- [[papers/updating-bayesians-a-critical-evaluation-of-bayesian-process-tracing|Updating Bayesian(s): A Critical Evaluation of Bayesian Process Tracing]]: the critique to which this article responds.
- [[papers/return-to-the-scene-of-the-crime-revisiting-process-tracing-bayesianism-and-murder|Return to the Scene of the Crime: Revisiting Process Tracing, Bayesianism, and Murder]]: companion response that develops implementation objections through the murder example.
- Fairfield and Charman (2017), “Explicit Bayesian Analysis for Process Tracing”: prior methodological foundation cited throughout.
- Fairfield and Charman (2019), “The Bayesian Foundations of Iterative Research in Qualitative Social Science”: source of the expanded-hypothesis updating procedure discussed in Section 5.

Source: DOI 10.1017/pan.2021.23. Summary based on the supplied parsed Markdown.
