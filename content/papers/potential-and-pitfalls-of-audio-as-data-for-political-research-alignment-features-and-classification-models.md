---
title: "Potential and Pitfalls of Audio as Data for Political Research: Alignment, Features, and Classification Models"
type: paper
authors:
  - Rafael Mestre
  - Matt Ryan
year: 2026
doi: "10.1017/pan.2025.10031"
tags:
  - audio-as-data
  - political-methodology
  - political-communication
  - speech-emotion-recognition
---

## TL;DR

Using televised U.S. presidential and vice-presidential debates from 1960 to 2020, Mestre and Ryan demonstrate transcript alignment, acoustic characterization, speaker identification, and emotion classification. Wav2Vec 2.0 embeddings substantially outperform the tested MFCC-based classifier when distinguishing many speakers. Emotion outputs remain exploratory: recording conditions, speaker characteristics, and training-domain biases prevent treating predicted anger or dominance as validated measures of political behavior.

## Research Question

How can political researchers align existing transcripts with audio and choose among low-level acoustic descriptors, Mel-frequency cepstral coefficients (MFCCs), and learned audio embeddings for speech analysis? What validation is needed before interpreting their outputs substantively?

## Motivation

Transcripts omit vocal delivery, while many political archives provide audio and text without utterance-level synchronization. This alignment gap limits multimodal analysis. The paper introduces accessible workflows while emphasizing that computational classification accuracy and the validity of a political or emotional construct are separate questions.

## Contributions

- Demonstrates four applications of [[audio-as-data|Audio as Data]] on a historical debate corpus, connecting feature selection to research tasks.
- Evaluates MFCC-based [[forced-alignment|Forced Alignment]] with repeated human ratings and identifies short utterances as a failure case.
- Compares a custom MFCC convolutional classifier with a simple classifier over pretrained Wav2Vec 2.0 embeddings.
- Examines categorical and dimensional [[speech-emotion-recognition|Speech Emotion Recognition]], highlighting disagreements and the need for speaker-specific human validation.
- Provides aligned data, results, and replication code through [Harvard Dataverse](https://doi.org/10.7910/DVN/K3I16E) and the authors' [repository](https://github.com/rafamestre/audio-as-data).

## Method

The authors extend the USElecDeb60To16 transcripts with 2020 debates and correct omissions, pairing them with videos from the Commission for Presidential Debates. Section 2 reports 45 videos totaling 243,023 seconds, approximately 67.5 hours, and 47,150 transcript sentences, including 38,649 candidate sentences.

1. **Alignment:** Aeneas synthesizes speech from the transcript and aligns its MFCC sequence with recorded audio through dynamic time warping. A sample of 500 randomly selected utterances receives five human ratings per utterance on a 1--5 alignment scale.
2. **Acoustic characterization:** pYIN estimates pitch in rolling 32 ms windows. Root-mean-squared energy is normalized by the corresponding debate's average loudness; within-speaker pitch trajectories are compared relative to each speaker's debate baseline and averaged over five-second windows.
3. **Speaker identification:** A CNN with two convolution, pooling, and dropout blocks processes MFCCs. A single-layer neural classifier maps 768-dimensional Wav2Vec 2.0 utterance embeddings to speaker labels. Evaluations cover individual debates, all speakers across debates, and candidates across debates.
4. **Emotion classification:** A SpeechBrain model trained on IEMOCAP predicts anger, happiness, sadness, or neutral speech. A model from Wagner et al. (2023) predicts arousal, dominance, and valence. Audio predictions are also compared with text-based emotion and sentiment classifications.

## Experiments

### Alignment

Section 4.1 reports annotator percentage agreement of 85.26% and distance-based agreement of 95.76%. These measure agreement among raters, not timestamp accuracy. Most annotations give the highest alignment rating; 5% of text--audio pairs are described as completely unaligned. Short or interrupted sentences are more difficult to align.

### Speaker Identification

Table 3 reports the following test accuracies. The individual-debate row gives the paper's reported mean and variability across debates.

| Scenario | MFCC CNN | Wav2Vec 2.0 classifier |
| --- | ---: | ---: |
| Individual debates | 0.888 +/- 0.085 | 0.974 +/- 0.024 |
| All debates, 156 speakers | 0.08103 | 0.913568 |
| All debates, 34 candidates | 0.134088 | 0.945769 |

The embedding classifier performs much better as the number of identities increases. This comparison concerns these particular model configurations; it does not establish an intrinsic ceiling for MFCC-based systems.

### Acoustic and Emotion Analyses

The paper illustrates between-speaker pitch and energy differences and greater pitch variation in the displayed 2020 debate than in the 1960 debate. These are descriptive comparisons vulnerable to changes in recording conditions and debate norms.

The categorical audio model assigns many utterances to anger or neutral speech, whereas the text emotion classifier labels most utterances neutral. Some higher-pitched candidates receive more anger labels. The authors contrast their outputs with published expert coding of the first 2016 Trump--Clinton debate and caution that assertive delivery may be mistaken for anger. Dimensional predictions similarly place some speakers high in arousal and dominance, without establishing their actual emotional states.

The cited 75.3% categorical emotion accuracy and concordance correlations of 0.744 for arousal, 0.655 for dominance, and 0.638 for valence come from the underlying models' external evaluations. They are not validation scores on this political-debate corpus.

## Limitations

- Microphone placement, compression, sampling, and recording technology confound comparisons across speakers and decades. Normalization helps but does not establish comparability or causal effects of delivery.
- Acoustic features covary: pitch alone cannot identify emotional intensity, intent, or persuasion. Emotion labels also depend on cultural expectations, audience interpretation, and training data.
- Gender, ethnicity, accent, and pitch may affect classifier errors. The paper calls for human-coded, speaker-dependent checks and within-speaker comparisons; it does not establish unbiased emotion measurement in debates.
- The supplied Markdown gives inconsistent corpus counts. Section 2 reports 47,150 sentences and lists 34 candidates, 82 moderators/panelists, and 59 audience members. Section 4.3 instead reports 44,559 sentences, 36,833 candidate sentences, and 156 distinct speakers. These could reflect different processing stages, but the supplied text does not explain the discrepancy.
- Supplementary appendices referenced for alignment details and other implementation information are absent from the supplied Markdown. The available main text does not specify enough train/test partition details to assess generalization to unseen debates or recording conditions.

## Related Concepts

- [[audio-as-data|Audio as Data]]
- [[forced-alignment|Forced Alignment]]
- [[speech-emotion-recognition|Speech Emotion Recognition]]

## Related Papers

- [[validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a methodological connection within this library, using human judgments to assess construct validity; not a citation made by Mestre and Ryan.
- [[toxicity-and-moral-rhetoric-in-video-and-text-based-digital-platforms|Toxicity and Moral Rhetoric in Video- and Text-Based Digital Platforms]]: a complementary library study that analyzes transcribed political talk shows while excluding nonverbal audio and video information; not a citation made by Mestre and Ryan.
- Knox and Lucas (2021), "A Dynamic Model of Speech for the Social Sciences": cited for modeling judicial skepticism from aligned speech.
- Wagner et al. (2023), "Dawn of the Transformer Era in Speech Emotion Recognition: Closing the Valence Gap": supplies the dimensional emotion model used here.

[[index|Library home]]
