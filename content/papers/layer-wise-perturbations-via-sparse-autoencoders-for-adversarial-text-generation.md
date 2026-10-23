---
title: "Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation"
type: paper
authors:
  - Huizhen Shu
  - Yuji Kosuga
  - Xuying Li
  - Mengqiu Tian
  - Qirui Wang
  - Zhuo Li
year: null
source_job_id: "db482baa-aac2-49c2-a15d-d3a0102c4ba1"
tags:
  - sparse-autoencoders
  - adversarial-text-generation
  - llm-jailbreaking
  - representation-steering
  - red-teaming
---

## TL;DR

The paper introduces the Sparse Feature Perturbation Framework (SFPF), which trains layer-specific sparse autoencoders on Llama-2-7B activations, identifies dimensions associated with successful attacks, perturbs those dimensions through forward hooks, and reconstructs adversarial prompts by embedding search. Layer 17 gives the strongest standalone result, raising attack success rate from 0.10 to 0.29; adding SFPF to Adaptive attacks raises reported ASR from 0.77 to 0.95. These results are limited to one source model, heuristic feature selection, and a judge-based evaluation, and the paper's description of the method as black-box conflicts with its need for internal activations and hooks.

## Research Question

Can sparse features learned from intermediate language-model activations be used to generate transferable adversarial prompts that retain the source prompt's semantics while bypassing safety mechanisms?

## Motivation

Most jailbreak methods optimize tokens, templates, or model feedback directly. The paper instead treats internal sparse features as an attack surface: features associated with successful attacks may reveal where harmful intent is represented and provide a controllable mechanism for altering prompts. This connects mechanistic interpretability with red-team generation, while testing whether output-level defenses remain effective after representation-level intervention.

## Contributions

- Proposes SFPF, a four-stage pipeline combining layer-specific [[concepts/sparse-autoencoders|Sparse Autoencoders]], clustering-based feature selection, masked latent perturbation, and embedding-based token reconstruction.
- Compares direct top-1 reconstruction with a top-10 procedure that selects locally similar tokens according to their aggregate similarity to the original prompt.
- Reports layer-wise reconstruction, clustering, and attack results, identifying layer 17 as the strongest intervention point among the tested Llama-2-7B MLP layers.
- Applies SFPF alone and on top of DRA and Adaptive jailbreak prompts, reporting higher attack success rates for all three settings.

## Method

For selected Llama-2-7B-chat MLP layers, the authors average prompt activations across tokens and train a separate ReLU sparse autoencoder with mean-squared reconstruction loss plus an annealed $L_1$ activation penalty. The reported layers are 1, 3, 5, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, and 31, although the appendix also presents a layer-7 clustering plot.

Known attack prompts with low safety scores are encoded by the SAE. Despite describing 30 KMeans runs, the method uses $k=1$, so each run estimates a centroid rather than a multi-cluster partition. The normalized centroid is thresholded at a reported example value of 0.03 to form a binary mask of adversarially salient latent dimensions. During generation, a forward hook adds a scaled mask, with a reported example scale of 0.3, to the SAE code and replaces the target MLP output with the decoded perturbation.

The resulting hidden vectors are mapped back to tokens in two ways. Top-1 reconstruction chooses the vocabulary embedding with maximum cosine similarity to each perturbed state. Top-10 reconstruction first retrieves ten local candidates and then chooses the candidate with greatest summed embedding similarity to all tokens in the original prompt. A reserved hyphen token is removed after reconstruction.

## Experiments

SAEs are trained on the public SPML Chatbot Prompt Injection dataset plus unspecified proprietary company data. Training uses eight NVIDIA A100 80 GB GPUs, hidden dimension 12,288, learning rate $10^{-5}$, and sparsity coefficient 0.0003. The reported reconstruction target is between $10^{-4}$ and $10^{-3}$, although the results state that the first and last layers exceed 0.5 and layers 3 through 17 lie in the expected range.

