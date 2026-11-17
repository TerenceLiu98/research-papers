---
title: "Face Detection, Tracking, and Classification from Large-Scale News Archives for Analysis of Key Political Figures"
type: paper
authors:
  - Andreu Girbau
  - Tetsuro Kobayashi
  - Benjamin Renoust
  - Yusuke Matsui
  - Shin’ichi Satoh
year: 2023
doi: 10.1017/pan.2023.33
tags:
  - computer-vision
  - political-communication
  - face-tracking
  - content-analysis
---

## TL;DR

A pretrained face-detection and embedding pipeline measures political figures’ appearances in television archives using only 3–5 reference images per person, without retraining for new identities. Clustering detections into tracklets and voting over template matches yields F1 scores of 0.885 on U.S. news and 0.815 on Japanese news, under different evaluation protocols.

## Research Question

Can researchers identify and track selected political figures across large television archives without training a separate classifier whenever the target individuals change?

## Motivation

Manual video coding limits the scale and temporal granularity of political communication research. Automated identity recognition can measure visibility continuously across available footage, supporting studies of media attention and screen-time balance while leaving interpretation of framing and meaning to additional methods.

## Contributions

- Combines pretrained detection, face embeddings, hierarchical clustering, and tracklet voting into a reusable recognition pipeline.
- Validates recognition across three U.S. channels and two Japanese news programs with different target identities.
- Demonstrates candidate screen-time comparisons and longitudinal comparisons of incumbent visibility across Japanese broadcasters.

## Method

The pipeline samples video at one frame per second. YOLO5-face detects faces; FaceNet with an Inception-ResNet-v2 backbone trained on VGGFace2 produces 512-dimensional embeddings for detections and reference images. Average-linkage hierarchical clustering (UPGMA) groups video face embeddings into tracklets.

Each detection votes for its nearest reference embedding under cosine distance, or for an unknown identity when the distance exceeds a threshold. The winning tracklet label is accepted only when its vote share exceeds 0.7; otherwise the tracklet is unknown. This label propagates to the detections in the tracklet. New target identities require reference images rather than network retraining. The method estimates [[concepts/political-screen-time-measurement|Political Screen-Time Measurement]] from recognized appearances.

## Experiments

The U.S. evaluation contains 4,346 sparsely annotated frames for 53 individuals from 874 sampled programs totaling 1,140 hours, evaluated over 2012–2019. The Japanese benchmark contains 19,823 frames and 29,000 bounding boxes for 41 politicians, with NHK annotations covering 2013–2021 and HODO Station annotations covering 2014–2021.

| Configuration | U.S. overall F1 | Japanese overall F1 |
| --- | ---: | ---: |
| YOLO + KNN | 0.807 | 0.756 |
| YOLO + centroid | 0.873 | 0.785 |
| YOLO + tracklet voting | 0.885 | 0.815 |

Tables 4–5 report precision/recall of 1.00/0.79 for the U.S. voting configuration and 0.85/0.78 for Japan. U.S. evaluation only counts detections associated with annotated ground truth, whereas Japanese evaluation also counts background people incorrectly labeled as targets. These scores therefore do not establish directly comparable cross-country accuracy. The cited Hong et al. baseline has U.S. F1 of 0.768.

YOLO misses 0.81% of annotated faces overall, compared with 4.61% and 5.54% for the other detectors (Table 3). Tracking improves F1 across every tested detector and channel (Table 6). Small faces remain difficult. The authors also report that clustering alone sacrifices performance relative to trained classifiers; improved embeddings and tracking compensate for that loss in the complete pipeline.

In sampled 2016 election footage, Trump receives approximately 1.5 times Cruz’s Republican-primary screen time, and Clinton approximately 1.3 times Sanders’s Democratic-primary screen time. These are sample-based totals, not full-archive estimates. In the Japanese application, incumbent leaders’ share on NHK rises above 80% by late 2022; the NHK/HODO share ratio reaches about 1.3. The authors interpret this as increasing imbalance under stopwatch fairness.

## Limitations

- Visible identity does not measure sentiment, framing, speaking time, or audience effects. The paper does not integrate voice, movement, captions, or music.
- One-frame-per-second sampling limits temporal resolution, despite the general goal of frame-level recognition.
- Sparse U.S. annotations omit some false-positive opportunities; Japanese evaluation is more comprehensive.
- Very small faces reduce performance. Template matching and clustering errors can affect downstream screen-time estimates.
- Screen-time differences are descriptive. Pandemic press conferences and other programming differences may affect incumbent exposure; visibility alone cannot establish favorable treatment or causal political influence.
- The source describes Japanese benchmark coverage through 2021 but its application extends through 2022; these are distinct analysis windows.

## Related Concepts

- [[concepts/political-screen-time-measurement|Political Screen-Time Measurement]]: the substantive outcome derived from recognized appearances.
- [[concepts/visual-political-bias|Visual Political Bias]]: screen-time imbalance captures visibility, while broader bias also concerns portrayal and context.
- [[concepts/automated-visual-framing-analysis|Automated Visual Framing Analysis]]: a complementary task concerned with meaning rather than identity alone.

## Related Papers

- Hong et al. (2021), “Analysis of Faces in a Decade of US Cable TV News”: supplies U.S. annotations and a recognition baseline requiring retraining for new identities.
- Tarr, Hwang, and Imai (2023), “Automated Coding of Political Campaign Advertisement Videos: An Empirical Validation Study”: discussed as a summary-image approach that does not directly recover continuous screen time.

Code: https://github.com/TeleStats/KAO. Replication data: https://doi.org/10.7910/DVN/TBWMCG.
