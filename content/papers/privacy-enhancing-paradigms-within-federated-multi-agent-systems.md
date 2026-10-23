---
title: Privacy-Enhancing Paradigms within Federated Multi-Agent Systems
type: paper
authors:
  - Zitong Shi
  - Guancheng Wan
  - Wenke Huang
  - Guibin Zhang
  - Jiawei Shao
  - Mang Ye
  - Carl Yang
year: null
tags:
  - federated-multi-agent-systems
  - llm-agents
  - privacy
  - data-minimization
---

## TL;DR

The paper defines [[concepts/federated-multi-agent-systems|Federated Multi-Agent Systems]] as real-time agent collaboration in which confidential information is not shared directly, then proposes Embedded Privacy-Enhancing Agents (EPEAgents). A trusted server-side agent filters user-profile fields and intermediate messages according to each local agent's role. Across synthetic financial and medical tasks, EPEAgents substantially raises the paper's refusal-based privacy scores while usually preserving multiple-choice utility, but the evaluation does not establish a formal privacy guarantee or performance on real user data.

## Research Question

How can an LLM-based multi-agent system accommodate heterogeneous privacy requirements, retain context needed for task execution, and adapt to changing communication structures without imposing a complex cryptographic architecture?

## Motivation

Conventional multi-agent systems may expose complete user profiles and intermediate reasoning to every participating agent. This is especially problematic in finance and medicine, where agents have different responsibilities and therefore different information needs. The paper argues that federated learning is not a direct solution: federated learning protects training data while coordinating model updates, whereas federated multi-agent systems must control information exchange during live task allocation, retrieval, and conversation.

## Contributions

- Defines Federated MAS and distinguishes its execution-time privacy problem from federated learning.
- Identifies heterogeneous privacy protocols, variations in conversational context structure, and dynamic communication networks as three design challenges.
- Introduces EPEAgents, a server-side mediation layer that applies role-conditioned data minimization to user profiles and agents' intermediate responses.
- Constructs synthetic financial and medical profiles, multiple-choice questions, and open-ended questions for measuring task utility and unauthorized-information refusal.
- Evaluates the architecture across six listed backbone models and reports ablations on the number and backbone choice of privacy-enhancing agents.

## Method

The system represents communication within a round as spatial edges and communication across rounds as temporal edges. In the evaluated `3+n` architecture, three domain agents exchange information through one or more server-side privacy agents. Financial roles cover market data, risk assessment, and transaction execution; medical roles cover diagnosis, treatment recommendation, and medication management.

At initialization, each local agent sends a role description to the privacy agent. The privacy agent associates profile fields with authorized roles and forwards only matching fields. It also filters intermediate responses before forwarding them, limiting what downstream or summarizing agents can observe. When a legitimate task requires information that the privacy agent did not authorize, the proposed design allows a trusted third party to ask the user for permission directly.

The benchmark uses 25 synthetic profiles with 11 fields. Questions and field-to-agent labels are generated through a three-stage process: GPT-o1 drafting, cross-model review, and majority voting or manual inspection. Utility is multiple-choice accuracy. Privacy is operationalized as selecting a designated "refuse to answer" option for unauthorized multiple-choice questions or exactly matching a prescribed refusal for open-ended questions.

## Experiments

The paper reports 21,750 samples across financial and medical scenarios. Table 1 lists Claude-3.5, GPT-o1, GPT-4o, GPT-3.5-turbo, Gemini-1.5, and Gemini-1.5-pro. EPEAgents increases every reported privacy score relative to the unfiltered baseline. GPT-o1 obtains the strongest reported results: financial privacy rises from 15.89% to 97.62% on multiple-choice questions and from 23.53% to 96.31% on open-ended questions; medical privacy rises from 14.57% to 95.43% and from 14.73% to 95.84%, respectively.

Multiple-choice utility changes much less. With GPT-o1 it rises from 95.12% to 96.61% in finance and from 89.83% to 91.89% in medicine. Two settings show small declines: GPT-3.5-turbo in finance decreases by 0.53 percentage points, and Gemini-1.5 in medicine decreases by 0.46 points.

Ablations indicate that the server-side privacy agent's backbone matters more than simply adding privacy agents. Replacing GPT-o1 with Gemini-1.5 on the server while retaining GPT-o1 local agents lowers the reported privacy score to 58.67%, a 38.95-point drop. Increasing the number of privacy agents helps Gemini-1.5 by as much as 6.29 points but can reduce privacy scores with Claude-3.5.

## Limitations

- The profiles and questions are synthetic, cover only finance and medicine, and use a fixed three-role local architecture; the results do not demonstrate behavior with real users, broader domains, or other agent organizations.
- Field-to-agent permissions are assigned by LLMs. The authors note that real permissions depend on user preferences and call for benchmarks that measure alignment with those preferences.
- The privacy agent is assumed to run on a trusted server and itself receives the complete profile and intermediate responses, concentrating trust in that component.
- The reported privacy metric measures compliance with predefined refusal answers. It is not a formal confidentiality guarantee and does not measure leakage through paraphrases, indirect inference, collusion, repeated interactions, or compromise of the privacy agent.
- Open-ended privacy uses exact match against a prescribed refusal, which measures output form as well as whether sensitive information was withheld.
- Stronger server backbones produce substantially better privacy scores, while weaker models can lose utility. The architecture therefore depends on model capability and potentially costly models despite being described as lightweight.
- The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier, so those metadata are left unasserted.

## Related Concepts

- [[concepts/federated-multi-agent-systems|Federated Multi-Agent Systems]]
- [[concepts/differential-privacy|Differential Privacy]]
- [[concepts/dynamic-agent-structure|Dynamic Agent Structure]]

## Related Papers

- [[papers/differential-privacy-in-generative-ai-agents-analysis-and-optimal-tradeoffs|Differential Privacy in Generative AI Agents: Analysis and Optimal Tradeoffs]] studies a formal, dataset-level privacy framing for generated agent responses, whereas EPEAgents evaluates role-based filtering through refusal behavior.
- Bagdasarian et al. (2024), *AirGapAgent: Protecting Privacy-Conscious Conversational Agents*, informs the paper's evaluation design but does not yet have a library page.
- Zyskind, South, and Pentland (2023), *Don't Forget Private Retrieval: Distributed Private Similarity Search for Large Language Models*, protects retrieval with multi-party computation and approximate search; the paper contrasts it with EPEAgents' role-aware mediation across retrieval and context exchange.

[[index|Library home]]
