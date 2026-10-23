---
title: "LM4LV: A Frozen Large Language Model for Low-Level Vision Tasks"
type: paper
authors:
  - Anonymous
year: null
tags:
  - low-level-vision
  - large-language-models
  - image-restoration
  - visual-representation-learning
  - autoregressive-models
---

## TL;DR

LM4LV maps continuous features from a reconstruction-oriented masked autoencoder into a frozen LLaMA2-7B-Instruct model, then autoregressively predicts restored visual features through two trainable linear adapters and task-specific soft tokens. On five synthetic restoration tasks, it improves over reconstructing the degraded input through the same MAE by an average 3.96 dB PSNR and 0.09 SSIM; the largest reported gain is 6.81 dB for denoising. The experiments establish nontrivial transfer from a text-pretrained frozen LLM under this setup, but not state-of-the-art restoration: high-frequency detail remains weak, deblurring gains are marginal, and inference is expensive.

## Research Question

Can a frozen, text-pretrained large language model accept, process, and autoregressively generate continuous low-level visual features without image-text training or a cross-modal prior?

## Motivation

Most multimodal LLMs optimize semantic alignment and use vision modules that discard pixel-level detail. That design suits captioning and visual question answering but is poorly matched to restoration tasks that require fidelity to the input. LM4LV asks what computation the LLM initialization itself contributes when visual information is preserved and the backbone receives no multimodal training. This complements work on [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]], which inserts individual frozen language-model blocks into task-specific encoders rather than using an intact autoregressive LLM.

## Contributions

- Introduces an interface that lets a frozen LLM consume and emit continuous visual tokens, with only two linear projections and a task-token sequence trained on vision-only pairs.
- Shows that the choice of visual representation is decisive: a fine-tuned MAE supports image rotation, whereas tested VQGAN and BEiT representations fail beyond image repetition.
- Separates the contribution of the pretrained LLM from adapters and architecture through linear, MLP, transformer, randomly initialized LLM, and non-autoregressive controls.
- Relates success with MAE features to higher measured representational alignment with LLaMA2 than VQGAN or BEiT, while presenting this as a possible explanation rather than an identified mechanism.

## Method

LM4LV uses a frozen MAE-Large encoder to turn a 224 x 224 image into 196 continuous features. The authors first fine-tune only the MAE decoder on ImageNet reconstruction using L1 and LPIPS losses; the MAE encoder remains frozen. An input linear layer projects the visual features into the hidden dimension of frozen LLaMA2-7B-Instruct, and an output linear layer maps generated features back for MAE decoding.

Training serializes a degraded image, ten learned task tokens, and the target image as a conversational sequence. Text uses ordinary next-token cross-entropy, while each continuous visual token is learned with next-element L2 regression. Visual spans are delimited by image markers, and the LLM generates target visual features one at a time under its causal mask. Only the two adapters and task tokens are optimized; the vision encoder and LLM are fixed.

The restoration training data are synthetic degradations of LLAVA595k images. Separate models are trained for Gaussian denoising, Gaussian deblurring, deraining, pepper-noise removal, and mask removal, plus rotation and flipping. Evaluation uses similarly degraded NoCaps images. MAE-r, reconstruction of the degraded input through the same MAE, controls for changes attributable to the vision module alone.

## Experiments

### Main Results

| Task | MAE-r PSNR / SSIM | LM4LV PSNR / SSIM | Reported change |
| --- | --- | --- | --- |
| Denoising | 19.96 dB / 0.65 | 26.77 dB / 0.80 | +6.81 dB / +0.15 |
| Deblurring | 26.14 dB / 0.78 | 26.23 dB / 0.79 | +0.09 dB / +0.01 |
| Deraining | 19.96 dB / 0.74 | 24.62 dB / 0.77 | +4.66 dB / +0.03 |
| Pepper removal | 23.01 dB / 0.58 | 25.20 dB / 0.75 | +2.19 dB / +0.17 |
| Mask removal | 20.00 dB / 0.73 | 25.83 dB / 0.80 | +5.83 dB / +0.07 |
| Rotation | 29.52 dB / 0.89 | 27.18 dB / 0.83 | -2.34 dB / -0.06 versus reconstructed target |
| Flipping | 29.52 dB / 0.89 | 27.28 dB / 0.84 | -2.24 dB / -0.05 versus reconstructed target |

