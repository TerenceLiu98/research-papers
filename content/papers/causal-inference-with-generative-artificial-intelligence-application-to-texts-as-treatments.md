---
title: "Causal Inference with Generative Artificial Intelligence: Application to Texts as Treatments"
type: paper
authors:
  - Kosuke Imai
  - Kentaro Nakamura
year: 2026
date: "2026-06-12"
source_job_id: "f0c7c0a2-208d-4af4-9b1d-6a0f03178a4f"
tags:
  - causal-inference
  - text-as-treatment
  - generative-ai
  - causal-overlap
  - double-machine-learning
---

## TL;DR

GenAI-Powered Inference (GPI) uses a generative model to create or exactly reproduce treatment texts and extract their internal representations. It learns an outcome-predictive deconfounder from those representations, then estimates feature effects with cross-fitted double machine learning. Identification requires deterministic decoding and separability of the treatment feature from other outcome-relevant features. Simulations favor GPI over the tested BERT estimators in several settings, especially strong confounding, but show undercoverage even in some separable settings and failure when separability is violated. A reanalysis of candidate biographies estimates a positive military-background effect of 4.852 points on a 0-100 feeling thermometer, with reported 95% confidence interval [1.902, 8.580].

## Research Question

Can access to the internal representation used to generate a text improve estimation of a particular textual feature's causal effect, while adjusting for other features without making treatment deterministic in the adjustment space?

## Motivation

Random assignment of whole biographies to respondents does not isolate the effect of military background: biographies also differ in education, tone, length, and other influential attributes. Prompting an LLM to include military experience can change those attributes too. Conversely, conditioning on the complete text or its full generating representation removes overlap because the treatment label is a deterministic property of the text. GPI seeks an adjustment representation that retains relevant confounding information while allowing comparisons between treatment states.

## Contributions

- Proposes generating new texts or exactly regenerating existing texts with an accessible generative model, making its internal representation available for subsequent estimation.
- Establishes identification results under explicit consistency, random-prompt-assignment, feature, separability, and deterministic-decoding assumptions (Section 3.2).
- Learns a deconfounder using treatment-specific outcome heads, fits propensity scores afterward, and derives asymptotic inference under nuisance-estimation regularity conditions.
- Evaluates new-text and text-reuse variants through simulations and two reanalyses of human survey experiments.
- Extends the framework to perceived treatment features using an instrumental-variable estimand for compliers (Appendix S3).

## Method

### Estimand and identification

A prompt $P$ produces an internal representation $R$, which generates a treatment object $X$. The treatment feature $T=g_T(X)$ is observed; other outcome-relevant features $U=g_U(X)$ need not be directly measured. The target is

$$
\tau=\mathbb{E}[Y(1,U)-Y(0,U)].
$$

This holds confounding features fixed when changing treatment, then averages over their distribution. The paper's [[concepts/treatment-confounder-separability|Treatment-Confounder Separability]] assumption requires meaningful intervention on $T$ without changing $U$, and excludes deterministic treatment prediction from $U$. It permits statistical association between the two. Random prompt assignment to respondents and deterministic decoding are additional identification conditions; access to hidden states alone does not suffice.

Under these assumptions, the paper establishes identification using a deconfounder $Q=f(R)$ that is separable from treatment and retains the relevant outcome information. For the ATE, the required sufficiency condition is

$$
\mathbb{E}[Y\mid T=t,Q]=\mathbb{E}[Y\mid T=t,R],
\qquad 0<P(T=1\mid Q)<1.
$$

Directly adjusting for $R$ would violate [[concepts/causal-overlap|Causal Overlap]] because $T$ is deterministic given $R$. The learned $f$ remains an estimation problem even though the model's original representation is observed.

### Estimation and implementation

