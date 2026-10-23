---
title: "CollabFlow: Recursive Self-Improvement of Agent Collaboration"
type: paper
authors:
  - Xiao Huang
  - Mingda Zhang
  - Junming Zhang
  - Qiang Huang
  - Hanwen Zhang
  - Yue Dai
  - Zijia Wang
  - Xiaoying Tang
year: null
source_job_id: "236d2bb5-d7f3-4f46-afb9-ed650f0ce55a"
tags:
  - llm-agents
  - multi-agent-systems
  - recursive-self-improvement
  - gflownets
  - agent-communication
---

## TL;DR

CollabFlow trains a director to construct teams of complete language-model agents, including their membership, protocol-labeled communication graph, and output rule. Within a task, [[concepts/evidence-conditioned-agent-communication|Evidence-Conditioned Agent Communication]] gates whether a receiver keeps, adopts, or revises an answer according to version-bound executable or retrieval evidence. Across rounds, [[concepts/collaborative-trajectory-balance|Collaborative Trajectory Balance]] assigns one reward to each canonical team despite multiple construction orders and targets a reward-proportional distribution rather than a single maximizer. On six in-distribution and six held-out benchmarks, the paper reports the best result among its baselines on every row except a tie on HumanEval, along with lower token use. This is bounded [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: the executor, evaluator, agent population, protocol registry, and update rules remain fixed.

## Research Question

Can a multi-agent system learn both which complete agents should collaborate and how their messages should be used, then improve that collaboration across rounds from its own execution outcomes without collapsing onto a small set of teams?

## Motivation

Fixed multi-agent workflows leave roles and message routes unchanged by experience. Topology-learning methods can change who communicates while still passing messages verbatim, which can propagate errors and conformity. Standard reward maximization can also concentrate probability on a few teams, reducing the diversity of outcomes available to later rounds. CollabFlow treats the team graph, edge protocols, and bound skills as the object of learning while holding execution capabilities fixed.

## Contributions

- Defines a Collab-Director that builds valid canonical teams from complete agent profiles through checked actions for adding agents, binding skills, adding protocol-labeled edges, selecting an output rule, and stopping.
- Introduces evidence-conditioned communication, which associates evidence with immutable candidate versions and uses a fixed margin to keep, adopt, or revise an answer.
- Introduces Collaborative Trajectory Balance (CTB), a GFlowNet-style objective that merges all construction orders at a canonical team terminal and targets team probability proportional to tempered reward.
- Uses pre-batch reliability counters and a structural description-length factor to construct positive team rewards, with a bound on target-distribution movement as records accumulate.
- Evaluates learned collaboration on 12 benchmarks, six held-out task suites, six additional frozen executors, fixed-team and communication ablations, diversity measures, and token cost.

## Method

### Checked team construction

For each task and round, the director samples legal structural actions under separate construction and execution budgets. A completed team is an annotated directed graph whose vertices are immutable agent profiles, whose edges carry `FINALONLY`, `ONEWAY`, or `INTERACTIVE` protocols, and whose output configuration selects or integrates results. Canonicalization merges construction histories that differ only in serialization order. A frozen executor then runs the team, so changes in the output distribution across rounds are attributed to the director's team distribution rather than executor updates.

Stateful tasks enforce one mutable executor; advisors communicate through bounded, tool-free handoffs. This serializes internal writes but does not guarantee that plans or actions are correct.

### Evidence-conditioned messages

Each candidate answer carries immutable version and environment identifiers. Authentic evidence records are filtered for applicability to that version and deduplicated. The implementation scores successful executable checks as 2, retrieval support as 1, and unsupported candidates as 0. For differing sender and receiver answers, a score gap above the fixed margin of 1 causes adoption, a gap below -1 keeps the receiver, and an intermediate gap triggers one bounded tool-free revision. Protocol choice controls how often and in which direction this gate runs.

### Collaborative trajectory balance

CTB applies trajectory balance to canonical teams rather than individual construction paths. A learned backward kernel distributes a team's credit among its valid construction orders, while the forward director, backward policy, and normalizer minimize a length-normalized trajectory-balance residual with a proximal KL term. Under exact valid-path balance and fixed positive rewards, the conditional team distribution is proportional to $r_G^\beta$, so positive-reward alternatives retain probability instead of all mass moving to the best observed team.

The observed reward combines answer quality, a Jeffreys-smoothed historical success rate, and a minimum-description-length structural factor, plus a positive floor. Counts are frozen within a batch and updated once per unique outcome afterward. The paper proves a total-variation bound on the resulting target's movement under fixed support, answer scores, and structural code; the bound shrinks as sampled teams accumulate records.

## Experiments

The in-distribution suite contains HotpotQA, TriviaQA, AIME 2026, MedXpertQA, ALFWorld, and MBPP+. MuSiQue, NQ-Open, MATH-Hard, GPQA Diamond, HumanEval, and WebShop are held out. Most datasets use 128 evaluation items; AIME 2026 uses 30. The main comparison uses Qwen3.5-9B as both director and frozen executor and reports five-run means against direct inference, SFT, GRPO, AFlow, FlowSteer, an evolving orchestrator, SkillFlow, and SkillRL under a shared per-task budget.

CollabFlow leads all reported in-distribution rows. Relative to the strongest baseline averages, it improves exact match by 2.27 points and the aggregate accuracy/success/Pass@1 measure by 4.37 points. On held-out tasks it leads every row except HumanEval, where it ties AFlow; its average margins over the strongest baselines are 3.51 exact-match and 4.22 F1 points. The method also improves every reported average for six other frozen executors.

A one-run ablation across all 12 datasets places the full system above every tested variant. Removing communication is the largest degradation; removing director training costs 13.7 average points in distribution and 19.5 out of distribution, while removing recursion accounts for 7.6 and 13.6 points. Under matched rollouts, CTB reports higher reward and success, lower reward variability and consecutive-team-distribution shift, and 26 distinct successful paths versus at most 15 for the compared methods. Reported mean token use is 9,676.6 per item, below the four cost baselines in the paper.

## Limitations

- The recursion is bounded to the director, backward kernel, normalizer, skill library, and reliability records. The executor, agent profiles, evaluator, protocol set, and update rules remain fixed.
- Coverage guarantees are relative to a finite admissible team space and explicit resource caps; they do not imply that the agent pool contains a capable agent for every task.
- Reward-proportional sampling and target-drift results require exact or uniformly controlled balance, fixed support, and fixed reward components. Finite training does not guarantee these conditions.
- Evidence scores use coarse fixed categories. Authentic but incomplete or misleading checks can still promote an incorrect candidate, while revisions can invalidate inherited evidence.
- The single-writer restriction prevents conflicting internal mutations but does not guarantee safe actions, fresh observations, correct plans, or consistency with external actors.
- The main table uses relatively small evaluation sets, and the broad ablation table reports one run. Adapter, budget, and implementation differences can constrain comparisons with external methods.
- The supplied manuscript gives no stable publication identifier or explicit publication year; the year is therefore left unspecified.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]
- [[concepts/evidence-conditioned-agent-communication|Evidence-Conditioned Agent Communication]]
- [[concepts/collaborative-trajectory-balance|Collaborative Trajectory Balance]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/maximum-entropy-rl-for-posterior-sampling|Maximum-Entropy RL for Posterior Sampling]]
- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]

## Related Papers

- Malkin et al. (2022), "Trajectory Balance: Improved Credit Assignment in GFlowNets": supplies the trajectory-balance foundation that CTB adapts from paths to canonical agent teams.
- Dang et al. (2026), "Multi-Agent Collaboration via Evolving Orchestration": a learned agent-orchestration baseline that activates agents sequentially.
- Zhang et al. (2025), "AFlow: Automating Agentic Workflow Generation": searches executable workflows for a fixed executor rather than jointly learning complete-agent membership and edge protocols.
- Du et al. (2023), "Improving Factuality and Reasoning in Language Models through Multiagent Debate": represents the debate-style communication paradigm against which evidence-gated exchange is motivated.

[[index|Library home]]
