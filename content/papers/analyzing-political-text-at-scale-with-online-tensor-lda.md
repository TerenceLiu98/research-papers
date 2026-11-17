---
title: Analyzing Political Text at Scale with Online Tensor LDA
type: paper
authors:
  - Sara Kangaslahti
  - Danny Ebanks
  - Jean Kossaifi
  - Anqi Liu
  - R. Michael Alvarez
  - Animashree Anandkumar
year: 2025
doi: 10.1017/pan.2025.10024
tags:
  - topic-modeling
  - political-methodology
  - tensor-methods
  - online-learning
---

## TL;DR

An online, GPU-accelerated tensor estimator makes bag-of-words topic modeling practical for very large political-text corpora. Centering, incremental whitening, and batched tensor-factor updates avoid explicitly constructing large word co-occurrence tensors. On 7.97 million #MeToo tweets, online TLDA fits 15–143 times faster than Gensim on the tested hardware; a billion-document scaling test repeats a smaller corpus rather than collecting a billion unique tweets.

## Research Question

Can spectral LDA's parameter-recovery foundations be retained while making topic estimation sufficiently fast and memory-efficient for streaming political text at hundreds of millions of documents?

## Motivation

Large social-media corpora capture changing discussions of protests and electoral legitimacy, but conventional topic estimation can make full-corpus analysis and repeated fitting impractical. The authors position scalable topic modeling as descriptive discovery that can inform subsequent substantive research.

## Contributions

- A centered formulation of tensor LDA with a stated recovery result connecting centered factors to the original topic-word parameters.
- Incremental PCA and vectorized stochastic tensor-gradient updates, including a fully online variant that updates all moments on incoming batches.
- An end-to-end GPU implementation using RAPIDS and TensorLy, with variational inference for document-topic proportions.
- Synthetic recovery experiments, runtime and coherence comparisons, and descriptive applications to #MeToo and the 2020 US election.

## Method

The [[concepts/tensor-latent-dirichlet-allocation|Tensor Latent Dirichlet Allocation]] pipeline centers document word-count vectors using the corpus mean. Incremental PCA supplies whitening directions without explicitly materializing the full second-order moment. A rank-K factorization of the whitened third-order moment is learned through mini-batch stochastic gradient updates with an orthogonality penalty (Sections 4.1–4.4).

The batched variant makes separate passes for the mean, whitening, and tensor decomposition. The fully online variant initializes on a small subset, then updates the mean, PCA, and tensor factors for each new batch without revisiting prior documents. Unwhitening and adding back the mean recover topic-word factors; standard variational inference then estimates document-topic mixtures. Theorem 1 states the centered-factor recovery relationship, with its proof deferred to the supplement.

Preprocessing removes very short documents, stems and tokenizes words, identifies bigrams, and trims document-frequency extremes. Topic count, mixing strength, learning rate, whitening dimension, and orthogonality penalty require selection. In the #MeToo comparison, TLDA parameters maximize mean coherence across the tested metrics, whereas Gensim largely retains defaults with additional passes and iterations for convergence.

## Experiments

**Synthetic recovery (Tables 2–3).** With 20,000 documents, two topics, and ten random seeds, batched TLDA achieves mean factor correlations of 0.943, 0.930, and 0.873 for vocabularies of 500, 1,000, and 1,500 words. Corresponding CPU runtimes are 3.00, 2.98, and 3.55 seconds, compared with 20.00–62.18 seconds for PARAFAC TLDA and 53.87–103.39 seconds for SGD TLDA.

**#MeToo (Tables 4–5).** The processed corpus has 7.97 million tweets and 1,837 vocabulary terms; GPU preprocessing takes 178 seconds. Fitting times below exclude preprocessing. TLDA uses one GPU and Gensim uses 79 CPU cores.

| Topics | Gensim time (s) | Online TLDA time (s) | Speedup | Gensim / online TLDA C_V |
| --- | ---: | ---: | ---: | --- |
| 10 | 1,581.80 | 103.45 | 15.29× | 0.421 / 0.407 |
| 100 | 14,830.54 | 103.45 | 143.36× | 0.381 / 0.355 |

Coherence is metric-dependent: online TLDA has lower C_V at these endpoints but higher UMass, and higher NPMI at 100 topics. The CPU/GPU ablation reports 16–20× faster online TLDA fitting on GPU. Document-count scaling is approximately linear over the tested subsets.

**Substantive descriptions (Sections 7.2–7.4).** Monthly cumulative refitting of #MeToo data finds persistent testimony, support, and protest-coordination themes, alongside more transient political-news topics and declining counter-movement prominence. The election analysis uses 29,711,862 tweets collected from September 1, 2020 to January 20, 2021 and learns 30 topics. Authors group them into election discrediting, legal challenges, and verification; discrediting accounts for about 25% on average, with a relative peak on January 6. These are descriptive topic-label interpretations.

**Large-scale test (Table 1; Section 7.4.2).** Online TLDA takes about 3.47 hours on 260 million COVID-related tweets and 13.16 hours on 1,043,009,932 document presentations obtained by traversing that corpus four times. This supports computational scaling, not equivalent evidence from a billion distinct documents.

## Limitations

- Recovery guarantees depend on the assumed LDA data-generating process and full-rank topic-word matrix; synthetic recovery uses only two topics. These conditions do not establish substantive validity on real tweets.
- GPU-versus-CPU timing and different tuning procedures combine implementation, hardware, and optimization effects. Automatic coherence does not uniformly favor TLDA and is not a substitute for label validation.
- The source gives inconsistent #MeToo date ranges across its introduction and application sections. Section 7.2 describes cumulative refitting from August 2017 through September 2019; this is distinct from demonstrating single-pass temporal tracking.
- Keyword-selected social-media corpora and manual topic classifications support descriptions of the collected conversation, not causal claims about mobilization or election beliefs.
- Supplementary proofs and additional benchmarks are referenced but are not included in the supplied Markdown.

## Related Concepts

- [[concepts/tensor-latent-dirichlet-allocation|Tensor Latent Dirichlet Allocation]]: estimates topic parameters from low-order moments.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: distinguishes recovery, coherence, efficiency, and substantive interpretation.

## Related Papers

- Anandkumar et al., “A Spectral Algorithm for Latent Dirichlet Allocation”: supplies the spectral recovery foundation used here.
- Huang et al. (2015), “Online Tensor Methods for Learning Latent Variable Models”: supplies the stochastic tensor-gradient predecessor, whose second moment still requires separate construction.
- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]]: an alternative topic-model parameterization using embedding geometry rather than the moment-estimation strategy studied here.

Replication data and code: https://doi.org/10.7910/DVN/OKPRJG.
