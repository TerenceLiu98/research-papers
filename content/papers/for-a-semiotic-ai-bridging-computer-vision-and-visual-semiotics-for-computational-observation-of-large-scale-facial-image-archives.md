---
title: "For a Semiotic AI: Bridging Computer Vision and Visual Semiotics for Computational Observation of Large Scale Facial Image Archives"
type: paper
authors:
  - Lia Morra
  - Antonio Santangelo
  - Pietro Basci
  - Luca Piano
  - Fabio Garcea
  - Fabrizio Lamberti
  - Massimo Leone
year: null
tags:
  - computational-visual-semiotics
  - computer-vision
  - image-retrieval
  - digital-humanities
  - social-media-analysis
---

## TL;DR

FRESCO operationalizes structural visual semiotics as a computer-vision pipeline for large facial-image archives. It converts plastic, figurative, and enunciational properties into interpretable variables and combines them in a configurable image-similarity score. Tests on 10,000 FFHQ in-the-wild images and 2,002 face-filtered OpenImages examples show useful cross-model consistency and qualitatively coherent retrievals, while also exposing model errors, demographic imbalance, out-of-distribution failures, and the framework's inability to represent meaning created by absent or culturally implied elements.

## Research Question

How can concepts from visual semiotics be mapped to measurable computer-vision outputs so that humanities researchers can inspect, compare, retrieve, and cluster large collections of human-centered images without reducing interpretation to an opaque embedding distance?

## Motivation

Humanities scholars have rich qualitative methods for interpreting images but limited means to apply them at the scale of social-media archives. Existing computational systems often emphasize isolated low-level features or task-specific predictions. FRESCO instead seeks a broad, theory-guided description of how visual meaning is organized, while retaining variables that researchers can inspect and analyze.

## Contributions

- Introduces FRESCO (Face Representation in E-Societies through Computational Observation), a [[computational-visual-semiotics|Computational Visual Semiotics]] framework centered on social-media and facial imagery.
- Maps semiotic categories to computer-vision tasks and structured numerical or categorical outputs.
- Organizes image analysis into plastic, figurative, and enunciational levels rather than treating similarity as one undifferentiated feature-space distance.
- Proposes FRESCO-Score, a configurable hierarchy of similarity measures that can expose which visual properties make two images alike or different.
- Evaluates agreement among component models and demonstrates image retrieval on two public image collections.

## Method

FRESCO.v1 combines open-source pretrained models with geometric and image-processing calculations. Its plastic level represents lines, color, brightness, saturation, object position, depth, and spatial coverage. Its figurative level represents topics, people and objects, facial attributes, scenes, captions, poses, and emotions. Its enunciational level approximates the viewer's and depicted subjects' positions through framing, depth, head pose, and gaze.

The implementation uses task-specific models including RetinaFace, MediaPipe, PifPaf, 6DRepNet, 3DGazeNet, EmoNet, FACER, DeepFace, PRISMER and associated expert models, RAM++, and Places365. Their spatial or unstructured outputs are summarized as interpretable image-level and instance-level measurements.

FRESCO-Score compares image-level features directly and first matches object or person instances between images by category and centroid position. The matching uses linear assignment with squared Euclidean centroid distance. Feature-specific similarities are normalized, aggregated into correlated groups, then averaged into plastic, figurative, and enunciational scores. Configurable weights combine those three scores into an overall value. Unmatched instances receive the minimum similarity.

## Experiments

The evaluation uses the 10,000-image FFHQ in-the-wild validation set and 2,002 images selected from the MIAP extension of OpenImages v7 for the presence of at least one visible human face.

Cross-model checks compare face detection, object detection, segmentation, tagging, and captioning. On OpenImages, the proportion of images identified as containing people ranges from 88.31% for object detection to 96.10% for tagging. On FFHQ in-the-wild, all six compared tasks identify people in at least 99.21% of images. These differences are not direct rankings of model quality because faces may be occluded or turned away and the models use different label spaces.

For topic consistency on OpenImages, image tagging produces the broadest label set. At a CLIP text-similarity threshold of 0.80, semantic segmentation contributes about 20% additional topics beyond tags and object detection about 10%. Semantic segmentation also contributes 50.54% additional topics beyond object detection, reflecting its coverage of both countable objects and background classes.

The authors inspect retrieved images ranked by the overall score, the three level scores, and individual characteristics. Plastic rankings emphasize color and spatial arrangement; figurative rankings recover similar people and attributes; enunciational rankings emphasize camera distance, scene, head pose, and gaze. This is a qualitative retrieval demonstration rather than a labeled quantitative benchmark of semantic similarity or downstream research validity.

## Limitations

- Component errors propagate into the structured representation. The paper itself shows an incorrect age estimate and a captioning error, and recommends using disagreement among models as an uncertainty signal.
- Closed-label classifiers can fail on out-of-distribution images. Sketches and cartoons in OpenImages particularly challenge face-oriented models trained on photographs.
- Both evaluation datasets are demographically imbalanced, with the estimated ethnicity distributions dominated by white and Asian categories.
- Equal averaging can obscure a property that matters to a particular research question. The component scores have different empirical distributions, and the paper does not calibrate them to a target population.
- Instance matching relies on category and spatial proximity; it does not establish semantic correspondence between people or objects.
- Retrieval quality is judged visually. The study does not validate whether FRESCO measurements answer substantive humanities questions or reproduce expert semiotic interpretations.
- Structural semiotics treats absences and contrasts with cultural conventions as meaningful, but FRESCO.v1 primarily represents visible content. It lacks the external and commonsense knowledge needed to model what an image omits.
- The supplied source does not report a publication year or stable article identifier, so those metadata are left unset here.

## Related Concepts

- [[computational-visual-semiotics|Computational Visual Semiotics]]
- [[visual-structural-topic-models|Visual Structural Topic Models]]
- [[visual-political-bias|Visual Political Bias]]

## Related Papers

- Mannisto et al. (2022), "Automatic Image Content Extraction: Operationalizing Machine Learning in Humanistic Photographic Studies of Large Visual Archives": the closest prior framework discussed by the authors, using visual grammar to organize computational analysis of photographic archives.
- Arnold and Tilton (2019), "Distant Viewing: Analyzing Large Visual Corpora": cited as a semiotically informed approach to computational study of visual collections.
- [[an-image-is-worth-k-topics-a-visual-structural-topic-model-with-pretrained-image-embeddings|An Image is Worth K Topics: A Visual Structural Topic Model with Pretrained Image Embeddings]]: a complementary library paper that represents large image collections through mixed-membership topics rather than hand-mapped semiotic variables; this connection is not made in the FRESCO paper.

[[index|Library home]]
