---
title: "An Image is Worth $K$ Topics: A Visual Structural Topic Model with Pretrained Image Embeddings"
type: paper
authors:
  - Matías Piqueras
  - Alexandra Segerberg
  - Matteo Magnani
  - Måns Magnusson
  - Nataša Sladoje
year: 2025
arxiv: "2504.10004"
tags:
  - visual-topic-modeling
  - political-communication
  - computer-vision
  - bayesian-inference
  - computational-social-science
---

## TL;DR

This paper introduces the visual Structural Topic Model (vSTM), which represents each image embedding as a mixture of latent topic embeddings and models topic prevalence as a function of covariates. On 154,177 images from highly active Twitter/X accounts discussing COP21-COP27, a 45-topic CLIP-based model produces coherent mixed-membership topics and reveals differences in visual-topic use across actor types, climate-action stances, and conferences.

## Research Question

How can researchers discover mixed visual themes in unlabeled image collections while directly estimating how topic prevalence varies with image-level or account-level covariates?

## Motivation

Political images combine objects, composition, color, perspective, and contextual meaning. Bag-of-visual-words and object-count approaches reduce this information to discrete features, while ordinary clustering assigns each image to one group and cannot directly model topic prevalence as a function of metadata. The paper seeks to retain the semantic information in pretrained image embeddings while recovering the mixed membership and covariate structure of a structural topic model.

## Contributions

- Defines a mixed-membership topic model for real-valued image embeddings, with each observation modeled as a convex combination of topic embeddings.
- Uses a logistic-normal prior whose mean depends on covariates, enabling topic-prevalence comparisons and correlations among topics.
- Develops mean-field variational inference with minibatching and an optional amortized inference network for large image collections.
- Provides model-selection and interpretation procedures for visual topics, including held-out perplexity, coherence, exclusivity, embedding-space inspection, mixed-image inspection, and an image-intrusion validation task.
- Demonstrates the model on climate-communication images and analyzes variation by actor type, climate-action stance, and COP year.

## Method

For image $i$, the vSTM takes a pretrained embedding $z_i \in \mathbb{R}^D$ and models it as Gaussian around the convex combination $\sum_k \theta_{ik}\beta_k$, where $\beta_k$ is a topic embedding and $\theta_i$ is the image's simplex-valued topic mixture. A logistic-normal prior places the mean of the latent topic proportions at $x_i\Gamma$, linking covariates $x_i$ to topic prevalence. Its covariance is decomposed into topic standard deviations and an LKJ-regularized correlation matrix, which also supports analysis of topic co-occurrence.

The posterior is approximated with reparameterized mean-field variational inference. Minibatches scale the local likelihood and topic-proportion terms for stochastic optimization. When maintaining separate variational parameters for every image is infeasible, a neural network can map an image embedding and covariates to the parameters of its approximate topic-proportion posterior, trading scalability for a possible amortization gap.

## Experiments

The application uses 154,177 unique images posted with COP21-COP27 hashtags by 1,707 highly active Twitter/X accounts. Accounts are manually coded into six actor types and as for, against, or unclear toward climate action. The model uses 768-dimensional CLIP embeddings and includes actor type interacted with stance, their main effects, and COP year as prevalence covariates. A NumPyro implementation is trained for 25,000 iterations with batches of 5,280; the paper reports a training time below 20 minutes on a modern laptop.

Models with 10 to 150 topics are compared using five-fold held-out perplexity, coherence, exclusivity, qualitative inspection, and a two-dimensional embedding-space projection. The authors select $K=45$ as a balance among predictive fit, topic cohesion, and distinctness. The topics include event flyers, climate panels, causes and consequences, nature, climate activism, policy documents, diplomacy, and renewable energy. Mixed-membership examples distinguish different representations within broad themes, while positive topic correlations form meta-topics around broader climate perspectives, the conference itself, and textual or promotional material.

The covariate analysis suggests that actor types and opposing climate-action stances often use different visual topics. Advocacy and political accounts show stance-related separation; highly active private accounts on both sides post climate-activism imagery but portray it differently. The authors explicitly treat these empirical findings as illustrative because the sample contains few highly active accounts opposed to climate action and includes unique images from prolific accounts rather than the most popular content.

For human validation, four researchers each complete 100 image-intrusion evaluations per model for $K=10$, $45$, and $150$. Evaluators identify the intruder substantially more often than chance. The 45- and 150-topic models are indistinguishable and perform slightly better than the 10-topic model, supporting coherence but not by itself establishing substantive usefulness.

## Limitations

The visual themes depend on what the selected embedding model preserves; pretrained models can encode stereotypes, power relations, and priorities inherited from their training data. Topic embeddings are not directly interpretable, so labels require visual inspection and domain judgment. Topic models may split one concept across topics or combine several concepts, and image-intrusion performance measures only one form of coherence.

Mean-field variational inference can underestimate posterior variance, making uncertainty estimates unreliable, while amortization can add approximation bias. The empirical application is also limited by account selection, the small number of anti-climate-action accounts, and its focus on unique images rather than popularity or exposure. Code and an open-source package were promised for release upon publication but were not available in the source version.

## Related Concepts

- [[Visual Structural Topic Models]]
- [[Continuous Topic Models]]
- [[Amortized Variational Inference]]
- [[Topic Model Evaluation]]
- [[Visual Political Bias]]

## Related Papers

- Roberts et al. (2014), "Structural Topic Models for Open-Ended Survey Responses."
- Zhang and Peng (2022), "Image Clustering: An Unsupervised Approach to Categorize Visual Data in Social Science Research."
- Torres (2024), "A Framework for the Unsupervised and Semi-Supervised Analysis of Visual Frames."
- [[Sparse Autoencoders are Topic Models]]

[[index|Library home]]
