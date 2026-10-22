---
title: "GeoPT: Scaling Physics Simulation via Lifted Geometric Pre-Training"
type: paper
authors:
  - Haixu Wu
  - Minghao Guo
  - Zongyi Li
  - Zhiyang Dou
  - Mingsheng Long
  - Kaiming He
  - Wojciech Matusik
year: null
tags:
  - neural-simulation
  - geometric-pre-training
  - self-supervised-learning
  - neural-operators
  - scientific-machine-learning
---

## TL;DR

GeoPT pre-trains neural simulators on inexpensive 3D geometry without requiring solver-generated physics labels. Its key step is to attach randomly sampled velocity fields to points around each geometry and predict how vector-distance features evolve as those points move and stop at boundaries. This dynamics-lifted objective gives the simulator backbone experience with geometry-dynamics coupling that static geometry reconstruction lacks. Across five industrial-fidelity fluid and solid mechanics benchmarks, the paper reports 20-60% lower labeled-data requirements and convergence up to twice as fast, while geometry-only pre-training can cause negative transfer.

## Research Question

Can a neural simulator acquire a transferable physics prior from abundant off-the-shelf geometries alone, even though downstream physical fields depend jointly on geometry and dynamics? More specifically, can a self-supervised objective introduce dynamics without running a numerical solver and provide a common conditioning interface for different simulation domains?

## Motivation

Industrial neural simulators can make evaluation much cheaper once trained, but their labels come from costly numerical solves. The paper cites DrivAerML as an extreme example, where generating one industrial-fidelity aerodynamic sample can require $6.1 \times 10^4$ CPU-hours. Public 3D geometry is plentiful by comparison, but conventional geometric pre-training predicts static features such as signed or vector distance. Such objectives omit the driving conditions that determine a physical solution and may teach correlations that conflict with flow or force propagation. On DrivAerML, the paper finds that geometry-only pre-training performs substantially worse than training Transolver from scratch.

## Contributions

- Introduces [[Dynamics-Lifted Geometric Pre-Training]], which augments unlabeled geometries with synthetic pointwise velocity fields and derives trajectory supervision without physics simulation.
- Uses one geometry-plus-velocity interface in both stages: random velocities define the pre-training task, while task-specific flow, impact, or propagation conditions replace them during fine-tuning.
- Constructs 1,346,300 pre-training samples from 13,463 ShapeNet car, airplane, and watercraft geometries, with 100 sampled dynamics fields available per geometry.
- Interprets the synthetic particle process as collisionless phase-space transport with a sticking boundary and conserved total mass, while explicitly stopping short of claiming that this simplified process represents all downstream physics.
- Evaluates transfer on car and aircraft aerodynamics, ship hydrodynamics, crash mechanics, transient prediction, radiosity, and multiple neural-simulator backbones.

## Method

For a geometry $G$, GeoPT samples query points both in the surrounding volume and on the surface, then assigns each point a velocity $\mathbf{v}$ sampled uniformly from a bounded ball. A point follows free flight until it reaches the geometry boundary, where it remains. At each of three discretized time points, the supervision target is the vector from the moving point to the geometry surface. The model receives the initial coordinates, geometry, and velocity field and predicts the full vector-distance trajectory.

This differs from native geometric pre-training in two linked ways. The input is lifted from geometry alone to a joint geometry-dynamics space, and the target changes from one static feature to a trajectory. Static pre-training is recovered as the zero-dynamics or initial-time slice. The paper argues that learning the whole family of velocity-conditioned trajectories preserves distinctions that averaging over dynamics would discard.

The default backbone is Transolver. GeoPT uses 32,768 volume points and 4,096 surface points per geometry-dynamics sample, a maximum normalized velocity of 2, and two motion steps after the initial state. It pre-trains base, large, and huge variants with 8, 16, and 32 layers. During fine-tuning, random velocity fields are replaced by conditions derived from the task: incoming-flow direction and speed for aerodynamics, phase-specific velocities for hydrodynamics, and an impact-aligned spatially decaying field for crash simulation. The output head is then optimized against solver-generated physical quantities.

