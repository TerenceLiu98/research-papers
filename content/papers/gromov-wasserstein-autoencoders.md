---
title: Gromov-Wasserstein Autoencoders
type: paper
authors:
  - Nao Nakagawa
  - Ren Togo
  - Takahiro Ogawa
  - Miki Haseyama
year: null
source_job_id: "5c2bd231-1afc-47f9-8ce0-cd95f0ae0c56"
tags:
  - gromov-wasserstein
  - representation-learning
  - autoencoders
  - disentanglement
  - trainable-priors
---

[[index|Library home]]

## TL;DR

Gromov-Wasserstein Autoencoders (GWAE) replace the evidence lower bound with a [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein]] objective that matches the intrinsic distance structures of data and latent distributions. A variational encoder-decoder, joint-distribution critic, reconstruction constraint, and entropy regularizer make this objective trainable with stochastic gradients. The prior is learned rather than fixed: unrestricted neural, factorized neural, and Gaussian-mixture families encode different meta-priors without changing the main objective. On image benchmarks, the factorized prior improves one major disentanglement score and the mixture prior supports strong out-of-distribution detection, but performance depends sharply on choosing a prior family suited to the data structure.

## Research Question

Can an autoencoder learn a low-dimensional representation by directly matching the distance structure of data and latent spaces, while expressing assumptions such as factor independence or clustering through the prior family instead of modifying an ELBO-based objective?

## Motivation

VAE representation-learning methods commonly add weights, penalties, or architectural changes to the ELBO. These changes can alter the balance between reconstruction and prior matching, contribute to posterior collapse, and make it unclear whether the latent geometry preserves the data geometry. Ordinary [[concepts/optimal-transport|Optimal Transport]] compares distributions on a shared ground space, whereas GW compares metric-measure spaces even when their dimensions differ. This makes GW a candidate objective for directly relating a high-dimensional data distribution to a lower-dimensional latent distribution.

## Contributions

- Defines a probabilistic autoencoder family whose primary objective estimates and minimizes the GW discrepancy between the data distribution and a trainable latent prior.
- Combines the GW estimator with reconstruction, adversarial joint-distribution matching, and conditional-entropy terms so the model can be optimized through alternating minibatch updates.
- Introduces three trainable prior families: a neural prior (NP), a factorized neural prior (FNP) for independent latent coordinates, and a Gaussian mixture prior (GMP) for clustered latent structure.
- Evaluates the same GW objective under disentanglement and clustering meta-priors, together with image generation, reconstruction, metric-estimation, isometry, and loss-ablation studies.

## Method

The model retains the encoder-decoder organization used in [[concepts/amortized-variational-inference|Amortized Variational Inference]]. Its generative and inference joint distributions are

$$
p_\theta(x,z)=\pi_\theta(z)p_\theta(x\mid z),
\qquad
q_\phi(x,z)=p_{\mathrm{data}}(x)q_\phi(z\mid x).
$$

The decoder is deterministic and the encoder is a diagonal Gaussian. Instead of maximizing a likelihood bound, GWAE minimizes the GW discrepancy between $(\mathcal X,d_\mathcal X,p_{\mathrm{data}})$ and $(\mathcal Z,d_\mathcal Z,\pi_\theta)$. A sampled generative coupling estimates pairwise distance distortion:

$$
\mathcal L_{GW}
=\mathbb E\left[
\left|d_\mathcal X(x,x')-C d_\mathcal Z(z,z')\right|^\rho
\right],
$$

where $C$ is learned and the experiments use $\rho=1$ to reduce sensitivity to outliers. Three terms make the sampled coupling useful for autoencoding and generation:

- $\mathcal L_W$ is a Wasserstein-autoencoder-style reconstruction loss that enforces the data-marginal condition through the encoder.
- $\mathcal L_D$ is a Kantorovich-Rubinstein critic objective that matches $p_\theta(x,z)$ and $q_\phi(x,z)$ in their joint space. Spectral normalization and a gradient penalty constrain the critic.
- $\mathcal R_\mathcal H=\mathcal H_q(z\mid x)$ discourages a deterministic lookup-table encoder and the resulting holes in latent space.

The combined objective is

$$
\min_{\theta,\phi}\max_\psi
\mathcal L_{GW}+\lambda_W\mathcal L_W
+\lambda_D\mathcal L_D-\lambda_\mathcal H\mathcal R_\mathcal H.
$$

The prior requires only a differentiable sampler. NP transforms Gaussian noise with an unrestricted neural network; FNP uses independent one-dimensional transformations to impose factorization; GMP learns component weights, means, and full positive-semidefinite covariance factors. The main GW objective remains unchanged across these choices.

## Experiments

