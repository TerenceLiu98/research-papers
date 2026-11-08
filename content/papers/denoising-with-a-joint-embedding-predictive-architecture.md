---
title: Denoising with a Joint-Embedding Predictive Architecture
type: paper
authors:
  - Dengsheng Chen
  - Jie Hu
  - Xiaoming Wei
  - Enhua Wu
year: 2025
venue: ICLR 2025
arxiv: "2410.03755"
tags:
  - generative-modeling
  - joint-embedding-predictive-architectures
  - diffusion-models
  - flow-matching
  - image-generation
---

## TL;DR

D-JEPA turns masked latent prediction into iterative next-set-of-tokens generation. A JEPA predictor estimates semantic features for masked continuous tokens, while a small token-wise diffusion or flow-matching head samples token values conditioned on those features. On class-conditional ImageNet generation, larger variants improve FID while requiring fewer training epochs and, at the largest scale, fewer autoregressive sampling steps.

## Research Question

Can a [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architecture]] combine representation learning with autoregressive generation of continuous data, without first quantizing that data into a discrete vocabulary?

## Motivation

Visual autoregressive models commonly discretize images, which can impose tokenizer losses, while [[concepts/diffusion-models|Diffusion Models]] usually model an entire sample rather than learning JEPA-style semantic representations. D-JEPA seeks one architecture in which masked feature prediction supplies semantic context and a conditional generative objective recovers continuous token values.

## Contributions

- Recasts masked image modeling as generalized next-token prediction: each iteration predicts a randomly selected set of currently masked tokens, and a cosine schedule progressively reduces the mask.
- Couples a JEPA prediction loss with a per-token conditional diffusion loss. The paper argues that the generative loss discourages representation collapse while the prediction loss supplies higher-level semantic conditioning.
- Provides [[concepts/flow-matching|Flow Matching]] as an alternative token-generation objective and applies the resulting architecture beyond class-conditional images to speech, text-conditioned images, and class-conditioned video.
- Reports Base, Large, and Huge scaling experiments on ImageNet, plus ablations of JEPA loss, sampling steps, temperature, classifier-free guidance, raw-pixel versus latent-token training, and downstream representation quality.

## Method

D-JEPA uses three Vision Transformer components: a context encoder, an exponential-moving-average target encoder, and a feature predictor. Images are encoded into continuous VAE latents and patchified. During training, at least 70% of tokens are masked. The context encoder processes visible tokens; the predictor estimates features for masked positions; and the target encoder supplies stop-gradient target embeddings for a smooth-L1 prediction loss.

For each masked token, a compact residual MLP models the conditional distribution of its continuous value given the predicted feature. The default objective predicts diffusion noise independently per token. The total training loss is the unweighted sum of this denoising loss and the JEPA prediction loss. A conditional flow-matching loss can replace the diffusion term.

Sampling starts with every position masked. At each iteration, the model encodes generated tokens, predicts features for missing positions, randomly chooses the next set of positions, and samples their values with the token-wise denoiser. A cosine schedule controls how many positions are filled over typically 64 or more iterations; using one position per iteration recovers ordinary next-token prediction.

## Experiments

The principal evaluation is class-conditional ImageNet generation. At 256 x 256 without classifier-free guidance, D-JEPA-B (212M parameters) reports FID 3.40 and IS 197.1, D-JEPA-L (687M) reports FID 2.32 and IS 233.5, and D-JEPA-H (1.4B) reports FID 2.04 and IS 239.3. With tuned guidance and temperature, the best reported FIDs are 1.87, 1.58, and 1.54 respectively. D-JEPA-L at 512 x 512 reports FID 1.89 without guidance and 1.62 with guidance.

The JEPA-loss ablation compares D-JEPA-B with the structurally similar MAR-B. At 600 epochs D-JEPA-B approximately matches MAR-B trained for 800 epochs; by 1,400 epochs it reports FID 3.40 without guidance versus MAR-B's 3.48. Sampling ablations show that 64 steps are already near the best quality-efficiency region, and the Huge model obtains its best guided FID with fewer steps than smaller variants in the reported grid.

Representation experiments report ImageNet linear probing and fine-tuning from the same checkpoints, while raw-pixel experiments show similar generative metrics to continuous latent tokens at greater computational cost. With flow matching, the paper demonstrates speech synthesis on LJSpeech, text-to-image generation on a mixture of public and private data, and class-conditioned video generation on UCF101. These extensions are demonstrations rather than state-of-the-art comparisons; for UCF101, D-JEPA reports FVD-16 of 365.2, behind Latte trained with additional image data.

## Limitations

- The token-wise denoising MLP may bottleneck final quality; simply increasing its depth or width did not materially improve results.
- Bidirectional attention prevents key-value caching and requires masked tokens to remain in the predictor input. A restricted-attention alternative failed to train effectively, remaining above FID 50 after 160 epochs.
- Flow matching converged faster in the reported ImageNet experiment but plateaued later; the paper attributes this tentatively to limited denoising-MLP capacity.
- The audio, text-to-image, video, and multimodal studies use different datasets and substantial compute, with limited tuning and incomplete quantitative comparison. The text-to-image dataset also includes unspecified private data.
- Claims that diffusion loss prevents representation collapse are supported empirically in this architecture, not established as a general guarantee.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/flow-matching|Flow Matching]]
- Masked image modeling
- Classifier-free guidance

## Related Papers

- Li et al. (2024), "Autoregressive Image Generation without Vector Quantization," provides the MAR baseline and token-wise diffusion design used for comparison.
- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture," supplies the image JEPA foundation.
- Li et al. (2023), "MAGE: Masked Generative Encoder to Unify Representation Learning and Image Synthesis," also combines masked modeling with generation.
- Chang et al. (2022), "MaskGIT: Masked Generative Image Transformer," motivates iterative masked-token sampling.

[[index|Library home]]
