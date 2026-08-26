---
title: "Benchmarking LLMs for Political Science: A United Nations Perspective"
type: paper
authors:
  - Yueqing Liang
  - Liangwei Yang
  - Chen Wang
  - Congying Xia
  - Rui Meng
  - Xiongxiao Xu
  - Haoran Wang
  - Ali Payani
  - Kai Shu
year: 2025
arxiv: "2502.14122"
repository: "https://github.com/yueqingliang1/UNBench"
tags:
  - llm-evaluation
  - political-science
  - united-nations
  - geopolitical-reasoning
  - benchmark-datasets
---

## TL;DR

UNBench evaluates language models on four linked tasks drawn from United Nations Security Council decision-making: selecting a co-penholder, simulating a representative's vote, predicting draft adoption, and generating a representative's statement. The benchmark connects draft resolutions, votes, and meeting records from 1994-2024. GPT-4o leads the three classification-oriented tasks on the paper's primary balanced-accuracy or choice-accuracy measures, while DeepSeek-V3 and Qwen2.5-7B lead the reported generation metrics. Results also expose severe class imbalance, modest class-balanced adoption prediction, and weak reproduction of exact diplomatic language.

## Research Question

How well can current language models understand and simulate interconnected political decisions across the drafting, voting, and discussion stages of the UN Security Council resolution process?

## Motivation

Political decision-making requires more than static text classification. Models must connect policy content with coalition patterns, national interests, veto power, voting outcomes, and diplomatic rhetoric. Existing political datasets generally isolate one of these elements, while general-purpose language benchmarks do not reproduce a multistage institutional process. UNBench therefore treats a resolution's lifecycle as a linked evaluation setting rather than a collection of unrelated political-text tasks.

## Contributions

- Curates UNSC draft resolutions, voting records, and meeting transcripts from 1994-2024 and aligns them through resolution and meeting identifiers.
- Defines four tasks spanning drafting, voting, and post-vote discussion: co-penholder judgment, representative voting simulation, draft adoption prediction, and representative statement generation.
- Compares traditional encoders and instruction-tuned LLMs under a chronological evaluation protocol using choice accuracy, class-balanced prediction metrics, lexical overlap, and semantic similarity.
- Reports task-specific strengths and failures, including the advantage of larger LLMs on geopolitical multiple-choice reasoning and persistent difficulty with imbalanced outcomes and diplomatic statement generation.

## Method

The dataset is assembled from public UNSC records. The authors retrieve draft resolutions, associate voting records through resolution identifiers, and connect meeting transcripts through meeting-record identifiers. They cross-reference incomplete entries, normalize country names, and label drafts as adopted or not adopted. The resulting records preserve sponsors, dates, issue categories, voting breakdowns, and discussion statements.

UNBench turns these records into four evaluations:

1. **Co-penholder judgment:** Given an anonymized draft, an author country, and two to five candidate countries, select the single actual co-penholder. The task contains 1,300 drafts and 355,126 candidate instances.
2. **Representative voting simulation:** Given a draft and a country role, predict `In Favour`, `Against`, or `Abstention`. It contains 17,430 votes from 1,162 drafts.
3. **Draft adoption prediction:** Predict `ADOPTED` or `NOTADOPTED` from a draft. It contains 1,978 drafts, of which 1,880 were adopted and 98 were not adopted.
4. **Representative statement generation:** Given the draft, outcome, country votes, and earlier statements when available, generate a country's discussion statement. It contains 7,394 statements from 1,752 meetings involving 204 countries.

The classification-oriented tasks compare BERT and DeBERTa with Llama, Mistral, Qwen, DeepSeek, and GPT-4o variants. The paper uses time-based train/test splits intended to place evaluation examples later chronologically. Task 1 uses accuracy; Tasks 2 and 3 use metrics including balanced accuracy, F1, and precision-recall AUC; Task 4 uses ROUGE and Sentence-BERT cosine similarity. Generation runs use temperature 0.0.

## Experiments

On co-penholder judgment, GPT-4o obtains 0.726 accuracy with two candidates and 0.464 with five, followed by DeepSeek-V3 at 0.695 and 0.422. Every model declines as the candidate set grows. BERT and DeBERTa remain near 0.01, indicating that the fine-tuned encoders in this setup do not recover the geopolitical relationships needed for the task.

For representative voting simulation, GPT-4o leads with 0.823 balanced accuracy and 0.696 PR AUC. DeepSeek-V3 follows at 0.724 and 0.655. The label distribution is highly skewed: 17,020 of 17,430 votes are `In Favour`, compared with 391 abstentions and 16 votes against, making aggregate predictive success especially sensitive to performance on rare positions.

For adoption prediction, GPT-4o has the highest balanced accuracy at 0.677, while Llama-3.2-3B has the highest reported macro-F1 at 0.402. The disagreement between metrics reflects the difficulty of the 1,880-to-98 class distribution and shows that no model is uniformly best at identifying both adopted and rejected drafts.

For statement generation, DeepSeek-V3 has the highest ROUGE score at 0.207. DeepSeek-V3 and Qwen2.5-7B tie on cosine similarity at 0.623. Even the leading ROUGE result is low, supporting the paper's conclusion that models capture some semantic content while struggling to reproduce the precise terminology and protocol of country-specific diplomatic statements.

## Limitations

UNBench is limited to UNSC records and therefore does not establish performance across other political institutions or forms of political decision-making. Its historical records are observational: models may exploit recurring country, topic, or era patterns without learning a general mechanism of diplomacy. The paper reports a chronological split, but historical shifts in Council membership and international alignments can still make performance dependent on the chosen time boundary.

The two voting tasks are strongly imbalanced. Task 2 contains only 16 `Against` votes, and Task 3 contains only 98 rejected drafts, so estimates for the politically consequential rare cases rest on small samples. The main paper presents a limited set of aggregate metrics, with finer temporal, regional, and metadata analyses deferred to the extended version.

Statement generation is evaluated through ROUGE and Sentence-BERT similarity to one recorded statement. These metrics cannot fully assess factual grounding, diplomatic appropriateness, policy consistency, or whether a different but valid statement would be acceptable. More broadly, successful simulation of a recorded vote or speech should not be interpreted as a reliable forecast of future state behavior or as a substitute for political judgment.

## Related Concepts

- [[LLM-Based Strategic Experimentation]]
- Geopolitical reasoning
- Political behavior simulation
- Temporal benchmark evaluation
- Diplomatic language generation
- Class-imbalanced evaluation

## Related Papers

- [[Polistemics: Evaluating LLMs as Information Mediators in Politics & Elections]]
- Santurkar et al. (2023), "Whose Opinions Do Language Models Reflect?"
- Bailey, Strezhnev, and Voeten (2017), "Estimating Dynamic State Preferences from United Nations Voting Data."
- Kohlenberg et al. (2019), "Introducing UNSCdeb8 (beta): A Database for Corpus-Driven Research on the United Nations Security Council."
- Hendrycks et al. (2021), "Measuring Massive Multitask Language Understanding."

[[index|Library home]]
