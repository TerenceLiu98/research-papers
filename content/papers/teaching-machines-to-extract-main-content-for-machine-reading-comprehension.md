---
title: Teaching Machines to Extract Main Content for Machine Reading Comprehension
type: paper
authors:
  - Zhaohui Li
  - Yue Feng
  - Jun Xu
  - Jiafeng Guo
  - Yanyan Lan
  - Xueqi Cheng
year: null
source_job_id: "6c3ec65c-2ab8-4a3f-8c39-4cbeacbaebad"
tags:
  - machine-reading-comprehension
  - sentence-selection
  - reinforcement-learning
---

## TL;DR

MC-MDP learns to select question-relevant sentences from multiple passages before an answer-span model reads them. It uses an attention-based encoder and a sequential sentence-selection policy trained with policy gradients. On MSMARCO, MC-MDP + BiDAF reaches 44.12 ROUGE-L, versus 31.52 for BiDAF alone and 37.56 for a question-overlap passage selector + BiDAF. The short report leaves important evaluation and training details unspecified.

## Research Question

Can a question-conditioned policy select useful sentences from redundant candidate passages and improve downstream answer extraction over reading all passages or selecting a passage by question overlap?

## Motivation

Passage relevance does not guarantee that the content is useful for locating an answer. Candidate passages can repeat information or contain irrelevant or incorrect material. [[concepts/question-conditioned-sentence-selection|Question-Conditioned Sentence Selection]] makes the reading context more selective, while conditioning each selection on previous choices offers a way to account for redundancy.

## Contributions

- Formulates main-content construction as a Markov decision process with sentence-selection actions.
- Combines question-aware representations with a history-dependent policy and jointly trains the encoder and selection policy.
- Evaluates the selected content with Match-LSTM and BiDAF answer-span models, and studies the candidate-window size.

## Method

An attention-based encoding stage, described using bidirectional attention and BiLSTMs, produces question-aware sentence representations. The selection state is $s_t=[Q,Z_t,X_t]$, containing the question, the sequence of selected sentences, and the currently available candidates. Initially, the candidate set contains the first $w$ sentences in the supplied ordering.

Each action chooses a sentence from that window. If its index is $m$, the transition appends it to $Z_t$ and moves the candidate window to sentences $m+1,\ldots,m+w$. Thus selection advances through the ordered sentences; the window restricts available actions, rather than allowing arbitrary selection from all remaining sentences.

The policy applies a softmax to bilinear scores between candidate sentence embeddings and an LSTM representation of the state:

$$
p(a\mid s)=\frac{\exp\{x_{m(a)}^\top U_p\operatorname{LSTM}(s)\}}
{\sum_{a'\in\mathcal A(s)}\exp\{x_{m(a')}^\top U_p\operatorname{LSTM}(s)\}}.
$$

The stated step reward is the arithmetic mean of $F_1(t)$ and ROUGE-L$(t)$. The source does not clearly define their step-level scoring inputs. Training samples episodes and weights policy-gradient updates by future returns. Joint training is claimed for the representations and policy; the text does not establish joint optimization with the downstream span predictor.

## Experiments

The paper describes MSMARCO as containing 100,000 questions and one million passages. Preprocessing uses TextBlob, word embeddings are 300-dimensional GloVe vectors, hidden dimensions are 150, and the stated dropout rate is 0.8. GP ("Golden Passage") selects the passage with the greatest overlap with the question; despite its name, the described rule is not an answer-informed oracle.

Table 1 reports the following percentages. Its second metric is labeled BLEU-4, whereas the experimental prose says BLEU-1; the table label is retained here without resolving that conflict.

| Method | ROUGE-L (%) | BLEU-4 (%) as labeled in Table 1 |
| --- | ---: | ---: |
| Match-LSTM | 30.67 | 31.05 |
| BiDAF | 31.52 | 32.11 |
| GP + Match-LSTM | 37.33 | 40.72 |
| GP + BiDAF | 37.56 | 41.24 |
| MC-MDP + Match-LSTM | 43.97 | 43.23 |
| MC-MDP + BiDAF | 44.12 | 43.45 |

MC-MDP improves ROUGE-L over the corresponding GP pipeline by 6.64 percentage points for Match-LSTM and 6.56 for BiDAF. These are differences calculated from Table 1. The text accompanying Figure 1 reports the best performance at window size $w=5$; no numerical sensitivity results are supplied in the parsed prose.

## Limitations

- Evidence comes from one benchmark and two span predictors. The source does not specify split sizes, repeated runs, uncertainty intervals, or a statistical significance test, despite describing the gains as significant.
- Downstream answer scores support the utility of selected content, but the report provides no separate sentence-selection precision or redundancy measurements to substantiate those mechanism claims.
- The candidate ordering, stopping rule, handling of windows near the end, and exact step-reward calculation are not fully specified. These affect reproducibility and the content the policy can reach.
- Training notation is inconsistent: the prose calls the return discounted, but Algorithm 1 shows an undiscounted sum. Its parameter update subtracts the reward-weighted log-policy gradient, leaving the optimization sign convention unclear.
- The BLEU-1/BLEU-4 discrepancy prevents an unambiguous interpretation of the second metric. The unusually high stated dropout rate is reproduced as written, without assuming it means keep probability.
- No publication year, venue, DOI, or identifier for this paper appears in the supplied Markdown. The year is therefore left unknown.

## Related Concepts

- [[concepts/question-conditioned-sentence-selection|Question-Conditioned Sentence Selection]]: constructing a compact answer-relevant context before span extraction.

## Related Papers

The following works are cited in the supplied paper; matching standalone pages were not found in the library.

- Seo et al. (2016), "Bidirectional attention flow for machine comprehension," arXiv:1611.01603: attention-based representation reference and the BiDAF span-prediction baseline.
- Wang and Jiang (2016), "Machine comprehension using match-lstm and answer pointer," arXiv:1608.07905: the Match-LSTM span-prediction baseline.
- Wang et al. (2017), "Reinforced reader-ranker for open-domain question answering," arXiv:1709.00023: cited passage-ranking and answer-aggregation context.

[[index|Library home]]
