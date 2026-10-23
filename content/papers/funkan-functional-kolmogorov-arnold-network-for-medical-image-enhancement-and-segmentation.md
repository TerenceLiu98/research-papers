---
title: "FunKAN: Functional Kolmogorov-Arnold Network for Medical Image Enhancement and Segmentation"
type: paper
authors:
  - Maksim Penkin
  - Andrey Krylov
year: null
source_job_id: "673b205a-08c3-4a7f-98b2-76b4c4922fcc"
tags:
  - kolmogorov-arnold-networks
  - medical-image-processing
  - image-segmentation
  - image-enhancement
---

## TL;DR

FunKAN adapts [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]] to spatial feature maps by expressing trainable functions in a truncated Hermite basis evaluated on a learned, deformed grid. The paper uses FunKAN as a backbone for MRI Gibbs-ringing suppression and as the bottleneck of a U-Net-like segmentation model, U-FunKAN. It reports higher PSNR than the tested KAN variants on IXI and the highest IoU among the tested models on BUSI, GlaS, and CVC-ClinicDB. The proposed functional-space extension of the Kolmogorov-Arnold theorem is explicitly hypothetical and is not proved; the evidence supports the evaluated architectures, not the general theorem or a broad claim of clinical interpretability.

## Research Question

Can a KAN-inspired layer preserve the two-dimensional geometry of image features and improve medical image enhancement and segmentation without flattening feature maps into scalar coordinates?

## Motivation

Standard KAN layers learn univariate edge functions over scalar inputs. Applying them to flattened images discards spatial structure that convolutional models exploit. FunKAN instead treats each feature map as a discretized element of a Hilbert space and seeks a trainable, spatially aware functional representation suitable for image-to-image models.

## Contributions

- Proposes a hypothetical extension of the Kolmogorov-Arnold representation from finite-dimensional vectors to tuples of Hilbert-space elements.
- Introduces a FunKAN block that represents trainable functions with six Hermite basis functions and evaluates them on coordinates deformed by a learned residual module.
- Builds an MRI enhancement network from three FunKAN blocks and a U-shaped segmentation model, U-FunKAN, with FunKAN blocks at its bottleneck.
- Evaluates enhancement on IXI and binary segmentation on BUSI, GlaS, and CVC-ClinicDB, including accuracy, compute, parameter, and channel-width comparisons.
- Provides code and dataset split files at `https://github.com/MaksimPenkin/MedicalKAN`.

## Method

The paper starts from a proposed representation of a continuous functional on $H^n$ using elements of the dual space $H^*$. It stresses that this functional generalization is unproven. In the implemented FunKAN layer, each input channel is treated as a function sampled on an $h \times w$ grid. Its trainable spatial function is approximated by a truncated expansion over the first $r=6$ Hermite functions:

$$
\varphi_{l,i} \approx \sum_{k=1}^{r} c_{l,ik}\psi_k.
$$

The coefficients $c_{l,ik}$ form a normalized attention matrix. A pre-activation residual block predicts horizontal and vertical offsets for every channel; adding these offsets to a uniform reference grid gives the coordinates at which the Hermite functions are evaluated. A $1 \times 1$ convolution then mixes the resulting channel features.

For MRI enhancement, an embedding and lifting stage maps the image to 32 channels, three skip-connected FunKAN blocks transform those features, and projection and restoration convolutions produce the output. Training uses mean squared error.

U-FunKAN places three FunKAN blocks in a 128-channel bottleneck between four residual encoder stages and four decoder stages with corresponding skip connections. It trains with $0.1$ times binary cross-entropy plus Dice loss. Both designs therefore combine the proposed basis expansion with conventional convolutional spatial processing rather than replacing convolutions throughout.

## Experiments

All models were trained from scratch in full precision on an NVIDIA RTX A6000 using Adam and a manually reduced learning rate. The MRI experiment uses synthetically corrupted IXI slices produced by retaining the central 25% of Fourier-space data. The resulting training, validation, and test sets contain 10,427, 2,016, and 2,617 image pairs.

On IXI, FunKAN reports 39.05 dB PSNR and total variation 1174.86, compared with 38.10 dB and 1161.63 for spline KAN, 38.01 dB and 1156.56 for ChebyKAN, and 38.04 dB and 1161.31 for HermiteKAN. This gain comes with substantially greater reported cost: 3.11 GFLOPs and 2.2 million parameters for FunKAN versus 0.12 GFLOPs and 0.03-0.04 million parameters for the three KAN baselines.

