---
title: "Impressions: Understanding Visual Semiotics and Aesthetic Impact"
type: paper
authors:
  - Julia Kruk
  - Caleb Ziems
  - Diyi Yang
year: null
tags:
  - visual-semiotics
  - image-captioning
  - multimodal-learning
  - aesthetic-impact
  - human-annotation
---

## TL;DR

Impressions is a dataset for teaching multimodal models to describe not only what an image depicts, but also what viewers may think, feel, or believe and which aesthetic choices produce those responses. It contains 1,440 image-caption pairs and 4,320 annotations spanning pragmatic description, viewer perception, and grounded aesthetic evaluation. Fine-tuning or few-shot adaptation substantially improved human preference for GIT, BLIP, and OpenFlamingo outputs, while gains for an already competitive LLaVA model were modest.

## Research Question

Can image-captioning and vision-language models learn visual connotation, plausible audience impressions, and the contribution of aesthetic design choices rather than remaining limited to literal, denotational descriptions?

## Motivation

Standard caption datasets emphasize objects, entities, actions, shapes, and colors. Those labels support recognition tasks but omit how composition, lighting, perspective, and other stylistic choices shape an image's communicative effect. Drawing on visual semiotics and art-analysis practice, the paper treats an image's perceived meaning, or perlocutionary force, as a learnable target and distinguishes aesthetic impact from beauty alone.

## Contributions

- Introduces Impressions, a photography benchmark with 1,440 images and 4,320 unique annotations covering pragmatic image description, viewer perception, and aesthetic evaluation.
- Collects aesthetic-impact rankings for 3,450 images and uses them to select 1,440 images for free-form annotation.
- Connects subjective impressions to concrete aesthetic elements, including composition, lighting, color, perspective, focus, contrast, motion, expression, and body language.
- Evaluates fine-tuning or few-shot adaptation of GIT, BLIP, OpenFlamingo, and LLaVA with both automatic metrics and human preferences.
- Releases an additional collection of 50,000 New York Times image and leading-paragraph pairs for unsupervised study.
- Explores whether models trained on annotations from different demographic and personality groups develop distinguishable generation patterns.

## Method

The data collection begins with 50,000 photojournalistic anchor images obtained through the New York Times API. For each anchor, caption perturbations generated through summarization, named-entity recognition, and minimal dependency-tree extraction provide Google Image Search queries. Candidate images are filtered using ViT embedding similarity to form semantically related image bins with stylistic variation.

Annotators rank four-image bins by aesthetic impact, defined as the capacity of style and design to attract attention and inspire thought, feeling, or belief. Images with mean impact rank at least 2 are retained for free-form annotation. Each retained image receives responses to three prompts: a pragmatic description that permits reasonable inference, a subjective viewer impression, and an account of the aesthetic elements responsible for that impression. The resulting dataset contains three annotations for each of 1,440 images.

The authors fine-tune GIT and BLIP separately for the three caption types, few-shot adapt OpenFlamingo, and instruction-tune LLaVA across all annotation types. Training uses 1,340 images and 4,020 annotations. Evaluation combines token-overlap metrics with pairwise human judgments on 300 image-prompt pairs per model, using three votes and majority choice for each comparison.

## Experiments

Compared with COCO captions, Impressions annotations have wider sentiment distributions and lower concreteness. Median semantic variance is 0.070 for descriptions, 0.088 for perceptions, and 0.072 for aesthetic evaluations, versus 0.007 for COCO captions. All three Impressions caption types are less concrete than COCO captions at p < 0.001 by t-test.

Human evaluators preferred adapted outputs across all caption types 81.5% of the time for GIT, 80.5% for BLIP, and 85.7% for 16-shot OpenFlamingo. Preference was strongest on image perception and aesthetic evaluation: GIT reached 92% for perception, BLIP reached 88% for aesthetic evaluation, and OpenFlamingo reached 96% and 100% respectively. LLaVA improved only marginally, with 56% overall preference and 59% on aesthetic evaluation, because its base instruction tuning already supported comparatively rich and pragmatic descriptions.

Persona-specific experiments fine-tune eight LLaVA models on 500 annotations each. Introvert- and extrovert-conditioned models differ in generation length at p = 0.026, while models conditioned on no art experience versus at least three years of art experience differ in sentence concreteness at p = 0.012. Agreeableness and occupation contrasts do not yield statistically distinguishable distributions on the tested measures.

## Limitations

- The benchmark contains only 1,440 images and three annotations per image, limiting coverage of visual symbols and the diversity of audience interpretations.
- Permitting pragmatic inference can introduce harmful stereotypes or discriminatory interpretations even though the authors did not observe them during quality checks.
- Moderate agreement on aesthetic-impact ranking (ICC1K = 0.509) reflects the subjectivity of the construct.
- Automatic token-overlap metrics are poorly matched to the legitimate variation among human impressions, and the human evaluation measures preference rather than factual correctness or cultural validity.
- Persona experiments use small subsets and find significant differences for only two of four tested contrasts; they do not establish broad demographic effects.
- The image collection depends on New York Times and Google Search sources, which may constrain the cultural and visual distribution represented.

## Related Concepts

- [[computational-visual-semiotics|Computational Visual Semiotics]]
- Visual connotation
- Pragmatic image captioning
- Aesthetic impact
- Perlocutionary force

## Related Papers

- [[for-a-semiotic-ai-bridging-computer-vision-and-visual-semiotics-for-computational-observation-of-large-scale-facial-image-archives|For a Semiotic AI: Bridging Computer Vision and Visual Semiotics for Computational Observation of Large Scale Facial Image Archives]]: a complementary approach that operationalizes visual semiotic properties as interpretable computer-vision measurements rather than modeling audience responses through captions.
- Achlioptas et al. (2021), "ArtEmis: Affective Language for Visual Art": a related affective-captioning dataset that focuses on emotion, while Impressions also captures thoughts, beliefs, and aesthetic grounding.
- Araujo, Lock, and van de Velde (2020), "Automated Visual Content Analysis (AVCA) in Communication Research": motivates computational analysis of images in communication research but focuses more heavily on observable content.

[[index|Library home]]
