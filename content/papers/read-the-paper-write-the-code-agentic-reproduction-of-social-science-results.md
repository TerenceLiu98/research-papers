---
title: "Read the Paper, Write the Code: Agentic Reproduction of Social-Science Results"
type: paper
authors:
  - Benjamin Kohler
  - David Zollikofer
  - Johanna Einsiedler
  - Alexander Hoyle
  - Elliott Ash
year: null
source_job_id: 2def5b08-883c-4edb-a6fa-9856a691aabe
tags:
  - llm-agents
  - computational-reproducibility
  - social-science
  - code-generation
  - agent-evaluation
---

## TL;DR

This paper tests whether LLM agents can reproduce published social-science results from the paper's methods description and original data without seeing the authors' code or numerical results. Across 48 papers previously verified as reproducible, the strongest systems recover coefficient signs and statistically comparable estimates for a substantial majority of produced coefficients, but performance varies sharply by model, scaffold, and paper. A staged discrepancy analysis attributes failures both to agents and to upstream conditions, especially methods that omit implementation details and unavailable data.

## Research Question

Can an LLM agent reimplement an empirical social-science analysis and recover its published results using only a structured description extracted from the paper and the original data, without access to the paper's numerical results or author-provided analysis code?

## Motivation

Prior automated reproducibility systems commonly give agents the original code and ask them to execute or inspect it. That tests whether a computational package runs, but not whether the paper communicates enough information for an independent implementation. The distinction matters because publications are intended to explain the analysis, while code records implementation decisions that prose may leave implicit. [[concepts/paper-derived-computational-reproduction|Paper-Derived Computational Reproduction]] therefore evaluates the joint adequacy of method reporting, information extraction, and agent implementation.

## Contributions

- A four-stage pipeline that extracts methods, data requirements, and blinded output structures; asks agents to implement one script per output; compares results cell by cell; and traces discrepancies through the pipeline.
- An information-isolated benchmark over 48 human-verified reproducible economics and political-science papers, containing 222 tables and 14,214 populated cells.
- Deterministic numerical evaluation using sign agreement, percentage deviation, deviations scaled by original standard errors, and cell-to-paper letter-grade aggregation rather than an LLM judge for tables.
- A discrepancy-attribution procedure that distinguishes missing data, paper-code mismatch or underspecification, extraction error, and agent noncompliance with the extracted methods.
- Evidence that scaffold-model interaction and computational effort materially affect outcomes: GPT-5.4 with OpenCode is the strongest reported configuration and also uses the most tokens, time, and API cost.

## Method

### Extraction and blinding

An LLM converts each paper into a structured methods description covering the research question, study setting, datasets, transformations, variables, sample restrictions, and table-specific model specifications. A separate extraction represents each original results table as indexed cells with labels and statistic types. Numerical values and significance stars are then removed to form templates for the reproducing agent. Data files are selected from the associated reproduction package, favoring the least preprocessed inputs sufficient for the analysis.

### Isolated reimplementation

The agent receives only the extracted methods, blinded templates, and selected data. It cannot access the original paper, results, or analysis code and must write Python implementations from scratch. The study tests Claude Code with Claude Opus 4.6; Codex CLI with GPT-5.3 Codex and GPT-5.4; and mini-SWE-Agent and OpenCode with GPT-5.4 or GLM-5. Regex-based trace checks, an LLM audit, and a separate hardcoding audit assess whether outputs were genuinely computed within this boundary.

### Deterministic evaluation

Generated and original cells share a structured schema, enabling direct comparison. Every numerical cell is checked for sign and percentage deviation; coefficient discrepancies are also divided by the original reported standard error. Non-near-zero values receive grades A through E at less than 2%, 20%, 40%, 60%, and at least 60% deviation, with sign disagreement assigned E and missing values assigned F. Near-zero originals use absolute-error thresholds. Cell grades are averaged first within tables and then across tables within a paper.

### Error attribution

For outputs below the selected quality threshold, a diagnostic agent compares generated code with original code and identifies distinct implementation divergences. Further audits compare original code against the paper, the paper against the extracted methods, and the extracted methods against generated code, while a data audit separates absent raw inputs from reconstructible intermediate files. This locates a failure at one of several links in the reproduction chain rather than assigning every mismatch to the final agent.

## Experiments

**Dataset and completion.** The final sample comprises 48 papers that the Institute for Replication had classified as fully reproducible. Their packages are mostly written in Stata or R and average 5,324 lines of code. Across systems, agents produce usable results for 92%-100% of papers, 82%-97% of tables, and 52%-72% of populated cells. Average completion is 82% for coefficients and 80% for standard errors.

