---
title: LLM Feedback for Topic Model with Preference Optimization and Contrastive Learning
type: paper
authors:
  - Tung Nguyen
  - Dat Phan Trong
  - Linh Ngo Van
  - Duc Anh Nguyen
  - Hoang Thai Dinh
  - Diep Nguyen
year: null
tags:
  - topic-modeling
  - preference-optimization
  - contrastive-learning
---

## TL;DR

LLMFeed refines a neural topic model with one offline phase of LLM feedback: word preferences train a topic-conditioned DPO objective, and topic descriptions define contrastive supervision for document-topic distributions. On 20NG with 50 topics, reported coherence rises from 0.485 to 0.522 and Harmonic Purity from 0.471 to 0.525 relative to ECRTM (Table 5).

The supplied manuscript does not establish its publication year, venue, or stable identifier. Code is listed as https://github.com/tungserver99/LLMFeed.git. Source ingestion job: `5f82194c-6e07-4215-91e7-0f3108c97279`.

[[index|Library home]]

## Research Question

Can corpus-grounded LLM judgments improve both representative topic words and document-topic assignments without invoking an LLM throughout training?

## Motivation

Embedding-based neural topic models can retain irrelevant top words, while direct LLM topic generation may produce broad themes at substantial cost. Repeated LLM refinement improves semantic quality but need not improve document assignments. LLMFeed separates these targets and reuses fixed feedback during optimization.

## Contributions

- Adapts direct preference optimization to vocabulary words conditioned on a topic, using a frozen base-model reference.
- Uses LLM topic descriptions to define positive and negative document pairs for contrastive training.
- Evaluates coherence, diversity, assignment quality, and resource cost across four corpora, with ablations of feedback, objectives, embeddings, and base models.

## Method

The default base is an ECRTM-style variational autoencoder with bag-of-words inputs, frozen GloVe word embeddings, and embedding clustering regularization. Training runs for 350 base epochs followed by 150 refinement epochs.

At the boundary, GPT-4o scores each topic, describes its meaning, and labels candidate words as preferred or dispreferred. The 30-word pool contains the top 25 model-ranked words plus five vocabulary words retrieved using the topic description and BGE embeddings. All win/lose combinations form preference pairs. The topic-conditioned policy normalizes word-topic logits over vocabulary; DPO increases preferred-versus-dispreferred logit margins relative to the frozen reference snapshot (Section 3.3).

Topic descriptions and top words form topic sentences. Documents and these sentences are embedded with bge-small-en-v1.5. Documents sharing any of their two most similar topics become positive pairs; those sharing none become negatives. A supervised contrastive loss acts on document-topic proportions. The final objective adds weighted preference and contrastive terms to reconstruction, latent KL, and embedding clustering losses. Feedback remains fixed during refinement: one feedback phase means three prompts per topic, not one API call overall.

## Experiments

The datasets are 20NG, Web of Science, BBC, and NYT, with topic counts 25, 50, 75, and 100. Topic quality uses Wikipedia-based C_v and NPMI, topic diversity, and GPT-5 ratings; assignment evaluation uses Harmonic Purity, NMI, and ARI. Detailed topic-quality tables report five seeds. Baselines include ECRTM, LLM-ITL, NeuroMax, CGTM, ETM, and embedding-clustering methods.

Table 2 averages across the four topic counts:

| Dataset | ECRTM C_v | LLM-ITL C_v | LLMFeed C_v |
| --- | ---: | ---: | ---: |
| 20NG | 0.477 | 0.497 | 0.514 |
| WoS | 0.434 | 0.455 | 0.466 |
| BBC | 0.440 | 0.451 | 0.466 |
| NYT | 0.422 | 0.430 | 0.448 |

At 50 topics on 20NG, Table 5 reports a 7.6% relative coherence gain and 11.5% Harmonic Purity gain over ECRTM. DPO-only mainly improves coherence. Contrastive-only obtains Harmonic Purity 0.537 and ARI 0.363, exceeding the combined model's 0.525 and 0.339; the combined model instead has higher coherence and diversity. DPO-only slightly worsens assignment metrics on WoS.

For 20NG with 100 topics, Table 4 reports approximately 23 minutes, 2 GB memory, and 300 LLM calls for LLMFeed, versus eight hours, 65 GB, and 2,850 calls for LLM-ITL. These are configuration-specific measurements: experiments use an A100, and the compared methods use different LLMs. LLM-ITL also uses frozen embeddings here, unlike its original configuration.

Appendix experiments show improvements with Llama 3 feedback and with ProdLDA or ETM bases. Cheaper BGE-only preference labels approach assignment performance on NYT but trail LLMFeed in coherence (0.445 versus 0.453 at 50 topics, Table 19).

## Limitations

The topic count must be specified, corpus vocabulary constrains expressiveness, and objective weights require balancing. Coherence gains do not imply uniform assignment improvements: the full model loses to contrastive-only on some 20NG assignment metrics and is not best on 20NG NMI in the main comparison. Hyperparameters are selected using C_v, and LLM ratings are not human evaluation.

The supplied tables also contain inconsistencies: 20NG diversity at 50 topics is 0.973 in Tables 5 and 11 but 0.960 in Table 17, while later tables use different purity labels. The headline numbers above retain their explicit table provenance rather than treating all appendix values as interchangeable.

## Related Concepts

- [[concepts/llm-guided-topic-refinement|LLM-Guided Topic Refinement]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]
- [[concepts/embedded-topic-models|Embedded Topic Models]]
- [[concepts/optimal-transport|Optimal Transport]]

## Related Papers

- [[papers/neural-topic-modeling-with-large-language-models-in-the-loop|Neural Topic Modeling with Large Language Models in the Loop]] supplies the repeated-refinement comparison; LLMFeed instead fixes feedback before refinement training.
- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]] introduces ETM, an alternative base evaluated in Appendix E.9.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic]] is an optimal-transport-based baseline in the evaluation.
