---
title: "RepoAgent: An LLM-Powered Open-Source Framework for Repository-level Code Documentation Generation"
type: paper
authors:
  - Qinyu Luo
  - Yining Ye
  - Shihao Liang
  - Zhong Zhang
  - Yujia Qin
  - Yaxi Lu
  - Yesai Wu
  - Xin Cong
  - Yankai Lin
  - Yingli Zhang
  - Xiaoyin Che
  - Zhiyuan Liu
  - Maosong Sun
year: 2024
tags:
  - code-documentation
  - repository-level-code-understanding
  - large-language-models
  - software-engineering
---

## TL;DR

RepoAgent generates and maintains Python repository documentation by combining abstract-syntax-tree metadata, the repository hierarchy, and statically extracted caller-callee relationships with an LLM. It documents objects in dependency-aware order and uses Git changes to regenerate only affected documentation. In blind preference tests, evaluators preferred its output to existing human-authored documentation for 70% of sampled Transformers pairs and 91% of LlamaIndex pairs, but these preferences do not directly establish factual correctness.

## Research Question

Can an LLM use repository-wide structural and reference context to produce practical documentation for individual code objects and keep that documentation synchronized as the repository changes?

## Motivation

Code summarization methods commonly treat functions or classes in isolation. This can omit how an object fits into the repository, how callers use it, and what downstream objects it invokes. Documentation also becomes stale as code evolves. RepoAgent treats generation and maintenance as one [[concepts/repository-level-code-documentation|Repository-Level Code Documentation]] problem rather than as independent snippet summaries.

## Contributions

- Represents a Python repository as a project tree augmented with bidirectional caller-callee relationships, giving the generator structural and usage context for each class or function.
- Prompts an LLM to produce structured object documentation covering functionality, parameters, implementation behavior, usage notes, and examples.
- Generates documentation bottom-up over the resulting dependency graph so child and referenced-object documentation can inform parent objects.
- Implements [[concepts/change-aware-documentation-maintenance|Change-Aware Documentation Maintenance]] through a Git pre-commit hook that identifies affected objects and refreshes a limited documentation scope.
- Evaluates human preference, reference-relation recall, format adherence, and parameter identification across nine Python repositories and four backend models.

## Method

### Global Structure Analysis

RepoAgent filters a repository to Python files and uses abstract syntax trees to extract classes, functions, names, types, paths, and source snippets. It inserts these objects beneath directory and file nodes in a project tree. Jedi supplies bidirectional reference relationships, represented as caller and callee edges between object nodes. The augmented structure is treated as a directed acyclic graph for documentation scheduling.

### Documentation Generation

For each object, the prompt combines its code, metadata, position in the project tree, and reference relationships. Previously generated documentation for direct children can also be included. The requested output has sections for functionality, parameters or attributes, code description, notes, and, when appropriate, an output example. RepoAgent processes objects in bottom-to-top topological order, then assembles the generated object pages into Markdown and renders them with GitBook.

This design uses deterministic program analysis to supply relationships rather than asking the LLM to recover them from a long undifferentiated context. When prompts exceed a backend's context window, the implementation may switch to a longer-context model or reduce directory and reference detail, making available context dependent on model capacity.

### Documentation Update

A Git pre-commit hook detects staged code changes. RepoAgent updates an object's documentation when its implementation changes, when a previous referrer stops referencing it, or when a new reference appears. The paper intentionally does not trigger an update merely because an object called by the target changes. Updated documentation is staged with the code commit.

## Experiments

The study covers nine Python repositories ranging from at most 1,000 to more than 10,000 lines: unoconv, simdjson, greenlet, code2flow, AutoGen, AutoGPT, ChatDev, MemGPT, and MetaGPT. Backends are GPT-3.5, GPT-4-0125, Llama-2-7B, and Llama-2-70B. A ChatDev case study illustrates generated documentation and incremental updates.

In blind preference tests, three evaluators each judged 50 pairs from a pool of 150 class/function samples per repository. RepoAgent output was selected in 105 of 150 Transformers comparisons (70%) and 137 of 150 LlamaIndex comparisons (91.33%). The protocol asks for an overall judgment across accuracy, completeness, clarity, consistency, relevance, and examples; it does not report dimension-level scores or inter-rater agreement.

For reference recall, the authors sample 20 objects from each of the nine repositories. Their program-analysis context recovers caller and callee relations more reliably than an LSTM summarizer, single-object prompting, or code concatenation up to a 128k context. The long-context baseline's recall declines with increasing context, while single-object prompts produce speculative caller relationships. Exact values are presented graphically rather than tabulated in the parsed manuscript.

Format evaluation finds that GPT and Llama-2-70B backends adhere much more consistently to the requested five-part structure than Llama-2-7B. Parameter-identification accuracy is highest for GPT-4-0125 on most repositories; values range from 0.9527 to 1.0000 across the nine listed repositories. The evaluation separately notes that generated documents are typically 0.4k-1k tokens, while repository context substantially increases prompt-token cost.

## Limitations

- **Python-only analysis:** Reference extraction relies on Jedi, so the implemented system does not support other programming languages.
- **Human review remains necessary:** Generated text may contain hallucinations or miss project-specific conventions and technical details.
- **Backend dependence:** Quality and format adherence vary materially across models, and the stability of open-source backends is not established.
- **Evaluation uncertainty:** Human preference is subjective, no standard benchmark of exemplary documentation is available, and the paper does not report factual-error rates or inter-rater agreement.
- **Context and cost trade-offs:** Repository context produces large prompts. Smaller context windows can force model switching or removal of reference detail.
- **Update-policy assumptions:** The selective invalidation rule deliberately ignores changes to objects called by the target, so semantic effects that cross that boundary may not trigger regeneration.
- **Security and privacy:** Remote API backends may receive repository code, which is a material concern for proprietary projects.

## Related Concepts

- [[concepts/repository-level-code-documentation|Repository-Level Code Documentation]]: uses codebase structure and cross-object relationships to explain local code in its wider context.
- [[concepts/change-aware-documentation-maintenance|Change-Aware Documentation Maintenance]]: maps code and reference changes to selective documentation regeneration.

## Related Papers

- Iyer et al. (2016), "Summarizing Source Code using a Neural Attention Model": the learning-based code-summary baseline used in the reference-recall comparison.
- Sun et al. (2023), "A Prompt Learning Framework for Source Code Summarization": motivates the single-object prompting comparator.
- Khan and Uddin (2022), "Automatic Code Documentation Generation Using GPT-3": related LLM-based documentation generation without RepoAgent's repository graph and update workflow.
- Wang, Tian, and He (2023), "gDoc: Automatic Generation of Structured API Documentation": related structured API documentation generation.

The supplied manuscript names the public implementation at `https://github.com/OpenBMB/RepoAgent` but does not provide a stable paper identifier.

[[index|Library home]]
