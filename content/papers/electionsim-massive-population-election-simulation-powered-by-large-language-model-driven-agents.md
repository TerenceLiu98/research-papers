---
title: "ElectionSim: Massive Population Election Simulation Powered by Large Language Model Driven Agents"
type: paper
authors:
  - Xinnong Zhang
  - Jiayu Lin
  - Libo Sun
  - Weihong Qi
  - Yihang Yang
  - Yue Chen
  - Hanjia Lyu
  - Xinyi Mou
  - Siming Chen
  - Jiebo Luo
  - Xuanjing Huang
  - Shiping Tang
  - Zhongyu Wei
year: null
source_job_id: "6a3744e5-5aae-4d7d-a82a-4418a2966c36"
tags:
  - llm-agents
  - election-simulation
  - agent-based-models
  - computational-social-science
  - political-science
  - social-media
---

## TL;DR

ElectionSim is a large-scale election simulation framework that combines a million-level social-media voter pool, LLM-based demographic annotation, state-level demographic calibration, and LLM voter agents. It introduces the Poll-based Presidential Election (PPE) benchmark, which reduces the 2020 ANES questionnaire to 49 questions across 24 topics. In the reported 2020 experiments, Qwen2.5-72b with user experience alignment predicts 47 of 51 state winners and 12 of 15 battleground-state winners at a 1/1,000 population sample; the same framework reaches 80.26 micro-F1 on the voting-related voter-level subset with GPT-4o-mini. The results demonstrate predictive fit for this setup, while source selection, inferred demographics, model bias, and partial IPF convergence limit broader population claims.

## Research Question

How can LLM-driven agents simulate voters at massive population scale while preserving individual-level behavioral information, matching real-world demographic distributions, and supporting systematic evaluation of aggregate election outcomes?

## Motivation

Traditional agent-based modeling can aggregate individual rules into election outcomes but has difficulty incorporating rich personal histories and exposing simulated individuals through interactive interfaces. LLM agents offer flexible role-conditioned responses, yet a useful election simulator still needs a large and diverse population, a way to align that population with real demographic distributions, and evaluation beyond a single aggregate accuracy measure.

## Contributions

- ElectionSim: a framework for collecting user histories, annotating demographic and political attributes, sampling target populations, and querying LLM voter agents.
- A processed voter pool containing 1,006,517 users and 30,195,510 sampled tweets, built from 171,210,066 tweets collected between January 1 and December 29, 2020.
- An LLM-assisted demographic annotation pipeline with five Longformer classifiers trained from API labels and manually verified examples.
- A state-level sampling strategy that applies [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]] to gender, race, age, ideology, and partisanship marginals.
- PPE, a 49-question, 24-topic benchmark derived from the 2020 ANES questionnaire, plus an interactive visualization and dialogue interface for inspecting simulated voters.

## Method

### Voter Pool

The authors collect Twitter posts from 9,596,198 users and aggregate them to the user level. They retain English-language users with more than 30 posts, sample 30 historical posts per retained user, and remove users whose five-post sample has a mean pairwise Jaccard repeatability score above 0.28. The processed pool contains 1,006,517 users and 30,195,510 tweets, with an average of 22.36 words per tweet.

The demographic taxonomy covers age group, gender, race, party affiliation, and ideology. Three commercial APIs label 200 users for a test set that five professional annotators verify. The majority-vote labels from the APIs are then used to label 10,000 users for classifier training. Five Longformer classifiers are fine-tuned for three epochs with AdamW, learning rate $5 \times 10^{-5}$, batch size 16, and eight RTX 4090 GPUs.

### Distribution Sampling

The framework combines U.S. Census voter distributions for gender, age, and race with 2020 ANES distributions for ideology and partisanship. It applies IPF separately within each state to estimate a joint distribution from the available marginals. The reported estimated marginals are within 5% of the target for 888 of 918 marginals, although the algorithm does not converge in most cases.

### PPE Benchmark and Baselines

PPE uses the 2020 ANES Time Series Study as its source. The authors remove multiple-answer, fill-in-the-blank, and conditional questions; merge refusal and uncertainty responses into `DK/RF`; and reduce intensity scales to basic positions, generally using three options. The resulting benchmark has 49 questions across 24 topics and 8,280 pre-election respondents.

The three prompt-based baselines are random user profiles, profiles sampled to match state demographic distributions, and demographically matched profiles augmented with temporally filtered historical social-media posts. The last condition excludes posts from November 2020 onward for the 2020 simulation to reduce knowledge leakage.

### Evaluation

