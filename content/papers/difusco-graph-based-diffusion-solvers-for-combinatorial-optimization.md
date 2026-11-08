---
title: "DIFUSCO: Graph-based Diffusion Solvers for Combinatorial Optimization"
type: paper
authors:
  - Zhiqing Sun
  - Yiming Yang
year: 2023
tags:
  - neural-combinatorial-optimization
  - discrete-diffusion
  - graph-neural-networks
  - traveling-salesman-problem
  - maximum-independent-set
---

## TL;DR

DIFUSCO represents a combinatorial solution as binary node or edge selections and learns a graph-conditioned diffusion process over those variables. Supervised denoising gives a non-autoregressive solver that can represent multiple high-quality solutions and refine all variables in parallel; on the reported TSP and maximum independent set benchmarks, discrete Bernoulli diffusion is consistently stronger than the continuous Gaussian variant.

## Research Question

Can a graph-based diffusion model produce high-quality solutions to NP-complete combinatorial optimization problems while avoiding the sequential decoding of autoregressive solvers, the one-shot independence assumptions of heatmap methods, and the training difficulties of reinforcement-learning improvement heuristics?

## Motivation

Autoregressive construction becomes expensive on large instances because it selects solution elements sequentially. One-shot non-autoregressive models scale better but can struggle with multimodal solution distributions, while learned local-improvement policies require long decision sequences and sparse-reward optimization. The paper treats iterative denoising as a middle ground: variables are updated in parallel, yet repeated refinement can couple their final values.

## Contributions

- Formulates graph combinatorial optimization as generation of a binary vector indicating selected nodes or edges, with feasibility enforced during task-specific decoding.
- Introduces DIFUSCO, a supervised graph diffusion solver using an anisotropic graph neural network to denoise corrupted solution variables.
- Compares continuous Gaussian diffusion on rescaled binary variables with discrete Bernoulli diffusion, finding the discrete formulation substantially better in the reported experiments.
- Adapts timestep-skipping inference to both formulations and combines generated TSP heatmaps with greedy decoding, sampling, 2-opt, or Monte Carlo tree search.
- Applies one modeling framework to two structurally different tasks: edge selection for traveling salesperson tours and node selection for independent sets.

## Method

For an instance $s$, the candidate solution is $x\in\{0,1\}^N$. In TSP, entries select edges; in maximum independent set, they select nodes. Training assumes an optimal or high-quality labeled solution and maximizes its conditional likelihood through denoising supervision.

The discrete model corrupts each binary variable with time-dependent categorical transition matrices and trains the network to predict the clean solution from a noisy one. The continuous alternative maps bits to $\{-1,1\}$, adds Gaussian noise, and predicts the injected noise. In both cases, the denoiser is a graph neural network conditioned on the problem instance and diffusion timestep.

At inference, DIFUSCO begins from noise and applies a shortened reverse schedule. Its output is a heatmap rather than a guaranteed feasible solution, so decoding is task-specific: TSP uses greedy edge selection followed by 2-opt or MCTS, while the independent-set decoder greedily adds nodes in descending predicted probability when they preserve independence.

## Experiments

The paper evaluates Euclidean TSP instances from 50 to 10,000 nodes, TSPLIB transfer, SATLIB-derived independent-set instances, and Erdős-Rényi graphs with 700--800 nodes. Results are averaged across five diffusion random seeds.

- On TSP-500, TSP-1000, and TSP-10000 with MCTS, the reported optimality gaps are 0.46%, 1.17%, and 2.58%, compared with 1.76%, 2.46%, and 3.19% for the previous neural baselines used by the paper.
- Using two or four independently generated heatmaps with MCTS further reduces the reported gaps to 0.09%/0.02% on TSP-500, 0.56%/0.46% on TSP-1000, and 2.55%/2.48% on TSP-10000.
- On TSPLIB instances with 50--200 nodes, the reported mean gap is 0.29%, versus 1.48% for the strongest listed learned baseline.
- On SATLIB, discrete DIFUSCO reports an average independent-set size of 425.13, above the learned baselines in the comparison and close to the traditional solvers reported by the paper.
- Ablations favor discrete over continuous diffusion. Without 2-opt, allocating computation to more denoising steps is more effective than drawing many shallow samples; for example, 20 steps with four samples outperforms one step with 1,024 samples while using substantially less runtime.

## Limitations

- Training is supervised and requires optimal or strong solver-produced solutions, so label generation can remain expensive.
- Diffusion output does not itself guarantee feasibility; performance depends on task-specific decoding and, for the strongest TSP results, post-processing such as 2-opt or MCTS.
- Multiple denoising steps provide parallel variable updates but still create iterative inference cost. The paper reports a quality/runtime tradeoff across steps, samples, and search seeds.
- Most TSP training data are synthetic Euclidean instances. TSPLIB transfer is encouraging but covers only 50--200-node real-world benchmark graphs.
- The experiments cover two NP-complete problem families and one graph-network backbone; the broader applicability of the binary-vector formulation is argued but not empirically established.

## Related Concepts

- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- [[papers/a-diffusion-model-framework-for-unsupervised-neural-combinatorial-optimization|A Diffusion Model Framework for Unsupervised Neural Combinatorial Optimization]]
- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]]
- Sun and Yang contrast DIFUSCO with Graikos et al. (2022), "Diffusion Models as Plug-and-Play Priors," which represents TSP instances as raster images rather than explicit graph variables.

[[index|Library home]]