For segmentation, results are averaged over the last 50 epochs of three runs with seeds 50, 100, and 150:

| Dataset | U-FunKAN IoU | U-FunKAN F1 | Best comparison noted in the paper |
| --- | ---: | ---: | --- |
| BUSI | $68.49 \pm 0.62$ | $77.37 \pm 0.58$ | UKAGNet has higher F1 at 77.64 |
| GlaS | $88.02 \pm 0.24$ | $93.50 \pm 0.12$ | U-FunKAN has the highest reported IoU and F1 |
| CVC-ClinicDB | $85.93 \pm 0.72$ | $91.42 \pm 0.61$ | U-KAN has higher F1 at $91.88 \pm 0.29$ |

U-FunKAN reports 4.35 GFLOPs and 3.6 million parameters, the lowest compute among the compared segmentation systems but not the fewest parameters. A BUSI channel-width ablation shows IoU increasing from 69.11 to 70.62 as the model grows from 4.35 to 161.43 GFLOPs, illustrating that additional capacity can improve accuracy at sharply higher cost. The ablation's 69.11 IoU for the nominal 32/64/128 configuration differs from the main table's $68.49 \pm 0.62$; the supplied text does not explain whether these use different aggregation or evaluation settings.

## Limitations

- The functional extension of the Kolmogorov-Arnold theorem is a hypothesis, not a proved result. The experiments cannot establish the claimed general representation property.
- The paper describes the coefficient matrix as interpretable but provides no interpretability evaluation, clinical reader study, explanation stability analysis, or comparison with established explanation methods.
- Enhancement comparisons isolate backbones within one convolutional architecture, but FunKAN uses much more compute and many more parameters than the KAN variants.
- The study covers one synthetically corrupted MRI dataset and three relatively small segmentation datasets. It does not evaluate prospective clinical data, external-site generalization, calibration, robustness to acquisition shifts, or diagnostic outcomes.
- GlaS is randomly repartitioned rather than evaluated with its predefined split, which limits direct comparability with results using the benchmark protocol.
- Segmentation metrics are averaged over the last 50 epochs, and the text does not specify model-selection rules or confidence intervals beyond variability across three seeds.
- U-FunKAN does not have the best F1 on BUSI or CVC-ClinicDB, despite having the best reported IoU on all three datasets.
- The supplied Markdown includes no publication year, venue, DOI, or arXiv identifier, so the year and stable identifiers remain unset.

## Related Concepts

- [[concepts/kolmogorov-arnold-networks|Kolmogorov-Arnold Networks]]: the edge-function architecture that FunKAN reformulates for spatial feature maps.
- [[concepts/neural-operators|Neural Operators]]: function-space models that motivate spectral truncation and learned coordinate deformations, although FunKAN is evaluated as a fixed-grid image backbone.
- Hermite functions: the Fourier eigenfunction basis used for FunKAN's truncated spatial expansions.
- Medical image segmentation: the application setting for U-FunKAN on ultrasound, histology, and colonoscopy images.
- Gibbs-ringing suppression: the MRI enhancement task used to compare FunKAN with other KAN backbones.

## Related Papers

- Liu et al. (2024), "KAN: Kolmogorov-Arnold Networks," arXiv:2404.19756: introduces the spline-based KAN architecture.
- Li et al. (2025), "U-KAN Makes Strong Backbone for Medical Image Segmentation and Generation": the principal KAN-based segmentation comparison.
- Li et al. (2023), "Fourier Neural Operator with Learned Deformations for PDEs on General Geometries": motivates spectral truncation and learned coordinate deformation.
- Penkin and Krylov (2025), "Adaptive Method for Selecting Basis Functions in Kolmogorov-Arnold Networks for Magnetic Resonance Image Enhancement": supplies the cited basis-selection procedure.
- [[papers/kolmogorov-arnold-network-autoencoders|Kolmogorov-Arnold Network Autoencoders]]: another image model built with KAN layers, but one that flattens images rather than retaining feature maps.
- [[papers/kolmogorov-arnold-networks-for-time-series-bridging-predictive-power-and-interpretability|Kolmogorov-Arnold Networks for Time Series: Bridging Predictive Power and Interpretability]]: applies KAN edge functions to temporal forecasting.

[[index|Library home]]
