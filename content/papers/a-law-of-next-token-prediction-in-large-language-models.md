---
title: "A law of next-token prediction in large language models"
type: paper
authors:
  - Hangfeng He
  - Weijie J. Su
year: 2025
doi: "10.1103/5rn3-49lc"
tags:
  - large-language-models
  - representation-learning
  - linear-probing
  - scaling-laws
  - neural-network-interpretability
---

## TL;DR

Across pretrained autoregressive language models from the Transformer, RWKV, and Mamba families, a linear probe's unexplained variance for next-token prediction decreases approximately exponentially with layer depth. The authors call this the [[concepts/equilearning-law|Equilearning Law]]: on a logarithmic scale, each layer contributes a roughly equal reduction in prediction residual. The pattern is broad but conditional on the probe metric, token-index encoding, normalization, probing data, training progress, and pretraining objective; the paper does not derive its mechanism.

## Research Question

Is there a simple quantitative pattern governing how contextualized token embeddings become increasingly useful for next-token prediction across the intermediate layers of pretrained language models?

## Motivation

Language models transform token embeddings through many hidden layers, but output loss alone does not reveal how predictive information develops with depth. Existing layerwise analyses often identify where particular linguistic properties are accessible without supplying a common quantitative law across architectures. A layer-resolved measure could clarify representation formation and distinguish model-depth effects that final test loss conflates.

## Contributions

- Introduces prediction residual (PR), a layerwise [[concepts/linear-probing|Linear Probing]] measure based on the fraction of next-token-index variance unexplained by least-squares regression.
- Reports an approximately geometric decrease in PR across layers, termed the [[concepts/equilearning-law|Equilearning Law]], across GPT, Llama, Mistral, Phi, RWKV, and Mamba model families.
- Tracks when the pattern emerges during training and how it changes with model size, data repetition, probing data, normalization, and pretraining task.
- Uses alternative prediction targets to show a directional information-flow pattern: higher layers become better at predicting future tokens while becoming worse at reconstructing current and previous tokens.

## Method

For a token at position $t$ and layer $\ell$, the model supplies contextualized representation $\mathbf h_{t,\ell}$. At each layer, the authors fit least-squares regression from this representation to the vocabulary index assigned to the target next token. Prediction residual is the fraction of variance unexplained,

$$
\mathrm{PR}_{\ell}=\frac{\sum_s(x_{t+1}^{s}-\hat{x}_{t+1}^{s})^2}{\sum_s(x_{t+1}^{s}-\bar{x}_{t+1})^2}.
$$

The proposed law is

$$
\mathrm{PR}_{\ell}\approx \rho^{\ell-1}\mathrm{PR}_{1}, \qquad 0<\rho<1,
$$

so $\log \mathrm{PR}_{\ell}$ is approximately linear in layer index. Pearson correlation between log PR and depth quantifies the fit. For pre-layer-normalized models, the analysis applies each architecture's corresponding normalization to hidden states. Eight candidate probing corpora are considered, and the main comparison uses the corpus yielding the strongest correlation for each model.

Additional analyses vary model scale and training checkpoints, compare next-token prediction with masked language modeling and span corruption, shuffle vocabulary indices, remove or replace layer normalization, and change the probe target to previous, current, or next-next tokens.

## Experiments

The main evaluation spans 20 configurations from GPT-1, GPT-2, Llama 1-3, Mistral 7B, Phi 1.5-3, RWKV/RWKV-Raven, and Mamba, with model sizes from 117M to 14B parameters. Across the configurations in Figure 1, correlations between layer index and log PR range from -0.983 to -0.997; GPT-1 has a reported layerwise decay ratio of approximately 0.993. The pattern also appears for GPT-1 probes from medical, legal, and political text, with correlations of -0.990, -0.995, and -0.998.

Pythia-1B checkpoints show that the pattern is absent at initialization and becomes visible after roughly 8,000 training steps. Data-constrained GPT-2 experiments suggest that it requires enough total training and enough unique tokens: too few epochs or excessive repetition weakens it. Across GPT-2, RWKV-Raven, and Mamba size series, larger models have lower first- and last-layer PR and lower total first-to-last residual ratios, but larger per-layer decay ratios.

The law does not appear when BERT, RoBERTa, or T5 representations are probed for next-token prediction. It appears noisily when BERT and RoBERTa are probed on their masked-token objective, but not for T5 under span corruption. Fine-tuned/chat variants behave similarly to their base counterparts in the reported comparisons. For information flow, PR increases with depth when predicting previous or current tokens and decreases when predicting next or next-next tokens.

Several sensitivity analyses narrow the claim. Separation fuzziness does not yield an equally clear law; shuffling vocabulary indices obscures the PR pattern; omitting the added normalization in pre-LN models makes it noisier; and unsuitable probing corpora weaken the linear relationship. Models trained on OSCAR show a noisier pattern than matched GPT-2 models trained on C4 when both are probed with OpenWebText.

## Limitations

PR regresses on numeric vocabulary indices, whose ordering is tokenizer-dependent and does not constitute a natural continuous measure of token identity. The vocabulary-shuffling result confirms that the reported law depends on this encoding. A low PR establishes linear accessibility under the selected probe, not that the model's own output head uses the same information or that each layer performs an identical computation.

The main protocol selects, for each model, the probing dataset with the strongest Pearson correlation among eight candidates. This supports an existence claim across tested corpora but can overstate how reliably the law appears for an arbitrary dataset; Figure 19 shows that the pattern can be much less clear on RedPajama. Explanations involving data quality are observational comparisons, not controlled isolation of curation quality.

The evidence covers selected open-source models up to 14B parameters and mostly pretrained checkpoints that fit on two 48 GB GPUs. Encoder-only and encoder-decoder results do not support universality across language-model objectives. The study offers hypotheses about pruning, fine-tuning, learning rates, transfer, and evaluation but does not test those applications. It also leaves the dependence of $\rho$ on architecture and data, and the mechanism producing the law, unresolved.

## Related Concepts

- [[concepts/equilearning-law|Equilearning Law]]
- [[concepts/linear-probing|Linear Probing]]
- Contextualized token representations
- Neural scaling laws
- Mechanistic interpretability

## Related Papers

- He and Su (2023), "A law of data separation in deep learning": the earlier equiseparation result that motivates the layerwise law studied here.
- Papyan, Han, and Donoho (2020), "Prevalence of neural collapse during the terminal phase of deep learning training": related geometric regularity in supervised classification.
- Wu and Papyan (2024), "Linguistic collapse: Neural collapse in (large) language models": examines geometric organization in language-model representations.
- [[papers/how-do-transformers-learn-to-associate-tokens-gradient-leading-terms-bring-mechanistic-interpretability|How Do Transformers Learn to Associate Tokens? Gradient Leading-Terms Bring Mechanistic Interpretability]]: analyzes early token-association learning through parameter dynamics rather than a cross-layer empirical law.

[[index|Library home]]
