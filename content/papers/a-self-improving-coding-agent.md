---
title: A Self-Improving Coding Agent
type: paper
authors:
  - Maxime Robeyns
  - Martin Szummer
  - Laurence Aitchison
year: null
source_job_id: e2aaf842-baff-4ced-8a26-10f4b8c2897e
tags:
  - llm-agents
  - recursive-self-improvement
  - code-generation
  - program-search
---

## TL;DR

SICA improves its Python agent framework by selecting the best archived version to implement the next modification, with the underlying language-model weights fixed. On a fixed random subset of 50 SWE-bench Verified tasks, reported accuracy rises from 17% initially to a peak of 53% at iteration 14 and ends at 51% at iteration 15. Improvements largely concern editing and navigation under a five-minute task timeout; a separate AIME/GPQA experiment shows little improvement. This demonstrates bounded scaffold self-improvement, without establishing sustained, accelerating [[concepts/recursive-self-improvement|recursive self-improvement]].

## Research Question

Can a coding agent autonomously improve its own implementation, including the machinery used to produce subsequent changes, while balancing benchmark performance, execution time, and API cost?

## Motivation

Manually designed prompts, tools, and orchestration can improve an LLM's task performance but require substantial engineering. Automated Design of Agentic Systems (ADAS), the main comparison in the paper's discussion, uses a fixed meta-agent to improve a separate target agent. SICA instead uses the best archived agent as both improver and modification target, so stronger coding tools can participate in later improvement steps. Its search operates over a Python codebase rather than a single function in a restricted design interface (Sections 1-3).

## Contributions

- A self-referential improvement loop with an archive of agent implementations, benchmark outcomes, costs, and execution traces.
- A coding framework with file and shell tools, delegated sub-agents, context management, and asynchronous LLM oversight, whose implementation is available for modification.
- A 15-iteration coding experiment documenting tool changes and their associated benchmark trajectories, plus a reasoning experiment showing limited gains.
- An implementation released by the authors as a reference for agent-system development; no model-weight updates are part of the reported learning loop.

## Method

**Archive-based improvement.** Evaluate agent versions, select the highest-utility archived version, and ask that agent to inspect prior outcomes and implement a useful change to its own codebase. Evaluate the successor and retain its results for later selection. Failed iterations remain available as evidence. This is [[concepts/experience-guided-program-evolution|experience-guided program evolution]] in which the evolving program is also the agent that proposes subsequent edits (Section 3).

**Utility.** For normalized benchmark score $p$, per-problem dollar cost $c$, and elapsed seconds $t$, the selection objective is

$$
U = 0.5p + 0.25\left(1-\min(1,c/10)\right)
    + 0.25\left(1-\min(1,t/300)\right).
$$

The runner cancels a task after 300 seconds. A timed-out run receives $U_{\mathrm{final}}=0.5U$; otherwise it receives $U$. The cost contribution saturates at $10 per problem. Scores select the next improver and base implementation, rather than supplying gradients to the LLMs (Equations 1-2).

**Initial scaffold.** The starting system already includes tools to open, close, and overwrite files, execute shell commands, calculate, submit answers, and inspect the archive. Coding, problem-solving, and reasoning sub-agents return summaries to their caller, allowing task-specific context to be discarded. An asynchronous overseer inspects execution traces every 30 seconds by default, or on key events, and can notify or cancel agents that loop or diverge from their task (Section 3.1).

**Context and tools.** The context contains agent/tool definitions, the task and open-file view, and a growing interaction history. File edits are initially appended as diffs and periodically consolidated into the file view to preserve reusable cached prefixes. Tools and sub-agents are invoked through XML-formatted generations with stop tags (Section 3.1; Appendix C).

**Observed modifications.** Appendix D records smarter diff/range editing, edit verification, context summarization, an AST symbol locator, and hybrid navigation combining ripgrep candidates with AST verification. These are changes observed along one trajectory, rather than independently randomized component comparisons.

## Experiments

**Setup.** The coding run combines 50 fixed random SWE-bench Verified questions, 50 random LiveCodeBench questions, and two synthetic benchmarks. File editing measures closeness to a target file drawn from consecutive repository commits; symbol navigation asks for a definition's file, line, and column given a reference. Most agents use Claude 3.5 Sonnet v2, while the reasoning sub-agent uses o3-mini. The reported API cost of the 15-iteration run is approximately $7,000 (Section 4).

