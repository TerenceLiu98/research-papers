---
title: "RE-SEARCH: Dissecting LLM Ideation Through a Two-Player Questioning Game"
type: paper
authors:
  - Muhan Gao
  - Hangxiao Zhu
  - Xinqi Su
  - Yu Zhang
  - Daniel Khashabi
  - Kuan-Hao Huang
year: null
source_job_id: fb18f5fb-27af-42ef-8712-96f3cd094e6b
tags:
  - research-ideation
  - information-seeking
  - llm-evaluation
---

## TL;DR

Given the problem from a published paper and 100 chances to question a reader of that paper, most models made their largest gains in recovering the method within 30 questions. The choice of questions mattered. After 30 rounds, GPT-OSS-120B scored 4.16 out of 10 playing alone and 5.20 when it could choose a question proposed by any of four models. Choosing randomly from that same pool scored 4.43.

## Research Question

When a model stops making progress toward a hidden research idea, can it recognize a productive question or a plausible solution that it has struggled to propose?

## Motivation

A one-shot proposal reveals little about how a model uses feedback. An end-to-end research task makes a promising idea hard to distinguish from a poor one if both implementations fail. Recovering a known method gives the evaluator a fixed reference against which to score successive guesses.

## Contributions

The authors introduce a questioning game with 200 hidden methods, vary who proposes and selects each question, and reconstruct the lines of inquiry in each game. These comparisons let them distinguish two behaviors that produce similar final scores: repeatedly refining one guess and abandoning promising guesses too readily.

## Method

Each target comes from a method paper accepted at ICML 2026. An inquisitor sees a description of the problem. A separate model, Gemma-4-31B, reads the paper and answers each question independently with YES, NO, or UNKNOWN. The inquisitor writes an idea card before questioning and after every ten answers. Three judges compare each card with the extracted solution on a 1–10 scale. The inquisitor never sees those scores.

The authors ran three games per paper for each of six inquisitors. Human annotators checked 100 extracted problem–solution pairs and accepted 93 by majority vote. On 498 pairwise card comparisons, the judging panel agreed with the human majority in 91.2% of cases, including ties.

## Experiments

- **Early progress.** The first ten answers added 1.3–3.2 recovery points across models. Three models gained little after question 30, while GPT-5.4 continued to improve. In a four-model experiment, the authors replayed the remaining 70 questions from strong and weak openings on the same paper. The stronger opening retained its lead on 73–79% of papers, depending on the model.
- **Question supply.** GPT-OSS-120B scored 4.57 when it chose among four of its own proposals, below its 5.20 with four different proposers. Holding the multi-model pool fixed and varying the selector gave a narrow range of 5.19–5.34. Both comparisons implicate the supply of informative candidates.
- **Hypothesis supply.** During questioning, models saw a survey of possible approaches. Replacing one plausible decoy with the actual core idea raised final recovery by up to 1.25 points. Models asked about the named idea in 67–89% of games, compared with 29–52% for the decoy in the same position. The survey was withheld when writing idea cards.
- **Search breadth.** In 1,200 reconstructed question trees, DeepSeek-V4-Flash and Qwen averaged 5.2–5.5 top-level branches and often pursued variants within one direction. GPT-OSS-120B averaged 13.7 and frequently switched even after confirmation. After accounting for model and paper, a fitted curve peaked near eight branches. This association leaves open whether imposing a branch budget would help.

## Limitations

Recovery rewards agreement with one published solution. An original, workable alternative can therefore score poorly. The targets come from a single machine-learning conference, and the study does not test whether candidate sharing improves execution or discovery in open-ended research. LLMs extracted the targets, judged the cards, and inferred the trees. Human checks support the extraction and scoring procedures, but ambiguous methods and ties remain sources of error.

## Related Concepts

- [[concepts/adaptive-questioning|Adaptive Questioning]] describes how each answer can change which line of inquiry the model pursues next.
- [[concepts/llm-as-a-judge|LLM-as-a-Judge]] supplies the reference-based scores used to trace recovery through a game.

## Related Papers

- Wen, Ma, and Liang (2026), *Priced Guidance*, also studies rediscovery of a hidden research idea. It prices a guide's answer using the model's reported probability, whereas RE-SEARCH measures how closely successive idea cards match the target.
- [[papers/recursive-self-improvement-of-ai-research-agents|Recursive self-improvement of AI research agents]] examines how research agents allocate search across executable proposals using performance feedback. RE-SEARCH isolates the earlier decision of which hypotheses to investigate.