1. Generate or exactly reproduce each text, code its treatment feature, and obtain human outcomes under random assignment of treatment objects. Extract the model's internal representation.
2. Fit a TarNet-style network with a shared deconfounder and separate treated/control outcome heads, minimizing outcome squared error. Treatment prediction is excluded from this representation-learning loss.
3. Fit the propensity model on the learned deconfounder using a separate training subset. The theoretical procedure nests this split within outer cross-fitting folds.
4. Combine held-out outcome predictions and propensities with an augmented inverse propensity weighted score to estimate the ATE and its variance. [[concepts/double-machine-learning|Double Machine Learning]] supplies asymptotic inference under the stated convergence-rate and regularity conditions.

The implementation uses Llama 3-8B's final-token hidden state, a 4,096-dimensional approximation to its full token-level representation. The simulation network maps this to a 2,048-dimensional deconfounder, with 500-unit hidden outcome layers, ReLU activations, and dropout 0.15. Random forests estimate propensity scores. Learning rates are tuned with Optuna, with early stopping. Propensity distributions and the independence-of-support score (IOSS) diagnose possible overlap problems, but do not prove that all confounders have been retained or that interventions preserve them.

### Perceived treatment

Appendix S3 uses the coded textual feature as an instrument for the respondent's perceived feature. Both must be observed. Under the extended separability conditions, monotonicity, a nonzero first stage, and exclusion, the target becomes the local average treatment effect among respondents whose perception changes with the actual feature. Exclusion can fail if wording affects a respondent without conscious recognition; measuring perception can itself prime responses.

## Experiments

### Semi-synthetic biographies

The authors generate 4,000 biographies and also regenerate the same texts for reuse. In the scenario intended to satisfy separability, treatment indicates the keywords "military," "veteran," or "army"; confounders are a BERTopic politics/education topic and TextBlob sentiment. The nonseparable scenario uses overlapping topics. Synthetic outcomes vary confounding strength while the corpus and features remain fixed. The main comparison uses 200 Monte Carlo trials, with difference in means and two BERT-based approaches as baselines (Sections 4.1-4.3).

Selected results from Table S5 follow. Coverage is the fraction of reported 95% intervals containing the simulation target.

| Scenario | Estimator | Bias | RMSE | Coverage |
| --- | --- | ---: | ---: | ---: |
| Moderate confounding, separability | GPI, new texts | -1.07 | 2.72 | 0.95 |
| Moderate confounding, separability | GPI, text reuse | -1.05 | 2.36 | 0.93 |
| Moderate confounding, separability | DML with BERT | 2.09 | 18.3 | 0.92 |
| Strong confounding, separability | GPI, new texts | -14.6 | 36.9 | 0.88 |
| Strong confounding, separability | GPI, text reuse | -15.1 | 36.0 | 0.92 |
| Strong confounding, separability | DML with BERT | 208 | 917 | 0.26 |

Without separability, both GPI variants have zero interval coverage at every tested confounding strength in Table S5. Additional 1,000-trial GPI runs report coverage of 0.89-0.93 across the separable settings (Table S6), so nominal coverage is approximate rather than uniformly attained. A separate sample-size experiment uses 1,000-4,000 texts and removes the treatment-confounder interaction to keep the true ATE constant; the authors report declining errors and lower variance for text reuse (Figure 5).

### Candidate profile experiment

The reanalysis uses 5,291 evaluations from an experiment involving 1,246 biographies and 1,886 respondents, each rating up to four profiles. The keyword rule marks 362 analyzed observations as treated. GPI regenerates the texts with Llama 3-8B and uses two-fold cross-fitting. Table 1 reports:

| Estimator | ATE | 95% confidence interval | IOSS | Runtime, seconds |
| --- | ---: | --- | ---: | ---: |
| GPI, text reuse | 4.852 | [1.902, 8.580] | 0.10 | 62.3 |
| Outcome model with BERT | -4.277 | [-4.312, -4.241] | 0.41 | 5914.0 |
| DML with BERT | 45.708 | [33.730, 57.686] | 0.41 | 5986.2 |

