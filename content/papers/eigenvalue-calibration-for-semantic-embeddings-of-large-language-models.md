---
title: Eigenvalue Calibration for Semantic Embeddings of Large Language Models
type: paper
authors:
  - Sebastian G. Gruber
  - Nassim Walha
  - Francis Bach
  - Florian Buettner
year: null
tags:
  - uncertainty-quantification
  - probability-calibration
  - semantic-embeddings
  - large-language-models
  - proper-scoring-rules
---

## TL;DR

The paper treats an LLM together with normalized embeddings of its sampled answers as a density-matrix predictor, then defines matrix and eigenvalue calibration for that object. It proves that calibration makes expected spectral entropy agree with proper-score risk and that injective matrix temperature scaling can optimize calibration through risk minimization. Experiments on Natural Questions and TriviaQA find all tested LLMs overconfident; scaling reduces eigenvalue calibration error and often improves answer-correctness ranking.

[[index|Library home]]

## Research Question

How can eigenvalues derived from semantic embeddings of sampled LLM answers be calibrated, evaluated, and adjusted when conventional probability-calibration results do not directly apply to these latent spectral quantities?

## Motivation

Spectral uncertainty methods summarize a set of generated answers through the eigenvalues of an embedding-derived density matrix. These eigenvalues are nonnegative and sum to one, but they represent latent semantic directions rather than observable class outcomes. Consequently, ordinary confidence calibration does not establish that their entropy or largest eigenvalue has a reliable empirical interpretation.

## Contributions

- Defines matrix calibration by matching a predicted density matrix to the conditional target density matrix, and defines a weaker calibration condition for its maximum eigenvalue.
- Shows that canonical calibration of the answer distribution implies matrix calibration, while matrix calibration implies an equality conditional on the full predicted matrix but only an inequality when conditioning on the maximum eigenvalue alone.
- Introduces proper matrix scores and connects their divergences to Bregman matrix divergences; the matrix log score yields von Neumann entropy and quantum relative entropy.
- Proves an entropy-risk equality under exact matrix calibration and convergence of the entropy-risk gap as predictors approach calibration.
- Shows that an injective transformation changes proper-score risk by the same amount as calibration error, and proposes injective matrix temperature scaling for post-hoc calibration.
- Develops reliability diagrams that cluster predicted density matrices within eigenvalue bins to retain information lost by conditioning only on the maximum eigenvalue.

## Method

For a query $x$, the LLM supplies sampled answers $a$, and a normalized semantic embedding model $e$ maps them to a unit sphere. The associated predictor is

$$
d(x)=\mathbb E_{a\sim f(x)}[e(a)e(a)^\top],
$$

estimated in practice by averaging outer products over sampled answers. Its eigenvalues form a simplex: concentration in the leading eigenvalue represents a dominant semantic direction, while a flatter spectrum represents greater uncertainty.

Matrix calibration requires $\mathbb D_{Y\mid d(X)}=d(X)$. The paper's eigenvalue condition instead compares the predicted maximum eigenvalue with the maximum eigenvalue of a conditional target density matrix. Convexity of the spectral norm explains why discarding the rest of the predicted matrix leads to an inequality rather than ordinary scalar calibration.

For a proper matrix score $\mathbf S$, the risk is $\mathbb E[Y^\top\mathbf S(d(X))Y]$. With the matrix log score $-\log M$, its entropy is the von Neumann entropy $-\sum_i\lambda_i\log\lambda_i$. Under matrix calibration, expected entropy equals risk. A calibration-sharpness decomposition further shows that an injective recalibration map changes risk and proper calibration error by equal amounts.

The proposed matrix temperature scaling is

$$
h_{\mathrm{TS}}(M)=\frac{M^\alpha}{\operatorname{tr}(M^\alpha)},
$$

with temperature $T=1/\alpha$. It preserves eigenvectors and rescales eigenvalues. The temperature is selected on development data by minimizing matrix log risk.

## Experiments

The study evaluates Phi 4, Phi 4 Mini, and Llama4 Maverick on Natural Questions and TriviaQA. It uses all-mpnet-base-v2 embeddings, 20 responses per query sampled at temperature 0.5, 300 development examples per dataset for selecting the scaling temperature, and separate evaluation subsets of about 1,700 examples. A second embedding model, jina-embeddings-v5-text-nano, is used for a robustness check.

Across all six model-dataset settings, the risk-optimal matrix temperatures exceed one, indicating overconfidence. At the optimum, average entropy meets empirical risk as predicted by the theory, and risk, proper matrix calibration error, and eigenvalue ECE are approximately co-minimized. Reliability plots show reduced overconfidence after scaling.

Temperature scaling improves maximum-eigenvalue or entropy AUROC for answer correctness in most, but not all, comparisons. For example, Phi 4 on Natural Questions improves from 0.742 to 0.794 using the maximum eigenvalue, whereas Llama4 Maverick on TriviaQA changes from 0.690 to 0.688. In the Phi 4 Mini TriviaQA comparison, calibrating the LLM's sampling temperature reduces eigenvalue ECE from 0.36 to 0.30, while matrix temperature scaling reduces it to 0.21. The alternate embedder reproduces the qualitative calibration findings.

## Limitations

- The evaluation covers two question-answering datasets, three LLMs, and two embedding models; it does not establish behavior for other tasks, model families, or deployment shifts.
- Density matrices are estimated from 20 generations per query. The paper reports rapid estimator convergence and positive finite-sample bias in the maximum eigenvalue, but generation remains an additional computational cost.
- Matrix temperature scaling adjusts an already estimated density matrix. It does not change the generated answers and cannot recalibrate semantic entropy or kernel language entropy, which operate directly on answer sets.
- Calibration and answer-correctness discrimination are distinct objectives. The reported AUROC changes are often favorable but are neither guaranteed by the theory nor uniformly positive.
- The reliability diagram approximates conditioning on a high-dimensional matrix through hierarchical clustering, so its ECE depends on finite samples and clustering choices even though the reported sensitivity analysis is stable over the tested range.
- No publication year, DOI, or arXiv identifier is stated in the supplied Markdown.

## Related Concepts

- [[concepts/eigenvalue-calibration|Eigenvalue Calibration]]: calibration of latent spectral probabilities derived from semantic answer embeddings.
- [[concepts/probability-calibration|Probability Calibration]]: the conventional probability setting that motivates, but does not directly determine, matrix calibration.
- [[concepts/bregman-divergences|Bregman Divergences]]: proper matrix scores induce matrix-valued counterparts of this divergence family.
- [[concepts/text-embedding-models|Text Embedding Models]]: provide the semantic vectors from which the predicted density matrices are formed.

## Related Papers

- Walha et al. (2026), "Fine-grained uncertainty decomposition in large language models: A spectral approach": supplies the spectral uncertainty construction that this paper calibrates.
- Kuhn et al. (2023), "Semantic uncertainty: Linguistic invariances for uncertainty estimation in natural language generation": introduces semantic entropy, an answer-set method used as a comparison.
- Nikitin et al. (2024), "Kernel language entropy: Fine-grained uncertainty quantification for LLMs from semantic similarities": develops another semantic uncertainty baseline discussed in the experiments.
- Guo et al. (2017), "On calibration of modern neural networks": provides the conventional temperature-scaling precedent.
- Gruber and Buettner (2022), "Better uncertainty calibration via proper scores for classification and beyond": provides the proper-score calibration result adapted here to density matrices.
