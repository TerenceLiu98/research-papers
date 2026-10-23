---
title: "Fighting Fire with Fire: Infusing Artificial Intelligence into Peer Review to Sustain Quality Scholarship"
type: paper
authors:
  - Hemant K. Bhargava
  - Sarah H. Bana
  - Zhe Zhang
  - Laura Brandimarte
  - Vidyanand Choudhary
  - J. Frank Li
  - Pantelis Loupos
  - Daniel Zantedeschi
year: 2026
doi: "10.1287/mnsc.2026.00184"
tags:
  - peer-review
  - ai-governance
  - human-ai-collaboration
  - journal-operations
---

## TL;DR

The paper proposes [[concepts/governed-ai-peer-review|Governed AI Peer Review]]: a journal-specific AI diagnostic precedes human review, authors may contest its findings, and editors retain decision authority. A stylized operations model shows that AI can reduce reviewer effort or permit fewer reviewers while preserving decision precision, but only when productivity and signal-quality gains outweigh the correlated error created when reviewers share the same AI assessment.

## Research Question

Under what workflow and model conditions can a journal use AI to relieve peer-review capacity pressure without sacrificing decision accuracy, accountability, or human judgment?

## Motivation

AI-assisted authorship can raise submission volume faster than journals expand reviewer capacity. Near full utilization, small increases in submissions can sharply increase delays or pressure journals to relax review standards. Reviewers may also use public AI tools privately, creating a "shadow AI" regime in which confidentiality practices, prompts, reliance, and correlated errors are unobserved. The paper argues that journals should replace this unmanaged use with a transparent, measurable process rather than treat AI use as a binary choice.

## Contributions

- Proposes a journal-provided AI review before human review, paired with a short author response and structured logging.
- Frames the AI assessment as nonfinal diagnostic input: it should not recommend acceptance or rejection, and humans remain responsible for novelty, contribution, impact, and the final decision.
- Models AI as affecting both human-review productivity and reviewers' reliance on a shared signal, exposing a trade-off between efficiency and nondiversifiable correlated error.
- Derives an interior variance-minimizing level of reliance on AI and conditional thresholds for saving reviewer time or reducing a three-person panel to two reviewers.
- Shows analytically and numerically that an AI-assisted process can improve the panel estimate even when the standalone AI signal is noisier than a time-constrained human review.
- Identifies governance questions requiring journal-specific experiments, including anchoring, complacency, gaming, homogenization, author burden, and changes in editorial standards.

## Method

The human-only benchmark treats manuscript quality as a latent scalar and each reviewer report as an unbiased noisy signal. Review precision increases concavely with reviewer time. The deciding editor averages independent reports and chooses the minimum time needed to meet a target estimation-error variance.

In the AI-assisted regime, every reviewer observes the same journal-generated AI signal and combines it with an independent human assessment. AI quality can change the accuracy of the shared signal and the productivity of reviewer time, while the weight reviewers place on that signal creates covariance across their final reports. The resulting panel variance has a nondiversifiable AI-error term and a diversifiable human-error term. The paper derives comparative statics and conditional thresholds from this model, then illustrates them with four parameterized scenarios. It does not estimate the parameters with journal data.

## Experiments

The paper contains analytical results and numerical illustrations, not an empirical evaluation of a deployed workflow.

- **Optimal reliance:** For fixed AI quality, reviewer time, and panel size, estimation-error variance is strictly convex in reliance on the AI signal. The variance-minimizing weight is interior; both underreliance and overreliance are costly.
- **Effort threshold:** If greater AI quality lowers panel variance at the operating point, it also lowers the reviewer time required to meet a fixed accuracy target. Whether this condition holds depends jointly on AI precision, reviewer reliance, and the productivity effect of AI assistance.
- **Reviewer-substitution threshold:** Under continuity and monotonicity assumptions, a critical AI-quality level exists above which two AI-assisted reviewers can exceed the target precision previously supplied by three unaided reviewers.
- **Numerical scenarios:** The human-only benchmark uses three reviewers and has error variance 0.4762. Four two-reviewer AI-assisted scenarios report variances from 0.4629 to 0.4168 at the same total reviewer time, while a fourth reallocation scenario reports variance 0.4273 with 10% less total reviewer time. These are illustrative calculations, not observed journal outcomes.

## Limitations

The model assumes unbiased AI and human signals, independent intrinsic human errors, a single review round, and a scalar manuscript-quality target. It does not model directional bias, editor time, desk rejection, author withdrawal, endogenous paper improvement, or changes in the number of revision rounds. Its primary resource outcome is reviewer time, not total calendar time; the AI review and author-response stage could add front-end delay.

The claimed operational gains are conditional rather than empirical. Better AI need not improve outcomes globally because stronger reliance can amplify common error, and AI assistance can distract rather than help reviewers. The proposed workflow may also induce complacency, strategic author optimization, homogenized evaluation, excessive author burden, or shifting standards. The paper therefore presents a design and experimentation agenda, not evidence that any particular journal implementation is optimal.

## Related Concepts

- [[concepts/governed-ai-peer-review|Governed AI Peer Review]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/automation-bias|Automation Bias]]
- [[concepts/ai-adoption-in-research|AI Adoption in Research]]
- [[concepts/two-stage-bidirectional-peer-review|Two-Stage Bidirectional Peer Review]]

## Related Papers

- [[papers/position-the-ai-conference-peer-review-crisis-demands-author-feedback-and-reviewer-rewards|Position: The AI Conference Peer Review Crisis Demands Author Feedback and Reviewer Rewards]]: proposes author feedback and reviewer rewards for AI-conference peer review, whereas this paper centers a journal-governed AI diagnostic and models its operational trade-offs.
- Liang et al. (2024), "Can large language models provide useful feedback on research papers?": cited evidence that LLM critiques can overlap with human critiques.
- Liang et al. (2024), "Monitoring AI-modified content at scale": cited evidence of AI-modified text in conference reviews and motivation for the shadow-AI problem.
- Liel and Zalmanson (2025), "Turning off your better judgment": motivates concern that institutionally endorsed AI can induce algorithmic conformity.
- Sahu et al. (2025), "ReviewerToo: Should AI join the program committee?": cited evidence on the task-specific strengths and limits of AI reviewers.

[[index|Library home]]
