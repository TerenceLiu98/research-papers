---
title: "Why is AI-generated language so hard to understand?"
type: paper
authors:
  - Thomas Hikaru Clark
  - Matias B. Martin
  - Kyle Mahowald
year: 2026
source_job_id: "b1ffe20f-1dc2-41a9-bc6d-aced03311a4d"
tags:
  - large-language-models
  - psycholinguistics
  - language-comprehension
  - information-density
  - reinforcement-learning
---

## TL;DR

Across chat, coding, and essay outputs, frontier and near-frontier language models use several constructions associated with human processing difficulty more often than semantically controlled round-trip paraphrases. Comparisons with human corpora also show systematic differences, especially for rare n-grams and inanimate subjects paired with animate-selecting verbs. A controlled reinforcement-learning experiment provides a mechanism-level proof of concept: penalizing output length shifts a model toward shorter syntactic alternatives, including some constructions absent from training. The study links these findings to [[concepts/information-density-pressure-in-language-generation|Information-Density Pressure in Language Generation]], but does not directly identify the post-training causes of the patterns observed in frontier models.

## Research Question

Do contemporary LLMs overproduce linguistic features that increase human comprehension difficulty, and can pressure to express correct answers in fewer tokens cause language generation to diverge from human syntactic preferences?

## Motivation

Human language reflects pressures for successful communication under limited, distance-sensitive memory and incremental processing. Modern LLMs can use long contexts and are post-trained for objectives such as mathematics, coding, and verifiable reasoning, where correctness may be rewarded without a corresponding reward for clarity. If these objectives favor dense representations, model outputs may remain grammatical while becoming harder for people to process.

## Contributions

- Builds a corpus spanning multi-turn chat, agentic coding, and persuasive essays from 14 frontier, near-frontier, and smaller open models.
- Measures seven difficulty-linked linguistic properties: unattested bigrams, trigram perplexity, standardized dependency length, object relative clauses with and without relativizers, stacked noun compounds, denominal verbs, and inanimate subjects used with animate-selecting verbs.
- Uses sentence-level English-Japanese-English round-trip translation to compare each model response with a meaning-preserving paraphrase whose wording is less tied to the source model's style.
- Reports model-family and training-stage variation, including stronger effects from Olmo Base through Instruct to Think and lower difficulty-linked measurements for Claude Opus 5.5 than Opus 5 in 19 of 21 comparisons.
- Demonstrates causally, in a controlled GRPO experiment, that a token-length penalty can induce preferences for shorter syntactic alternatives and generalize to some untrained constructions.

## Method

### Corpus Study

The authors collect outputs from 14 models. Twelve models participate in ten chat topics, nine frontier or near-frontier models work on five Python repositories in coding-agent sessions, and all 14 models write ten essays for each of seven PERSUADE 2.0 assignments. Human comparisons use approximately genre-matched samples from OpenSubtitles for chat, StackExchange for coding, and high-scoring PERSUADE student essays for essays, with Wikipedia as an additional reference.

The analysis identifies syntactic features using spaCy dependency parses. Candidate denominal verbs and inanimate subjects are additionally judged by an automated classifier. Dependency lengths are standardized to Wikipedia's sentence-length distribution. N-gram measurements use setting-specific trigram models, and inference uses bootstrap intervals plus paired jackknife tests that are not corrected for multiple comparisons.

To separate content from realization, each sentence is translated from English to Japanese and back with NLLB-200. Because every translation remains paired with its source, a lower feature rate after translation indicates that an alternative wording was available for approximately the same semantic content. Robustness checks repeat the procedure with a Russian pivot and TranslateGemma.

### Length-Penalty Intervention

Qwen2.5-1.5B-Instruct is fine-tuned with GRPO to render structured events as one correct English sentence. The reward combines rule-based semantic and format correctness with a per-token penalty $\lambda\in\{0,0.01,0.03,0.1\}$. Runs either omit KL regularization or use $\beta=0.04$, with three seeds for each setting.

Training examples contain dative, object-relative, complement-clause, and equal-length particle alternations. Evaluation covers new items from those alternations, two near-transfer constructions that optionally contain *that*, and four farther-transfer alternations. This design tests whether token pressure changes grammatical choice even though both variants remain task-correct.

