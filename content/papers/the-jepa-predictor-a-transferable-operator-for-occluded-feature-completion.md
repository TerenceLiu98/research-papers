---
title: "The JEPA Predictor: A Transferable Operator for Occluded Feature Completion"
type: paper
authors:
  - William Nguyen
  - Christopher Nguyen
year: null
source_job_id: "a5944ffb-5f0c-442e-bf31-25595931eb04"
tags:
  - self-supervised-learning
  - representation-learning
  - occlusion-robustness
  - feature-alignment
---

## TL;DR

A frozen predictor taken from I-JEPA or V-JEPA 2 can complete masked-position features for a different frozen image encoder after a single ridge-regression bridge aligns their feature spaces. Across CLIP, DINOv3, DINOv2, and MAE hosts, the gain over masked encoder-only features increases with the masked fraction on ImageNet-9 and Stanford Dogs. The method is strongest under heavy contiguous occlusion, while the bridge can hurt at light occlusion on fine-grained classification.

## Research Question

Can a JEPA predictor trained with one encoder act as a reusable feature-completion operator for other frozen encoder families, without retraining either model?

## Motivation

[[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] train a predictor to infer target-region embeddings from visible context, but downstream use normally discards that predictor. Partial-view classification needs precisely this mapping from visible features to features at missing positions. The paper tests whether that learned operation is tied to its original encoder or can survive a simple alignment between independently trained representation spaces.

## Contributions

- Introduces a cross-encoder protocol that connects a frozen non-JEPA host to a frozen JEPA predictor through one closed-form linear bridge fitted on 500 unmasked ImageNet-1k images.
- Evaluates four host families, two donor predictors, three mask fractions, three seeds, and two principal datasets, with matched linear probes and encoder-only, nearest-neighbor, and pixel-completion controls.
- Reports a monotonic increase in predictor lift with mask fraction for every host-donor pair on ImageNet-9 and Stanford Dogs, and identifies a tradeoff between visible-patch projection cost and masked-patch completion benefit.
- Separates classification usefulness from feature reconstruction fidelity: V-JEPA 2 predictor outputs remain useful to a matched probe despite occupying a different L2 frame from encoder outputs.

## Method

For a patch mask with fraction $K$, a frozen host encoder produces features for the partial image. A matrix $W$ projects host features into the donor JEPA feature space. The donor's frozen predictor uses projected visible features and masked-position tokens to predict features at missing positions; visible projected features and predicted masked features are stitched, mean-pooled, and classified.

The bridge is fitted once for each host-donor pair by ridge least squares with $\lambda=10^{-2}$ on matched patch tokens from 500 unmasked ImageNet-1k images. It is reused across datasets, mask fractions, and seeds. Within-JEPA evaluation is the special case with the native encoder and no bridge. A [[concepts/linear-probing|Linear Probe]] is trained at the same mask fraction as evaluation; an appendix also pools all three mask fractions into one occlusion-augmented probe.

The proposed explanation is a cost-benefit balance. The lossy bridge affects every visible patch, whereas the predictor contributes only at masked patches. Increasing $K$ reduces the number of positions paying projection cost and increases the number receiving completion benefit.

## Experiments

The main cross-encoder grid pairs CLIP, DINOv3, DINOv2, and MAE with I-JEPA and V-JEPA 2 predictors at $K\in\{0.25,0.56,0.77\}$ on ImageNet-9 and Stanford Dogs. All eight host-donor pairs show increasing lift with $K$ on both datasets. At $K=0.77$, seven of eight pairs have Welch-$t$ 95% confidence intervals above zero on both datasets; MAE with V-JEPA 2 is positive in all three Stanford Dogs seeds but does not meet that criterion on both datasets.

CLIP with the I-JEPA predictor rises from 73.62% to 97.08% on ImageNet-9 at $K=0.77$, a 23.46 percentage-point lift. On Stanford Dogs it rises from 15.87% to 52.05%, a 36.18-point lift. DINOv3 and DINOv2 begin from stronger masked baselines and receive smaller gains. I-JEPA is the stronger donor in every tested host pair at heavy mask.

Native predictors also help their own JEPA encoders: at $K=0.77$, I-JEPA gains 22.23 points on ImageNet-9 and 26.04 points on Stanford Dogs, while V-JEPA 2 gains 15.39 and 18.51 points. On a 9,000-image ImageNet-1k validation subset at $K=0.56$, native predictor lifts are 10.55 points for I-JEPA and 6.88 for V-JEPA 2, although their completed accuracies remain below the DINOv3 encoder-only result in that setting.

Controls support a predictor-specific effect. On ImageNet-9 at $K=0.77$, applying $W$ without the predictor stays at or below the host baseline, while the full method improves it. At $K=0.56$, I-JEPA latent completion exceeds MAE pixel completion by 15.84 points. The gain falls from 8.19 points for a centered rectangle to 0.41 points for random Bernoulli masking, whose confidence interval includes zero. A single probe trained across all three occlusion levels retains the same qualitative heavy-mask benefit.

## Limitations

- The contribution is localized to moderate or heavy contiguous occlusion. At small $K$, confidence intervals can include zero; several cross-encoder settings lose accuracy at $K=0.25$ on Stanford Dogs.
- Random scattered masking largely removes the gain, so the results should not be generalized to pixel-wise dropout or similar corruption.
- Cross-encoder transfer is tested on ImageNet-9 and Stanford Dogs. ImageNet-1k evaluation covers native JEPA predictors only and a single mask fraction; medical, satellite, document, and other named deployment domains remain untested.
- The method fits a bridge using paired outputs on 500 images and normally fits a separate probe for each deployment mask fraction. The mixed-$K$ appendix relaxes the latter requirement but uses each training image at multiple occlusion levels.
- The MAE pixel-completion comparison is evaluated at only one mask fraction, and encoder-scale and iterative-refinement ablations were omitted.
- A useful predictor output is not necessarily a faithful reconstruction of the encoder feature that a visible patch would produce. This distinction is especially important for V-JEPA 2's shifted feature frame.
- The supplied manuscript states no publication year, venue, DOI, or arXiv identifier, so those metadata are left unspecified here.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/platonic-representation-hypothesis|Platonic Representation Hypothesis]]
- [[concepts/fixed-coordinate-compatibility|Fixed-Coordinate Compatibility]]

## Related Papers

- Assran et al. (2023), "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture": supplies the I-JEPA encoder and predictor used as a donor (reference [2]).
- Assran, Bardes, et al. (2025), "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning": supplies the second donor predictor (reference [3]).
- Bansal, Nakkiran, and Barak (2021), "Revisiting Model Stitching to Compare Neural Representations": motivates the use of a small learned map between frozen representation spaces (reference [7]).
- [[papers/proving-and-improving-the-platonic-representation-hypothesis-with-jepas|Proving and Improving the Platonic Representation Hypothesis with JEPAs]] studies when separately trained JEPA representations align, whereas this paper fits an explicit ridge bridge to reuse a predictor across encoder families.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] analyzes latent recovery and planning under restricted population assumptions; the present paper instead evaluates predictor reuse for discriminative completion.

[[index|Library home]]
