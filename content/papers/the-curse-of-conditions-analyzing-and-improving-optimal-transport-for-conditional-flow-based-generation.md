---
title: "The Curse of Conditions: Analyzing and Improving Optimal Transport for Conditional Flow-Based Generation"
type: paper
authors:
  - Ho Kei Cheng
  - Alexander Schwing
year: null
code: https://hkchengrex.github.io/C2OT
tags:
  - flow-matching
  - optimal-transport
  - conditional-generation
  - generative-models
  - efficient-sampling
---

## TL;DR

Minibatch optimal-transport coupling can straighten unconditional flow-matching paths, but applying it without regard to a generation condition correlates the source noise with that condition during training. Test-time sampling instead uses condition-independent noise, creating a train-test mismatch. Conditional optimal transport (C^2OT) penalizes assignments between dissimilar conditions, preserving much of OT's path straightening while restoring the source-condition independence needed at inference. It improves the reported balance between few-step generation, many-step quality, and condition adherence on synthetic data, CIFAR-10, and two ImageNet settings, although its advantage becomes smaller in high-dimensional image data.

## Research Question

Why does minibatch [[concepts/optimal-transport|Optimal Transport]] help unconditional [[concepts/flow-matching|Flow Matching]] but often hurt conditional generation, and can the coupling be made condition-aware without losing the shorter, straighter paths that make low-step inference attractive?

## Motivation

Flow-matching models generate samples by numerically integrating a learned velocity field. Curved trajectories require more solver steps and network evaluations. Minibatch OT replaces independent source-target pairing with a minimum-cost assignment and can straighten unconditional paths, but a conditional model must also work for every combination of source noise and user-supplied condition. The paper shows that ordinary OT does not preserve this requirement: the assignment can make the training source distribution depend on the condition even though inference draws source noise independently.

## Contributions

- Identifies a conditional train-test gap in ordinary minibatch OT: the coupled training law generally has $q(x_0\mid c)\neq q(x_0)$, while inference samples from $q(x_0)$ for any condition.
- Introduces conditional optimal transport (C^2OT), which adds a condition-dependent term to the minibatch assignment cost and explicitly targets independence between source noise and the condition.
- Gives an exact construction for discrete labels and a cosine-distance relaxation for continuous embeddings.
- Adapts the continuous-condition weight to a target candidate ratio, reducing sensitivity to the scale of source-target distances.
- Separates the OT batch size from the neural-network batch size and oversamples OT batches to compensate for the smaller effective pool induced by condition-aware matching.
- Evaluates discrete and continuous conditions across a two-dimensional benchmark, CIFAR-10, caption-conditioned ImageNet-32, and caption-conditioned latent ImageNet-256.

## Method

Standard conditional flow matching trains a field $v_{\theta,c}$ on linear interpolants $x_t=tx_1+(1-t)x_0$ with target velocity $x_1-x_0$. Independent coupling samples from $q(x_0)q(x_1,c)$. Ordinary minibatch OT instead chooses a permutation $P$ minimizing

$$
\|X_0-PX_1\|_2^2.
$$

In unconditional generation this changes the coupling while preserving the source and target marginals. In conditional generation, pairing $(X_0,PX_1,PC)$ can correlate $X_0$ and $C$. Conditioning the resulting joint law on $c$ then gives the source marginal $q(x_0\mid c)$, which is not generally the full prior used at inference.

C^2OT targets the joint law

$$
\pi_{\mathrm{c^2ot}}(x_0,x_1,c)
=q(x_0)q(c)\pi_{\mathrm{ot}}(x_1\mid x_0,c)
$$

by solving the condition-aware assignment

$$
\min_P \|X_0-PX_1\|_2^2+\sum_i f(C_i,[PC]_i).
$$

For discrete labels, $f(c_i,c_j)$ is zero when the labels match and infinite otherwise. OT is therefore performed within each label group while each group retains samples from the full source prior. This is not the identity assignment: examples with the same label can still be permuted to shorten paths.

For continuous condition embeddings, the method uses

$$
f(c_i,c_j)=w\left(1-\frac{c_i\cdot c_j}{\|c_i\|\|c_j\|}\right).
$$

The paper selects $w$ per minibatch so that a defined fraction of candidate assignments remains competitive with each sample's original pairing. Exponential search followed by binary search finds a weight matching a target ratio $r_{\mathrm{tar}}$; the previous minibatch's value initializes the next search. The experiments generally use $r_{\mathrm{tar}}=0.01$.

Condition constraints reduce the effective OT batch size. C^2OT consequently computes assignments on batches larger than the network update batch and reuses subsets across updates. Although Hungarian matching is cubic in the OT batch size, reuse makes the stated amortized cost $O(b^2b_n)$, and CPU data workers overlap matching with GPU training.

## Experiments

