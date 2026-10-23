---
title: "VisTopics: A Visual Semantic Unsupervised Approach to Topic Modeling of Video and Image Data"
type: paper
authors:
  - Ayse D. Lokmanoglu
year: null
tags:
  - visual-topic-modeling
  - video-analysis
  - image-captioning
  - computational-communication
---

## TL;DR

VisTopics turns videos into semantic topics by sampling frames, removing near-duplicates, generating brief image captions with a vision-language model, and applying latent Dirichlet allocation (LDA) to the captions. In 452 sampled NBC News videos, the pipeline reduced 11,070 frames to 6,928 and identified 35 topics. Two human coders achieved 75% image-intrusion accuracy and 86% and 87% topic-matching accuracy, while captioning dominated runtime and introduced cost, bias, privacy, and decontextualization concerns.

## Research Question

Can a configurable, end-to-end pipeline combine video-frame processing, vision-language captioning, and unsupervised topic modeling to recover coherent and interpretable semantic themes from large visual-media collections?

## Motivation

Computational communication research has scalable methods for text but relies more heavily on manual coding or static-image methods for visual data. Video adds temporal redundancy and scale, while conventional visual clustering may group surface appearance without exposing the semantic themes that matter for framing research. The paper therefore uses generated captions as an intermediate representation between frames and researcher-selected text-clustering methods.

## Contributions

- Introduces VisTopics, a six-stage workflow covering collection, frame sampling, near-duplicate reduction, image captioning, topic modeling, and human validation.
- Extends semantic visual clustering from static images to sampled video frames while preserving traceability to source videos.
- Keeps the clustering stage configurable in principle, with LDA, BERTopic, and embedding-based methods discussed as options; the reported case study uses LDA.
- Adapts topic-model intrusion testing to images and supplements it with a topic-matching task.
- Reports stage-level runtime, storage, and captioning cost for an applied news-video corpus.

## Method

The case study sampled 452 videos, or 20% of 2,260 successfully downloaded items from NBC News's *Top News* YouTube playlist. OpenCV extracted one frame per second. FastDup then compared frames within each video and treated pairs above a hash-similarity threshold of 0.8 as duplicates, retaining one representative from each set.

The pipeline prompted GPT-4o to produce a concise description of each retained frame, including recognized public figures but not transcribing all visible text. After removing repeated captions, short entries, punctuation, numbers, stopwords, domain terms, visually descriptive color terms, and extremely common or rare tokens, it fit LDA without stemming. Five-fold cross-validation and perplexity over candidate topic counts from 5 to 100 selected 35 topics and a reported alpha of approximately 0.06. Duplicate captions were reintroduced after modeling and assigned using their corresponding originals.

For [[concepts/topic-model-evaluation|Topic Model Evaluation]], two coders independently completed 105 image-intrusion items and 105 topic-matching items. Each intrusion item mixed five images strongly associated with one topic and one image from another topic. Each matching item asked coders to assign a query frame to one of four rows representing four topics.

## Experiments

Frame extraction produced 11,070 frames in about 32 minutes 25 seconds. Deduplication reduced the collection to 6,928 frames in 1 hour 18 minutes 12 seconds. Captioning those frames took about 10 hours 34 minutes, averaged 5.49 seconds per frame including randomized request delays, and cost $10.88. The paper reports 12 hours 33 minutes 3 seconds for visual-data preparation before clustering.

The 35 LDA topics covered political figures and events, conflict, policing, courts, weather and environmental disasters, transport, health, sports, protests, and broadcast settings. These are themes in the sampled NBC corpus rather than a predefined framing taxonomy.

Both coders identified the intruding image in 75% of cases. Topic-matching accuracy was 86% for one coder and 87% for the other. These results support recognizable within-corpus groupings, but the supplied manuscript does not report chance-adjusted agreement, uncertainty intervals, random baselines, or per-topic error patterns.

## Limitations

- The empirical study covers a 20% sample from one NBC News playlist, so topic prevalence and coherence do not establish generalization across outlets, platforms, periods, languages, or genres.
- One-frame-per-second sampling can miss short events, and within-video hash deduplication may remove subtle but meaningful changes while leaving redundancy across videos.
- Caption-mediated analysis inherits recognition errors, prompt sensitivity, cultural bias, and loss of visual or temporal context from the captioning model. It does not analyze audio or relations across frames.
- Captioning was the slowest stage and used a paid hosted model, limiting reproducibility and access. The manuscript says the package and data locations are redacted for review.
- Perplexity-based model selection and two small human tasks provide partial evidence of coherence, not construct validity for visual framing or audience effects.
- Privacy, consent, data-protection, and misuse risks remain for identifiable people and sensitive imagery; clustering can also decontextualize or selectively amplify content.
- The supplied Markdown provides no publication year, venue, DOI, or arXiv identifier. Its header names Ayse D. Lokmanoglu but contains a second affiliation and email without a second author's name, so the missing author is not inferred here.

## Related Concepts

- [[concepts/automated-visual-framing-analysis|Automated Visual Framing Analysis]]: VisTopics discovers caption-based themes inductively rather than classifying images into a theory-defined frame codebook.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: the study adapts word intrusion to images and adds a four-way visual topic-matching task.
- [[concepts/visual-structural-topic-models|Visual Structural Topic Models]]: an alternative that models continuous image embeddings as mixed-membership observations rather than converting images to captions and applying text LDA.
- [[concepts/computational-visual-semiotics|Computational Visual Semiotics]]: clarifies which visual meanings can be lost when a short generated caption becomes the sole modeling input.

## Related Papers

- Zhang and Peng (2022), "Image Clustering: An Unsupervised Approach to Categorize Visual Data in Social Science Research": motivates scalable unsupervised visual clustering for social research.
- Chang et al. (2009), "Reading Tea Leaves: How Humans Interpret Topic Models": supplies the intrusion-test logic adapted for images.
- [[papers/an-image-is-worth-k-topics-a-visual-structural-topic-model-with-pretrained-image-embeddings|An Image is Worth $K$ Topics: A Visual Structural Topic Model with Pretrained Image Embeddings]]: offers a direct embedding-based visual topic model and also evaluates topics with image intrusion.
- [[papers/evaluating-large-vision-language-models-for-visual-framing-analysis-in-news-imagery-a-theory-driven-benchmark|Evaluating Large Vision-Language Models for Visual Framing Analysis in News Imagery]]: evaluates theory-defined news-image frames against expert labels rather than inducing topics from captions.

[[index|Library home]]
