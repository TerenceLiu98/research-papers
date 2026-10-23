---
title: "Decoding Dense Embeddings: Sparse Autoencoders for Interpreting and Discretizing Dense Retrieval"
type: paper
authors:
  - Seongwan Park
  - Taeklim Kim
  - Youngjoong Ko
year: null
tags:
  - dense-retrieval
  - sparse-autoencoders
  - explainable-information-retrieval
  - sparse-retrieval
---

## TL;DR

This paper applies [[concepts/sparse-autoencoders|Sparse Autoencoders]] to SimLM passage embeddings, labels the resulting latent features with natural-language descriptions, and uses them to explain embeddings and query-document rankings. It then introduces [[concepts/concept-level-sparse-retrieval|Concept-Level Sparse Retrieval]] (CL-SR), which indexes activated SAE latents rather than lexical terms. On MS MARCO Dev, CL-SR Efficient reaches 0.343 MRR@10 with a 0.57 GB index, while CL-SR Max reaches 0.368 MRR@10 with a 1.27 GB index; both retain more performance than lexical sparse baselines on a BM25 failure subset.

## Research Question

Can sparse autoencoders turn dense passage-retrieval embeddings into interpretable semantic units that explain ranking behavior and also serve as efficient sparse retrieval identifiers?

## Motivation

Dense retrieval addresses vocabulary and word-sense mismatch by comparing contextual embeddings, but its embedding dimensions and similarity scores are difficult to interpret. Traditional sparse retrieval is transparent and supports efficient inverted indexes, yet exact lexical matching can miss semantically equivalent expressions or confuse different senses of the same word. The paper asks whether an SAE-derived concept vocabulary can combine the semantic behavior of a dense retriever with sparse retrieval's inspectability and indexing efficiency.

## Contributions

- Trains BatchTopK SAEs on SimLM query and passage embeddings and evaluates reconstruction error, retrieval preservation, ranking correlation, and latent coherence.
- Generates short natural-language descriptions from highly activating passages and tests whether these descriptions let humans identify source passages and simulate ranking decisions.
- Introduces CL-SR, an inverted-index retrieval method whose matching units are activated latent concepts and whose scores combine latent activations, document normalization, and inverse document frequency.
- Evaluates effectiveness, index size, estimated matching cost, and robustness to vocabulary and semantic mismatch on MS MARCO Dev and TREC Deep Learning 2019/2020.

## Method

The authors encode approximately 8.8 million MS MARCO passages and 0.5 million training queries with SimLM, then train overcomplete BatchTopK SAEs with latent width 32 times the embedding dimension and activation budgets of 32, 48, 64, or 128. At inference, activations above a corpus-derived threshold form each text's sparse code. Reconstruction is assessed with normalized mean squared error, downstream retrieval metrics, and Spearman correlation between original and reconstructed rankings. A latent-intrusion test asks GPT-4.1 mini to identify one non-activating passage among nine passages that strongly activate a latent.

For explanation, an LLM summarizes the common pattern among passages that most strongly activate each latent. IDF reweighting suppresses frequently active, abstract features. Human annotators receive these descriptions and activation values for passage identification and pairwise simulation of SimLM rankings.

CL-SR uses latent indices as a fixed concept vocabulary. Documents are placed in an inverted index under their strongest active latents, and query-document scores use saturating query and document activation functions, document-length normalization in latent space, and latent IDF. The Efficient configuration uses the $k=32$ SAE and indexes at most 24 concepts per passage; Max uses $k=128$ and at most 65.

## Experiments

Increasing active latents improves reconstruction but reduces latent-intrusion accuracy. From $k=32$ to $k=128$, NMSE falls from 0.1903 to 0.1069 and MS MARCO MRR@10 using reconstructed embeddings rises from 0.328 to 0.371, while intrusion accuracy falls from 0.859 to 0.764. Reconstructed rankings correlate strongly with SimLM rankings on TREC DL, with Spearman values around 0.93-0.96.

In human evaluation, latent descriptions support 0.943 accuracy in identifying a passage among distractors. Ranking-simulation accuracy ranges from 0.903 to 0.938 across retrieved-positive, non-retrieved-positive, and retrieved-negative pairings.

On MS MARCO Dev, CL-SR Efficient records 0.343 MRR@10, 0.954 Recall@1k, 0.11 estimated FLOPs, an average document length of 22.95 latents, and a 0.57 GB index. CL-SR Max records 0.368 MRR@10, 0.969 Recall@1k, 0.74 FLOPs, 64.73 latents, and a 1.27 GB index. SPLADE-max records 0.340 MRR@10, 0.965 Recall@1k, 1.35 FLOPs, and a 2.60 GB index. On TREC DL 2019/2020, CL-SR Max reaches 0.686/0.634 NDCG@10, below SPLADE-max's 0.683/0.671 on the 2020 set but slightly above it on 2019.

The mismatch analysis selects 988 MS MARCO Dev queries for which BM25 misses the gold passage in its top 1,000. CL-SR Efficient and Max obtain 0.124 and 0.143 MRR@10, compared with 0.106 for SPLADE v2 and 0.185 for SimLM. Case studies attribute gains to shared latent concepts that bridge lexical substitutions such as "womb" and "uterus" and distinguish the seasonal from physical sense of "fall."

## Limitations

- SAE features may be incomplete, dataset-dependent, and non-canonical; the study evaluates BatchTopK SAEs rather than newer variants intended to address these issues.
- Natural-language feature labels and the latent-intrusion test depend on an LLM evaluator, making results sensitive to prompts and evaluator reasoning.
- The human explanation study is labor-intensive and therefore limited to sampled examples.
- CL-SR inherits its concept space from a particular dense retriever and training corpus, so its explanations and retrieval behavior should not be treated as model-independent concepts.
- The supplied manuscript gives no publication year, venue, DOI, or arXiv identifier.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/concept-level-sparse-retrieval|Concept-Level Sparse Retrieval]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- Wang et al. (2023), "SimLM: Pre-training with representation bottleneck for dense passage retrieval": supplies the interpreted dense retriever.
- Formal et al. (2021), "SPLADE v2: Sparse lexical and expansion model for information retrieval": provides the principal neural sparse baseline.
- Bussmann et al. (2024), "BatchTopK Sparse Autoencoders": supplies the SAE training mechanism.
- Llordes et al. (2023), "Interpreting neural ranking models using discrete state-space search": provides a term-level proxy explanation approach for comparison.

[[index|Library home]]
