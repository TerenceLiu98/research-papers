---
title: Public opinion dissemination simulation based on large language model multi-agent systems
type: paper
authors:
  - Hai Lan
  - Hua Hu
  - Peng Cheng Guo
  - Qi Huang
year: 2026
tags:
  - llm-agents
  - agent-based-models
  - opinion-dynamics
  - information-diffusion
---

## TL;DR

The paper combines probabilistic action selection with LLM-generated personas and text in a [[Hybrid LLM Agent-Based Simulation|hybrid simulation]] of public opinion on Weibo. Two 20-minute simulations produce incubation, outbreak, and decline patterns, with normalized action entropy of 0.6655 and 0.7214 and Distinct-2 scores of 0.6242 and 0.8319. These are small simulation demonstrations of behavioral and lexical variation, with no reported held-out prediction benchmark or controlled ablation establishing real-world fidelity.

## Research Question

Can a unified multi-agent framework combine realistic aggregate participation patterns with heterogeneous textual interactions while allowing new public opinion scenarios to be configured without retraining?

## Motivation

Rule-based [[Opinion Dynamics|opinion models]] can simplify individual behavior, while fully generative agents can be expensive and lack explicit constraints on aggregate activity. The paper assigns frequent action and target decisions to probabilistic mechanisms and uses an LLM for persona construction and semantic content, seeking a manageable link between aggregate dissemination and individual expression.

## Contributions

- Defines four participant roles: General Public, Hypester (an amplifier or opinion leader), Controller (an intervening institution), and Subject (the entity affected by the event).
- Couples empirically calibrated action sampling, Gaussian topic and attitude variation, and feature-based target selection with LLM-generated profiles, posts, and comments.
- Coordinates agents through a Public Opinion Simulation Standard Operating Procedure (PSOP) and a Global Information Sharing Pool (GISP).
- Reports two scenario demonstrations, action-distribution entropy, lexical diversity, and a qualitative comparison of adaptation requirements.

## Method

**Probabilistic layer.** The authors report collecting 34,000 Weibo interaction records with 23 dimensions from a November 2024 down-jacket fraud event. They fit an exponential distribution with rate approximately 0.9 using maximum likelihood. A sampled continuous "behavior cost" is mapped to an action using thresholds. Equation 5 assigns intervals `[0,1)`, `[1,2)`, `[2,3)`, and `[3,infinity)` to like, comment, forward, and post, respectively. This ordering conflicts with the adjacent prose and the later repost-heavy results; the source does not resolve the discrepancy. Role-specific Gaussian variables constrain topics and attitudes.

**Target selection.** A sigmoid transforms a weighted sum of time decay, topic similarity, attitude similarity, normalized follower count, and interaction heat into an interaction probability. The experiments use weights 0.15, 0.35, 0.25, 0.20, and 0.05, respectively. This separates structured interaction selection from textual generation.

**Cognitive layer.** Sequential prompts generate an event summary, basic persona, inherent topics, and attitudes. The LLM then generates comments and posts and performs sentiment analysis. Agents use role settings, current context, and retrieved history, with memory, planning, tool use, and action components. PSOP supplies workflows; GISP stores shared information and long-term interaction history. A weighted indicator combines attention, topic tendency, and media authority to summarize public opinion intensity.

## Experiments

Event A is the November 2024 Shanghai electricity-price event; Event B is the July 2024 tanker-truck fuel-to-edible-oil transport scandal. The simulations deploy 20 and 11 agents, respectively, covering all four roles, for 1,200 seconds. Table 1 names the model as `Llama3-7B-Instruct`; this is retained as reported, without inferring a corrected checkpoint. The source reports Windows 11, Python 3.9, SQLite3, 32 GB RAM, and a GPU entry of 16 GB.

| Measure | Event A | Event B |
| --- | ---: | ---: |
| Total actions (Table 3) | 276 | 281 |
| Likes | 143 | 140 |
| Reposts | 96 | 85 |
| Comments | 26 | 44 |
| Posts | 10 | 8 |
| Deleted posts | 1 | 4 |
| Shannon entropy, bits (Table 4) | 1.5453 | 1.6750 |
| Normalized entropy (Table 4) | 0.6655 | 0.7214 |
| Generated comments and posts (Table 5) | 36 | 52 |
| Distinct-1 (Table 5) | 0.3476 | 0.4417 |
| Distinct-2 (Table 5) | 0.6242 | 0.8319 |

Normalized entropy divides action entropy by `log2(5)`. The reported values agree with the Table 3 counts. Distinct-n is the fraction of unique n-grams in generated text; its values measure lexical repetition, not factual accuracy or human behavioral fidelity. The often-highlighted Distinct-2 value of approximately 0.83 belongs to Event B, rather than both events or a pooled corpus.

Figure 13 is described as showing incubation, outbreak, and decline in both scenarios, with faster outbreak in the food-safety case and promotion and inhibition curves. The authors report migrating by replacing the event configuration without fine-tuning. Their cost tables compare architectural and adaptation requirements; they do not report matched runtime, token, energy, or monetary measurements against implemented baselines.

## Limitations

- **External validity:** Validation covers two events on Weibo with 11 or 20 agents and one reported LLM. The paper acknowledges the need for more platforms, scenarios, models, and multimodal inputs. Reproducing a plausible curve shape does not establish predictive accuracy against observed event trajectories.
- **Attribution and uncertainty:** No controlled removal of role heterogeneity, probabilistic constraints, PSOP, or GISP is reported, nor repeated-run uncertainty estimates. Variation partly follows the imposed role profiles and sampling rules, so the metrics alone cannot establish the contribution of each component.
- **Source inconsistencies:** Equation 5 reverses the prose ordering of comment and repost costs. Table 2 gives 78.16% for 214 of 281 General Public actions in Event B, although those counts imply about 76.16%. Table 6 places values described in the prose as repost ratios under a comments header. These discrepancies are preserved as unresolved reporting issues in the supplied Markdown.
- **Cost and reproducibility:** The cost discussion states an 8 GB GPU requirement, whereas Table 1 lists 16 GB. Table 8 mentions ten opinion cases, although the detailed evaluation covers two and calibration uses another event. Training-free scenario adaptation still requires inference and configuration; the data are available only from the corresponding author on reasonable request.

## Related Concepts

- [[Hybrid LLM Agent-Based Simulation]]
- [[Opinion Dynamics]]
- [[LLM-Based Strategic Experimentation]]

## Related Papers

- Nasim et al. (2025), "Simulating Influence Dynamics with LLM Agents," arXiv:2503.08709. Cited by the source as an LLM opinion-dynamics approach.
- Yao et al. (2025), "Social opinions prediction utilizes fusing dynamics equation with LLM-based agents." Cited as a related hybrid approach.
- Wang et al. (2025), "Data-driven agent-based model for public opinion propagation simulation in cyberbullying." Cited as a domain-specific propagation simulation.
- [[Multi-Agent Strategic Games with LLMs]] is a methodological comparison in this library: it studies controlled strategic interactions and explicitly limits inference from artificial agents to human behavior. It is not presented as a citation from this paper.

[[index|Library home]]
