---
title: "Multi-resolution enhancement for full-spectrum neural representations"
type: paper
authors:
  - Yuan Ni
  - Zhantao Chen
  - Shizhou Xu
  - Cheng Peng
  - Rajan Plumley
  - Chun Hong Yoon
  - Jana B. Thayer
  - Joshua J. Turner
year: 2026
doi: "10.1038/s42256-026-01287-9"
journal: Nature Machine Intelligence
tags:
  - implicit-neural-representations
  - scientific-data-compression
  - wavelets
  - scientific-machine-learning
  - neural-fields
---

## TL;DR

WIEN-INR is a hierarchical [[Implicit Neural Representations|implicit neural representation]] for compressing scientific measurements without discarding fine-scale structure. It assigns separate coordinate networks to wavelet scales and uses a lightweight, coarse-to-fine enhancement network for the finest coefficients. Across scattering, diffraction, ptychography, neutron, and solar data, the method generally improves rate distortion and preserves weak or speckled signals better than the tested INR baselines. Its advantage is data dependent: gains are largest for dense fine-scale structure, while multiscale overhead can reduce performance on smooth natural images at low bit rates.

## Research Question

Can a compact coordinate-based neural representation preserve the full spatial-frequency content of large scientific measurements, especially weak and high-frequency features, while keeping encoding time, decoding latency, and model storage practical?

## Motivation

Scientific facilities increasingly produce voxel arrays whose storage and analysis costs grow with measurement resolution. An INR instead stores a coordinate-to-signal function in network weights, so its storage cost depends on model size and it can be queried continuously or only within a region of interest. Small INRs, however, tend to learn smooth, low-frequency structure before fine detail. That behavior is especially risky for scientific measurements in which a weak signal, diffuse scattering, or speckle pattern may look like removable noise but carries the phenomenon of interest.

The paper therefore treats high-fidelity representation, rather than perceptual plausibility, as the compression objective. A useful model must preserve global structure and localized high-frequency information under a fixed parameter budget, work across measurement modalities, and remain fast enough to encode and decode.

## Contributions

- Introduces WIEN-INR, which applies a multilevel discrete wavelet transform and fits dedicated coordinate networks to coefficient bands at different scales.
- Uses one multi-output INR per detail scale to model correlated orientations together, rather than fitting an independent network to every sub-band.
- Adds a local enhancement module that predicts finest-scale coefficients from an upsampled coarse-scale INR neighborhood and a learned coordinate-dependent kernel.
- Gives an NTK-regime argument that a block-diagonal, band-split kernel can be optimal for high-frequency error under a fixed parameter budget.
- Evaluates rate distortion, spectral fidelity, local scientific features, encoding time, decoding latency, hyperparameter sensitivity, and downstream reconstructions across several scientific modalities.

## Method

WIEN-INR first applies a multilevel discrete wavelet transform to the input tensor. This produces coarse approximation coefficients and detail coefficients separated by scale and orientation. The basic WAVELET-INR baseline fits a coordinate MLP to each scale, with a shared multi-output network representing the orientations within that scale. The total parameter budget is distributed by scale: coarser, smaller coefficient arrays receive smaller subnetworks and finer bands receive more capacity.

The WIEN-INR enhancement targets the finest detail band, which remained difficult for small generic INRs even after frequency separation. A trained coarser-scale INR is evaluated on finer coordinates, producing a continuous but detail-limited upsampled estimate. For each fine coordinate, the method extracts a local neighborhood from that estimate. A lightweight predictor network maps the coordinate to a local kernel, and the inner product between this kernel and the neighborhood predicts the target fine-scale coefficient. The paper reports that a simpler residual network did not outperform direct fitting, making the local kernel construction an important part of the design.

The experiments use SIREN subnetworks with scale-dependent frequency settings. Decoding evaluates the required networks and applies a localized inverse discrete wavelet transform, allowing full-volume or region-of-interest queries. Trained weights are stored in FP16; training retains an FP32 master copy and uses mixed-precision updates.