**8 Gaussians to moons.** Results average ten runs and measure squared 2-Wasserstein distance. With binary conditions, FM, OT, and C^2OT obtain adaptive-solver distances of $0.059\pm0.029$, $0.462\pm0.025$, and $0.018\pm0.006$; with one Euler step they obtain $2.573\pm0.112$, $0.483\pm0.059$, and $0.048\pm0.010$. With continuous conditions, their adaptive distances are $0.028\pm0.010$, $2.143\pm1.993$, and $0.013\pm0.003$. Thus ordinary OT produces short paths but can terminate at the wrong conditional distribution, while C^2OT improves both tested integration regimes.

**CIFAR-10 class conditioning.** Across five runs, C^2OT records FID 17.565 at Euler-5 and 2.904 with the adaptive solver, compared with 21.968 and 2.922 for FM and 18.194 and 4.144 for OT. At Euler-2, OT and C^2OT have similar FID (64.417 and 64.694), but C^2OT has lower class cross-entropy (2.264 versus 2.529). In the adaptive setting, C^2OT and FM have similar cross-entropy (0.279 and 0.276), while OT is worse at 0.372.

**ImageNet-32 caption conditioning.** Across three runs, adaptive FID is 5.358 for FM, 6.220 for OT, and 5.350 for C^2OT. At Euler-2, OT has the best FID (81.317 versus 102.380 for C^2OT and 113.250 for FM), but this few-step advantage does not persist with more integration. Adaptive CLIP similarity is 0.069 for FM and C^2OT and 0.067 for OT.

**ImageNet-256 latent generation.** Across five runs under the LightningDiT 64-epoch configuration, adaptive FID is 3.498 for FM, 5.726 for OT, and 3.369 for C^2OT. Adaptive CLIP similarity is 0.140, 0.125, and 0.139, respectively. C^2OT also improves Euler-5 FID over FM (30.715 versus 31.266), whereas ordinary OT reaches 42.780.

**Ablations.** Larger OT batches improve very-low-step FID but slightly worsen adaptive-solver FID. Moving the continuous-condition target ratio toward ordinary OT shows the same trade-off. The paper reports no wall-clock training overhead for OT batches up to 6,400 with eight CPU data workers per GPU. A path-straightness study finds that C^2OT is straighter than FM on all three image settings, while ordinary OT is straighter still but has worse endpoint FID.

## Limitations

- The gains are substantially larger on the low-dimensional benchmark than on high-dimensional images. The authors hypothesize that noisy high-dimensional minibatch assignments induce less source-condition skew, but this explanation is not isolated experimentally.
- Continuous-condition C^2OT only approximates the ideal condition-specific construction. Its cosine penalty, adaptive weight search, and target ratio introduce design choices, and the paper notes that $r_{\mathrm{tar}}=0.01$ is not optimal for every dataset.
- Condition-aware matching reduces the effective OT pool and motivates substantially larger assignment batches. Hungarian matching remains cubic before amortization, even though the reported implementation hides its wall-clock cost in the tested configurations.
- Few-step FID and many-step or adaptive quality can move in opposite directions. Increasing OT fidelity can improve the former while harming the latter, so no single coupling setting dominates every inference budget.
- The image experiments cover class and caption conditions on three dataset-resolution settings. They do not establish the same behavior for every continuous condition, modality, or flow architecture.
- The study deliberately evaluates base flow matching rather than combinations with consistency models, reflow, or other path-straightening techniques.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier; those metadata are left unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: the velocity-regression framework whose source-target coupling is modified.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the minibatch assignment that shortens paths but must account for conditions here.
- [[concepts/wasserstein-flow-matching|Wasserstein Flow Matching]]: also combines transport geometry with flow matching, but treats each generated state as a probability measure rather than correcting conditional source-target assignments.

## Related Papers

- Tong et al. (2024), "Improving and Generalizing Flow-Based Generative Models with Minibatch Optimal Transport": introduces the minibatch OT coupling whose conditional extension is analyzed here.
- Pooladian et al. (2023), "Multisample Flow Matching: Straightening Flows with Minibatch Couplings": concurrently develops minibatch coupling for straighter unconditional flows.
- [[papers/alignment-matters-inside-and-out-in-equivariant-graph-flow-matching|Alignment Matters Inside and Out in Equivariant Graph Flow Matching]]: studies a different reason why flow-matching couplings must respect problem structure, separating graph-representative alignment from minibatch assignment.
- [[papers/flow-matching-with-gaussian-process-priors-for-probabilistic-time-series-forecasting|Flow Matching with Gaussian Process Priors for Probabilistic Time Series Forecasting]]: changes the source distribution and uses a history-conditioned coupling rather than unconditional minibatch OT.
- [[papers/wasserstein-flow-matching-generative-modeling-over-families-of-distributions|Wasserstein Flow Matching: Generative Modeling Over Families of Distributions]]: uses inner optimal maps to construct paths between distribution-valued observations.

Source: supplied parsed manuscript, Cognitio job `73ac368e-5fd4-41a7-a68c-8d4a2b2ea97a`. Publication year, venue, and stable paper identifier are not stated in the supplied text.

[[index|Library home]]