**Coefficient accuracy.** Among reproduced coefficients, sign agreement ranges from 78% for mini-SWE-Agent with GPT-5.4 to 91% for OpenCode with GPT-5.4, compared with 68% for always predicting a positive sign. More than half of reproduced coefficients from every system lie within 1.96 original standard errors of the published estimate; the OpenCode GPT-5.4 share exceeds 80%. These analyses exclude coefficients the agents failed to produce.

**Table and paper accuracy.** The best system reproduces more than one-fifth of tables at an average A grade and more than 60% within a B grade. Differences between agents narrow after aggregation to the paper level, and descriptive tables are easier than main, mechanism, or robustness tables. Large coefficient discrepancies sometimes reflect unit scaling that the comparison system does not normalize.

**Effort and scaffold effects.** OpenCode GPT-5.4 performs best but makes more than twice as many tool calls as most alternatives and consumes more tokens, elapsed time, and API cost. GPT-5.4 performs differently across OpenCode, Codex CLI, and mini-SWE-Agent, showing that these results characterize model-scaffold systems rather than models alone.

**Failure sources.** More than three-quarters of diagnosed divergences receive an interpretable source. Paper-code mismatch or omitted implementation detail is the largest category; agent errors are second, followed by missing data and extraction errors. Stronger agents sometimes infer an omitted choice correctly, so observed human-attributed failures reflect both underlying underspecification and the agent's ability to resolve it.

**Robustness.** Repeating 20 papers twice with Claude Code and Codex GPT-5.4 yields a table-grade spread of at most one for more than 80% of tables. Coefficient-level variation is larger: about half of comparable estimates differ across run pairs by more than 1.96 original standard errors. A small comparison of five pre-cutoff and five post-cutoff Economic Journal papers finds no statistically significant performance difference, but its sample and verification status limit the leakage conclusion.

## Limitations

- Completion and accuracy are reported on different denominators. Several headline accuracy results exclude missing outputs, so they do not measure end-to-end coverage by themselves.
- Cell, table, and paper grades depend on hand-chosen deviation thresholds and generally omit F grades during aggregation. Near-zero handling and approximate power-of-ten rescaling further shape the metric.
- The 48-paper sample contains only packages already verified as reproducible and is not representative of all empirical social science. Comparisons across disciplines or original programming languages are therefore descriptive.
- Error attribution depends on LLM-generated divergence descriptions and audits, with manual review for suspicious leakage cases. The paper does not establish complete attribution accuracy over all failures.
- Results for reproduced figures are not quantitatively reported because their evaluation would require a visual-language-model judge.
- Multiple runs reveal substantial cell-level stochasticity. Small performance differences between systems should not be treated as precise rankings without more repeated trials.
- The pre-training leakage analysis uses only ten additional papers, and those papers had not received the same independent reproducibility verification as the main sample.
- Higher performance and greater effort are correlated across systems, but the observational comparison does not isolate the causal contribution of tokens, runtime, scaffold design, or model capability.
- The supplied Markdown does not state a publication year, venue, DOI, arXiv identifier, or repository URL; those metadata remain unset.

## Related Concepts

- [[concepts/paper-derived-computational-reproduction|Paper-Derived Computational Reproduction]] tests whether a study can be independently reimplemented from its reported methods and data rather than rerun from author code.
- [[concepts/llm-based-strategic-experimentation|LLM-Based Strategic Experimentation]] raises related requirements for preserving prompts, model settings, outputs, and code when LLM agents themselves participate in experiments.
- [[concepts/automation-bias|Automation Bias]] is relevant when users accept an agent's apparently successful reconstruction without independently checking its implementation and outputs.

## Related Papers

Works cited in the source, without matching Paper pages found in this library:

- Hu et al. (2025), "REPRO-Bench: Can Agentic AI Systems Assess the Reproducibility of Social Science Research?": evaluates agents with access to original analysis code.
- Starace et al. (2025), "PaperBench: Evaluating AI's Ability to Replicate AI Research": benchmarks paper-to-reproduction systems in machine learning.
- Nguyen et al. (2026), "ReplicatorBench: Benchmarking LLM Agents for Replicability in Social and Behavioral Sciences": asks agents to test hypotheses on newly retrieved data rather than reproduce results on the original data.
- Xu and Yang (2026), "Scaling Reproducibility: An AI-Assisted Workflow for Large-Scale Replication and Reanalysis": also uses deterministic comparisons of reproduced coefficients while providing original code.

Additional library connection, not a citation attributed to this paper:

- [[papers/an-experimental-design-approach-to-evaluating-agentic-ais-autonomous-model-discovery|An Experimental Design Approach to Evaluating Agentic AI's Autonomous Model Discovery]] evaluates agent-scaffold performance, resource use, and stochastic research behavior in a different autonomous-research setting.

[[index|Library home]]
