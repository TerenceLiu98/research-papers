---
title: "SAGE: Salient Factor Discovery and Generation with Visual Foundation Representations"
type: paper
authors:
  - Shuang Liang
  - Lejun Liao
  - Shiyuan Zhang
  - Max C. Zhang
  - Xiaolong Luo
  - Han Wang
  - Stefano Anzellotti
  - Yuan Yuan
year: null
tags:
  - contrastive-analysis
  - representation-learning
  - image-generation
  - subtype-discovery
---

## TL;DR

SAGE decomposes a frozen representation autoencoder's spatial latent into common and target-specific factors using only background/target dataset labels. The salient factors support image editing, subtype discovery, and reference-conditioned generation. On Digits-ImageNet, digit probe accuracy reaches 0.950 versus 0.328 for the unfactorized latent, while generation preserves the reference digit in 90.48% of samples versus 27.70% under raw-latent conditioning. Greater sample diversity comes with worse conditional generation FID; the decomposition does not eliminate all target information from the common factor.

## Research Question

Can background/target labels alone identify image-specific target variation that reveals unlabeled subtypes and generates new examples of those subtypes while varying shared content?

## Motivation

In [[concepts/contrastive-analysis|Contrastive Analysis]], the target dataset contains variation of interest, such as eyeglasses or disease, while a background dataset provides shared content. Earlier generative approaches can decode factors but reconstruct complex images poorly; representation-based approaches can discover structure without providing a decoder. SAGE uses the semantic spatial features and pretrained decoder of a [[concepts/representation-autoencoders|Representation Autoencoder]] to combine these capabilities.

## Contributions

- Factorizes the full spatial latent of frozen RAEv2 into additive common and salient maps, preserving localized attributes for reconstruction, removal, transfer, and interpolation.
- Combines adversarial swaps, sparsity, and recovery objectives to encourage instance-specific salient content with limited shared-content leakage.
- Uses the discovered salient representation as an example-based generation condition, without subtype labels or text descriptions.
- Evaluates digit, eyewear, and retinal-disease subtype structure, including a manually audited FFHQ annotation-error cluster.

## Method

For frozen encoder $E$ and decoder $D$, trainable encoders produce $z_c=E_c(E(x))$ and $z_s=E_s(E(x))$ with the same spatial shape as $z=E(x)$. Targets reconstruct as $D(z_c+z_s)$; backgrounds reconstruct as $D(z_c)$. Pixel, perceptual, and latent reconstruction losses preserve image content, but alone permit the trivial solution $z_s=0$.

Stage 1 therefore combines the following objectives (Section 3.1):

- **Adversarial swapping:** removing target salient factors should produce background-like images, while adding them to background common factors should produce target-like images. Discriminators use reconstructions as real examples to avoid exploiting decoder artifacts.
- **Sparsity:** a squared L2 penalty shrinks background salient maps, and a dataset-specific L1 penalty restricts target salient maps. The salient encoder's output layer starts at zero.
- **Recovery:** image-space cycle consistency and latent-space swap consistency recover the original factors after composition, with stop-gradient targets.
- **Cycle NCE:** corresponding factors before and after swapping form positive pairs; representations of the other factor form negatives. Same-factor off-diagonal pairs are excluded, preserving subtype grouping.

Stage 2 freezes the factorization and globally max-pools the salient map into a 1,024-dimensional reference condition. A separately trained RAEv2-initialized diffusion transformer learns conditional [[concepts/flow-matching|Flow Matching]] on target images. Different noise samples vary common content. Evaluation uses 50-step Euler sampling, internal guidance, and additional classifier-free guidance for Digits-ImageNet. The method seeks decodable, composable factors, rather than statistical independence.

## Experiments

**Data and protocol.** Digits-ImageNet overlays MNIST digits on photographs, with disjoint source photographs for background and target groups and 24,739 target validation images. FFHQ training uses 10,000 faces per group; evaluation audits 3,437 target images. OCT-Kermany uses 97,478 cleaned training scans and the official 1,000-image test set from patients absent from training and validation. Representation learning uses only group labels. Subtype probes use supervised cross-validation on frozen features; k-means uses the known evaluation class count. Clustering scores average three k-means seeds, not independent model training runs.

**Reconstruction and discovery (Tables 1 and 6).**

| Dataset | Reconstruction FID | Salient probe accuracy | ARI / NMI |
| --- | ---: | ---: | ---: |
| Digits-ImageNet | 1.78 | 0.950 | 0.337 / 0.472 |
| FFHQ, two audited eyewear classes | 1.65 | 0.983 | 0.939 / 0.865 |
| OCT-Kermany, three diseases | 27.21 | 0.960 | 0.415 / 0.415 |