Adversarial prompts are evaluated against Qwen3-32B on AdvBench and HarmBench. Claude 3.7 Sonnet assigns response safety scores from 0 to 1, and low scores count as successful jailbreaks. The paper states both $<0.7$ and $\leq 0.7$ as the ASR cutoff. Prompt quality is measured with BLEU and embedding similarity.

| Method | ASR | Safety score | BLEU | Similarity |
| --- | ---: | ---: | ---: | ---: |
| Baseline | 0.10 | $0.923 \pm 0.24$ | - | - |
| SFPF | 0.29 | $0.855 \pm 0.319$ | $0.117 \pm 0.08$ | $0.734 \pm 0.13$ |
| DRA | 0.73 | $0.307 \pm 0.40$ | $0.000 \pm 0.00$ | $0.071 \pm 0.07$ |
| DRA + SFPF | 0.79 | $0.459 \pm 0.36$ | $0.007 \pm 0.03$ | $0.102 \pm 0.19$ |
| Adaptive | 0.77 | $0.228 \pm 0.41$ | $0.027 \pm 0.01$ | $0.541 \pm 0.07$ |
| Adaptive + SFPF | 0.95 | $0.085 \pm 0.22$ | $0.006 \pm 0.00$ | $0.460 \pm 0.09$ |

Layer 17 reaches 0.29 ASR in the standalone layer comparison. Repeated centroid estimates have standard deviations around $10^{-8}$; the authors interpret stronger activations in layers 9, 11, and 17 as evidence of greater adversarial sensitivity. The combined methods increase prompt length substantially: the reported mean is 3,251 tokens for Adaptive + SFPF, compared with 98 for the baseline.

The numerical results support increased jailbreak effectiveness, but not the conclusion's claim that the approach reduces harmful content: Adaptive + SFPF has both the highest ASR and the lowest reported safety score. DRA + SFPF is an exception in which ASR rises while the mean safety score also rises, illustrating that the two summary metrics need careful joint interpretation.

## Limitations

- Evaluation is limited to SAEs trained on Llama-2-7B-chat activations and attacks transferred to Qwen3-32B; other source architectures, model scales, and target models are not tested.
- Feature selection uses a one-centroid KMeans procedure, heuristic thresholding, and tuned perturbation scales. Effectiveness varies by prompt and layer and requires repeated trials.
- The method requires internal hidden states, independently trained layer SAEs, and forward hooks. Calling it a black-box attack is therefore inconsistent with the implementation, even if the final prompts transfer to a separate target model.
- The proprietary portion of the training data is not described, limiting reproducibility and making data overlap difficult to assess.
- ASR depends on a single model judge and an inconsistently stated threshold. The paper does not report judge calibration, human evaluation, uncertainty for ASR, or defenses tested individually.
- BLEU scores are very low for the combined attacks, while semantic similarity and output length change substantially. The study does not establish that the generated prompts are natural, efficient, or equally interpretable across methods.
- Several claims are internally misaligned: the abstract describes amplifying safety signals to evade defenses, while the results primarily demonstrate more unsafe target responses; the conclusion says harmful content is reduced despite lower safety scores for the strongest method.
- The layer list, reconstruction-loss account, and terminology (sparse autoencoder versus sparse autodecoder) are not fully consistent across sections.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/model-steerability|Model Steerability]]
- Adversarial prompting
- LLM red teaming
- Representation-level interventions
- Embedding search

## Related Papers

- Zou et al. (2023), "Universal and Transferable Adversarial Attacks on Aligned Language Models."
- Liu et al. (2024), "Making Them Ask and Answer: Jailbreaking Large Language Models in Few Queries via Disguise and Reconstruction."
- Andriushchenko and Flammarion (2024), "Jailbreaking Leading Safety-Aligned LLMs with Simple Adaptive Attacks."
- Bricken et al. (2023), "Towards Monosemanticity: Decomposing Language Models with Dictionary Learning."
- Cunningham et al. (2023), "Sparse Autoencoders Find Highly Interpretable Features in Language Models."
- Makelov, Lange, and Nanda (2024), "Towards Principled Evaluations of Sparse Autoencoders for Interpretability and Control."

[[index|Library home]]
