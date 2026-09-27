---
title: HyperAgents
type: paper
authors:
  - Jenny Zhang
  - Bingchen Zhao
  - Wannan Yang
  - Jakob Foerster
  - Jeff Clune
  - Minqi Jiang
  - Sam Devlin
  - Tatiana Shavrina
year: null
source_job_id: bf7f208c-ac1f-4f9d-87c0-bc75064f614e
tags:
  - llm-agents
  - recursive-self-improvement
  - program-search
  - meta-learning
---

## TL;DR

HyperAgents combines a task agent and its modifying meta agent in one editable program. DGM-Hyperagents (DGM-H) evolves these programs through the Darwin Godel Machine's archive-based search, allowing changes to both task behavior and the procedures that generate later revisions. Experiments report gains in coding, paper-review prediction, and simulated robotics reward design, plus transfer of improvement strategies to Olympiad-level math grading. The transferred modifier achieves median improvement@50 of 0.630 on math grading. Further 200-iteration optimization yields 0.640 accuracy versus 0.610 from the initial agent, but that difference is not statistically significant. These results support bounded, transferable improvement of agent scaffolds, without establishing unbounded or accelerating self-improvement.

## Research Question

Can an agent improve the mechanism that produces its future revisions, and can those improvements transfer beyond domains where task competence and code-modification skill closely coincide?

## Motivation

The original DGM lets a coding agent implement its own modifications, but a fixed diagnostic mechanism supplies improvement instructions. Coding gains can help subsequent coding-based modification; better paper reviews or robot rewards need not imply better modification skill. HyperAgents makes the meta agent's proposal and implementation procedure editable alongside the task agent, addressing this domain-alignment assumption through [[concepts/metacognitive-self-modification|metacognitive self-modification]] (Sections 1-3).

## Contributions

- A self-referential program representation joining task execution and agent modification around frozen foundation models.
- DGM-H, which combines this representation with an archive of alternative lineages and empirical selection.
- Multi-domain task evaluations, fixed-modifier and no-archive ablations, and comparison with a manually adapted DGM.
- A fixed-modifier improvement@k evaluation and cross-domain transfer experiments, supplemented by examples of evolved memory, diagnostics, and performance tracking.

## Method

**Editable boundary.** The initial task agent returns the response to a single model call. The meta agent receives the repository location, previous evaluation locations, and remaining iteration budget, with shell and file-editing tools. It can change task logic, prompts, tools, and its own modification procedure. Foundation-model weights remain frozen. Task distributions, evaluation protocols, and the main experiments' outer parent-selection mechanism remain fixed (Sections 3-4; Appendix A).

**Archive search.** Select a parent, let its meta agent revise its implementation using archived results, evaluate the child, and retain valid compiled children. Admission does not require immediate improvement. With score $\alpha_i$, compiled-child count $n_i$, and $\alpha_{\mathrm{mid}}$ equal to the mean score of the archive's top three agents, Appendix A.2 uses

$$
w_i = \frac{1}{1+\exp[-10(\alpha_i-\alpha_{\mathrm{mid}})]}\frac{1}{1+n_i},
\qquad p_i = \frac{w_i}{\sum_j w_j}.
$$

Parents are sampled with replacement. Validation scores guide selection where available; otherwise training scores do. In joint paper-review and robotics runs, selection uses the average score across domains. Failure at the preliminary evaluation stage in either domain prevents full evaluation in both, with unevaluated tasks scored zero. This couples progress to basic functionality across domains (Section 5.1; Appendix A.4).

**Evaluating the improver.** Section 5.2 holds the meta agent fixed for 50 modification iterations. Improvement@50 measures the selected descendant's test-score gain over the starting task agent, with descendant selection based on validation performance. Transfer carries over both task and meta implementations from the source domain. Appendix D.4 selects transfer agents by the average descendant score gain discounted by lineage distance with factor 0.6, considering nodes with at least three descendants. This tests reuse of an evolved system, rather than a swap of only the meta agent under identical task-agent code.

