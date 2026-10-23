---
title: "A Diffusion Model Framework for Unsupervised Neural Combinatorial Optimization"
type: paper
authors:
  - Sebastian Sanokowski
  - Sepp Hochreiter
  - Sebastian Lehner
year: 2024
tags:
  - neural-combinatorial-optimization
  - discrete-diffusion-models
  - unsupervised-learning
  - variational-inference
  - graph-neural-networks
---

## TL;DR

DiffUCO trains a [[concepts/discrete-diffusion-models|Discrete Diffusion Model]] to solve graph combinatorial optimization problems without labeled solutions. Its joint variational upper bound replaces the intractable marginal reverse-KL objective with a tractable divergence over complete diffusion paths. Across five problem classes, the reported experiments place DiffUCO ahead of the evaluated unsupervised neural baselines, while showing that more diffusion steps and variational annealing improve solution quality at additional computational cost.

## Research Question

Can an approximate-likelihood latent-variable model, particularly a diffusion model, learn discrete target distributions for data-free [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]] when exact marginal sample likelihoods are unavailable?

## Motivation

Many neural probabilistic optimization methods minimize reverse KL divergence to a Boltzmann target, which requires evaluating the model's exact sample likelihood. Mean-field models provide tractability but cannot represent dependencies among solution variables, while autoregressive models are expressive but generate variables sequentially and can be expensive on large graphs. Diffusion models offer parallel, iterative refinement and discrete latent variables, but their marginal sample likelihood is generally intractable.

## Contributions

- Introduces a joint variational upper bound on reverse KL divergence for data-free training of approximate-likelihood latent-variable models.
- Instantiates the bound as DiffUCO, a graph-conditioned discrete diffusion model for unsupervised combinatorial optimization.
- Proposes an energy-dependent annealed noise distribution whose coupling term remains active as the optimization temperature approaches zero.
- Combines conditional expectation with subgraph tokenization to fix multiple solution variables per iteration and reduce post-processing time.
- Shows that the one-step formulation recovers the training objective used by EGN and EGN-Anneal up to parameter-independent constants.

## Method

**Joint variational upper bound (Section 3).** Let $p_B(X)$ be a Boltzmann target and $q_\theta(X)=\int q_\theta(X\mid Z)q(Z)dZ$ an approximate-likelihood model. The paper uses

$$
D_{\mathrm{KL}}(q_\theta(X)\Vert p_B(X))
\leq
D_{\mathrm{KL}}(q_\theta(X,Z)\Vert p(X,Z)).
$$

For a diffusion model, $Z=X_{1:T}$. The tractable joint objective contains reverse-step entropy, compatibility with the prescribed forward process, and the terminal combinatorial energy $H_Q(X_0)$. The model samples complete reverse paths, so training does not require examples from the target distribution or exact evaluation of the marginal $q_\theta(X_0)$.

**Graph-conditioned reverse process (Sections 3.1 and 4).** Each reverse transition is a product of Bernoulli distributions parameterized by a time-conditioned graph neural network. The factorization permits closed-form conditional expectations of quadratic energy and entropy terms, while dependence across variables is represented over multiple reverse steps. Training linearly anneals the temperature to zero and estimates path expectations by Monte Carlo sampling.

**Forward noise (Section 3.2).** The categorical kernel independently retains or randomizes each binary variable. The alternative annealed kernel uses higher-temperature Boltzmann distributions and gradually approaches a uniform terminal distribution. Unlike the categorical coupling term, its contribution does not vanish at zero optimization temperature.

**Tokenized conditional expectation (Section 4.1).** Standard conditional expectation greedily fixes one Bernoulli variable at a time. CE-ST groups $k$ variables, evaluates their $2^k$ configurations in parallel, and reduces the number of iterations by a factor of $k$ when the token size remains manageable.

## Experiments

The study covers Maximum Independent Set (MIS), Maximum Clique (MaxCl), Minimum Dominating Set (MDS), Maximum Cut (MaxCut), and Minimum Vertex Cover (MVC). MIS, MaxCl, and MVC use RB-model graphs; MDS and MaxCut use Barabasi-Albert graphs. The principal small and large benchmarks contain graphs with 200-300 and 800-1200 nodes, with 4,000 training, 500 validation, and 500 test instances. Results average eight samples per instance over three training seeds, and benchmark evaluation uses three times as many reverse steps as training.

