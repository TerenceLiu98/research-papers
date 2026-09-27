---
title: LLM-Based Roll-Call Vote Prediction
type: concept
aliases:
  - LLM Legislative Vote Prediction
tags:
  - roll-call-voting
  - legislative-behavior
  - llm-agents
---

## Overview

LLM-based roll-call vote prediction conditions a language model on a legislator's profile, legislative context, and possibly other agents' predicted votes to generate a voting outcome. It can incorporate observed voting history through prompts without fitting a task-specific representation model. The central evaluation question is whether these inputs improve held-out predictions; whether the generated reasoning explains real legislative behavior requires additional evidence.

## Key Ideas

- **Profiles serve as prediction context.** Party affiliation, committee roles, constituency characteristics, sponsorship, and prior votes can enter a prompt directly. Their availability must be assessed relative to the vote being predicted, including the dates of profile snapshots.
- **Political perspectives structure generation.** Trustee, delegate, and party-follower perspectives provide alternative rationales that can be synthesized into a vote. These prompt roles do not establish that the corresponding motivations govern an actual legislator's choice.
- **Interaction changes prediction dependencies.** Political Actor Agent predicts designated leaders first and supplies their predicted votes to other agents. This makes downstream outputs conditional on earlier outputs and creates a route for errors to propagate. Removing that mechanism tests its contribution to prediction, not the causal effect of real leaders.
- **History length is an empirical choice.** More observed votes can add evidence but also crowd out other profile information. PAA reports that using all training votes in its prompts can perform worse than sampling 20 records; this is a result of that design, not a universal context-length rule.
- **Separate generalization targets.** Later votes, unseen legislators, and different legislatures require distinct evaluations. Lower training fractions alone do not demonstrate performance on new legislators, and changing temporal splits can change test difficulty.
- **Validate distinct claims separately.** Accuracy and macro-F1 measure prediction, repeated runs measure output stability, and identifier perturbations probe sensitivity to names. Factual grounding and faithful explanations need their own checks; stable or plausible text is insufficient.

## Important Papers

- [[papers/political-actor-agent-simulating-legislative-system-for-roll-call-votes-prediction-with-large-language-models|Political Actor Agent: Simulating Legislative System for Roll Call Votes Prediction with Large Language Models]] introduces profiles, three-perspective planning, and leader-first prediction. Its GPT-4o-mini implementation reports 91.3-92.1% accuracy across three chronological U.S. House splits, with substantial losses when complete modules are removed.

## Related Concepts

- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: incorporates legislative context through topic-specific latent positions rather than generated role-based reasoning.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: connects the evidence about generated behavior to the scope of supported social-science claims.
