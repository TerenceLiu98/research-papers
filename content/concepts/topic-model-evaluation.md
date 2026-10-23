---
title: Topic Model Evaluation
type: concept
tags:
  - topic-modeling
  - interpretability
  - evaluation
---

## Overview

Topic model evaluation distinguishes the quality of topic word lists from the usefulness and interpretability of document-topic assignments. Coherence, diversity, human relevance, and downstream prediction measure different properties; improvement on one does not establish improvement on the others.

## Key Ideas

- **Coherence:** Normalized pointwise mutual information (NPMI) and coherence value assess relationships among a topic's leading words. They provide automatic evidence of semantic consistency, not a complete test of human interpretability.
- **Diversity:** Topic uniqueness measures repetition across topic word lists. It can penalize legitimate polysemy and can favor distinct but marginal or incoherent topics. Composite topic quality scores must be read alongside their components.
- **Word intrusion:** An evaluator identifies an unrelated word inserted into a topic's leading words. High detection accuracy supports the recognizability of that word grouping.
- **Image intrusion:** The same logic can be adapted to visual topics by asking evaluators to identify one image drawn from a different topic. Image selection and the embedding model affect difficulty, and correct intrusion judgments establish coherence rather than substantive validity.
- **Topic intrusion:** An evaluator identifies an unrelated topic among topics associated with a document. This assesses document-topic relevance, but repetitive relevant topics can make the task easier without improving the topic inventory.
- **Classification and clustering:** Classification from topic proportions and clustering agreement with known labels test representation utility. They need not establish that individual topic dimensions have meaningful word descriptions.
- **Label alignment:** Human or LLM judgments can match topics to known categories. This depends on label coverage and evaluator behavior; meaningful themes outside the label set may be missed.
- **Reporting discipline:** State the evaluator, sampled topics and documents, number of runs, and checkpoint-selection criterion. Keep human judgments distinct from automated coherence and LLM ratings.
- **Temporal and hierarchical structure:** Streaming models additionally require assignment stability and semantic-drift measures across updates. Hierarchical models require parent-child coherence and sibling diversity; neither flat coherence nor stability alone establishes a meaningful taxonomy.
- **Efficiency scope:** Distinguish model fitting time from end-to-end processing. For example, [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic]] reports runtime after data loading, so document embedding computation is outside its primary timing comparison.

## Important Papers

- [[papers/topic-modeling-in-embedding-spaces|Topic Modeling in Embedding Spaces]] evaluates predictive document completion separately from a topic-quality product combining NPMI coherence and topic diversity.
- Chang et al. (2009), "Reading Tea Leaves: How Humans Interpret Topic Models," provides the intrusion-task reference used by CGTM.
- Hoyle et al. (2021), "Is Automated Topic Model Evaluation Broken? The Incoherence of Coherence," motivates complementing automatic scores with human assessment.
- [[Neural Topic Modeling via Contextual and Graph Information Fusion]] reports higher coherence and word intrusion scores while trailing FASTopic on document-clustering metrics.
- [[Sparse Autoencoders are Topic Models]] evaluates topic coherence with LLM intruder detection and topic ratings, alongside diversity and topic relevance.
- [[papers/an-image-is-worth-k-topics-a-visual-structural-topic-model-with-pretrained-image-embeddings|An Image is Worth $K$ Topics: A Visual Structural Topic Model with Pretrained Image Embeddings]] adapts intrusion testing to images and compares models with 10, 45, and 150 topics.
- [[papers/vistopics-a-visual-semantic-unsupervised-approach-to-topic-modeling-of-video-and-image-data|VisTopics]] evaluates caption-derived visual topics with image-intrusion and four-way topic-matching tasks completed by two human coders.
- [[papers/fastopic-pretrained-transformer-is-a-fast-adaptive-stable-and-transferable-topic-model|FASTopic: Pretrained Transformer is a Fast, Adaptive, Stable, and Transferable Topic Model]] combines coherence and diversity with clustering, downstream classification, transfer, runtime, and configuration-sensitivity tests.
- [[papers/cobwebtm-probabilistic-concept-formation-for-lifelong-and-hierarchical-topic-modeling|CobwebTM: Probabilistic Concept Formation for Lifelong and Hierarchical Topic Modeling]] evaluates streaming topics with coherence, ARI, centroid drift, and intruder similarity, then evaluates its hierarchy with NPMI, parent-child coherence, and sibling diversity.

## Related Concepts

- [[concepts/embedded-topic-models|Embedded Topic Models]]
- [[Contextual and Graph Fusion for Topic Modeling]]
- [[Hierarchical Topic Models]]
- [[Continuous Topic Models]]
- [[Visual Structural Topic Models]]
- [[LLM-as-a-Judge]]
