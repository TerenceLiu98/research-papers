---
title: "PolicySim: An LLM-Based Agent Social Simulation Sandbox for Proactive Policy Optimization"
type: paper
authors:
  - Renhong Huang
  - Ning Tang
  - Jiarong Xu
  - Yuxuan Cao
  - Qingqian Tu
  - Sheng Guo
  - Bo Zheng
  - Huiyuan Liu
  - Yang Yang
year: 2026
doi: "10.1145/3774904.3792555"
source_job_id: "d5df774c-874b-4e8f-b1be-0c8221cd1fdd"
tags:
  - llm-agents
  - social-simulation
  - agent-based-models
  - social-media
  - recommender-systems
  - policy-optimization
---

## TL;DR

PolicySim is an LLM-based social simulation sandbox for evaluating and adapting social-media intervention policies before deployment. It combines profile- and memory-based user agents, dynamically changing follow relations, and a two-stage supervised fine-tuning (SFT) plus direct preference optimization (DPO) training procedure with a contextual-bandit intervention module. On TwiBot-20 and Weibo experiments, the authors report improved micro-level behavioral metrics and better simulated intervention outcomes for cross-viewpoint interaction and misinformation exposure, but the evidence remains bounded to synthetic sandbox feedback and retrospective scenario evaluation.

## Research Question

Can an LLM-based multi-agent social simulation model the feedback between user behavior and platform interventions well enough to proactively evaluate and optimize recommender and exposure-control policies?

## Motivation

Platform policies affect what users see, how they interact, and how opinions spread. Online A/B testing learns about these effects only after deployment and can expose users to unintended polarization, toxicity, or misinformation risks. Existing LLM social simulations model users and interactions but often omit platform interventions, use prompt-only behavioral designs, or lack a mechanism for using simulated feedback to improve policies. PolicySim addresses these gaps by placing user agents and intervention policies in one evolving sandbox.

## Contributions

- A social simulation sandbox with separate user-agent and intervention-policy modules for modeling bidirectional platform dynamics.
- User agents built from inferred profiles, short- and long-term memory, stance scores, multiple behavior selection, and dynamically updated follow relations.
- A two-stage SFT and DPO training procedure intended to align agent actions with platform data while retaining heterogeneous user intents.
- A contextual-bandit intervention module that combines exploitation and learned exploration, with message-passing over the social graph to represent network influence.
- Experiments covering micro-level agent behavior, macro-level stance dynamics, scalability, cross-viewpoint interaction, and misinformation exposure control.

## Method

### User-agent module

Each agent represents an LLM-powered social-media user with a profile, memory, behavioral model, and plan. Profiles are inferred from posts and metadata using four attributes: likely identity, interests, posting style, and interaction behavior. Agents can post, retweet, reply, like, dislike, follow, unfollow, or do nothing, and can select multiple behaviors in a round. Follow and unfollow actions make the directed social graph time-varying.

Stance toward an event is classified as negative, neutral, or positive from the user's profile and action history, then smoothed with an exponential moving average. Short-term memory extracts salient information from recent messages. Long-term memory samples semantically relevant entries with temporal decay and summarizes them for later retrieval. These components connect to [[Environment-Grounded Agent Memory]] while remaining a simulation-specific memory design rather than evidence about human memory.

### Agent training

The authors construct SFT examples from event, user-profile, and observed-action tuples. The response combines an observed action with its textual content. DPO then uses preferred observed responses and rejected alternatives sampled from the pretrained model. The SFT model serves as the DPO reference policy, so the reported ablations distinguish the full procedure from SFT-only, DPO-only, and a profile-removal variant.

### Intervention policies

The sandbox represents two policy families. Recommender systems combine relational recommendations from followed users, personalized recommendations based on user history and profiles, and headline recommendations for broadly popular content. Exposure control assigns user-specific probabilities that regulate whether a post passes the platform's filtering mechanism. The stated objectives are to increase cross-viewpoint interaction without increasing toxicity and to reduce misinformation propagation.

### Adaptive intervention

At each simulation round, an intervention action is selected from a discrete contextual-bandit action space. A recommender arm is a user-post pair; an exposure-control arm is a user-probability pair. Context embeddings combine user profile and recent memory, then propagate through the current social graph using degree-normalized message passing. The policy estimates expected reward and a learned exploration gain, ranks their sum, observes the next-round sandbox feedback, and updates both estimators.

For cross-viewpoint interaction, reward combines engagement across stance differences, a toxicity penalty, and overall engagement. For misinformation, reward is the change in the simulated misinformation state between rounds. This is an instance of [[Adaptive Intervention in Social Simulation]]: the simulator is used as a feedback environment for policy adaptation, rather than only as a fixed scenario generator.

## Experiments

The main experiments use the TwiBot-20 Twitter dataset, with additional transfer results on Weibo. The reported TwiBot-20 source contains 229,000 users, 33.5 million tweets, and 456,000 follow links; the sampled political subset used for the appendix statistics contains 924 nodes, 302 edges, and 20,061 tweets. The main user-agent backbone is Qwen2.5-3B-Instruct, with comparisons to GLM4-light, Llama-3-8B-Instruct, Qwen2.5-0.5B-Instruct, and Qwen2.5-7B-Instruct. Training uses LoRA, and the experiments run on 12 NVIDIA A100 40 GB GPUs.