Voter-level evaluation samples 1,000 ANES respondents and predicts their answers from demographic tags. It reports average Micro-F1 and Macro-F1, with a six-question voting-related subset. State-level evaluation samples each state at 1/10,000 of its 2020 Census population, simulates individual responses, and aggregates them. The authors report Consistency of Election Result (CER) and Consistency of Vote Share (CVS), where CVS is the mean state-level RMSE between simulated and actual two-party vote shares.

## Experiments

### Voter-Level Results

On the full questionnaire, GPT-4o achieves the highest Micro-F1 among the tested models at 76.16, while Llama3-70b-Instruct has the highest Macro-F1 at 59.96. On the voting-related subset, GPT-4o reaches 81.20 Micro-F1 and 61.03 Macro-F1. GPT-4o-mini reaches 80.26 and 74.72 on the same two metrics. The lower Macro-F1 for many models indicates weaker performance on minority answer categories. Open-source 70b models are broadly comparable to commercial models, while Qwen2-7b performs worse.

### State-Level Results

With Qwen2.5-72b and user experience alignment, the reported CER is 0.902 overall and 0.733 on battleground states, with CVS of 0.071 and 0.045. Extending the sample to roughly 300,000 agents produces CER 0.922 overall and 0.800 on battleground states, with CVS 0.070 and 0.042; the authors describe this as correctly predicting 47 of 51 states and 12 of 15 battleground states. Demographic matching improves substantially over random sampling. GPT-4o-mini predicts all battleground-state winners under the demographic-distribution and user-experience baselines, although overall metrics are not reported for that model in the table.

### Analysis and 2024 Appendix

Direct answers with dictionary-form personal information generally outperform reasoning prompts. Biography generation offers limited gains and can introduce hallucinated profile details. Removing ideology reduces overall performance more, while removing party affiliation has a larger effect on voting-related questions. Simulated answer distributions are more concentrated than ANES distributions by the reported HHI analysis, and the six-state case study shows consistent overestimation of the Biden-Harris vote share despite correct winner calls.

The appendix gives a 2024 simulation using 2020 ANES and 2022 Census distributions because 2024 data were not yet available to the authors. It predicts Harris to win 8 of 15 listed battleground states. The paper explicitly presents these results as academic discussion rather than a definitive forecast.

## Limitations

- The voter pool is drawn from Twitter, filtered to English posts, and designed around users with at least 30 posts. It therefore does not establish representation of the U.S. voting population, and English-language users may live outside the United States.
- Demographic and political attributes are inferred from posts. The test set is small, API-generated labels are used for training, and manual annotator agreement averages 67.23% in the reported consistency figure.
- IPF fails to converge in most state-level runs, even though 888 of 918 reported marginals are within 5% of their targets. The resulting joint distributions should not be treated as exact population distributions.
- Voter-level evaluation uses 1,000 respondents, excludes refusal responses, and conditions on demographic tags that may be unavailable or noisy in deployment. Macro-F1 remains much lower than Micro-F1 for several models.
- State-level performance is tied to the 2020 election, the selected models and prompts, the sampling rates, and the use of ANES and Census distributions. The demographic baseline can also expose the model to information that creates knowledge leakage; the authors identify this as a possible explanation for some differences between baselines.
- Aggregate election fit does not validate individual psychological processes. Higher simulated concentration than ANES and the Biden-Harris overestimation in the case study indicate residual model bias even when winner calls are correct.
- The 2024 appendix uses older distributions and is not a prospective evaluation. No paper publication year, venue, DOI, or other bibliographic identifier is supplied in the parsed source.

## Related Concepts

- [[concepts/massive-population-election-simulation|Massive Population Election Simulation]]: the broader simulation paradigm that ElectionSim instantiates.
- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: separates structured sampling and constraints from LLM-based agent responses.
- [[concepts/iterative-proportional-fitting|Iterative Proportional Fitting]]: the marginal-fitting method used to construct state-level joint distributions.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: limits inference from predictive or aggregate alignment to claims about real human populations.
- [[concepts/compartmental-election-forecasting|Compartmental Election Forecasting]]: a statistical alternative that forecasts aggregate vote shares from poll-based transitions rather than simulated voter profiles.

## Related Papers

- Gao et al. (2022), "Forecasting elections with agent-based modeling: Two live experiments," cited as a prior election-simulation approach.
- Hoey et al. (2018), "Artificial intelligence and social simulation: Studying group dynamics on a massive scale," cited as motivation for large-scale social simulation.
- Muric et al. (2022), "Large-scale agent-based simulations of online social networks," cited as related large-population simulation work.
- [[papers/public-opinion-dissemination-simulation-based-on-large-language-model-multi-agent-systems|Public opinion dissemination simulation based on large language model multi-agent systems]]: a smaller hybrid LLM social simulation with explicit probabilistic behavior and LLM-generated interactions.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]]: a related validity framework for matching claims to demonstrated behavioral heterogeneity.

[[index|Library home]]
