---
title: "Some Neural Networks Inherently Preserve Subspace Clustering Structure"
type: paper
authors:
  - Karan Vikyath Veeranna Rupashree
  - Siddharth Baskar
  - Daniel L. Pimentel-Alarcón
year: null
tags:
  - subspace-clustering
  - representation-learning
  - neural-network-theory
  - spectral-perturbation
---

## TL;DR

The paper gives sufficient spectral-gap and perturbation conditions for a neural layer to preserve a row-space projector that encodes subspace clustering. Synthetic and image-data experiments suggest that trained feedforward networks with ReLU, GELU, or SiLU can approach this preservation behavior without an explicit clustering-preservation penalty. Tested CNNs and Transformers retain high clustering accuracy while changing the projector, showing that successful clustering need not preserve this particular input structure.

## Research Question

When does a neural transformation preserve the subspace clustering structure of its input, and do ordinary training objectives lead networks toward parameters satisfying such preservation conditions?

## Motivation

Prediction or clustering accuracy alone does not explain what geometric structure a network retains. A basis-independent projector offers a concrete object to compare before and after each transformation. The paper uses this object to connect noisy union-of-subspaces data, linear transformations, activation functions, and initialization choices.

## Contributions

- Represents clustering structure through the projector onto the principal row space of a data matrix.
- Presents a perturbation argument in three stages: observation noise, a linear layer, and activation-induced distortion.
- States a sufficient bound relating spectral gaps to noise and activation residuals, with a multilayer extension through accumulated projector errors.
- Reports decreasing projector distances during training in selected feedforward and recurrent architectures, and contrasting behavior in CNNs and Transformers.
- Suggests nonnegative initialization for nonnegative inputs as a way to eliminate ReLU distortion initially, subject to the remaining rank and noise conditions.

## Method

Samples are columns of $X=X^\star+Z$, where $X^\star$ follows a union-of-subspaces model with $K$ component subspaces and total dimension $r=\sum_k r_k$. Let $P(A)$ project onto the leading $r$-dimensional row space of $A$. With a full-rank factorization $X^\star=UV$ and block-structured coefficients, the ideal projector has zero entries between clusters. The analysis uses this support structure as a clustering representation.

For a layer $Y=\sigma(WX)$, Theorem 3.1 defines three singular-value gaps:

$$
\delta_1=s_r(X^\star)-s_{r+1}(X),\qquad
\delta_2=s_r(WX^\star)-s_{r+1}(WX),\qquad
\delta_3=s_r(Y)-s_{r+1}(WX).
$$

Writing $\delta=\min(\delta_1,\delta_2,\delta_3)$ and taking $\epsilon$ as the smallest nonzero absolute entry of the ideal projector, the paper states the sufficient condition

$$
\delta>\frac{\sqrt{2^7r}}{\epsilon}
\max\{\|Z\|,\|WZ\|,\|Y-WX\|\},
$$

under which the entrywise projector error satisfies

$$
\|P(X^\star)-P(Y)\|_\infty<\epsilon/2.
$$

The proof invokes Davis-Kahan perturbation reasoning and triangle inequalities. Its linear-invariance step requires preservation of the signal rank: a linear map must not collapse directions occupied by $X^\star$. For ReLU, nonnegative preactivations make $Y-WX=0$, eliminating the activation residual but not the other conditions. Appendix B extends the argument by summing per-layer projector errors, so a fixed overall tolerance requires tighter control as depth increases.

## Experiments

- **Synthetic data:** Four subspaces of dimension 4, ambient dimension 400, and 100 samples per subspace give 400 samples in total. The initial autoencoder has one hidden layer with 80 ReLU neurons, squared Frobenius reconstruction loss, and gradient descent with learning rate 0.005. Figure 2 summarizes 100 trials per noise variance; the frequency of satisfying the theorem's condition decreases with noise, while projector distances decrease during training.
- **Initialization:** An experiment with noise increased to 0.5 compares the original initialization with weights sampled uniformly from the unit interval. The authors report improved preservation for the positive initialization. The nonnegative-input premise of the accompanying argument should be kept separate from the Gaussian synthetic construction.
- **Depth and activations:** Five-layer feedforward networks with ReLU, GELU, and SiLU, and a three-layer LSTM using ReLU, show decreasing projection distances in the reported experiments. Figures 3 and 4 summarize 100 trials.
- **Architectural contrast:** Three-layer CNNs and four-layer Transformers exhibit larger projector changes despite the authors' report of high clustering accuracy. This is evidence about the preservation mechanism, not a ranking of clustering performance.
- **Real data:** Section 8 names MNIST, CIFAR-10, EMNIST, SVHN, Kuzushiji-MNIST, Fashion-MNIST, Flowers-102, Food-101, USPS, STL-10, Oxford DTD, Oxford Pet, and EuroSAT. Appendix A describes five-layer networks trained for 200 epochs at a fixed learning rate. The text reports perfect or near-perfect ACC, NMI, and ARI for the selected models, but does not supply a numerical table of those metrics.

## Limitations

The theorem is conditional on spectral gaps, signal rank, bounded noise, and small activation distortion; it does not prove that gradient descent generally finds such parameters. The clean signal is unavailable in ordinary applications, making the assumptions difficult to check. The experiments intentionally select models that already cluster well, limiting conclusions about arbitrary architectures, initializations, or training runs.

Several details in the supplied text require caution. Projector entries can be negative, whereas the theorem states a positive-entry threshold; the support argument instead concerns absolute nonzero entries. A block-diagonal projector does not by itself guarantee that every within-cluster pair has a nonzero entry. The linear-invariance explanation cites $\operatorname{rank}(W)\ge r$, which alone does not ensure that $W$ preserves the signal subspace. The parsed proof also contains inconsistent norm powers and notation, so the displayed bound above is a report of the paper's theorem rather than an independently verified proof.

Section 8 calls the evaluation a collection of 12 datasets but lists 13, and the appendix captions do not show a separate Flowers-102 result. Exact plot values are not available in the supplied Markdown. The stated publication year, venue, and stable identifier are absent and are left unspecified. The broader suggestion that these results explain deep learning's success across images, audio, and text exceeds the directly described synthetic and image-data evidence.

## Related Concepts

- [[Subspace Clustering]]: the union-of-subspaces model and projector-based clustering representation used throughout the analysis.
- [[Statistical Identifiability]]: a related concern with representation invariance, although this paper compares input and layer projectors rather than independently trained models.

## Related Papers

- Elhamifar and Vidal (2013), "Sparse Subspace Clustering: Algorithm, Theory, and Applications." Cited background on the subspace clustering model.
- Vidal, Ma, and Sastry (2005), "Generalized Principal Component Analysis (GPCA)." Cited background on unions of subspaces.
- Davis and Kahan (1970), "The Rotation of Eigenvectors by a Perturbation. III." The perturbation-theory foundation cited in the proof.
- Pimentel-Alarcon and Nowak (2016), "The Information-Theoretic Requirements of Subspace Clustering with Missing Data." Cited for identifiability requirements.
- [[Statistical and Structural Identifiability in Representation Learning]]: a Wiki comparison concerning invariance of learned representations; it is not a citation claimed by the supplied paper.

[[index|Library home]]