## Experiments

The main evaluation uses roughly 100 labeled training cases per task on DrivAerML, NASA-CRM, AirCraft, DTCHull, and Car-Crash. Outputs include pressure and velocity fields, aerodynamic coefficients, and maximum von Mises stress. Against Transolver trained from scratch, GeoPT improves full-data, 200-epoch relative $L_2$ error from 0.093 to 0.075 on DrivAerML, 0.100 to 0.088 on NASA-CRM, 0.110 to 0.090 on AirCraft, 0.181 to 0.146 on DTCHull, and 0.198 to 0.177 on Car-Crash. Five-run standard deviations are reported for the main data-efficiency comparisons, and the claimed training-data savings are tested with 95% confidence intervals using a 0.001 equivalence margin.

The data-efficiency curves show GeoPT matching the scratch model's full-data performance with 20-60% fewer labeled cases, depending on the benchmark. The largest reported reduction occurs on DTCHull, whose hull geometries vary substantially. Scaling Transolver from 8 to 32 layers without pre-training yields inconsistent gains under limited labeled data; the same scaling with GeoPT improves all five tasks. Reducing pre-training diversity shows that unique geometry count matters more consistently than the number of velocity fields, although dynamics diversity is especially useful when downstream conditions vary in speed and direction.

Ablations support the central design choice. Static SDF or vector-distance pre-training does not provide the same transfer and can degrade performance. A nonzero trajectory horizon produces a large improvement over the static case, with two motion steps giving the best overall cost-performance balance. Mixed geometry categories generally outperform category-specific pre-training, though airplane-only data is slightly better for the out-of-domain AirCraft benchmark. ShapeNet V1 also outperforms the smaller, cleaner V2 subset on most tasks, which the authors attribute to greater diversity.

Additional tests extend GeoPT to transient DTCHull prediction, Galerkin Transformer and GNOT backbones, and radiosity in a Cornell-box scene with an unseen bunny geometry. On radiosity, mean absolute error changes from $9.7 \times 10^{-2}$ from scratch to $9.0 \times 10^{-2}$ with GeoPT. Enlarging pre-training from selected ShapeNet categories to full ShapeNet and then to roughly 300,000 ShapeNet plus generated Hunyuan3D geometries further improves the huge model, particularly on AirCraft.

## Limitations

The velocity field is a deliberately compressed interface, not a complete representation of arbitrary simulation settings. Material elasticity and strength in crash mechanics, for example, are compressed into one per-element speed value and may lose distinctions. The mapping from real-world speed and scale to normalized pre-training velocity also requires calibration; the paper offers broad low- and high-speed ranges rather than a dimensionally exact rule.

Most headline experiments concern complex 3D boundaries and approximately 100 labeled cases. The paper does not establish that the same prior transfers to regular-grid turbulence or every PDE family, and the radiosity experiment provides encouraging but limited evidence beyond fluid and solid mechanics. Its transport-equation interpretation establishes conservation for the synthetic pretext dynamics, not correctness for Navier-Stokes, constitutive failure, or light transport. AirCraft training remains unstable because of a severe train-test geometry gap, and some benefits depend on alignment between the configured velocity direction and the downstream dynamics.

## Related Concepts

- [[Dynamics-Lifted Geometric Pre-Training]]
- [[Neural Operators]]
- Self-supervised learning
- Physics foundation models
- Transport equations
- Scientific machine learning

## Related Papers

- Wu, Luo, Wang, Wang, and Long (2024), "Transolver: A fast transformer solver for PDEs on general geometries."
- Zhang, Wu, Zhang, and Wang (2026), "From cheap geometry to expensive physics: A physics-agnostic pretraining framework for neural operators."
- Herde et al. (2024), "Poseidon: Efficient foundation models for PDEs."
- Hao et al. (2024), "DPOT: Auto-regressive denoising operator transformer for large-scale PDE pre-training."
- Holzschuh, Kohl, Redinger, and Thuerey (2026), "P3D: Highly scalable 3D neural surrogates for physics simulations with global context."

[[index|Library home]]
