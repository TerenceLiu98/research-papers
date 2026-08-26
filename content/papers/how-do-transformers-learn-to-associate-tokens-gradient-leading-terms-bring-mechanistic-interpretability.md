---
title: "How Do Transformers Learn to Associate Tokens: Gradient Leading Terms Bring Mechanistic Interpretability"
type: paper
authors:
  - Shawn Im
  - Changdae Oh
  - Zhen Fang
  - Sharon Li
year: 2026
arxiv: "2601.19208"
tags:
  - mechanistic-interpretability
  - transformer-training-dynamics
  - semantic-associations
  - representation-learning
---

## TL;DR

The paper uses [[Gradient Leading-Term Analysis]] to approximate the early weight updates of an attention-only language model trained on natural text. It expresses the output, value, query-key, and relative-position parameters through three corpus statistics: a next-token bigram map, a token-interchangeability map, and a longer-range context map. Experiments with a three-layer TinyStories model closely match these formulas, while covariance comparisons with Pythia-1.4B suggest that related [[Semantic Associations in Transformers]] are strongest early in training and then give way to more specialized representations.

## Research Question

How do statistical and functional associations between tokens first emerge in the weights of attention-based language models trained with standard next-token prediction on natural-language data?

## Motivation

Mechanistic studies have identified structures such as induction heads, linear relations, and topic clusters, but existing training-dynamics theories often rely on synthetic languages, omit causal masking or positional information, or train model components separately. The paper seeks an analytically tractable account that retains causal masking, residual connections, relative positional encodings, natural text, and simultaneous gradient-based training.

## Contributions

- Derives closed-form leading terms for the output, value, query-key, and relative-position weights of a finite-depth attention-only transformer during early training.
- Decomposes those terms into three corpus-derived basis functions: a centered bigram map, a token-interchangeability map derived from bigram correlations, and a centered prefix-context map.
- Explains how compositions of these maps make different parameter classes cooperate: the residual path supplies a bigram-like prediction while attention selects context tokens that improve the model's current next-token prediction.
- Tests the formulas directly in a three-layer TinyStories model and compares their induced token correlations with representations and attention weights from Pythia-1.4B checkpoints.

## Method

The theoretical model is an $L$-layer attention-only transformer with causal masking, residual streams, and learned relative positional encodings. Tokens are represented in the vocabulary basis. Each layer has a value matrix, a shared query-key matrix, and a relative-position vector; the final hidden states are mapped to logits by an output matrix. All parameters are optimized simultaneously with full-batch gradient descent on cross-entropy next-token loss.

The analysis expands each gradient around the initial parameters and retains its first nonzero term. For zero initialization, and with analogous high-probability bounds for sufficiently small Gaussian initialization, the principal parameter directions after $s$ steps are:

- The output matrix is first order in training time and follows the centered bigram statistic $\bar B$.
- Each value matrix is second order and follows $\bar\Phi^\top \bar B^\top$, composing a prefix-context summary with the output map.
- Each query-key matrix is fourth order and follows $\bar Q$, which scores input-output token pairs using $\bar B^\top\bar B\bar\Phi$, applies causal masking and centering, shifts output scores to their preceding query tokens, and averages the result in vocabulary space.
- Each relative-position vector has the same fourth-order scale and aggregates the corresponding scores by positional offset into $\Delta$.

The three interpretable building blocks are:

- **Bigram mapping:** the frequency-weighted probability that one token directly follows another, centered against a uniform output baseline.
- **Interchangeability mapping:** $\bar B^\top\bar B$, which associates tokens with similar preceding-token distributions and therefore often captures shared grammatical or functional roles.
- **Context mapping:** $\bar\Phi$, which associates a token with tokens occurring in its earlier prefix and captures dependencies beyond adjacent pairs.

The formal bounds hold uniformly across layers for an early interval whose length is proportional to $1/\eta$ and decreases with sequence length and depth. The proof first handles zero initialization and then shows that a sufficiently small Gaussian initialization remains within the same error bounds.

## Experiments

The direct test trains a three-layer attention-only model on 65,536 TinyStories sequences, using the 3,000 most common word, punctuation, and number tokens and a sequence length of 200 for the model inputs. With learning rate 0.005, the reported minimum cosine similarities between theoretical and learned weights are 0.999496 for attention, 0.999169 for value, and 0.998486 for output weights. In a larger-learning-rate run at 0.05, all parameter matrices remain above 0.9 similarity after 30 epochs and above 0.7 after 100 epochs, by which point loss falls from 8.00 to 5.35.

Qualitative nearest-token examples support the proposed interpretation. The bigram map links descriptors to likely following objects, the interchangeability map groups words with similar roles, and the context map links entities such as fish to settings such as ponds and lakes.

A BPE replication uses a vocabulary of 10,000 and reports minimum cosine similarities of 0.999914 for attention, 0.998800 for value, and 0.997891 for output weights across 10 epochs. In a causal intervention on the learning-rate-0.05 model, removing each weight matrix's projection onto its leading term changes loss from 5.349 to 5.350-5.361 for the three attention layers, 6.192-6.526 for the value layers, and 8.287 for the output layer. This ordering matches the theory's prediction that the output term enters earlier and at larger order than the attention term.

For a practical-model comparison, the authors compute the theoretical statistics from 100,000 OpenWebText samples and compare covariance matrices induced by those statistics with token-basis attention and hidden representations from Pythia-1.4B checkpoints. Agreement is strongest at early checkpoints and generally declines through training, with the first attention layer as an exception to the otherwise strong early match. Excluding the MLP changes the embedding correlations mainly at the first layer. Per-head analysis suggests slower acquisition in layer 2 and earlier head specialization in the middle layer examined, layer 13. Repeating the dataset-side calculation with FineWeb produces a similar qualitative pattern.

## Limitations

The theorem concerns an early training regime under full-batch gradient descent, a constant learning rate, bounded depth and sequence length, a vocabulary of at least 500 tokens, and either zero or extremely small Gaussian initialization. Its model has a single attention mapping per layer and no MLP, layer normalization, or practical multi-head parameterization. The Pythia analysis therefore compares covariance structure rather than directly testing the derived matrix identities in a production architecture.

The TinyStories setting uses a restricted vocabulary and computes theoretical matrices from the first batch. The practical validation covers one Pythia model size and two web corpora, reports similarity rather than downstream causal effects, and does not establish that the identified statistics fully explain later specialization. Finally, corpus co-occurrence and substitutability are evidence of statistical association, not by themselves evidence that a model has acquired human-like semantic understanding.

## Related Concepts

- [[Gradient Leading-Term Analysis]]
- [[Semantic Associations in Transformers]]
- Mechanistic interpretability
- Distributional semantics
- Transformer circuits

## Related Papers

- Bietti et al. (2023), "Birth of a Transformer: A Memory Viewpoint."
- Nichani, Damian, and Lee (2024), "How Transformers Learn Causal Structure with Gradient Descent."
- Tian et al. (2023), "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-Layer Transformer."
- Li, Li, and Risteski (2023), "How Do Transformers Learn Topic Structure: Towards a Mechanistic Understanding."
- Olsson et al. (2022), "In-Context Learning and Induction Heads."

[[index|Library home]]
