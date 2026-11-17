---
title: "Mapping (A)Ideology: A Taxonomy of European Parties Using Generative LLMs as Zero-Shot Learners"
type: paper
authors:
  - Riccardo Di Leo
  - Chen Zeng
  - Elias Dinas
  - Reda Tamtam
year: 2025
doi: "10.1017/pan.2025.7"
tags:
  - political-measurement
  - large-language-models
  - ideology
  - pairwise-comparisons
---

## TL;DR

GPT-3.5 judgments of which of two named European parties is more right-wing, aggregated with a Bradley–Terry model, closely track expert ideological placements across nine election-year samples from 1979–2019. Agreement is weaker with voters and conventional manifesto scores. The method captures reputational party positions, but does not improve measurement of ideological change over time.

## Research Question

Can zero-shot LLM comparisons provide affordable, timely party ideological positions with the convergent validity of expert surveys and broader historical coverage?

## Motivation

Expert surveys are costly and scarce before the 1990s, while manifesto-based measures offer broader coverage but contested validity. [[concepts/party-position-measurement|Party-Position Measurement]] based on pretrained model knowledge offers another source of perceived positions without new human annotations.

## Contributions

- Extends pairwise LLM ideological scaling to European parties across countries and nine European Parliament election years.
- Benchmarks positions against expert, manifesto, and voter measures rather than treating any one source as directly observed ideology.
- Examines prompting, sampling, alternative manifesto scales, and model choice, while identifying weak longitudinal validity.

## Method

Party names and validation scores come from the Manifesto Project (CMP), the Chapel Hill Expert Survey combined with Ray–Marks–Steenbergen data (CHES), and the True European Voter survey (TEV). Each reference-year sample retains parties evaluated in elections no more than four years before that European Parliament contest.

For each reference year, the authors form all party pairs, including cross-country pairs. GPT-3.5 receives original-language party names and countries and identifies the more right-wing party for the specified time, without labeled demonstrations or supplied policy texts. Each comparison is repeated seven times and its modal answer retained. [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]] converts these judgments into relative ideological scores, termed GPT-BTm.

## Experiments

Figure 1 compares GPT-BTm with CMP, CHES, and TEV by reference year. Agreement is strongest with experts: the text gives Pearson correlation 0.78 for CHES in 2009. Repeated-comparison congruence reaches 93.23%. Correlations are broadly stable over time, especially against CHES; this concerns cross-sectional levels, not accurate party shifts.

The main text reports the following supplementary findings; the supplied Markdown does not include the supplementary analyses themselves:

- Zero-shot prompting outperforms a four-shot alternative. Results are insensitive to task framing, pair ordering, temperature, random removal of pairs, and outliers.
- Agreement with CMP is weaker in Southern European and Slavic-speaking settings. An alternative valence-based regression scale from manifesto data correlates almost as highly with GPT-BTm as expert scores do, qualifying any blanket comparison against manifestos.
- Pooled-year and post-training-period exercises perform well, but prospective classification remains exploratory. GPT-3.5 does not improve on existing benchmarks for longitudinal ideological change.
- GPT-4o and Llama-3.1 70B outperform GPT-3.5; Qwen-2.5 32B is competitive, while some other open-source models perform poorly.
- Inspection of ten years of Common Crawl releases provides reassurance against direct benchmark contamination, without establishing complete knowledge of training exposure.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/SECNCZ). Code capsule: [Code Ocean](https://doi.org/10.24433/CO.5139195.v1).

## Limitations

The scores primarily reflect reputational ideology learned from human-produced discourse, which may share biases with expert and voter perceptions. Strong correlation does not establish policy accuracy or unbiased measurement. Sparse-information parties and contexts can invite confident hallucinations; model confidence alone is insufficient validation.

The method fails to resolve weak agreement in measures of ideological shifts. Historical level correlations should therefore not be used as evidence that changes are validly recovered. Future model releases may behave differently, and published evaluations may enter subsequent training corpora. The authors' reproducibility and affordability arguments do not establish guaranteed deterministic regeneration or universal transfer to new settings.

## Related Concepts

- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: aggregates binary ideological comparisons into a relative scale.
- [[concepts/party-position-measurement|Party-Position Measurement]]: distinguishes reputational, programmatic, and other sources of party locations.

## Related Papers

- Wu et al. (2023), “Large Language Models Can Be Used to Estimate the Latent Positions of Politicians”: cited methodological predecessor for pairwise scaling of named politicians.
- [[papers/scaling-political-texts-with-large-language-models-asking-a-chatbot-might-be-all-you-need|Scaling Political Texts with Large Language Models: Asking a Chatbot Might Be All You Need]]: related library manuscript by Le Mens and Gallego that directly scores supplied political texts, whereas this study queries named parties. The source cites their 2025 publication under the title “Positioning Political Texts with Large Language Models by Asking and Averaging.”
