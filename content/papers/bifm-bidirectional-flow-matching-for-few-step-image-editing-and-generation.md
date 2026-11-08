---
title: "BiFM: Bidirectional Flow Matching for Few-Step Image Editing and Generation"
type: paper
authors:
  - Yasong Dai
  - Zeeshan Hayder
  - David Ahmedt-Aristizabal
  - Hongdong Li
year: null
source_job_id: 2946e77c-2212-428f-847e-e9ac1a2585e7
tags:
  - flow-matching
  - image-editing
  - few-step-generation
  - diffusion-inversion
---

## TL;DR

BiFM trains one flow model to predict finite-interval average velocities in both noise-to-image and image-to-noise directions. A bidirectional consistency loss encourages the two predictions to reverse each other, while interval conditioning supports one- or few-step generation and inversion. The reported experiments show strong reconstruction, editing, and generation results, but the best method depends on the metric and sampling budget.

## Research Question

Can a few-step generative model learn its own inversion process, rather than reversing an approximate sampler or adding a separate inversion network, while retaining competitive image generation and prompt-guided editing quality?

## Motivation

Inversion-based editing first maps an image toward noise and then generates toward a target prompt. Standard diffusion and [[concepts/flow-matching|Flow Matching]] models learn the generative direction and recover inversion by numerically reversing their dynamics. Large time steps make this reversal inaccurate because local solver approximations accumulate less gradually. Existing tuned alternatives can introduce a separate inversion network or task-specific machinery. BiFM instead extends [[concepts/average-velocity-fields|Average Velocity Fields]] to both time directions inside one model.

## Contributions

- Extends finite-interval velocity learning from generation alone to joint generation and inversion under a shared instantaneous flow field.
- Adds a consistency objective that encourages forward and backward average-velocity predictions over the same trajectory interval to be negatives of one another.
- Conditions the network on the start time and signed interval through an additional time embedding, supporting arbitrary interval directions and step decompositions.
- Demonstrates both training from scratch and LoRA-based fine-tuning of Stable Diffusion 3 for inversion-based editing.
- Evaluates reconstruction, prompt-guided editing, one-step generation, and multi-step generation on PIE-Bench, MSCOCO-256, CIFAR-10, and ImageNet.

## Method

For a flow trajectory with instantaneous field $v$, BiFM models the average velocity over an interval from $t$ to $t'$:

