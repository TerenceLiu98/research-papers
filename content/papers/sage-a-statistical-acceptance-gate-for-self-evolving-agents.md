---
title: "SAGE: A Statistical Acceptance Gate for Self-Evolving Agents"
type: paper
authors:
  - Yihao Wang
  - Linhan Xia
  - Rui Liu
  - Zhaofeng Zhang
  - Hongyu Wu
  - Yang Yang
  - Jinglu He
  - Yu Guo
  - Kai Lei
year: 2026
source_job_id: "8eecf213-a401-4439-8f60-9cb334acadf4"
tags:
  - llm-agents
  - self-evolving-agents
  - agent-skills
  - statistical-testing
  - regression-control
---

## TL;DR

SAGE replaces aggregate-score acceptance in skill-document evolution with a regression-aware statistical gate. It compares an incumbent and candidate on the same validation items, counts candidate wins and regressions, penalizes regressions asymmetrically, and accepts only when a one-sided exact conditional binomial test supports positive weighted gain under a regression cap. With SkillOpt proposal generation held fixed, SAGE reduces regression rates in 19 of 20 reported backbone-benchmark settings, ties in the remaining setting, and obtains the highest final score in all 20. Its guarantees are local to binary-verifier comparisons and do not control error accumulated across a full adaptive trajectory.

## Research Question

How can a self-evolving LLM agent decide whether to commit an edit to a persistent skill document without accepting apparent validation improvements that break already-solved items or arise from finite-sample noise?

## Motivation

Document-based agent evolution separates proposal from acceptance: an optimizer edits a reusable skill, then a gate decides whether the edit becomes persistent. The standard gate accepts any strict increase in aggregate validation score. That scalar comparison hides which cases were repaired and which were broken, and repeated selection of the best noisy validation result is vulnerable to the Optimizer's Curse. Because accepted edits influence later proposals, a locally favorable but harmful update can permanently alter the optimization trajectory.

## Contributions

- Identifies acceptance, rather than edit proposal alone, as a distinct bottleneck in self-evolving agents.
- Introduces a paired per-item ledger that separates candidate wins, regressions, and ties on identical validation items.
- Defines [[concepts/statistical-acceptance-gates|Statistical Acceptance Gates]] that combine asymmetric regression costs, a regression-rate cap, and a one-sided exact test on discordant pairs.
- Shows that the proposed gate conservatively refines aggregate-score acceptance and recovers it at the boundary setting $(\lambda, \alpha, \tau)=(1,1,1)$.
- Evaluates the gate under matched proposal and token budgets across five benchmarks and four backbone models.

## Method

For each proposed edit, SAGE evaluates the incumbent skill and candidate skill on the same held-out items using a binary verifier. A win is an item solved only by the candidate; a regression is an item solved only by the incumbent. If their counts are $w$ and $\ell$, the gate computes weighted gain $\Delta_\lambda=w-\lambda\ell$ for $\lambda\geq1$ and regression fraction $\rho=\ell/n_S$, where $n_S$ is the number of items solved by the incumbent.

Conditioned on the $m=w+\ell$ discordant pairs, SAGE tests whether the probability that a discordance is a win exceeds the asymmetric break-even threshold $q_\lambda=\lambda/(1+\lambda)$. Its p-value is the upper tail of $\operatorname{Bin}(m,q_\lambda)$ at $w$; for $\lambda=1$, this is the one-sided exact McNemar test. An edit is committed only if $\Delta_\lambda>0$, the p-value is below $\alpha$, and $\rho\leq\tau$; otherwise the gate abstains and preserves the incumbent.

The construction keeps proposal generation unchanged. At $(1,1,1)$, the additional constraints become inactive whenever $w>\ell$, exactly reproducing the baseline aggregate-score rule. Conservative settings accept only a subset of edits that the baseline would accept.

## Experiments

The experiments integrate SAGE with SkillOpt while holding its optimizer fixed. They cover LiveMath, SpreadsheetBench, SearchQA, OfficeQA Pro, and ALFWorld with DeepSeek-V4-flash, GLM-5.2, MiniMax-M3, and Qwen3.6. Baseline and SAGE runs receive equal numbers of proposed edits and equal token budgets. DocVQA is omitted because not all four backbones support visual input.

SAGE lowers the reported regression rate in 19 of 20 backbone-benchmark combinations and matches the baseline for GLM-5.2 on SearchQA. With DeepSeek-V4, the rate falls from 36.5% to 0% on LiveMath, 16.6% to 0% on SpreadsheetBench, and 42.8% to 0% on OfficeQA; reductions are smaller on SearchQA and ALFWorld, where baseline regression is already low.

SAGE reports the highest final score in every one of the 20 settings, improving over vanilla SkillOpt by 8.73 points on average. For DeepSeek-V4, LiveMath rises from 34.15 to 48.78 and OfficeQA from 32.93 to 45.12. The paired criterion without the significance test improves on SkillOpt in all settings by 6.20 points on average; the complete gate adds another 2.53 points on average and improves on that ablation in all 20 comparisons. The largest benefits occur on the tasks with the highest baseline regression rates.

## Limitations

- The verifier must be binary. Graded rewards require a different paired statistic, such as a signed-rank procedure.
- The sign-style test uses only win and regression counts, discarding outcome magnitude and potentially missing small consistent improvements.
- The exact error guarantee applies to one fixed incumbent-candidate comparison. Reusing the validation set across adaptive rounds leaves trajectory-level error uncontrolled.
- The regression penalty, cap, and significance level are tuned on held-out data and remain task-dependent manual choices.
- The evaluation is text-only and omits DocVQA, so multimodal generalization is untested.
- Proposal generation is fixed to SkillOpt; joint optimization of the proposer and gate is left open.
- The supplied source gives no DOI or arXiv identifier for this paper.

## Related Concepts

- [[concepts/statistical-acceptance-gates|Statistical Acceptance Gates]]
- [[concepts/recursive-self-improvement|Recursive Self-Improvement]]
- [[concepts/regularized-harness-evolution|Regularized Harness Evolution]]
- [[concepts/objective-hacking|Objective Hacking]]

## Related Papers

**Library papers:**

- [[papers/rrsi-regularized-recursive-self-improvement-of-agent-harnesses|RRSI: Regularized Recursive Self-Improvement of Agent Harnesses]]: regularizes both proposal and selection during broad harness evolution, while SAGE isolates a paired statistical acceptance rule for skill edits.
- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]]: accepts harness rewrites using private held-out grades and illustrates the noisy nested evaluation problem that SAGE addresses more directly.
- [[papers/grow-the-harness-not-the-context-from-strategy-free-scaffolds-to-reusable-specialist-agents|Grow the Harness, Not the Context]]: uses held-out rollback to prevent regressions in trace-local harness repairs.

**Works cited by the source:**

- Yang et al. (2026), "SkillOpt: Executive Strategy for Self-Evolving Agent Skills": supplies the controlled skill optimizer and aggregate-score gate used as SAGE's baseline.
- Smith and Winkler (2006), "The Optimizer's Curse": motivates skepticism toward the best observed value under noisy selection.
- Ben-Michael, Imai, and Jiang (2024), "Policy Learning with Asymmetric Counterfactual Utilities," and Träuble et al. (2021), "Backward-Compatible Prediction Updates": motivate asymmetric treatment of newly solved and newly broken cases.

[[index|Library home]]
