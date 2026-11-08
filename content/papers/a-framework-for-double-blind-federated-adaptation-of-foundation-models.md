---
title: A Framework for Double-Blind Federated Adaptation of Foundation Models
type: paper
authors:
  - Nurbek Tastan
  - Karthik Nandakumar
year: null
source_job_id: "356a28ba-1307-4473-a2f0-697fd12d2567"
tags:
  - federated-learning
  - foundation-model-adaptation
  - homomorphic-encryption
  - model-privacy
---

## TL;DR

BlindFed adapts a server-owned vision foundation model using private data held by multiple clients without giving clients the model or revealing their data to the server. It combines an FHE-compatible transformer approximation, offline distillation, blockwise encrypted inference, client-side parallel adapters, and secure aggregation. The reported image-classification results are competitive with LoRA while satisfying the paper's double-blind criterion, but encrypted inference takes about 136 seconds per transformer block on the evaluated hardware and requires repeated transfer of large intermediate representations.

## Research Question

Can multiple data owners collaboratively adapt a proprietary foundation model while keeping both the owners' training data and the provider's model hidden from the other party?

## Motivation

Conventional federated learning assumes that clients can receive and train a model, which conflicts with a provider's interest in protecting proprietary foundation-model weights. Private inference protects client inputs, but adapting a large transformer under encryption is difficult because non-polynomial operations and backpropagation exceed practical FHE capabilities. [[concepts/double-blind-federated-adaptation|Double-Blind Federated Adaptation]] treats data privacy and model privacy as simultaneous requirements.

## Contributions

- Defines a cross-silo adaptation setting in which clients keep their data private and the learning service provider keeps the foundation model private.
- Replaces transformer nonlinearities with polynomial approximations and trains the resulting FHE-friendly blocks through offline [[concepts/knowledge-distillation|Knowledge Distillation]].
- Splits online training into encrypted server inference, plaintext client updates of a low-rank parallel adapter and classifier, and MPC-based secure aggregation.
- Introduces per-block sample permutations and stochastic block sampling (SBS) to make model extraction from plaintext intermediate representations harder.

## Method

### FHE-Friendly Backbone

BlindFed assumes a modular transformer and a powerful server, thin clients capable of encryption and decryption, an auxiliary public dataset, and semi-honest participants. Softmax exponentials use a sixth-degree Taylor approximation, GELU is replaced by a quadratic, and divisions in Softmax and LayerNorm use a seventh-degree Goldschmidt inverse approximation. A low-rank parallel adapter is chosen because it can be trained without backpropagating through the encrypted backbone.

Before collaboration, the provider treats the original model as a teacher and the approximated model as a student. Distillation first matches embeddings, pre-normalization attention matrices, and hidden states, then matches the prediction layer. This stage uses only the provider's auxiliary dataset.

### Online Adaptation

Clients encrypt their examples and the server evaluates one transformer block at a time. After each block, a client decrypts and re-encrypts the intermediate representation, avoiding the multiplicative depth and bootstrapping cost of evaluating the full model in one FHE circuit. Clients use the recovered block outputs to update a plaintext parallel adapter and classification head. An MPC protocol aggregates those local parameters with FedAvg without exposing individual client updates.

Because clients see intermediate activations, the server independently permutes samples after each block. It supplies only relative permutations needed by the side adapter, rather than the individual permutations. SBS additionally withholds selected block outputs and prevents consecutive blocks from being returned in the same pass, reducing the availability of adjacent input-output pairs for model extraction.

## Experiments

The experiments use ImageNet-pretrained ViT-Base. Tiny-ImageNet or one Fed-ISIC2019 center supplies auxiliary distillation data; CIFAR-10, CIFAR-100, SVHN, and the remaining Fed-ISIC2019 centers are downstream tasks. The federated image benchmarks use five clients and Dirichlet partitions with concentration values 100, 1, and 0.01; scaling experiments use 10, 20, and 50 clients.

### Reported Accuracy

