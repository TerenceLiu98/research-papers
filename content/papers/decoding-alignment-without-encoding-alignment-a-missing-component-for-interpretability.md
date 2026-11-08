---
title: "Decoding Alignment without Encoding Alignment: A Missing Component for Interpretability"
type: paper
authors:
  - Johannes Bertram
  - Luciano Dyballa
  - T. Anderson Keller
  - Savik Kinger
  - Steven W. Zucker
year: null
source_job_id: "87624c5e-4a85-4504-9554-eaa57c3e1490"
tags:
  - representational-similarity
  - neural-manifolds
  - mechanistic-interpretability
  - neuroai
  - optimal-transport
---

## TL;DR

Standard representation-alignment metrics can report nearly identical decoding geometry while neural populations have different internal functional organization. In a controlled MNIST intervention, RSA, CKA, and Procrustes $R^2$ remain statistically unchanged at the main comparison point even though encoding topology, attribution patterns, connectivity assortativity, and blur robustness differ. Biological recordings and multiple model families show the same blind spot. The paper therefore argues that decoding comparisons should be paired with [[concepts/encoding-manifolds|Encoding Manifolds]] and [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] to distinguish behavioral alignment from functional alignment.

## Research Question

Do high scores from decoding-based representation comparisons establish that two neural systems share the same internal functional organization, or can similar population-level geometry arise from different neuron-level structures and computational pathways?

## Motivation

RSA, CKA, Procrustes alignment, and decoding accuracy are widely used to compare brain regions, organisms, and learned models. These metrics summarize how stimuli are arranged in population-response space, but mechanistic claims concern how individual units and subpopulations are organized to produce those responses. If a small or functionally unrepresentative subset can reproduce the full population's decoding geometry, a high alignment score may establish readout similarity without establishing circuit or functional equivalence. This is a concrete instance of [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]].

## Contributions

- Distinguishes the decoding manifold, which embeds stimuli in neural coordinates, from the encoding manifold, which embeds neurons in stimulus-response coordinates and exposes population topology.
- Provides a controlled causal dissociation by training MNIST classifiers with an auxiliary supervised-contrastive loss that clusters neurons by preferred digit while approximately preserving task accuracy.
- Shows across retina, mouse V1, five Allen visual areas, and several machine-learning models that small or topologically restricted subpopulations can retain near-ceiling decoding alignment.
- Uses farthest-point sampling to construct size-matched continuous and locally clustered subpopulations, demonstrating that correlation-based decoding metrics are often insensitive to their different encoding topology.
- Proposes normalized Gromov-Wasserstein similarity as a complementary measure of how well a subpopulation covers the full encoding manifold.

## Method

The study represents neural responses as a neuron-by-stimulus-by-direction-by-time tensor. Time-averaged stimulus responses define a decoding manifold and support k-NN accuracy, RSA, CKA, and Procrustes $R^2$; time-resolved responses support RSA, speed-profile correlation, trajectory Procrustes, and dynamical similarity analysis.

To construct an encoding manifold, the authors factor the response tensor with nonnegative tensor factorization, place neurons in the resulting stimulus-response factor space, build an adaptive neighborhood graph with IAN, and apply diffusion maps followed by multidimensional scaling for visualization. Gromov-Wasserstein distance compares the intrinsic pairwise-distance structure of a subpopulation manifold with the full population, normalized against a collapsed-centroid baseline.

The causal experiment trains a two-convolution-layer MNIST classifier whose 800 flattened hidden units are treated as the neural population. A supervised contrastive auxiliary loss pulls neurons with the same preferred digit toward common response profiles. Twenty seeds are evaluated for the baseline and the main clustered condition. Separate population-size and farthest-point-sampling experiments select either widely distributed neurons or local neighborhoods while holding subpopulation size approximately fixed.

## Experiments

At the main MNIST comparison ($\lambda=10$ versus baseline), task accuracy remains about 98.5%. RSA is 0.958 versus 0.961, CKA is 0.976 in both conditions, and Procrustes $R^2$ is 0.950 versus 0.941; none of these differences is significant. In contrast, normalized GW similarity falls from 0.958 to 0.502 ($p<0.001$). The clustered model also has lower FC attribution entropy (5.756 versus 5.919), lower FC attribution overlap (0.407 versus 0.463), higher Conv2 weight-graph assortativity (0.501 versus 0.277), and lower mean accuracy under strong blur (0.282 versus 0.318).

Population-size sweeps show that static decoding metrics can approach ceiling with 5% or fewer neurons under favorable selection strategies, with RSA and CKA remaining high even for random samples. Farthest-point sampling then compares roughly 100 neurons spread across the encoding manifold with roughly 100 neurons concentrated into ten local clusters. Across retina, V1, ten Allen cortical datasets, FNN, Flyvision, R(2+1)D, ViT, and Raptor, correlation-based metrics are generally similar across these opposing topologies. k-NN accuracy is a notable exception and can fall sharply, such as from 0.80 to 0.20 for VISp drifting gratings. GW similarity consistently distinguishes broader from clustered manifold coverage in the reported main settings.

## Limitations

- The causal intervention uses a shallow MNIST network and one clustering objective; whether the dissociation generalizes to deeper architectures and other objectives is unresolved.
- The regularizer changes tuning sharpness and connectivity together, so the experiment does not isolate topology from every direct effect of the auxiliary loss.
- GW is evaluated primarily as an intrinsic manifold-coverage measure, not yet as a validated detector of ground-truth circuit equivalence in cross-system model-brain comparisons.
- The encoding-manifold pipeline depends on tensor factorization, adaptive graph construction, diffusion maps, and their modeling choices, despite the reported robustness checks.
- The ViT analysis requires a noncanonical definition of a neuron and time axis; the authors claim architecture-agnostic applicability, not a specific biological interpretation of transformer encoding topology.
- Encoding manifolds organize units by response profiles but do not themselves identify causal circuits.

## Related Concepts

- [[concepts/encoding-manifolds|Encoding Manifolds]]: describes neuron-level functional organization complementary to stimulus-level decoding geometry.
- [[concepts/representational-functional-dissociation|Representational-Functional Dissociation]]: high geometric agreement need not imply shared mechanisms or causal organization.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: compares intrinsic manifold geometry without requiring pointwise correspondence.
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]: motivates testing internal circuits rather than treating aggregate alignment as mechanistic evidence.
- [[concepts/brain-encoding-and-decoding|Brain Encoding and Decoding]]: situates the distinction between response prediction/readout and claims about neural organization.

## Related Papers

- Kriegeskorte, Mur, and Bandettini (2008), "Representational Similarity Analysis - Connecting the Branches of Systems Neuroscience": introduces RSA for comparing population-response geometry.
- Kornblith et al. (2019), "Similarity of Neural Network Representations Revisited": develops CKA, one of the principal alignment metrics examined here.
- Dyballa et al. (2024), "Population Encoding of Stimulus Features along the Visual Hierarchy": supplies the encoding-manifold construction and biological grounding used by this study.
- Harvey, Lipshutz, and Williams (2024), "What Representational Similarity Measures Imply about Decodable Information": characterizes the decoding-centric information captured by common similarity measures.
- [[papers/convergence-without-understanding-when-language-models-agree-on-representations-but-disagree-on-reasoning|Convergence Without Understanding: When Language Models Agree on Representations but Disagree on Reasoning]]: reports a related dissociation between language-model representation similarity and shared reasoning.

Source scope: supplied parsed manuscript. It provides a code repository but no explicit publication year or stable paper identifier.

[[index|Library home]]
