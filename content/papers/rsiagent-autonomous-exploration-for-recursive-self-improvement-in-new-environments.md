---
title: "RSIAgent: Autonomous Exploration for Recursive Self-improvement in New Environments"
type: paper
authors:
  - Sibo Zhu
  - Shicheng Fan
  - Xinyue Wang
  - Wenyi Wu
  - Kun Zhou
  - Biwei Huang
year: null
source_job_id: e725ea9b-6f87-4f4f-98a9-153f67b682c0
tags:
  - llm-agents
  - agent-memory
  - computer-use
  - recursive-self-improvement
---

## TL;DR

RSIAgent adapts fixed-weight computer-use agents through curriculum-guided exploration, independent local verification, and persistent memory. Broad parallel practice precedes sequential refinement, including attempts on the target itself; final evaluation reuses frozen memory. Reported partial scores rise from 71.97% to 78.98% on 82 OSWorld tasks and from 83.75% to 84.82% on 67 Agents' Last Exam tasks. These aggregates mix reported RSI runs with retained baseline scores, and comparison systems have different harnesses and budgets. The evidence supports target-conditioned memory adaptation, with narrower implications for generalization and sustained [[concepts/recursive-self-improvement|recursive self-improvement]].

## Research Question

Can agents acquire reusable knowledge of unfamiliar software through autonomous exploration and environment feedback, then improve task execution without updating model parameters or receiving official evaluator feedback during learning?

## Motivation

Pretrained models may lack knowledge of application conventions, hidden constraints, and failure modes. Collecting demonstrations and retraining can be expensive. RSIAgent instead develops [[concepts/environment-grounded-agent-memory|environment-grounded agent memory]] containing procedures, scripts, conditions of applicability, and failure lessons. Existing memory guides the next practice task, allowing experience selection and knowledge consolidation to influence one another (Sections 1-2).

## Contributions

- A curriculum, actor, and verifier architecture with explicit information boundaries and actor-owned memory updates.
- Broad Recursive Self-exploration (BRS) for diverse prerequisite and variant tasks, followed by Deep Recursive Self-exploration (DRS) for target attempts and focused practice.
- A reference lifecycle separating exploration, frozen-memory evaluation, and official scoring.
- Computer-use and game-development evaluations, stage comparisons, artifact-level case studies, and audits of failures in exploration, verification, and consolidation.

## Method

**Roles and evidence.** The actor executes programs and produces candidate artifacts. The verifier checks the original requirements against the environment without access to actor-private reasoning, memory, or execution logs. The curriculum agent sees the target query, outcomes, learning diagnoses, and a disposable memory copy. Only the actor promotes durable memory changes. The reference configuration uses GLM-5.3 as actor and Kimi-K3 for verification, curriculum, and visual observations; a stall-triggered role switch is permitted (Section 3.1; Appendices A.1 and C.2).

**Broad exploration.** The curriculum proposes complementary practice projects around the disclosed target query, without attempting the unchanged target in BRS. Projects in a wave execute in isolated environments using the same immutable memory snapshot. After all verdicts arrive, the original actor contexts consolidate their experiences sequentially in curriculum-authored order, each updating the latest canonical memory. The nominal budget is eight projects with at most four concurrent; checking only after complete waves allows the realized count to exceed eight (Appendices A.2, B.2, and C.2).

**Deep exploration.** In the reference implementation, DRS first attempts the target using BRS memory. After a grounded outcome and memory update, the curriculum may select sequential practice to distinguish competing explanations or test uncertain procedures. Each practice is verified and consolidated before another decision. The default `curriculum_review` policy can continue after a successful target attempt; new practice requires another target attempt. Historical `verifier_pass` runs stop after an accepted target and consolidation. A stalled lineage can end after a final unsuccessful attempt; completion does not imply success (Appendix A.3).

**Memory and freezing.** Distillation retains useful experience, while reconciliation revises contradictions and overgeneralized advice. Memory consists of actor-authored files without a required schema; failures can contribute lessons. Practice produces PASS or FAIL, while target verification can also return UNVERIFIED, which blocks advancement. Final evaluation resets the environment, disables curriculum and memory writeback, and checks the frozen file-tree hash. The official evaluator scores the candidate outside agent contexts. These controls separate final scoring from learning, but do not make the target unseen during exploration (Appendices A-B).

## Experiments

**Computer-use results.** Table 1 reports percentages; partial score averages graded task outcomes, while binary accuracy counts full-credit tasks. The memory-free baseline uses the same actor-verifier harness.

| Benchmark and metric | Without RSI | With RSI | Gain, percentage points |
| --- | --- | --- | --- |
| OSWorld 2.0, 0808 offline, 82 tasks: partial | 71.97 | 78.98 | 7.01 |
| OSWorld: binary | 37.80 | 42.68 | 4.88 |
| Agents' Last Exam, Near-term, 67 tasks: partial | 83.75 | 84.82 | 1.07 |
| Agents' Last Exam: binary | 49.25 | 50.75 | 1.50 |

**Aggregation qualifications.** OSWorld's provisional RSI row replaces baseline values with 41 reported non-diagnostic RSI results; 41 tasks retain baseline values, and T082's setup failure counts as zero in both aggregates. ALE combines 19 RSI-column scores with 48 baseline scores. Replacements retain regressions, but include recorded retries and selected runs with unmatched budgets or evaluation scopes. ALE additionally includes locally corrected grades, ECG results qualified by public-label transfer, and a separate Tax Form variant without BRS. The documented OSWorld expansion selected tasks with less than full baseline credit, excluding already launched lineages and invalid baselines (Appendices C.3-C.4).

