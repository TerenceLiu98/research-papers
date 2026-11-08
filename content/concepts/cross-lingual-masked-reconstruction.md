---
title: Cross-Lingual Masked Reconstruction
type: concept
tags:
  - cross-lingual-alignment
  - sentence-embeddings
  - masked-language-modeling
---

## Overview

Cross-lingual masked reconstruction predicts hidden tokens in one language using information from a parallel sentence in another. Conditioning on a fixed-size sentence vector encourages that vector to retain information useful across languages.

## Key Ideas

- Heavy masking makes the translation context useful for recovering lexical content.
- A sentence bottleneck can supervise the conditioning sentence vector, while direct gradients through masked token outputs also train the encoder’s token representations.
- Symmetric reconstruction trains both language directions with shared encoder parameters.
- Reconstruction and geometric alignment serve different roles: reconstructive information does not automatically place translations close together in embedding space.
- MEXMA combines reconstruction with clean-sentence MSE alignment and KoLeo regularization. Its ablations support this combination within the evaluated multilingual setup, rather than establishing a universal optimal objective.

## Important Papers

- [[papers/mexma-token-level-objectives-improve-sentence-representations|MEXMA: Token-level objectives improve sentence representations]] — demonstrates the benefit of direct token gradients and translation-conditioned reconstruction for sentence embeddings.

## Related Concepts

- [[concepts/text-embedding-models|Text Embedding Models]]
