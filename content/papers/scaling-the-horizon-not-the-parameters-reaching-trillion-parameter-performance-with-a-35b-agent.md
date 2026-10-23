---
title: "Scaling the Horizon, Not the Parameters: Reaching Trillion-Parameter Performance with a 35B Agent"
type: paper
authors:
  - Agents-A1 Team
year: null
source_job_id: bc2ff578-8ad7-477b-b3a9-c425deaa2b12
tags:
  - llm-agents
  - long-horizon-reasoning
  - on-policy-distillation
  - mixture-of-experts
  - tool-use
---

## TL;DR

Agents-A1 is a 35B mixture-of-experts agent trained to improve long-horizon behavior without increasing parameter count. Its pipeline builds average 45K-token trajectories from a knowledge-action infrastructure, trains a broad supervised model and specialized domain teachers, then consolidates six domains through domain-routed on-policy distillation with salient vocabulary alignment. The resulting model improves over its Qwen3.5-35B-A3B base across most reported benchmarks and is competitive with much larger models on several search, science, and instruction-following evaluations, but remains substantially behind them on machine-learning engineering and does not consistently exceed its specialist teachers.

## Research Question

Can a 35B agent approach the long-horizon performance of trillion-parameter models by scaling verified interaction trajectories and integrating heterogeneous specialist abilities rather than scaling model parameters?

## Motivation

Long-horizon agents must repeatedly acquire evidence, act through tools, inspect outcomes, preserve constraints, and revise their strategy. Ordinary web text rarely contains the provenance, execution traces, failures, and verifier feedback needed to supervise those behaviors. A second difficulty is that useful interaction patterns differ sharply across domains: long-instruction tasks favor extended single-turn reasoning, while search and tool-use tasks favor short reasoning steps distributed over many turns. Naively mixing them can cause capability interference.

## Contributions

- Introduces Agents-A1, a 35B MoE agent built from Qwen3.5-35B-A3B and trained across search, machine-learning engineering, scientific reasoning, instruction following, and general and scientific tool use.
- Constructs a [[concepts/knowledge-action-graphs|Knowledge-Action Graph]] infrastructure that stores evidence, actions, observations, constraints, failures, and verifier outcomes as linked process supervision; generated trajectories average 45K tokens.
- Uses a three-stage recipe: full-domain supervised fine-tuning, targeted SFT or RL for domain teachers, and [[concepts/domain-routed-on-policy-distillation|Domain-Routed On-Policy Distillation]] into one deployable student.
- Proposes salient vocabulary alignment, which computes a truncated reverse KL over the routed teacher's top-$k$ tokens on student-generated prefixes, plus domain-normalized loss aggregation.
- Evaluates the model on search, engineering, science, instruction following, general agent interaction, and scientific tool-use benchmarks, with additional 12-hour machine-learning and Earth-science case studies.

## Method

### Knowledge-action supervision

The paper decomposes long-horizon competence into information acquisition, tool calling, executable iteration, evidence verification, and constraint tracking. For domain $d$, a knowledge-action graph is defined as $\mathcal{G}_d=(\mathcal{C}_d,\mathcal{A}_d,\mathcal{O}_d,\mathcal{V}_d)$: a corpus, action space, observation space, and verifier set. Linked records preserve the state, action, observation, and verifier outcome at each step, including failed trajectories.

A proposer-solver-verifier self-play loop expands these graphs. Candidate tasks are retained only when they are verifiable, valid, process-informative, evidence-covering, and resistant to shortcuts. Domain pipelines instantiate this scheme for graph-based search, iterative code and model optimization, scientific tasks, instruction following, and tool interaction.

### Three-stage training

Full-domain SFT first teaches broad behaviors from the combined task families. Domain teachers are then specialized with targeted recipes: search SFT and RL, two-stage science SFT, long-context and instruction-following RL, and tool-specific SFT followed by RL. The tool teacher uses outcome rewards plus process rewards only for unsuccessful trajectories, so near misses can be ranked without double-counting success.

The final student starts from the full-domain SFT checkpoint. It generates its own bounded trajectories under domain-specific protocols, and the routed frozen teacher scores those same prefixes rather than supplying a separate reference response. Tool outputs, environment observations, and user turns remain context but are masked from the training loss.

### Salient vocabulary alignment

At each trainable generated position, salient vocabulary alignment selects the routed teacher's top-$k$ valid tokens, renormalizes the teacher and student distributions on that support, and minimizes truncated reverse KL. The method monitors how much student probability lies on the selected support because mass outside it is not directly constrained. Losses are averaged within each active domain and then across domains so frequent or high-loss domains do not dominate.

## Experiments

