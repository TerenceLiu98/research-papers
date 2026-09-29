---
title: "Interpretable and Steerable Concept Bottleneck Sparse Autoencoders"
type: paper
authors:
  - Akshay Kulkarni
  - Tsui-Wei Weng
  - Vivek Narayanaswamy
  - Shusen Liu
  - Wesam A. Sakla
  - Kowshik Thopalli
year: null
tags:
  - sparse-autoencoders
  - concept-bottleneck-models
  - mechanistic-interpretability
  - vision-language-models
  - model-steering
---

## TL;DR

This paper introduces Concept Bottleneck Sparse Autoencoders (CB-SAE), a post-hoc hybrid of [[concepts/sparse-autoencoders|Sparse Autoencoders]] and [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]. CB-SAE prunes sparse-autoencoder neurons with low interpretability or steerability, then adds a lightweight bottleneck aligned to user-specified concepts. Across LLaVA and UnCLIP experiments, the authors report average gains of 32.1% in interpretability and 14.5% in steerability over a standard SAE baseline, while retaining unsupervised feature discovery.

## Research Question

Can a sparse autoencoder for vision representations combine the discovery of useful latent features with reliable coverage of user-specified concepts and causal control of downstream model outputs?

## Motivation

Sparse autoencoders produce overcomplete, sparse representations that can expose human-interpretable features, but interpretability does not ensure that intervening on a feature changes a downstream output in the intended way. The paper's analysis also finds that an SAE can miss many concepts from larger or more linguistically diverse concept sets, even when trained on related ImageNet data.

Concept bottleneck models provide explicit human-defined concepts and therefore better concept coverage and controllability, but they ordinarily cannot discover features outside their predefined bottleneck. CB-SAE is motivated by combining these complementary properties.

## Contributions

- Introduces neuron-level interpretability and steerability evaluations for SAEs in vision and vision-language settings.
- Shows that only 18.84% of neurons in the main CLIP/LLaVA analysis are above the mean on both measures; the remaining neurons are low on at least one measure.
- Proposes CB-SAE, which retains high-utility SAE neurons and adds a concept bottleneck for concepts absent from the retained SAE.
- Uses a cyclic reconstruction objective to make concept interventions survive reconstruction and remain useful across text-generation and image-generation downstream tasks.
- Demonstrates consistent improvements over the baseline SAE across LLaVA-1.5-7B, LLaVA-MORE, and UnCLIP, with ablations covering pruning scores, retained-neuron count, SAE type, and the steerability loss.

## Method

The baseline is a Matryoshka Batch Top-k SAE trained on layer 22 activations of a CLIP-ViT-L/14-336 vision encoder using ImageNet-1K. It has 65,536 latent neurons and an expansion factor of 64. CLIP-Dissect assigns each neuron a concept and produces an interpretability score. Steerability is measured by setting one latent neuron to a high value and evaluating the resulting LLaVA text output against the assigned concept in a sentence-transformer space. For UnCLIP, the analogous score compares steered images with highly activating images in DINOv2 space.

For each SAE neuron, the method computes interpretability $I$ and steerability $S$, then prunes the bottom $M$ neurons ranked by $I + S$. In the main experiment, 30,000 SAE neurons are retained. The retained SAE weights are frozen. A linear concept encoder and decoder are added for a concept set consisting of user-specified concepts absent from the retained SAE. A top-$k$ activation function with $k=5$ sparsifies concept contributions in the decoder.

CB-SAE is trained with three objectives: mean-squared reconstruction of the original vision activation; a cosine-cubed loss aligning concept-encoder outputs with CLIP zero-shot concept predictions; and a cyclic reconstruction loss that re-encodes the reconstructed activation and aligns it with the same pseudo-labels. The encoder and decoder are updated by alternating Adam optimizers, while the retained SAE remains fixed.

The interpretability loss updates only the concept encoder; the cyclic loss updates only the concept decoder. Top-$k$ sparsity is applied only during decoding, so the encoder can describe more than $k$ concepts. The main setup uses the VLG-CBM ImageNet concept set and CLIP-ViT-B/16 pseudo-labels, with a stronger CLIP model for evaluation (Sections 5.2 and 6.1).

## Experiments

### SAE analysis

In the main CLIP/LLaVA analysis, neurons fall into four groups according to whether their interpretability and steerability are above their respective means:

| Group | Share | Count |
| --- | ---: | ---: |
| Low interpretability, low steerability | 36.26% | 23,763 |
| High interpretability, low steerability | 19.87% | 13,022 |
| Low interpretability, high steerability | 25.03% | 16,403 |
| High interpretability, high steerability | 18.84% | 12,348 |

Concept coverage also depends strongly on the concept set. The baseline SAE covers 96.3% of Broden concepts, but only 72.8% of VLG-CBM concepts, 55.3% of DECIDER concepts, 61.9% of 3,000 common English words, and 28.0% of 20,000 common English words.

These groups depend on the evaluation threshold. Appendix C.2 replaces the mean steerability threshold of 0.232 with a null baseline of 0.173 from the original CLIP layer's neurons; the share high on both measures rises from 18.84% to 29.14%. The 18.84% figure therefore describes a relative ranking under the main protocol, not an absolute fraction of usable features.

