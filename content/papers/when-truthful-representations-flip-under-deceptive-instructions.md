---
title: "When Truthful Representations Flip Under Deceptive Instructions?"
type: paper
authors:
  - Xianxuan Long
  - Yao Fu
  - Runchao Li
  - Mu Sheng
  - Haotian Yu
  - Xiaotian Han
  - Pan Li
year: null
source_job_id: "e26f666e-4003-47cd-88c1-bb4d271c00ab"
tags:
  - mechanistic-interpretability
  - llm-deception
  - sparse-autoencoders
  - linear-probing
  - representation-geometry
---

## TL;DR

The paper compares language-model activations under truthful, neutral, and explicitly deceptive factual-verification instructions. Linear probes decode the instructed True/False output from intermediate states in every condition, while sparse autoencoder features show larger truthful-to-deceptive shifts than truthful-to-neutral shifts, especially around intermediate layers. A few SAE features strongly distinguish the instruction conditions, but the study is observational and does not establish that those features cause deceptive outputs.

## Research Question

When an instruction-tuned language model is explicitly told to answer factual questions deceptively, where in its layer-wise representations does the change appear, and can sparse features characterize it more clearly than global projections or linear probes alone?

## Motivation

Output-level evaluations show whether a model follows an instruction to lie, but not how that instruction changes internal processing. Linear probes can test whether the intended output remains accessible, yet polysemantic activations make individual directions difficult to interpret. The paper therefore combines probing with [[concepts/sparse-autoencoders|Sparse Autoencoders]] to compare truthful, neutral, and deceptive instruction conditions at both layer and feature levels.

## Contributions

- Measures instruction-conditioned factual-verification behavior across Llama, Gemma, Mistral, and Qwen model families, then analyzes internal states of Llama-3.1-8B-Instruct and Gemma-2-9B-Instruct.
- Applies logistic-regression and Training of Truth and Polarity Direction probes at every layer and evaluates transfer to logical compositions and open-domain claims.
- Quantifies SAE-space shifts with Euclidean distance, cosine similarity, and active-feature overlap.
- Identifies layer-specific SAE features with the largest truthful-to-deceptive activation changes and visualizes their condition separation.
- Shows that SAE shift measures remain informative on open-domain datasets where two-dimensional PCA does not visibly separate True and False examples.

## Method

Models receive the same factual statement with one of three prompts: answer correctly, assess it neutrally, or answer incorrectly. The authors extract the residual-stream activation at the final token before the True/False response from every layer.

For each layer and condition, they train a standard logistic-regression probe and a polarity-aware TTPD probe to predict the instructed output. Probe training uses balanced examples and leave-one-topic-pair-out evaluation across six templated topics. Generalization tests add conjunctions, disjunctions, CommonClaim, and CounterFact.

The feature analysis encodes layer activations with pretrained Gemma Scope and Llama Scope SAEs. It compares condition-level mean feature vectors through $\ell_2$ distance, cosine similarity, and Jaccard overlap of features whose mean activation exceeds $10^{-6}$. Features are ranked by the absolute change in mean activation between deceptive and truthful prompts. PCA supplies a global two-dimensional comparison, while selected SAE-feature scatter and violin plots provide targeted views.

## Experiments

The behavioral evaluation covers four model families and ten factual-verification datasets. Deceptive-prompt accuracy in Table 1 is measured against the original ground truth, so low values indicate that a model often followed the instruction to reverse the correct label. Susceptibility varies considerably: for example, Llama-3.1-8B-Instruct scores 10.25% on affirmative statements under the deceptive prompt, while Mistral-7B-v0.3 scores 92.16%.

The internal analysis focuses on Llama-3.1-8B-Instruct and Gemma-2-9B-Instruct. On curated datasets, probe accuracy rises from near chance in early layers and becomes strongest in intermediate or later layers. The full layer tables report, for example, Llama TTPD accuracies that reach or exceed 80% in all three prompt conditions at some intermediate layers. Generalization results retain discriminative signal on unseen logical forms and open-domain data, although performance and the relative stability of LR and TTPD vary by model.

PCA separates True and False examples on templated data but not on CommonClaim and CounterFact. In SAE space, deceptive-versus-truthful comparisons show larger distance, lower cosine similarity, and lower feature overlap than truthful-versus-neutral comparisons. The main Llama analyses place the sharpest changes around layers 10-16; the Gemma appendix reports strong changes from roughly layers 16-32. Selected high-change SAE features show near-binary condition-specific activation in the reported plots.

These findings support a measurable association between deceptive instructions and sparse representational changes. They do not by themselves show that factual knowledge is preserved, that deceptive token selection occurs only downstream, or that the selected SAE features implement an honesty mechanism; those stronger interpretations would require causal intervention.

## Limitations

- The prompts explicitly request dishonesty, so the setup does not cover covert, strategic, or emergent deception.
- Experiments are limited to English declarative statements and binary factual labels.
- Detailed internal analysis covers two instruction-tuned models, and the Llama analysis pairs an instruction-tuned model with SAEs described as trained for Llama-3.1-8B-Base.
- Linear decodability shows information accessibility, not whether the model uses the probe direction to produce its answer.
- The SAE feature analysis is correlational. No activation patching, feature steering, or ablation tests whether the identified features cause deceptive behavior.
- Feature meanings depend on SAE training data, architecture, sparsity choices, and reconstruction quality; the paper does not establish stable semantic labels for the selected features.
- PCA failure in two dimensions does not establish an absence of linear separation in the full activation space.
- Some layer-location descriptions differ between the main text and appendix, including early-to-mid versus mid-to-late characterizations.
- The supplied manuscript does not state a stable paper identifier or publication year, so those metadata remain unset.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/transformer-representation-trajectory-geometry|Transformer Representation Trajectory Geometry]]

## Related Papers

References discussed in the supplied paper:

- Azaria and Mitchell (2023), "The Internal State of an LLM Knows When It's Lying": probes internal states for truth-related signals.
- Marks and Tegmark (2024), "The Geometry of Truth: Emergent Linear Structure in Large Language Model Representations of True/False Datasets": studies linear truth structure and supplies factual datasets used here.
- Buerger, Hamprecht, and Nadler (2024), "Truth Is Universal: Robust Detection of Lies in LLMs": introduces the TTPD approach and logical dataset construction followed by this paper.
- Lieberum et al. (2024), "Gemma Scope: Open Sparse Autoencoders Everywhere All at Once on Gemma 2": provides the Gemma SAE suite.
- He et al. (2024), "Llama Scope: Extracting Millions of Features from Llama-3.1-8B with Sparse Autoencoders": provides the Llama SAE suite.

Related library reading, without implying citation by this paper:

- [[papers/truth-as-a-trajectory-what-internal-representations-reveal-about-large-language-model-reasoning|Truth as a Trajectory: What Internal Representations Reveal About Large Language Model Reasoning]] compares static linear probes with learned layer-wise activation trajectories.
- [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]] uses SAE latents for intervention rather than measurement alone.

[[index|Library home]]
