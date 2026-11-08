---
title: "Nonlinear polarization modeling via dual-threshold diffusion–evolution dynamics"
type: paper
authors:
  - Jianing Chen
  - Peng Bao
year: null
tags:
  - opinion-dynamics
  - polarization
  - diffusion-models
  - evolutionary-algorithms
  - complex-networks
---

## TL;DR

This paper models continuous [[concepts/opinion-dynamics|opinion dynamics]] by combining diffusion-style perturbation and denoising with fitness-weighted evolutionary selection. Perceived consensus and prejudice jointly steer opinions on four synthetic network topologies. In the reported simulations, stronger perceived consensus consistently increases bimodality, while prejudice has a topology-dependent nonlinear effect: it reinforces polarization in stochastic-block and Erdos-Renyi networks, but sufficiently high prejudice reduces measured polarization in preferential-attachment and Barabasi-Albert networks. These are synthetic model results, not empirically calibrated estimates of social-media behavior.

## Research Question

How do perceived consensus, prejudice-based selective exposure, and network topology interact to produce polarization or depolarization in a generative model of continuous opinion evolution?

## Motivation

Classical models often isolate one updating mechanism, such as averaging, stubbornness, or a bounded-confidence threshold. The authors seek a model that can represent both population-level distributional change and individual exposure to confirming or dissonant information. They use a diffusion process to generate and perturb candidate opinions, then interpret fitness-weighted denoising and selection as social reinforcement and prejudice filtering.

## Contributions

- Introduces a two-stage opinion-evolution framework that combines a diffusion model with evolutionary selection and mutation-like perturbations.
- Defines perceived consensus through a bimodal fitness landscape and prejudice through time-varying, opinion-similarity-based interaction weights.
- Studies the joint effects of these controls on the bimodality and assortative mixing of opinions across four synthetic network families.
- Reports a topology-dependent reversal: extreme prejudice continues to polarize SBM and ER networks but can lower bimodality in hub-dominated PA and BA networks.

## Method

The state is a continuous opinion vector for every node of a graph. A forward diffusion step corrupts initial opinions with Gaussian noise under a standard cumulative noise schedule. A three-layer graph convolutional network is trained to predict that noise. Reverse DDIM-style updates estimate less noisy opinion states, augmented by two socially interpreted terms.

First, a perceived-consensus parameter $\beta$ scales a symmetric, two-mode Gaussian-mixture fitness landscape centered at $(1,1)$ and $(-1,-1)$. Candidate opinions with greater fitness receive more weight in the estimate of the clean state. Second, a prejudice parameter $c$ affects selective interaction weights based on neighboring opinion similarity. The final reverse update also includes random perturbation, which the paper interprets as external information or a challenge to prevailing group prejudice.

The reverse procedure runs for $T$ steps and has stated dense-graph time complexity $O(Tn^2d)$ for $n$ nodes and $d$ opinion dimensions; the paper also gives a sparse-graph expression in terms of average degree. Polarization is operationalized with the bimodality coefficient (BC), using $5/9$ as the uniform-distribution reference value, while Newman's assortativity coefficient measures like-with-like mixing.

## Experiments

Experiments use 1,000-node stochastic block model (SBM), Erdos-Renyi (ER), preferential attachment (PA), and Barabasi-Albert (BA) networks. Opinions are initialized from a symmetric bimodal Gaussian mixture. The noise predictor has three GCN layers of width 128 with ReLU activations and is trained for 80 diffusion steps with batch size 64, Adam learning rate $10^{-3}$, weight decay $10^{-4}$, and gradient clipping at 1.0 on one NVIDIA RTX 4090D.

With prejudice fixed at $c=1$, the reported distributions remain broadly dispersed below $\beta=2$ and split into clearer clusters above that level. At $\beta=2$, increasing prejudice has different effects across topologies. SBM and ER generally become more polarized, whereas PA and BA show reduced BC at high prejudice. The authors attribute the latter pattern to disrupted hub-to-hub bridges, but also caution in their interpretation that this apparent depolarization may mask latent disagreement.

The assortativity tables show final coefficients well above their near-zero initial values. At $c=1$, final assortativity rises with $\beta$ and reaches 0.99 for SBM and ER at $\beta=5$, compared with 0.95 for PA and 0.97 for BA. At $\beta=2$ and $c=5$, the reported final values are 0.99 for SBM and ER, 0.70 for PA, and 0.76 for BA. Additional sweeps vary both thresholds, network size, and topology-generation parameters; individual trajectories at $\beta=2,c=1$ display bipolar separation on all four networks.

## Limitations

The study uses synthetic networks and simulated opinions; it does not calibrate $\beta$, $c$, or the generated trajectories against observed social-media data. Empirical calibration, time-varying and multilayer networks, heterogeneous individuals, and comparisons with large-scale social-network data are left to future work.

The reported evaluation does not compare predictive or explanatory performance with classical opinion-dynamics baselines, and the supplied text does not report repeated-run uncertainty, sensitivity to random seeds, or statistical tests for the threshold and reversal claims. BC measures distributional bimodality rather than ideological distance, affective hostility, or another validated substantive construct of political polarization.

Some social interpretations go beyond what the simulation identifies. In particular, the proposed hub-bridge explanation for depolarization is an interpretation of topology-dependent trajectories, not a separately tested causal mechanism. The parsed source also leaves parts of the prejudice-weight derivation and the distinction between the trained noise predictor and the fitness-weighted estimator difficult to reconstruct, so implementation-level reproducibility depends on the authors' linked code.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]
- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/bounded-confidence-models|Bounded Confidence Models]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/co-adaptive-political-polarization|Co-Adaptive Political Polarization]]

## Related Papers

- [[papers/consensus-polarization-and-nonlinear-response-in-a-two-layer-voter-model-with-intra-agent-cross-layer-reconciliation|Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]
- [[papers/an-agent-based-model-of-opinion-polarization-driven-by-emotions|An Agent-Based Model of Opinion Polarization Driven by Emotions]]
- [[papers/behavior-of-nonlinear-opinion-dynamics-over-large-networks|Behavior of Nonlinear Opinion Dynamics over Large Networks]]
- Baumann et al. (2020), "Modeling echo chambers and polarization dynamics in social networks."
- Holme and Newman (2006), "Nonequilibrium phase transition in the coevolution of networks and opinions."
- Zhang et al. (2024), "Diffusion models are evolutionary algorithms."

[[index|Library home]]
