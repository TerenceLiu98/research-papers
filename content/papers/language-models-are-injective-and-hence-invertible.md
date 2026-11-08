---
title: "Language Models Are Injective and Hence Invertible"
type: paper
authors:
  - Giorgos Nikolaou
  - Tommaso Mencattini
  - Donato Crisostomi
  - Andrea Santilli
  - Yannis Panagakis
  - Emanuele Rodola
year: 2025
arxiv: "2510.15511"
tags:
  - language-models
  - transformer-injectivity
  - model-inversion
  - representation-learning
  - privacy
---

## TL;DR

For finite-context decoder-only Transformers with real-analytic components, the paper argues that distinct discrete prompts almost surely have distinct last-token representations at random initialization and after any finite number of gradient-based training steps. Its SIPIT algorithm uses causal structure and access to every per-position hidden state at a chosen layer to recover prompts sequentially. The reported experiments find no collisions in billions of comparisons and recover all tested tokens, but the theory and inversion procedure depend on assumptions that exclude several practical architectures, training regimes, and access settings.

## Research Question

Do decoder-only language models preserve enough information in their hidden representations to distinguish every finite prompt, and can that theoretical injectivity be turned into an exact, computationally bounded prompt-recovery procedure?

## Motivation

Individual Transformer operations such as normalization and attention can be non-injective, which suggests that hidden representations might irreversibly discard input information. Establishing injectivity for the end-to-end map would instead make a hidden state a unique prompt identifier. A constructive inverse would also change how intermediate activations and KV-cache-adjacent data should be treated in interpretability and privacy analyses.

## Contributions

- Proves almost-sure [[concepts/transformer-injectivity|Transformer Injectivity]] for the map from finite discrete prompts to last-token representations under real-analytic architecture and continuous-initialization assumptions.
- Argues that finite-step gradient descent, mini-batch gradient descent, and SGD preserve the absolute continuity needed to avoid the measure-zero collision set.
- Introduces SIPIT, a sequential inversion procedure that searches for the unique token matching each observed per-position hidden state and has a worst-case bound of $T|\mathcal V|$ candidate evaluations.
- Reports large-scale collision searches and exact prompt-recovery experiments on pretrained and quantized language models.

## Method

For two distinct prompts, the authors define the squared distance between their last-token representations as a function of model parameters. Transformer components with analytic activations, positive-epsilon normalization, softmax attention, and residual wiring make this distance real-analytic. The authors construct at least one parameter setting that separates each prompt pair; the distance is therefore not identically zero, so its zero set has Lebesgue measure zero. A finite union extends the pairwise statement to the finite prompt space induced by a finite vocabulary and context window.

The training argument treats each gradient update as an analytic map on parameter space. Where its Jacobian is nonsingular, it is locally invertible and cannot map an absolutely continuous parameter distribution onto the collision set. Iterating this reasoning yields the finite-training-horizon result.

SIPIT assumes access to the full sequence of hidden states at one layer. Causal masking makes the state at position $t$ depend only on the already recovered prefix and the candidate token. The algorithm ranks candidates with a gradient-guided policy, evaluates them until one falls within the matching tolerance, appends that token, and repeats. The proof establishes exact recovery almost surely and robustness when observation error is smaller than half the minimum separation margin.

## Experiments

The collision benchmark samples 100,000 prompts from Wikipedia, C4, The Pile, and GitHub Python code. Across roughly five billion comparisons and six model families, no pair falls below the $10^{-6}$ collision threshold. Reported final-layer minimum Euclidean distances include 0.620 for Llama-3.1-8B, 1.274 for Mistral-7B-v0.1, 9.020 for Phi-4-mini-instruct, and 2.793 for TinyStories-33M. A continuation stress test evaluates more than 343 billion prompt pairs per model for GPT-2 Small and Gemma3-1B without finding a collision. FP4 and INT8 experiments likewise report no collisions, although these tests are empirical rather than exhaustive over all prompts.

On 100 GPT-2 Small prompts of 20 tokens, SIPIT reports 100% token accuracy in $28.01 \pm 35.87$ seconds on one A100 GPU. The random-search ablation also reaches 100% but takes $3889.61 \pm 691.17$ seconds; HARDPROMPTS records zero accuracy in this setting. On 50 ten-token prompts with FP4-quantized Mistral-7B and Llama-3.1-8B, SIPIT again reports 100% accuracy while evaluating about 0.19% and 0.21% of the respective vocabularies.

## Limitations

The theorem concerns finite vocabularies and context windows, real-analytic components, continuous parameter initialization, and a finite number of specified gradient-based updates. Deliberately tied embeddings, equal positional embeddings, non-analytic operations, finite-precision arithmetic, and other training algorithms are not covered by the core proof; quantization is tested empirically rather than guaranteed theoretically.

SIPIT requires white-box model access and the complete per-position hidden-state sequence at a fixed layer. The paper proves that the last-token state uniquely identifies a prompt in principle, but does not provide an efficient inversion algorithm from that state alone. It also does not define a complete adversarial threat model. Collision experiments cover large samples and targeted continuations, not the exponentially large set of all possible prompts, and the main exact-recovery comparison uses GPT-2 Small with short sequences on a single A100.

## Related Concepts

- [[concepts/transformer-injectivity|Transformer Injectivity]]
- [[concepts/model-inversion-attacks|Model Inversion Attacks]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]

## Related Papers

- Morris et al. (2023), "Text Embeddings Reveal (Almost) As Much As Text": reconstructs text from embeddings with a learned inversion model.
- Morris et al. (2023), "Language Model Inversion": studies reconstruction from next-token distributions rather than internal hidden-state sequences.
- Nazir et al. (2025), "Better Language Model Inversion by Compactly Representing Next-Token Distributions": improves inversion from output distributions.
- Thomas et al. (2025), "Sequential Prompt Inversion": sequentially ranks token candidates from hidden states without the paper's injectivity guarantee.

[[index|Library home]]
