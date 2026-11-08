---
title: "Recursive CLIP: Vision-Language Distillation with Looped Transformer Blocks"
type: paper
authors:
  - Szymon Mazurek
  - Alberto Presta
  - Michal Byra
year: null
source_job_id: "9396ef2d-d1cf-4672-83bc-f02e63e2cccf"
tags:
  - vision-language-models
  - recurrent-transformers
  - knowledge-distillation
  - parameter-efficiency
  - low-rank-adaptation
---

## TL;DR

Recursive CLIP replaces the 12 distinct Transformer blocks in one or both CLIP encoders with $N$ blocks applied $M$ times, holding $N M=12$. Distillation from a DFN-2B ViT-B/16 teacher lets these recurrent students retain substantial zero-shot, retrieval, and adaptation performance while storing fewer backbone and LoRA parameters. A six-block vision-recursive model reaches 68.8% ImageNet zero-shot accuracy with 107.08M parameters, versus 72.5% with 149.62M for the distilled non-recursive student. Output-level feature and relational distillation transfer effectively, but layerwise activation matching collapses for the one-block student, showing that a recurrent model can reproduce useful terminal representations without following the teacher's intermediate trajectory.

## Research Question

How extensively can CLIP reuse Transformer blocks across depth while retaining transferable image-text representations, and which distillation signals and downstream adaptation methods remain effective under this parameter sharing?

## Motivation

Standard CLIP encoders assign separate parameters to every Transformer depth. Recurrent depth instead trades unique parameters for repeated computation: a smaller set of blocks is reused while the number of block evaluations remains fixed. This separates storage and adaptation cost from computational depth, but it also constrains one block to operate on representations from several stages of the network. The paper tests whether conventional CLIP knowledge can survive that constraint and whether the resulting models remain useful beyond zero-shot classification.

## Contributions

- Defines rCLIP, which makes only the vision encoder recurrent, and r2CLIP, which makes both vision and text encoders recurrent, across five block/iteration configurations at fixed effective depth.
- Compares direct CLIP training with distillation from a conventional DFN-2B ViT-B/16 teacher using output-level and intermediate objectives.
- Shows that activation matching is poorly suited to the most strongly shared student even when its weight is increased by a factor of 2,000.
- Evaluates distilled models on zero-shot classification, cross-modal retrieval, 16-shot classification, visual grounding, and concept unlearning.
- Quantifies how block reuse reduces both stored backbone parameters and the number of distinct LoRA adapters used for downstream adaptation.

## Method

The recursive core contains $N$ distinct blocks,

$$
F=B_N\circ B_{N-1}\circ\cdots\circ B_1,
$$

and applies this composite map $M$ times. All models satisfy $N M=12$, using configurations from one block repeated 12 times through six blocks repeated twice. The tokenizer and CLIP output mapping are unchanged, and there are no iteration-specific embeddings. Consequently, the models are matched in block evaluations and nominal GMACs but differ in unique parameter count. rCLIP shares only the vision blocks; r2CLIP also shares the text blocks.

Students are trained on 13,874,493 CC3M and CC12M image-caption pairs for 32 epochs. The teacher is a ViT-B/16 CLIP pretrained on DFN-2B. The selected loss combines the ordinary symmetric CLIP contrastive objective, contrastive relational distillation with weight 1, and feature distillation with weight $10^4$; interactive contrastive learning and activation matching are omitted.

For activation matching, each unrolled student execution is paired with the teacher layer at the same global depth. This makes one recurrent block responsible for matching several distinct teacher states. The paper tests this constraint separately and finds that it transfers poorly to the one-block recurrent student.

Downstream adaptation attaches LoRA parameters to each distinct block and reuses them on every execution. This makes adapter count depend on $N$, not on the 12-step effective depth. The evaluation uses CLIP-LoRA for 16-shot classification, a HiVG-based grounding system, and DIET for retain-data-free class unlearning.

## Experiments

**Direct training and distillation.** Without a teacher, ImageNet accuracy rises from 32.8% to 36.5% across the rCLIP grid; adding text recurrence has little additional cost. Distillation raises rCLIP to 56.7% with one block and 68.8% with six, compared with 72.5% for the non-recursive distilled student. r2CLIP reaches 52.0% and 67.7% at those endpoints. Text recurrence has a larger effect on retrieval: at six blocks, Flickr image-to-text Recall@1 is 85.4 for rCLIP and 83.7 for r2CLIP.