| Dataset and setting | Linear probing | BlindFed | BlindFed + SBS | LoRA |
| --- | ---: | ---: | ---: | ---: |
| CIFAR-10, 5 clients, $\alpha=1$ | 0.9191 | 0.9413 | 0.9427 | 0.9718 |
| CIFAR-100, 5 clients, $\alpha=1$ | 0.7414 | 0.7808 | 0.7789 | 0.8568 |
| SVHN, 5 clients, $\alpha=1$ | 0.5732 | 0.9249 | 0.9256 | 0.9709 |
| CIFAR-10, 50 clients, $\alpha=1$ | 0.9007 | 0.9287 | 0.9388 | 0.9482 |

LoRA and full fine-tuning do not meet the paper's double-blind criterion because clients require access to backbone parameters. Across the reported settings, BlindFed improves on the other double-blind baseline, linear probing. SBS usually changes accuracy only slightly. On federated Fed-ISIC2019, BlindFed scores 0.6679 using in-distribution auxiliary data and 0.6481 using Tiny-ImageNet; this supports transfer from the out-of-distribution auxiliary set but also shows a performance decrease.

### Efficiency and Cryptographic Cost

BlindFed trains 0.2536 million parameters for CIFAR-10/SVHN, versus 0.2886 million for LoRA and 0.0073 million for linear probing. Its unencrypted training latency is reported as 15.7 ms per sample, close to linear probing's 15.1 ms, because it avoids backbone backpropagation.

The FHE measurements are much heavier. At 128-bit security on an A100-PCIE-40GB system using Tile Tensors, one encrypted transformer block takes about 136 seconds. A single encrypted intermediate sample occupies 17.33 MB, versus 6.21 MB in plaintext. Encrypting and decrypting one sample take 1.062 seconds and 0.169 seconds, respectively; batches of eight take 4.65 seconds and 0.232 seconds.

## Limitations

- The privacy analysis assumes semi-honest participants. The permutation and SBS mechanisms are defenses against the discussed model-extraction route, not a general proof that a malicious client cannot recover model information.
- Blockwise FHE requires a client-server exchange after every transformer block in every federated round. The paper explicitly accepts this communication cost as outside its core constraints.
- Encrypted inference is extremely expensive in the reported implementation: approximately 136 seconds per block and more than 22 GB of server memory. Claims that GPU-accelerated implementations could improve this by more than tenfold are projections based on other systems, not measured BlindFed results.
- The approach assumes an auxiliary dataset at the provider, a modular transformer, clients able to encrypt and decrypt intermediate tensors, and a server powerful enough for FHE inference.
- Experiments cover ViT-Base image classification. They do not demonstrate the method on language models, generative tasks, or larger foundation models.
- Full fine-tuning generally gives the highest accuracy but is not double-blind. BlindFed's empirical comparison therefore reflects a privacy-utility-computation trade-off rather than overall accuracy leadership.
- The supplied source does not provide a publication year, venue, DOI, or stable paper identifier, so these are not inferred here.

## Related Concepts

- [[concepts/double-blind-federated-adaptation|Double-Blind Federated Adaptation]]: simultaneous protection of client data and provider-owned model parameters during collaborative adaptation.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: transfers the original transformer's behavior into an FHE-compatible approximation using auxiliary data.
- Fully homomorphic encryption: permits server-side arithmetic on encrypted client representations but introduces high latency, memory, and communication costs.
- Secure aggregation: combines client adapter and classifier updates without revealing each local update to the aggregation server.
- Parameter-efficient fine-tuning: motivates the parallel adapter that can be trained without backbone backpropagation.

## Related Papers

- Bonawitz et al. (2017), "Practical Secure Aggregation for Privacy-Preserving Machine Learning": cited MPC-based aggregation mechanism.
- Mercea et al. (2024), "Time-, Memory-, and Parameter-Efficient Visual Adaptation": cited low-rank side-adaptation design used for client learning.
- Li et al. (2022), "MPCFormer: Fast, Performant and Private Transformer Inference with MPC": cited private-inference and distillation predecessor.
- Zeng et al. (2023), "MPCViT: Searching for Accurate and Efficient MPC-Friendly Vision Transformer with Heterogeneous Attention": cited private-inference-friendly transformer design.
- Liang et al. (2024), "Model Extraction Attacks Revisited": motivates protection against reconstruction from adjacent intermediate representations.

[[index|Library home]]