For restoration, the paper reports mean gains of 3.96 dB PSNR and 0.09 SSIM over MAE-r. For rotation and flipping, MAE-r reconstructs an already transformed target and therefore acts as an upper bound rather than a degraded-input baseline.

### Ablations and Mechanism Evidence

- Replacing autoregressive generation with a single bidirectional LLM pass produces blurred denoising outputs, indicating that the pretrained model's native generation regime matters in this implementation.
- A linear mapping without the LLM yields patch artifacts. A capacity-matched MLP scores 25.87 dB on denoising and 13.29 dB on rotation; a one-layer transformer scores 27.42 and 10.52 dB; LM4LV scores 26.77 and 27.18 dB. The frozen LLM is therefore not best on denoising but is much stronger on the large spatial operation.
- A randomly initialized LLM fails to generate meaningful images, supporting a role for text pretraining beyond transformer architecture alone, although only one random initialization is reported.
- MAE, BEiT, and VQGAN all repeat images, but only MAE succeeds at rotation. The paper reports higher MAE-to-LLaMA alignment on CLIPScore, RefCLIPScore, mutual k-nearest neighbors, and CKA, consistent with its proposed representational-alignment account.
- The approach also improves deraining over MAE reconstruction with Gemma-2B, Phi-3-mini, GPT-J, and a smaller MAE, though the reported model comparison table is compact and partially ambiguous in the supplied manuscript text.

## Limitations

- The experiments use synthetic degradations of LLAVA595k and evaluate on synthetically degraded NoCaps images. They do not establish performance on real camera noise, blur, rain, occlusion, or production restoration benchmarks.
- LM4LV does not recover high-frequency details reliably. Autoregressive token-order failures can produce spatially misaligned images, and deblurring improves only 0.09 dB over MAE-r.
- The method is not presented as state of the art. A one-layer task-specific transformer outperforms it on denoising, while LM4LV's advantage appears most clearly on rotation and relative to the reconstruction baseline.
- The vision representation is a major dependency: VQGAN and BEiT fail on rotation, and shrinking the MAE harms deraining more than shrinking the LLM in the reported comparison.
- Restoring one image is estimated at 5.77 TFLOPs, of which 5.74 TFLOPs come from the LLM. Sequentially generating 196 visual tokens also imposes latency.
- The adapters' near-scaled-identity product and the alignment measurements are suggestive, not causal proof of why the LLM works. LPIPS fine-tuning of the MAE decoder also introduces supervision from a VGG network, although the encoder exposed to the LLM remains frozen.
- The supplied manuscript identifies the authors only as anonymous and provides no publication year, DOI, or arXiv identifier; those metadata are therefore left unset rather than inferred.

## Related Concepts

- [[concepts/frozen-language-model-blocks-as-modality-encoders|Frozen Language-Model Blocks as Modality Encoders]]
- [[concepts/autoregressive-dense-perception|Autoregressive Dense Perception]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]

## Related Papers

- [[papers/frozen-transformers-in-language-models-are-effective-visual-encoder-layers|Frozen Transformers in Language Models Are Effective Visual Encoder Layers]]: tests frozen individual LLM blocks as non-autoregressive visual encoder layers and supplies a single-layer comparison adapted by LM4LV.
- He et al. (2021), "Masked Autoencoders Are Scalable Vision Learners": provides the reconstruction-oriented visual encoder adapted by LM4LV.
- Huh et al. (2024), "The Platonic Representation Hypothesis": motivates the paper's cross-model representation-alignment analysis.
- Liu et al. (2023), "Language Quantized AutoEncoders": studies frozen-LLM visual processing through text-token quantization but does not solve the conditional low-level generation tasks tested here.

[[index|Library home]]