- On RB-small and RB-large MIS, CE-ST8 reports average independent-set sizes of $19.24\pm0.05$ and $38.87\pm0.13$. The former marginally exceeds LTFT's 19.18, while the latter exceeds LTFT's 37.48 but remains below KaMIS's 43.15 on RB-large.
- On BA-small and BA-large MDS, CE-ST8 reports $28.20\pm0.09$ and $106.61\pm0.31$, improving over the evaluated neural baselines; the reported Gurobi values are 27.89 and 103.80.
- On RB-small MaxCl, CE-ST8 reaches $16.30\pm0.08$, compared with LTFT at 16.24 and Gurobi at 19.05.
- On BA-small and BA-large MaxCut, CE-ST8 reports $727.33\pm2.31$ and $2947.53\pm1.49$. The BA-large result exceeds the reported time-limited Gurobi value of $2944.38\pm0.86$, although the implementations use different hardware.
- CE-ST8 preserves the reported CE solution quality while reducing total evaluation time from 54 to 13 seconds on RB-small MIS and from 4:57 to 1:05 on RB-large MIS. Appendix B.3 finds token size 8 minimizes evaluation time in the tested range without changing relative error.
- Ablations show monotonically lower relative error as training steps increase from one to five, strong gains from temperature annealing, and continued improvement when applying more reverse steps at test time. Extra evaluation steps increase runtime approximately linearly. Categorical and annealed noise have similar average performance under annealing; without annealing, categorical noise has higher variance.
- On out-of-distribution Gset MaxCut, DiffUCO is second to the search-based ANYCSP in every reported graph-size group. On larger Barabasi-Albert graphs, it remains close to Gurobi for MDS and exceeds the 300-second Gurobi results for MaxCut.

## Limitations

- The learned distribution remains biased and does not provide the unbiased target samples required by some statistical-physics applications.
- Training is memory- and time-intensive on large, densely connected graphs. The RB-large MIS experiment uses an 80 GB A100, and MaxCl is especially costly because it operates on complementary graphs.
- Comparisons with Gurobi are not hardware matched: DiffUCO runs mostly on GPUs, while Gurobi runs on CPUs. Operations-research results that run to optimality are included as solution-quality references rather than direct runtime comparisons.
- Several neural baseline values are taken from prior work, and out-of-distribution comparisons can depend on architecture and training-distribution differences. The authors explicitly caution against treating the Gset comparison with search-based ANYCSP as like-for-like.
- Better solutions from additional inference steps come with linearly increasing evaluation time. CE-ST also has operations exponential in token size, producing a runtime optimum rather than unlimited scaling.
- Training cost must be amortized over repeated queries. Appendix B.5 reports that the break-even query count varies widely by problem, from hundreds to more than a million in the evaluated settings.

## Related Concepts

- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]
- [[concepts/diffusion-models|Diffusion Models]]
- Boltzmann distributions
- Variational annealing
- Quadratic unconstrained binary optimization

## Related Papers

- [[papers/structured-denoising-diffusion-models-in-discrete-state-spaces|Structured Denoising Diffusion Models in Discrete State-Spaces]]: supplies the categorical discrete-noise construction used by DiffUCO.
- Sanokowski et al. (2023), "Variational annealing on graphs for combinatorial optimization": exact-likelihood autoregressive predecessor and source of subgraph tokenization.
- Zhang et al. (2023), "Let the flows tell: Solving graph combinatorial problems with GFlowNets": principal unsupervised autoregressive benchmark.
- Karalias and Loukas (2020), "Erdos goes neural: An unsupervised learning framework for combinatorial optimization on graphs": the one-step mean-field method generalized by DiffUCO's path objective.
- Sun and Yang (2023), "DIFUSCO: Graph-based diffusion solvers for combinatorial optimization": supervised discrete-diffusion approach trained on solver-produced solutions.

[[index|Library home]]