### Micro-level simulation

The evaluation measures content quality with BERTScore F1 and BertSim, action behavior alignment with prediction accuracy, self-consistency with recognition accuracy, and social capability with LLM-judge scores for engagement, robustness, and suitability. In the main table, full PolicySim reports BERTScore F1 of 58.05, BertSim of 88.06, behavior-alignment accuracy of 65.56, self-consistency accuracy of 56.00, engagement of 3.20, robustness of 2.73, and suitability of 59.44. These values are averaged over five runs with reported standard deviations.

The full model outperforms the listed baseline and ablation values on most reported metrics, while Llama-3-8B-Instruct has the highest suitability score in the displayed comparison. Removing profile generation reduces performance, and DPO without SFT initialization performs worse than the full procedure, supporting the authors' interpretation that profiles and SFT initialization matter for this setup.

### Macro-level simulation and scalability

The authors inject trigger news about anti-abortion legislation at specified simulation rounds and track the distribution of agent stances. They report an initial stance change followed by recovery and increasing stance dispersion, with the recommender intervention intensifying polarization in this scenario. Runtime grows approximately linearly with the number of agents over ten simulation rounds, with a reported fit of R-squared = 0.9904.

### Adaptive intervention

For cross-viewpoint interaction, Table 3 reports PolicySim's stance mean and standard deviation as 0.376 and 0.48, toxicity as 0.0386, and cross-stance interaction as 0.56, compared with 0.184, 0.42, 0.0426, and 0.14 for epsilon-greedy and 0.026, 0.34, 0.0628, and 0.50 for UCB. For misinformation exposure control, the reported propagation ratio is 24% for PolicySim, compared with 26% for epsilon-greedy, 30% for UCB, and 40% for the origin condition.

In a comparison with HiSim-based fixed-message-passing baselines under identical settings, PolicySim reports average reward 0.3661 and average toxicity 0.0392, compared with rewards of 0.1596 and 0.1724 and toxicity values of 0.0487 and 0.0471 for the two baselines. A Weibo transfer table reports engagement 3.28, robustness 2.68, and suitability 69.86 for PolicySim versus 3.15, 2.61, and 52.08 for Qwen2.5-3B-Instruct.

## Limitations

- **Sandbox validity:** The results show that the policy can optimize the objectives defined by the simulated environment. They do not establish that the learned policy will produce the same effects among real users, or that simulated reward is a safe proxy for deployment outcomes.
- **Retrospective scenario design:** Macro-level evaluation supplies selected trigger news and timing, including an anti-abortion-legislation scenario. This evaluates response to a constructed historical sequence rather than prospective prediction of unknown platform events.
- **Measurement dependence:** Stances, toxicity, content similarity, and several social-capability judgments depend on automated or LLM-based evaluators. Agreement with those evaluators is not independent evidence of realistic human behavior.
- **Population and platform scope:** The evidence is concentrated on a sampled TwiBot-20 setting and a Weibo transfer experiment with roughly 1,000 simulated agents in the comparison table. It does not establish validity across platforms, populations, languages, or larger deployment conditions.
- **Objective dependence:** The bandit optimizes the paper's chosen reward functions, which combine stance difference, toxicity, engagement, or misinformation state. Alternative welfare, fairness, privacy, or safety objectives could select different policies.
- **Reproducibility and inference:** The supplied source contains OCR-corrupted symbols and some underspecified implementation details, and the experiments do not report a real-user deployment, an independent policy-effect benchmark, or uncertainty for every intervention comparison.

## Related Concepts

- [[Adaptive Intervention in Social Simulation]]
- [[Hybrid LLM Agent-Based Simulation]]
- [[Environment-Grounded Agent Memory]]
- [[Social Media News Exposure]]
- [[Opinion Dynamics]]
- [[Misinformation Spreading Models]]
- [[Dynamic Agent Structure]]
- [[Validity Boundaries for LLM Social Simulations]]
- [[LLM-as-a-Judge]]

## Related Papers

- Yang et al. (2024), "OASIS: Open Agent Social Interaction Simulations with One Million Agents," cited as a large-scale social simulation framework with evolving relations but no adaptive interventions.
- Tornberg et al. (2023), "Simulating Social Media Using Large Language Models to Evaluate Alternative News Feed Algorithms," cited for evaluating alternative feed algorithms in an LLM-based environment: [arXiv:2310.05984](https://arxiv.org/abs/2310.05984).
- [[Social opinions prediction utilizes fusing dynamics equation with LLM-based agents]] combines LLM agents with explicit opinion dynamics but evaluates retrospective trajectories rather than adaptive platform intervention.
- [[Public opinion dissemination simulation based on large language model multi-agent systems]] uses probabilistic action selection and LLM-generated social-media content in a smaller Weibo simulation.
- [[LLM-Based Social Simulations Require a Boundary]] provides a complementary framework for limiting claims when simulated populations do not reproduce human behavioral heterogeneity.

[[index|Library home]]
