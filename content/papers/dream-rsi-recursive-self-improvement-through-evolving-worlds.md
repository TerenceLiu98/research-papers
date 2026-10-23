---
title: "Dream-RSI: Recursive Self-Improvement through Evolving Worlds"
type: paper
authors:
  - Tong Zheng
  - Xidong Wu
  - Zheng Zhang
  - Zhankui He
  - Chaoyi Zhang
  - Benjamin Coleman
  - Ruoqiao Wei
  - Di Bai
  - Haolin Liu
  - Rui Liu
  - Xue Wang
  - Yue Zhuan
  - Wang-Cheng Kang
  - Renkai Xiang
  - Heng Huang
  - Xinwu Cheng
  - Yunsong Guo
year: 2026
source_job_id: 95cc3bed-c44c-4759-860d-741f7967c35a
tags:
  - recursive-self-improvement
  - llm-agents
  - scientific-discovery
  - exploration-policy
  - experience-replay
---

## TL;DR

Dream-RSI turns completed agent-discovery trees into replay simulators for improving the policy that allocates future search. Candidate exploration policies navigate recorded branches, observe stored outcomes, and are scored for solution quality, represented execution cost, and batching; the best replay-scoring policy is then deployed for another online discovery round. Across Lasso solver design, three mathematical optimization problems, and four GPU-kernel tasks, the paper reports competitive or improved quality with lower discovery cost in several settings, while the replay guarantee remains limited to fixed historical trees.

## Research Question

Can accumulated discovery histories provide sufficiently cheap and grounded feedback to improve an agent's long-horizon exploration policy before that policy is redeployed online?

## Motivation

Evaluating one candidate solution can be immediate, but evaluating an exploration strategy requires observing many proposal-evaluation cycles. Fixed strategies cannot adapt from accumulated experience, while testing many new strategies online incurs long, expensive rollouts. Dream-RSI treats the structured history already produced by discovery as reusable feedback for this meta-level problem.

## Contributions

- Introduces [[concepts/discovery-history-replay|Discovery History Replay]], in which a recorded discovery tree acts as an empirical simulator over the observed portion of a search space.
- Defines a shared batching interface for online exploration and offline replay, allowing policies to control branch opening, refinement, parallelism, and stopping without changing the underlying coding agent.
- Closes a bounded [[concepts/recursive-self-improvement|recursive self-improvement]] loop: deploy a policy, record a tree, improve the policy through replay, and redeploy it to expand the history pool.
- Evaluates the framework on eight tasks across algorithm engineering, mathematical optimization, and GPU kernel engineering.

## Method

An online exploration policy selects batches of the root or currently visible leaf nodes. Each selected node starts one generation-evaluation attempt from its saved workspace; completed attempts become children in a discovery tree containing artifacts, diagnostics, and scores. The policy code is fixed during each online rollout, and the underlying discovery model, evaluator, and execution interfaces remain unchanged across the improvement loop.

Offline replay begins from only the root of a completed tree. Selecting a visible leaf reveals its recorded child, while selecting the root opens the earliest unrevealed recorded branch. Replay therefore cannot synthesize unobserved outcomes, but it can test different branch subsets, traversal orders, batch compositions, and stopping points without rerunning generation or evaluation.

Each replay trajectory is scored by its best revealed candidate, minus a penalty for the number of represented generation-evaluation requests, plus a reward for average batch size. An LLM-based policy-development agent iteratively revises executable policy code from replay traces and scores. The highest-scoring candidate, including the incumbent, becomes the next online policy. This selection makes replay score non-decreasing on the fixed history used for selection; it does not guarantee improvement on the next online rollout.

## Experiments

The controlled baseline, Recursive Fixed Exploration, uses the same discovery agent, evaluator, initialization, first-round policy, and per-round resource limits but never revises its exploration policy.

For Lasso regularization-path solver discovery, Dream-RSI with Gemini 3.1 Pro reports a 2,931.0 ms mean runtime over six held-out datasets using 317 discovery calls, versus 3,587.1 ms and 550 calls for fixed exploration. With Gemini 3.7 Flash, the corresponding values are 2,350.6 ms and 1,879 calls versus 2,516.7 ms and 3,200 calls. Both discovered solvers outperform the reported sklearn and glmnet runtimes on all six held-out datasets, and use far fewer calls than SimpleTES's reported 51,200 generations.

On mathematical optimization, Dream-RSI reports 1.145427 for Sum-Difference, 2.635983 for Circle Packing, and 1.456375 for Autocorrelation. These respectively improve on the controlled fixed policy, match the strongest listed Circle Packing result, and remain worse than SimpleTES's listed 1.453675 Autocorrelation result, though Dream-RSI uses fewer than 1,000 generations rather than 51,200.

On KernelBench tasks, Dream-RSI reaches comparable VGG16 and LayerNorm performance with 2.43x and 1.79x fewer generations. At comparable budgets it reports 2.09x and 1.44x higher inverse-runtime performance on ConvDiv and ConvMax. A ConvDiv analysis finds that replay-based policy improvement outperforms injecting distilled historical directions into prompts; the authors attribute the latter's weaker result to over-constraining parallel exploration.

## Limitations

- Replay is confined to branches and outcomes recorded by earlier policies. It cannot evaluate actions outside that support or model new stochastic outcomes from a previously visited state.
- Non-decreasing replay score is guaranteed only on the fixed historical pool used for selection, not on future online trees or unseen task families.
- The loop changes exploration-policy code while keeping the discovery models, evaluator, and interfaces fixed, so the evidence supports bounded meta-exploration improvement rather than weight-level or indefinite RSI.
- Results cover eight tasks in three domains and use Gemini 3.1 Pro or Gemini 3.7 Flash; the source does not establish transfer to other agents, evaluators, or broader discovery domains.
- The replay objective encodes chosen trade-offs among best score, represented work, and parallelism. Policies can inherit biases or blind spots from that objective and from the histories that populate the simulator.
- The supplied source gives project and code websites but no stable DOI or arXiv identifier for the paper.

## Related Concepts

- [[concepts/discovery-history-replay|Discovery History Replay]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/world-models|World Models]]
- [[concepts/meta-evolution|Meta-Evolution]]
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]

## Related Papers

**Library papers:**

- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]]: rewrites an agent harness through a nested evaluation loop, whereas Dream-RSI specifically evolves the exploration controller through recorded-tree replay.
- [[papers/rrsi-regularized-recursive-self-improvement-of-agent-harnesses|RRSI: Regularized Recursive Self-Improvement of Agent Harnesses]]: regularizes open-ended harness evolution and held-out selection; Dream-RSI instead reduces the cost of feedback by replaying discovery histories.
- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]]: evolves self-modifying agent lineages in an archive, while Dream-RSI holds the discovery agent fixed and revises its meta-exploration policy.

**Works cited by the source:**

- Ha and Schmidhuber (2018), "World Models," and Hafner et al. (2019-2025), the Dreamer series: motivate improving policies through simulated rather than repeated real-environment interaction.
- Novikov et al. (2025), "AlphaEvolve"; Liu et al. (2026), "EvoX" and "SkyDiscover"; and Ye et al. (2026), "Evaluation-Driven Scaling for Scientific Discovery": principal agentic-discovery and exploration comparisons.
- Ouyang et al. (2025), "KernelBench": supplies the GPU-kernel task setting.

[[index|Library home]]
