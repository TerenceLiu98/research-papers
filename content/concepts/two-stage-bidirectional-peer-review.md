---
title: Two-Stage Bidirectional Peer Review
type: concept
aliases:
  - Two-Stage Review Release
  - Bidirectional Peer Review
tags:
  - peer-review
  - reviewer-accountability
  - mechanism-design
---

## Overview

Two-stage bidirectional peer review is a conference-review design in which authors evaluate a review's demonstrated understanding before they learn its recommendation. The review is split into an initial neutral or positive portion and a later critical portion. Locking author feedback between those releases aims to make review quality visible while reducing the incentive to punish reviewers for unfavorable ratings.

## Key Ideas

- **Separate comprehension from verdict.** The first release contains the paper summary, strengths, and clarification questions. Authors rate whether the reviewer understood the work and asked constructive questions; weaknesses and scores are disclosed only after that assessment is fixed.
- **Aggregate across assignments.** A single author may rate strategically. Reviewer-level averages across multiple papers can give meta-reviewers broader context, although aggregation does not eliminate selection, outcome, or measurement bias.
- **Use feedback for accountability and recognition.** Scores can inform the weight placed on a review, future reviewer selection, and positive credentials such as reviewer badges. Sanctions and rewards require oversight because author satisfaction is not equivalent to review quality.
- **Constrain predictable gaming.** Length limits can reduce incentives to inflate the positive section, while meta-reviewers can examine suspicious feedback or unsupported flags. Evaluation criteria should reward demonstrated understanding and constructive criticism rather than leniency.
- **Treat automated-review flags as weak evidence.** A labeled LLM review may provide authors with a comparison point, but stylistic similarity and typo rates cannot reliably establish that a human reviewer used an LLM.
- **Evaluate before broad adoption.** Pilot deployments should measure reviewer recruitment, author-outcome bias, review length, score calibration, meta-review workload, and whether feedback predicts independent assessments of review quality.

## Important Papers

- [[papers/position-the-ai-conference-peer-review-crisis-demands-author-feedback-and-reviewer-rewards|Position: The AI Conference Peer Review Crisis Demands Author Feedback and Reviewer Rewards]]: proposes the two-release workflow and connects aggregated author feedback to reviewer credentials and conference governance.
- Goldberg et al. (2025), "Peer reviews of peer reviews: A randomized controlled trial and other experiments": documents outcome and length biases relevant to author evaluations of reviews.
- Su (2021), "You are the best reviewer of your own papers": develops a distinct owner-assisted scoring mechanism in which authors rank their own submissions.

## Related Concepts

- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/automation-bias|Automation Bias]]
