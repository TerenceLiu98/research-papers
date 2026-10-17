---
title: Microframe Bias and Intensity
type: concept
aliases:
  - Microframes
tags:
  - computational-framing
  - word-embeddings
  - text-as-data
---

## Overview

A microframe is a semantic axis defined by opposing words, such as legal and illegal. Microframe bias measures the frequency-weighted average direction of text along that axis. Microframe intensity measures the squared distance of its word contributions from a background mean, capturing strong use of either pole. FrameAxis introduces these complementary summaries for exploratory text analysis.

## Key Ideas

- **Direction and emphasis differ.** Strong contributions from opposite poles can cancel in average bias while preserving high intensity. A balanced mean therefore need not indicate that an axis is absent from a text.
- **The background defines the reference.** For word-axis cosine similarities $c_f^w$, normalized frequencies $p_t(w)$, and background bias $B_f^T$, bias is $B_f^t=\sum_w p_t(w)c_f^w$ and intensity is $I_f^t=\sum_w p_t(w)(c_f^w-B_f^T)^2$. Algebraically, intensity equals the target variance plus $(B_f^t-B_f^T)^2$, so it reflects both dispersion and displacement from the background.
- **Axis orientation is conventional.** Reversing the pole order reverses bias signs but leaves intensity unchanged when the background is reversed consistently. Interpret the poles alongside numeric values.
- **Semantic contributions extend beyond pole words.** A word can affect an axis through embedding similarity even when neither pole occurs literally. Contributions combine semantic alignment with frequency; word-shift comparisons expose their sources.
- **Relevance and difference answer separate questions.** Topic-pole similarity suggests axes worth examining; bootstrap comparisons assess unusual use relative to a specified corpus. A relevant axis need not distinguish groups.
- **Measurement depends on representation.** Embedding stereotypes, frequent topic terms, and lost negation can create misleading scores. Word inspection and close reading remain necessary, and measured microframes do not establish audience effects or uniquely identify expert-defined frames.

## Important Papers

- [[papers/frameaxis-characterizing-microframe-bias-and-intensity-with-word-embedding|FrameAxis: Characterizing Microframe Bias and Intensity with Word Embedding]]: defines the measures, bootstrap selection, and word/document explanations, with restaurant-review and political-headline demonstrations.
- An, Kwak, and Ahn (2018), "SemAxis: A lightweight framework to characterize domain-specific word semantics beyond sentiment": the semantic-axis approach on which FrameAxis builds.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]: vector representations supply the word-axis similarities.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: studies how emphasized attributes change audience evaluations, requiring evidence beyond text scores.
- [[concepts/frame-specific-ideal-points|Frame-Specific Ideal Points]]: another approach connecting framing patterns with political positions, using topic hierarchies and legislative behavior.
- [[concepts/moral-foundations-theory|Moral Foundations Theory]]: offers theory-guided dimensions that motivate the use of opposing semantic poles.