### Quantitative comparison

All scores below are normalized so higher is better. CD is the CLIP-Dissect interpretability score, MS is monosemanticity, and the two steerability columns use unit-vector and white-image interventions.

Both interventions set the selected neuron to 50. Unit-vector steering zeros the other neurons; white-image steering retains their activations for a blank white input. LLaVA scores compare generated text with the assigned concept in sentence-embedding space; UnCLIP scores compare the generated image with the top-16 activating images in DINOv2 space. Their absolute steerability scores are therefore not directly comparable across tasks (Section 6.1 and Appendix C.2).

| Downstream model | Method | CD | MS | Unit-vector | White-image |
| --- | --- | ---: | ---: | ---: | ---: |
| LLaVA-1.5-7B | SAE | 0.154 | 0.517 | 0.198 | 0.203 |
| LLaVA-1.5-7B | CB-SAE | 0.244 | 0.556 | 0.261 | 0.250 |
| LLaVA-MORE | SAE | 0.194 | 0.553 | 0.179 | 0.177 |
| LLaVA-MORE | CB-SAE | 0.291 | 0.598 | 0.192 | 0.189 |
| UnCLIP | SAE | 0.058 | 0.540 | 0.642 | 0.654 |
| UnCLIP | CB-SAE | 0.092 | 0.594 | 0.659 | 0.664 |

The reported average improvements are 33.0% in interpretability and 27.5% in steerability for LLaVA-1.5-7B, 29.0% and 14.0% for LLaVA-MORE, and 34.3% and 2.1% for UnCLIP. Thus, interpretability gains are consistent, while steerability gains are smaller and more dependent on the downstream model.

**Source inconsistency:** Section 6.2 reports the LLaVA-MORE steerability gain as 14.0%, but Table 1 implies relative gains of approximately 7.3% and 6.8%, averaging 7.0%. The abstract's overall 14.5% gain is also not reproduced by averaging the six relative steerability gains in the displayed table (approximately 12.2%). These calculations use rounded table entries; the reported headline gains should be read with this discrepancy in mind.

### Ablations and analysis

- Discarded SAE neurons score 0.084 on CLIP-Dissect and 0.144/0.162 on the two steerability measures. Retained SAE neurons score 0.238 and 0.263/0.252, while CB neurons score 0.323 and 0.231/0.219. CB neurons are the most interpretable, but retained SAE neurons remain more steerable.
- Pruning by both interpretability and steerability gives a more balanced result than using either score alone. Steerability-only pruning substantially harms reconstruction, whereas pruning by interpretability or by both scores preserves reconstruction more closely.
- Adding the steerability loss leaves interpretability similar and improves steerability by a reported 2.9% (Figure 5C).
- A CB-AE without any retained SAE has higher interpretability than CB-SAE but lower steerability, supporting the value of combining supervised concepts with retained SAE features.
- The number of active concept neurons affects a reconstruction-steerability tradeoff: reconstruction improves as $k$ grows, while concept steerability peaks and then declines at larger $k$.
- Steerability scores for 1,329 shared CB concepts across LLaVA and UnCLIP have Pearson correlation 0.06 ($p=0.035$), suggesting that steerability is substantially downstream-task dependent.

Table 5 reports zero-shot ImageNet accuracy of 74.07% for the baseline SAE reconstruction, 73.78% for CB-SAE with both pruning scores, and 70.99% for steerability-only pruning. Appendix C.2 also finds that low-interpretability neurons can contribute more to reconstruction than high-interpretability neurons, so low semantic utility does not imply negligible reconstruction value.

## Limitations

CB-SAE depends on CLIP-Dissect to assign reliable concepts to neurons and on a CLIP zero-shot classifier to provide concept pseudo-labels. Errors or blind spots in those models can affect pruning, concept selection, and training. The method also relies on a user-supplied concept set and does not guarantee that every desired concept is represented accurately.

The retained SAE neurons are generally more steerable than the added CB neurons, so explicit concept alignment does not by itself solve the full interpretability-steerability tradeoff. Steering behavior varies across downstream architectures, and the weak LLaVA/UnCLIP correlation limits claims of task-independent control. Pruning also creates a reconstruction cost, which the CB module only partially offsets. The paper's evaluation is limited to vision encoders, two LLaVA variants, and UnCLIP; broader models, concept sets, and task-specific steering objectives remain open directions.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-bottleneck-sparse-autoencoders|Concept Bottleneck Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/hierarchical-concept-embedding|Hierarchical Concept Embedding]]

## Related Papers

- Pach et al. (2025), "Sparse autoencoders learn monosemantic features in vision-language models."
- Oikarinen and Weng (2023), "CLIP-Dissect: Automatic description of neuron representations in deep vision networks."
- Koh et al. (2020), "Concept bottleneck models."
- Oikarinen, Das, Nguyen, and Weng (2023), "Label-free concept bottleneck models."
- Kulkarni et al. (2025), "Interpretable generative models through post-hoc concept bottlenecks."
- Srivastava, Yan, and Weng (2024), "VLG-CBM: Training concept bottleneck models with vision-language guidance."
- Yang et al. (2025), "AlignSAE: Concept-aligned sparse autoencoders."

[[index|Library home]]
