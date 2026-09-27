---
title: "Causal Inference with Unstructured Outcomes"
type: paper
authors:
  - Kevin Christian Wibisono
  - Yixin Wang
year: null
source_job_id: "85773778-9667-4032-964a-04bbb605cc16"
tags:
  - causal-inference
  - unstructured-data
  - text-outcomes
  - image-outcomes
  - treatment-effect-heterogeneity
---

## TL;DR

This paper proposes the maximally contrasting feature (MCF), a learned bounded score for identifying which represented aspect of an unstructured outcome changes most under treatment. It estimates the score with an inverse-propensity-weighted objective, extends it to covariate-dependent effects, and develops a paired maximally influential treatment feature (MIF) and MCF when both treatment and outcome are unstructured. Text and image experiments recover treatment-induced formality, non-toxicity, punctuation, and blur, while paired experiments recover linked treatment and outcome directions after covariate adjustment.

## Research Question

How can causal inference characterize treatment effects when the outcome is a text, image, or other unstructured object for which subtraction and a natural average treatment effect are not meaningful? When treatment is also unstructured, which treatment-side feature is associated with which outcome-side feature after adjustment for observed context?

## Motivation

For scalar outcomes, the average treatment effect compares mean potential outcomes by subtraction. That operation has no canonical interpretation for clinical notes, survey responses, images, or other rich objects. Reducing an object to a prespecified scalar or codebook can also miss the treatment-induced feature of interest. The paper treats a numerical representation of the raw object as the working outcome and makes feature selection part of the causal query.

## Contributions

- Defines the [[concepts/maximally-contrasting-feature|Maximally Contrasting Feature]] (MCF) as the bounded outcome-scoring function with the largest average contrast between treated and control potential outcomes.
- Establishes identification under SUTVA, overlap, and unconfoundedness, and proposes inverse-propensity-weighted estimation with sample splitting or cross-fitting.
- Develops heterogeneous and budgeted MCFs for effects that vary across covariate profiles and for inspecting only the most treatment-enriched part of the outcome population.
- Extends the framework to a paired [[concepts/maximally-influential-treatment-features|Maximally Influential Treatment Features]] (MIF) and MCF objective when both treatment and outcome are unstructured, using matched negative-control outcomes to remove the covariate baseline.
- Shows through text, image, and text-to-text experiments that the learned scores recover treatment-relevant directions and can be interpreted through high- and low-scoring examples.

## Method

Let $X$ be pre-treatment covariates, $A$ a binary treatment, and $Y$ a numerical representation of the raw unstructured outcome. For a bounded feature-scoring function $g(Y)$, the feature-specific causal contrast is

$$
\theta(g) = \mathbb{E}\{g(Y(1)) - g(Y(0))\}.
$$

The MCF maximizes this contrast over a prespecified function class. In the population oracle class $0 \leq g \leq 1$, it selects represented outcomes where the treated potential-outcome density exceeds the control density. The oracle is unique almost surely when the density-tie set has zero reference probability. Identification requires SUTVA, overlap, and unconfoundedness for the represented outcome before searching over features (Section 2.2).

A parameterized score is fitted by maximizing

$$
\widehat\theta_N(\beta)=\frac{1}{N}\sum_{i=1}^N
\left\{\frac{A_i g(Y_i;\beta)}{\widehat e(X_i)}
-\frac{(1-A_i)g(Y_i;\beta)}{1-\widehat e(X_i)}\right\}.
$$

The learned propensity score is held fixed while the outcome feature is optimized. Sample splitting or cross-fitting separates propensity estimation from feature learning. This avoids repeatedly fitting outcome regressions whose targets change with $g$ (Section 2.4; Appendix J).

The heterogeneous version uses $g(Y,X)$, allowing the treatment-induced direction to differ by context. Under a fixed reference density, the budgeted oracle ranks outcomes by $(p_1(y)-p_0(y))/p_{\mathrm{ref}}(y)$ and selects a prescribed reference mass. Increasing the budget changes a threshold on this ranking; it does not discover separate attributes in sequence. An exact-mass budget can lower the contrast after all positive- and zero-difference regions are exhausted, whereas an upper-bound budget permits saturation (Section 2.5).

For unstructured treatments, the paper learns bounded treatment and outcome scores by maximizing

$$
\mathcal J(f,g)=\mathbb E[f(A)\{g(Y)-\mathbb E(g(Y)\mid X)\}]
=\mathbb E[\operatorname{Cov}\{f(A),g(Y)\mid X\}].
$$

Matched negative-control outcomes approximate the covariate baseline without fitting a new regression for every update of $g$. The population identity requires $Y^\dagger\mid X$ to have the same distribution as $Y\mid X$ and $Y^\dagger\perp A\mid X$; nearest-neighbor or kernel matching approximates these conditions. With repeated discrete covariates, exact within-stratum centering is an alternative (Section 3). For covariate-adaptive scores, matched outcomes are evaluated at the target unit's covariates, $g(Y_j,X_i)$ (Appendix W).

## Experiments

