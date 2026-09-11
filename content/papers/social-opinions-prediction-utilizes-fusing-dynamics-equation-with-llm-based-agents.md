---
title: Social opinions prediction utilizes fusing dynamics equation with LLM-based agents
type: paper
authors:
  - Junchi Yao
  - Hongjie Zhang
  - Jie Ou
  - Dingyi Zuo
  - Zheng Yang
  - Zhicheng Dong
year: 2025
tags:
  - llm-agents
  - agent-based-models
  - opinion-dynamics
  - social-media
---

## TL;DR

FDE-LLM combines LLM opinion leaders constrained by cellular automata (CA) with rule-based followers whose attitudes undergo probabilistic decay toward neutrality. Across four Weibo events, it improves both dynamic time warping (DTW) distance and Pearson correlation over the LLM-only and LLM+CA baselines. It is not uniformly best across all baselines: CA has lower DTW on Qingdao, and ABM(RLE) has higher correlation on Jiangping. The evidence concerns retrospective trajectory simulation with supplied news reversals, rather than demonstrated forecasting of unknown events.

## Research Question

Can explicit opinion-update equations constrain LLM agents sufficiently to reproduce both abrupt attitude reversals and subsequent attenuation toward neutrality in observed social-media discussions?

## Motivation

In the selected events, aggregate attitudes change sharply following new information and later weaken. The authors argue that traditional [[Opinion Dynamics|opinion-dynamics models]] struggle with abrupt semantic changes, while unconstrained LLM agents sustain extreme attitudes. Their [[Hybrid LLM Agent-Based Simulation|hybrid design]] assigns these two behaviors to different mechanisms: language models respond to news, and dynamical rules regulate influence and decay.

## Contributions

- Divides users into LLM-driven opinion leaders and equation-driven followers, with CA constraints on both populations.
- Introduces a probabilistic attitude-decay rule inspired by recovery in the susceptible-infectious-recovered (SIR) model.
- Compares simulated and observed aggregate attitudes on four Weibo events, including an ablation of the leaders' CA constraint.

## Method

**Roles and information flow.** Leaders receive event news, generate posts or comments through LLM-Action, and have those actions classified as support, neutrality, or opposition by LLM-Attitude. Both modules use GLM4; the introduction also calls the model ChatGLM, without identifying a precise checkpoint. Leader profiles emphasize active, provocative participation. Leaders interact with sufficiently similar leaders and are not influenced by followers. Followers respond to leaders and other followers. The nominal leader-to-follower ratio is 1:9, although the reported counts are approximate matches.

**Leader updates.** CA retains a fraction of the current attitude and adds local influence, excluding neighbors beyond an opinion-distance threshold. Equation 3 fuses this update with the discrete LLM attitude:

$$
O_i^{t+1}=\operatorname{clip}\left[\alpha\left(rO_i^t+w\sum_{j\in N_i}T_{ij}^t\right)+(1-\alpha)L_i^t,-1,1\right].
$$

Here, $L_i^t\in\{-1,0,1\}$, $r$ is retention, $w$ is neighbor influence, and $\alpha$ weights the CA component. For $0<r<1$, influence is $(O_j^t-O_i^t)\sqrt{r|O_j^t|}$ when the attitude difference is within $\epsilon$, and zero otherwise. The fused continuous attitude conditions the leader's next generated action.

**Follower updates.** Algorithm 2 first computes a CA update with neighbor influence averaged by neighborhood size. With probability $\gamma$, it multiplies the provisional attitude $u_i$ by $e^{-\lambda|u_i|}$, then clips the result to $[-1,1]$. This borrows the recovery intuition from [[Misinformation Spreading Models|contagion models]] without specifying a full susceptible-infectious-recovered compartment system. Equation 4 is inconsistent with this conditional rule: its multiplicative indicator would zero the entire update when recovery is not selected, and its exponent refers to the updated opinion itself. This description follows Algorithm 2; the supplied text does not resolve the discrepancy.

**Timing and calibration.** Each round represents one hour. Initial news and subsequent reversal news are supplied at historically observed times. Follower attitudes provide the aggregate evaluation series. The authors report correlation-maximizing grid search using ABM and shared settings across events: $r=0.99$, $w=0.3$, $\epsilon=0.5$, $\gamma=0.9$, and $\lambda=0.5$. They also list an infection rate $\beta=0.3$, which does not appear in the displayed follower-update algorithm; the experimental settings do not give a numerical fusion weight $\alpha$.

## Experiments

The study collects 255,176 Weibo posts across four 2024 events and uses few-shot LLM attitude scoring to construct daily observed trajectories. The experimental setup reports GLM4, Python 3.10.12, an Intel Xeon Platinum 8160 CPU, and a T4 GPU.