**Observed mechanisms.** Successful trajectories introduce evaluation summaries, prediction-distribution diagnostics, budget-sensitive planning, persistent performance histories, reusable prompts, and memory of hypotheses and failed changes. Task agents develop structured review checklists, documented simulator constraints, and grading decision trees. These examples explain plausible mechanisms but are not separate causal ablations (Appendices E.1-E.3).

## Experiments

**Protocol.** The paper reports five runs per experiment, medians with 95% bootstrap intervals from 1,000 resamples, and Wilcoxon signed-rank tests. Coding runs last 80 iterations; joint paper-review and robotics runs last 100. Paper review and math grading each use 100 training, 100 validation, and 100 test examples, with an initial 10-example training screen. Robotics trains reward designers on forward walking and tests zero-shot reward generation for maximizing torso height on the same simulated Go2 robot; scores average six reward-generation and policy-training evaluations. Policies are trained with PPO (Sections 4-5; Appendix C).

For coding, self-modification uses Claude 3.5 Sonnet (New) and task evaluation uses o3-mini. Other domains use Claude 4.5 Sonnet for modification, with GPT-4o for review, Claude 4.5 Sonnet for robotics, and o4-mini for math grading (Appendix D.1).

**Coding.** Section 5.1 reports pass@1 increasing from 0.140 to 0.340 (CI 0.300-0.380) on the 50-task search subset and from 0.084 to 0.267 (0.231-0.280) on full Polyglot. The historical DGM comparison reaches 0.380 and 0.307 respectively, from different full-benchmark initial performance of 0.142. DGM-H is presented as comparable, not superior, in coding. Full-benchmark coverage is described inconsistently between the main text and Appendix C.1; the reported 0.267 should not be treated as a clearly defined wholly held-out score.

**Joint paper-review and robotics search.** The following are final test medians; parentheses contain reported 95% intervals. Review measures agreement with observed conference acceptance decisions. Robotics uses its task-specific score, not classification accuracy (Section 5.1).

| Method | Paper review | Robotics reward design |
| --- | --- | --- |
| Initial agent | 0.000 | 0.060 |
| Original DGM | 0.000 (0.000-0.510) | 0.000 (0.000-0.090) |
| DGM-custom | 0.590 (0.570-0.650) | 0.348 (0.305-0.385) |
| Fixed initial meta agent | 0.000 (0.000-0.130) | 0.213 (0.180-0.348) |
| No archive exploration | 0.000 (0.000-0.560) | 0.116 (0.000-0.348) |
| DGM-H | 0.710 (0.590-0.750) | 0.372 (0.355-0.436) |

DGM-H outperforms original DGM and both ablations at reported $p<0.05$. Its advantage over DGM-custom is not significant ($p>0.05$). Static reference scores are 0.630 for the AI-Scientist-v2 reviewer and 0.348 for a reward directly optimizing torso height. The latter typically produces standing; DGM-H's generated rewards frequently induce jumping. Initial review accuracy of zero reflects invalid output formatting, so the increase includes interface repair as well as improved judgments.

**Transfer of improvement strategies.** With the meta agent frozen during target-domain search, transferred DGM-H agents achieve math-grading improvement@50 of 0.630 (0.540-0.630), compared with 0.000 (0.000-0.130) for the initial DGM-H agent. Transfer from DGM-custom gives 0.000 (0.000-0.010). The transferred DGM-H modifier significantly exceeds its initial counterpart at reported $p<0.05$. Starting target-task scores are approximately zero, and the initial generic task agent again fails the required output format (Section 5.2).

**Continued improvement and strong initialization.** After 200 iterations allowing further self-modification, transferred DGM-H reaches math-grading test accuracy 0.640 (0.550-0.720), versus 0.610 (0.510-0.680) from the initial agent; the difference is not significant. A separate configuration pairing a transfer meta agent with ProofAutoGrader improves the 100-example test score from 0.670 to 0.700. On full IMO-GradingBench, the resulting BetterGrader improves accuracy from 0.561 to 0.601 and lowers reported mean absolute error from 0.178 to 0.175. Appendix E.4 attributes gains to improved intermediate-grade recognition, with a six-percentage-point reduction in recall for fully correct solutions. Full-benchmark evaluation is distinct from the held-out 100-example test (Section 5.3).

