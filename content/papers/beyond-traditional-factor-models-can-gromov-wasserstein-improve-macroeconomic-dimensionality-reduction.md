---
title: "Beyond Traditional Factor Models: Can Gromov-Wasserstein Improve Macroeconomic Dimensionality Reduction?"
type: paper
authors:
  - Xiaochao Xing
  - Lu Wang
year: 2026
source_job_id: "1a03a2ba-c386-42a7-990b-37483f9568a4"
tags:
  - macroeconomics
  - gromov-wasserstein
  - dimensionality-reduction
---

## TL;DR

The paper adapts Gromov-Wasserstein autoencoding to factor-augmented vector autoregression (FAVAR), combining geometric preservation, reconstruction, target–factor decoupling, and sparse loadings. A separate Transformer-VAR experiment reports better forecasts than linear VAR; it does not use the GWAE factors.

## Research Question

Can nonlinear, geometry-preserving factor extraction yield interpretable representations of high-dimensional macroeconomic relationships?

## Motivation

PCA extracts linear variance-maximizing factors, which may miss nonlinear sectoral relationships. The authors instead seek to preserve pairwise geometry while using sparse loadings to expose relationships between indicators and factors.

## Contributions

- Adapts GW autoencoding to macroeconomic factor extraction.
- Combines geometric alignment with adversarial decoupling from observed targets and sparse loading matrices.
- Studies U.S. macroeconomic loadings and impulse responses, alongside an independent attention-based forecasting comparison.

## Method

An encoder with fully connected layers and multi-head attention maps indicators to factors. The observation equation reconstructs indicators using both latent factors and an observed target. The loss sums reconstruction error, weighted Gromov-Wasserstein discrepancy, discriminator-based factor–target decoupling, and L1 penalties on loading matrices (Section 3, equations 8–12). Factors and targets enter a subsequent VAR. The implementation description uses entropic regularization, Sinkhorn-type optimization, and temporal minibatches.

Section 7.2 separately introduces Transformer-VAR with embeddings, positional encoding, multi-head attention, and feed-forward layers. It explicitly says this module operates on observed variables rather than GWAE factors, although the displayed equations retain factor notation.

## Experiments

**Factor extraction:** Section 4 uses 120 monthly U.S. series from January 1959 to August 2001, extracting three factors. Comparisons include VAE, conditional VAE, beta-VAE, FactorVAE, and Wasserstein autoencoders. The radar-chart discussion reports favorable disentanglement and diversity results but acknowledges higher reconstruction loss than VAE-based models.

**Economic application:** Section 5 uses 223 CEIC indicators from January 2003 to October 2024. Targets include electricity generation, labor force participation, tax revenue, consumer sentiment, and the PCE price index. Eight-factor loading tables and impulse responses support the authors’ economic interpretations. Additional analyses examine electricity consumption and unemployment.

**Independent forecasting results (Table 9):**

| Model | MSE | RMSE | R² | MAE | MAPE |
| --- | ---: | ---: | ---: | ---: | ---: |
| Traditional VAR | 0.0155 | 0.1225 | 0.8753 | 0.0982 | 4.12 |
| Transformer-Enhanced VAR | 0.0125 | 0.1118 | 0.8945 | 0.0857 | 3.75 |

Values are transcribed as reported; the traditional VAR MSE and RMSE do not exactly satisfy the stated square-root relationship.

## Limitations

The independent Transformer comparison does not establish a forecasting benefit from GWAE factors. Geometric preservation and sparse loadings alone do not identify causal policy effects. General GW convergence results do not automatically establish identification or convergence for the complete nonconvex neural objective. The factor-extraction comparison lacks a complete numerical results table in the supplied text. Mixed factor/observed-variable notation in the Transformer section and inconsistent lag-unit descriptions also complicate replication. No stable identifier for this article is supplied in the parsed text.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares intrinsic geometry across observed and latent spaces.
- [[concepts/optimal-transport|Optimal Transport]]: provides the coupling formulation underlying geometric alignment.
- [[concepts/disentangled-representations|Disentangled Representations]]: relates to the independence and decoupling objectives.

## Related Papers

- [[papers/gromov-wasserstein-autoencoders|Gromov-Wasserstein Autoencoders]]: the representation-learning foundation adapted here to macroeconomic factors; its image experiments are distinct from this paper’s economic evidence.
