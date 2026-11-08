---
title: Eigenvalue Calibration
type: concept
aliases:
  - Spectral Calibration
  - Density Matrix Calibration
tags:
  - uncertainty-quantification
  - probability-calibration
  - semantic-embeddings
  - proper-scoring-rules
---

## Overview

Eigenvalue calibration asks whether the spectrum of a predicted density matrix gives reliable uncertainty estimates. In semantic LLM uncertainty, the matrix is formed by averaging outer products of normalized embeddings from sampled answers. Its eigenvalues sum to one and describe mass along latent semantic directions, but they are not probabilities of directly observed classes. Calibration therefore needs to preserve information about the full predicted matrix rather than treating its largest eigenvalue as an ordinary confidence score.

## Key Ideas

- **Density-matrix prediction:** For normalized semantic embeddings $e(a)$ of answers sampled from an LLM, $d(x)=\mathbb E[e(a)e(a)^\top]$ is positive semidefinite with unit trace. A dominant eigenvalue indicates concentration along one semantic direction; a flatter spectrum indicates dispersion.
- **Matrix calibration precedes scalar calibration:** Matrix calibration requires the predicted matrix to equal the conditional target density matrix given that prediction. Conditioning only on the maximum eigenvalue discards eigenvector and residual-spectrum information, so matrix calibration generally yields an inequality for this scalar summary rather than standard equality calibration.
- **Entropy can represent risk:** A proper matrix score defines both a risk and a spectral entropy. Under matrix calibration, expected entropy equals risk. For the matrix log score, the entropy is von Neumann entropy, equivalent to Shannon entropy of the eigenvalues.
- **Risk supports post-hoc calibration:** Proper-score risk decomposes into calibration, sharpness, and noise terms. An injective transformation preserves sharpness, so its change in risk equals its change in proper calibration error.
- **Matrix temperature scaling:** The map $M\mapsto M^\alpha/\operatorname{tr}(M^\alpha)$ preserves eigenvectors while flattening or sharpening the spectrum. Selecting $\alpha$ by proper-score risk gives a principled post-hoc calibration procedure.
- **Reliability diagrams need matrix context:** Binning only by maximum eigenvalue cannot test conditioning on the full density matrix. Clustering similar predicted matrices within eigenvalue bins provides an empirical approximation, but introduces finite-sample and clustering dependence.
- **Calibration is not discrimination:** Better spectral calibration does not guarantee higher AUROC for detecting incorrect answers. Numerical reliability and ranking quality remain separate properties.

## Important Papers

- [[papers/eigenvalue-calibration-for-semantic-embeddings-of-large-language-models|Eigenvalue Calibration for Semantic Embeddings of Large Language Models]]: defines matrix and eigenvalue calibration, establishes entropy-risk results, and introduces matrix temperature scaling and clustered reliability diagrams.
- Walha et al. (2026), "Fine-grained uncertainty decomposition in large language models: A spectral approach": motivates eigenvalue-based uncertainty from semantic embeddings.
- Gruber and Buettner (2022), "Better uncertainty calibration via proper scores for classification and beyond": develops the proper-score calibration framework adapted to density matrices.

## Related Concepts

- [[concepts/probability-calibration|Probability Calibration]]: calibrates observable predictive probabilities and clarifies why scalar confidence calibration is a different target.
- [[concepts/bregman-divergences|Bregman Divergences]]: proper matrix-score divergences are matrix Bregman divergences under differentiability.
- [[concepts/text-embedding-models|Text Embedding Models]]: generate the normalized semantic representations whose outer products define the density matrix.
