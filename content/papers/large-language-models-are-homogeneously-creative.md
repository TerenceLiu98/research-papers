---
title: Large language models are homogeneously creative
type: paper
authors:
  - Emily Wenger
  - Yoed N. Kenett
year: 2026
doi: 10.1093/pnasnexus/pgag042
arxiv: "2501.19361"
source_job_id: a86eb07b-ef43-48fc-83f3-11507dbc99ce
tags:
  - large-language-models
  - creativity
  - output-diversity
---

## TL;DR

Across three verbal creativity tasks, tested LLMs produce substantially less diverse responses as a population than humans, despite competitive individual originality scores. More creative prompts improve diversity without closing the human–model gap; very high sampling temperature increases diversity partly through unusable outputs.

## Research Question

Does creative-output homogeneity persist across different LLM families, rather than merely reflecting repeated use of one model?

## Motivation

An individually unusual answer can still be shared by many models. Evaluating creativity support therefore requires distinguishing individual originality from [[concepts/creative-output-homogeneity|Creative Output Homogeneity]] across a population.

## Contributions

- Compares human and cross-model response variability on alternative uses (AUT), forward flow (FF), and divergent association (DAT) tasks.
- Separates individual semantic originality from diversity between respondents.
- Examines lexical overlap, response structure, model family, temperature, and system-prompt interventions.

## Method

The study retains 102 of 114 Prolific participants after screening and collects responses from 22 publicly hosted LLMs. Crucially, statistical comparisons use seven models, one per family: Jamba, Gemini, Command R Plus, Llama, Mistral, GPT, and Phi. Baseline temperature and top-p are both 1.0. Each starting stimulus is presented separately.

AUT asks for alternative uses of five objects; FF asks for associative chains of up to 20 words from five starting words; DAT requests ten unrelated nouns. Individual originality uses GloVe 840B embeddings. Population variability uses all-MiniLM-L6-v2 embeddings of each respondent's concatenated response to a stimulus, after punctuation and stopword removal. Cosine distances between successive population members measure variability; higher distances indicate less similar responses. The paper compares means with Welch's t-tests at a 0.01 threshold and uses historical human datasets as a secondary check.

## Experiments

Reported population variability (Table 2):

| Task | LLM mean | Human mean | Reported effect size | Reported p-value |
| --- | --- | --- | --- | --- |
| AUT | 0.459 | 0.699 | 1.8 | 3.5e-30 |
| FF | 0.518 | 0.642 | 0.87 | 1.8e-7 |
| DAT | 0.632 | 0.791 | 1.1 | 0.005 |

Individual originality instead favors LLMs on AUT (0.711 versus 0.696) and DAT (0.801 versus 0.753), while humans lead on FF (0.637 versus 0.603; Table 1). Lexical overlap is greater among LLM outputs. The authors report that supplementary response-structure controls preserve the variability gap.

The Llama-family comparison yields lower mean variability than the cross-family group (0.429 versus 0.491), but the difference is not statistically significant (p = 0.199; Table 3). Increasing temperature from 0.5 to 2.0 raises AUT variability from 0.418 to 0.672 against a human baseline of 0.699. At 2.0, many outputs are gibberish and non-English or repeated outputs are removed, so the apparent convergence is not a demonstrated quality-preserving remedy. Creative system prompts raise variability from 0.459 to 0.551 at most, still below humans (Table 5).

## Limitations

Evidence concerns three verbal tasks and semantic-distance proxies, not all creativity, usefulness, fluency, flexibility, or elaboration. Hosted, aligned models do not establish behavior of unaligned models. Human use of AI cannot be fully excluded despite screening and historical comparisons. Representational convergence is a proposed explanation, not a mechanism tested here; downstream homogenization of human–AI collaboration is an implication rather than a directly measured treatment effect.

The supplied text states a greater-than alternative hypothesis for LLM variability even though the reported means and conclusions run in the opposite direction. The p-values above are reproduced as reported. Also, successive-pair distances can share a respondent, so the paper's claim that this construction ensures independence requires additional justification.

Source: [published article](https://doi.org/10.1093/pnasnexus/pgag042). The paper provides a [data and code repository](https://github.com/arguslab-duke/llms_are_homogeneous).

## Related Concepts

- [[concepts/creative-output-homogeneity|Creative Output Homogeneity]]: distinguishes population diversity from individual originality.

## Related Papers

- Doshi and Hauser (2024), “Generative AI enhances individual creativity but reduces the collective diversity of novel content,” is cited as evidence from human–AI story writing; this study tests cross-model variability directly.
- [[papers/when-llms-play-the-telephone-game|When LLMs Play the Telephone Game]] studies convergence under repeated transmission, a different process from independent responses to shared creative prompts.
