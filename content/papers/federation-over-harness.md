---
title: Federation over Harness
type: paper
authors:
  - Dixi Yao
  - Tahseen Rabbani
  - Tian Li
year: 2026
source_job_id: e06d0271-a86c-4dd8-9dcb-6e39887927b7
tags:
  - llm-agents
  - agent-harnesses
  - recursive-self-improvement
---

## TL;DR

Federation over Harness (FoH) uses distributed client reflections to evolve both a shared task-solving harness and the server harness that designs its successors. Evolution receives no ground-truth labels or benchmark scores. The reported final harness reaches 78.44% on ClawEval and 58.8% held-out success on ScienceAgentBench, versus 56.60% and 11.8% for fixed ReAct agents. Improvements depend strongly on reflection and shared-memory guidance; absence of performance supervision does not guarantee beneficial updates.

## Research Question

Can distributed agents improve both task execution and the procedure for aggregating experience and revising harnesses using only their own reflections?

## Motivation

Distributed agents encounter different tools, files, and runtime environments. Sharing distilled experience can transfer useful procedures without centralizing execution, but fixed aggregation and reflection workflows limit adaptation. FoH makes these workflows editable, extending experience sharing to [[concepts/metacognitive-self-modification|metacognitive self-modification]].

## Contributions

- A two-stage server update that revises the server harness before generating the next shared client harness.
- Joint evolution of insight libraries, prompts, and executable helper components within human-defined boundaries.
- Held-out daily-task and scientific-task evaluations, component ablations, token accounting, and exploratory leakage tests.

## Method

Clients pull a shared harness, solve local tasks, and upload concise reflections. The server uses the same reflection snapshot first to revise its own aggregation and evolution harness, then to revise the client harness under the updated server procedure (Section 3, Algorithm 1). Shared insights evolve alongside prompts and tools. The underlying model is not trained.

Plaintext client and server guides define the editable scope. Appendix B fixes the Hermes execution kernel, transport, credentials, budgets, evaluators, and runtime contracts while permitting role overlays, prompts, and helpers to change. Validation-free means no external task-performance supervision: code compilation, interface checks, mocked execution, and runtime error detection remain permissible. Benchmark outcomes are inaccessible during evolution.

The implementation represents harnesses as code repositories. Main experiments use synchronous aggregation; asynchronous updates and locally personalized harnesses are proposed extensions, requiring the server to account for the source harness behind each reflection.

## Experiments

Daily-task evolution uses 23 PinchBench V1 tasks for 15 iterations, with 124 subsequently added PinchBench tasks and ClawEval reserved for evaluation. Table 1 reports DeepSeek-V4-Flash as the base model and GPT-Luna-5.6-Pro (High) as judge. ScienceAgentBench uses equal domain-stratified reflected and held-out halves, five evolution iterations, and Claude Opus-5.5 (High), as named in the source.

| Method | PinchBench V1 | Held-out PinchBench | ClawEval | Science held-out VER | Science held-out SR |
|---|---:|---:|---:|---:|---:|
| Isolated ReAct | 83.98 | 84.80 | 56.60 | 78.4 | 11.8 |
| FoT | 92.77 | 90.53 | 74.41 | 88.2 | 21.6 |
| RHO | 86.11 | 80.72 | 65.83 | 76.5 | 31.4 |
| FoH, fixed server | 93.10 | 91.51 | 76.53 | 86.3 | 52.9 |
| FoH | 94.47 | 92.86 | 78.44 | 88.2 | 58.8 |

Values are percentages from Tables 1–2; VER is valid execution rate and SR is success rate. Evolving the server adds 1.91 percentage points on ClawEval and 5.9 points in held-out scientific success relative to the fixed-server ablation. Removing the insight library, local reflection, or tool evolution reduces held-out scientific SR to 19.6%, 15.7%, and 19.6%, respectively. The no-reflection ablation uploads raw trajectories rather than removing experience transmission altogether.

Daily-task output tokens are 519K total and 414K for task completion, versus 645K for isolated agents. Scientific-task completion uses 1.27M versus 1.91M tokens, but total consumption rises to 2.55M versus 1.91M. Thus lower task-completion cost does not imply lower total cost in every setting. RHO totals are 15M and 17.65M, respectively.

Appendix C adds two independent FoH runs for the daily-task application: reported means and 95% confidence intervals are 93.96% ± 2.58%, 92.53% ± 1.63%, and 78.32% ± 0.43% for existing, held-out, and new tasks. Repeated evaluation of an identical harness is separately reported and does not measure variation across independent evolution runs.

## Limitations

- No external performance signal guarantees that a server update improves the harness. Guide design materially affects stability and transfer.
- Main tables emphasize one evolution run; the additional independent-run analysis concerns the daily-task application. Isolated daily-task agents receive best-of-15 reporting, while evolved methods use their final harness.
- Methods requiring external validation are excluded. The RHO comparison adapts its fixed optimization procedure to the shared federated setting.
- Asynchronous aggregation, personalized harnesses, and thousands of heterogeneous clients are not experimentally established here.
- Appendix D finds no detected secrets, identity entries, or absolute paths in shared reflections under its tested detectors, but reconstruction similarity remains nonzero. These tests do not establish comprehensive privacy or robustness against malicious reflections.

## Related Concepts

- [[concepts/metacognitive-self-modification|Metacognitive Self-Modification]]: the server's procedure for constructing later revisions is itself editable.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: FoH supplies bounded harness-level evidence, without demonstrating indefinite improvement.
- [[concepts/regularized-harness-evolution|Regularized Harness Evolution]]: a contrasting approach to controlling unreliable edits through explicit proposal and selection constraints; FoH relies on reflection and guide boundaries without performance-based acceptance.

## Related Papers

- Federation over Text (Yao et al., 2026; source reference 10): shares an insight library while retaining fixed harness workflows; FoH also evolves prompts and tools.
- Evolving Agents in the Dark (Pan et al., 2026; source reference 11): RHO uses retrospective self-preference under a fixed evolution procedure.
- [[papers/hyperagents|HyperAgents]]: also makes the modifier editable; its fixed-modifier transfer tests address a different evidential question from FoH's federated reflection-only updates.

Source: supplied parsed preprint, Sections 1–6 and Appendices B–D. The supplied text gives no stable identifier for this paper; the year follows its 2026 experimental and reference context.