RSIAgent's partial scores exceed the paper's reported GPT-6 Astra scores by 6.38 points on OSWorld and 2.56 on ALE. ALE binary accuracy is lower, 50.75% versus 52.24%. These are historical comparisons reported by the source, with different published harnesses and execution budgets, rather than matched evaluations or a current leaderboard claim.

**Stage comparison.** On four selected OSWorld tasks, full RSI averages 74.54% partial score, versus 65.52% for BRS alone and 56.50% for DRS alone. DRS alone falls below the baseline on T085 and T089. The cohort was selected for improvements over recorded baselines; full RSI averages two historical evaluations, whereas single-stage variants use recorded scores and DRS-only permits at most two curriculum practice projects. This supports the combination on these cases without isolating its effect under equal budgets (Section 4.4; Appendix C.5).

**Games.** Table 2 evaluates 40 randomly sampled GameCraft-Bench tasks. Within each generator group, methods start from the same frozen game and use the same development backbone. Overall quality scores are:

| Base-game generator | Baseline | Play2Code | RSIAgent without RSI | RSIAgent |
| --- | --- | --- | --- | --- |
| Codex + GPT-5.5 (high) | 52.77 | 51.05 | 57.84 | 61.28 |
| Kimi-K2.6 | 31.28 | 36.02 | 42.61 | 46.37 |
| GLM-5.3-Flash | 30.55 | 38.25 | 44.73 | 48.72 |
| Qwen3.8-27B | 41.30 | 47.67 | 53.82 | 57.46 |

GLM-5.3-Flash supplies the development actor and verifier; Qwen3.8-27B performs playtesting and final evaluation. Runs allow at most 15 improvement rounds and 26 actor tool calls per round. Full RSI improves on its memory-free variant in all four generator groups (Appendix D).

**Trace-level evidence.** T049's presentation score rises from 0.40 to 0.80 after correcting an arrow endpoint; another slide still earns no credit despite local acceptance. T044 rises from 0.40 to 1.00 by using Shotcut's native crop settings, although both runs remove the watermark and the memory run takes more actor iterations. T065's 0-to-1 booking improvement also involves an explicit current-date clarification absent from the baseline. These selected historical comparisons illustrate memory retrieval and changed artifacts, with confounds that prevent a matched causal estimate (Appendices E.2 and E.5).

**CAD and audio cases.** T103's FreeCAD reconstruction improves from an archival baseline of 0.2500 to 0.6789 and 0.6897 in two frozen-memory evaluations. Traces show reuse of drawing-interpretation procedures and geometric probes, but the first evaluation still has incorrect support and mounting-hole geometry. T085's REAPER task improves from 0.6800 to 0.9417 and 0.9413. Its first evaluation retrieves the retained source-fragment interpretation and revised rendering settings; sentence-gap credit rises from 0.8250 to 1.0000, and processed-ending credit from 0.2837 to 0.8996, removing a binding 0.68 score cap. Source-order credit is unchanged. These are historical known-target comparisons, not matched-budget memory ablations; the audio evaluator approximates sentence boundaries through acoustic activity rather than establishing complete semantic or perceptual correctness (Appendices E.6-E.7).

## Limitations

- Exploration is target-conditioned, and DRS practices the target itself. Frozen-memory evaluation demonstrates reuse on known targets; it does not establish transfer to entirely unseen tasks.
- Mixed baseline/RSI aggregates, selected checkpoints, retries, corrected grades, and unequal budgets limit attribution of the headline gains. The stage cohort and case studies are selected historical comparisons.
- Local verification can approve unsupported field values or incomplete artifacts. Memory can then preserve mistaken rules, such as treating missing information as a negative answer, while further practice fails to challenge them (Section 4.6).
- The paper frames retained action-condition-outcome knowledge as causal discovery, but does not report a general causal-identification guarantee. The case studies document specific probes and procedural revisions.
- Additional exploration can be expensive. The ten-hour reference target watchdog applies to one run, not an entire exploration lineage; finite budgets, stopping policies, and verifier quality constrain the method (Section 7; Appendix C.2).
- Model weights remain fixed, and the demonstrated adaptation primarily changes memory under a supplied learning framework. This does not by itself establish improved ability to redesign the improvement mechanism or indefinite compounding gains.
- The supplied Markdown states no explicit publication year, DOI, or arXiv identifier for RSIAgent. The year is left unspecified; dated experiment records are not publication metadata.
- The supplied Markdown ends at Table A8's caption without its table body. The audio component scores above come from the preceding prose in Appendix E.7; missing table entries are not reconstructed.

## Related Concepts

- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: consolidating execution evidence into conditional procedures and revisable failure lessons.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: distinguishes recurring memory adaptation from improvement of the improver itself.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: a related use of accumulated experience to guide future proposals; RSIAgent's principal evolving object is memory rather than an archive of agent implementations.

## Related Papers

The source cites the following works in Section 5:

- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]]: SICA modifies its own agent scaffold; RSIAgent instead emphasizes environment-specific memory under fixed model weights.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: archive-based scaffold evolution using benchmark feedback, contrasted with RSIAgent's local environment verification during learning.
- [[papers/hyperagents|HyperAgents]]: makes both the task agent and its modification procedure editable, whereas RSIAgent's described adaptation updates memory through a supplied exploration framework.
- Shinn et al. (2023), "Reflexion: Language Agents with Verbal Reinforcement Learning": a predecessor for learning through retained verbal experience.
- Wang et al. (2023), "Voyager: An Open-Ended Embodied Agent with Large Language Models": a predecessor combining automatic curriculum and skill acquisition.
- Zhu et al. (2026), "Hybrid Self-Evolving Structured Memory for Computer-Use Agents": HyMEM combines symbolic nodes and trajectory embeddings for memory retrieval and inference-time updates.

[[index|Library home]]