Selected rows from Table 1 are reproduced below. Benchmark columns retain the source's reported scores; the file-editing metric includes content similarity. Cost and time are averages over all benchmark problems, not SWE-bench-only measurements.

| Iteration | File editing | Symbol location | SWE-bench Verified | LiveCodeBench | Mean cost ($) | Mean time (s) |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0.82 | 0.35 | 0.17 | 0.65 | 1.91 | 130.2 |
| 9 | 0.88 | 0.40 | 0.47 | 0.61 | 2.03 | 126.3 |
| 14 | 0.94 | 0.34 | 0.53 | 0.67 | 2.20 | 117.1 |
| 15 | 0.91 | 0.40 | 0.51 | 0.71 | 1.70 | 114.5 |

The headline 53% is the peak SWE-bench score, not the final iteration's score or a full-benchmark result. At that peak, mean cost is higher than initially, while mean time is lower. The final iteration improves both average cost and time relative to iteration 0. Gains are nonmonotonic: for example, SWE-bench performance drops to 27% at iteration 13 before recovering. The final LiveCodeBench score improves by six percentage points over the initial score.

**Reasoning tasks.** A separate run on AIME 2024 and GPQA Diamond shows little improvement (Section 4.1; Figure 4). The authors report standalone o3-mini at high reasoning effort scoring 87% and 79%, respectively, while the initial agent system averages 76% across the two benchmarks. Traces frequently show the main agent delegating directly to the reasoning sub-agent. The suggestion that extra scaffolding can interrupt a trained reasoning model is the authors' interpretation, not an isolated causal finding.

## Limitations

- The short timeout depresses initial performance on long software-engineering tasks. The authors attribute much of the early gain to faster editing and lower resource use, limiting comparison with differently budgeted SWE-bench evaluations (Section 5.1).
- The coding results concern small subsets used in the improvement loop. The supplied text does not describe a separate held-out assessment of the selected scaffold; broader generalization is therefore unresolved.
- Changes accumulate along a short trajectory without isolated ablations. Better downstream task scores do not separately establish improved successor-generation ability or indefinite compounding of gains.
- Initial ideas strongly influence later proposals. The authors report repeated variations on weak themes, expensive unsuccessful iterations, and difficulty generating useful novel modifications.
- The starting scaffold already contains substantial human-designed tools and oversight. Fixed model weights and weak reasoning-task gains constrain the demonstrated scope of self-improvement.
- Observability and the LLM overseer are implemented safeguards. Adding safety benchmarks to successor selection is proposed in Section 6, but no quantitative safety evaluation or guarantee is reported.
- The supplied Markdown provides no explicit publication date, DOI, or arXiv identifier for this paper. The year is left unspecified; dates in its bibliography do not establish its publication year.

## Related Concepts

- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: distinguishes scaffold self-modification from sustained improvement of the improvement process.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: archives outcomes to guide program selection and revision.
- [[concepts/meta-evolution|Meta-Evolution]]: the library's concept concerns training the proposer from experience; SICA instead edits agent code with fixed model weights.

## Related Papers

**Works cited by the source:**

- Hu, Lu, and Clune (2024), "Automated Design of Agentic Systems" (arXiv:2408.08435): fixed meta-agent and separate target-agent search, contrasted with SICA's shared improver/target role.
- Yin et al. (2024), "Godel Agent: A Self-Referential Framework Helps for Recursively Self-Improvement": self-referential modification evaluated on language and mathematical benchmarks, as discussed in Section 2.
- Zelikman et al. (2024), "Self-Taught Optimizer (STOP): Recursively Self-Improving Code Generation" (arXiv:2310.02304): recursive optimization on algorithmic tasks, contrasted with general software-engineering agents.

**Library comparisons, not claimed citations in the source:**

- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]] trains program-improvement operators and evaluates evolutionary search, offering a contrast between changing model weights and changing the agent scaffold.
- [[papers/self-reference-in-large-language-models-the-introspection-threshold-for-recursive-self-improvement|Self-Reference in Large Language Models]] develops stronger theoretical criteria for sustained improvement, against which SICA supplies a bounded empirical example of scaffold revision.

[[index|Library home]]
