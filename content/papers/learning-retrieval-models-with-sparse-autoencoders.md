---
title: "Learning Retrieval Models with Sparse Autoencoders"
type: paper
authors:
  - Thibault Formal
  - Maxime Louis
  - Hervé Déjean
  - Stéphane Clinchant
year: 2026
tags:
  - learned-sparse-retrieval
  - sparse-autoencoders
  - multilingual-retrieval
  - information-retrieval
---

## TL;DR

SPLARE replaces SPLADE's fixed token-vocabulary projection with a frozen pretrained [[concepts/sparse-autoencoders|Sparse Autoencoder]] attached to an intermediate LLM layer, then trains the LLM with LoRA to produce sparse query and document vectors over the SAE's latent features. The 7B multilingual model reports 62.3 average retrieval performance on MTEB Multilingual v2 and 58.6 MRR@10 on XTREME-UP with 40 query and 400 document features, outperforming the matched vocabulary-based SPLADE-Llama baseline at 61.7 and 56.2, respectively.

## Research Question

Can pretrained SAE features serve as a more semantic, multilingual, and scalable vocabulary for learned sparse retrieval than the fixed subword vocabulary used by SPLADE-style models?

## Motivation

Learned sparse retrievers support interpretable dot-product scoring and efficient inverted indexes, but vocabulary-based representations inherit tokenization redundancy and make multilingual or cross-lingual matching difficult. Pretrained SAEs decompose LLM hidden states into sparse latent features that can be language-agnostic and semantically coherent. The paper tests whether those features can act directly as retrieval units rather than merely explain an already trained dense retriever.

## Contributions

- Introduces SPLARE, which projects token states through a pretrained SAE and pools the resulting latent activations into sequence-level sparse retrieval vectors.
- Compares latent and lexical sparse representations under matched Llama-3.1-8B backbones, training data, distillation targets, and sparsity controls.
- Studies layer depth, SAE width, pruning robustness, retrieval latency, multilingual transfer, and feature-level explanations.
- Releases 7B and 2B multilingual configurations; the reported 7B model supports more than 100 languages through cross-lingual transfer.

## Method

SPLARE inserts the encoder of a pretrained Llama Scope or Gemma Scope SAE at a selected transformer layer. It applies SPLADE-style log-saturation and max pooling across token-level latent activations, producing one sparse vector for each query or document. Relevance is their sparse dot product.

Training keeps the SAE fixed and updates the LLM through rank-64 LoRA adapters. A cross-encoder teacher supplies relevance distributions, and the student minimizes KL divergence plus separate FLOPS regularizers for query and document sparsity. Inference-time Top-K pooling makes the activity budget explicit; the default retains at most 40 query features and 400 document features. The models use bidirectional attention and masked-next-token pretraining before retrieval fine-tuning.

The main 7B model uses a 131K-feature Llama Scope SAE at layer 26 of Llama-3.1-8B. The paper also studies Gemma-2-2B SAEs from roughly 16K to 1M features and a lighter SPLARE-2B configuration at layer 6.

## Experiments

Across Llama Scope and Gemma Scope, retrieval quality peaks near two-thirds of transformer depth, while wider SAEs show an approximately log-linear improvement in retrieval effectiveness. At 100 retained document features, SPLARE loses about 2% performance versus more than 6% for SPLADE-Llama. With the default 40/400 activity limits, sparse retrieval over 8.8 million MS MARCO documents takes about 5 ms per query in the paper's single-threaded Seismic setup, excluding model inference.

In the controlled English-only setting, SPLARE and SPLADE-Llama tie at 52.9 on MTEB English, while SPLARE improves MTEB Multilingual from 54.3 to 56.3, Medical from 61.0 to 62.9, and Law from 49.0 to 51.2. It trails on Code, 55.1 versus 57.3, and ChemTEB, 70.0 versus 75.9.

With multilingual training, SPLARE reaches 59.3 on MTEB English and 62.3 on MTEB Multilingual, compared with 58.9 and 61.7 for SPLADE-Llama. It scores 71.7 nDCG@10 on MIRACL and 58.6 MRR@10 on XTREME-UP, versus 69.9 and 56.2 for the matched lexical baseline. Removing Top-K pooling increases the MTEB scores to 61.4 and 63.8 but raises retrieval complexity. SPLARE-2B reaches 55.9 and 59.1 on the two MTEB splits.

Neuronpedia labels suggest that contributing SPLARE features often capture cross-lingual concepts while SPLADE relies on redundant Latin-script subwords. The qualitative examples also reveal noisy or generic SAE labels, particularly on code queries.

## Limitations

- The multilingual training corpus includes training splits associated with some MTEB tasks, which constrains a strict interpretation of generalization.
- SPLARE underperforms its matched lexical baseline on code retrieval; the authors attribute this to SAE features that are too generic for code and suggest domain-specific SAEs.
- Reported sparse-search latency excludes query encoding and SAE projection, so it is not an end-to-end serving measurement.
- The main results depend on particular pretrained residual-stream SAEs, selected layers, and a temperature grid search; the study does not establish that all SAE suites transfer equally well.
- Natural-language feature explanations come from Neuronpedia and include visibly imperfect labels, so they demonstrate inspectability rather than uniformly monosemantic retrieval units.
- The supplied manuscript does not provide a DOI, arXiv identifier, or publication venue.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/concept-level-sparse-retrieval|Concept-Level Sparse Retrieval]]
- [[concepts/adaptive-sparse-embeddings|Adaptive Sparse Embeddings]]
- [[concepts/massive-text-embedding-benchmark-mteb|Massive Text Embedding Benchmark (MTEB)]]

## Related Papers

- [[papers/decoding-dense-embeddings-sparse-autoencoders-for-interpreting-and-discretizing-dense-retrieval|Decoding Dense Embeddings: Sparse Autoencoders for Interpreting and Discretizing Dense Retrieval]] applies an SAE after dense-retriever training, whereas SPLARE trains retrieval directly through a pretrained LLM SAE feature space.
- Formal et al. (2021), "SPLADE: Sparse Lexical and Expansion Model for First Stage Ranking": supplies the lexical sparse-retrieval architecture adapted by SPLARE.
- He et al. (2024), "Llama Scope: Extracting Millions of Features from Llama-3.1-8B with Sparse Autoencoders": supplies the principal pretrained SAEs.
- Lieberum et al. (2024), "Gemma Scope: Open Sparse Autoencoders Everywhere All at Once on Gemma 2": supplies the SAE family used for width and backbone ablations.

[[index|Library home]]