## Experiments

### Linguistic Features in Model Output

Relative to round-trip translations, almost all frontier and near-frontier models produce more unattested bigrams and higher trigram perplexity across the three settings. Broadly similar patterns appear for denominal verbs, inanimate subjects, and object relative clauses without a relativizer; object relatives with a relativizer tend in the opposite direction. Stacked nouns and longer dependencies show comparable effects mainly in chat and coding. Essay effects are smaller, and essay dependency lengths do not follow the same general reduction after translation.

Compared with human writing, all nine frontier and near-frontier models use more rare n-grams and more inanimate subjects with animate-selecting verbs. Most also use longer dependencies, more stacked nouns, and more reduced object relatives in conversation. The Llama models and Olmo Base/Instruct change least under round-trip translation, whereas Olmo Think resembles frontier models. These comparisons support systematic differences but do not by themselves show that readers understand the sampled sentences less well.

### Length-Penalty Results

Increasing the length penalty raises the probability of shorter constructions. Without KL regularization, every seed with $\lambda>0$ converges to a categorical preference for the shorter trained alternative; the corresponding shift is more gradual with KL regularization. The preference transfers consistently to the two unseen optional-*that* constructions. Of four far-transfer alternations, only the genitive shifts with $\lambda$, and only without KL regularization; the passive and purpose-clause alternatives do not shift, while the quantifier alternative begins near ceiling.

These results show that output-length pressure can alter grammatical preferences while preserving task correctness. They do not establish that the same pressure produced the frontier-model patterns in the corpus study.

## Limitations

- The corpus covers English, a limited set of model families, ten chat topics, five coding repositories, and seven essay prompts.
- Difficulty is inferred from linguistic features associated with processing cost; the study does not directly measure reading time, comprehension accuracy, or reader judgments for the collected outputs.
- Round-trip translation changes style and lexical richness as well as the target constructions, so it is a semantic-control strategy rather than a perfect counterfactual rewrite.
- Several human baselines are only approximately genre matched, and denominal-verb and inanimate-subject human comparisons are unavailable for chat and coding.
- Paired significance tests are not adjusted for the number of comparisons.
- The causal intervention uses a 1.5B model and a synthetic sentence-realization task. Its transfer is strong for near constructions but limited among the four far-transfer alternatives.
- The proposed connection to verifiable-reward post-training is a hypothesis: frontier post-training processes are not observed or manipulated directly.
- The supplied Markdown provides no venue, DOI, or arXiv identifier, so none is added here.

## Related Concepts

- [[concepts/information-density-pressure-in-language-generation|Information-Density Pressure in Language Generation]]: pressure to encode a correct message in fewer tokens can favor compressed grammatical realizations over humanlike variation.
- Uniform information density: the contrasting psycholinguistic hypothesis that speakers distribute information to avoid locally overloading comprehenders.
- Dependency length minimization: a human-language tendency that limits memory demands by keeping syntactically related words close.
- Linguistic alternations: meaning-preserving grammatical choices that reveal whether generation preferences depend on context or token count.

## Related Papers

- Gibson et al. (2019), "How efficiency shapes human language": motivates the account of human language as adapted for communicative efficiency.
- Futrell, Mahowald, and Gibson (2015), "Large-scale evidence of dependency length minimization in 37 languages": supplies cross-linguistic evidence for memory-sensitive word order.
- Levy and Jaeger (2007), "Speakers optimize information density through syntactic reduction": develops the uniform-information-density account used to contrast human contextual choice with categorical compression.
- Reinhart et al. (2025), "Do LLMs write like humans? Variation in grammatical and rhetorical styles": documents dense, noun-heavy stylistic differences in LLM writing.
- Juzek and Ward (2025), "Why does ChatGPT 'delve' so much?": studies lexical overrepresentation and motivates the question of whether post-training produces characteristic language.
- Li and Xu (2026), "Uniform Information Density-Based Preference Optimization": proposes UID as an optimization target for more human-aligned model text.

[[index|Library home]]
