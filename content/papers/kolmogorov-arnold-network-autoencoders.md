---
title: "Kolmogorov-Arnold Network Autoencoders"
type: paper
authors:
  - Mohammadamin Moradi
  - Shirin Panahi
  - Erik Bollt
  - Ying-Cheng Lai
year: null
source_job_id: "0c696042-c153-4169-bce8-255e32406870"
tags:
  - kolmogorov-arnold-networks
  - autoencoders
  - representation-learning
  - image-reconstruction
---

## TL;DR

This paper replaces part of an image autoencoder with spline-based [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Network]] layers and compares the resulting AE-KAN with convolutional autoencoders on MNIST, SVHN, and CIFAR-10. AE-KAN reports lower reconstruction MSE in eight of nine matched bottleneck comparisons and modestly higher KNN accuracy on several latent representations. The comparison is not capacity matched: AE-KAN uses two additional dense layers and ranges from about 63 thousand to 2.02 million parameters, versus 617 to 30,731 for AE-CNN, so the experiments do not isolate the effect of edge-wise spline activations.

## Research Question

Can a KAN-based encoder-decoder learn useful compressed image representations and reconstruct benchmark images as well as or better than a convolutional autoencoder?

## Motivation

Autoencoders learn a bottleneck representation by minimizing reconstruction error. Convolutional autoencoders encode spatial locality and translation-related structure through convolution, whereas KANs learn a separate univariate function on each edge. The paper tests whether those flexible edge functions can support image reconstruction and downstream classification from the learned latent codes.

## Contributions

- Builds an autoencoder with a KAN layer and dense layer in the encoder and the reverse arrangement in the decoder.
- Evaluates reconstruction across multiple bottleneck sizes on MNIST, SVHN, and CIFAR-10.
- Measures latent-code utility by fitting a K-nearest-neighbors classifier and reporting accuracy and F1 score.
- Documents parameter counts and elapsed training times alongside reconstruction and classification results.

## Method

For input $x$, the encoder applies a KAN layer, ReLU, and a dense projection to produce bottleneck code $z$:

$$
z=W_{\mathrm{dense}}\,\max(0,f_{\mathrm{KAN}_1}(x))+b_{\mathrm{dense}}.
$$

The decoder applies a dense layer, ReLU, and a second KAN layer:

$$
\hat{x}=f_{\mathrm{KAN}_2}\!\left(\max(0,W'_{\mathrm{dense}}z+b'_{\mathrm{dense}})\right).
$$

Training minimizes mean squared reconstruction error. The implementation uses efficient KAN, which evaluates a fixed B-spline basis before linearly combining basis values and replaces the original sample-based L1 regularizer with weight-based L1 regularization. For a KAN with $N_a$ edge functions and $G+K$ coefficients per B-spline curve, the paper counts $(G+K)N_a$ trainable spline coefficients. In the reported autoencoder, both KAN layers and both dense layers contribute to the total parameter count.

Both model families train for 10 epochs with AdamW, learning rate $10^{-3}$, weight decay $10^{-4}$, and MSE loss. A KNN classifier is subsequently trained on each model's bottleneck representations.

## Experiments

The comparison uses MNIST, SVHN, and CIFAR-10. Bottlenecks are expressed as spatial shapes for AE-CNN and flattened dimensions for AE-KAN, with matched total dimensionality. Selected results from Table 1 are:

| Dataset | Bottleneck dimension | AE-CNN loss | AE-KAN loss | AE-CNN / AE-KAN accuracy | AE-CNN / AE-KAN parameters |
| --- | ---: | ---: | ---: | ---: | ---: |
| MNIST | 4 | 0.2667 | 0.2170 | 0.74 / 0.76 | 617 / 62,796 |
| MNIST | 9 | 0.2288 | 0.2024 | 0.82 / 0.84 | 818 / 62,881 |
| MNIST | 18 | **0.1722** | 0.2238 | **0.90 / 0.78** | 891 / 63,034 |
| SVHN | 32 | 0.0251 | **0.0129** | 0.67 / 0.67 | 3,509 / 997,000 |
| SVHN | 64 | 0.0114 | **0.0082** | 0.67 / 0.69 | 30,731 / 1,010,000 |
| CIFAR-10 | 32 | 0.0659 | **0.0497** | 0.55 / 0.57 | 6,709 / 1,990,000 |
| CIFAR-10 | 64 | 0.0414 | **0.0341** | 0.57 / 0.59 | 6,999 / 2,020,000 |