The study uses MNIST, CelebA, 3D Shapes, Omniglot, and, in supplementary reconstruction experiments, CIFAR-10. All primary comparisons use shared convolutional encoder-decoder architectures and a latent dimension selected for each setting.

**GW estimation and geometry.** On MNIST, the minibatch loss tracks the empirical GW value computed with POT, although it is slightly higher. Generated sample pairs concentrate near the diagonal in the data-distance versus latent-distance plot, providing empirical evidence of an approximately isometric embedding. Comparisons in the appendix show a tighter isometry pattern for GWAE than for VAE, FactorVAE, 2-Stage VAE, and WAE under the reported settings.

**Disentanglement.** On 3D Shapes with latent dimension 16, GWAE-FNP obtains DCI completeness 0.9080 and informativeness 0.9966, the highest values in the table. Its DCI disentanglement score is 0.7024, below WAE at 0.7544 and several other baselines. Prior choice is consequential: under otherwise matched settings, NP, FNP, and GMP obtain completeness scores of 0.3966, 0.9080, and 0.4247, respectively.

**Cluster structure.** Models are trained on MNIST and evaluated for separating MNIST from Omniglot. GWAE-GMP reports ROC AUC 1.0000 using the learned critic potential as the anomaly score, compared with 0.9957 for VAE and 0.9654 for DAGMM. The latent visualization shows more clearly separated mixture components for GWAE-GMP in this experiment.

**Generation and reconstruction.** On CelebA with latent dimension 64, GWAE-NP reports FID 45.3 and PSNR 22.82 dB. This PSNR is the best value in the table; the FID is better than the reproduced VAE, WAE, AVB, and several other baselines, while cited original-paper values for 2-Stage VAE and some other methods are lower. Supplementary MNIST results report FID 14.4 and PSNR 26.11 dB for GWAE, while CIFAR-10 reports FID 59.9 and PSNR 17.64 dB, indicating a generation-reconstruction tradeoff on the more complex dataset.

**Ablations.** Removing $\mathcal L_W$ increases CelebA FID from 45.3 to 233.7 and reduces PSNR from 22.82 to 9.80 dB. Removing $\mathcal L_D$ raises FID to 403.8; replacing joint matching with a latent-only MMD loss gives FID 158.4. Removing the entropy regularizer raises FID to 179.6, and setting $\rho=\xi$ instead of $\rho=1$ gives FID 123.5 and PSNR 16.03 dB. The paper provides code at `https://github.com/ganmodokix/gwae`.

## Limitations

- The method has a composite objective with three regularization weights and alternating critic updates. The experiments tune these weights on validation performance, so the unchanged GW term does not remove task-specific model selection.
- Prior-family choice is itself a strong inductive bias. FNP substantially improves completeness on 3D Shapes but produces a less stable and more biased GW estimate on MNIST, where digit identity is categorical rather than naturally factorized.
- Computing pairwise distances makes each minibatch quadratic in batch size; the paper states an $O(NB)$ per-epoch cost for $N$ observations and batch size $B$.
- The main evidence comes from image datasets with Euclidean data and latent metrics. The paper does not test the proposed spherical or non-Euclidean extensions.
- The joint critic estimates rather than exactly enforces the coupling constraints, and the paper does not provide a convergence or identifiability guarantee for the full nonconvex adversarial objective.
- Some generation baselines in the CelebA table are values cited from their original papers rather than uniformly rerun measurements, limiting direct ranking by FID.
- The supplied Markdown does not identify a publication year, DOI, arXiv identifier, or venue, so these metadata are left unset.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares intrinsic pairwise geometry across distributions on different spaces.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the coupling formulation, Wasserstein reconstruction condition, and critic duality used by GWAE.
- [[concepts/disentangled-representations|Disentangled Representations]]: the factorized-prior application and the target of the DCI evaluation.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: provides the encoder-decoder inference architecture whose ELBO objective GWAE replaces.

## Related Papers

- Kingma and Welling (2014), "Auto-Encoding Variational Bayes": establishes the variational autoencoder and reparameterized encoder-decoder baseline.
- Tolstikhin et al. (2018), "Wasserstein Auto-Encoders": derives an autoencoder objective from optimal transport in the data space and supplies GWAE's reconstruction constraint.
- Higgins et al. (2017), "beta-VAE: Learning Basic Visual Concepts with a Constrained Variational Framework": introduces the KL-reweighting disentanglement baseline discussed by the paper.
- Kim and Mnih (2018), "Disentangling by Factorising": introduces FactorVAE and its adversarial total-correlation penalty.
- Xu et al. (2020), "Learning Autoencoders with Relational Regularization": applies fused GW as a latent-space regularizer, in contrast to GWAE's direct data-to-latent GW objective.
- Dumoulin et al. (2017), "Adversarially Learned Inference": matches generative and inference joint distributions adversarially without GW distance preservation.
