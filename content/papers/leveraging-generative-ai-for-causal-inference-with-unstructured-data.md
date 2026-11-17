---
title: Leveraging generative AI for causal inference with unstructured data
type: paper
authors:
  - Kosuke Imai
  - Kentaro Nakamura
year: 2026
source_job_id: fa56daa5-1672-4833-9571-c534c2498de7
tags:
  - causal-inference
  - generative-ai
  - unstructured-data
---

## TL;DR

GenAI-Powered Inference (GPI) extracts internal representations from pretrained models that deterministically generate or reproduce text and images, then learns a compact deconfounder for causal estimation. Three applications report more precise estimates and substantive differences from earlier analyses. Reproduction supplies an information-preserving representation; valid adjustment still requires a suitable deconfounder and the application’s identification conditions.

## Research Question

Can pretrained generative models supply representations for causal inference when relevant confounding features are embedded in text or images, without fine-tuning the foundation models?

## Motivation

Generic embeddings may discard confounding information, while direct adjustment for rich objects can undermine overlap, especially when treatment is itself a feature of the object. GPI separates information retention during representation extraction from the subsequent construction of an adjustment variable.

## Contributions

- A common framework for text as confounder, image features as treatments, and structural models of text.
- Deterministic generative representations followed by neural estimation of outcome-relevant deconfounding summaries.
- Uncertainty estimation and influence-function-based combination of estimates from multiple generative models.
- Three empirical reanalyses and an accompanying open-source implementation.

## Method

Configure a pretrained model so that the unstructured object $X$ is a deterministic function of its internal representation $R$. Existing objects are reproduced to recover representations. The information-retention argument concerns this configured generation relationship, rather than arbitrary pretrained embeddings.

A neural network jointly estimates an outcome model and a low-dimensional deconfounder $f(R)$ shared across treatment groups. Its intended role is to retain outcome-relevant confounding information while discarding variation that predicts treatment alone. Architecture tuning must balance those goals. Foundation-model weights remain fixed; downstream networks are trained and tuned.

In the censorship application, a separate network estimates propensity scores conditional on the deconfounder and observed covariates. Two-fold cross-fitted [[concepts/double-machine-learning|Double Machine Learning]] estimates the average treatment effect on the treated, with user-clustered standard errors and extreme-score truncation. Model-specific estimates can be combined using estimated influence functions. The image application uses a convolutional encoding layer. The rhetoric application fits a semiparametric ordinal paired-comparison model with rhetorical-element coefficients and a neural function of each argument’s representation; uncertainty uses 200 percentile-bootstrap replications.

## Experiments

### Censorship and subsequent posting

The full Weibo sample contains 75,324 posts from 4,155 users; the matched comparison contains 879 posts from 628 users. LLaMA3-8B and Gemma3-1B reproduce focal posts. Compared with the original topic-based text matching analysis, GPI reports significantly reduced subsequent posting and a larger increase in future censorship. Combining models reduces standard errors by 4.4% on average.

Table 1 measures sensitivity to adding a keyword-based textual confounder. Entries are absolute estimate changes relative to the estimate without that additional confounder, with standard errors in parentheses; they are not bias against known causal ground truth.

| Outcome | GPI full sample | GPI matched sample | Text matching |
| --- | --- | --- | --- |
| Number of posts | 0.084 (0.068) | 0.242 (0.682) | 5.350 (33.794) |
| Censorship rate | 0.007 (0.003) | 0.196 (0.140) | 0.202 (0.277) |
| Missing-post rate | 0.040 (0.049) | 0.279 (0.346) | 0.627 (3.416) |

With the same estimation procedure, Qwen3-0.6B embeddings yield broadly similar results and comparable sensitivity robustness, although the missingness effect is significantly smaller. Sentence-BERT yields different conclusions, including a decrease in subsequent censorship, and greater sensitivity. These comparisons do not establish universal superiority over embedding models.

### Nighttime protest images

Using a dataset of over 9,000 protest images, GPI adjusts Stable Diffusion 1.5 and 2.1 representations for other visual features. The estimated nighttime effect on perceived violence falls by more than half relative to the unadjusted comparison. Combining estimates reduces standard errors by 7.4% relative to version 1.5 and 2.2% relative to version 2.1. Internal representations have 16,384 dimensions versus 786,432 raw pixel values; applying the same downstream architecture to pixels gives a larger and less precise estimate. The expected small effect is a substantive expectation, not experimentally known ground truth.

### Political rhetoric

The experiment contains 336 arguments, 3,317 respondents, and 13,268 paired comparisons across 14 rhetorical elements. LLaMA3-8B, LLaMA3.3-70B, and Gemma3-1B produce consistent rankings: appeal to authority is most persuasive, whereas ad hominem attacks reduce persuasiveness. Estimates are more precise than the original structural analysis. Only 336 unique texts are available, motivating a semiparametric rather than fully nonparametric model.

## Limitations

- Information retention in $R$ does not ensure that a fitted $f(R)$ satisfies the conditions needed for identification. Network capacity and tuning matter, and [[concepts/causal-overlap|Causal Overlap]] remains necessary.
- Reproducing text is more computationally expensive than using pretrained embedding models. Highly correlated influence functions limit gains from combining models.
- The supplied Markdown omits the supplementary theoretical derivations and implementation details, and its bibliography begins at reference 11. No missing paper identifier or theorem assumptions are reconstructed here.
- Deconfounder interpretation and discovery of unknown treatment features remain future work. Audio and video extensions are proposed rather than demonstrated in these applications.

## Related Concepts

- [[concepts/double-machine-learning|Double Machine Learning]]: provides cross-fitted causal estimation after nuisance learning.
- [[concepts/causal-overlap|Causal Overlap]]: motivates compressing representations before adjustment.
- [[concepts/text-as-treatment|Text as Treatment]]: distinguishes rhetorical-feature effects from effects of whole arguments.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: the broader problem of constructing representations that support causal queries.

## Related Papers

- [[papers/causal-inference-with-generative-artificial-intelligence-application-to-texts-as-treatments|Causal Inference with Generative Artificial Intelligence: Application to Texts as Treatments]]: related library work on generative representations for textual feature effects.
- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: related library work addressing feature effects through paired editing and explicit overlap diagnostics.
- Blumenau and Lauderdale, *The variable persuasiveness of political rhetoric*: source of the rhetoric experiment reanalyzed here (reference 13).

Software: [GPI](https://gpi-pack.github.io/). Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/DX2PEX). The latter DOI identifies the dataset, not the paper.
