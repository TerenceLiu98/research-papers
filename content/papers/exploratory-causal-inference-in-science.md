---
title: "Exploratory Causal Inference in Science"
type: paper
authors:
  - Tommaso Mencattini
  - Riccardo Cadei
  - Francesco Locatello
year: null
tags:
  - causal-inference
  - exploratory-causal-inference
  - sparse-autoencoders
  - foundation-models
  - experimental-ecology
---

## TL;DR

This paper studies randomized experiments where the treatment is known but the affected outcome is not specified in advance and is only observed through high-dimensional data. It proposes Neural Effect Search (NES), which combines foundation-model representations and sparse autoencoders with recursive stratified hypothesis tests. In semi-synthetic CelebA experiments, NES preserves precision and intersection-over-union as sample size or effect magnitude grows, while standard tests increasingly select entangled leakage neurons. On a real ant-behavior trial, NES retrieves a grooming-related code and a finite-sample background-design artifact for expert interpretation.

## Research Question

How can a randomized controlled trial discover which latent outcomes are changed by treatment when those outcomes are embedded in unstructured observations and cannot be specified before analysis?

## Motivation

Classical causal analysis starts with a named outcome and tests a prespecified hypothesis. This rationalist workflow is poorly matched to large scientific atlases and exploratory experiments, where the relevant outcome may be hidden in images, video, or other raw observations. Searching many learned measurement channels introduces a second problem: sparse autoencoder features can be weakly entangled, so increasing statistical power can make many leakage channels significant even when only a few concepts are scientifically central.

## Contributions

- Formalizes exploratory causal inference as treatment-effect discovery over unknown latent outcomes measured indirectly by high-dimensional observations.
- Uses a pretrained foundation model and a sparse autoencoder as a learned measurement dictionary whose codes provide candidate effect channels.
- Defines the Paradox of Exploratory Causal Inference: ordinary multiple-testing procedures can return more entangled channels as sample size or effect magnitude increases, including after Bonferroni correction.
- Introduces [[Neural Effect Search]], a recursive procedure that selects a leading effect, stratifies or residualizes on the selected code, and tests the remaining residual effects.
- Evaluates the procedure on controlled CelebA experiments and an unsupervised analysis of the ISTAnt randomized ecological trial.

## Method

Let T be a randomized binary treatment and X a high-dimensional indirect measurement. A foundation model maps each observation to a representation h. A sparse autoencoder maps h to a sparse code Z, treating each code coordinate as a candidate measurement channel. The approach assumes that the foundation-model representation retains the information about the unknown affected outcomes and that the sparse code has a principally aligned channel for each effect, while allowing broad leakage across other channels.

NES first estimates a treatment-control contrast for every remaining code and applies a multiple-testing gate, normally Bonferroni at alpha divided by the number of remaining hypotheses. It adds the significant code with the largest absolute effect to the selected set. On later rounds, Neural Effect Test forms treatment-agnostic strata from the selected codes and can optionally residualize the tested code separately within each treatment arm. The recursion stops when no remaining code is significant. Under randomization, SUTVA, finite-moment regularity, full-rank effect directions, principal alignment, and bounded stratification bias, the paper proves that NES recovers one principal code per affected outcome with probability tending to one as sample size grows.

## Experiments

The semi-synthetic benchmark uses CelebA images with two binary outcome factors, Eyeglasses and Wearing_Hat, and Smiling as an exogenous cause. Treatment is randomized with probability 0.5, and the authors vary sample size from 30 to 1,000 and the treatment effect from 0.1 to 0.8. SigLIP image representations are decomposed with a 9,216-code sparse autoencoder. NES is compared with an uncorrected t-test, FDR, Bonferroni, and top-k selection using precision, recall, and intersection-over-union against concept-aligned ground-truth codes. As power increases, all methods eventually recover the true effects, but the baselines lose precision to leakage while NES retains the best precision/IoU trade-off. Ablations replicate the pattern across DINOv2, code dimensions, top-k nonlinearities, effect structures, treatment probabilities, and random seeds; jump-ReLU can violate the principal-alignment assumption and makes the evaluation ill-defined.

The real-world study uses the ISTAnt randomized trial, in which ant triplets were filmed under treatment or control conditions. The authors encode frames with DINOv2, train a 4,608-code sparse autoencoder, and analyze 44 videos without Bonferroni adjustment because of the small sample. Two codes are returned without using behavioral annotations for training. Code 394 is most predictive of grooming (F1 = 0.398), while code 550 tracks a black background position marking assigned to one treatment by chance (F1 = 0.568). The latter is treated as a statistically detectable design artifact, not as a biological effect.

## Limitations

The guarantees depend on strong and partly untestable representation assumptions: the raw measurement must contain the relevant outcome information, the foundation model must preserve it, and the sparse autoencoder must provide identifiable, principally aligned effect channels. Continuous concepts and multimodal measurement processes are not developed. Sparse autoencoder features can be post-hoc or representation-dependent, so a significant code is a hypothesis rather than a validated scientific outcome. The real trial is small and uses an unadjusted exploratory gate, and its code interpretations depend on expert review and annotations applied after discovery. More generally, finite-sample design associations can be detected alongside biological effects, and the method does not itself determine which discovered signal is scientifically meaningful.

## Related Concepts

- [[Exploratory Causal Inference]]
- [[Neural Effect Search]]
- [[Unstructured Outcome Causal Inference]]
- Sparse autoencoders
- Foundation models
- Randomized controlled trials
- Multiple hypothesis testing

## Related Papers

- Cadei, Lindorfer, Cremer, Schmid, and Locatello (2024), "Smoke and mirrors in causal downstream tasks."
- Cadei, Demirel, De Bartolomeis, Lindorfer, Cremer, Schmid, and Locatello (2025), "Prediction-powered causal inferences."
- Chalupka, Eberhardt, and Perona (2017), "Causal feature learning: an overview."
- Bricken et al. (2023), "Towards monosemanticity: Decomposing language models with dictionary learning."
- Movva et al. (2025), "Sparse autoencoders for hypothesis generation."
- Schölkopf et al. (2021), "Toward causal representation learning."


[[index|Library home]]