**Editable parent selection.** A separate preliminary experiment starts from random selection and permits revision of that mechanism. Mean performance across the two test domains reaches median 0.491, compared with 0.428 for fixed random selection and 0.532 for the handcrafted selector. Differences are not significant. Evolved selectors rediscover UCB-style bonuses and adaptive softmax sampling but do not outperform the handcrafted strategy (Appendix E.5).

## Limitations

- Finite experiments with frozen models and fixed task distributions do not establish indefinite progress, self-acceleration, or effectiveness on every computable task. Main-run selection and evaluation remain external to self-modification.
- Five-run estimates have wide intervals. Higher medians than DGM-custom and stronger final performance after transfer do not establish statistically significant superiority.
- Zero-score starting agents fail task interfaces. Transfer preserves both task and meta implementations, and improvement@k depends on the starting agent, selection procedure, and budget; it is not a domain-independent measure of modifier ability.
- Predicting conference decisions measures agreement with historical outcomes, not objective scientific quality. Benchmark biases may be reproduced or amplified. Robotics evidence concerns two objectives for one simulated robot, not broad physical deployment (Appendices C and F).
- Appendix C.1 describes a 60-task coding split with a 10-task screen and 50 additional tasks, while Section 5.1 reports a 50-task training score. It also calls 165 unseen tasks the full benchmark, whereas Section 5.1 describes full Polyglot as largely unseen. The task lists repeat `python__dominoes` across the two training stages. These ambiguities limit exact split reconstruction from the supplied text.
- Appendix D.2 reports about 33 million modification tokens per 100 iterations and 0.506 million evaluation tokens per iteration, but gives a total of 88.6 million. The stated components sum to 83.6 million. This arithmetic discrepancy should remain unresolved as a reported cost, and token estimates do not capture all simulator training costs.
- Sandboxing, restricted network access, timeouts, and human oversight are experimental precautions, not guarantees about future successors. The paper discusses risks from benchmark incentives and systems outpacing oversight (Section 6; Appendix F).
- The supplied Markdown has no explicit publication year, DOI, or arXiv identifier for HyperAgents. Bibliography dates and experiment timestamps do not establish publication metadata; `year` is left unspecified.

## Related Concepts

- [[concepts/metacognitive-self-modification|Metacognitive Self-Modification]]: editing the mechanism that proposes and implements future revisions.
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]: distinguishing editable scaffolds, measured modifier gains, and sustained compounding.
- [[concepts/experience-guided-program-evolution|Experience-Guided Program Evolution]]: archived outcomes and lineages guide further program search.
- [[concepts/meta-evolution|Meta-Evolution]]: the library's concept concerns training an improver from search experience; DGM-H instead evolves code around frozen models.

## Related Papers

- [[papers/darwin-godel-machine-open-ended-evolution-of-self-improving-agents|Darwin Godel Machine]] (Zhang et al., 2025, as cited): the direct predecessor; DGM-H retains archive exploration while making the meta-level instruction procedure editable.
- [[papers/a-self-improving-coding-agent|A Self-Improving Coding Agent]] (Robeyns et al., 2025): related self-referential scaffold optimization discussed in Section 2. DGM-H additionally evaluates transferred agent-generation ability outside coding.
- Hu, Lu, and Clune (2025), "Automated Design of Agentic Systems": a fixed meta-agent designs task agents; the fixed-modifier ablation adapts this principle.
- Kirsch and Schmidhuber (2022), "Eliminating Meta Optimization Through Self-Referential Meta Learning": conceptual precedent for making the learning mechanism part of the modifiable system.
- Luong et al. (2025), "Towards Robust Mathematical Reasoning": supplies IMO-GradingBench and ProofAutoGrader, the target-domain benchmark and strong task-agent initialization.

Code repository named in the source: [facebookresearch/Hyperagents](https://github.com/facebookresearch/Hyperagents).

[[index|Library home]]