$$
u(x_t,t,t')=\frac{1}{t'-t}\int_t^{t'}v(x_\tau,\tau)\,d\tau.
$$

The paper uses the MeanFlow identity to build a stopped regression target from the instantaneous velocity and a Jacobian-vector product of the learned average field. Unlike ordinary MeanFlow training, time pairs are not restricted to the generative direction. The same network therefore receives both $(x_t,t,t')$ and the corresponding reverse input $(x_{t'},t',t)$.

Along an exact trajectory, reversing the interval changes the sign of the average velocity. BiFM explicitly regularizes this property with

$$
\mathcal L_{\mathrm{BiFM}}
=\mathcal D\left(u_\theta(x_t,t,t'),-u_\theta(x_{t'},t',t)\right),
$$

and combines it with the MeanFlow regression loss. A warm-up schedule gradually strengthens the consistency term. The architecture embeds $t$ and $t'-t$ separately, adds the embeddings, and injects the result through the backbone's existing time-conditioning mechanism.

For Stable Diffusion 3 Medium, the method trains LoRA adapters in MMDiT blocks plus a zero-initialized interval-embedding module. Editing inverts the source image with its source prompt and then generates from that latent with the target prompt. A requested interval can be traversed in one step or partitioned for multi-step inference.

## Experiments

**Reconstruction.** On PIE-Bench with 50 inversion steps, BiFM reports the best value among the listed methods on all four reconstruction metrics: MSE $87.72\times10^{-4}$, LPIPS $89.49\times10^{-3}$, SSIM 88.03%, and PSNR 30.32. The comparison includes DDIM, Null-Text Inversion, PnP Inversion, and RF-Solver (Table 2).

**Prompt-guided editing.** At four function evaluations, BiFM reports LPIPS 67.25, SSIM 87.29%, PSNR 28.92, whole-image CLIP 26.77, and edited-region CLIP 23.58. It improves the listed structural and semantic metrics over DDIM, TurboEdit, FireFlow, and ReNoise, but InstantEdit has lower LPIPS and MSE. At one evaluation, BiFM improves over SwiftEdit on SSIM, PSNR, MSE, and both CLIP scores, while SwiftEdit has slightly lower LPIPS (91.04 versus 92.30). In the 50-evaluation group, BiFM does not dominate every individual metric: DNAEdit has higher CLIP scores and EditFT has higher SSIM and lower MSE (Table 1).

**Generation.** On MSCOCO-256, MMDiT plus BiFM obtains FID 4.57, compared with 6.05 for vanilla MMDiT, 4.73 for MMDiT+REPA, and 5.02 for MMDiT+MeanFlow (Table 4). On CIFAR-10, BiFM reports FID 2.75 at one evaluation and 2.17 at 50 evaluations, versus MeanFlow's one-step 2.92 and ordinary flow matching's 50-step 2.63 (Table 5). Across SiT-B/2, L/2, and XL/2 trained for 80 ImageNet epochs, adding BiFM lowers the reported multi-step FID from 33.0 to 27.8, 18.8 to 16.4, and 17.2 to 15.5 (Table 6).

**Ablations.** In the paper's 1-NFE ImageNet-256 ablation, conditioning on $(t,t'-t)$ gives FID 55.22, outperforming the other tested time parameterizations. A log-normal time sampler, warm-up consistency weighting, and the reported $p=1$ loss setting perform best among their respective tested alternatives (Table 3). These values come from the ablation configuration and should not be compared directly with the larger headline generation settings.

## Limitations

- Editing fine-tuning is resource intensive: the appendix reports 32 H100 GPUs and about 120 hours for 100 epochs on Stable Diffusion 3 Medium, even though only LoRA and interval-embedding parameters are trained.
- The editing model is trained on approximately 10,000 MagicBrush triplets and evaluated primarily through PIE-Bench; generalization to other editing distributions is not established.
- Metric trade-offs remain. BiFM does not win every background-preservation or semantic metric at each sampling budget, and the supplementary results explicitly report worse CLIP semantics than DNAEdit in one multi-step comparison and worse LPIPS than some few-step alternatives.
- The bidirectional loss encourages approximate reversal but does not make the neural architecture exactly invertible or prove cycle recovery for finite-capacity trained models.
- Several comparisons use different architectures, training procedures, or function-evaluation counts. The strongest claims should therefore be read within each table's stated regime rather than as universal dominance.
- The supplied manuscript does not state a publication year, venue, DOI, arXiv identifier, or code URL for BiFM, so these metadata are not inferred.

## Related Concepts

- [[concepts/average-velocity-fields|Average Velocity Fields]]: finite-interval displacement prediction and the MeanFlow identity extended here to both time directions.
- [[concepts/flow-matching|Flow Matching]]: supplies the underlying instantaneous velocity field and ODE transport view.
- [[concepts/diffusion-models|Diffusion Models]]: the iterative generative framework whose inversion errors motivate the method.
- Low-rank adaptation (LoRA): used to fine-tune the Stable Diffusion 3 backbone for editing.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: supplies the finite-interval identity that BiFM extends to inversion and bidirectional consistency.
- Song, Meng, and Ermon (2020), "Denoising Diffusion Implicit Models": supplies the deterministic sampler and inversion baseline whose few-step approximation error motivates BiFM.
- Starodubcev et al. (2024), "Invertible Consistency Distillation for Text-Guided Image Editing in Around 7 Steps": a cited jointly forward/backward consistency-distillation approach.
- Nguyen et al. (2025), "SwiftEdit: Lightning Fast Text-Guided Image Editing via One-Step Diffusion": the one-step editing baseline used in the paper's PIE-Bench comparison.
- Esser et al. (2024), "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis": supplies the Stable Diffusion 3 backbone fine-tuned in the editing experiments.

Source: supplied parsed manuscript, Cognitio job `2946e77c-2212-428f-847e-e9ac1a2585e7`.

[[index|Library home]]
