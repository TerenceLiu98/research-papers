---
title: "Probabilistic Tiny Recursive Model"
type: paper
authors:
  - Amin Sghaier
  - Ali Parviz
  - Alexia Jolicoeur-Martineau
year: null
tags:
  - recursive-reasoning
  - test-time-compute
  - latent-reasoning
  - stochastic-inference
  - verifier-guided-selection
---

## TL;DR

Probabilistic Tiny Recursive Model (PTRM) turns deterministic Tiny Recursive Model inference into [[concepts/stochastic-latent-trajectory-search|Stochastic Latent Trajectory Search]]. It injects Gaussian noise at every deep recursion step, runs parallel latent rollouts, and uses the model's existing correctness-prediction Q head to select an answer. Without retraining, this raises exact accuracy from 62.6% to 91.2% on the selected Pencil Puzzle Bench golden tasks and from 87.28% to 98.75% on Sudoku-Extreme, although weaker Q-head selection limits the realized gains on Maze-Hard and ARC-AGI-2.

## Research Question

Can stochastic exploration and an existing learned verifier recover correct solutions that a deterministic Tiny Recursive Model misses, thereby adding parallel width as a useful test-time scaling axis without retraining or task-specific input perturbations?

## Motivation

Tiny Recursive Models repeatedly refine an answer and latent reasoning state, but standard inference produces one deterministic trajectory. The paper observes that failed trajectories can remain in bounded latent regions whose decoded answers stay incorrect, while delayed successes eventually escape to a different region. Because many latent trajectories may reach the same unique puzzle solution, a single deterministic path can understate the model's available capability.

The TRM Q head is trained jointly to predict exact answer correctness for adaptive halting, yet standard inference does not use it to select among answers. PTRM combines stochastic exploration with this already-trained signal: noise supplies alternative trajectories, and the Q head ranks their final states.

## Contributions

- Identifies quick success, delayed success, and persistent failure modes in recursive latent trajectories, with failed and delayed trajectories initially occupying similar low-Q regions.
- Introduces recurrent Gaussian perturbations at every deep recursion step and parallelizes $K$ independent rollouts from one pretrained TRM checkpoint.
- Reuses the Q head as an inference-time selector, defining best-Q@$K$ alongside oracle pass@$K$ and frequency-based mode@$K$.
- Separates width scaling through parallel trajectories from depth scaling through additional supervision steps.
- Evaluates the method on five Pencil Puzzle Bench puzzle types, Sudoku-Extreme, Maze-Hard, and ARC-AGI-2, and reports a negative result for Q-guided Langevin updates.

## Method

TRM iteratively refines a reasoning state and predicted answer with a shared two-layer network. Training uses deep supervision and a binary Q-head loss whose target is exact decoded-answer correctness. This supports [[concepts/adaptive-computation|Adaptive Computation]] during training but leaves the Q signal unused in conventional fixed-budget inference.

PTRM runs $K$ independent copies of the same input. At each deep recursion step, it adds Gaussian noise with scale $\sigma$ to each rollout's latent input. After $D$ steps, the Q head scores the candidates, and the output head decodes the candidate with the largest Q value. This creates a width axis whose rollouts can run in parallel, unlike sequential depth scaling.

The paper interprets recurring latent regions with similar cell accuracy as solution basins. In one illustrative puzzle that deterministic TRM fails, 8 of 100 perturbed trajectories escape the original bad basin and solve the puzzle. This example supports the proposed mechanism but is not, by itself, evidence that the projected regions are universal causal structures.

Three selection metrics distinguish exploration from usable inference. pass@$K$ asks whether any candidate is correct and requires an oracle; best-Q@$K$ measures deployable selection by the learned Q head; mode@$K$ chooses the most frequent decoded answer. The gap between pass@$K$ and best-Q@$K$ measures verifier headroom.

## Experiments

On the Pencil Puzzle Bench golden subset, PTRM with $K=100$, $D=48$, and $\sigma=0.2$ improves aggregate best-Q@$K$ from **62.6%** for deterministic TRM at $D=16$ to **91.2%**. Increasing depth alone to 48 steps reaches **66.0%**. The largest per-type gains are Sudoku (**46.7% to 97.8%**) and Tapa (**40.0% to 80.0%**); Heyawake remains **85.7%**. On the larger validation set, the corresponding aggregate improvement is **76.4% to 90.4%**.

