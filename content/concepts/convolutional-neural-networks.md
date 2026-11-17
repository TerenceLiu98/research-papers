---
title: Convolutional Neural Networks
type: concept
aliases:
  - CNNs
  - CNN
  - Convolutional Neural Network
definition: "Neural networks that apply shared learned filters across local input regions to build feature representations, commonly for image classification."
tags:
  - computer-vision
  - deep-learning
---

## Overview

Convolutional neural networks apply shared learned filters across local input regions. In image classification, successive layers combine local patterns into representations used to predict labels. Their usefulness depends on training examples that represent the conditions and categories encountered at deployment.

## Key Ideas

- Convolution produces feature maps; nonlinear activations permit compositions beyond a single linear transformation.
- Pooling or strided operations reduce spatial resolution, trading detail for computational efficiency and tolerance to small changes.
- Supervised learning adjusts filters and classifier weights using labeled examples. Separate validation and test data support model selection and evaluation.
- Transfer learning reuses pretrained parameters, optionally freezing some layers while adapting others to local data.
- High benchmark accuracy does not establish domain transfer. Inspecting errors and validating substantive aggregates can reveal failures hidden by an overall score.
- Output class probabilities require separate assessment before being interpreted as calibrated uncertainty.

## Important Papers

- [[papers/learning-to-see-convolutional-neural-networks-for-the-analysis-of-social-science-data|Learning to See]]: introduces CNNs for social scientists and demonstrates the importance of adaptation when transferring from clean handwritten digits to election tallies.

## Related Concepts

- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: concerns incomplete or noisy supervision rather than network architecture; CNNs can be trained under such supervision.
