---
title: "Self-Reference in Large Language Models: The Introspection Threshold for Recursive Self-Improvement"
type: paper
authors:
  - Jiang Zhang
  - Bing Yuan
  - Qian Zhang
year: 2026
publication_status: preprint
tags:
  - large-language-models
  - recursive-self-improvement
  - introspection
  - computability
---

## TL;DR

Zhang, Yuan, and Zhang propose that sustained [[concepts/recursive-self-improvement|recursive self-improvement]] requires an introspection threshold: sufficient capacity to model, simulate, evaluate, and modify one's own computation. They use Kleene's second recursion theorem to motivate self-referential programs and review partial introspective abilities in LLMs. The threshold is a theoretical thesis, not an experimentally established transition; the bounded construction does not by itself guarantee indefinitely improving successors.

## Research Question

What computational capacity would let an AI system improve its ability to improve, and do contemporary LLMs possess that capacity?

## Motivation

The authors connect saturation in self-refinement and dependence on external evaluation to an analogy with von Neumann's self-reproducing automata. An automaton paired with its own description can reproduce its structure; they propose that an AI system instead needs a functional self-model to assess changes to its computation. They separately recognize recursive synthetic-data degradation as an independent obstacle that can affect even a system with a faithful self-model (Section 2.4).

## Contributions

- Organizes self-improving systems by modification layer: prompts/context, memory/skills, weights, and scaffolding code, alongside their verification mechanisms.
- Develops a recursion-theoretic account of bounded self-simulation and a simulate-evaluate-modify construction (Sections 3.2-3.4).
- Defines four functional criteria for [[concepts/functional-introspection|introspection]] and uses them to organize a literature review of LLM self-knowledge.
- Proposes structural barriers involving self-access, recurrent computation, and the causal grounding of self-reports, with possible architectural responses (Section 5).
- Discusses bounded evaluation, successor trust, and an appendix mapping to proof-based Godel machines.

## Method

This is a theoretical argument and narrative literature review. The supplied preprint is dated June 2026 and provides no DOI or arXiv identifier for itself.

**Self-reference.** For a total computable program-index transformation $f$, Kleene's second recursion theorem supplies an index $e$ such that

$$
\varphi_e \simeq \varphi_{f(e)},
$$

where the equivalence concerns computed partial functions. The authors connect this behavioral fixed point to quines and machines paired with descriptions of themselves.

**Bounded introspection.** Section 3.3 introduces a simulation operation $f_T$ with finite execution horizon $T$. The intended construction combines simulation, an evaluator $V$, and a modification operator $M$, written schematically as

$$
f = M \circ V \circ f_T.
$$

Applying the recursion theorem motivates a program that runs a bounded simulation of itself, evaluates the outcome, and produces modified code. The proposed successor sequence depends on choosing evaluation and modification procedures that produce beneficial successors; this requirement is additional to the fixed-point existence result.

**Operational criteria.** The four capacities are self-modeling, self-simulation on hypothetical inputs, self-evaluation against actual outcomes, and self-modification based on discrepancies. The authors additionally emphasize a correspondence between executable machinery and its description, plus recurrence to sustain repeated updates (Section 3.5).

**Architectural proposals.** External self-models and activation-derived features could provide approximate self-knowledge; recurrent architectures and persistent memory could support iteration. Neural quines and a hypothesized synergistic core are discussed as approximate reflective structures. None is implemented or tested here. The appendix proposes replacing local evaluation with a formal global utility predicate and replacing direct mutation with proof search to align the framework with a Godel machine.

## Experiments

The paper reports no original experiments, benchmark scores, ablations, or implementation of its proposed threshold. Sections 4-5 synthesize earlier studies:

| Capacity | Evidence summarized by the authors | Unresolved issue |
| --- | --- | --- |
| Self-modeling | Confidence calibration and internal features associated with knowledge availability | Partial knowledge does not amount to a complete functional self-model |
| Self-simulation | Some studies report better prediction of one's own behavior; others find no advantage over comparable peer models | Privileged self-access remains disputed and task dependent |
| Self-evaluation | Error judgments and behavioral self-reports can track outcomes | Self-preference and flawed reflection can reinforce errors |
| Self-modification | Prompt refinement, skill accumulation, parameter changes, and code revision | Improvement can saturate or depend on external evaluation |

These are reported findings from cited work, not replications. The authors call this collection of partial abilities quasi-introspection and conclude that it falls short of their formal criteria. Functional introspection is explicitly distinguished from subjective consciousness (Section 6.1).

## Limitations

- The paper supplies neither a measurable threshold nor a test establishing that introspection is necessary or sufficient for sustained improvement. Threshold sharpness and minimal sufficient architectures remain open questions.
- A behavioral fixed point does not establish that every successor improves, preserves introspection, or can find another useful modification. Sections 3.4.2-3.4.3 place substantial requirements on the evaluator and modifier.
- Section 6.2 restricts evaluation to finite horizons because unrestricted semantic evaluation and self-certification encounter computability obstacles. Such evaluation does not certify long-term utility. The appendix's proposed proof-based alternative requires utility axioms and successful proofs, beyond the bounded simulation construction.
- The text moves between bounded self-simulation and claims that true introspection requires unbounded recursion. Its discussion of log-precision Transformer complexity also needs the stated model assumptions: Section 3.5.3 itself acknowledges recurrence through autoregressive inference. These arguments do not constitute a general impossibility result for every LLM-based agent system.
- The literature review includes conflicting findings on privileged access and offers no systematic search protocol or common evaluation. Claims about all current LLMs therefore exceed what a unified experimental comparison establishes here.
- Approximate self-models, recurrent processing, and proposed immutable safety constraints are research directions, not validated solutions or demonstrated guarantees.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/functional-introspection|Functional Introspection]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]

## Related Papers

**Library comparison:** [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]] trains improvement operators and evaluates evolutionary program search while explicitly stopping short of sustained autonomous self-improvement. It provides a concrete contrast to this paper's stronger theoretical criterion; this is a library connection, not a claimed citation in the source.

**Works cited by the source:**

- Kleene (1938), "On Notation for Ordinal Numbers," and Cutland (1980), *Computability: An Introduction to Recursive Function Theory*: foundations for the self-reference and introspection construction.
- Schmidhuber (2003), "Godel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements": the proof-based framework compared in the appendix.
- Madaan et al. (2023), "Self-Refine: Iterative Refinement with Self-Feedback," and Huang et al. (2024), "Large Language Models Cannot Self-Correct Reasoning Yet": self-refinement and its limitations.
- Binder et al. (2024), "Looking Inward: Language Models Can Learn About Themselves by Introspection," and Song, Hu, and Mahowald (2025), "Language Models Fail to Introspect About Their Knowledge of Language": contrasting evidence about privileged self-access.

[[index|Library home]]