On Sudoku-Extreme, $K=100$, $D=64$, and $\sigma=0.3$ produce **99.06% pass@$K$** and **98.75% best-Q@$K$**, compared with **87.28%** for the reproduced deterministic baseline. Here Q selection is within one percentage point of the oracle ceiling.

On Maze-Hard, $K=100$, $D=16$, and $\sigma=1.0$ raise pass@$K$ from **83.80%** to **95.63%**, but best-Q@$K$ reaches only **85.17%** and mode@$K$ reaches **86.73%**. The model therefore generates substantially more correct candidates than its Q head can reliably identify.

On ARC-AGI-2, PTRM adds $K=25$ rollouts per standard input augmentation and retains voting across augmentations. With $D=16$ and $\sigma=0.2$, pass@1 rises from **7.36% to 8.47%**, pass@100 from **14.31% to 15.97%**, and pass@2 remains **9.72%**.

The PPBench comparison reports **91.2%** for PTRM versus **34.7%** for the strongest listed single-LLM direct result and **55.1%** for an oracle ensemble of seven LLMs. Its estimated cost is **\$0.001 per attempt** on one H100 priced at \$2.50/hour, compared with **\$2.66** per attempt for the ensemble. These figures use different systems and an assumed GPU rental price rather than a controlled hardware benchmark.

The noise ablation shows task-dependent optima: Sudoku-Extreme saturates near $\sigma=0.1$, Maze-Hard pass@$K$ plateaus near $\sigma=1.0$, and ARC-AGI-2 peaks near $\sigma=0.6$ before declining. A Q-guided Langevin variant performs no better than a matched noise-only ablation; the paper attributes its gains entirely to the noise term rather than the Q gradient.

## Limitations

- Evaluation is confined to structured reasoning puzzles, including only a small, fixed-size subset of Pencil Puzzle Bench; it does not establish gains on general language or open-ended reasoning.
- The best noise scale, rollout count, depth, and selection method vary by task. Maze-Hard demonstrates that successful exploration need not translate into usable accuracy when the verifier is weak.
- pass@$K$ is an oracle diagnostic rather than a deployable selection rule. Q-head performance on PPBench and Sudoku-Extreme does not imply equally reliable correctness prediction elsewhere.
- The strongest results spend up to 100 times the rollout width and sometimes greater depth. Parallelism reduces wall-clock pressure but not total computation; the paper does not report matched-compute comparisons across all methods.
- The PPBench LLM comparison uses a small 49-puzzle filtered golden set, selectively available agentic retries, heterogeneous provider systems, and an oracle ensemble. The cost calculation combines reported API costs with an estimated H100 rental rate.
- Claims about good and bad latent basins rely partly on per-puzzle PCA visualizations and correlations between Q values and cell accuracy; these do not fully identify the underlying dynamics.
- The supplied Markdown states no publication year, venue, DOI, or arXiv identifier, so those metadata are left unasserted.

## Related Concepts

- [[concepts/stochastic-latent-trajectory-search|Stochastic Latent Trajectory Search]]: the paper's recurrent-noise, parallel-rollout, learned-selection procedure.
- [[concepts/latent-reasoning|Latent Reasoning]]: TRM performs iterative computation in hidden state rather than generating a textual chain of thought.
- [[concepts/adaptive-computation|Adaptive Computation]]: TRM originally trains the Q head for halting, while PTRM repurposes it for candidate selection.

## Related Papers

- Jolicoeur-Martineau (2025), "Less Is More: Recursive Reasoning with Tiny Networks": supplies the TRM architecture and checkpoints used by PTRM.
- Wang et al. (2025), "Hierarchical Reasoning Model": a recursive latent-reasoning predecessor and benchmark baseline.
- Ren and Liu (2026), "Are Your Reasoning Models Reasoning or Guessing? A Mechanistic Analysis of Hierarchical Reasoning Models": analyzes spurious fixed points and uses task-specific interventions to escape them.
- Baek et al. (2026), "Generative Recursive Reasoning Models": samples recursive hidden states but requires retraining; the supplied paper contrasts this with inference-only recurrent noise.
- Efstathiou and Balwani (2026), "Recursive Reasoning as Attractor Landscape Search": concurrent inference-time work that perturbs only the initial hidden state.
- [[papers/diffusion-as-a-training-curriculum-for-timestep-free-iterative-reasoning|Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning]]: uses recurrent memory and stochastic inference on Sudoku and mazes, but trains with an ordered corruption curriculum and scales a single trajectory rather than selecting among parallel candidates.

[[index|Library home]]
