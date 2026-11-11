---
title: "LaTtE-Flow: Layerwise Timestep-Expert Flow-based Transformer"
type: paper
authors:
  - Ying Shen
  - Zhiyang Xu
  - Jiuhai Chen
  - Shizhe Diao
  - Jiaxin Zhang
  - Yuguang Yao
  - Joy Rimchala
  - Ismini Lourentzou
  - Lifu Huang
year: null
tags:
  - flow-matching
  - multimodal-models
  - efficient-inference
---

[[index|Library home]]

## TL;DR

LaTtE-Flow partitions a generative transformer's 28 layers into four timestep-specific groups, activating seven layers per sampling step while retaining a frozen vision-language backbone. On ImageNet-256 it reports FID 5.79 and 0.052 seconds per image, versus 6.33 and 0.158 seconds for its full-depth Vanilla baseline (Table 1).

## Research Question

Can timestep specialization reduce the cost of each flow-matching evaluation while preserving image quality and a pretrained model's multimodal understanding?

## Motivation

Repeated full-backbone evaluation makes diffusion and flow-based unified models expensive. Separate full-size timestep experts specialize denoising but do not inherently reduce per-step computation. Assigning timestep intervals to subsets of layers addresses that cost directly.

## Contributions

- A parallel generative pathway added to a frozen Qwen2-VL-2B-Instruct backbone.
- [[concepts/layerwise-timestep-experts|Layerwise Timestep Experts]] that specialize disjoint layer groups to different flow-time intervals.
- Timestep-conditioned, head-specific residual attention that reuses image self-attention across adjacent layers.
- Generation, understanding, and ablation evaluations, plus a partially shared Blend architecture.

## Method

The primary architecture copies pretrained transformer layers into a trainable image-generation branch. DC-AE compresses images by a spatial factor of 32. Generative image tokens use bidirectional attention and attend to multimodal context; context representations are computed once and cached during sampling.

Each of four groups contains seven consecutive layers and regresses the conditional velocity on its assigned timestep range. The paper describes overlapping training intervals and strict, non-overlapping inference routing. With sampling steps T, total layers L, and K groups, repeated layer computation falls from TL to TL/K, excluding the one-time context cache and other overhead (Section 4.2).

Residual attention adds the previous layer's image attention map to the current map, scaled by a per-head tanh gate derived from the timestep embedding. Reuse applies within expert groups to image self-attention, rather than the entire multimodal attention map. The Blend variant instead partially shares transformer components and uses full-parameter fine-tuning (Appendix A).

## Experiments

Training uses 1.2 million ImageNet images at 256×256, natural-language class captions, 240,000 steps, batch size 2,048, and learning rate 0.0005. The authors report about four days on eight H200 GPUs. Evaluation uses 50,000 generated images, 40 sampling steps, and classifier-free guidance 5; precision and recall use 1,000 generated images. Timing is measured on one L40 GPU at batch size 50, so seconds per image should not be interpreted as single-request latency.

| Model | FID ↓ | Inception Score ↑ | Seconds/image ↓ |
| --- | ---: | ---: | ---: |
| Show-o | 31.26 | 98.7 | 2.493 |
| Janus Pro | 23.68 | 105.2 | 0.311 |
| Vanilla | 6.33 | 192.4 | 0.158 |
| LaTtE-Flow | 5.79 | 213.1 | 0.052 |

Table 1 thus supports approximately 3× acceleration over Vanilla and 6× over Janus Pro under this setup. The reported 500M parameters refer to parameters activated per generative timestep, not total model storage. Per-forward computation falls from 28.3 to 7.08 TFLOPs.

Understanding scores exactly match the frozen backbone across all eight reported benchmarks, including MMBench 74.9, MMMU 41.1, and TextVQA 79.7 (Table 2). This is preservation of inherited capabilities. Removing residual attention worsens FID from 5.79 to 8.26 and Inception Score from 213.1 to 157.0 (Table 3). Larger expert groups improve quality but increase inference cost; gains from more than 40 sampling steps become marginal in the reported sweep. Blend achieves FID 6.03 versus 6.12 for Vanilla Blend, with 0.061 versus 0.185 seconds per image (Table 4).

## Limitations

Generation evidence centers on ImageNet-256 class captions; open-ended compositional generation and higher resolutions are not established here. Some specialist generators have better FID, and MaskGIT is faster in Table 1. Partition choice remains open, and the authors identify longer training as future work. Appendix C describes training overlap but lists intervals that only share endpoints, leaving the exact overlap implementation unclear in the supplied text.

The supplied Markdown omits a standalone paper title, publication year, and stable identifier. The page title uses the model name and its stated expansion; year is left null rather than inferred from cited works. Source: Cognitio job `bdb06304-4a0c-4ea2-ae5b-40e85d9676b1`, supplied parsed manuscript, Sections 4–6 and Appendices A–H.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]] — conditional velocity regression supplies the generation objective.
- [[concepts/layerwise-timestep-experts|Layerwise Timestep Experts]] — reduces active depth at each sampling step.
- [[concepts/diffusion-models|Diffusion Models]] — related iterative generative processes motivating timestep specialization.

## Related Papers

- [[papers/rit-vanilla-diffusion-transformers-suffice-in-representation-space|RiT: Vanilla Diffusion Transformers Suffice in Representation Space]] — a library comparison addressing image-generation efficiency through representation-space design; LaTtE-Flow instead changes active transformer depth.
- LMFusion (Shi et al., 2025), cited in the manuscript, motivates the parallel generation-branch comparison.
- Transfusion (Zhou et al., 2025), cited in the manuscript, provides the architectural comparison for the Blend baseline.
