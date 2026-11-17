---
title: "Learning to See: Convolutional Neural Networks for the Analysis of Social Science Data"
type: paper
authors:
  - Michelle Torres
  - Francisco Cantú
year: 2022
venue: Political Analysis
doi: "10.1017/pan.2021.9"
source_job_id: "6e9bddd1-df58-444d-a2a2-73528e699a9b"
tags:
  - computer-vision
  - political-methodology
  - electoral-data
---

## TL;DR

This methodological introduction explains how convolutional neural networks (CNNs) can code visual social-science data. In Mexican election tallies, a model trained on MNIST achieves only 32.45% digit accuracy on the tally validation set despite 99.14% on MNIST. Retraining with labeled tally digits and augmentation raises tally test accuracy to 96.59%. The application demonstrates the importance of domain-specific training and human error review.

## Research Question

How can social scientists build, adapt, and validate CNNs to extract reliable information from images, particularly handwritten electoral records?

## Motivation

Manual image coding limits the scale of archival and electoral research. Learned visual features can accommodate variation that would require extensive hand-written rules, but success on clean benchmark images does not ensure success on noisy documents.

## Contributions

- Explains preprocessing, convolution, nonlinear activation, pooling, classification, and model training for social scientists.
- Organizes practical guidance on architecture selection, regularization, augmentation, class balance, transfer learning, and validation.
- Demonstrates digit extraction from Mexico's 2015 federal-election tallies, including unsuccessful benchmark transfer and subsequent adaptation.
- Distinguishes observable coding tasks from interpretations of ambiguous or latent political constructs.

## Method

The tutorial separates image preprocessing, feature representation, and supervised learning. Images are standardized and allocated to training, validation, test, and unlabeled target sets. Convolutional filters and nonlinear activations learn visual patterns; pooling reduces spatial resolution; fully connected layers and a softmax output classify digits.

In the application, three tally anchor points guide cropping of vote-count tables and individual digits. The initial CNN trains on 60,000 MNIST digits, with another 10,000 for validation. Grid search varies convolutional layers, filter counts, dropout, fully connected layers, and epochs while continuing to train on MNIST and evaluating on tally validation data. The selected architecture has three convolutional layers with 32, 32, and 112 filters of size 3 × 3, dropout 0.2, fully connected layers of 110 and 30 nodes, and 45 epochs.

The final adaptation freezes the first convolutional layer and retrains the remaining parameters using 24,271 labeled tally digits with data augmentation. This is an application of [[concepts/convolutional-neural-networks|Convolutional Neural Networks]] with domain-specific supervision.

## Experiments

Section 5 uses tally splits of 24,271 training, 2,000 validation, and 2,616 test digits. The target sample contains 23,058 digits from Mexico City's congressional district 15.

| Model and evaluation set | Accuracy |
| --- | ---: |
| Base model, MNIST | 0.9914 |
| Base model, tally validation | 0.3245 |
| Grid-searched MNIST-trained model, tally validation | 0.3720 |
| Adapted model with augmentation, tally validation | 0.9495 |
| Adapted model with augmentation, tally test | 0.9659 |

The large transfer improvement combines local labeled data, retraining, and augmentation; the reported comparison does not isolate their individual effects. Error inspection identifies misplaced digits, illegibility, and handwriting that confuses 4 and 9.

For district-level validation, the authors aggregate predicted digits into party vote counts and compare vote shares with official results. A digit-position-weighted mean of predicted label probabilities gives more importance to hundreds than units; tallies scoring above 0.9 are labeled high quality. Figure 4 reports closer agreement for this subset and recovery of party rankings and approximate magnitudes, without a numerical aggregate-error metric in the supplied text.

## Limitations

Clean benchmark performance fails to transfer to tallies containing stains, boxes, pencil marks, and less distinct handwriting. Human review remains necessary for consequential mistakes. Softmax scores and the tally-quality heuristic are not calibrated inferential uncertainty intervals. The authors warn about sensitivity to geometry and image perturbations, opaque prediction mechanisms, and post hoc interpretations of ambiguous constructs. These are methodological cautions, not experimental proof that CNNs can never learn abstract categories. The application supports document coding in this setting rather than unrestricted cross-election generalization.

The supplied Markdown contains damaged notation and references to supplementary architecture details that are not included; this summary relies on the readable main-text descriptions. The issue year is 2022; online publication was April 16, 2021.

## Related Concepts

- [[concepts/convolutional-neural-networks|Convolutional Neural Networks]]: the image-classification architecture explained and applied here.

## Related Papers

- [[papers/predicting-the-politics-of-an-image-using-webly-supervised-data|Predicting the Politics of an Image Using Webly Supervised Data]]: a library comparison involving politically interpreted images and noisy source labels, contrasting with directly observable handwritten digits; not presented as a cited comparison.
- Webb Williams, Casas, and Wilkerson (2020), *Images as Data for Social Science Research*: cited introduction to image classification and transfer learning.

Replication resources reported by the paper: [Code Ocean](https://doi.org/10.24433/CO.3401138.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/UNYOLF).
