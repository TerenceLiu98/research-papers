---
title: "LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures"
type: paper
authors:
  - Hai Huang
  - Yann LeCun
  - Randall Balestriero
year: null
source_job_id: "d8c0cc25-63d5-41d5-9693-796f3f754aa5"
tags:
  - representation-learning
  - language-models
  - latent-prediction
---

## TL;DR

LLM-JEPA adds prediction between paired sequence embeddings to the usual generative language-model loss. It improves reported fine-tuning accuracy across several model families and tasks, while retaining standard inference. For Llama-3.2-1B-Instruct on NL-RX-SYNTH, accuracy rises from 57.29 ± 5.32% to 71.46 ± 1.34%. The generative objective remains essential: training with the JEPA term alone produces empty outputs in the reported ablation.

## Research Question

Can embedding-space prediction between complementary language views improve generative language models during fine-tuning and pretraining?

## Motivation

[[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] learn by predicting representations rather than reconstructing input detail. Natural-language descriptions and corresponding regular expressions or SQL queries supply complementary views of shared functionality. The paper uses those pairs to regularize representations without abandoning token generation.

## Contributions

- Combines next-token prediction with a cosine-based embedding prediction objective.
- Implements a predictor through appended special tokens and shared language-model weights, with a block-causal mask separating the two views.
- Tests full and LoRA fine-tuning, small-scale pretraining, alternative losses, and batch-level loss dropout.
- Reports representation diagnostics consistent with a simpler mapping between paired embeddings; the proposed connection to accuracy is a hypothesis rather than an established causal mechanism.

## Method

For paired sequences x and y, the objective is

$$
\mathcal L=\mathcal L_{\mathrm{LLM}}+\lambda d(\mathrm{Pred}(\mathrm{Enc}(x)),\mathrm{Enc}(y)).
$$

The encoder uses the final-layer hidden state at the last token. Appending k [PRED] tokens lets the same transformer perform additional processing; the last predictor token supplies the predicted embedding. With k = 0, the predictor is the identity. The default discrepancy is cosine-based.

A separate embedding pass packs both views with block-causal attention, preventing either view from attending to the other. Together with the generative pass, this requires two forward passes rather than three. Inference requires no additional pass. Batch-level JEPA-loss dropout skips the extra pass with probability α, giving the paper's approximate training-cost multiplier of 2 − α. Keeping λ(1 − α) approximately constant is an empirical co-tuning heuristic.

## Experiments

The main fine-tuning protocol repeats configurations with five fixed seeds, tunes the baseline learning rate, and then searches JEPA weight λ and predictor length k. Reported values are means and standard deviations for selected configurations, with paired one-tailed t-tests.

| Model / dataset | Token-loss baseline (%) | LLM-JEPA (%) |
| --- | --- | --- |
| Llama-3.2-1B-Instruct / NL-RX-SYNTH | 57.29 ± 5.32 | 71.46 ± 1.34 |
| Gemma-2-2B-it / NL-RX-SYNTH | 33.65 ± 3.24 | 43.12 ± 2.61 |
| OpenELM-1.1B-Instruct / NL-RX-SYNTH | 12.07 ± 1.81 | 25.40 ± 2.40 |
| OLMo-2-0425-1B-Instruct / NL-RX-SYNTH | 87.09 ± 0.36 | 87.52 ± 0.29 |
| Llama-3.2-1B-Instruct / NL-RX-TURK | 22.49 ± 1.91 | 30.94 ± 1.13 |
| Llama-3.2-1B-Instruct / GSM8K | 32.36 ± 0.58 | 36.36 ± 0.20 |
| Llama-3.2-1B-Instruct / Spider | 47.52 ± 2.44 | 50.55 ± 2.08 |

Sources: Tables 12–13. Regex tasks use exact string match, GSM8K exact final-answer match, and Spider execution-result match. Additional experiments report gains on NQ-Open, HellaSwag, and GSM8K with Qwen3 and R1-Distill-Qwen. These use different scoring rules: NQ-Open accepts a ground-truth answer substring, while HellaSwag selects the highest-probability answer option.

Random-initialization pretraining on NL-RX-SYNTH improves from 54.38 ± 1.70% to 60.59 ± 1.01% under a relaxed prefix-match criterion (Table 2). Paraphrase pretraining followed by ordinary generative fine-tuning improves Rotten Tomatoes from 56.57 ± 1.66% to 57.76 ± 1.33% and Yelp from 26.46 ± 0.92% to 27.15 ± 0.93% (Table 9); these classification evaluations also use label-prefix matching.

In Table 3, replacing cosine discrepancy with unnormalized L2 yields 2.22 ± 0.07%, and InfoNCE yields 34.40 ± 6.10%, both below the 57.29% baseline. MSE reaches 70.64 ± 2.05%. Removing token loss entirely yields 0% accuracy and empty outputs (Table 10). Loss dropout improves accuracy at matched compute in the reported regex experiments. LoRA gains persist across tested ranks, though its training trajectories are less stable than full fine-tuning.

## Limitations

- Full JEPA training roughly doubles compute; loss dropout reduces this overhead but does not eliminate tuning costs for λ and k.
- Paired views are central to the construction. The QA extensions broaden the evidence but do not establish a general augmentation recipe for arbitrary text.
- Pretraining is preliminary and dataset-limited. Prefix matching relaxes termination requirements, so those scores are not directly comparable with exact-match fine-tuning results. The 8B regex experiment also introduces prefix scoring after termination failures.
- Representation visualizations, singular values, and regression errors support the authors' geometric interpretation but do not prove why accuracy improves.
- Selected configurations receive additional JEPA hyperparameter search. Reported gains and significance apply to this protocol rather than a universal fixed configuration.
- The supplied Markdown does not establish the paper's own publication year or stable identifier; these are left unspecified. Its Figure 9 caption names HellaSwag despite values resembling the NQ-Open experiment, so that caption is not used for quantitative conclusions.

## Related Concepts

- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: prediction of paired representations.
- [[concepts/conditional-concentration-in-latent-prediction|Conditional Concentration in Latent Prediction]]: a useful lens on whether deterministic targets preserve meaningful alternatives.

## Related Papers

- [[papers/the-jepa-paradox-in-language-the-geometry-of-linguistic-alternatives|The JEPA Paradox in Language]] examines standalone deterministic text JEPA; LLM-JEPA instead retains a generative anchor. This is a library comparison, not a citation asserted for this manuscript.
- Assran et al. (2023), “Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture”: the cited image-domain precedent.
- Baevski et al. (2022), “data2vec”: a cited latent-target learning framework across speech, vision, and language.

Code supplied by the manuscript: [LLM-JEPA repository](https://github.com/rbalestr-lab/llm-jepa).

[[index|Library home]]
