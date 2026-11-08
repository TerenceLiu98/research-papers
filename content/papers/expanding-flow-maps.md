---
title: Expanding Flow Maps
type: paper
authors:
  - Sophia Tang
  - Pranam Chatterjee
year: 2026
tags:
  - generative-models
  - flow-matching
  - variable-length-generation
  - molecular-generation
---

## TL;DR

Expanding Flow Maps (EFMs) extend flow-based generation to states whose dimensionality or sequence length grows during sampling. Each jump first inserts conditional noise coordinates or tokens with an expand operator, then transports the enlarged state toward data. The framework supports continuous conformers, variable-size molecular graphs, and variable-length text, but one-step text generation exhibits mode collapse and the experiments do not establish scaling beyond 181-atom molecules or 128-token sequences.

## Research Question

How can a flow model generate continuous or discrete outputs whose size is not fixed at initialization, while retaining one- or few-step sampling through a learned flow map?

## Motivation

Standard flows and flow maps operate on a fixed-dimensional state or fixed token grid. This is mismatched to outputs such as sequences, graphs, and coarse-to-fine structures whose size should be inferred during generation. Padding can place variable-size data on a fixed canvas, but it does not make expansion part of the generative dynamics.

## Contributions

- Defines [[concepts/expanding-generative-flows|Expanding Generative Flows]] over a non-decreasing dimension schedule and characterizes their smooth transport and dimension-changing jumps as a piecewise-deterministic Markov process.
- Introduces an expand operator that lifts a state to the target dimension by placing conditional noise through concatenation, positional insertion, or parent-child expansion.
- Defines EFMs as the composition of expansion and finite-interval transport, with continuous and discrete consistency identities for distillation or self-distillation.
- Instantiates discrete expansion with learned per-gap insertion counts, local token times, and a mean denoiser, allowing sequences and graphs to grow from empty states.

## Method

Let the state dimension follow a non-decreasing schedule $d(t)$. For a jump from $s$ to $t$, an expand operator $\mathcal E_{s,t}$ augments $x_s\in\mathbb R^{d(s)}$ with conditional noise so that transport occurs in $\mathbb R^{d(t)}$. The EFM is

$$
\Phi_{s,t}=X_{s,t}\circ\mathcal E_{s,t},
$$

where $X_{s,t}$ is parameterized by an average velocity in continuous spaces or a mean denoiser on the discrete simplex. Fixed-dimensional flow maps are recovered when $\mathcal E_{s,t}$ is the identity.

For discrete data, every clean position receives an insertion time and a local denoising time. A learned head predicts how many missing positions belong in each gap of the active subsequence. The sampler draws latent insertions, interleaves them with active positions, and denoises the enlarged state. Small jumps use the Poisson limit of the insertion process; few-step jumps use a capped binomial parameterization to control count variance near the full-sequence boundary.

Training combines a diagonal denoising or velocity objective with an off-diagonal consistency objective. The latter extends Lagrangian, Eulerian, or semigroup flow-map identities to rectangular, expanding state spaces.

## Experiments

**Molecular conformers.** On GEOM-QM9, 20-step EFlow reports mean COV-R 88.51% and COV-P 53.07%; adding a 10-step refiner gives mean AMR-P 0.4876 A. On GEOM-Drugs, EFM plus refinement at 14 steps reports the best values in the paper's comparison on all four coverage and average-minimum-RMSD metrics. The principal diffusion baselines use 500-1,000 steps, although architectures and refinement procedures are not identical across all methods.

**Variable-size molecular graphs.** On 10,000 QM9 samples, two-step EFM reports FCD 0.40 versus 0.49 for categorical flow maps, with 90.0% validity and 97.9% uniqueness. At one step, EFM reports FCD 0.44 and 97.7% uniqueness, compared with 2.14 and 91.8% for the fixed-canvas categorical flow-map baseline.

**Variable-length language modeling.** On LM1B, multi-step EFlow improves GPT-2-Large generative perplexity over the evaluated fixed-length flow language model at every budget from 64 to 1,024 steps; at 1,024 steps the values are 103.63 and 111.36. Four-step EFM reports perplexity 99.85, close to FMLM's 98.76, but with lower sample entropy (3.93 versus 4.21). The paper reports mode collapse for single-step text generation despite a nominal perplexity of 98.35.

## Limitations

- Experiments are capped at 29 atoms on GEOM-QM9, 181 atoms on GEOM-Drugs, and 128 tokens on LM1B; larger active dimensions are not empirically validated.
- Per-coordinate local-time conditioning and the larger set of interpolants increase training and tuning cost. The authors state that computational expense prevented a fuller scaling study.
- One-step variable-length language generation mode-collapses, and language entropy is below the fixed-length baselines. This limits the evidence for robust one-step sequence generation.
- The work only implements increasing dimensionality. Deletion or decreasing-dimensionality dynamics are left as a possible extension.
- Inserted noise is Gaussian in the experiments, while learned conditional insertion distributions and alternative interpolants remain future work.

## Related Concepts

- [[concepts/expanding-generative-flows|Expanding Generative Flows]]: the dimension-changing transport framework introduced by the paper.
- [[concepts/flow-matching|Flow Matching]]: supplies the conditional velocity-regression objective and continuous-time transport view.
- [[concepts/average-velocity-fields|Average Velocity Fields]]: related finite-interval transport parameterizations for few-step generation on fixed state spaces.
- [[concepts/diffusion-models|Diffusion Models]]: iterative generative models used as molecular and language baselines.

## Related Papers

- [[papers/mean-flows-for-one-step-generative-modeling|Mean Flows for One-step Generative Modeling]]: learns a finite-interval velocity for one- or few-step generation without changing state dimension.
- [[papers/elf-embedded-language-flows|ELF: Embedded Language Flows]]: performs continuous flow-based language generation in embedding space on a fixed token canvas.

[[index|Library home]]
