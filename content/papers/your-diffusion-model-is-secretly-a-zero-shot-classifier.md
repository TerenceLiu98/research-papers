---
title: "Your Diffusion Model is Secretly a Zero-Shot Classifier"
type: paper
authors:
  - Alexander C. Li
  - Mihir Prabhudesai
  - Shivam Duggal
  - Ellis Brown
  - Deepak Pathak
year: 2023
source_job_id: "df602cce-6c69-4f82-8170-198b0bbb52d8"
tags:
  - diffusion-models
  - generative-classification
  - zero-shot-learning
  - vision-language-models
  - distribution-shift
---

## TL;DR

Diffusion Classifier turns a pretrained conditional [[concepts/diffusion-models|Diffusion Model]] into a classifier without additional training. It ranks candidate conditions by their noise-prediction errors, using the diffusion ELBO as an approximation to class-conditional log likelihood. Stable Diffusion 2.0 yields a competitive zero-shot image classifier and stronger Winoground compositional reasoning than the tested contrastive models; an ImageNet-trained DiT reaches 79.1% ImageNet accuracy and unusually strong ImageNet-A robustness, at the cost of expensive inference.

## Research Question

Can the conditional density estimates learned for diffusion-based generation be used directly for [[concepts/generative-classification|Generative Classification]], and how does that classifier compare with discriminative alternatives on zero-shot recognition, compositional reasoning, standard classification, and distribution shift?

## Motivation

Most work on large text-to-image diffusion models uses them for sampling or adapts their intermediate features to downstream tasks. Conditional generative models also define $p_\theta(x\mid c)$, so Bayes' rule should turn them into classifiers in principle. Exact likelihoods are intractable for diffusion models, however, and naive Monte Carlo estimates of their variational bounds have too much variance and computational cost to separate many candidate classes reliably.

## Contributions

- Derives Diffusion Classifier, which approximates each class-conditional log likelihood with expected denoising error and predicts the condition with the lowest error.
- Reduces decision variance by evaluating every candidate with the same sampled timesteps and Gaussian noise, so classification depends on paired error differences rather than independently estimated absolute errors.
- Introduces adaptive inference that progressively removes candidates with high accumulated errors, reducing computation while retaining more evaluations for ambiguous classes.
- Extracts a zero-shot classifier from Stable Diffusion 2.0 and a standard ImageNet classifier from class-conditional DiT without training an additional prediction head.
- Compares generative and discriminative classification on recognition, Winoground compositional reasoning, and natural distribution shifts, while reporting inference bottlenecks and negative variance-reduction results.

## Method

For an image $x$ and candidate condition $c$, the method samples a timestep $t$ and Gaussian noise $\epsilon$, constructs

$$
x_t=\sqrt{\bar\alpha_t}x+\sqrt{1-\bar\alpha_t}\epsilon,
$$

and measures how accurately the conditional denoiser $\epsilon_\theta(x_t,c)$ reconstructs the added noise. Dropping the small reconstruction term and the timestep weights from the diffusion ELBO gives the score

$$
S(c;x)=-\mathbb{E}_{t,\epsilon}\left[\lVert\epsilon-\epsilon_\theta(x_t,c)\rVert^2\right].
$$

With a uniform class prior, softmaxing these scores approximates $p_\theta(c\mid x)$, and the predicted class is the candidate with minimum expected error. The same $(t,\epsilon)$ samples are reused for all candidates. This pairing greatly lowers the variance of error differences even when each absolute ELBO estimate remains noisy.

For large label sets, an adaptive procedure evaluates all candidates briefly, keeps only the lowest-error subset, and repeats with successively larger trial budgets. The Stable Diffusion experiments encode images into latent space and use text prompts as conditions. The supervised experiments instead use class indices with ImageNet-trained DiT-XL/2. Although squared $\ell_2$ error follows the derivation, the zero-shot experiments select between $\ell_1$ and squared $\ell_2$ per dataset; squared $\ell_2$ remains best for DiT.

## Experiments

**Zero-shot recognition.** Stable Diffusion 2.0 is evaluated on Food-101, CIFAR-10, FGVC-Aircraft, Oxford-IIIT Pets, Flowers102, STL-10, ImageNet, and ObjectNet. Diffusion Classifier reports 77.7%, 88.5%, 26.4%, 87.3%, 66.3%, 95.4%, 61.4%, and 43.4%, respectively. It exceeds the supervised SD-feature baseline on six of eight datasets and the CLIP ResNet-50 baseline on seven, but trails OpenCLIP ViT-H/14 on six. These cross-model comparisons use different pretraining data and architectures.

