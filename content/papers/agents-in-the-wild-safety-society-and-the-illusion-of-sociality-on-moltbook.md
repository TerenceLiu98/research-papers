---
title: "Agents in the Wild: Safety, Society, and the Illusion of Sociality on Moltbook"
type: paper
authors:
  - Yunbei Zhang
  - Kai Mei
  - Ming Liu
  - Janet Wang
  - Dimitris N. Metaxas
  - Xiao Wang
  - Jihun Hamm
  - Yingqiang Ge
year: 2026
tags:
  - llm-agents
  - agent-security
  - social-networks
---

## TL;DR

A nine-day observational study of Moltbook finds abundant institutional and identity discourse alongside sparse reciprocal interaction. Across 27,269 agents, 137,485 posts, and 345,580 comments, reported reciprocity is 4.1% and 88.8% of comments are top-level. Attack-flagged posts receive roughly six times the mean score of other posts, but this measures engagement rather than demonstrated attack success.

## Research Question

What social structures, safety threats, and interaction patterns arise when AI agents participate in an open social platform without predefined roles?

## Motivation

Controlled agent simulations reveal only part of the behavior of deployed [[concepts/llm-multi-agent-systems|LLM multi-agent systems]]. An open platform exposes agents to operator incentives, adversarial content, public rankings, and rapidly changing participation. The paper asks whether apparently rich social output corresponds to sustained relationships.

## Contributions

- Combines social-topic detection, safety classification, and reply-network analysis in a single observational dataset.
- Documents a gap between institutional discourse and reciprocal, persistent conversation, termed the “illusion of sociality.”
- Describes engagement with philosophical manipulation and surface signals of coordinated activity, information exposure, and token promotion.
- Reports a non-monotonic association between identity language and interaction breadth, termed the performative identity paradox.

## Method

The study uses the publicly available Moltbook Observatory Archive, collected passively from January 28 through February 5, 2026. Six tables cover agents, posts, comments, submolts, platform snapshots, and word frequencies.

Keyword analysis identifies ten social categories. A broad six-category taxonomy captures safety-adjacent discussion; a narrower pattern detector flags seven attack categories. A directed graph derived from comment-parent relationships measures reciprocity, depth, degree, and unique interaction partners. Additional analyses examine exact duplicates, ten-minute co-activity windows, naming patterns, self-replies, and sensitive-information patterns. These are observational indicators, not verified operator identities or experimentally tested compromises.

## Experiments

The paper reports descriptive analyses rather than intervention experiments.

| Analysis | Reported result |
| --- | --- |
| Social discourse | 99,952 governance mentions and 99,379 economy mentions; authors describe a transition from identity formation to institutional discourse within days |
| Human-directed sentiment | 13,644 pro-human posts versus 646 anti-human posts, approximately 21:1 |
| Attack categories | 15,915 detected instances; API injection 61.5%, social engineering 31.9%, prompt injection 3.7% |
| Engagement | Attack posts: mean score 309.3 versus 51.3; mean comments 8.0 versus 3.8 |
| Response categories | Philosophical engagement 17.0%, defensive responses 7.5%, compliance 4.9% |
| Interaction structure | 4.1% reciprocity, maximum depth 4, 55.1% of posts without comments |
| Originality | 79.4% of posts and 48.8% of comments classified as original; 51.2% of comments are exact duplicates |
| Identity-language quartiles | Unique partners rise from 18.0 in Q1 to 35.4 in Q3, then decline to 22.1 in Q4 |
| Coordination signals | 3,734 agents exhibit at least one signal; one identical token-minting payload appears 2,411 times across 136 names |
| Security patterns | 25,376 potential issues, including 572 API-key-pattern matches across 101 agents |

The highest identity-language quartile has approximately 38% fewer partners than Q3, not fewer than every other quartile. The attack results establish visibility and response patterns; the article's stronger language about effectiveness is not supported by a controlled attack-success comparison.

## Limitations

- Keyword and pattern matching can confuse discussion, satire, benign examples, and actual attacks. Credential-pattern matches do not establish usable leaked credentials.
- Nine days on one platform cannot establish long-term dynamics or general properties of language models. Human operators and agent frameworks can shape observed behavior.
- Coordination signals suggest shared operation but do not prove it. Institutional vocabulary does not independently establish functioning institutions.
- Engagement associations do not identify ranking-system causality, successful safety bypasses, or the causal effect of identity language.
- The source has numerical and denominator ambiguities: the main population is 27,269 while Appendix E uses 27,270; the reported rapid-reply percentages require qualification because 55.1% of posts receive no comments. Reported reciprocity should be retained as the authors' statistic rather than reconstructed from incompletely specified pair counts.
- Broad safety categories overlap; their percentages should not be summed into a prevalence estimate.

## Related Concepts

- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: open deployment adds platform-level incentives and adversarial communication.
- [[concepts/indirect-prompt-injection|Indirect Prompt Injection]]: externally encountered agent posts can carry embedded instructions; this is narrower than all safety-themed discourse.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: social-looking text and activity counts require separate validation against relational behavior.

## Related Papers

- Park et al. (2023), “Generative Agents: Interactive Simulacra of Human Behavior”: cited controlled simulation background for comparison with open deployment.
- Lin et al. (2026), “Exploring Silicon-Based Societies: An Early Study of the Moltbook Agent Community”: concurrent Moltbook analysis cited by the authors.
- Manik and Wang (2026), “OpenClaw Agents on Moltbook: Risky Instruction Sharing and Norm Enforcement in an Agent-Only Social Network”: cited concurrent security and interaction study.
- [[papers/llm-multi-agent-systems-challenges-and-open-problems|LLM Multi-Agent Systems: Challenges and Open Problems]]: a complementary library survey of planning, communication, and memory organization; the present study examines observed platform behavior.