| Event | Collected posts | Leaders | Followers |
| --- | ---: | ---: | ---: |
| Pangmao | 133,834 | 1,000 | 8,890 |
| Jiangping | 98,471 | 200 | 1,872 |
| Qingdao | 6,331 | 20 | 186 |
| Dianduji | 16,540 | 40 | 386 |

Table 2 reports the following comparisons. Each cell gives **DTW / Pearson correlation**; lower DTW and higher correlation are preferred.

| Method | Pangmao | Jiangping | Qingdao | Dianduji |
| --- | --- | --- | --- | --- |
| FDE-LLM | 0.3622 / 0.9653 | 0.3664 / 0.8950 | 0.3352 / 0.9605 | 0.3404 / 0.8842 |
| LLM | 2.6584 / 0.7139 | 2.9963 / 0.7208 | 2.7316 / 0.7511 | 2.3170 / 0.7819 |
| ABM(CA) | 0.4335 / 0.8920 | 0.7648 / 0.6748 | 0.2904 / 0.6800 | 0.6806 / 0.8282 |
| ABM(HK) | 1.1838 / 0.6475 | 0.6085 / 0.6961 | 1.1470 / 0.6874 | 0.9453 / 0.6760 |
| ABM(PM) | 2.5653 / 0.1591 | 2.7977 / 0.3866 | 2.6302 / 0.0375 | 2.9916 / 0.2489 |
| ABM(RLE) | 0.9592 / 0.9489 | 1.3978 / 0.9321 | 1.8712 / 0.9358 | 0.9180 / 0.8304 |
| LLM+ABM(CA) | 0.7463 / 0.5225 | 1.5748 / 0.6425 | 0.5497 / 0.9174 | 0.8684 / 0.7386 |

FDE-LLM attains the best DTW on three events and the best correlation on three events. In particular, Table 2 contradicts the prose claim of the highest Jiangping correlation: ABM(RLE) reaches 0.9321 versus FDE-LLM's 0.8950. Qingdao CA also has better DTW, 0.2904 versus 0.3352, despite much lower correlation.

**Ablation (Table 3).** Removing the leaders' CA constraint worsens both metrics on every event. Without CA, DTW/correlation is 0.5133/0.9489 for Pangmao, 0.7530/0.8671 for Jiangping, 0.7389/0.8952 for Qingdao, and 0.5708/0.7367 for Dianduji. The illustrated Jiangping trajectory overreacts more strongly without the constraint. A small qualitative example shows generated reactions before and after supplied reversal news; it is not a separate quantitative validation of individual behavior.

## Limitations

- **Prediction scope:** Events are selected for reversal and eventual neutrality, and reversal information and timing are supplied from the historical record. No explicit held-out calibration/test split or prospective forecasting evaluation is reported.
- **Measurement dependence:** LLM-generated attitude labels underpin the observed curves, and the action and attitude modules share a model. No independent human-label validation is reported, so agreement may partly reflect shared measurement assumptions.
- **Population and mechanism assumptions:** Evidence is limited to four Weibo events. Provocative leader personas, local bounded-confidence interactions, absent follower-to-leader feedback, and imposed decay restrict the behaviors the simulator can express. Decay is a modeling assumption, not evidence that boredom causes the observed attenuation.
- **Uncertainty and attribution:** Tables provide point estimates without repeated-run uncertainty or significance tests. The ablation supports the leader CA constraint, but does not independently isolate the follower recovery mechanism. Reported improvements therefore do not establish statistically significant superiority over every baseline.
- **Reproducibility:** The follower equation and pseudocode disagree, the numerical fusion weight is missing, and the exact LLM checkpoint is unspecified. The data-availability statement says data are included in the article and supplements; those supplements were not part of the supplied Markdown.

## Related Concepts

- [[Hybrid LLM Agent-Based Simulation]]
- [[Opinion Dynamics]]
- [[Misinformation Spreading Models]]
- [[hegselmann-krause-model|Hegselmann-Krause Model]]

## Related Papers

- Chuang et al. (2024), "Simulating Opinion Dynamics with Networks of LLM-based Agents." Cited by the source for LLM opinion dynamics and discrete attitude representation (reference 24).
- Mou, Wei, and Huang (2024), "Unveiling the Truth and Facilitating Change: Towards Agent-based Large-scale Social Movement Simulation," arXiv:2402.16333. Cited for combining LLM core users with deductive agents and informing leader profiles (reference 22).
- [[Public opinion dissemination simulation based on large language model multi-agent systems]] is a later related paper in this library that cites FDE-LLM. It combines probabilistic action selection with generated text, whereas FDE-LLM directly constrains attitude trajectories.

[[index|Library home]]