Agents-A1 is evaluated on four search benchmarks, SciCode and MLE-Bench-Lite, four scientific-reasoning benchmarks, LongBench V2 and IFBench, $\tau^2$-Bench and VitaBench, MatTools, and MolBench-Bind. Search tasks allow up to 300 turns. MLE-Bench-Lite uses 22 competitions, three seeds, a dedicated H200, and a 12-hour budget per task.

Relative to the reported Qwen3.5-35B-A3B baseline, the final model improves from 61.0 to 75.5 on BrowseComp, 41.4 to 56.4 on SEAL-0, 59.8 to 96.0 on GAIA, 37.1 to 44.3 on SciCode, 24.2 to 43.9 on MLE-Bench-Lite, 2.5 to 40.0 on FrontierScience-Research, 70.2 to 80.6 on IFBench, 21.0 to 47.1 on MatTools, and 46.0 to 56.8 on MolBench-Bind. Compared with the intermediate SFT checkpoint, distillation recovers losses on HLE, IFBench, and general agent tasks while retaining or improving most other domains.

The specialist results show why routing is useful. The search teacher raises GAIA from 59.8 to 95.1; the science teacher raises FrontierScience-Research from 2.5 to 54.3; the instruction teacher raises IFBench from 70.2 to 82.0; and the tool teacher raises the reproduced $\tau^2$-Bench average from 32.53 to 82.50. The final unified model does not always match these specialist scores, so the evidence supports balanced consolidation rather than universal teacher improvement.

Against the paper's selected larger-model results, Agents-A1 leads on SEAL-0 (56.4), IFBench (80.6), HiPhO (46.4), FrontierScience-Olympiad (79.0), and MolBench-Bind (56.8), while remaining behind GPT-5.5 on MLE-Bench-Lite (43.9 versus 72.7) and behind several larger models on BrowseComp. A 12-hour right-whale-call optimization case raises validation AUC from 0.58 to 0.9935. An Earth-science case reconstructs Cyclone Nargis from IBTrACS data through autonomous acquisition, cleaning, computation, visualization, and synthesis.

## Limitations

- The paper attributes substantial remaining weakness on machine-learning engineering to difficulty maintaining goals, recalling prior decisions, and avoiding repeated experiments over long runs.
- Full-domain SFT exhibits negative transfer between long single-turn reasoning and multi-turn tool-use patterns; distillation reduces but does not eliminate this conflict.
- The unified student does not consistently outperform the corresponding domain teacher, reflecting a specialization-versus-breadth tradeoff.
- The reproduced Qwen3.5 result on $\tau^2$-Bench is about 33 rather than the official 81.2; the authors point to codebase and environment differences, which limits direct comparability.
- Several comparisons use different tool conditions: the paper reports tool-free results for some competing science models while Agents-A1 uses tools, and replaces retired proprietary simulator or judge models on general-agent benchmarks.
- The long-horizon application evidence consists of selected case studies rather than a broad controlled evaluation of trajectory length itself.
- The proposed top-$k$ alignment leaves student probability outside the teacher-selected support unconstrained; coverage is monitored but the supplied paper does not isolate a comprehensive ablation of this approximation.

## Related Concepts

- [[concepts/knowledge-action-graphs|Knowledge-Action Graphs]]: process-level structures for grounded trajectory construction and verification.
- [[concepts/domain-routed-on-policy-distillation|Domain-Routed On-Policy Distillation]]: the specialist-to-generalist consolidation method used in the final stage.
- [[concepts/sparse-mixture-of-experts|Sparse Mixture of Experts]]: the conditional-computation architecture underlying the 35B model.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: the broader teacher-student framework of which the routed on-policy method is a specialized instance.
- [[concepts/long-horizon-agent-judgment|Long-Horizon Agent Judgment]]: a complementary view of delayed decision quality in extended tasks.
- [[concepts/environment-grounded-agent-memory|Environment-Grounded Agent Memory]]: another approach to retaining evidence from agent-environment interaction.

## Related Papers

- Cao et al. (2026), "Agents-K1: Towards Agent-native Knowledge Orchestration": motivates the knowledge-action representation extended here.
- Lu and Thinking Machines Lab (2025), "On-Policy Distillation": supplies the sampled-token on-policy distillation setting that salient vocabulary alignment modifies.
- Fu et al. (2026), "Revisiting On-Policy Distillation: Empirical Failure Modes and Simple Fixes": analyzes instability in sampled-token approximations.
- Sun et al. (2025), "Scaling Long-Horizon LLM Agent via Context-Folding": another approach to extending agent horizons.
- Chan et al. (2024), "MLE-Bench: Evaluating Machine Learning Agents on Machine Learning Engineering": provides the engineering benchmark and the right-whale optimization case.

[[index|Library home]]
