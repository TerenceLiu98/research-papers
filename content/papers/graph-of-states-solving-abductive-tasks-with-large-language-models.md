---
title: "Graph of States: Solving Abductive Tasks with Large Language Models"
type: paper
authors:
  - Yu Luo
  - Rongchen Gao
  - Lu Teng
  - Xidao Wen
  - Jiamin Jiang
  - Qingliang Zhang
  - Yongqian Sun
  - Shenglin Zhang
  - Jiasong Feng
  - Tong Liu
  - Wenjie Zhang
  - Dan Pei
year: null
source_job_id: "2c065f16-c5e9-4183-8690-fb001c1f9d29"
tags:
  - abductive-reasoning
  - llm-agents
  - neuro-symbolic-reasoning
  - root-cause-analysis
  - tool-use
---

## TL;DR

Graph of States (GoS) organizes interactive abductive reasoning around an explicit causal graph of symptoms, evidence, and hypotheses plus a state machine for drill-down and backtracking. With GPT-5.1 as the common backbone, GoS reports higher exact-match performance than eight single- and multi-agent reasoning baselines on 138 medical cases and 150 production-system incidents, while costing substantially less than the strongest Forest-of-Thought baseline. The evidence covers only two diagnostic domains, the production incident data are not public, and the remaining failures show that explicit state control does not replace domain expertise.

## Research Question

Can an LLM system investigate incomplete, dynamically acquired evidence more reliably by representing its current beliefs explicitly and controlling when it deepens or revises a hypothesis?

## Motivation

Deductive reasoning frameworks usually search over text-based thoughts under a comparatively fixed problem statement. Abductive tasks instead require a system to seek evidence, revise plausible causes non-monotonically, and decide when a coarse explanation is specific enough. The paper identifies four recurring failures when Chain-of-Thought, Tree-of-Thought, Graph-of-Thought, and Forest-of-Thought are applied to this setting: fabricated evidence, loss of investigation context, failure to backtrack after contradiction, and premature stopping at a superficial cause.

GoS addresses these problems through [[concepts/explicit-belief-state-control-for-abductive-reasoning|Explicit Belief-State Control for Abductive Reasoning]]. It also uses role-specialized agents, connecting the method to [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]], but attributes its main structural intervention to the shared symbolic state and transition rules rather than agent count alone.

## Contributions

- Formulates interactive abduction as iterative acquisition of initially hidden evidence followed by posterior refinement over possible root causes.
- Introduces a dual-layer architecture: a role-based cognitive layer plans and executes tool calls, while a symbolic layer maintains a causal graph and reasoning-depth state.
- Defines evidence-grounded graph updates, a highest-confidence reasoning focus, ancestor-sensitive backtracking, and threshold-controlled drill-down.
- Evaluates the same framework in medical diagnosis and production distributed-system failure diagnosis, including component ablations, sensitivity analysis, cost measurements, and manual failure analysis.
- Releases code and prompts according to the paper.

## Method

The cognitive layer contains a central orchestrator and domain-role experts. Given surface observations, the central agent initializes coarse hypotheses. Experts then use ReAct-style tool calls to acquire deeper evidence, while the central agent incorporates returned observations into the symbolic layer. Medical roles are Primary Physician, Laboratory Physician, Pathologist, and Radiologist; the systems setting uses an Application Operator with Linux, Network, and Database operators.

The symbolic belief state is $B=(G,S)$. The directed graph $G$ contains symptom, evidence, and hypothesis nodes. Its edges record derivation, refinement from coarse to fine hypotheses, and evidential support or refutation. Each hypothesis has a confidence and semantic level. At a given level $S_t$, the system selects the highest-confidence hypothesis as its reasoning focus, concentrating the next investigation on that branch.

After tool observations arrive, the system recalibrates hypothesis confidence, adds grounded evidence or hypothesis nodes, and creates their logical edges. A backtrack occurs when contradictory evidence demotes an ancestor of the current focus: descendants below the shallowest demoted level are pruned and the state returns to that level. Drill-down requires both a confidence gap above threshold $\delta$ and at least $\eta$ supporting evidence nodes. If the leading hypothesis remains too coarse, the central agent creates finer sub-hypotheses and increments the state; otherwise it reports the result. The main experiments cap GoS at three neuro-symbolic interaction iterations and each expert at three retrieval actions.

## Experiments

The medical experiment reformulates DiagnosisArena as an interactive task. Auxiliary records are hidden until the system requests an examination. The authors use 138 of 150 sampled cases after excluding 12 cases they judge factually flawed or logically unreachable. Evaluation uses both an LLM judge and a clinical researcher on a three-point scale, reported as Match (exact score 2) and Relevant (score 1 or 2). GoS obtains 31.88% Match and 74.64% Relevant with the LLM judge, and 39.86% Match and 78.99% Relevant with the human judge. Its reported cost is \$0.12 per case. The strongest baseline depends on metric, but Multi/FoT reaches 26.09% human Match and 65.94% human Relevant at \$0.73 per case.