**Distillation objectives.** On CC3M, feature distillation is the strongest individual output-level objective. Activation matching reaches 31.0% ImageNet accuracy for the non-recursive student but only 15.5% for rCLIP 1b12i, versus 30.3% for the full output-level composition. Raising its weight from 1 to 2,000 improves the non-recursive model by 10.6 points but changes the recursive model by -0.2 points. This supports an incompatibility between strict teacher-trajectory matching and extreme parameter reuse rather than simple under-weighting.

**Parameter trade-off.** The non-recursive student has 149.62M parameters. rCLIP ranges from 71.65M to 107.08M, while r2CLIP ranges from 36.97M to 88.16M. These reductions do not reduce block evaluations at matched effective depth: every configuration retains 17.57 visual and 2.98 text GMACs under the reported input settings.

**Few-shot classification.** Six-block rCLIP improves from 68.54% to 72.13% on ImageNet after 16-shot CLIP-LoRA adaptation, compared with 75.18% for the distilled reference. Adaptation narrows the average gap across ten datasets, although Aircraft remains difficult and EuroSAT is non-monotone in block count. At LoRA rank 2, the paper reports 184,320 trainable adapter parameters for the non-recursive control, 82,944-129,024 for rCLIP, and 15,360-92,160 for r2CLIP.

**Visual grounding.** Grounding is comparatively insensitive to recurrence. Across ten splits, the full-grid average ranges from 71.9 to 75.3 for rCLIP and 72.1 to 75.6 for r2CLIP, versus 75.7-76.6 for the three non-recursive references. Six-block rCLIP reaches 78.73 on RefCOCO testB versus 78.85 for the distilled reference and slightly exceeds all three references on ReferItGame.

**Concept unlearning.** DIET reduces forget-class accuracy for every backbone, but highly shared students generally retain less test accuracy. Average retention after unlearning is 57.6-74.4% of the pre-unlearning value across recursive configurations, versus 72.2-82.8% for the non-recursive references. The authors caution that individual configurations are sensitive to per-backbone learning-rate selection and should not be treated as clean evidence about a particular block count.

## Limitations

- Most configurations use one training run, so small differences are not reliable estimates of architecture effects.
- The activation-matching conclusion is based on the 1b12i rCLIP configuration at two weights; the predicted improvement as recurrence weakens is not tested.
- The distillation loss is selected on CC3M and transferred to CC3M plus CC12M without revalidation; it is not separately tuned for r2CLIP.
- Effective depth and GMACs are held fixed, so parameter reduction does not establish lower arithmetic cost or latency.
- Downstream methods and hyperparameters were designed for non-recursive models. In particular, the DIET learning-rate search can trade retention for near-complete forgetting.
- The supplied manuscript gives no publication venue, DOI, arXiv identifier, or explicit year, so those metadata remain unset.

## Related Concepts

- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: formalizes the trade between unique parameter depth and repeated block execution tested by rCLIP and r2CLIP.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfers the conventional teacher's terminal embedding geometry into recurrent students; output-level signals work better than strict trajectory matching here.
- [[concepts/feature-dynamics-distillation|Feature Dynamics Distillation]]: provides a contrasting approach to intermediate supervision, while this paper shows that pointwise teacher-layer alignment can conflict with tied recurrent updates.
- [[concepts/adaptive-computation|Adaptive Computation]]: also varies computation independently of stored parameters, although Recursive CLIP fixes the number of iterations rather than selecting it per input.

## Related Papers

- [[papers/block-recurrent-dynamics-in-vits|Block-Recurrent Dynamics in ViTs]] distills conventional visual encoders into recurrent phase-based surrogates and motivates the activation-trajectory comparison used here.
- [[papers/elt-elastic-looped-transformers-for-visual-generation|ELT: Elastic Looped Transformers for Visual Generation]] applies recurrent depth to image and video generators and trains several loop depths to remain predictive.
- [[papers/looping-back-to-move-forward-recursive-transformers-for-efficient-and-flexible-large-multimodal-models|Looping Back to Move Forward]] reuses a multimodal backbone across passes rather than making CLIP's encoder blocks recurrent.
- Yang et al. (2024), *CLIP-KD: An Empirical Study of CLIP Model Distillation*, supplies the output-level distillation objectives adapted in this paper.
- Wu et al. (2023), *TinyCLIP: CLIP Distillation via Affinity Mimicking and Weight Inheritance*, compresses CLIP using affinity transfer and inherited weights rather than fixed-depth block recurrence.

[[index|Library home]]
