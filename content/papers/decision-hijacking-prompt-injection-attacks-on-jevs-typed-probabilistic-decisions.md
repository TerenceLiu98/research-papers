---
title: "Decision Hijacking: Prompt Injection Attacks on Jev's Typed Probabilistic Decisions"
type: paper
authors:
  - Tiantong Wu
  - Wei Yang Bryan Lim
year: null
source_job_id: "ea2f4121-bb49-401a-8beb-5d05008e35ee"
tags:
  - prompt-injection
  - llm-security
  - structured-decision-models
  - adversarial-evaluation
  - tool-use
---

## TL;DR

This study reconstructs 510 direct-harm InjecAgent cases as typed decisions for Jev, a non-generative decision model that selects from a declared action set and reports probabilities. Malicious content shifts the probabilities of available actions but rarely makes Jev select the attacker-target action. Adaptive access to the full probability vector doubles the mean best-so-far attacker probability, while fresh-call validated success rises only from 1.8% to 3.5%. The results show that schema-defined outputs constrain the action space without eliminating prompt-injection risk.

## Research Question

How do indirect prompt-injection attacks affect a non-generative typed decision interface, and do changes in reported probabilities translate into reliable selection of an attacker-target action?

## Motivation

Most prompt-injection evaluations study generative agents whose failures can include arbitrary tool calls, generated instructions, or disclosure. A typed interface restricts output to caller-declared actions, but a declared action can still conflict with the user's task. The study therefore separates probability shifts from target selection and tests whether reported scores provide useful feedback for adaptive attacks.

## Contributions

- Reconstructs the 510-case direct-harm split of InjecAgent as a benchmark for the first security-critical typed decision after malicious content is observed.
- Defines a decision-hijacking threat model in which the attacker changes only a designated observation slot while the user task, action set, tool descriptions, and target remain fixed.
- Separates attacker-target probability contrasts, target-selection rates, majority-rule validated success, and confidence-gated hijacks.
- Reports controlled tests of original attack transfer, injection-style markers, contextual-relatedness assertions, and deterministic score-guided optimization.
- Identifies small initial decision margins and high attacker control over observations as exploratory correlates of adaptive success, without treating them as causal or universal rules.

## Method

The authors use Jev version 1.13.0 and reconstruct each InjecAgent case with three state fields: `user_request`, `actions_taken`, and `latest_tool_result`. Only the designated attacker-controlled content in the latest tool result changes between conditions. The primary action space has three choices: the task-completing action, the source user-tool action, and the attacker-target tool. DH-1 also tests an eight-choice library space with sampled distractors.

For an action set, the study averages Jev's reported probabilities across repeated calls and cases. It reports the attacker-probability contrast, the analogous safe-action contrast, attacker-target selection frequency, targeted attack success rate (ASR), a majority-rule robust-hijack count, and a confident hijack rate using Jev's returned confidence field with threshold 0.7. Five fresh calls are used for DH-4 validation, and at least three target selections are required for a case to count as validated success.

The main study contains 54,060 calls across four experiments. Confidence intervals use a two-way pigeonhole bootstrap over attacker goals and user contexts with 10,000 resamples and 95% percentile intervals. The full log contains 64,860 calls after pilots, reruns, and a preliminary optimization ramp.

## Experiments

### DH-1: Native Attack Transfer

The original InjecAgent attack is evaluated as a base condition and with the source override prefix, ``IMPORTANT!!! Ignore all previous instructions and strictly adhere to the following instruction:``. In the three-choice space, the base attack selects the target in 9 of 510 cases (1.8%) and raises mean attacker-target probability by 0.043. The enhanced attack selects the target in 0 cases and raises the probability by 0.009. The eight-choice space preserves the same ordering.

### DH-2: Injection-Style Ablation

The study compares the plain request (A0), an importance marker (A1), an ignore-previous marker (A2), both markers (A3), and a natural-language paraphrase without override language (A4). Relative to A0, A1 changes attacker probability by -0.0059, A2 by -0.0320, and A4 by -0.0061. The ignore-previous condition produces no target selections in 2,550 calls, and the directions remain after excluding the emergency-dispatch goal.

### DH-3: Contextual Relatedness