The systems experiment uses 150 incidents collected from a production observability platform. Models begin with alerts and must query logs, metrics, and restricted shell observations. Under the LLM judge, GoS reaches 70.67% Match and 88.00% Relevant at \$0.10 per case. The best baseline Match is 34.00% from Multi/CoT; Multi/FoT has the best baseline Relevant score, 86.67%, at \$0.94 per case. The paper interprets the much larger Match gap as evidence that explicit drill-down helps distinguish fine-grained causes from broad failure categories.

Ablations on the medical task report 31.88% Match for full GoS, 19.57% without reasoning focus, 18.12% with a structured-text state instead of the causal graph, and 12.32% after removing either the causal graph or state machine. Removing the state machine raises cost from \$0.12 to \$0.17 per case. Sensitivity results indicate that larger reasoning budgets generally help, while overly strict confidence and evidence thresholds favor coarse but relevant answers over exact diagnoses.

Manual analysis of failure cases reports evidence fabrication in 0% of GoS failures versus 22.22% of pooled baseline failures, context drift in 9.70% versus 41.32%, failed backtracking in 30.90% versus 52.78%, and early stopping in 18.75% versus 63.89%. These are prevalence rates among non-exact failure cases, the categories can overlap, and the pooled baseline and GoS failure sets differ in size. Wrong action selection remains prominent, especially in medicine, which the authors connect to missing domain knowledge rather than state representation alone.

## Limitations

- Evaluation is restricted to medical and distributed-systems diagnosis, so the claim of a general-purpose abductive framework is not tested in other proposed domains such as criminal investigation.
- The production incident dataset and interaction traces cannot be released because they contain confidential operational information. This limits independent reproduction of the systems results.
- Medical evaluation depends on the authors' exclusion of 12 DiagnosisArena cases and on one reported clinical researcher contributing more than 110 hours of judgment. The supplied text does not describe independent adjudication or inter-rater agreement.
- All methods use GPT-5.1, and the supplied study does not establish whether the same relative gains hold across model families or weaker backbones.
- LLM-as-a-Judge is reported as unstable and biased toward longer medical answers. Human scores mitigate this concern only for the medical domain; systems evaluation remains judge-model based.
- Failure percentages are conditioned on each method's remaining failures and are non-exclusive. A lower percentage supports a change in observed error composition but does not by itself measure absolute error counts.
- GoS still suffers wrong action selection, failed backtracking, and budget-driven early stopping. Its state machine depends on confidence estimates, thresholds, granularity judgments, and evidence interpretation produced by language-model agents.
- The supplied Markdown gives no publication venue, year, DOI, or arXiv identifier, so those fields are not inferred here.

## Related Concepts

- [[concepts/explicit-belief-state-control-for-abductive-reasoning|Explicit Belief-State Control for Abductive Reasoning]]
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|Decoupled Scientific Reasoning and Tool Orchestration]]: another division between reasoning and execution, but without GoS's hypothesis-level causal graph and drill-down/backtracking rules.
- [[concepts/reasoning-knowledge-vectors|Reasoning Knowledge Vectors]]: represents abductive reasoning through model activations rather than an external investigation state.

## Related Papers

Works discussed in the supplied paper:

- Yao et al. (2023), "Tree of Thoughts: Deliberate Problem Solving with Large Language Models": organizes branching search for predominantly deductive tasks.
- Besta et al. (2024), "Graph of Thoughts: Solving Elaborate Problems with Large Language Models": generalizes thought search to graph structure but does not impose GoS's evidence-grounded belief-state semantics.
- Bi et al. (2025), "Forest-of-Thought: Scaling Test-Time Compute for Enhancing LLM Reasoning": supplies the strongest broad-search baseline in several reported comparisons, at substantially higher cost.
- Kim et al. (2024), "MDAgents: An Adaptive Collaboration of LLMs for Medical Decision-Making": provides a role-based medical multi-agent precedent.
- Zhou et al. (2024), "D-Bot: Database Diagnosis System Using Large Language Models": provides a specialized multi-agent diagnosis comparison for systems operations.
- Zhu et al. (2025), "DiagnosisArena: Benchmarking Diagnostic Reasoning for Large Language Models": supplies the medical cases that the paper reformulates as interactive evidence acquisition.

## Source

Processed from the complete Markdown supplied for Cognitio job `2c065f16-c5e9-4183-8690-fb001c1f9d29`. The paper states that code and prompts are available from the authors' Graph-of-States GitHub repository; repository availability was not independently checked.

[[index|Library home]]
