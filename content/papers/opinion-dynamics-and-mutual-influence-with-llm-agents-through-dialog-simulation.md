---
title: Opinion dynamics and mutual influence with LLM agents through dialog simulation
type: paper
authors:
  - Yulong He
  - Dutao Zhang
  - Sergey Kovalchuk
  - Pengyi Li
  - Artem Sedakov
year: null
tags:
  - opinion-dynamics
  - llm-agents
  - social-influence
---

## TL;DR

Five-agent dialog simulations produce sentiment trajectories that can be fitted by DeGroot (DG) and Friedkin–Johnsen (FJ) opinion models. DeepSeek V3 has the lowest reported fitting residuals and Mistral Large the highest among five tested LLMs. These results establish compatibility with fitted mathematical dynamics in a controlled fictional discussion, rather than validation against human opinion trajectories.

## Research Question

How closely do LLM dialog trajectories follow classical averaging and anchoring models, and how do fitted self-influence and susceptibility differ between homogeneous and heterogeneous groups?

## Motivation

Longitudinal opinion data are scarce and social-media discussions contain uncontrolled external influences. A fictional topic, “What kind of person is Noah?”, provides a controlled setting for studying [[concepts/opinion-dynamics|Opinion Dynamics]] through natural-language exchanges.

## Contributions

- Constructs repeated discussions with controlled initial stances and dialog memory.
- Connects generated text to classical influence models through sentiment measurement and constrained least-squares fitting.
- Compares five model families in homogeneous groups and one mixed-model configuration.

## Method

Agents receive one of five initial stances, from strongly positive to strongly negative, and generate messages shorter than 100 words. Subsequent prompts provide peers’ messages and the agent’s previous opinion. The FJ condition additionally retains the initial opinion in context. These prompts implement analogues of mathematical updating, without guaranteeing that generated text obeys a linear equation.

Twitter-RoBERTa maps messages to sentiment scores. The fitted DG model is

$$x(t+1)=Wx(t),$$

where $W$ is nonnegative and row-stochastic. The FJ model adds persistent initial beliefs:

$$x(t+1)=SWx(t)+(I-S)x(1),$$

where $S$ is diagonal with entries in $[0,1]$. Parameters minimize squared one-step residuals over the observed trajectory. The diagonal $W_{ii}$ measures retention of the preceding opinion; $1-S_{ii}$ measures direct anchoring to the initial opinion. These are distinct mechanisms, although the paper sometimes describes both as self-trust or anchoring.

## Experiments

Homogeneous experiments use five instances of each model, five distinct initial stances, and 20 discussion rounds. Table 1 reports:

| Model | DG residual sum | DG mean self-weight | FJ residual sum | FJ mean self-weight | FJ mean susceptibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| GPT-4o mini | 0.3276 | 0.2365 | 0.5672 | 0.2670 | 0.8226 |
| Qwen2.5 | 0.1070 | 0.3395 | 0.2767 | 0.1977 | 0.8994 |
| Llama 3.3 | 0.4675 | 0.1988 | 0.9782 | 0.3109 | 0.9045 |
| Mistral Large | 1.1025 | 0.1431 | 1.6534 | 0.2722 | 0.9792 |
| DeepSeek V3 | 0.0087 | 0.2209 | 0.1146 | 0.1331 | 0.8653 |

The table calls the metric “sum of residuals”; the estimation objective uses squared residuals. DeepSeek V3 fits best and Qwen2.5 second best under both conditions. FJ susceptibility exceeds 0.8 for every model. DG and FJ use different prompt-generated trajectories, so their residuals do not compare nested models on identical observations.

The heterogeneous experiment also runs for 20 rounds, assigning DeepSeek V3, GPT-4o mini, Qwen2.5, Mistral Large, and Llama 3.3 the stances strongly positive, positive, neutral, negative, and strongly negative, respectively. Table 2 shows asymmetric fitted influence. For example, DeepSeek V3 assigns DG weights 0.7558 to Qwen2.5 and 0.2442 to Mistral Large; under FJ it assigns 0.3369 to itself and 0.6631 to Mistral Large. Llama 3.3 has FJ self-weight 0.6890 and susceptibility 1: persistence through its previous state does not imply direct initial-belief anchoring. The authors explicitly condition cross-model interpretations on this one stance assignment.

## Limitations

- One fictional topic, five-agent groups, and a fixed mixed-model stance assignment restrict generalization; model identity and initial stance are confounded in the heterogeneous experiment.
- Fitted influence weights are descriptive parameters, not independently measured interpersonal trust or causal effects.
- Sentiment is a proxy for opinion. The supplied text does not report human validation of that proxy, repeated-run uncertainty, or held-out trajectory prediction.
- Prompt memory approximates DG/FJ mechanisms; a good fit alone does not establish the generating mechanism or human behavioral validity. This connects to [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- The supplied Markdown provides no explicit publication year or stable identifier for this paper; the year is left unknown. Some prose interpretations of influence conflict with Table 2, so the numerical examples above follow the table.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/llm-based-social-network-modeling|LLM-Based Social Network Modeling]]
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]

## Related Papers

- DeGroot (1974), “Reaching a consensus”: the averaging model used for fitting.
- Friedkin and Johnsen (1990), “Social influence and opinions”: the persistent-initial-belief extension.
- Chuang et al. (2024), “Simulating opinion dynamics with networks of LLM-based agents”: cited prior work on interacting LLM populations.
- [[papers/social-opinions-prediction-utilizes-fusing-dynamics-equation-with-llm-based-agents|Social opinions prediction utilizes fusing dynamics equation with LLM-based agents]] combines explicit update rules and LLM agents for observed Weibo trajectories; the present paper instead fits classical influence models to controlled fictional dialogs.

[[index|Library home]]