The authors report that all BERT-based propensity estimates fall outside [0.01, 0.99]. GPI's positive estimate agrees in direction with the original study's military-topic association, but this agreement does not independently establish its causal assumptions.

### Hong Kong experiment

Appendix S6 reanalyzes two experiments with randomized textual components: December 2019 ($N=1,983$) and October 2020 ($N=2,072$). GPI uses text reuse and five-fold cross-fitting. Table S7 reports GPI effects of 6.175 [2.784, 9.566] and 2.043 [-0.790, 4.877], respectively, compared with original OLS estimates of 5.231 and 2.680. The authors use OLS as a design-supported reference. GPI's second-wave interval includes zero. BERT estimates differ sharply from OLS in the first wave but are closer in the second.

## Limitations

- **Separability is substantive.** Stable propensity estimates and small IOSS values do not verify that treatment can change while every other influential feature remains fixed. GPI fails in the explicitly nonseparable simulations.
- **The observed representation is not automatically a valid deconfounder.** Final-token pooling is an approximation, and neural-network loss minimization does not by itself verify outcome sufficiency and separability. Architecture and optimization matter.
- **Inference has additional requirements.** The theory assumes independent observations and nuisance-estimation rates faster than $n^{-1/4}$ under its stated conditions. The candidate experiment includes repeated respondent ratings; Section 5 does not describe respondent-clustered inference.
- **Benchmark scope is limited.** Monte Carlo variation is conditional on one corpus, with randomness coming from outcome noise. The comparison changes both representation source and estimation procedure, so it does not isolate the contribution of internal-state access. Reported runtimes concern these implementations and settings.
- **The supplied numerical evidence has inconsistencies.** Table S5 gives the BERT outcome model RMSE smaller than absolute bias under weak confounding (1.00 versus 1.17) and moderate confounding (2.27 versus 3.44), which is incompatible with conventional definitions on the same trials. These entries remain unresolved, and the summary does not adopt the prose's blanket claim of uniformly smaller RMSE or nominal coverage. Several appendix equations also contain malformed notation in the supplied Markdown.
- **Generalization is not demonstrated for every modality.** The experiments here use texts. The authors discuss images as an extension and explicitly identify additional unresolved challenges for videos. Text reuse also requires faithful reproduction and access to internal states.

## Related Concepts

- [[concepts/text-as-treatment|Text as Treatment]]: distinguishes feature effects from effects of assigning entire documents.
- [[concepts/treatment-confounder-separability|Treatment-Confounder Separability]]: states when a feature intervention can preserve other influential content.
- [[concepts/causal-overlap|Causal Overlap]]: explains the problem with conditioning on a treatment-encoding representation.
- [[concepts/double-machine-learning|Double Machine Learning]]: supplies cross-fitting and orthogonal-score inference.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: connects the learned adjustment representation to causal identification.
- [[concepts/disentangled-representations|Disentangled Representations]]: provides related language for separating factors, without equating statistical independence with intervention validity.

## Related Papers

Cited in the supplied manuscript:

- Fong and Grimmer (2016), "Discovery of Treatments from Text Corpora": source of the candidate experiment.
- Fong and Grimmer (2023), "Causal Inference with Latent Treatments": source of the Hong Kong experiment and latent-feature framework.
- Pryzant et al. (2021), "Causal Effects of Linguistic Properties," and Gui and Veitch (2023), "Causal Estimation for Text Data with (Apparent) Overlap Violations": sources of the BERT comparators.
- Wang and Jordan (2024), "Desiderata for Representation Learning: A Causal Perspective": source of the independence-of-support diagnostic.
- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]]: broader context for recovering causal variables from unstructured observations.

Related library reading:

- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: uses paired human edits to obtain feature comparisons under preservation assumptions, offering a design-based counterpart to representation adjustment.

[[index|Library home]]
