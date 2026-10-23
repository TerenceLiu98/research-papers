---
title: "Integrating Large Language Models with Reinforcement Learning for Generalization in Strategic Card Games"
type: paper
authors:
  - Wannian Xia
  - Meng Fang
  - Zihao Guo
  - Yali Du
  - Bo Xu
year: 2025
venue: AAMAS 2025
source_job_id: "a5698dda-03b0-4eac-8f80-dbad5031c684"
tags:
  - reinforcement-learning
  - language-models
  - self-play
  - world-models
  - game-playing
---

## TL;DR

This extended abstract combines fine-tuned T5 representations of Hearthstone cards and deck strategies with self-play reinforcement learning and an auxiliary latent transition objective. Against three levels of a basic tree-search opponent, the resulting agent reports win rates of 96%, 76%, and 68%, exceeding GPT-4o and Cardsformer in the same table. The supplied text does not provide enough experimental detail to isolate how much each component contributes or to map those results to each held-out-card setting.

## Research Question

Can natural-language representations of cards and deck strategies help a reinforcement-learning agent retain strong play when a strategic card game's available cards and effects change?

## Motivation

Strategic card games combine sequential decision-making with rules expressed in text. In Hearthstone, new cards continually expand the possible interactions, so a policy trained on a fixed card pool may not transfer to unfamiliar cards or decks. The paper uses a language model to encode card semantics and deck-level strategy, then couples those representations to self-play policy learning and a predictive latent-state objective.

## Contributions

- Fine-tunes T5-base on card-description pairs and on strategy descriptions derived from more than 5,000 decks.
- Uses the fine-tuned encoder to represent individual cards and deck strategies for a self-play value-learning agent.
- Adds an auxiliary [[concepts/world-models|World Model]] loss that predicts the next hidden state from the current state-action representation.
- Evaluates play on five test decks containing varying proportions of unseen cards, including one deck with 50% unseen cards, and compares the agent with GPT-4o and Cardsformer against basic tree-search opponents.

## Method

The representation stage treats each card as a distinct token and trains T5-base to generate its textual description. A second dataset converts deck contents, including card names, descriptions, costs, attack values, and health points, into a formal description; GPT-4 generates a concise strategy summary for each of more than 5,000 decks. T5 is fine-tuned on these two tasks. Mean pooling and L2 normalization turn encoder outputs into card and deck representations.

During self-play, a representation network $f_\theta$ maps an observation-action pair to a hidden state $h_t$. A policy module $q_\phi$ predicts $Q(o_t,a_t)$ from that state and minimizes mean squared error against discounted Monte Carlo returns stored after each game.

An auxiliary transition network $w_\psi$ predicts the next hidden state from $h_t$. Its target is produced by encoding the next observation while masking the next action. The paper specifies a cross-entropy transition loss and combines it with the policy loss as

$$
\mathcal L_{\mathrm{total}}=\mathcal L_{\mathrm{policy}}+\beta\mathcal L_{\mathrm{world}}.
$$

This transition term encourages the policy representation to preserve information about environment dynamics; the agent does not use the learned transition model for explicit planning in the described method.

## Experiments

The evaluation uses Hearthstone and five testing decks with different shares of cards unseen during training; the maximum reported share is 50%. The principal table measures win rate against a basic tree-search AI at three difficulty levels:

| Tree-search level | Proposed agent | GPT-4o | Cardsformer |
| --- | ---: | ---: | ---: |
| 0 | 96% | 60% | 82% |
| 1 | 76% | 24% | 68% |
| 2 | 68% | 12% | 48% |

The proposed agent leads both baselines at every reported tree-search level. GPT-4o, prompted directly with textual game observations, declines from 60% at level 0 to 12% at level 2. The extended abstract describes these experiments as evidence of zero-shot generalization to unseen cards, but the supplied table does not break results down by test deck or unseen-card proportion.

## Limitations

- The supplied extended abstract reports only one compact result table and does not provide uncertainty estimates, number of games, training budgets, or detailed evaluation protocols.
- Results are not separated by the five test decks, so performance as the unseen-card share increases cannot be quantified from the supplied text.
- No ablation isolates the effects of T5 fine-tuning, deck-strategy summaries, self-play, or the auxiliary transition loss.
- The deck-strategy data depends on GPT-4-generated summaries, but their validation, cost, and sensitivity are not reported.
- The transition objective is called a world-model loss, although the described agent uses it as representation-learning supervision rather than for simulated rollouts or planning.
- Evidence is limited to Hearthstone, so transfer to other strategic card games remains untested.

## Related Concepts

- [[concepts/world-models|World Models]]: the auxiliary module predicts next-step hidden representations, but is not used as a planning simulator.

## Related Papers

- Xia et al. (2023), "Cardsformer: Grounding Language to Learn a Generalizable Policy in Hearthstone," is the language-grounded policy baseline evaluated in the paper.
- Zha et al. (2021), "DouZero: Mastering DouDizhu with Self-Play Deep Reinforcement Learning," provides a cited self-play precedent for strategic card games.
- Espeholt et al. (2018), "IMPALA: Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures," is cited for scalable reinforcement-learning context.
- Raffel et al. (2020), "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer," introduces the T5 architecture used for card and strategy representations.

[[index|Library home]]
