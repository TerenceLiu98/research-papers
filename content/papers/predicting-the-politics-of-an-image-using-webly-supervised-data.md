---
title: "Predicting the Politics of an Image Using Webly Supervised Data"
type: paper
authors:
  - Christopher Thomas
  - Adriana Kovashka
year: 2019
venue: NeurIPS 2019
arxiv: "1911.00147"
source_job_id: "12bbf5d7-e889-4afe-94fe-bd54c849232f"
tags:
  - visual-political-bias
  - weakly-supervised-learning
  - multimodal-learning
  - computer-vision
  - political-communication
---

## TL;DR

This paper predicts whether a news image came from a left- or right-leaning media source. Its two-stage model first combines a ResNet image representation with a 200-dimensional Doc2Vec embedding of the paired article, then removes the text input and trains an image-only classifier over the learned visual features. On 75,148 held-out images labeled by source leaning, the image-only model reaches 0.712 accuracy, compared with 0.678 for a standard ResNet and 0.686 for an OCR baseline. The task remains difficult because political meaning can depend on portrayal and article context rather than visible objects alone.

## Research Question

Can paired article text serve as privileged training information that guides a visual classifier toward the semantic cues needed to predict an image's political leaning, while allowing inference from the image alone at test time?

## Motivation

Visual political bias is expressed through topic choice, framing, symbols, and the portrayal of people or events. The same object can appear across the political spectrum, and one topic can be depicted through many visually different scenes. This creates substantial within-class variation for an image-only classifier. The authors therefore use the article associated with each image as an auxiliary semantic signal during training, while defining the target label as the leaning of the source that published the pair.

## Contributions

- Introduces a large webly supervised collection of politically labeled images paired with news articles: 1,861,336 collected images, reduced to 1,079,588 unique images after near-duplicate removal.
- Proposes a two-stage multimodal-to-visual training procedure that uses article text to shape visual features without requiring text at inference time.
- Evaluates the method on source-based weak labels and on a separate human annotation study covering 3,237 images, with 993 receiving a clear left/right label from at least a majority of annotators.
- Analyzes the visual concepts, facial portrayals, cross-politics nearest neighbors, image-to-word alignment, and Grad-CAM++ explanations learned by the model.

## Method

The dataset contains image, article, and binary leaning tuples. Left/right labels are inherited from the source outlet, so they are noisy: a source may publish an image or article that discusses an opposing position. The authors deduplicate images using ResNet features and approximate nearest-neighbor search, retaining one pair from each duplicate group.

In stage one, Doc2Vec embeds each paired article into a 200-dimensional document vector. A ResNet-50 image pathway and the document vector are concatenated in a linear fusion layer, and the resulting multimodal representation predicts the source leaning. The model is initialized from ImageNet, trained with Adam and class-weighted cross-entropy, and uses random horizontal flips.

In stage two, the convolutional parameters learned with the text channel are frozen. A new linear classifier is trained on the visual features alone. This removes the test-time text dependency while retaining visual representations shaped by the paired article signal. The design is related to [[concepts/visual-political-bias|Visual Political Bias]] and to learning with privileged information, but the paper does not claim that the classifier recovers a context-free or normatively objective political ideology.

## Experiments

### Weakly supervised evaluation

On 75,148 held-out images, the reported accuracies are:

| Method | Accuracy |
| --- | ---: |
| RESNET | 0.678 |
| JOO | 0.670 |
| HUMAN CONCEPTS | 0.675 |
| OCR | 0.686 |
| OURS | 0.712 |
| OURS (GT text at test time) | 0.803 |

The full two-stage method improves on the ResNet baseline by 3.4 percentage points and classifies 2,555 additional images correctly. The ground-truth-text result is an upper bound for the visual-only task, not a deployable version of the proposed inference setting.

### Human consensus evaluation

On images for which at least a majority of MTurk annotators agreed on a left/right label, the proposed method has the highest average accuracy across the eight annotator-selected feature categories, at 0.620. OCR performs better for images containing logos or text, HUMAN CONCEPTS performs better when annotators rely on a known person, and JOO performs better for the no-people category. The proposed method performs best in four of the eight categories.

### Ablations and qualitative analysis

Zeroing the text weights after stage one gives 0.677 accuracy, showing that retraining the image-only classifier in stage two matters. Training with only the first 1, 2, 5, or 10 article sentences gives 0.672, 0.669, 0.668, and 0.669, respectively, below the 0.712 result using the full article. Leaving out training images from several individual media sources causes only modest decreases, although the paper's source-specific checks do not eliminate all dataset or outlet confounding.

The qualitative analyses show that the model attends to logos and public-figure faces, and can associate visual patterns with article words such as "antifa," "brutality," "immigrant," and "LGBT." The authors also find that visually similar left/right pairs can differ in subtle portrayals, such as the emotional framing of a protest or the depiction of a political event.

## Limitations

- The target is outlet-source leaning, not a direct ground-truth measure of an image's intrinsic political meaning. Images can be used critically or placed in articles whose context changes their interpretation.
- The corpus is assembled from selected contemporary US news sources and politically salient search topics. Results may not generalize to other countries, periods, outlets, or visual genres.
- Web supervision is noisy and source-specific. Human consensus is available for a much smaller selected subset and is itself based on judgments that can rely on stereotypes or external knowledge.
- The visual-only model still cannot access article context at inference time, which explains failures on images whose label depends mainly on accompanying text.
- The reported classification accuracy does not establish causal media influence, fairness, or that the learned visual cues represent political ideology rather than recurring outlet and topic correlations.

## Related Concepts

- [[concepts/visual-political-bias|Visual Political Bias]]: the paper's target construct and measurement setting.
- [[concepts/media-ecology|Media Ecology]]: situates images, articles, outlets, audiences, and political contexts in a wider communication environment.
- [[concepts/political-polarization|Political Polarization]]: broader political separation, distinct from the paper's binary source-leaning label.
- [[concepts/text-embedding-models|Text Embedding Models]]: the article representation uses Doc2Vec-style document embeddings.

## Related Papers

- [[papers/media-bias-and-polarization-through-the-lens-of-a-markov-switching-latent-space-network-model|Media Bias and Polarization Through the Lens of a Markov Switching Latent Space Network Model]]: estimates outlet leaning from audience networks and text-derived slant rather than image classification; not a cited comparison in this paper.
- Peng (2018), "Same candidates, different faces: Uncovering media bias in visual portrayals of presidential candidates with computer vision": cited related work on visual portrayals of political candidates.
- Joo, Li, Steen, and Zhu (2014), "Visual persuasion: Inferring communicative intents of images": cited baseline adapted for political-bias prediction.
- Le and Mikolov (2014), "Distributed representations of sentences and documents": cited source of the document-embedding method.

[[index|Library home]]
