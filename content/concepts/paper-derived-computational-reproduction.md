---
title: Paper-Derived Computational Reproduction
type: concept
aliases:
  - Code-Free Research Reimplementation
  - Methods-to-Code Reproduction
tags:
  - computational-reproducibility
  - llm-agents
  - research-methods
  - code-generation
---

## Overview

Paper-derived computational reproduction tests whether an empirical result can be regenerated from the study's reported methods and original data without access to the authors' analysis code or numerical results. The reproducer must reconstruct the analysis as an independent implementation. This differs from rerunning a reproduction package, which primarily tests whether supplied code executes, and from replication, which applies a hypothesis or method to new data.

The task evaluates a chain of representations: the paper describes the method, an extractor may convert that description into a structured specification, an implementation realizes the specification in code, and an evaluator compares generated outputs with published results. A mismatch can originate at any link, so reproduction accuracy is simultaneously evidence about reporting completeness, extraction fidelity, implementation behavior, and data availability.

## Key Ideas

- **Information isolation is part of the construct.** Access to original code or unblinded results changes reimplementation into code reuse, retrieval, or iterative result matching. Workspaces and traces should make the permitted information boundary auditable.
- **Output structure can be visible while values remain blinded.** Row labels, column labels, statistic types, and model descriptions guide implementation without disclosing the target numbers.
- **Deterministic comparison is possible for structured outputs.** Aligned table cells support sign checks, absolute or percentage error, and uncertainty-scaled distance. Missing outputs must remain visible because conditional accuracy among completed cells can overstate end-to-end success.
- **Failure attribution should follow the representation chain.** Useful categories include absent raw data, disagreement or silence between paper and code, lossy method extraction, and implementation that contradicts or omits the extracted specification.
- **Underspecification is behaviorally resolved, not merely observed.** Two agents can react differently to the same missing coding rule, filter, or estimator detail. One may infer the original choice and appear successful while another exposes the reporting gap through a divergent result.
- **Model and scaffold form the evaluated system.** Tool interfaces, context management, execution loops, budgets, and stopping behavior can change outcomes even with the same underlying model.
- **Reproduction is distinct from robustness analysis.** Recovering the original implementation asks what the authors did. Testing reasonable alternative specifications asks whether the conclusion survives other defensible choices.

## Important Papers

- [[papers/read-the-paper-write-the-code-agentic-reproduction-of-social-science-results|Read the Paper, Write the Code: Agentic Reproduction of Social-Science Results]]: builds an information-isolated methods-to-code benchmark over 48 reproducible social-science papers and attributes numerical failures across the reproduction chain.
- Hu et al. (2025), "REPRO-Bench: Can Agentic AI Systems Assess the Reproducibility of Social Science Research?": studies automated reproducibility assessment when agents receive original code.
- Starace et al. (2025), "PaperBench: Evaluating AI's Ability to Replicate AI Research": evaluates autonomous reconstruction of machine-learning research artifacts.
- Dreber and Johannesson (2025), "A Framework for Evaluating Reproducibility and Replicability in Economics": distinguishes rerunning code, reimplementing from paper and data, robustness analysis, and replication on new data.

## Related Concepts

- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]] concerns reproducible experimental use of changing, stochastic language-model systems.
- [[concepts/automation-bias|Automation Bias]] can cause users to over-trust generated code or plausible-looking reproduced tables without checking their computational provenance.
- [[concepts/research-data-sharing-incentives|Research Data-Sharing Incentives]] address whether the inputs needed for independent reproduction are made available and usable.