The theoretical analysis assumes wide MLP or SIREN models in the lazy or neural tangent kernel regime. Wavelet subspaces are treated as orthogonal output bands, and independent parameter blocks induce a block-diagonal NTK. Under the paper's realizability and parameter-budget definitions, an optimum for high-frequency coefficient error can be achieved by a band-split kernel. The result is about capacity at a fixed training time; it does not jointly model finite-time optimization and frequency-dependent convergence.

## Experiments

The evaluation covers wide-angle coherent X-ray scattering from Cu3Au, four-dimensional inelastic neutron scattering, ultrafast X-ray scattering, coherent X-ray diffraction, coherent diffraction imaging, ptychography, a 20-hour solar magnetogram sequence, and the Kodak natural-image set. INR baselines include SIREN, WIRE, FINER, Fourier features, multiresolution hash encoding, MINER, ACORN, and a ReLU MLP. Extended comparisons include JPEG2000, the BMS learned image codec, and SZ3 scientific compression.

Metrics include PSNR, SSIM, pixel-wise correlation, wavelet-coefficient fidelity, rate distortion, encoding time, decoding latency, and local physics-aware measurements. On the Cu3Au volume, WIEN-INR uses a representation more than 30 times smaller than the raw data while retaining 95% of the measured speckle-contrast trend. Across Bragg-peak and weak-scattering regions, it reports roughly 2-7 times lower local mean squared error than the strongest tested INR baselines. Decoded coherent-imaging and ptychography measurements also produce sharper downstream reconstructions than SIREN-compressed measurements.

The largest gains occur on speckle-rich X-ray and XFEL measurements. At matched network sizes and time budgets, WIEN-INR usually reaches higher PSNR than the other INR methods. For the 41.5 MB Cu3Au volume, the reported full-volume median decoding latency ranges from 12.83 ms for a 0.42 MB model to 14.23 ms for a 1.33 MB model.

Traditional codecs complicate the comparison. JPEG2000 and BMS can obtain comparable or, in one XFEL case, higher global PSNR at low bit rates while suppressing speckle contrast or increasing local error. SZ3 is competitive at higher rates. These results support the paper's claim that global image metrics alone are insufficient when small scientific features carry the signal.

On the Kodak natural-image set, average gains are modest and can become negative under tight bit budgets because distributing parameters across scales imposes overhead. The method benefits more from sharp boundaries and textured regions as model size increases. INT8 weight-only quantization is also dataset sensitive: it degrades some INR results but is competitive with FP16 on one diffraction dataset.

## Limitations

The capacity theorem relies on NTK linearization, orthogonal wavelet-band structure, and the paper's realizable-kernel assumptions. It does not prove that finite-width networks trained for finite time reach the proposed optimum, and it deliberately leaves a joint theory of spectral bias, parameter allocation, and optimization dynamics open.

WIEN-INR does not dominate every codec or data regime. Multiscale overhead can hurt smooth natural images at low rates, SZ3 remains strong near the higher-rate near-lossless regime, and weight-only INT8 quantization is not consistently reliable. The reported implementation uses simple post-training FP16 storage rather than an end-to-end entropy model, quantization-aware training, pruning, or learned transform.

Scale networks can mostly train in parallel, but the finest enhancement stage depends on the preceding scale, and the reported experiments use one NVIDIA A100 GPU rather than a completed parallel implementation. Some X-ray datasets are restricted by facility agreements. Finally, the method is a per-signal compressive representation, not a learned generative prior, and its evidence does not establish performance for every scientific modality or downstream decision.

## Related Concepts

- [[Implicit Neural Representations]]
- [[Wavelet-Domain Neural Compression]]
- Spectral bias
- Multiresolution analysis
- Neural tangent kernels
- Scientific data compression
- Region-of-interest decoding

## Related Papers

- Sitzmann et al. (2020), "Implicit Neural Representations with Periodic Activation Functions."
- Saragadam et al. (2023), "WIRE: Wavelet Implicit Neural Representations."
- Saragadam et al. (2022), "MINER: Multiscale Implicit Neural Representation."
- Dupont et al. (2022), "COIN++: Neural Compression Across Modalities."
- Yu et al. (2025), "Cross-frequency Implicit Neural Representation with Self-evolving Parameters."
- Liang et al. (2023), "SZ3: A Modular Framework for Composing Prediction-based Error-bounded Lossy Compressors."

[[index|Library home]]
