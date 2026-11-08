---
title: "TimeSAE: Causal Sparse Decoding for Faithful Explanations of Black-Box Time Series Models"
type: paper
authors:
  - Khalid Oublal
  - Quentin Bouniot
  - Qi Gan
  - Stephan Clémençon
  - Zeynep Akata
year: null
source_job_id: "6b4649bf-bdc9-4a53-a030-c629718608a4"
tags:
  - sparse-autoencoders
  - time-series
  - counterfactual-explanations
  - explainable-ai
  - distribution-shift
---

## TL;DR

TimeSAE is a post-hoc, model-agnostic explainer that learns sparse temporal concepts from a black-box time-series model's inputs and outputs, then intervenes on those concepts to construct explanation-embedded counterfactuals. Its objective combines sparse reconstruction, prediction-label fidelity, compositional consistency, and counterfactual alignment. Across synthetic and real time-series datasets, the paper reports stronger explanation quality and faithfulness than attribution, masking, surrogate, and explainer-network baselines, including under several distribution shifts. These claims depend on representative training data, tuned sparsity and dictionary size, and approximate rather than identified real-world causal effects.

## Research Question

Can an end-to-end [[concepts/sparse-autoencoders|Sparse Autoencoder]] produce faithful, compositional explanations of black-box time-series predictions while keeping its reconstructed and counterfactual examples close to the data distribution and remaining useful under distribution shift?

## Motivation

Many time-series explanation methods rank time steps or variables by masking or perturbing them. Such modifications can break temporal and cross-feature dependencies and create out-of-distribution inputs, so a black-box model's response may reflect the perturbation artifact rather than the importance of the removed evidence. Correlational concept discovery also describes what a representation contains without establishing why a prediction changes. TimeSAE instead learns a sparse concept space whose decoded instances preserve the original prediction and whose concept interventions can be evaluated directly through the black-box model.

## Contributions

- Introduces TimeSAE, a post-hoc explainer that uses a temporal SAE to decompose univariate or multivariate sequences into sparse learned concepts without requiring access to a predictor's parameters or intermediate activations.
- Combines reconstruction and label fidelity with a counterfactual objective based on [[concepts/causal-concept-effects|Causal Concept Effects]] and a compositional-consistency objective intended to improve out-of-distribution explanations.
- Gives a sufficient-condition result for order faithfulness: approximate interventions preserve the ordering of true causal effects when reconstruction and counterfactual approximation errors are smaller than half the gap between the effects being compared.
- Evaluates two sparsification variants, JumpReLU and scheduled soft TopK, across trained predictors and time-series foundation models.
- Introduces EliteLJ, a dataset of 386 long-jump pose sequences with aligned phases, performance labels, and expert annotations for explanation evaluation.

## Method

An encoder maps a sequence $x\in\mathbb{R}^{D\times T}$ to a sparse nonnegative concept vector $c$, and a temporal decoder maps that vector back to an explanation-embedded sequence $\tilde{x}$. The encoder uses temporal convolutional blocks and Squeeze-and-Excitation channel weighting. The main variant activates a concept only when its preactivation exceeds a learned JumpReLU threshold; a second variant applies a soft TopK mechanism whose sparsification schedule becomes stricter during training.

The full loss has four parts. Sparse reconstruction makes $\tilde{x}$ resemble $x$ while limiting the active concepts. Label fidelity makes the black-box prediction $f(\tilde{x})$ match $f(x)$. A counterfactual term modifies selected latent concepts, decodes them, and encourages the resulting prediction to match a contradictory target. A compositional-consistency term requires encodings of combined intermediate sequences to agree with the corresponding composition of their concept codes. The decoder additionally decomposes reconstructions into first- and higher-order interactions among neighboring concepts, producing time- and feature-level masks without masking the original input.

The paper's theorem bounds the difference between true and approximate intervention effects by the sum of reconstruction error and counterfactual approximation error. If this total is less than half the true gap between two interventions, their causal-effect ordering cannot reverse. This is a conditional guarantee about approximation quality, not a general identification result for causal concepts from observational data.

## Experiments

The study covers synthetic FreqShapes and SeqComb datasets, ECG and PAM classification, ETTh1/ETTh2 forecasting, and EliteLJ regression. Black boxes include trained Transformer, PatchTS, DLinear, Informer, iTransformer, and LSTM models, plus pretrained or fine-tuned time-series models such as Chronos, TimeGPT, TimeFM, MOMENT, Chronos 2, and Toto. Baselines include Integrated Gradients, DynaMask, WinIT, CoRTX, SGT-GRAD, TimeX, TimeX++, CounTS, StartGrad, TIMING, and ORTE. Reported results use ten random seeds and measure saliency recovery with AUP, AUR, and AUPRC; distribution alignment with KDE, KL divergence, and MMD; and prediction change after removing selected concepts as a faithfulness score.

