---
title: "Quantifying the Potential to Escape Filter Bubbles: A Behavior-Aware Measure via Contrastive Simulation"
type: paper
authors:
  - Difu Feng
  - Qianqian Xu
  - Zitai Wang
  - Cong Hua
  - Zhiyong Yang
  - Qingming Huang
year: null
tags:
  - recommender-systems
  - filter-bubbles
  - user-simulation
  - llm-agents
  - evaluation-metrics
---

## TL;DR

The paper proposes [[concepts/bubble-escape-potential|Bubble Escape Potential]] (BEP), a filter-bubble metric that compares recommendation diversity for matched LLM-simulated users instructed either to broaden their interests or to reinforce existing preferences. Across MovieLens-1M and Amazon-Books experiments, higher-accuracy recommenders generally have lower BEP, while modest random replacement of recommendations does not improve escape potential and can initially reduce it.

## Research Question

Can filter-bubble severity be measured in a way that separates a recommender system's confinement effect from diversity changes caused by users' own preferences and behavior?

## Motivation

Exposure diversity alone does not identify why recommendations become narrow. Low category coverage or entropy can reflect system-induced confinement, but it can also be the expected result of accurately modeling a user with concentrated tastes. Because recommendation is interactive, a diagnostic should account for how a system responds when otherwise matched users adopt different intentions toward exploration.

## Contributions

- Introduces BEP, a behavior-aware ratio that measures how strongly exploratory behavior can change the diversity of recommendations relative to preference-reinforcing behavior.
- Builds a contrastive simulation in which matched LLM agents share tastes and conformity profiles but differ in prompted attitude, activity, and diversity.
- Evaluates six recommendation approaches on MovieLens-1M and Amazon-Books and reports a negative relationship between predictive accuracy and BEP.
- Tests random replacement of recommendation-list items and finds a non-monotonic response: mild randomization can lower BEP, with recovery appearing only at high replacement rates.
- Uses BEP to compare users by activity, conformity, interest diversity, and genre preference.

## Method

The framework initializes recommendation models from observed interactions and then runs two otherwise matched multi-round simulations. Positive agents are prompted to consume some items outside their established tastes and are assigned high activity and diversity. Negative agents are prompted to rely heavily on ranked recommendations and their existing tastes and are assigned low activity and diversity. The recommender is retrained after each round with the newly generated interactions.

For user $u$ in round $t$, recommendation diversity is the number of distinct item categories in list $L_{u,t}$:

$$
D_{u,t}=\left|\{c(i)\mid i\in L_{u,t}\}\right|.
$$

With $D_{u,t}$ denoting diversity for positive users and $D'_{u,t}$ for their negative counterparts, round-level and overall BEP are