AE-KAN has lower reconstruction loss for every reported SVHN and CIFAR-10 configuration and for two of three MNIST configurations. The largest MNIST bottleneck reverses the pattern: AE-CNN has lower loss and substantially higher KNN accuracy and F1. Across the table, reported elapsed times are close despite the parameter gap: roughly 39-44 seconds on MNIST, 72-73 seconds on SVHN, and 43-47 seconds on CIFAR-10. The supplied text does not specify hardware or whether these values include identical operations, so they should not be generalized as architecture-level throughput measurements.

A separate bottleneck sweep, with hidden size set equal to bottleneck size, reports improved visual reconstruction as capacity rises. The authors identify size 150 as strongest for MNIST and 500 as strongest for SVHN and CIFAR-10, but the supplied text does not give the corresponding numerical MSE values.

## Limitations

- The architectures are not capacity matched. AE-KAN has roughly two orders of magnitude more parameters on MNIST and much larger gaps on SVHN and CIFAR-10; it also contains two dense layers absent from AE-CNN.
- Bottleneck dimensions are matched, but the convolutional and flattened KAN architectures encode different inductive biases. The experiments do not attribute gains specifically to edge-wise spline functions.
- Evaluation covers three image benchmarks, 10 training epochs, one optimizer setup, and KNN classification. There are no text, time-series, larger-scale image, robustness, or out-of-distribution experiments.
- No repeated-run uncertainty, statistical significance tests, validation protocol, hardware details, or systematic hyperparameter-matching procedure are reported in the supplied text.
- The paper motivates KAN interpretability but provides no interpretability metric, edge-function analysis, or comparison of explanation quality.
- Larger bottlenecks improve reconstruction while retaining more input information, so those results alone do not demonstrate more efficient compression.
- No publication year, DOI, venue, or arXiv identifier appears in the supplied Markdown; the year is therefore left unset.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: supply the learnable edge-wise B-spline transformations used in the encoder and decoder.
- [[concepts/function-space-autoencoders|Function-Space Autoencoders]]: another autoencoder family that replaces ordinary scalar transformations with function-aware layers, but for function-valued observations rather than KAN edge functions.
- Representation learning
- Convolutional autoencoders

## Related Papers

References discussed in the supplied paper include:

- Liu et al. (2024), "KAN: Kolmogorov-Arnold Networks," arXiv:2404.19756: the base spline-based KAN architecture.
- Liu et al. (2024), "KAN 2.0: Kolmogorov-Arnold Networks Meet Science," arXiv:2408.10205: subsequent KAN development.
- Bank, Koenigstein, and Giryes (2023), "Autoencoders": background on encoder-decoder representation learning.
- Alqahtani et al. (2018), "A Deep Convolutional Autoencoder with Embedded Clustering": convolutional-autoencoder background.
- Li (2024), "Kolmogorov-Arnold Networks Are Radial Basis Function Networks": the FastKAN simplification discussed in the introduction.
- Bodner et al. (2024), "Convolutional Kolmogorov-Arnold Networks," arXiv:2406.13155: applies convolutional KAN layers to image recognition.

Related library reading, without implying citation by this paper:

- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]] studies edge-wise spline functions for temporal forecasting and reports a different accuracy-efficiency tradeoff.
- [[papers/functional-autoencoders-for-functional-data-representation-learning|Functional Autoencoders for Functional Data Representation Learning]] learns nonlinear bottlenecks for function-valued inputs using functional weights.

The authors report experiment code at `https://github.com/AminMoradiXL/kan_ae` (reference 33).

[[index|Library home]]
