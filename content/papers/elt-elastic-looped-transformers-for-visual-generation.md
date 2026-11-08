---
title: "ELT: Elastic Looped Transformers for Visual Generation"
type: paper
authors:
  - Sahil Goyal
  - Swayam Agrawal
  - Gautham Govind
  - Anil Prateek Jain
  - Sujoy Paul
  - Aditya Kusupati
year: null
source_job_id: "b3cfae83-b0ff-46dd-bdd7-678197b573db"
tags:
  - visual-generation
  - recurrent-transformers
  - parameter-efficiency
  - adaptive-computation
  - self-distillation
---

## TL;DR

Elastic Looped Transformers (ELT) repeatedly apply a small set of weight-shared Transformer layers within each image or video generation step. [[concepts/intra-loop-self-distillation|Intra-Loop Self Distillation]] trains intermediate loop depths against both ground truth and the maximum-depth trajectory, making one checkpoint usable at several inference budgets. On class-conditional ImageNet $256\times256$, an ELT-XL configuration reports FID 2.0 with 111M parameters; on UCF-101, a 76M-parameter ELT reports FVD 72.8 at matched inference compute with MAGVIT-L and 60.8 when given more loops and sampling steps. The paper's strongest claims concern parameter efficiency and elastic depth, while useful loop ranges remain architecture- and hardware-dependent.

## Research Question

Can visual generators reuse Transformer blocks across depth, retain competitive image and video quality with fewer distinct parameters, and expose a stable compute-quality trade-off by changing the number of recurrent loops at inference time?

## Motivation

Ordinary depth scaling increases both compute and parameter memory. Weight tying can separate these quantities, but a looped Transformer trained only at a fixed final depth often produces poor intermediate states and degrades when evaluated at a different loop count. ELT targets this mismatch: repeated blocks reduce the distinct parameter footprint, while intermediate-depth supervision makes early exits useful for [[concepts/adaptive-computation|Adaptive Computation]]. The intended benefit is not fewer block evaluations at matched effective depth, but a smaller model whose inference compute can be selected without retraining.

## Contributions

- Defines ELT as a recurrent visual generator with $N$ unique Transformer layers applied for $L$ loops, giving effective depth $N\times L$ while storing only $N$ layers.
- Introduces [[concepts/intra-loop-self-distillation|Intra-Loop Self Distillation]] (ILSD), which samples an intermediate loop depth and aligns it with the stopped-gradient maximum-depth representation while supervising both depths with the task target.
- Applies the same recurrent-depth framework to masked-token image and video generation and to diffusion Transformers.
- Evaluates parameter-quality scaling, variable-loop inference, ILSD ablations, training convergence, and matched-device throughput.

## Method

Let $g_\Theta$ be a composite block of $N$ unique Transformer layers. ELT applies the same block $L$ times within one generation sampling or denoising step:

$$
F_{(N,L)}(\mathbf{x})=g_\Theta^L(\mathbf{x}).
$$