$$
\widehat{\mathrm{BEP}}_t(R)=
\frac{\sum_{u\in U}D_{u,t}}{\sum_{u\in U}D'_{u,t}},
\qquad
\widehat{\mathrm{BEP}}(R)=\frac{1}{T}\sum_{t=1}^{T}\widehat{\mathrm{BEP}}_t(R).
$$

Under the intended behavior contrast, BEP is expected to be at least 1. A value closer to 1 means that active exploration produces little additional exposure diversity and therefore indicates a more severe filter bubble. Because BEP is a ratio, it is unchanged when a diversification intervention raises both groups' diversity by the same proportion.

## Experiments

The evaluation uses MovieLens-1M and Amazon-Books. It compares random recommendation, BPR-MF, LightGCN, Caser, DiffRec, and TiCoSeRec using HR@k, NDCG@k, MAP, and BEP. The simulations start from 1,000 frequently interacting users, sample 200 of them for agent construction, run for eight rounds, and use Qwen2.5-14B-Instruct-1M as the user-agent model.

The reported checks find roughly 68% classification accuracy when comparing simulated and real user preferences. Simulated ratings have a similar distribution to real ratings, with reported $D_{KL}(P\|Q)\approx0.125$. Positive agents consistently receive more diverse recommendations than negative agents, and weakened positive/negative prompts preserve the ranking between the random recommender and TiCoSeRec.

Across both datasets, higher HR@20 and NDCG@20 tend to accompany lower BEP. Sequential models Caser and TiCoSeRec appear in the higher-accuracy, lower-BEP region, whereas non-sequential MF, DiffRec, and LightGCN occupy the lower-accuracy, higher-BEP region. The authors interpret this as an accuracy-bubble dilemma, while noting that sequential models' emphasis on recent behavior is only a possible explanation.

Randomly replacing 10% to 90% of LightGCN and TiCoSeRec recommendation lists produces a non-monotonic trajectory. BEP falls until approximately 30% replacement, returns near its original value around 70%, and exceeds it only at still higher randomization, by which point accuracy approaches that of random recommendation. In the group analysis, higher interest diversity corresponds to higher BEP, activity is associated with lower BEP, conformity has no clear relationship, and BEP varies substantially across genre preferences.

Code reported by the paper: https://github.com/fengdifu24/bepmetric

## Limitations

- BEP depends on LLM-generated behavior. The reported alignment checks support similarity on selected outcomes but do not establish that prompted positive and negative agents reproduce how real users try to leave or remain within filter bubbles.
- Positive and negative conditions change activity and diversity traits as well as the behavioral prompt, so the contrast does not isolate a single behavioral mechanism.
- Category-count diversity ignores within-category variation, category granularity, item quality, and whether exposure changes users' beliefs or welfare.
- The empirical evidence covers two datasets, 200 simulated users, eight interaction rounds, and six recommendation approaches; broader platforms and longer feedback loops may behave differently.
- The observed association between accuracy and BEP is not a causal estimate of an unavoidable trade-off. Model families differ in architecture and training, and the paper offers only a tentative explanation for the sequential/non-sequential split.
- Uniform proportional diversification leaves the BEP ratio unchanged. This robustness also means BEP alone cannot recognize interventions that improve both behavioral groups equally.
- The supplied manuscript does not state a publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/bubble-escape-potential|Bubble Escape Potential]] is the paper's behavior-aware diagnostic for system-induced recommendation confinement.
- [[concepts/behavioral-foundation-models|Behavioral Foundation Models]] provides a broader connection to models intended to represent and simulate behavior, although the paper uses prompted LLM agents rather than a dedicated behavioral foundation model.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]] is related to the use of language-model agents within an iterative simulated environment, though this paper's simulator is centered on recommender feedback.
- [[concepts/social-media-news-exposure|Social Media News Exposure]] connects exposure measurement to downstream questions about the information users encounter.

## Related Papers

Works cited in the source, without matching Paper pages found in this library:

- Piao et al. (2023), "Human-AI Adaptive Dynamics Drives the Emergence of Information Cocoons": models information-cocoon formation with adaptive dynamics.
- Anwar, Schoenebeck, and Dhillon (2024), "Filter Bubble or Homogenization? Disentangling the Long-Term Effects of Recommendations on User Consumption Patterns": distinguishes filter bubbles from inter-user homogeneity.
- Zhang et al. (2024), "On Generative Agents in Recommendation": supplies the Agent4Rec user-simulation setting adapted by this paper.
- Gao et al. (2023), "CIRS: Bursting Filter Bubbles by Counterfactual Interactive Recommender System": addresses filter-bubble mitigation through counterfactual interactive recommendation.
- Sukiennik, Gao, and Li (2024), "Uncovering the Deep Filter Bubble: Narrow Exposure in Short-Video Recommendation": studies narrow exposure using static platform data.

Additional library connection, not a citation attributed to this paper:

- [[papers/alexandria-a-library-of-pluralistic-values-for-realtime-re-ranking-of-social-media-feeds|Alexandria: A Library of Pluralistic Values for Realtime Re-Ranking of Social Media Feeds]] studies value-aware re-ranking of feeds, complementing this paper's focus on diagnosing whether exploratory behavior changes exposure.

[[index|Library home]]
