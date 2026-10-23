---
title: "Deep Functional Multiple Index Models with an Application to SER"
type: paper
authors:
  - Matthieu Saumard
  - Abir El Haj
  - Thibault Napoleon
tags:
  - functional-data-analysis
  - functional-multiple-index-models
  - speech-emotion-recognition
  - adaptive-basis-layers
  - transformers
---

## TL;DR

This paper treats a sequence of Mel-frequency cepstral coefficients (MFCCs) as a multivariate functional observation and classifies fixed-length speech chunks with a three-stage model: transformer encoders transform the functional covariates, adaptive basis layers reduce each transformed curve to learned inner-product scores, and fully connected layers predict emotion. Simulations report RMSEs from 0.031 to 0.085, while the IEMOCAP experiment reaches 57.27% weighted and 56.43% unweighted accuracy. The speech result is chunk-level and is not directly comparable with the utterance-level baselines listed in the paper.

## Research Question

Can a deep [[Functional Multiple-Index Models|functional multiple-index model]] jointly learn a transformation of multivariate functional inputs and task-adapted functional projections, and can this architecture extract useful emotion features from chunked MFCC sequences?

## Motivation

Speech recordings vary in duration, while their MFCCs evolve over time. The authors view each MFCC coefficient as a function and each recording as a multivariate functional object. Dividing recordings into fixed-length chunks makes these objects comparable, but useful predictive structure may depend on nonlinear relationships among coefficients and on transformations of the curves. The proposed model therefore combines learned sequence transformation with supervised functional dimension reduction rather than relying on a fixed basis or an untransformed functional input.

## Contributions

- Extends the functional single-index formulation to multivariate inputs with multiple learned functional projections.
- Uses transformer encoders to learn a transformation of the multivariate functional object before computing its index scores.
- Generalizes [[Adaptive Basis Layers|AdaFNN basis layers]] across the components of a multivariate functional input and concatenates their scores for classification.
- Applies the architecture to chunk-level [[Speech Emotion Recognition]] by representing 40 MFCC coefficients as functional covariates.
- Evaluates the transformation-and-projection architecture in three synthetic regression scenarios before testing it on IEMOCAP.

## Method

For multivariate functional input $X_i$, the model first learns a transformed object

$$
Z_i=T(X_i).
$$

Its predictor then uses inner products between components of $Z_i$ and learned index functions. In the implemented network, $T$ is a stack of transformer encoders with self-attention and feed-forward blocks. A deep functional network applies adaptive basis modules to the transformed functional variables, producing numerical $L^2$ inner-product scores. Fully connected layers map the concatenated scores to the response.

For speech, each recording is converted to MFCCs and divided into overlapping chunks. The reported setup uses 40 MFCC coefficients, chunks of length 64, and 25% overlap. It uses two transformer encoder layers and four learned basis functions. Each basis micro-network has three hidden fully connected layers of 128 units. The classifier has two dense layers with tanh activations and dropout of 0.2, followed by a four-class projection. Training uses Adam at a learning rate of $3\times10^{-4}$, focal loss with an $L^2$ penalty on basis parameters, batches of 32, and 15 epochs, retaining the best validation model.

## Experiments

The simulation study generates four functional covariates from exponential-variogram, Brownian, fractional-Brownian, and Matern-covariance processes, sampled at 30 points. Three response scenarios combine multiple functional inner products; the third also transforms two covariates before prediction. The reported RMSEs are 0.085, 0.074, and 0.031 for scenarios S1, S2, and S3. No direct comparison with the neural functional model cited as Rao and Reimherr (2023) is reported because its code was unavailable.

The speech study uses IEMOCAP. From the commonly selected 5,531 utterances, excited and happy labels are merged to produce four classes: happy, angry, neutral, and sad. Evaluation follows ten-fold speaker-independent cross-validation, with one speaker for testing, eight for training, and one for validation. The proposed deep functional network reports 57.27% weighted accuracy and 56.43% unweighted accuracy.

The comparison table lists 64.95% weighted accuracy for a GRU and 66.6% weighted and 68.4% unweighted accuracy for Audio-CNN. These numbers do not establish a like-for-like ranking: the proposed method predicts individual chunks, while the paper identifies the comparison methods as operating under different input features or aggregation settings.

## Limitations

- The IEMOCAP output is evaluated at chunk level, so its scores cannot be directly compared with the utterance-level results in the same table.
- The model does not aggregate all chunks from a recording into a single decision. The authors propose recurrent aggregation or end-to-end sequence modeling as future work.
- Chunk length is fixed and overlap is fixed at 25%; dynamic overlap is discussed but not evaluated.
- The number of adaptive bases is borrowed from prior AdaFNN results rather than tuned for this task.
- The simulations report only the proposed model's RMSE and therefore do not measure improvement over competing functional methods.
- The study reports one benchmark dataset and a short 15-epoch training setup, leaving the architecture's broader generalization unclear.

## Related Concepts

- [[Functional Multiple-Index Models]]
- [[Functional Neural Networks]]
- [[Adaptive Basis Layers]]
- [[Speech Emotion Recognition]]
- Functional data analysis
- Mel-frequency cepstral coefficients
- Chunk-level classification

## Related Papers

- [[Deep Learning for Functional Data Analysis with Adaptive Basis Layers]]
- [[Deep Learning with Functional Inputs]]
- [[Non-linear Functional Modeling using Neural Networks]]
- Lin and Busso (2023), "Chunk-level Speech Emotion Recognition: A General Framework of Sequence-to-One Dynamic Temporal Modeling."
- Antoniou et al. (2023), "Designing and Evaluating Speech Emotion Recognition Systems: A Reality Check Case Study with IEMOCAP."

[[index|Library home]]