The text experiments use semi-synthetic GYAFC and ParaDetox outcomes, with scores summarized on held-out validation data (Section 4.1). With context-invariant treatment effects, the MCF recovers formality and non-toxicity: in the formality study, mean scores for informal and formal entertainment sentences are approximately 0.19 and 0.86, and the corresponding family scores are 0.21 and 0.86. In the non-toxicity study, high-conflict toxic and non-toxic sentences score approximately 0.05 and 0.92, while moderated-support scores are 0.03 and 0.91. Context-adaptive scenarios reverse the learned direction across contexts, rather than producing a misleading global classifier. These are learned feature scores, not treatment-effect estimates.

A multi-attribute study uses StyleDistance representations to recover joint formality and punctuation when both shift, and isolates punctuation or formality when only one shifts. Table 3 reports the following mean scores; punctuation means a question or exclamation mark.

| Treatment changes | Informal, no punctuation | Informal, punctuation | Formal, no punctuation | Formal, punctuation |
| --- | ---: | ---: | ---: | ---: |
| Both attributes | 0.000 | 0.119 | 0.204 | 0.940 |
| Punctuation only | 0.091 | 0.954 | 0.081 | 0.935 |
| Formality only | 0.036 | 0.043 | 0.962 | 0.969 |

The LDA comparison searches two through ten topics. Eight topics produces the largest contrast among those LDA models, but the topic summaries do not map clearly to formality or another stylistic dimension (Appendix X.1.2). This is evidence about interpretability in this example, not a quantified general performance advantage over topic models.

For images, an adversarial autoencoder represents synthetic cell images from BBBC005v1 using a 32-dimensional style representation while cell count supplies content. After adjustment for cell count, test images with learned scores below 0.2 have mean blur 10.0, compared with 34.6 for scores above 0.8. Embedding-based nudging increases blur while holding cell-count content approximately fixed.

When both sides are unstructured, a synthetic three-coordinate treatment-outcome experiment recovers the only informative pair, $A_1$ and $Y_1$, while ignoring the other coordinates. In a headline-generation experiment using Qwen2.5-1.5B-Instruct and all-MiniLM-L6-v2 embeddings, the paired scores recover prompt formality and generated-headline formality after adjusting for topic.

## Limitations

The causal interpretation requires consistency/SUTVA, overlap, and unconfoundedness relative to the chosen covariates and representation. The MCF is exploratory and class-dependent: its interpretation comes from inspecting examples and may combine several correlated attributes rather than identify one named feature. The representation function determines which information from the raw object is available, and arbitrary embedding points may not correspond to coherent objects.

The estimation results rely on regularity conditions for uniform convergence, propensity estimation, sample splitting or cross-fitting, and asymptotic expansions. In particular, Proposition 5 assumes that the fixed-parameter IPW moment estimator already has a semiparametrically efficient expansion. Remark 2 explicitly notes that ordinary IPW is not generally efficient; cross-fitting alone does not establish this condition. Practical optimization uses bounded parameterized scores and can be sensitive to the chosen architecture. Appendix J reports instability and initialization sensitivity for both implemented bi-level plug-in alternatives.

The paired MIF-MCF objective is an average conditional covariance. Its algebraic identities and matching construction do not alone identify the effect of intervening on a named treatment attribute; the causal interpretation still needs a justified intervention and adjustment strategy. Finite-sample covariate neighborhoods only approximate the required negative-control distribution.

The empirical studies are synthetic or semi-synthetic, and the image and headline examples do not establish performance on downstream real-world decisions. Embedding nudges are interpretation checks rather than guaranteed content-preserving interventions: some decoded examples in Tables 1 and 2 change meaning or produce incomplete sentences. The supplied Markdown contains corrupted symbols in several equations and gives no publication year or stable identifier for this paper; the metadata leaves these unspecified.

## Related Concepts

- [[concepts/unstructured-outcome-causal-inference|Unstructured Outcome Causal Inference]]
- [[concepts/maximally-contrasting-feature|Maximally Contrasting Feature]]
- [[concepts/maximally-influential-treatment-features|Maximally Influential Treatment Features]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- Potential outcomes
- Propensity scores
- Text and image embeddings
- Negative control outcomes

## Related Papers

- Egami, Fong, Grimmer, Roberts, and Stewart (2022), "How to make causal inferences using texts."
- Feder et al. (2022), "Causal inference in natural language processing: Estimation, prediction, interpretation and beyond."
- Veitch, Sridhar, and Blei (2020), "Adapting text embeddings for causal inference."
- Wibisono and Wang (2026), "Causal inference with unstructured treatments," arXiv:2608.00657.
- Modarressi, Spiess, and Venugopal (2025), "Causal inference on outcomes learned from text," arXiv:2503.00725.
- [[papers/causal-inference-with-generative-artificial-intelligence-application-to-texts-as-treatments|Causal Inference with Generative Artificial Intelligence: Application to Texts as Treatments]]: cited treatment-side work; estimates effects of textual features on a scalar outcome.
- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]]: cited background on recovering representations, complementary to selecting a causal feature after a representation is chosen.

Related library reading:

- [[papers/exploratory-causal-inference-in-science|Exploratory Causal Inference in Science]]: discovers affected measurement channels in randomized experiments, a related exploratory goal with a different representation and testing procedure. This is a library connection, not a citation in the supplied manuscript.

[[index|Library home]]