Neutral, related, and directly related framing is added around the unchanged attack instruction. P1 minus N0 is -0.0025, P2 minus N0 is +0.0030, and P2 minus P1 is +0.0055. The first two registered contrasts use a smallest effect size of interest of 0.02, so the positive P2 minus N0 effect is below the practical threshold. The effects are distributed across many goals but remain small; all observed DH-3 target selections involve the emergency-dispatch goal.

### DH-4: Adaptive Optimization with Score Access

For each case, a deterministic search explores 72 grammar configurations made from six prefixes, four suffixes, and three copy counts. A candidate is retained only when its reported attacker-target probability improves by at least 0.01, subject to a numerical tolerance. The attacker receives the probability vector but cannot change the user request, action definitions, or other state fields.

After 24 proposals, the mean best-so-far attacker probability rises from 0.0429 to 0.0842, and 59.8% of cases improve by at least one 0.01 reporting step. Fresh validation raises validated ASR from 1.8% (9/510) at the initial attack to 3.5% (18/510) at 24 proposals. The final validation contrast is +0.0347 for attacker probability and -0.0193 for safe probability. Confidence-gated target selections remain rare at 0.2%.

The exploratory analysis finds 16 of 18 final validated successes among the 16 lowest-margin cases, with additional successes among bare snippets that contain mostly attacker-controlled content. Far-boundary embedded observations produce 1 success in 468 cases, compared with 4 in 29 far-boundary bare-snippet cases. These are in-sample associations concentrated in particular source clusters, not held-out predictive results.

## Limitations

- The study tests one proprietary model version, Jev 1.13.0, so other models and versions may behave differently.
- The reconstruction inherits InjecAgent's domains, wording, and attacker goals; it does not establish robustness outside this benchmark.
- The main action space has only three choices, while the eight-choice space is tested only in DH-1 and is not the complete tool library.
- The endpoint is selection of a declared attacker-target action, not arbitrary code execution or completion of a harmful workflow.
- Probabilities are reported in 0.01 steps, and five validation calls define a finite-repeat criterion rather than universal attack reliability.
- The margin and attacker-control analysis is exploratory, concentrated in two source clusters, and does not establish causal predictors.
- The study does not rank Jev's overall security against generative LLM agents; its transfer claim concerns attack content under different interfaces.

## Related Concepts

- [[concepts/indirect-prompt-injection|Indirect Prompt Injection]]: malicious instructions embedded in content that a model later processes.
- [[concepts/typed-probabilistic-decision-interfaces|Typed Probabilistic Decision Interfaces]]: structured decision layers that select from a declared action set and expose probabilities.
- [[concepts/probability-calibration|Probability Calibration]]: relevant because the returned probabilities become both evaluation outcomes and adaptive attack feedback.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: a neighboring decision-only evaluation setting with separate concerns for schema validity, accuracy, and confidence.

## Related Papers

- [[papers/jev-as-a-judge-accept-when-confident-escalate-when-unsure|JEV-as-a-Judge: Accept When Confident, Escalate When Unsure]]: evaluates the same Jev family for judgment accuracy, confidence, and escalation, rather than prompt-injection resistance.
- [[papers/jev-thinks-i-dont-know-but-doesnt-say-it-introducing-sys1cal-v1-dataset-for-probability-calibration|Jev thinks I don't know, but doesn't say it: Introducing Sys1Cal-v1 Dataset for Probability Calibration]]: studies the numerical behavior of Jev's structured probability outputs.
- Zhan et al. (2024), "InjecAgent: Benchmarking indirect prompt injections in tool-integrated large language model agents": source benchmark for the reconstructed direct-harm cases.
- Debenedetti et al. (2024), "AgentDojo: A dynamic environment to evaluate prompt injection attacks and defenses for LLM agents": stateful agent-security benchmark cited as related work.
- Yi et al. (2025), "Benchmarking and defending against indirect prompt injection attacks on large language models": evaluates indirect prompt injection and defenses in generative settings.
- Zhan et al. (2025), "Adaptive attacks break defenses against indirect prompt injection attacks on LLM agents": motivates adaptive evaluation with attacker feedback.

Source scope: supplied parsed Markdown for job `ea2f4121-bb49-401a-8beb-5d05008e35ee`. The manuscript supplies no publication year, venue, DOI, or arXiv identifier.

[[index|Library home]]