This is a direct instance of [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: parameter count depends on $N$, whereas effective depth and block-evaluation cost depend on $N\times L$. The model replaces the Transformer backbone in both MaskGIT-style parallel token refinement and DiT-style diffusion denoising.

During each training iteration, ILSD samples $L_{int}$ uniformly between a minimum depth and the fixed maximum training depth $L_{max}$. The maximum-depth path receives the ordinary ground-truth loss. The intermediate path receives a ground-truth loss weighted by $\lambda$ and a feature-distillation loss toward the stopped-gradient $L_{max}$ state weighted by $1-\lambda$. The paper linearly decays $\lambda$ from 1 to 0, initially anchoring both paths to labels and later emphasizing the mature internal teacher. Because the intermediate state is a prefix of the maximum-depth forward pass, obtaining it does not require a separate student model, though gradients from both losses update the shared parameters.

At inference, the same head can read the state after a selected number of loops. Increasing or decreasing $L$ changes within-step compute without changing parameters or retraining the checkpoint.

## Experiments

The masked-token experiments use ImageNet $256\times256$ for class-conditional images and UCF-101 for class-conditional videos, with pretrained MaskGIT and MAGVIT tokenizers. Image generation uses 24 sampling steps; the main UCF-101 comparison uses 12. Diffusion experiments use ImageNet latents from a Stable Diffusion v1.4 VAE and 512 denoising steps. Reported metrics include FID and Inception Score for images, FVD and Inception Score for videos, parameter count, GFLOPs, and TPU v6e throughput.

For masked image generation, ELT-L with $8N\times3L$ reports FID 2.2 using 101M parameters, compared with FID 2.1 for a 303M-parameter MaskGIT-L at the same 24 steps and approximately 3.7k GFLOPs. ELT-XL with $7N\times4L$ reports FID 2.0 using 111M parameters, compared with FID 2.0 for a 446M-parameter MaskGIT-XL at approximately matched inference compute. The appendix also reports FID 1.9 for an ELT-G masked generator.

For diffusion, holding effective depth at 32, increasing the number of unique layers improves FID: $1N\times32L$ gives 10.30 with 69M parameters, while $16N\times2L$ gives 2.83 with 1.1B. The matched 32-layer DiT reports FID 3.43 with 2.1B parameters. This ablation shows that loops do not fully substitute for unique layer capacity. The paper also reports faster convergence than the 32-layer DiT baseline for $16N\times2L_{max}$ and $8N\times4L_{max}$ configurations.

On UCF-101, a 76M-parameter $6N\times4L$ ELT reports FVD $72.8\pm2.5$ in 12 steps, versus $76\pm2$ for the cited 306M-parameter MAGVIT-L at matched approximate GFLOPs. Running $6N\times6L$ for 24 steps improves ELT to FVD $60.8\pm2.7$ but uses roughly three times the GFLOPs of the main comparison. ILSD ablations across masked image, diffusion image, and video generation show markedly better quality away from the fixed training depth; on UCF-101, the best reported extrapolated result is FVD 69.20 at six loops after training with $L_{max}=4$.

On one TPU v6e with batch size 8, the reported ELT-to-baseline throughput ratio is 2.9 for model scale L, 3.3 for XL, and 3.5 for H, but 1.0 for B. The authors attribute the gains to compact shared weights reducing repeated high-bandwidth-memory transfers when the baseline no longer fits near the compute unit.

## Limitations

- Too few unique layers cannot be repaired by additional looping: the $1N\times32L$ diffusion configuration is substantially worse than configurations with more unique layers at the same effective depth.
- Quality can deteriorate when inference depth substantially exceeds $L_{max}$; the modest UCF-101 extrapolation result does not establish reliable unbounded iteration.
- The best loop count depends on model scale and target hardware, so deployment requires calibration rather than one universal operating point.
- Weight sharing reduces stored parameters, not arithmetic at matched effective depth. The reported throughput advantage depends on model size, batch size, and memory behavior; the smallest tested scale has no throughput gain.
- The principal evaluations are class-conditional ImageNet and UCF-101 generation. They do not establish transfer to text-conditioned generation, higher resolutions, or broader video datasets.
- Some headline comparisons combine different sampling-step budgets. The FVD 60.8 configuration, for example, is not an iso-compute comparison with MAGVIT-L.
- The supplied manuscript does not state a publication venue, DOI, arXiv identifier, or explicit publication year, so those metadata are left unset.

## Related Concepts

- [[concepts/intra-loop-self-distillation|Intra-Loop Self Distillation]]: aligns randomly sampled intermediate loop states with the maximum-depth state while preserving task supervision.
- [[concepts/block-recurrent-transformer-depth|Block-Recurrent Transformer Depth]]: separates distinct parameter depth from the number of repeated block evaluations.
- [[concepts/adaptive-computation|Adaptive Computation]]: ELT exposes outputs at several loop budgets, although it uses a manually chosen budget rather than an input-dependent stopping rule.
- [[concepts/diffusion-models|Diffusion Models]]: one of the two generation frameworks in which ELT replaces a standard deep Transformer with recurrent depth.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: ILSD uses a deeper execution of the same parameters as an online teacher for its shallower prefix.

## Related Papers

- Dehghani et al. (2018), *Universal Transformers*, establishes recurrent application of shared Transformer computation across depth.
- Yang et al. (2023), *Looped Transformers Are Better at Learning Learning Algorithms*, and Saunshi et al. (2025), *Reasoning with Latent Thoughts*, study the computational properties of looped Transformers.
- Wang et al. (2026), *Elastic Diffusion Transformer*, varies computation through block skipping and width reduction rather than ILSD-trained recurrent depth.
- Chang et al. (2022), *MaskGIT*, and Yu et al. (2023), *MAGVIT*, provide the masked image and video generation frameworks and principal matched-compute baselines.
- Peebles and Xie (2023), *Scalable Diffusion Models with Transformers*, provides the diffusion Transformer framework used in the continuous-latent experiments.
- [[papers/loopvit-scaling-visual-arc-with-looped-transformers|LoopViT: Scaling Visual ARC with Looped Transformers]] also ties visual Transformer depth, but uses entropy-based dynamic exit for ARC prediction rather than ILSD for generation.

[[index|Library home]]
