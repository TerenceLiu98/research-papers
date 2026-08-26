---
title: "Concept-based Visual Counterfactual Explanations with Diffusion Models"
type: paper
authors:
  - Yassine Oueslati
  - Daniil Kirilenko
  - Martin Gjoreski
  - Marc Langheinrich
year: null
tags:
  - visual-counterfactual-explanations
  - diffusion-models
  - concept-bottleneck-models
  - explainable-ai
  - generative-models
---

## TL;DR

This paper introduces C-VCE, a latent diffusion framework for visual counterfactual explanations that places a [[Concept Bottleneck Models|concept bottleneck]] inside the denoising U-Net. Users can intervene on human-interpretable attributes while a product-of-experts regularizer preserves proximity to the input and a gradient-derived mask localizes edits. On CelebA, C-VCE reports lower image-distance errors, lower failure rates, and better sFID than L-DVCE, while retaining a slightly lower flip rate.

## Research Question

Can a diffusion model generate plausible, localized visual counterfactuals through explicit semantic interventions, without relying on a separate classifier that must remain reliable on noisy intermediate images?

## Motivation

Visual counterfactual explanations should change a model's decision while remaining valid, plausible, and close to the original image. Pixel-level optimization can satisfy validity and proximity through adversarial artifacts rather than meaningful changes, and classifier-guided diffusion requires an external classifier that operates on noisy samples. The paper therefore combines a generative image prior with a controllable concept layer so that the target change can be expressed as an intervention on attributes such as Smile or Young.

## Contributions

- Embeds a concept bottleneck in a latent diffusion U-Net so the reverse process can be conditioned on an explicit target concept vector.
- Introduces a product-of-experts regularizer that combines a validity term with a proximity term anchoring the trajectory to the source latent.
- Computes a gradient-derived spatial mask during sampling, allowing the validity term to act in relevant regions while the proximity term preserves other regions in a single reverse pass.
- Evaluates the validity-proximity-quality tradeoff on CelebA and studies stability, identity preservation, and correlated or conflicting attributes.

## Method

The input image $I$ is encoded into a latent $x_0$ with a pretrained VAE. At each reverse-diffusion step, the U-Net encoder produces a pre-concept representation and skip features. A concept classifier predicts $c$, and an embedding constructor combines the representation with an intervened target vector $c'$. The decoder then predicts noise from the intervened representation and skip features. Classifier-free guidance combines conditional and unconditional predictions:

$$
\epsilon^{(w)} = (1+w)\epsilon_\theta(x_t,t,c') - w\epsilon_\theta(x_t,t,\emptyset).
$$

To preserve proximity, C-VCE adds an anchor derived from the source latent. A denoised estimate is used to compute the gradient of the target concept probability; after normalization and thresholding at $\kappa$, this produces a binary mask $M$. The final noise prediction uses the guided conditional term where $M=1$ and the source-anchoring proximity term elsewhere. The model is trained jointly with a conditional noise-prediction loss and a binary cross-entropy concept loss.

## Experiments

The experiments use CelebA, a pretrained Stable Diffusion VAE, AdamW, a learning rate of $6 \times 10^{-5}$, cosine annealing with 500 warmup steps, batch size 64 for training and 72 for evaluation, 300 epochs, fp16 automatic mixed precision, and seed 1265. The main C-VCE configuration uses guidance weight $w=3$, timestep $\tau=200$, mask threshold $\kappa=0.1$, and intervention strength $\alpha=1.0$.

Against L-DVCE, the reported primary results are:

| Method | $l_1$ | $l_{1.5}$ | $l_2$ | Flip rate | ID % | Failure % | sFID |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| L-DVCE | 0.0227 | 0.0319 | 0.0428 | 0.9984 | 95.1 | 3.84 | 11.65 |
| C-VCE | **0.0156** | **0.0267** | **0.0389** | 0.9788 | 94.5 | **2.44** | **11.42** |

C-VCE therefore reduces $l_1$ error by about 31% and failure rate by about 36.4% relative to the baseline, while the baseline retains a marginally higher flip rate and identity score. The qualitative comparisons attribute the difference to fewer glowing-teeth, oversaturation, and plastic-like skin artifacts in C-VCE outputs.

The intervention-strength analysis reports smooth latent traversals as $w$ increases from 1 to 5 for C-VCE, whereas L-DVCE develops saturation artifacts as its intervention strength increases. In the conflicting Beard-on-Female experiment, L-DVCE obtains a flip rate of 0.7483, while C-VCE obtains 0.0127 and largely suppresses the edit. The authors interpret this as the concept-guided model respecting a rare attribute combination in the learned CelebA distribution; it is also a limitation when a user genuinely wants such a counterfactual.

## Limitations

Full DDPM sampling remains computationally slow, and the current implementation uses a fixed guidance weight even though the best intervention intensity may depend on the image. The method's semantic behavior is tied to the concept labels and correlations represented in CelebA: the same mechanism that avoids implausible edits can suppress valid but rare interventions. The evaluation is primarily face-centric, so performance on heterogeneous non-facial domains is not established. The paper proposes accelerated samplers, adaptive guidance, more granular concepts, and broader datasets as future directions.

## Related Concepts

- [[Visual Counterfactual Explanations]]
- [[Diffusion Models]]
- [[Concept Bottleneck Models]]
- [[Model Steerability]]

## Related Papers

- Augustin, Boreiko, Croce, and Hein (2022), "Diffusion visual counterfactual explanations."
- Jeanneret, Simon, and Jurie (2022), "Diffusion models for counterfactual explanations."
- Jeanneret, Simon, and Jurie (2023), "Adversarial counterfactual visual explanations."
- Ismail, Adebayo, Bravo, Ra, and Cho (2024), "Concept bottleneck generative models."
- Koh, Nguyen, Tang, Mussmann, Pierson, Kim, and Liang (2020), "Concept bottleneck models."

Code: https://github.com/yassine2331/ex_difuser

[[index|Library home]]
