---
title: Adaptive Questioning
type: concept
definition: Adaptive questioning uses the answers received so far to choose the next question about an uncertain target.
tags:
  - information-seeking
  - sequential-decision-making
---

## Overview

In Twenty Questions, an answer can rule out a family of possibilities and change which question is worth asking next. When the target is an unfamiliar research method, the questioner also has to imagine plausible alternatives. A question can cleanly separate the possibilities the questioner has considered while overlooking the family that contains the answer.

## Key Ideas

- A question about a shared property can distinguish whole groups of candidates. Once a family looks plausible, a narrower question can distinguish variants within it.
- Generating candidate questions and selecting among them are separate decisions. Giving different selectors the same proposals tests selection ability. Giving one selector different proposals tests whether the available choices constrain progress.
- Answer format limits how much evidence a question can supply. With a hidden target, fixed initial information, and questions based only on that information and earlier answers, a binary answer conveys at most one bit per turn. Predictable or redundant answers can convey much less.

## Important Papers

- Cohen and Lake (2016), *Searching large hypothesis spaces by asking questions*, studies question asking when many hypotheses are possible.
- [[papers/re-search-dissecting-llm-ideation-through-a-two-player-questioning-game|RE-SEARCH]] measures how successive answers change a model's account of a hidden method and tests whether supplying questions from other models improves recovery.

## Related Concepts

- [[concepts/bayesian-experimental-design|Bayesian Experimental Design]] provides a formal criterion for choosing a question when a prior and an answer model are available. Expected information gain measures how much the possible answers would reduce uncertainty on average.
