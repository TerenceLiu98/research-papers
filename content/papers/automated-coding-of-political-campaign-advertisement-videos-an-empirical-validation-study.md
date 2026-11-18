---
title: "Automated Coding of Political Campaign Advertisement Videos: An Empirical Validation Study"
type: paper
authors:
  - Alexander Tarr
  - June Hwang
  - Kosuke Imai
year: 2023
doi: 10.1017/pan.2022.26
tags:
  - political-communication
  - content-analysis
  - multimodal-measurement
---

## TL;DR

A modular audio-and-vision pipeline reproduces many human-coded campaign-ad variables, with particularly strong agreement for opponent mentions. Validation against the Wesleyan Media Project (WMP) also shows why overall agreement needs qualification: rare issue mentions, imperfect human labels, and mismatched coding definitions affect apparent accuracy. Music mood remains harder than factual content detection.

## Research Question

Can automated extraction of speech, on-screen text, faces, and audio features reproduce human coding of political campaign advertisements?

## Motivation

Coding more than a hundred variables per advertisement is costly. Publicly available campaign videos offer opportunities to expand coverage and reduce delays, provided automated measurements are validated against the intended constructs.

## Contributions

- Builds a matched validation corpus linking high-quality YouTube videos to the lower-quality television ads coded by WMP.
- Integrates speech recognition, optical character recognition, face recognition, and music features in the open-source campvideo package.
- Evaluates multiple coding tasks, investigates disagreements using manual review and additional crowd coders, and checks a downstream issue-convergence analysis.

## Method

Spectral audio fingerprints match YouTube and CMAG recordings. All 200 manually checked matching decisions were correct. The matched corpus contains 2,468 videos from the 2012 and 2014 U.S. elections, representing 58.2% of 4,237 CMAG ads in the coverage table.

Video summarization reduces the frame count by approximately 97–99%, retaining representative images for Google Vision text extraction and dlib-based face detection, alignment, and embeddings. Identity matching thresholds distances to candidate reference images. Speech transcription uses Google Video Intelligence with candidate-name hints. Keyword rules combine transcripts and image text for issue and opponent mentions; Obama face recognition supplements issue coding.

Music classification uses 452 audio features and separate radial-basis-function SVMs for three nonexclusive moods. Negativity models use processed bag-of-words features, music features, or both. Negativity evaluation excludes contrast ads, uses an 80/20 training/test split, and tunes models by fivefold cross-validation.

## Experiments

Reported agreement with the original human-coded variables:

| Task | Evaluation set | Result |
| --- | --- | --- |
| Issue mention | 204,844 video–issue pairs across 83 variables | 98.43% audio only; 98.37% audio/visual |
| Opponent mention | 2,449 videos | 93.67% audio only; 96.41% audio/visual |
| Favored/opposing candidate appearance | 767 Senate ads | 80.83% / 90.87% |
| Music mood | 450 held-out videos | 73.56% ominous/tense; 76.44% uplifting; 74.22% sad/sorrowful |
| Positive versus negative tone | 422 held-out videos | 84.12% text; 74.88% music; 84.12% combined, with nonlinear SVM |

Issue agreement is dominated by absent issues. Treating WMP labels as correct, adding visual information reduces the false-negative rate from about 24% to 21%, while the false-positive rate remains below 1%. Additional crowd coding often favors the automated labels in issue disagreements; for music disagreements it more often favors WMP.

Candidate appearance comparisons initially conflate recognition mistakes with differences in whether approval-segment appearances count. After examining definition mismatches and human-label errors, the authors report 96% and 94% accuracy for favored and opposing candidates. These adjusted figures should be distinguished from the original benchmark agreement.

Adding music does not improve negativity accuracy over text alone. A replication of a Senate campaign issue-convergence analysis yields no substantive differences between automated and WMP data, according to the paper's supplementary analysis.

## Limitations

- YouTube recovery varies by party and office; the corpus does not establish performance on all campaign ads or historical low-quality recordings.
- Keyword rules miss contextual issue references. High aggregate agreement does not imply high recall for rare positive labels.
- Summarization discards temporal and motion information and can omit frames needed for recognition; its manual comparison uses only 40 videos.
- Faces in unusual poses or heavily processed images are harder to recognize. The paper discusses possible demographic bias without establishing its extent here.
- Music mood has substantial human disagreement, and automated performance falls below human coding. Negativity results exclude contrast ads and do not establish cross-election generalization.
- Proprietary speech and image-text services limit algorithmic transparency.

## Related Concepts

- [[concepts/political-screen-time-measurement|Political Screen-Time Measurement]]: shares identity recognition, but this study measures whether someone appears rather than duration of exposure.
- [[concepts/frame-differencing-for-motion-measurement|Frame Differencing for Motion Measurement]]: captures temporal information deliberately discarded by the representative-frame approach.

## Related Papers

- [[papers/face-detection-tracking-and-classification-from-large-scale-news-archives-for-analysis-of-key-political-figures|Face Detection, Tracking, and Classification from Large-Scale News Archives for Analysis of Key Political Figures]]: related use of pretrained identity representations for political video measurement, with tracking and screen-time applications.
- [[papers/using-motion-detection-to-measure-social-polarization-in-the-us-house-of-representatives|Using Motion Detection to Measure Social Polarization in the U.S. House of Representatives]]: cited example of extracting different social-scientific measurements from video.

Published in *Political Analysis* 31, 554–574 (2023); first published online 10 November 2022. [Paper](https://doi.org/10.1017/pan.2022.26), [replication materials](https://doi.org/10.7910/DVN/6SWKPR), and [campvideo](https://github.com/atarr3/campvideo).
