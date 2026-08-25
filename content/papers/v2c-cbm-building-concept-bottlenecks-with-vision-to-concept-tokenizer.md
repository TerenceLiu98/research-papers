---
title: "V2C-CBM: Building Concept Bottlenecks with Vision-to-Concept Tokenizer"
type: paper
authors:
  - Hangzhou He
  - Lei Zhu
  - Xinliang Zhang
  - Shuang Zeng
  - Qian Chen
  - Yanye Lu
year: null
repository: "https://github.com/riverback/V2C-CBM"
tags:
  - concept-bottleneck-models
  - vision-language-models
  - visual-concept-discovery
  - image-quantization
  - few-shot-learning
---

## TL;DR

This paper introduces a Vision-to-Concept (V2C) tokenizer that discovers concise, visual concepts directly from images rather than asking a large language model to describe each class. It filters a vocabulary of common words with a vision-language model and task-related unlabeled images, then uses the resulting concept codebook to build V2C-CBM. The method is competitive with language-model-guided concept bottleneck models across ten image-classification datasets and exceeds CLIP linear probing on ImageNet in the reported evaluation.

## Research Question

Can a concept bottleneck model obtain task-relevant, visually grounded concepts from multimodal image features and unlabeled images without expert concept annotation, large language model prompting, or an additional sparse autoencoder?

## Motivation

Concept Bottleneck Models make predictions through human-interpretable intermediate variables, but manually labeling concepts is costly and limits scale. Language-model-guided CBMs reduce this burden, yet generated descriptions can be verbose, combine several attributes, or contain non-visual information that a vision encoder cannot reliably detect. The paper asks whether unlabeled images and a fixed vocabulary can provide a more concise and vision-oriented bottleneck.

## Contributions

- Introduces a V2C tokenizer that quantizes image features into nearby visual concepts from a text-derived codebook.
- Uses common English words, adjective-noun bigrams, and relational adjective-noun trigrams as a base vocabulary, then filters concepts by similarity and frequency on task-related unlabeled images.
- Builds V2C-CBM by using the tokenizer's concepts as a bottleneck and learning only a class-concept weight matrix.
- Shows that the approach can discover concise concepts such as "black head" and "white" for ImageNet classes without LLM-generated descriptions.
- Studies the effects of unlabeled-data scale, vocabulary composition, concept combinations, class-feature sources, and prior-based initialization.

## Method

Given class names or few-shot images, the method first computes class-related features with the text or vision encoder of CLIP. It selects the most similar images from an unlabeled image pool to form a class-related quantization set. The default pool contains 200,000 randomly sampled ImageNet training images.

The initial concept vocabulary contains frequent English words and is expanded with adjective-noun bigrams and relational trigrams. Concepts containing dataset class names are removed to avoid information leakage. For each quantization image and its random crops and rotations, the text and image encoders compute concept-image similarities. Low-similarity concepts are treated as non-visual, and concepts that occur infrequently are removed. The top 500 concepts for each class form the final codebook.

The V2C tokenizer maps an image feature to its top-K nearest codebook concepts using squared Euclidean distance between the image feature and concept text embeddings. Class-specific few-shot images are tokenized, and frequent concepts form the class bottleneck. V2C-CBM then predicts concepts with CLIP cosine similarities and applies a softmax-normalized linear class-concept matrix $W$ to produce the label prediction. The method uses concept-prior initialization for one- and two-shot settings and random initialization for larger labeled sets.

## Experiments

The evaluation covers CIFAR-10, CIFAR-100, ImageNet, Aircraft, CUB, Flower, Food-101, DTD, RESISC45, and HAM10000. The implementation uses CLIP ViT-L/14, a 200k-image unlabeled pool, 50 concepts per class, and the top five concepts per image for frequency updates.

In the ten-dataset comparison, V2C-CBM reports accuracies of 60.7% on Aircraft, 98.0% on CIFAR-10, 86.4% on CIFAR-100, 83.0% on CUB, 78.2% on DTD, 98.8% on Flower, 92.8% on Food-101, 81.0% on HAM10000, 92.6% on RESISC45, and 84.1% on ImageNet. These results are generally comparable to the reported label-free and language-guided CBM baselines. On ImageNet, V2C-CBM exceeds the reported CLIP linear-probe accuracy of 83.9% with 84.1%.

Across the nine few-shot datasets, average accuracy is 58.1%, 64.1%, 71.1%, 75.8%, and 79.7% for 1, 2, 4, 8, and 16 shots. The reported average for LaBo is higher at one and two shots (63.0% and 67.7%), but V2C-CBM exceeds LaBo from four shots onward and reaches 85.6% when all training images are used, compared with 85.2% for LaBo.

The ablations show that increasing the unlabeled pool from 1k to 200k generally improves accuracy; on RESISC45, accuracy rises from 90.2% to 92.6%. Combining atomic words, bigrams, and trigrams performs best in the reported Food and RESISC45 comparisons. On Food, a vocabulary unrelated to the task lowers one-shot accuracy from 58.6% to 29.7%, while concept-prior initialization helps at one and two shots and random initialization is stronger with more labels. Vocabulary sizes from 3k to 30k produce similar RESISC45 results, suggesting limited sensitivity to larger vocabularies.

## Limitations

V2C-CBM is weaker than language-model-guided LaBo in the most data-scarce one- and two-shot settings, especially for fine-grained categories where robust descriptions require more visual evidence. The discovered concepts depend on the CLIP encoders, the chosen word vocabulary, and the unlabeled image distribution; a task-unrelated vocabulary can substantially reduce performance. The paper also evaluates image classification with one CLIP backbone and does not establish that visually concise concepts guarantee faithful or trustworthy explanations. Evaluating trustworthiness for open-vocabulary VLM-based CBMs is identified as future work.

## Related Concepts

- [[Concept Bottleneck Models]]
- [[Vision-to-Concept Tokenizers]]
- [[Text Embedding Models]]
- [[Sparse Autoencoders]]
- Image quantization
- Few-shot learning

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-Free Concept Bottleneck Models."
- Yang et al. (2023), "Language in a Bottle: Language Model Guided Concept Bottlenecks for Interpretable Image Classification."
- Menon and Vondrick (2023), "Visual Classification via Description from Large Language Models."
- Rao, Mahajan, Bohle, and Schiele (2024), "Discover-then-Name: Task-Agnostic Concept Bottlenecks via Automated Concept Discovery."
- [[Language Guided Concept Bottleneck Models for Interpretable Continual Learning]]