TimeSAE reports the best AUPRC, AUP, and AUR across the evaluated synthetic and real datasets, although the paper notes that TimeX++ and CounTS remain competitive and that statistical superiority is established only on several datasets. On the ETTh1-to-ETTh2 shift, its reported AUPRC is $0.641\pm0.030$, compared with $0.628\pm0.040$ for TimeX++, while its faithfulness score is $2.09\pm0.06$ versus $1.73\pm0.07$. Across five out-of-distribution transfers, TimeSAE has the strongest reported AUPRC and faithfulness and the lowest KL and MMD among IG, TimeX, and TimeX++.

In controlled intervention tests, the sufficient error condition holds on FreqShapes, ECG, and the expert-proxy EliteLJ evaluation, with reported Spearman correlations of 0.94, 0.91, and 0.89 between estimated and reference effect rankings. Under broader distribution shifts, the paper reports Pearson correlations of at least 0.79 and Spearman correlations of at least 0.84, while explicitly treating these as observational because true out-of-distribution causal effects are unavailable.

Ablations find that removing the counterfactual term lowers AUPRC by up to 13.9%, removing compositional consistency lowers faithfulness by up to 24.1%, and removing label fidelity causes degradation up to 38.2% on FreqShapes. The TCN-plus-SE architecture reaches a faithfulness score of 2.12 with about 3.5 million parameters and 0.45 GFLOPs on ETTh1; an MLP SAE reaches 1.38. Moderate dictionary expansion performs best, while excessive sparsity or overly large dictionaries harm reconstruction or explanation quality. JumpReLU also shows a better sparsity-fidelity tradeoff and fewer near-dead concepts than the evaluated TopK variant.

## Limitations

- TimeSAE requires enough representative data to train a separate explainer; the paper identifies data-scarce domains as an unresolved setting.
- Performance is sensitive to dictionary size, sparsity, and loss weights. The reported optimal ranges are empirical and require dataset- and predictor-specific tuning.
- The causal guarantee is conditional on small, measurable approximation errors and a sufficiently large gap between interventions. It does not show that learned coordinates correspond to causally identified real-world factors.
- Real-world explanation ground truth is limited. ECG uses QRS intervals and EliteLJ uses expert annotations as proxies; out-of-distribution causal-effect comparisons are observational.
- The faithfulness metric measures prediction change after latent concept removal. A large change demonstrates influence under that intervention protocol, but does not by itself establish that the explanation is complete, uniquely correct, or human-interpretable.
- The supplied manuscript contains some inconsistent efficiency figures: its table reports 4-5 ms inference and 69-72 ms training for TimeSAE, while the surrounding prose states 0.8-4 ms inference and 10-60 minutes of training. These values should not be treated as resolved without checking the authors' released artifacts.
- No publication year or stable paper identifier is present in the supplied Markdown.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: provide TimeSAE's sparse dictionary and reconstruction mechanism.
- [[concepts/causal-concept-effects|Causal Concept Effects]]: define the intervention-based effect that TimeSAE approximates in its latent concept space.
- [[concepts/temporal-sparse-autoencoders|Temporal Sparse Autoencoders]]: share the use of temporal structure in sparse representation learning, although TimeSAE explains input sequences rather than language-model activations.
- Counterfactual explanations: TimeSAE changes selected latent concepts and decodes them into sequences intended to alter the black-box prediction.
- Concept activation vectors: linear classifiers or regressors align learned latent dimensions with annotated domain concepts after training.
- Out-of-distribution explanation: the consistency objective is designed to keep explanations stable when the evaluation distribution differs from the explainer's training distribution.

## Related Papers

- Goyal et al. (2019), "Explaining Classifiers with Causal Concept Effect (CaCE)": supplies the concept-level causal-effect definition used by TimeSAE.
- Queen et al. (2023), "TimeX: Learning Time-Series Explanations with Information Bottleneck": provides synthetic benchmarks and a principal explainer-network baseline.
- Liu et al. (2024), "TimeX++: Learning Time-Series Explanations with Information Bottleneck": addresses distribution alignment with a stochastic masking explainer and serves as the strongest recurring baseline.
- Rajamanoharan et al. (2024), "Jumping Ahead: Improving Reconstruction Fidelity with JumpReLU Sparse Autoencoders": supplies TimeSAE's primary sparsification mechanism.
- Crabbé and van der Schaar (2021), "Explaining Time Series Predictions with Dynamic Masks": supplies DynaMask and the precision/recall-based saliency evaluation protocol.
- [[papers/causal-interpretation-of-sparse-autoencoder-features-in-vision|Causal Interpretation of Sparse Autoencoder Features in Vision]]: also tests whether SAE-based explanations track causal input evidence, but attributes internal vision features to image patches rather than decoding interventions on time-series concepts.

[[index|Library home]]