FFHQ reports balanced probe accuracy. OCT FID is based on only 1,000 images and is not directly comparable to larger evaluation sets. On Digits-ImageNet, the best compared CA baseline has probe accuracy 0.281; DINOv3 + SepCLR obtains 0.148. Generative CA baselines have reconstruction FID above 120 on both natural-image benchmarks, whereas decoding the unfactorized latent itself achieves 0.39 on Digits-ImageNet.

**Annotation audit.** Manual review, conducted without showing annotators SAGE assignments, corrected 125 FFHQ labels (3.64%). SAGE grouped 34 of the 39 verified no-glasses images separately; the other five resembled eyewear through face paint or masks. The remaining corrections between eyewear types came from the audit, not automatic SAGE detection. Including no-glasses images as a third class gives ARI/NMI 0.937/0.865, compared with 0.453/0.550 for DINOv3 + SepCLR. Finer sunglasses styles are qualitative groups without independent style labels.

**Generation (Table 2).** Raw and salient conditions use separate models with the same training budget and paired reference/noise lists. Diversity uses 16 samples per reference and DINOv2-L features.

| Dataset and condition | Conditional gFID | Subtype accuracy (%) | Within-condition Vendi |
| --- | ---: | ---: | ---: |
| Digits-ImageNet, raw DINOv3 | 2.40 | 27.70 | 2.65 |
| Digits-ImageNet, SAGE | 4.09 | 90.48 | 12.50 |
| FFHQ, raw DINOv3 | 11.17 | 98.5 | 2.32 |
| FFHQ, SAGE | 16.03 | 96.6 | 6.96 |

SAGE increases diversity and lowers reference similarity on both datasets, consistent with reduced copying. Conditional FID worsens on both, and FFHQ subtype accuracy decreases slightly. Unconditional gFID improves from 8.86 to 4.76 on Digits-ImageNet and from 16.07 to 15.80 on FFHQ.

**Ablations (Tables 3 and 7).** Removing adversarial swapping reduces digit probe accuracy from 0.950 to 0.123. Removing target sparsity raises the salient ImageNet-category probe from 0.045 to 0.302, indicating shared-content leakage. Removing Cycle NCE raises that probe to 0.100 while preserving digit accuracy at 0.950. Some ablations improve clustering or reconstruction; the full objective prioritizes low shared-category leakage rather than maximizing every metric.

## Limitations

- Group labels underdetermine the split of correlated attributes. Digit identity remains decodable from the common factor at 0.336 accuracy, close to 0.328 for the original latent, despite visible digit removal after decoding (Appendix E).
- DINOv3 + SepCLR shares the backbone and branch architecture but uses average pooling and a 32-dimensional evaluation representation, versus SAGE's max pooling and 1,024 dimensions. This comparison does not isolate the loss functions alone.
- Known class counts inform clustering evaluation, and probe training uses subtype labels. These results assess representations learned without subtype supervision, not fully label-free selection of subtype numbers.
- OCT edits are qualitative and do not establish clinical validity. No OCT baseline comparison or Stage 2 disease-generation evaluation is reported.
- Reconstruction benefits from a pretrained encoder and decoder, whereas generative CA baselines train from scratch; Double-InfoGAN also uses a lower native resolution. K-means seed variation does not measure training-run uncertainty.
- The supplied manuscript promises code, models, and audited labels upon publication. It provides no explicit publication year, venue, or identifier for SAGE; these are left unspecified.

## Related Concepts

- [[concepts/contrastive-analysis|Contrastive Analysis]]: the background/target factor-discovery problem.
- [[concepts/representation-autoencoders|Representation Autoencoders]]: the frozen semantic latent and decoder used in both stages.
- [[concepts/disentangled-representations|Disentangled Representations]]: separating factors, with incomplete exclusivity in SAGE.
- [[concepts/flow-matching|Flow Matching]]: the conditional generation objective.

## Related Papers

- Abid and Zou (2019), "Contrastive variational autoencoder enhances salient features": generative CA baseline.
- Louiset et al. (2024), "Separating common from salient patterns with contrastive representation learning": SepCLR, including the shared-backbone comparison.
- Singh et al. (2026), "Improved baselines with representation autoencoders": the RAEv2 backbone, decoder, and generation initialization.
- Soumm et al. (2026), "Diff-CA: Separating common and salient factors with diffusion models": concurrent work separating compact conditioning tokens rather than full spatial maps.

[[index|Library home]]
