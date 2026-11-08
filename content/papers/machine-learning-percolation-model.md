---
title: Machine Learning Percolation Model
type: paper
authors:
  - Shu Cheng
  - Huai Zhang
  - Yaolin Shi
  - Fei He
  - Ka-Di Zhu
year: 2021
tags:
  - percolation
  - phase-transitions
  - scientific-machine-learning
  - unsupervised-learning
---

## TL;DR

On 40,000 simulated $28\times28$ [[concepts/lattice-percolation|lattice percolation]] configurations, convolutional neural networks reproduce two order parameters and infer the permeability parameter, while VAE-reconstructed inputs leave those predictions largely unchanged. The important negative result is that PCA's leading component tracks permeability but does not recover either order parameter from the raw configurations. A threshold-sweep CNN reports a critical point of 0.594, close to the stated theoretical value 0.593, but its labels are themselves constructed from preset permeability thresholds.

## Research Question

How reliably can supervised and unsupervised machine-learning methods recover order parameters, permeability, and the critical transition point of a two-dimensional percolation model?

## Motivation

Machine learning had identified phases and transitions in several physical models, but success in one system or after particular preprocessing does not establish that a learned representation has the same physical meaning elsewhere. The paper therefore compares supervised prediction, generative perturbation, PCA, clustering, and threshold-sweep classification on one common percolation dataset.

## Contributions

- Compares four CNN tasks, a fully connected VAE, a convolutional VAE, PCA, and k-means on the same two-dimensional percolation configurations.
- Tests CNN predictions under corrupted labels, truncated training ranges, and VAE/cVAE reconstructions.
- Shows that the leading principal component of raw configurations is strongly associated with permeability but is not an order parameter in this setup.
- Uses k-means to delimit candidate thresholds and a family of threshold-labeled CNNs to report a critical point of 0.594.

## Method

Monte Carlo simulation produces 1,000 configurations at each of 40 permeability values from 0.41 to 0.80 in increments of 0.01. Each configuration is a binary $28\times28$ lattice. The two target order parameters are the probability that a configuration spans the lattice, $\Pi(p,L)$, and the density of sites belonging to the spanning cluster, $P(p,L)$.

CNN-I and CNN-II regress the two order parameters, while CNN-III regresses $p$. Each uses two convolution/max-pooling stages and two fully connected layers. The models train on 32,000 configurations and test on 8,000. Separate VAE and cVAE models reconstruct configurations; their outputs are then passed through the three trained CNNs.

For unlabeled analysis, PCA is applied directly to the flattened configuration matrix. The authors compare the averaged leading-component score with $p$, $\Pi(p,L)$, and $P(p,L)$. K-means divides configurations into two overlapping groups whose $p$ ranges overlap from 0.55 to 0.65. CNN-IV models are then trained with 11 different binary-label thresholds across that interval; the average output's crossing of 0.5 is treated as the inferred transition.

## Experiments

**Order-parameter regression.** CNN-I and CNN-II closely reproduce the simulated $\Pi(p,L)$ and $P(p,L)$ curves. CNN-I also fills in an artificially removed central range after training only where $\Pi$ lies in $[0,0.1]$ or $[0.9,1]$. When 5%, 10%, or 20% of target labels are inverted, the predicted trends remain similar, although the paper does not report a consolidated numerical robustness table in the supplied text.

**Permeability regression.** CNN-III predicts $p$ within the training interval. On 60,000 additional configurations outside that interval, it extrapolates from 0.01 to 0.40 but shows no significant correlation between predictions and $p$ from 0.81 to 1.00. The extrapolation claim is therefore one-sided.

**Generated perturbations.** VAE and cVAE reconstructions resemble the Monte Carlo samples visually. Feeding reconstructions to CNN-I through CNN-III preserves the reported order-parameter and permeability relationships. This tests reconstruction-like perturbations, not arbitrary distribution shift.

**PCA.** One component dominates the explained variance, and its averaged score is strongly linearly related to $p$. It does not show a statistically significant linear relationship with either order parameter. The paper contrasts this result with earlier percolation work that preprocessed configurations before PCA.

**Critical-threshold sweep.** Of the 11 CNN-IV models, the model labeled using preset threshold 0.60 produces an average-output crossing at $p=0.594$, compared with the stated theoretical value 0.593. The sampled $p$ grid has spacing 0.01, and the paper recommends finer threshold sampling for higher precision.

## Limitations

- All evidence comes from one $28\times28$ two-dimensional percolation model, so transfer to other lattice sizes, percolation variants, or physical systems is not established.
- The threshold-sweep experiment uses labels defined by candidate values of $p$; it is not fully label-free even though k-means narrows the candidate interval.
- Robustness to VAE/cVAE reconstructions establishes stability to those learned perturbations only, and the reconstructed samples retain corresponding labels from the source configurations.
- The upper-range failure of CNN-III shows that extrapolation is not uniformly reliable.
- The supplied manuscript does not provide a stable paper identifier, and several quantitative details are deferred to supplementary figures and tables unavailable in the parsed source.

## Related Concepts

- [[concepts/lattice-percolation|Lattice Percolation]]: the physical model, spanning observables, and critical threshold studied here.
- [[concepts/induced-percolation|Induced Percolation]]: a distinct network-pruning process already represented in the library; it should not be conflated with lattice occupation percolation.

## Related Papers

- Carrasquilla and Melko (2017), "Machine learning phases of matter": cited as a supervised-learning precedent for identifying phases from configurations.
- Wang (2016), "Discovering phase transitions with unsupervised learning": cited for interpreting principal components as physical indicators.
- Zhang, Liu, and Wei (2018), "Machine learning of phase transitions in the percolation and XY models": cited for PCA-based analysis of percolation.
- Yu and Lyu (2020), "Unsupervised machine learning of phase transition in percolation": the main contrasting study, which uses preprocessing before extracting a PCA-based order parameter.

[[index|Library home]]