**Compositional reasoning.** On Winoground, Diffusion Classifier obtains a 38.5% average text score, compared with 33.0% for OpenCLIP ViT-H/14 and 28.2% for CLIP ViT-L/14. Its advantage spans object, relation, and combined swaps even though Stable Diffusion uses the OpenCLIP text encoder, suggesting that the generative image-text interaction contributes beyond the text embedding alone.

**ImageNet classification.** DiT-XL/2 reaches 77.5% at $256^2$ and 79.1% at $512^2$. The latter exceeds the reported ResNet-101 and ViT-L/32 accuracies but remains below ViT-L/16 and ViT-B/16. DiT used only resizing, center cropping, and horizontal flips during training rather than the stronger augmentations common in discriminative training.

**Distribution shift.** The $512^2$ classifier reaches 66.7% on ImageNetV2, 30.2% on ImageNet-A, and 33.9% on ObjectNet. Its ImageNet-A result lies well above the ID-to-OOD trend fitted to discriminative ImageNet classifiers, corresponding to roughly 15--25% effective robustness. This behavior does not extend to ImageNetV2 or ObjectNet.

**Efficiency and ablations.** Adaptive Stable Diffusion inference takes about 18 seconds per Pets image and 1,000 seconds per ImageNet image on an RTX 3090. Pruning to CLIP's top 20 candidates reduces the reported ImageNet time to 150 seconds and slightly raises accuracy to 62.6%, but makes the pipeline depend on a discriminative model. Classifier-free guidance, center-cropping the error map, and several alternative noise-sampling schemes do not improve accuracy.

## Limitations

- Inference requires many denoiser evaluations and scales approximately with the number of candidate classes; even adaptive elimination remains impractical for large vocabularies.
- The zero-shot objective uses a per-dataset choice between $\ell_1$ and squared $\ell_2$, so the empirical procedure is not entirely hyperparameter-free despite the likelihood-based derivation.
- Stable Diffusion 2.0 was trained on aggressively filtered, high-resolution, aesthetic image-text data. Several evaluation sets are far outside that training distribution, and the paper cannot determine whether particular test images appeared in the broader source data.
- The ImageNet result is computed on a 10,000-image validation subset, while the zero-shot ImageNet result uses 2,000 test images because of inference cost.
- Strong effective robustness appears on ImageNet-A but not ImageNetV2 or ObjectNet; it may partly reflect lower correlation with the ResNet-50 used to construct ImageNet-A.
- Classification inherits the base generator's semantic blind spots. The Birman-versus-Ragdoll example shows that indistinguishable conditional generations also produce classification failures.
- The comparisons with CLIP and OpenCLIP do not control training data, architecture, or compute, so they characterize observed performance rather than isolate the effect of generative versus discriminative training.

## Related Concepts

- [[concepts/generative-classification|Generative Classification]]: predicts labels through class-conditional density scores rather than a directly learned decision boundary.
- [[concepts/diffusion-models|Diffusion Models]]: supply the conditional denoising objective used as an approximate likelihood.
- [[concepts/transferability-evaluation|Transferability Evaluation]]: clarifies what zero-shot reuse establishes and why training-data exposure and evaluation protocol matter.

## Related Papers

- Ho, Jain, and Abbeel (2020), "Denoising Diffusion Probabilistic Models": provides the denoising objective and variational interpretation used by the classifier.
- Rombach et al. (2022), "High-Resolution Image Synthesis with Latent Diffusion Models": supplies the Stable Diffusion family used for zero-shot classification.
- Peebles and Xie (2022), "Scalable Diffusion Models with Transformers": supplies the class-conditional DiT models used for supervised ImageNet classification.
- Radford et al. (2021), "Learning Transferable Visual Models from Natural Language Supervision": provides the principal discriminative zero-shot baseline and prompt templates.
- Thrush et al. (2022), "Winoground": provides the compositional image-caption matching benchmark.
- Zimmermann et al. (2021), "Score-Based Generative Classifiers": studies a related route from score-based generative models to classification.

Source: supplied parsed manuscript, Cognitio job `df602cce-6c69-4f82-8170-198b0bbb52d8`.

[[index|Library home]]
